// Une es/*.json y en/*.json en cursos_es.json / cursos_en.json (orden de la escalera).
const fs = require("fs");
const ORDEN = ["a11", "a12", "a21", "topik2", "ninos"];
for (const L of ["es", "en"]) {
  const arr = ORDEN.map((id) => JSON.parse(fs.readFileSync(`${L}/${id}.json`, "utf8")));
  fs.writeFileSync(`cursos_${L}.json`, JSON.stringify(arr, null, 1));
  console.log(L, arr.map((c) => c.cursoId + ":" + c.semanas.length).join(" "));
}
