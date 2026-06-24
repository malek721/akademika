import { t as translations } from "./_ssr/i18n-Ah0KC3wj.mjs";
import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./_ssr/auth-context-Bgeuh49U.mjs";
import { A as BookOpen, C as Download, S as Earth, _ as FlaskConical, a as Stethoscope, c as Scale, d as LogOut, g as GraduationCap, h as Landmark, j as ArrowRight, k as Check, l as Quote, m as Languages, n as WandSparkles, o as Sparkles, p as Layers, r as Upload, s as ShieldCheck, t as X, w as Cpu, y as FileText } from "./_libs/lucide-react.mjs";
import { a as signOut, n as Logo, t as LangToggle } from "./_ssr/auth-M2YwN15a.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_lang-C41bdbdX.mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_lang-CDx2hb6a.js
var import_jsx_runtime = require_jsx_runtime();
function useLang() {
	const { lang } = Route.useParams();
	return {
		lang,
		t: translations[lang]
	};
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trust, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyDifferent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compare, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disciplines, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	const { lang, t } = useLang();
	const { user } = useAuth();
	const handleSignOut = async () => {
		try {
			await signOut();
			toast.success(lang === "tr" ? "Çıkış yapıldı." : "Signed out.");
		} catch {
			toast.error(lang === "tr" ? "Hata oluştu." : "An error occurred.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `/${lang}`,
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-8 text-sm text-muted-foreground max-md:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#ozellikler",
							className: "transition-colors hover:text-foreground",
							children: t.nav_features
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#disiplinler",
							className: "transition-colors hover:text-foreground",
							children: t.nav_disciplines
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#fiyatlandirma",
							className: "transition-colors hover:text-foreground",
							children: t.nav_pricing
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#sss",
							className: "transition-colors hover:text-foreground",
							children: t.nav_faq
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground max-sm:hidden",
							children: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `/${lang}/translate`,
							className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover md:px-4 md:py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-sm:hidden",
								children: lang === "tr" ? "Çeviri" : "Translate"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSignOut,
							className: "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-sm:hidden",
								children: lang === "tr" ? "Çıkış" : "Sign out"
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/${lang}/login`,
						className: "text-sm font-medium text-foreground/80 hover:text-foreground max-sm:hidden",
						children: t.nav_login
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `/${lang}/register`,
						className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover md:px-4 md:py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-sm:hidden",
								children: t.nav_cta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sm:hidden",
								children: lang === "tr" ? "Dene" : "Try"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-sm:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, { lang })
					})]
				})
			]
		})
	});
}
function Hero() {
	const { lang, t } = useLang();
	const { user } = useAuth();
	const navigate = useNavigate();
	const handleFreeTrialClick = () => {
		if (user) navigate({
			to: "/$lang/translate",
			params: { lang }
		});
		else navigate({
			to: "/$lang/register",
			params: { lang }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-linear-to-b from-accent-soft/40 via-background to-background" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24 lg:gap-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .5 },
						className: "mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-accent" }), t.hero_badge]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .05
						},
						className: "font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl",
						children: [
							t.hero_h1_pre,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-primary",
								children: t.hero_h1_em
							}),
							" ",
							t.hero_h1_post
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .15
						},
						className: "mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground",
						children: t.hero_p
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .25
						},
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleFreeTrialClick,
							className: "group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-paper transition-all hover:bg-primary-hover hover:shadow-lift",
							children: [t.hero_cta1, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: user ? `/${lang}/translate` : `/${lang}/register`,
							className: "inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), t.hero_cta2]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							duration: .6,
							delay: .4
						},
						className: "mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground",
						children: [
							t.hero_trust1,
							t.hero_trust2,
							t.hero_trust3
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-success" }),
								" ",
								s
							]
						}, s))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDemo, {})]
		})]
	});
}
function HeroDemo() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 24
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .7,
			delay: .2
		},
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 -z-10 rounded-3xl bg-linear-to-br from-primary/10 via-accent/10 to-transparent blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-card p-5 shadow-lift",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-3.5 w-3.5" }),
							" ",
							t.demo_dir
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-foreground",
						children: t.demo_field
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg bg-secondary/50 p-4 font-sans text-sm leading-relaxed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							"\"The ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "stress concentration factor" }),
							" increases significantly near the notch root, requiring ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "fatigue life" }),
							" assessment via the S-N curve methodology.\""
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2 text-xs font-semibold text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }),
							" ",
							t.demo_bad
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-foreground/80",
						children: [
							"\"",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-destructive/15 underline decoration-destructive decoration-wavy",
								children: "Vurgu yoğunluk etkeni"
							}),
							" kertik kökü yakınında önemli ölçüde artar, S-N eğrisi yöntemiyle",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-destructive/15 underline decoration-destructive decoration-wavy",
								children: "yorgunluk yaşamı"
							}),
							" değerlendirmesi gerektirir.\""
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-lg border border-success/30 bg-success/5 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-2 text-xs font-semibold text-success",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }),
								" ",
								t.demo_good
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm leading-relaxed text-foreground",
							children: [
								"\"",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Gerilme yoğunlaşma faktörü" }),
								", çentik kökü civarında belirgin biçimde artar ve S-N eğrisi metodolojisi ile ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "yorulma ömrü" }),
								" değerlendirmesi yapılmasını gerektirir.\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 border-t border-success/20 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-medium text-muted-foreground",
								children: ["📚 ", t.demo_glossary]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 grid grid-cols-2 gap-1.5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded bg-card px-1.5 py-0.5 text-[11px]",
										children: "stress concentration"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: "gerilme yoğunlaşma"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded bg-card px-1.5 py-0.5 text-[11px]",
										children: "fatigue life"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: "yorulma ömrü"
									})
								]
							})]
						})
					]
				})
			]
		})]
	});
}
function Trust() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border/60 bg-secondary/30 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: t.trust_label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-muted-foreground/80",
				children: [
					"İTÜ",
					"Boğaziçi",
					"ODTÜ",
					"Hacettepe",
					"Ankara Üni.",
					"Bilkent",
					"Koç",
					"Sabancı"
				].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-base tracking-tight",
					children: u
				}, u))
			})]
		})
	});
}
function WhyDifferent() {
	const { t } = useLang();
	const items = [
		{
			icon: GraduationCap,
			title: t.why_1_title,
			body: t.why_1_body
		},
		{
			icon: BookOpen,
			title: t.why_2_title,
			body: t.why_2_body
		},
		{
			icon: FileText,
			title: t.why_3_title,
			body: t.why_3_body
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "ozellikler",
		className: "mx-auto max-w-7xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: t.why_eyebrow,
			title: t.why_title,
			sub: t.why_sub
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-6 md:grid-cols-3",
			children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: .5,
					delay: i * .08
				},
				className: "rounded-xl border border-border bg-card p-7 shadow-paper transition-shadow hover:shadow-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl font-semibold",
						children: it.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: it.body
					})
				]
			}, it.title))
		})]
	});
}
function Compare() {
	const { t } = useLang();
	const rows = [
		[
			t.cmp_f1,
			false,
			false,
			true
		],
		[
			t.cmp_f2,
			false,
			false,
			true
		],
		[
			t.cmp_f3,
			false,
			false,
			true
		],
		[
			t.cmp_f4,
			false,
			false,
			true
		],
		[
			t.cmp_f5,
			false,
			true,
			true
		],
		[
			t.cmp_f6,
			false,
			false,
			true
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-secondary/30 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.cmp_eyebrow,
				title: t.cmp_title,
				sub: t.cmp_sub
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 overflow-x-auto rounded-xl border border-border bg-card shadow-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-135 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border bg-secondary/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 text-left font-medium text-muted-foreground",
								children: t.cmp_feature_col
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 text-center font-medium text-muted-foreground",
								children: "Google Translate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 text-center font-medium text-muted-foreground",
								children: "ChatGPT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-4 text-center font-display font-semibold text-primary",
								children: "Akademika Çeviri"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map(([label, g, c, a], idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: idx % 2 === 0 ? "bg-card" : "bg-secondary/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 font-medium text-foreground",
								children: label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-center",
								children: cell(g)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-center",
								children: cell(c)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-center",
								children: cell(a, true)
							})
						]
					}, String(label))) })]
				})
			})]
		})
	});
}
function cell(on, highlight = false) {
	return on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex h-7 w-7 items-center justify-center rounded-full ${highlight ? "bg-primary text-primary-foreground" : "bg-success/15 text-success"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
	});
}
function Disciplines() {
	const { t } = useLang();
	const icons = [
		Cpu,
		Stethoscope,
		Scale,
		Landmark,
		FlaskConical,
		BookOpen,
		Earth,
		GraduationCap
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "disiplinler",
		className: "mx-auto max-w-7xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: t.disc_eyebrow,
			title: t.disc_title,
			sub: t.disc_sub
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
			children: t.disc_labels.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .4,
					delay: i * .04
				},
				className: "group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
					children: (() => {
						const Icon = icons[i];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" });
					})()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: label
				})]
			}, label))
		})]
	});
}
function HowItWorks() {
	const { t } = useLang();
	const steps = [
		{
			icon: Upload,
			n: "01",
			title: t.how_1_title,
			body: t.how_1_body
		},
		{
			icon: Layers,
			n: "02",
			title: t.how_2_title,
			body: t.how_2_body
		},
		{
			icon: Download,
			n: "03",
			title: t.how_3_title,
			body: t.how_3_body
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border/60 bg-secondary/30 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: t.how_eyebrow,
				title: t.how_title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .5,
						delay: i * .1
					},
					className: "relative rounded-xl border border-border bg-card p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl font-semibold text-primary/30",
								children: s.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: s.body
						})
					]
				}, s.n))
			})]
		})
	});
}
function Testimonials() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: t.test_eyebrow,
			title: t.test_title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-6 md:grid-cols-3",
			children: t.testimonials.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
				initial: {
					opacity: 0,
					y: 16
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .5,
					delay: i * .08
				},
				className: "rounded-xl border border-border bg-card p-7 shadow-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-6 w-6 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "mt-4 text-base leading-relaxed text-foreground",
						children: [
							"\"",
							item.quote,
							"\""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "mt-5 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-foreground",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: item.meta
						})]
					})
				]
			}, item.name))
		})]
	});
}
function Pricing() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "fiyatlandirma",
		className: "bg-secondary/30 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: t.pricing_eyebrow,
					title: t.pricing_title,
					sub: t.pricing_sub
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: t.plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `relative rounded-2xl border p-7 ${p.highlight ? "border-primary bg-card shadow-lift" : "border-border bg-card shadow-paper"}`,
						children: [
							p.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground",
								children: t.pricing_popular
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-semibold",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: p.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-baseline gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-5xl font-semibold",
									children: p.price
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: p.period
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#cta",
								className: `mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${p.highlight ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "border border-border bg-card text-foreground hover:bg-secondary"}`,
								children: p.cta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-7 space-y-3 text-sm",
								children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/90",
										children: f
									})]
								}, f))
							})
						]
					}, p.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-10 text-center text-sm text-muted-foreground",
					children: [
						t.pricing_enterprise_pre,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							children: t.pricing_enterprise_link
						})
					]
				})
			]
		})
	});
}
function FAQ() {
	const { t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "sss",
		className: "mx-auto max-w-3xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			eyebrow: t.faq_eyebrow,
			title: t.faq_title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 divide-y divide-border rounded-xl border border-border bg-card",
			children: t.faq_items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "group p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "flex cursor-pointer list-none items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: item.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45",
						children: "+"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: item.a
				})]
			}, i))
		})]
	});
}
function FinalCTA() {
	const { lang, t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "cta",
		className: "px-6 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary via-primary to-primary-hover p-12 text-center text-primary-foreground shadow-lift md:p-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "mx-auto h-10 w-10 text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl",
							children: t.cta_title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-xl text-base text-primary-foreground/80",
							children: t.cta_sub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `/${lang}/register`,
								className: "inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5",
								children: [
									t.cta_btn1,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#fiyatlandirma",
								className: "inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-7 py-3.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10",
								children: t.cta_btn2
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-center gap-2 text-xs text-primary-foreground/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), t.cta_trust]
						})
					]
				})
			]
		})
	});
}
function Footer() {
	const { lang, t } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border bg-secondary/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: t.footer_desc
					})]
				}), t.footer_cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display text-sm font-semibold text-foreground",
					children: c.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
					children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "transition-colors hover:text-foreground",
						children: l
					}) }, l))
				})] }, c.title))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.footer_copyright }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, { lang })]
			})]
		})
	});
}
function SectionHeader({ eyebrow, title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl",
				children: title
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base leading-relaxed text-muted-foreground",
				children: sub
			})
		]
	});
}
//#endregion
export { Landing as component };
