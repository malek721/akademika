import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type SupabaseClient = ReturnType<typeof createClient>;

const PLAN_LIMITS: Record<string, number> = {
  free: 5_000,
  student: 50_000,
  researcher: 500_000,
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    // ── 1. Auth ───────────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Missing or invalid Authorization header" }, 401);
    }
    const token = authHeader.replace("Bearer ", "").trim();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return json({ error: "Unauthorized" }, 401);
    }

    // ── 2. Parse & validate body ──────────────────────────────
    let body: {
      source_text: string;
      source_lang: string;
      target_lang: string;
      discipline: string;
      document_type: string;
    };

    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const { source_text, source_lang, target_lang, discipline, document_type } = body;

    if (!source_text || !source_lang || !target_lang || !discipline || !document_type) {
      return json(
        { error: "Missing required fields: source_text, source_lang, target_lang, discipline, document_type" },
        400,
      );
    }

    // ── 3. Word count ─────────────────────────────────────────
    const wordCount = source_text.trim().split(/\s+/).filter(Boolean).length;

    // ── 4. Profile & plan lookup ──────────────────────────────
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const plan = (profile?.plan as string) ?? "free";
    const limit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
    const period = new Date().toISOString().slice(0, 7); // "YYYY-MM"

    // ── 5. Usage check ────────────────────────────────────────
    const { data: usageRow } = await supabase
      .from("usage")
      .select("words_used")
      .eq("user_id", user.id)
      .eq("period", period)
      .single();

    const wordsUsed = (usageRow?.words_used as number) ?? 0;

    if (wordsUsed + wordCount > limit) {
      return json(
        { error: "Monthly word limit reached", words_used: wordsUsed, limit, words_requested: wordCount },
        429,
      );
    }

    // ── 6. Insert translation record (status: processing) ─────
    const { data: record, error: insertError } = await supabase
      .from("translations")
      .insert({
        user_id: user.id,
        source_lang,
        target_lang,
        discipline,
        document_type,
        source_text,
        word_count: wordCount,
        status: "processing",
      })
      .select("id")
      .single();

    if (insertError || !record) {
      console.error("Insert error:", insertError);
      return json({ error: "Failed to create translation record" }, 500);
    }

    const translationId: string = record.id;

    // ── 6.5. Glossary term matching ───────────────────────────
    const direction: "tr2en" | "en2tr" = source_lang.toLowerCase().startsWith("tr")
      ? "tr2en"
      : "en2tr";
    const glossaryLines = await matchGlossaryTerms(
      supabase, source_text, discipline, direction,
    );

    // ── 7. Call Groq API ──────────────────────────────────────
    const groqKey = Deno.env.get("GROQ_API_KEY");
    if (!groqKey) {
      await supabase
        .from("translations")
        .update({ status: "failed", error_message: "GROQ_API_KEY not configured" })
        .eq("id", translationId);
      return json({ error: "Translation service not configured" }, 503);
    }

    let translatedText: string;

    try {
      const groqRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 2048,
            messages: [
              {
                role: "user",
                content: buildPrompt(
                  source_text, source_lang, target_lang,
                  discipline, document_type, glossaryLines,
                ),
              },
            ],
          }),
        },
      );

      if (!groqRes.ok) {
        const errText = await groqRes.text();
        throw new Error(`Groq ${groqRes.status}: ${errText}`);
      }

      const groqData = await groqRes.json() as {
        choices: Array<{ message: { content: string } }>;
      };

      translatedText = groqData.choices[0]?.message?.content?.trim() ?? "";

      if (!translatedText) throw new Error("Groq returned empty content");
    } catch (apiErr) {
      console.error("Groq API error:", apiErr);
      await supabase
        .from("translations")
        .update({ status: "failed", error_message: String(apiErr) })
        .eq("id", translationId);
      return json({ error: "Translation service error" }, 502);
    }

    // ── 8. Mark translation as completed ─────────────────────
    await supabase
      .from("translations")
      .update({ translated_text: translatedText, status: "completed" })
      .eq("id", translationId);

    // ── 9. Upsert monthly usage ───────────────────────────────
    await supabase.from("usage").upsert(
      {
        user_id: user.id,
        period,
        words_used: wordsUsed + wordCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,period" },
    );

    // ── 10. Return result ─────────────────────────────────────
    return json({
      id: translationId,
      translated_text: translatedText,
      word_count: wordCount,
      words_remaining: limit - wordsUsed - wordCount,
    });
  } catch (err) {
    console.error("Unhandled edge function error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});

// ─────────────────────────────────────────────────────────────
// Glossary matching
// ─────────────────────────────────────────────────────────────

/** Turkish-aware lowercase: İ→i  I→ı  then locale-agnostic toLowerCase */
function turkishLower(s: string): string {
  return s.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();
}

/** Escape special regex characters in a literal string */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Finds glossary terms that actually appear in sourceText and returns
 * them as "term_source => term_target" strings (max 60).
 *
 * Algorithm:
 *  1. Fetch all glossary rows for (direction, field) — up to 2 000 terms.
 *  2. Sort longest term_source first (multi-word before single-word).
 *  3. Normalise source text with turkishLower() and test each term via
 *     a Unicode-aware word-boundary regex (\p{L}/\p{N} covers ğşüöçı…).
 *  4. Comma-separated targets → " | " alternatives.
 */
async function matchGlossaryTerms(
  supabase: SupabaseClient,
  sourceText: string,
  field: string,
  direction: "tr2en" | "en2tr",
  maxTerms = 60,
): Promise<string[]> {
  const normalizedField = field.trim().toLowerCase();

  const { data, error } = await supabase
    .from("glossary")
    .select("term_source, term_target")
    .eq("direction", direction)
    .eq("field", normalizedField)
    .limit(2000);

  if (error) {
    console.error("Glossary query error:", error.message);
    return [];
  }
  if (!data?.length) return [];

  // Longest first → "yapay sinir ağı" is tested before "ağ"
  const sorted = [...data].sort(
    (a, b) => b.term_source.length - a.term_source.length,
  );

  const normalizedText = turkishLower(sourceText);
  const matches: string[] = [];

  for (const { term_source, term_target } of sorted) {
    if (matches.length >= maxTerms) break;

    const normalizedTerm = turkishLower(term_source);
    const escaped = escapeRegex(normalizedTerm);

    // \p{L} matches any Unicode letter (ğ, ş, ü, ö, ç, ı included)
    // so the boundary correctly ignores mid-word positions
    const pattern = new RegExp(
      `(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`,
      "u",
    );

    if (!pattern.test(normalizedText)) continue;

    // "term1, term2, term3" → "term1 | term2 | term3"
    const target = term_target
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean)
      .join(" | ");

    matches.push(`${term_source} => ${target}`);
  }

  return matches;
}


// ─────────────────────────────────────────────────────────────
// AKADEMIKA Master Academic Translation Protocol v1.0
// ─────────────────────────────────────────────────────────────
function buildPrompt(
  text: string,
  sourceLang: string,
  targetLang: string,
  discipline: string,
  documentType: string,
  glossaryLines: string[],
): string {
  const glossaryBlock = glossaryLines.length > 0
    ? glossaryLines.join("\n")
    : "(no glossary terms matched for this text)";

  return `# AKADEMIKA — MASTER ACADEMIC TRANSLATION PROTOCOL v1.0

═══════════════════════════════════════════════════════════════════
SECTION 0 — IDENTITY & MISSION
═══════════════════════════════════════════════════════════════════
You are AKADEMIKA, an elite academic translation system. You embody
three experts working as one:
  (1) A discipline specialist with doctoral-level knowledge of
      ${discipline} and its scholarly literature in both languages.
  (2) A professional academic translator with native command of
      ${sourceLang} and ${targetLang} scholarly registers.
  (3) A senior academic copyeditor who reviews against journal and
      thesis standards.
You produce publication-grade translations indistinguishable from
text originally written by a native academic in the target language.
You are NOT a literal translator. You are NOT a casual paraphraser.

═══════════════════════════════════════════════════════════════════
SECTION 1 — REQUEST PARAMETERS
═══════════════════════════════════════════════════════════════════
SOURCE_LANG   : ${sourceLang}
TARGET_LANG   : ${targetLang}
DISCIPLINE    : ${discipline}
DOCUMENT_TYPE : ${documentType}
TN_MODE       : off

═══════════════════════════════════════════════════════════════════
SECTION 2 — EXECUTION PIPELINE (phases A and C are silent)
═══════════════════════════════════════════════════════════════════
PHASE A — ANALYZE (silent):
  1. Identify document genre and section type.
  2. Map genre conventions in ${targetLang} academia.
  3. Scan: technical terms, citations, equations, acronyms, units.
  4. Cross-check every detected term against GLOSSARY in Section 7.
  5. Note all structural elements that must be mirrored.
PHASE B — TRANSLATE: execute Sections 3–8.
PHASE C — REVIEW (silent): run QA checklist in Section 9.
  Fix every failure before output.

═══════════════════════════════════════════════════════════════════
SECTION 3 — TRANSLATION DOCTRINE
═══════════════════════════════════════════════════════════════════
3.1 MEANING-FIRST: translate scholarly intent, never word-for-word.
3.2 GENRE FIDELITY: match ${documentType} conventions in ${targetLang}.
3.3 TERMINOLOGY LAW: GLOSSARY is binding. Zero variation per term.
3.4 REGISTER: ${documentType} → highest formality, full hedging.
3.5 HEDGING: preserve epistemic strength exactly (suggests ≠ proves).
3.6 ZERO DRIFT: nothing added, omitted, or flattened.
3.7 CONNECTORS: however/thus/moreover → identical logical force.

═══════════════════════════════════════════════════════════════════
SECTION 4 — PROTECTED ELEMENTS (verbatim)
═══════════════════════════════════════════════════════════════════
In-text citations    → verbatim (Author, Year) / [N] unchanged.
Reference entries    → verbatim: authors, titles, journals intact.
DOIs / URLs          → verbatim, character-for-character.
Equations/formulas   → verbatim; translate surrounding prose only.
Variables & symbols  → verbatim (x, β, χ², ΔG, log).
Statistical notation → verbatim (p<.05, n=, M, SD, OR, HR).
Numbers/dates/units  → digit-for-digit; never convert units.
Latin terms          → verbatim, italicized (in vitro, et al.).
Person names         → verbatim original spelling.
Acronyms             → internationally established ones: keep as-is.
Figure/Table refs    → translate captions; never renumber.

═══════════════════════════════════════════════════════════════════
SECTION 5 — LANGUAGE-PAIR INTELLIGENCE
═══════════════════════════════════════════════════════════════════
IF sourceLang = Turkish → English:
  • Unpack agglutinative syntax into natural English.
  • Restore dropped subjects (Turkish pro-drop → English needs them).
  • For journal venues: prefer active academic voice where natural.
  • Kill Turklish calques: "make an analysis" → "analyze".
  • "anlamlı" → "statistically significant" in stats contexts.
  • "Bu çalışmada" → vary: "In this study" / "The present study".

IF sourceLang = English → Turkish:
  • Use TDK/YÖK established terminology; keep accepted loanwords.
  • Reporting register: -mIştIr / -mAktAdIr for findings.
  • Restructure long English noun chains into Turkish syntax.
  • Turkish capitalization rules (sentence case; proper nouns only).
  • ABSOLUTE: ı İ ş ğ ç ö ü — never substitute ASCII lookalikes.
    A single i/ı error is a critical failure.

═══════════════════════════════════════════════════════════════════
SECTION 6 — DISCIPLINE MODULE: ${discipline}
═══════════════════════════════════════════════════════════════════
- Use established terminology for ${discipline} in ${targetLang}.
- Retain standard technical terms practitioners actually use.
- Translate the prose, not the technical stack.
- Units, standards (ISO, IEEE), protocol names: verbatim.
- Never invent terminology not in the GLOSSARY or established usage.

═══════════════════════════════════════════════════════════════════
SECTION 7 — GLOSSARY ENFORCEMENT (binding)
═══════════════════════════════════════════════════════════════════
DISCIPLINE GLOSSARY (mandatory — overrides your own preference):
${glossaryBlock}

Conflict rule: GLOSSARY > your judgment.
Where glossary offers alternatives (a | b), choose the one that
best fits the context; stay consistent throughout.

═══════════════════════════════════════════════════════════════════
SECTION 8 — INTEGRITY PROTOCOL
═══════════════════════════════════════════════════════════════════
8.1 NEVER invent terminology, citations, or content. No hallucination.
8.2 No equivalent → best rendering + (original) on first use.
8.3 Ambiguous source → most defensible reading. Never silently guess
    on numbers, data, or claims.
8.4 Garbled source → render what is recoverable + [illegible].
8.5 Source error → translate AS IS (do not silently fix).

═══════════════════════════════════════════════════════════════════
SECTION 9 — QA CHECKLIST (silent — all must pass before output)
═══════════════════════════════════════════════════════════════════
□ Glossary: 100% of matched terms used exactly and consistently.
□ Protected elements (Section 4): all verbatim and intact.
□ Numbers/dates: digit-by-digit match with source.
□ Completeness: no sentence omitted, none added.
□ Hedging: same epistemic strength as source on every claim.
□ Register: matches ${documentType} calibration.
□ Connectors: argument logic preserved.
□ Naturalness: would a native ${targetLang} scholar write this?
□ Structure: paragraphs, headings, emphasis mirrored exactly.
□ If targetLang = Turkish: ı İ ş ğ ç ö ü — zero ASCII substitution.

═══════════════════════════════════════════════════════════════════
SECTION 10 — OUTPUT CONTRACT
═══════════════════════════════════════════════════════════════════
Return ONLY the translated text.
No preamble, no commentary, no explanations.
Mirror the source structure exactly.

═══════════════════════════════════════════════════════════════════
SOURCE TEXT
═══════════════════════════════════════════════════════════════════
${text}`;
}
