import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./auth-context-Bgeuh49U.mjs";
import { C as Download, D as CircleAlert, M as ArrowRightLeft, T as Copy, d as LogOut, f as LoaderCircle, i as TriangleAlert, k as Check, m as Languages, t as X, v as FileUp } from "../_libs/lucide-react.mjs";
import { a as signOut, n as Logo, t as LangToggle } from "./auth-M2YwN15a.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./translate-D-DJHNTH.mjs";
import { t as require_lib } from "../_libs/mammoth+[...].mjs";
import { a as TextRun, i as Paragraph, n as File, r as Packer, t as AlignmentType } from "../_libs/docx.mjs";
import { t as require_FileSaver_min } from "../_libs/file-saver.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translate-BRZSUu37.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_FileSaver_min = require_FileSaver_min();
async function translate(payload) {
	const { data: { session } } = await supabase.auth.getSession();
	if (!session) throw new Error("Not authenticated");
	const response = await fetch(`https://mbclweheyejqdiyiatvz.supabase.co/functions/v1/translate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session.access_token}`,
			apikey: "sb_publishable_5Ows118hy92Il5Gb9AmNhg_DGk9aNa-"
		},
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const err = await response.json().catch(() => ({ error: "Unknown error" }));
		throw new Error(err.error ?? `HTTP ${response.status}`);
	}
	return response.json();
}
async function extractTextFromDocx(file) {
	const arrayBuffer = await file.arrayBuffer();
	const result = await import_lib.extractRawText({ arrayBuffer });
	const errors = result.messages.filter((m) => m.type === "error");
	if (errors.length > 0) throw new Error(`Dosya okunamadı: ${errors[0].message}`);
	const text = result.value.trim();
	if (!text) throw new Error("Dosya boş veya metin içermiyor. Lütfen geçerli bir .docx dosyası yükleyin.");
	return text.split("\n").map((p) => p.trim()).filter(Boolean).join("\n\n");
}
async function buildTranslatedDocx(translatedText, fileName, rtl = false) {
	const doc = new File({ sections: [{
		properties: {},
		children: translatedText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean).map((text) => new Paragraph({
			children: [new TextRun({
				text,
				font: "Calibri",
				size: 22,
				rightToLeft: rtl
			})],
			spacing: {
				line: 276,
				after: 120
			},
			...rtl && {
				alignment: AlignmentType.RIGHT,
				bidirectional: true
			}
		}))
	}] });
	(0, import_FileSaver_min.saveAs)(await Packer.toBlob(doc), `translated_${fileName.replace(/\.docx$/i, "")}.docx`);
}
var PLAN_LIMITS = {
	free: 5e3,
	student: 5e4,
	researcher: 5e5
};
var DIRECTIONS = [{
	value: "tr2en",
	sourceLang: "Turkish",
	targetLang: "English",
	sourceLabel: "Türkçe",
	targetLabel: "English"
}, {
	value: "en2tr",
	sourceLang: "English",
	targetLang: "Turkish",
	sourceLabel: "English",
	targetLabel: "Türkçe"
}];
var DISCIPLINES = [
	{
		value: "arkeoloji",
		tr: "Arkeoloji",
		en: "Archaeology"
	},
	{
		value: "biyoloji",
		tr: "Biyoloji",
		en: "Biology"
	},
	{
		value: "bilgisayar",
		tr: "Bilgisayar Bilimleri",
		en: "Computer Science"
	},
	{
		value: "coğrafya",
		tr: "Coğrafya",
		en: "Geography"
	},
	{
		value: "çevre",
		tr: "Çevre Mühendisliği",
		en: "Environmental Engineering"
	},
	{
		value: "dilbilim",
		tr: "Dilbilim",
		en: "Linguistics"
	},
	{
		value: "eczacılık",
		tr: "Eczacılık",
		en: "Pharmacy"
	},
	{
		value: "eğitim",
		tr: "Eğitim",
		en: "Education"
	},
	{
		value: "felsefe",
		tr: "Felsefe",
		en: "Philosophy"
	},
	{
		value: "fizik",
		tr: "Fizik",
		en: "Physics"
	},
	{
		value: "hemşirelik",
		tr: "Hemşirelik",
		en: "Nursing"
	},
	{
		value: "hukuk",
		tr: "Hukuk",
		en: "Law"
	},
	{
		value: "iktisat",
		tr: "İktisat",
		en: "Economics"
	},
	{
		value: "iletişim",
		tr: "İletişim",
		en: "Communication"
	},
	{
		value: "işletme",
		tr: "İşletme",
		en: "Business"
	},
	{
		value: "kimya",
		tr: "Kimya",
		en: "Chemistry"
	},
	{
		value: "matematik",
		tr: "Matematik",
		en: "Mathematics"
	},
	{
		value: "mimarlık",
		tr: "Mimarlık",
		en: "Architecture"
	},
	{
		value: "mühendislik",
		tr: "Mühendislik",
		en: "Engineering"
	},
	{
		value: "psikoloji",
		tr: "Psikoloji",
		en: "Psychology"
	},
	{
		value: "siyaset",
		tr: "Siyaset Bilimi",
		en: "Political Science"
	},
	{
		value: "sosyoloji",
		tr: "Sosyoloji",
		en: "Sociology"
	},
	{
		value: "tarih",
		tr: "Tarih",
		en: "History"
	},
	{
		value: "tıp",
		tr: "Tıp",
		en: "Medicine"
	},
	{
		value: "veterinerlik",
		tr: "Veterinerlik",
		en: "Veterinary Science"
	},
	{
		value: "ziraat",
		tr: "Ziraat",
		en: "Agriculture"
	}
];
var DOCUMENT_TYPES = [
	{
		value: "journal_article",
		tr: "Makale",
		en: "Journal Article"
	},
	{
		value: "thesis_chapter",
		tr: "Tez Bölümü",
		en: "Thesis Chapter"
	},
	{
		value: "abstract",
		tr: "Özet",
		en: "Abstract"
	},
	{
		value: "assignment",
		tr: "Ödev",
		en: "Assignment"
	}
];
var DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
var WORD_SOFT_LIMIT = 1500;
function TranslatePage() {
	const { lang } = Route.useParams();
	const L = lang;
	const tr = L === "tr";
	const { user } = useAuth();
	const [dirIdx, setDirIdx] = (0, import_react.useState)(0);
	const [sourceText, setSourceText] = (0, import_react.useState)("");
	const [discipline, setDiscipline] = (0, import_react.useState)(DISCIPLINES[0].value);
	const [documentType, setDocumentType] = (0, import_react.useState)(DOCUMENT_TYPES[0].value);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [txError, setTxError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [uploadedFileName, setUploadedFileName] = (0, import_react.useState)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [fileExtracting, setFileExtracting] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [wordsRemaining, setWordsRemaining] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const period = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
		Promise.all([supabase.from("profiles").select("plan").eq("id", user.id).single(), supabase.from("usage").select("words_used").eq("user_id", user.id).eq("period", period).single()]).then(([pRes, uRes]) => {
			setWordsRemaining((PLAN_LIMITS[pRes.data?.plan ?? "free"] ?? PLAN_LIMITS.free) - (uRes.data?.words_used ?? 0));
		});
	}, [user]);
	const dir = DIRECTIONS[dirIdx];
	const wordCount = sourceText.trim().split(/\s+/).filter(Boolean).length;
	const canTranslate = sourceText.trim().length > 0 && !loading;
	const handleFile = async (file) => {
		if (!(file.name.toLowerCase().endsWith(".docx") || file.type === DOCX_MIME)) {
			toast.error(tr ? "Yalnızca .docx dosyaları desteklenir." : "Only .docx files are supported.");
			return;
		}
		setFileExtracting(true);
		try {
			const text = await extractTextFromDocx(file);
			const wc = text.trim().split(/\s+/).filter(Boolean).length;
			setSourceText(text);
			setUploadedFileName(file.name);
			setResult(null);
			setTxError(null);
			toast.success(tr ? `${file.name} yüklendi — ${wc.toLocaleString()} kelime` : `${file.name} uploaded — ${wc.toLocaleString()} words`);
		} catch {
			toast.error(tr ? "Dosya okunamadı." : "Could not read the file.");
		} finally {
			setFileExtracting(false);
		}
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = () => setIsDragging(false);
	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) handleFile(file);
	};
	const clearFile = () => {
		setUploadedFileName(null);
		setSourceText("");
		setResult(null);
		setTxError(null);
	};
	const handleSwap = () => {
		setDirIdx((i) => i === 0 ? 1 : 0);
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
			const res = await translate({
				source_text: sourceText,
				source_lang: dir.sourceLang,
				target_lang: dir.targetLang,
				discipline,
				document_type: documentType
			});
			setResult(res.translated_text);
			setWordsRemaining(res.words_remaining);
			toast.success(tr ? "Çeviri tamamlandı." : "Translation complete.");
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			setTxError(msg.includes("limit") || msg.includes("429") ? tr ? "Aylık kelime limitinize ulaştınız. Lütfen planınızı yükseltin." : "Monthly word limit reached. Please upgrade your plan." : tr ? "Çeviri başarısız oldu. Lütfen tekrar deneyin." : "Translation failed. Please try again.");
			toast.error(tr ? "Hata oluştu." : "An error occurred.");
		} finally {
			setLoading(false);
		}
	};
	const handleCopy = async () => {
		if (!result) return;
		await navigator.clipboard.writeText(result);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	const RTL_LANGS = new Set([
		"Arabic",
		"Hebrew",
		"Persian",
		"Urdu"
	]);
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
	const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "";
	const balanceColor = wordsRemaining === null ? "text-muted-foreground" : wordsRemaining < 500 ? "text-destructive" : wordsRemaining < 2e3 ? "text-orange-500" : "text-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `/${lang}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-5 w-px bg-border max-sm:hidden" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium text-primary max-sm:hidden",
							children: tr ? "Çeviri" : "Translate"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: tr ? "Kalan:" : "Left:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-xs font-semibold tabular-nums ${balanceColor}`,
								children: wordsRemaining === null ? "…" : wordsRemaining.toLocaleString()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "max-w-35 max-sm:hidden truncate text-sm text-muted-foreground",
							children: displayName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, { lang: L }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSignOut,
							className: "flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-sm:hidden",
								children: tr ? "Çıkış" : "Sign out"
							})]
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold text-foreground",
						children: tr ? "Akademik Çeviri" : "Academic Translation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted-foreground",
						children: tr ? "Terminoloji korumalı, yayın kalitesinde çeviri" : "Terminology-accurate, publication-grade translation"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full flex-wrap items-center gap-2 md:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: discipline,
							onChange: (e) => setDiscipline(e.target.value),
							className: "flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30 md:flex-none",
							children: DISCIPLINES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d.value,
								children: tr ? d.tr : d.en
							}, d.value))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: documentType,
							onChange: (e) => setDocumentType(e.target.value),
							className: "flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30 md:flex-none",
							children: DOCUMENT_TYPES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d.value,
								children: tr ? d.tr : d.en
							}, d.value))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground",
							children: dir.sourceLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleSwap,
							title: tr ? "Yönü değiştir" : "Swap direction",
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-secondary px-3 py-1.5 text-sm font-semibold text-foreground",
							children: dir.targetLabel
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onDragOver: handleDragOver,
								onDragLeave: handleDragLeave,
								onDrop: handleDrop,
								className: `flex items-center justify-between rounded-xl border-2 border-dashed px-4 py-3 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 items-center gap-2.5 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), uploadedFileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-medium text-foreground",
											title: uploadedFileName,
											children: uploadedFileName
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: tr ? ".docx dosyası sürükleyin veya yükleyin" : "Drag a .docx file or click Upload"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ml-3 flex shrink-0 items-center gap-2",
										children: [uploadedFileName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: clearFile,
											title: tr ? "Temizle" : "Clear",
											className: "rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => fileInputRef.current?.click(),
											disabled: fileExtracting,
											className: "flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60",
											children: [fileExtracting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "h-3 w-3" }), tr ? "Belge Yükle" : "Upload"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileInputRef,
										type: "file",
										accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
										className: "hidden",
										onChange: (e) => {
											const file = e.target.files?.[0];
											if (file) handleFile(file);
											e.target.value = "";
										}
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: sourceText,
									onChange: (e) => setSourceText(e.target.value),
									placeholder: tr ? "Çevrilecek akademik metni buraya yapıştırın…" : "Paste the academic text to translate here…",
									className: "h-80 w-full resize-none rounded-xl border border-border bg-card p-4 pb-8 text-sm leading-relaxed text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/30 md:h-95"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-3 right-3 flex items-center gap-1 text-xs text-muted-foreground/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: wordCount.toLocaleString()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr ? "kelime" : "words" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: wordCount > WORD_SOFT_LIMIT && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									height: 0
								},
								animate: {
									opacity: 1,
									height: "auto"
								},
								exit: {
									opacity: 0,
									height: 0
								},
								className: "overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700 dark:border-orange-800/40 dark:bg-orange-900/20 dark:text-orange-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr ? "Uzun dosyalar yakında desteklenecek. Şimdilik daha kısa bir metin deneyin." : "Long files will be supported soon. Try a shorter text for now." })]
								})
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleTranslate,
								disabled: !canTranslate,
								className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-paper transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), tr ? "Çevriliyor…" : "Translating…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4" }), tr ? "Çevir" : "Translate"] })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-80 md:h-95",
							children: [
								!loading && !result && !txError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-10 w-10 text-muted-foreground/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-xs text-sm text-muted-foreground/50",
										children: tr ? "Çeviri sonucu burada görünecek" : "Translation result will appear here"
									})]
								}),
								loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full overflow-hidden rounded-xl border border-border bg-card p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3",
										children: [
											92,
											100,
											78,
											95,
											60,
											88,
											45,
											72,
											100,
											55
										].map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-3.5 animate-pulse rounded-full bg-muted",
											style: {
												width: `${w}%`,
												animationDelay: `${i * 80}ms`
											}
										}, i))
									})
								}),
								!loading && txError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										scale: .97
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									className: "flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-6 text-center",
									children: [
										txError.includes("limit") || txError.includes("limitinize") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-10 w-10 text-orange-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-10 w-10 text-destructive/60" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-foreground",
											children: txError
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setTxError(null),
											className: "text-xs text-muted-foreground underline-offset-4 hover:underline",
											children: tr ? "Kapat" : "Dismiss"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !loading && result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 6
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: { opacity: 0 },
									transition: { duration: .3 },
									className: "h-full overflow-auto rounded-xl border border-primary/20 bg-card p-4 text-sm leading-relaxed text-foreground shadow-paper",
									children: result
								}) })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-10 flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: result && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								className: "text-xs text-muted-foreground",
								children: wordsRemaining !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									wordsRemaining.toLocaleString(),
									" ",
									tr ? "kelime kaldı" : "words remaining"
								] })
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: result && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 4
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: { opacity: 0 },
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleDownload,
									className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "max-sm:hidden",
											children: tr ? "Word olarak indir" : "Download as Word"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sm:hidden",
											children: tr ? "İndir" : "Download"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleCopy,
									className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary",
									children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-success" }), tr ? "Kopyalandı!" : "Copied!"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), tr ? "Kopyala" : "Copy"] })
								})]
							}) })]
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { TranslatePage as component };
