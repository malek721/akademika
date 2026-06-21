import { useState, useEffect, useRef } from "react";
import { Globe2, ChevronDown, Check } from "lucide-react";
import type { Lang } from "../i18n";

const labels: Record<Lang, string> = { tr: "Türkçe", en: "English" };

function getLangPath(currentPath: string, currentLang: Lang, newLang: Lang) {
  return currentPath.replace(new RegExp(`^/(tr|en)(?=/|$)`), `/${newLang}`);
}

export function LangToggle({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : `/${lang}`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Globe2 className="h-4 w-4 text-muted-foreground" />
        <span>{labels[lang]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lift">
          {(["tr", "en"] as Lang[]).map((l) => (
            <a
              key={l}
              href={getLangPath(currentPath, lang, l)}
              onClick={() => setOpen(false)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                lang === l ? "font-semibold text-primary" : "text-foreground/80"
              }`}
            >
              <span className="w-3.5">
                {lang === l && <Check className="h-3.5 w-3.5" />}
              </span>
              {labels[l]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
