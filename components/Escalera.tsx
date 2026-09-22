"use client";

import { useState } from "react";
import {
  CURSOS,
  CONVERSACIONAL_2,
  clasesDe,
  primeraClaseDe,
  profeCorto,
  horarioDe,
  type CursoId,
} from "@/lib/nivel1";
import { useHoraLocal } from "@/lib/useHoraLocal";
import { useT, i18n } from "@/lib/i18n";

// Escalera de niveles: la misma imagen del camino en la home, /programa y /nivel-1.
// Chips de entrada ("Nunca estudié…") iluminan el peldaño correcto y muestran la
// frase canónica con prerrequisito + link directo a la clase.

type Entrada = "cero" | "hangul" | "nivel1" | "hablar" | "topik" | "ninos";

const ENTRADAS: { key: Entrada; label: string; cursoId: CursoId; frase: string }[] = [
  { key: "cero", label: i18n("Nunca estudié coreano"), cursoId: "a11", frase: i18n("Tu curso es Básico 1 (A1.1): empiezas leyendo el alfabeto y terminas presentándote.") },
  { key: "hangul", label: i18n("Ya leo Hangul"), cursoId: "a12", frase: i18n("Si ya lees 한글 y te presentas, tu curso es Básico 2 (A1.2): del presente al pasado y al futuro.") },
  { key: "nivel1", label: i18n("Terminé el Nivel 1 de julio"), cursoId: "a12", frase: i18n("¿Fuiste alumno/a del Nivel 1 en julio? Ese curso hoy se llama Básico 1 (A1.1). Tu siguiente paso es Básico 2 (A1.2) · miércoles 21:00 Chile · con Jay.") },
  { key: "hablar", label: i18n("Quiero hablar"), cursoId: "a21", frase: i18n("Con Básico 2 terminado (o test de nivel), Conversacional 1 (A2.1) con la Prof.ª Abby: puro hablar con una nativa.") },
  { key: "topik", label: i18n("Voy por el TOPIK"), cursoId: "topik2", frase: i18n("Grupo de máximo 8 enfocado 100% en el examen oficial: TOPIK II (B1+) · jueves 21:00 Chile · con Jay.") },
  { key: "ninos", label: i18n("Es para mi hijo/a"), cursoId: "ninos", frase: i18n("Coreano para Niños (8–15): lunes 18:00 Chile, juegos, canciones y un show final para la familia.") },
];

export default function Escalera({
  activo,
  entradaInicial,
  compacta = false,
  tema = "claro",
  conChips = true,
}: {
  activo?: CursoId;
  entradaInicial?: Entrada;
  compacta?: boolean;
  tema?: "claro" | "oscuro";
  conChips?: boolean;
}) {
  const [entrada, setEntrada] = useState<Entrada | null>(entradaInicial ?? null);
  const { t, td } = useT();
  const { pais, info } = useHoraLocal();
  const oscuro = tema === "oscuro";
  const sel = entrada ? ENTRADAS.find((e) => e.key === entrada)! : null;
  const resaltado: CursoId | undefined = sel?.cursoId ?? activo;

  const base = oscuro ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-200 text-gray-900";
  const sub = oscuro ? "text-white/60" : "text-gray-500";
  const activoCls = "border-[#4236F6] ring-2 ring-[#4236F6]/30 shadow-lg";
  const chipBase = oscuro
    ? "border-white/20 text-white/80 hover:border-white/50"
    : "border-gray-300 text-gray-700 hover:border-[#4236F6]";

  const adultos = CURSOS.filter((c) => c.grupo === "adultos").sort((a, b) => a.paso - b.paso);
  const ninos = CURSOS.find((c) => c.cursoId === "ninos")!;

  type Peldano = { key: string; cursoId?: CursoId; emoji: string; nombreCorto: string; cefr: string; sub: string; futuro: boolean; href: string; paso: number };
  const peldanos: Peldano[] = [
    ...adultos.map((c) => ({
      key: c.cursoId,
      cursoId: c.cursoId,
      emoji: c.emoji,
      nombreCorto: c.nombreCorto,
      cefr: c.cefr,
      sub: `${td(horarioDe(c.cursoId, pais))}${pais !== "chile" ? ` ${t(info.corto)}` : ""} · ${t(profeCorto(clasesDe(c.cursoId)[0]))}`,
      futuro: false,
      href: `/nivel-1?clase=${primeraClaseDe(c.cursoId)}#clases`,
      paso: c.paso,
    })),
    { key: "a22", emoji: "🎎", nombreCorto: CONVERSACIONAL_2.nombreCorto, cefr: CONVERSACIONAL_2.cefr, sub: t("Abre en {cuando}", { cuando: t(CONVERSACIONAL_2.cuando) }), futuro: true, href: CONVERSACIONAL_2.href, paso: CONVERSACIONAL_2.paso },
  ].sort((a, b) => a.paso - b.paso);

  return (
    <div className="w-full">
      {conChips && (
        <div className="mb-5">
          <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${sub}`}>{t("¿Cuál es tu caso?")}</div>
          <div className="flex flex-wrap gap-2">
            {ENTRADAS.map((e) => (
              <button
                key={e.key}
                type="button"
                onClick={() => setEntrada(entrada === e.key ? null : e.key)}
                className={`px-3.5 py-2 rounded-full border-2 text-sm font-semibold transition ${
                  entrada === e.key ? "border-[#4236F6] bg-[#4236F6] text-white" : chipBase
                }`}
              >
                {t(e.label)}
              </button>
            ))}
          </div>
          {sel && (
            <div className={`mt-3 rounded-2xl border-2 border-[#4236F6] p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${oscuro ? "bg-white/5" : "bg-[#F5F3FF]"}`}>
              <p className={`flex-1 text-sm leading-relaxed ${oscuro ? "text-white" : "text-gray-800"}`}>{t(sel.frase)}</p>
              <a
                href={`/nivel-1?clase=${primeraClaseDe(sel.cursoId)}#clases`}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-white font-bold text-sm whitespace-nowrap hover:scale-105 transition"
                style={{ backgroundColor: "#4236F6" }}
              >
                {sel.cursoId === "ninos" ? t("Inscribir a mi hijo/a →") : t("Ir a {curso} →", { curso: t(CURSOS.find((c) => c.cursoId === sel.cursoId)!.nombreCorto).split(" (")[0] })}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Adultos: 5 peldaños con flechas */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0">
        {peldanos.map((p, i) => {
          const esActivo = p.cursoId !== undefined && resaltado === p.cursoId;
          return (
            <div key={p.key} className="flex md:flex-1 items-center">
              <a
                href={p.href}
                className={`relative flex-1 rounded-2xl border-2 p-3 md:p-4 transition hover:-translate-y-0.5 ${base} ${esActivo ? activoCls : ""} ${p.futuro ? "opacity-70" : ""}`}
                style={{ marginTop: compacta ? 0 : `${(4 - i) * 6}px` }}
              >
                <div className="flex items-center gap-3 md:block">
                  <div className="text-2xl md:text-3xl md:mb-1">{p.emoji}</div>
                  <div className="min-w-0">
                    <div className="font-bold leading-tight text-sm md:text-[15px]">{t(p.nombreCorto)}</div>
                    {!compacta && <div className={`text-xs mt-1 ${sub}`}>{p.sub}</div>}
                  </div>
                </div>
                <div
                  className={`absolute -top-2.5 right-3 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${p.futuro ? "bg-gray-200 text-gray-600" : "text-white"}`}
                  style={p.futuro ? undefined : { backgroundColor: "#4236F6" }}
                >
                  {p.futuro ? t("enero 2027") : t("paso {n}", { n: p.paso })}
                </div>
                {esActivo && (
                  <div className="absolute -bottom-2.5 left-3 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#E8B84B] text-[#0D0D0D]">
                    {t("tu curso")}
                  </div>
                )}
              </a>
              {i < peldanos.length - 1 && (
                <div className={`hidden md:flex items-center justify-center w-6 text-lg font-bold ${sub}`}>›</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Niños: carril aparte */}
      <div className="mt-4">
        <a
          href={`/nivel-1?clase=${primeraClaseDe("ninos")}#clases`}
          className={`relative inline-flex items-center gap-3 rounded-2xl border-2 px-4 py-2.5 transition hover:-translate-y-0.5 ${base} ${resaltado === "ninos" ? activoCls : ""}`}
        >
          <span className="text-2xl">{ninos.emoji}</span>
          <span>
            <span className="font-bold text-sm md:text-[15px]">{t(ninos.nombreCorto)}</span>
            {!compacta && <span className={`block text-xs ${sub}`}>{td(horarioDe("ninos", pais))}{pais !== "chile" ? ` ${t(info.corto)}` : ""} · {t("carril propio para niños y niñas")}</span>}
          </span>
          {resaltado === "ninos" && (
            <span className="absolute -bottom-2.5 left-3 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#E8B84B] text-[#0D0D0D]">{t("tu curso")}</span>
          )}
        </a>
      </div>
    </div>
  );
}
