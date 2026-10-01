# Guía de ilustración · estilo E · Pizarra escolar

Esta carpeta tiene **un archivo SVG por palabra** del mazo de Básico 1. `make.js` (la carpeta de arriba) los mete en el anverso de cada tarjeta, sobre la pizarra verde. Si una palabra no tiene archivo, o el archivo no pasa la validación, la tarjeta sale con un **anverso tipográfico de reserva** (el hangul grande sobre un cartel del color de la categoría). Por eso, si una palabra es abstracta y no tiene un dibujo claro, es mejor **no crear el archivo**.

Las 12 ilustraciones aprobadas (우유 나무 바다 모자 빵 물 책 가방 커피 우산 고양이 강아지) son la referencia de estilo. Ábrelas y cópialas sin miedo.

---

## 1. Nombre y ruta del archivo

`ilustraciones/<hex UTF-8 del campo kr>.svg`, todo en minúsculas, texto en NFC. Un espacio se codifica como `20`.

```
node -e "console.log(Buffer.from('엄마'.normalize('NFC'),'utf8').toString('hex'))"
```

| kr | archivo |
|---|---|
| 우유 | `ec9ab0ec9ca0.svg` |
| 엄마 | `ec9784eba788.svg` |
| 위 | `ec9c84.svg` |
| 안녕히 가세요 | `ec9588eb8595ed9e8820eab080ec84b8ec9a94.svg` |

`make.js` escribe la lista de lo que falta en `ilustraciones/_faltantes.txt` (número, semana, nombre de archivo, kr, es, categoría y la descripción del campo `dibujo` si viene en el JSON).

## 2. Plantilla exacta

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 176" width="220" height="176" data-kr="엄마" data-es="mamá">
  <g fill="none" stroke="#F3F0E4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <!-- el dibujo va aquí: path, circle, ellipse, rect, line, polyline, polygon, g y use -->
  </g>
</svg>
```

- **viewBox `0 0 220 176`, obligatorio.** En la tarjeta se dibuja a 262 × 210 px (escala 1,19).
- El `<g>` envolvente fija los valores por defecto: sin relleno, trazo tiza blanca, grosor 3, puntas y uniones redondas. Todo lo que dibujes los hereda; cambia solo lo que haga falta en cada elemento.
- Elementos permitidos: `path`, `circle`, `ellipse`, `rect`, `line`, `polyline`, `polygon`, `g` (para agrupar o girar con `transform`) y `use` (solo hacia los defs de la sección 6). Los comentarios `<!-- -->` están permitidos.
- **Para ver el dibujo no abras el .svg en el navegador** (faltan las caras y las tramas, que viven en `make.js`). Usa la muestra:

```
node make.js --muestra 엄마 위 --png C:/ruta/temporal/mi_muestra.png
```

Genera las tarjetas tal como saldrán e imprime en la consola `ok`, `aviso` o `ERROR` por archivo. Usa siempre `--png` con una ruta propia si otros agentes también están dibujando. Sin palabras (`node make.js --muestra`) muestra todos los archivos.

## 3. Lienzo y composición

- **Protagonista** centrado en x ≈ 110, entre y ≈ 25 y y ≈ 162; ancho típico 80–130. Debe leerse a 3 m: una sola idea, silueta simple.
- **Suelo**: una curva suave bajo el protagonista, siempre igual:
  `<path d="M46 165 C 92 172, 150 172, 188 161" stroke-width="2.2" stroke-opacity="0.65"/>` (puedes mover los extremos).
- **Adornos**: 2 a 4 en las esquinas libres (estrellas, gotas, corazón, notas), nunca encima del protagonista.
- Márgenes: nada fuera de x 8–212, y 6–172.
- Objetos, comida, lugares y cosas con cuerpo **cobran vida con una cara** (`#cara`), como en el mazo aprobado. Personas y animales llevan su propia cara (sección 5).
- Sin texto: nada de letras, palabras ni números escritos dentro del dibujo (el anverso ya muestra el hangul y no debe revelar el significado). Los símbolos dibujados con trazos (?, flecha, cruz de hospital, signo ₩) sí se permiten.

## 4. Paleta: estos 6 hex y ningún otro

| Nombre | Hex | Uso |
|---|---|---|
| Tiza blanca | `#F3F0E4` | Contornos y la mayor parte del dibujo (es el trazo por defecto). |
| Tiza dorada | `#E8B84B` | Acentos: pelo, frutas, pan, mangos, asas, estrellas, flechas, objetos "especiales". Uno o dos elementos por dibujo, no todo. |
| Tiza celeste | `#9FCBEF` | Agua, lluvia, vidrio, cielo, hielo. |
| Tiza menta | `#9ED9B0` | Hojas, tallos, verduras, pasto, plantas. Úsala con moderación (es la única novedad respecto del mazo de 12). |
| Durazno | `#F4B98C` | **Solo** mejillas, naricitas y orejas internas de animales. |
| Pizarra | `#1F3B33` | Rellenos que tapan lo de atrás, pupilas y brillos invertidos. Nunca como trazo visible. |

- **Nada rojo ni rosado, jamás** (regla de la casa: en Corea el rojo se asocia con la muerte). Una manzana va en menta o dorado; una cruz de hospital, en blanco o dorado; un corazón, en dorado.
- Sin `rgb()`, `hsl()`, nombres de color (`red`, `white`…) ni otros hex: el validador rechaza el archivo y la tarjeta sale tipográfica.
- Opacidades permitidas: `stroke-opacity` / `fill-opacity` entre 0.5 y 0.9 para trazos secundarios (líneas de textura, el suelo).

## 5. Trazo, rellenos y caras

**Grosores** (unidades del viewBox):

| Grosor | Para qué |
|---|---|
| 3 (heredado) | Contorno principal. |
| 2.2–2.6 | Detalles: bocas, ramas, olas, ojos cerrados, varillas, cordones. |
| 1.6–2 | Texturas internas (vetas, costuras, burbujas), a menudo con `stroke-opacity="0.6"`–`0.8`. |
| 3.2–4.5 | Énfasis: mango del paraguas, bombilla, collar, flechas. |

El validador avisa fuera de 1.2–5. No uses `stroke-dasharray` para "imitar tiza": `make.js` ya agrega el borde áspero a todos los trazos y el grano de tiza encima del dibujo.

**Tramas de relleno** (se ponen en `fill` del propio elemento, nunca en un `<g>`). `make.js` las convierte en líneas vectoriales recortadas a la forma:

| `fill=` | Aspecto | Para qué |
|---|---|---|
| `url(#rt)` | rayado blanco tenue | cuerpos y superficies (caja, tronco, tapas, ropa) |
| `url(#rb)` | rayado blanco fuerte | líquido blanco, nieve, un área que debe destacar |
| `url(#rd)` | rayado dorado | pelo, pan, frutas, piezas doradas |
| `url(#ra)` | rayado celeste | agua, vidrio, cielo |
| `url(#rm)` | rayado menta | hojas, verduras, pasto |

Rellenos sólidos permitidos: puntos blancos pequeños (manos, puntas; r ≤ 4), pizarra `#1F3B33` para tapar, durazno en mejillas/nariz, dorado en piezas chicas (r ≤ 5). Nunca un área grande en blanco sólido.

**Tapar lo de atrás.** El orden del archivo es el orden de pintura: primero lo que está atrás. Si una forma de adelante tiene que tapar líneas de atrás, dibújala dos veces: primero con `fill="#1F3B33"` y `stroke="none"`, después la misma forma con su trama y su trazo. Ejemplo (copa del árbol, cuerpo de la mochila):

```xml
<path d="…forma…" fill="#1F3B33" stroke="none"/>
<path d="…forma…" fill="url(#rt)"/>
```

Una forma sin trama que también tapa (cabeza de una persona, cabeza del gato) basta con `fill="#1F3B33"` y el trazo heredado.

**Caras** (defs compartidos, centrados en 0,0). Se colocan con `transform`, nunca se copian a mano:

```xml
<use href="#cara" transform="translate(110 64)"/>
<use href="#cara" transform="translate(100 114) scale(0.92)"/>
```

| id | Expresión | Uso típico |
|---|---|---|
| `#cara` | ojos ovalados blancos con brillo, sonrisa | por defecto |
| `#cara-feliz` | ojos ^ ^ y boca abierta | 좋아하다, saludos, 화이팅 |
| `#cara-dormida` | ojos cerrados hacia abajo, boca chica | 자다, 쉬다 (agrega "z z" con trazos) |
| `#cara-sorpresa` | ojos ovalados y boca en "o" | 정말요?, 네?, preguntas |
| `#cara-disgusto` | ojos > < y boca ondulada | 싫어하다 |

Medidas a escala 1: ojos en x = ±11 (ovalados 4,4 × 5,4), mejillas durazno en x = ±22, y = +11; boca entre y = +12 y +20. Ocupa unos 56 × 26: deja ese espacio libre y plano dentro de la forma. Escala 0.6–1.2 (0.6 en cosas chicas, 0.82 en una cabeza de persona). Mejillas siempre durazno; nunca rosadas ni rojas.

Ojos propios (animales, personas grandes), receta del gato y del perro: círculo blanco `r="6.5"`–`7` con `fill="#F3F0E4" stroke="none"`, pupila `#1F3B33` `r="2.4"` desplazada (−2.5, −2.5) y un brillo `#1F3B33` `r="1"` en (+2.5, +3). Naricita de animal: triángulo durazno. Boca "ω": dos curvas `stroke-width="2.4"`. Mejillas: elipse durazno `rx="6.5" ry="3.6"`.

## 6. Defs reutilizables (ids)

| id | Qué es | Tamaño a escala 1 | Escala recomendada |
|---|---|---|---|
| `#cara`, `#cara-feliz`, `#cara-dormida`, `#cara-sorpresa`, `#cara-disgusto` | caras (sección 5) | 56 × 26 | 0.6–1.2 |
| `#estrella` | destello de 4 puntas, dorado, trazo 2.5 | radio 10 | 0.6–1.05 |
| `#estrella-b` | el mismo destello en blanco, trazo 3 | radio 10 | 0.6–0.8 |
| `#gota` | gota celeste con relleno tenue | 8 × 12 | 0.8–1.4 |
| `#corazon` | corazón de contorno dorado | 20 × 21 | 0.7–1.1 |
| `#nota` | corchea doble dorada (música, canciones) | 22 × 24 | 0.7–1.1 |
| `url(#rt)` `url(#rb)` `url(#rd)` `url(#ra)` `url(#rm)` | tramas (sección 5) | — | — |

Se usan así: `<use href="#estrella" transform="translate(40 124) scale(0.8)"/>`. No existe ningún otro id; cualquier otro `href` o `url(#…)` invalida el archivo.

## 7. Recetas por categoría (para que el mazo se vea como uno solo)

- **Personas y familia**: figura de busto o cuerpo entero simple (ejemplo 2). Cabeza círculo r ≈ 30 con `fill="#1F3B33"`, cara `#cara` a 0.82, pelo en trama dorada `url(#rd)` con trazo dorado (o blanca `url(#rb)` para abuelos), cuerpo en campana con `url(#rt)`. Rasgos que distinguen sin estereotipos: edad por tamaño (niño más bajo y cabeza grande), abuelos con pelo blanco, lentes (dos círculos) o bastón; hermanos mayor/menor juntos con una flecha dorada hacia el que corresponde. Nada de piel coloreada: piel = pizarra con contorno blanco.
- **Comida y bebida**: el alimento con cara, sobre el suelo o en un plato/vaso; vapor con 3 curvas onduladas blancas `stroke-opacity="0.85"`. Comidas coreanas reconocibles por su recipiente (tazón de ramyeon con palillos dorados, plato de bulgogi).
- **Objetos**: el objeto de frente o en 3/4 con cara, trama blanca en las caras laterales (como 우유 y 가방).
- **Lugares**: fachada frontal simple (techo, puerta, ventanas en trama celeste) con cara en la fachada; un símbolo dibujado identifica el lugar (cruz blanca o dorada = hospital, signo ₩ dibujado = banco, taza = cafetería, árbol + banco = parque, inodoro simple = baño). Sin letreros con texto.
- **Naturaleza y animales**: como 나무, 바다, 고양이, 강아지. Plantas y hojas en menta.
- **Acciones** (verbos): una persona simple o un objeto con cara haciendo la acción, más 1 o 2 pistas (comer = tazón + palillos + cara feliz; dormir = cama + `#cara-dormida` + "z z"; ir = persona caminando + flecha dorada hacia la derecha; venir = flecha hacia el espectador/izquierda; ver = ojos grandes + tele; escuchar = audífonos + `#nota`).
- **Tiempo y rutina**: reloj, sol que sale, luna y estrellas, calendario sin números (cuadrícula con un casillero dorado).
- **Saludos y frases**: dos personas simples; reverencia (cuerpo inclinado), mano que saluda, manos juntas. `#cara-feliz`.
- **Preguntas y palabras útiles**: signo de pregunta grande dibujado con trazo dorado de 4 + el elemento de la pregunta (누구 = silueta, 어디 = mapa con punto, 뭐 = caja con ?). Si no hay imagen clara, no hagas archivo: queda la tarjeta tipográfica.
- **Posición** (위, 아래, 앞, 뒤, 옆, 안): **siempre la misma caja y la misma pelotita** (ejemplo 3), solo cambia dónde está la pelotita y la flecha dorada: 위 encima; 아래 debajo de una mesa (tablero en y ≈ 92, patas hasta el suelo); 앞 delante, más grande, tapando la esquina de la caja; 뒤 detrás, asomando y tapada a medias por la caja (la caja va después, con `fill="#1F3B33"`); 옆 al lado derecho, apoyada en el suelo; 안 dentro de una caja abierta (solapas abiertas, la cara frontal tapa la mitad de la pelotita).

## 8. Qué NO hacer

- Otro viewBox, otro color, rojo o rosado de cualquier tono, degradados, filtros, sombras, `opacity` en grupos, `<text>`, `<image>`, `<style>`, `<defs>`, `<pattern>`, `<clipPath>`, `<mask>`, atributos `id`, `class` o `style`, `href` a algo que no sea un def de la sección 6, enlaces externos, scripts (todo esto invalida el archivo).
- Rellenar áreas grandes con blanco sólido (la tiza se ve como trama, no como pintura).
- Copiar a mano la geometría de una cara o una estrella: usa `<use>`.
- Más de un protagonista o escenas con muchos personajes; detalles de menos de 3 unidades que desaparecen al imprimir.
- Letras, números o palabras escritas en el dibujo (ni coreano ni español), logos o marcas reales, banderas (en países usa la tarjeta tipográfica o un símbolo neutro).
- Imitar personajes de otras marcas o el tigre de la academia.
- Archivos de más de ~12 KB: simplifica.

## 9. Ejemplo 1 · 물 (agua), del mazo aprobado

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 176" width="220" height="176" data-kr="물" data-es="agua">
  <g fill="none" stroke="#F3F0E4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <!-- suelo: curva tenue, siempre igual -->
    <path d="M44 166 C 90 172, 150 172, 196 162" stroke-width="2.2" stroke-opacity="0.65"/>
    <!-- bombilla dorada: se dibuja ANTES del vaso para que quede adentro -->
    <path d="M118 150 L130 40 L148 28" stroke="#E8B84B" stroke-width="3.4"/>
    <!-- agua: la forma rellena con trama celeste (sin trazo) y su borde ondulado aparte -->
    <path d="M70 92 q3.75 -4 7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 L124 158 C 122 164, 78 164, 76 158 Z" fill="url(#ra)" stroke="none"/>
    <path d="M70 92 q3.75 -4 7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0 t7.5 0" stroke="#9FCBEF" stroke-width="2.6"/>
    <!-- vaso: boca elíptica + cuerpo; contorno blanco heredado (grosor 3) -->
    <ellipse cx="100" cy="54" rx="34" ry="7"/>
    <path d="M66 54 L76 158 C 78 164, 122 164, 124 158 L134 54"/>
    <!-- reflejo del vidrio: línea de textura fina y tenue -->
    <path d="M76 66 L81 118" stroke-width="2.2" stroke-opacity="0.6"/>
    <!-- burbujas -->
    <circle cx="90" cy="140" r="2.4" stroke="#9FCBEF" stroke-width="1.6"/>
    <circle cx="114" cy="146" r="2" stroke="#9FCBEF" stroke-width="1.6"/>
    <!-- cara compartida, un poco más chica porque el vaso es angosto -->
    <use href="#cara" transform="translate(100 114) scale(0.92)"/>
    <!-- gota grande al costado (forma propia) con su brillo blanco -->
    <path d="M172 62 C 182 78, 194 90, 194 106 A 22 22 0 0 1 150 106 C 150 90, 162 78, 172 62 Z" fill="url(#ra)" stroke="#9FCBEF" stroke-width="2.8"/>
    <path d="M159 104 C 159 97, 162 92, 166 88" stroke-width="2.2"/>
    <!-- adornos en las esquinas libres -->
    <use href="#gota" transform="translate(38 72) scale(1.3)"/>
    <use href="#gota" transform="translate(194 146)"/>
    <use href="#estrella" transform="translate(40 124) scale(0.8)"/>
    <use href="#estrella-b" transform="translate(184 36) scale(0.6)"/>
  </g>
</svg>
```

Qué enseña: orden de pintura (lo de adentro primero), trama + borde por separado, celeste solo para el agua, cara compartida escalada, 4 adornos en las esquinas.

## 10. Ejemplo 2 · 엄마 (mamá), receta de persona

Probado con `--muestra` (no está guardado como archivo; quien dibuje 엄마 puede partir de aquí).

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 176" width="220" height="176" data-kr="엄마" data-es="mamá">
  <g fill="none" stroke="#F3F0E4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M46 165 C 92 172, 150 172, 188 161" stroke-width="2.2" stroke-opacity="0.65"/>
    <!-- 1. pelo largo de atrás: va primero (queda detrás de la cabeza y del cuerpo) -->
    <path d="M78 64 C 72 90, 76 108, 86 116 L134 116 C 144 108, 148 90, 142 64 Z" fill="url(#rd)" stroke="#E8B84B" stroke-width="2.4"/>
    <!-- 2. cuerpo en campana: primero relleno pizarra (tapa el pelo), después la trama blanca -->
    <path d="M86 112 C 72 126, 66 146, 64 162 L156 162 C 154 146, 148 126, 134 112 Z" fill="#1F3B33"/>
    <path d="M86 112 C 72 126, 66 146, 64 162 L156 162 C 154 146, 148 126, 134 112 Z" fill="url(#rt)"/>
    <!-- collar dorado: el único acento -->
    <path d="M96 113 Q110 124 124 113" stroke="#E8B84B" stroke-width="2.4"/>
    <!-- brazos: una curva por brazo + mano como punto blanco (r 3.6); el derecho saluda -->
    <path d="M84 120 C 72 128, 66 140, 70 150"/>
    <circle cx="71" cy="153" r="3.6" fill="#F3F0E4" stroke="none"/>
    <path d="M136 120 C 150 114, 158 102, 162 90"/>
    <circle cx="163" cy="86" r="3.6" fill="#F3F0E4" stroke="none"/>
    <!-- 3. cabeza: círculo con relleno pizarra (la piel es la pizarra) y contorno blanco -->
    <circle cx="110" cy="72" r="31" fill="#1F3B33"/>
    <!-- 4. flequillo dorado encima de la cabeza -->
    <path d="M80 66 C 84 48, 98 40, 112 41 C 126 42, 138 50, 140 66 C 128 62, 117 56, 109 48 C 101 57, 91 63, 80 66 Z" fill="url(#rd)" stroke="#E8B84B" stroke-width="2.4"/>
    <!-- 5. cara compartida a 0.82, centrada en la parte baja de la cabeza -->
    <use href="#cara" transform="translate(110 80) scale(0.82)"/>
    <!-- 6. adornos: corazón (familia), estrellas -->
    <use href="#corazon" transform="translate(178 56)"/>
    <use href="#estrella" transform="translate(42 54) scale(0.9)"/>
    <use href="#estrella-b" transform="translate(186 128) scale(0.65)"/>
  </g>
</svg>
```

Variantes con la misma base: 아빠 (pelo corto dorado sin pelo largo de atrás, hombros más anchos), 할머니 (pelo blanco `url(#rb)` con moño, lentes = dos círculos blancos de r 7 sobre los ojos de la cara), 할아버지 (pelo blanco corto, lentes, bastón dorado), 동생 / 아이 (todo al 80 %, cabeza proporcionalmente más grande).

## 11. Ejemplo 3 · 위 (arriba), base de las 6 palabras de posición

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 176" width="220" height="176" data-kr="위" data-es="arriba, encima">
  <g fill="none" stroke="#F3F0E4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M46 165 C 92 172, 150 172, 188 161" stroke-width="2.2" stroke-opacity="0.65"/>
    <!-- la caja (igual en 위 아래 앞 뒤 옆 안): cara frontal, tapa y costado -->
    <path d="M72 108 L148 108 L148 160 L72 160 Z" fill="url(#rt)"/>
    <path d="M72 108 L86 96 L162 96 L148 108 M162 96 L162 148 L148 160"/>
    <path d="M148 108 L162 96 L162 148 L148 160 Z" fill="url(#rt)" stroke="none"/>
    <path d="M98 126 L122 150 M122 126 L98 150" stroke-width="2" stroke-opacity="0.6"/>
    <!-- la pelotita dorada con cara (igual en las 6): r 20, cara a 0.62 -->
    <circle cx="117" cy="72" r="20" fill="#1F3B33"/>
    <circle cx="117" cy="72" r="20" fill="url(#rd)" stroke="#E8B84B" stroke-width="2.6"/>
    <use href="#cara" transform="translate(117 70) scale(0.62)"/>
    <!-- flecha dorada que señala la posición -->
    <path d="M60 92 V40 M50 52 L60 40 L70 52" stroke="#E8B84B" stroke-width="3.2"/>
    <use href="#estrella-b" transform="translate(178 46) scale(0.7)"/>
    <use href="#estrella" transform="translate(190 120) scale(0.75)"/>
  </g>
</svg>
```

## 12. Antes de entregar

1. `node make.js --muestra <tus palabras> --png <ruta propia>.png` sin `ERROR` y mirando el PNG.
2. Que se entienda sin leer el hangul y sin texto en el dibujo.
3. Ni rojo ni rosado; solo los 6 hex de la sección 4.
4. Nombre de archivo = hex UTF-8 exacto del campo `kr` del JSON.
