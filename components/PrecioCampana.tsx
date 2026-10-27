"use client";

import { usePrecio } from "@/lib/campana";
import { precioLanzamientoMonto, PRECIO_LANZAMIENTO_CORTO, PRECIO_LANZAMIENTO_UNICO, PRECIO_LANZAMIENTO_MENSUAL, MESES } from "@/lib/nivel1";
import { useT } from "@/lib/i18n";

// Una sola línea de precio para toda la campaña de Básico 1:
//   lanzamiento (hasta el dom 8 nov): "Precio de lanzamiento: ~~US$150~~ US$120 el curso completo · o 2 cuotas de US$60 (hasta el domingo 8 de noviembre)"
//   después:                          "US$150 el curso completo · o 2 cuotas de US$75"
// `corto` = "~~US$150~~ US$120 · o 2 × US$60" / "US$150 · o 2 × US$75".
// La frase larga es UNA clave con el marcador {tachado}: cada idioma pone el precio tachado donde
// suena natural (en coreano va después de "전체 과정"). Los lectores de pantalla oyen
// "Precio normal: US$150. Ahora: …" en vez de dos precios seguidos.
export default function PrecioCampana({
  corto = false,
  conFecha = true,
  className,
  tachadoClassName = "opacity-60",
}: {
  corto?: boolean;
  conFecha?: boolean;
  className?: string;
  tachadoClassName?: string;
}) {
  const { t } = useT();
  const p = usePrecio();
  if (!p.lanzamiento) return <span className={className}>{t(corto ? p.corto : p.label)}</span>;
  const tachado = (
    <>
      <s className={tachadoClassName}>
        <span className="sr-only">{t("Precio normal:")} </span>US${p.normalUnico}
      </s>
      <span className="sr-only"> {t("Ahora:")}</span>
    </>
  );
  let cuerpo;
  if (corto) {
    cuerpo = <>{tachado} {t(PRECIO_LANZAMIENTO_CORTO)}</>;
  } else {
    const frase = t("Precio de lanzamiento: {tachado} {monto}", {
      monto: t(precioLanzamientoMonto()),
      unico: `US$${PRECIO_LANZAMIENTO_UNICO}`,
      mensual: `US$${PRECIO_LANZAMIENTO_MENSUAL}`,
      n: MESES,
    });
    const [antes, despues = ""] = frase.split("{tachado}");
    cuerpo = <>{antes}{tachado}{despues}</>;
  }
  return (
    <span className={className}>
      {cuerpo}
      {conFecha && <> ({t("hasta el {fecha}", { fecha: t(p.hasta) })})</>}
    </span>
  );
}
