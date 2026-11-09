"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/config";
import { useState, useRef, useEffect } from "react";

const labels = {
  en: "English",
  bn: "বাংলা",
  hi: "हिन्दी",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
  tr: "Türkçe",
  id: "Bahasa Indonesia",
  ur: "اردو",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchLocale = (next) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-3 py-2 rounded-lg text-sm font-medium"
        style={{ border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))", background: "hsl(var(--card))" }}
        aria-label="Language"
      >
        {labels[locale] || locale}
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 max-h-64 overflow-auto rounded-xl shadow-lg z-50"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
        >
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${l === locale ? "text-primary font-semibold" : "text-muted-foreground"}`}
            >
              {labels[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}