# Dubu (두부) · el juego del Hangul de Academia Seúl

Prototipo v1 (19 sept 2026), construido con `PROMPT_DUBU.md`.

- **Juego**: `public/dubu/index.html` — un solo archivo (HTML + CSS + JS, sin build). URL: `academiaseul.com/dubu` (rewrite en `next.config.mjs`).
- **Modo desarrollador**: `/dubu?dev=1` verifica en carga los 30 niveles (BFS de cadenas, presupuesto exacto de forja/oído, existencia de los 104 clips) y expone `window.Dubu` para pruebas.
- **Audio**: clips nativos de `public/audio/kr/<hex-utf8>.mp3` (mismo esquema que el Lector) con Web Speech ko-KR de respaldo. Nunca se manda un jamo suelto al TTS: el sonido de una letra es su sílaba de referencia (ㄱ→가, ㅓ→어, batchim ㅇ→앙). El título 두부 suena como 두 · 부 (no tiene clip propio; generar con el pipeline SunHiNeural cuando se quiera).
- **Progreso**: `localStorage["dubu-progreso"]` (`niveles`, `oido` por par mínimo, `roman`, `tutos`, `saltado`). Tema compartido con el Lector (`as-theme`).
- **Pruebas**: `scratchpad/dubu/test_play.js` (puppeteer-core + Chrome) juega los 30 niveles con el motor → 30/30 con 3 cubitos; `shots.js` genera capturas (móvil 375, noche, escritorio).

## Estructura del juego
6 barrios × 5 niveles = 30. Tipos: **Arma** (forja: ves la meta), **Oído** (la meta solo se oye), **¿Cuál oíste?** (pares mínimos), **Cadena** (escaleras de palabras reales, una regla por peldaño). Verbos: ● Punto · ✦ Trazo (+fuerte / +aire) · ⧉ Gemela (tensa) · ⟲ Girar · ⇄ Lado. Puntuación: 1–3 cubitos por nivel → el plato de cada barrio (15) → 90 en total. Al final de cada barrio: "Tu oído" por par mínimo + Repasar + enlace suave a Básico 1.

## Pendientes / ideas v2
- Generar el clip 두부 y los de sílabas intermedias que hoy caen en TTS (친 김 선 생 님).
- Enlazar desde /recursos y la home ("Empieza gratis hoy").
- Alinear el Lector con la fonética canónica (+fuerte / +aire; gemela = tensa sin aire).
- Más barrios (batchim doble, ㅐ/ㅔ, palabras de Básico 2), contrarreloj de oído, tarjeta para compartir.
