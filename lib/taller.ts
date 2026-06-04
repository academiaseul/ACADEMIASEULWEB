// ⚙️ CONFIGURACIÓN DEL PRÓXIMO TALLER
// Para anunciar un nuevo taller, edita SOLO este archivo:
//   1. fechaISO: fecha/hora de inicio con zona horaria de Chile (-04:00)
//   2. fechaLabel / horaLabel: cómo se muestra en la página
// Para "sin taller anunciado", pon fechaISO en null — la página /taller
// cambia automáticamente a modo "próximo taller" con formulario de aviso.

export const PROXIMO_TALLER = {
  fechaISO: '2026-06-06T20:00:00-04:00' as string | null,
  fechaLabel: 'Sábado 6 de Junio',
  horaLabel: '20:00 hrs Chile',
  duracionMin: 90,
};

/** true si hay un taller anunciado que aún no termina */
export function tallerVigente(): boolean {
  if (!PROXIMO_TALLER.fechaISO) return false;
  const fin =
    new Date(PROXIMO_TALLER.fechaISO).getTime() +
    PROXIMO_TALLER.duracionMin * 60_000;
  return Date.now() < fin;
}
