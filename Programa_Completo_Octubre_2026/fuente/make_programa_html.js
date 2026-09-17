// Versión HTML del Programa Completo (para convertir a Google Docs en Drive). Misma estructura que el docx.
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const T = require("./textos_generales.js");
const REPO = "C:\\Users\\Chingu\\Desktop\\ACADEMIASEULWEB";
const src = fs.readFileSync(path.join(REPO, "lib", "nivel1.ts"), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} }; new Function("module", "exports", "require", js)(mod, mod.exports, require); const D = mod.exports;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const NOMBRE = { es: { a11: "Básico 1 (A1.1)", a12: "Básico 2 (A1.2)", a21: "Conversacional 1 (A2.1)", topik2: "TOPIK II (B1+)", ninos: "Coreano para Niños (8–12)" }, en: { a11: "Basic 1 (A1.1)", a12: "Basic 2 (A1.2)", a21: "Conversational 1 (A2.1)", topik2: "TOPIK II (B1+)", ninos: "Korean for Kids (8–12)" } };
const SUB = { es: { a11: "Primeras Palabras", a12: "Pasado, presente y futuro", a21: "Corea que amas", topik2: "Estrategia de examen", ninos: "Juega y aprende" }, en: { a11: "First Words", a12: "Past, present and future", a21: "The Korea you love", topik2: "Exam strategy", ninos: "Play and learn" } };
const CODIGO = { a11: "KOR 101", a12: "KOR 102", a21: "KOR 201", topik2: "KOR 301", ninos: "KOR 050" };
const REQ = { es: { a11: "Ninguno — desde cero", a12: "Básico 1 (A1.1) o el Nivel 1 de julio", a21: "Básico 2 (A1.2) o test de nivel", topik2: "Nivel intermedio (B1)", ninos: "Ninguno — 8 a 12 años" }, en: { a11: "None — from scratch", a12: "Basic 1 (A1.1) or July’s Level 1", a21: "Basic 2 (A1.2) or placement test", topik2: "Intermediate level (B1)", ninos: "None — ages 8 to 12" } };
const ORDEN = ["a11", "a12", "a21", "topik2", "ninos"];
const DIAS = { Lunes: 0, Martes: 1, "Miércoles": 2, Jueves: 3 };
const MES = { es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"], en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] };
const DIA_ABR = { es: { Lunes: "lun", Martes: "mar", "Miércoles": "mié", Jueves: "jue" }, en: { Lunes: "Mon", Martes: "Tue", "Miércoles": "Wed", Jueves: "Thu" } };
const DIA_FULL = { es: { Lunes: "Lunes", Martes: "Martes", "Miércoles": "Miércoles", Jueves: "Jueves" }, en: { Lunes: "Monday", Martes: "Tuesday", "Miércoles": "Wednesday", Jueves: "Thursday" } };
const fechas = (dia, L) => Array.from({ length: 8 }, (_, w) => { const d = new Date(Date.UTC(2026, 9, 5) + (w * 7 + DIAS[dia]) * 86400000); return L === "es" ? `${DIA_ABR.es[dia]} ${d.getUTCDate()} ${MES.es[d.getUTCMonth()]}` : `${DIA_ABR.en[dia]} ${MES.en[d.getUTCMonth()]} ${d.getUTCDate()}`; });
const semanaRango = (w, L) => { const b = new Date(Date.UTC(2026, 9, 5) + w * 7 * 86400000), f = new Date(b.getTime() + 4 * 86400000); return L === "es" ? `${b.getUTCDate()} ${MES.es[b.getUTCMonth()]} – ${f.getUTCDate()} ${MES.es[f.getUTCMonth()]}` : `${MES.en[b.getUTCMonth()]} ${b.getUTCDate()} – ${MES.en[f.getUTCMonth()]} ${f.getUTCDate()}`; };
const chileTxt = { es: "hora Chile", en: "Chile time" };
const horarioCurso = (id, L) => D.CLASES.filter((c) => c.cursoId === id).map((c) => `${DIA_FULL[L][c.dia]} ${c.horaChile}`).join(L === "es" ? " o " : " or ") + " · " + chileTxt[L];
const cupo = (id) => D.CLASES.filter((c) => c.cursoId === id)[0].cupos;

const table = (headers, rows) => `<table style="border-collapse:collapse;width:100%;font-size:10pt"><tr>${headers.map((h) => `<th style="background:#003478;color:#fff;padding:5px 7px;text-align:left;border:1px solid #ccc">${esc(h)}</th>`).join("")}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td style="padding:5px 7px;border:1px solid #ccc;vertical-align:top">${esc(c)}</td>`).join("")}</tr>`).join("")}</table>`;
const kv = (rows) => table([" ", " "], rows).replace(/<tr><th[^]*?<\/tr>/, "");
const h1 = (t) => `<h1 style="font-size:16pt;color:#1B1C24;border-bottom:1px solid #ccc;padding-bottom:3px;margin-top:22pt">${esc(t)}</h1>`;
const h2 = (t) => `<h2 style="font-size:13pt;color:#4236F6;margin-top:14pt">${esc(t)}</h2>`;
const h3 = (t) => `<h3 style="font-size:11pt;color:#003478;margin-top:10pt">${esc(t)}</h3>`;
const p = (t) => `<p>${esc(t)}</p>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
const ol = (items) => `<ol>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`;

function build(L, cursos, part) {
  const t = T[L]; const o = [];
  const isProf = part === "profes";
  o.push(`<div style="text-align:center"><p style="color:#4236F6;font-size:18pt;font-weight:bold">${t.kor}</p><h1 style="font-size:24pt">${esc(t.titulo)}</h1><p style="color:#5C5F6B;font-style:italic">${esc(t.sub)}</p>${t.portadaLineas.map(p).join("")}<p style="color:#5C5F6B;font-size:9pt">www.academiaseul.com · +56 9 4211 5562 · @academiaseul<br>${esc(t.docNota)}</p></div>`);
  if (isProf) { o.push(h1(t.indice), ul(t.p3secciones.concat([t.notasProfe + " (×5)", t.anexoTitulo]))); o.push(`<h1 style="font-size:20pt;color:#4236F6;page-break-before:always">${esc(t.parte3)}</h1>`, p(t.p3intro)); o.push(h1(t.p3secciones[0]), ol(t.rol), h1(t.p3secciones[1]), ...t.adda.flatMap((b) => [h3(b[0]), ul(b[1])]), h1(t.p3secciones[2]), table(t.planCols, t.planRows), h1(t.p3secciones[3]), ul(t.corregir), h1(t.p3secciones[4]), table(t.rubricaCols, t.rubricaRows), p(t.rubricaNota), h1(t.p3secciones[5]), kv(t.contingencias), h1(t.p3secciones[6]), ul(t.comunicacion)); o.push(h1(t.notasProfe)); for (const id of ORDEN) { const c = cursos.find((x) => x.cursoId === id); o.push(h2(`${CODIGO[id]} · ${NOMBRE[L][id]}`), ul(c.notas_profesor)); } o.push(h1(t.anexoTitulo), table(t.tareasCols, t.tareasRows), h3(L === "es" ? "Equivalencias CEFR · TOPIK" : "CEFR · TOPIK equivalences"), table(t.cefrCols, t.cefrRows)); return wrap(L, o, t); }
  o.push(h1(t.indice), h2(t.parte1), ul(t.secciones), h2(t.parte2), ul(ORDEN.map((id) => `${CODIGO[id]} · ${NOMBRE[L][id]} · ${SUB[L][id]}`)), h2(t.anexos), ul([t.anexoTitulo]));
  o.push(`<h1 style="font-size:20pt;color:#4236F6;page-break-before:always">${esc(t.parte1)}</h1>`);
  o.push(h1(t.secciones[0]), ...t.quienes.map(p), h3(t.equipoTitulo), table([L === "es" ? "Profesor/a" : "Teacher", L === "es" ? "Rol en la cohorte" : "Role in the cohort", L === "es" ? "Perfil" : "Profile"], D.PROFES.map((x) => [x.nombre, t.rolProfe[x.id] || x.rol, t.bioProfe[x.id] || x.bio])));
  o.push(h1(t.secciones[1]), p(t.metodoIntro), ul(t.metodo.map((m) => `${m[0]}: ${m[1]}`)));
  o.push(h1(t.secciones[2]), p(t.escaleraIntro), table(t.escaleraCols, ORDEN.map((id) => [CODIGO[id], `${NOMBRE[L][id]} · ${SUB[L][id]}`, id === "ninos" ? "8–12" : D.cursoPorId(id).cefr, REQ[L][id], horarioCurso(id, L).replace(" · " + chileTxt[L], ""), D.profeDe(D.CLASES.find((c) => c.cursoId === id).profeId).corto, String(cupo(id))])), p(t.ninosNota), p(t.conv2));
  const f = { Lunes: fechas("Lunes", L), Martes: fechas("Martes", L), "Miércoles": fechas("Miércoles", L), Jueves: fechas("Jueves", L) };
  o.push(h1(t.secciones[3]), p(t.calIntro), table(t.calCols, Array.from({ length: 8 }, (_, w) => [String(w + 1), semanaRango(w, L), f.Lunes[w] + (w === 1 ? " *" : ""), f.Martes[w], f.Martes[w], f["Miércoles"][w], f.Jueves[w], f.Jueves[w]])), p("* " + t.feriadoNota), h3(L === "es" ? "Hitos" : "Milestones"), kv(t.hitos));
  o.push(h1(t.secciones[4]), p(t.tzIntro), table(t.tzCols, D.TZ_ROWS.map((r) => [r.horaChile, r.mexico, r.colombiaPeru, r.argentina, r.usaEste, r.espana, r.corea])));
  o.push(h1(t.secciones[5]), p(t.claseIntro), table(t.estructuraCols, t.claseBloques), h3(L === "es" ? "Qué incluye cada curso" : "What every course includes"), ul(t.incluye));
  o.push(h1(t.secciones[6]), p(t.evalIntro), table(t.evalCols, t.evalRows), `<p style="border:2px solid #4236F6;background:#EEF1F6;padding:8px">${esc(t.certRegla)}</p>`, p(t.certNiveles));
  o.push(h1(t.secciones[7]), kv(t.normas));
  o.push(h1(t.secciones[8]), ...t.faq.flatMap((q) => [`<p><b>${esc(q[0])}</b></p>`, p(q[1])]));
  o.push(h1(t.secciones[9]), kv(t.contacto));
  o.push(`<h1 style="font-size:20pt;color:#4236F6;page-break-before:always">${esc(t.parte2)}</h1>`, p(t.parte2Intro));
  for (const id of ORDEN) {
    const c = cursos.find((x) => x.cursoId === id); if (!c) continue;
    const clases = D.CLASES.filter((k) => k.cursoId === id); const dias = clases.map((k) => k.dia); const fc = dias.map((d) => fechas(d, L));
    o.push(`<h1 style="font-size:16pt;page-break-before:always">${esc(`${CODIGO[id]} · ${NOMBRE[L][id]} · ${SUB[L][id]}`)}</h1>`, p(c.descripcion));
    o.push(h2(t.ficha), kv([[t.fichaRows[0], CODIGO[id]], [t.fichaRows[1], id === "ninos" ? (L === "es" ? "Niños de 8 a 12 años" : "Kids aged 8 to 12") : "CEFR " + D.cursoPorId(id).cefr], [t.fichaRows[2], horarioCurso(id, L)], [t.fichaRows[3], D.profeDe(clases[0].profeId).nombre], [t.fichaRows[4], c.requisito_entrada || REQ[L][id]], [t.fichaRows[5], String(cupo(id)) + (clases.length > 1 ? (L === "es" ? " por sección" : " per section") : "")], [t.fichaRows[6], D.cursoPorId(id).libro], [t.fichaRows[7], dias.map((d) => fechas(d, L)[0] + " → " + fechas(d, L)[7]).join(" · ")]]));
    o.push(h2(t.perfil), p(c.perfil_alumno), h2(t.objetivos), ul(c.objetivos), h2(t.estructura), table(t.estructuraCols, c.estructura_clase.map((b) => [b.minutos, b.bloque, b.detalle])));
    o.push(h2(L === "es" ? "Calendario del curso" : "Course calendar"), table(t.semanaCols, c.semanas.map((s, i) => [String(s.n), fc.map((ff) => ff[i]).join(" / "), s.titulo, s.objetivo])));
    o.push(h2(t.detalleSemanas));
    c.semanas.forEach((s, i) => {
      o.push(h3(`${L === "es" ? "Semana" : "Week"} ${s.n} · ${fc.map((ff) => ff[i]).join(" / ")} · ${s.titulo}`));
      o.push(`<p><b>${L === "es" ? "Lección" : "Lesson"}:</b> ${esc(s.leccion)} · <b>${L === "es" ? "Objetivo" : "Objective"}:</b> ${esc(s.objetivo)}</p>`);
      o.push(`<p><b>${esc(t.lblGram)}</b></p>`, ul(s.gramatica), `<p><b>${esc(t.lblVoc)}:</b> ${esc(s.vocabulario.join(" · "))}</p>`, `<p><b>${esc(t.lblPrac)}</b></p>`, ul(s.practica), `<p><b>${esc(t.lblTarea)}</b></p>`, ul(s.tarea), `<p><b>${esc(t.lblCult)}:</b> <i>${esc(s.cultura)}</i></p>`);
    });
    o.push(h2(t.evalCurso), kv([[t.evalLbl[0], c.evaluacion.quizzes], [t.evalLbl[1], c.evaluacion.tareas], [t.evalLbl[2], c.evaluacion.examen_final], [t.evalLbl[3], c.evaluacion.oral], [t.evalLbl[4], t.certRegla]]), h2(t.materiales), ul(c.materiales));
  }
  o.push(`<h1 style="font-size:16pt;page-break-before:always">${esc(t.anexoTitulo)}</h1>`, table(t.tareasCols, t.tareasRows), h3(L === "es" ? "Equivalencias CEFR · TOPIK" : "CEFR · TOPIK equivalences"), table(t.cefrCols, t.cefrRows), `<p style="text-align:center;color:#4236F6;font-weight:bold;margin-top:24pt">${esc(t.cierre)}</p>`);
  return wrap(L, o, t);
}
function wrap(L, o, t) {
  return `<html><head><meta charset="utf-8"><title>${esc(t.titulo)} · Academia Seúl · 2026</title></head><body style="font-family:Arial,sans-serif;font-size:10.5pt;color:#1B1C24;line-height:1.35">${o.join("\n")}</body></html>`;
}
const min = (h) => h.replace(/ style="[^"]*"/g, "").replace(/<table>/g, '<table border="1" cellpadding="4">').replace(/<th>/g, '<th bgcolor="#003478"><font color="#ffffff">').replace(/<\/th>/g, "</font></th>").replace(/\n/g, "");
for (const L of ["es", "en"]) {
  const cursos = JSON.parse(fs.readFileSync(path.join(__dirname, `cursos_${L}.json`), "utf8"));
  for (const part of ["alumnos", "profes"]) {
    const html = min(build(L, cursos, part));
    fs.writeFileSync(path.join(__dirname, `programa_${L}_${part}.min.html`), html);
    console.log(L, part, (html.length / 1024).toFixed(0), "KB");
  }
}
