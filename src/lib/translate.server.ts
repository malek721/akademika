import process from "node:process";

import { assemblePrompt, type JobConfig } from "./assemble-prompt.server";
import { countWords } from "./text-utils";

// Calls Gemini via the REST API — the same way the project's Supabase Edge Function
// (supabase/functions/translate/index.ts) does it: model gemini-2.5-flash, GEMINI_API_KEY.
// The project has no Google npm SDK, so we use fetch to stay consistent.
//
// The AKADEMIKA prompt goes in systemInstruction; the source text is the user content.
// Thinking/temperature kept low — the prompt runs its own silent ANALYZE/REVIEW phases
// and contracts the model to output ONLY the translated text.
const TRANSLATION_MODEL = "gemini-2.5-flash";
const MAX_OUTPUT_TOKENS = 8192;

export interface TranslateInput extends JobConfig {
  text: string;
}

export interface TranslateResult {
  translation: string;
  wordCount: number;
  direction: string;
  discipline: string;
  truncated: boolean;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
}

export async function runTranslation(
  input: TranslateInput,
): Promise<TranslateResult> {
  // Read the key per-request (env binds at request time on Nitro/Cloudflare).
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const { text, ...job } = input;
  const system = await assemblePrompt(job);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${TRANSLATION_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
        },
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini ${res.status}: ${detail}`);
  }

  const data = (await res.json()) as GeminiResponse;

  if (data.promptFeedback?.blockReason) {
    throw new Error(
      `The translation request was blocked (${data.promptFeedback.blockReason}).`,
    );
  }

  const candidate = data.candidates?.[0];
  const translation = (candidate?.content?.parts?.[0]?.text ?? "").trim();

  if (!translation) {
    throw new Error("The model returned an empty translation.");
  }

  const truncated = candidate?.finishReason === "MAX_TOKENS";
  if (truncated) {
    console.warn("[translate] output hit maxOutputTokens — translation may be truncated");
  }

  const wordCount = countWords(text);

  return {
    translation,
    wordCount,
    direction: `${job.sourceLang} → ${job.targetLang}`,
    discipline: job.discipline,
    truncated,
  };
}
