"use client";

import { CLASES, PAISES, cursoDe, profeCorto, type Clase, type ClaseId, type PaisKey } from "@/lib/nivel1";
import { useHoraLocal } from "@/lib/useHoraLocal";
import { useT } from "@/lib/i18n";

// Grilla semanal (Lun–Jue × 18:00/20:00/21:00) con la hora en el país del
// visitante. Reemplaza las tarjetas + tablas de husos por una sola imagen.

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves"] as const;
const HORAS = ["18:00", "20:00", "21:00"] as const;

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
  const celda = (dia: string, h: string): Clase[] => CLASES.filter((c) => c.dia === dia && c.horaChile === h);

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

      {/* Grilla */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm min-w-[600px]">
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
                {DIAS.map((d) => {
                  const cs = celda(d, h);
                  return (
                    <td key={d} className="px-2 py-2 align-top">
                      {cs.map((c) => {
                        const curso = cursoDe(c);
                        const activa = seleccionada === c.id;
                        const cls = `block w-full text-left rounded-xl border-2 px-3 py-2 transition hover:-translate-y-0.5 ${
                          activa ? "border-[#4236F6] bg-white shadow-md" : "border-gray-200 bg-white hover:border-[#4236F6]/50"
                        }`;
                        const inner = (
                          <>
                            <div className="font-bold text-gray-900 leading-tight text-[13px]">{curso.emoji} {t(curso.nombreCorto)}</div>
                            {!compacto && (
                              <div className="text-[11px] text-gray-500 mt-0.5">{t(profeCorto(c))} · {t("máx. {n}", { n: c.cupos })}</div>
                            )}
                            {activa && <div className="text-[10px] font-bold mt-1" style={{ color: "#4236F6" }}>{t("✓ Seleccionada")}</div>}
                          </>
                        );
                        return onSelect ? (
                          <button key={c.id} type="button" onClick={() => onSelect(c.id)} className={cls}>{inner}</button>
                        ) : (
                          <a key={c.id} href={`/nivel-1?clase=${c.id}#clases`} className={cls}>{inner}</a>
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {t("5 cursos · 6 horarios (Básico 1 se dicta martes y jueves: elige uno) · todas las clases parten la semana del 12 de octubre · 8 semanas · 60 min.")}
        {info.cambiaHora ? ` ${t(info.cambiaHora)}` : ""}
      </p>
    </div>
  );
}
