# 한글 Race · Corre con Hangul

Juego gratis para aprender a leer coreano: **academiaseul.com/hangul-race**. Está hecho para que alguien que no sabe nada de coreano termine una ronda pensando "¡puedo leer esto!" y quiera tocar **JUGAR DE NUEVO**.

**Estado (4 oct 2026): fase 1 lista.** Están Reconoce, Construye y Corre, con XP, racha, precisión, récord personal, rangos y una tarjeta para compartir. Funciona sin cuenta y sin conexión a ningún servidor propio.

## Archivos

| Archivo | Qué es |
|---|---|
| `public/hangul-race/index.html` | La pantalla: cabecera y pie del sitio (los mismos de Dubu y el Lector), estilos, sonido y dibujo. No tiene lógica de juego. |
| `public/hangul-race/motor.js` | El motor, sin DOM: arma y descompone el Hangul, hace las preguntas de cada modo, acepta las respuestas, explica los errores y lleva el puntaje y el progreso. También corre en Node (`require`). |
| `public/hangul-race/contenido.json` | **Todo el contenido**: ítems, niveles, modos, rangos y grupos de letras que se confunden. Para agregar palabras no hay que tocar el código. |
| `public/hangul-race/tigre.png` | El tigre (copia del de Dubu); se pinta con máscara CSS en cualquier color. |
| `next.config.mjs` | Rewrite `/hangul-race` → `/hangul-race/index.html`, igual que Dubu y el Lector. |
| `Juego_HangulRace/prueba_motor.js` | Prueba del motor y del contenido: `node Juego_HangulRace/prueba_motor.js`. Córrela después de cada cambio en el json. |

## Cómo se juega

Inicio → **JUGAR** (la siguiente carrera recomendada) → cuenta 셋 · 둘 · 하나 → ronda → resultado → **JUGAR DE NUEVO**. "Elegir modo y nivel" muestra los 9 niveles con su récord.

| Modo | Qué ves | Qué haces | Niveles |
|---|---|---|---|
| **Reconoce** 알아보기 | una letra o sílaba | eliges cómo suena (4 opciones) | Vocales · Consonantes · Sílabas |
| **Construye** 만들기 | ㄱ + ㅏ | eliges la sílaba armada; las piezas se juntan en el bloque | Vocal al lado · Vocal abajo · Con batchim |
| **Corre** 달리기 | una sílaba o palabra, 60 s | la escribes en letras latinas (annyeong) o con teclado coreano (안녕) | Sílabas · Palabras · Vocabulario |

**Cada error enseña algo.** No se pierde la pregunta: la opción mala queda marcada (✗, tachada, en dorado; nunca en rojo), aparece por qué ("Elegiste 범 = ㅂ + ㅓ + ㅁ. Mira la vocal: necesitas ㅗ. ㅗ es horizontal: va debajo") y se vuelve a intentar. En Corre, el primer error da una pista ("empieza con seon…"), el segundo muestra la respuesta, y se puede pasar.

**La ruta recomendada:** Vocales → Consonantes → Vocal al lado → Vocal abajo → Sílabas → Corre Sílabas → Batchim → Corre Palabras → Corre Vocabulario. JUGAR lleva al primer nivel sin récord, o con menos de 80 % (en Corre, menos de 10 palabras a la primera).

## Puntaje
- **XP:** +10 por acierto a la primera, +4 al segundo intento, +3 si en Corre respondes en menos de 3 s y +5 cada 5 seguidas.
- **Precisión:** aciertos a la primera ÷ preguntas.
- **Racha** y **tiempo** de la ronda.
- **Récord personal** por modo y nivel. En Corre gana quien acierta más palabras a la primera; en los demás modos, la mayor precisión y, si hay empate, el menor tiempo.
- **Rangos:** Principiante 새내기 (0) · Explorador del Hangul 탐험가 (60) · Hangul Chingu 한글 친구 (200) · Lector de coreano 읽는 사람 (500) · Velocista coreano 스피드왕 (1000). Se cambian en `rangos` del json.
- **Dónde se guarda:** en este navegador (`localStorage`, clave `hr-progreso-v1`). No hay cuenta ni datos personales.

## Audio
Cadena de audio, en este orden:
1. `audio` propio del ítem (para cuando grabemos voces nativas).
2. El clip de la voz del sitio, `/audio/kr/<hex-utf8>.mp3` (SunHi, como el Lector y Dubu).
3. La voz coreana del dispositivo.

Las letras sueltas suenan con su sílaba (ㅏ → 아, ㄱ → 가), igual que en el Lector. El 4 oct se generaron los 9 clips que faltaban (감사, 음식, 괜찮아요, 뭐 해요?, 어디 가요?, 국, 글, 남, 봄). La prueba avisa si un ítem nuevo no tiene clip.

## Agregar contenido (sin tocar código)
1. Suma un objeto a `items`:
   ```json
   { "id": "w-chingu", "tipo": "palabra", "ko": "친구", "rom": "chingu", "alt": ["chinggu"], "es": "amigo, amiga",
     "nivel": "A1", "curso": "a11", "leccion": "S4", "categoria": "personas", "acceso": "gratis" }
   ```
   - `tipo`: vocal · consonante · silaba · palabra · frase.
   - `rom`: romanización revisada oficial.
   - `alt`: otras formas que se aceptan al escribir.
   - `tip`: pista en español que aparece cuando se equivoca.
   - `decir`: lo que suena, si no es `ko`.
   - `audio`: ruta de un clip propio.
   - `curso` / `leccion` / `acceso`: para la fase 4.
2. Pon su `id` en la lista `items` de un nivel. También puedes crear un nivel nuevo con `id`, `nombre`, `muestra`, `items` y `preguntas`.
   - Construye arma sílabas solas: con `generar` (consonantes × vocales) o con una lista de `silabas`.
3. Corre `node Juego_HangulRace/prueba_motor.js`.
4. Si falta audio, genéralo con la voz del sitio (SunHi, -8 %) o deja que suene la del dispositivo.

Ojo con `alt`: una variante que sea el comienzo de otra (annyeon / annyeong) hace que Corre la envíe antes de tiempo. La prueba no lo detecta, así que hay que evitarlas.

## Lo que viene

- **Fase 2: Lee 읽기 y Escribe 쓰기.**
  - Lee: palabra o frase → eliges cómo se lee → ves qué significa. Los ítems de tipo `frase` ya están en el json.
  - Escribe: con teclado coreano, midiendo precisión, velocidad, caracteres y errores. La pantalla ya maneja la composición del teclado coreano (`compositionstart`/`end`).
- **Fase 3: retos y comunidad.**
  - Desafío Chingu del día: 5 palabras por fecha, sin cuenta.
  - Progreso semanal.
  - Ranking anónimo opcional, con nombres generados como TigerChingu42. Necesita un backend (la `db` de un artifact o una ruta de Next).
- **Fase 4: alumnos.**
  - Niveles por curso y lección (`curso`, `leccion`) y contenido `acceso: "alumno"`.
  - Retos que asigna la profe y progreso visible para ella. Necesita login, que hoy no existe en el sitio.

## Pendiente de Jay
- Probarlo en su celular y decidir si va al menú **Recursos**, al footer ("Gratis") y a `/recursos`. Por ahora solo está en el sitemap.
- Grabar con su voz las letras y palabras de la fase 1, para reemplazar a SunHi cuando quiera.
- Los colores del brief (#ffc8c8, un rosado) **no se usaron**: la casa no usa rojo ni rosado. Se usan el azul #4036ED, el lila #A79BFF, el fondo #F6F6F6, el dorado #E8B84B y el navy #003478.
