// La voz de Jay para Dubu y el Lector con ElevenLabs (Node 18+, sin dependencias).
//
//   node generate_voz.js clone "Jay Chingu (ko)" muestra1.m4a [muestra2.m4a ...]   → crea un clon instantáneo y muestra el voiceId
//   node generate_voz.js voices                                                   → lista las voces de la cuenta
//   node generate_voz.js probar <voiceId>                                         → 8 clips de prueba en ./pruebas
//   node generate_voz.js generate <voiceId> --dubu | --lector | --lista archivo.txt   → clips en ./out-jay (reanudable)
//   node generate_voz.js deploy [carpeta]                                         → copia ./out-jay a public/audio/kr-jay (o la carpeta dada)
//
// La API key se lee de ELEVENLABS_API_KEY o de C:\Users\<usuario>\.elevenlabs_key (una línea). Nunca se imprime ni se guarda en el repo.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const REPO = path.resolve(__dirname, "..", "..");
const CLIPS_SUNHI = path.join(REPO, "public/audio/kr");
const CLIPS_JAY = path.join(REPO, "public/audio/kr-jay");
const OUT = path.join(__dirname, "out-jay");
const PRUEBAS = path.join(__dirname, "pruebas");
const MODEL = "eleven_multilingual_v2";     // coreano con buena calidad; alternativa: eleven_v3
const FORMAT = "mp3_44100_64";
const SETTINGS = { stability: 0.6, similarity_boost: 0.85, style: 0.1, use_speaker_boost: true, speed: 0.9 };
const CONCURRENCY = 2;

function apiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const f = path.join(process.env.USERPROFILE || process.env.HOME || ".", ".elevenlabs_key");
  if (fs.existsSync(f)) return fs.readFileSync(f, "utf8").trim();
  console.error("Falta la clave: crea " + f + " con tu API key de ElevenLabs (una sola línea).");
  process.exit(1);
}
const hexOf = (t) => Buffer.from(t, "utf8").toString("hex");
const textosDeCarpeta = (dir) => fs.readdirSync(dir).filter((f) => f.endsWith(".mp3")).map((f) => Buffer.from(f.replace(".mp3", ""), "hex").toString("utf8")).sort();

// Los textos que Dubu necesita, calculados desde el propio juego (clipsNecesarios en public/dubu/index.html)
function textosDubu() {
  const html = fs.readFileSync(path.join(REPO, "public/dubu/index.html"), "utf8");
  const js = html.slice(html.indexOf("<script>") + 8, html.lastIndexOf("</script>")).replace(/^'use strict';/m, "");
  const ctx = { console, location: { search: "" }, window: {}, document: { getElementById: () => null, addEventListener: () => {} }, TextEncoder, Audio: function () {}, setTimeout, matchMedia: () => ({ matches: false }) };
  vm.createContext(ctx);
  vm.runInContext(js + "\nglobalThis.__t = clipsNecesarios();", ctx);
  return ctx.__t.concat(["두부"]).sort();
}

async function tts(key, voiceId, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${FORMAT}`;
  for (let attempt = 1; attempt <= 5; attempt++) {
    const r = await fetch(url, { method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ text, model_id: MODEL, language_code: "ko", voice_settings: SETTINGS }) });
    if (r.ok) return Buffer.from(await r.arrayBuffer());
    const body = await r.text().catch(() => "");
    if (r.status === 429 || r.status >= 500) { await new Promise((res) => setTimeout(res, 1500 * attempt)); continue; }
    throw new Error(`HTTP ${r.status} para "${text}": ${body.slice(0, 200)}`);
  }
  throw new Error("Demasiados reintentos para " + text);
}

async function cmdClone(nombre, archivos) {
  if (!nombre || !archivos.length) { console.error('Uso: clone "Nombre" muestra1.m4a [muestra2 ...]'); process.exit(1); }
  const key = apiKey();
  const fd = new FormData();
  fd.append("name", nombre);
  fd.append("description", "Jay Kim, fundador de Academia Seúl. Coreano nativo. Uso: sílabas y palabras del Lector y de Dubu.");
  fd.append("labels", JSON.stringify({ language: "ko", accent: "seoul", use_case: "education" }));
  fd.append("remove_background_noise", "true");
  for (const a of archivos) {
    if (!fs.existsSync(a)) { console.error("No existe:", a); process.exit(1); }
    const ext = path.extname(a).toLowerCase();
    const mime = ext === ".wav" ? "audio/wav" : ext === ".m4a" ? "audio/mp4" : "audio/mpeg";
    fd.append("files", new Blob([fs.readFileSync(a)], { type: mime }), path.basename(a));
  }
  const r = await fetch("https://api.elevenlabs.io/v1/voices/add", { method: "POST", headers: { "xi-api-key": key }, body: fd });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { console.error("ElevenLabs respondió", r.status, JSON.stringify(j).slice(0, 300)); process.exit(1); }
  console.log("Clon creado. voiceId:", j.voice_id);
  console.log("Siguiente: node generate_voz.js probar " + j.voice_id);
}

async function cmdVoices() {
  const key = apiKey();
  const r = await fetch("https://api.elevenlabs.io/v2/voices?page_size=100", { headers: { "xi-api-key": key } });
  const voices = ((await r.json()).voices) || [];
  console.log("Voces en la cuenta:", voices.length);
  for (const v of voices) console.log(`  ${v.voice_id}  ${v.name}  ${v.category || ""}  ${JSON.stringify(v.labels || {})}`);
}

async function cmdProbar(voiceId) {
  if (!voiceId) { console.error("Uso: probar <voiceId>"); process.exit(1); }
  const key = apiKey();
  fs.mkdirSync(PRUEBAS, { recursive: true });
  const textos = ["가", "카", "까", "어", "오", "안", "앙", "김치"];
  for (const t of textos) {
    const f = path.join(PRUEBAS, `${t}.mp3`);
    fs.writeFileSync(f, await tts(key, voiceId, t));
    console.log("  →", f);
  }
  console.log("\nEscucha los 8 en", PRUEBAS, ": ¿se distinguen 가/카/까 y 어/오? ¿Suena natural? Si sí: generate <voiceId> --dubu");
}

async function cmdGenerate(voiceId, modo, archivoLista) {
  if (!voiceId) { console.error("Uso: generate <voiceId> --dubu | --lector | --lista archivo.txt"); process.exit(1); }
  const key = apiKey();
  let textos;
  if (modo === "--lector") textos = textosDeCarpeta(CLIPS_SUNHI);
  else if (modo === "--lista") textos = fs.readFileSync(archivoLista, "utf8").split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith("#"));
  else textos = textosDubu();
  fs.mkdirSync(OUT, { recursive: true });
  const pendientes = textos.filter((t) => !fs.existsSync(path.join(OUT, hexOf(t) + ".mp3")));
  console.log(`Textos: ${textos.length} · por generar: ${pendientes.length} · voz ${voiceId} · ${MODEL}`);
  let done = 0, fail = 0, i = 0;
  const worker = async () => {
    while (i < pendientes.length) {
      const t = pendientes[i++];
      try { fs.writeFileSync(path.join(OUT, hexOf(t) + ".mp3"), await tts(key, voiceId, t)); done++; }
      catch (e) { fail++; console.log("  ✗", t, e.message); }
      if ((done + fail) % 20 === 0) console.log(`  ${done + fail}/${pendientes.length}`);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`Listo: ${done} generados, ${fail} fallidos → ${OUT}`);
}

function cmdDeploy(destino) {
  const dest = destino ? path.resolve(destino) : CLIPS_JAY;
  const files = fs.readdirSync(OUT).filter((f) => f.endsWith(".mp3"));
  if (!files.length) { console.error("No hay clips en", OUT); process.exit(1); }
  fs.mkdirSync(dest, { recursive: true });
  let bytes = 0;
  for (const f of files) { fs.copyFileSync(path.join(OUT, f), path.join(dest, f)); bytes += fs.statSync(path.join(OUT, f)).size; }
  console.log(`Copiados ${files.length} clips a ${dest} (${(bytes / 1024 / 1024).toFixed(2)} MB). Ahora: git add, commit y push; en el juego, Ajustes → Voz de Jay.`);
}

const [, , cmd, a, ...rest] = process.argv;
(async () => {
  if (cmd === "clone") await cmdClone(a, rest);
  else if (cmd === "voices") await cmdVoices();
  else if (cmd === "probar") await cmdProbar(a);
  else if (cmd === "generate") await cmdGenerate(a, rest[0] || "--dubu", rest[1]);
  else if (cmd === "deploy") cmdDeploy(a);
  else if (cmd === "lista") console.log(textosDubu().join("\n"));
  else console.log("Comandos: clone | voices | probar | generate | deploy | lista");
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
