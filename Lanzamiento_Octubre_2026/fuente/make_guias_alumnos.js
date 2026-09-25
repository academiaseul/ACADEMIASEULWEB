// Guías para ALUMNOS · Cohorte octubre 2026 (docx, US Letter, Arial, estilo de la casa).
//   a) Lanzamiento_Octubre_2026/alumnos/Guia_Alumno_Octubre_2026.docx          (adultos: Básico 1, Básico 2, Conversacional 1, TOPIK II)
//   b) Lanzamiento_Octubre_2026/alumnos/Guia_Familias_Ninos_Octubre_2026.docx  (apoderados de Coreano para Niños 8–15)
// Datos: lib/nivel1.ts (transpilado: clases, profes, TZ_ROWS, precios, links de pago)
//      + Programa_Completo_Octubre_2026/fuente/textos_generales.js (clase, evaluación, certificado, normas)
//      + Programa_Completo_Octubre_2026/fuente/cursos_es.json (estructura de la clase de Niños).
// Ejecutar desde el scratchpad (necesita docx + typescript):  node lanzamiento/make_guias_alumnos.js
// Copia versionada en Lanzamiento_Octubre_2026/fuente/make_guias_alumnos.js. No exporta PDF (lo hace export_pdfs.ps1).
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  WidthType, AlignmentType, BorderStyle, ShadingType, Footer, Header, PageNumber,
  TabStopType, VerticalAlign, PageBreak,
} = require("docx");

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const OUT = path.join(REPO, "Lanzamiento_Octubre_2026", "alumnos");
fs.mkdirSync(OUT, { recursive: true });
const SCRATCH_ABS = "C:\\Users\\Chingu\\AppData\\Local\\Temp\\claude\\C--Users-Chingu-Desktop-ACADEMIASEULWEB\\d4111e1b-5523-44ea-97b2-b1a1d9545b9e\\scratchpad";
const SCRATCH = fs.existsSync(path.join(__dirname, "..", "logo-azul.png")) ? path.join(__dirname, "..") : SCRATCH_ABS;

// ---- lib/nivel1.ts (fuente única) ----
const src = fs.readFileSync(path.join(REPO, "lib", "nivel1.ts"), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const D = mod.exports;

const FUENTE = path.join(REPO, "Programa_Completo_Octubre_2026", "fuente");
const T = require(path.join(FUENTE, "textos_generales.js")).es;
const CURSOS_ES = JSON.parse(fs.readFileSync(path.join(FUENTE, "cursos_es.json"), "utf8"));

// ---- estilo de la casa (sin rojo: azul, navy, oro, tinta, gris) ----
const AZUL = "4236F6", NAVY = "003478", INK = "1B1C24", GREY = "5C5F6B", ORO = "E8B84B";
const LINE = "CCCCCC", TINT = "EEF1F6", ZEBRA = "F7F8FA", CREMA = "FBF6E9", FONT = "Arial";
const CONTENT_W = 9360;
// Arial para latín; Malgun Gothic (sans) para 한글, así el coreano no cae en Batang (serif).
const FONTS = { ascii: FONT, hAnsi: FONT, cs: FONT, eastAsia: "Malgun Gothic" };
const LOGO = fs.readFileSync(path.join(SCRATCH, "logo-azul.png"));
const SELLO = fs.readFileSync(path.join(SCRATCH, "igpost", "sello-azul.png"));

const run = (t, o = {}) => new TextRun(Object.assign({ text: t, font: FONTS, size: 22, color: INK }, o));
const P = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new Paragraph(Object.assign({ children: c, spacing: { after: 130, line: 296 } }, o)); };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };
const cellP = (t, o = {}, po = {}) => new Paragraph(Object.assign({ children: [run(t, o)], spacing: { after: 0, line: 264 } }, po));
const cell = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new TableCell(Object.assign({ children: c, verticalAlign: VerticalAlign.CENTER, margins: { top: 70, bottom: 70, left: 100, right: 100 } }, o)); };
function fitWidths(widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  if (total === CONTENT_W) return widths;
  const f = CONTENT_W / total; const w = widths.map((x) => Math.round(x * f));
  w[w.length - 1] += CONTENT_W - w.reduce((a, b) => a + b, 0); return w;
}
// celdas: string | [{t, o}] (varias líneas)
function headTable(headers, rows, widths, size = 20) {
  widths = fitWidths(widths);
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, borders: allBorders, rows: [
    new TableRow({ tableHeader: true, children: headers.map((h, i) => cell([cellP(h, { bold: true, color: "FFFFFF", size: 19 })], { width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: NAVY } })) }),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => {
      const parts = Array.isArray(c) ? c : [{ t: c }];
      return cell(parts.map((p) => cellP(p.t, Object.assign({ size }, p.o || {}))), { width: { size: widths[i], type: WidthType.DXA }, shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: ZEBRA } : undefined });
    }) })),
  ] });
}
// keep = true → la tabla no se parte entre páginas (keepNext en todas las filas menos la última).
function kvTable(rows, w1 = 2400, keep = false) {
  const w2 = CONTENT_W - w1;
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [w1, w2], borders: allBorders, rows: rows.map((r, ri) => {
    const po = keep && ri < rows.length - 1 ? { keepNext: true } : {};
    return new TableRow({ cantSplit: true, children: [
      cell([cellP(r[0], { bold: true, size: 19, color: NAVY }, po)], { width: { size: w1, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: TINT } }),
      cell((Array.isArray(r[1]) ? r[1] : [r[1]]).map((x) => cellP(x, { size: 20 }, po)), { width: { size: w2, type: WidthType.DXA } }),
    ] });
  }) });
}
const H1 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 30 })], spacing: { before: 380, after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }, keepNext: true });
const H2 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 24, color: AZUL })], spacing: { before: 240, after: 110 }, keepNext: true });
const H3 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 21, color: NAVY })], spacing: { before: 160, after: 80 }, keepNext: true });
const kids = (t, o = {}) => (Array.isArray(t) ? t : typeof t === "string" ? [run(t, o)] : [t]);
const bullet = (t, o = {}) => new Paragraph({ children: [run("•  ", { color: AZUL, bold: true }), ...kids(t, o)], spacing: { after: 70, line: 288 }, indent: { left: 360, hanging: 240 } });
const num = (i, t) => new Paragraph({ children: [run(i + ".  ", { color: AZUL, bold: true }), ...kids(t)], spacing: { after: 70, line: 288 }, indent: { left: 400, hanging: 300 } });
const check = (t) => new Paragraph({ children: [new TextRun({ text: "\u2610  ", font: "Segoe UI Symbol", size: 24, color: AZUL }), ...kids(t)], spacing: { after: 90, line: 288 }, indent: { left: 420, hanging: 340 } });
const B = (t, o = {}) => run(t, Object.assign({ bold: true }, o));
function caja(parts, fill = TINT, border = AZUL) {
  const b = { style: BorderStyle.SINGLE, size: 8, color: border };
  const paras = (Array.isArray(parts[0]) ? parts : [parts]).map((p, i, arr) => new Paragraph({ children: p, spacing: { after: i === arr.length - 1 ? 0 : 80, line: 288 } }));
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], borders: { top: b, bottom: b, left: b, right: b },
    rows: [new TableRow({ cantSplit: true, children: [cell(paras, { shading: { type: ShadingType.CLEAR, fill }, margins: { top: 120, bottom: 120, left: 160, right: 160 } })] })] });
}
const espacio = (n = 120) => new Paragraph({ children: [run("", { size: 8 })], spacing: { after: n } });
const salto = () => new Paragraph({ children: [new PageBreak()] });

// ---- fechas (Chile) ----
const DIAS = { Lunes: 0, Martes: 1, "Miércoles": 2, Jueves: 3 };
const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MES_LARGO = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const DIA_ABR = { Lunes: "lun", Martes: "mar", "Miércoles": "mié", Jueves: "jue" };
/** Las 8 fechas de una clase (Date UTC). Niños (lunes) parte el 19: el lunes 12 es feriado en Chile. */
function fechasDe(dia) {
  const base = Date.UTC(2026, 9, 12) + (dia === "Lunes" ? 7 * 86400000 : 0);
  return Array.from({ length: 8 }, (_, w) => new Date(base + (w * 7 + DIAS[dia]) * 86400000));
}
/** "13, 20 y 27 oct · 3, 10, 17 y 24 nov · 1 dic" */
function fechasCompactas(dia) {
  const grupos = [];
  for (const d of fechasDe(dia)) {
    const m = d.getUTCMonth();
    if (!grupos.length || grupos[grupos.length - 1].m !== m) grupos.push({ m, dias: [] });
    grupos[grupos.length - 1].dias.push(d.getUTCDate());
  }
  return grupos.map((g) => (g.dias.length > 1 ? g.dias.slice(0, -1).join(", ") + " y " + g.dias[g.dias.length - 1] : String(g.dias[0])) + " " + MES[g.m]).join(" · ");
}
const fechaLarga = (dia, d) => `${dia.toLowerCase()} ${d.getUTCDate()} de ${MES_LARGO[d.getUTCMonth()]}`;

// Sanidad: las primeras clases de nivel1.ts deben coincidir con el cálculo.
for (const c of D.CLASES) {
  const calc = fechaLarga(c.dia, fechasDe(c.dia)[0]);
  if (calc !== c.primeraClase) throw new Error(`Fecha de 1.ª clase no cuadra para ${c.id}: ${calc} ≠ ${c.primeraClase}`);
}

// ---- datos derivados ----
const WEB = "www.academiaseul.com";
const PDF_URL = (cursoId) => "academiaseul.com" + D.pdfDe(cursoId);
const NOMBRE_CLASE = { "a11-martes": "Básico 1 (A1.1) · martes", "a11-jueves": "Básico 1 (A1.1) · jueves", a12: "Básico 2 (A1.2)", a21: "Conversacional 1 (A2.1)", topik2: "TOPIK II (B1+)", ninos: "Coreano para Niños (8–15)" };
const ORDEN_SEMANA = ["a11-martes", "a21", "a12", "a11-jueves", "topik2"]; // orden cronológico de la semana 1
const ADULTOS = ORDEN_SEMANA.map((id) => D.CLASES.find((c) => c.id === id));
const NINOS = D.CLASES.find((c) => c.id === "ninos");
const CURSO_NINOS = D.cursoPorId("ninos");
const profeNombre = (c) => D.profeDe(c.profeId).nombre;
const PRECIO = D.precioLabel(); // "US$150 el curso completo · o 2 cuotas de US$75"
if (PRECIO !== "US$150 el curso completo · o 2 cuotas de US$75") throw new Error("Precio distinto al literal acordado: " + PRECIO);
const CUOTA2 = "semana del 9 de noviembre [POR CONFIRMAR]";
const CLP_UNICO = D.CLP_UNICO.toLocaleString("es-CL").replace(/,/g, ".");
const CLP_CUOTA = D.CLP_MENSUAL.toLocaleString("es-CL").replace(/,/g, ".");
const WA = "+56 9 4211 5562";
const MAIL = "hola.academiaseul@gmail.com";

const contactoRows = [
  ["WhatsApp", `${WA} (Jay) · wa.me/${D.WHATSAPP} · respondemos dentro de 24 horas, en horario hábil`],
  ["Correo", MAIL],
  ["Web", `${WEB} · horarios en tu país en /programa · Lector de Hangul en /lector-coreano · Dubu en /dubu`],
  ["Instagram", "@academiaseul · @jaychingu.oficial"],
  ["YouTube", "@JayChingu.Oficial"],
];

function portada(o) {
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 300 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 232, height: 80 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 }, children: [run(o.kor, { bold: true, size: 40, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [run(o.titulo, { bold: true, size: 48 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 320 }, children: [run(o.sub, { italics: true, size: 24, color: GREY })] }),
    ...o.lineas.map((l) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 70 }, children: [run(l, { size: 23 })] })),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 500 }, children: [new ImageRun({ type: "png", data: SELLO, transformation: { width: 90, height: 87 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run(`${WEB} · ${WA} · @academiaseul`, { size: 19, color: GREY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [run(o.nota, { size: 17, color: GREY, italics: true })] }),
    salto(),
  ];
}
function indice(items) {
  return [H1("En esta guía"), ...items.map((s, i) => P([run(`${i + 1}.  `, { bold: true, color: AZUL }), run(s)], { spacing: { after: 40 } }))];
}
function documento(header, children) {
  return new Document({
    creator: "Academia Seúl", title: header,
    styles: { default: { document: { run: { font: FONTS, size: 22, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1150, bottom: 1100, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(header, { size: 16, color: GREY })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }], children: [run(`${WEB} · WhatsApp ${WA} · Cohorte octubre 2026`, { size: 16, color: GREY }), new TextRun({ text: "\t", font: FONT }), new TextRun({ children: ["Página ", PageNumber.CURRENT], font: FONT, size: 16, color: GREY })] })] }) },
      children,
    }],
  });
}
const tzRow = (hora) => D.TZ_ROWS.find((r) => r.horaChile === hora);

// =====================================================================
// a) GUÍA DEL ALUMNO (adultos)
// =====================================================================
function guiaAlumno() {
  const ch = [];
  ch.push(...portada({
    kor: "환영합니다!", titulo: "Tu curso empieza", sub: "Guía del alumno · Cohorte octubre 2026",
    lineas: ["Básico 1 · Básico 2 · Conversacional 1 · TOPIK II", "8 semanas · 1 clase en vivo de 60 minutos por Zoom · certificado incluido", "Semana del 12 de octubre → semana del 30 de noviembre de 2026"],
    nota: "Versión 1.0 · 25 de septiembre de 2026 · Horarios y datos: academiaseul.com/programa (fuente única). Si algo cambia, te avisamos por el grupo de tu curso.",
  }));
  const secs = ["Bienvenida", "Tu clase y tus fechas", "Tu hora en tu país", "Cómo es una clase de 60 minutos", "Qué necesitas", "Checklist para tu clase 1", "Grabaciones", "Tareas y práctica entre clases", "Evaluación y certificado", "Pagos", "Normas del curso", "El grupo de WhatsApp de tu curso", "Hitos del curso", "Preguntas rápidas", "Contacto"];
  ch.push(...indice(secs));
  let n = 0; const S = () => `${++n}. ${secs[n - 1]}`;

  // 1 · Bienvenida
  ch.push(H1(S()));
  ch.push(P([B("¡Hola, chingu! 안녕하세요.")]));
  ch.push(P(run("Soy Jay Kim (김재희), fundador de Academia Seúl. Nací en Seúl y crecí en Chile desde los 10 años, así que sé lo que es aprender un idioma desde cero. Gracias por confiar en nosotros: desde la semana del 12 de octubre vamos a estar juntos 8 semanas, con una clase en vivo por semana.")));
  ch.push(P(run("En esta guía está todo lo práctico: tu horario (también en la hora de tu país), cómo es una clase, qué necesitas tener listo, cómo funcionan las tareas, las grabaciones, la evaluación, el certificado y los pagos. Léela una vez con calma y guárdala en el celular: casi todas las dudas se responden aquí.")));
  ch.push(P(run("Una sola regla de oro: equivocarse es parte del curso. En coreano, como en todo, se aprende hablando. 화이팅!")));
  ch.push(caja([
    [B("Lo más importante en 3 líneas", { color: NAVY })],
    [B("1. ", { color: AZUL }), run("El lunes 12 de octubre a las 9:00 (hora Chile) te llega un correo con tu link de Zoom, el link del grupo de WhatsApp de tu curso y esta guía.")],
    [B("2. ", { color: AZUL }), run("24 horas antes de tu primera clase te llega un recordatorio (correo y grupo de WhatsApp).")],
    [B("3. ", { color: AZUL }), run(`Si algo no te llega, escríbeme al WhatsApp ${WA}.`)],
  ]));

  // 2 · Tu clase y tus fechas
  ch.push(H1(S()));
  ch.push(P(run("Cada curso tiene 1 clase en vivo por semana, el mismo día y a la misma hora, durante 8 semanas. Todas las horas de esta guía son hora de Chile (UTC−3 durante todo el curso). Busca tu clase:")));
  ch.push(headTable(["Curso", "Día y hora (Chile)", "Profe", "1.ª clase", "Las 8 sesiones"],
    ADULTOS.map((c) => [
      [{ t: NOMBRE_CLASE[c.id], o: { bold: true } }, { t: D.cursoDe(c).subtitulo, o: { color: GREY, size: 18 } }],
      `${c.dia} ${c.horaChile}`,
      D.profeDe(c.profeId).corto,
      fechaLarga(c.dia, fechasDe(c.dia)[0]).replace(/^./, (x) => x.toUpperCase()),
      fechasCompactas(c.dia),
    ]), [2300, 1300, 900, 1700, 3160], 19));
  ch.push(espacio(60));
  ch.push(bullet([B("Básico 1 (A1.1)"), run(" tiene dos secciones iguales, martes o jueves a las 20:00, con Kiran. Vas a la que elegiste al inscribirte (puedes cambiarte hasta la semana 2, según cupo).")]));
  ch.push(bullet([B("Conversacional 1 (A2.1)"), run(" se dicta desde Corea: para Abby es miércoles a las 09:00.")]));
  ch.push(bullet([B("TOPIK II (B1+)"), run(" es un grupo chico: máximo 8 personas.")]));
  ch.push(bullet([run("¿Tu hijo o hija está en "), B("Coreano para Niños (8–15)"), run("? Es los lunes 18:00 y parte el lunes 19 de octubre: hay una guía aparte para familias.")]));
  ch.push(bullet(run("Conversacional 2 (A2.2) abre en enero de 2027, como continuación de Conversacional 1.", { color: GREY })));
  ch.push(H2("Tus profes"));
  ch.push(headTable(["Profe", "Curso", "Perfil"], ["guiran", "abby", "jay"].map((id) => { const p = D.profeDe(id); return [p.nombre, p.id === "abby" ? "Conversacional 1 (y Niños, con Jay)" : p.rol, p.bio]; }), [2000, 2600, 4760], 19));
  ch.push(H2("El programa de tu curso (PDF)"));
  ch.push(P(run("Semana a semana: tema, gramática, vocabulario, tarea y cultura. Échale una mirada a la semana 1 antes de tu primera clase.")));
  ch.push(kvTable([
    ["Básico 1 (A1.1)", PDF_URL("a11")], ["Básico 2 (A1.2)", PDF_URL("a12")], ["Conversacional 1 (A2.1)", PDF_URL("a21")], ["TOPIK II (B1+)", PDF_URL("topik2")],
    ["Todos los cursos", "academiaseul.com" + D.PROGRAMA_GENERAL_PDF], ["Programa completo", "academiaseul.com" + D.PROGRAMA_COMPLETO_PDF.es + " (incluye la guía de profesores)"],
  ], 2600));

  // 3 · Tu hora en tu país
  ch.push(H1(S()));
  ch.push(P(run("Los horarios se publican en hora de Chile. Busca tu clase y la columna de tu país:")));
  const horasAdultos = [...new Set(ADULTOS.map((c) => c.horaChile))];
  ch.push(headTable(["Clases", ...T.tzCols], horasAdultos.map((h) => {
    const r = tzRow(h);
    const clases = ADULTOS.filter((c) => c.horaChile === h).map((c) => NOMBRE_CLASE[c.id].replace(" (A1.1)", "").replace(" (A1.2)", "").replace(" (A2.1)", "").replace(" (B1+)", ""));
    const nombres = [...new Set(clases.map((x) => x.replace(/ · (martes|jueves)$/, "")))].map((x) => (x === "Básico 1" ? "Básico 1 (mar y jue)" : x));
    return [nombres.join(" · "), r.horaChile, r.mexico, r.colombiaPeru, r.argentina, r.usaEste, r.espana, r.corea];
  }), [1500, 850, 950, 1000, 1000, 1250, 1500, 1310], 18));
  ch.push(espacio(60));
  ch.push(P(run(D.TZ_NOTA, { size: 20, color: GREY })));
  ch.push(bullet(run("Las primeras clases (13, 14 y 15 de octubre) son antes de los dos cambios de hora.")));
  ch.push(bullet(run("España y Corea: la clase cae el día siguiente. Ejemplo: Básico 2 del miércoles 21:00 Chile es jueves 02:00 en España (01:00 desde el 25 de octubre) y jueves 09:00 en Corea.")));
  ch.push(bullet(run("¿Otro país? En academiaseul.com/programa eliges tu país y ves la hora exacta. O escríbenos y te la decimos.")));

  // 4 · Cómo es una clase
  ch.push(H1(S()));
  ch.push(P(run(T.claseIntro)));
  ch.push(headTable(T.estructuraCols, T.claseBloques, [1200, 2200, 5960]));
  ch.push(espacio(60));
  ch.push(P(run("Cada curso adapta este esquema: en Conversacional 1 la mitad de las sesiones son laboratorio oral (puro hablar) y en TOPIK II hay simulacros cronometrados con corrección personal de escritura (쓰기).", { size: 20, color: GREY })));
  ch.push(H2("Qué incluye tu curso"));
  T.incluye.forEach((i) => ch.push(bullet(i)));

  // 5 · Qué necesitas
  ch.push(H1(S()));
  [
    [B("Computador o celular con Zoom actualizado. "), run("Mejor computador, para ver bien las slides. Actualiza Zoom a la última versión antes de la clase 1 (descarga gratis en zoom.us/download).")],
    [B("Audífonos con micrófono. "), run("Se escucha mejor, no hay eco y la profe puede corregir tu pronunciación.")],
    [B("Cámara. "), run("Encendida durante la clase, salvo problemas de conexión: el curso es oral y la profe necesita verte hablar.")],
    [B("Cuaderno y lápiz. "), run("Las primeras semanas escribimos 한글 a mano.")],
    [B("Tu nombre real en pantalla. "), run("Nombre y apellido en Zoom, para que la profe te llame por tu nombre y registre tu asistencia. En la reunión: Participantes → tu nombre → Más → Cambiar nombre.")],
    [B("Internet estable y 60 minutos tranquilos. "), run("Si se te corta, vuelve a entrar con el mismo link; si no alcanzas a volver, te queda la grabación.")],
  ].forEach((b) => ch.push(bullet(b)));

  // 6 · Checklist
  ch.push(H1(S()));
  ch.push(P(run("Marca cada punto antes de tu primera clase:")));
  [
    [run("Pagué el curso (o la cuota 1) y recibí la confirmación por WhatsApp o correo.")],
    [run("Recibí el correo del lunes 12 de octubre y guardé mi "), B("link de Zoom"), run(" (también queda fijado en el grupo).")],
    [run("Me uní al "), B("grupo de WhatsApp"), run(" de mi curso y me presenté (nombre, país y por qué aprendo coreano).")],
    [run("Anoté mi "), B("hora local"), run(" (sección 3) y puse una alarma 15 minutos antes.")],
    [run("Actualicé Zoom y probé cámara, micrófono y audífonos (prueba gratis en zoom.us/test).")],
    [run("Puse mi nombre real en Zoom.")],
    [run("Tengo cuaderno y lápiz a mano.")],
    [run("Descargué el programa de mi curso (PDF) y le di una mirada a la semana 1.")],
    [run("Básico 1: abrí el "), B("Lector de Hangul"), run(" (academiaseul.com/lector-coreano) y escuché las vocales de la pestaña Alfabeto. Son 10 minutos y llegas con ventaja.")],
    [run("El día de la clase entro "), B("5 minutos antes"), run(" para probar el audio sin apuro.")],
  ].forEach((c) => ch.push(check(c)));

  // 7 · Grabaciones
  ch.push(H1(S()));
  [
    "Todas las clases se graban desde el minuto 0.",
    "La grabación se sube a la carpeta del curso dentro de las 24 horas siguientes, junto con el PDF de la clase y la tarea. La profe avisa en el grupo cuando está arriba.",
    "El link de la carpeta del curso queda fijado en el grupo de WhatsApp.",
    "Las grabaciones están disponibles durante el curso y son para tu uso personal: no se comparten fuera del curso ni en redes.",
    "Si faltas: ves la grabación y entregas la tarea. Cuenta como asistencia.",
  ].forEach((x) => ch.push(bullet(x)));

  // 8 · Tareas
  ch.push(H1(S()));
  ch.push(P(run("La tarea es corta y se entrega antes de la siguiente clase: así la hora en vivo se usa para hablar y ser corregido.")));
  ch.push(bullet([B("Lector de Hangul · academiaseul.com/lector-coreano. "), run("App gratis con audio nativo. Pestañas Alfabeto (21 vocales y 19 consonantes con audio), Aprender, Practicar y Progreso. Es la tarea principal de Básico 1 y el repaso de Básico 2. Se entrega con una captura del nivel completado.")]));
  ch.push(bullet([B("Dubu · 두부 · academiaseul.com/dubu. "), run("Puzzle gratis del Hangul: juntas consonante + vocal y formas la palabra que lees o que escuchas. 30 niveles en 6 barrios (Bukchon, Insadong, Hongdae, Gwangjang, Río Han y Estación de Seúl). Ideal para 10 minutos al día entre clases.")]));
  ch.push(bullet([B("Hojas de actividad. "), run("Un PDF por sesión en la carpeta del curso; se entregan como PDF o foto en el grupo.")]));
  ch.push(bullet([B("Mini-diarios y audios "), run("(Básico 2 y Conversacional 1): 3–5 frases o un audio de 30–60 segundos.")]));
  ch.push(bullet([B("Simulacros "), run("(TOPIK II): hoja de respuestas + escritura 51–54, con corrección individual.")]));
  ch.push(espacio(60));
  ch.push(headTable(T.tareasCols, T.tareasRows, [2400, 3200, 3760], 19));
  ch.push(espacio(60));
  ch.push(P(run("¿Quieres repasar el alfabeto antes de empezar? El taller gratis de Hangul (la clase completa de 1 hora, en video) está en academiaseul.com/taller.", { size: 20, color: GREY })));

  // 9 · Evaluación y certificado
  ch.push(H1(S()));
  ch.push(P(run(T.evalIntro)));
  ch.push(headTable(T.evalCols, T.evalRows, [2600, 900, 5860]));
  ch.push(espacio(80));
  ch.push(caja([run(T.certRegla, { size: 20 })]));
  ch.push(espacio(60));
  ch.push(P(run(T.certNiveles, { size: 20, color: GREY })));
  ch.push(P([run("Los certificados digitales se entregan el "), B("lunes 7 de diciembre"), run(".")]));

  // 10 · Pagos
  ch.push(H1(S()));
  ch.push(caja([[B(PRECIO, { color: NAVY, size: 24 })], [run("Mismo precio en todos los cursos. Incluye las 8 clases en vivo, grabaciones, material, Lector de Hangul, Dubu y certificado.", { size: 20 })]]));
  ch.push(espacio(80));
  ch.push(kvTable([
    ["Si pagaste el curso completo", "Listo: no tienes que hacer nada más."],
    ["Si elegiste 2 cuotas", [`Cuota 1 (US$75): al inscribirte. Cuota 2 (US$75): al inicio del mes 2, la ${CUOTA2}, antes de tu clase 5.`, "Te avisamos por WhatsApp unos días antes."]],
    ["Cómo pagar la cuota 2", [
      "Transferencia en Chile: te pasamos los datos por WhatsApp (sin comisión).",
      `PayPal US$75: ${D.PAYPAL_LINK_MENSUAL} (con tarjeta, sin tener cuenta PayPal).`,
      `Mercado Pago $${CLP_CUOTA} CLP: te enviamos el link por WhatsApp.`,
    ]],
    ["Comprobante", `Mándalo por WhatsApp al ${WA} y te confirmamos.`],
  ], 2600));
  ch.push(espacio(60));
  ch.push(P(run(`Referencia: el pago único por Mercado Pago es $${CLP_UNICO} CLP (${D.MP_LINK_UNICO}) y por PayPal US$150 (${D.PAYPAL_LINK_UNICO}).`, { size: 19, color: GREY })));
  ch.push(P(run("Política (academiaseul.com/terminos): el cupo se confirma con el pago completo o con la cuota 1. Con el plan de 2 cuotas, la segunda debe estar pagada antes de la clase 5; si no, el acceso a clases y grabaciones se pausa hasta regularizar. Una vez iniciada la cohorte el pago no es reembolsable, pero si no puedes continuar escríbenos y buscamos juntos una solución, como pasarte a una cohorte posterior.", { size: 19, color: GREY })));

  // 11 · Normas
  ch.push(H1(S()));
  ch.push(kvTable(T.normas.filter((x) => x[0] !== "Pagos")));

  // 12 · Grupo de WhatsApp
  ch.push(H1(S()));
  ch.push(P(run("Cada curso tiene su propio grupo. Te llega el link en el correo del lunes 12 de octubre; tu profe y Jay son administradores.")));
  [
    "Solo temas del curso: dudas, tareas, audios y avisos. Nada de cadenas, ventas ni spam.",
    "La profe responde dentro de 24 horas, en horario hábil. Si es urgente (no puedes entrar a Zoom), escribe a Jay.",
    "Si vas a faltar, avisa por el grupo o por privado a tu profe.",
    "Los audios en coreano son bienvenidos: muchas tareas se entregan así.",
    "Nadie se burla de los errores. Aquí nos equivocamos todos.",
    "Privacidad: los números y datos de tus compañeros no se usan fuera del grupo. Las grabaciones y el material no se comparten fuera del curso.",
    "Puedes silenciar el grupo: los avisos importantes (Zoom, carpeta, fechas) quedan fijados arriba.",
  ].forEach((x) => ch.push(bullet(x)));

  // 13 · Hitos
  ch.push(H1(S()));
  ch.push(kvTable([
    ["Dom 11 de octubre", "Cierre de matrícula (23:59 o hasta llenar los cupos)."],
    ["Lun 12 de octubre · 9:00", "Correo de bienvenida: link de Zoom, grupo de WhatsApp y esta guía."],
    ["24 h antes de tu clase 1", "Recordatorio por correo y por el grupo."],
    ["Semana 1 · 13–15 oct", "Primera clase: Básico 1 martes y Conversacional 1 (mar 13) · Básico 2 (mié 14) · Básico 1 jueves y TOPIK II (jue 15)."],
    ["Semana 2 · 19–23 oct", "Último plazo para cambiar de sección u horario (según cupo)."],
    ["Dom 25 oct · dom 1 nov", "Cambio de hora en España (25 oct) y en EE.UU. (1 nov). Chile no cambia."],
    ["Semana 4 · 2–6 nov", "Mitad del curso: guía de estudio y feedback individual de tu profe."],
    ["Semana 5 · desde el 9 nov", "Solo plan de 2 cuotas: cuota 2 [fecha POR CONFIRMAR], antes de tu clase 5."],
    ["Semana 8 · 30 nov – 4 dic", "Sesión final: examen o presentación + cierre."],
    ["Lun 7 de diciembre", "Certificados digitales y preventa de la cohorte de enero 2027 (prioridad de cupo para alumnos activos)."],
  ], 2600));

  // 14 · Preguntas rápidas
  ch.push(H1(S()));
  [
    ["¿Y si me pierdo una clase?", "Recibes la grabación en 24 horas, haces la tarea y preguntas tus dudas por el grupo. Cuenta como asistencia."],
    ["¿Me puedo cambiar de horario?", "Sí, hasta la semana 2 y según cupo (por ejemplo, Básico 1 martes → jueves). Escríbele a Jay por WhatsApp."],
    ["¿Qué pasa si se me corta internet en plena clase?", "Vuelve a entrar con el mismo link. Si no alcanzas, te queda la grabación y puedes escribir tus dudas: no pierdes la asistencia."],
    ["¿Qué pasa si la profe no puede dictar una clase?", "Se avisa con la mayor anticipación posible y se repone, o se entrega la grabación + una sesión de dudas."],
    ["¿Qué pasa cuando termino?", "El siguiente peldaño abre en enero de 2027 (Básico 1, Básico 2, Conversacional 2, Niños 2). Los alumnos activos tienen preventa con prioridad de cupo."],
  ].forEach((q) => { ch.push(P(B(q[0]), { spacing: { after: 40 }, keepNext: true })); ch.push(P(run(q[1]))); });

  // 15 · Contacto
  ch.push(H1(S()));
  ch.push(kvTable(contactoRows));
  ch.push(espacio(40));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [run("Nos vemos en clase. 화이팅!", { bold: true, size: 26, color: AZUL })] }));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [run("Jay Kim (김재희) · Kiran (기란) · Abby (홍미영) · Academia Seúl", { size: 20, color: GREY })] }));
  return documento("Academia Seúl · Guía del alumno · Cohorte octubre 2026", ch);
}

// =====================================================================
// b) GUÍA PARA FAMILIAS · Coreano para Niños (8–15)
// =====================================================================
function guiaFamilias() {
  const ninosJson = CURSOS_ES.find((x) => x.cursoId === "ninos");
  const f = fechasDe(NINOS.dia);
  const r = tzRow(NINOS.horaChile);
  const ch = [];
  ch.push(...portada({
    kor: "어린이 한국어", titulo: "Guía para familias", sub: `${NOMBRE_CLASE.ninos} · ${CURSO_NINOS.subtitulo} · Cohorte octubre 2026`,
    lineas: [`${NINOS.dia} ${NINOS.horaChile} hora Chile · 8 clases en vivo de 60 minutos por Zoom`, `Primera clase: ${fechaLarga(NINOS.dia, f[0])} · Show final: ${fechaLarga(NINOS.dia, f[7])}`, `Con Jay y Abby · máximo ${NINOS.cupos} niños y niñas · certificado incluido`],
    nota: "Versión 1.0 · 25 de septiembre de 2026 · Para madres, padres y apoderados. Horarios y datos: academiaseul.com/programa.",
  }));
  const secs = ["Bienvenida", "El curso en una mirada", "Las 8 clases", "La hora en tu país", "Cómo es una clase", "Qué necesita tu hijo o hija", "El rol del apoderado", "Privacidad y cuidado", "Tareas cortas", "Evaluación, show final y certificado", "Si falta a una clase", "Pagos", "El grupo de WhatsApp de apoderados", "Fechas clave", "Contacto"];
  ch.push(...indice(secs));
  let n = 0; const S = () => `${++n}. ${secs[n - 1]}`;

  // 1
  ch.push(H1(S()));
  ch.push(P([B("¡Hola, familia! 안녕하세요.")]));
  ch.push(P(run("Soy Jay Kim (김재희), fundador de Academia Seúl. Nací en Seúl y crecí en Chile desde los 10 años. Junto a Abby (홍미영), profesora coreana nativa y pedagoga, vamos a acompañar a tu hijo o hija en sus primeras 8 semanas de coreano: con juegos, canciones y dibujos, en un grupo de máximo 12.")));
  ch.push(P(run("Esta guía es para ti, el adulto que acompaña. Aquí está cuándo son las clases, qué necesita tener listo, cómo puedes ayudar (sobre todo en la clase 1), cómo cuidamos la privacidad de los niños y cómo funcionan las tareas. Son 5 minutos de lectura.")));
  ch.push(caja([
    [B("Lo más importante", { color: NAVY })],
    [B("1. ", { color: AZUL }), run("La primera clase es el "), B("lunes 19 de octubre a las 18:00"), run(" (hora Chile). El lunes 12 es feriado en Chile, por eso partimos una semana después.")],
    [B("2. ", { color: AZUL }), run("El lunes 12 de octubre te llega un correo con el link de Zoom y el del grupo de WhatsApp de apoderados. El domingo 18 te llega un recordatorio.")],
    [B("3. ", { color: AZUL }), run("En la clase 1, conecta y acompaña a tu hijo o hija. Desde la clase 2, participa solo o sola.")],
  ]));

  // 2
  ch.push(H1(S()));
  ch.push(kvTable([
    ["Curso", `${NOMBRE_CLASE.ninos} · ${CURSO_NINOS.subtitulo}`],
    ["Para quién", "Niños y niñas de 8 a 15 años, desde cero (no necesitan saber nada de coreano)."],
    ["Día y hora", `${NINOS.dia} ${NINOS.horaChile} hora Chile (en Corea: martes 06:00). Otros países en la sección 4.`],
    ["Primera clase", `${fechaLarga(NINOS.dia, f[0]).replace(/^./, (x) => x.toUpperCase())} (el 12 es feriado en Chile)`],
    ["Última clase", `${fechaLarga(NINOS.dia, f[7]).replace(/^./, (x) => x.toUpperCase())}: mini-show final para la familia + certificado`],
    ["Duración", "8 clases en vivo de 60 minutos por Zoom, una por semana"],
    ["Profes", `${profeNombre(NINOS)}: Jay lleva el hilo de la clase y las explicaciones en español; Abby lidera canciones, sonidos y la pronunciación nativa.`],
    ["Grupo", `Máximo ${NINOS.cupos} niños y niñas; en el taller se dividen en 2 salas de hasta 6, una con cada profe.`],
    ["Al terminar", CURSO_NINOS.logros.join(" · ") + "."],
  ], 2400, true));

  // 3
  ch.push(H1(S()));
  ch.push(P(run(`Todos los lunes a las ${NINOS.horaChile} hora Chile:`)));
  ch.push(headTable(["Clase", "Fecha", "Qué aprendemos"], CURSO_NINOS.sesiones.map((s, i) => [String(s.num), `${DIA_ABR[NINOS.dia]} ${f[i].getUTCDate()} ${MES[f[i].getUTCMonth()]}`, [{ t: s.titulo.replace(/^🎤\s*/, ""), o: { bold: true } }, { t: s.desc, o: { size: 18, color: GREY } }]]), [800, 1500, 7060], 19));
  ch.push(espacio(60));
  ch.push(P(run("Feriados: el lunes 12 de octubre no hay clase (por eso partimos el 19). Si alguna vez tuviéramos que mover una clase, avisamos por el grupo con al menos 48 horas y ofrecemos reposición o grabación.", { size: 20, color: GREY })));

  // 4
  ch.push(H1(S()));
  ch.push(headTable(T.tzCols, [[r.horaChile, r.mexico, r.colombiaPeru, r.argentina, r.usaEste, r.espana, r.corea]], [1100, 1100, 1200, 1200, 1500, 1700, 1560]));
  ch.push(espacio(60));
  ch.push(P(run(D.TZ_NOTA, { size: 20, color: GREY })));
  ch.push(P(run("La clase 1 (19 de octubre) es antes de los dos cambios de hora. ¿Otro país? Escríbenos y te decimos la hora exacta.", { size: 20, color: GREY })));

  // 5
  ch.push(H1(S()));
  ch.push(P(run("60 minutos con cambio de actividad cada 8–10 minutos (pantalla → cuerpo → papel), porque a esta edad la atención frente a la pantalla se agota rápido:")));
  ch.push(headTable(["Tiempo", "Bloque", "Qué pasa"], ninosJson.estructura_clase.map((b) => [b.minutos, b.bloque, b.detalle]), [1000, 2000, 6360], 19));

  // 6
  ch.push(H1(S()));
  [
    [B("Computador con Zoom actualizado "), run("(mejor que celular: se ven las láminas y los juegos). Descarga gratis en zoom.us/download.")],
    [B("Audífonos con micrófono "), run("y "), B("cámara"), run(" encendida: cantamos, repetimos y mostramos dibujos a la cámara.")],
    [B("Un lugar tranquilo y con luz, "), run("lejos de la tele y de hermanos jugando, durante 60 minutos.")],
    [B("Cuaderno y lápices de colores."), run(" Kit de casa: hojas blancas, tijeras y pegamento; peluches o juguetes de animales (clase 4) y una foto o dibujo de la familia (clase 5).")],
    [B("Su nombre en pantalla: "), run("solo el nombre de pila del niño o niña (sin apellido). Desde la clase 2 lo escribimos en 한글.")],
  ].forEach((b) => ch.push(bullet(b)));

  // 7
  ch.push(H1(S()));
  ch.push(H3("En la clase 1 (lunes 19 de octubre): conectar y acompañar"));
  [
    "Conéctate 10 minutos antes con el link de Zoom (llega por correo y queda fijado en el grupo).",
    "Prueba juntos cámara, micrófono y audífonos, y pon el nombre de pila del niño o niña en Zoom.",
    "Quédate cerca durante la clase 1: ayuda con el audio, con las salas de Zoom y a que se sienta seguro. No hace falta que hables tú.",
    "Al final, mira con tu hijo o hija la tarea de la semana (la nota semanal llega al grupo).",
  ].forEach((x) => ch.push(bullet(x)));
  ch.push(H3("Desde la clase 2: que participe solo o sola"));
  [
    "Déjalo conectado 5 minutos antes y quédate cerca por si hay un problema técnico, sin soplar respuestas: equivocarse es parte del juego.",
    "Lee la nota semanal (3 líneas: qué aprendimos, qué repasar en el Lector con la pestaña exacta y una frase para practicar en casa). Llega por el grupo dentro de las 24 horas después de la clase.",
    "Acompaña la tarea: 10 minutos, 3 o 4 días a la semana (sección 9). Tu interés vale más que cualquier sticker.",
    "Envía por el grupo los audios o dibujos que pida la profe. Jay o Abby responden con un comentario de voz antes de la siguiente clase.",
    "Si va a faltar, avisa por el grupo o por privado.",
    "Para la clase 8 (lunes 7 de diciembre) estás invitado: es el mini-show final para la familia. Te recordamos una semana antes.",
  ].forEach((x) => ch.push(bullet(x)));

  // 8
  ch.push(H1(S()));
  ch.push(caja([
    [B("No publicamos caras de menores.", { color: NAVY })],
    [run("Nunca subimos a redes sociales fotos, videos ni capturas donde se vea la cara de un niño o niña del curso. Si alguna vez quisiéramos compartir algo de la clase (por ejemplo, un dibujo sin nombre), te lo pedimos antes, por escrito, y es siempre opcional.", { size: 20 })],
  ]));
  ch.push(espacio(80));
  [
    "La grabación de cada clase es solo para el grupo: queda en la carpeta del curso, para que las familias del curso puedan repasar. No se comparte fuera.",
    "Te pedimos lo mismo: no publiques fotos, capturas ni videos de la clase donde aparezcan otros niños.",
    "El grupo de WhatsApp es solo para apoderados: los niños no están en el grupo.",
    "En Zoom: cámaras encendidas, solo nombre de pila y el chat solo para emojis. Los niños no comparten datos personales (dirección, colegio, teléfono).",
    "Todo el contacto del curso pasa por el apoderado: los niños no necesitan WhatsApp ni correo propio.",
  ].forEach((x) => ch.push(bullet(x)));

  // 9
  ch.push(H1(S()));
  ch.push(P(run("Tareas cortas y lúdicas, para que el coreano siga vivo entre lunes y lunes:")));
  ch.push(bullet([B("10 minutos de Lector de Hangul o Dubu, 3 o 4 días a la semana. "), run("La nota semanal dice la pestaña exacta del Lector (academiaseul.com/lector-coreano). Dubu (academiaseul.com/dubu) es un puzzle: consonante + vocal = palabra, en 6 barrios de Seúl.")]));
  ch.push(bullet([B("Un dibujo o manualidad "), run("(su nombre en 한글, su animal favorito, el árbol de su familia…): varios van al show final.")]));
  ch.push(bullet([B("Un audio o video de 10–30 segundos "), run("que envías tú por el grupo (por ejemplo, 안녕하세요 y 감사합니다 en la semana 1).")]));
  ch.push(P(run("Ejemplo de la semana 1: " + ninosJson.semanas[0].tarea[0], { size: 20, color: GREY })));

  // 10
  ch.push(H1(S()));
  [
    "No hay notas numéricas ni examen escrito. Cada clase abre con un quiz-juego de 5 minutos y cada niño va sumando stickers en su tablero de progreso.",
    "Jay y Abby observan cada semana 3 cosas: entiende la instrucción en coreano, repite con buena pronunciación y dice la frase solo o sola.",
    "Clase 8 · mini-show final (lunes 7 de diciembre): cada niño se presenta en 30–40 segundos ante las familias (saludo, nombre, edad, familia, animal y comida favorita), lee en voz alta 5 palabras en 한글 y responde 5 preguntas con dibujos. Se valora que se atreva a hablar, no la perfección.",
    "Certificado Coreano para Niños (8–15) · Academia Seúl: incluido. Es para quien asiste al menos a 6 de las 8 clases en vivo (75 %; en este curso la grabación no reemplaza la clase) y participa en el show final, con al menos el 60 % de los logros de su tablero. Se muestra en pantalla en la clase 8 y llega en PDF a la familia.",
  ].forEach((x) => ch.push(bullet(x)));
  ch.push(P(run("Después: el niño o niña sigue en Coreano para Niños 2 (enero 2027) o, si tiene 13 años o más y va rápido, en Básico 1.", { size: 20, color: GREY })));

  // 11
  ch.push(H1(S()));
  [
    "Avisa por el grupo o por privado.",
    "Dentro de las 24 horas se sube la grabación a la carpeta del curso: mírenla juntos y hagan la tarea de la semana.",
    "Si se corta internet en plena clase, vuelve a entrar con el mismo link; si no alcanza, le queda la grabación.",
    "Ojo con el certificado: en Coreano para Niños la grabación sirve para repasar, pero no reemplaza la clase en vivo. Para el certificado cuentan al menos 6 de las 8 clases.",
  ].forEach((x) => ch.push(bullet(x)));

  // 12
  ch.push(H1(S()));
  ch.push(kvTable([
    ["Precio", PRECIO],
    ["Si pagaste completo", "Listo: no tienes que hacer nada más."],
    ["Si elegiste 2 cuotas", `Cuota 2 (US$75): al inicio del mes 2, la ${CUOTA2}. Te avisamos por WhatsApp unos días antes.`],
    ["Cómo pagar la cuota 2", [`Transferencia en Chile (datos por WhatsApp, sin comisión) · PayPal US$75: ${D.PAYPAL_LINK_MENSUAL} (con tarjeta, sin cuenta PayPal) · Mercado Pago $${CLP_CUOTA} CLP (te enviamos el link).`]],
    ["Comprobante", `Por WhatsApp al ${WA}.`],
    ["Política", "Detalles, cambios y reembolsos en academiaseul.com/terminos."],
  ], 2600));

  // 13
  ch.push(H1(S()));
  [
    "Un solo grupo, solo para apoderados. Jay y Abby son administradores.",
    "Ahí llegan: el link de Zoom (fijado arriba), la nota semanal después de cada clase, la grabación y los avisos.",
    "Ahí envías: los audios, dibujos y videos de la tarea, y los avisos si tu hijo o hija va a faltar.",
    "Respondemos dentro de 24 horas, en horario hábil. Solo temas del curso.",
    "Los números y datos de otras familias no se usan fuera del grupo.",
  ].forEach((x) => ch.push(bullet(x)));

  // 14
  ch.push(H1(S()));
  ch.push(kvTable([
    ["Dom 11 de octubre", "Cierre de matrícula (23:59 o hasta llenar los 12 cupos)."],
    ["Lun 12 de octubre", "Feriado en Chile: no hay clase. Te llega el correo con el link de Zoom y el grupo de WhatsApp."],
    ["Dom 18 de octubre", "Recordatorio de la clase 1."],
    ["Lun 19 de octubre · 18:00", "Clase 1: conecta y acompaña."],
    ["Dom 25 de octubre", "Cambio de hora en España (EE.UU. cambia el dom 1 de noviembre). Chile no cambia."],
    ["Lun 26 de octubre", "Clase 2: desde aquí participa solo o sola."],
    ["Semana del 9 de noviembre", "Solo plan de 2 cuotas: cuota 2 [fecha POR CONFIRMAR]."],
    ["Lun 30 de noviembre", "Clase 7: ensayo del show final. Te enviamos la invitación para la familia."],
    ["Lun 7 de diciembre · 18:00", "Clase 8: mini-show final para la familia + certificado."],
  ], 2600));

  // 15
  ch.push(H1(S()));
  ch.push(kvTable(contactoRows));
  ch.push(espacio(200));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [run("¡Nos vemos el lunes 19! 화이팅!", { bold: true, size: 26, color: AZUL })] }));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [run("Jay Kim (김재희) y Abby (홍미영) · Academia Seúl", { size: 20, color: GREY })] }));
  return documento("Academia Seúl · Guía para familias · Coreano para Niños (8–15) · Octubre 2026", ch);
}

(async () => {
  for (const [name, build] of [["Guia_Alumno_Octubre_2026.docx", guiaAlumno], ["Guia_Familias_Ninos_Octubre_2026.docx", guiaFamilias]]) {
    const buf = await Packer.toBuffer(build());
    const file = path.join(OUT, name);
    fs.writeFileSync(file, buf);
    console.log("OK", file, Math.round(buf.length / 1024) + " KB");
  }
})().catch((e) => { console.error(e); process.exit(1); });
