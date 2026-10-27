"use client";

import { cursoDe, profeCorto, MESES, type Clase, type PaisKey } from "@/lib/nivel1";
import { usePrecio } from "@/lib/campana";
import { horaLocal, PAISES } from "@/lib/nivel1";
import { useT, Tr } from "@/lib/i18n";

// Resumen de lo que el alumno está reservando. `sticky` = barra inferior fija
// que aparece al elegir clase; sin `sticky` = cabecera estática del formulario/pago.
export default function ResumenReserva({
  clase,
  plan,
  pais,
  sticky = false,
  onCambiar,
  visible = true,
}: {
  clase: Clase;
  plan: "unico" | "mensual";
  pais: PaisKey;
  sticky?: boolean;
  onCambiar?: () => void;
  visible?: boolean;
}) {
  const { t } = useT();
  const p = usePrecio();
  const curso = cursoDe(clase);
  const info = PAISES.find((p) => p.key === pais) ?? PAISES[0];
  const hora = horaLocal(clase.horaChile, pais);
  const horaTxt =
    pais === "chile"
      ? t("{dia} {hora} Chile", { dia: t(clase.dia), hora: clase.horaChile })
      : t("{dia} {hora} {pais} ({horaChile} Chile)", { dia: t(clase.dia), hora, pais: t(info.corto), horaChile: clase.horaChile });
  // Precio vigente (lanzamiento hasta el dom 8 nov, después el normal)
  const base = plan === "unico" ? t("US${p} pago único", { p: p.unico }) : t("{n} cuotas de US${m}", { n: MESES, m: p.mensual });
  const precio = p.lanzamiento ? t("{plan} · precio de lanzamiento", { plan: base }) : base;

  const cuerpo = (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="font-bold text-gray-900 leading-tight">
          {curso.emoji} {t(curso.nombreCorto)} <span className="font-normal text-gray-500">· {t(curso.subtitulo)}</span>
        </div>
        <div className="text-sm text-gray-700 mt-0.5">
          {horaTxt} · {t(profeCorto(clase))} · <Tr k="primera clase **{fecha}**" vars={{ fecha: t(clase.primeraClase) }} /> · {precio}
        </div>
      </div>
      {sticky ? (
        <div className="flex items-center gap-2">
          {onCambiar && (
            <button type="button" onClick={onCambiar} className="text-sm font-semibold text-gray-500 hover:text-gray-900 px-2">
              {t("Cambiar")}
            </button>
          )}
          <a
            href="#inscripcion"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-white font-bold text-sm whitespace-nowrap hover:scale-105 transition"
            style={{ backgroundColor: "#4236F6" }}
          >
            {t("Reservar mi cupo →")}
          </a>
        </div>
      ) : (
        onCambiar && (
          <button type="button" onClick={onCambiar} className="text-sm font-semibold underline" style={{ color: "#4236F6" }}>
            {t("Cambiar clase")}
          </button>
        )
      )}
    </div>
  );

  if (sticky) {
    return (
      <div
        className={`fixed bottom-0 left-0 lg:left-64 right-0 z-40 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!visible}
      >
        <div className="mx-auto max-w-4xl pl-4 pr-[92px] lg:px-4 pb-3">
          <div className="rounded-2xl border-2 border-[#4236F6] bg-white shadow-2xl px-4 py-3">{cuerpo}</div>
        </div>
      </div>
    );
  }
  return <div className="rounded-2xl border-2 border-[#4236F6] bg-[#F5F3FF] px-4 py-3">{cuerpo}</div>;
}
