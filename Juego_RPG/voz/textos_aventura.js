/* Junta todo lo que 호랑이의 모험 dice en voz alta y lo cruza con el guion de voz de Jay
   (Juego_Dubu/voz/Guion_Voz_Jay_2nov2026.md, bloques 1–8) y con los clips SunHi de public/audio/kr/.
   Uso: node Juego_RPG/voz/textos_aventura.js [--json]
   El juego busca cada clip por el texto SIN la puntuación final (안녕하세요! → 안녕하세요). */
const fs = require('fs');
const path = require('path');
const R = require('../../public/aventura/motor.js');
const RAIZ = path.join(__dirname, '..', '..');
const MUNDO = require('../../public/aventura/mundo.json');
const BANCO = require('../../public/aventura/preguntas.json').preguntas;

const limpio = (t) => t.replace(/[.!?~…]+$/u, '').trim();
const hex = (t) => Buffer.from(t, 'utf8').toString('hex');
const items = new Map(); // texto limpio → {texto, donde:Set, quien, nota}
function add(texto, donde, extra) {
  if (!texto) return;
  const k = limpio(texto);
  if (!items.has(k)) items.set(k, Object.assign({ texto, donde: new Set() }, extra || {}));
  items.get(k).donde.add(donde);
}
// 1) Lo que dicen los personajes
for (const [id, n] of Object.entries(MUNDO.npcs)) for (const d of n.dialogos) for (const l of d.lineas) {
  if (l.ko) add(l.ko, 'personajes', { quien: n.nombre, es: l.es });
  if (l.elige) for (const o of l.elige.opciones) add(o.ko, 'personajes', { quien: 'tigre (opción)', es: o.es });
}
for (const l of MUNDO.despedida) { if (l.ko) add(l.ko, 'tienda', { quien: '점원', es: l.es }); if (l.elige) for (const o of l.elige.opciones) add(o.ko, 'tienda', { quien: 'tigre (opción)', es: o.es }); }
for (const lineas of Object.values(MUNDO.info)) for (const l of lineas) if (l.ko) add(l.ko, 'letreros', { es: l.es });
// 2) La tienda
for (const o of Object.values(MUNDO.objetos)) { add(o.pedir, 'tienda', { es: `${o.es}, por favor` }); add(o.noPedir, 'tienda', { es: `es ${o.es}` }); }
add('안녕히 계세요.', 'tienda'); add('네, 여기 있어요.', 'tienda', { quien: '점원', es: 'Sí, aquí tiene' }); add('안녕히 가세요!', 'tienda', { quien: '점원' });
add('뚝딱!', 'duelos', { quien: '도깨비', es: 'el ruido del garrote mágico' });
// 3) Letreros: la palabra y cada sílaba (el armado hace sonar sílaba por sílaba)
for (const l of Object.values(MUNDO.letreros)) { add(l.palabra, 'letreros', { es: l.es }); for (const s of l.palabra) add(s, 'sílabas'); }
// 4) Letras del 도감: cada letra suena con su sílaba de referencia (ㄱ → 가, ㅗ → 오)
for (const j of R.CHO + R.JUNG) add(R.silabaDeLetra(j), 'letras');
// 5) Duelos: el audio de cada pregunta
for (const q of BANCO) if (q.audio) add(q.audio, 'duelos');

// Lo que ya está en los bloques 1–8 del guion de voz
const guion = fs.readFileSync(path.join(RAIZ, 'Juego_Dubu', 'voz', 'Guion_Voz_Jay_2nov2026.md'), 'utf8');
const enGuion = new Map();
let bloque = 0;
let dentro = false;
for (const linea of guion.split('\n')) {
  const m = linea.match(/^## Bloque (\d+)/); if (m) bloque = +m[1];
  if (linea.startsWith('```')) { dentro = !dentro; continue; }
  if (dentro && linea.trim() && bloque) enGuion.set(limpio(linea.trim()), bloque);
}
const sunhi = new Set(fs.readdirSync(path.join(RAIZ, 'public', 'audio', 'kr')).map((f) => f.replace(/\.mp3$/, '')));
const out = [...items.entries()].map(([k, v]) => ({
  texto: k, original: v.texto, donde: [...v.donde], quien: v.quien || '', es: v.es || '',
  bloque: enGuion.get(k) || null, sunhi: sunhi.has(hex(k)) || sunhi.has(hex(v.texto)), hex: hex(k),
}));
if (process.argv.includes('--json')) { process.stdout.write(JSON.stringify(out, null, 1)); return; }
const nuevos = out.filter((x) => !x.bloque);
console.log(`Textos que el juego dice: ${out.length}`);
console.log(`Ya en el guion (bloques 1–8): ${out.length - nuevos.length}`, Object.entries(out.filter((x) => x.bloque).reduce((a, x) => (a[x.bloque] = (a[x.bloque] || 0) + 1, a), {})));
console.log(`Nuevos para el bloque 9: ${nuevos.length} · de ellos sin clip SunHi: ${nuevos.filter((x) => !x.sunhi).length}`);
const por = {}; for (const x of nuevos) { const d = x.donde[0]; (por[d] = por[d] || []).push(x.texto); }
for (const [d, l] of Object.entries(por)) console.log(`  ${d} (${l.length}): ${l.join(' · ')}`);
