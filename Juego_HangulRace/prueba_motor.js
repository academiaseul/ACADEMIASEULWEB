// Prueba del motor de 한글 Race: node Juego_HangulRace/prueba_motor.js  (desde la raíz del repo)
// Revisa que cada nivel genere preguntas válidas, que se acepten la romanización, sus variantes y el hangul,
// que ninguna opción incorrecta sea en realidad correcta y que cada ítem tenga su audio.
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'public', 'hangul-race');
const HR = require(path.join(R, 'motor.js'));
const C = HR.cargar(JSON.parse(fs.readFileSync(path.join(R, 'contenido.json'), 'utf8')));
let fallas = 0;
const ok = (c, m) => { if (!c) { fallas++; console.log('FALLA:', m); } };
const ids = new Set(C.items.map((i) => i.id));
for (const m of C.modos) for (const n of m.niveles) for (const id of n.items || []) ok(ids.has(id), 'id inexistente ' + id);
for (const m of C.modos) for (const n of m.niveles) {
  for (let seed = 1; seed <= 40; seed++) {
    const P = HR.nuevaPartida(m.id, n.id, seed); let t = 0, q;
    if (m.id === 'corre') {
      for (let k = 0; k < 30; k++) {
        q = HR.siguiente(P, (t += 1000));
        ok(HR.coincide(q.item, q.item.rom) && HR.coincide(q.item, q.item.ko), 'acepta ' + q.item.ko);
        for (const a of q.item.alt || []) ok(HR.coincide(q.item, a), 'variante ' + a);
        HR.responder(P, q.item.rom, t + 300);
      }
    } else {
      while ((q = HR.siguiente(P, (t += 1000)))) {
        ok(q.opciones.length === 4 && new Set(q.opciones).size === 4 && q.opciones.includes(q.correcta), m.id + '/' + n.id + ' opciones ' + q.opciones);
        if (q.item.tipo === 'silaba' && m.id === 'reconoce') for (const o of q.opciones) ok(o === q.correcta || !HR.coincide(q.item, o), 'opción ambigua ' + q.prompt + ' ' + o);
        const mala = q.opciones.find((o) => o !== q.correcta);
        const r1 = HR.responder(P, mala, t + 200);
        ok(!r1.ok && r1.explicacion.titulo, 'explicación ' + q.prompt);
        ok(HR.responder(P, q.correcta, t + 400).ok, 'segundo intento ' + q.prompt);
      }
    }
  }
}
const hex = (s) => Buffer.from(s, 'utf8').toString('hex');
const audio = path.join(__dirname, '..', 'public', 'audio', 'kr');
for (const it of C.items) if (!it.audio) ok(fs.existsSync(path.join(audio, hex(it.decir || it.ko) + '.mp3')), 'sin audio ' + it.ko + ' (suena con la voz del dispositivo)');
console.log(fallas ? fallas + ' fallas' : 'Todo bien: ' + C.items.length + ' ítems, ' + C.modos.reduce((a, m) => a + m.niveles.length, 0) + ' niveles.');
process.exit(fallas ? 1 : 0);
