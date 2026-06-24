import { o as __toESM } from "../_runtime.mjs";
import { t as translations } from "./i18n-Ah0KC3wj.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./auth-context-Bgeuh49U.mjs";
import { E as CircleCheck, N as ArrowLeft, b as Eye, o as Sparkles, u as MailCheck, x as EyeOff } from "../_libs/lucide-react.mjs";
import { i as signInWithGoogle, n as Logo, o as signUpWithEmail, t as LangToggle } from "./auth-M2YwN15a.mjs";
import { _ as useNavigate, v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Spinner, t as GoogleIcon } from "./google-icon-cW50lsO2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-B_uDUroU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useLang() {
	const { lang } = useParams({ strict: false });
	return {
		lang,
		t: translations[lang]
	};
}
var STRENGTH_LABELS = {
	tr: [
		"",
		"Zayıf",
		"Orta",
		"İyi",
		"Güçlü"
	],
	en: [
		"",
		"Weak",
		"Fair",
		"Good",
		"Strong"
	]
};
function usePasswordStrength(pass, lang) {
	return (0, import_react.useMemo)(() => {
		if (!pass) return {
			score: 0,
			label: ""
		};
		let score = 0;
		if (pass.length >= 8) score++;
		if (/[A-Z]/.test(pass)) score++;
		if (/[0-9]/.test(pass)) score++;
		if (/[^A-Za-z0-9]/.test(pass)) score++;
		return {
			score,
			label: STRENGTH_LABELS[lang][score]
		};
	}, [pass, lang]);
}
var strengthColors = [
	"",
	"bg-destructive",
	"bg-orange-400",
	"bg-yellow-400",
	"bg-success"
];
function RegisterPage() {
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
		className: "flex min-h-screen flex-row-reverse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden w-[42%] flex-col justify-between overflow-hidden bg-primary p-10 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-bl from-primary via-primary to-[oklch(0.18_0.07_264)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" }),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), t.reg_badge]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold leading-tight text-white",
							children: t.reg_panel_h
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-white/70",
							children: t.reg_panel_sub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-5",
							children: t.reg_panel_features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-white/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-white",
									children: f.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-xs text-white/60",
									children: f.sub
								})] })]
							}, f.title))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-xs font-semibold uppercase tracking-wider text-white/40",
						children: t.reg_plan_preview
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-semibold text-white",
							children: t.reg_plan_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-xs text-white/60",
							children: t.reg_plan_desc
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl font-semibold text-white",
								children: t.reg_plan_price
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-white/50",
								children: t.reg_plan_period
							})]
						})]
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
							children: t.reg_h1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: [
								t.reg_have_account,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `/${lang}/login`,
									className: "font-medium text-primary underline-offset-4 hover:underline",
									children: t.reg_login_link
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, { lang })
					]
				})
			})]
		})]
	});
}
function RegisterForm({ lang }) {
	const t = translations[lang];
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [googleLoading, setGoogleLoading] = (0, import_react.useState)(false);
	const [emailSent, setEmailSent] = (0, import_react.useState)(false);
	const { score, label } = usePasswordStrength(password, lang);
	const isStudent = /\.edu\.tr$|\.edu$/.test(email.split("@")[1] ?? "");
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signUpWithEmail(email, password, name);
			setEmailSent(true);
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			toast.error(translateSignupError(message, lang));
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
			toast.error(message);
			setGoogleLoading(false);
		}
	};
	if (emailSent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 rounded-xl border border-border bg-card p-8 text-center shadow-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "h-7 w-7 text-success" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-foreground",
				children: lang === "tr" ? "E-postanızı kontrol edin" : "Check your email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: lang === "tr" ? `${email} adresine doğrulama bağlantısı gönderdik. Bağlantıya tıklayarak hesabınızı etkinleştirin.` : `We sent a confirmation link to ${email}. Click the link to activate your account.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `/${lang}/login`,
				className: "mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline",
				children: lang === "tr" ? "Giriş sayfasına dön" : "Back to sign in"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "mt-8 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: handleGoogle,
				disabled: googleLoading,
				"aria-label": t.reg_google,
				"aria-busy": googleLoading,
				className: "flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary disabled:opacity-70",
				children: googleLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), t.reg_google] })
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
					htmlFor: "reg-name",
					className: "text-sm font-medium text-foreground",
					children: t.reg_name_label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "reg-name",
					type: "text",
					required: true,
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: t.reg_name_ph,
					className: "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "reg-email",
						className: "text-sm font-medium text-foreground",
						children: t.reg_email_label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "reg-email",
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: t.reg_email_ph,
						className: "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isStudent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						className: "flex items-center gap-1.5 overflow-hidden text-xs text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), t.reg_student_hint]
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "reg-password",
						className: "text-sm font-medium text-foreground",
						children: t.reg_pass_label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "reg-password",
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
					}),
					password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: [
								1,
								2,
								3,
								4
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1 flex-1 rounded-full transition-colors duration-300 ${score >= n ? strengthColors[score] : "bg-muted"}` }, n))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xs font-medium ${score <= 1 ? "text-destructive" : score === 2 ? "text-orange-500" : score === 3 ? "text-yellow-600" : "text-success"}`,
							children: label
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex cursor-pointer items-start gap-2.5 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					required: true,
					className: "mt-0.5 h-4 w-4 cursor-pointer rounded border-border accent-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "leading-snug text-muted-foreground",
					children: [
						t.reg_terms_pre,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							children: t.reg_terms_link
						}),
						" ",
						t.reg_terms_and,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							children: t.reg_privacy_link
						}),
						t.reg_terms_post
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: loading,
				"aria-busy": loading,
				className: "flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-paper transition-colors hover:bg-primary-hover disabled:opacity-70",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : t.reg_submit
			})
		]
	});
}
function translateSignupError(message, lang) {
	for (const [key, translations] of Object.entries({
		"User already registered": {
			tr: "Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.",
			en: "This email is already registered. Try signing in."
		},
		"Password should be at least 6 characters": {
			tr: "Şifre en az 6 karakter olmalıdır.",
			en: "Password must be at least 6 characters."
		},
		"Unable to validate email address": {
			tr: "Geçerli bir e-posta adresi girin.",
			en: "Please enter a valid email address."
		}
	})) if (message.includes(key)) return translations[lang];
	return lang === "tr" ? "Bir hata oluştu. Tekrar deneyin." : "An error occurred. Please try again.";
}
//#endregion
export { RegisterPage as default };
