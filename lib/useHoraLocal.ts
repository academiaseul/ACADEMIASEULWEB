"use client";

import { useEffect, useState } from "react";
import { PAISES, horaLocal, paisPorTimezone, type PaisKey } from "@/lib/nivel1";

const KEY = "asPais";
const EVT = "asPaisChange";

// País del visitante para mostrar horarios en su hora: se adivina por la zona
// horaria del navegador y se persiste cuando el usuario lo cambia. Todas las
// instancias del hook se sincronizan entre sí mediante un evento de ventana.
export function useHoraLocal() {
  const [pais, setPaisState] = useState<PaisKey>("chile");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as PaisKey | null;
      if (saved && PAISES.some((p) => p.key === saved)) setPaisState(saved);
      else setPaisState(paisPorTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || ""));
    } catch {}
    const onChange = (e: Event) => setPaisState((e as CustomEvent<PaisKey>).detail);
    window.addEventListener(EVT, onChange);
    return () => window.removeEventListener(EVT, onChange);
  }, []);

  const setPais = (p: PaisKey) => {
    setPaisState(p);
    try {
      localStorage.setItem(KEY, p);
    } catch {}
    window.dispatchEvent(new CustomEvent<PaisKey>(EVT, { detail: p }));
  };

  const info = PAISES.find((p) => p.key === pais) ?? PAISES[0];
  const hora = (horaChile: string) => horaLocal(horaChile, pais);

  return { pais, setPais, info, hora, esChile: pais === "chile" };
}
