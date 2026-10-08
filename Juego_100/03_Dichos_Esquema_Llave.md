# Tigre 100 · Dichos, esquema de contenido y llave de alumno

## 1. Los 10 dichos (uno por barrio)

| Nivel | Barrio | 속담 | Literal | Significado | Equivalente | Chile |
|---|---|---|---|---|---|---|
| 10 | Gwanghwamun (광화문) · tramo 1 · jefe 10 'Ya leo Hangul' | **시작이 반이다** | El comienzo es la mitad. | Atreverse a empezar ya es la mitad del trabajo: lo más difícil es dar el primer paso. | Obra empezada, medio acabada (total). También se dice 'Lo más difícil es empezar'. | — |
| 20 | Bukchon (북촌) · tramo 2 · jefe 20 'Preséntate' (cierra lo gratis) | **누워서 떡 먹기** | Comer 떡 (pastel de arroz) acostado. | Algo facilísimo, que sale sin ningún esfuerzo. | Es pan comido (total). | Está papa / está papita (⚑ Jay confirma). |
| 30 | Estación de Seúl (서울역) · tramo 3 · jefe 30 'Perdido en Seúl' | **호랑이도 제 말 하면 온다** | Hasta el tigre viene si hablas de él. | Se dice cuando aparece justo la persona de la que estábamos hablando. | Hablando del rey de Roma, por la puerta se asoma (total). | — |
| 40 | Hongdae (홍대) · tramo 4 · jefe 40 'Yo en coreano' (cierre de Básico 1) | **금강산도 식후경** | Hasta el monte Geumgang se mira después de comer. | Por lindo o importante que sea algo, primero hay que comer. | Barriga llena, corazón contento (parcial: en coreano el acento está en 'primero se come'). Más exacto, pero menos usado en Latinoamérica: 'Primero es comer que ser cristiano'. | Guatita llena, corazón contento (⚑ Jay confirma). |
| 50 | Sinchon (신촌) · tramo 5 · jefe 50 'Un día en mi vida' | **티끌 모아 태산** | Juntando motitas de polvo, una montaña enorme. | Muchas cosas pequeñas, sumadas con constancia, se vuelven algo grande. | Grano a grano llena la gallina el buche (total). | — |
| 60 | Río Han (한강) · tramo 6 · jefe 60 'Mi vida en tres tiempos' (cierre de Básico 2) | **원숭이도 나무에서 떨어진다** | Hasta los monos se caen de los árboles. | Hasta el más experto se equivoca alguna vez. | Al mejor cazador se le va la liebre (total). | Al mejor mono se le cae el zapallo (casi literal; también se dice en Argentina y Uruguay; ⚑ Jay confirma). |
| 70 | Gwangjang (광장시장) · tramo 7 · jefe 70 'Cena en Gwangjang' | **가는 말이 고와야 오는 말이 곱다** | Solo si las palabras que se van son bonitas, son bonitas las que vuelven. | Si hablas con amabilidad, te responden con amabilidad. | Trata a los demás como quieres que te traten (parcial: el coreano habla de las palabras). También: 'Amor con amor se paga'. | — |
| 80 | Insadong (인사동) · tramo 8 · jefe 80 'Corea que amo, en mi voz' (cierre de Conversacional 1) | **낮말은 새가 듣고 밤말은 쥐가 듣는다** | Lo que se dice de día lo oyen los pájaros, y lo que se dice de noche lo oyen los ratones. | Cuidado con lo que dices: siempre puede haber alguien escuchando. | Las paredes oyen (total; también 'las paredes tienen oídos'). | — |
| 90 | Yeouido (여의도) · tramo 9 · jefe 90 '설날 con una familia coreana' | **백지장도 맞들면 낫다** | Hasta una hoja de papel en blanco es mejor levantarla entre dos. | Por fácil que sea una tarea, entre varios sale mejor. | La unión hace la fuerza (casi total: el coreano subraya que hasta lo más fácil sale mejor entre dos). También: 'Una mano lava la otra y las dos lavan la cara'. | — |
| 100 | Namsan (남산) · tramo 10 · jefe final 100 '달인' | **천 리 길도 한 걸음부터** | Hasta un camino de mil 리 empieza con un paso. | Todo gran logro se hace paso a paso, empezando por el primero. | Poco a poco se anda lejos (total). También el proverbio chino 'Un viaje de mil millas comienza con un solo paso'. | — |

## 2. Esquema JSON

TIGRE 100 · ESQUEMA DE CONTENIDO Y PROGRESO (v1.1 · diseño F0 revisado; todavía no se programa)

Los archivos reales son JSON puro (UTF-8, sin comentarios). Los // de este documento son solo explicación; si un archivo necesita una nota, va en un campo "_nota".

══════════════════════════════════════════════
0. CONVENCIONES
══════════════════════════════════════════════
ARCHIVOS
  public/tigre/contenido/mapa.json ....... los 101 niveles: títulos y objetivos, también los que tienen candado; sin ítems
  public/tigre/contenido/reglas.json ..... reglas que el motor vuelve a calcular (cópula; después partículas y conjugación)
  public/tigre/contenido/t01.json ........ tramo 1 = niveles 0–10 (gratis; el 0 va aquí)
  public/tigre/contenido/t02.json ........ tramo 2 = niveles 11–20 (gratis)
  juego/contenido/t03.json … t10.json .... tramos 3–10 = niveles 21–100 (alumno; FUERA de public/; solo los sirve /api/juego/tramo/[id])
  public/tigre/img/<nombre>.svg .......... ilustraciones. Las 163 de Básico 1 llevan el mismo hex que su audio (ec97b0ed9584.svg); las demás, un nombre corto (sejong.svg, dicho-20.svg). El campo "img" va siempre SIN extensión.

QUÉ CAMBIA RESPECTO DEL PLAN §7
  - Los tramos se llaman tNN, con NN = número de barrio: t01 Gwanghwamun, t02 Bukchon, t03 Estación de Seúl … t10 Namsan. Reemplaza t00-10 / t11-20 / t21-30, y tNN es también el id de la ruta de la llave.
  - El dicho vive dentro de su tramo (no en un dichos.json público): así los de 30–100 quedan con llave.
  - Romanización: "visible" en 1–9, "pista" solo en el jefe 10 y "no" desde el 11 (regla vigente). Hay que alinear con ella el texto del plan: §3 (mecánicas de 11–20), §5 (reglas fijas), el ejemplo del §7 con "rom":"pista" y el §7.7 ("ni como opción desde el 10").
  - Tope por tramo: 60 KB (el plan dice 80 KB en §7.7 y 60 KB en §7.8).

COMPATIBILIDAD CON 한글 RACE (public/hangul-race/motor.js + contenido.json)
  - Un ítem del banco es el MISMO objeto de Race: id, tipo, ko, rom, alt, es, tip, decir, nivel, curso, leccion, categoria, acceso, audio. Se le suman campos opcionales que Race ignora.
  - item.tipo sigue siendo la CLASE de Race: vocal | consonante | silaba | palabra | frase. El tipo de EJERCICIO se llama "modo", como en Race. Por eso el "tipos":[{"tipo":"copula"}] del plan pasa a "ronda":[{"modo":"copula"}], y el "tipo":"oracion" del plan pasa a "frase".
  - item.nivel sigue siendo la etiqueta MCER de Race ("A1"). El número de nivel del juego se llama "n".
  - acceso usa los valores de Race: "gratis" | "alumno".
  - La pregunta que arma el motor conserva la forma de Race {modo, item, prompt, correcta, opciones} y suma campos. "correcta" es siempre un VALOR (texto o id), nunca una posición, porque las opciones se barajan.
  - Motor: el de Tigre 100 es OTRO archivo (public/tigre/motor.js), con nuevaPartida(n, semilla). /hangul-race sigue con su motor.js y HR.nuevaPartida(modo, nivel, semilla) hasta F4. No es una misma función sobrecargada.
  - t01 y t02 no copian ítems de Race: los importan por id desde /hangul-race/contenido.json (campo "importa"). Un id de Race se define UNA sola vez (en Race) y ningún tramo lo redefine. Si una palabra de Básico 1 ya existe en Race (우유, 친구, 가방, 커피, 한국, 한글, 김치, 이름, 사람, 선생님…), se usa ese id. Lo que el tramo necesita sumarle (img, dibujo, batchim) va en "extiende" (§2).
  - Los ítems de Race traen rom y alt. Desde el nivel 11 el motor los IGNORA: no los muestra, no los ofrece como opción y no los acepta como respuesta. La prueba lo comprueba sobre las preguntas generadas (§13), no sobre los archivos.

IDS
  - ASCII y estables PARA SIEMPRE: son la clave del Leitner en el perfil. Si un texto cambia en la revisión, el id se queda; si un ítem se saca, su id no se reutiliza.
  - Prefijos: v- vocal · c- consonante · s- sílaba · w- palabra (como en Race) · f- frase · p- par mínimo · at- tablero · o- ordena · df- dos formas · d- dictado · ei- escucha-imagen · tr- tarjeta de regla · ojo- · cu- cultura · dicho-NN.
  - La romanización dentro del id es interna: nunca se muestra y no cuenta para la regla "sin romanización desde el 11".

TEXTO Y AUDIO
  - "ko" es exacto, sin punto final en respuestas cortas y con "?" en las preguntas, igual que los clips que ya existen (책이에요, 이게 뭐예요?).
  - "pron" va solo cuando la pronunciación difiere de la escritura (책이에요 [채기에요] sí; 가방이에요 no).
  - Audio por defecto: /audio/kr/<hex en minúsculas de los bytes UTF-8 de "decir" o, si no hay, de "ko">.mp3. Un "audio" vacío usa esa ruta; un "audio" lleno es un clip propio (p. ej. /audio/kr-jay/…).
  - "audio_existe" lo escribe la herramienta, nunca se escribe a mano, y prueba.js lo vuelve a comprobar (con y sin la puntuación final).

FECHAS
  - "AAAA-MM-DD" en la zona horaria del dispositivo (perfil, Leitner, racha).
  - Vencimientos de llave: ISO con zona, "2027-03-31T23:59:59-03:00".
  - Los segundos Unix aparecen solo dentro del token.

══════════════════════════════════════════════
1. mapa.json (público)
══════════════════════════════════════════════
{
  "esquema": "tigre-mapa-v1",
  "version": "2026-10-19",
  "barrios": [
    { "tramo": 1, "id": "gwanghwamun", "nombre": "Gwanghwamun", "ko": "광화문", "niveles": [0, 10],
      "acceso": "gratis", "tema": "El Hangul de Sejong", "curso": "a11", "semanas": [1, 2],
      "rango": { "ko": "새내기", "es": "Recién llegado/a" },          // un rango por barrio; Jay elige los nombres del 2 al 9
      "sello": "Lectura del Hangul: lectura, escucha y escritura guiada",   // sello honesto: dice lo que mide
      "dicho": "dicho-10" },
    { "tramo": 3, "id": "seoul-station", "nombre": "Estación de Seúl", "ko": "서울역", "niveles": [21, 30],
      "acceso": "alumno", "tema": "Familia, números y ¿dónde está?", "curso": "a11", "semanas": [4, 5],
      "rango": { "ko": "…", "es": "…" }, "sello": "…", "dicho": "dicho-30" }
    // … 10 barrios en total; el 0 (Incheon) va dentro del tramo 1
  ],
  "niveles": [
    { "n": 0, "tramo": 1, "clase": "puerta", "titulo": "Llegada a Incheon",
      "objetivo": "Leo y oigo mi primera palabra y elijo por dónde empiezo",
      "acceso": "gratis", "estado": "jugable", "minutos": 2, "rom": "visible" },
    { "n": 14, "tramo": 2, "clase": "nuevo", "titulo": "¿예요 o 이에요?",
      "objetivo": "Puedo elegir 예요 o 이에요 mirando la última sílaba",
      "acceso": "gratis", "estado": "jugable", "curso": "a11", "semana": 2, "minutos": 4, "rom": "no" },
    { "n": 20, "tramo": 2, "clase": "jefe", "titulo": "Jefe: Preséntate",
      "objetivo": "Me presento en coreano: nombre, país y profesión",
      "acceso": "gratis", "estado": "jugable", "curso": "a11", "semana": 3, "minutos": 6, "rom": "no",
      "aprobar": 80, "dicho": "dicho-20", "cta": "curso" },     // cta: el destino lo decide /api/cursos (inscribete o notificarme)
    { "n": 23, "tramo": 3, "clase": "nuevo", "titulo": "Números del 1 al 100",
      "objetivo": "Puedo decir mi número de teléfono",
      "acceso": "alumno", "estado": "proximamente", "curso": "a11", "semana": 4, "minutos": 4 }
  ]
}

VALORES
  clase:   puerta (0) · nuevo (x1–x4, x6–x8) · repaso (x5) · asi-se-dice (x9) · jefe (x0)
  estado:  jugable · proximamente
  rom:     visible (1–9; gris, pequeña, después del audio) · pista (solo el jefe 10, detrás de "ver pista") · no (desde el 11; la prueba lo verifica)
  aprobar: % al primer intento para aprobar un jefe. Aprobarlo abre el tramo siguiente; si ese tramo es de alumno, además hace falta la llave (o el "Saltar aquí" del tramo de su curso, que también la pide).

LISTA BLANCA DE CLAVES para los niveles con acceso "alumno"
  n, tramo, clase, titulo, objetivo, acceso, estado, curso, semana, minutos, aprobar, dicho, cta.
  Nada de items, ronda ni tarjetas: eso vive en el tramo protegido. Título y objetivo van en español, con una palabra coreana como máximo.

══════════════════════════════════════════════
2. TRAMO tNN.json
══════════════════════════════════════════════
{
  "esquema": "tigre-tramo-v1",
  "id": "t02", "tramo": 2, "rango": [11, 20],
  "version": "2026-10-22",              // en los tramos con llave también arma el ETag: "t03@2026-11-09"
  "acceso": "gratis",
  "revision": { "revisor": "Jay", "hoja": "Juego_100/revision/t02.md", "fecha": "2026-10-22", "estado": "ok" },
  "importa": { "/hangul-race/contenido.json": ["w-uyu", "w-chingu", "w-gabang", "w-keopi", "w-hanguk", "w-hangeul"] },
  "extiende": {                         // lo que este tramo le suma a un ítem importado (Race no tiene imágenes)
    "w-uyu": { "img": "ec9ab0ec9ca0", "dibujo": "caja de leche con una vaca dibujada y un vaso de leche al lado", "batchim": "" } },
  "listas": {
    "nombres": [                         // lista CERRADA; los nombres de pila coreanos nunca van con la cópula
      { "es": "María",  "ko": "마리아", "batchim": "",  "copula": "마리아예요" },
      { "es": "Sofía",  "ko": "소피아", "batchim": "",  "copula": "소피아예요" },
      { "es": "Camila", "ko": "카밀라", "batchim": "",  "copula": "카밀라예요" },
      { "es": "Mateo",  "ko": "마테오", "batchim": "",  "copula": "마테오예요" },
      { "es": "Marco",  "ko": "마르코", "batchim": "",  "copula": "마르코예요" },
      { "es": "Daniel", "ko": "다니엘", "batchim": "ㄹ", "copula": "다니엘이에요", "pron": "[다니에리에요]" },
      { "es": "Miguel", "ko": "미겔",   "batchim": "ㄹ", "copula": "미겔이에요",   "pron": "[미게리에요]" },
      { "es": "Juan",   "ko": "후안",   "batchim": "ㄴ", "copula": "후안이에요",   "pron": "[후아니에요]" },
      { "es": "Isabel", "ko": "이사벨", "batchim": "ㄹ", "copula": "이사벨이에요", "pron": "[이사베리에요]" },
      { "es": "Belén",  "ko": "벨렌",   "batchim": "ㄴ", "copula": "벨렌이에요",   "pron": "[벨레니에요]" }
    ]   // 3 mujeres y 2 hombres en cada grupo: el género no delata la forma. 마르코 cubre el "이 사람은 마르코예요" del nivel 22.
  },
  "items":      [ /* banco: §3 */ ],
  "ejercicios": [ /* ejercicios fijos escritos a mano: §5 */ ],
  "tarjetas":   [ /* regla, ojo, cultura y dicho: §6 */ ],
  "niveles":    [ /* una receta por nivel: §4 */ ]
}
// Solo en t03–t10: "_canario": "<32 caracteres hex al azar, distinto por tramo>". No se muestra nunca; sirve para la prueba de fugas (§13).

REGLAS DEL TRAMO
  - Pesa 60 KB o menos.
  - Solo se publica con 0 ítems con rev distinto de "ok" y 0 dudas "?" abiertas.
  - t03–t10 no llevan los campos rom, alt ni pista en ningún ítem, y llevan "_canario".

══════════════════════════════════════════════
3. ÍTEM DEL BANCO (el objeto de Race + campos nuevos)
══════════════════════════════════════════════
// Palabra de Básico 1 que NO está en Race. Sus datos vienen de palabras_basico1.json (n=44, semana 3, tipo "N").
{ "id": "w-yeonpil", "tipo": "palabra", "ko": "연필", "es": "lápiz",
  "nivel": "A1", "curso": "a11", "leccion": "S3", "categoria": "objetos", "acceso": "gratis",
  "img": "ec97b0ed9584",                                   // public/tigre/img/ec97b0ed9584.svg
  "dibujo": "lápiz amarillo de grafito, con la punta afilada y una goma en el otro extremo",   // texto alternativo y descripción para escucha-imagen
  "batchim": "ㄹ",                                         // la herramienta saca el índice con (código − 0xAC00) % 28 y lo traduce a la letra
  "fuente": "basico1:n44", "rev": "ok", "audio_existe": true }

// Frase con la cópula. Se genera en el escritorio, la revisa un nativo y el motor solo la verifica: no la arma.
{ "id": "f-yeonpil-ieyo", "tipo": "frase", "ko": "연필이에요", "es": "Es un lápiz.", "pron": "[연피리에요]",
  "base": "w-yeonpil", "regla": "copula", "forma": "이에요", "registro": "haeyo",
  "nivel": "A1", "curso": "a11", "leccion": "S2", "categoria": "copula", "acceso": "gratis",
  "n": 13,                       // nivel donde aparece por primera vez
  "img": "ec97b0ed9584", "fuente": "original",
  "rev": "pendiente",            // pendiente | ok | cambiar | sacar
  "audio_existe": false }        // comprobado: /audio/kr/ec97b0ed9584ec9db4ec9790ec9a94.mp3 no existe

// Ítem de Race: se importa, no se copia. rom y alt solo se usan en los niveles 1–9.
{ "id": "w-uyu", "tipo": "palabra", "ko": "우유", "rom": "uyu", "alt": ["uiu"], "es": "leche",
  "nivel": "A1", "curso": "a11", "leccion": "S1", "categoria": "comida", "acceso": "gratis" }
// Su imagen, su dibujo y su 받침 los suma el tramo en "extiende" (§2).

CAMPOS NUEVOS (todos opcionales para Race)
  pron ......... pronunciación real en [hangul], desde el nivel 8, solo cuando difiere de la escritura
  base ......... id de la palabra base de la frase (tiene que ser un sustantivo tipo N de Básico 1 o venir de listas.nombres si regla = copula)
  regla, forma . regla que la produce y forma correcta
  registro ..... haeyo (por defecto) | hamnida | banmal | handa
  n ............ nivel donde aparece por primera vez
  formula ...... true si se usa antes de enseñarse, como bloque fijo (p. ej. 저는 en el 14)
  img, dibujo .. ilustración (sin extensión) y su descripción
  batchim ...... letra del 받침 de la última sílaba, o "" si termina en vocal
  fuente ....... original | race | basico1:nNN | dubu
  rev .......... estado de la revisión nativa
  audio_existe . lo escribe la herramienta

══════════════════════════════════════════════
4. RECETA DE NIVEL (dentro de tNN.json → "niveles")
══════════════════════════════════════════════
{ "n": 14,
  "portada": { "puedo": "Puedo elegir 예요 o 이에요 mirando la última sílaba", "suena": "f-chaek-ieyo" },
  "calentamiento": {
    "cantidad": 2, "de": "leitner",      // 2 ítems vencidos y DISPONIBLES del repaso espaciado
    "si_no_hay": [                       // para quien juega por primera vez
      { "modo": "clasifica-batchim", "items": ["w-keopi"] },
      { "modo": "reconoce", "ve": "audio", "elige": "hangul",
        "items": ["w-haksaeng", "w-hanguk", "w-hangeul", "w-halmeoni"], "correcta": "w-haksaeng" } ] },
  "adivina": [],                         // el 14 no abre regla nueva (12 y 13 llevan 1–2 ítems de "adivina primero")
  "tarjeta": "tr-copula",                // recordatorio de 20 s; se reabre con "¿Cuál era la regla?"
  "ronda": [
    { "modo": "copula", "items": ["f-chaek-ieyo", "f-uija-yeyo", "f-gabang-ieyo", "f-keopi-yeyo", "f-yeonpil-ieyo", "f-chingu-yeyo"], "cantidad": 6 },
    { "modo": "copula", "items": ["f-jeoneun-haksaeng-ieyo"], "marco": "저는 {base}___", "cantidad": 1 },
    { "modo": "copula", "items": ["f-maria-yeyo"], "cantidad": 1 },
    { "modo": "escucha-imagen", "items": ["ei-uyu-yeyo"], "cantidad": 1 },
    { "modo": "ordena", "items": ["o-soy-daniel"], "cantidad": 1 }
  ],
  "preguntas": 10,                       // 5 con 받침 (책, 가방, 연필, 학생, 다니엘) y 5 sin 받침 (의자, 커피, 친구, 마리아, 우유)
  "ojo": "ojo-anieyo",
  "rom": "no",
  "introduce": [],                       // estructuras nuevas (máximo 2–3)
  "usa": ["batchim", "copula"],          // todo lo de aquí tiene que estar en el "introduce" de un nivel anterior
  "recursos": ["lector:aprender-6", "flashcards:s3"],
  "siguiente": 15 }
// df-chaek-ieyo (dos-formas) pasa al nivel 19, para no pasar de 3 modos (ver dudas).

EL MOTOR APLICA
  - Ronda de reconocer → armar u ordenar → escribir.
  - El ítem fallado vuelve al final de la ronda.
  - Nunca dos preguntas iguales seguidas (como tomar() en Race).
  - Calentamiento: 2 ítems vencidos del Leitner que estén disponibles. Un ítem de un tramo no cargado (sin llave o sin red) se salta; si no queda ninguno, se usa "si_no_hay".
  - Máximo 3 modos en la ronda de los niveles nuevos (x1–x4, x6–x8). El calentamiento no cuenta; repaso, x9 y jefe mezclan por diseño.
  - Variantes por clase de nivel:
      · repaso: "ronda" mitad del tramo y mitad "de":"leitner-anteriores", 15 preguntas;
      · jefe: 20 preguntas, "transferencia" (5 o más ids nunca practicados con la regla; en 11–20, solo sustantivos tipo N de Básico 1 o nombres de la lista; p. ej. en el 20: 모자예요, 나무예요, 오이예요, 우산이에요, 책상이에요), 4 de escucha, 2 de ortografía y "aprobar": 80.

══════════════════════════════════════════════
5. EJERCICIOS, UNO POR MODO
══════════════════════════════════════════════
Cada modo tiene dos formas:
  a) lo que se escribe en el JSON (receta o ejercicio fijo);
  b) la pregunta que arma el motor, con la forma de Race.
La explicación siempre es {titulo, lineas} (como explicar() de Race), en máximo 2 frases, y sale de la regla.

5.1 reconoce (de Race)
  Variantes: "ve" = hangul | audio | img | texto · "elige" = rom (SOLO n ≤ 9) | hangul | img | es | texto.
  a) nivel 1: { "modo": "reconoce", "ve": "hangul", "elige": "rom", "items": ["v-a", "v-eo", "v-o", "v-u", "v-eu", "v-i"], "cantidad": 3 }
  b) { "modo": "reconoce", "item": {…v-eo…}, "prompt": "ㅓ", "decir": "어", "correcta": "eo",
       "opciones": ["o", "eo", "u", "a"], "rom_visible": true }
     Si falla: { "titulo": "ㅓ = eo", "lineas": ["o abierta, boca relajada (sin redondear los labios)", "«o» es ㅗ: o de oso, labios redondos"] } (la primera línea es el tip de Race).
     audio_existe: 어 sí.

5.2 construye (de Race)
  a) nivel 5: { "modo": "construye", "silabas": ["가", "너", "고", "누"], "cantidad": 2 }
  b) { "modo": "construye", "item": {…}, "piezas": ["ㄴ", "ㅓ"], "correcta": "너",
       "opciones": ["노", "너", "더", "나"], "vertical": true, "batchim": false }
     Distractores de las confusiones de Race: ㅓ con ㅏ/ㅗ/ㅜ y ㄴ con ㄷ/ㄹ. Clips de 너, 노, 더 y 나: sí existen.

5.3 corre (de Race; solo en el modo opcional con tiempo)
  { "modo": "corre", "items": ["w-namu", "w-uyu", "w-oi", "w-bada", "w-moja"], "segundos": 60, "opcional": true, "acepta": "rom+hangul" }
  En Race, la pregunta de Corre trae correcta = item.rom y "pista" = romanización por sílabas. En Tigre 100:
    · 1–9: igual que Race (acepta rom o hangul; coincide/vaBien);
    · 10: "acepta": "hangul" (teclado), correcta = item.ko y la pista en rom solo detrás de "ver pista";
    · desde el 11: correcta = item.ko y sin pista.
  Ojo con un alt que sea el comienzo de otro alt.

5.4 arma-tablero (de Dubu; el mismo objeto de nivel que en MUNDOS)
  a) nivel 3: { "id": "at-namu", "modo": "arma-tablero", "meta": "나무", "gloss": "árbol", "grid": 3, "ver": "rr" }
     Valores de "ver" (en Dubu, "hangul" muestra la sílaba fantasma Y la romanización, y "oido" revela la romanización al 3.er fallo):
       · 1–9: "hangul" | "rr" | "oido", como en Dubu;
       · 10: "oido", con la romanización solo en "ver pista" (sin la revelación automática de Dubu);
       · desde el 11: "ko" (nuevo): sílaba fantasma en hangul y nunca romanización; al 3.er fallo se revela la sílaba en hangul.
  b) { "modo": "arma-tablero", "item": {…w-namu…}, "tiles": "<9 jamo: ㄴㅏㅁㅜ + 5 distractores, con semilla 'tigre-at-namu', como tilesDe de Dubu>", "correcta": "나무" }
     La prueba repite verificaNivel de Dubu (que alcancen las piezas y el tablero esté completo). Clip de 나무: sí.

5.5 pares (oído de pares mínimos, de Dubu)
  a) nivel 2 (solo vocales con la ㅇ muda; las consonantes llegan en el 3):
     { "id": "p-eo-o", "modo": "pares", "par": ["어", "오"], "contraste": "ㅓ/ㅗ", "voces": ["sunhi"], "audio_existe": [true, true] }
     { "id": "p-eu-u", "modo": "pares", "par": ["으", "우"], "contraste": "ㅡ/ㅜ", "voces": ["sunhi"], "audio_existe": [true, true] }
     Desde el 3 entran 너/노, 그/구 y 더/도 (clips de 너, 노 y 더: sí). Desde nov: "voces": ["sunhi", "jay"].
  b) { "modo": "pares", "item": {…}, "decir": "어", "opciones": ["어", "오"], "correcta": "어" }
     Error: { "titulo": "Oíste 어", "lineas": ["ㅓ es una o abierta con la boca relajada; ㅗ (오) redondea los labios."] }

5.6 copula
  a) La receta del §4. Elige solo entre frases del banco con rev "ok". Mezcla 받침 y vocal, mitad y mitad ±1.
     La "base" tiene que ser un sustantivo tipo N de palabras_basico1.json o un nombre de listas.nombres; la prueba rechaza cualquier otra (por eso el dicho del 20 no tiene ítem de cópula).
  b) { "modo": "copula", "item": {…f-yeonpil-ieyo…}, "prompt": "연필 + ___", "img": "ec97b0ed9584",
       "opciones": ["예요", "이에요"],     // la ÚNICA incorrecta es la otra forma; nunca 이어요 ni 여요
       "correcta": "이에요",
       "al_acertar": { "suena": "연필이에요", "pron": "[연피리에요]" },
       "explicacion": { "titulo": "Elegiste 예요, pero 연필 termina en ㄹ → 이에요.",
                        "lineas": ["필 = ㅍ+ㅣ+ㄹ: la ㄹ de abajo es 받침. Al hablar salta y suena como una r suave: [연피리에요]."] } }
  Con "marco": el prompt es "저는 학생___", la correcta es 이에요 y suena "저는 학생이에요" [저는 학쌩이에요].
  El motor recalcula la forma con (código − 0xAC00) % 28 y la compara con item.forma: si no coinciden, la prueba falla.

5.7 clasifica-batchim (dos bandejas)
  a) nivel 11: { "modo": "clasifica-batchim", "items": ["w-chaek", "w-uija", "w-haksaeng", "w-keopi", "w-gabang", "w-uyu"],
       "bandejas": [ { "id": "con", "t": "con 받침" }, { "id": "sin", "t": "sin 받침" } ] }
  b) { "modo": "clasifica-batchim", "item": {…w-chaek…}, "prompt": "책", "correcta": "con", "desarme": "ㅊ+ㅐ+ㄱ",
       "explicacion": { "titulo": "책 sí tiene 받침", "lineas": ["책 = ㅊ+ㅐ+ㄱ: la ㄱ va abajo, eso es el 받침."] } }
     Clips de 책, 의자, 학생, 커피, 가방 y 우유: sí existen.

5.8 escucha-imagen (oye y elige el dibujo)
  a) { "id": "ei-uyu-yeyo", "modo": "escucha-imagen", "suena": "f-uyu-yeyo", "correcta": "w-uyu",
       "opciones": ["w-uyu", "w-chaek", "w-uija", "w-gabang"] }
  b) { "modo": "escucha-imagen", "decir": "우유예요", "correcta": "w-uyu", "opciones": [
       { "id": "w-uyu",    "img": "ec9ab0ec9ca0", "dibujo": "caja de leche con una vaca dibujada y un vaso de leche al lado" },
       { "id": "w-chaek",  "img": "ecb185",       "dibujo": "libro cerrado de tapa azul con un marcador asomando arriba" },
       { "id": "w-uija",   "img": "ec9d98ec9e90", "dibujo": "silla de madera con respaldo y cuatro patas" },
       { "id": "w-gabang", "img": "eab080ebb0a9", "dibujo": "mochila escolar con dos correas y un bolsillo delantero con cierre" } ],
       "explicacion": { "titulo": "우유예요 = es leche.", "lineas": ["우유 termina en la vocal ㅜ → 예요."] } }
     El "dibujo" es también el alt de cada imagen (accesibilidad). Las imágenes de w-uyu y w-gabang (ítems de Race) llegan por "extiende". audio_existe: 우유예요 NO (hay que generarlo).

5.9 ordena (bloques)
  { "id": "o-soy-daniel", "modo": "ordena", "n": 14, "consigna": "Di que eres Daniel",
    "bloques": [ { "t": "저는" }, { "t": "다니엘" }, { "t": "이에요", "pega": true } ],
    "sobran": [ { "t": "예요", "pega": true } ],    // "pega": se une sin espacio a lo anterior
    "correcta": "저는 다니엘이에요", "pron": "[저는 다니에리에요]", "es": "Soy Daniel.",
    "formula": ["저는"], "registro": "haeyo", "rev": "ok", "audio_existe": true }
  Error: { "titulo": "Con los nombres manda la última sílaba", "lineas": ["다니엘 termina en ㄹ → 이에요; 마리아 termina en vocal → 마리아예요."] }

5.10 dos-formas (¿cuál está bien escrita?)
  { "id": "df-chaek-ieyo", "modo": "dos-formas", "n": 19, "bien": "책이에요", "mal": "책이예요", "regla": "orto-ieyo",
    "explicacion": { "titulo": "Se escribe 책이에요.", "lineas": ["Después de 받침 va 이에요; *이예요 no existe, aunque al hablar rápido suenen parecido."] },
    "audio_existe": true }
  Reglas fijas:
    - la forma mala nunca suena (no tiene clip) y siempre se muestra con *;
    - en el nivel 19 están también df-anieyo (아니에요 / *아니예요), df-jeyeyo (저예요 / *저에요) y df-mwoyeyo (뭐예요? / *뭐에요?).

5.11 dictado (escribe lo que oyes; con teclado o con bloques)
  a) nivel 19: { "id": "d-chaek-ieyo", "modo": "dictado", "suena": "f-chaek-ieyo", "correcta": "책이에요",
       "entrada": "teclado", "bloques": ["책", "채", "기", "이에요", "예요"], "credito": "jamo",   // "bloques" es la alternativa sin teclado
       "errores_tipicos": {
         "채기에요": "Escribiste como suena. Se escribe 책이에요: la ㄱ se queda abajo en 책 y solo salta al hablar.",
         "책이예요": "Después de 받침 va 이에요, nunca *이예요." } }
  b) La respuesta se compara jamo por jamo (Levenshtein). Para "채이에요": { "ok": false, "parcial": 0.89, "explicacion": { "titulo": "Te faltó el 받침 ㄱ", "lineas": ["책 = ㅊ+ㅐ+ㄱ."] } }
     (책이에요 tiene 9 jamo y falta 1: 1 − 1/9 = 0,89.) normKo de Race quita espacios y puntuación antes de comparar. audio_existe: 책이에요 sí.

5.12 tarjeta (solo lectura): ver §6.

══════════════════════════════════════════════
6. TARJETAS (dentro de tNN.json → "tarjetas")
══════════════════════════════════════════════
// Regla (40 palabras o menos). Queda en "Mis reglas".
{ "id": "tr-copula", "modo": "tarjeta", "clase": "regla", "n": 12, "regla": "copula",
  "titulo": "¿예요 o 이에요?",
  "texto": "Mira la última sílaba. ¿Tiene una consonante abajo (받침)? → 이에요. ¿Termina en vocal? → 예요.",
  "ejemplos": [ { "ko": "책이에요", "pron": "[채기에요]", "desarme": "책 = ㅊ+ㅐ+ㄱ" },
                { "ko": "의자예요", "desarme": "자 = ㅈ+ㅏ" } ],
  "truco": "La ㅇ de 이에요 es un asiento vacío: la consonante del final salta a sentarse ahí.",
  "segundos": 20, "mis_reglas": true,
  "cuaderno": { "curso": "a11", "semana": 2 } }      // el enlace al cuaderno solo lo ve quien tiene llave

// Ojo (no da puntaje)
{ "id": "ojo-anieyo", "modo": "tarjeta", "clase": "ojo", "n": 14, "anticipa": 18, "puntaje": false,
  "texto": "아니에요 ('no es') no es una palabra más con 이에요: viene de 아니다 y siempre se escribe 아니에요, nunca *아니예요. Lo usas en el nivel 18.",
  "segundos": 15 }

// Cultura (nivel 0)
{ "id": "cu-sejong", "modo": "tarjeta", "clase": "cultura", "n": 0, "titulo": "세종대왕",
  "texto": "El rey Sejong creó el 한글 en 1443 y lo publicó en 1446, para que todo el pueblo pudiera leer.", "img": "sejong" }

// Dicho del barrio: tarjeta + 3 ítems (completa, situación, empareja). Nunca un ítem de cópula: el dicho no es una base permitida.
{ "id": "dicho-20", "modo": "tarjeta", "clase": "dicho", "n": 20,
  "ko": "누워서 떡 먹기", "pron": "[누워서 떵먹끼]",
  "literal": "Comer 떡 acostado.", "significado": "Algo facilísimo.",
  "equivalente": { "es": "Es pan comido", "tipo": "total" },        // tipo: total | parcial | ninguno
  "en_chile": "Está papita",                                      // ⚑ Jay confirma
  "ejemplo": { "ko": "누워서 떡 먹기예요!", "es": "¡Es pan comido!", "audio_existe": false },   // ejemplo fijo revisado; no se pide elegir forma
  "img": "dicho-20", "audio_existe": false, "rev": "pendiente",
  "items": [
    { "id": "dicho-20-completa", "modo": "ordena", "consigna": "Arma el dicho",
      "bloques": [{"t":"누워서"},{"t":"떡"},{"t":"먹기"}], "sobran": [{"t":"빵"}], "correcta": "누워서 떡 먹기" },
    { "id": "dicho-20-situacion", "modo": "reconoce", "ve": "texto", "elige": "texto", "prompt": "¿Cuándo lo dirías?",
      "opciones": ["La prueba de Hangul me salió perfecta y sin esfuerzo", "Llegó justo la amiga de la que hablábamos", "Me equivoqué aunque soy experta"],
      "correcta": "La prueba de Hangul me salió perfecta y sin esfuerzo" },
    { "id": "dicho-20-empareja", "modo": "reconoce", "ve": "hangul", "elige": "es", "prompt": "누워서 떡 먹기",
      "opciones": ["Es pan comido", "Hablando del rey de Roma", "Al mejor cazador se le va la liebre"], "correcta": "Es pan comido" } ] }

══════════════════════════════════════════════
7. reglas.json (público; el motor recalcula, no inventa)
══════════════════════════════════════════════
{ "esquema": "tigre-reglas-v1",
  "reglas": [
    { "id": "copula", "n": 12,
      "conBatchim": "이에요", "sinBatchim": "예요",
      "calculo": "(codigo(ultima silaba) - 0xAC00) % 28 !== 0 → tiene 받침",
      "noOfrecer": ["이어요", "여요"],
      "especiales": { "아니다": "아니에요" },
      "ortografia": { "*이예요": "이에요", "*아니예요": "아니에요", "*저에요": "저예요", "*뭐에요": "뭐예요" },
      "bases": ["palabras_basico1.json: tipo N y sustantivo, rev ok", "listas.nombres"],
      "excluye": ["nombres de pila coreanos", "números", "siglas", "cualquier texto fuera de las dos bases (dichos incluidos)"],
      "explica": {
        "vocal":      "{ult} = {desarme} → termina en vocal → 예요.",
        "batchim":    "{ult} = {desarme} → termina en {fin} (받침) → 이에요. Escucha cómo salta: {pron}.",
        "batchim_ng": "{ult} = {desarme}. La ㅇ de abajo SÍ es 받침 (suena ng) → 이에요. La ㅇ no salta: suena tal como se escribe, {ko}.",
        "batchim_l":  "{ult} termina en ㄹ → 이에요. La ㄹ salta y suena como una r suave: {pron}.",
        "primera_o":  "Mira la ÚLTIMA sílaba, no la primera: {ult} = {desarme} → {forma}." } },
    { "id": "batchim", "n": 8, "siete_sonidos": { "ㄱ": ["ㄱ","ㄲ","ㅋ"], "ㄴ": ["ㄴ"], "ㄷ": ["ㄷ","ㅅ","ㅆ","ㅈ","ㅊ","ㅌ","ㅎ"], "ㄹ": ["ㄹ"], "ㅁ": ["ㅁ"], "ㅂ": ["ㅂ","ㅍ"], "ㅇ": ["ㅇ"] } }
  ] }
// {pron} siempre sale del ítem revisado: el teléfono nunca calcula pronunciaciones. Una plantilla con {pron} solo se usa si el ítem tiene pron (la prueba verifica que ninguna explicación quede con un hueco).
// En F3 se suman 은/는, 이/가 (con 제가 y 누가 fijos), 을/를 y -아요/어요/해요; los irregulares van en una lista declarada.

══════════════════════════════════════════════
8. PERFIL · localStorage['as-perfil-v1']
══════════════════════════════════════════════
{ "v": 1, "creado": "2026-10-19", "xp": 1340,
  "racha": { "dias": 9, "mejor": 9, "ultimo": "2026-10-27", "tigres": 1 },
  "niveles": {
    "1":  { "est": 1, "prec": null, "veces": 0, "fecha": "2026-10-19", "origen": "dubu" },        // abonado por Dubu
    "10": { "est": 2, "prec": 85, "veces": 2, "fecha": "2026-10-20", "ult": "2026-10-21", "aprobado": true },
    "14": { "est": 2, "prec": 90, "veces": 1, "fecha": "2026-10-27", "ult": "2026-10-27" } },
    // (se omiten por brevedad 2–5, abonados igual que el 1, y 11–13)
  "items": {
    "f-yeonpil-ieyo": { "t": 2, "caja": 1, "vence": "2026-10-28", "err": 1, "log": [["2026-10-27",0,1,5120],["2026-10-27",1,2,2300]] },
    "f-uija-yeyo":    { "t": 2, "caja": 3, "vence": "2026-10-31", "err": 0, "log": [["2026-10-23",1,1,1900],["2026-10-27",1,1,1400]] } },
  "reglas": ["batchim", "copula"],          // Mis reglas
  "sellos": ["gwanghwamun"],
  "llave": null,                            // con llave: §10
  "migrado": { "dubu": { "fecha": "2026-10-19", "abono": [1,2,3,4,5], "huella": "10" },
               "hr": { "fecha": "2026-10-19", "abono": [], "huella": "0" },
               "lector": null },
  "ajustes": { "voz": "sunhi", "rom": true, "sonido": true, "rapido": false },   // rom solo esconde la romanización en 1–9; nunca la muestra después
  "encuestas": ["10"] }                     // solo marca que ya respondió; las respuestas no se guardan aquí

ESTRELLAS (precisión al primer intento)
  - 1★ al terminar, 2★ con 80 % o más, 3★ con 95 % o más.
  - Se guarda la mejor marca.
  - Jefe: "aprobado" con 80 % o más. Eso abre el tramo siguiente; si ese tramo es de alumno, además hace falta la llave. Sin aprobar, el juego sugiere 2–3 niveles para repasar.

XP
  - +10 a la primera, +4 al segundo intento, +3 por rapidez (solo modos con tiempo) y +5 cada 5 seguidas (tabla XP de Race).
  - +20 la primera vez que se termina un nivel y +10 la primera vez que se sacan 3★.

LEITNER (por ítem)
  - "t" = número del tramo donde vive el ítem (lo pone el motor al registrarlo).
  - Entra la primera vez que se responde: si acierta a la primera, caja 2; si no, caja 1.
  - Acierto a la primera: sube una caja (máximo 5).
  - Error, o acierto recién en el segundo intento: vuelve a la caja 1 y suma "err".
  - vence = hoy + {1:1, 2:2, 3:4, 4:8, 5:16} días según la caja.
  - log guarda los últimos 5 registros: [fecha, ok 1/0, intento, ms]. Sirve para pasar a FSRS sin perder historial.
  - Repaso del día: hasta 15 ítems con vence ≤ hoy cuyo tramo esté disponible, ordenados por caja y después por fecha.
  - Mis difíciles: los ítems con err ≥ 2.
  - Limpieza: un id se borra SOLO si su tramo "t" está cargado en su versión actual y el id ya no está en él. Si el tramo no está disponible (sin llave, llave vencida, otro teléfono después de restaurar o sin red), el ítem se guarda tal cual.

RACHA AMABLE
  - Cuenta el día terminar un nivel o hacer el Repaso del día.
  - Cada 7 días se gana 1 "día tigre" (máximo 2). Un día sin jugar gasta uno; si no quedan, la racha vuelve a 0.

ALMACENAMIENTO
  - Todo con try/catch. Si localStorage falla, se juega igual, sin guardar.
  - Tamaño esperado con 1.500 ítems: unos 120 KB.

══════════════════════════════════════════════
9. ADAPTADORES (SOLO leen las claves viejas; nunca escriben ni borran)
══════════════════════════════════════════════
REGLAS COMUNES
  - Abonar = crear el nivel con est 1, prec null y origen "<app>", solo si no existía.
  - Nunca da 2–3★, nunca abona un jefe (el 10 siempre se rinde) y no importa XP.
  - Corre al abrir el juego si cambió la "huella" de la app vieja: hr = partidas · dubu = cantidad de niveles · lector = total.
  - El aviso dice "Vimos que …: te abonamos los niveles …". Para Dubu se nombran sus MUNDOS ("los mundos 1 y 2 de Dubu"), nunca "Bukchon": en Dubu el mundo 1 se llama Bukchon y en Tigre 100 Bukchon es 11–20.

hr-progreso-v1 (한글 Race). Formato real de motor.js:
  { "v": 1, "xp": 312, "partidas": 14, "mejorRacha": 7, "sonido": true, "creado": null,
    "records": { "reconoce:vocales": { "precision": 90, "segundos": 48, "primeraVez": 9, "racha": 6, "xp": 104 },
                 "reconoce:consonantes": { "precision": 83, "segundos": 71, "primeraVez": 10, "racha": 5, "xp": 118 },
                 "construye:al-lado": { "precision": 75, "segundos": 40, "primeraVez": 6, "racha": 4, "xp": 66 } },
    "aprendidos": { "v-a": 3, "w-uyu": 1 } }
  Qué abona (precisión ≥ 80):
    reconoce:vocales → 1
    reconoce:consonantes → 3 y 4
    construye:al-lado y construye:abajo (los dos) → 5
    construye:batchim → 8
  Este ejemplo abona [1, 3, 4] (al-lado con 75 no alcanza).

dubu-progreso (Dubu). Formato real ({niveles, oido, roman, tutos, saltado, voz}; cada nivel {cubitos, fallos}):
  { "niveles": { "1-1": {"cubitos":3,"fallos":0}, "1-2": {"cubitos":3,"fallos":0}, "1-3": {"cubitos":2,"fallos":1}, "1-4": {"cubitos":3,"fallos":0}, "1-5": {"cubitos":2,"fallos":2},
                 "2-1": {"cubitos":3,"fallos":0}, "2-2": {"cubitos":3,"fallos":0}, "2-3": {"cubitos":2,"fallos":1}, "2-4": {"cubitos":3,"fallos":0}, "2-5": {"cubitos":1,"fallos":3} },
    "oido": { "ㅓ/ㅗ": { "ok": 7, "total": 8 } }, "roman": true, "tutos": { "primero": true }, "saltado": false, "voz": "sunhi" }
  Qué abona (un mundo está completo cuando sus 5 niveles tienen registro, como mundoHecho() de Dubu):
    mundo 1 completo (1-1 a 1-5) → 1
    mundos 1 y 2 completos → 1 a 5 (el plan: el 5 equivale a los mundos 1–2 de Dubu)
    mundo 3 (batchim) → 8
    mundo 4 (aspiradas y tensas) → 6
    "saltado": true no abona nada.
  Este ejemplo abona [1, 2, 3, 4, 5]. Además "voz" se copia a ajustes.voz si el perfil es nuevo.

as-lector-hangul (Lector). Formato real (estrellas: 3 con 90 % o más, 2 con 70 %, 1 con 50 %):
  { "stars": { "voc": 3, "con": 2, "fue": 1, "sil": 2, "bat": 0 }, "total": 184, "bestStreak": 12, "bestTimed": 21, "rot": {} }
  Qué abona (2 estrellas o más):
    voc → 1 y 2 · con → 3 y 4 · sil → 5 · fue → 6 · bat → 8
  Este ejemplo abona [1, 2, 3, 4, 5].

══════════════════════════════════════════════
10. LLAVE DENTRO DEL PERFIL
══════════════════════════════════════════════
"llave": { "token": "eyJsIjoiYTExLTIwMjYtMTAiLCJjIjoiYTExIiwiayI6IjIwMjYtMTAiLCJ2IjoxLCJhYnJlIjpbMywxMF0sImlhdCI6MTc5NDIzNjQwMCwiZXhwIjoxODA2NTQ4Mzk5fQ.4m6zgyjpb6_H0GyPfHZZU32eDu-2zw2IIuvAYkqIdgY",
           "curso": "a11", "cohorte": "2026-10", "vence": "2027-03-31", "abre": [3, 10], "activada": "2026-11-09" }
// Token de EJEMPLO firmado con el secreto de prueba "SOLO-EJEMPLO-no-usar" (firma comprobada). Su payload es:
// {"l":"a11-2026-10","c":"a11","k":"2026-10","v":1,"abre":[3,10],"iat":1794236400,"exp":1806548399}
// iat = lun 9 nov 2026 12:00 en Chile; exp = mié 31 mar 2027 23:59:59 en Chile (UTC-3 ese día).
// abre = [desde, hasta], rango inclusivo de tramos. En el perfil es solo informativo: quien decide es el servidor (ver la llave, §5).

══════════════════════════════════════════════
11. TRAMOS GUARDADOS · localStorage['as-tigre-tramos']
══════════════════════════════════════════════
Van aparte del perfil, para que el código de respaldo no lleve contenido.
{ "t02": { "version": "2026-10-22", "datos": { …t02.json… } },
  "t03": { "version": "2026-11-09", "etag": "\"t03@2026-11-09\"", "llave": "a11-2026-10",
           "valido_hasta": "2026-11-23",      // el menor entre hoy + 14 días y el vence del token
           "datos": { …t03.json… } } }
Si no hay espacio, se juega en línea sin guardar.

══════════════════════════════════════════════
12. CÓDIGO DE RESPALDO
══════════════════════════════════════════════
FORMATO
  "TIGRE1." + base64url(deflate-raw(JSON del perfil SIN items[].log)) + "." + control
  - control: h = 0; por cada byte UTF-8 del JSON, h = (h·31 + byte) mod 2^32 (entero sin signo de 32 bits; en JS, (h*31+b)>>>0). Al final, control = h mod 36^4, en base 36, mayúsculas, rellenado a 4 caracteres. Detecta un pegado incompleto.
  - Comprime con CompressionStream('deflate-raw') del navegador (Chrome/Edge, Safari 16.4+, Firefox 113+). Sin compresión: "TIGRE0." + base64url(JSON) + "." + control.
  - En Node, la prueba usa zlib.deflateRawSync / inflateRawSync. Los bytes comprimidos pueden variar de un navegador a otro; lo que tiene que ser idéntico es el JSON después de ida y vuelta.

EJEMPLO REAL (el perfil del §8 tal como está escrito, sin log; 780 B de JSON → 496 caracteres; verificado con node):
TIGRE1.hZLdjuogFIXfZV3vJlCdceRVJl4gblsMhQZK53hM330CjcYTTc4N4W99-2ftG2YoSTCR9SlAoRXtZyNFI_cg_Bmh5GYrCFGbXkPdcLI6Qe0JA19CrLvsJjs8a9sdCJPtIicouRC8ndmVww2yLJymGnWMbKB8do4wsyk_BOHMNda_qYRoO_ZQOOVjxkKQ4kFq76SvjwenfeW0AjXZ5ysJgh5jONbqp5i5oLev6L14oOUb9O4VvcOyEOzEQy383Fw5-NG6xvI1lJsVb_RFV-bM3vAz4AsEjnFt4bnJ9qKb6xvt5lW7kXetKElE7lyx7RtHPZneDiCYMGancSAkdi7U1-5H-67_0UP25cE5PfPdn8F2sTbptlpQSnpnlD4GH6C-JbW0oS19HAh9ZufKTymKdX38r_pZVDWOzVTmrSSzEPQlp2mdqDn8hULKvrcgxDCsPhJS8PbuapngsZ7O2qViMnuTOU1rW6TAYfkF.O0C4

AL IMPORTAR
  - Primero muestra un resumen ("Nivel 14 · 1.340 XP · sin llave") y pregunta.
  - Después fusiona:
      · por nivel, la mejor marca;
      · por ítem, la caja más baja (lo más prudente);
      · xp y racha, el mayor;
      · llave, la que vence después.
  - Si la llave viene en el código, se restaura con él: compartir el respaldo es compartir la llave (se acepta).
  - Aviso fijo en el Perfil: Safari borra los datos de un sitio que no se abre en 7 días, así que conviene guardar el código.

══════════════════════════════════════════════
13. LO QUE prueba.js EXIGE DE ESTE ESQUEMA
══════════════════════════════════════════════
MAPA Y RECETAS
  - mapa.json tiene los niveles 0–100 sin huecos y la lista blanca de claves en los niveles de alumno.
  - Cada receta tiene su nivel en el mapa, y cada id que usa existe (definido en un tramo o importado de Race).
  - Ids únicos en todos los tramos; ningún tramo redefine un id de Race.
  - Máximo 3 modos en la ronda de los niveles nuevos (calentamiento, x5, x9 y jefe exentos) y máximo 3 estructuras en "introduce".
  - "usa" ⊆ lo introducido antes.
  - "correcta" es un valor que está entre las opciones (nunca una posición).

ROMANIZACIÓN (sobre las preguntas generadas con 40 semillas por nivel)
  - n ≤ 9: libre según la receta.
  - n = 10: rom solo en "ver pista"; nunca como opción, nunca aceptada; arma-tablero sin revelación automática.
  - n ≥ 11: rom_visible false, "elige" ≠ rom, "acepta" = hangul, sin pista, arma-tablero solo con ver "ko". Los ítems importados de Race pueden tener rom/alt en su archivo: el motor los ignora.
  - t03–t10: ningún campo rom, alt ni pista.

CÓPULA
  - La forma recalculada coincide en el 100 % de los ítems.
  - Nunca se ofrecen 이어요 ni 여요.
  - "base" solo de palabras_basico1.json (tipo N y sustantivo) o de listas.nombres: ningún otro nombre, cifra, sigla ni dicho.
  - Nunca *아니예요, *이예요, *저에요 ni *뭐에요 como forma correcta.
  - Ninguna explicación queda con un hueco ({pron} vacío).

AUDIO
  - audio_existe es verdadero para cada ítem jugable y cada frase que suena (la forma mala de dos-formas no suena).

FUGAS (detalle en el diseño de la llave)
  - Ningún "_canario" ni id definido en t03–t10 aparece en public/ ni en .next/static/; ningún archivo de public/ tiene más de 10 textos ko (de 4 o más sílabas) de un mismo tramo protegido.

GENERAL
  - Cada error tiene explicación {titulo, lineas}.
  - 40 semillas por nivel sin distractores que también sean correctos.
  - Ningún alt es el comienzo de otro.
  - Tramo ≤ 60 KB.
  - 0 ítems con rev distinto de "ok" en tramos publicados.

## 3. Llave de alumno (código por curso)

LLAVE POR CURSO · diseño técnico (v1.1 revisado; se programa en F3; hoy no existe nada de esto)

IDEA
El alumno escribe una sola vez el código de su curso. Una ruta del sitio lo cambia por un token firmado que abre los tramos 3–10 (niveles 21–100). No hay base de datos, cuentas ni datos personales: el token dice qué curso y qué cohorte, no quién es.

════════════════════════════
1) ARCHIVOS (todos nuevos)
════════════════════════════
- lib/juego/llave.mjs: el núcleo, en JS puro (import crypto from 'crypto'; sin dependencias).
  · Funciones: normalizar, hashCodigo, leerLlaves, buscarPorHash, firmar, verificar, vigente.
  · Es .mjs para que la prueba lo cargue en Node sin compilar (con await import(), porque prueba_llave.js es CommonJS).
  · tsconfig ya tiene allowJs y moduleResolution "bundler": la ruta .ts lo importa sin problema.
- app/api/juego/llave/route.ts: POST, código → token.
- app/api/juego/tramo/[id]/route.ts: GET, token → JSON del tramo.
- juego/contenido/t03.json … t10.json: niveles 21–100.
  · Viven en la raíz del repo, FUERA de public/.
  · Solo los importa la ruta del tramo, con import() de ruta fija (una línea por tramo).
  · Webpack los empaqueta en el bundle del servidor (.next/server) y nunca en /_next/static. No se usa fs con rutas dinámicas.
- Juego_100/herramientas/crear_llave.js: crea los códigos con crypto.randomInt (nunca Math.random).
  · Mantiene Juego_100/_privado/llaves.json.
  · Imprime el CÓDIGO para la profe y la línea COMPLETA de JUEGO_LLAVES.
  · Opciones: --rotar, --retirar y --todas.
- Juego_100/prueba_llave.js: las pruebas.
- .env.example: JUEGO_SECRETO= y JUEGO_LLAVES=, sin valores y con un comentario. El archivo ya está versionado aunque .gitignore tenga .env*, así que los cambios se suben normal.
- .gitignore: sumar Juego_100/_privado/ (ahí viven llaves.json y, si Jay quiere, los códigos en claro).

════════════════════════════
2) VARIABLES EN VERCEL
════════════════════════════
Dónde: academiaseuls-projects → academiaseulweb → Settings → Environment Variables. Solo en Production.

JUEGO_SECRETO (marcada como Sensitive)
- 32 bytes al azar en base64url (43 caracteres). Firma los tokens con HMAC-SHA256.
- Lo genera Jay en su PC; Claude nunca lo ve.
- Cambiarlo invalida TODOS los tokens de todos los cursos: es el botón de emergencia.

JUEGO_LLAVES
- Un arreglo JSON en una sola línea, con una entrada por curso y cohorte:
  [{"id":"a11-2026-10","curso":"a11","cohorte":"2026-10","h":"898da156802a5300e1e674618c9c087b026af9a52e7ab438d98b23fdd922bc69","vence":"2027-03-31T23:59:59-03:00","v":1,"abre":[3,10]}, …a12-2026-10, a21-2026-10, topik2-2026-10]
  (El h es del código de EJEMPLO KIMCHI-NAMSAN-HANOK-47, que no se va a usar. Está comprobado: es el SHA-256 de "tigre100:KIMCHI-NAMSAN-HANOK-47".)
- h = SHA-256 de "tigre100:" + el código normalizado. El código en claro no está en el sitio ni en el repo.
- vence = el último instante válido, en ISO con zona. Para la cohorte de octubre (fin del curso + 4 meses): 2027-03-31T23:59:59-03:00, porque ese día Chile sigue en UTC-3.
  · Nunca una fecha sola: el servidor corre en UTC y "2027-03-31" a secas cortaría el acceso horas antes de lo prometido.
- v = versión. Subirla invalida los tokens viejos de esa llave.
- abre = [desde, hasta], rango inclusivo de tramos (siempre 2 números). Por defecto [3,10], es decir, los niveles 21–100 (decisión de Jay).
- La fuente de verdad es Juego_100/_privado/llaves.json, fuera de git.
  · Una variable Sensitive de Vercel no se puede volver a leer después de guardarla. Por eso crear_llave.js siempre imprime la línea completa desde ese archivo, y rotar no depende de lo que muestre Vercel.
  · JUEGO_LLAVES solo tiene hashes, así que puede ir sin Sensitive.

Cosas a saber
- Una variable nueva o cambiada solo vale desde el próximo deploy: después de editarla, hay que hacer Redeploy.
- Sin estas variables (local, previews o un build sin .env), las rutas responden 503 "llave_no_configurada" y el build pasa igual.
- Se leen en cada petición, no al compilar: es el mismo patrón que MP_ACCESS_TOKEN en app/api/checkout.

════════════════════════════
3) EL CÓDIGO
════════════════════════════
- Son 3 palabras de una lista fija de 256 más 2 dígitos. Ejemplo: KIMCHI-NAMSAN-HANOK-47.
  · Palabras que un hispanohablante escribe igual que las oye cuando se las dictan en clase: KIMCHI, NAMSAN, HANOK, SEJONG, ANDES, PUMA, CONDOR…
  · Quedan fuera las que se escriben distinto de como suenan (TTEOK, SEOUL) y las feas o fáciles de confundir.
- Dan 256³ × 100 = 1.677.721.600 combinaciones.
- Normalización, igual en el servidor y en el cliente:
  · se pasa a NFD y se quitan las tildes;
  · todo va a mayúsculas;
  · cada tramo de caracteres que no sean A–Z o 0–9 pasa a UN solo guion;
  · se quitan los guiones del principio y del final.
  Así "kimchi  namsan, hanok 47 " = "KIMCHI-NAMSAN-HANOK-47".
- Hay uno por curso y cohorte: a11, a12, a21 y topik2. Niños no lleva llave por ahora, porque el juego es para 13+ (ver dudas).

════════════════════════════
4) POST /api/juego/llave
════════════════════════════
Qué recibe
- {"codigo":"…"}, de 80 caracteres como máximo, con Content-Type: application/json.
- Origin: se parsea con new URL() y el hostname tiene que ser academiaseul.com, www.academiaseul.com, localhost o 127.0.0.1. Sin Origin, o con otro, responde 403 "origen".
  · No frena a un script (curl puede inventar el Origin); solo impide que otro sitio use la ruta desde el navegador.

Pasos
1. Lee el cuerpo dentro de try/catch. Si el JSON es inválido, responde 400.
2. Normaliza el código y calcula su SHA-256 (32 bytes).
3. Recorre TODAS las entradas de JUEGO_LLAVES y compara con crypto.timingSafeEqual sobre buffers de 32 bytes.
   · timingSafeEqual lanza un error si los largos difieren, así que al leer las llaves se descarta toda entrada cuyo h no tenga 64 caracteres hex.
4. Si ya pasó vence, responde 410.
5. Arma el payload y lo firma.

Payload (sin datos de la persona)
  {"l":"a11-2026-10","c":"a11","k":"2026-10","v":1,"abre":[3,10],"iat":1794236400,"exp":1806548399}

Token
- token = base64url(payload) + "." + base64url(HMAC-SHA256(JUEGO_SECRETO, base64url(payload)))
- Ejemplo real (firma comprobada), firmado con el secreto de prueba SOLO-EJEMPLO-no-usar:
  eyJsIjoiYTExLTIwMjYtMTAiLCJjIjoiYTExIiwiayI6IjIwMjYtMTAiLCJ2IjoxLCJhYnJlIjpbMywxMF0sImlhdCI6MTc5NDIzNjQwMCwiZXhwIjoxODA2NTQ4Mzk5fQ.4m6zgyjpb6_H0GyPfHZZU32eDu-2zw2IIuvAYkqIdgY
  (iat = lun 9 nov 2026 12:00 en Chile; exp = mié 31 mar 2027 23:59:59 en Chile)

Respuestas
- 200 {"ok":true,"token":"…","curso":"a11","cohorte":"2026-10","vence":"2027-03-31","abre":[3,10]}
- 400 "codigo_vacio": vacío, de más de 80 caracteres o con JSON inválido
- 401 "codigo_invalido", sin espera artificial (ver el punto 9)
- 403 "origen"
- 405 si no es POST (Next 14 lo responde solo para los métodos que la ruta no exporta)
- 410 "llave_vencida"
- 503 "llave_no_configurada"
Los mensajes para el alumno (en español, cálidos) están en la pantalla, no en la API.

Registro
- Una sola línea: console.log(JSON.stringify({ev:"llave_ok", llave:"a11-2026-10"})) o {ev:"llave_fallo"}.
- Nunca el código escrito, la IP, el navegador, un nombre ni un correo.
- Sirve para depurar, no para contar (ver el punto 9).

════════════════════════════
5) GET /api/juego/tramo/[id]
════════════════════════════
Qué recibe
- El encabezado Authorization: Bearer <token>. El token nunca va en la URL.
- Opcional: If-None-Match: "t03@2026-11-09", que el juego pone a mano en el fetch.
- id solo puede ser t03…t10 (regex ^t(0[3-9]|10)$) y además tiene que estar publicado, es decir, en el mapa TRAMOS de la ruta.
  · t01 y t02 dan 404, porque son archivos públicos en /tigre/contenido/.
  · Cualquier otra cosa (t3, t11, ../package) da 404.

Qué verifica, en orden
1. La firma: HMAC recalculado y timingSafeEqual, después de comprobar que los dos largos son iguales.
2. Que la llave "l" siga en JUEGO_LLAVES; si no, "retirada".
3. Que "v" sea igual a la de JUEGO_LLAVES; si no, "version".
4. El vencimiento efectivo, que es el MENOR entre el exp del token y el vence de JUEGO_LLAVES; si pasó, "vencida". Así, si Jay acorta vence, también corta los tokens ya entregados.
5. Que el tramo esté dentro del "abre" de JUEGO_LLAVES (no del token), para poder achicarlo sin rotar.

Respuestas
- 200 con el JSON del tramo y estos encabezados: Cache-Control: private, no-store · ETag "t03@<version>" · X-Robots-Tag: noindex · Vary: Authorization.
- 304 si If-None-Match coincide.
  · Como el encabezado lo pone el juego a mano, el navegador le entrega el 304 tal cual (no lo resuelve con su caché, que con no-store está vacía).
  · El juego lo trata como "tu copia sigue vigente" y extiende valido_hasta. Ahorra datos móviles.
- 401 {"error":"sin_token" | "firma" | "vencida" | "retirada" | "version"}
- 403 "fuera_de_alcance"
- 404 "tramo_desconocido"
- 503 "llave_no_configurada"

Código
- export const runtime = 'nodejs'; export const dynamic = 'force-dynamic'; (igual que app/api/checkout).
- En Next 14, params llega como objeto: GET(req, { params: { id } }). No es una promesa como en Next 15; package.json pide ^14.2.20.
- const TRAMOS = { t03: () => import('@/juego/contenido/t03.json') }. El JSON está en (await TRAMOS[id]()).default. Se suma una línea por cada tramo que se publica.

════════════════════════════
6) ROTACIÓN POR VERSIÓN (si una llave se filtra)
════════════════════════════
Señales: activaciones de una cohorte muy por encima del tamaño del grupo (por ejemplo 80 en un grupo de 12), o el código visto en redes.

Pasos
1. Correr node Juego_100/herramientas/crear_llave.js --rotar a11-2026-10.
   · Escribe un código nuevo, un h nuevo y v:2 en _privado/llaves.json.
   · Imprime el código nuevo y la línea COMPLETA de JUEGO_LLAVES.
2. Reemplazar el valor entero de JUEGO_LLAVES por esa línea.
3. Redeploy.
4. La profe publica el código nuevo en el grupo.

Efecto
- Todo token con v:1 recibe 401 "version" al pedir un tramo.
- El juego muestra "Tu curso tiene una llave nueva: pídesela a tu profe" y pide el código otra vez (una vez por alumno).
- El progreso no se toca.
- Las copias sin conexión siguen jugables hasta su valido_hasta (14 días como máximo) y después piden la llave nueva.

Otras opciones
- Retirar una llave del todo: --retirar (401 "retirada").
- Acortar vence en llaves.json: corta también los tokens ya entregados.
- Emergencia general: cambiar JUEGO_SECRETO.

════════════════════════════
7) EN EL CELULAR Y SIN RED
════════════════════════════
Dónde se guarda
- 'as-perfil-v1'.llave = {token, curso, cohorte, vence, abre, activada}. Va dentro del código de respaldo, así que al restaurar en otro teléfono también se restaura la llave.
- Los tramos descargados van en 'as-tigre-tramos' = {version, etag, valido_hasta, datos}.
  · valido_hasta = el menor entre hoy + 14 días y el vence del token.
  · Cada vez que hay red y se abre el tramo, se revalida con If-None-Match: un 304 extiende los 14 días.

Antes de F4 no hay service worker, así que /tigre NO abre sin conexión. "Sin red" quiere decir aquí que la conexión se cae con el juego ya abierto (en el metro, o con el plan de datos agotado). Abrir el juego sin red llega con el service worker de F4.

Qué pasa sin red (con el juego ya abierto)
a) Tramo guardado y vigente: se juega normal.
b) Tramo guardado, pero vencidos los 14 días: "Conéctate una vez para seguir con este tramo". El progreso queda.
c) Tramo nunca descargado: "Necesitas internet una vez para abrir este tramo".
d) Activar la llave: siempre necesita red.
e) Audio: el clip que no esté en la caché del navegador pasa a la voz coreana del dispositivo; si no hay, se muestra el texto con su [pron].
Los tramos gratis (t01 y t02) también quedan guardados después de la primera visita.

Llave vencida
- La API responde 401 "vencida" y el juego dice "Tu llave venció el 31 de marzo de 2027. Si te matriculas de nuevo, tu profe te da la nueva".
- Muestra un botón a /inscribete o a /notificarme, según /api/cursos.
- El progreso nunca se borra. Los ítems del Leitner de ese tramo se guardan (ver el esquema, §8).

Si localStorage está lleno o bloqueado (modo privado): se juega en línea sin guardar el tramo, todo con try/catch.

════════════════════════════
8) CONTROL DE FUGAS (prueba.js + prueba_llave.js)
════════════════════════════
prueba.js
- Canario: cada tramo protegido lleva "_canario" (32 hex al azar). Ningún archivo de public/ ni de .next/static/ (después de next build sin .env.local ni .env.production) contiene un canario.
- Ids: ningún id DEFINIDO en t03–t10 aparece en public/ ni en .next/static/.
- Texto: ningún archivo de public/ contiene más de 10 textos "ko" (de 4 o más sílabas) de un mismo tramo protegido.
  · Es un umbral y no un "ninguno" porque public/ ya tiene frases que también van a estar en t03: el Lector, 한글 Race y las flashcards S4–S8, públicas por decisión del plan.
  · Una regla de cero daría falsas alarmas todo el tiempo y la prueba terminaría ignorándose.
- mapa.json, en los niveles de alumno, solo tiene las claves de la lista blanca (n, tramo, clase, titulo, objetivo, acceso, estado, curso, semana, minutos, aprobar, dicho, cta).
- Ningún archivo con "use client" ni nada de public/ importa juego/.
- No hay ningún .env* versionado salvo .env.example, y ahí JUEGO_SECRETO y JUEGO_LLAVES están vacíos.
- Repo privado antes de publicar t03 (lun 9 nov). La prueba consulta api.github.com y avisa si el repo sigue público. Mientras lo sea, juego/contenido/ y los nombres en hex de los clips de 21+ se ven en GitHub.
- La versión HTML de la hoja de revisión de 21+ nunca va en public/.

prueba_llave.js
- Prueba el núcleo en Node, sin red, con un secreto y unas llaves de prueba:
  · 401 sin token; con la firma alterada en 1 carácter; con el token vencido; con la versión vieja; con la llave retirada;
  · 401 "vencida" cuando JUEGO_LLAVES acorta vence, aunque el token diga una fecha posterior;
  · 403 con un tramo fuera del "abre" de JUEGO_LLAVES; 403 sin Origin o con un Origin ajeno;
  · 400 con JSON inválido y con un código de 81 caracteres;
  · 404 con t02, t11 y ../package;
  · 200 con un token válido y Cache-Control: private, no-store; 304 con el ETag;
  · "kimchi  namsan, hanok 47 " se normaliza igual que KIMCHI-NAMSAN-HANOK-47;
  · una entrada con un h de 63 caracteres se ignora sin romper timingSafeEqual.
- Con --url http://localhost:3000 repite todo contra next start, con variables de prueba en la terminal.
- Con --url https://www.academiaseul.com prueba solo los casos 401, 403 y 404 (sin ningún código real).

════════════════════════════
9) PRIVACIDAD Y LÍMITES (honesto)
════════════════════════════
- No existe una lista código → alumno: una llave identifica una cohorte. Nada de esto suma datos personales a los que ya maneja el sitio (Ley 21.719, vigente desde el 1 dic 2026).
- Vercel guarda sus propios registros de acceso; nuestro código no agrega nada a eso.
- Conteo de activaciones: los logs de funciones de Vercel duran muy poco (1 hora en Hobby y 1 día en Pro), así que contar las líneas "llave_ok" no sirve.
  · Propuesta: al activar, el juego hace history.pushState a /tigre?n=llave-a11-2026-10. Es la misma vía ?n= que el plan usa para los niveles, y Web Analytics la cuenta como una visita sin datos de la persona.
  · Hay que comprobar en el panel que ?n= se registra (si no se registra, tampoco sirve para los niveles).
- Contra quien intente adivinar: hay 1.677 millones de combinaciones.
  · Se saca la espera fija de 400 ms: en Vercel cada petición corre en paralelo, así que no frena a nadie y sí gasta tiempo de función.
  · Si el plan lo permite, una regla de Firewall de unos 20 intentos por minuto por IP en /api/juego/llave. Con 10 se puede bloquear a una clase entera que activa a la vez desde el mismo Wi-Fi o detrás del CGNAT de una compañía móvil.
  · Esa regla además evita que alguien agote la cuota de funciones del sitio.
- Una llave compartida se acepta (lo que se paga es la clase en vivo), y la versión corta una filtración en minutos.
- El token vive en el localStorage del dominio, que comparten el sitio, el Lector, Dubu y Race. El juego pinta el contenido con textContent (nunca innerHTML), para no dejarle la puerta abierta a un script que lo lea.
- Costo: una llamada por activación y una por tramo cada 14 días por teléfono.

════════════════════════════
10) QUÉ HACE JAY, PASO A PASO (unos 25 min, antes del lun 9 nov)
════════════════════════════
1. Pasar el repo a privado: GitHub → academiaseul/ACADEMIASEULWEB → Settings → Danger Zone → Change visibility → Private. Toma 5 min; como el repo es de una cuenta personal, Vercel sigue desplegando.
2. Generar el secreto. En la PC, dentro de la carpeta del repo, correr (funciona igual en PowerShell y en Git Bash):
   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
   El resultado es JUEGO_SECRETO. No mandarlo por chat ni guardarlo en el repo.
3. Generar las llaves. Correr:
   node Juego_100/herramientas/crear_llave.js --curso a11 --cohorte 2026-10 --vence 2027-03-31
   y repetir con a12, a21 y topik2.
   · La herramienta guarda el vence como 2027-03-31T23:59:59-03:00.
   · Cada vez imprime el CÓDIGO para la profe y guarda la entrada en Juego_100/_privado/llaves.json.
   · --todas imprime la línea completa de JUEGO_LLAVES, lista para pegar.
   · crear_llave.js no necesita el secreto.
4. Cargar las variables: Vercel → academiaseulweb → Settings → Environment Variables → Add JUEGO_SECRETO (Production, Sensitive) y JUEGO_LLAVES (Production) → Save.
5. Redeploy: Deployments → el último → ⋯ → Redeploy.
6. Probar en el celular: academiaseul.com/tigre → Perfil → Tengo llave → código de Básico 1.
   · Debe decir "Llave de Básico 1 (octubre 2026) activa hasta el 31 de marzo de 2027" y abrir el nivel 21.
   · Claude además corre prueba_llave.js contra producción (solo los casos 401, 403 y 404).
7. Mandar cada código por WhatsApp 1:1: a Kiran el de Básico 1 y a Abby el de Conversacional 1; los de Básico 2 y TOPIK II los usa Jay.
   · La profe lo publica en el grupo del curso el lun 9 nov junto con la misión de la semana ("esta semana, jueguen hasta el nivel N").
8. Guardar los códigos y llaves.json solo en el teléfono o en Juego_100/_privado/ (fuera de git).
9. Si una llave se filtra: --rotar (punto 6), pegar la línea, Redeploy, y la profe publica la nueva.
   · En enero: llaves nuevas para la cohorte 2027-01 con el mismo comando.
   · Las de octubre siguen hasta el 31 de marzo.

## 4. Hoja de revisión

HOJA DE REVISIÓN NATIVA · niveles 0–20 (revisor: Jay)

════════════════════════════
DÓNDE ESTÁ Y QUIÉN LA HACE
════════════════════════════
- Son dos archivos: Juego_100/revision/t01.md (niveles 0–10, lote 1, hasta el lun 19 oct) y Juego_100/revision/t02.md (niveles 11–20, lote 2, hasta el jue 22 oct).
- La herramienta los genera desde el JSON, después de crear los clips; nunca se escriben a mano. El número de filas sale del JSON (las cifras de abajo son estimaciones).
- Antes de enviarlos, Claude ya corrió los chequeos que una máquina sí puede hacer:
  · la regla del 받침 recalculada en cada ítem;
  · ortografía prohibida: *이예요, *아니예요, *저에요, *뭐에요;
  · que exista cada clip y pese más de 1.500 B;
  · sin romanización desde el 11 (sobre las preguntas generadas);
  · bases de la cópula solo de Básico 1 (tipo N) o de la lista cerrada de nombres;
  · que ninguna opción incorrecta sea 이어요 ni 여요;
  · [pron] solo cuando difiere de la escritura.
- Así Jay solo juzga lo que nadie más puede: si es natural y si suena bien.

════════════════════════════
CABECERA DE CADA HOJA
════════════════════════════
# Revisión nativa · Tramo 2 · Bukchon (niveles 11–20) · lote 2 de 2
Revisor: Jay · Entrega: jue 22 oct · Filas: unas 165 · Tiempo estimado: 55 min (con una pausa entre A y B)
Marcas: ✓ bien · ✎ cambiar (escribe la versión buena en "Corrección") · ✗ sacar · ? lo hablamos
T = texto (el coreano, el [pron] y el español) · A = audio (el clip)
Atajo: al final de cada sección hay una línea "Todo ✓ salvo: ___". Las filas que no nombres quedan ✓ en T y en A.

════════════════════════════
COLUMNAS FIJAS
════════════════════════════
# · id · nivel · ko · suena [pron] · español · ▶ · T · A · Corrección
El ▶ abre el clip; "nuevo" quiere decir que se generó para esta hoja. Si la palabra suena igual que se escribe, la columna [pron] lleva "—".

════════════════════════════
SECCIONES (con filas de ejemplo reales)
════════════════════════════
A · PALABRAS DEL BANCO
  Unas 40 en t01 y unas 63 en t02. Ya pasaron por Básico 1: solo se oyen y se confirma el 받침.
  | A-07 | w-yeonpil | 13 | 연필 | — | lápiz | ▶ | T | A | |    (columna extra: 받침 = ㄹ)

B · FRASES Y RESPUESTAS NUEVAS (el corazón de la hoja)
  Unas 15 en t01 (saludos, nombres, primeras frases) y unas 60 en t02.
  | B-07 | f-yeonpil-ieyo | 13 | 연필이에요 | [연피리에요] | Es un lápiz. | ▶ nuevo | | | |
  | B-08 | f-gabang-ieyo | 13 | 가방이에요 | — (la ㅇ no salta: suena como se escribe) | Es una mochila. | ▶ nuevo | | | |
  | B-15 | o-soy-daniel | 14 | 저는 다니엘이에요 | [저는 다니에리에요] | Soy Daniel. | ▶ ya existía | | | |
  | B-31 | f-ppang-anieyo | 18 | 빵이 아니에요 | — | No es pan. | ▶ nuevo | | | |
  Cada fila lleva además su registro (haeyo por defecto).

C · TARJETAS (regla, Ojo y cultura), con el texto completo tal como sale en pantalla
  Unas 11 en 0–20: unas 4 de regla + la de 세종대왕 en t01, y 4 de regla + 2 de Ojo en t02. El número exacto sale del JSON.
  | C-03 | tr-copula | 12/14 | "Mira la última sílaba. ¿Tiene una consonante abajo (받침)? → 이에요. ¿Termina en vocal? → 예요." + ejemplos 책이에요 [채기에요] y 의자예요 | T | |

D · EXPLICACIONES DE ERROR: una por plantilla, con su ejemplo ya generado
  | D-03 | copula · 받침 ㄹ | "Elegiste 예요, pero 연필 termina en ㄹ → 이에요. La ㄹ salta y suena como una r suave: [연피리에요]." | T | |
  | D-04 | copula · 받침 ㅇ | "방 = ㅂ+ㅏ+ㅇ. La ㅇ de abajo SÍ es 받침 (suena ng) → 이에요. La ㅇ no salta: suena tal como se escribe, 가방이에요." | T | |

E · DICHO DEL BARRIO: uno por tramo, y Jay tiene la última palabra
  | E-1 | dicho-20 | 누워서 떡 먹기 | [누워서 떵먹끼] | literal: comer 떡 acostado | Es pan comido / En Chile: Está papita ⚑ | ▶ nuevo | T | A | |
  | E-2 | dicho-20 · ejemplo | 누워서 떡 먹기예요! | [누워서 떵먹끼예요] | ¡Es pan comido! | ▶ nuevo | T | A | |

F · NOMBRES DE LA LISTA CERRADA (los 10; van en el lote 1 porque aparecen desde el nivel 9)
  | F-08 | Juan | 후안 | 받침 ㄴ | 후안이에요 | [후아니에요] | ▶ nuevo | T | A | |
  | F-10 | Belén | 벨렌 | 받침 ㄴ | 벨렌이에요 | [벨레니에요] | ▶ nuevo | T | A | |

G · ¿LA OPCIÓN INCORRECTA PODRÍA ESTAR BIEN?
  Unos 40 casos (15 en t01 y 25 en t02): dos-formas y distractores de reconoce y escucha-imagen. Se responde no o sí; un "sí" saca la opción.
  | G-04 | ¿예요 o 이에요? · 연필 | correcta 이에요 | incorrecta 예요 | ¿podría aceptarse? no |

H · PARES MÍNIMOS (solo t01: niveles 2, 3 y 6; unos 20 pares)
  | H-01 | 어 / 오 | ▶ SunHi | ▶ Jay (cuando grabes en nov) | ¿se distinguen? ✓/✗ |

FIRMA (última línea)
  "Firma: ✓ Tramo 2 revisado — Jay, __/10/2026"
  Sin esa línea, la herramienta no pasa nada a rev "ok".

════════════════════════════
CRITERIO ✓ / ✗
════════════════════════════
T ✓ solo si se cumplen las cinco:
  1. Ortografía y espacios (띄어쓰기) correctos.
  2. Es natural: un coreano lo diría así en esa situación, en 해요체 neutro (salvo que la fila diga otro registro). No suena a libro ni a traducción.
  3. El español dice lo mismo, de tú y sin regionalismos raros.
  4. El [pron] es como suena a velocidad normal. Si sobra o falta, es ✎.
  5. No hay nada culturalmente raro ni ambiguo para un alumno de 13 años o más.
A ✓ solo si el clip:
  - dice exactamente el texto, sin sílabas comidas y sin leer letras o siglas;
  - tiene entonación natural (la pregunta sube, la afirmación baja);
  - no tiene cortes ni silencios largos;
  - tiene un volumen parejo con los demás.
✎ = escribe la versión buena. Si solo falla el audio, marca A ✎ y anota qué suena mal (p. ej. "suena 연필에요").
✗ = se saca del juego; no hace falta proponer otra.
? = se conversa, y bloquea la publicación hasta resolverlo.

════════════════════════════
CUÁNTO TARDA
════════════════════════════
Lote 1 · t01 (0–10), unas 115 filas, unos 35 min:
  A 40 palabras × 8 s ≈ 6 min · B 15 frases × 25 s ≈ 6 min · C 5 tarjetas ≈ 5 min · D 8 ≈ 2 min · E dicho ≈ 2 min · F 10 nombres ≈ 3 min · G 15 ≈ 3 min · H 20 pares ≈ 6 min.
Lote 2 · t02 (11–20), unas 165 filas, unos 55 min:
  A 63 × 8 s ≈ 8 min · B 60 × 30 s ≈ 30 min · C 6 (4 de regla + 2 Ojo) ≈ 6 min · D 12 ≈ 3 min · E 2 filas ≈ 2 min · G 25 ≈ 4 min.
Total: alrededor de 1 h 30 min (el plan estimaba 1,5–2 h).
Re-revisión de lo marcado ✎: una hoja corta (t02-r2.md) solo con esas filas, de 5 a 10 min.
Regla práctica: lotes de 45–60 min como máximo, porque con el oído cansado se aprueban cosas raras.

════════════════════════════
CÓMO SE TRABAJA Y CÓMO VUELVE
════════════════════════════
Dónde se revisa
- En el celular, con audífonos. El ▶ abre academiaseul.com/audio/kr/<hex>.mp3: los clips de 0–20 se suben antes de la revisión, sin enlazarlos desde ninguna página (son contenido gratis, así que no hay fuga).
- Alternativa: una versión HTML de la misma hoja, con un botón ▶ y botones ✓/✎/✗, que arma un resumen para pegar en WhatsApp. Vive fuera de public/ (como página privada), y la de 21+ nunca va en public/.

Cómo devuelve las marcas (Jay elige)
- editando el .md,
- con una foto de la hoja impresa, o
- por nota de voz o mensaje ("B: todo ✓ salvo B-07 A ✎ suena cortado").

Qué hace Claude con ellas: las pasa al JSON con Juego_100/herramientas/aplicar_revision.js.
- ✓ → rev "ok".
- ✎ → texto nuevo y clip nuevo; rev vuelve a "pendiente" y la fila entra a la re-revisión.
- ✗ → rev "sacar": el ítem sale y su id no se reutiliza.
- ? → queda abierta y prueba.js bloquea el push.

Los tramos 21+ usan el mismo formato: Kiran revisa 21–40, Jay 41–60 y Abby 61–100. Esas hojas solo se versionan con el repo ya privado.

## Dudas

- Romanización en 11–20: la regla vigente es 'ver pista' solo en el jefe 10 y nada desde el 11. Contradice el texto del plan: §3 (mecánicas de 11–20), §5 (reglas fijas: pista en 10–20), el ejemplo del §7 con "rom":"pista" y el §7.7 ('ni como opción desde el 10'). El esquema sigue la regla vigente. ¿Confirmas, y corregimos el texto del plan?
- Cópula solo con tipo N (regla vigente). En palabras_basico1.json, 'N' quiere decir 'núcleo publicado', no 'sustantivo': trae verbos, saludos, pronombres y adverbios. Filtrando quedan unos 63 sustantivos (≈29 con 받침 y ≈34 sin), no los 45/45 del plan. Choques con el plan: el nivel 16 usa 의사 y 회사원 (tipo T), el jefe 20 usa 한글 (T) y también aparecen 이름, 밥 y 김치 (T). Por defecto el esquema usa solo N: la transferencia del 20 es 모자, 나무, 오이, 우산 y 책상, y el 16 quedaría con 학생 y 선생님. ¿Autorizas una lista corta de tipo T revisadas (의사, 회사원, 이름, 밥, 김치, 한글) para la cópula?
- Nivel 14: el plan le pone 4 modos y el §5 un máximo de 3. Por defecto, dos-formas (책이에요 / *책이예요) pasa al 19, que es el nivel de ortografía, y en su lugar entra 마리아 + ___ (nombre de la lista; el clip 마리아예요 hay que generarlo). La ronda queda en 5 con 받침 y 5 sin. ¿OK?
- Calentamiento del nivel 14: propongo 학생 · 한국 · 한글 · 할머니 en vez de 학원 (no está en Básico 1) y 학교 (semana 5). Como es lectura y no cópula, 한글 (tipo T) y 할머니 (semana 4) sirven igual de distractores.
- Equivalentes chilenos que tienes que confirmar: 'Está papa / está papita' (nivel 20; saqué 'papita pa'l loro' porque no está claro que sea chileno), 'Guatita llena, corazón contento' (40) y 'Al mejor mono se le cae el zapallo' (60). En el 40, ¿agregamos también 'Primero es comer que ser cristiano' o queda solo 'Barriga llena, corazón contento'?
- Pronunciaciones de los dichos que tienes que confirmar: en el 100, ¿[철리낄도] o [철리 길도]? En el 90, ¿[백찌짱]? En el 20, ¿mostramos [누워서 떵먹끼] completo (es la pronunciación real, aunque el 비음화 se explica recién en el 78) o solo [먹끼]?
- Dicho del 50: 티끌 모아 태산 repite el tema 'paso a paso' que ya tienen el 10 y el 100. La alternativa es 세 살 버릇 여든까지 간다: usa 살 y 여든 del nivel 43, y su equivalente parcial es 'Árbol que crece torcido, jamás su tronco endereza'. Pero se usa casi siempre para los malos hábitos y suena menos motivador para un jefe. Se queda 티끌 모아 태산, salvo que prefieras cambiarlo.
- Los dichos de 30–100 quedaron dentro de su tramo, con llave, y no en el dichos.json público del plan §7. ¿Te parece bien?
- Audio revisado en public/audio/kr. No existe el clip de ninguno de los 10 dichos, ni de 누워서 떡 먹기예요. Tampoco existen 떡, 원숭이, 낮, 길, 걸음, 티끌, 태산, 금강산, 백지장 ni 모으다; sí existen 시작, 반, 호랑이, 말, 나무, 새, 쥐, 밤, 천, 오다, 듣다 y 떨어지다. De la cópula existen 책이에요, 저는 다니엘이에요, 호랑이예요, 누구예요? e 이게 뭐예요?. Faltan, entre otros: 의자예요, 가방이에요, 커피예요, 연필이에요, 우유예요, 친구예요, 저는 학생이에요, 모자예요, 나무예요, 빵이에요, 빵이 아니에요, 저예요, 뭐예요? y 마리아예요. Los clips de 어/오 y 으/우 (pares del nivel 2) sí existen.
- Lista cerrada de nombres (revisada): sin 받침, 마리아, 소피아, 카밀라, 마테오 y 마르코; con 받침, 다니엘, 미겔, 후안, 이사벨 y 벨렌 [벨레니에요]. Respecto de la propuesta, Lucía y Martín salieron y entraron Marco y Belén. Así cada grupo tiene 3 mujeres y 2 hombres, y el género no delata la forma. Además, 마르코 es el que usa el plan en el nivel 22. ¿Te sirven la transcripción y la mezcla?
- Llaves: (a) ¿Niños queda sin llave, ya que el juego es 13+ y tendrá su camino aparte? (b) ¿Los ex-alumnos de julio reciben la llave de Básico 2? (c) ¿TOPIK II recibe llave, aunque lo que le sirve está recién en 91–100?
- Plan de Vercel: el equipo se llama 'academiaseuls-projects', que es el nombre que Vercel pone por defecto a las cuentas personales. ¿Es Hobby o Pro? En Hobby los logs de funciones duran 1 hora (por eso el conteo de llaves va por Web Analytics), los límites de Firewall y de eventos son menores, y las condiciones de Hobby son para uso personal no comercial. Esto último vale para todo el sitio, no solo para el juego.
- JUEGO_LLAVES: ¿la marcas como Sensitive? Si la marcas, Vercel no deja volver a leerla y la única copia completa queda en Juego_100/_privado/llaves.json, en tu PC (conviene un respaldo). Como solo tiene hashes, puede ir sin Sensitive. JUEGO_SECRETO sí va Sensitive.
- Hash del código: se queda SHA-256 de 'tigre100:' + código, sin secreto. Si alguien obtuviera JUEGO_LLAVES, casi seguro tendría también JUEGO_SECRETO (viven en el mismo lugar) y podría firmar tokens directamente, así que HMAC no agrega protección real y obligaría a crear_llave.js a pedirte el secreto. Además, con 1.677 millones de combinaciones, un hash filtrado se adivina en minutos: el hash solo sirve para que el código no quede a la vista en Vercel. ¿OK?
- Los clips de 21+ quedarían en public/audio/kr, y el nombre de cada archivo es su texto en hex. No se pueden listar desde el sitio, pero sí se ven en GitHub mientras el repo sea público. Es otra razón para pasarlo a privado antes del lun 9 nov.
- Hoja de revisión: ¿la revisas en el celular (subimos antes los clips de 0–20 sin enlazarlos) o en la PC? ¿Prefieres el .md o una versión HTML con botones ▶ ✓ ✎ ✗ que te arma el resumen para WhatsApp?
- Nombres de barrio: Dubu llama 'Bukchon' a su mundo 1, y en Tigre 100 Bukchon es 11–20. El aviso de migración dirá 'los mundos 1 y 2 de Dubu' en vez de 'Bukchon'. ¿Te sirve así, o prefieres renombrar los mundos de Dubu en F4?

## Qué corrigió el revisor

Revisión adversarial de la propuesta F0 de Tigre 100. Lo comprobé contra el repo, sin editar nada: el plan Juego_100/00_Plan_de_Accion.md, los formatos reales de hr-progreso-v1 (public/hangul-race/motor.js), dubu-progreso (public/dubu/index.html) y as-lector-hangul, los ids de public/hangul-race/contenido.json, palabras_basico1.json y la existencia de cada clip en public/audio/kr (todas las afirmaciones de audio_existe de la propuesta resultaron correctas). También recalculé con node el hash de ejemplo, la firma HMAC del token, las fechas iat/exp (correctas, Chile en UTC-3 ese día) y el código de respaldo.

(a) Dichos: los 10 son 속담 reales y de uso actual, y sus [pron] están bien (90 y 100 siguen con ⚑ para Jay). Errores: en el 30 se dice que 제가 es 'mi' (제가 = 'yo' sujeto; aquí 제 es el reflexivo 'su propio'). En el 20 había un ítem de cópula con 누워서 떡 먹기, que no está en palabras_basico1 tipo N y rompe la regla obligatoria; queda como ejemplo fijo de la tarjeta. Ajustes menores: el literal del 70 (falta el 'solo si' de -아야), el equivalente del 30 ('por la puerta se asoma'), el 90 pasa a 'casi total' y el chileno del 20 (se saca 'pa'l loro' hasta que Jay confirme).

(b) Llave: no hay agujeros graves para el caso, pero sí errores técnicos:
- La normalización no junta los separadores repetidos.
- vence era una fecha sin zona horaria, y el servidor corre en UTC.
- La ruta del tramo confiaba en abre/exp del token, así que achicar o acortar en Vercel no afectaba a los tokens ya entregados; además 'abre' era ambiguo.
- Una variable Sensitive de Vercel no se puede volver a leer, lo que rompía la rotación. Se agrega _privado/llaves.json.
- Contar activaciones con los logs no sirve: duran 1 h en Hobby y 1 día en Pro.
- La espera de 400 ms no frena peticiones en paralelo.
- Sin service worker, /tigre no abre sin red.
- La prueba de fugas por texto daría falsas alarmas. Se cambia por un canario, los ids y un umbral.
- timingSafeEqual revienta con largos distintos.

(c) Esquema:
- Los ítems de Race importados a t02 traen rom/alt, y la prueba los prohíbe.
- En Dubu, ver 'hangul' también muestra la romanización.
- Corre de Race usa la romanización como respuesta.
- El par 너/노 aparece en el nivel 2, antes de enseñar la ㄴ.
- La limpieza del Leitner borraría el progreso de los tramos con llave. Se agrega 't' por ítem.
- La fórmula de control del respaldo no producía 3PML, y el ejemplo no tenía 'huella'. Se regeneró y se verificó.
- dictado: 0,83 pasa a 0,89.
- La plantilla batchim_ng dejaba {pron} vacío.
- Inconsistencias de forma: correcta como índice, explicación como texto, bandejas, img con extensión e importa incompleto.
- El nivel 14 tenía 4 modos.
- Los nombres repartían el 받침 según el género. Se cambia a 마르코 y 벨렌.

También corregí los conteos de la hoja de revisión. Las dudas que necesitan a Jay quedan en extra_corregido.dudas.
- **C01** (error): Dicho 30: explica mal 제. 제가 no es 'mi': es 'yo' como sujeto (저 + 가); 'mi' es 제 = 저의 (제 이름). En el dicho, 제 es el reflexivo 'su propio' (= 자기의). Tampoco es una 'forma antigua'. — `Ojo con 제: aquí no es el 'mi' de 제가, sino la forma antigua de 'su propio' (자기). / Además repasa el 제 de 제가 con un uso nuevo y gracioso.` → `Ojo con 제: aquí no es 'mi' (제 이름) ni el 'yo' de 제가; es el reflexivo 'su propio' (= 자기의): 제 말 = 'lo que se dice de él'. / Además muestra que 제 no siempre es 'yo/mi'.`
- **C02** (error): Dicho 20: el ítem dicho-20-copula usa como base 누워서 떡 먹기, que no está en palabras_basico1.json (tipo N). Rompe la regla obligatoria de la cópula, y el por_que_aqui lo presenta como el ítem de transferencia del jefe. — `{ "id": "dicho-20-copula", "modo": "copula", "prompt": "누워서 떡 먹기 + ___", … "transferencia": true } y 'deja un ítem de transferencia real para el jefe: 누워서 떡 먹기 + ___ → 예요'` → `Sale el ítem. La tarjeta muestra 'ejemplo': { 'ko': '누워서 떡 먹기예요!', 'es': '¡Es pan comido!' } como ejemplo fijo revisado, sin elegir forma. La transferencia del jefe 20 sale de sustantivos tipo N (모자, 나무, 오이, 우산, 책상).`
- **C03** (mejora): Equivalente chileno del 20: 'papita pa'l loro' no es claramente un giro chileno; lo que se oye en Chile es 'está papa / está papita'. — `Está papita (o 'es papita pa'l loro').` → `Está papa / está papita (⚑ Jay confirma).`
- **C04** (mejora): Dicho 30: el refrán hispano no suele terminar así. — `Hablando del rey de Roma (y él que se asoma) (total).` → `Hablando del rey de Roma, por la puerta se asoma (total).`
- **C05** (mejora): Dicho 70: el literal pierde el 'solo si' de -아야, que el propio vocabulario_clave explica. — `Si las palabras que van son lindas, las palabras que vuelven son lindas.` → `Solo si las palabras que se van son bonitas, son bonitas las que vuelven.`
- **C06** (mejora): Dicho 90: 'La unión hace la fuerza' no recoge el matiz coreano (hasta lo más fácil sale mejor entre dos), así que no es 'total'. — `La unión hace la fuerza (total).` → `La unión hace la fuerza (casi total: el coreano subraya que hasta lo más fácil sale mejor entre dos).`
- **C07** (error): Llave: la normalización convierte cada carácter en un guion, pero no junta los repetidos ni quita los de los extremos. 'kimchi  namsan' daría KIMCHI--NAMSAN y fallaría. — `lo que no sea letra o número pasa a ser un guion` → `NFD sin tildes, mayúsculas, cada TRAMO de caracteres fuera de A–Z/0–9 pasa a UN guion, y se quitan los guiones de los extremos. Prueba: 'kimchi  namsan, hanok 47 ' = KIMCHI-NAMSAN-HANOK-47.`
- **C08** (error): Llave: vence es una fecha sin zona y el servidor corre en UTC. '2027-03-31' cortaría el acceso horas antes de lo prometido. — `"vence":"2027-03-31"` → `"vence":"2027-03-31T23:59:59-03:00" (ISO con zona; Chile sigue en UTC-3 ese día). crear_llave.js lo arma desde --vence 2027-03-31.`
- **C09** (error): La ruta del tramo verifica abre y exp con lo que dice el TOKEN. Si Jay acorta vence o achica abre en JUEGO_LLAVES, los tokens ya entregados siguen igual. Además 'abre':[3,10] no dice si es una lista o un rango. — `2. Que exp sea mayor que ahora … 5. Que el tramo esté dentro de "abre".` → `Vencimiento efectivo = el menor entre exp del token y vence de JUEGO_LLAVES; el tramo se compara con el abre de JUEGO_LLAVES. abre = [desde, hasta], rango inclusivo, siempre 2 números.`
- **C10** (error): Una variable Sensitive de Vercel no se puede volver a leer. La rotación ('pegar la entrada en JUEGO_LLAVES') exige reescribir el valor entero, que Jay ya no puede ver. — `JUEGO_LLAVES … marcadas como Sensitive. / --rotar entrega la misma entrada con un h nuevo` → `La fuente de verdad es Juego_100/_privado/llaves.json (fuera de git); crear_llave.js lo mantiene e imprime siempre la línea COMPLETA. JUEGO_SECRETO va Sensitive; JUEGO_LLAVES (solo hashes) puede ir sin Sensitive.`
- **C11** (error): Contar activaciones con las líneas 'llave_ok' del log no sirve: los logs de funciones de Vercel duran 1 hora en Hobby y 1 día en Pro. — `Conteo de activaciones: se cuentan las líneas "llave_ok" del log de Vercel.` → `Al activar, el juego hace history.pushState a /tigre?n=llave-a11-2026-10 y Web Analytics la cuenta como visita, sin datos de la persona (comprobar en el panel que ?n= se registra). El log queda solo para depurar.`
- **C12** (mejora): La espera fija de 400 ms no frena intentos en paralelo (cada petición es su propia función) y gasta tiempo de función. Además, 10 intentos por minuto por IP puede bloquear a una clase entera que activa a la vez desde el mismo Wi-Fi o detrás del CGNAT de una compañía móvil. — `401 "codigo_invalido", después de una espera fija de 400 ms … regla de Firewall de 10 intentos por minuto por IP` → `Sin espera artificial: protegen las 1.677 millones de combinaciones y, si el plan lo permite, una regla de Firewall de unos 20 intentos por minuto por IP, que además evita agotar la cuota de funciones.`
- **C13** (error): Los casos 'sin red' suponen que la página abre sin conexión, pero no hay service worker hasta F4 y Vercel sirve los estáticos con revalidación. /tigre no abre offline. — `Qué pasa sin red a) Tramo guardado y vigente: se juega normal.` → `Hasta F4, 'sin red' quiere decir que la conexión se cae con el juego ya abierto. Abrir /tigre sin red llega con el service worker de F4. Los casos a–e quedan iguales para ese escenario.`
- **C14** (error): La prueba de fugas 'ningún archivo de public/ contiene un texto coreano de 4 o más sílabas de t03–t10' va a dar falsas alarmas. public/ ya tiene frases que también estarán en t03 (Lector, 한글 Race y las flashcards S4–S8, públicas por decisión del plan). — `Ningún archivo de public/ (salvo mapa.json) contiene un id ni un texto coreano de 4 o más sílabas de t03–t10.` → `Canario: cada tramo protegido lleva '_canario' (32 hex al azar) y no puede aparecer en public/ ni en .next/static/. Ningún id DEFINIDO en t03–t10 aparece ahí. Y ningún archivo de public/ tiene más de 10 textos ko (de 4 o más sílabas) de un mismo tramo protegido.`
- **C15** (mejora): Faltan detalles que rompen en producción: crypto.timingSafeEqual lanza un error si los largos difieren; req.json() lanza un error con JSON inválido; el Origin se compara como texto y no tiene código de respuesta. — `comparando con crypto.timingSafeEqual / el encabezado Origin tiene que ser academiaseul.com …` → `Las entradas con h que no tenga 64 hex se descartan al leer y se comparan buffers de 32 bytes; el cuerpo se lee con try/catch (400); el Origin se parsea con new URL() y se compara el hostname; si falta o es ajeno, 403 'origen'. Todo esto entra a prueba_llave.js.`
- **C16** (mejora): La duda sobre hash vs HMAC exagera el beneficio de HMAC. Si se filtra JUEGO_LLAVES, casi seguro se filtra también JUEGO_SECRETO (viven en el mismo lugar), y con unos 30 bits de entropía un SHA-256 filtrado se adivina en minutos de todos modos. — `Si prefieres que una filtración de JUEGO_LLAVES no permita adivinar códigos, se cambia a HMAC con JUEGO_SECRETO` → `Se queda SHA-256 sin secreto. El hash solo evita que el código esté a la vista en Vercel; HMAC no agrega protección real y obligaría a crear_llave.js a pedir el secreto.`
- **C17** (mejora): Faltaba explicar cómo funciona el 304 con Cache-Control no-store: el navegador no guarda nada, así que el juego tiene que mandar If-None-Match a mano y tratar el 304 por su cuenta. — `304 si el ETag coincide (ahorra datos móviles).` → `304 si If-None-Match coincide. El juego pone ese encabezado a mano en el fetch; el navegador entrega el 304 tal cual al código, y el juego lo trata como 'tu copia sigue vigente' y extiende valido_hasta.`
- **C18** (error): Esquema: t02 importa ítems de Race que traen rom y alt (w-uyu, w-chingu…), pero la prueba exige 'rom/alt/pista solo con n ≤ 10'. O falla siempre, o obliga a copiar los ítems. — `ROMANIZACIÓN - rom/alt/pista solo con n ≤ 10` → `Desde el 11 el motor ignora rom y alt de los ítems importados. La prueba revisa las PREGUNTAS generadas con 40 semillas (rom_visible false, elige ≠ rom, acepta = hangul, sin pista), no los archivos. Solo t03–t10 tienen prohibido el campo rom.`
- **C19** (error): arma-tablero: en Dubu, ver 'hangul' muestra la sílaba fantasma Y la romanización (verRR), y 'oido' revela la romanización al 3.er fallo. Usar 'hangul' desde el 10 rompe la regla de romanización. — `(ver: "rr" muestra la romanización solo con n ≤ 9; desde el 10, "hangul")` → `1–9: hangul ／ rr ／ oido, como en Dubu. 10: oido, con la romanización solo en 'ver pista'. Desde el 11: 'ko' (nuevo), con la sílaba fantasma en hangul y nunca romanización; al 3.er fallo se revela la sílaba en hangul.`
- **C20** (error): Corre de Race arma la pregunta con correcta = item.rom y pista = romanización por sílabas. Con 'acepta':'hangul' desde el 10, la pregunta seguiría llevando la romanización. — `desde el 10, "acepta":"hangul" (teclado)` → `1–9 como en Race. 10: correcta = item.ko y la pista en rom solo detrás de 'ver pista'. Desde el 11: correcta = item.ko, sin pista.`
- **C21** (error): El ejemplo de pares del nivel 2 usa 너/노, pero la ㄴ se enseña en el nivel 3 (nada se usa antes de enseñarse). El 그/구 del plan para el nivel 2 tiene el mismo problema. — `a) nivel 2: { "id": "p-neo-no", … "par": ["너", "노"] }` → `Nivel 2: p-eo-o (어/오) y p-eu-u (으/우), con ㅇ muda; los cuatro clips existen. 너/노, 그/구 y 더/도 desde el nivel 3.`
- **C22** (error): 'Los ids que ya no existen en ningún tramo se ignoran (y se limpian al guardar)' borraría el Leitner de 21+ cada vez que el tramo protegido no esté cargado: llave vencida, otro teléfono después de restaurar, o sin red. — `Los ids que ya no existen en ningún tramo se ignoran (y se limpian al guardar).` → `Cada ítem del perfil guarda 't' (su tramo). Un id se limpia solo si su tramo está cargado en su versión actual y el id ya no está. Repaso y calentamiento saltan los ítems de tramos no disponibles.`
- **C23** (error): Código de respaldo: con la fórmula tal como está escrita (módulo 36^4 en cada paso) el control da TNJX, no 3PML; 3PML sale de un entero de 32 bits sin signo. Además, el ejemplo decodifica a un perfil sin 'huella', distinto del §8. — `control = 4 caracteres en base 36 de un hash simple (h = h*31 + byte, módulo 36^4) … TIGRE1.hZLbbuow….3PML (741 B)` → `h = (h·31 + byte) mod 2^32 en cada paso; control = h mod 36^4, en base 36, mayúsculas y 4 caracteres. Ejemplo regenerado y verificado con el perfil del §8 (con huella y 't'): 780 B → 496 caracteres, control O0C4.`
- **C24** (error): dictado: el crédito parcial de '채이에요' está mal calculado. 책이에요 tiene 9 jamo y le falta 1. — `"parcial": 0.83` → `"parcial": 0.89 (1 − 1/9)`
- **C25** (error): reglas.json: la plantilla batchim_ng termina en {pron}, pero 가방이에요 no lleva pron (suena igual que se escribe), así que la explicación quedaría con un hueco. — `"batchim_ng": "… La ㅇ final no salta: {pron}."` → `"batchim_ng": "{ult} = {desarme}. La ㅇ de abajo SÍ es 받침 (suena ng) → 이에요. La ㅇ no salta: suena tal como se escribe, {ko}." La prueba revisa que ninguna plantilla quede con un hueco.`
- **C26** (mejora): dicho-20-situacion usa correcta: 0 (una posición). En todo el resto, correcta es un valor, y las opciones se barajan. — `"correcta": 0` → `"correcta": "La prueba de Hangul me salió perfecta y sin esfuerzo". Regla: correcta siempre es un valor (texto o id).`
- **C27** (mejora): En dos-formas, la explicación es un texto suelto, pero el esquema dice que siempre es {titulo, lineas}. — `"explicacion": "Después de 받침 se escribe 이에요. …"` → `"explicacion": { "titulo": "Se escribe 책이에요.", "lineas": ["Después de 받침 va 이에요; *이예요 no existe, aunque al hablar rápido suenen parecido."] }`
- **C28** (mejora): En clasifica-batchim, correcta 'con' no coincide con el texto de la bandeja 'con 받침'. — `"bandejas": ["con 받침", "sin 받침"] … "correcta": "con"` → `"bandejas": [{"id":"con","t":"con 받침"},{"id":"sin","t":"sin 받침"}], y correcta es el id.`
- **C29** (mejora): img mezcla hex sin extensión ('ec97b0ed9584') con nombres con extensión ('sejong.svg', 'dicho-20.svg'). — `"img": "sejong.svg" / "img": "dicho-20.svg"` → `"img" siempre sin extensión: "sejong", "dicho-20". El motor resuelve img/<valor>.svg.`
- **C30** (mejora): El nivel 14 usa 4 modos (copula, escucha-imagen, ordena y dos-formas) y el plan §5 pone un máximo de 3. — `ronda con dos-formas df-chaek-ieyo` → `Por defecto, df-chaek-ieyo pasa al 19 (ortografía) y entra una cópula con nombre (f-maria-yeyo, 마리아 + ___), con lo que la ronda queda 5 con 받침 / 5 sin. El tope de 3 modos vale para la ronda de los niveles nuevos; calentamiento, x5, x9 y jefe quedan exentos. Queda como duda para Jay.`
- **C31** (mejora): 'importa' no trae todos los ids de Race que usa la receta (w-hanguk y w-hangeul van en el calentamiento del 14). Tampoco hay regla contra redefinir un id de Race ni forma de agregarle img/batchim a un ítem importado (escucha-imagen necesita la imagen de w-uyu). — `"importa": { "/hangul-race/contenido.json": ["w-uyu", "w-chingu", "w-gabang", "w-keopi"] }` → `"importa" con w-hanguk y w-hangeul. Regla: un id de Race se define una sola vez y ningún tramo lo redefine. Nuevo campo de tramo "extiende": { "w-uyu": { "img": "ec9ab0ec9ca0", "dibujo": "…", "batchim": "" } }.`
- **C32** (mejora): En la lista de nombres, el género delata la forma: 4 de los 5 nombres sin 받침 son de mujer y 4 de los 5 con 받침 son de hombre. Además el plan usa 마르코 en el nivel 22 y no está en la lista. — `sin 받침: 마리아, 소피아, 카밀라, 마테오, 루시아 · con 받침: 다니엘, 미겔, 이사벨, 후안, 마르틴` → `sin 받침: 마리아, 소피아, 카밀라, 마테오, 마르코 · con 받침: 다니엘, 미겔, 후안, 이사벨, 벨렌 [벨레니에요]. Cada grupo queda 3/2 en género, y 마르코 cubre el nivel 22.`
- **C33** (mejora): Dubu llama 'Bukchon' a su mundo 1, y en Tigre 100 Bukchon es el barrio 11–20. El aviso de migración del plan confunde. — `'Vimos que terminaste Bukchon en Dubu: te abonamos los niveles 1–5'` → `'Vimos que terminaste los mundos 1 y 2 de Dubu: te abonamos los niveles 1–5'`
- **C34** (mejora): 'Jefe aprobado … abre el tramo siguiente' no dice que, para el tramo 3, además hace falta la llave. — `Jefe: "aprobado" con 80 % o más, y eso abre el tramo siguiente.` → `Aprobar el jefe abre el tramo siguiente; si ese tramo es de alumno, además hace falta la llave (o el 'Saltar aquí' de su curso, que también la pide).`
- **C35** (mejora): Criterios de publicación distintos: el §2 dice '0 ítems en rev pendiente' y el §13 'rev distinto de ok'. Un ítem 'cambiar' pasaría el primero. — `Solo se publica con 0 ítems en rev "pendiente"` → `Solo se publica con 0 ítems con rev distinto de "ok" y 0 dudas "?" abiertas.`
- **C36** (mejora): La transferencia del jefe 20 del plan incluye 한글이에요, y 한글 es tipo T: rompe la regla de usar solo N en la cópula. — `5 ítems de transferencia … (모자예요, 나무예요, 한글이에요)` → `모자예요, 나무예요, 오이예요, 우산이에요, 책상이에요 (todos tipo N; se cambian si alguno ya salió en 11–19). Sigue abierta la duda sobre los T.`
- **C37** (mejora): Hoja de revisión: la cabecera dice 151 filas y las secciones de t02 suman unas 168. Las tarjetas tampoco cuadran: '6 de regla en 0–20' contra 5 + 4 en los lotes. — `Filas: 151 · Hay 6 tarjetas de regla en 0–20, 2 de Ojo y la de 세종대왕` → `Filas: unas 165 · C: unas 11 tarjetas en 0–20 (unas 4 de regla + 세종대왕 en t01; 4 de regla + 2 Ojo en t02). El número exacto sale del JSON.`
- **C38** (mejora): Hoja de revisión B-08: muestra un [pron] igual a la escritura, contra la regla de poner pron solo cuando difiere. — `／ B-08 ／ f-gabang-ieyo ／ 13 ／ 가방이에요 ／ [가방이에요] (la ㅇ no salta) ／` → `／ B-08 ／ f-gabang-ieyo ／ 13 ／ 가방이에요 ／ — (la ㅇ no salta: suena como se escribe) ／`