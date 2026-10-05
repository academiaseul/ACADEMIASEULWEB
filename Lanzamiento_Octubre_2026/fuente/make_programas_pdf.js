// Genera los programas descargables (docx) de la cohorte octubre 2026.
// Fuente de datos: lib/nivel1.ts (la misma que usa la web), transpilado al vuelo.
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  WidthType, AlignmentType, BorderStyle, ShadingType, Footer, Header, PageNumber,
  TabStopType, VerticalAlign, PageBreak,
} = require("docx");

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const OUT_PUBLIC = process.env.OUT_DIR || path.join(REPO, "public", "programas");
fs.mkdirSync(OUT_PUBLIC, { recursive: true });

// ---- cargar lib/nivel1.ts como CommonJS ----
const src = fs.readFileSync(path.join(REPO, "lib", "nivel1.ts"), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const D = mod.exports;
const profe = c => D.profeDe(c.profeId);
const profeTxt = c => profe(c).nombre;
const cursoDeClase = c => D.cursoDe(c);

// ---- estilo de la casa ----
const AZUL = "4236F6", NAVY = "003478", INK = "1B1C24", GREY = "5C5F6B", GOLD = "8F6F1F";
const LINE = "CCCCCC", TINT = "EEF1F6", ZEBRA = "F7F8FA", FONT = "Arial";
const CONTENT_W = 9360;
const LOGO = fs.readFileSync(path.join(__dirname, "logo-azul.png")); // wordmark azul 2852x984 (PNG)
const SELLO = fs.readFileSync(path.join(__dirname, "igpost", "sello-azul.png")); // 627x606

const run = (t, o = {}) => new TextRun(Object.assign({ text: t, font: FONT, size: 22, color: INK }, o));
const P = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new Paragraph(Object.assign({ children: c, spacing: { after: 130, line: 296 } }, o)); };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };
const cellP = (t, o = {}, po = {}) => new Paragraph(Object.assign({ children: [run(t, o)], spacing: { after: 0, line: 264 } }, po));
const cell = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new TableCell(Object.assign({ children: c, verticalAlign: VerticalAlign.CENTER, margins: { top: 70, bottom: 70, left: 100, right: 100 } }, o)); };
function headTable(headers, rows, widths, opts = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  if (total !== CONTENT_W) { const f = CONTENT_W / total; widths = widths.map(w => Math.round(w * f)); widths[widths.length - 1] += CONTENT_W - widths.reduce((a, b) => a + b, 0); }
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, borders: allBorders, rows: [
    new TableRow({ tableHeader: true, children: headers.map((h, i) => cell([cellP(h, { bold: true, color: "FFFFFF", size: 19 })], { width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: NAVY } })) }),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => {
      const parts = Array.isArray(c) ? c : [{ t: c }];
      return cell(parts.map(p => cellP(p.t, Object.assign({ size: 20 }, p.o || {}))), { width: { size: widths[i], type: WidthType.DXA }, shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: ZEBRA } : undefined });
    }) })),
  ] });
}
const H1 = (t, opts = {}) => new Paragraph(Object.assign({ children: [run(t, { bold: true, size: 28 })], spacing: { before: 360, after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }, keepNext: true }, opts));
const H2 = t => new Paragraph({ children: [run(t, { bold: true, size: 23, color: AZUL })], spacing: { before: 220, after: 110 }, keepNext: true });
const bullet = (t, o = {}) => new Paragraph({ children: [run("•  ", { color: AZUL, bold: true }), run(t, o)], spacing: { after: 80, line: 288 }, indent: { left: 360, hanging: 240 } });
function caja(parts, fill = TINT, border = AZUL) {
  const b = { style: BorderStyle.SINGLE, size: 8, color: border };
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], borders: { top: b, bottom: b, left: b, right: b },
    rows: [new TableRow({ children: [cell([new Paragraph({ children: parts, spacing: { after: 0, line: 288 } })], { shading: { type: ShadingType.CLEAR, fill } })] })] });
}
const espacio = (n = 120) => new Paragraph({ children: [run("", { size: 8 })], spacing: { after: n } });

// ---- fechas de la cohorte (semana del 12 oct 2026, 8 semanas; Niños desde el 19) ----
const DIAS = { Lunes: 0, Martes: 1, "Miércoles": 2, Jueves: 3, Viernes: 4, "Sábado": 5 };
const MESES_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DIA_ABR = { Lunes: "lun", Martes: "mar", "Miércoles": "mié", Jueves: "jue", Viernes: "vie", "Sábado": "sáb" };
function fechas(dia) {
  const base = new Date(Date.UTC(2026, 9, 12) + (dia === "Lunes" ? 7 * 86400000 : 0)); // lunes 12 oct 2026; Niños (lunes) parte el 19: el 12 es feriado
  const out = [];
  for (let w = 0; w < 8; w++) {
    const d = new Date(base.getTime() + (w * 7 + DIAS[dia]) * 86400000);
    out.push(`${DIA_ABR[dia]} ${d.getUTCDate()} ${MESES_ES[d.getUTCMonth()]}`);
  }
  return out;
}
const FERIADO = "12 oct"; // Encuentro de Dos Mundos (Chile)

function portada(titulo, koreano, subtitulo, lineas) {
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 700, after: 320 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 232, height: 80 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 }, children: [run(koreano, { bold: true, size: 40, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [run(titulo, { bold: true, size: 48 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 320 }, children: [run(subtitulo, { italics: true, size: 24, color: GREY })] }),
    ...lineas.map(l => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 70 }, children: [run(l, { size: 23 })] })),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 500 }, children: [new ImageRun({ type: "png", data: SELLO, transformation: { width: 90, height: 87 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("www.academiaseul.com · +56 9 4211 5562 · @academiaseul", { size: 19, color: GREY })] }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function docShell(children, headerText) {
  return new Document({
    styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1150, bottom: 1100, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(headerText, { size: 16, color: GREY })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
        children: [run("www.academiaseul.com · Cohorte octubre 2026", { size: 16, color: GREY }), new TextRun({ text: "\t", font: FONT }),
          new TextRun({ children: ["Página ", PageNumber.CURRENT], font: FONT, size: 16, color: GREY })] })] }) },
      children,
    }],
  });
}

const precioTxt = D.precioLabel();
const tzTable = () => headTable(["Chile", "México", "Col/Perú", "Argentina", "EE.UU. Este", "España", "Corea"],
  D.TZ_ROWS.map(r => [r.horaChile, r.mexico, r.colombiaPeru, r.argentina, r.usaEste, r.espana, r.corea]),
  [1100, 1100, 1200, 1200, 1500, 1700, 1560]);

// =============== PROGRAMA POR CURSO ===============
async function programaCurso(curso) {
  const clases = D.CLASES.filter(c => c.cursoId === curso.cursoId);
  const ch = [];
  ch.push(...portada(curso.nombreCorto, curso.koreanTitle, curso.subtitulo,
    [`Programa del curso · Cohorte octubre 2026`, curso.grupo === "ninos" ? "Ruta Niños · desde cero" : `Paso ${curso.paso} de la escalera · ${curso.requiere ? "Requiere " + curso.requiere : "desde cero"}`, ...clases.map(c => `${c.dia} ${c.horaChile} hora Chile · ${profeTxt(c)}`), `8 semanas · 60 min por clase · certificado incluido`, precioTxt]));

  ch.push(H1("1. El curso en una página"));
  ch.push(P(run(curso.descripcion)));
  ch.push(headTable(["Dato", "Detalle"], [
    ["Nivel", `${curso.cefr}${curso.requiere ? " · requiere " + curso.requiere : " · desde cero"}${curso.alias ? " · antes: " + curso.alias : ""}`],
    ["Duración", `8 semanas · 1 clase en vivo por semana · 60 minutos · ${curso.cursoId === "ninos" ? "lunes 19 de octubre de 2026 → lunes 7 de diciembre de 2026 (el 12 de octubre es feriado en Chile)" : `${D.INICIO_LABEL} → ${D.FIN_LABEL.toLowerCase()}`}`],
    ["Horario", clases.map(c => `${c.dia} ${c.horaChile} (hora Chile) · ${profeTxt(c)}`).join("  |  ")],
    ["Modalidad", "En vivo por Zoom · grabación disponible 24 h después de cada clase"],
    ["Material", curso.libro],
    ["Cupos", clases.map(c => `${c.cupos}${clases.length > 1 ? ` (${c.dia.toLowerCase()})` : ""}`).join(" · ")],
    ["Precio", precioTxt],
    ["Certificado", "Incluido — certificado de Academia Seúl del nivel cursado, por asistencia y participación"],
  ], [2000, 7360]));

  ch.push(H2("Al terminar vas a poder"));
  curso.logros.forEach(l => ch.push(bullet(l)));

  ch.push(H1("2. Calendario clase a clase", { pageBreakBefore: true }));
  ch.push(P(formatoClase(curso.cursoId)));
  for (const c of clases) {
    if (clases.length > 1) ch.push(H2(`Sección ${c.dia} ${c.horaChile} · ${profeTxt(c)}`));
    const fs8 = fechas(c.dia);
    ch.push(headTable(["#", "Fecha", "Clase", "Qué vemos"], curso.sesiones.map((s, i) => [
      String(s.num), fs8[i] + (fs8[i].includes(FERIADO) ? " *" : ""), [{ t: s.titulo, o: { bold: true } }], s.desc,
    ]), [500, 1300, 3000, 4560]));
    if (fs8.some(f => f.includes(FERIADO))) ch.push(P(run(`* El ${FERIADO} es feriado en Chile; la clase se confirma con el grupo (se mantiene online o se recupera esa misma semana).`, { size: 18, italics: true, color: GREY }), { spacing: { before: 80 } }));
    ch.push(espacio(80));
  }

  ch.push(H1("3. Cómo estudiar entre clases"));
  estudioEntreClases(curso.cursoId).forEach(t => ch.push(bullet(t)));

  ch.push(H1("4. Evaluación y certificado"));
  ch.push(P(run("El certificado está incluido en el curso y se entrega en la última clase (o por correo esa misma semana). Se otorga por asistencia y participación; la clase 8 incluye una evaluación de cierre que sirve para ubicarte en el siguiente peldaño, no para “reprobar”.")));
  ch.push(caja([run("Después de este curso: ", { bold: true, size: 21, color: AZUL }), run(siguiente(curso.cursoId), { size: 21 })]));

  ch.push(H1("5. Horarios en tu país"));
  ch.push(P(run("Los horarios están en hora de Chile (UTC-3 durante todo el curso). Conversión para las tres franjas de la cohorte:")));
  ch.push(tzTable());
  ch.push(P(run(D.TZ_NOTA, { size: 18, italics: true, color: GREY }), { spacing: { before: 80 } }));

  ch.push(H1("6. Inscripción y pago"));
  ch.push(bullet(`Precio: ${precioTxt}. Mismo precio para todos los cursos de la academia.`));
  ch.push(bullet("Inscripción online en academiaseul.com/nivel-1 — eliges tu clase, completas tus datos y pagas."));
  ch.push(bullet("Formas de pago: transferencia bancaria en Chile (sin comisión), tarjeta de crédito/débito vía Mercado Pago, o PayPal en dólares (también con tarjeta sin cuenta PayPal)."));
  ch.push(bullet("Dudas o ayuda para elegir nivel: WhatsApp +56 9 4211 5562 (Jay) · hola.academiaseul@gmail.com"));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 320 }, children: [run("Aprende coreano con un chingu. 화이팅!", { bold: true, size: 24, color: AZUL })] }));

  const doc = docShell(ch, `Academia Seúl · Programa ${curso.nombreCorto} · Octubre 2026`);
  const buf = await Packer.toBuffer(doc);
  const file = path.join(OUT_PUBLIC, `Programa_${slug(curso.cursoId)}_Octubre_2026.docx`);
  fs.writeFileSync(file, buf);
  return file;
}
function formatoClase(id) {
  const t = {
    ninos: ["Cada clase dura 60 minutos en bloques cortos de 10–15 minutos: ", "canción · juego · lectura · dibujo", ". Grupo de máximo 12, en dos salas por edad (8–11 y 12–15)."],
    a21: ["Cada clase dura 60 minutos y ", "al menos la mitad es conversación", ", con corrección de la profesora. Las clases 5 y 8 son laboratorios de conversación."],
    topik2: ["Cada clase dura 60 minutos: ", "estrategia · práctica cronometrada con ítems en formato TOPIK · corrección", ". La escritura (쓰기 51–54) se corrige de forma personalizada."],
  }[id] || ["Cada clase dura 60 minutos: ", "quiz de la clase anterior (5’) · lección con el deck (30’) · práctica oral en pares (20’) · cierre y tarea (5’)", ". La práctica de lectura (sílabas, números) se hace de tarea en el Lector de Hangul con audio nativo, así la hora en vivo se usa para hablar y ser corregido."];
  return [run(t[0]), run(t[1], { bold: true }), run(t[2])];
}
function estudioEntreClases(id) {
  const grab = "Grabación: si faltaste, mírala antes de la próxima clase; si asististe, vuelve a ver solo la parte oral.";
  if (id === "ninos") return [
    "Tarea de unos 20 minutos a la semana, acompañada por un adulto: la hoja de actividades del cuaderno.",
    "Lector de Hangul y Dubu (gratis, en academiaseul.com) para repasar las letras jugando.",
    "Grabación privada, solo para las familias del grupo: sirve si faltó a una clase.",
  ];
  if (id === "topik2") return [
    "Exámenes oficiales anteriores del TOPIK II (se descargan gratis en topik.go.kr): Jay indica en cada clase qué parte practicar y con cuánto tiempo.",
    "Escritura (쓰기 51–54): la entregas para corrección personalizada.",
    grab,
  ];
  return [
    "Lector de Hangul (academiaseul.com/lector-coreano): 10–15 minutos al día. Es gratis, tiene audio nativo y va rotando los ejercicios para que nunca sea la misma práctica.",
    "Hoja de actividad de cada sesión: 30–45 minutos. Se entrega al terminar la clase y se revisa en el quiz de la siguiente.",
    grab,
    "Habla en voz alta. Leer en silencio no cuenta: cada ejemplo del material se dice en voz alta al menos una vez.",
  ];
}
function slug(id) { return { ninos: "Ninos", a11: "Basico1", a12: "Basico2", a21: "ConversacionalA21", topik2: "TOPIK2" }[id] || id; }
function siguiente(id) {
  return {
    ninos: "Seguir en Coreano para Niños en la próxima cohorte (te avisamos las fechas) — o, desde los 13 años, pasar a Básico 1 (A1.1).",
    a11: "Básico 2 (A1.2): el curso que te lleva del presente al pasado y al futuro (te avisamos las fechas de la próxima cohorte).",
    a12: "Conversacional 1 (A2.1) con la Prof.ª Abby, profesora nativa: más de la mitad de cada clase es conversación.",
    a21: "Conversacional 2 (A2.2) · “Corea por dentro”, que abre en enero 2027.",
    topik2: "Rendir el TOPIK II con el plan personal de la clase 8 (las fechas oficiales se confirman en topik.go.kr).",
  }[id];
}

// =============== PROGRAMA GENERAL ===============
async function programaGeneral() {
  const ch = [];
  ch.push(...portada("Programa de Cursos", "교육 과정", "Cohorte octubre 2026 · todos los cursos", [
    `${D.INICIO_LABEL} → ${D.FIN_LABEL.toLowerCase()}`, "8 semanas · 1 clase en vivo por semana · 60 min · certificado incluido", precioTxt,
  ]));

  ch.push(H1("1. La escalera de Academia Seúl"));
  ch.push(P(run("Todos los cursos duran 8 semanas y cuestan lo mismo. Cada peldaño te deja listo para el siguiente; entre cohorte y cohorte no pierdes el hilo porque la siguiente parte reactivando lo último que viste.")));
  ch.push(headTable(["Peldaño", "Curso", "Nivel CEFR", "Para quién", "Después"], [
    ["1", "Básico 1 (A1.1) · Primeras Palabras", "A1.1", "Adultos desde cero absoluto (antes: Nivel 1 · julio 2026)", "Básico 2"],
    ["2", "Básico 2 (A1.2) · Pasado, presente y futuro", "A1.2", "Requiere Básico 1 (A1.1) o el Nivel 1 de julio", "Conversacional 1"],
    ["3", "Conversacional 1 (A2.1) · Corea que amas", "A2.1", "Requiere Básico 2 (A1.2) o test de nivel", "Conversacional 2"],
    ["4", "Conversacional 2 (A2.2) · Corea por dentro", "A2.2", "Requiere Conversacional 1 (abre en enero 2027)", "Intermedio (B1)"],
    ["5", "TOPIK II (B1+) · Estrategia de examen", "B1+", "Nivel intermedio (B1) · va a rendir el examen oficial", "TOPIK II 4–6"],
    ["🧒", "Coreano para Niños (8–15) · Juega y aprende", "8–15 años", "Niños y niñas desde cero · ruta propia", "Básico 1 desde los 13"],
  ], [900, 2600, 1300, 2960, 1600]));
  ch.push(P(run("¿No sabes tu nivel? Haz el test gratuito en academiaseul.com/test-nivel o escríbenos por WhatsApp y te ubicamos en 5 minutos.", { italics: true, color: GREY, size: 20 }), { spacing: { before: 100 } }));

  ch.push(H1("2. Horarios de la cohorte (hora de Chile)", { pageBreakBefore: true }));
  ch.push(headTable(["Día", "Hora", "Curso", "Profesor/a", "Primera clase", "Cupos"],
    D.CLASES.map(c => [c.dia, c.horaChile, `${cursoDeClase(c).emoji} ${cursoDeClase(c).nombreCorto}`, profeTxt(c), c.primeraClase, String(c.cupos)]),
    [1200, 800, 3200, 2000, 1500, 660]));
  ch.push(H2("Vista semanal"));
  const grid = [["18:00", "🧒 Niños (8–15)", "", "", ""], ["20:00", "", "🌱 Básico 1 (A1.1)", "", "🌱 Básico 1 (A1.1)"], ["21:00", "", "💬 Conversacional 1 (A2.1)", "🚀 Básico 2 (A1.2)", "🎯 TOPIK II (B1+)"]];
  ch.push(headTable(["Hora CL", "Lunes", "Martes", "Miércoles", "Jueves"], grid, [1200, 2040, 2040, 2040, 2040]));
  ch.push(H2("¿A qué hora es en tu país?"));
  ch.push(tzTable());
  ch.push(P(run(D.TZ_NOTA, { size: 18, italics: true, color: GREY }), { spacing: { before: 80 } }));
  ch.push(H2("Fechas de las 8 clases"));
  ch.push(headTable(["Curso", "1", "2", "3", "4", "5", "6", "7", "8"],
    D.CLASES.map(c => [`${cursoDeClase(c).emoji} ${cursoDeClase(c).nombreCorto.split(" (")[0]} (${DIA_ABR[c.dia]})`, ...fechas(c.dia).map(f => f.replace(/^\S+ /, "") + (f.includes(FERIADO) ? "*" : ""))]),
    [2560, 850, 850, 850, 850, 850, 850, 850, 850]));
  if (D.CLASES.some(c => fechas(c.dia).some(f => f.includes(FERIADO)))) ch.push(P(run(`* El ${FERIADO} es feriado en Chile; esa clase se confirma con el grupo.`, { size: 18, italics: true, color: GREY }), { spacing: { before: 80 } }));

  ch.push(H1("3. Cómo es una clase de 60 minutos", { pageBreakBefore: true }));
  ch.push(headTable(["Minutos", "Bloque", "Qué pasa"], [
    ["5’", "Quiz de la clase anterior", "Activar lo aprendido; se corrige la hoja de tarea"],
    ["30’", "Lección con el deck", "Gramática con dibujos, gestos y ejemplos reales — nada de tablas frías"],
    ["20’", "Práctica oral en pares", "Role-play y corrección de pronunciación uno a uno"],
    ["5’", "Cierre y tarea", "Lector de Hangul + hoja de la sesión"],
  ], [1200, 2800, 5360]));
  ch.push(P(run("El drilling pesado vive en el Lector de Hangul (gratis, con audio nativo) como tarea. La hora en vivo se reserva para lo que solo la clase en vivo da: hablar y ser corregido.", { italics: true, color: GREY }), { spacing: { before: 120 } }));

  ch.push(H1("4. Syllabus resumido por curso"));
  for (const curso of D.CURSOS) {
    const clases = D.CLASES.filter(c => c.cursoId === curso.cursoId);
    ch.push(H2(`${curso.emoji} ${curso.nombreCorto} · ${curso.subtitulo}${curso.requiere ? " · requiere " + curso.requiere : " · desde cero"}`));
    ch.push(P([run(curso.descripcion, { size: 20 })], { spacing: { after: 90 } }));
    ch.push(P([run("Material: ", { bold: true, size: 20 }), run(curso.libro, { size: 20 }), run("   ·   Horario: ", { bold: true, size: 20 }), run(clases.map(c => `${c.dia} ${c.horaChile} · ${profe(c).corto}`).join(" / "), { size: 20 })], { spacing: { after: 90 } }));
    ch.push(headTable(["#", "Clase", "Foco"], curso.sesiones.map(s => [String(s.num), [{ t: s.titulo, o: { bold: true } }], s.desc]), [500, 3200, 5660]));
    ch.push(P([run("Programa completo con fechas: ", { size: 19, color: GREY }), run(`academiaseul.com/programas/Programa_${slug(curso.cursoId)}_Octubre_2026.pdf`, { size: 19, color: AZUL })], { spacing: { before: 80, after: 200 } }));
  }

  ch.push(H1("5. Precio, inclusiones y pago", { pageBreakBefore: true }));
  ch.push(headTable(["Modalidad", "Precio", "Detalle"], [
    ["Pago único", `US$${D.PRECIO_UNICO}`, "El curso completo de 8 semanas en un solo pago"],
    [`${D.MESES} cuotas`, `${D.MESES} × US$${D.PRECIO_MENSUAL}`, `${D.MESES} cuotas: la primera al inscribirte, la segunda al inicio del mes 2 (antes de la clase 5)`],
  ], [2200, 1800, 5360]));
  ch.push(H2("Todos los cursos incluyen"));
  ["8 clases en vivo por Zoom de 60 minutos", "Certificado de Academia Seúl del nivel cursado", "Grabación de cada clase (24 h después)", "Slides + hoja de actividad por sesión", "Lector de Hangul con audio nativo", "Grupos chicos (máx. 15 · TOPIK 8 · Niños 12) con corrección personal", "Comunidad de alumnos"].forEach(t => ch.push(bullet(t)));
  ch.push(H2("Formas de pago"));
  ch.push(bullet("Transferencia bancaria en Chile — sin comisión (pide los datos por WhatsApp)."));
  ch.push(bullet("Tarjeta de crédito/débito vía Mercado Pago — se cobra el equivalente en pesos chilenos."));
  ch.push(bullet("PayPal en dólares — también con tarjeta, sin necesidad de tener cuenta PayPal."));
  ch.push(H2("Equipo docente"));
  ch.push(headTable(["Profesor/a", "Cursos", "Perfil"], [
    ...D.PROFES.map(p => [p.nombre, p.rol, p.bio]),
  ], [2200, 2300, 4860]));
  ch.push(caja([run("Inscripción: ", { bold: true, size: 21, color: AZUL }), run("academiaseul.com/nivel-1   ·   ", { size: 21 }), run("WhatsApp: ", { bold: true, size: 21, color: AZUL }), run("+56 9 4211 5562   ·   ", { size: 21 }), run("hola.academiaseul@gmail.com", { size: 21 })]));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 320 }, children: [run("Aprende coreano con un chingu. 화이팅!", { bold: true, size: 24, color: AZUL })] }));

  const doc = docShell(ch, "Academia Seúl · Programa de Cursos · Octubre 2026");
  const buf = await Packer.toBuffer(doc);
  const file = path.join(OUT_PUBLIC, "Programa_Cursos_Octubre_2026.docx");
  fs.writeFileSync(file, buf);
  fs.writeFileSync(path.join(REPO, "Programa_Cursos_Octubre_2026.docx"), buf);
  return file;
}

// Uso: node make_programas_pdf.js            → los 5 programas por curso + el Programa de Cursos
//      node make_programas_pdf.js general    → solo el Programa de Cursos (public/programas + raíz del repo)
(async () => {
  const files = [];
  if (process.argv[2] !== "general") for (const c of D.CURSOS) files.push(await programaCurso(c));
  files.push(await programaGeneral());
  console.log(files.join("\n"));
})();
