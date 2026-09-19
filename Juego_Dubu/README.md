# Dubu (두부) · el juego del Hangul de Academia Seúl

Prototipo v2 (19 sept 2026): puzzle de tablero **C + V**. La v1 (fabricar letras con trazos y puntos) queda documentada en `PROMPT_DUBU.md`; Jay pidió una estructura de puzzle más simple.

- **Juego**: `public/dubu/index.html` — un solo archivo (HTML + CSS + JS, sin build). URL: `academiaseul.com/dubu` (rewrite en `next.config.mjs`).
- **Modo desarrollador**: `/dubu?dev=1` verifica en carga los 30 niveles (BFS de cadenas, presupuesto exacto de forja/oído, existencia de los 104 clips) y expone `window.Dubu` para pruebas.
- **Audio**: clips nativos de `public/audio/kr/<hex-utf8>.mp3` (mismo esquema que el Lector) con Web Speech ko-KR de respaldo. Nunca se manda un jamo suelto al TTS: el sonido de una letra es su sílaba de referencia (ㄱ→가, ㅓ→어, batchim ㅇ→앙). El título 두부 suena como 두 · 부 (no tiene clip propio; generar con el pipeline SunHiNeural cuando se quiera).
- **Progreso**: `localStorage["dubu-progreso"]` (`niveles`, `oido` por par mínimo, `roman`, `tutos`, `saltado`). Tema compartido con el Lector (`as-theme`).
- **Pruebas**: `scratchpad/dubu/test_play.js` (puppeteer-core + Chrome) juega los 30 niveles con el motor → 30/30 con 3 cubitos; `shots.js` genera capturas (móvil 375, noche, escritorio).

## Estructura del juego
6 barrios × 5 niveles = 30. Tablero **2×2 o 3×3** con consonantes (azul) y vocales (dorado): tocas consonante → vocal (→ batchim) y se forma la sílaba; si coincide con la meta, cuaja y pasa a la siguiente. Tipos: **Arma** (meta romanizada; en el barrio 1 también la sílaba fantasma), **Oído** (meta solo por audio; romanización tras 3 fallos), **¿Cuál oíste?** (pares mínimos). Los distractores del tablero son pares mínimos de las letras necesarias (ㅓ/ㅗ, ㅡ/ㅜ, ㄱ/ㅋ/ㄲ, ㄴ/ㅇ…) generados con semilla por nivel. Al fallar, la sílaba se desmorona solo desde la pieza equivocada y suena meta → tuya. Puntuación: 3 cubitos sin fallos, 2 con ≤2, 1 después → plato de 15 por barrio (90 en total). Identidad: el tigre del logo como máscara CSS (`tigre.png`), pintado en azul/dorado.

## Pendientes / ideas v2
- Generar el clip 두부 y los de sílabas intermedias que hoy caen en TTS (친 김 선 생 님).
- Enlazar desde /recursos y la home ("Empieza gratis hoy").
- Alinear el Lector con la fonética canónica (+fuerte / +aire; gemela = tensa sin aire).
- Más barrios (batchim doble, ㅐ/ㅔ, palabras de Básico 2), contrarreloj de oído, tarjeta para compartir.
