import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type SupabaseClient = ReturnType<typeof createClient>;

// Keep in sync with src/lib/constants.ts — Deno cannot import from src/
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

// Layer 1 — terms that must NEVER be translated (stay English/Latin regardless of
// discipline or target language). Injected into the prompt as a high-priority block.
// NOTE: the final 8 entries were fixed from mojibake in the source (Â°C→°C, Î±→α, …).
const NEVER_TRANSLATE_TERMS = [
  "A", "a posteriori", "a priori", "A. thaliana", "AC", "Accuracy", "actus reus",
  "ad hoc", "ad libitum", "Adam", "ADHD", "ADP", "ALT", "amicus curiae", "ANCOVA",
  "ANOVA", "ANSI", "API", "Appendix", "ASD", "AST", "ASTM", "atm", "ATP",
  "ATP synthase", "attention", "AUC", "B.Sc.", "B2B", "B2C", "backpropagation",
  "baseline", "batch", "batch size", "BDI", "benchmark", "BERT", "BGE-M3", "Big Five",
  "BLAST", "BLEU", "BMI", "bona fide", "Bonferroni", "bp", "bpm", "BUN", "C. elegans",
  "CAD", "CAGR", "CAM", "Cas9", "CBT", "cDNA", "cf.", "CFD", "chain-of-thought",
  "checkpoint", "chi-square", "chunk", "chunking", "CI", "classification", "clustering",
  "cm", "CNN", "coarse-grained", "COCO", "Cohen's d", "Cohen's kappa",
  "confidence interval", "correlation", "cosine similarity", "COVID-19",
  "CPI", "CRISPR", "Cronbach's alpha", "cross-attention", "CRP", "CT", "CUDA",
  "D. melanogaster", "Da", "dataset", "DC", "de facto", "de jure", "de novo", "decoder",
  "df", "DIN", "DNA", "DNA polymerase", "DOI", "Dr.", "dropout", "DSM", "DSM-5",
  "E. coli", "e.g.", "EBITDA", "EC50", "ECG", "ECHR", "EEG", "effect size", "EKG",
  "ELISA", "embedding", "embeddings", "EMF", "encoder", "epoch", "EPS", "EQ", "Eq.",
  "et al", "et al.", "etc.", "EU", "EUR", "ex officio", "ex vivo", "F-test", "F1",
  "F1-score", "FAISS", "FDA", "FEA", "feature", "feature extraction", "FEM", "few-shot",
  "Fig.", "Figure", "fine-grained", "fine-tune", "fine-tuning", "fMRI", "forex",
  "forum non conveniens", "framework", "FTIR", "G+C", "g/mol", "GAN", "GBP", "GC",
  "GC-MS", "GDP", "GDPR", "GenBank", "GHz", "GLUE", "GNP", "GPa", "GPT", "GPU",
  "gradient", "ground truth", "grounding", "GRU", "habeas corpus", "hallucination",
  "hazard ratio", "HbA1c", "HDL", "HIV", "HPLC", "HR", "HTML", "Hugging Face",
  "hyperparameter", "Hz", "i.e.", "ibid.", "IC50", "ICC", "ICD", "ICJ", "ICU", "IEEE",
  "ImageNet", "IMF", "in dubio pro reo", "in silico", "in situ", "in vitro", "in vivo",
  "in-context learning", "inference", "inter alia", "IP", "IQ", "IR", "IRR", "ISBN",
  "ISO", "ISSN", "IU", "J", "JSON", "K", "kb", "kDa", "Keras", "kg", "kHz", "kJ",
  "kJ/mol", "km", "kN", "Kolmogorov-Smirnov", "kPa", "KPI", "Kruskal-Wallis", "kV",
  "KVKK", "kW", "lambda", "LD50", "LDL", "learning rate", "lex lata", "lex specialis",
  "library", "Likert", "LLM", "loss function", "LSTM", "M", "m", "M.Sc.", "m/s", "mA",
  "Ma", "mala fide", "Mann-Whitney", "MANOVA", "MAP", "McNemar", "MDR", "mean", "median",
  "mens rea", "METEOR", "mg", "MHz", "MIC", "miRNA", "mL", "mM", "mm", "mmHg", "mmol",
  "MMPI", "MNIST", "mode", "mol", "MoU", "MPa", "MRI", "mRNA", "MRR", "MRSA", "MS", "mu",
  "MW", "N", "n", "NAD", "NADH", "NADPH", "NCBI", "NDA", "NDCG", "NLP", "nM", "Nm", "NMR",
  "Northern blot", "NPV", "Nu", "obiter dictum", "OCD", "odds ratio", "OECD", "one-shot",
  "op. cit.", "optimizer", "OR", "ORCID", "overfitting", "overlap", "p", "p-value",
  "P/E", "Pa", "pacta sunt servanda", "PCR", "PDB", "PDF", "Pearson", "per", "per os",
  "perplexity", "PET", "pH", "Ph.D.", "PID", "pipeline", "pKa", "post mortem", "ppb",
  "PPI", "ppm", "Pr", "pre-training", "Precision", "Precision@k", "pretraining",
  "prima facie", "Prof.", "prompt", "prompt engineering", "prompting", "PTSD", "PWM",
  "PyTorch", "qPCR", "r", "R-squared", "R2", "RAG", "ratio decidendi", "RCT", "Re",
  "Recall", "Recall@5", "Recall@k", "regression", "regularization",
  "reinforcement learning", "repository", "res judicata", "ResNet", "retrieval",
  "retriever", "RMS", "RNA", "RNA polymerase", "RNN", "ROA", "RoBERTa", "ROC", "ROE",
  "ROI", "ROUGE", "rpm", "RR", "rRNA", "RT-PCR", "S. cerevisiae", "SARS-CoV-2", "SD",
  "SDK", "SE", "self-attention", "SEM", "SGD", "Shapiro-Wilk", "sigma", "siRNA", "SOTA",
  "Southern blot", "Spearman", "SQL", "SQuAD", "STAI", "standard deviation",
  "state-of-the-art", "status quo", "supervised learning", "SWOT", "t-test", "T5",
  "Table", "TEM", "TensorFlow", "TF-IDF", "theta", "token", "tokenization", "tokenizer",
  "top-k", "top-p", "TPU", "transfer learning", "Transformer", "tRNA", "TRY", "TSH",
  "Tukey", "ultra vires", "UN", "underfitting", "unsupervised learning", "URL", "USD",
  "UV", "UV-Vis", "V", "variance", "VAT", "vector", "vector database", "versus", "VGG",
  "via", "vice versa", "vs.", "W", "WAIS", "Western blot", "WHO", "Wilcoxon", "WISC",
  "word2vec", "WTO", "XML", "XRD", "YOLO", "z-score", "zero-shot",
  "°C", "µg", "µL", "µM", "α", "β", "χ²", "Ω",
];

// Category split of the never-translate list (generated from never_translate_MASTER.csv;
// union of UNIVERSAL + all categories === NEVER_TRANSLATE_TERMS, verified). 'universal'
// stays in the static cached prefix; the discipline category is appended per request.
const NEVER_TRANSLATE_UNIVERSAL: string[] = [
  "a posteriori", "a priori", "ad hoc", "Appendix", "B.Sc.", "cf.", "de facto", "de jure",
  "DOI", "Dr.", "e.g.", "Eq.", "et al", "et al.", "etc.", "Fig.", "Figure", "HTML", "i.e.",
  "ibid.", "ISBN", "ISSN", "M.Sc.", "op. cit.", "ORCID", "PDF", "per", "Ph.D.", "Prof.",
  "status quo", "Table", "URL", "versus", "via", "vice versa", "vs.", "XML",
];

const NEVER_TRANSLATE_BY_CATEGORY: Record<string, string[]> = {
  biology: [
    "A. thaliana", "ADP", "ATP", "ATP synthase", "BLAST", "bp", "C. elegans", "Cas9", "cDNA",
    "CRISPR", "D. melanogaster", "de novo", "DNA", "DNA polymerase", "E. coli", "ELISA", "G+C",
    "GenBank", "in situ", "in vitro", "in vivo", "kb", "kDa", "miRNA", "mRNA", "NAD", "NADH",
    "NADPH", "NCBI", "Northern blot", "PCR", "PDB", "pH", "qPCR", "RNA", "RNA polymerase", "rpm",
    "rRNA", "RT-PCR", "S. cerevisiae", "siRNA", "Southern blot", "tRNA", "Western blot",
  ],
  chemistry: [
    "atm", "ATP", "Da", "DNA", "FTIR", "g/mol", "GC", "GC-MS", "HPLC", "IR", "K", "kDa",
    "kJ/mol", "M", "mM", "mol", "MS", "nM", "NMR", "pH", "pKa", "ppb", "ppm", "SEM", "TEM", "UV",
    "UV-Vis", "XRD", "°C", "µM",
  ],
  computer_ai: [
    "Accuracy", "Adam", "API", "attention", "AUC", "backpropagation", "baseline", "batch",
    "batch size", "benchmark", "BERT", "BGE-M3", "BLEU", "chain-of-thought", "checkpoint",
    "chunk", "chunking", "classification", "clustering", "CNN", "coarse-grained", "COCO",
    "cosine similarity", "cross-attention", "CUDA", "dataset", "decoder", "dropout", "embedding",
    "embeddings", "encoder", "epoch", "F1", "F1-score", "FAISS", "feature", "feature extraction",
    "few-shot", "fine-grained", "fine-tune", "fine-tuning", "framework", "GAN", "GLUE", "GPT",
    "GPU", "gradient", "ground truth", "grounding", "GRU", "hallucination", "Hugging Face",
    "hyperparameter", "ImageNet", "in-context learning", "inference", "JSON", "Keras",
    "learning rate", "library", "LLM", "loss function", "LSTM", "MAP", "METEOR", "MNIST", "MRR",
    "NDCG", "NLP", "one-shot", "optimizer", "overfitting", "overlap", "perplexity", "pipeline",
    "pre-training", "Precision", "Precision@k", "pretraining", "prompt", "prompt engineering",
    "prompting", "PyTorch", "RAG", "Recall", "Recall@5", "Recall@k", "regression",
    "regularization", "reinforcement learning", "repository", "ResNet", "retrieval", "retriever",
    "RNN", "RoBERTa", "ROC", "ROUGE", "SDK", "self-attention", "SGD", "SOTA", "SQL", "SQuAD",
    "state-of-the-art", "supervised learning", "T5", "TensorFlow", "TF-IDF", "token",
    "tokenization", "tokenizer", "top-k", "top-p", "TPU", "transfer learning", "Transformer",
    "underfitting", "unsupervised learning", "vector", "vector database", "VGG", "word2vec",
    "YOLO", "zero-shot",
  ],
  economics: [
    "B2B", "B2C", "CAGR", "CPI", "EBITDA", "EPS", "EUR", "forex", "GBP", "GDP", "GNP", "IMF",
    "IRR", "KPI", "NPV", "OECD", "P/E", "PPI", "ROA", "ROE", "ROI", "SWOT", "TRY", "USD", "VAT",
    "WTO",
  ],
  engineering: [
    "A", "AC", "ANSI", "ASTM", "CAD", "CAM", "CFD", "cm", "DC", "DIN", "EMF", "FEA", "FEM",
    "GHz", "GPa", "Hz", "IEEE", "ISO", "J", "K", "kHz", "kJ", "km", "kN", "kPa", "kV", "kW", "m",
    "m/s", "mA", "Ma", "MHz", "mm", "MPa", "MW", "N", "Nm", "Nu", "Pa", "PID", "Pr", "PWM", "Re",
    "RMS", "rpm", "V", "W", "°C", "Ω",
  ],
  law: [
    "actus reus", "amicus curiae", "bona fide", "ECHR", "EU", "ex officio",
    "forum non conveniens", "GDPR", "habeas corpus", "ICC", "ICJ", "in dubio pro reo",
    "inter alia", "IP", "KVKK", "lex lata", "lex specialis", "mala fide", "mens rea", "MoU",
    "NDA", "obiter dictum", "pacta sunt servanda", "prima facie", "ratio decidendi",
    "res judicata", "ultra vires", "UN", "WTO",
  ],
  medicine: [
    "ad libitum", "ALT", "AST", "ATP", "BMI", "bpm", "BUN", "CI", "COVID-19", "CRP", "CT",
    "de novo", "DNA", "EC50", "ECG", "EEG", "EKG", "ELISA", "ex vivo", "FDA", "HbA1c", "HDL",
    "HIV", "HR", "IC50", "ICU", "in silico", "in situ", "in vitro", "in vivo", "IU", "kg",
    "LD50", "LDL", "MDR", "mg", "MIC", "miRNA", "mL", "mmHg", "mmol", "MRI", "mRNA", "MRSA", "n",
    "OR", "p", "p-value", "PCR", "per os", "PET", "post mortem", "qPCR", "r", "R2", "RCT", "RNA",
    "RR", "RT-PCR", "SARS-CoV-2", "SD", "SEM", "TSH", "WHO", "µg", "µL",
  ],
  psychology: [
    "ADHD", "ASD", "BDI", "Big Five", "CBT", "Cohen's d", "Cronbach's alpha", "DSM", "DSM-5",
    "EEG", "effect size", "EQ", "fMRI", "ICD", "IQ", "Likert", "MMPI", "OCD", "p-value", "PTSD",
    "STAI", "WAIS", "WISC",
  ],
  statistics: [
    "ANCOVA", "ANOVA", "Bonferroni", "chi-square", "CI", "Cohen's d", "Cohen's kappa",
    "confidence interval", "correlation", "Cronbach's alpha", "df", "F-test", "hazard ratio",
    "Kolmogorov-Smirnov", "Kruskal-Wallis", "lambda", "Mann-Whitney", "MANOVA", "McNemar",
    "mean", "median", "mode", "mu", "N", "n", "odds ratio", "p", "p-value", "Pearson", "r",
    "R-squared", "R2", "regression", "SD", "SE", "SEM", "Shapiro-Wilk", "sigma", "Spearman",
    "standard deviation", "t-test", "theta", "Tukey", "variance", "Wilcoxon", "z-score", "α",
    "β", "χ²",
  ],
};

// Always-included never-translate terms (kept in the cached static prefix):
// universal academic notation + statistical notation. Statistics (p, ANOVA, CI, SD…)
// appears across nearly all empirical disciplines, so it's global rather than gated.
const NEVER_TRANSLATE_ALWAYS: string[] = [
  ...NEVER_TRANSLATE_UNIVERSAL,
  ...NEVER_TRANSLATE_BY_CATEGORY.statistics,
];
const NEVER_TRANSLATE_ALWAYS_SET = new Set(NEVER_TRANSLATE_ALWAYS);

// UI discipline → never-translate category (parallels DISCIPLINE_TO_FIELD). null =
// no technical category → universal terms only (the smallest, most-cacheable case).
const DISCIPLINE_TO_NT_CATEGORY: Record<string, string | null> = {
  biyoloji: "biology",
  ziraat: "biology",
  kimya: "chemistry",
  bilgisayar: "computer_ai",
  iktisat: "economics",
  "işletme": "economics",
  fizik: "engineering",
  "mühendislik": "engineering",
  "mimarlık": "engineering",
  "çevre": "engineering",
  hukuk: "law",
  siyaset: "law",
  "tıp": "medicine",
  "eczacılık": "medicine",
  hemşirelik: "medicine",
  veterinerlik: "medicine",
  psikoloji: "psychology",
  matematik: null, // statistics notation is always-included (in the cached prefix)
  // universal-only (no matching technical category):
  arkeoloji: null,
  "coğrafya": null,
  dilbilim: null,
  "eğitim": null,
  felsefe: null,
  "iletişim": null,
  sosyoloji: null,
  tarih: null,
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 2000;

async function callGeminiWithRetry(prompt: string, apiKey: string, retries = 0): Promise<Response> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 65536,
          // thinkingConfig is a field OF generationConfig (not a sibling) — at the
          // top level the API ignores it and thinking stays on. budget 0 = off.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
  );

  if ((response.status === 503 || response.status === 429) && retries < MAX_RETRIES) {
    await new Promise((r) => setTimeout(r, RETRY_DELAY));
    return callGeminiWithRetry(prompt, apiKey, retries + 1);
  }

  return response;
}

/**
 * Glossary query direction from the source language. The frontend sends the
 * language NAME ("Turkish"/"English"), not a code, so a startsWith("tr") check
 * fails ("turkish" begins with "tu"). Match the name ("turk"/"türk") or the bare
 * "tr" code; anything else is treated as English-source.
 */
function directionFromTurkish(sourceLang: string): "tr2en" | "en2tr" {
  const sl = sourceLang.trim().toLowerCase();
  const sourceIsTurkish =
    sl === "tr" || sl.startsWith("turk") || sl.startsWith("türk");
  return sourceIsTurkish ? "tr2en" : "en2tr";
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
    const direction = directionFromTurkish(source_lang);
    const glossaryLines = await matchGlossaryTerms(
      supabase, source_text, discipline, direction,
    );

    // ── 7. Call Gemini API ────────────────────────────────────
    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      await supabase
        .from("translations")
        .update({ status: "failed", error_message: "GEMINI_API_KEY not configured" })
        .eq("id", translationId);
      return json({ error: "Translation service not configured" }, 503);
    }

    let translatedText: string;

    try {
      const prompt = buildPrompt(
        source_text, source_lang, target_lang,
        discipline, document_type, glossaryLines,
      );
      const geminiRes = await callGeminiWithRetry(prompt, geminiKey);

      if (!geminiRes.ok) {
        const errText = await geminiRes.text();
        throw new Error(`Gemini ${geminiRes.status}: ${errText}`);
      }

      const geminiData = await geminiRes.json() as {
        candidates: Array<{
          content: { parts: Array<{ text: string }> };
          finishReason?: string;
        }>;
        usageMetadata?: {
          promptTokenCount?: number;
          candidatesTokenCount?: number;
          thoughtsTokenCount?: number;
          cachedContentTokenCount?: number;
        };
      };

      translatedText = geminiData.candidates[0]?.content?.parts[0]?.text?.trim() ?? "";

      const finishReason = geminiData.candidates[0]?.finishReason;
      if (finishReason === "MAX_TOKENS") {
        console.warn("[translate] output hit MAX_TOKENS — translation truncated");
      }

      const usage = geminiData.usageMetadata;
      console.log(
        `[translate] tokens — prompt: ${usage?.promptTokenCount}, cached: ${usage?.cachedContentTokenCount ?? 0}, output: ${usage?.candidatesTokenCount}, thinking: ${usage?.thoughtsTokenCount}`,
      );

      if (!translatedText) throw new Error("Gemini returned empty content");
    } catch (apiErr) {
      console.error("Gemini API error:", apiErr);
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

// Maps the UI discipline slug → the glossary table's `field` category.
// The TÜBA glossary taxonomy differs from the UI discipline list, so most
// disciplines need an explicit mapping (or null = no glossary coverage).
const DISCIPLINE_TO_FIELD: Record<string, string | null> = {
  // exact matches — own TÜBA field
  "biyoloji": "biyoloji",
  "çevre": "çevre",
  "fizik": "fizik",
  "hukuk": "hukuk",
  "iktisat": "iktisat",
  "kimya": "kimya",
  "matematik": "matematik",
  "mühendislik": "mühendislik",
  "psikoloji": "psikoloji",
  "siyaset": "siyaset",
  // diacritic-only fix (DB was imported without Turkish chars)
  "eğitim": "egitim",
  "tıp": "tip",
  // taxonomy rename (UI name differs from TÜBA category name)
  "bilgisayar": "bilişim",
  "ziraat": "tarım",
  // approximate — no dedicated field; closest available domain used
  "eczacılık": "tip",
  "hemşirelik": "tip",
  "veterinerlik": "tarım",
  "iletişim": "genel",
  "işletme": "mühendislik",
  "mimarlık": "i̇nşaat",
  "sosyoloji": "genel",
  // null — no glossary coverage; skip DB query
  "arkeoloji": null,
  "coğrafya": null,
  "dilbilim": null,
  "felsefe": null,
  "tarih": null,
};

/**
 * Finds glossary terms that actually appear in sourceText and returns them as
 * "term_source => term_target" strings (max `maxTerms`).
 *
 * Two layers are merged:
 *  - field='core'      → high-frequency academic terms, applied to ALL disciplines.
 *  - discipline field  → the mapped TÜBA category for this discipline (if any).
 *
 * Algorithm:
 *  1. Fetch rows for (direction) from 'core' AND the discipline field — each as its
 *     own query, so a large discipline table can't crowd 'core' out under the cap.
 *  2. Sort longest term_source first (multi-word before single-word).
 *  3. Normalise source text with turkishLower() and test each term via a
 *     Unicode-aware word-boundary regex (\p{L}/\p{N} covers ğşüöçı…). Dedup overlap.
 *  4. Comma-separated targets → " | " alternatives.
 */
async function matchGlossaryTerms(
  supabase: SupabaseClient,
  sourceText: string,
  field: string,
  direction: "tr2en" | "en2tr",
  maxTerms = 150,
): Promise<string[]> {
  const lowered = field.trim().toLowerCase();
  const mappedField = DISCIPLINE_TO_FIELD[lowered];
  if (mappedField === undefined) {
    // unknown discipline — fall back to the raw lowercase value for the
    // discipline-specific field (harmless if it doesn't exist in the table).
    console.warn("[glossary] unmapped discipline:", field);
  }

  // 'core' applies to EVERY discipline; the discipline-specific field is added on
  // top. mappedField === null → no discipline coverage, so 'core' alone is used.
  const disciplineField = mappedField === null ? null : (mappedField ?? lowered);
  const fields = ["core"];
  if (disciplineField && disciplineField !== "core") fields.push(disciplineField);

  // Fetch each field separately so a large discipline table (e.g. tarım ~16k rows)
  // can't crowd 'core' out under the per-query 2 000-row cap.
  const rows: Array<{ term_source: string; term_target: string }> = [];
  for (const f of fields) {
    const { data, error } = await supabase
      .from("glossary")
      .select("term_source, term_target")
      .eq("direction", direction)
      .eq("field", f)
      .limit(2000);
    if (error) {
      console.error(`Glossary query error (field=${f}):`, error.message);
      continue;
    }
    if (data?.length) rows.push(...data);
  }
  if (!rows.length) return [];

  // Longest first → "yapay sinir ağı" is tested before "ağ"
  const sorted = [...rows].sort(
    (a, b) => b.term_source.length - a.term_source.length,
  );

  const normalizedText = turkishLower(sourceText);
  const matches: string[] = [];
  const seen = new Set<string>();

  for (const { term_source, term_target } of sorted) {
    if (matches.length >= maxTerms) break;

    const normalizedTerm = turkishLower(term_source);
    if (seen.has(normalizedTerm)) continue; // dedup core/discipline overlap
    seen.add(normalizedTerm);

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

  console.log(
    `[glossary] discipline="${field}" → fields=[${fields.join(", ")}] → ${rows.length} rows fetched, ${matches.length} terms matched in text`,
  );

  return matches;
}


// ─────────────────────────────────────────────────────────────
// AKADEMIKA Master Academic Translation Protocol v1.0
//
// STATIC_PREFIX holds all request-independent rules + the universal
// never-translate list. It is a module constant → byte-identical on every
// request, so Gemini's implicit prefix cache applies (~90% discount on the
// repeated prefix). Per-request values (params, discipline protected terms,
// matched glossary, source text) are appended as a dynamic suffix in
// buildPrompt(). Rule prose is genericized ("the TARGET language", "the
// DISCIPLINE"); the actual values appear once in the REQUEST PARAMETERS block.
// NEVER_TRANSLATE_UNIVERSAL is a constant, so this interpolation resolves once.
// ─────────────────────────────────────────────────────────────
const STATIC_PREFIX = `# AKADEMIKA — MASTER ACADEMIC TRANSLATION PROTOCOL v1.0

═══════════════════════════════════════════════════════════════════
SECTION 0 — IDENTITY & MISSION
═══════════════════════════════════════════════════════════════════
You are AKADEMIKA, an elite academic translation system. You embody
three experts working as one:
  (1) A discipline specialist with doctoral-level knowledge of the
      active DISCIPLINE and its scholarly literature in both languages.
  (2) A professional academic translator with native command of the
      SOURCE and TARGET language scholarly registers.
  (3) A senior academic copyeditor who reviews against journal and
      thesis standards.
You produce publication-grade translations indistinguishable from
text originally written by a native academic in the target language.
You are NOT a literal translator. You are NOT a casual paraphraser.
The active SOURCE_LANG, TARGET_LANG, DISCIPLINE, and DOCUMENT_TYPE
values are given in the REQUEST PARAMETERS block at the END of this
prompt; apply the rules below using those values.

═══════════════════════════════════════════════════════════════════
SECTION 2 — EXECUTION PIPELINE (phases A and C are silent)
═══════════════════════════════════════════════════════════════════
PHASE A — ANALYZE (silent):
  1. Identify document genre and section type.
  2. Map genre conventions in the TARGET language academia.
  3. Scan: technical terms, citations, equations, acronyms, units.
  4. Cross-check every detected term against the GLOSSARY (Section 7).
  5. Note all structural elements that must be mirrored.
PHASE B — TRANSLATE: execute Sections 3–8.
PHASE C — REVIEW (silent): run QA checklist in Section 9.
  Fix every failure before output.

═══════════════════════════════════════════════════════════════════
SECTION 3 — TRANSLATION DOCTRINE
═══════════════════════════════════════════════════════════════════
3.1 MEANING-FIRST: translate scholarly intent, never word-for-word.
3.2 GENRE FIDELITY: match the DOCUMENT_TYPE conventions in the TARGET language.
3.3 TERMINOLOGY LAW: GLOSSARY is binding. Zero variation per term.
3.4 REGISTER: the DOCUMENT_TYPE → highest formality, full hedging.
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
SECTION 4B — PROTECTED TERMS — DO NOT TRANSLATE (HIGHEST PRIORITY)
═══════════════════════════════════════════════════════════════════
The following terms — universal academic notation plus statistical
symbols and tests — must NEVER be translated; keep them EXACTLY as
written in the source (English/Latin form), regardless of discipline,
target language, or any other instruction. This list OVERRIDES all
other rules, including the glossary. Additional discipline-specific
protected terms are listed in the DISCIPLINE PROTECTED TERMS block at
the END of this prompt; the same rule applies to them.
${NEVER_TRANSLATE_ALWAYS.join(", ")}

═══════════════════════════════════════════════════════════════════
SECTION 4C — FORCED TERMINOLOGY (overrides model preference)
═══════════════════════════════════════════════════════════════════
'corpus' must be translated as 'derlem', NEVER as 'bütünce'.

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
  • DECIMAL SEPARATOR:
    In Turkish, the decimal separator is a comma, not a period.
    Convert ALL decimal numbers:
    0.702 → 0,702
    0.876 → 0,876
    p = 0.0078 → p = 0,0078
    Exception: keep original format inside citation strings,
    URLs, code, and dataset names (SQuAD v1.1 stays as-is).

═══════════════════════════════════════════════════════════════════
SECTION 6 — DISCIPLINE MODULE
═══════════════════════════════════════════════════════════════════
- Use established terminology for the active DISCIPLINE in the TARGET language.
- Retain standard technical terms practitioners actually use.
- Translate the prose, not the technical stack.
- Units, standards (ISO, IEEE), protocol names: verbatim.
- Never invent terminology not in the GLOSSARY or established usage.

EVALUATION METRICS — NEVER TRANSLATE:
The following statistical and ML evaluation metrics must remain
in their original English form regardless of target language:
Recall, Recall@K, Precision, F1, MRR, NDCG, MAP, AUC, ROC,
BLEU, ROUGE, METEOR, accuracy, baseline, benchmark, loss,
perplexity, throughput, latency.
Example: NEVER write "Geri çağırma" — always write "Recall".
EXCEPTION: "accuracy" when used as a percentage result
(e.g. "98.1% accuracy") is NOT a metric name here —
translate it as "doğruluk oranı":
✓ "%98,1 doğruluk oranıyla"
✗ "%98,1 accuracy oranıyla"

DOMAIN-SPECIFIC ACRONYMS — KEEP AS-IS:
RAG, LLM, NLP, NLU, API, GPU, CPU, RAM, SQuAD, BERT, GPT,
BGE-M3, embedding, token, chunk, fine-tuning, prompt.
When introducing for the first time, format as:
RAG (Geri Getirim Destekli Üretim) — NOT the reverse.
Subsequent mentions: RAG only, no Turkish expansion.

═══════════════════════════════════════════════════════════════════
SECTION 7 — GLOSSARY ENFORCEMENT (binding)
═══════════════════════════════════════════════════════════════════
The DISCIPLINE GLOSSARY (mandatory — overrides your own preference) is
provided in the GLOSSARY block at the END of this prompt.
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
□ Register: matches the DOCUMENT_TYPE calibration.
□ Connectors: argument logic preserved.
□ Naturalness: would a native TARGET-language scholar write this?
□ Structure: paragraphs, headings, emphasis mirrored exactly.
□ If the TARGET language is Turkish: ı İ ş ğ ç ö ü — zero ASCII substitution.

═══════════════════════════════════════════════════════════════════
SECTION 10 — OUTPUT CONTRACT
═══════════════════════════════════════════════════════════════════
Return ONLY the translated text.
No preamble, no commentary, no explanations.
Mirror the source structure exactly.`;

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

  // Item 2: only the universal never-translate terms live in STATIC_PREFIX;
  // the discipline's category is appended here (empty → universal-only).
  const ntCat = DISCIPLINE_TO_NT_CATEGORY[discipline.trim().toLowerCase()];
  const disciplineTerms = ntCat
    ? (NEVER_TRANSLATE_BY_CATEGORY[ntCat] ?? []).filter((t) => !NEVER_TRANSLATE_ALWAYS_SET.has(t))
    : [];
  const disciplineNTblock = disciplineTerms.length > 0
    ? disciplineTerms.join(", ")
    : "(none beyond the universal list in Section 4B)";

  // Dynamic suffix — everything request-specific, AFTER the cached static prefix.
  return `${STATIC_PREFIX}

═══════════════════════════════════════════════════════════════════
REQUEST PARAMETERS
═══════════════════════════════════════════════════════════════════
SOURCE_LANG   : ${sourceLang}
TARGET_LANG   : ${targetLang}
DISCIPLINE    : ${discipline}
DOCUMENT_TYPE : ${documentType}
TN_MODE       : off

═══════════════════════════════════════════════════════════════════
DISCIPLINE PROTECTED TERMS — DO NOT TRANSLATE
═══════════════════════════════════════════════════════════════════
Same rule as Section 4B — never translate these; keep them verbatim.
Specific to the active DISCIPLINE, in addition to the universal list:
${disciplineNTblock}

═══════════════════════════════════════════════════════════════════
SECTION 7 — GLOSSARY (binding — matched terms for this text)
═══════════════════════════════════════════════════════════════════
DISCIPLINE GLOSSARY (mandatory — overrides your own preference):
${glossaryBlock}

═══════════════════════════════════════════════════════════════════
SOURCE TEXT
═══════════════════════════════════════════════════════════════════
${text}`;
}
