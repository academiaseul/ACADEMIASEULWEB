// Programa Completo de Estudios · Cohorte octubre 2026 · ES + EN (docx). Alumnos y profesores.
// Datos: lib/nivel1.ts (transpilado) + cursos_es.json / cursos_en.json (syllabus semana a semana autorizado por el workflow).
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  WidthType, AlignmentType, BorderStyle, ShadingType, Footer, Header, PageNumber,
  TabStopType, VerticalAlign, PageBreak,
} = require("docx");

const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const OUT = path.join(REPO, "Programa_Completo_Octubre_2026");
fs.mkdirSync(OUT, { recursive: true });
const SCRATCH = path.join(__dirname, "..");

// ---- nivel1.ts ----
const src = fs.readFileSync(path.join(REPO, "lib", "nivel1.ts"), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const D = mod.exports;

// ---- estilo de la casa ----
const AZUL = "4236F6", NAVY = "003478", INK = "1B1C24", GREY = "5C5F6B";
const LINE = "CCCCCC", TINT = "EEF1F6", ZEBRA = "F7F8FA", FONT = "Arial";
const CONTENT_W = 9360;
const LOGO = fs.readFileSync(path.join(SCRATCH, "logo-azul.png"));
const SELLO = fs.readFileSync(path.join(SCRATCH, "igpost", "sello-azul.png"));

const run = (t, o = {}) => new TextRun(Object.assign({ text: t, font: FONT, size: 22, color: INK }, o));
const P = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new Paragraph(Object.assign({ children: c, spacing: { after: 130, line: 296 } }, o)); };
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const allBorders = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };
const cellP = (t, o = {}, po = {}) => new Paragraph(Object.assign({ children: [run(t, o)], spacing: { after: 0, line: 264 } }, po));
const cell = (c, o = {}) => { if (!Array.isArray(c)) c = [c]; return new TableCell(Object.assign({ children: c, verticalAlign: VerticalAlign.CENTER, margins: { top: 70, bottom: 70, left: 100, right: 100 } }, o)); };
function headTable(headers, rows, widths, size = 20) {
  const total = widths.reduce((a, b) => a + b, 0);
  if (total !== CONTENT_W) { const f = CONTENT_W / total; widths = widths.map((w) => Math.round(w * f)); widths[widths.length - 1] += CONTENT_W - widths.reduce((a, b) => a + b, 0); }
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, borders: allBorders, rows: [
    new TableRow({ tableHeader: true, children: headers.map((h, i) => cell([cellP(h, { bold: true, color: "FFFFFF", size: 19 })], { width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: NAVY } })) }),
    ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => {
      const parts = Array.isArray(c) ? c : [{ t: c }];
      return cell(parts.map((p) => cellP(p.t, Object.assign({ size }, p.o || {}))), { width: { size: widths[i], type: WidthType.DXA }, shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: ZEBRA } : undefined });
    }) })),
  ] });
}
function kvTable(rows) {
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [2400, 6960], borders: allBorders, rows: rows.map((r) => new TableRow({ cantSplit: true, children: [
    cell([cellP(r[0], { bold: true, size: 19, color: NAVY })], { width: { size: 2400, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: TINT } }),
    cell([cellP(r[1], { size: 20 })], { width: { size: 6960, type: WidthType.DXA } }),
  ] })) });
}
const H1 = (t, opts = {}) => new Paragraph(Object.assign({ children: [run(t, { bold: true, size: 30 })], spacing: { before: 380, after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 4 } }, keepNext: true }, opts));
const H2 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 24, color: AZUL })], spacing: { before: 240, after: 110 }, keepNext: true });
const H3 = (t) => new Paragraph({ children: [run(t, { bold: true, size: 21, color: NAVY })], spacing: { before: 160, after: 80 }, keepNext: true });
const bullet = (t, o = {}) => new Paragraph({ children: [run("•  ", { color: AZUL, bold: true }), ...(Array.isArray(t) ? t : [run(t, o)])], spacing: { after: 70, line: 288 }, indent: { left: 360, hanging: 240 } });
const num = (i, t) => new Paragraph({ children: [run(i + ".  ", { color: AZUL, bold: true }), run(t)], spacing: { after: 70, line: 288 }, indent: { left: 400, hanging: 300 } });
function caja(parts, fill = TINT, border = AZUL) {
  const b = { style: BorderStyle.SINGLE, size: 8, color: border };
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W], borders: { top: b, bottom: b, left: b, right: b },
    rows: [new TableRow({ children: [cell([new Paragraph({ children: parts, spacing: { after: 0, line: 288 } })], { shading: { type: ShadingType.CLEAR, fill } })] })] });
}
const espacio = (n = 120) => new Paragraph({ children: [run("", { size: 8 })], spacing: { after: n } });
const salto = () => new Paragraph({ children: [new PageBreak()] });

// ---- fechas ----
const DIAS = { Lunes: 0, Martes: 1, "Miércoles": 2, Jueves: 3 };
const MES = { es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"], en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
const DIA_ABR = { es: { Lunes: "lun", Martes: "mar", "Miércoles": "mié", Jueves: "jue" }, en: { Lunes: "Mon", Martes: "Tue", "Miércoles": "Wed", Jueves: "Thu" } };
const DIA_FULL = { es: { Lunes: "Lunes", Martes: "Martes", "Miércoles": "Miércoles", Jueves: "Jueves" }, en: { Lunes: "Monday", Martes: "Tuesday", "Miércoles": "Wednesday", Jueves: "Thursday" } };
function fechas(dia, L) {
  const base = new Date(Date.UTC(2026, 9, 5));
  return Array.from({ length: 8 }, (_, w) => { const d = new Date(base.getTime() + (w * 7 + DIAS[dia]) * 86400000); return L === "es" ? `${DIA_ABR.es[dia]} ${d.getUTCDate()} ${MES.es[d.getUTCMonth()]}` : `${DIA_ABR.en[dia]} ${MES.en[d.getUTCMonth()]} ${d.getUTCDate()}`; });
}
function semanaRango(w, L) {
  const base = new Date(Date.UTC(2026, 9, 5) + w * 7 * 86400000); const fin = new Date(base.getTime() + 4 * 86400000);
  return L === "es" ? `${base.getUTCDate()} ${MES.es[base.getUTCMonth()]} – ${fin.getUTCDate()} ${MES.es[fin.getUTCMonth()]}` : `${MES.en[base.getUTCMonth()]} ${base.getUTCDate()} – ${MES.en[fin.getUTCMonth()]} ${fin.getUTCDate()}`;
}

const T = require("./textos_generales.js");

const NOMBRE = { es: { a11: "Básico 1 (A1.1)", a12: "Básico 2 (A1.2)", a21: "Conversacional 1 (A2.1)", topik2: "TOPIK II (B1+)", ninos: "Coreano para Niños (8–12)" }, en: { a11: "Basic 1 (A1.1)", a12: "Basic 2 (A1.2)", a21: "Conversational 1 (A2.1)", topik2: "TOPIK II (B1+)", ninos: "Korean for Kids (8–12)" } };
const SUB = { es: { a11: "Primeras Palabras", a12: "Pasado, presente y futuro", a21: "Corea que amas", topik2: "Estrategia de examen", ninos: "Juega y aprende" }, en: { a11: "First Words", a12: "Past, present and future", a21: "The Korea you love", topik2: "Exam strategy", ninos: "Play and learn" } };
const CODIGO = { a11: "KOR 101", a12: "KOR 102", a21: "KOR 201", topik2: "KOR 301", ninos: "KOR 050" };
const REQ = { es: { a11: "Ninguno — desde cero", a12: "Básico 1 (A1.1) o el Nivel 1 de julio", a21: "Básico 2 (A1.2) o test de nivel", topik2: "Nivel intermedio (B1)", ninos: "Ninguno — 8 a 12 años" }, en: { a11: "None — from scratch", a12: "Basic 1 (A1.1) or July’s Level 1", a21: "Basic 2 (A1.2) or placement test", topik2: "Intermediate level (B1)", ninos: "None — ages 8 to 12" } };
const ORDEN = ["a11", "a12", "a21", "topik2", "ninos"];
const chileTxt = { es: "hora Chile", en: "Chile time" };
const horarioCurso = (id, L) => D.CLASES.filter((c) => c.cursoId === id).map((c) => `${DIA_FULL[L][c.dia]} ${c.horaChile}`).join(L === "es" ? " o " : " or ") + " · " + chileTxt[L];
const profeCurso = (id) => D.profeDe(D.CLASES.find((c) => c.cursoId === id).profeId).nombre;
const cupoCurso = (id) => D.CLASES.filter((c) => c.cursoId === id).map((c) => c.cupos)[0];

function build(L, cursos) {
  const t = T[L];
  const ch = [];
  ch.push(
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 300 }, children: [new ImageRun({ type: "png", data: LOGO, transformation: { width: 232, height: 80 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 }, children: [run(t.kor, { bold: true, size: 40, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [run(t.titulo, { bold: true, size: 48 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 320 }, children: [run(t.sub, { italics: true, size: 24, color: GREY })] }),
    ...t.portadaLineas.map((l) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 70 }, children: [run(l, { size: 23 })] })),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 500 }, children: [new ImageRun({ type: "png", data: SELLO, transformation: { width: 90, height: 87 } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [run("www.academiaseul.com · +56 9 4211 5562 · @academiaseul", { size: 19, color: GREY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [run(t.docNota, { size: 17, color: GREY, italics: true })] }),
    salto(),
  );
  ch.push(H1(t.indice));
  ch.push(H2(t.parte1)); t.secciones.forEach((s) => ch.push(P(run(s), { spacing: { after: 40 } })));
  ch.push(H2(t.parte2)); ORDEN.forEach((id) => ch.push(P(run(`${CODIGO[id]} · ${NOMBRE[L][id]} · ${SUB[L][id]}`), { spacing: { after: 40 } })));
  ch.push(H2(t.parte3)); t.p3secciones.forEach((s) => ch.push(P(run(s), { spacing: { after: 40 } })));
  ch.push(H2(t.anexos)); ch.push(P(run(t.anexoTitulo), { spacing: { after: 40 } }));
  ch.push(salto());

  // PARTE I
  ch.push(new Paragraph({ children: [run(t.parte1, { bold: true, size: 36, color: AZUL })], spacing: { after: 200 } }));
  ch.push(H1(t.secciones[0])); t.quienes.forEach((p) => ch.push(P(run(p))));
  ch.push(H3(t.equipoTitulo));
  ch.push(headTable([L === "es" ? "Profesor/a" : "Teacher", L === "es" ? "Rol en la cohorte" : "Role in the cohort", L === "es" ? "Perfil" : "Profile"], D.PROFES.map((p) => [p.nombre, t.rolProfe[p.id] || p.rol, t.bioProfe[p.id] || p.bio]), [2200, 2400, 4760]));
  ch.push(H1(t.secciones[1])); ch.push(P(run(t.metodoIntro)));
  t.metodo.forEach((m) => ch.push(bullet([run(m[0] + ": ", { bold: true }), run(m[1])])));
  ch.push(H1(t.secciones[2])); ch.push(P(run(t.escaleraIntro)));
  ch.push(headTable(t.escaleraCols, ORDEN.map((id) => [CODIGO[id], `${NOMBRE[L][id]} · ${SUB[L][id]}`, id === "ninos" ? "8–12" : D.cursoPorId(id).cefr, REQ[L][id], horarioCurso(id, L).replace(" · " + chileTxt[L], ""), D.profeDe(D.CLASES.find((c) => c.cursoId === id).profeId).corto, String(cupoCurso(id))]), [900, 2600, 700, 2000, 1700, 900, 560], 18));
  ch.push(espacio(60)); ch.push(P(run(t.ninosNota, { size: 20, color: GREY }))); ch.push(P(run(t.conv2, { size: 20, color: GREY })));
  ch.push(H1(t.secciones[3])); ch.push(P(run(t.calIntro)));
  const f = { Lunes: fechas("Lunes", L), Martes: fechas("Martes", L), "Miércoles": fechas("Miércoles", L), Jueves: fechas("Jueves", L) };
  ch.push(headTable(t.calCols, Array.from({ length: 8 }, (_, w) => [String(w + 1), semanaRango(w, L), f.Lunes[w] + (w === 1 ? " *" : ""), f.Martes[w], f.Martes[w], f["Miércoles"][w], f.Jueves[w], f.Jueves[w]]), [600, 1500, 1200, 1200, 1200, 1200, 1200, 1260], 18));
  ch.push(espacio(60)); ch.push(P(run("* " + t.feriadoNota, { size: 19, color: GREY })));
  ch.push(H3(L === "es" ? "Hitos" : "Milestones")); ch.push(kvTable(t.hitos));
  ch.push(H1(t.secciones[4])); ch.push(P(run(t.tzIntro)));
  ch.push(headTable(t.tzCols, D.TZ_ROWS.map((r) => [r.horaChile, r.mexico, r.colombiaPeru, r.argentina, r.usaEste, r.espana, r.corea]), [1100, 1100, 1200, 1200, 1500, 1700, 1560]));
  ch.push(H1(t.secciones[5])); ch.push(P(run(t.claseIntro)));
  ch.push(headTable(t.estructuraCols, t.claseBloques, [1200, 2200, 5960]));
  ch.push(H3(L === "es" ? "Qué incluye cada curso" : "What every course includes")); t.incluye.forEach((i) => ch.push(bullet(i)));
  ch.push(H1(t.secciones[6])); ch.push(P(run(t.evalIntro)));
  ch.push(headTable(t.evalCols, t.evalRows, [2600, 900, 5860]));
  ch.push(espacio(80)); ch.push(caja([run(t.certRegla, { size: 20 })])); ch.push(espacio(60)); ch.push(P(run(t.certNiveles, { size: 20, color: GREY })));
  ch.push(H1(t.secciones[7])); ch.push(kvTable(t.normas));
  ch.push(H1(t.secciones[8])); t.faq.forEach((q) => { ch.push(P(run(q[0], { bold: true }), { spacing: { after: 40 }, keepNext: true })); ch.push(P(run(q[1]))); });
  ch.push(H1(t.secciones[9])); ch.push(kvTable(t.contacto));
  ch.push(salto());

  // PARTE II
  ch.push(new Paragraph({ children: [run(t.parte2, { bold: true, size: 36, color: AZUL })], spacing: { after: 200 } }));
  ch.push(P(run(t.parte2Intro)));
  ORDEN.forEach((id, idx) => {
    const c = cursos.find((x) => x.cursoId === id);
    if (!c) return;
    const clases = D.CLASES.filter((k) => k.cursoId === id);
    const dias = clases.map((k) => k.dia);
    if (idx > 0) ch.push(salto());
    ch.push(H1(`${CODIGO[id]} · ${NOMBRE[L][id]} · ${SUB[L][id]}`));
    ch.push(P(run(c.descripcion)));
    ch.push(H2(t.ficha));
    ch.push(kvTable([[t.fichaRows[0], CODIGO[id]], [t.fichaRows[1], id === "ninos" ? (L === "es" ? "Niños de 8 a 12 años" : "Kids aged 8 to 12") : "CEFR " + D.cursoPorId(id).cefr], [t.fichaRows[2], horarioCurso(id, L)], [t.fichaRows[3], profeCurso(id)], [t.fichaRows[4], c.requisito_entrada || REQ[L][id]], [t.fichaRows[5], String(cupoCurso(id)) + (clases.length > 1 ? (L === "es" ? " por sección" : " per section") : "")], [t.fichaRows[6], D.cursoPorId(id).libro], [t.fichaRows[7], dias.map((d) => fechas(d, L)[0] + " → " + fechas(d, L)[7]).join(" · ")]]));
    ch.push(H2(t.perfil)); ch.push(P(run(c.perfil_alumno)));
    ch.push(H2(t.objetivos)); c.objetivos.forEach((o) => ch.push(bullet(o)));
    ch.push(H2(t.estructura)); ch.push(headTable(t.estructuraCols, c.estructura_clase.map((b) => [b.minutos, b.bloque, b.detalle]), [1200, 2200, 5960]));
    ch.push(H2(L === "es" ? "Calendario del curso" : "Course calendar"));
    const fechasCurso = dias.map((d) => fechas(d, L));
    ch.push(headTable(t.semanaCols, c.semanas.map((s, i) => [String(s.n), fechasCurso.map((ff) => ff[i]).join(" / "), s.titulo, s.objetivo]), [500, 1500, 3200, 4160], 19));
    ch.push(H2(t.detalleSemanas));
    c.semanas.forEach((s, i) => {
      ch.push(H3(`${L === "es" ? "Semana" : "Week"} ${s.n} · ${fechasCurso.map((ff) => ff[i]).join(" / ")} · ${s.titulo}`));
      ch.push(P([run((L === "es" ? "Lección: " : "Lesson: "), { bold: true, size: 20, color: NAVY }), run(s.leccion, { size: 20 }), run("   ·   ", { size: 20, color: GREY }), run((L === "es" ? "Objetivo: " : "Objective: "), { bold: true, size: 20, color: NAVY }), run(s.objetivo, { size: 20 })], { spacing: { after: 60 } }));
      ch.push(P(run(t.lblGram, { bold: true, size: 20, color: AZUL }), { spacing: { after: 20 }, keepNext: true })); s.gramatica.forEach((g) => ch.push(bullet(g, { size: 20 })));
      ch.push(P([run(t.lblVoc + ": ", { bold: true, size: 20, color: AZUL }), run(s.vocabulario.join(" · "), { size: 20 })], { spacing: { after: 60 } }));
      ch.push(P(run(t.lblPrac, { bold: true, size: 20, color: AZUL }), { spacing: { after: 20 }, keepNext: true })); s.practica.forEach((g) => ch.push(bullet(g, { size: 20 })));
      ch.push(P(run(t.lblTarea, { bold: true, size: 20, color: AZUL }), { spacing: { after: 20 }, keepNext: true })); s.tarea.forEach((g) => ch.push(bullet(g, { size: 20 })));
      ch.push(P([run(t.lblCult + ": ", { bold: true, size: 20, color: NAVY }), run(s.cultura, { size: 20, italics: true })], { spacing: { after: 140 } }));
    });
    ch.push(H2(t.evalCurso));
    ch.push(kvTable([[t.evalLbl[0], c.evaluacion.quizzes], [t.evalLbl[1], c.evaluacion.tareas], [t.evalLbl[2], c.evaluacion.examen_final], [t.evalLbl[3], c.evaluacion.oral], [t.evalLbl[4], t.certRegla]]));
    ch.push(H2(t.materiales)); c.materiales.forEach((m) => ch.push(bullet(m)));
    ch.push(H2(t.notasProfe)); c.notas_profesor.forEach((m) => ch.push(bullet(m)));
  });
  ch.push(salto());

  // PARTE III
  ch.push(new Paragraph({ children: [run(t.parte3, { bold: true, size: 36, color: AZUL })], spacing: { after: 200 } }));
  ch.push(P(run(t.p3intro)));
  ch.push(H1(t.p3secciones[0])); t.rol.forEach((r, i) => ch.push(num(i + 1, r)));
  ch.push(H1(t.p3secciones[1])); t.adda.forEach((b) => { ch.push(H3(b[0])); b[1].forEach((x) => ch.push(bullet(x))); });
  ch.push(H1(t.p3secciones[2])); ch.push(headTable(t.planCols, t.planRows, [900, 1500, 3000, 1500, 2460], 19));
  ch.push(H1(t.p3secciones[3])); t.corregir.forEach((r) => ch.push(bullet(r)));
  ch.push(H1(t.p3secciones[4])); ch.push(headTable(t.rubricaCols, t.rubricaRows, [1500, 2000, 2000, 2000, 1860], 18)); ch.push(espacio(60)); ch.push(P(run(t.rubricaNota, { size: 20, color: GREY })));
  ch.push(H1(t.p3secciones[5])); ch.push(kvTable(t.contingencias));
  ch.push(H1(t.p3secciones[6])); t.comunicacion.forEach((r) => ch.push(bullet(r)));
  ch.push(salto());
  ch.push(H1(t.anexoTitulo));
  ch.push(headTable(t.tareasCols, t.tareasRows, [2400, 3200, 3760]));
  ch.push(H3(L === "es" ? "Equivalencias CEFR · TOPIK" : "CEFR · TOPIK equivalences"));
  ch.push(headTable(t.cefrCols, t.cefrRows, [1700, 800, 2000, 4860], 19));
  ch.push(espacio(200));
  ch.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [run(t.cierre, { bold: true, size: 23, color: AZUL })] }));

  return new Document({
    styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1150, bottom: 1100, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(t.header, { size: 16, color: GREY })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }], children: [run(t.footer, { size: 16, color: GREY }), new TextRun({ text: "\t", font: FONT }), new TextRun({ children: [t.pagina, PageNumber.CURRENT], font: FONT, size: 16, color: GREY })] })] }) },
      children: ch,
    }],
  });
}

(async () => {
  for (const L of ["es", "en"]) {
    const cursos = JSON.parse(fs.readFileSync(path.join(__dirname, `cursos_${L}.json`), "utf8"));
    const doc = build(L, cursos);
    const buf = await Packer.toBuffer(doc);
    const file = path.join(OUT, `Programa_Completo_Octubre_2026_${L.toUpperCase()}.docx`);
    fs.writeFileSync(file, buf);
    console.log("OK", file);
  }
})();
