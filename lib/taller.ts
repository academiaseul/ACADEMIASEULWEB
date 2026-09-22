// ⚙️ CONFIGURACIÓN DEL PRÓXIMO TALLER
// Para anunciar un nuevo taller, edita SOLO este archivo:
//   1. fechaISO: fecha/hora de inicio con zona horaria de Chile (-04:00)
//   2. fechaLabel / horaLabel: cómo se muestra en la página
// Para "sin taller anunciado", pon fechaISO en null — la página /taller
// cambia automáticamente a modo "próximo taller" con formulario de aviso.

export const PROXIMO_TALLER = {
  fechaISO: null as string | null, // sin taller en vivo anunciado (22 sept 2026): /taller muestra el grabado
  fechaLabel: 'Por anunciar',
  horaLabel: '',
  duracionMin: 90,
};

// 🎬 Taller grabado (clase completa de Hangul en YouTube, grabada en vivo). Se muestra en /taller
// siempre que no haya un taller en vivo vigente. `start` = segundo donde empieza la clase.
export const TALLER_GRABADO = {
  youtubeId: 'zmbuLPcgfpw',
  start: 2414,
  titulo: 'Aprende a leer coreano desde cero · Clase completa de Hangul',
  duracion: '≈ 60 min',
};

/** true si hay un taller anunciado que aún no termina */
export function tallerVigente(): boolean {
  if (!PROXIMO_TALLER.fechaISO) return false;
  const fin =
    new Date(PROXIMO_TALLER.fechaISO).getTime() +
    PROXIMO_TALLER.duracionMin * 60_000;
  return Date.now() < fin;
}
