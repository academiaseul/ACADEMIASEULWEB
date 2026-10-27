"use client";

import { CLASES, PAISES, ESTADO_LABEL, RITMO_LABEL, cursoDe, profeCorto, notificarHref, type Clase, type ClaseId, type PaisKey } from "@/lib/nivel1";
import { useHoraLocal } from "@/lib/useHoraLocal";
import { useT } from "@/lib/i18n";

// Grilla semanal con la hora en el país del visitante.
// Modo «Básico 1 · noviembre»: en la grilla van la clase abierta (seleccionable) y la que
// está en curso (gris, sin inscripción); las de enero 2027 van abajo como "Próximamente",
// con link a su lista de espera. El día/hora de enero todavía no está confirmado.

const DIAS_ORDEN = ["Lunes", "Martes", "Miércoles", "Jueves"];
const HORAS_ORDEN = ["18:00", "20:00", "21:00"];

export default function HorarioSemanal({
  seleccionada,
  onSelect,
  compacto = false,
}: {
  seleccionada?: ClaseId;
  onSelect?: (id: ClaseId) => void;
  compacto?: boolean;
}) {
  const { t, td } = useT();
  const { pais, setPais, info, hora, esChile } = useHoraLocal();
  const enGrilla = CLASES.filter((c) => c.estado !== "enero_2027");
  const proximas = CLASES.filter((c) => c.estado === "enero_2027");
  const DIAS = DIAS_ORDEN.filter((d) => enGrilla.some((c) => c.dia === d));
  const HORAS = HORAS_ORDEN.filter((h) => enGrilla.some((c) => c.horaChile === h));
  const celda = (dia: string, h: string): Clase[] => enGrilla.filter((c) => c.dia === dia && c.horaChile === h);

  // Botón/link de una clase: la abierta se elige (o lleva a /nivel-1); la que está en curso lleva a su lista de espera.
  const item = (c: Clase, movil = false) => {
    const curso = cursoDe(c);
    const abierta = c.estado === "abierta";
    const activa = abierta && seleccionada === c.id;
    const base = movil ? "block w-full text-left rounded-xl border-2 px-4 py-3 transition" : "block w-full text-left rounded-xl border-2 px-3 py-2 transition";
    const cls = abierta
      ? `${base} bg-white ${activa ? "border-[#4236F6] shadow-md" : "border-[#4236F6]/40 hover:border-[#4236F6]"} ${movil ? "" : "hover:-translate-y-0.5"}`
      : `${base} bg-gray-50 border-dashed border-gray-300 hover:border-gray-400`;
    const inner = (
      <>
        <div className={`font-bold leading-tight ${movil ? "" : "text-[13px]"} ${abierta ? "text-gray-900" : "text-gray-600"}`}>{curso.emoji} {t(curso.nombreCorto)}</div>
        {movil ? (
          <div className="text-sm text-gray-600 mt-0.5">
            {td(c.dia)} {hora(c.horaChile)}{!esChile && <span className="text-gray-400"> ({c.horaChile} {t("Chile")})</span>} · {t(profeCorto(c))}
          </div>
        ) : (
          !compacto && <div className="text-[11px] text-gray-600 mt-0.5">{t(profeCorto(c))}{abierta ? ` · ${t("máx. {n}", { n: c.cupos })}` : ""}</div>
        )}
        {abierta ? (
          <div className={`${movil ? "text-xs" : "text-[10px]"} font-bold mt-1`} style={{ color: "var(--as-azul-txt)" }}>
            {activa ? t("✓ Seleccionada") : `${t(ESTADO_LABEL.abierta)} · ${t(RITMO_LABEL)}`}
          </div>
        ) : (
          <div className={`${movil ? "text-xs" : "text-[10px]"} font-semibold text-gray-600 mt-1`}>{t(ESTADO_LABEL[c.estado])}</div>
        )}
      </>
    );
    if (abierta && onSelect) {
      return <button key={c.id} type="button" onClick={() => onSelect(c.id)} className={cls}>{inner}</button>;
    }
    return <a key={c.id} href={abierta ? `/nivel-1?clase=${c.id}#clases` : notificarHref(curso.cursoId)} className={cls}>{inner}</a>;
  };

  return (
    <div className="w-full">
      {/* Selector de país */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="text-sm text-gray-600">
          {t("Horarios en")} <strong className="text-gray-900">{info.bandera} {t(info.label)}</strong>
          {!esChile && <span className="text-gray-400"> · {t("convertidos desde hora de Chile")}</span>}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PAISES.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPais(p.key as PaisKey)}
              className={`px-2.5 py-1.5 rounded-full border text-xs font-semibold transition ${
                pais === p.key ? "border-[#4236F6] bg-[#4236F6] text-white" : "border-gray-300 text-gray-700 hover:border-[#4236F6]"
              }`}
            >
              {p.bandera} {t(p.corto)}
            </button>
          ))}
        </div>
      </div>

      {/* Móvil: lista (la grilla no cabe a 375 px) */}
      <div className="sm:hidden flex flex-col gap-2">
        {enGrilla.map((c) => item(c, true))}
      </div>

      {/* Grilla (tablet y escritorio) */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white" style={{ backgroundColor: "#4236F6" }}>
              <th className="px-3 py-3 text-left font-bold w-28">{t("Hora")}</th>
              {DIAS.map((d) => (
                <th key={d} className="px-3 py-3 font-bold text-center">{td(d)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HORAS.map((h, hi) => (
              <tr key={h} className={hi % 2 === 1 ? "bg-[#F5F3FF]" : "bg-white"}>
                <td className="px-3 py-3 align-top">
                  <div className="font-bold text-gray-900 leading-tight">{hora(h)}</div>
                  {!esChile && <div className="text-[11px] text-gray-400">{h} {t("Chile")}</div>}
                </td>
                {DIAS.map((d) => (
                  <td key={d} className="px-2 py-2 align-top">
                    {celda(d, h).map((c) => item(c))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Próximamente · enero 2027 */}
      {proximas.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500">{t("Próximamente · enero 2027")}</span>
          <div className="flex flex-wrap gap-2">
            {proximas.map((c) => {
              const curso = cursoDe(c);
              return (
                <a
                  key={c.id}
                  href={notificarHref(curso.cursoId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-gray-300 bg-white text-xs font-semibold text-gray-600 hover:border-[#4236F6] hover:text-gray-900 transition"
                >
                  {curso.emoji} {t(curso.nombreCorto)} <span className="text-gray-400">· {t("Avísame cuando abra")}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">
        {t("Básico 1 · {ritmo} · 60 min por Zoom. Básico 2 ya está en curso; Conversacional 1, TOPIK II y Niños vuelven en enero de 2027.", { ritmo: t(RITMO_LABEL) })}
        {info.cambiaHora ? ` ${t(info.cambiaHora)}` : ""}
      </p>
    </div>
  );
}
