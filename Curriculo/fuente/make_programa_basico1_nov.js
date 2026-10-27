// Programa descargable (docx) de Básico 1 · noviembre 2026 · «8 martes desde el 10 de noviembre» con Kiran.
// Campaña «Básico 1 · noviembre 2026» (decisiones de Jay, lun 26 oct 2026). Mismo formato y estilo que los programas
// de octubre (Lanzamiento_Octubre_2026/fuente/make_programas_pdf.js): US Letter, Arial, cabeceras navy #003478,
// títulos azules #4236F6, logo azul en portada. Nunca rojo.
//
// Contenido del curso (descripción, logros, 8 sesiones, material, bio de Kiran): lib/nivel1.ts, transpilado al vuelo.
// Fechas, ritmo, precios y horas por país: las decisiones de la campaña (constantes de abajo), para no depender de
// cómo quede lib/nivel1.ts mientras se edita. En lo público no va fecha de término: «8 martes desde el 10 de noviembre».
//
// Uso:  node Curriculo/fuente/make_programa_basico1_nov.js   (toma docx y typescript del node_modules del scratchpad)
// Salida: public/programas/Programa_Basico1_Noviembre_2026.docx (el PDF se exporta con Word, como los de octubre).
// El de octubre (Programa_Basico1_Octubre_2026.*) no se toca.
const fs = require("fs");
const path = require("path");

const SCRATCH = process.env.AS_SCRATCH ||
  "C:\\Users\\Chingu\\AppData\\Local\\Temp\\claude\\C--Users-Chingu-Desktop-ACADEMIASEULWEB\\d4111e1b-5523-44ea-97b2-b1a1d9545b9e\\scratchpad";
const req = (m) => { try { return require(m); } catch (e) { return require("module").createRequire(path.join(SCRATCH, "package.json"))(m); } };
const ts = req("typescript");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, ExternalHyperlink,
  WidthType, AlignmentType, BorderStyle, ShadingType, Footer, Header, PageNumber,
  TabStopType, VerticalAlign, PageBreak,
} = req("docx");

const REPO = path.resolve(__dirname, "..", "..");
const OUT = process.env.OUT_DIR || path.join(REPO, "public", "programas");
const ARCHIVO = "Programa_Basico1_Noviembre_2026.docx";

// ---- curso y profesora desde lib/nivel1.ts ----
const src = fs.readFileSync(path.join(REPO, "lib", "nivel1.ts"), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const D = mod.exports;
const CURSO = D.CURSOS.find((c) => c.cursoId === "a11");
const KIRAN = D.profeDe("guiran");

// ---- campaña (brief del 26 oct 2026) ----
const C = {
  inicio: "martes 10 de noviembre de 2026",
  ritmo: "8 martes desde el 10 de noviembre",
  horario: "Martes 20:00 a 21:00, hora de Chile",
  // Fechas públicas: las 4 primeras. Las clases 5 a 8 (8, 15, 22 y 29 dic; el 8 es feriado en Chile, [POR CONFIRMAR]
  // con Jay; si se salta, la 8 pasa al 5 ene) no se publican con fecha ni con mes.
  fechas: ["mar 10 nov", "mar 17 nov", "mar 24 nov", "mar 1 dic", "martes *", "martes *", "martes *", "martes *"],
  notaFechas: "* Las clases 5 a 8 siguen cada martes a la misma hora. Te confirmamos las fechas exactas en la clase 1.",
  lanzamiento: "US$120 el curso completo · o 2 cuotas de US$60",
  lanzamientoHasta: "domingo 8 de noviembre",
  lanzamientoClp: "$120.000 CLP · o 2 cuotas de $60.000",
  normal: "US$150 el curso completo · o 2 cuotas de US$75",
  normalClp: "$150.000 CLP · o 2 cuotas de $75.000",
  cierre: "lunes 9 de noviembre a las 23:59, hora de Chile (o antes, si se completan los cupos)",
  cupos: 15,
  inscripcion: "https://academiaseul.com/inscribete?clase=a11-martes",
  inscripcionTxt: "academiaseul.com/inscribete",
  whatsapp: "https://wa.me/56942115562?text=" + encodeURIComponent("Hola Jay, quiero inscribirme en Básico 1 con el precio de lanzamiento"),
};
// Martes 20:00 en Chile (UTC-3 todo el curso). Entre el 10 nov y fin de diciembre ningún país cambia de hora.
const HORAS = [
  ["Chile · Argentina · Uruguay", "Martes 20:00"],
  ["Venezuela · Bolivia · República Dominicana", "Martes 19:00"],
  ["Colombia · Perú · Ecuador · Panamá", "Martes 18:00"],
  ["EE.UU. (hora del Este)", "Martes 18:00"],
  ["México (CDMX) · Centroamérica (salvo Panamá)", "Martes 17:00"],
  ["España", "Miércoles 00:00 (medianoche)"],
  ["Corea", "Miércoles 08:00"],
];

// ---- estilo de la casa (helpers de make_programas_pdf.js) ----
const AZUL = "4236F6", NAVY = "003478", INK = "1B1C24", GREY = "5C5F6B";
const LINE = "CCCCCC", TINT = "EEF1F6", ZEBRA = "F7F8FA", FONT = "Arial";
const OROTINT = "FBF3DF", ORO = "E8B84B";
const CONTENT_W = 9360;
const primero = (...fs_) => fs_.find((f) => fs.existsSync(f));
const LOGO = fs.readFileSync(primero(path.join(SCRATCH, "logo-azul.png"), path.join(REPO, "A1_Nivel_1", "fuente", "logo-azul.png"))); // 2852×984
const SELLO_F = primero(path.join(SCRATCH, "igpost", "sello-azul.png"), path.join(REPO, "public", "email", "sello-azul.png"));
const SELLO = fs.readFileSync(SELLO_F);

const run = (t, o = {}) => new TextRun(Object.assign({ text: t, font: FONT, size: 22, color: INK }, o));
const link = (t, url, o = {}) => new ExternalHyperlink({ link: url, children: [run(t, Object.assign({ color: AZUL, underline: {} }, o))] });
const P = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new Paragraph(Object.assign({ children: c, spacing: { after: 130, line: 296 } }, o)); };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };
const cellP = (t, o = {}, po = {}) => new Paragraph(Object.assign({ children: [run(t, o)], spacing: { after: 0, line: 264 } }, po));
const cell = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new TableCell(Object.assign({ children: c, verticalAlign: VerticalAlign.CENTER, margins: { top: 70, bottom: 70, left: 100, right: 100 } }, o)); };
function headTable(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  if (total !== CONTENT_W) { const f = CONTENT_W / total; widths = widths.map((w) => Math.round(w * f)); widths[widths.length - 1] += CONTENT_W - widths.reduce((a, b) => a + b, 0); }
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, borders: allBorders, rows: [
    new TableRow({ tableHeader: true, children: headers.map((h, i) => cell([cellP(h, { bold: true, color: "FFFFFF", size: 19 })], { width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: NAVY } })) }),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => {
      const parts = Array.isArray(c) ? c : [{ t: c }];
      return cell(parts.map((p) => cellP(p.t, Object.assign({ size: 20 }, p.o || {}))), { width: { size: widths[i], type: WidthType.DXA }, shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: ZEBRA } : undefined });
    }) })),
  ] });
}
const H1 = (t, opts = {}) => new Paragraph(Object.assign({ children: [run(t, { bold: true, size: 28 })], spacing: { before: 360, after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }, keepNext: true }, opts));
const H2 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 23, color: AZUL })], spacing: { before: 220, after: 110 }, keepNext: true });
const bullet = (c) => new Paragraph({ children: [run("•  ", { color: AZUL, bold: true }), ...(Array.isArray(c) ? c : [run(c)])], spacing: { after: 80, line: 288 }, indent: { left: 360, hanging: 240 } });
function caja(parts, fill = TINT, border = AZUL) {
  const b = { style: BorderStyle.SINGLE, size: 8, color: border };
  const paras = Array.isArray(parts[0]) ? parts : [parts];
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], borders: { top: b, bottom: b, left: b, right: b },
    rows: [new TableRow({ children: [cell(paras.map((p, i) => new Paragraph({ children: p, spacing: { after: i < paras.length - 1 ? 80 : 0, line: 288 } })), { shading: { type: ShadingType.CLEAR, fill }, margins: { top: 110, bottom: 110, left: 160, right: 160 } })] })] });
}
const espacio = (n = 120) => new Paragraph({ children: [run("", { size: 8 })], spacing: { after: n } });

function portada() {
  const lineas = [
    "Programa del curso · Noviembre 2026",
    "Paso 1 de la escalera · desde cero",
    `Martes 20:00 hora de Chile · ${KIRAN.nombre}`,
    `${C.ritmo} · 60 min por clase · certificado incluido`,
  ];
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 300 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 232, height: 80 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 160, after: 60 }, children: [run(CURSO.koreanTitle, { bold: true, size: 40, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [run(CURSO.nombreCorto, { bold: true, size: 48 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 320 }, children: [run(`${CURSO.subtitulo} · Coreano desde cero con Kiran`, { italics: true, size: 24, color: GREY })] }),
    ...lineas.map((l) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 70 }, children: [run(l, { size: 23 })] })),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 260, after: 40 }, children: [run("Precio de lanzamiento: ", { bold: true, size: 23, color: NAVY }), run(C.lanzamiento, { bold: true, size: 23, color: NAVY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 70 }, children: [run(`hasta el ${C.lanzamientoHasta} · después, ${C.normal}`, { size: 20, color: GREY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 420 }, children: [new ImageRun({ type: "png", data: SELLO, transformation: { width: 90, height: 87 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("www.academiaseul.com · +56 9 4211 5562 · @academiaseul", { size: 19, color: GREY })] }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function docShell(children) {
  return new Document({
    creator: "Academia Seúl",
    title: "Programa Básico 1 (A1.1) · Noviembre 2026",
    styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1150, bottom: 1100, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run("Academia Seúl · Programa Básico 1 (A1.1) · Noviembre 2026", { size: 16, color: GREY })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
        children: [run("www.academiaseul.com · Básico 1 · noviembre 2026", { size: 16, color: GREY }), new TextRun({ text: "\t", font: FONT }),
          new TextRun({ children: ["Página ", PageNumber.CURRENT], font: FONT, size: 16, color: GREY })] })] }) },
      children,
    }],
  });
}

async function main() {
  const ch = [];
  ch.push(...portada());

  ch.push(H1("1. El curso en una página"));
  ch.push(P(run(CURSO.descripcion)));
  ch.push(headTable(["Dato", "Detalle"], [
    ["Nivel", `${CURSO.cefr} · desde cero${CURSO.alias ? " · antes: " + CURSO.alias : ""}`],
    ["Inicio", `${C.inicio[0].toUpperCase()}${C.inicio.slice(1)}`],
    ["Ritmo", `${C.ritmo} · 1 clase en vivo por semana · 60 minutos`],
    ["Horario", `${C.horario} · ${KIRAN.nombre}`],
    ["Modalidad", "En vivo por Zoom · grabación disponible 24 h después de cada clase"],
    ["Material", CURSO.libro],
    ["Cupos", `Máximo ${C.cupos} personas`],
    ["Precio de lanzamiento", `${C.lanzamiento} (hasta el ${C.lanzamientoHasta})`],
    ["Precio normal", `${C.normal} (desde el lunes 9 de noviembre)`],
    ["Inscripciones", `Hasta el ${C.cierre}`],
    ["Certificado", "Incluido — certificado de Academia Seúl del nivel cursado, por asistencia y participación"],
  ], [2300, 7060]));

  ch.push(H2("Al terminar vas a poder"));
  CURSO.logros.forEach((l) => ch.push(bullet(l)));
  ch.push(bullet("Hablar de ti 1 a 2 minutos seguidos, sin leer: tu proyecto final «Yo en coreano»"));

  ch.push(H2("Tu profesora"));
  ch.push(P([run(`${KIRAN.nombre}. `, { bold: true }), run(KIRAN.bio)]));

  ch.push(H1("2. Calendario clase a clase", { pageBreakBefore: true }));
  ch.push(P([run("Cada clase dura 60 minutos: "), run("quiz de la clase anterior · lección con slides · práctica guiada · práctica oral en parejas con corrección · cierre y tarea", { bold: true }), run(". La práctica de lectura (sílabas, números) se hace de tarea en el Lector de Hangul con audio nativo, así la hora en vivo se usa para hablar y ser corregido. La romanización solo te acompaña en las clases 1 y 2; después, puro 한글.")]));
  ch.push(H2(`Martes 20:00 (hora de Chile) · ${KIRAN.nombre} · ${C.ritmo}`));
  ch.push(headTable(["#", "Fecha", "Clase", "Qué vemos"], CURSO.sesiones.map((s, i) => [
    String(s.num), C.fechas[i], [{ t: s.titulo, o: { bold: true } }], s.desc,
  ]), [500, 1300, 3000, 4560]));
  ch.push(P(run(C.notaFechas, { size: 18, italics: true, color: GREY }), { spacing: { before: 80 } }));
  ch.push(espacio(80));

  ch.push(H1("3. Cómo estudiar entre clases"));
  [
    "Lector de Hangul (academiaseul.com/lector-coreano): 10–15 minutos al día. Es gratis, tiene audio nativo y va rotando los ejercicios para que nunca sea la misma práctica.",
    "Hoja de actividad de cada clase: 30–45 minutos. Se entrega al terminar la clase y se revisa en el quiz de la siguiente.",
    "Un audio corto (20 a 45 segundos) en el grupo de WhatsApp del curso, con una corrección breve de Kiran.",
    "Grabación: si faltaste, mírala antes de la próxima clase; si asististe, vuelve a ver solo la parte oral.",
    "Habla en voz alta. Leer en silencio no cuenta: cada ejemplo del material se dice en voz alta al menos una vez.",
  ].forEach((t) => ch.push(bullet(t)));

  ch.push(H1("4. Evaluación y certificado"));
  ch.push(P(run("El certificado está incluido en el curso y se entrega al terminar (en la última clase o por correo esa misma semana). Se otorga por asistencia y participación; la clase 8 incluye una evaluación de cierre y tu mini-presentación «Yo en coreano», que sirven para ubicarte en el siguiente peldaño, no para “reprobar”.")));
  ch.push(caja([run("Después de este curso: ", { bold: true, size: 21, color: AZUL }), run("Básico 2 (A1.2), el curso que te lleva del presente al pasado y al futuro. Te avisamos las fechas del próximo grupo antes de terminar.", { size: 21 })]));

  ch.push(H1("5. Horarios en tu país"));
  ch.push(P(run("La clase es los martes a las 20:00, hora de Chile (UTC−3 durante todo el curso). Mientras dura el curso, ningún país de esta tabla cambia de hora:")));
  ch.push(headTable(["País", "Hora de la clase"], HORAS, [5600, 3760]));
  ch.push(P(run("En la página de inscripción eliges tu país y ves la hora exacta.", { size: 18, italics: true, color: GREY }), { spacing: { before: 80 } }));

  ch.push(H1("6. Inscripción y pago"));
  ch.push(caja([
    [run("Precio de lanzamiento (−20 %): ", { bold: true, size: 22, color: NAVY }), run(`${C.lanzamiento}`, { bold: true, size: 22 }), run(` · hasta el ${C.lanzamientoHasta} a las 23:59, hora de Chile.`, { size: 22 })],
    [run(`En pesos chilenos: ${C.lanzamientoClp}.`, { size: 20, color: GREY })],
    [run("Precio normal, desde el lunes 9 de noviembre: ", { bold: true, size: 21, color: NAVY }), run(`${C.normal} (${C.normalClp}).`, { size: 21 })],
  ], OROTINT, ORO));
  ch.push(espacio(60));
  ch.push(bullet("En 2 cuotas: la primera al inscribirte y la segunda antes de la clase 5."));
  ch.push(bullet([run("Inscripción: "), link(C.inscripcionTxt, C.inscripcion, { bold: true }), run(` — eliges la clase del martes, completas tus datos y pagas. Inscripciones hasta el ${C.cierre}.`)]));
  ch.push(bullet([run("Precio de lanzamiento: lo pagas desde la página de inscripción o escribiéndonos por "), link("WhatsApp", C.whatsapp, { bold: true }), run(" y te enviamos el link de pago.")]));
  ch.push(bullet("Formas de pago: transferencia bancaria en Chile (sin comisión), tarjeta de crédito/débito vía Mercado Pago, o PayPal en dólares (también con tarjeta)."));
  ch.push(bullet("Tu cupo queda confirmado cuando recibimos el pago completo o la primera cuota. Si Academia Seúl cancela la clase antes de empezar, te devolvemos el 100 % de lo pagado (academiaseul.com/terminos)."));
  ch.push(bullet("Dudas o ayuda para saber si es tu curso: WhatsApp +56 9 4211 5562 (Jay) · hola.academiaseul@gmail.com"));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 320 }, children: [run("Aprende coreano con un chingu. 화이팅!", { bold: true, size: 24, color: AZUL })] }));

  const buf = await Packer.toBuffer(docShell(ch));
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(OUT, ARCHIVO);
  fs.writeFileSync(file, buf);
  console.log("ok", file);
}
main().catch((e) => { console.error(e); process.exit(1); });
