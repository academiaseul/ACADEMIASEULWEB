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
/* ── Nada de dar por buena la respuesta equivocada ───────────────────────────────
   ㅓ/ㅗ, ㅡ/ㅜ y la aspiración ㄱ/ㅋ son EL error del hispanohablante. Antes «ko»
   valía por 거, 고, 커 y 코 a la vez, y el modo Reconoce escondía la confusión. */
const sil = (s) => HR.itemSilaba(s);
// [sílaba, lo escrito, ¿se acepta?]
const ESCRITO = [
  ['거', 'geo', true], ['거', '거', true], ['거', 'go', false], ['거', 'ko', false], ['거', 'keo', false],
  ['고', 'go', true], ['고', '고', true], ['고', 'ko', false], ['고', 'geo', false],
  ['커', 'keo', true], ['커', 'ko', false], ['코', 'ko', true], ['코', 'go', false],
  ['그', 'geu', true], ['그', 'gu', false], ['그', 'ku', false],
  ['구', 'gu', true], ['구', 'goo', true], ['구', 'geu', false], ['구', 'ku', false],
  ['가', 'ga', true], ['가', 'ka', false], ['카', 'ka', true], ['카', 'ga', false],
  ['라', 'ra', true], ['라', 'la', true], ['머', 'meo', true], ['머', 'mo', false],
  ['너', 'neo', true], ['너', 'no', false], ['주', 'ju', true], ['주', 'jeu', false],
];
for (const [s, esc, esperado] of ESCRITO) ok(HR.coincide(sil(s), esc) === esperado, s + ' con «' + esc + '» debería ' + (esperado ? 'aceptarse' : 'rechazarse'));
// palabras: «mori» es 모리 y «kopi» es 코피 (café ≠ sangre de nariz)
for (const [id, esc, esperado] of [['w-meori', 'meori', true], ['w-meori', 'mori', false], ['w-keopi', 'keopi', true], ['w-keopi', 'kopi', false], ['w-hangeul', 'hangeul', true], ['w-hangeul', 'hangul', false], ['w-seoul', 'seoul', true], ['w-seoul', 'soul', false]]) {
  const it = C.items.find((i) => i.id === id);
  ok(it && HR.coincide(it, esc) === esperado, id + ' con «' + esc + '» debería ' + (esperado ? 'aceptarse' : 'rechazarse'));
}
// ninguna cadena puede valer por dos sílabas distintas (19 iniciales × 21 vocales)
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ', JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const quien = {};
for (const c of CHO) for (const v of JUNG) {
  const s = HR.compose(c, v);
  for (const a of HR.aceptadasDe(sil(s))) (quien[a] = quien[a] || []).push(s);
}
for (const [a, ss] of Object.entries(quien)) ok(ss.length === 1, '«' + a + '» vale por ' + ss.join(' y '));
// cada variante que sigue escrita en contenido.json se acepta de verdad (nada de letra muerta)
for (const it of C.items) for (const a of it.alt || []) ok(HR.coincide(it, a), 'variante ' + a + ' de ' + it.ko + ' ya no se acepta: sácala del json');
// el mensaje «casi: escribiste la ㅗ, aquí va la ㅓ» y el reintento
for (const [s, esc, jamo] of [['거', 'go', 'ㅗ'], ['그', 'gu', 'ㅜ'], ['가', 'ka', 'ㅋ'], ['머', 'mo', 'ㅗ']]) {
  const P = HR.nuevaPartida('corre', 'silabas', 7);
  P.cola = [sil(s)];
  const q = HR.siguiente(P, 1000);
  const r1 = HR.responder(P, esc, 1200);
  ok(!r1.ok, 'corre: «' + esc + '» no puede valer por ' + s);
  ok(r1.explicacion && r1.explicacion.casi, 'corre: falta el «casi» de ' + s + '/' + esc);
  ok(r1.explicacion.lineas.join(' ').includes(jamo), 'corre: el «casi» de ' + s + '/' + esc + ' no nombra ' + jamo);
  ok(HR.responder(P, q.item.rom, 1400).ok, 'corre: se puede reintentar ' + s);
}
// Reconoce entrena la confusión en vez de esconderla: la vecina de vocal sale como opción
for (const [s, vecina] of [['머', 'mo'], ['고', 'geo'], ['누', 'neo'], ['비', 'beo']]) {
  const vistas = new Set();
  for (let seed = 1; seed <= 150; seed++) for (const q of HR.nuevaPartida('reconoce', 'silabas', seed).preguntas) if (q.prompt === s) for (const o of q.opciones) vistas.add(o);
  ok(vistas.has(vecina), 'Reconoce esconde «' + vecina + '» como opción de ' + s);
}

/* ── El mensaje «casi» no inventa palabras ───────────────────────────────────────
   Decirle ««hangul» es 한굴» o ««kimchi» es 킴치» es mentir: esas palabras no existen.
   Solo se nombra una sílaba suelta, un ítem del json o algo de la lista «vecinas». */
const SIN_NOMBRE = [['w-hangeul', 'hangul'], ['w-gimchi', 'kimchi'], ['w-hakgyo', 'hakkyo'], ['w-seonsaengnim', 'sonsaengnim']];
for (const [id, esc] of SIN_NOMBRE) {
  const it = C.items.find((i) => i.id === id);
  const c = HR.casiDe(it.ko, esc);
  ok(c, 'casi: «' + esc + '» debería detectarse como letra cambiada de ' + it.ko);
  if (!c) continue;
  ok(!c.real, 'casi: ' + c.ko + ' no es palabra conocida y el motor la da por real');
  const P = HR.nuevaPartida('corre', 'palabras', 3);
  P.cola = [it];
  HR.siguiente(P, 1000);
  const ex = HR.responder(P, esc, 1200).explicacion;
  ok(/^Casi: cambiaste/.test(ex.titulo), 'casi: el título de ' + it.ko + '/' + esc + ' nombra una palabra inventada: ' + ex.titulo);
  ok(!/[가-힣]/.test(ex.titulo), 'casi: el título de ' + it.ko + '/' + esc + ' no debería traer hangul: ' + ex.titulo);
  ok(ex.lineas.join(' ').includes('Escribiste la'), 'casi: falta decir qué letra cambió en ' + it.ko + '/' + esc);
}
// y sí nombra las que existen de verdad: sílaba suelta, ítem del json y lista «vecinas»
for (const [ko, esc, debe] of [['고', 'ko', '코'], ['오이', 'ai', '아이'], ['커피', 'kopi', '코피'], ['서울', 'soul', '소울'], ['바다', 'boda', '보다']]) {
  const it = C.items.find((i) => i.ko === ko) || HR.itemSilaba(ko);
  const c = HR.casiDe(it.ko, esc);
  ok(c && c.real && c.ko === debe, 'casi: ' + ko + '/«' + esc + '» debería nombrar ' + debe);
}
for (const [ko, es] of Object.entries(C.vecinas || {})) {
  ok(Array.from(ko).every(HR.esSilaba), 'vecinas: ' + ko + ' no es hangul');
  ok(typeof es === 'string' && es, 'vecinas: ' + ko + ' sin significado en español');
}
// La pista del primer fallo no puede ser la respuesta completa (sílabas sueltas)
for (const m of C.modos) if (m.id === 'corre') for (const n of m.niveles) for (const it of HR.poolDe(n)) {
  const a = HR.pistaCorre(it);
  ok(a && a.clave, 'pista vacía en ' + it.ko);
  ok(HR.normRom(a.clave) !== HR.normRom(it.rom), 'la pista de ' + it.ko + ' regala la respuesta: ' + a.texto + ' ' + a.clave);
}
// Ninguna forma aceptada puede ser el comienzo de otra: en Corre la buena deja de enviarse sola
for (const it of C.items.concat(Array.from('ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ').flatMap((c) => Array.from('ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ').map((v) => sil(HR.compose(c, v)))))) {
  const as = HR.aceptadasDe(it);
  for (const a of as) for (const b of as) ok(!(a !== b && b.startsWith(a)), 'en ' + it.ko + ', «' + a + '» es el comienzo de «' + b + '»: saca una del json');
}
// Batchim dobles: sin ellos 읽 se leía «i», 많 «ma», 값 «ga» y 찮 se explicaba con «undefined»
for (const [s, r] of [['읽', 'ik'], ['많', 'man'], ['값', 'gap'], ['닭', 'dak'], ['여덟', 'yeodeol'], ['찮', 'chan']]) {
  ok(HR.romPorSilabas(s).join('') === r, s + ' debería romanizarse ' + r + ' y da «' + HR.romPorSilabas(s).join('') + '»');
}
for (const s of ['찮', '읽', '값']) ok(!HR.explicaSilaba(s).includes('undefined'), 'explicaSilaba(' + s + ') dice undefined');

const hex = (s) => Buffer.from(s, 'utf8').toString('hex');
const audio = path.join(__dirname, '..', 'public', 'audio', 'kr');
for (const it of C.items) if (!it.audio) ok(fs.existsSync(path.join(audio, hex(it.decir || it.ko) + '.mp3')), 'sin audio ' + it.ko + ' (suena con la voz del dispositivo)');
console.log(fallas ? fallas + ' fallas' : 'Todo bien: ' + C.items.length + ' ítems, ' + C.modos.reduce((a, m) => a + m.niveles.length, 0) + ' niveles.');
process.exit(fallas ? 1 : 0);
