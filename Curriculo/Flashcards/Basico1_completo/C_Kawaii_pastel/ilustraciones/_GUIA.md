# Guía de ilustración · Estilo C · Kawaii pastel (mazo completo de Básico 1)

Esta guía es para dibujar las ilustraciones que faltan del mazo de 163 tarjetas, **en el mismo estilo** que las 12 del mazo aprobado (우유 나무 바다 모자 빵 물 책 가방 커피 우산 고양이 강아지) y que el ejemplo de persona (학생). Antes de dibujar, mira `../../../Basico1_5_estilos/C_Kawaii_pastel/vista_previa.png` y abre 3 o 4 archivos de esta carpeta.

---

## 1. El archivo

| | |
|---|---|
| **Ruta** | `Curriculo/Flashcards/Basico1_completo/C_Kawaii_pastel/ilustraciones/<hex>.svg` |
| **Nombre** | `<hex>` = el campo `kr` de la palabra en **UTF-8, en hexadecimal minúscula, sin separadores**. Los espacios (`20`), signos (`?` = `3f`, `!` = `21`) y el punto medio (`·` = `c2b7`) también cuentan. Ej.: 우유 → `ec9ab0ec9ca0.svg`, 학생 → `ed9599ec839d.svg`. Es el mismo nombre que el audio en `public/audio/kr/`. |
| **Obtener el nombre** | `node make.js --hex 학생` (desde `C_Kawaii_pastel/`) o `node -e "console.log(Buffer.from('학생','utf8').toString('hex'))"` |
| **Qué falta** | `node make.js --faltan` lista cada palabra sin dibujo con su archivo esperado, categoría y el campo `dibujo`. |
| **Contenido** | Un solo `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200"> … </svg>`, UTF-8 sin BOM. Sin `width`/`height`. Segunda línea opcional: `<!-- 학생 · estudiante -->`. |
| **Plantilla** | `_plantilla.svg` (cópiala con el nombre `<hex>.svg`). Los archivos que empiezan con `_` no se leen. |
| **Peso** | ≤ 8 KB y ≤ ~60 elementos (las aprobadas pesan 1,4–3,8 KB). Coordenadas enteras o con 1 decimal. |

`make.js` inserta el contenido a 268 × 244 px (factor ≈ 1,22) dentro de un panel redondeado de 292 × 252 px pintado con el color de la categoría. Si un archivo tiene un **error** (ver §8), la tarjeta sale con el anverso tipográfico de reserva: no se rompe nada, pero el dibujo no aparece.

---

## 2. Lienzo y composición

- **viewBox `0 0 220 200`**, siempre. El motivo principal va centrado en **x ≈ 110**, dentro de **x 40–180, y 18–186** (unos 140 × 165).
- **Suelo** (sombra ovalada bajo el motivo), siempre detrás del motivo:
  `<ellipse class="kw-suelo" cx="110" cy="188" rx="64" ry="8" fill="#D2CBFA"/>`
  `cy` 186–191, `rx` 54–80 (un poco más ancho que la base del motivo), `ry` 6–8. **La clase `kw-suelo` es obligatoria**: `make.js` le pone el tono de la categoría; el `fill` es solo de reserva. Solo las escenas a sangre (como 바다) pueden ir sin suelo.
- **Esquina del número**: la pastilla "001/163" tapa el rectángulo **x < 44, y < 22**. No pongas nada ahí.
- **A sangre** (solo escenas: mar, cielo, pasto): lo que salga del viewBox se ve hasta x −10…230, y −5…202 y se recorta con el borde redondeado del panel (ver 바다, que dibuja de x −20 a 240).
- **Decoración**: 3 brillos + 3 puntos en los huecos de las esquinas, sin tocar el motivo:
  - brillos `<use href="#kw-brillo" transform="translate(x y) scale(s)" fill="…"/>` con `s` = 10–11, 7–8 y 5–6;
  - puntos `<circle r="3">`, `r="2.5"`, `r="2.5"`;
  - colores: blanco `#FFFFFF` (siempre se ve), dorado `#E8B84B`, lila `#CFC8FF`, según el fondo (tabla §4).
- Un solo motivo por tarjeta (dos como máximo si la palabra lo exige: 물 = gota + vaso; 언니 = dos personas). Sin marcos, sin fondo de color propio (el fondo lo pone la categoría), sin texto latino.

---

## 3. Trazo y forma

| Uso | Grosor | Atributos |
|---|---|---|
| Silueta principal | **3** | `stroke="#003478" stroke-width="3" stroke-linejoin="round"` |
| Piezas medianas (tapas, patas, lazos, zapatos, orejas) | **2,6** | idem |
| Detalles chicos (botones, hebillas, gotas, collar, manos) | **2,2–2,4** | idem |
| Mínimos (etiqueta, costura) | 1,5–2 | idem |
| Líneas internas sin contorno (vetas, pliegues, vapor, espuma, reflejos) | 2–5,5 | color del propio objeto o blanco, `stroke-linecap="round"` |

- **Todo contorno es navy `#003478`.** Nunca negro, nunca otro color de línea.
- **Trazo doble** para asas, colas, mangos, tirantes y brazos: dos paths idénticos con `fill="none" stroke-linecap="round"`: primero navy de ancho A, encima el color de ancho A − 6 (pares usados: 17/11 cola, 13/7 brazo, 14/8 asa, 11/5 tirante, 10/4 mango, 9/4 tirante fino).
- **Orden de capas con sombreado**: (1) la forma rellena **sin** trazo, (2) bandas de sombra / ondas / brillos encima, (3) el **mismo path** con `fill="none"` y contorno 3. Así la sombra nunca tapa la línea (ver ejemplo 1).
- **Brillo de volumen**: una elipse clara rotada −25° a −40° arriba a la izquierda del motivo (`#FFFFFF`, `#E4E0FF`, `#D6F4DD`, `#C6F0DE`, `#C9DBFF`, `#FFF3CC`, según el color del objeto).
- **Sombra**: el tercio inferior del objeto en un tono más oscuro del mismo color, con borde ondulado (`Q … T …`) o recto.
- Formas **redondeadas** y gorditas: `rx` en los rect, curvas `Q` en las esquinas, nada puntiagudo (salvo brillos). Rellenos **planos**: sin degradados, sin transparencias, sin sombras difusas.
- Máximo ~5 colores además de navy y blanco por dibujo. El azul de marca `#4236F6` es acento (cinta, lomo, techo, ropa), no relleno de fondo.

---

## 4. Colores

### Paleta permitida (hex exactos; fuera de esta lista `make.js` avisa)

| Familia | Hex |
|---|---|
| Base | `#003478` navy (contornos, ojos) · `#4236F6` azul de marca · `#E8B84B` dorado · `#FFFFFF` · `#FFFDF8` crema · `#FFF6E6` crema cálida (pelaje, piel de objetos) · `#FFCBA0` **mejillas (durazno)** · `#7A70FF` |
| Lilas | `#E4E0FF` `#E0DAFF` `#D2CBFA` `#CFC8FF` `#C9C1FF` `#B9B0F5` |
| Azules | `#D6E3FF` `#C9DBFF` `#B5DDFB` `#B3D5F6` `#A6D6FA` `#9FD3FA` `#8FB6FF` `#8CCBF6` `#7FC3F4` `#6FB8EE` `#6AB2EC` |
| Verdes | `#D6F4DD` `#CDEFE0` `#C6F0DE` `#A6E1B4` `#A3E0C6` `#A6DEC4` `#8ED3A0` `#7FD0B0` `#6CC7A4` |
| Amarillos | `#FFF3CC` `#FFF2D4` `#FBE08A` `#FBDD7E` `#F9DD8E` `#F6D47A` `#F3D27A` `#F0DA9C` `#E2B44E` |
| Madera · pan · café · pelaje | `#E9D6C0` `#E9C48E` `#E7B46E` `#E2B271` `#D9A462` `#C99A5E` `#8C6448` `#E8A866` (naricita) |
| Pieles · pelo | piel `#FFE4C8` clara · `#F2C99A` media · `#C98F5E` morena — pelo `#3B4566` oscuro · `#8C6448` castaño · `#E2B271` claro · `#DADCE6` canas |
| Grises fríos (metal, pantallas, piedra) | `#F1F2F7` `#D5D9E4` `#A9AFC3` `#6E7591` |

### PROHIBIDO: rojo y rosado

Nada rojo, rosado, magenta, fucsia, coral ni salmón (en la cultura coreana el rojo en un texto se asocia con la muerte; la casa no lo usa en ningún material). `make.js` marca **error** todo color de tono 290°–22° con saturación ≥ 25 %, y esa tarjeta sale tipográfica. Consecuencias prácticas:

- Mejillas: siempre `#FFCBA0` (durazno); en piel morena o fondo durazno, `#F3D27A` (dorado) o `#CFC8FF` (lila).
- Bocas abiertas: navy liso, **sin lengua**. Sin corazones.
- 사과 → manzana **verde** (`#A6E1B4` + `#8ED3A0`) o dorada. 김치 → frasco/옹기 cerrado o repollo (배추) verde-crema, nunca la salsa roja. 라면 → caldo dorado `#F6D47A`/`#E7B46E`. 고기, 불고기 → carne **cocida** marrón (`#C99A5E`, `#8C6448`).
- 병원 → cruz **azul** `#4236F6` sobre blanco. 화장실 → puerta con ícono navy (sin el clásico rosado/rojo).
- **Países (칠레, 한국, 멕시코, 콜롬비아, 미국, 페루, 스페인, 아르헨티나…): nunca banderas** (todas llevan rojo). Usa un ícono amable en colores de la paleta: 칠레 cordillera nevada; 한국 techo de 한옥 o la N Seoul Tower; 멕시코 cactus; 콜롬비아 planta de café; 페루 llama; 아르헨티나 sol dorado / mate; 스페인 abanico azul; 미국 estatua o rascacielos. Si no hay ícono claro, deja la palabra sin dibujo (sale tipográfica).

### Fondos de categoría (los pone `make.js`; tú solo eliges brillos que se vean)

| Categoría | Fondo | Suelo | Brillos que se ven |
|---|---|---|---|
| Personas y familia | `#FFDAB9` durazno | `#F2C497` | blanco, dorado, lila |
| Comida y bebida | `#CDE8FF` celeste | `#B3D5F6` | blanco, dorado, lila |
| Objetos | `#E6E1FF` lila | `#D2CBFA` | blanco, dorado |
| Lugares | `#FFF1C9` mantequilla | `#F0DA9C` | blanco, lila |
| Naturaleza y animales | `#CFF2E3` menta | `#A6DEC4` | blanco, dorado, lila |
| Acciones | `#F8D27A` dorado medio | `#EDBF5C` | blanco, lila |
| Tiempo y rutina | `#A9C9F7` azul medio | `#8FB4EE` | blanco, dorado |
| Saludos y frases | `#DDF0A8` lima | `#C6E08C` | blanco, dorado, lila |
| Preguntas y palabras útiles | `#C6BBFA` lavanda media | `#ADA1F0` | blanco, dorado |
| Posición | `#9EDDC9` menta media | `#80CBB3` | blanco, dorado, lila |

Evita que el color principal del motivo sea casi igual al fondo (p. ej., objeto `#F6D47A` en Acciones): sepáralo con más blanco, crema o un tono más oscuro. El contorno navy ayuda, pero el motivo tiene que destacar en miniatura.

---

## 5. Caras kawaii

**Todo motivo tiene cara**, también los objetos, edificios, relojes y signos. La cara va **al final del archivo** (encima de todo), en la parte media-baja del motivo. En escenas, la cara va en el elemento principal (en 바다, en el agua).

### Defs compartidos (están en la plantilla de `make.js`; los archivos solo los referencian por id)

| id | Qué es | Geometría (origen = punto medio entre los ojos) | Uso |
|---|---|---|---|
| `#kw-cara` | cara estándar | ojos navy r 6 en x ±15, brillo blanco r 1,98 en (+1,98, −1,98) de cada ojo; mejillas `#FFCBA0` rx 8 ry 5 en (±27, +11); boca `M-6 8 Q0 15 6 8`, trazo 2,6. Ocupa 70 × 24. | `<use href="#kw-cara" transform="translate(110 112)"/>` · objeto angosto: `scale(0.93)` o `scale(0.8)` |
| `#kw-cara-chica` | cara sin mejillas | ojos r 5,3 en ±12, boca `M-5 7 Q0 14 5 7` | cuando no caben mejillas a los lados; agrégalas aparte donde quepan (ver 가방: `<ellipse cx="102" cy="138" rx="6" ry="3.8" fill="#FFCBA0"/>` ×2) |
| `#kw-cara-feliz` | ojos cerrados de alegría (∩) + boca abierta navy + mejillas | ojos `M-21 2 Q-15 -7 -9 2` y simétrico | saludos, 감사합니다, 좋아하다, 화이팅, 잘했어요 |
| `#kw-cara-dormida` | ojos cerrados (∪) + boquita + mejillas | ojos `M-21 -1 Q-15 6 -9 -1` | 자다, 쉬다, noche, 요 |
| `#kw-cara-o` | ojos normales + boca "o" | boca elipse rx 3,6 ry 4,4 en (0, 12) | preguntas (뭐, 어디, 누구, 네?), sorpresa, 정말요? |
| `#kw-ojo` | un ojo suelto con brillo | r 6 + brillo r 1,98 | caras propias (animales, perfiles): `<use href="#kw-ojo" transform="translate(88 98) scale(1.08)"/>` |
| `#kw-brillo` | destello de 4 puntas de radio 1 | `M0 -1 Q0.2 -0.2 1 0 …` | `<use href="#kw-brillo" transform="translate(x y) scale(r)" fill="#FFFFFF"/>` — el `fill` va en el `<use>` |

- Escala: con `scale(k)` también escala el trazo de la boca; usa k entre 0,75 y 1,15.
- Las mejillas (±35 de ancho total con `#kw-cara`) deben caer **dentro** de la silueta; si el objeto es más angosto que ~76 a la altura de la cara, usa `scale(0.8)` o `#kw-cara-chica`.
- **Caras propias** (gato, perro, personas de perfil): ojos navy r 5,5–6,5 con brillo blanco de ≈ ⅓ del radio arriba a la derecha (o `#kw-ojo`), mejillas `#FFCBA0` elípticas, boca navy 2,4 en "ω" (`M102 113 Q106 119 110 113 Q114 119 118 113`) o curva. 싫어하다: ojos `#kw-ojo` + boca ondulada `M-7 10 Q-3.5 6 0 10 Q3.5 14 7 10`.
- **No** se pueden crear defs ni ids dentro de los archivos (chocarían entre tarjetas). Si de verdad hace falta un def nuevo, se agrega en el objeto `DEFS` de `make.js` con prefijo `kw-` y se documenta aquí.

---

## 6. Personas (Personas y familia, Acciones, Saludos)

Receta base = `ed9599ec839d.svg` (학생, ejemplo 2). Proporción chibi: la cabeza es ~55 % de la figura.

- **Cabeza** `<ellipse cx="110" cy="84" rx="48" ry="42"/>` en piel, contorno 3. **Orejas** `rx 8 ry 10` en (62, 92) y (158, 92), **antes** de la cabeza. **Cara** `#kw-cara` en (110, 98).
- **Pelo**: un path que cubre la parte de arriba con flequillo ondulado (`… Q150 70 138 64 Q128 74 112 69 Q98 76 84 67 Q72 72 63 86 Z`), contorno 3; reflejo `M82 50 Q94 42 108 42` en `#6E7591` (pelo oscuro) o `#FFFFFF` (pelo claro), trazo 3,5. Pelo largo: un segundo path **detrás** de la cabeza que baja hasta los hombros. Moño, coletas o lentes = piezas extra.
- **Pieles**: `#FFE4C8`, `#F2C99A`, `#C98F5E` — alterna entre tarjetas para que el mazo sea diverso. **Pelo**: `#3B4566` por defecto; `#8C6448`, `#E2B271`; canas `#DADCE6`.
- **Cuerpo pequeño**: torso de y ≈ 124 a 182, ancho ~64 (`M78 176 Q76 138 98 124 L122 124 Q144 138 142 176 Q142 182 136 182 L84 182 Q78 182 78 176 Z`); piernas `rect` 12 × 15 `#3B4566` rx 5; zapatos elipses blancas rx 10,5 ry 5,5 en y 186. Brazos con trazo doble 13/7 del color de la ropa; manos círculos r 6 en piel, contorno 2,4.
- **Ropa**: `#4236F6`, `#7FD0B0`, `#F6D47A`, `#CFC8FF`, `#8CCBF6`, `#FFF6E6`. Cuello de camisa blanco en V; detalles en dorado.
- **Quién es quién** (sin estereotipos de color: el género no se marca con rosado): 엄마/어머니 pelo largo castaño; 아빠/아버지 pelo corto + camisa celeste + bigote opcional navy; 할머니 moño `#DADCE6` + lentes redondos navy; 할아버지 canas a los lados + bastón `#C99A5E`; 언니/누나 coleta; 오빠/형 chico más alto; 동생/아이 cabeza `scale(0.85)` y sin uniforme; 선생님 lentes + puntero o pizarrón chico; 의사 bata blanca + estetoscopio navy; 회사원 corbata azul + maletín.
- **Parentesco** (언니, 오빠, 동생…): dos personas, la que nombra la palabra **adelante y más grande**, con un brillo dorado sobre la cabeza; la otra más chica y detrás.
- **Acciones**: el mismo personaje base (학생, pelo `#3B4566`, uniforme azul) haciendo la acción + **un** objeto clave: 먹다 cuenco de arroz + cuchara; 마시다 vaso; 자다 `#kw-cara-dormida` + "z" navy; 공부하다 libro + lápiz; 일하다 laptop; 운동하다 mancuerna; 보다 tele; 그리다 pincel y lienzo; 읽다 libro abierto; 쓰다 lápiz y cuaderno; 듣다 audífonos; 배우다 pizarrón con ㄱㄴ; 요리하다 olla; 일어나다 brazos arriba + sol; 가다/오다 flecha navy gruesa hacia afuera/adentro.

---

## 7. Ideas por categoría

- **Objetos, comida y bebida**: el objeto solo, de frente o en ¾ simple (como 우유 o 책), con cara.
- **Lugares**: fachada frontal simple con techo de color (집 techo azul; 학교 reloj en la torre; 병원 cruz azul; 은행 moneda dorada ₩; 카페 taza en el letrero; 식당 cuenco humeante; 공원 árbol + banca; 회사 edificio alto con ventanas celestes; 화장실 puerta + ícono navy); cara en la fachada o en la puerta.
- **Naturaleza y animales**: como 나무, 고양이, 강아지.
- **Tiempo y rutina**: calendario, reloj, sol, luna con cara (오늘 = calendario con un día marcado en azul; 지금 = reloj despertador; 매일 = calendario con ticks navy).
- **Posición** (위 아래 앞 뒤 옆 안): siempre la **misma caja** `#F6D47A` con cara y un gatito pequeño (como 고양이 a escala 0,45) colocado en la posición; para 위/아래 una flecha navy corta ayuda.
- **Preguntas y palabras útiles**: un signo "?" gordito blanco con contorno y cara `#kw-cara-o`, más un objeto que oriente (어디 mapa con pin azul; 누구 silueta lila; 뭐 caja con "?"). 네 = círculo O azul `#4236F6` con cara feliz; 아니요 = X navy con cara-o (en Corea O = sí/correcto, X = no). 이거/그거/저거 = mano señalando a distancias distintas.
- **Saludos y frases**: el personaje base con el gesto: 안녕하세요 inclinación (목례), 안녕 mano en alto, 감사합니다 manos juntas + `#kw-cara-feliz`, 화이팅 puño arriba + brillos dorados.
- **Texto dentro del dibujo**: solo jamo o hangul corto (≤ 4 sílabas) y dígitos, en `font-family="Jua, sans-serif"` navy, como el ㄱㄴㄷ del libro. **Nunca** la palabra de la tarjeta ni su traducción, nunca letras latinas.

---

## 8. Qué NO hacer (make.js lo revisa)

**Errores (la tarjeta sale tipográfica):** viewBox distinto de `0 0 220 200` · `id=` propios · `<defs>` con gradientes, filtros, patrones, máscaras o clipPath · `<style>`, `<script>`, `<image>`, `<foreignObject>` · `href` a algo que no sea `#kw-…` · cualquier rojo/rosado.

**Avisos (corrígelos):** colores fuera de la paleta · `style=""` · `rgb()`/`hsl()` · `opacity` · falta el suelo `kw-suelo` · no hay cara.

**Estilo:** sin contorno negro ni de color · sin degradados ni sombras borrosas · sin perspectiva compleja ni fotorrealismo · sin trazos finos (< 1,5) · sin cejas enojadas, dientes, lenguas, lágrimas ni sangre · sin armas · sin banderas · sin logos ni marcas (nada de Starbucks, Samsung, K-pop reales) · sin personas reales ni famosos · sin texto latino · no tapes la esquina del número · no copies dibujos de libros ni de internet.

---

## 9. Ejemplos comentados

### Ejemplo 1 · 우유 (objeto con sombreado) — `ec9ab0ec9ca0.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200">
  <!-- 우유 · leche -->
  <!-- decoración: 3 brillos (11, 8, 6) + 3 puntos en los huecos; blanco + dorado sobre celeste -->
  <use href="#kw-brillo" transform="translate(34 40) scale(11)" fill="#FFFFFF"/>
  <use href="#kw-brillo" transform="translate(190 38) scale(8)" fill="#E8B84B"/>
  <use href="#kw-brillo" transform="translate(194 118) scale(6)" fill="#FFFFFF"/>
  <circle cx="28" cy="118" r="3" fill="#FFFFFF"/>
  <circle cx="40" cy="156" r="2.5" fill="#E8B84B"/>
  <circle cx="200" cy="80" r="2.5" fill="#FFFFFF"/>
  <!-- suelo: clase obligatoria, el color lo pone la categoría -->
  <ellipse class="kw-suelo" cx="112" cy="187" rx="62" ry="8" fill="#D2CBFA"/>
  <!-- cara lateral del cartón: relleno, sombra inferior, y después el contorno solo -->
  <path d="M140 76 L168 62 L168 166 Q168 171 164 173 L140 182 Z" fill="#E4E0FF"/>
  <path d="M140 146 L168 132 L168 166 Q168 171 164 173 L140 182 Z" fill="#B9B0F5"/>
  <path d="M140 76 L168 62 L168 166 Q168 171 164 173 L140 182 Z" fill="none" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <!-- techo lateral, pestaña y techo frontal azul de marca: relleno + contorno en el mismo path -->
  <path d="M140 76 L98 40 L126 26 L168 62 Z" fill="#CFC8FF" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <path d="M98 40 L126 26 L126 17 L98 31 Z" fill="#FFFFFF" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <path d="M56 76 L98 40 L140 76 Z" fill="#4236F6" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <!-- gotita blanca sin contorno sobre el techo (detalle plano) -->
  <path d="M98 50 Q105 59 105 63 A7 7 0 0 1 91 63 Q91 59 98 50 Z" fill="#FFFFFF"/>
  <!-- frente: (1) relleno blanco sin trazo, (2) leche lila con borde ondulado, (3) mismo path con contorno -->
  <path d="M56 76 L140 76 L140 172 Q140 182 130 182 L66 182 Q56 182 56 172 Z" fill="#FFFFFF"/>
  <path d="M56 146 Q66.5 139 77 146 T98 146 T119 146 T140 146 L140 172 Q140 182 130 182 L66 182 Q56 182 56 172 Z" fill="#CFC8FF"/>
  <path d="M56 76 L140 76 L140 172 Q140 182 130 182 L66 182 Q56 182 56 172 Z" fill="none" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <!-- cara al final: centrada en el frente (x 98), un poco escalada porque el frente mide 84 de ancho -->
  <use href="#kw-cara" transform="translate(98 112) scale(0.93)"/>
</svg>
```

### Ejemplo 2 · 학생 (persona, base de Personas/Acciones/Saludos) — `ed9599ec839d.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200">
  <!-- 학생 · estudiante -->
  <!-- decoración (dorado se ve sobre el durazno de Personas y familia) -->
  <use href="#kw-brillo" transform="translate(32 40) scale(10)" fill="#FFFFFF"/>
  <use href="#kw-brillo" transform="translate(192 36) scale(7)" fill="#E8B84B"/>
  <use href="#kw-brillo" transform="translate(194 130) scale(6)" fill="#FFFFFF"/>
  <circle cx="24" cy="106" r="3" fill="#FFFFFF"/>
  <circle cx="204" cy="86" r="2.5" fill="#FFFFFF"/>
  <circle cx="36" cy="164" r="2.5" fill="#E8B84B"/>
  <ellipse class="kw-suelo" cx="110" cy="189" rx="60" ry="7" fill="#D2CBFA"/>
  <!-- mochila DETRÁS del cuerpo: solo se asoman los costados -->
  <rect x="62" y="128" width="96" height="46" rx="15" fill="#7FD0B0" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <!-- piernas cortas + zapatos blancos (trazo 2,6: piezas medianas) -->
  <rect x="94" y="170" width="12" height="15" rx="5" fill="#3B4566" stroke="#003478" stroke-width="2.6"/>
  <rect x="114" y="170" width="12" height="15" rx="5" fill="#3B4566" stroke="#003478" stroke-width="2.6"/>
  <ellipse cx="99" cy="186" rx="10.5" ry="5.5" fill="#FFFFFF" stroke="#003478" stroke-width="2.6"/>
  <ellipse cx="121" cy="186" rx="10.5" ry="5.5" fill="#FFFFFF" stroke="#003478" stroke-width="2.6"/>
  <!-- torso: uniforme azul de marca, camisa blanca en V, corbata dorada -->
  <path d="M78 176 Q76 138 98 124 L122 124 Q144 138 142 176 Q142 182 136 182 L84 182 Q78 182 78 176 Z" fill="#4236F6" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <path d="M99 124 L110 142 L121 124 Z" fill="#FFFFFF" stroke="#003478" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M110 136 L114 142 L110 150 L106 142 Z" fill="#E8B84B" stroke="#003478" stroke-width="2" stroke-linejoin="round"/>
  <!-- tirantes de la mochila: trazo doble 9/4 (navy abajo, menta arriba) -->
  <path d="M93 128 Q89 140 91 150" fill="none" stroke="#003478" stroke-width="9" stroke-linecap="round"/>
  <path d="M93 128 Q89 140 91 150" fill="none" stroke="#7FD0B0" stroke-width="4" stroke-linecap="round"/>
  <path d="M127 128 Q131 140 129 150" fill="none" stroke="#003478" stroke-width="9" stroke-linecap="round"/>
  <path d="M127 128 Q131 140 129 150" fill="none" stroke="#7FD0B0" stroke-width="4" stroke-linecap="round"/>
  <!-- objeto clave: libro dorado sostenido al frente (lomo azul, etiqueta blanca) -->
  <rect x="88" y="146" width="44" height="30" rx="5" fill="#F6D47A" stroke="#003478" stroke-width="2.6"/>
  <path d="M88 151 Q88 146 93 146 L96 146 L96 176 L93 176 Q88 176 88 171 Z" fill="#4236F6" stroke="#003478" stroke-width="2.2" stroke-linejoin="round"/>
  <rect x="103" y="152" width="22" height="9" rx="3" fill="#FFFFFF" stroke="#003478" stroke-width="1.8"/>
  <!-- brazos: trazo doble 13/7 del color de la ropa; manos = círculos de piel r 6 sobre el libro -->
  <path d="M84 132 Q72 148 87 161" fill="none" stroke="#003478" stroke-width="13" stroke-linecap="round"/>
  <path d="M84 132 Q72 148 87 161" fill="none" stroke="#4236F6" stroke-width="7" stroke-linecap="round"/>
  <path d="M136 132 Q148 148 133 161" fill="none" stroke="#003478" stroke-width="13" stroke-linecap="round"/>
  <path d="M136 132 Q148 148 133 161" fill="none" stroke="#4236F6" stroke-width="7" stroke-linecap="round"/>
  <circle cx="88" cy="162" r="6" fill="#FFE4C8" stroke="#003478" stroke-width="2.4"/>
  <circle cx="132" cy="162" r="6" fill="#FFE4C8" stroke="#003478" stroke-width="2.4"/>
  <!-- orejas ANTES de la cabeza; cabeza grande (chibi) en piel clara -->
  <ellipse cx="62" cy="92" rx="8" ry="10" fill="#FFE4C8" stroke="#003478" stroke-width="2.6"/>
  <ellipse cx="158" cy="92" rx="8" ry="10" fill="#FFE4C8" stroke="#003478" stroke-width="2.6"/>
  <ellipse cx="110" cy="84" rx="48" ry="42" fill="#FFE4C8" stroke="#003478" stroke-width="3"/>
  <!-- pelo: un path con flequillo ondulado + reflejo gris (pelo oscuro) + broche-brillo dorado -->
  <path d="M63 86 Q58 38 110 36 Q162 38 157 86 Q150 70 138 64 Q128 74 112 69 Q98 76 84 67 Q72 72 63 86 Z" fill="#3B4566" stroke="#003478" stroke-width="3" stroke-linejoin="round"/>
  <path d="M82 50 Q94 42 108 42" fill="none" stroke="#6E7591" stroke-width="3.5" stroke-linecap="round"/>
  <use href="#kw-brillo" transform="translate(142 52) scale(7)" fill="#E8B84B"/>
  <!-- cara estándar al final, bajo el flequillo -->
  <use href="#kw-cara" transform="translate(110 98)"/>
</svg>
```

---

## 10. Flujo de trabajo

1. `node make.js --faltan` → elige tus palabras; copia `_plantilla.svg` a `ilustraciones/<hex>.svg`.
2. Dibuja siguiendo esta guía y el campo `dibujo` de `palabras_basico1.json`.
3. Revisa: `node make.js --galeria 엄마,아빠 --salida <tu carpeta temporal>` → `galeria_ilustraciones.png` con cada dibujo sobre el color de su categoría. Lee la consola: **ERROR** = la tarjeta saldría tipográfica; **aviso** = corrígelo. Si trabajas en paralelo con otros agentes, usa siempre `--salida` propia.
4. Mira la miniatura: a la mitad de tamaño el motivo tiene que reconocerse y la cara verse.
5. El mazo completo lo arma una sola persona al final: `node make.js` (o `--semana N`).
