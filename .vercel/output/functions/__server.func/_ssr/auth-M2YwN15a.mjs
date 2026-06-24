import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase } from "./auth-context-Bgeuh49U.mjs";
import { O as ChevronDown, S as Earth, k as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-M2YwN15a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Logo({ light = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex h-10 w-10 flex-col items-center justify-center rounded-xl shadow-sm ${light ? "bg-white/15 text-white ring-1 ring-white/20" : "bg-primary text-primary-foreground"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-xl font-semibold leading-none",
				children: "Ç"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-foreground"}`,
				children: "Akademika"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `mt-0.5 text-[10px] font-medium tracking-[0.22em] ${light ? "text-white/60" : "text-muted-foreground"}`,
				children: "ÇEVİRİ"
			})]
		})]
	});
}
var labels = {
	tr: "Türkçe",
	en: "English"
};
function getLangPath(currentPath, currentLang, newLang) {
	return currentPath.replace(new RegExp(`^/(tr|en)(?=/|$)`), `/${newLang}`);
}
function LangToggle({ lang }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const close = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", close);
		return () => document.removeEventListener("mousedown", close);
	}, [open]);
	const currentPath = typeof window !== "undefined" ? window.location.pathname : `/${lang}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "h-4 w-4 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labels[lang] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}` })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lift",
			children: ["tr", "en"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: getLangPath(currentPath, lang, l),
				onClick: () => setOpen(false),
				className: `flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${lang === l ? "font-semibold text-primary" : "text-foreground/80"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-3.5",
					children: lang === l && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
				}), labels[l]]
			}, l))
		})]
	});
}
async function signInWithEmail(email, password) {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	if (error) throw error;
}
async function signUpWithEmail(email, password, fullName) {
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { full_name: fullName } }
	});
	if (error) throw error;
}
async function signInWithGoogle(redirectTo) {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: { redirectTo }
	});
	if (error) throw error;
}
async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
}
//#endregion
export { signOut as a, signInWithGoogle as i, Logo as n, signUpWithEmail as o, signInWithEmail as r, LangToggle as t };
