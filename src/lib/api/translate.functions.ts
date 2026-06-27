import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { runTranslation } from "../translate.server";

// Server function that assembles the AKADEMIKA prompt and calls Claude. The handler
// body runs server-only — the Anthropic SDK and the disk-reading assembler live in
// .server.ts modules and are tree-shaken from the client bundle.
//
// Call it from the client type-safely: `await translate({ data: { text, ... } })`
// (compiles to a POST endpoint under the hood — no hand-written /api route needed).

const TranslateInputSchema = z.object({
  text: z.string().min(1, "text must be a non-empty string"),
  sourceLang: z.string().default("English"),
  targetLang: z.string().default("Turkish"),
  discipline: z.string().default("nlp"),
  project: z.string().default("thesis_q1"),
  documentType: z.string().default("thesis"),
  tnMode: z.boolean().default(false),
  citationStyle: z.string().default("verbatim"),
  referenceTitlePolicy: z.string().default("keep"),
  intextCitationLocale: z.string().default("localize"),
});

export const translate = createServerFn({ method: "POST" })
  .inputValidator(TranslateInputSchema)
  .handler(async ({ data }) => {
    return runTranslation(data);
  });
