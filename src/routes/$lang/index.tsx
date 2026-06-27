import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight, FileText, BookOpen, Layers, Sparkles,
  Check, X, Quote, GraduationCap, Stethoscope, Scale,
  Cpu, FlaskConical, Landmark, Globe2, Languages,
  ShieldCheck, Upload, Wand2, Download, LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { translations, type Lang } from "../../i18n";
import { Logo } from "../../components/logo";
import { LangToggle } from "../../components/lang-toggle";
import { useAuth } from "../../contexts/auth-context";
import { signOut } from "../../lib/auth";
import { displayName } from "../../lib/user-utils";

export const Route = createFileRoute("/$lang/")({
  head: () => ({
    meta: [
      { title: "Akademika Çeviri — Akademisyen gibi çeviren yapay zekâ" },
      { name: "description", content: "Akademik bağlamı ve terminolojiyi koruyan yapay zekâ destekli çeviri platformu." },
    ],
  }),
  component: Landing,
});

function useLang() {
  const { lang } = Route.useParams();
  return { lang: lang as Lang, t: translations[lang as Lang] };
}

/* ── Landing ─────────────────────────────────────────── */
function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Trust />
      <WhyDifferent />
      <Compare />
      <Disciplines />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────── */
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <a href={`/${lang}`} className="shrink-0"><Logo /></a>

        <nav className="flex items-center gap-8 text-sm text-muted-foreground max-md:hidden">
          <a href="#ozellikler" className="transition-colors hover:text-foreground">{t.nav_features}</a>
          <a href="#disiplinler" className="transition-colors hover:text-foreground">{t.nav_disciplines}</a>
          <a href="#fiyatlandirma" className="transition-colors hover:text-foreground">{t.nav_pricing}</a>
          <a href="#sss" className="transition-colors hover:text-foreground">{t.nav_faq}</a>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground max-sm:hidden">
                {displayName(user)}
              </span>
              <a
                href={`/${lang}/translate`}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover md:px-4 md:py-2"
              >
                <Languages className="h-4 w-4" />
                <span className="max-sm:hidden">{lang === "tr" ? "Çeviri" : "Translate"}</span>
              </a>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="max-sm:hidden">{lang === "tr" ? "Çıkış" : "Sign out"}</span>
              </button>
            </>
          ) : (
            <>
              <a href={`/${lang}/login`} className="text-sm font-medium text-foreground/80 hover:text-foreground max-md:hidden">
                {t.nav_login}
              </a>
              <a
                href={`/${lang}/login`}
                className="inline-flex min-h-11 items-center rounded-md border border-border px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground md:hidden"
              >
                {lang === "tr" ? "Giriş Yap" : "Log in"}
              </a>
              <a
                href={`/${lang}/register`}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover md:px-4 md:py-2 max-md:hidden"
              >
                {t.nav_cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </>
          )}
          <div className="max-sm:hidden">
            <LangToggle lang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────── */
function Hero() {
  const { lang, t } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFreeTrialClick = () => {
    if (user) {
      navigate({ to: "/$lang/translate", params: { lang } });
    } else {
      navigate({ to: "/$lang/register", params: { lang } });
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-accent-soft/40 via-background to-background" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24 lg:gap-20">
        <div className="flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {t.hero_badge}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {t.hero_h1_pre}{" "}
            <span className="italic text-primary">{t.hero_h1_em}</span>{" "}
            {t.hero_h1_post}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.hero_p}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleFreeTrialClick}
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-paper transition-all hover:bg-primary-hover hover:shadow-lift">
              {t.hero_cta1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a href={user ? `/${lang}/translate` : `/${lang}/register`}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary">
              <Upload className="h-4 w-4" />
              {t.hero_cta2}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {[t.hero_trust1, t.hero_trust2, t.hero_trust3].map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" /> {s}
              </span>
            ))}
          </motion.div>
        </div>
        <HeroDemo />
      </div>
    </section>
  );
}

function HeroDemo() {
  const { t } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-linear-to-br from-primary/10 via-accent/10 to-transparent blur-2xl" />
      <div className="rounded-2xl border border-border bg-card p-5 shadow-lift">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Languages className="h-3.5 w-3.5" /> {t.demo_dir}
          </div>
          <div className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            {t.demo_field}
          </div>
        </div>
        <div className="rounded-lg bg-secondary/50 p-4 font-sans text-sm leading-relaxed">
          <p className="text-muted-foreground">
            "The <em>stress concentration factor</em> increases significantly near the notch root,
            requiring <em>fatigue life</em> assessment via the S-N curve methodology."
          </p>
        </div>
        <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-destructive">
            <X className="h-3.5 w-3.5" /> {t.demo_bad}
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            "<span className="bg-destructive/15 underline decoration-destructive decoration-wavy">Vurgu yoğunluk etkeni</span> kertik kökü yakınında önemli ölçüde artar, S-N eğrisi yöntemiyle{" "}
            <span className="bg-destructive/15 underline decoration-destructive decoration-wavy">yorgunluk yaşamı</span> değerlendirmesi gerektirir."
          </p>
        </div>
        <div className="mt-3 rounded-lg border border-success/30 bg-success/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-success">
            <Check className="h-3.5 w-3.5" /> {t.demo_good}
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            "<strong>Gerilme yoğunlaşma faktörü</strong>, çentik kökü civarında belirgin biçimde artar ve S-N eğrisi metodolojisi ile <strong>yorulma ömrü</strong> değerlendirmesi yapılmasını gerektirir."
          </p>
          <div className="mt-3 border-t border-success/20 pt-3">
            <div className="text-xs font-medium text-muted-foreground">📚 {t.demo_glossary}</div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-xs">
              <code className="rounded bg-card px-1.5 py-0.5 text-[11px]">stress concentration</code>
              <span className="text-foreground">gerilme yoğunlaşma</span>
              <code className="rounded bg-card px-1.5 py-0.5 text-[11px]">fatigue life</code>
              <span className="text-foreground">yorulma ömrü</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Trust ───────────────────────────────────────────── */
function Trust() {
  const { t } = useLang();
  const unis = ["İTÜ", "Boğaziçi", "ODTÜ", "Hacettepe", "Ankara Üni.", "Bilkent", "Koç", "Sabancı"];
  return (
    <section className="border-y border-border/60 bg-secondary/30 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">{t.trust_label}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-muted-foreground/80">
          {unis.map((u) => <span key={u} className="font-display text-base tracking-tight">{u}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ── Why Different ───────────────────────────────────── */
function WhyDifferent() {
  const { t } = useLang();
  const items = [
    { icon: GraduationCap, title: t.why_1_title, body: t.why_1_body },
    { icon: BookOpen,      title: t.why_2_title, body: t.why_2_body },
    { icon: FileText,      title: t.why_3_title, body: t.why_3_body },
  ];
  return (
    <section id="ozellikler" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader eyebrow={t.why_eyebrow} title={t.why_title} sub={t.why_sub} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-7 shadow-paper transition-shadow hover:shadow-lift">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent-foreground">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Compare ─────────────────────────────────────────── */
function Compare() {
  const { t } = useLang();
  const rows: [string, boolean, boolean, boolean][] = [
    [t.cmp_f1, false, false, true],
    [t.cmp_f2, false, false, true],
    [t.cmp_f3, false, false, true],
    [t.cmp_f4, false, false, true],
    [t.cmp_f5, false, true,  true],
    [t.cmp_f6, false, false, true],
  ];
  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow={t.cmp_eyebrow} title={t.cmp_title} sub={t.cmp_sub} />
        <div className="mt-12 overflow-x-auto rounded-xl border border-border bg-card shadow-paper">
          <table className="w-full min-w-135 text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-5 py-4 text-left font-medium text-muted-foreground">{t.cmp_feature_col}</th>
                <th className="px-5 py-4 text-center font-medium text-muted-foreground">Google Translate</th>
                <th className="px-5 py-4 text-center font-medium text-muted-foreground">ChatGPT</th>
                <th className="px-5 py-4 text-center font-display font-semibold text-primary">Akademika Çeviri</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, g, c, a], idx) => (
                <tr key={String(label)} className={idx % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                  <td className="px-5 py-4 font-medium text-foreground">{label}</td>
                  <td className="px-5 py-4 text-center">{cell(g)}</td>
                  <td className="px-5 py-4 text-center">{cell(c)}</td>
                  <td className="px-5 py-4 text-center">{cell(a, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function cell(on: boolean, highlight = false) {
  return on ? (
    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${highlight ? "bg-primary text-primary-foreground" : "bg-success/15 text-success"}`}>
      <Check className="h-4 w-4" />
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
      <X className="h-4 w-4" />
    </span>
  );
}

/* ── Disciplines ─────────────────────────────────────── */
function Disciplines() {
  const { t } = useLang();
  const icons = [Cpu, Stethoscope, Scale, Landmark, FlaskConical, BookOpen, Globe2, GraduationCap];
  return (
    <section id="disiplinler" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader eyebrow={t.disc_eyebrow} title={t.disc_title} sub={t.disc_sub} />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {t.disc_labels.map((label, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-paper">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {(() => { const Icon = icons[i]; return <Icon className="h-5 w-5" />; })()}
            </div>
            <span className="font-medium text-foreground">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── How It Works ────────────────────────────────────── */
function HowItWorks() {
  const { t } = useLang();
  const steps = [
    { icon: Upload,   n: "01", title: t.how_1_title, body: t.how_1_body },
    { icon: Layers,   n: "02", title: t.how_2_title, body: t.how_2_body },
    { icon: Download, n: "03", title: t.how_3_title, body: t.how_3_body },
  ];
  return (
    <section className="border-y border-border/60 bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={t.how_eyebrow} title={t.how_title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-xl border border-border bg-card p-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-3xl font-semibold text-primary/30">{s.n}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────── */
function Testimonials() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader eyebrow={t.test_eyebrow} title={t.test_title} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.testimonials.map((item, i) => (
          <motion.figure key={item.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-7 shadow-paper">
            <Quote className="h-6 w-6 text-accent" />
            <blockquote className="mt-4 text-base leading-relaxed text-foreground">"{item.quote}"</blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <div className="font-semibold text-foreground">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.meta}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ── Pricing ─────────────────────────────────────────── */
function Pricing() {
  const { t } = useLang();
  return (
    <section id="fiyatlandirma" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={t.pricing_eyebrow} title={t.pricing_title} sub={t.pricing_sub} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.plans.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-7 ${p.highlight ? "border-primary bg-card shadow-lift" : "border-border bg-card shadow-paper"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {t.pricing_popular}
                </div>
              )}
              <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <a href="#cta" className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${p.highlight ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "border border-border bg-card text-foreground hover:bg-secondary"}`}>
                {p.cta}
              </a>
              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          {t.pricing_enterprise_pre}{" "}
          <a href="#" className="font-medium text-primary underline-offset-4 hover:underline">{t.pricing_enterprise_link}</a>
        </p>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────── */
function FAQ() {
  const { t } = useLang();
  return (
    <section id="sss" className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeader eyebrow={t.faq_eyebrow} title={t.faq_title} />
      <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
        {t.faq_items.map((item, i) => (
          <details key={i} className="group p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="font-medium text-foreground">{item.q}</span>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────── */
function FinalCTA() {
  const { lang, t } = useLang();
  return (
    <section id="cta" className="px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary via-primary to-primary-hover p-12 text-center text-primary-foreground shadow-lift md:p-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <Wand2 className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">{t.cta_title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80">{t.cta_sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`/${lang}/register`} className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5">
              {t.cta_btn1} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#fiyatlandirma" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-7 py-3.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10">
              {t.cta_btn2}
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-primary-foreground/70">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.cta_trust}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────── */
function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.footer_desc}</p>
          </div>
          {t.footer_cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold text-foreground">{c.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="transition-colors hover:text-foreground">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>{t.footer_copyright}</p>
          <LangToggle lang={lang} />
        </div>
      </div>
    </footer>
  );
}

/* ── Helper ──────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}
