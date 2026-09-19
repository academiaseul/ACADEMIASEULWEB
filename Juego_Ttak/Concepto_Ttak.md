# Ttak (딱) · puzzle de lógica del Hangul para Academia Seúl

Concepto (19 sept 2026) · el prompt de construcción está en `PROMPT_FABLE.md` (en inglés, con todo el copy en español).

## 1. Cómo funciona Matcha (la referencia)
Delphinium Games, 2022 · iOS / Mac / Steam / itch · ~US$2 · 400+ niveles · 97 % positivo en Steam.
- Tablero de 3×3 a 4×4 con fichas: letras sueltas (ㄱ ㅏ ㅗ…) o sílabas ya armadas (로 추 넓…) y celdas vacías.
- Deslizas fichas; al chocar se **fusionan con las reglas reales del Hangul**: ㄱ+ㅏ → 가 (la vocal va a la derecha o debajo según su forma: 가 / 고), 가+ㅇ → 강 (batchim), ㅗ+ㅏ → ㅘ, ㄹ+ㅂ → ㄼ (batchim doble). También puedes **separar** una ficha compuesta.
- Abajo, la meta en romanización oficial se ilumina en orden: nivel 5 "ga · o · a" → nivel 42 "gu · ro · bi · u" → nivel 181 "dyok · tom · chuip · nwem" (sílabas inexistentes: lógica pura) → nivel 190 김남준 · 김석진 · 박지민 · 전정국 (BTS).
- Sin audio, sin significado, sin explicación: "intuitive education" (se aprende jugando). Sin anuncios ni datos.
- Lo que deja libre: **oído**, significado en español, la lógica de los **trazos**, vocabulario del curso, un personaje, y un puente a las clases.

## 2. Nuestro giro: no eliges letras, las **fabricas**
Mecánica central (distinta al deslizar-y-fusionar de Matcha): una "casa" de 1–3 bloques con ranuras (inicial · vocal · batchim), una bandeja de piezas base y tres verbos que son las reglas del alfabeto de Sejong:
- **● Punto**: ㅣ + punto a la derecha/izquierda → ㅏ/ㅓ; ㅡ + punto arriba/abajo → ㅗ/ㅜ; segundo punto → ㅑ ㅕ ㅛ ㅠ. ㅗ+ㅏ → ㅘ (envolvente).
- **✦ Trazo**: ㄱ→ㅋ · ㄴ→ㄷ→ㅌ · ㅁ→ㅂ→ㅍ · ㅅ→ㅈ→ㅊ · ㅇ→ㅎ. Primer trazo = "+fuerte", segundo = "+aire" (ver corrección pedagógica abajo).
- **⧉ Gemela**: ㄱ→ㄲ ㄷ→ㄸ ㅂ→ㅃ ㅅ→ㅆ ㅈ→ㅉ = tensa (garganta apretada, sin aire).
- Verbos gratis: **⟲ Girar** (ㅏ↔ㅗ, ㅓ↔ㅜ, misma polaridad yang/yin) y **⇄ Lado** (ㅏ↔ㅓ, ㅗ↔ㅜ, ㅐ↔ㅔ).
- Todo por toques (sin arrastrar), presupuesto exacto de piezas ("ni una de más" = 딱), deshacer ilimitado, sin perder ni cronómetro.

Cuatro tipos de nivel, 30 niveles en 6 barrios de Seúl (Bukchon → Insadong → Hongdae → Gwangjang → Río Han → Estación de Seúl):
| Tipo | Qué haces | Qué entrena |
|---|---|---|
| **Forja** | armas la sílaba/palabra que ves (아, 고기, 강, 커피, 꽃, 사과) | geometría del bloque, trazos, gemela |
| **Escucha y arma (oído)** | la meta NO se muestra: la oyes y la construyes (우유, 바다, 피자, 뭐, 우산, 친구, 김치, jefe 선생님) | dictado real, con distractores de par mínimo |
| **¿Cuál oíste?** | suena una sílaba, tocas la correcta entre 2–3 (어/오 · 안/암/앙 · 가/카/까 · 서/소) | pares mínimos que confunden al hispanohablante |
| **Cadena** | escalera de palabras reales, un movimiento por peldaño: 문→물→불 (puerta→agua→fuego), 밤→밥→방→빵, 비→피, 십→집, 곰→공, 손→산, 개→게 | "una regla, muchas consecuencias" + vocabulario |

## 3. El oído (requisito de Jay)
- Cada pieza suena al tocarla y cada bloque **lee en voz alta** lo que tiene al cambiar. Al completar una palabra, suena la palabra entera (voz nativa, clips ya existentes en `/audio/kr/`).
- El sonido de una letra se enseña con su **sílaba de referencia** (ㄱ → 가, ㅓ → 어, batchim ㅇ → 앙): las letras sueltas no tienen clip y el TTS leería el nombre ("기역").
- **Eco**: si armas 소 cuando sonó 서, oyes 서 → 소 en contraste, parpadea solo la zona que difiere y a la segunda falla aparece la pista en español del Lector ("ㅓ: o abierta, boca relajada").
- **Métrica de oído** por par (ㅓ/ㅗ · ㅡ/ㅜ · simple/aspirada · simple/tensa · batchim) guardada en el dispositivo; al final de cada barrio: "Tu oído: ㅓ/ㅗ 80 % · aspiradas 60 %" + botón **Repasar** con los dos pares más flojos.
- Progresión: reconocer → dictado de sílaba → dictado de palabra con significado → (opcional) contrarreloj.

## 4. Nombre
**Ttak (딱)** — "clac / justo / exacto" (딱 맞다 = encaja perfecto). Es literalmente la mecánica (la pieza entra y hace 딱), el presupuesto exacto, y el propio título enseña una tensa (ㄸ) con batchim (ㄱ). Se lee "tak" en español. Sin conflictos en tiendas. URL: academiaseul.com/ttak.
Tagline: **"Cada letra tiene su lugar. Escúchala, fórjala y encájala… ¡딱!"**
Alternativas evaluadas: Kkul (꿀, miel — existe "Kkuljaem Korean" y "KKUL-TTEOK!"), Hanok (한옥, casita = sílaba; libre), Moa (모아, de 모아쓰기 = escritura en bloques; conflicto leve con "Moa Moa Five"), Sori (소리, sonido — conflicto real con "Sori Speak"), Gonggi (공기, piedritas/aire — muchas apps). Sugerencia: Ttak como juego, "Sori" como nombre del modo de oído, "Horang" el tigre chingu, "gotas de miel" como puntuación.

## 5. Corrección pedagógica que salió de la revisión (aplica también al Lector)
- **No** es cierto que "cada trazo añadido = más aire". ㄷ ㅂ ㅈ son consonantes simples (평음): el primer trazo, según el Hunminjeongeum Haerye, hace el sonido **más fuerte** (소리가 세다); solo el **segundo** trazo añade aire (ㅋ ㅌ ㅍ ㅊ ㅎ). Y la gemela (ㄲ ㄸ ㅃ ㅆ ㅉ) es **tensa, sin aire** — no un tercer grado de aire.
- ㄴ toca la **encía** superior (alveolar), no los dientes. ㄹ entre vocales = r simple de "pero" (nunca rr); ㄹ final = l.
- ㅐ/ㅔ hoy suenan casi igual: se enseñan como ortografía, no como contraste de oído.
- 오 no es "cinco nativo" (eso es 다섯). El Lector dice hoy "un trazo más = más aire": alinear en una pasada posterior.

## 6. Alcance del prototipo (v1)
Un solo archivo `public/ttak/index.html` (sin build, como el Lector), móvil 375 px, modo día/noche compartido, sin rojo, azul #3D2EE8 / dorado #E8B84B, progreso en localStorage, sin cuenta. 30 niveles como datos + motor de Hangul (fórmula Unicode) + validador BFS que comprueba en carga que cada nivel es resoluble con el presupuesto exacto. Gancho al final de cada barrio: "Esto se ve en Básico 1 → Ver el curso" (una línea, sin popup).

Verificado el 19 sept: todas las metas, escaleras, candidatos de escucha, pares mínimos y las 55 palabras del diccionario tienen clip nativo; solo 친 김 선 생 님 (sílabas sueltas de palabras que sí tienen clip completo) usan TTS como relleno.
