# Decks de clase · Básico 1 y Básico 2 · octubre 2026

Generados el 9 oct 2026 desde el guion de slides de cada guía de profesor (sección C.14–C.17). Ocho agentes los convirtieron y dos revisores adversariales los compararon contra las guías: Básico 1 quedó sin correcciones y en Básico 2 se reemplazaron 5 láminas. El 10 oct se corrigieron los 141 defectos del control visual (ver abajo) y se agregó portada a Básico 2 S5 y S8 (lámina 0).

**Archivos:** `Curriculo/Fase2_Basico1/decks/Basico1_S0N_Kiran.pptx` y `Curriculo/Fase3_Basico2/decks/Basico2_S0N_Jay.pptx` (16:9). Las notas del orador de cada lámina dicen qué hacer, el tiempo y la fuente.

**Cómo regenerar (en esta PC):**
1. Edita `specs_decks_octubre_2026.json` (una lámina por objeto; layouts: portada, lista, glifos, palabras, comparar, ejercicio, tabla, frase, cierre).
2. Copia esta carpeta al scratchpad y ejecuta con los node_modules de ahí (pptxgenjs, jszip, puppeteer-core): `NODE_PATH=<scratchpad>/node_modules node make_decks.js specs_decks_octubre_2026.json [filtro]`. Al final de cada deck corre `sin_corte.js`: marca el hangul como coreano (`lang="ko-KR"`) y pone `eaLnBrk="0"`; sin eso PowerPoint parte palabras como 친/구예요.
3. `powershell -File post_com.ps1 -Files <decks>` (con PowerPoint cerrado: al final hace Quit): achica el texto que no cabe, encoge tablas que bajan hasta el pie, agrega las animaciones (la romanización `rom_*` aparece junta con un clic; cada respuesta `rev_N` con su clic) y exporta PNG a `decks/_qa/` (fuera de git). `node hoja_qa.js <carpeta_png> <salida.jpg> [cols]` arma una hoja de contacto para revisar.

**Lo que hace el generador solo:** título en una línea (elige 30/26/22 pt y omite la glosa en inglés si no cabe) · columnas o tablas de «lo incorrecto» (cabecera con «tachado/en gris», o «Lo que oí» cuando la lámina lo pide) en gris tachado · quiz «6–10» numerado desde 6 · tablas sin cabecera (bingo) sin barra vacía · respuestas en una línea si caben a ≥ 16 pt, si no en dos · lámina que pide una imagen y no la tiene → recuadro «Imagen pendiente» con la descripción.

**Reglas:** marca azul #4236F6, cabeceras navy, oro de acento, nunca rojo; coreano en Malgun Gothic; romanización solo en Básico 1 S1–S2; dibujos de las flashcards (Sticker pop) y audio SunHi incrustado cuando existe el clip.

## Imágenes sugeridas pendientes
Algunas láminas piden una imagen que no es de vocabulario (retrato de 세종, mapa del teclado, gestos, foto de 한글날…). Están en las notas del orador como «Imagen sugerida»; se pegan a mano en PowerPoint. Las más urgentes, porque la actividad no funciona sin ellas: Básico 1 S3 L15 (붕어빵) y L17–L18 (quiz con imágenes), S4 L2, L5–L6 y L18, S6 L5 (el día de Kiran) y S7 L5 (la pieza de Kiran).

Total: 121.

### Basico1_S01_Kiran.pptx · 11
- L1: Mapa mínimo del teclado coreano: fila A S D F G (ㅁ ㄴ ㅇ ㄹ ㅎ) y fila H J K L (ㅗ ㅓ ㅏ ㅣ)
- L2: Logo azul de Academia Seúl (plantilla de la casa)
- L3: Ícono del gesto de cada comando: palma abierta (따라 하세요), dedo que señala la pantalla (읽으세요), índice dibujando un círculo (다시 한번), pulgar arriba (잘했어요)
- L4: Retrato del rey Sejong (세종): 1 o 2 imágenes de A1_Nivel_1/Parte 1 - historia de hangul.pptx
- L5: Foto de una celebración de 한글날 con licencia libre (Wikimedia Commons)
- L8: Ícono de boca para cada vocal (abierta, relajada, redonda chica, redonda adelante, sonrisa, sonrisa de foto)
- L9: Dos bocas: abierta con labios relajados (ㅓ) y con labios redondos (ㅗ)
- L10: Dos bocas: sonrisa sin redondear (ㅡ) y labios redondos hacia adelante (ㅜ)
- L13: Flechas de orden de trazo sobre cada vocal
- L14: Dibujo de la boca de perfil o de frente para ㄱ, ㄴ, ㅁ, ㅅ y ㅇ
- L16: Ícono de una palma frente a la boca

### Basico1_S02_Kiran.pptx · 11
- L1: Logo azul de Academia Seúl (plantilla de la casa)
- L5: Edificio de tres pisos: consonante, vocal y 받침 en el piso de abajo
- L8: Dibujo de la lengua de perfil: adelante, tocando detrás de los dientes (ㄴ) / atrás, con la boca abierta (ㅇ)
- L9: Dibujo de una tira de papel frente a la boca
- L13: Foto de Kiran (del clip de Kiran o del post "Conoce a tus profes")
- L14: 3 fotos con licencia libre (Wikimedia Commons) o ilustraciones de Son Heung-min, Shakira y Pedro Pascal; nunca capturas de buscador
- L18a: Sin banderas (y sin rojo): cada tarjeta con el nombre del país o un ícono neutro
- L18b: Íconos de las cuatro ocupaciones (estudiante, profesora, oficina, médico)
- L20: Dibujo de una leve inclinación de cabeza (목례)
- L21: Dibujo de una puerta: la persona que sale (안녕히 가세요) y la que se queda (안녕히 계세요)
- L29: Pizarra de menú de restaurante coreano diseñada por nosotros (texto tipeado, no foto de internet), sin precios ni romanización

### Basico1_S03_Kiran.pptx · 8
- L1: Logo azul de Academia Seúl (portada de la casa)
- L5: Silueta de una bolsa o mochila (가방), en azul o gris; solo la pregunta, enorme
- L8: Esquema de 3 zonas: persona A con un lápiz (이거), persona B con un libro (그거) y un reloj lejos de los dos (저거); íconos de mano en el pecho, hacia el otro y a lo lejos
- L15: Foto de 붕어빵 sin texto (licencia libre o propia del equipo; sin rojo)
- L17: 5 imágenes numeradas, propias o íconos (ninguna en rojo): 1 pan · 2 vaso de leche · 3 libro · 4 taza de café · 5 plato de arroz
- L18: 5 imágenes numeradas, propias o íconos (ninguna en rojo): 6 silla · 7 gorro · 8 lápiz · 9 reloj de pulsera · 10 pepino
- L22: Dibujo simple de un café de Seúl: dos personajes frente a frente (A y B); cerca de A café, celular y libro; cerca de B bolso, paraguas y cuaderno; reloj en la pared del fondo y puesto de 붕어빵 en la calle, lejos de los dos. La misma escena de la tarjeta A del material del alumno. Sin rojo.
- L27: Sello del tigre (versión 2, sin marco)

### Basico1_S04_Kiran.pptx · 9
- L1: Logo azul de Academia Seúl (portada de la casa)
- L2: Dibujo: a la izquierda, Kiran con un libro en la mano; a la derecha, un alumno con una taza sobre su mesa; al fondo, lejos de los dos, un reloj en la pared. Flecha ① a la taza y flecha ② al reloj. Sin rojo (tampoco en las flechas).
- L5: Foto o dibujo de la familia de 덕선 (응답하라 1988 / Reply 1988) con 5 personas rotuladas: 아빠 · 엄마 · 언니 · 덕선 · 남동생. Imagen promocional oficial o árbol dibujado con los nombres si hay dudas de derechos (confirmar nombres: guía D.7).
- L6: La misma imagen de L5 con flechas numeradas: 1 아빠 · 2 엄마 · 3 언니 · 4 남동생; respuestas por clic
- L8a: Árbol de familia con íconos azules o grises: 할아버지 · 할머니 · 아빠 · 엄마 · 언니/누나 · 오빠/형 · 나 (en el centro) · 동생 (남동생 · 여동생); aparte: 친구 · 강아지 · 고양이
- L11: 3 fotos de banco de imágenes: una amiga joven · una abuela · una mamá
- L18: 5 grupos de siluetas azules o grises: ① 3 personas · ② 5 · ③ 1 · ④ 4 · ⑤ 2
- LLB1: Dibujo o imagen de la familia Simpson con cada nombre en 한글
- LLB2: Dibujo de palitos: una familia de 4 personas con un nombre sobre cada una (nombres por definir; azul o gris)

### Basico1_S05_Kiran.pptx · 7
- L2: Dibujo de 4 personas (familia) para el ítem 4; casilleros vacíos para los ítems 1–3
- L3: Mapa D1: América (de México a Chile) + EE.UU. + España + Corea, sin nombres de países, para sellos de anotación de Zoom; burbujas 산티아고예요. y 서울이에요.
- L6: Diagrama de 3 distancias (el de 이거 · 그거 · 저거 del deck S3) reusado para 여기 · 거기 · 저기
- L7: Dibujo D3: computador encima del escritorio; taza al lado del computador; celular encima de un libro; bolso debajo del escritorio con lentes asomando adentro; silla delante del escritorio; gato detrás de la silla; ningún paraguas
- L8: Viñetas D4: gato sobre, debajo y al lado de un escritorio (vista de lado); gato dentro de un bolso; gato delante y detrás de una casa (vista de mapa, puerta hacia la calle) + iconos de manos
- L15: Letrero D5: cartel genérico de salida de metro con el número 3 y la palabra 출구, y otro con 화장실 (ilustración o foto propia, sin logos de operadores)
- L22: Dibujos D6 lado a lado: dos versiones de D3 con 3 cambios (celular encima/debajo del libro; gato detrás/delante de la silla; lentes dentro del bolso / al lado del computador)

### Basico1_S06_Kiran.pptx · 9
- L2: Dibujo del escritorio: computador encima del escritorio; al lado del computador, una taza de café; una silla con un libro encima; debajo de la silla, un bolso; sin paraguas
- L3: El mismo dibujo del escritorio de L2
- L5: 5 imágenes numeradas, sin texto: sol y alguien que se estira · taza · parque y zapatillas · plato de arroz en casa · pantalla de Zoom con alumnos (ilustraciones de banco; opcional, una foto de Kiran)
- L6: Las mismas 5 imágenes de L5, ahora con las frases
- L8a: Ícono del gesto de cada verbo
- L8b: Ícono del gesto de cada verbo
- L15: Una casa con alguien que llama por teléfono y una persona en la calle con una flecha hacia la casa
- L17: Edificio con carteles de 학원 en una calle de noche, sin caras de menores identificables
- L20: 10 íconos de lugares numerados (casa, colegio, oficina, café, restaurante, parque, hospital con cruz azul, banco, academia, Corea)

### Basico1_S07_Kiran.pptx · 6
- L1: Plantilla de la casa: logo azul y sello del tigre (versión 2, sin marco)
- L5: Dibujo nuevo de la pieza de Kiran, sin texto: cama junto a la ventana · ventana · escritorio con computador encima · silla · foto sobre el escritorio · clóset con un espejo al lado · un dibujo (cuadro) · puerta · sin televisor
- L7: El mismo dibujo de la lámina 5 con marcas sí / no: X gris solo sobre el televisor (nunca roja); el espejo sí está
- L10: Fotos con licencia libre: un piso con 온돌 y un 요 extendido en el suelo
- L12: 3 fotos o íconos: un libro, audífonos, un lápiz
- L30: Sello del tigre (versión 2, sin marco)

### Basico1_S08_Kiran.pptx · 6
- L1: Portada de Repaso_MidTerm_A1.pptx lám. 1 con textos nuevos (plantilla de la casa, azul #4236F6, nada en rojo)
- L3: 4 fotos de los gustos reales de Kiran (los manda antes del vie 20 nov); provisionalmente: café, K-drama, ramyeon, deporte
- L9a: Imágenes sin texto (la palabra en 한글 aparece con clic): manzana verde o amarilla (nunca roja ni el emoji de manzana roja), banana, fruta variada, bulgogi, ramyeon
- L9b: Imágenes sin texto (la palabra en 한글 aparece con clic): película, canción, K-drama, deporte, kimchi
- L10: Foto de una caja de 사과 o de 배 con cada fruta envuelta una por una (manzana verde o amarilla, o el 배 dorado; nunca manzana roja)
- L19: Diseño de Repaso_MidTerm_A1.pptx lám. 34 (frase de marca del kit) con el sello del tigre (versión 2, sin marco)

### Basico2_S01_Jay.pptx · 8
- L2: Logo azul de Academia Seúl (plantilla de la casa)
- L4: Cuatro íconos simples, uno por razón (estilo de la casa, sin rojo)
- L5: 6 fotos de Jay, una por frase: su ciudad natal, su ciudad de hoy, su trabajo, su familia, su pasatiempo y su mascota (fotos propias)
- L12: Íconos simples de familia (hermanos mayores y menores), estilo de la casa, sin rojo
- L14: Animación: la ㄹ de 살 se muda a la silla vacía (ㅇ) de 아 → [사라요]
- L15: Foto con licencia libre de dos adultos inclinándose levemente al conocerse
- L18: Capturas de Zoom: 'Salir de la sala' → 'Salir de la sala para grupos' (con aviso: no 'Salir de la reunión') y 'Salas para grupos' → número de sala → 'Unirse'
- L19b: Foto del escritorio de Jay

### Basico2_S02_Jay.pptx · 9
- L1: Dos relojes: Santiago 21:00 (miércoles) · 서울 09:00 (jueves)
- L2: Logo azul de Academia Seúl (plantilla de la casa)
- L3: Dibujo para el ítem 3: una casa con un gato y ningún perro
- L5: Dos relojes (Santiago 21:05 · 서울 09:05) y el calendario de octubre de 2026 con el 21 y el 22 marcados
- L9: Reloj analógico con las 12 horas rotuladas en 한글 (한 시 … 열두 시)
- L10: Opcional: foto de la mascota de Jay para 제 강아지는 세 살이에요.
- L11: Tres relojes: 4:00 · 11:00 · 7:00
- L17: Hoja 'Calendario del curso' compartida en pantalla: 12 filas, de 일월 a 십이월, con una columna para los nombres
- L23: Foto con licencia libre de un plato de 미역국 (sopa de algas)

### Basico2_S03_Jay.pptx · 6
- L2: Tarjeta de cumpleaños dibujada con el texto del ítem 5: 지수 생일 파티 · 11월 6일 (금) · 저녁 7시 · 카페 서울
- L5: 6 fotos del día de Jay (las elige Jay, propias o con licencia libre), numeradas y con su hora, sin texto: despertador 7:00 · lavarse + desayuno 7:30 · computador 9:00 · ejercicio en el parque 18:00 · audífonos en casa 20:00 · pantalla de la clase 21:00
- L6: Las mismas 6 fotos de L5 en miniatura, una sobre cada frase
- L14: Un dibujo por par: persona en casa / persona descansando en casa · camino a la oficina / trabajando en la oficina · camino al café / estudiando en el café · reloj 9:00
- L17: Íconos: metro, noticias (televisor), tienda grande, persona presentando ante un grupo
- L21: Foto de una oficina en Seúl (licencia libre, sin marcas) con un reloj «Seúl, jueves 9:00»

### Basico2_S04_Jay.pptx · 8
- L2: Cartel del ítem 5 dibujado como aviso de café: 카페 한강 · 화요일 ~ 일요일 · 오전 8:00 ~ 오후 10:00 · 월요일은 쉽니다.
- L5: Logo azul de Academia Seúl (portada de la plantilla)
- L7: Fotos 1–3 del fin de semana de Jay (las elige Jay, propias o con licencia libre): parque · café · amigo + comida
- L8: Fotos 4–6 del fin de semana de Jay: libro · sofá · cocina
- L9: Dos manos dibujadas: una con 1 dedo (presente) y otra con 2 dedos (pasado)
- L11: Ícono de una mano levantada junto a ㅏ / ㅗ
- L18: Reloj 21:00–22:00 (nuestra clase) y mapa de Corea con una flecha 서울 → 부산; dibujo de una berenjena junto a 가지
- L22: Foto de un café de Seúl (licencia libre, sin marcas)

### Basico2_S05_Jay.pptx · 7
- L1: Foto genérica de una caja de palitos de chocolate con '11/11', sin logos de marca (propia o con licencia libre); en la frase, 였어요 destacado en azul
- L5: Foto real de Jay para su plan (Busan, un tren, Jeju o su plan verdadero)
- L11: Una taza (para la pregunta 이거 한국어로 뭐예요? — 컵이에요!)
- L13: Mapa simple de Corea con Seúl → Jeju (avión) y Seúl → Busan (tren); solo esos 3 lugares, sin romanización; si se quiere, una foto de Jeju o Busan
- L24: Captura del Lector en Practicar → Palabras, con la línea de corrección tapada (trae romanización)
- L25: Logo azul de Academia Seúl (plantilla)
- LExtra: 4 fotos de destinos sin nombre: Seúl, Busan, Jeju y Tokio (licencia libre)

### Basico2_S06_Jay.pptx · 3
- L5: Foto con licencia libre de un centro de examen o de padres esperando afuera el día del 수능, sin caras de menores identificables
- L7: 3 fotos de Jay: un cartel de 'no fumar' o Jay con un café · Jay bailando en un matrimonio (foto o GIF) · Jay manejando
- L28: Logo azul de Academia Seúl (plantilla)

### Basico2_S07_Jay.pptx · 8
- L7: Foto propia de dos tazas sobre la mesa: una de café y una de té (o dos tazas con etiqueta)
- L11: Foto con licencia libre de un vagón de metro lleno
- L12: Dos fotos con licencia libre: Seúl y Santiago (misma hora del día, encuadre parecido)
- L13: Flechas que llevan «que Santiago» a 산티아고보다, antes del adjetivo
- L16: Calendario de la semana de Jay (miércoles, mañanas, fin de semana, todos los días)
- L19: Foto propia: la billetera abierta con un billete de 천 원
- L20: Billetes coreanos de 천, 오천, 만 y 오만 원, sin conversión a dólares
- L21: Foto con licencia libre o dibujo propio: un estante con un solo pan y un cartel

### Basico2_S08_Jay.pptx · 5
- L4: Dibujo de un tren: el último vagón lleva el cartel del tiempo (pasado, futuro)
- L5: Ícono de tijera junto a la raíz: «la raíz no cambia»
- L11: Temporizador de 30 minutos en navy #003478 (nunca rojo)
- L14: Dibujo de dos manos entregando un diploma (두 손으로)
- L18: Logo azul de Academia Seúl
