"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Preferencias del visitante: idioma (es · en · ko) y tema (claro · oscuro).
// Se guardan en localStorage y se aplican en <html lang> / <html class="dark">.
// El Lector de Hangul (HTML estático) lee las mismas claves para ir a juego.

export type Lang = "es" | "en" | "ko";
export type Theme = "light" | "dark";

export const LANG_KEY = "as-lang";
export const THEME_KEY = "as-theme";
export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
  { code: "ko", label: "한국어", short: "한" },
];

type Prefs = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  ready: boolean;
};

const Ctx = createContext<Prefs>({
  lang: "es",
  setLang: () => {},
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  ready: false,
});

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && ["es", "en", "ko"].includes(saved)) return saved;
    const q = new URLSearchParams(window.location.search).get("lang") as Lang | null;
    if (q && ["es", "en", "ko"].includes(q)) return q;
    // Idiomas del navegador: si el visitante tiene español en cualquier posición (muy común en
    // LatAm con el teléfono en inglés), mandamos español. Solo si no hay español miramos el primero.
    const navs = ((navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "es"]) as string[]).map((l) => l.toLowerCase());
    if (navs.some((l) => l.startsWith("es"))) return "es";
    const nav = navs[0] || "es";
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("en")) return "en";
  } catch {}
  return "es";
}

function detectTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved === "dark" || saved === "light") return saved;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch {}
  return "light";
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [theme, setThemeState] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const l = detectLang();
    const t = detectTheme();
    setLangState(l);
    setThemeState(t);
    document.documentElement.lang = l;
    applyTheme(t);
    setReady(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  };
  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return <Ctx.Provider value={{ lang, setLang, theme, setTheme, toggleTheme, ready }}>{children}</Ctx.Provider>;
}

export const usePrefs = () => useContext(Ctx);

/** Script inline para aplicar el tema antes del primer render (evita el parpadeo). */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark"){document.documentElement.classList.add("dark")}document.documentElement.style.colorScheme=t;var l=localStorage.getItem("${LANG_KEY}");if(l){document.documentElement.lang=l}}catch(e){}})();`;
