/* ======================================================================
   한글 Race · motor del juego (sin DOM)
   Hangul (componer/descomponer, romanización), preguntas por modo,
   puntaje y progreso. La pantalla (index.html) solo llama a HR.*.
   El contenido vive en contenido.json: el motor no tiene palabras propias.
   ====================================================================== */
(function (root) {
  'use strict';

  /* ── Hangul ─────────────────────────────────────────────────────────── */
  const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const VERTICALES = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅣ'; // van a la derecha de la consonante

  function compose(c, v, f) {
    const i = CHO.indexOf(c), m = JUNG.indexOf(v), k = JONG.indexOf(f || '');
    if (i < 0 || m < 0 || k < 0) return null;
    return String.fromCharCode(0xac00 + (i * 21 + m) * 28 + k);
  }
  function decompose(s) {
    const n = (s || '').charCodeAt(0) - 0xac00;
    if (!(n >= 0 && n < 11172)) return null;
    return [CHO[Math.floor(n / 588)], JUNG[Math.floor((n % 588) / 28)], JONG[n % 28]];
  }
  const esSilaba = (ch) => decompose(ch) !== null;
  const esVertical = (v) => VERTICALES.includes(v);

  const RR_I = { 'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt', 'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's', 'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h' };
  const RR_M = { 'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo', 'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa', 'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo', 'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui', 'ㅣ': 'i' };
  const RR_F = { '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄴ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅅ': 't', 'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't' };
  // Formas que un hispanohablante escribe a menudo y que aceptamos al escribir
  const ALT_I = { 'ㄱ': ['k'], 'ㄷ': ['t'], 'ㅂ': ['p'], 'ㅈ': ['ch'], 'ㄹ': ['l'] };
  const ALT_M = { 'ㅓ': ['o'], 'ㅕ': ['yo'], 'ㅡ': ['u'], 'ㅜ': ['oo'] };

  function romSilaba(s) {
    const d = decompose(s);
    if (!d) return '';
    return (RR_I[d[0]] || '') + (RR_M[d[1]] || '') + (RR_F[d[2]] || '');
  }
  // Romanización sílaba por sílaba (sin reglas entre sílabas): solo para pistas
  const romPorSilabas = (ko) => Array.from(ko).filter(esSilaba).map(romSilaba);

  function altSilaba(s) {
    const d = decompose(s);
    if (!d) return [];
    const ini = [RR_I[d[0]]].concat(ALT_I[d[0]] || []);
    const med = [RR_M[d[1]]].concat(ALT_M[d[1]] || []);
    const fin = RR_F[d[2]] || '';
    const out = new Set();
    for (const a of ini) for (const b of med) out.add(a + b + fin);
    out.delete(romSilaba(s));
    return Array.from(out);
  }

  /* ── Normalizar respuestas ─────────────────────────────────────────── */
  const normRom = (t) => (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
  const normKo = (t) => (t || '').normalize('NFC').replace(/[^가-힣ㄱ-ㆎ]/g, '');

  function aceptadas(item) {
    return [item.rom].concat(item.alt || []).map(normRom).filter(Boolean);
  }
  // ¿La respuesta escrita es correcta? Acepta romanización (y sus variantes) o el hangul mismo.
  function coincide(item, entrada) {
    const ko = normKo(entrada);
    if (ko && ko === normKo(item.ko)) return true;
    const r = normRom(entrada);
    return !!r && aceptadas(item).includes(r);
  }
  // ¿Va bien encaminada? (prefijo de alguna respuesta aceptada): para no marcar error mientras escribe
  function vaBien(item, entrada) {
    const ko = normKo(entrada);
    if (ko) return normKo(item.ko).startsWith(ko);
    const r = normRom(entrada);
    return !r || aceptadas(item).some((a) => a.startsWith(r));
  }

  /* ── Azar con semilla (para reproducir una partida en pruebas) ─────── */
  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return function () {
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      return ((s >>> 0) % 1e9) / 1e9;
    };
  }
  function barajar(arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const elegir = (arr, r) => arr[Math.floor(r() * arr.length)];

  /* ── Contenido ─────────────────────────────────────────────────────── */
  let C = null, ITEM = {}, JAMO = {};

  function cargar(json) {
    C = json;
    ITEM = {};
    JAMO = {};
    for (const it of json.items) {
      ITEM[it.id] = it;
      if (it.tipo === 'vocal' || it.tipo === 'consonante') JAMO[it.ko] = it;
    }
    return C;
  }
  const modo = (id) => C.modos.find((m) => m.id === id);
  const nivel = (m, n) => (modo(m) || { niveles: [] }).niveles.find((x) => x.id === n);

  // Item para una sílaba armada por el juego (no está en el json)
  function itemSilaba(s) {
    const existente = C.items.find((i) => i.ko === s);
    if (existente) return existente;
    return { id: 'g-' + s, tipo: 'silaba', ko: s, rom: romSilaba(s), alt: altSilaba(s), nivel: 'A1', categoria: 'hangul', acceso: 'gratis', generado: true };
  }
  const queSuena = (item) => item.decir || item.ko;

  function grupoDe(j) {
    return (C.confusiones || []).filter((g) => g.includes(j)).flat().filter((x) => x !== j);
  }

  // Explicación en español de una sílaba: 거 = ㄱ (g) + ㅓ (eo)
  function explicaSilaba(s) {
    const d = decompose(s);
    if (!d) return '';
    const p = [d[0] + ' (' + (d[0] === 'ㅇ' ? 'muda' : RR_I[d[0]]) + ')', d[1] + ' (' + RR_M[d[1]] + ')'];
    if (d[2]) p.push(d[2] + ' (' + RR_F[d[2]] + ')');
    return s + ' = ' + p.join(' + ');
  }

  /* ── Preguntas por modo ────────────────────────────────────────────── */
  function poolDe(nv) {
    const items = (nv.items || []).map((id) => ITEM[id]).filter(Boolean);
    if (nv.generar) {
      for (const c of nv.generar.iniciales) for (const v of nv.generar.vocales) {
        const s = compose(c, v);
        if (s && !items.some((i) => i.ko === s)) items.push(itemSilaba(s));
      }
    }
    if (nv.silabas) for (const s of nv.silabas) items.push(itemSilaba(s));
    return items;
  }

  function tomar(pool, n, r) {
    let out = [];
    while (out.length < n) out = out.concat(barajar(pool, r));
    // sin la misma pregunta dos veces seguidas
    for (let i = 1; i < out.length; i++) if (out[i].ko === out[i - 1].ko) { const j = (i + 1) % out.length; [out[i], out[j]] = [out[j], out[i]]; }
    return out.slice(0, n);
  }

  // Reconoce: letra o sílaba → elige cómo suena (4 opciones)
  function preguntaReconoce(item, pool, r) {
    const correcta = item.rom;
    const cand = [];
    if (item.tipo === 'silaba') {
      const d = decompose(item.ko);
      for (const v of grupoDe(d[1])) { const s = compose(d[0], v, d[2]); if (s) cand.push(romSilaba(s)); }
      for (const c of grupoDe(d[0])) { const s = compose(c, d[1], d[2]); if (s) cand.push(romSilaba(s)); }
      for (const p of pool) cand.push(p.rom);
    } else {
      for (const j of grupoDe(item.ko)) if (JAMO[j] && JAMO[j].tipo === item.tipo) cand.push(JAMO[j].rom);
      for (const p of pool) cand.push(p.rom);
    }
    // nunca una opción que también sería correcta (고 se puede escribir go o ko)
    const validas = item.tipo === 'silaba' ? aceptadas(item).concat(altSilaba(item.ko).map(normRom)) : [normRom(correcta)];
    const distractores = [];
    for (const c of barajar(cand.slice(0, 6), r).concat(barajar(cand.slice(6), r))) {
      if (c && c !== correcta && !validas.includes(normRom(c)) && !distractores.includes(c)) distractores.push(c);
      if (distractores.length === 3) break;
    }
    return { modo: 'reconoce', item, prompt: item.ko, correcta, opciones: barajar([correcta].concat(distractores), r) };
  }

  // Construye: piezas → elige la sílaba armada (4 opciones)
  function preguntaConstruye(item, r) {
    const [c, v, f] = decompose(item.ko);
    const cand = [];
    for (const x of grupoDe(v)) cand.push(compose(c, x, f));
    for (const x of grupoDe(c)) cand.push(compose(x, v, f));
    if (f) {
      for (const x of ['ㄴ', 'ㅇ', 'ㄹ', 'ㅁ', 'ㄱ', 'ㅂ']) if (x !== f) cand.push(compose(c, v, x));
      cand.push(compose(c, v)); // olvidar el batchim
    }
    const gv = grupoDe(v), gc = grupoDe(c);
    if (gv.length && gc.length) cand.push(compose(elegir(gc, r), elegir(gv, r), f));
    const distractores = [];
    for (const s of barajar(cand.filter(Boolean), r)) {
      if (s !== item.ko && !distractores.includes(s)) distractores.push(s);
      if (distractores.length === 3) break;
    }
    return { modo: 'construye', item, piezas: [c, v].concat(f ? [f] : []), prompt: item.ko, correcta: item.ko, opciones: barajar([item.ko].concat(distractores), r), vertical: esVertical(v), batchim: !!f };
  }

  function preguntaCorre(item) {
    return { modo: 'corre', item, prompt: item.ko, correcta: item.rom, pista: romPorSilabas(item.ko) };
  }

  /* ── Explicaciones cuando la respuesta no es la correcta ───────────── */
  function explicar(pregunta, elegida) {
    const it = pregunta.item;
    const out = { titulo: '', lineas: [] };
    if (pregunta.modo === 'reconoce') {
      if (it.tipo === 'silaba') {
        out.titulo = it.ko + ' se lee ' + it.rom;
        out.lineas.push(explicaSilaba(it.ko));
        const d = decompose(it.ko);
        if (JAMO[d[1]] && JAMO[d[1]].tip) out.lineas.push(d[1] + ' = ' + RR_M[d[1]] + ': ' + JAMO[d[1]].tip);
      } else {
        out.titulo = it.ko + ' = ' + it.rom;
        if (it.tip) out.lineas.push(it.tip);
        const otro = Object.values(JAMO).find((j) => j.rom === elegida && j.ko !== it.ko);
        if (otro) out.lineas.push('«' + elegida + '» es ' + otro.ko + (otro.tip ? ': ' + otro.tip : ''));
      }
    } else if (pregunta.modo === 'construye') {
      const [c, v, f] = pregunta.piezas;
      out.titulo = 'Elegiste ' + elegida + ': ' + explicaSilaba(elegida).split(' = ')[1];
      const de = decompose(elegida) || [];
      if (de[1] !== v) out.lineas.push('Mira la vocal: necesitas ' + v + ' (' + RR_M[v] + ').');
      if (de[0] !== c) out.lineas.push('Mira la consonante: necesitas ' + c + ' (' + (c === 'ㅇ' ? 'muda' : RR_I[c]) + ').');
      if ((de[2] || '') !== (f || '')) out.lineas.push(f ? 'Abajo va ' + f + ': la consonante final (batchim) se escribe debajo.' : 'Esta sílaba no lleva consonante abajo.');
      out.lineas.push(esVertical(v) ? v + ' es vertical: va a la derecha de la consonante.' : v + ' es horizontal: va debajo de la consonante.');
    } else {
      out.titulo = it.ko + ' se lee ' + it.rom;
      if (it.tip) out.lineas.push(it.tip);
      else out.lineas.push(Array.from(it.ko).filter(esSilaba).map(explicaSilaba).join(' · '));
    }
    return out;
  }

  /* ── Partida ───────────────────────────────────────────────────────── */
  const XP = { primera: 10, segunda: 4, rapida: 3, racha: 5 };

  function nuevaPartida(modoId, nivelId, seed) {
    const r = rng(seed || Date.now());
    const m = modo(modoId), nv = nivel(modoId, nivelId);
    if (!m || !nv) throw new Error('Modo o nivel desconocido: ' + modoId + '/' + nivelId);
    const pool = poolDe(nv);
    const P = {
      modo: modoId, nivel: nivelId, r, pool,
      total: modoId === 'corre' ? null : (nv.preguntas || 10),
      segundos: modoId === 'corre' ? (m.segundos || 60) : null,
      preguntas: [], i: -1, actual: null, intentos: 0, inicioPregunta: 0, inicio: 0, fin: 0,
      correctas: 0, primeraVez: 0, respondidas: 0, racha: 0, mejorRacha: 0, xp: 0,
      vistos: {}, fallos: {},
    };
    if (modoId === 'reconoce') P.preguntas = tomar(pool, P.total, r).map((it) => preguntaReconoce(it, pool, r));
    else if (modoId === 'construye') P.preguntas = tomar(pool, P.total, r).map((it) => preguntaConstruye(it, r));
    else P.cola = barajar(pool, r);
    return P;
  }

  function siguiente(P, ahora) {
    if (!P.inicio) P.inicio = ahora;
    P.i++;
    if (P.modo === 'corre') {
      if (!P.cola.length) P.cola = barajar(P.pool, P.r);
      let it = P.cola.shift();
      if (P.actual && it.ko === P.actual.item.ko && P.cola.length) { P.cola.push(it); it = P.cola.shift(); }
      P.actual = preguntaCorre(it);
    } else {
      if (P.i >= P.preguntas.length) { P.actual = null; return null; }
      P.actual = P.preguntas[P.i];
    }
    P.intentos = 0;
    P.inicioPregunta = ahora;
    return P.actual;
  }

  // Responde la pregunta actual. Devuelve qué pasó; la pantalla decide cómo mostrarlo.
  function responder(P, valor, ahora) {
    const q = P.actual;
    if (!q) return null;
    const ok = q.modo === 'corre' ? coincide(q.item, valor) : valor === q.correcta;
    P.intentos++;
    const res = { ok, primera: ok && P.intentos === 1, xp: 0, racha: P.racha, hito: false, explicacion: null };
    if (ok) {
      P.correctas++;
      P.respondidas++;
      P.vistos[q.item.id] = q.item;
      if (res.primera) {
        P.primeraVez++;
        P.racha++;
        res.xp += XP.primera;
        if (q.modo === 'corre' && ahora - P.inicioPregunta <= 3000) res.xp += XP.rapida;
        if (P.racha % 5 === 0) { res.xp += XP.racha; res.hito = true; }
      } else {
        res.xp += XP.segunda;
      }
      P.mejorRacha = Math.max(P.mejorRacha, P.racha);
      P.xp += res.xp;
      res.racha = P.racha;
    } else {
      if (P.intentos === 1) { P.racha = 0; P.fallos[q.item.id] = q.item; }
      res.racha = 0;
      res.explicacion = explicar(q, valor);
    }
    return res;
  }

  // Corre: pasar la palabra (cuenta como respondida sin acierto)
  function pasar(P) {
    const q = P.actual;
    if (!q) return;
    if (P.intentos === 0) { P.racha = 0; }
    P.respondidas++;
    P.fallos[q.item.id] = q.item;
    P.vistos[q.item.id] = q.item;
  }

  function resumen(P, ahora) {
    P.fin = ahora;
    const intentadas = P.modo === 'corre' ? P.respondidas : P.preguntas.length;
    const precision = intentadas ? Math.round((P.primeraVez / intentadas) * 100) : 0;
    return {
      modo: P.modo, nivel: P.nivel, xp: P.xp, precision, correctas: P.correctas, primeraVez: P.primeraVez,
      intentadas, mejorRacha: P.mejorRacha, segundos: Math.round((P.fin - P.inicio) / 1000),
      aprendidos: Object.values(P.vistos), repasar: Object.values(P.fallos),
    };
  }

  /* ── Progreso (sin cuenta; se guarda en este navegador) ────────────── */
  const CLAVE = 'hr-progreso-v1';
  const RUTA = [['reconoce', 'vocales'], ['reconoce', 'consonantes'], ['construye', 'al-lado'], ['construye', 'abajo'], ['reconoce', 'silabas'], ['corre', 'silabas'], ['construye', 'batchim'], ['corre', 'palabras'], ['corre', 'vocabulario']];

  function progresoVacio() {
    return { v: 1, xp: 0, partidas: 0, records: {}, mejorRacha: 0, aprendidos: {}, sonido: true, creado: null };
  }
  function cargarProgreso(store) {
    try {
      const j = JSON.parse((store || root.localStorage).getItem(CLAVE) || 'null');
      if (j && j.v === 1) return Object.assign(progresoVacio(), j);
    } catch (e) { /* sin almacenamiento: se juega igual */ }
    return progresoVacio();
  }
  function guardarProgreso(p, store) {
    try { (store || root.localStorage).setItem(CLAVE, JSON.stringify(p)); } catch (e) { /* ignorar */ }
  }

  // Suma la partida al progreso. Devuelve { record, subioRango, rangoAntes, rangoAhora }
  function registrar(p, R) {
    const clave = R.modo + ':' + R.nivel;
    const antes = p.records[clave];
    let record = false;
    if (!antes) record = true;
    else if (R.modo === 'corre') record = R.primeraVez > antes.primeraVez;
    else record = R.precision > antes.precision || (R.precision === antes.precision && R.segundos < antes.segundos);
    if (record) p.records[clave] = { precision: R.precision, segundos: R.segundos, primeraVez: R.primeraVez, racha: R.mejorRacha, xp: R.xp };
    const rangoAntes = rango(p.xp);
    p.xp += R.xp;
    p.partidas++;
    p.mejorRacha = Math.max(p.mejorRacha, R.mejorRacha);
    for (const it of R.aprendidos) p.aprendidos[it.id] = (p.aprendidos[it.id] || 0) + 1;
    const rangoAhora = rango(p.xp);
    return { record: record && !!antes, primera: !antes, subioRango: rangoAhora.nombre !== rangoAntes.nombre, rangoAntes, rangoAhora };
  }

  function rango(xp) {
    const rs = (C && C.rangos) || [{ xp: 0, nombre: 'Principiante', ko: '새내기' }];
    let actual = rs[0], prox = null;
    for (let i = 0; i < rs.length; i++) if (xp >= rs[i].xp) { actual = rs[i]; prox = rs[i + 1] || null; }
    const base = actual.xp, meta = prox ? prox.xp : actual.xp;
    return { nombre: actual.nombre, ko: actual.ko, proximo: prox, avance: prox ? Math.min(1, (xp - base) / (meta - base)) : 1 };
  }

  // Siguiente paso recomendado de la ruta: el primero sin récord o con menos de 80 %
  function recomendado(p) {
    for (const [m, n] of RUTA) {
      const rec = p.records[m + ':' + n];
      if (!rec) return { modo: m, nivel: n };
      if (m !== 'corre' && rec.precision < 80) return { modo: m, nivel: n };
      if (m === 'corre' && rec.primeraVez < 10) return { modo: m, nivel: n };
    }
    return { modo: 'corre', nivel: 'vocabulario' };
  }
  function despuesDe(m, n) {
    const i = RUTA.findIndex(([a, b]) => a === m && b === n);
    return i >= 0 && i < RUTA.length - 1 ? { modo: RUTA[i + 1][0], nivel: RUTA[i + 1][1] } : null;
  }

  const aceptadasDe = aceptadas;
  const api = {
    compose, decompose, esSilaba, esVertical, romSilaba, romPorSilabas, altSilaba, explicaSilaba,
    normRom, normKo, coincide, vaBien, aceptadasDe, rng, barajar,
    cargar, modo, nivel, poolDe, itemSilaba, queSuena,
    nuevaPartida, siguiente, responder, pasar, resumen, explicar,
    cargarProgreso, guardarProgreso, registrar, rango, recomendado, despuesDe, RUTA, XP,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HR = api;
})(typeof window !== 'undefined' ? window : globalThis);
