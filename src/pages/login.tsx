import { useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { translations, type Lang } from "../i18n";
import { Logo } from "../components/logo";
import { LangToggle } from "../components/lang-toggle";
import { signInWithEmail, signInWithGoogle } from "../lib/auth";
import { useAuth } from "../contexts/auth-context";
import { Spinner } from "../components/ui/spinner";
import { GoogleIcon } from "../components/ui/google-icon";

function useLang() {
  const { lang } = useParams({ strict: false });
  return { lang: lang as Lang, t: translations[lang as Lang] };
}

export default function LoginPage() {
  const { lang, t } = useLang();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/$lang/", params: { lang }, replace: true });
    }
  }, [user, loading, navigate, lang]);

  return (
    <div className="flex min-h-screen">
      {/* ── Left panel ── */}
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-primary p-10 lg:flex">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-[oklch(0.18_0.07_264)]" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">
          <Logo light />
          <a href={`/${lang}`} className="flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {t.login_back}
          </a>
        </div>

        <div className="relative z-10">
          <h2 className="font-display text-3xl font-semibold leading-tight text-white">{t.login_panel_h}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{t.login_panel_sub}</p>
          <ul className="mt-8 space-y-4">
            {[t.login_feat1, t.login_feat2, t.login_feat3].map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                <span className="text-sm text-white/80">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative z-10 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <blockquote className="text-sm leading-relaxed text-white/80">"{t.login_quote}"</blockquote>
          <figcaption className="mt-3 text-xs text-white/50">{t.login_quote_by}</figcaption>
        </figure>
      </div>

      {/* ── Right form ── */}
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

            <h1 className="font-display text-2xl font-semibold text-foreground">{t.login_h1}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t.login_no_account}{" "}
              <a href={`/${lang}/register`} className="font-medium text-primary underline-offset-4 hover:underline">
                {t.login_register_link}
              </a>
            </p>

            <LoginForm lang={lang} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast.success(lang === "tr" ? "Giriş başarılı!" : "Signed in successfully!");
      navigate({ to: "/$lang/", params: { lang }, replace: true });
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
      const redirectTo = `${window.location.origin}/${lang}`;
      await signInWithGoogle(redirectTo);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(translateAuthError(message, lang));
      setGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        aria-label={t.login_google}
        aria-busy={googleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-secondary disabled:opacity-70"
      >
        {googleLoading ? <Spinner /> : <><GoogleIcon />{t.login_google}</>}
      </button>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground">{t.login_or}</span>
        <div className="flex-1 border-t border-border" />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="login-email" className="text-sm font-medium text-foreground">{t.login_email_label}</label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.login_email_ph}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-sm font-medium text-foreground">{t.login_pass_label}</label>
          <a href="#" className="text-xs font-medium text-primary underline-offset-4 hover:underline">
            {t.login_forgot}
          </a>
        </div>
        <div className="relative">
          <input
            id="login-password"
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
            aria-label={show ? (lang === "tr" ? "Şifreyi gizle" : "Hide password") : (lang === "tr" ? "Şifreyi göster" : "Show password")}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground/60 hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <input type="checkbox" className="h-4 w-4 cursor-pointer rounded border-border accent-primary" />
        <span className="text-muted-foreground">{t.login_remember}</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-paper transition-colors hover:bg-primary-hover disabled:opacity-70"
      >
        {loading ? <Spinner /> : t.login_submit}
      </button>
    </form>
  );
}

function translateAuthError(message: string, lang: Lang): string {
  const errors: Record<string, Record<Lang, string>> = {
    "Invalid login credentials": {
      tr: "E-posta veya şifre hatalı.",
      en: "Incorrect email or password.",
    },
    "Email not confirmed": {
      tr: "E-postanızı doğrulayın. Gelen kutunuzu kontrol edin.",
      en: "Please confirm your email address. Check your inbox.",
    },
    "Too many requests": {
      tr: "Çok fazla deneme. Lütfen bekleyin.",
      en: "Too many attempts. Please wait a moment.",
    },
  };

  for (const [key, translations] of Object.entries(errors)) {
    if (message.includes(key)) return translations[lang];
  }

  return lang === "tr" ? "Bir hata oluştu. Tekrar deneyin." : "An error occurred. Please try again.";
}
