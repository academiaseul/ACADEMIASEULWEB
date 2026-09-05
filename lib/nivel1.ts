// ⚙️ CONFIGURACIÓN DE LA COHORTE · NIVEL 1 (A1)
//
// La cohorte de julio 2026 (miércoles 8 / sábados 11) ya está en curso,
// así que la página /nivel-1 muestra "cohorte cerrada" + lista de espera
// en vez del formulario de inscripción y pago.
//
// Para reabrir con una nueva cohorte:
//   1. Pon COHORTE_ABIERTA en true.
//   2. Actualiza las fechas dentro de app/nivel-1/page.tsx (objeto `cohortes`,
//      el countdown, y el texto de la promo si vas a correr una nueva).
//   3. Si vas a anunciar una fecha de la próxima cohorte antes de reabrir,
//      actualizá PROXIMA_COHORTE_LABEL para que se muestre en la página de cierre.

export const COHORTE_ABIERTA = false;

export const PROXIMA_COHORTE_LABEL = "Octubre 2026"; // horarios y precio por anunciar
