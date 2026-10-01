# Guía de ilustración · Estilo A · Sticker pop (Básico 1, mazo completo)

Esta carpeta tiene **un SVG por palabra**. `../make.js` los mete en el panel de color del anverso de cada tarjeta. Si falta una ilustración, la tarjeta sale igual, con un anverso tipográfico de reserva. Esta guía es la referencia para dibujar las ~150 palabras que faltan **exactamente** como las 12 del mazo aprobado (`우유 나무 바다 모자 빵 물 책 가방 커피 우산 고양이 강아지`), más `엄마`, que es el ejemplo de persona.

Antes de dibujar, abre y estudia 3 o 4 archivos de esta carpeta (como mínimo `ebb9b5.svg` 빵, `eab3a0ec9691ec9db4.svg` 고양이 y `ec9784eba788.svg` 엄마).

---

## 0. Qué dibujar

Cada palabra de `../../palabras_basico1.json` trae `dibujo` (la idea, en una frase) y `tipo_dibujo`: `objeto` es una cosa, un lugar o un animal con la cara de la casa; `icono` es una escena mínima con personaje o un símbolo para palabras abstractas (sección 8). Sigue la idea de `dibujo` adaptándola a las reglas de esta guía. Si la idea pide algo prohibido (rojo, texto, bandera), cámbiala como se indica en la sección 8.

## 1. Nombre y ubicación del archivo

```
Curriculo/Flashcards/Basico1_completo/A_Sticker_pop/ilustraciones/<hex>.svg
```

- `<hex>` = bytes UTF-8 del campo `kr` del JSON, en hexadecimal y en minúsculas. Se toma **el texto exacto**, con espacios y signos incluidos (el espacio es `20`). Es el mismo nombre que usa el clip de audio.
  `node -e "console.log(Buffer.from('엄마','utf8').toString('hex'))"` → `ec9784eba788` → `ilustraciones/ec9784eba788.svg`
- **Palabras que se escriben igual** (por ejemplo 안 = "dentro" y 안 = "no"): para darle a cada una su propio dibujo, usa `<hex>_<nnn>.svg`, donde `nnn` es el `n` de la palabra con 3 dígitos (`ec9588_118.svg`). Ese nombre tiene prioridad sobre `<hex>.svg`.
- Codificación UTF-8 y sin BOM. Un archivo = un solo elemento `<svg>…</svg>`. Puedes poner comentarios `<!-- -->` (make.js los quita), pero sin `--` dentro del comentario.

## 2. Plantilla obligatoria

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220" fill="none">
<!-- 사과 · manzana · Estilo A Sticker pop -->
  … capas 1 a 4 (sección 4) …
</svg>
```

- **viewBox `0 0 220 220`**, siempre. make.js descarta la etiqueta `<svg>` raíz y usa solo su contenido, dentro de su propio `<svg viewBox="0 0 220 220" fill="none">`.
- **La raíz lleva `fill="none"`. Por eso toda forma cerrada debe declarar su `fill`**; si no, queda transparente.
- Solo estilos en atributos (`fill`, `stroke`, `stroke-width`, `stroke-linejoin`, `stroke-linecap`, `opacity`, `transform`). Sin `class` ni `<style>`.
- Este estilo **no usa defs compartidos**: cada archivo es autónomo y se ve completo si lo abres solo. Lo único que va en `<defs>` son `clipPath` locales (sección 7). make.js renombra todos los `id` del archivo (los pasa a `i<hex>_<nnn>-<id>`), así que puedes usar `id="clip"` sin miedo a chocar con otro dibujo.

## 3. Lienzo y zonas

El panel muestra el SVG a 240 × 240 px (1 unidad ≈ 1,09 px; en papel, 220 unidades ≈ 2,5 in).

| Zona | Coordenadas (viewBox) | Regla |
|---|---|---|
| Figura principal | caja de ~130–175 unidades, centrada cerca de (110, 112) | El contorno exterior del sticker (borde de 12 unidades incluido) idealmente dentro de **x 12–208, y 12–212**; nunca fuera de 0–220 (se corta) |
| Botón de audio (lo tapa) | **x > 166 y y > 192** (esquina inferior derecha) | Aquí no va nada importante; tampoco adornos |
| Número "001/163" | x < 66 y y < 4 (borde superior izquierdo) | Nada |
| Adornos | esquinas y huecos libres | Ver sección 9 |

En el mazo aprobado las figuras van de x ≈ 30–190 y de y ≈ 25–200 (sin contar el borde del sticker). Un objeto de una sola pieza ocupa alrededor de 120 × 150.

## 4. Construcción del sticker, en este orden

1. **Silueta del sticker (3 capas), con las formas EXTERIORES de la figura** (pegadas en una sola mancha). Las mismas formas se repiten 3 veces:
   ```xml
   <g transform="translate(6 7)" opacity="0.28" fill="#14142B" stroke="#14142B" stroke-width="24" stroke-linejoin="round" stroke-linecap="round"> FORMAS </g>  <!-- sombra -->
   <g fill="#14142B" stroke="#14142B" stroke-width="24" stroke-linejoin="round" stroke-linecap="round"> FORMAS </g>  <!-- borde tinta -->
   <g fill="#FFFFFF" stroke="#FFFFFF" stroke-width="17" stroke-linejoin="round" stroke-linecap="round"> FORMAS </g>  <!-- borde blanco -->
   ```
   - Las FORMAS van sin atributos de color (heredan del `<g>`): `<path d="…"/>`, `<ellipse …/>`, `<rect … rx="…"/>`, `<circle …/>`.
   - **Partes finas abiertas** (asas, colas, bastón del paraguas, correas) de grosor visible `w`: en la silueta van como `<path d="…" fill="none" stroke-width="w+28"/>` en las dos capas de tinta y `stroke-width="w+21"` en la blanca. Luego se dibujan visibles en dos trazos: tinta `w+8` y color `w` (ejemplo: el asa del 가방, `w = 10`: silueta 38/38/31; visible 18 tinta + 10 azul).
   - Lo que flota suelto (vapor, gotas de lluvia, chispas) **no** entra en la silueta.
2. **Piezas de color**, de atrás hacia adelante. Cada pieza lleva `stroke="#14142B" stroke-width="4" stroke-linejoin="round"`. Los detalles internos (pliegues, rayas, costuras) van como líneas sin relleno de 2,5 a 4 (ver la tabla de grosores).
3. **Cara** (sección 6). Va casi siempre en el cuerpo principal, porque en este estilo los objetos tienen cara.
4. **Adornos** (sección 9): 2 o 3 chispas y 1 anillo, al final.

### Grosores (fijos, sin importar el tamaño de la figura)

| Elemento | stroke-width |
|---|---|
| Silueta: sombra y borde tinta | 24 (partes finas: w + 28) |
| Silueta: borde blanco | 17 (partes finas: w + 21) |
| Contorno de cada pieza de color | **4** |
| Contorno de piezas chicas (botones, hebillas, pez, lazo) | 3–3,5 |
| Detalles internos (rayas, pliegues, separaciones) | 3–4, en tinta o en el tono oscuro de la pieza (p. ej. `#B9861E` sobre dorado, `#2F8F57` sobre verde, `#74461F` sobre café) |
| Mini detalles (dedos de las patitas, puntadas) | 2,5–2,6 |
| Brillo (línea blanca o clara, sin borde, `stroke-linecap="round"`) | 4–6 |
| Chispas y anillo | 3 |
| Boca de la cara | 3 × escala |

Esquinas y uniones siempre redondas: `stroke-linejoin="round"` y, en líneas abiertas, `stroke-linecap="round"`. Las coordenadas van con 2 decimales como máximo.

## 5. Paleta permitida (hex exactos)

make.js avisa si aparece un color fuera de esta lista. **Si encuentra rojo, rosado o magenta, descarta la ilustración y usa el anverso tipográfico.**

| Familia | Hex | Uso típico |
|---|---|---|
| Tinta | `#14142B` | todos los bordes, ojos, boca, silueta |
| Blanco | `#FFFFFF` | borde blanco del sticker, brillos de ojos, chispas, piezas blancas |
| Azul marca | `#4236F6` | pieza protagonista azul (cartón de leche, tapa del libro, paraguas, ropa) |
| Azul oscuro | `#2A1FC7` | cara lateral o sombra de piezas azules |
| Navy | `#003478` | uniformes y detalles oscuros (con moderación) |
| Lavanda | `#DCE0FA` | caras laterales claras, platos, páginas a la sombra, brillos sobre azul |
| Azules claros | `#8FB0FF` `#9DB7FF` | agua, olas, gotas |
| Cielo / hielo | `#9FD8FF` `#E6F5FF` `#F3F6FF` | cielo, vidrio, interiores claros |
| Gris lavanda | `#B3B8D6` | líneas de texto dibujadas (páginas), metal suave |
| Lilas | `#C7B8FF` `#ECE6FF` | piezas lilas, flores (lila, nunca rosado) |
| Dorado | `#E8B84B` | piezas doradas, sol, hebillas, botones, pelaje del gato |
| Dorado oscuro | `#B9861E` | rayas y detalles sobre dorado, pelo rubio |
| Cremas | `#FFF4D9` `#FFE6B8` | barriga, miga, papel |
| Tostados | `#EDC27E` `#DDA45A` | puntitos de miga, bordes claros de pan |
| Amarillo claro | `#FFD95E` | plátano, estrellas, luz de lámpara |
| Naranja | `#F29B4E` | fruta naranja, zanahoria (con moderación: es el color del panel de Personas) |
| Verdes | `#5CC98A` `#2F8F57` `#7FD69A` `#B4F0C8` `#8FE3C6` `#6FCFAE` | hojas y copas (`#5CC98A`; detalle `#2F8F57`; brillo `#B4F0C8`), pasto `#7FD69A`, piezas menta |
| Cafés | `#C98A3E` `#A86B3C` `#74461F` `#6E4424` `#A0703F` `#D9A35F` `#4A3426` | corteza de pan, tronco, café líquido, madera, manchas del perro, pelo castaño (`#4A3426`) |
| Mejillas | **`#FFB98A`** (durazno) | mejillas de TODAS las caras |
| Interior de orejas | `#FFC59E` | orejas de animales |
| Pieles | `#FFE0C4` (clara) · `#F3C39A` (media) · `#C98A5E` (morena) · `#8D5A3B` (oscura) | personas (sección 6.3) |
| Grises | `#E3E6F2` (claro: canas, metal, pantalla apagada) · `#8A8FA8` (medio) · `#5E6280` (oscuro) | aparatos, canas, piedra |

Colores del **panel de fondo** según la categoría (ya los pone make.js; no los dibujes como fondo). El cuerpo principal de la figura no debe ser del mismo color que el panel de su categoría:

| Categoría | Panel |
|---|---|
| Tiempo y rutina | `#8C7CF0` violeta |
| Preguntas y palabras útiles | `#4AA3E6` celeste fuerte |
| Acciones | `#42C07A` verde |
| Personas y familia | `#F29B4E` naranja |
| Comida y bebida | `#E8B84B` dorado |
| Objetos | `#CDC0FF` lila |
| Naturaleza y animales | `#8FE3C6` menta |
| Lugares | `#B5E1FF` cielo |
| Saludos y frases | `#DDEF7A` lima |
| Posición | `#E9ECF8` gris lavanda |

Sin degradados, filtros, patrones, máscaras ni transparencias (la única opacidad es el `0.28` de la sombra). Color plano.

## 6. Caras

### 6.1 La cara de la casa (objetos, comida, lugares, aparatos)

Es idéntica en todo el mazo. Se pega con `translate(cx cy) scale(s)`, con `(cx, cy)` = centro entre los ojos:

```xml
<g transform="translate(110 120) scale(0.85)">
<ellipse cx="-14" cy="0" rx="6.5" ry="8.5" fill="#14142B"/>
<ellipse cx="14" cy="0" rx="6.5" ry="8.5" fill="#14142B"/>
<circle cx="-11.8" cy="-3.4" r="2.4" fill="#FFFFFF"/>
<circle cx="16.2" cy="-3.4" r="2.4" fill="#FFFFFF"/>
<ellipse cx="-26" cy="14" rx="7" ry="4.5" fill="#FFB98A"/>
<ellipse cx="26" cy="14" rx="7" ry="4.5" fill="#FFB98A"/>
<path d="M-8 13 Q0 25 8 13 Z" fill="#14142B" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>
</g>
```

- Los brillos de los ojos van los dos **arriba a la derecha** del ojo (−11,8 y +16,2), no en espejo. La boca es una "D" rellena de tinta (sonrisa abierta).
- Escala `s`: 1 en cuerpos de ≥ 90 de ancho (빵, 책, 나무), 0,85 en cuerpos medianos (모자, 커피, 우산, 엄마) y 0,72 en cuerpos chicos o con mucho detalle (가방). La cara mide 66·s de mejilla a mejilla: deja al menos 10 unidades libres a cada lado.
- Va en el **cuerpo principal**, centrada en x y un poco por debajo del centro óptico de la pieza (en un vaso, a media altura del líquido; en una taza, en la franja blanca).
- Las mismas coordenadas escritas a mano (sin `transform`): ojos `(cx∓14s, cy)` rx 6,5s ry 8,5s · brillos `(cx−11,8s, cy−3,4s)` y `(cx+16,2s, cy−3,4s)` r 2,4s · mejillas `(cx∓26s, cy+14s)` rx 7s ry 4,5s · boca `M cx−8s cy+13s Q cx cy+25s cx+8s cy+13s Z`, trazo 3s. Así está escrita en los 12 originales.

### 6.2 Cara de animal (gato, perro, pájaro, pez…)

Ojos más grandes con dos brillos, nariz y boca en "w". Centro `(cx, cy)` = punto medio entre los ojos (en el gato, `translate(100 92)`):

```xml
<g transform="translate(100 92)">
<ellipse cx="-30" cy="14" rx="8" ry="5" fill="#FFB98A"/>
<ellipse cx="30" cy="14" rx="8" ry="5" fill="#FFB98A"/>
<ellipse cx="-18" cy="0" rx="8" ry="10.5" fill="#14142B"/>
<ellipse cx="18" cy="0" rx="8" ry="10.5" fill="#14142B"/>
<circle cx="-15" cy="-4.5" r="3.2" fill="#FFFFFF"/>
<circle cx="21" cy="-4.5" r="3.2" fill="#FFFFFF"/>
<circle cx="-20.5" cy="5" r="1.6" fill="#FFFFFF"/>
<circle cx="15.5" cy="5" r="1.6" fill="#FFFFFF"/>
<path d="M-5 12 L5 12 L0 18 Z" fill="#14142B" stroke="#14142B" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M0 18 L0 22" stroke="#14142B" stroke-width="3.2" stroke-linecap="round"/>
<path d="M-9 21 Q-4.5 28 0 22 Q4.5 28 9 21" stroke="#14142B" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
```

Hocico claro (`#FFF4D9` o `#FFFFFF`), elipse de unos 20 × 13 detrás de la nariz. Bigotes del gato: líneas de 3,2 hacia afuera desde los cachetes. El perro (강아지) usa nariz ovalada en vez de triángulo: copia la suya de `eab095ec9584eca780.svg`.

### 6.3 Personas (familia, profesiones, pronombres)

Modelo: `ec9784eba788.svg` (엄마), comentado en el ejemplo 2. Es un **busto**:

- **Silueta** = pelo de atrás + cabeza + torso (+ brazos, si los hay).
- **Cabeza**: elipse de rx 44–48 y ry 42–46, centrada cerca de (110, 98), con relleno de piel y borde 4. Torso: media cúpula `M50 196 C50 166 76 150 110 150 C144 150 170 166 170 196 Z`. Cuello: rectángulo de piel de 24 de ancho entre la cabeza y el torso.
- **Pelo en dos capas**: (a) pelo de atrás, como pieza con borde 4 dibujada ANTES de la cabeza; (b) flequillo o mechón, dibujado DESPUÉS de la cabeza, **relleno sin borde** (así tapa el contorno de la cabeza) y con un trazo de 4 **solo en el canto de abajo**. Brillo del pelo: línea de 5 en `#6E4424` (pelo castaño) o `#5E6280` (pelo negro `#14142B`).
- **Cara**: la cara de la casa (6.1) a s = 0,85, unas 10–12 unidades por debajo del centro de la cabeza. Las orejas, si se ven, son elipses de rx 7 y ry 9 en piel con borde 4, dibujadas antes de la cabeza.
- **Pieles**: familia coreana (어머니, 아버지, 할머니…) en `#FFE0C4`. En personas genéricas (사람, 친구, 학생, 아이, 회사원, 의사) alterna `#FFE0C4`, `#F3C39A`, `#C98A5E` y `#8D5A3B` a lo largo del mazo. Las mejillas siempre en `#FFB98A`.
- **Pelo**: `#14142B`, `#4A3426` o `#B9861E` (rubio). Canas: `#E3E6F2` con detalles en `#8A8FA8`.
- **Ropa**: azul marca, dorado, menta, lila o navy, con cuello blanco o detalle dorado.
- Variantes: 아버지/아빠, pelo corto y camisa con cuello · 할머니, moño de canas · 할아버지, canas a los lados y cejas gruesas · 언니/누나, cola de caballo · 오빠/형, pelo corto en punta · 동생/아이, cabeza más grande y cuerpo más chico · 학생, mochila con tirantes · 선생님, lentes (círculos de r 13 sin relleno con borde 4 y un puente) + libro · 의사, delantal blanco y estetoscopio azul · 회사원, camisa y corbata.
- Manos (si hacen falta): "mitones" redondeados de piel con borde 4, sin dedos (como mucho 2 rayitas de 2,5).

## 7. Recortes (`clipPath`) y orden de pintado

Sirven para pintar un relleno que no debe salirse de una forma: líquido en un vaso, olas dentro de un círculo, franja de una copa.

```xml
<defs><clipPath id="clipVaso"><path d="(forma del vaso)"/></clipPath></defs>
<path d="(forma del vaso)" fill="#F3F6FF"/>                               <!-- fondo, sin borde -->
<g clip-path="url(#clipVaso)"> … agua, burbujas … </g>
<path d="(forma del vaso)" fill="none" stroke="#14142B" stroke-width="4" stroke-linejoin="round"/>  <!-- borde ENCIMA -->
```

Regla general: lo que va al fondo primero y el contorno de la pieza al final, para que el borde de 4 quede limpio.

## 8. Cómo resolver palabras difíciles (sin texto y sin rojo)

- **Nada de letras** en el dibujo (ni hangul ni latinas: la palabra ya va en la tarjeta). Los números o signos (`?`, `0`, flechas) se dibujan como formas, no con `<text>`.
- **Comida "roja"**: 사과, manzana **verde** (`#7FD69A` con detalle `#2F8F57`) o dorada · 김치, frasco u **옹기** café (`#6E4424`/`#A0703F`) con hojas de col verde-crema asomando, **nunca** el kimchi rojo · 고기 y 불고기, carne a la parrilla en cafés con marcas de parrilla `#74461F` · 라면, fideos dorados en olla o bol azul, caldo dorado-café · 배, pera coreana redonda en `#EDC27E` con hoja verde.
- **Países** (칠레, 멕시코, 콜롬비아…): **no se dibujan banderas** (casi todas tienen rojo y no se pueden recolorear). Usa un ícono del lugar sin rojo y sin estereotipos: 칠레, cordillera con nieve · 멕시코, pirámide escalonada · 콜롬비아, taza de café con montañas · 페루, montaña de Machu Picchu · 아르헨티나, sol de mayo dorado · 스페인, guitarra · 미국, Estatua de la Libertad verde · 한국, torre de Namsan o techo de 한옥 con cara. Si no hay un ícono claro, **no hagas archivo**: sale el anverso tipográfico.
- **Lugares** (집, 학교, 병원, 식당…): el edificio de frente como sticker, con la cara de la casa en la fachada o en la puerta. En 병원 la cruz va en **azul marca**, nunca roja.
- **Acciones** (가다, 먹다, 자다…): un personaje de la sección 6.3 o un objeto con cara haciendo la acción (bol de arroz con palillos para 먹다, almohada con ojos cerrados y "z" dibujadas para 자다, zapatilla con líneas de velocidad para 가다). Ojos cerrados = arco `M-20 0 Q-14 -6 -8 0` de trazo 3,5 (y su espejo), en lugar de las elipses.
- **Tiempo y rutina** (오늘, 지금, 매일…): calendario con cara (오늘), reloj despertador con cara (지금), sol y luna en ciclo con flechas (매일).
- **Saludos y frases**: personaje saludando con la mano, haciendo una reverencia (목례) o con una burbuja de diálogo **vacía** o con un ícono dentro (corazón NO; estrella, nota musical o signo ✓ dibujado en dorado o azul).
- **Preguntas** (뭐, 누구, 어디): signo de interrogación grueso dibujado como sticker (azul o dorado, con cara) acompañado de un objeto (lupa, mapa, silueta).
- **Posición** (위, 아래, 앞, 뒤, 옆, 안): caja azul `#4236F6` con cara + pelota dorada `#E8B84B` con cara en la posición pedida + flecha gruesa blanca con borde 4 que la señala. Usa siempre la misma caja y la misma pelota en las 6.
- **Pronombres** (나, 너, 저): personaje que se señala a sí mismo (나, 저; en 저 con una leve reverencia) o que señala hacia afuera (너).

## 9. Adornos

En cada dibujo van **2 o 3 chispas + 1 anillo**, en esquinas o huecos, sin tocar la figura y nunca en la zona del botón de audio (x > 166 y y > 192).

- **Chispa** de centro (x, y) y radio r (8 a 13), con k = 0,2·r:
  `M x y−r Q x+k y−k x+r y Q x+k y+k x y+r Q x−k y+k x−r y Q x−k y−k x y−r Z`, `fill="#FFFFFF" stroke="#14142B" stroke-width="3" stroke-linejoin="round"`.
  Ejemplo con (30, 40) y r = 12:
  `<path d="M30 28 Q32.4 37.6 42 40 Q32.4 42.4 30 52 Q27.6 42.4 18 40 Q27.6 37.6 30 28 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>`
- **Anillo**: `<circle cx="…" cy="…" r="6" fill="none" stroke="#14142B" stroke-width="3"/>`.
- Extras opcionales, según el tema: gotas (como las del 우산 o la del 우유), burbujas blancas sin borde (r 2–4), notas musicales dibujadas.
- Una chispa grande (r 12–13) y una chica (r 8–10), en esquinas opuestas.

## 10. Qué NO hacer

- Nada rojo, rosado, magenta ni fucsia: ni corazones rosados, ni mejillas rosadas, ni banderas, ni kimchi rojo, ni cruces rojas.
- Sin `<text>`, `<image>`, `<style>`, `<script>`, `class`, degradados, filtros, `mask`, `pattern`, opacidades parciales (salvo el 0.28 de la sombra) ni enlaces externos.
- No cambies el viewBox ni metas todo en un `transform` que achique la figura: dibuja en coordenadas 0–220.
- No dibujes el fondo del panel ni marcos: el panel, los puntitos, el número y el botón de audio los pone make.js.
- No uses negro puro `#000000`: la tinta es `#14142B`.
- No dejes formas cerradas sin `fill` (la raíz es `fill="none"`).
- No uses bordes más finos de 2,5 ni más gruesos de 4 en las piezas (fuera de la silueta).
- Las caras van siempre con los mismos ojos, brillos y mejillas: nada de ojos en forma de punto, de corazón ni de estrella.
- No metas escenas con muchas figuras pequeñas: una figura protagonista, como mucho dos (persona + objeto).
- No copies dibujos de libros, apps ni marcas registradas.

## 11. Ejemplos comentados

### Ejemplo 1 · 빵 (pan de molde), objeto de una pieza con cara (`ebb9b5.svg`)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220" fill="none">
<!-- CAPA 1 · silueta del sticker: UNA forma (la rebanada), 3 veces -->
<g transform="translate(6 7)" opacity="0.28" fill="#14142B" stroke="#14142B" stroke-width="24" stroke-linejoin="round" stroke-linecap="round">
<path d="M54 182 L54 100 C32 94 32 50 70 46 C86 30 134 30 150 46 C188 50 188 94 166 100 L166 182 Q166 192 156 192 L64 192 Q54 192 54 182 Z"/>
</g>
<g fill="#14142B" stroke="#14142B" stroke-width="24" stroke-linejoin="round" stroke-linecap="round">
<path d="(la misma rebanada)"/>
</g>
<g fill="#FFFFFF" stroke="#FFFFFF" stroke-width="17" stroke-linejoin="round" stroke-linecap="round">
<path d="(la misma rebanada)"/>
</g>
<!-- CAPA 2 · piezas de color: corteza (café #C98A3E, borde tinta 4) -->
<path d="(la misma rebanada)" fill="#C98A3E" stroke="#14142B" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
<!-- miga: la misma forma, 12 unidades hacia adentro; borde en el tono oscuro de la pieza (#DDA45A, 2,5), no en tinta -->
<path d="M66 176 L66 91 C46 86 47 60 75 58 C90 45 130 45 145 58 C173 60 174 86 154 91 L154 176 Q154 180 150 180 L70 180 Q66 180 66 176 Z" fill="#FFE6B8" stroke="#DDA45A" stroke-width="2.5" stroke-linejoin="round"/>
<!-- textura: 5 puntitos tostados sin borde, lejos de la cara -->
<ellipse cx="84" cy="158" rx="3.5" ry="2.5" fill="#EDC27E"/>
<ellipse cx="138" cy="164" rx="3" ry="2" fill="#EDC27E"/>
<ellipse cx="130" cy="72" rx="3" ry="2" fill="#EDC27E"/>
<ellipse cx="88" cy="78" rx="2.5" ry="2" fill="#EDC27E"/>
<ellipse cx="142" cy="140" rx="2.5" ry="2" fill="#EDC27E"/>
<!-- CAPA 3 · cara de la casa en (110,120), s = 1 (cuerpo de 112 de ancho) -->
<ellipse cx="96" cy="120" rx="6.5" ry="8.5" fill="#14142B"/>
<ellipse cx="124" cy="120" rx="6.5" ry="8.5" fill="#14142B"/>
<circle cx="98.2" cy="116.6" r="2.4" fill="#FFFFFF"/>
<circle cx="126.2" cy="116.6" r="2.4" fill="#FFFFFF"/>
<ellipse cx="84" cy="134" rx="7" ry="4.5" fill="#FFB98A"/>
<ellipse cx="136" cy="134" rx="7" ry="4.5" fill="#FFB98A"/>
<path d="M102 133 Q110 145 118 133 Z" fill="#14142B" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>
<!-- CAPA 4 · adornos: 3 chispas (r 11, 10, 8) + anillo, en esquinas libres; la de (198,150) queda por encima del botón de audio (y < 192) -->
<path d="M28 19 Q30.2 27.8 39 30 Q30.2 32.2 28 41 Q25.8 32.2 17 30 Q25.8 27.8 28 19 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>
<path d="M198 140 Q200 148 208 150 Q200 152 198 160 Q196 152 188 150 Q196 148 198 140 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>
<path d="M28 154 Q29.6 160.4 36 162 Q29.6 163.6 28 170 Q26.4 163.6 20 162 Q26.4 160.4 28 154 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>
<circle cx="196" cy="28" r="6" fill="none" stroke="#14142B" stroke-width="3"/>
</svg>
```

Lo que enseña: una sola forma de silueta, la pieza principal con borde 4, el detalle interior con borde de su propio tono, la cara en el cuerpo y los adornos en las 4 esquinas sin tocar la figura. (En el archivo real, el `d` de la rebanada va escrito completo en las 4 apariciones.)

### Ejemplo 2 · 엄마 (mamá), persona en busto (`ec9784eba788.svg`)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220" fill="none">
<!-- CAPA 1 · silueta: pelo de atrás + cabeza + torso, en ese orden, 3 veces (sombra / tinta 24 / blanco 17) -->
<g transform="translate(6 7)" opacity="0.28" fill="#14142B" stroke="#14142B" stroke-width="24" stroke-linejoin="round" stroke-linecap="round">
<path d="M56 112 C50 62 78 36 110 36 C142 36 170 62 164 112 L166 146 Q152 156 138 146 L82 146 Q68 156 54 146 Z"/>
<ellipse cx="110" cy="98" rx="46" ry="44"/>
<path d="M50 196 C50 166 76 150 110 150 C144 150 170 166 170 196 Z"/>
</g>
<!-- … el mismo trío en <g> tinta 24 y <g> blanco 17 … -->
<!-- CAPA 2 · piezas, de atrás hacia adelante -->
<!-- pelo de atrás (melena) en castaño #4A3426, borde 4 -->
<path d="M56 112 C50 62 78 36 110 36 C142 36 170 62 164 112 L166 146 Q152 156 138 146 L82 146 Q68 156 54 146 Z" fill="#4A3426" stroke="#14142B" stroke-width="4" stroke-linejoin="round"/>
<!-- torso en azul marca; cuello de piel; cuello de blusa blanco (2 lóbulos, borde 3,5); botón dorado -->
<path d="M50 196 C50 166 76 150 110 150 C144 150 170 166 170 196 Z" fill="#4236F6" stroke="#14142B" stroke-width="4" stroke-linejoin="round"/>
<path d="M98 132 L98 152 Q110 160 122 152 L122 132 Z" fill="#FFE0C4" stroke="#14142B" stroke-width="4" stroke-linejoin="round"/>
<path d="M110 158 Q92 148 84 160 Q96 172 110 160 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M110 158 Q128 148 136 160 Q124 172 110 160 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3.5" stroke-linejoin="round"/>
<circle cx="110" cy="176" r="4" fill="#E8B84B" stroke="#14142B" stroke-width="3"/>
<!-- cabeza: piel clara #FFE0C4 (familia coreana), borde 4 -->
<ellipse cx="110" cy="98" rx="46" ry="44" fill="#FFE0C4" stroke="#14142B" stroke-width="4"/>
<!-- flequillo: relleno SIN borde (tapa el contorno superior de la cabeza)… -->
<path d="M63 104 C58 64 82 46 110 46 C138 46 162 64 157 104 C152 84 140 72 124 70 C114 80 96 84 82 82 C72 86 66 94 63 104 Z" fill="#4A3426"/>
<!-- …y borde de 4 SOLO en el canto de abajo (raya al lado) -->
<path d="M157 104 C152 84 140 72 124 70 C114 80 96 84 82 82 C72 86 66 94 63 104" stroke="#14142B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<!-- brillo del pelo (un tono más claro, 5, sin borde) y horquilla dorada (pieza chica, borde 3) -->
<path d="M84 60 Q96 54 108 56" stroke="#6E4424" stroke-width="5" stroke-linecap="round"/>
<rect x="130" y="60" width="20" height="9" rx="4.5" fill="#E8B84B" stroke="#14142B" stroke-width="3" transform="rotate(-24 140 64.5)"/>
<!-- CAPA 3 · cara de la casa en (110,110), s = 0,85 (12 unidades bajo el centro de la cabeza) -->
<ellipse cx="98.1" cy="110" rx="5.53" ry="7.23" fill="#14142B"/>
<ellipse cx="121.9" cy="110" rx="5.53" ry="7.23" fill="#14142B"/>
<circle cx="99.97" cy="107.11" r="2.04" fill="#FFFFFF"/>
<circle cx="123.77" cy="107.11" r="2.04" fill="#FFFFFF"/>
<ellipse cx="87.9" cy="121.9" rx="5.95" ry="3.83" fill="#FFB98A"/>
<ellipse cx="132.1" cy="121.9" rx="5.95" ry="3.83" fill="#FFB98A"/>
<path d="M103.2 121.05 Q110 131.25 116.8 121.05 Z" fill="#14142B" stroke="#14142B" stroke-width="2.55" stroke-linejoin="round"/>
<!-- CAPA 4 · adornos: chispa grande arriba a la izquierda, chica a la derecha, anillo arriba a la derecha -->
<path d="M30 28 Q32.4 37.6 42 40 Q32.4 42.4 30 52 Q27.6 42.4 18 40 Q27.6 37.6 30 28 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>
<path d="M196 70 Q198 78 206 80 Q198 82 196 90 Q194 82 186 80 Q194 78 196 70 Z" fill="#FFFFFF" stroke="#14142B" stroke-width="3" stroke-linejoin="round"/>
<circle cx="190" cy="28" r="6" fill="none" stroke="#14142B" stroke-width="3"/>
</svg>
```

Lo que enseña: el truco del flequillo (relleno sin borde + canto de abajo con trazo), la cara de la casa sobre piel, el torso como media cúpula que se apoya abajo (y ≤ 196) y el uso del azul de marca en la ropa.

## 12. Cómo probar lo que dibujaste

Desde la raíz del repo (o con la ruta completa a make.js):

```
node Curriculo/Flashcards/Basico1_completo/A_Sticker_pop/make.js --validar
node Curriculo/Flashcards/Basico1_completo/A_Sticker_pop/make.js --muestra 엄마,빵,사과 --png C:/ruta/mi_muestra.png
```

- `--validar` revisa todos los archivos: viewBox, elementos prohibidos, colores fuera de paleta, rojo o rosado, y archivos que no corresponden a ninguna palabra. Muestra también qué palabras siguen saliendo en tipográfico.
- `--muestra` renderiza solo esas tarjetas (anverso y reverso, por `kr` o por `n`) en una hoja de contacto PNG. **Mírala siempre** antes de entregar: la figura no debe tocar el botón de audio, la cara tiene que verse y los adornos no pueden chocar con la figura.
- Ambos usan `../palabras_basico1.json`, o el archivo que indiques con `--datos <archivo.json>`.

## 13. Lista de control por dibujo

- [ ] Nombre `<hex>.svg` correcto (sección 1) y viewBox `0 0 220 220`.
- [ ] Silueta de 3 capas (sombra 0.28 desplazada `translate(6 7)`, tinta 24, blanco 17) con las formas exteriores.
- [ ] Piezas con borde tinta 4; detalles de 2,5 a 4; todo con `fill` explícito.
- [ ] Cara de la casa (o de animal o de persona) con mejillas `#FFB98A`.
- [ ] 2 o 3 chispas + 1 anillo, fuera de la figura y fuera de x > 166 y y > 192.
- [ ] Solo colores de la tabla; nada rojo ni rosado; sin texto.
- [ ] `--validar` sin errores y `--muestra` revisado a ojo.
