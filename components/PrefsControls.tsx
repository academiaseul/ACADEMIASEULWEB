"use client";

import { Moon, Sun } from "lucide-react";
import { LANGS, usePrefs, type Lang } from "@/lib/prefs";
import { useT } from "@/lib/i18n";

// Selector de idioma (ES · EN · 한) y botón día/noche, para el menú.
export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = usePrefs();
  const { t } = useT();
  return (
    <div
      role="group"
      aria-label={t("Idioma")}
      className={`inline-flex items-center rounded-md border border-gray-200 dark:border-white/15 overflow-hidden ${compact ? "text-xs" : "text-xs"}`}
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code as Lang)}
          aria-pressed={lang === l.code}
          title={l.label}
          className={`px-2.5 py-1.5 font-bold tracking-wide transition-colors ${
            lang === l.code
              ? "bg-seoul-red text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          }`}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, ready } = usePrefs();
  const { t } = useT();
  const dark = theme === "dark";
  const label = dark ? t("Modo día") : t("Modo noche");
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="w-9 h-9 rounded-md border border-gray-200 dark:border-white/15 flex items-center justify-center text-gray-600 hover:text-seoul-red dark:text-gray-300 dark:hover:text-white transition-colors"
    >
      {ready && dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
