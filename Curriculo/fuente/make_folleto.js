// Folleto de cursos · Cohorte octubre 2026 · VERSIÓN B (PDF / folleto) · docx en español.
// Contenido: las 6 páginas públicas de Curriculo/publico/ (que salen de cursos_es.json, el syllabus
// entregado a las profes) + lib/nivel1.ts (horarios, profes, cupos, precio, husos horarios).
// Estilo de la casa: US Letter, Arial (+ Malgun Gothic para el coreano), cabeceras de tabla navy #003478,
// títulos azules #4236F6, logo azul en portada. Nunca rojo.
// Uso: cd <scratchpad> && node curriculo/make_folleto.js
// Salida: Curriculo/publico/Folleto_Cursos_Octubre_2026.docx (el PDF lo exporta el coordinador con Word).
const fs = require("fs");
const path = require("path");

// El generador vive en el scratchpad (con node_modules/docx); la copia del repo (Curriculo/fuente/) usa la misma ruta.
const SCRATCH = process.env.AS_SCRATCH ||
  "C:\\Users\\Chingu\\AppData\\Local\\Temp\\claude\\C--Users-Chingu-Desktop-ACADEMIASEULWEB\\d4111e1b-5523-44ea-97b2-b1a1d9545b9e\\scratchpad";
let docx;
try { docx = require("docx"); } catch (e) { docx = require("module").createRequire(path.join(SCRATCH, "package.json"))("docx"); }
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  WidthType, AlignmentType, BorderStyle, ShadingType, Footer, Header, PageNumber,
  TabStopType, VerticalAlign,
} = docx;

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const OUT = path.join(REPO, "Curriculo", "publico");
fs.mkdirSync(OUT, { recursive: true });

// ---- estilo de la casa (helpers copiados de programa/make_programa_completo.js) ----
const AZUL = "4236F6", NAVY = "003478", INK = "1B1C24", GREY = "5C5F6B";
const LINE = "CCCCCC", TINT = "EEF1F6", ZEBRA = "F7F8FA", WHITE = "FFFFFF";
const FONT = { ascii: "Arial", hAnsi: "Arial", cs: "Arial", eastAsia: "Malgun Gothic" };
const MARGIN_X = 1080, MARGIN_Y = 820;
const CONTENT_W = 12240 - 2 * MARGIN_X; // 10080
const LOGO = fs.readFileSync(path.join(SCRATCH, "logo-azul.png"));
const SELLO = fs.readFileSync(path.join(SCRATCH, "igpost", "sello-azul.png"));

// Comillas tipográficas en todo el texto ("x" -> “x”).
const curly = (t) => String(t).replace(/"([^"]*)"/g, "“$1”");
const run = (t, o = {}) => new TextRun(Object.assign({ text: curly(t), font: FONT, size: 21, color: INK }, o));
const P = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new Paragraph(Object.assign({ children: c, spacing: { after: 110, line: 276 } }, o)); };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const none = { style: BorderStyle.NONE, size: 0, color: WHITE };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };
const cellP = (t, o = {}, po = {}) => new Paragraph(Object.assign({ children: Array.isArray(t) ? t : [run(t, o)], spacing: { after: 0, line: 240 } }, po));
const cell = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new TableCell(Object.assign({ children: c, verticalAlign: VerticalAlign.CENTER, margins: { top: 35, bottom: 35, left: 90, right: 90 } }, o)); };
function fitWidths(widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  if (total === CONTENT_W) return widths;
  const f = CONTENT_W / total; const w = widths.map((x) => Math.round(x * f));
  w[w.length - 1] += CONTENT_W - w.reduce((a, b) => a + b, 0); return w;
}
// Tabla con cabecera navy. Cada celda: string, o lista de { t, o } (un párrafo por elemento).
function headTable(headers, rows, widths, size = 18) {
  widths = fitWidths(widths);
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, borders: allBorders, rows: [
    new TableRow({ tableHeader: true, cantSplit: true, children: headers.map((h, i) => cell([cellP(h, { bold: true, color: WHITE, size: size })], { width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: NAVY } })) }),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => {
      const parts = Array.isArray(c) ? c : [{ t: c }];
      return cell(parts.map((p) => cellP(p.t, Object.assign({ size }, p.o || {}))), { width: { size: widths[i], type: WidthType.DXA }, shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: ZEBRA } : undefined });
    }) })),
  ] });
}
// Tabla etiqueta | valor. El valor puede ser string o lista de TextRun.
function kvTable(rows, labelW = 1750, size = 19) {
  const valW = CONTENT_W - labelW;
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [labelW, valW], borders: allBorders, rows: rows.map((r) => new TableRow({ cantSplit: true, children: [
    cell([cellP(r[0], { bold: true, size: size, color: NAVY })], { width: { size: labelW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: TINT } }),
    cell([cellP(r[1], { size })], { width: { size: valW, type: WidthType.DXA } }),
  ] })) });
}
const H1 = (t, opts = {}) => new Paragraph(Object.assign({ children: [run(t, { bold: true, size: 30, color: AZUL })], spacing: { before: 240, after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }, keepNext: true }, opts));
const H2 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 22, color: AZUL })], spacing: { before: 120, after: 50 }, keepNext: true });
const H3 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 20, color: NAVY })], spacing: { before: 120, after: 50 }, keepNext: true });
const bullet = (t, o = {}) => new Paragraph({ children: [run("•  ", { color: AZUL, bold: true, size: o.size || 20 }), ...(Array.isArray(t) ? t : [run(t, Object.assign({ size: 20 }, o))])], spacing: { after: 30, line: 252 }, indent: { left: 340, hanging: 220 } });
const num = (i, t) => new Paragraph({ children: [run(i + ".  ", { color: AZUL, bold: true }), ...(Array.isArray(t) ? t : [run(t)])], spacing: { after: 80, line: 276 }, indent: { left: 400, hanging: 300 } });
function caja(parts, fill = TINT, border = AZUL) {
  const b = { style: BorderStyle.SINGLE, size: 8, color: border };
  const paras = Array.isArray(parts[0]) ? parts : [parts];
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: none, insideVertical: none },
    rows: [new TableRow({ cantSplit: true, children: [cell(paras.map((p, i) => new Paragraph({ children: p, spacing: { after: i === paras.length - 1 ? 0 : 60, line: 276 } })), { shading: { type: ShadingType.CLEAR, fill }, margins: { top: 110, bottom: 110, left: 170, right: 170 } })] })] });
}
const espacio = (n = 120) => new Paragraph({ children: [run("", { size: 4 })], spacing: { after: n, line: 240 } });
// Salto de página sin dejar una línea vacía arriba de la página nueva.
const nuevaPagina = () => new Paragraph({ pageBreakBefore: true, children: [run("", { size: 2 })], spacing: { before: 0, after: 0, line: 240 } });

// Banda azul con el nombre del curso (arriba de cada página de curso).
function banda(titulo, sub, resumen, fill = AZUL, color = WHITE) {
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
    rows: [new TableRow({ cantSplit: true, children: [cell([
      new Paragraph({ children: [run(titulo, { bold: true, size: 30, color })], spacing: { after: 20, line: 252 } }),
      new Paragraph({ children: [run(sub, { size: 20, color, bold: true })], spacing: { after: 30, line: 252 } }),
      new Paragraph({ children: [run(resumen, { size: 17, color })], spacing: { after: 0, line: 252 } }),
    ], { shading: { type: ShadingType.CLEAR, fill }, margins: { top: 100, bottom: 100, left: 200, right: 200 } })] })] });
}
const tagline = (t) => new Paragraph({ children: [run(t, { italics: true, size: 22, color: NAVY })], spacing: { before: 100, after: 20, line: 264 } });
const kor = (t) => run(t, { color: NAVY, size: 20 });

// ============================ DATOS ============================
const PRECIO = "US$150 el curso completo · o 2 cuotas de US$75";
const WEB = "www.academiaseul.com";
const WA = "+56 9 4211 5562";

const CURSOS = [
  {
    titulo: "Básico 1 · A1.1",
    sub: "Primeras Palabras · 첫 한국어",
    resumen: "Desde cero · martes o jueves 20:00 (hora de Chile) · con Kiran · 8 semanas por Zoom",
    tagline: "De no reconocer ni una letra a presentarte en coreano: 8 semanas para leer 한글 y decir tus primeras frases reales.",
    paraQuien: [
      "Nunca has estudiado coreano, o reconoces letras por el K-pop o los dramas, pero todavía no lees.",
      "Hiciste el Nivel 1 de julio y quieres consolidar la lectura antes de subir a Básico 2.",
      "Quieres que te expliquen desde el español: Kiran es una profesora coreana que se crió en Argentina.",
    ],
    fechaCol: "Fecha (mar y jue)",
    semanas: [
      ["1", "13 y 15 oct", "가나다라 I · La sílaba", "Las vocales básicas y las consonantes simples, cómo se arma una sílaba y tus primeras palabras."],
      ["2", "20 y 22 oct", "가나다라 II + 안녕하세요", "La consonante final (받침), las dobles y las vocales compuestas. Saludas y te presentas."],
      ["3", "27 y 29 oct", "이게 뭐예요? · ¿Qué es esto?", "Preguntas y dices qué es algo (이거, 그거, 저거), respondes sí o no y dices lo que no es."],
      ["4", "3 y 5 nov", "우리 엄마예요 · Mi familia", "Presentas a tu familia con una foto. Cuentas del 1 al 100 y dictas tu teléfono."],
      ["5", "10 y 12 nov", "집이 어디예요? · Lugares", "Dices dónde vives y dónde están las cosas: arriba, abajo, al lado, dentro."],
      ["6", "17 y 19 nov", "학교에 가요 · Mi día", "Tus primeros verbos en presente: a dónde vas y qué haces cada día."],
      ["7", "24 y 26 nov", "Mi pieza y mis verbos", "\"Hay\" y \"no hay\", qué haces con las cosas, y preparas tu presentación final."],
      ["8", "1 y 3 dic", "사과를 좋아해요 + examen", "Lo que te gusta y lo que no, un examen corto en línea y tu mini-presentación \"Yo en coreano\"."],
    ],
    podras: [
      ["Leer en voz alta un cartel, un menú o el nombre de tu grupo favorito escrito en 한글.", null],
      ["Presentarte y presentar a tu familia:", "저는 마리아예요. 칠레 사람이에요."],
      ["Preguntar qué es algo o dónde está el baño, y entender una respuesta corta:", "화장실이 어디예요?"],
      ["Contar tu día y tus gustos, y hablar de ti 1 a 2 minutos sin leer.", null],
    ],
    horario: "Martes 20:00–21:00 (13 oct → 1 dic) o jueves 20:00–21:00 (15 oct → 3 dic), hora de Chile · con Kiran (기란). Mismo programa: eliges una sección.",
    inversion: PRECIO + " (la 2.ª antes de la clase 5: martes 10 o jueves 12 de noviembre).",
    incluye: "8 clases en vivo · grabaciones · slides y hojas de actividad (PDF) · el Lector de Hangul como tarea guiada · corrección de tus audios · grupo de WhatsApp del curso · guía de estudio a mitad de curso · certificado digital.",
    cupos: "Máximo 15 estudiantes por sección (martes y jueves son grupos distintos).",
    inscribete: WEB + "/nivel-1?clase=a11-martes  ·  " + WEB + "/nivel-1?clase=a11-jueves",
  },
  {
    titulo: "Básico 2 · A1.2",
    sub: "Pasado, presente y futuro · 기초 한국어 2",
    resumen: "Requiere Básico 1 o equivalente · miércoles 21:00 (hora de Chile) · con Jay · 8 semanas por Zoom",
    tagline: "Pasa de frases sueltas a contar tu vida en coreano: lo que hiciste, lo que haces y lo que vas a hacer.",
    paraQuien: [
      "Terminaste Básico 1 o hiciste el Nivel 1 de julio de 2026: ese certificado te habilita directo.",
      "Aprendiste por tu cuenta y ya lees 한글 con soltura, te presentas y usas el presente (가요, 먹어요).",
      "Quieres dejar de hablar solo en presente y contar qué hiciste o qué planes tienes.",
    ],
    fechaCol: "Fecha (mié)",
    semanas: [
      ["1", "14 oct", "Te vuelves a presentar", "Te presentas con más detalle y repasas lo esencial de Básico 1. Conversación de diagnóstico, sin nota."],
      ["2", "21 oct", "Números en la vida real", "Los dos sistemas de números para tu edad, tu cumpleaños, tu teléfono y la hora."],
      ["3", "28 oct", "Tu rutina en presente", "Un día normal con unos 10 verbos, incluidos irregulares de todos los días. 에 y 에서."],
      ["4", "4 nov", "El pasado", "Cuentas qué hiciste: cuándo, dónde y con quién, y desde y hasta cuándo."],
      ["5", "11 nov", "El futuro y tus planes", "Planeas tu semana o un viaje: qué vas a hacer, cuándo y cómo vas a ir."],
      ["6", "18 nov", "Lo que no hago y lo que sé hacer", "\"No lo hago\", \"no puedo\" y \"sé hacerlo\". Rechazas una invitación con amabilidad."],
      ["7", "25 nov", "Partículas para sonar natural", "Comparas y precisas: más que, como, solo, también, cada, más o menos."],
      ["8", "2 dic", "Conectores, examen y cierre", "Unes ideas con \"y\" y \"pero\", conversas unos 5 minutos y rindes el examen final."],
    ],
    podras: [
      ["Contarle a alguien tu fin de semana:", "토요일에 친구하고 카페에 갔어요."],
      ["Hablar del viaje que estás planeando:", "내년에 한국에 갈 거예요."],
      ["Decir que no a una invitación sin sonar cortante:", "미안해요, 내일은 못 가요."],
      ["Mantener una conversación de unos 5 minutos sobre tu rutina, lo que hiciste y lo que vas a hacer.", null],
    ],
    horario: "Miércoles 21:00–22:00, hora de Chile (14 oct → 2 dic) · con Jay Kim (김재희).",
    inversion: PRECIO + " (la 2.ª antes de la clase 5: miércoles 11 de noviembre).",
    incluye: "8 clases en vivo · grabaciones · slides y hojas de actividad (PDF) · práctica en el Lector de Hangul · tareas y mini-diarios con comentarios · examen final y conversación evaluada · grupo de WhatsApp del curso · guía de estudio · certificado digital.",
    cupos: "Máximo 15 estudiantes.",
    inscribete: WEB + "/nivel-1?clase=a12",
  },
  {
    titulo: "Conversacional 1 · A2.1",
    sub: "Corea que amas · 회화 A2.1",
    resumen: "Requiere Básico 2 o equivalente · clase en coreano · martes 21:00 (hora de Chile) · con Abby · 8 semanas por Zoom",
    tagline: "Ya tienes las bases: ahora toca usarlas para hablar en coreano de lo que amas de Corea, con una profesora nativa.",
    paraQuien: [
      "Terminaste Básico 2, o ya lees 한글 sin deletrear y hablas en presente, pasado y futuro básicos.",
      "Sabes bastante gramática, pero a la hora de hablar te bloqueas.",
      "Te gusta algo de Corea (K-pop, dramas, comida, viajes o juegos) y quieres hablar de eso en coreano.",
    ],
    fechaCol: "Fecha (mar)",
    semanas: [
      ["1", "13 oct", "Orientación y diagnóstico oral", "Te presentas con más detalle, conoces al grupo y fijas tus 3 metas de conversación."],
      ["2", "20 oct", "K-pop y cultura fan", "Hablas de tu grupo y tu 최애, cuentas experiencias como fan y explicas por qué te gusta."],
      ["3", "27 oct", "Viajes: Jeju y Seúl", "Planeas un viaje en pareja, dices cómo moverte en metro y cuentas un viaje."],
      ["4", "3 nov", "Cultura gastronómica", "Pides en un restaurante para varias personas, recomiendas un plato y describes sabores."],
      ["5", "10 nov", "Laboratorio de conversación 1", "40 minutos de conversación en grupos de 3, con corrección personal de pronunciación."],
      ["6", "17 nov", "Hanbok y estética", "Describes ropa y estilo, comparas lo tradicional con lo moderno y opinas con matices."],
      ["7", "24 nov", "PC방 (cibercafé coreano) y e-sports", "Hablas de videojuegos y tiempo libre: cuándo, antes y después, y qué pasa \"si…\"."],
      ["8", "1 dic", "Laboratorio 2 y evaluación oral", "Juntas los cinco temas, rindes una evaluación oral en pareja y comparas tu \"antes y después\"."],
    ],
    podras: [
      ["Conversar unos minutos sobre lo que te gusta de Corea:", "콘서트에 가 봤어요?"],
      ["Pedir para tu mesa en un restaurante coreano:", "김치찌개 2인분하고 물 좀 주세요."],
      ["Proponerle un plan a alguien y ponerse de acuerdo:", "이번 주말에 같이 홍대에 갈까요?"],
      ["Pedir ayuda sin quedarte en blanco:", "잠깐만요… 다시 한번 말해 주세요."],
    ],
    horario: "Martes 21:00–22:00, hora de Chile (13 oct → 1 dic) = miércoles 09:00 en Corea · con Abby (홍미영), profesora coreana nativa que enseña desde Corea.",
    inversion: PRECIO + " (la 2.ª antes de la clase 5: martes 10 de noviembre).",
    incluye: "8 clases en vivo (2 son laboratorios de conversación) · grabaciones · slides con apoyo en español e inglés · hojas de actividad y tarjetas de conversación · material real de Corea · corrección de tus audios · grupo de WhatsApp · informe individual · certificado digital.",
    cupos: "Máximo 15 estudiantes.",
    inscribete: WEB + "/nivel-1?clase=a21",
  },
  {
    titulo: "TOPIK II · B1+",
    sub: "Estrategia de examen · 토픽 II 준비반",
    resumen: "Coreano intermedio · jueves 21:00 (hora de Chile) · con Jay · máximo 8 estudiantes · 8 semanas por Zoom",
    tagline: "Conoce el TOPIK II por dentro, practica con exámenes oficiales y llega al día del examen sabiendo cómo usar cada minuto.",
    paraQuien: [
      "Ya tienes un coreano intermedio: entiendes textos cotidianos y escribes párrafos conectados.",
      "Vas a rendir el TOPIK II, o ya lo rendiste y te quedaste cerca del nivel que buscabas.",
      "Quieres que alguien corrija tu escritura (쓰기) línea a línea.",
    ],
    fechaCol: "Fecha (jue)",
    semanas: [
      ["1", "15 oct", "Diagnóstico y radiografía del TOPIK II", "Cómo se arma y se puntúa el examen. Mini simulacro y tu nivel de partida."],
      ["2", "22 oct", "읽기 I · Lectura, preguntas 1–20", "Reconoces cada tipo de pregunta y resuelves rápido las fáciles."],
      ["3", "29 oct", "듣기 I · Escucha, preguntas 1–20", "Lees las opciones antes del audio, tomas notas y resuelves con una sola escucha."],
      ["4", "5 nov", "쓰기 51–52 · Completar textos", "Fórmulas para avisos, correos y textos breves, en el registro que corresponde."],
      ["5", "12 nov", "쓰기 53 · Describir un gráfico", "200 a 300 caracteres con una plantilla de cuatro frases y las reglas del 원고지."],
      ["6", "19 nov", "읽기 y 듣기 II · Nivel 4–6", "Titulares, idea central y actitud del hablante. Qué responder ahora y qué dejar para después."],
      ["7", "26 nov", "쓰기 54 · El ensayo de opinión", "Un ensayo de 600 a 700 caracteres con estructura clara y corrección personal."],
      ["8", "3 dic", "Simulacro final y tu plan personal", "Analizas tu simulacro de 180 minutos y armas tu plan de estudio hasta el examen."],
    ],
    podras: [
      ["Sentarte frente a un TOPIK II completo sabiendo cuánto tiempo darle a cada parte.", null],
      ["Mirar el puntaje de un simulacro y saber cuántos puntos te faltan y en qué sección.", null],
      ["Escribir a mano, en 원고지, la descripción de un gráfico y un ensayo de opinión con estructura clara.", null],
      ["Salir con tu plan de estudio semanal hasta la fecha de examen que elijas.", null],
    ],
    horario: "Jueves 21:00–22:00, hora de Chile (15 oct → 3 dic) · con Jay Kim (김재희).",
    inversion: PRECIO + " (la 2.ª antes de la clase 5: jueves 12 de noviembre). La inscripción al examen oficial se paga aparte.",
    incluye: "8 clases en vivo · grabaciones · exámenes TOPIK II oficiales publicados · guía por tipo de pregunta y plantillas para 쓰기 51–54 · corrección personal de tu escritura · simulacro completo con análisis · plan de estudio · grupo de WhatsApp · certificado digital.",
    cupos: "Máximo 8 estudiantes, para que la corrección de la escritura sea individual.",
    inscribete: WEB + "/nivel-1?clase=topik2",
  },
  {
    titulo: "Coreano para Niños · 8 a 15 años",
    sub: "Juega y aprende · 어린이 한국어",
    resumen: "Desde cero · lunes 18:00 (hora de Chile) · con Jay y Abby · del 19 de octubre al 7 de diciembre · Zoom",
    tagline: "Juega, canta y dibuja en coreano: en 8 semanas lees tus primeras palabras en 한글 y te presentas en un mini-show para tu familia.",
    paraQuien: [
      "Niños y niñas de 8 a 15 años que hablan español y quieren empezar coreano desde cero, jugando.",
      "Dos profes en cada clase: Jay explica en español y Abby pone la pronunciación nativa.",
      "Un adulto en casa ayuda a conectarse y envía las tareas. De 13 a 15 años también se puede tomar Básico 1.",
    ],
    fechaCol: "Fecha (lun)",
    semanas: [
      ["1", "19 oct", "¡Hola, Corea! · 안녕하세요", "A saludar, dar las gracias y despedirte con reverencia, y las 6 vocales básicas."],
      ["2", "26 oct", "Mi nombre en coreano", "Las consonantes básicas, tu primera sílaba (가) y tu nombre escrito en 한글."],
      ["3", "2 nov", "La fábrica de sílabas", "A armar sílabas y leer palabras de una y dos sílabas, con bingo y carreras."],
      ["4", "9 nov", "Los animales · 동물", "10 animales y \"¿qué es esto?\". Presentas tu animal favorito con un dibujo."],
      ["5", "16 nov", "Mi familia · 가족", "Mamá, papá, abuelos y hermanos. Presentas a tu familia con una foto o un dibujo."],
      ["6", "23 nov", "Los números mágicos", "A contar del 1 al 10 con palmas y canción, y a decir tu edad."],
      ["7", "30 nov", "¡Ñam! Comida coreana", "Comidas y frutas, lo que te gusta y lo que no, y 맛있어요!"],
      ["8", "7 dic", "Show final + certificado", "Tu mini-show de 30 a 40 segundos para la familia y el certificado en pantalla."],
    ],
    podras: [
      ["Presentarte en coreano:", "안녕하세요! 저는 마테오예요. 열 살이에요."],
      ["Escribir tu nombre en 한글 y leer palabras cortas como", "나비, 바다 o 가방."],
      ["Contar hasta 10 y decir en la mesa", "맛있어요!"],
      ["Presentar un mini-show de 30 a 40 segundos frente a tu familia.", null],
    ],
    horario: "Lunes 18:00–19:00, hora de Chile (19 oct → 7 dic; el 12 de octubre es feriado en Chile) · con Jay Kim (김재희) y Abby (홍미영).",
    inversion: PRECIO + " (la 2.ª antes de la clase 5: lunes 16 de noviembre).",
    incluye: "8 clases en vivo con dos profes · grabaciones · láminas, bingos y tarjetas de letras (PDF) · canciones · tablero de stickers · nota semanal para la familia por WhatsApp · Lector de Hangul y Dubu · mini-show final y certificado.",
    cupos: "Máximo 12 niños y niñas, en dos salas de hasta 6 para el taller. Nunca publicamos caras de menores.",
    inscribete: WEB + "/nivel-1?clase=ninos",
  },
];

// ============================ DOCUMENTO ============================
function paginaCurso(c) {
  const ch = [];
  ch.push(nuevaPagina());
  ch.push(banda(c.titulo, c.sub, c.resumen));
  ch.push(tagline(c.tagline));
  ch.push(H2("¿Para quién es?"));
  c.paraQuien.forEach((t) => ch.push(bullet(t, { size: 19 })));
  ch.push(H2("Programa de 8 semanas"));
  ch.push(headTable(["Sem.", c.fechaCol, "Tema", "¿Qué aprenderás?"],
    c.semanas.map((s) => [[{ t: s[0], o: { bold: true, color: AZUL } }], s[1], [{ t: s[2], o: { bold: true } }], s[3]]),
    [430, 1170, 2700, 5780], 17));
  ch.push(H2("Al terminar el curso podrás…"));
  c.podras.forEach((p) => ch.push(bullet(p[1] ? [run(p[0] + " ", { size: 19 }), kor(p[1])] : [run(p[0], { size: 19 })])));
  ch.push(espacio(90));
  ch.push(kvTable([
    ["Horario", c.horario],
    ["Inversión", [run(PRECIO, { bold: true, size: 18, color: NAVY }), run(c.inversion.slice(PRECIO.length), { size: 18 })]],
    ["Incluye", c.incluye],
    ["Cupos", c.cupos],
    ["Inscríbete", [run(c.inscribete, { size: 18, color: AZUL, bold: true })]],
  ], 1500, 18));
  return ch;
}

function build() {
  const ch = [];

  // ---------- PORTADA ----------
  ch.push(
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 500, after: 260 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 232, height: 80 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 160, after: 80 }, children: [run("한국어 과정 안내 · 2026년 10월 개강", { bold: true, size: 30, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [run("Cursos de coreano", { bold: true, size: 56 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [run("Octubre 2026", { bold: true, size: 44, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 320 }, children: [run("Qué vas a aprender, cuándo son las clases, quién te enseña y cómo elegir tu curso.", { italics: true, size: 24, color: GREY })] }),
  );
  ch.push(caja([
    [run("Online en vivo por Zoom · 8 semanas · 1 clase de 60 minutos por semana", { bold: true, size: 22, color: NAVY })],
    [run("Inicio: semana del 12 de octubre de 2026 · Coreano para Niños: lunes 19 de octubre", { size: 21 })],
    [run(PRECIO, { bold: true, size: 22, color: AZUL })],
    [run("Matrícula abierta hasta el domingo 11 de octubre (o hasta llenar los cupos)", { size: 21 })],
  ]));
  ch.push(
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 60 }, children: [run("Básico 1 (A1.1) · Básico 2 (A1.2) · Conversacional 1 (A2.1) · TOPIK II (B1+) · Coreano para Niños (8–15)", { size: 20, bold: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [run("Próximamente: Conversacional 2 (A2.2), enero 2027", { size: 20, color: GREY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 360 }, children: [new ImageRun({ type: "png", data: SELLO, transformation: { width: 84, height: 81 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [run(WEB + " · WhatsApp " + WA + " · @academiaseul", { size: 19, color: GREY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 160 }, children: [run("Horarios en hora de Chile (Santiago, UTC−3 durante todo el curso). Versión del 26 de septiembre de 2026.", { size: 16, color: GREY, italics: true })] }),
  );

  // ---------- OCTUBRE DE UN VISTAZO ----------
  ch.push(nuevaPagina());
  ch.push(H1("Octubre de un vistazo", { spacing: { before: 0, after: 120 } }));
  ch.push(P(run("Todos los cursos son online en vivo por Zoom: 8 semanas, 1 clase de 60 minutos por semana, en grupos pequeños y con profes coreanos. Los horarios están en hora de Chile (Santiago), que se mantiene en UTC−3 durante todo el curso.", { size: 20 })));

  ch.push(H2("Tu semana de clases"));
  const g = (t, sub) => [{ t, o: { bold: true } }, { t: sub, o: { color: GREY, size: 16 } }];
  ch.push(headTable(["Hora (Chile)", "Lunes", "Martes", "Miércoles", "Jueves"], [
    [[{ t: "18:00", o: { bold: true, color: AZUL } }], g("Coreano para Niños", "Jay y Abby · desde el 19 oct"), "", "", ""],
    [[{ t: "20:00", o: { bold: true, color: AZUL } }], "", g("Básico 1", "Kiran · desde el 13 oct"), "", g("Básico 1", "Kiran · desde el 15 oct")],
    [[{ t: "21:00", o: { bold: true, color: AZUL } }], "", g("Conversacional 1", "Abby · desde el 13 oct"), g("Básico 2", "Jay · desde el 14 oct"), g("TOPIK II", "Jay · desde el 15 oct")],
  ], [1280, 2200, 2200, 2200, 2200], 18));

  ch.push(H2("Calendario"));
  ch.push(headTable(["Curso", "Profesor/a", "Día y hora (Chile)", "Primera clase", "Última clase"], [
    [[{ t: "Básico 1 (A1.1)", o: { bold: true } }, { t: "sección martes", o: { color: GREY, size: 16 } }], "Kiran", "Martes 20:00–21:00", [{ t: "Martes 13 de octubre", o: { bold: true, color: AZUL } }], "Martes 1 de diciembre"],
    [[{ t: "Básico 1 (A1.1)", o: { bold: true } }, { t: "sección jueves", o: { color: GREY, size: 16 } }], "Kiran", "Jueves 20:00–21:00", [{ t: "Jueves 15 de octubre", o: { bold: true, color: AZUL } }], "Jueves 3 de diciembre"],
    [[{ t: "Básico 2 (A1.2)", o: { bold: true } }], "Jay", "Miércoles 21:00–22:00", [{ t: "Miércoles 14 de octubre", o: { bold: true, color: AZUL } }], "Miércoles 2 de diciembre"],
    [[{ t: "Conversacional 1 (A2.1)", o: { bold: true } }], "Abby", "Martes 21:00–22:00", [{ t: "Martes 13 de octubre", o: { bold: true, color: AZUL } }], "Martes 1 de diciembre"],
    [[{ t: "TOPIK II (B1+)", o: { bold: true } }], "Jay", "Jueves 21:00–22:00", [{ t: "Jueves 15 de octubre", o: { bold: true, color: AZUL } }], "Jueves 3 de diciembre"],
    [[{ t: "Coreano para Niños (8–15)", o: { bold: true } }], "Jay y Abby", "Lunes 18:00–19:00", [{ t: "Lunes 19 de octubre *", o: { bold: true, color: AZUL } }], "Lunes 7 de diciembre"],
    [[{ t: "Conversacional 2 (A2.2)", o: { bold: true } }], "Por anunciar", "Por anunciar", [{ t: "Próximamente · enero 2027", o: { bold: true, color: NAVY } }], "—"],
  ], [2600, 1350, 2050, 2180, 1900], 18));
  ch.push(espacio(50));
  ch.push(P(run("* El lunes 12 de octubre es feriado en Chile: por eso Coreano para Niños empieza el 19 y termina una semana después que los cursos de adultos. Básico 1 tiene dos secciones con el mismo programa y la misma profesora. La matrícula de todos los cursos cierra el domingo 11 de octubre.", { size: 17, color: GREY }), { spacing: { after: 60, line: 252 } }));

  ch.push(H2("¿Qué hora es en tu país?"));
  ch.push(headTable(["Chile", "Argentina · Uruguay", "Colombia · Perú · Ecuador", "México (CDMX)", "EE.UU. (Este)", "España", "Corea"], [
    [[{ t: "18:00", o: { bold: true, color: AZUL } }, { t: "Niños", o: { color: GREY, size: 15 } }], "18:00", "16:00", "15:00", "17:00 → 16:00", "23:00 → 22:00", "06:00 *"],
    [[{ t: "20:00", o: { bold: true, color: AZUL } }, { t: "Básico 1", o: { color: GREY, size: 15 } }], "20:00", "18:00", "17:00", "19:00 → 18:00", "01:00 * → 00:00 *", "08:00 *"],
    [[{ t: "21:00", o: { bold: true, color: AZUL } }, { t: "Básico 2 · Conv. 1 · TOPIK II", o: { color: GREY, size: 15 } }], "21:00", "19:00", "18:00", "20:00 → 19:00", "02:00 * → 01:00 *", "09:00 *"],
  ], [1700, 1300, 1400, 1250, 1450, 1600, 1380], 17));
  ch.push(espacio(50));
  ch.push(P(run("* Del día siguiente. Las flechas marcan el cambio de hora de EE.UU. (desde el 1 de noviembre) y de España (desde el 25 de octubre). Chile no cambia de hora durante el curso. En " + WEB + "/nivel-1 eliges tu país y ves la hora exacta.", { size: 17, color: GREY }), { spacing: { after: 60, line: 252 } }));

  ch.push(H1("Compara los cursos", { pageBreakBefore: true, spacing: { before: 0, after: 120 } }));
  ch.push(P(run("Todos duran 8 semanas (1 clase de 60 minutos por semana), son en vivo por Zoom e incluyen certificado de Academia Seúl. No es un ranking: la tabla sirve para ubicar el curso que calza con tu punto de partida.", { size: 20 })));
  const nom = (a, b) => [{ t: a, o: { bold: true } }, { t: b, o: { color: GREY, size: 15 } }];
  const PC = "US$150 · o 2 × US$75";
  ch.push(headTable(["Curso", "Nivel", "Ideal para", "Enfoque", "Horario (Chile)", "Duración", "Precio"], [
    [nom("Básico 1", "Primeras Palabras"), "A1.1 · desde cero", "Quien nunca ha estudiado coreano o reconoce letras sueltas, pero todavía no lee", "Leer 한글 y decir tus primeras frases: presentarte, tu familia, lugares, tu día y tus gustos", "Mar o jue 20:00 · Kiran", "8 semanas", PC],
    [nom("Básico 2", "Pasado, presente y futuro"), "A1.2", "Quien ya lee 한글 y se presenta (Básico 1, el Nivel 1 de julio o equivalente)", "Hablar del pasado y del futuro, números y hora, rutina, lo que no haces y lo que sabes hacer", "Mié 21:00 · Jay", "8 semanas", PC],
    [nom("Conversacional 1", "Corea que amas"), "A2.1", "Quien arma frases en presente, pasado y futuro, pero se bloquea al conversar", "Conversar en coreano sobre K-pop, viajes, comida, 한복 y videojuegos, con profesora nativa", "Mar 21:00 · Abby", "8 semanas", PC],
    [nom("Conversacional 2", "Corea por dentro"), "A2.2", "Quien terminó Conversacional 1 y quiere entender cómo se vive Corea", "Comparar, opinar y narrar sobre escuela, trabajo, fiestas, leyendas y K-drama", [{ t: "Próximamente · enero 2027", o: { bold: true, color: NAVY } }], "8 semanas", "Por anunciar"],
    [nom("TOPIK II", "Estrategia de examen"), "B1+", "Quien tiene coreano intermedio y va a rendir el TOPIK II", "Estrategia para 듣기, 읽기 y 쓰기 con exámenes oficiales, corrección de escritura y simulacro", "Jue 21:00 · Jay · máx. 8", "8 semanas", PC],
    [nom("Coreano para Niños", "Juega y aprende"), "8–15 años · desde cero", "Niños y niñas que quieren empezar coreano jugando", "Leer 한글, saludar, presentarse y contar, con juegos, canciones y un mini-show final", "Lun 18:00 · Jay y Abby", "8 semanas", PC],
  ], [1480, 980, 2100, 2420, 1300, 820, 980], 16));

  ch.push(H1("¿Qué curso debo tomar?"));
  const tc = (t) => [{ t, o: { bold: true, color: AZUL } }];
  ch.push(headTable(["Si…", "Tu curso", "Día y hora (Chile)"], [
    ["Nunca he estudiado coreano", tc("Básico 1 (A1.1)"), "Martes o jueves 20:00 · desde el 13 o el 15 oct"],
    ["Reconozco algunas letras o palabras, pero todavía no leo 한글 con seguridad", tc("Básico 1 (A1.1)"), "Martes o jueves 20:00"],
    ["Ya sé Hangul y los fundamentos: me presento y hablo en presente", tc("Básico 2 (A1.2)"), "Miércoles 21:00 · desde el 14 oct"],
    ["Hice el Nivel 1 de julio de 2026 (hoy se llama Básico 1)", [{ t: "Básico 2 (A1.2)", o: { bold: true, color: AZUL } }, { t: "o repetir Básico 1 si la lectura te quedó floja", o: { size: 16, color: GREY } }], "Miércoles 21:00"],
    ["Puedo construir frases, pero me cuesta conversar", tc("Conversacional 1 (A2.1)"), "Martes 21:00 · desde el 13 oct"],
    ["Ya puedo conversar y quiero profundizar en Corea", tc("Conversacional 2 (A2.2)"), "Próximamente · enero 2027"],
    ["Quiero preparar el TOPIK II (tengo coreano intermedio)", tc("TOPIK II (B1+)"), "Jueves 21:00 · desde el 15 oct"],
    ["Mi hijo/a tiene 8–15 años", [{ t: "Coreano para Niños", o: { bold: true, color: AZUL } }, { t: "de 13 a 15 años también puede tomar Básico 1", o: { size: 16, color: GREY } }], "Lunes 18:00 · desde el 19 oct"],
  ], [4700, 2900, 2480], 18));
  ch.push(espacio(100));
  ch.push(caja([
    [run("¿No sabes qué nivel tienes? ", { bold: true, size: 20, color: NAVY }), run("Academia Seúl te orienta antes de que te inscribas. Haz el test de nivel gratis en " + WEB + "/test-nivel (5 preguntas, unos 2 minutos, sin registro) o escríbenos por WhatsApp al " + WA + " y cuéntanos qué has estudiado.", { size: 20 })],
    [run("¿Quieres probar antes? ", { bold: true, size: 20, color: NAVY }), run("Gratis: el Lector de Hangul con audio nativo (" + WEB + "/lector-coreano), Dubu, el puzzle del Hangul (/dubu), y el taller de Hangul en video (/taller).", { size: 20 })],
  ]));

  // ---------- UNA PÁGINA POR CURSO ----------
  CURSOS.forEach((c) => paginaCurso(c).forEach((x) => ch.push(x)));

  // ---------- CONVERSACIONAL 2 (media página) ----------
  ch.push(nuevaPagina());
  ch.push(banda("Conversacional 2 · A2.2", "Corea por dentro · 회화 A2.2", "Próximamente · enero 2027 · no forma parte de la cohorte de octubre · requiere Conversacional 1 (A2.1)", TINT, NAVY));
  ch.push(tagline("Ya hablas de la Corea que amas: ahora vas a entender cómo se vive por dentro."));
  ch.push(P(run("Es el paso que sigue a Conversacional 1. Ya no se trata solo de qué te gusta de Corea, sino de cómo se vive: en la sala de clases, en la oficina, en las fiestas familiares y en las historias que los coreanos escuchan desde niños. Vas a comparar, opinar y narrar en coreano, con frases sencillas y bien conectadas.", { size: 20 })));
  ch.push(headTable(["Semanas 1–4", "Semanas 5–8"], [
    [[{ t: "1 · La escuela en Corea · 한국의 학교" }], [{ t: "5 · 설날 · Año Nuevo lunar" }]],
    [[{ t: "2 · El día del 수능 (examen de ingreso a la universidad)" }], [{ t: "6 · 추석 · Fiesta de la cosecha" }]],
    [[{ t: "3 · La vida en la oficina · 한국의 직장 생활" }], [{ t: "7 · K-drama y la Corea de hoy" }]],
    [[{ t: "4 · Mitos y leyendas · 옛날 옛적에" }], [{ t: "8 · Proyecto final" }]],
  ], [5040, 5040], 18));
  ch.push(espacio(80));
  ch.push(kvTable([
    ["Formato", "8 semanas · 1 clase en vivo de 60 minutos por semana · Zoom."],
    ["Por anunciar", "Día, hora, profesor/a, fecha de inicio y precio de la cohorte de enero 2027."],
    ["Lista de espera", [run("Sin costo, y te avisamos primero: ", { size: 18 }), run(WEB + "/notificarme?curso=conversacion", { size: 18, bold: true, color: AZUL })]],
  ], 1750, 18));

  // ---------- PREGUNTAS FRECUENTES ----------
  ch.push(H1("Preguntas frecuentes", { spacing: { before: 360, after: 120 } }));
  const FAQ = [
    ["¿Qué incluye el precio?", "Las 8 clases en vivo de 60 minutos en grupos pequeños · la grabación de cada clase, dentro de las 24 horas y disponible durante todo el curso · el material de cada clase en PDF · tareas cortas con comentarios de tu profe · un grupo de WhatsApp del curso (tu profe responde dentro de 24 horas, en horario hábil) · el certificado digital de Academia Seúl. El Lector de Hangul es gratis para todos; en Básico 1, Básico 2 y Niños es parte de la tarea."],
    ["¿Cómo son las clases?", "No son una charla: hablas en todas. Casi siempre empiezan con un quiz rápido de la clase anterior; después viene lo nuevo de la semana, una práctica guiada y trabajo en parejas o grupos pequeños en salas de Zoom, mientras tu profe pasa por cada sala y te corrige. Al final se repasan los errores más comunes y se deja la tarea."],
    ["¿En qué idioma es la clase?", "Depende del curso. Básico 1: Kiran explica en español. Básico 2: la gramática se explica en español y se practica en coreano. Conversacional 1: en coreano, con slides de apoyo en español e inglés. TOPIK II: la estrategia en español y la práctica en coreano. Niños: Jay explica en español y Abby pone el coreano."],
    ["¿Necesito saber coreano para empezar?", "No. Básico 1 y Coreano para Niños parten desde cero, y lo primero que aprendes es a leer 한글. Si ya sabes algo, haz el test de nivel gratis o escríbenos y te ayudamos a elegir."],
    ["Hice el Nivel 1 de julio. ¿Qué curso sigo?", "Ese curso hoy se llama Básico 1 (A1.1) y tu certificado te habilita directo para Básico 2 (A1.2), los miércoles a las 21:00. Si sientes que la lectura te quedó floja, puedes repetir Básico 1. Y si lo que quieres es conversar, también puedes entrar a Conversacional 1 con el test de nivel."],
    ["¿Y si me pierdo una clase?", "Recibes la grabación dentro de 24 horas y puedes resolver tus dudas de esa clase en el grupo del curso. Si vas a faltar, avisa en el grupo."],
    ["¿Puedo cambiarme de sección en Básico 1?", "Sí, si hay cupo en la otra sección: martes y jueves siguen el mismo programa con la misma profesora. Escríbenos por WhatsApp."],
    ["¿Tengo que comprar un libro?", "Las slides y las hojas de actividad de cada clase se entregan en PDF, y el Lector de Hangul y Dubu son gratis. Básico 1 sigue las lecciones del libro 한글학교 한국어 1 y Básico 2, unidades de Uso de la gramática coreana · Nivel inicial; Conversacional 1 y Niños usan material propio de la academia. En TOPIK II no necesitas comprar libros: se trabaja con exámenes oficiales publicados. Si en Básico 1 o Básico 2 hace falta tener el libro propio: confirmar con Academia Seúl."],
    ["¿Qué necesito para conectarme?", "Un computador (mejor) o celular con Zoom actualizado, audífonos con micrófono y la cámara encendida durante la clase, salvo problemas de conexión. En Niños conviene un computador o tablet, y que un adulto esté cerca en la primera clase."],
    ["¿Desde qué países puedo tomar las clases?", "Desde toda Latinoamérica, España y EE.UU.: las clases son 100 % online. En «Octubre de un vistazo» tienes la hora de cada país."],
    ["¿Cómo pago?", "Pago único de US$150 o 2 cuotas de US$75: la primera al inscribirte y la segunda antes de la clase 5 de tu curso. Puedes pagar por transferencia bancaria en Chile (sin comisión), Mercado Pago con tarjeta o transferencia (se cobra en pesos chilenos) o PayPal en dólares, también con tarjeta. Tu cupo queda confirmado cuando recibimos el pago completo o la primera cuota."],
    ["¿Hay devolución?", "Una vez iniciado el curso, el pago no es reembolsable. Si no puedes continuar, escríbenos y buscamos juntos una solución, por ejemplo pasarte a una cohorte posterior. Si Academia Seúl cancela un curso antes de que empiece, te devolvemos el 100 %. Condiciones completas en " + WEB + "/terminos."],
    ["¿Recibo un certificado? ¿Es oficial?", "Al completar tu curso recibes el certificado digital de Academia Seúl del nivel cursado, que considera tu asistencia y tu participación. Se entregan la semana del 7 de diciembre (en Niños, durante el mini-show del lunes 7). Es un certificado propio de la academia: no es una acreditación oficial, no lo emite el gobierno de Corea ni una universidad y no reemplaza al examen TOPIK."],
    ["¿Me sirve para el TOPIK?", "Básico 1, Básico 2 y Conversacional 1 te van acercando al nivel del TOPIK I, pero no son cursos de preparación de examen. Si tu meta es el TOPIK II, está el curso TOPIK II (B1+), con exámenes oficiales, corrección de escritura y simulacro. La inscripción al examen oficial se paga aparte."],
    ["¿Qué pasa cuando termino?", "Sigues con el próximo peldaño de la escalera. En enero de 2027 abre la siguiente cohorte, que incluye Conversacional 2 (A2.2), y los alumnos activos tienen preventa con prioridad de cupo."],
  ];
  FAQ.forEach((q) => {
    ch.push(P(run(q[0], { bold: true, size: 20, color: NAVY }), { spacing: { before: 60, after: 30 }, keepNext: true }));
    ch.push(P(run(q[1], { size: 19 }), { spacing: { after: 90, line: 264 } }));
  });

  // ---------- CÓMO INSCRIBIRTE ----------
  ch.push(nuevaPagina());
  ch.push(H1("Cómo inscribirte", { spacing: { before: 0, after: 120 } }));
  ch.push(num(1, [run("Elige tu curso", { bold: true }), run(" (y, en Básico 1, tu sección: martes o jueves). Si dudas, haz el test de nivel o escríbenos.")]));
  ch.push(num(2, [run("Entra a " + WEB + "/nivel-1", { bold: true, color: AZUL }), run(", elige tu clase y tu país para ver la hora exacta.")]));
  ch.push(num(3, [run("Paga el curso completo (US$150) o la primera cuota (US$75)", { bold: true }), run(" por transferencia en Chile, Mercado Pago o PayPal.")]));
  ch.push(num(4, [run("Te confirmamos tu cupo", { bold: true }), run(" apenas registramos el pago. Antes de tu primera clase te llegan el link de Zoom y el acceso al grupo de WhatsApp del curso.")]));
  ch.push(H2("Links directos"));
  const lk = (t) => [run(t, { size: 18, color: AZUL, bold: true })];
  ch.push(kvTable([
    ["Básico 1 · martes", lk(WEB + "/nivel-1?clase=a11-martes")],
    ["Básico 1 · jueves", lk(WEB + "/nivel-1?clase=a11-jueves")],
    ["Básico 2", lk(WEB + "/nivel-1?clase=a12")],
    ["Conversacional 1", lk(WEB + "/nivel-1?clase=a21")],
    ["TOPIK II", lk(WEB + "/nivel-1?clase=topik2")],
    ["Coreano para Niños", lk(WEB + "/nivel-1?clase=ninos")],
    ["Conversacional 2", [run("Lista de espera: ", { size: 18 }), run(WEB + "/notificarme?curso=conversacion", { size: 18, color: AZUL, bold: true })]],
  ], 2300, 18));
  ch.push(espacio(100));
  ch.push(caja([[run("La matrícula cierra el domingo 11 de octubre", { bold: true, size: 22, color: NAVY }), run(", o antes si se completan los cupos. Las clases de adultos parten la semana del 12 de octubre y Coreano para Niños, el lunes 19.", { size: 21 })]]));

  ch.push(H2("Quién te enseña"));
  ch.push(bullet([run("Jay Kim (김재희)", { bold: true, size: 19 }), run(" · Básico 2, TOPIK II y Niños. Fundador de Academia Seúl, coreano nativo que vive en Chile desde los 10 años. Creó el Método Chingu™ y el Lector de Hangul, y lleva más de 8 años enseñando coreano a hispanohablantes.", { size: 19 })]));
  ch.push(bullet([run("Kiran (기란)", { bold: true, size: 19 }), run(" · Básico 1. Profesora coreana que se crió en Argentina. Es bilingüe en coreano y español y lleva años enseñando coreano a hispanohablantes.", { size: 19 })]));
  ch.push(bullet([run("Abby (홍미영)", { bold: true, size: 19 }), run(" · Conversacional 1 y Niños. Profesora coreana nativa y pedagoga (MSU). Enseña desde Corea.", { size: 19 })]));

  ch.push(H2("Contacto"));
  ch.push(kvTable([
    ["WhatsApp", WA],
    ["Web", WEB + " · test de nivel en /test-nivel"],
    ["Instagram", "@academiaseul · @jaychingu.oficial"],
  ], 2300, 18));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 260, after: 0 }, children: [run("화이팅! Nos vemos en clase.", { bold: true, size: 26, color: AZUL })] }));

  return new Document({
    creator: "Academia Seúl",
    title: "Cursos de coreano · Octubre 2026",
    description: "Folleto de cursos de Academia Seúl · cohorte octubre 2026",
    styles: { default: { document: { run: { font: FONT, size: 21, color: INK } } } },
    sections: [{
      properties: { titlePage: true, page: { size: { width: 12240, height: 15840 }, margin: { top: MARGIN_Y, bottom: MARGIN_Y, left: MARGIN_X, right: MARGIN_X, header: 400, footer: 400 } } },
      headers: {
        first: new Header({ children: [new Paragraph({ children: [] })] }),
        default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Academia Seúl · Cursos de coreano · Octubre 2026", { size: 16, color: GREY })] })] }),
      },
      footers: {
        first: new Footer({ children: [new Paragraph({ children: [] })] }),
        default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }], children: [run(WEB + " · WhatsApp " + WA, { size: 16, color: GREY }), new TextRun({ text: "\t", font: FONT }), new TextRun({ children: ["Página ", PageNumber.CURRENT], font: FONT, size: 16, color: GREY })] })] }),
      },
      children: ch,
    }],
  });
}

(async () => {
  const buf = await Packer.toBuffer(build());
  const file = path.join(OUT, "Folleto_Cursos_Octubre_2026.docx");
  fs.writeFileSync(file, buf);
  console.log("OK", file, (buf.length / 1024).toFixed(0) + " KB");
})();
