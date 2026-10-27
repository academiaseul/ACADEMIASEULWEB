"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  enLanzamiento,
  matriculaAbierta,
  precioLabel,
  precioLanzamientoLabel,
  PRECIO_CORTO,
  PRECIO_LANZAMIENTO_CORTO,
  PRECIO_UNICO,
  PRECIO_MENSUAL,
  PRECIO_LANZAMIENTO_UNICO,
  PRECIO_LANZAMIENTO_MENSUAL,
  CLP_UNICO,
  CLP_MENSUAL,
  CLP_LANZAMIENTO_UNICO,
  CLP_LANZAMIENTO_MENSUAL,
  LANZAMIENTO_HASTA,
  MESES,
} from "./nivel1";

// Estado de la campaña «Básico 1 · noviembre 2026» según la fecha: precio de lanzamiento
// (hasta el dom 8 nov 23:59 Chile) y matrícula abierta (hasta el lun 9 nov 23:59 Chile).
//
// Sin desajuste de hidratación: el layout raíz (servidor) calcula el valor inicial al
// generar la página y lo pasa como prop; el cliente parte con ese mismo valor y, ya
// montado, lo corrige con su propia hora (y lo revisa cada minuto). Así una página
// generada antes del dom 8 cambia sola al precio normal el lun 9, sin redeploy.

type Estado = { lanzamiento: boolean; matricula: boolean };

const Ctx = createContext<Estado>({ lanzamiento: false, matricula: true });

export function CampanaProvider({
  lanzamientoInicial,
  matriculaInicial,
  children,
}: {
  lanzamientoInicial: boolean;
  matriculaInicial: boolean;
  children: ReactNode;
}) {
  const [estado, setEstado] = useState<Estado>({ lanzamiento: lanzamientoInicial, matricula: matriculaInicial });

  useEffect(() => {
    const revisar = () => {
      const ahora = Date.now();
      const lanzamiento = enLanzamiento(ahora);
      const matricula = matriculaAbierta(ahora);
      setEstado((prev) => (prev.lanzamiento === lanzamiento && prev.matricula === matricula ? prev : { lanzamiento, matricula }));
    };
    revisar();
    const id = setInterval(revisar, 60_000);
    return () => clearInterval(id);
  }, []);

  return <Ctx.Provider value={estado}>{children}</Ctx.Provider>;
}

export type Plan = "unico" | "mensual";

/** Precio vigente (lanzamiento o normal) con todo lo que necesitan los componentes. */
export function usePrecio() {
  const { lanzamiento, matricula } = useContext(Ctx);
  const unico = lanzamiento ? PRECIO_LANZAMIENTO_UNICO : PRECIO_UNICO;
  const mensual = lanzamiento ? PRECIO_LANZAMIENTO_MENSUAL : PRECIO_MENSUAL;
  return {
    /** true hasta el domingo 8 de noviembre a las 23:59 (hora de Chile). */
    lanzamiento,
    /** true hasta el lunes 9 de noviembre a las 23:59 (hora de Chile). */
    matriculaAbierta: matricula,
    unico,
    mensual,
    meses: MESES,
    clpUnico: lanzamiento ? CLP_LANZAMIENTO_UNICO : CLP_UNICO,
    clpMensual: lanzamiento ? CLP_LANZAMIENTO_MENSUAL : CLP_MENSUAL,
    /** Clave de traducción: "Precio de lanzamiento: US$120 …" o "US$150 el curso completo · o 2 cuotas de US$75". */
    label: lanzamiento ? precioLanzamientoLabel() : precioLabel(),
    /** Clave de traducción corta: "US$120 · o 2 × US$60" o "US$150 · o 2 × US$75". */
    corto: lanzamiento ? PRECIO_LANZAMIENTO_CORTO : PRECIO_CORTO,
    /** Precio normal (para tacharlo durante el lanzamiento). */
    normalUnico: PRECIO_UNICO,
    normalMensual: PRECIO_MENSUAL,
    hasta: LANZAMIENTO_HASTA,
  };
}
