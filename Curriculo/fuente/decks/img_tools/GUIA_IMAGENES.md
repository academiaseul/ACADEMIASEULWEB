# Guía para dibujar las imágenes de los decks (Academia Seúl · Básico 1 y Básico 2)

Las láminas de los decks traen un campo `imagen` ("Imagen sugerida"). Tú las resuelves: dibujas un SVG propio en el estilo de la casa, reutilizas una flashcard, extraes de un material propio de la academia o la dejas pendiente para Jay con una instrucción clara. **No descargas nada de internet** (ni fotos ni íconos).

## Dónde va cada imagen (`destino`) y qué tamaño dibujar
El generador coloca la imagen según el destino. Dibuja con ESTE viewBox (proporción exacta):

| destino | dónde aparece en la lámina | viewBox |
|---|---|---|
| `slide` | una imagen grande a la derecha de la lámina (4,25" × 4,9"), el texto queda a la izquierda | `0 0 425 490` |
| `item` | miniatura junto a cada pregunta de un ejercicio (`ejercicio.items[indice]`), se ve a ~0,8" | `0 0 220 220` |
| `glifo` | dentro de la tarjeta de cada letra/sílaba (`glifos[indice]`), a la izquierda del hangul | `0 0 220 220` |
| `palabra` | el dibujo de la tarjeta de vocabulario (`palabras[indice]`), reemplaza al de la flashcard | `0 0 220 220` |
| `col` | arriba de cada columna de una lámina comparar (`columnas[indice]`) | `0 0 440 200` |

Reglas de destino:
- Si la descripción pide UNA imagen para TODA la lámina (un escritorio, un mapa, un reloj, un diagrama) → `slide`.
- Si pide una imagen por ítem/letra/palabra/columna ("5 imágenes numeradas", "ícono de boca para cada vocal", "dos bocas: … (ㅓ) y … (ㅗ)") → una por elemento con su `indice` (0 = el primero del arreglo en el spec). Mira el arreglo del spec para saber el orden real.
- Las láminas `portada` y `cierre` ya traen logo y sello del tigre en la plantilla: si la imagen pedida es el logo o el sello → `sin_imagen` con motivo `plantilla`.
- "La misma imagen de la lámina X": copia tu SVG de esa lámina (puedes agregar flechas o marcas pedidas).

## Estilo de la casa ("Sticker pop", como las 163 flashcards de Básico 1)
- Contorno grueso `#14142B` (stroke 4–6 en un viewBox de 220; escala en proporción), esquinas redondeadas, `stroke-linejoin="round"`.
- Rellenos planos. Paleta: azul `#4236F6`, navy `#003478`, oro `#E8B84B`, amarillo `#FFD95E`, lila `#DCE0FA`, tinte `#F1F0FE`, blanco `#FFFFFF`, grises `#8A8DA0` `#5E6280` `#B3B8D6` `#E3E6F2`, pieles `#FFE0C4` `#F3C39A` `#C98A5E` `#8A5A3C`, madera `#C98A3E` `#A86B3C` `#74461F`, verdes `#2F8F57` `#7FD1AE`, mejillas `#FFB98A`, celeste `#9FD3F5`.
- **NUNCA rojo, rosado, coral, magenta ni fucsia** (en Corea el rojo se asocia con la muerte). Manzanas verdes o amarillas; cruz de hospital azul; corazones azules u oro; X de "no" en gris.
- Personas: personajes simples y amables como en las flashcards (cabeza redonda, ojos de punto, mejillas durazno), diversos; nunca el parecido de una persona real ni de un personaje con derechos (Simpsons, etc.). Niños solo en dibujo, nunca identificables.
- Fondo transparente o una forma suave propia (`#F1F0FE`/`#DCE0FA`); nada de cuadros de fondo duros en `item`/`glifo`/`palabra`.
- Sin texto, salvo que la descripción lo pida. Si va texto: coreano EXACTO copiado del spec o de la descripción (nunca inventes coreano), `font-family="Malgun Gothic"`; números y latinas en `font-family="Arial"`. Nada de romanización.
- Legible chico: pocas formas, contornos claros, sin detalles finos.
- Un solo archivo SVG autocontenido: sin `<image>`, sin enlaces externos, sin scripts, sin fuentes web.

## Reutilizar flashcards
`flashcards.tsv` (en esta carpeta) lista las 163 ilustraciones de Básico 1 (kr · es · ruta del SVG, viewBox 0 0 220 220). Si la imagen pedida es un objeto/lugar/persona de esa lista (빵, 우유, 책, 커피, 밥, 의자, 모자, 연필, 시계, 오이, 붕어빵, 가방, 컵, 집, 학교, 카페, 공원, 온돌, 요, 사과, 바나나…), cópiala (origen `flashcard`). Para escenas, puedes copiar los paths de varias flashcards dentro de un SVG nuevo con `<g transform="translate(..) scale(..)">` (origen `dibujo_nuevo`).

## Herramientas (ejecutar con `NODE_PATH=<scratchpad>/node_modules`)
- `node render.js <a.svg> …` → PNG en `<carpeta>/_png/`. **Mira cada PNG con la herramienta Read** y corrige hasta que se vea bien.
- `node check.js <carpeta>` → marca rojo/rosado, recursos externos, fuentes, falta de viewBox, y lista los textos. Debe terminar con 0 problemas.

## Dónde guardar
`C:/Users/Chingu/Desktop/ACADEMIASEULWEB/Curriculo/fuente/decks/img/<deck>/` con `<deck>` = `B1S1` … `B1S8`, `B2S1` … `B2S8`. Nombre: `L<L>_<destino><indice>.svg` (p. ej. `L17_item0.svg`, `L4_slide.svg`, `L9_col1.svg`). Raster solo si viene de un material propio de la academia (p. ej. extraído de un .pptx del repo): `.png`/`.jpg` con el mismo nombre.
Y un `map.json` en esa carpeta: `{ "imagenes": [ { "L": "17", "destino": "item", "indice": 0, "archivo": "L17_item0.svg", "origen": "dibujo_nuevo|flashcard|material_propio|captura_sitio", "descripcion": "…" } ], "sin_imagen": [ { "L": "13", "motivo": "plantilla|foto_jay|foto_kiran|persona_real|captura_zoom|otro", "instruccion": "qué tiene que conseguir o hacer Jay, concreto" } ] }`.
