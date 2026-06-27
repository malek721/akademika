import { useState } from "react";
import { Loader2 } from "lucide-react";

import { translateViaServerFn } from "../lib/api/translate.functions";

// Minimal harness for exercising the AKADEMIKA translation server function.
// Drop into any route, e.g.:  <TranslationForm />

const DISCIPLINES = [
  { value: "nlp", label: "NLP" },
  { value: "medicine", label: "Medicine" },
];

const DOCUMENT_TYPES = [
  { value: "thesis", label: "Thesis" },
  { value: "journal", label: "Journal Article" },
  { value: "abstract", label: "Conference Abstract" },
];

const LANGS = ["English", "Turkish"];

export function TranslationForm() {
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Turkish");
  const [discipline, setDiscipline] = useState("nlp");
  const [documentType, setDocumentType] = useState("thesis");
  const [tnMode, setTnMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [meta, setMeta] = useState<{ words: number; direction: string } | null>(
    null,
  );

  const handleTranslate = async () => {
    setError(null);
    setResult("");
    setMeta(null);

    if (!text.trim()) {
      setError("Please enter some text to translate.");
      return;
    }

    setLoading(true);
    try {
      const res = await translateViaServerFn({
        data: { text, sourceLang, targetLang, discipline, documentType, tnMode },
      });
      setResult(res.translation);
      setMeta({ words: res.wordCount, direction: res.direction });
      if (res.truncated) {
        setError("Output reached the token limit and may be truncated.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground";

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <h2 className="font-display text-2xl font-semibold text-foreground">
        AKADEMIKA Translation
      </h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the text to translate…"
        rows={6}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
      />

      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Source
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className={selectClass}
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Target
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className={selectClass}
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Discipline
          <select
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
            className={selectClass}
          >
            {DISCIPLINES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Document Type
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className={selectClass}
          >
            {DOCUMENT_TYPES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 self-end text-sm text-foreground">
          <input
            type="checkbox"
            checked={tnMode}
            onChange={(e) => setTnMode(e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          TN Mode
        </label>
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading}
        className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Translating…" : "Translate"}
      </button>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {result && (
        <div className="flex flex-col gap-1.5">
          {meta && (
            <p className="text-xs text-muted-foreground">
              {meta.direction} · {meta.words} words
            </p>
          )}
          <textarea
            value={result}
            readOnly
            rows={10}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm leading-relaxed text-foreground"
          />
        </div>
      )}
    </div>
  );
}
