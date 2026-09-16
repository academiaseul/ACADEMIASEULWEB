"use client";

import { useCallback, type ReactNode } from "react";
import { usePrefs, type Lang } from "./prefs";
import { EN } from "./dict/en";
import { KO } from "./dict/ko";

// Traducción por clave = texto en español (estilo gettext).
//   const { t } = useT();  t("Inscribirme · Octubre 2026 →")
//   t("Hola {nombre}", { nombre })  → placeholders {x}
//   <Tr k="Texto con **negrita** y salto\nde línea" />  → negrita y <br/>
// Si falta la traducción se muestra el español. Los diccionarios EN/KO se
// generan con scratchpad/i18n_extract.js (lib/dict/) (claves) + traducción.

export type Dict = Record<string, string>;
const DICTS: Record<Lang, Dict | null> = { es: null, en: EN, ko: KO };

type Vars = Record<string, string | number>;

export function translate(lang: Lang, s: string, vars?: Vars): string {
  const d = DICTS[lang];
  let out = d && Object.prototype.hasOwnProperty.call(d, s) ? d[s] : s;
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  return out;
}

// Días y conectores dentro de horarios generados ("Martes o jueves 20:00").
const DIAS: Record<Exclude<Lang, "es">, Record<string, string>> = {
  en: { lunes: "Monday", martes: "Tuesday", miércoles: "Wednesday", jueves: "Thursday", viernes: "Friday", sábado: "Saturday", domingo: "Sunday", " o ": " or ", " y ": " and " },
  ko: { lunes: "월요일", martes: "화요일", miércoles: "수요일", jueves: "목요일", viernes: "금요일", sábado: "토요일", domingo: "일요일", " o ": " 또는 ", " y ": " 및 " },
};
export function translateDias(lang: Lang, s: string): string {
  if (lang === "es") return s;
  const map = DIAS[lang];
  return s.replace(/lunes|martes|miércoles|jueves|viernes|sábado|domingo| o | y /gi, (m) => {
    const low = m.toLowerCase();
    const rep = map[low];
    if (!rep) return m;
    return m[0] === m[0].toUpperCase() && low !== m ? rep.charAt(0).toUpperCase() + rep.slice(1) : rep;
  });
}

/** Marca un literal de datos (fuera de componentes) para que el extractor lo recoja; se traduce luego con t(). */
export const i18n = (s: string) => s;

export function useT() {
  const { lang } = usePrefs();
  const t = useCallback((s: string, vars?: Vars) => translate(lang, s, vars), [lang]);
  const td = useCallback((s: string) => translateDias(lang, s), [lang]);
  return { t, td, lang };
}

/** Texto con **negrita** y saltos de línea. */
export function rich(s: string): ReactNode[] {
  const out: ReactNode[] = [];
  const lines = s.split("\n");
  lines.forEach((line, li) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    parts.forEach((p, i) => {
      if (!p) return;
      out.push(i % 2 === 1 ? <strong key={`${li}-${i}`}>{p}</strong> : p);
    });
    if (li < lines.length - 1) out.push(<br key={`br-${li}`} />);
  });
  return out;
}

export function Tr({ k, vars }: { k: string; vars?: Vars }) {
  const { t } = useT();
  return <>{rich(t(k, vars))}</>;
}
