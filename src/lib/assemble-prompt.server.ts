import { COMPILED_PROMPTS } from "./compiled-prompts.generated";

// Runtime prompt assembly. Reads from the build-time precompiled map
// (compiled-prompts.generated.ts) — NO filesystem access — so the translation path
// works inside a bundled serverless function (Vercel/Nitro). The map is keyed by
// `${directionKey}__${discipline}` and holds the static module composition; the
// dynamic ACTIVE CONFIG header is built per-request below.
//
// The map is produced by scripts/precompile-prompts.ts (npm pre-hooks). The Python
// CLI (AKADEMIKA/assemble.py) remains the local authoring tool.

// English → "en", Turkish → "tr", German → "de" (extend as needed).
const LANG_CODES: Record<string, string> = {
  English: "en",
  Turkish: "tr",
  German: "de",
};

export interface JobConfig {
  sourceLang: string;
  targetLang: string;
  discipline: string;
  documentType: string;
  tnMode: boolean;
  citationStyle: string;
  referenceTitlePolicy: string;
  intextCitationLocale: string;
  /** Project module name (filename in AKADEMIKA/project/, no .md). Defaults to "thesis_q1". */
  project?: string;
}

const DEFAULT_PROJECT = "thesis_q1";

function buildConfigHeader(job: JobConfig): string {
  const cfgLines = [
    `  source: ${job.sourceLang}`,
    `  target: ${job.targetLang}`,
    `  discipline: ${job.discipline}`,
    `  document_type: ${job.documentType}`,
    `  tn_mode: ${job.tnMode ? "on" : "off"}`,
    `  citation_style: ${job.citationStyle}`,
    `  reference_title_policy: ${job.referenceTitlePolicy}`,
    `  intext_citation_locale: ${job.intextCitationLocale}`,
  ].join("\n");
  return (
    "# ===== AKADEMIKA · COMPILED PROMPT (auto-generated — do not edit) =====\n" +
    "# ACTIVE CONFIG\n" +
    cfgLines
  );
}

function directionKeyFor(job: JobConfig): string {
  const src = LANG_CODES[job.sourceLang] ?? job.sourceLang.slice(0, 2).toLowerCase();
  const tgt = LANG_CODES[job.targetLang] ?? job.targetLang.slice(0, 2).toLowerCase();
  return `${src}_${tgt}`; // e.g. "en_tr"
}

export function assemblePrompt(job: JobConfig): string {
  const project = job.project ?? DEFAULT_PROJECT;
  const key = `${directionKeyFor(job)}__${job.discipline}__${project}`;
  const body = COMPILED_PROMPTS[key];
  if (!body) {
    const available = Object.keys(COMPILED_PROMPTS).join(", ") || "(none)";
    throw new Error(
      `No precompiled prompt for "${key}". Available combinations: ${available}`,
    );
  }
  return `${buildConfigHeader(job)}\n${body}`;
}
