import { o as __toESM } from "../_runtime.mjs";
import { t as translations } from "./i18n-Ah0KC3wj.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./auth-context-Bgeuh49U.mjs";
import { E as CircleCheck, N as ArrowLeft, b as Eye, x as EyeOff } from "../_libs/lucide-react.mjs";
import { i as signInWithGoogle, n as Logo, r as signInWithEmail, t as LangToggle } from "./auth-M2YwN15a.mjs";
import { _ as useNavigate, v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Spinner, t as GoogleIcon } from "./google-icon-cW50lsO2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-C9J8hAd_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useLang() {
	const { lang } = useParams({ strict: false });
	return {
		lang,
		t: translations[lang]
	};
}
function LoginPage() {
	const { lang, t } = useLang();
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({
			to: "/$lang/",
			params: { lang },
			replace: true
		});
	}, [
		user,
		loading,
		navigate,
		lang
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden w-[42%] flex-col justify-between overflow-hidden bg-primary p-10 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-br from-primary via-primary to-[oklch(0.18_0.07_264)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `/${lang}`,
						className: "flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
							" ",
							t.login_back
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold leading-tight text-white",
							children: t.login_panel_h
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-white/70",
							children: t.login_panel_sub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-4",
							children: [
								t.login_feat1,
								t.login_feat2,
								t.login_feat3
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-white/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-white/80",
									children: f
								})]
							}, f))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "relative z-10 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "text-sm leading-relaxed text-white/80",
						children: [
							"\"",
							t.login_quote,
							"\""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-3 text-xs text-white/50",
						children: t.login_quote_by
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-6 py-4 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, { lang })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 items-center justify-center px-6 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .5 },
					className: "w-full max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 hidden items-center justify-end lg:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, { lang })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: t.login_h1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: [
								t.login_no_account,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `/${lang}/register`,
									className: "font-medium text-primary underline-offset-4 hover:underline",
									children: t.login_register_link
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, { lang })
					]
				})
			})]
		})]
	});
}
function LoginForm({ lang }) {
	const t = translations[lang];
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [googleLoading, setGoogleLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signInWithEmail(email, password);
			toast.success(lang === "tr" ? "Giriş başarılı!" : "Signed in successfully!");
			navigate({
				to: "/$lang/",
				params: { lang },
				replace: true
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			toast.error(translateAuthError(message, lang));
		} finally {
			setLoading(false);
		}
	};
	const handleGoogle = async () => {
		setGoogleLoading(true);
		try {
			await signInWithGoogle(`${window.location.origin}/${lang}`);
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			toast.error(translateAuthError(message, lang));
			setGoogleLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "mt-8 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: handleGoogle,
				disabled: googleLoading,
				"aria-label": t.login_google,
				"aria-busy": googleLoading,
				className: "flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary disabled:opacity-70",
				children: googleLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), t.login_google] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: t.login_or
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-border" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "login-email",
					className: "text-sm font-medium text-foreground",
					children: t.login_email_label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "login-email",
					type: "email",
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value),
					placeholder: t.login_email_ph,
					className: "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "login-password",
						className: "text-sm font-medium text-foreground",
						children: t.login_pass_label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "text-xs font-medium text-primary underline-offset-4 hover:underline",
						children: t.login_forgot
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "login-password",
						type: show ? "text" : "password",
						required: true,
						value: password,
						onChange: (e) => setPassword(e.target.value),
						placeholder: "••••••••",
						className: "w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShow((v) => !v),
						"aria-label": show ? lang === "tr" ? "Şifreyi gizle" : "Hide password" : lang === "tr" ? "Şifreyi göster" : "Show password",
						className: "absolute inset-y-0 right-3 flex items-center text-muted-foreground/60 hover:text-foreground",
						children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex cursor-pointer items-center gap-2.5 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					className: "h-4 w-4 cursor-pointer rounded border-border accent-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: t.login_remember
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: loading,
				"aria-busy": loading,
				className: "flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-paper transition-colors hover:bg-primary-hover disabled:opacity-70",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : t.login_submit
			})
		]
	});
}
function translateAuthError(message, lang) {
	for (const [key, translations] of Object.entries({
		"Invalid login credentials": {
			tr: "E-posta veya şifre hatalı.",
			en: "Incorrect email or password."
		},
		"Email not confirmed": {
			tr: "E-postanızı doğrulayın. Gelen kutunuzu kontrol edin.",
			en: "Please confirm your email address. Check your inbox."
		},
		"Too many requests": {
			tr: "Çok fazla deneme. Lütfen bekleyin.",
			en: "Too many attempts. Please wait a moment."
		}
	})) if (message.includes(key)) return translations[lang];
	return lang === "tr" ? "Bir hata oluştu. Tekrar deneyin." : "An error occurred. Please try again.";
}
//#endregion
export { LoginPage as default };
