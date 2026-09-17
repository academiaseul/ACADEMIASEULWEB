// Limpia el export de Formspree y genera el CSV de importación para Brevo + resumen de segmentos.
const fs = require("fs");
const path = require("path");
const SRC = "C:/Users/Chingu/Downloads/formspree_mzdypyky_2026-09-17T10_11_22_export.csv";
const OUT_DIR = "C:/Users/Chingu/Desktop/ACADEMIASEULWEB/Brevo";
fs.mkdirSync(OUT_DIR, { recursive: true });

function parseCSV(t) {
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(f); f = ""; }
    else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; }
    else if (c !== "\r") f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  return rows;
}
const raw = fs.readFileSync(SRC, "utf8").replace(/^\uFEFF/, "");
const rows = parseCSV(raw);
const H = rows[0];
const recs = rows.slice(1).filter((r) => r.length > 5).map((r) => Object.fromEntries(H.map((h, i) => [h, (r[i] || "").trim()])));

const strip = (s) => (s || "").replace(/[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, "").replace(/\s+/g, " ").trim();
const title = (s) => strip(s).toLowerCase().replace(/(^|\s|-)([a-záéíóúñü])/g, (m, a, b) => a + b.toUpperCase());
const EXCL_EMAIL = /chingu\.kr@gmail\.com/i;

function origen(r) {
  const s = r._subject || "";
  if (/PAGO/i.test(s) || /Nueva inscripción — Nivel 1/i.test(s)) return "alumno_julio";
  if (/Lista de espera — Nivel 1/i.test(s)) return "lista_nivel1";
  if (/Intermedio|TOPIK|K-pop/i.test(s) && /Lista de espera/i.test(s)) return "lista_intermedio";
  if (/Test de nivel/i.test(s)) return "test_nivel";
  if (/Taller/i.test(s)) return "taller";
  if (/Descarga PDF/i.test(s)) return "descarga_pdf";
  return "contacto_web";
}
function nivelTxt(r) {
  return strip(r.nivel || r.nivelCoreano || r.nivel_coreano || (r.resultado ? "Test: " + r.resultado + " (" + r.puntaje + ")" : ""));
}
function interesTxt(r) { return strip(r.motivo || r.razon || r.meta || r.interes || ""); }
function cursoSugerido(o, nivel, edad, curso) {
  if (o === "alumno_julio") return "Básico 2 (A1.2)";
  if (o === "test_nivel") return /Tienes bases/i.test(nivel) ? "Básico 2 (A1.2)" : "Básico 1 (A1.1)";
  if (o === "lista_intermedio") return /topik/i.test(curso) ? "TOPIK II (B1+)" : "Conversacional 1 (A2.1)";
  if (/Intermedio o más/i.test(nivel)) return "Conversacional 1 (A2.1) · test de nivel";
  if (/Nivel básico \(A1|Nivel A1/i.test(nivel)) return "Básico 2 (A1.2) · test de nivel";
  if (/Conozco un poco|Sé leer/i.test(nivel)) return "Básico 1 (A1.1)";
  return "Básico 1 (A1.1)";
}
function prioridad(o, nivel) {
  if (["alumno_julio", "lista_nivel1", "lista_intermedio", "test_nivel", "contacto_web"].includes(o)) return "P1";
  if (/Conozco|Sé leer|Nivel básico|Intermedio/i.test(nivel)) return "P2";
  return "P3";
}

const byEmail = new Map();
for (const r of recs) {
  const email = (r.email || r.correo || "").trim().toLowerCase();
  if (!email || !/@/.test(email) || EXCL_EMAIL.test(email) || r.rut === "test") continue;
  const o = origen(r);
  const cur = byEmail.get(email) || { email, nombres: [], origenes: new Set(), fechas: [], niveles: [], intereses: [], paises: [], edades: [], tel: [], cursos: [], mensajes: [] };
  if (r.nombre) cur.nombres.push(strip(r.nombre));
  cur.origenes.add(o);
  cur.fechas.push(r._date.slice(0, 10));
  const n = nivelTxt(r); if (n) cur.niveles.push(n);
  const it = interesTxt(r); if (it) cur.intereses.push(it);
  const p = strip(r.pais || r.pais_ciudad); if (p) cur.paises.push(p);
  if (r.edad) cur.edades.push(r.edad);
  const t = (r.whatsapp || r.telefono || "").replace(/[^\d+]/g, ""); if (t && t.length >= 8 && !/^3\.9/.test(r.whatsapp)) cur.tel.push(t);
  if (r.curso) cur.cursos.push(r.curso);
  if (r.mensaje || r.motivacion) cur.mensajes.push(strip(r.mensaje || r.motivacion));
  byEmail.set(email, cur);
}

const ORDER = ["alumno_julio", "lista_nivel1", "lista_intermedio", "test_nivel", "contacto_web", "taller", "descarga_pdf"];
const out = [];
for (const c of byEmail.values()) {
  const origs = [...c.origenes].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
  const o = origs[0];
  const nombreCompleto = title(c.nombres.sort((a, b) => b.length - a.length)[0] || "");
  const first = nombreCompleto.split(" ")[0] || "";
  const nivel = c.niveles[0] || "";
  const pais = c.paises.map((p) => p.replace(/^Chile Santiago$|^Chile, Santiago$/, "Chile")).find(Boolean) || "";
  const curso = cursoSugerido(o, nivel, c.edades[0] || "", c.cursos.join(" "));
  const prio = prioridad(o, nivel);
  const fechas = c.fechas.sort();
  out.push({
    EMAIL: c.email, FIRSTNAME: first, NOMBRE_COMPLETO: nombreCompleto, PAIS: pais, EDAD: c.edades[0] || "", NIVEL: nivel,
    INTERES: [...new Set(c.intereses)].join(" / "), ORIGEN: origs.join("+"), PRIORIDAD: prio, CURSO_SUGERIDO: curso,
    FECHA_ALTA: fechas[0], ULTIMO_CONTACTO: fechas[fechas.length - 1], WHATSAPP: c.tel[0] || "", NOTA: [...new Set(c.mensajes)].join(" | ").slice(0, 300),
  });
}
out.sort((a, b) => a.PRIORIDAD.localeCompare(b.PRIORIDAD) || b.ULTIMO_CONTACTO.localeCompare(a.ULTIMO_CONTACTO));

const cols = Object.keys(out[0]);
const esc = (v) => /[",\n;]/.test(v) ? '"' + String(v).replace(/"/g, '""') + '"' : v;
const csv = "\uFEFF" + cols.join(",") + "\n" + out.map((r) => cols.map((c) => esc(r[c] ?? "")).join(",")).join("\n") + "\n";
fs.writeFileSync(path.join(OUT_DIR, "contactos_brevo_import.csv"), csv);

// resumen
const count = (k) => { const m = {}; out.forEach((r) => { const v = r[k] || "(vacío)"; m[v] = (m[v] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
const resumen = { total: out.length, prioridad: count("PRIORIDAD"), origen: count("ORIGEN"), curso: count("CURSO_SUGERIDO"), pais: count("PAIS").slice(0, 12), nivel: count("NIVEL"), conWhatsapp: out.filter((r) => r.WHATSAPP).length };
fs.writeFileSync(path.join(OUT_DIR, "resumen_segmentos.json"), JSON.stringify(resumen, null, 2));
console.log(JSON.stringify(resumen, null, 1));
