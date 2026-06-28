import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy, Check, Loader2, ArrowRightLeft, AlertCircle,
  Languages, LogOut, TriangleAlert, FileUp, Download, X,
} from "lucide-react";
import { toast } from "sonner";
import type { Lang } from "../../../i18n";
import { Logo } from "../../../components/logo";
import { LangToggle } from "../../../components/lang-toggle";
import { translateViaEdgeFunction } from "../../../lib/translate-api";
import { signOut } from "../../../lib/auth";
import { useAuth } from "../../../contexts/auth-context";
import { buildTranslatedDocx } from "../../../lib/docx-utils";
import { countWords } from "../../../lib/text-utils";
import { displayName } from "../../../lib/user-utils";
import { useDocxUpload } from "../../../hooks/use-docx-upload";
import { useWordBalance } from "../../../hooks/use-word-balance";

export const Route = createFileRoute("/$lang/_protected/translate")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: TranslatePage,
});

// ── Static data ──────────────────────────────────────────────────────────────

const DIRECTIONS = [
  { value: "tr2en" as const, sourceLang: "Turkish",  targetLang: "English", sourceLabel: "Türkçe",  targetLabel: "English" },
  { value: "en2tr" as const, sourceLang: "English",  targetLang: "Turkish", sourceLabel: "English", targetLabel: "Türkçe"  },
];

const DISCIPLINES = [
  { value: "arkeoloji",    tr: "Arkeoloji",             en: "Archaeology" },
  { value: "biyoloji",     tr: "Biyoloji",              en: "Biology" },
  { value: "bilgisayar",   tr: "Bilgisayar Bilimleri",  en: "Computer Science" },
  { value: "coğrafya",     tr: "Coğrafya",              en: "Geography" },
  { value: "çevre",        tr: "Çevre Mühendisliği",    en: "Environmental Engineering" },
  { value: "dilbilim",     tr: "Dilbilim",              en: "Linguistics" },
  { value: "eczacılık",    tr: "Eczacılık",             en: "Pharmacy" },
  { value: "eğitim",       tr: "Eğitim",                en: "Education" },
  { value: "felsefe",      tr: "Felsefe",               en: "Philosophy" },
  { value: "fizik",        tr: "Fizik",                 en: "Physics" },
  { value: "hemşirelik",   tr: "Hemşirelik",            en: "Nursing" },
  { value: "hukuk",        tr: "Hukuk",                 en: "Law" },
  { value: "iktisat",      tr: "İktisat",               en: "Economics" },
  { value: "iletişim",     tr: "İletişim",              en: "Communication" },
  { value: "işletme",      tr: "İşletme",               en: "Business" },
  { value: "kimya",        tr: "Kimya",                 en: "Chemistry" },
  { value: "matematik",    tr: "Matematik",             en: "Mathematics" },
  { value: "mimarlık",     tr: "Mimarlık",              en: "Architecture" },
  { value: "mühendislik",  tr: "Mühendislik",           en: "Engineering" },
  { value: "psikoloji",    tr: "Psikoloji",             en: "Psychology" },
  { value: "siyaset",      tr: "Siyaset Bilimi",        en: "Political Science" },
  { value: "sosyoloji",    tr: "Sosyoloji",             en: "Sociology" },
  { value: "tarih",        tr: "Tarih",                 en: "History" },
  { value: "tıp",          tr: "Tıp",                   en: "Medicine" },
  { value: "veterinerlik", tr: "Veterinerlik",          en: "Veterinary Science" },
  { value: "ziraat",       tr: "Ziraat",                en: "Agriculture" },
];

const DOCUMENT_TYPES = [
  { value: "journal_article", tr: "Makale",      en: "Journal Article" },
  { value: "thesis_chapter",  tr: "Tez Bölümü",  en: "Thesis Chapter"  },
  { value: "abstract",        tr: "Özet",        en: "Abstract"        },
  { value: "assignment",      tr: "Ödev",        en: "Assignment"      },
];


const WORD_SOFT_LIMIT = 1500;

// ── Page ─────────────────────────────────────────────────────────────────────

function TranslatePage() {
  const { lang } = Route.useParams();
  const L = lang as Lang;
  const tr = L === "tr";
  const { user } = useAuth();

  // ── Form state ────────────────────────────────────────────────────────────
  const [dirIdx, setDirIdx] = useState(0);
  const [sourceText, setSourceText] = useState("");
  const [discipline, setDiscipline] = useState(DISCIPLINES[0].value);
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0].value);

  // ── Translate state ───────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // ── Upload (docx) ─────────────────────────────────────────────────────────
  const {
    uploadedFileName,
    isDragging,
    fileExtracting,
    fileInputRef,
    handleFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearFile,
  } = useDocxUpload({
    tr,
    onText: (text) => {
      setSourceText(text);
      setResult(null);
      setTxError(null);
    },
    onClear: () => {
      setSourceText("");
      setResult(null);
      setTxError(null);
    },
  });

  // ── Word balance ──────────────────────────────────────────────────────────
  const { wordsRemaining, setWordsRemaining } = useWordBalance(user);

  // ── Derived ───────────────────────────────────────────────────────────────
  const dir = DIRECTIONS[dirIdx];
  const wordCount = countWords(sourceText);
  const canTranslate = sourceText.trim().length > 0 && !loading;

  // ── Main handlers ─────────────────────────────────────────────────────────
  const handleSwap = () => {
    setDirIdx((i) => (i === 0 ? 1 : 0));
    setSourceText("");
    setResult(null);
    setTxError(null);
    setUploadedFileName(null);
  };

  const handleTranslate = async () => {
    if (!canTranslate) return;
    setLoading(true);
    setTxError(null);
    setResult(null);

    try {
      const res = await translateViaEdgeFunction({
        source_text: sourceText,
        source_lang: dir.sourceLang,
        target_lang: dir.targetLang,
        discipline,
        document_type: documentType,
      });
      setResult(res.translated_text);
      setWordsRemaining(res.words_remaining);
      toast.success(tr ? "Çeviri tamamlandı." : "Translation complete.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const isLimit = msg.includes("limit") || msg.includes("429");
      const errMsg = isLimit
        ? (tr
            ? "Aylık kelime limitinize ulaştınız. Lütfen planınızı yükseltin."
            : "Monthly word limit reached. Please upgrade your plan.")
        : (tr
            ? "Çeviri başarısız oldu. Lütfen tekrar deneyin."
            : "Translation failed. Please try again.");
      setTxError(errMsg);
      toast.error(tr ? "Hata oluştu." : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const RTL_LANGS = new Set(["Arabic", "Hebrew", "Persian", "Urdu"]);

  const handleDownload = async () => {
    if (!result) return;
    try {
      await buildTranslatedDocx(result, uploadedFileName ?? "translation", RTL_LANGS.has(dir.targetLang));
    } catch {
      toast.error(tr ? "İndirme hatası oluştu." : "Download failed.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(tr ? "Çıkış yapıldı." : "Signed out.");
    } catch {
      toast.error(tr ? "Hata oluştu." : "An error occurred.");
    }
  };

  const userName = displayName(user);


  // ── Balance badge style ───────────────────────────────────────────────────
  const balanceColor =
    wordsRemaining === null       ? "text-muted-foreground"
    : wordsRemaining < 500        ? "text-destructive"
    : wordsRemaining < 2_000      ? "text-orange-500"
    : "text-primary";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background">

      {/* ── App bar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 md:px-6">
          <div className="flex shrink-0 items-center gap-4">
            <a href={`/${lang}`}><Logo /></a>
            <span className="block h-5 w-px bg-border max-sm:hidden" />
            <span className="block text-sm font-medium text-primary max-sm:hidden">
              {tr ? "Çeviri" : "Translate"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 sm:flex">
              <span className="text-xs text-muted-foreground">{tr ? "Kalan:" : "Left:"}</span>
              <span className={`text-xs font-semibold tabular-nums ${balanceColor}`}>
                {wordsRemaining === null ? "…" : wordsRemaining.toLocaleString()}
              </span>
            </div>

            <span className="max-w-35 max-sm:hidden truncate text-sm text-muted-foreground">
              {userName}
            </span>

            <LangToggle lang={L} />

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="max-sm:hidden">{tr ? "Çıkış" : "Sign out"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8">

        {/* Page title + controls row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              {tr ? "Akademik Çeviri" : "Academic Translation"}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {tr
                ? "Terminoloji korumalı, yayın kalitesinde çeviri"
                : "Terminology-accurate, publication-grade translation"}
            </p>
          </div>

          <div className="flex w-full flex-wrap items-start gap-2 md:w-auto">
            <div className="flex flex-1 flex-col gap-1 md:flex-none">
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
              >
                {DISCIPLINES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {tr ? d.tr : d.en}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                {tr
                  ? "Doğru terminoloji için metninize en uygun alanı seçin"
                  : "Select the field closest to your text for accurate terminology"}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-1 md:flex-none">
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
              >
                {DOCUMENT_TYPES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {tr ? d.tr : d.en}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                {tr
                  ? "Çeviri stilini belirlemek için belge türünü seçin"
                  : "Select document type to match the translation style"}
              </p>
            </div>
          </div>
        </div>

        {/* Direction toggle */}
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground">
            {dir.sourceLabel}
          </div>
          <button
            onClick={handleSwap}
            title={tr ? "Yönü değiştir" : "Swap direction"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
          </button>
          <div className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground">
            {dir.targetLabel}
          </div>
        </div>

        {/* Translation workspace — two columns */}
        <div className="grid gap-4 md:grid-cols-2">

          {/* ── Left: Source ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">

            {/* ── Drag & drop upload zone ── */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex items-center justify-between rounded-xl border-2 border-dashed px-4 py-3 transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5 text-sm">
                <FileUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                {uploadedFileName ? (
                  <span className="truncate font-medium text-foreground" title={uploadedFileName}>
                    {uploadedFileName}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {tr
                      ? ".docx dosyası sürükleyin veya yükleyin"
                      : "Drag a .docx file or click Upload"}
                  </span>
                )}
              </div>

              <div className="ml-3 flex shrink-0 items-center gap-2">
                {uploadedFileName && (
                  <button
                    type="button"
                    onClick={clearFile}
                    title={tr ? "Temizle" : "Clear"}
                    className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={fileExtracting}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
                >
                  {fileExtracting
                    ? <Loader2 className="h-3 w-3 animate-spin" />
                    : <FileUp className="h-3 w-3" />}
                  {tr ? "Belge Yükle" : "Upload"}
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
              />
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder={tr
                  ? "Çevrilecek akademik metni buraya yapıştırın…"
                  : "Paste the academic text to translate here…"}
                className="h-80 w-full resize-none rounded-xl border border-border bg-card p-4 pb-8 text-sm leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/30 md:h-95"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted-foreground/60">
                <span className="tabular-nums">{wordCount.toLocaleString()}</span>
                <span>{tr ? "kelime" : "words"}</span>
              </div>
            </div>

            {/* 1500-word soft limit warning */}
            <AnimatePresence>
              {wordCount > WORD_SOFT_LIMIT && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700 dark:border-orange-800/40 dark:bg-orange-900/20 dark:text-orange-400">
                    <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {tr
                        ? "Uzun dosyalar yakında desteklenecek. Şimdilik daha kısa bir metin deneyin."
                        : "Long files will be supported soon. Try a shorter text for now."}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Translate button */}
            <button
              onClick={handleTranslate}
              disabled={!canTranslate}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-paper transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {tr ? "Çevriliyor…" : "Translating…"}
                </>
              ) : (
                <>
                  <Languages className="h-4 w-4" />
                  {tr ? "Çevir" : "Translate"}
                </>
              )}
            </button>
          </div>

          {/* ── Right: Result ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <div className="relative h-80 md:h-95">

              {/* Idle placeholder */}
              {!loading && !result && !txError && (
                <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 text-center">
                  <Languages className="h-10 w-10 text-muted-foreground/20" />
                  <p className="mt-3 max-w-xs text-sm text-muted-foreground/50">
                    {tr
                      ? "Çeviri sonucu burada görünecek"
                      : "Translation result will appear here"}
                  </p>
                </div>
              )}

              {/* Skeleton loader */}
              {loading && (
                <div className="h-full overflow-hidden rounded-xl border border-border bg-card p-4">
                  <div className="space-y-3">
                    {[92, 100, 78, 95, 60, 88, 45, 72, 100, 55].map((w, i) => (
                      <div
                        key={i}
                        className="h-3.5 animate-pulse rounded-full bg-muted"
                        style={{ width: `${w}%`, animationDelay: `${i * 80}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              {!loading && txError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-6 text-center"
                >
                  {txError.includes("limit") || txError.includes("limitinize") ? (
                    <TriangleAlert className="h-10 w-10 text-orange-400" />
                  ) : (
                    <AlertCircle className="h-10 w-10 text-destructive/60" />
                  )}
                  <p className="text-sm font-medium text-foreground">{txError}</p>
                  <button
                    onClick={() => setTxError(null)}
                    className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {tr ? "Kapat" : "Dismiss"}
                  </button>
                </motion.div>
              )}

              {/* Result text */}
              <AnimatePresence>
                {!loading && result && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full overflow-auto rounded-xl border border-primary/20 bg-card p-4 text-sm leading-relaxed text-foreground shadow-paper"
                  >
                    {result}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer row: word stats + download + copy */}
            <div className="flex min-h-10 flex-wrap items-center justify-between gap-2">
              <AnimatePresence>
                {result && !loading && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground"
                  >
                    {wordsRemaining !== null && (
                      <>
                        {wordsRemaining.toLocaleString()}{" "}
                        {tr ? "kelime kaldı" : "words remaining"}
                      </>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    {/* Download as Word */}
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary"
                    >
                      <Download className="h-4 w-4" />
                      <span className="max-sm:hidden">{tr ? "Word olarak indir" : "Download as Word"}</span>
                      <span className="sm:hidden">{tr ? "İndir" : "Download"}</span>
                    </button>

                    {/* Copy */}
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-success" />
                          {tr ? "Kopyalandı!" : "Copied!"}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          {tr ? "Kopyala" : "Copy"}
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
