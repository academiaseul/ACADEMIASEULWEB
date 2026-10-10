// Básico 2 S5 y S8 no traían portada en el guion C.17: se agrega una lámina 0 para proyectar mientras entran
const fs = require("fs");
const f = process.argv[2]; const s = JSON.parse(fs.readFileSync(f, "utf8"));
const base = { layout: "portada", titulo_en: "", imagen: "", fuente: "Portada agregada (no está en C.17)" };
const add = {
  5: { ...base, L: "0", titulo: "Semana 5 · El futuro y tus planes", titulo_ko: "갈 거예요!", subtitulo: "Básico 2 (A1.2) · El futuro y tus planes", bullets: ["Miércoles 11 de noviembre de 2026 · 21:00 (hora de Chile)", "Jay Kim · 김재희 선생님"], notas: "Portada: se proyecta mientras entran (desde las 20:58). A las 21:00 pasa a la lámina 1." },
  8: { ...base, L: "0", titulo: "Semana 8 · Conectores, examen final y conversación", titulo_ko: "기초 한국어 2", subtitulo: "Básico 2 (A1.2) · La última clase", bullets: ["Miércoles 2 de diciembre de 2026 · 21:00 (hora de Chile)", "Jay Kim · 김재희 선생님"], notas: "Portada: se proyecta mientras entran (desde las 20:58). A las 21:00 pasa a la lámina 1." },
};
let n = 0;
for (const d of s) if (d.curso.startsWith("Básico 2") && add[d.semana] && d.slides[0].layout !== "portada") { d.slides.unshift(add[d.semana]); n++; }
fs.writeFileSync(f, JSON.stringify(s, null, 2)); console.log("portadas agregadas:", n);
