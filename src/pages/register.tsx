import { useNavigate, useParams } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, CheckCircle2, Sparkles, ArrowLeft, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { translations, type Lang } from "../i18n";
import { Logo } from "../components/logo";
import { LangToggle } from "../components/lang-toggle";
import { signUpWithEmail, signInWithGoogle } from "../lib/auth";
import { useAuth } from "../contexts/auth-context";

function useLang() {
  const { lang } = useParams({ strict: false });
  return { lang: lang as Lang, t: translations[lang as Lang] };
}

function usePasswordStrength(pass: string) {
  return useMemo(() => {
    if (!pass) return { score: 0, label: "" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    const labels = ["", "Zayıf", "Orta", "İyi", "Güçlü"];
    return { score, label: labels[score] };
  }, [pass]);
}

const strengthColors = ["", "bg-destructive", "bg-orange-400", "bg-yellow-400", "bg-success"];

export default function RegisterPage() {
  const { lang, t } = useLang();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/$lang/", params: { lang }, replace: true });
    }
  }, [user, loading, navigate, lang]);

  return (
    <div className="flex min-h-screen flex-row-reverse">
      {/* ── Right panel ── */}
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-primary p-10 lg:flex">
        <div className="absolute inset-0 bg-linear-to-bl from-primary via-primary to-[oklch(0.18_0.07_264)]" />
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">
          <Logo light />
          <a href={`/${lang}`} className="flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {t.login_back}
          </a>
        </div>

        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
            <Sparkles className="h-3.5 w-3.5" />
            {t.reg_badge}
          </div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white">{t.reg_panel_h}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{t.reg_panel_sub}</p>

          <ul className="mt-8 space-y-5">
            {t.reg_panel_features.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white/60" />
                <div>
                  <div className="text-sm font-semibold text-white">{f.title}</div>
                  <div className="mt-0.5 text-xs text-white/60">{f.sub}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">{t.reg_plan_preview}</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-lg font-semibold text-white">{t.reg_plan_name}</div>
              <div className="mt-0.5 text-xs text-white/60">{t.reg_plan_desc}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl font-semibold text-white">{t.reg_plan_price}</div>
              <div className="text-xs text-white/50">{t.reg_plan_period}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Left form ── */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 lg:hidden">
          <Logo />
          <LangToggle lang={lang} />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            <div className="mb-1 hidden items-center justify-end lg:flex">
              <LangToggle lang={lang} />
            </div>

            <h1 className="font-display text-2xl font-semibold text-foreground">{t.reg_h1}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t.reg_have_account}{" "}
              <a href={`/${lang}/login`} className="font-medium text-primary underline-offset-4 hover:underline">
                {t.reg_login_link}
              </a>
            </p>

            <RegisterForm lang={lang} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function RegisterForm({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { score, label } = usePasswordStrength(password);

  const isStudent = /\.edu\.tr$|\.edu$/.test(email.split("@")[1] ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
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
      const redirectTo = `${window.location.origin}/${lang}`;
      await signInWithGoogle(redirectTo);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message);
      setGoogleLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center shadow-paper">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <MailCheck className="h-7 w-7 text-success" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          {lang === "tr" ? "E-postanızı kontrol edin" : "Check your email"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {lang === "tr"
            ? `${email} adresine doğrulama bağlantısı gönderdik. Bağlantıya tıklayarak hesabınızı etkinleştirin.`
            : `We sent a confirmation link to ${email}. Click the link to activate your account.`}
        </p>
        <a
          href={`/${lang}/login`}
          className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {lang === "tr" ? "Giriş sayfasına dön" : "Back to sign in"}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary disabled:opacity-70"
      >
        {googleLoading ? <Spinner /> : <><GoogleIcon />{t.reg_google}</>}
      </button>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground">{t.login_or}</span>
        <div className="flex-1 border-t border-border" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">{t.reg_name_label}</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.reg_name_ph}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">{t.reg_email_label}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.reg_email_ph}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        <AnimatePresence>
          {isStudent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-1.5 overflow-hidden text-xs text-success"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t.reg_student_hint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">{t.reg_pass_label}</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground/60 hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {password && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${score >= n ? strengthColors[score] : "bg-muted"}`}
                />
              ))}
            </div>
            <p className={`text-xs font-medium ${score <= 1 ? "text-destructive" : score === 2 ? "text-orange-500" : score === 3 ? "text-yellow-600" : "text-success"}`}>
              {label}
            </p>
          </div>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-sm">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 cursor-pointer rounded border-border accent-primary" />
        <span className="leading-snug text-muted-foreground">
          {t.reg_terms_pre}{" "}
          <a href="#" className="font-medium text-primary underline-offset-4 hover:underline">{t.reg_terms_link}</a>{" "}
          {t.reg_terms_and}{" "}
          <a href="#" className="font-medium text-primary underline-offset-4 hover:underline">{t.reg_privacy_link}</a>
          {t.reg_terms_post}
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-paper transition-colors hover:bg-primary-hover disabled:opacity-70"
      >
        {loading ? <Spinner /> : t.reg_submit}
      </button>
    </form>
  );
}

function translateSignupError(message: string, lang: Lang): string {
  const errors: Record<string, Record<Lang, string>> = {
    "User already registered": {
      tr: "Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.",
      en: "This email is already registered. Try signing in.",
    },
    "Password should be at least 6 characters": {
      tr: "Şifre en az 6 karakter olmalıdır.",
      en: "Password must be at least 6 characters.",
    },
    "Unable to validate email address": {
      tr: "Geçerli bir e-posta adresi girin.",
      en: "Please enter a valid email address.",
    },
  };

  for (const [key, translations] of Object.entries(errors)) {
    if (message.includes(key)) return translations[lang];
  }

  return lang === "tr" ? "Bir hata oluştu. Tekrar deneyin." : "An error occurred. Please try again.";
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.583c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 6.294C4.672 4.167 6.656 3.583 9 3.583z" fill="#EA4335" />
    </svg>
  );
}
