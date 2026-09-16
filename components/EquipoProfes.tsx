'use client';

import { PROFES, CLASES, cursoDe, type ProfeId } from "@/lib/nivel1";
import { useT } from "@/lib/i18n";

// Tarjetas del equipo docente, con los cursos que dicta cada uno (nombreCorto).
export default function EquipoProfes({ destacado, compacto = false }: { destacado?: ProfeId; compacto?: boolean }) {
  const { t } = useT();
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${compacto ? "lg:grid-cols-4" : "lg:grid-cols-4"} gap-4`}>
      {PROFES.map((p) => {
        const cursos = Array.from(new Set(CLASES.filter((c) => c.profeId === p.id).map((c) => cursoDe(c).nombreCorto)));
        const activo = destacado === p.id;
        return (
          <div
            key={p.id}
            className={`bg-white rounded-2xl p-5 border-2 text-center transition ${activo ? "border-[#4236F6] shadow-lg" : "border-gray-100 shadow-sm"}`}
          >
            <div className="text-4xl mb-2">{p.emoji}</div>
            <h3 className="font-bold text-gray-900 leading-tight">{t(p.nombre)}</h3>
            <div className="text-[11px] font-bold tracking-wide uppercase mt-1 mb-2" style={{ color: "#4236F6" }}>
              {cursos.map((n) => t(n)).join(" · ")}
            </div>
            {!compacto && <p className="text-sm text-gray-600">{t(p.bio)}</p>}
            {activo && <div className="mt-2 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#E8B84B] text-[#0D0D0D] inline-block">{t("tu profe")}</div>}
          </div>
        );
      })}
    </div>
  );
}
