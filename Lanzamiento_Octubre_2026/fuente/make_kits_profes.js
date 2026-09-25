// Kits de inicio para las profesoras · Cohorte octubre 2026 (docx, estilo de la casa).
//   a) Kit_Kiran_Basico1_ES.docx            — Kiran (기란): Básico 1 (A1.1), martes y jueves 20:00 hora Chile.
//   b) Kit_Abby_Conversacional_Ninos_KO.docx — Abby (홍미영): Conversacional 1 (A2.1) + Coreano para Niños (8–15) con Jay,
//      en coreano, todas las fechas en hora de Corea (KST) y entre paréntesis la de Chile.
// Fuentes: Programa_Completo_Octubre_2026/fuente/textos_generales.js (Parte III) y cursos_es.json (semana a semana).
// Calendario: lib/nivel1.ts (hora Chile UTC−3 todo el curso; Corea = Chile + 12 h).
// Ejecutar desde el scratchpad (node_modules con docx):  node lanzamiento/make_kits_profes.js
// Estilo: US Letter, Arial (+ Malgun Gothic para el coreano), cabeceras de tabla navy #003478, títulos azules #4236F6,
// logo azul en portada. Nunca rojo.
const fs = require("fs");
const path = require("path");

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const SCRATCH = "C:\\Users\\Chingu\\AppData\\Local\\Temp\\claude\\C--Users-Chingu-Desktop-ACADEMIASEULWEB\\d4111e1b-5523-44ea-97b2-b1a1d9545b9e\\scratchpad";
let docx;
try { docx = require("docx"); } catch (e) { docx = require(path.join(SCRATCH, "node_modules", "docx")); }
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, ExternalHyperlink,
  WidthType, AlignmentType, BorderStyle, ShadingType, Footer, Header, PageNumber,
  TabStopType, VerticalAlign, PageBreak,
} = docx;

const FUENTE = path.join(REPO, "Programa_Completo_Octubre_2026", "fuente");
const OUT = path.join(REPO, "Lanzamiento_Octubre_2026", "profes");
fs.mkdirSync(OUT, { recursive: true });

const T = require(path.join(FUENTE, "textos_generales.js")).es;
const CURSOS = JSON.parse(fs.readFileSync(path.join(FUENTE, "cursos_es.json"), "utf8"));
const curso = (id) => CURSOS.find((c) => c.cursoId === id);

// ---------------------------------------------------------------- estilo de la casa
const AZUL = "4236F6", NAVY = "003478", INK = "1B1C24", GREY = "5C5F6B", ORO = "E8B84B";
const LINE = "CCCCCC", TINT = "EEF1F6", ZEBRA = "F7F8FA", PAPEL = "F6F3EC";
const FONT = { ascii: "Arial", hAnsi: "Arial", eastAsia: "Malgun Gothic", cs: "Arial" };
const CONTENT_W = 9360;
const LOGO = fs.readFileSync(path.join(SCRATCH, "logo-azul.png"));
const SELLO = fs.readFileSync(path.join(SCRATCH, "igpost", "sello-azul.png"));

const URL_RE = /(https?:\/\/[^\s]*[^\s).,;:])/g;
const run = (t, o = {}) => new TextRun(Object.assign({ text: t, font: FONT, size: 22, color: INK }, o));
// Texto con links clicables (azul, subrayado)
function runs(t, o = {}) {
  return String(t).split(URL_RE).filter((s) => s !== "").map((s) => (/^https?:\/\//.test(s)
    ? new ExternalHyperlink({ link: s, children: [run(s, Object.assign({}, o, { color: AZUL, underline: {} }))] })
    : run(s, o)));
}
const P = (c, o = {}) => new Paragraph(Object.assign({ children: Array.isArray(c) ? c : runs(c), spacing: { after: 130, line: 296 } }, o));
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };
const cellP = (t, o = {}, after = 0) => new Paragraph({ children: runs(t, o), spacing: { after, line: 264 } });
const cell = (c, o = {}) => new TableCell(Object.assign({ children: Array.isArray(c) ? c : [c], verticalAlign: VerticalAlign.CENTER, margins: { top: 70, bottom: 70, left: 100, right: 100 } }, o));
// Contenido de celda: "texto" | {t, o} | [varios párrafos]
function cellParas(v, size) {
  const items = Array.isArray(v) ? v : [v];
  return items.map((p, i) => {
    const after = i < items.length - 1 ? 50 : 0;
    return typeof p === "string" ? cellP(p, { size }, after) : cellP(p.t, Object.assign({ size }, p.o || {}), after);
  });
}
function fitWidths(widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  if (total === CONTENT_W) return widths;
  const f = CONTENT_W / total; const w = widths.map((x) => Math.round(x * f));
  w[w.length - 1] += CONTENT_W - w.reduce((a, b) => a + b, 0); return w;
}
function headTable(headers, rows, widths, size = 20) {
  widths = fitWidths(widths);
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, borders: allBorders, rows: [
    new TableRow({ tableHeader: true, children: headers.map((h, i) => cell([cellP(h, { bold: true, color: "FFFFFF", size: 19 })], { width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: NAVY } })) }),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(cellParas(c, size), { width: { size: widths[i], type: WidthType.DXA }, shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: ZEBRA } : undefined })) })),
  ] });
}
function kvTable(rows, w1 = 2600, size = 20) {
  const w2 = CONTENT_W - w1;
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [w1, w2], borders: allBorders, rows: rows.map((r) => new TableRow({ cantSplit: true, children: [
    cell([cellP(r[0], { bold: true, size: 19, color: NAVY })], { width: { size: w1, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: TINT } }),
    cell(cellParas(r[1], size), { width: { size: w2, type: WidthType.DXA } }),
  ] })) });
}
const H1 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 30 })], spacing: { before: 380, after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }, keepNext: true });
const H2 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 24, color: AZUL })], spacing: { before: 240, after: 110 }, keepNext: true });
const H3 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 21, color: NAVY })], spacing: { before: 180, after: 80 }, keepNext: true });
const bullet = (t, o = {}) => new Paragraph({ children: [run("•  ", { color: AZUL, bold: true }), ...(Array.isArray(t) ? t : runs(t, o))], spacing: { after: 70, line: 288 }, indent: { left: 360, hanging: 240 } });
const num = (i, t) => new Paragraph({ children: [run(i + ".  ", { color: AZUL, bold: true }), ...runs(t)], spacing: { after: 70, line: 288 }, indent: { left: 400, hanging: 300 } });
// Caja con borde azul: lista de líneas (cada una string o array de runs)
function caja(lineas, fill = TINT, border = AZUL) {
  const b = { style: BorderStyle.SINGLE, size: 8, color: border };
  const paras = lineas.map((l, i) => new Paragraph({ children: Array.isArray(l) ? l : runs(l, { size: 20 }), spacing: { after: i < lineas.length - 1 ? 70 : 0, line: 288 } }));
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b },
    rows: [new TableRow({ children: [cell(paras, { width: { size: CONTENT_W, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill }, margins: { top: 140, bottom: 140, left: 180, right: 180 } })] })] });
}
const espacio = (n = 120) => new Paragraph({ children: [run("", { size: 8 })], spacing: { after: n } });
const salto = () => new Paragraph({ children: [new PageBreak()] });

function portada({ kor, titulo, sub, lineas, contacto, nota }) {
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 300 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 232, height: 80 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 }, children: [run(kor, { bold: true, size: 40, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [run(titulo, { bold: true, size: 48 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 320 }, children: [run(sub, { italics: true, size: 24, color: GREY })] }),
    ...lineas.map((l) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 70 }, children: [run(l, { size: 23 })] })),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 500 }, children: [new ImageRun({ type: "png", data: SELLO, transformation: { width: 90, height: 87 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run(contacto, { size: 19, color: GREY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [run(nota, { size: 17, color: GREY, italics: true })] }),
    salto(),
  ];
}
function makeDoc({ title, header, footer, pagina, children }) {
  return new Document({
    creator: "Academia Seúl", title,
    styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1150, bottom: 1100, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(header, { size: 16, color: GREY })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }], children: [run(footer, { size: 16, color: GREY }), new TextRun({ text: "\t", font: FONT }), new TextRun({ children: [pagina, PageNumber.CURRENT], font: FONT, size: 16, color: GREY })] })] }) },
      children,
    }],
  });
}

// ---------------------------------------------------------------- fechas (verificadas contra el calendario base)
const DOW_ES = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MES_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DOW_KO = ["일", "월", "화", "수", "목", "금", "토"];
const dia = (m, d) => new Date(Date.UTC(2026, m - 1, d));
const mas = (dt, n) => new Date(dt.getTime() + n * 86400000);
const ocho = (m, d) => Array.from({ length: 8 }, (_, i) => mas(dia(m, d), 7 * i));
const fES = (dt) => `${DOW_ES[dt.getUTCDay()]} ${dt.getUTCDate()} ${MES_ES[dt.getUTCMonth()]}`;
const fKO = (dt) => `${dt.getUTCMonth() + 1}월 ${dt.getUTCDate()}일(${DOW_KO[dt.getUTCDay()]})`;
function verifica(nombre, fechas, esperado, dow) {
  const got = fechas.map((x) => `${x.getUTCDate()}/${x.getUTCMonth() + 1}`).join(",");
  if (got !== esperado) throw new Error(`${nombre}: ${got} ≠ ${esperado}`);
  if (fechas.some((x) => x.getUTCDay() !== dow)) throw new Error(`${nombre}: día de la semana incorrecto`);
}
// Chile (hora de la clase en Chile)
const A11_MAR = ocho(10, 13), A11_JUE = ocho(10, 15), A21_CL = ocho(10, 13), NIN_CL = ocho(10, 19);
verifica("Básico 1 martes", A11_MAR, "13/10,20/10,27/10,3/11,10/11,17/11,24/11,1/12", 2);
verifica("Básico 1 jueves", A11_JUE, "15/10,22/10,29/10,5/11,12/11,19/11,26/11,3/12", 4);
verifica("Niños (Chile)", NIN_CL, "19/10,26/10,2/11,9/11,16/11,23/11,30/11,7/12", 1);
// Corea = Chile + 12 h ⇒ día siguiente (21:00 → 09:00; 18:00 → 06:00)
const A21_KR = A21_CL.map((d) => mas(d, 1)), NIN_KR = NIN_CL.map((d) => mas(d, 1));
verifica("Conversacional 1 (KST)", A21_KR, "14/10,21/10,28/10,4/11,11/11,18/11,25/11,2/12", 3);
verifica("Niños (KST)", NIN_KR, "20/10,27/10,3/11,10/11,17/11,24/11,1/12,8/12", 2);

// ================================================================ a) KIT KIRAN (ES)
function buildKiran() {
  const c = curso("a11");
  const ch = [];
  ch.push(...portada({
    kor: "기란 선생님 · 시작 키트",
    titulo: "Kit de inicio · Kiran",
    sub: "Básico 1 (A1.1) · Primeras Palabras · martes y jueves 20:00 (hora Chile)",
    lineas: ["Cohorte octubre 2026 · 2 secciones · 16 clases en vivo por Zoom de 60 minutos", "Martes 13 y jueves 15 de octubre → martes 1 y jueves 3 de diciembre de 2026", "Qué enseñas, cuándo y cómo funciona cada clase: antes, durante y después"],
    contacto: "www.academiaseul.com · +56 9 4211 5562 · @academiaseul",
    nota: "Versión 1.0 · viernes 25 de septiembre de 2026 · Documento interno para profesoras. Datos del curso: academiaseul.com/programa y Programa Completo de Estudios (Parte III).",
  }));

  // 1. Bienvenida
  ch.push(H1("1. Bienvenida"));
  ch.push(P("¡Hola, Kiran! Qué alegría tenerte en la cohorte de octubre de Academia Seúl. Básico 1 es la puerta de entrada de toda la escalera de cursos: aquí los alumnos aprenden a leer 한글 y dicen sus primeras frases reales en coreano. Tu ventaja —coreana y criada en Argentina— es justo lo que necesita quien parte de cero: explicar desde el español y sonar 100 % nativa."));
  ch.push(P("Este kit es la versión práctica del programa: tus 16 clases con fecha, qué enseñas cada semana, lo que te pido antes de la clase 1 (con fecha límite) y cómo funciona cada clase de principio a fin. El detalle completo está en los PDFs del programa (sección 9). Cualquier duda, me escribes por WhatsApp. 화이팅! — Jay"));
  ch.push(espacio(40));
  ch.push(caja([
    [run("En una mirada", { bold: true, size: 21, color: AZUL })],
    "Tus secciones: Básico 1 (A1.1) · martes 20:00 y jueves 20:00, hora Chile (la misma hora en Argentina) · 15 cupos por sección.",
    "Primera clase: martes 13 y jueves 15 de octubre · última clase: martes 1 y jueves 3 de diciembre.",
    "Todo el curso: 8 semanas · 60 minutos por Zoom · libro 한글학교 한국어 1 · certificado incluido.",
    "Próximo plazo: clip de presentación de 15 segundos, miércoles 30 de septiembre a las 22:00.",
  ]));

  // 2. Tus clases
  ch.push(H1("2. Tus clases (16 sesiones)"));
  ch.push(P("Dictas el mismo programa en dos secciones: la del martes y la del jueves van en paralelo (sesión 1 = la misma clase en ambas). Todas las horas son de Chile (UTC−3 durante todo el curso)."));
  ch.push(headTable(["Sesión", "Sección martes · 20:00", "Sección jueves · 20:00", "Tema"], c.semanas.map((s, i) => [
    String(s.n), fES(A11_MAR[i]), fES(A11_JUE[i]),
    i === 3 ? [{ t: s.titulo, o: { bold: true } }, { t: "Mitad del curso: guía de estudio + feedback individual", o: { color: GREY } }]
      : i === 7 ? [{ t: s.titulo, o: { bold: true } }, { t: "Examen escrito en línea + mini-presentación oral · cierre", o: { color: GREY } }]
        : [{ t: s.titulo, o: { bold: true } }],
  ]), [900, 1900, 1900, 4660]));
  ch.push(espacio(60));
  ch.push(P("20:00 en Chile = 20:00 en Argentina = 08:00 del día siguiente en Corea (miércoles y viernes).", { spacing: { after: 60 } }));
  ch.push(H3("La hora de tu clase en los países de tus alumnos"));
  ch.push(headTable(["Chile", "Argentina", "México", "Col/Perú", "EE.UU. Este", "España", "Corea"], [["20:00", "20:00", "17:00", "18:00", "19:00 → 18:00", "01:00 → 00:00 (día sig.)", "08:00 (día sig.)"]], [1100, 1200, 1100, 1200, 1500, 1860, 1400]));
  ch.push(espacio(60));
  ch.push(P("España cambia de hora el domingo 25 de octubre y EE.UU. el domingo 1 de noviembre (antes → después). En Chile tu clase sigue siempre a las 20:00; si tienes alumnos de esos países, recuérdaselo en el grupo esa semana.", { spacing: { after: 60 } }));

  // 3. Calendario e hitos
  ch.push(H1("3. Calendario de la cohorte e hitos"));
  ch.push(headTable(["Fecha (hora Chile)", "Qué pasa", "Quién"], [
    ["vie 25 sep", "Recibes este kit y los PDFs del programa.", "Jay → tú"],
    ["mié 30 sep · 22:00", "Plazo del clip de presentación de 15 s.", "Tú"],
    ["vie 2 oct", "Post “Conoce a tus profes” en Instagram (con tu clip).", "Jay"],
    ["mié 7 oct", "Plazo del link de Zoom recurrente (o confirmar la cuenta de la academia).", "Tú"],
    ["vie 9 oct", "Programa y clase 1 revisados; avisas si falta material.", "Tú"],
    ["dom 11 oct · 23:59", "Cierre de matrícula (o antes, si se llenan los cupos).", "Jay"],
    ["lun 12 oct (feriado en Chile)", "Recibes la lista de alumnos de cada sección y quedas como admin de los dos grupos de WhatsApp.", "Jay → tú"],
    [{ t: "mar 13 oct · 20:00", o: { bold: true } }, { t: "Clase 1 · sección martes.", o: { bold: true } }, "Tú"],
    [{ t: "jue 15 oct · 20:00", o: { bold: true } }, { t: "Clase 1 · sección jueves.", o: { bold: true } }, "Tú"],
    ["vie 16 oct", "Check-in de la semana 1 con Jay (grabaciones subidas, cómo van los grupos).", "Tú y Jay"],
    ["semana 2 · 19–23 oct", "Último plazo para cambios de sección (martes ↔ jueves), según cupo.", "Jay"],
    ["dom 25 oct · dom 1 nov", "Cambio de hora en España y en EE.UU. (tu hora en Chile no cambia).", "—"],
    ["semana 4 · 2–6 nov (mar 3 y jue 5)", "Mitad del curso: guía de estudio y feedback individual por alumno.", "Tú"],
    ["semana 7 · mar 24 y jue 26 nov", "Recibes los guiones de la mini-presentación final y los devuelves corregidos.", "Tú"],
    ["semana 8 · 30 nov–4 dic (mar 1 y jue 3)", "Examen escrito en línea (abre 48 h antes de la clase 8) + mini-presentación oral “Yo en coreano”.", "Tú"],
    ["vie 4 dic", "Notas finales y reporte a Jay (asistencia, notas y recomendación de nivel por alumno).", "Tú"],
    ["lun 7 dic", "Certificados digitales y preventa de la cohorte de enero 2027 (Básico 2).", "Jay"],
  ], [2500, 5260, 1600], 19));

  // 4. Qué enseñas
  ch.push(H1("4. Qué enseñas: Básico 1 semana a semana"));
  ch.push(P("En 8 semanas tus alumnos aprenden a leer el alfabeto coreano completo y a decir sus primeras frases reales sobre sí mismos, su familia, su casa, su día y sus gustos, siguiendo el libro 한글학교 한국어 1. El drilling de lectura vive en el Lector de Hangul como tarea con audio nativo, así la hora en vivo se reserva para hablar y corregir. Básico 1 reemplaza al Nivel 1 de julio de 2026 y da paso directo a Básico 2 (A1.2)."));
  const corta = (g) => { let x = g.split(/:|;/)[0].trim(); if (x.length > 120) x = x.slice(0, 117).trim() + "…"; return "• " + x; };
  ch.push(H3("Temas y objetivos"));
  ch.push(headTable(["Ses.", "Fechas", "Tema y lección", "Objetivo (can-do)", "Foco"], c.semanas.map((s, i) => [
    String(s.n), [fES(A11_MAR[i]), fES(A11_JUE[i])],
    [{ t: s.titulo, o: { bold: true } }, { t: s.leccion.replace(/ del libro 한글학교 한국어 1/, ""), o: { color: GREY } }],
    s.objetivo, s.gramatica.map(corta),
  ]), [550, 1100, 2150, 2700, 2860], 17));
  ch.push(H3("Tarea que asignas al cierre de cada clase (se entrega antes de la clase siguiente)"));
  ch.push(headTable(["Ses.", "Tarea de la semana"], c.semanas.map((s) => [String(s.n), s.tarea.map((x) => "• " + x)]), [600, 8760], 17));
  ch.push(H3("Notas para ti (de este curso)"));
  c.notas_profesor.forEach((n) => ch.push(bullet(n, { size: 20 })));

  // 5. Antes de la clase 1
  ch.push(H1("5. Antes de la clase 1: checklist"));
  ch.push(P("Cuatro pedidos con fecha límite (hora Chile). Si algo no calza, avísame antes del plazo y lo ajustamos."));
  ch.push(headTable(["□", "Qué", "Hasta", "Detalle"], [
    ["□", { t: "Clip de presentación de 15 s", o: { bold: true } }, "mié 30 sep · 22:00", "Vertical (9:16) y con luz de frente; el guion te lo mando por WhatsApp. Envíalo como documento para que no pierda calidad. Sale en el post “Conoce a tus profes” (vie 2 oct)."],
    ["□", { t: "Link de Zoom recurrente para tus dos secciones (o confirmar que usas la cuenta de la academia)", o: { bold: true } }, "mié 7 oct", "Reunión semanal martes 20:00 y jueves 20:00 (hora Chile), con salas para grupos habilitadas y grabación en la nube activada. Jay lo comparte con los alumnos antes de la clase 1."],
    ["□", { t: "Revisar el programa de Básico 1 y preparar la clase 1", o: { bold: true } }, "vie 9 oct", "Clase 1: 가나다라 I · La sílaba (deck, hoja 가나다라 I, coro y eco, fábrica de sílabas en pares, lectura relámpago). Avísale a Jay si falta algún material."],
    ["□", { t: "Lista de alumnos y grupo de WhatsApp", o: { bold: true } }, "lun 12 oct", "Jay cierra la matrícula el dom 11 a las 23:59, te manda la lista de cada sección y te deja como admin de los dos grupos. Ese día saluda en cada grupo con la hora de la clase (Chile + un país del grupo)."],
    ["□", "El día antes de cada clase 1", "lun 12 oct (sección martes) · mié 14 oct (sección jueves)", "Confirma la clase en el grupo y prueba Zoom (salas + grabación)."],
  ], [450, 2700, 1650, 4560], 19));

  // 6. En cada clase
  ch.push(H1("6. En cada clase"));
  ch.push(H3("El día anterior"));
  ["Revisa el deck y la hoja de la semana y prepara el quiz de 5 preguntas (desde la clase 2).", "Confirma la clase en el grupo: hora Chile + un país del grupo (ej.: “mañana 20:00 Chile · 18:00 Colombia”).", "Prueba Zoom: salas para grupos habilitadas y grabación en la nube activada."].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("Estructura de la clase de Básico 1 (60 minutos)"));
  ch.push(headTable(["Min.", "Bloque", "Qué pasa"], c.estructura_clase.map((b) => [b.minutos + "′", { t: b.bloque, o: { bold: true } }, b.detalle]), [800, 2300, 6260], 19));
  ch.push(H3("Durante"));
  ["Graba desde el minuto 0. Nombre de la grabación: Curso_Semana_Fecha (ej.: Basico1-Martes_S01_2026-10-13).", "Si el grupo va lento, recorta la lección, nunca la práctica oral.", "Cada alumno habla al menos 3 veces por clase; salas de 2–3 personas para la práctica.", "Anota 2–3 errores frecuentes del grupo para abrir la clase siguiente.", "Comandos de clase siempre en coreano: 따라 하세요 · 다시 한번 · 잘했어요."].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("Después de la clase (dentro de 24 horas)"));
  ["Sube la grabación + el PDF de la clase + la tarea a la carpeta del curso en Drive (nombre estándar: Curso_S01_Fecha_Tema).", "Marca la asistencia y el quiz en la hoja del curso.", "Publica en el grupo el link de la grabación y la tarea de la semana con su fecha de entrega.", "Mándale a Jay una línea: “todo bien / faltó X / grupo lento en Y”.", "Responde las dudas del grupo dentro de 24 h, en horario hábil."].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("Plantilla de mensaje post-clase (para el grupo)"));
  ch.push(caja([
    "¡Gracias por la clase de hoy, chingus!",
    "Grabación: [link]",
    "Tarea para antes del [martes/jueves] [fecha], 20:00 (hora Chile):",
    "1) Lector de Hangul → [pestaña y modo] hasta 3 estrellas (mándenme la captura de Progreso)",
    "2) Hoja de la lección [n] (foto o PDF aquí en el grupo)",
    "3) Audio de [20–45] segundos: [consigna]",
    "¡Nos vemos el [día] a las 20:00! 화이팅",
  ], PAPEL, NAVY));
  ch.push(H3("Cómo corregir (resumen de la Parte III)"));
  T.corregir.forEach((x) => ch.push(bullet(x)));

  // 7. Evaluación y certificado
  ch.push(H1("7. Evaluación y certificado"));
  ch.push(P("Evaluamos para orientar, no para castigar. La nota final es informativa: le dice al alumno si está listo para el siguiente peldaño y qué reforzar."));
  ch.push(headTable(T.evalCols, T.evalRows, [2600, 900, 5860]));
  ch.push(H3("En Básico 1, el 35 % final es:"));
  ch.push(bullet([run("Parte escrita (50 pts): ", { bold: true }), ...runs(c.evaluacion.examen_final)]));
  ch.push(bullet([run("Parte oral: ", { bold: true }), ...runs(c.evaluacion.oral)]));
  ch.push(espacio(60));
  ch.push(caja([T.certRegla]));
  ch.push(H3("Rúbrica de evaluación oral"));
  ch.push(headTable(T.rubricaCols, T.rubricaRows, [1500, 2000, 2000, 2000, 1860], 18));
  ch.push(espacio(60));
  ch.push(P(T.rubricaNota, { spacing: { after: 100 } }));

  // 8. Contingencias y comunicación
  ch.push(H1("8. Contingencias y comunicación"));
  ch.push(kvTable([
    ["No puedes dictar una clase", "Avísale a Jay apenas lo sepas, con al menos 48 h de anticipación. Opciones, en orden: 1) reemplazo (Jay o Abby) · 2) reprogramar dentro de la misma semana · 3) clase grabada + sesión de dudas de 20 minutos."],
    ["Se te corta la luz o internet", "Avisa en el grupo; si no se retoma en 10 minutos, la clase se repone en la misma semana."],
    ["Un alumno con problemas técnicos", "Recibe la grabación y escribe sus dudas en el grupo; no pierde la asistencia."],
    ["Grupo con niveles muy distintos", "Salas por nivel en la práctica y tarea base / extra. Avísale a Jay: el cambio de sección (martes ↔ jueves) se puede hasta la semana 2, según cupo."],
    ["Feriados", "Tus días no coinciden con feriados en Chile durante el curso (lun 12 oct, sáb 31 oct y dom 1 nov). Si igual hay que mover una clase, se avisa con 48 h y se ofrece reposición o grabación."],
    ["Conducta inapropiada", "Advertencia en privado; si se repite, le informas a Jay, que decide."],
  ]));
  ch.push(H3("Comunicación"));
  ["Grupo de WhatsApp de cada sección: solo temas del curso. Respondes las dudas dentro de 24 h, en horario hábil.", "Nada de datos personales de otros alumnos fuera del grupo.", "Con Jay: la hoja del curso en Drive (asistencia, quiz, notas) el mismo día de la clase + un mensaje de una línea al terminar cada clase.", "Check-in de la primera semana con Jay: viernes 16 de octubre.", "Capturas o videos de la clase para redes: solo con permiso del grupo.", "Material en la carpeta del curso con nombre estándar: Curso_S01_Fecha_Tema.pdf."].forEach((x) => ch.push(bullet(x)));

  // 9. Materiales
  ch.push(H1("9. Materiales y links"));
  ch.push(kvTable([
    ["Programa de Básico 1 (PDF)", "https://www.academiaseul.com/programas/Programa_Basico1_Octubre_2026.pdf"],
    ["Programa Completo (PDF) · Parte III: guía para profesores", "https://www.academiaseul.com/programas/Programa_Completo_Octubre_2026_ES.pdf"],
    ["Lector de Hangul (tarea semanal)", "https://www.academiaseul.com/lector-coreano — pestañas Alfabeto, Aprender, Practicar y Progreso. Los alumnos te mandan la captura de Progreso como prueba."],
    ["Dubu · 두부 (tarea extra)", "https://www.academiaseul.com/dubu — puzzle del Hangul: consonante + vocal → palabra leída o escuchada; 30 niveles en 6 barrios. Sugerencia: tarea extra en las semanas 1 a 3."],
    ["Taller gratis de Hangul (video)", "https://www.academiaseul.com/taller — la clase completa de 1 hora; útil para quien se sume tarde o necesite repasar la lectura."],
    ["Libro", "한글학교 한국어 1: 가나다라 I–II, lecciones 1 a 9 y repaso integral (lección 10)."],
    ["Carpeta del curso (Drive)", "[PLACEHOLDER: carpeta Básico 1 martes] · [PLACEHOLDER: carpeta Básico 1 jueves]"],
    ["Hoja de asistencia y notas", "[PLACEHOLDER: link de la hoja]"],
    ["Zoom", "[PLACEHOLDER: tu link recurrente — lo mandas hasta el mié 7 oct]"],
    ["Grupos de WhatsApp", "[PLACEHOLDER: grupo Básico 1 martes] · [PLACEHOLDER: grupo Básico 1 jueves]"],
    ["Examen escrito en línea (clase 8)", "[PLACEHOLDER: link del formulario — lo confirma Jay]"],
  ], 2800));

  // 10. Contacto
  ch.push(H1("10. Contacto"));
  ch.push(kvTable([
    ["Jay Kim · 김재희 (WhatsApp)", "+56 9 4211 5562 · https://wa.me/56942115562"],
    ["Correo", "hola.academiaseul@gmail.com"],
    ["Web", "https://www.academiaseul.com"],
    ["Instagram", "@academiaseul · @jaychingu.oficial"],
  ], 2800));
  ch.push(espacio(240));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [run("8주 전에는 한글도 몰랐어요 — y en 8 semanas tus alumnos van a leer.", { bold: true, size: 23, color: AZUL })] }));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("¡Gracias por sumarte, Kiran! 화이팅!", { bold: true, size: 23, color: NAVY })] }));

  return makeDoc({ title: "Kit de inicio · Kiran · Básico 1 · Octubre 2026", header: "Academia Seúl · Kit de inicio · Kiran · Básico 1 (A1.1) · Octubre 2026", footer: "www.academiaseul.com · Cohorte octubre 2026 · Documento interno", pagina: "Página ", children: ch });
}

// ================================================================ b) KIT ABBY (KO)
// Semana a semana traducido de cursos_es.json (a21 y ninos).
const A21_KO = [
  { t: "오리엔테이션 + 말하기 진단", obj: "그룹·Abby 선생님과 친해지고, Básico 2보다 자세하게 자기소개(하는 일, 한국어를 공부한 기간과 이유)를 하며, 8주 동안의 개인 회화 목표 3가지를 정한다.",
    g: ["-고 싶어요 (목표 말하기) · 한국어로 말하고 싶어요", "-(으)ㄴ 지 ... 됐어요 · 한국어를 배운 지 6개월 됐어요", "재활성화: -아요/어요 · -았/었어요 · -(으)ㄹ 거예요", "재활성화: -고 · -지만 · 그래서"],
    tarea: ["60–90초 자기소개 음성 (보관해 두세요: 8주차에 다시 녹음해서 비교해요)", "-고 싶어요로 회화 목표 3개를 써서 단톡방에 올리기", "(선택) Lector 타임어택(Contrarreloj) 1회로 읽기 속도 회복"] },
  { t: "K-pop과 팬 문화 (M01)", obj: "좋아하는 그룹과 최애, 콘서트 이야기: 팬으로서의 경험을 말하고, 최상급으로 좋아하는 것을 표현하고, -아서/어서로 이유를 설명한다.",
    g: ["-아/어 봤어요 (경험) · 콘서트에 가 봤어요?", "제일/가장 + 형용사 · 제일 좋아하는 노래", "N 중에서 · 멤버 중에서 누가 제일 좋아요?", "-아서/어서 (이유) · 노래가 좋아서 이 그룹을 좋아해요"],
    tarea: ["한국 노래 추천 90초 음성 (누구 노래인지, 어떤 노래인지, 왜 추천하는지)", "-아/어 봤어요와 제일을 넣어 콘서트 문장 5개 (실제 또는 상상)", "한글 가사로 노래를 듣고 번역기 없이 아는 단어 5개 적기"] },
  { t: "여행: 제주와 서울 (M02)", obj: "짝과 여행을 계획하고(제안·결정·이동 방법), 다녀온 여행을 과거형 문장으로 이어서 말한다.",
    g: ["-(으)ㄹ까요? · 제주도에 갈까요?", "-(으)러 가요 · 바다를 보러 가요", "N(으)로: 교통수단 → 방향까지 확장 · 지하철로, 왼쪽으로, 홍대로", "-아서/어서: 순서 · 공항에 가서 비행기를 타요"],
    tarea: ["한국 2일 여행 일정 6–8문장 (교통, 장소, 음식 하나)", "'꿈의 한국 여행' 또는 실제 여행 90초 음성 (과거·미래 동사 3개 이상)", "서울 지하철 노선도를 보고 가고 싶은 역 5개를 한글로 쓰기"] },
  { t: "음식 문화 (M03)", obj: "한국 식당에서 단위명사와 공손한 표현으로 주문하고, 음식을 추천하고 맛을 묘사하며, 자연스러운 속도의 주문을 알아듣는다.",
    g: ["-아/어 주세요 · 물 좀 주세요", "단위명사: 개·병·잔 + 고유어 수 (한 개, 두 병, 세 잔) / 인분 + 한자어 수 (삼겹살 이 인분)", "-지 마세요 · 너무 맵게 하지 마세요", "-(으)ㄴ + N · 매운 음식, 단 음식"],
    tarea: ["맛 형용사 3개 이상으로 한국 음식(또는 자기 나라 음식) 추천 60–90초 음성", "3인 주문서 쓰기 (메뉴, 단위명사로 수량, -지 마세요 요청 하나)", "네이버나 구글 지도에서 서울 식당 메뉴를 찾아 5개 번역"] },
  { t: "회화 랩 1 (M01–M03 통합 · 새 덱 없음)", obj: "3인 그룹으로 2–4주차 주제에 대해 10분 동안 대화를 이어 가며 실제 과제(결정·주문·협상)를 해결하고, 1:1 발음 교정을 받는다.",
    g: ["적극 복습: -아/어 봤어요 (경험 말하고 묻기)", "적극 복습: -(으)ㄹ까요? / 같이 -아요 (제안과 수락)", "적극 복습: -아/어 주세요 + 단위명사 (가게에서 주문)", "대화 복구 전략: 다시 한번 말해 주세요 · 무슨 뜻이에요?"],
    tarea: ["'한국에서의 완벽한 주말' 2분 음성 (콘서트·여행·음식 통합)", "자기 평가 (스페인어 가능): 잘한 것 3개, 랩 2 전까지 고칠 것 2개", "수업 녹화를 보고 친구들이 쓴 표현 중 써 보고 싶은 것 3개 메모"] },
  { t: "한복과 미 (M04)", obj: "옷·색깔·무늬를 묘사하고, 전통과 현대를 비교하며, 한복과 한국의 미에 대해 뉘앙스를 살려 의견을 말한다.",
    g: ["재활성화: -(으)ㄴ + N (4주차), N보다 더 (Básico 2) · 한복이 청바지보다 더 화려해요", "-아/어 보여요 · 편해 보여요, 비싸 보여요", "-(으)ㄴ/는 것 같아요 · 전통 한복이 더 예쁜 것 같아요", "-지만 (의견의 뉘앙스) · 예쁘지만 불편해요"],
    tarea: ["좋아하는 옷이나 입어 보고 싶은 한복 묘사 6–8문장 (색, 무늬, 어떻게 보이는지, 무엇과 어울리는지)", "'현대 한복 vs 전통 한복' 의견 60–90초 음성 (비교 2개 이상)", "인스타그램이나 핀터레스트에서 한복 사진을 찾아 색 3개·형용사 2개를 한글로"] },
  { t: "PC방과 e-스포츠 (M05)", obj: "게임·여가·기술 이야기: 언제, 얼마나 하는지, 잘하는 것과 못하는 것, 조건을 말하고 '게이머 한국'에 대한 미니 토론을 한다.",
    g: ["-(으)ㄹ 때 · 게임할 때 컵라면을 먹어요", "-기 전에 / -(으)ㄴ 후에 · 게임하기 전에, 수업이 끝난 후에", "잘 / 못 + 동사 (Básico 2 재활성화) · 저는 게임을 잘 못해요", "-(으)면 · 이기면 기분이 좋아요"],
    tarea: ["-(으)ㄹ 때, -기 전에 / -(으)ㄴ 후에를 써서 디지털 취미(게임, 앱, 드라마, 음악) 90초 음성", "-(으)면 문장 5개: 이기면, 지면, 시간이 있으면", "LCK 하이라이트를 자막과 함께 2분 보고 아는 단어 5개 적기"] },
  { t: "회화 랩 2 + 단계 말하기 평가", obj: "수업 전에 제출한 음성과 Abby 선생님과의 짝 롤플레이로 다섯 가지 주제를 배운 구조로 말할 수 있음을 보여 주고, 개인 피드백, A2.1 수료증, 회화 2(A2.2, 2027년 1월) 안내로 마무리한다.",
    g: ["통합 1: 경험과 계획 (-아/어 봤어요, -(으)ㄹ까요?, -(으)러 가요)", "통합 2: 부탁·묘사·의견 (-아/어 주세요 + 단위명사, -(으)ㄴ N, N보다, -아/어 보여요, -(으)ㄴ/는 것 같아요)", "통합 3: 시점과 조건 (-(으)ㄹ 때, -기 전에 / -(으)ㄴ 후에, -(으)면)"],
    tarea: ["수업 전: 추첨된 모듈에 대한 2분 독백 녹음 (읽지 않고 키워드 카드만) + 롤플레이 2개 준비", "수업 전: 1주차 자기소개를 2–3분으로 다시 녹음해 원본과 함께 제출 ('전과 후')", "수업 후: 최종 자기 평가와 설문 → Abby 선생님이 개인 리포트와 수료증 전달"] },
];
const NIN_KO = [
  { t: "안녕, 한국! · 안녕하세요", obj: "인사·작별·감사를 말하고, 게임에서 네/아니요로 대답하며, 기본 모음 ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ를 알아보고 읽는다.",
    g: ["안녕하세요 · 안녕 (절하며 인사, 분석 없이 통째로)", "네 / 아니요 (출석과 게임에서)", "기본 모음 + 첫소리 ㅇ: 아 어 오 우 으 이"],
    tarea: ["Lector 알파벳(Alfabeto) 탭에서 모음 6개 따라 말하기 (5분, 서로 다른 3일) → 연습(Practicar) 모음 10개 정답", "모음 6개 그림 색칠해서 컴퓨터 옆에 붙이기", "안녕하세요와 감사합니다 10초 음성을 가족 WhatsApp으로"] },
  { t: "한국어로 내 이름", obj: "기본 자음 ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ을 알아보고, 자음+모음 음절을 읽고, 자기 이름을 한글로 써서 소개한다.",
    g: ["저는 ___이에요/예요 (이름 소개, 통째로)", "이름이 뭐예요? (릴레이 질문)", "자음 + 모음 = 음절: ㄱ + ㅏ = 가, ㄴ + ㅏ = 나"],
    tarea: ["Lector 알파벳: 자음 듣고 따라 하기 → 연습(Practicar) 자음 10개 정답", "한글 이름 꾸미기 (색연필, 그림, 스티커): 다음 수업에서 보여 주고 발표회에도 사용", "10초 음성: 안녕하세요, 저는 ___이에요/예요."] },
  { t: "음절 공장", obj: "자음+모음으로 간단한 음절을 읽고, 짧은 단어 속 받침 ㄴ ㅁ ㅇ ㄹ을 알아보며, 1–2음절 단어 10개를 소리 내어 읽는다.",
    g: ["음절 블록: 자음+모음 (가) · 자음+모음+받침 (강)", "자주 쓰는 받침 ㄴ ㅁ ㅇ ㄹ (읽기만, 규칙 설명 없이)", "ㅇ의 두 얼굴: 첫소리는 소리 없음(아), 받침은 'ng'(강)"],
    tarea: ["Lector 배우기(Aprender): 음절·받침 → 연습: 음절 10개, 받침 10개 정답", "한글 탐정: 집에서 한국어 단어 3개 찾기 (라면 봉지, K-pop 앨범, 드라마) → 사진이나 그림 1장", "이번 주 단어 11개 소리 내어 읽기 음성"] },
  { t: "동물", obj: "동물 10개 이름을 말하고, 이거 뭐예요?로 묻고 ___이에요/예요로 대답하며, 좋아하는 동물을 그림으로 소개한다.",
    g: ["N + 이에요/예요: 곰이에요 (받침 O) · 토끼예요 (받침 X)", "이거 뭐예요? (게임식 묻고 답하기)", "동물 소리: 멍멍, 야옹, 꿀꿀"],
    tarea: ["Lector 연습: 단어(Palabras)·그림 단어(Pictogramas) 15개 읽기 → 진도 캡처", "좋아하는 동물을 그리고 한글로 이름 쓰기 (다음 수업 10초 발표, 발표회용)", "인형이나 반려동물로 '이거 ___이에요/예요' 3문장 음성"] },
  { t: "가족", obj: "가족 호칭을 말하고, 사진이나 그림으로 가족 2–3명을 소개한다: 이 사람은 우리 엄마예요.",
    g: ["우리 + 가족 (우리 엄마 = 나의 엄마)", "이 사람은 ___이에요/예요", "엄마 이름이 뭐예요?"],
    tarea: ["Lector 연습: 단어 10개 정답 + 알파벳 복습 한 번 (모음·자음 소리 내어)", "가족 나무 그리기, 한글 이름 넣기 (4명 이상, 반려동물도 OK): 발표회에 사용", "음성: 가족 3명을 '이 사람은 우리 ___이에요/예요'로 소개"] },
  { t: "마법의 숫자", obj: "고유어 수로 1부터 10까지 세고, 몇 살이에요?라고 묻고 자기 나이를 말한다: 저는 열 살이에요 (11–15세는 열한 살 … 열다섯 살).",
    g: ["고유어 수 하나–열 (물건 세기, 나이)", "___ 살이에요 + 한/두/세/네 살 · 열한 살, 열두 살", "몇 살이에요? (인터뷰 질문)"],
    tarea: ["Lector 연습: 숫자(고유어) 10개 정답 + 음절 타임어택(Contrarreloj) 1회 → 시간 캡처", "집에 있는 물건 10개를 한국어로 세며 '열'까지 음성 녹음", "가족 2명에게 한국어로 나이를 묻고 한국어 숫자로 적기"] },
  { t: "냠냠! 한국 음식", obj: "한국 음식 10개 이름을 말하고 좋아하는 것과 싫어하는 것을 말한다: 저는 김밥 좋아해요 / 김치 안 좋아해요; 맛있어요, 매워요로 반응한다.",
    g: ["N + 좋아해요 (을/를은 모델에서 듣기만, 설명 없음)", "안 좋아해요 (가장 쓸모 있는 부정)", "뭐 좋아해요? · 맛있어요 / 매워요"],
    tarea: ["Lector 연습: 단어·그림 단어 10개 정답 + 타임어택: 지난주 기록 넘기기", "발표회 대본 연습 (인사, 이름, 나이, 가족, 동물, 음식 · 30–40초) → 첫 연습 영상", "한국 음식 먹어 보기 (또는 사진) + 맛있어요 / 매워요 음성·영상"] },
  { t: "발표회 + 수료증", obj: "가족 앞에서 30–40초 동안 한국어로 자기소개(인사, 이름, 나이, 가족, 좋아하는 동물과 음식)를 하고, 한글 단어 5개를 소리 내어 읽고, 감사합니다로 마무리한다.",
    g: ["대본 통합: 안녕하세요 → 저는 ___이에요/예요 → ___ 살이에요 → 이 사람은 우리 ___이에요/예요 → 저는 ___ 좋아해요", "마무리: 감사합니다 · 안녕히 계세요 (절하기)"],
    tarea: ["Lector 진도(Progreso) 탭 캡처 → 아이 포트폴리오", "가족에게 안녕하세요·감사합니다와 한글 이름 읽기 가르쳐 주기", "(선택) 발표회 영상은 가족의 서면 동의가 있을 때만 학원 앨범용으로"] },
];
if (A21_KO.length !== 8 || NIN_KO.length !== 8) throw new Error("faltan semanas en la traducción");

function buildAbby() {
  const ch = [];
  ch.push(...portada({
    kor: "Abby 선생님 · 시작 키트",
    titulo: "교사 시작 키트 · 홍미영 (Abby)",
    sub: "회화 1 · Conversacional 1 (A2.1)  ·  어린이 한국어 · Coreano para Niños (8–15)",
    lineas: ["2026년 10월 코호트 · Zoom 실시간 수업 16회 (각 60분)", "회화 1: 10월 14일(수) ~ 12월 2일(수) · 어린이반: 10월 20일(화) ~ 12월 8일(화)", "모든 시간은 한국 시간(KST) · 괄호 안은 칠레 시간"],
    contacto: "www.academiaseul.com · +56 9 4211 5562 · @academiaseul",
    nota: "버전 1.0 · 2026년 9월 25일(금) · 교사용 내부 문서. 수업 정보 출처: academiaseul.com/programa, 전체 프로그램 Part III(교사 가이드).",
  }));

  // 1. 환영 인사
  ch.push(H1("1. 환영 인사"));
  ch.push(P("Abby 선생님, 안녕하세요! Academia Seúl 2026년 10월 코호트에 함께해 주셔서 정말 감사합니다. 선생님은 두 수업을 맡아 주십니다: 한국어로만 이야기하는 회화 1(Conversacional 1, A2.1), 그리고 저(Jay)와 함께 가르치는 어린이 한국어(Coreano para Niños, 8–15세)입니다."));
  ch.push(P("이 키트는 프로그램의 실전용 요약본입니다. 16회 수업 일정, 주차별 수업 내용, 첫 수업 전에 부탁드리는 일(마감일 포함), 그리고 매 수업 전·중·후의 진행 방법을 정리했어요. 모든 날짜와 시간은 한국 시간(KST)이고, 괄호 안은 칠레 시간입니다. 전체 내용은 프로그램 PDF(9장)에 있습니다. 궁금한 점은 언제든지 WhatsApp으로 연락 주세요. 화이팅! — Jay (김재희)"));
  ch.push(espacio(40));
  ch.push(caja([
    [run("한눈에 보기", { bold: true, size: 21, color: AZUL })],
    "회화 1 (A2.1): 매주 수요일 09:00 · 10월 14일(수) ~ 12월 2일(수) · 8회 · 정원 15명 (칠레 화요일 21:00)",
    "어린이 한국어 (8–15세), Jay와 함께: 매주 화요일 06:00 · 10월 20일(화) ~ 12월 8일(화) · 8회 · 정원 12명 (칠레 월요일 18:00)",
    "모든 수업: 8주 · Zoom 60분 · 수료증 포함 · 칠레는 한국보다 12시간 늦습니다 (수업 기간 내내 동일)",
    "다음 마감: 15초 자기소개 영상, 10월 1일(목) 10:00 (칠레 9월 30일(수) 22:00)",
  ]));

  // 2. 수업 일정
  ch.push(H1("2. 선생님 수업 일정 (16회)"));
  ch.push(H3("회화 1 · Conversacional 1 (A2.1) · 매주 수요일 09:00 KST"));
  ch.push(headTable(["회차", "한국 (KST)", "칠레", "주제"], A21_KO.map((w, i) => [
    String(i + 1), fKO(A21_KR[i]) + " 09:00", fKO(A21_CL[i]) + " 21:00",
    i === 3 ? [{ t: w.t, o: { bold: true } }, { t: "중간 점검: 학습 가이드 + 개인 피드백", o: { color: GREY } }]
      : i === 7 ? [{ t: w.t, o: { bold: true } }, { t: "최종 평가 · 수료", o: { color: GREY } }] : [{ t: w.t, o: { bold: true } }],
  ]), [800, 2100, 2100, 4360], 19));
  ch.push(H3("어린이 한국어 · Coreano para Niños (8–15세) · 매주 화요일 06:00 KST · Jay와 함께"));
  ch.push(headTable(["회차", "한국 (KST)", "칠레", "주제"], NIN_KO.map((w, i) => [
    String(i + 1), fKO(NIN_KR[i]) + " 06:00", fKO(NIN_CL[i]) + " 18:00",
    i === 7 ? [{ t: w.t, o: { bold: true } }, { t: "가족 앞 미니 발표회 · 화면으로 수료증 전달", o: { color: GREY } }] : [{ t: w.t, o: { bold: true } }],
  ]), [800, 2100, 2100, 4360], 19));
  ch.push(espacio(60));
  ch.push(P("칠레는 10월 12일(월)이 공휴일이라 어린이반은 다른 수업보다 한 주 늦게 시작하고 끝납니다 (칠레 10월 19일(월) ~ 12월 7일(월)).", { spacing: { after: 60 } }));
  ch.push(H3("학생들의 현지 시간"));
  ch.push(headTable(["한국", "칠레", "아르헨티나", "멕시코", "콜롬비아·페루", "미국 동부", "스페인"], [
    ["수 09:00 (회화 1)", "화 21:00", "화 21:00", "화 18:00", "화 19:00", "화 20:00 → 19:00", "수 02:00 → 01:00"],
    ["화 06:00 (어린이반)", "월 18:00", "월 18:00", "월 15:00", "월 16:00", "월 17:00 → 16:00", "월 23:00 → 22:00"],
  ], [1500, 1150, 1250, 1150, 1400, 1500, 1410], 18));
  ch.push(espacio(60));
  ch.push(P("스페인은 10월 25일(일), 미국은 11월 1일(일)에 서머타임이 끝나서 그 지역 학생들의 수업 시간이 1시간 앞당겨집니다 (화살표 왼쪽 → 오른쪽). 한국·칠레 시간은 수업 기간 내내 그대로입니다. 회화 1 학생들에게는 퇴근 후 밤 수업이라는 점을 기억해 주세요.", { spacing: { after: 60 } }));

  // 3. 코호트 일정
  ch.push(H1("3. 코호트 일정과 주요 날짜"));
  ch.push(headTable(["한국 (KST)", "칠레", "내용", "담당"], [
    ["9월 25일(금)", "9월 25일(금)", "이 키트와 프로그램 PDF 받기", "Jay → 선생님"],
    ["10월 1일(목) 10:00", "9월 30일(수) 22:00", "15초 자기소개 영상 마감", "선생님"],
    ["10월 2일(금) ~ 3일(토)", "10월 2일(금)", "인스타그램 '선생님 소개' 게시물 (영상 사용)", "Jay"],
    ["10월 7일(수)", "10월 7일(수)", "매주 반복 Zoom 링크 마감 (또는 학원 계정 사용 확인)", "선생님"],
    ["10월 9일(금)", "10월 9일(금)", "프로그램과 첫 수업 확인, 필요한 자료 알려 주기", "선생님"],
    ["10월 12일(월) 11:59", "10월 11일(일) 23:59", "등록 마감 (정원이 차면 더 일찍)", "Jay"],
    ["10월 12일(월) ~ 13일(화)", "10월 11일(일) 밤 ~ 12일(월)", "학생 명단 받기 + 단톡방 관리자 추가 (회화 1, 어린이반 가족방)", "Jay → 선생님"],
    [{ t: "10월 14일(수) 09:00", o: { bold: true } }, { t: "10월 13일(화) 21:00", o: { bold: true } }, { t: "회화 1 첫 수업", o: { bold: true } }, "선생님"],
    ["10월 16일(금) 밤 ~ 17일(토) 아침", "10월 16일(금)", "1주차 체크인 (Jay와)", "선생님 · Jay"],
    [{ t: "10월 20일(화) 06:00", o: { bold: true } }, { t: "10월 19일(월) 18:00", o: { bold: true } }, { t: "어린이반 첫 수업 (Jay와 함께)", o: { bold: true } }, "선생님 · Jay"],
    ["11월 4일(수) 09:00", "11월 3일(화) 21:00", "회화 1 중간 점검 (4주차): 학습 가이드 + 개인 피드백", "선생님"],
    ["11월 10일(화) 06:00", "11월 9일(월) 18:00", "어린이반 4회차 · 가족 중간 피드백 시점은 Jay와 확정", "선생님 · Jay"],
    [{ t: "12월 2일(수) 09:00", o: { bold: true } }, { t: "12월 1일(화) 21:00", o: { bold: true } }, { t: "회화 1 마지막 수업: 랩 2 + 단계 말하기 평가", o: { bold: true } }, "선생님"],
    ["12월 4일(금)까지", "12월 4일(금)", "회화 1 최종 점수·리포트 Jay에게 (출석, 점수, 학생별 레벨 추천)", "선생님"],
    [{ t: "12월 8일(화) 06:00", o: { bold: true } }, { t: "12월 7일(월) 18:00", o: { bold: true } }, { t: "어린이반 발표회 + 수료증 · 결과는 수업 후 Jay에게", o: { bold: true } }, "선생님 · Jay"],
    ["12월 7일 ~ 8일", "12월 7일(월)", "디지털 수료증 발급 + 2027년 1월 코호트 사전 등록", "Jay"],
  ], [2200, 2100, 3760, 1300], 18));

  // 4. 수업 내용
  ch.push(H1("4. 수업 내용: 주차별"));
  ch.push(H2("회화 1 · Conversacional 1 (A2.1) · Corea que amas"));
  ch.push(P("한국어로만 말하는 수업입니다. K-pop과 팬 문화, 제주·서울 여행, 음식 문화, 한복과 미, PC방과 e-스포츠 — 다섯 개의 문화 모듈과 두 번의 회화 랩(5·8주차)으로 구성됩니다. 모듈마다 Korean Grammar in Use의 구조 2–4개를 필요할 때만 사용합니다: 문화가 수단이고 문법은 도구예요. 학생들은 Básico 2(A1.2)를 마쳤거나 레벨 테스트를 거친 스페인어권 학생들이며, 수료 후 회화 2(A2.2, 2027년 1월)로 바로 진급합니다."));
  ch.push(H3("주제와 목표"));
  ch.push(headTable(["회차", "주제 · 날짜 (KST)", "목표 (can-do)", "핵심 문법·표현"], A21_KO.map((w, i) => [
    String(i + 1), [{ t: w.t, o: { bold: true } }, { t: fKO(A21_KR[i]), o: { color: GREY } }], w.obj, w.g.map((x) => "• " + x),
  ]), [600, 2100, 3200, 3460], 17));
  ch.push(H3("수업 마무리에 내주는 과제 (다음 수업 전까지 제출)"));
  ch.push(headTable(["회차", "이번 주 과제"], A21_KO.map((w, i) => [String(i + 1), w.tarea.map((x) => "• " + x)]), [700, 8660], 17));
  ch.push(H3("회화 1 · 선생님을 위한 메모"));
  [
    "학생들은 Básico 2에서 과거·미래가 아직 완전히 익지 않은 상태로 옵니다. 다시 가르치지 말고 맥락 속에서 재활성화해 주세요. -았/었어요를 틀리면 10초 안에 모델만 주고 주제로 돌아갑니다.",
    "스페인어 화자의 발음: ㅓ/ㅗ 혼동(서울 → 소울), ㅡ/ㅜ 혼동, 된소리를 약하게(떡볶이), ㄹ+ㄴ 동화 안 됨(한라산 → [할라산]), 모음 사이 ㄹ을 스페인어의 강한 r로(노래, 머리). 한 번에 하나만, 항상 모델과 반복으로 — 긴 설명은 하지 않습니다.",
    "자주 나오는 구조 오류: 좋아요/좋아해요 혼동(BTS가 좋아해요), '나이를 가지다'를 있어요로 직역, 동사를 문장 중간에, 3인칭에 -고 싶어요. 방을 돌며 채팅에 메모하고 마무리 때 돌려줍니다(지연 피드백). 독백은 절대 끊지 않습니다.",
    "90/10 규칙: 90%는 한국어. 스페인어·영어 설명은 3개 국어 덱과 Zoom 채팅에만 두고, 문장 전체를 번역하지 않습니다. 선생님이 스페인어를 하실 필요는 없어요: 바꿔 말하기, 제스처, 이미지가 더 효과적이고 그것도 학생들의 훈련입니다.",
    "에너지와 리듬: 학생들에게는 퇴근 후 밤 9시, 선생님께는 아침 9시예요. 카메라를 켜고 10분 스몰토크로 시작하고, 수업마다 학생 이름을 3번 이상 불러 주세요. 덱은 20분을 넘기지 않습니다 — 줄일 때는 설명을 줄이고 연습은 줄이지 않습니다.",
    "소그룹 구성: 강한 학생 + 중간 학생 (강한 학생 둘을 함께 두지 않기). 막히는 학생에게는 모델 문장 3개가 있는 '지원 카드', 여유 있는 학생에게는 -지만 / -는데 문장 하나 더. 랩에서는 방마다 리더를 정해 순서와 시간을 맡깁니다.",
    "진단과 평가: 1주차에 방을 돌며 학생별로 3가지(유창성, 발음, 개인 목표)를 시트에 적어 주세요. 8주차에는 수업 전에 음성(전후 자기소개, 독백)을 미리 듣고, 수업에서는 짝 롤플레이만 진행하며 루브릭(7장)을 적용합니다. 경계선에 있는 학생에게는 7일 기한의 말하기 보충 과제를 제안합니다.",
  ].forEach((x) => ch.push(bullet(x, { size: 20 })));

  ch.push(H2("어린이 한국어 · Coreano para Niños (8–15세) · Juega y aprende"));
  ch.push(P("8–15세 아이들을 위한 왕초보 한국어입니다. 게임, 노래, 그림으로 한글 읽기, 이름과 나이로 자기소개, 1–10 세기, 동물·가족·한국 음식 이름을 배웁니다. 8–10분마다 활동이 바뀌고, 매주 가족에게 Lector 복습 노트를 보냅니다. 마지막 수업은 가족 앞 미니 발표회와 수료증입니다. 정원 12명."));
  ch.push(caja([
    [run("역할 분담 (Jay · Abby)", { bold: true, size: 21, color: AZUL })],
    "Jay: 수업 흐름과 스페인어 설명, 새 내용 소개(그림·제스처·실물).",
    "Abby 선생님: 노래, 소리, 원어민 발음 모델, 몸으로 하는 게임(TPR)으로 새 내용 정착.",
    "소그룹 방: 각자 최대 6명. 같은 3가지 말하기 지표 사용 — ① 한국어 지시를 이해한다 ② 좋은 발음으로 따라 한다 ③ 혼자 문장을 말한다.",
  ]));
  ch.push(H3("주제와 목표"));
  ch.push(headTable(["회차", "주제 · 날짜 (KST)", "목표 (can-do)", "핵심 표현"], NIN_KO.map((w, i) => [
    String(i + 1), [{ t: w.t, o: { bold: true } }, { t: fKO(NIN_KR[i]), o: { color: GREY } }], w.obj, w.g.map((x) => "• " + x),
  ]), [600, 2100, 3400, 3260], 17));
  ch.push(H3("아이들 과제 (주 3–4일, 하루 약 20분 · 가족이 WhatsApp으로 제출)"));
  ch.push(headTable(["회차", "이번 주 과제"], NIN_KO.map((w, i) => [String(i + 1), w.tarea.map((x) => "• " + x)]), [700, 8660], 17));
  ch.push(H3("어린이반 · 선생님을 위한 메모"));
  [
    "8–10분마다 활동을 바꾸고 고정 신호(종소리, 또는 하나, 둘, 셋 박수)로 알려 주세요. 화면 → 몸 → 종이 순서로 돌리고, 누군가의 연결이 끊길 때를 대비해 예비 게임 2개(메모리, 빙고)를 준비합니다.",
    "발음: ㅓ가 'e'처럼 나오기 쉽고(열린 'o' 소리가 되어야 해요), ㅡ는 스페인어에 없는 소리(입술을 둥글게 하지 않고 미소), 모음 사이 ㄹ은 부드럽게(강한 l이 아님), 받침 ㅇ이 빠지기 쉽습니다('gan' ← 강). 음성학 설명 대신 거울·과장 놀이로 교정합니다.",
    "항상 교정할 것: 절하며 인사하기, 자기 이름 발음, 기본 모음 6개. 넘어가도 되는 것: 이에요/예요 혼동, 을/를 생략, 살 앞에 한자어 수. 이런 것은 나중에 Básico 1(A1.1)에서 다듬습니다.",
    "나이별 차별화: 8세는 글자 카드로 음절을 만들고 12세는 받침 있는 단어를 읽을 수 있어요. 같은 게임의 '쉬움'과 '도전' 버전을 준비하고, 큰 아이들을 도우미로 정하고, 수줍은 아이는 먼저 제스처나 그림으로 대답하게 해 주세요.",
    "가족 주간 노트 (수업 후 24시간 안에, 최대 3줄): 오늘 배운 것, Lector에서 복습할 정확한 탭, 집에서 연습할 문장 하나. 과제가 돌아오게 하는 가장 중요한 도구입니다. 종이 숙제보다 짧은 음성·영상을 부탁합니다. 발송 담당은 Jay와 나눠요.",
    "Zoom에서: 카메라 켜기, 2회차부터 화면 이름을 한글로, 채팅은 이모지만, 그림 그릴 때는 잔잔한 음악. 7회차부터 그림 대본으로 발표회를 리허설하고, 가족 초대는 1주 전에 보냅니다.",
    "아이들 얼굴이 나온 사진·영상은 SNS에 올리지 않습니다.",
  ].forEach((x) => ch.push(bullet(x, { size: 20 })));

  // 5. 체크리스트
  ch.push(H1("5. 첫 수업 전 체크리스트"));
  ch.push(P("부탁드리는 일 4가지와 마감일입니다 (한국 시간, 괄호 안은 칠레). 일정이 어려우시면 마감 전에 편하게 말씀해 주세요."));
  ch.push(headTable(["□", "할 일", "마감 (KST)", "내용"], [
    ["□", { t: "15초 자기소개 영상", o: { bold: true } }, "10월 1일(목) 10:00 (칠레 9월 30일(수) 22:00)", "세로(9:16), 얼굴 정면에 빛. 대본은 Jay의 WhatsApp 메시지 참고. 화질 유지를 위해 WhatsApp에 '문서'로 보내 주세요. 자막은 Jay가 넣습니다."],
    ["□", { t: "매주 반복 Zoom 링크 (회화 1 + 어린이반) 또는 학원 계정 사용 확인", o: { bold: true } }, "10월 7일(수) (칠레 10월 7일(수))", "소그룹 방(breakout rooms) 허용, 클라우드 녹화 켜기. 어린이반 호스트는 Jay와 정해요. 링크는 Jay가 첫 수업 전에 학생들에게 전달합니다."],
    ["□", { t: "프로그램과 첫 수업 확인", o: { bold: true } }, "10월 9일(금) (칠레 10월 9일(금))", "회화 1 1회차(오리엔테이션 + 말하기 진단), 어린이반 1회차(인사 + 모음). 필요한 자료나 질문을 Jay에게 알려 주세요."],
    ["□", { t: "학생 명단 받기 + 단톡방 관리자", o: { bold: true } }, "10월 12일(월) ~ 13일(화) (칠레 10월 11일(일) 밤 ~ 12일(월))", "Jay가 명단을 보내고 WhatsApp 단톡방(회화 1, 어린이반 가족방) 관리자로 추가합니다. 단톡방에 짧은 인사를 부탁드려요 (칠레 시간 + 한국 시간)."],
    ["□", "각 수업 첫 회 전날", "회화 1: 10월 13일(화) · 어린이반: 10월 19일(월)", "단톡방에 내일 수업을 알리고 Zoom(방 + 녹화)을 테스트합니다."],
  ], [450, 2500, 2300, 4110], 18));

  // 6. 매 수업
  ch.push(H1("6. 매 수업 진행 방법"));
  ch.push(H3("전날"));
  ["이번 주 덱과 활동지를 확인하고 5문항 퀴즈를 준비합니다 (2회차부터).", "단톡방에 내일 수업을 공지합니다: 칠레 시간 + 학생 나라 하나 (예: 'martes 21:00 Chile · 18:00 México').", "Zoom 테스트: 소그룹 방 허용, 클라우드 녹화 켜기."].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("60분 구조 · 회화 1"));
  ch.push(headTable(["분", "블록", "내용"], [
    ["5′", { t: "지난 수업 말하기 퀴즈", o: { bold: true } }, "지난 모듈에 대한 빠른 질문 5개(어휘 + 구조 하나), 말로 또는 Zoom 채팅으로. 음성 과제 질문도 여기서 정리합니다."],
    ["10′", { t: "워밍업: 짝 스몰토크", o: { bold: true } }, "2인 소그룹 방, 주제와 연결된 오늘의 질문(오늘 뭐 먹었어요? 이번 주에 뭐 들었어요?). 카메라 켜고 아직 교정 없이 — 입을 푸는 시간입니다."],
    ["20′", { t: "덱으로 문화 모듈", o: { bold: true } }, "실제 자료(짧은 클립, 사진, 메뉴, 지도)로 주제를 소개하고, 2–4개 구조를 맥락 속에서 보여 줍니다 (3개 국어 덱에 ES/EN 설명). 학생들은 예문을 따라 하고 자기 삶에 맞게 바꿔 말합니다."],
    ["20′", { t: "소그룹 말하기 연습", o: { bold: true } }, "결과가 있는 롤플레이·과제(계획, 주문, 추천), 2–3명씩. 선생님은 방을 돌며 듣고 1:1로 발음을 교정합니다."],
    ["5′", { t: "마무리와 과제", o: { bold: true } }, "지연 피드백(오늘의 공통 오류 2–3개), 음성 과제 모델 보여 주기, '수고했어요'로 인사. 5·8회차(랩)는 3·4번 블록을 합쳐 40분 말하기."],
  ], [700, 2300, 6360], 19));
  ch.push(H3("60분 구조 · 어린이반"));
  ch.push(headTable(["분", "블록", "내용"], [
    ["5′", { t: "인사와 노래", o: { bold: true } }, "절하며 안녕하세요, 이번 주 노래, 놀이식 출석: 아이마다 '네!' 하고 과제나 그림을 카메라에 보여 줍니다."],
    ["10′", { t: "놀이로 복습", o: { bold: true } }, "지난 수업 5분 퀴즈 게임(빙고, 메모리, 'Jay 가라사대'), Lector 과제 빠른 확인, 진도판 스티커."],
    ["20′", { t: "오늘의 새 내용", o: { bold: true } }, "10분 × 2: Jay가 그림·제스처·실물로 소개 → Abby 선생님이 몸으로 하는 게임(TPR)으로 목소리와 몸에 새깁니다."],
    ["20′", { t: "팀 활동", o: { bold: true } }, "Zoom 방 2개(각 최대 6명), Jay 방과 Abby 방: 그리기, 음절 만들기, 롤플레이, 읽기 빙고, 짝 인터뷰. 1:1 발음 교정."],
    ["5′", { t: "마무리와 가족 노트", o: { bold: true } }, "작별 노래, 오늘의 스티커, Lector의 정확한 탭으로 과제 설명. 수업 후 가족에게 WhatsApp 주간 노트."],
  ], [700, 2300, 6360], 19));
  ch.push(H3("수업 중"));
  ["0분부터 녹화합니다. 파일 이름: 과정_회차_날짜 (예: Conv1_S01_2026-10-14, Ninos_S01_2026-10-20).", "그룹이 느리면 설명을 줄이고, 말하기 연습은 줄이지 않습니다.", "모든 학생이 수업당 최소 3번 말합니다. 연습은 2–3명 방에서.", "자주 나온 오류 2–3개를 메모해 다음 수업을 그것으로 시작합니다."].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("수업 후 (24시간 안에)"));
  ["녹화 + 수업 PDF + 과제를 Drive 과정 폴더에 올리고 단톡방에 알립니다.", "시트에 출석과 퀴즈를 기록합니다.", "Jay에게 한 줄 메시지: '다 좋았어요 / ○○ 결석 / ○○에서 느림'.", "단톡방 질문에는 24시간 안에(근무 시간에) 답합니다.", "어린이반: 가족에게 3줄 주간 노트 (Jay와 분담)."].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("단톡방 안내 템플릿 · 회화 1 (한국어 + 스페인어)"));
  ch.push(caja([
    "오늘도 수고했어요! / ¡Buen trabajo hoy!",
    "녹화 / Grabación: [링크]",
    "과제 · 다음 수업 전까지 (칠레 화요일 21:00) / Tarea para antes de la próxima clase (martes 21:00, hora Chile):",
    "1) 음성 [60–90]초: [주제] / Audio de [60–90] s: [tema]",
    "2) [쓰기 과제] / [tarea escrita]",
    "다음 주에 만나요! / ¡Nos vemos la próxima semana! 화이팅",
  ], PAPEL, NAVY));
  ch.push(H3("가족 주간 노트 템플릿 · 어린이반 (가족은 스페인어 사용)"));
  ch.push(caja([
    "Hoy aprendimos: [ ... ]   (오늘 배운 것)",
    "Para repasar: Lector de Hangul → [pestaña exacta] · https://www.academiaseul.com/lector-coreano   (복습할 탭)",
    "Frase para practicar en casa: [ ... ]   (집에서 연습할 문장)",
    "Próxima clase: lunes [fecha], 18:00 (hora Chile)   (다음 수업 · 한국은 화요일 06:00)",
  ], PAPEL, NAVY));
  ch.push(H3("교정 방법 (Part III 요약)"));
  [
    "먼저 이해를 막는 것(뜻을 바꾸는 조사 오류, 문장 앞에 온 동사)을 고치고, 막지 않는 것(약한 외국어 억양)은 넘어갔다가 마지막에 다룹니다.",
    "발음: 스페인어 화자의 1번 오류는 ㅓ/ㅗ, ㅡ/ㅜ 구분과 격음·경음(ㅋㅌㅍㅊ vs ㄲㄸㅃㅆㅉ)입니다. 긴 설명 대신 '종이 테스트'와 최소대립쌍으로 교정합니다.",
    "문법 단서는 늘 받침입니다(이에요/예요 · 은/는 · 을/를 · 이/가). 학생이 틀리면 답을 주지 말고 '받침이 있어요?'라고 물어봐 주세요.",
    "서면 피드백: 학생당 주 최대 3가지, 칭찬 하나를 먼저.",
  ].forEach((x) => ch.push(bullet(x)));

  // 7. 평가
  ch.push(H1("7. 평가와 수료증"));
  ch.push(P("평가는 벌을 주기 위한 것이 아니라 방향을 잡기 위한 것입니다. 최종 점수는 참고용으로, 다음 단계로 갈 준비가 되었는지, 무엇을 보강할지 알려 줍니다."));
  ch.push(headTable(["항목", "비중", "측정 방법"], [
    ["수업 참여", "25 %", "출석(실시간 또는 녹화 시청 + 과제 제출)과 말하기 참여"],
    ["주간 과제", "25 %", "Lector / 활동지 / 음성·미니 일기, 다음 수업 전 제출"],
    ["퀴즈", "15 %", "매 수업 시작 5분 퀴즈 (2–8회차)"],
    ["최종 평가", "35 %", "8회차: 회화 1은 단계 말하기 평가, 어린이반은 미니 발표회"],
  ], [2400, 1000, 5960]));
  ch.push(H3("회화 1 · 최종 평가 (35 %)"));
  [
    "필기시험은 없습니다. 8회차 전에 음성 2개를 받습니다: ① 1주차 자기소개를 2–3분으로 다시 녹음('전과 후' 비교) ② 추첨된 모듈(K-pop, 여행, 음식, 한복, e-스포츠)에 대한 2분 독백 (읽지 않고 키워드 카드만).",
    "8회차 수업(12월 2일(수) 09:00): 짝과 선생님이 함께 한 쌍당 5분 — 3분 롤플레이(식당 또는 여행사 중 추첨) + 학생별 후속 질문 2개.",
    "음성은 수업 전에 미리 들어 두면 수업에서는 롤플레이만 남습니다. 8회차에 결석한 학생은 그 주 안에 10분 Zoom 약속으로 롤플레이를 봅니다.",
    "모듈 추첨 날짜(8회차 전 일요일)는 Jay와 확정합니다.",
  ].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("어린이반 · 발표회"));
  [
    "12월 8일(화) 06:00 (칠레 12월 7일(월) 18:00), 가족이 Zoom에 함께 들어옵니다. 필기시험은 없습니다.",
    "아이당 약 3분: ① 30–40초 자기소개(인사, 이름, 나이, 가족, 좋아하는 동물·음식) ② 한글 단어 5개 무작위로 읽기 ③ 그림을 보고 이해 질문 5개(선생님이 말한 동물·음식·숫자 가리키기).",
    "숫자 점수 대신 스티커 진도판과 매주 3가지 지표로 봅니다. 완벽한 문법이 아니라 알아듣게 말하고 용기 내어 말하는 것을 평가합니다.",
  ].forEach((x) => ch.push(bullet(x)));
  ch.push(espacio(60));
  ch.push(caja(["수료증: 코호트를 마치면 참여를 기준으로 발급합니다. 출석(전체 수업의 75 % 이상 — 실시간 참석 또는 녹화 시청 + 과제 제출)과 수업 참여를 봅니다. 최종 점수(다음 단계 진급 권장 기준 60 % 이상)는 레벨 추천입니다. 기준에 못 미치는 학생은 선생님 판단에 따라 보충 계획과 함께 진급하거나 다음 코호트에서 같은 단계를 다시 들을 수 있습니다."]));
  ch.push(H3("말하기 평가 루브릭"));
  ch.push(headTable(["기준", "4 · 우수", "3 · 좋음", "2 · 발전 중", "1 · 초기"], [
    ["이해", "보통 속도의 질문을 이해", "한 번 반복하면 이해", "바꿔 말해 줘야 이해", "질문을 따라가지 못함"],
    ["유창성", "긴 멈춤 없이 대답", "생각하느라 짧게 멈춤", "도움을 받아 짧은 문장", "단어만"],
    ["정확성", "조사·시제가 정확", "소통을 막지 않는 오류 1–2개", "잦은 오류, 이해는 됨", "소통을 막는 오류"],
    ["발음", "명확함, 모음·경음 정확", "약한 억양, 모두 이해됨", "가끔 ㅓ/ㅗ나 경음 혼동", "알아듣기 어려움"],
    ["어휘", "수업 어휘를 쓰고 넓힘", "수업 어휘를 씀", "제한적, 돌려 말하기", "매우 제한적"],
  ], [1300, 2050, 2050, 2050, 1910], 18));
  ch.push(espacio(60));
  ch.push(P("말하기 점수 = 5개 기준의 합(최대 20점). 회화 1 단계 평가에 사용하고, 어린이반 발표회에서는 간소화(이해 · 참여 · 발음)해서 사용합니다.", { spacing: { after: 100 } }));

  // 8. 비상 상황과 소통
  ch.push(H1("8. 비상 상황 대응과 소통"));
  ch.push(kvTable([
    ["수업을 할 수 없을 때", "알게 되는 즉시, 최소 48시간 전에 Jay에게 알려 주세요. 순서: 1) 대체 수업(Jay) · 2) 같은 주 안에 보강 · 3) 녹화 수업 + 20분 질의응답."],
    ["정전·인터넷 문제 (선생님)", "단톡방에 바로 알리고, 10분 안에 재개하지 못하면 그 주 안에 보강합니다."],
    ["학생의 기술 문제", "녹화본을 보내고 단톡방으로 질문을 받습니다. 출석은 인정됩니다."],
    ["수준 차이가 큰 그룹", "연습 시간에 수준별 소그룹, 과제는 기본/추가로 나눕니다. Jay에게 알려 반 변경을 검토합니다."],
    ["공휴일", "칠레 10월 12일(월) 공휴일 때문에 어린이반은 10월 20일(화)에 시작합니다. 수업 기간(10월 14일 ~ 12월 8일)에는 한국 공휴일이 없고(개천절·한글날은 개강 전), 칠레 공휴일(10월 31일(토), 11월 1일(일))도 수업일과 겹치지 않습니다. 그래도 일정을 옮겨야 하면 48시간 전에 알리고 보강이나 녹화를 제공합니다."],
    ["부적절한 행동", "먼저 개인적으로 주의를 주고, 반복되면 Jay에게 알려 주세요. 결정은 Jay가 합니다."],
    ["어린이반 (미성년자)", "아이들 얼굴이 나온 사진·영상은 SNS에 올리지 않습니다. 발표회 영상은 가족의 서면 동의가 있을 때만 학원 앨범에 보관합니다."],
  ], 2600));
  ch.push(H3("소통"));
  [
    "학생과: 과정별 WhatsApp 단톡방 (수업 관련 내용만). 질문에는 24시간 안에, 근무 시간에 답해 주세요.",
    "다른 학생의 개인 정보는 단톡방 밖으로 공유하지 않습니다.",
    "어린이반 가족과: 수업 후 24시간 안에 3줄 주간 노트. 발송 담당은 Jay와 나눕니다.",
    "학원(Jay)과: Drive 시트에 출석·퀴즈·점수를 수업 당일 기록 + 매 수업 후 한 줄 메시지. 1주차 체크인은 칠레 10월 16일(금) (한국 16일 밤 ~ 17일(토) 아침) — 편한 시간을 알려 주세요.",
    "수업 사진·영상을 SNS에 쓸 때는 반드시 그룹의 허락을 받습니다 (어린이반은 얼굴 없이).",
    "자료는 Drive 과정 폴더에 표준 이름으로 저장합니다: 과정_S01_날짜_주제.pdf.",
  ].forEach((x) => ch.push(bullet(x)));

  // 9. 자료와 링크
  ch.push(H1("9. 자료와 링크"));
  ch.push(kvTable([
    ["회화 1 프로그램 (PDF · 스페인어)", "https://www.academiaseul.com/programas/Programa_ConversacionalA21_Octubre_2026.pdf"],
    ["어린이반 프로그램 (PDF · 스페인어)", "https://www.academiaseul.com/programas/Programa_Ninos_Octubre_2026.pdf"],
    ["전체 프로그램 · Part III 교사 가이드 (영어판)", ["https://www.academiaseul.com/programas/Programa_Completo_Octubre_2026_EN.pdf", "스페인어판: https://www.academiaseul.com/programas/Programa_Completo_Octubre_2026_ES.pdf"]],
    ["한글 리더 · Lector de Hangul", "https://www.academiaseul.com/lector-coreano — 알파벳(Alfabeto) · 배우기(Aprender) · 연습(Practicar) · 진도(Progreso). 어린이반의 매주 과제이고, 회화 1에서는 선택 워밍업(타임어택)입니다."],
    ["두부 · Dubu (과제용 퍼즐)", "https://www.academiaseul.com/dubu — 자음 + 모음 → 단어를 읽거나 듣는 한글 퍼즐, 6개 동네 30단계. 어린이반 2–3회차 과제로 추천합니다."],
    ["무료 한글 워크숍 영상", "https://www.academiaseul.com/taller — 1시간짜리 한글 수업 영상. 늦게 합류했거나 복습이 필요한 가족에게."],
    ["회화 1 수업 자료", "3개 국어(ES/KO/EN) 덱 M01–M05, 회차별 활동지(PDF), 랩·평가용 카드, 참고서 Korean Grammar in Use · Beginning (필요할 때만 인용)."],
    ["어린이반 수업 자료", "학원 자체 그림 자료(PDF), 빙고 카드, 글자 카드, 스티커 진도판, 발표회 대본 템플릿, 인사·가족·숫자 노래(한글·스페인어 가사)."],
    ["Drive 과정 폴더", "[PLACEHOLDER: 회화 1 폴더 링크] · [PLACEHOLDER: 어린이반 폴더 링크]"],
    ["출석·점수 시트", "[PLACEHOLDER: 시트 링크]"],
    ["Zoom", "[PLACEHOLDER: 선생님이 10월 7일(수)까지 보내 주실 링크]"],
    ["WhatsApp 단톡방", "[PLACEHOLDER: 회화 1 단톡방] · [PLACEHOLDER: 어린이반 가족 단톡방]"],
  ], 2800));

  // 10. 연락처
  ch.push(H1("10. 연락처"));
  ch.push(kvTable([
    ["Jay (김재희) · WhatsApp", "+56 9 4211 5562 · https://wa.me/56942115562"],
    ["이메일", "hola.academiaseul@gmail.com"],
    ["웹사이트", "https://www.academiaseul.com"],
    ["인스타그램", "@academiaseul · @jaychingu.oficial"],
    ["시차 메모", "한국 오전 9시 = 칠레 전날 밤 9시 · 한국 오전 6시 = 칠레 전날 저녁 6시"],
  ], 2800));
  ch.push(espacio(240));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [run("8주 전에는 한글도 몰랐어요 — 8주 후에는 한국어로 이야기해요.", { bold: true, size: 23, color: AZUL })] }));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("함께해 주셔서 감사합니다, Abby 선생님! 화이팅!", { bold: true, size: 23, color: NAVY })] }));

  return makeDoc({ title: "교사 시작 키트 · Abby · 회화 1 + 어린이반 · 2026년 10월", header: "Academia Seúl · 교사 시작 키트 · Abby 홍미영 · 2026년 10월 코호트", footer: "www.academiaseul.com · 교사용 내부 문서", pagina: "페이지 ", children: ch });
}

(async () => {
  const docs = [["Kit_Kiran_Basico1_ES.docx", buildKiran()], ["Kit_Abby_Conversacional_Ninos_KO.docx", buildAbby()]];
  for (const [name, doc] of docs) {
    const file = path.join(OUT, name);
    fs.writeFileSync(file, await Packer.toBuffer(doc));
    console.log("OK", file);
  }
})().catch((e) => { console.error(e); process.exit(1); });
