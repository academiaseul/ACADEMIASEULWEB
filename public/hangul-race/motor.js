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
  // Finales: la consonante que de verdad suena (갇/갓/갔 = «gat»). Las dobles (ㄺ ㄵ ㅄ…)
  // también: 읽 = «ik», 많 = «man», 값 = «gap». Sin ellas, 찮 se explicaba como «ㄶ (undefined)».
  const RR_F = { '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'k', 'ㄴ': 'n', 'ㄵ': 'n', 'ㄶ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'k', 'ㄻ': 'm', 'ㄼ': 'l', 'ㄽ': 'l', 'ㄾ': 'l', 'ㄿ': 'p', 'ㅀ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅄ': 'p', 'ㅅ': 't', 'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't' };
  // Formas que un hispanohablante escribe a menudo y que aceptamos al escribir
  const ALT_I = { 'ㄱ': ['k'], 'ㄷ': ['t'], 'ㅂ': ['p'], 'ㅈ': ['ch'], 'ㄹ': ['l'] };
  const ALT_M = { 'ㅓ': ['o'], 'ㅕ': ['yo'], 'ㅡ': ['u'], 'ㅜ': ['oo'] };
  // Una variante solo vale si NO es la lectura normal de otro jamo del mismo hueco:
  // «k» por ㄱ choca con ㅋ, «o» por ㅓ con ㅗ, «u» por ㅡ con ㅜ, «yo» por ㅕ con ㅛ.
  // ㅓ/ㅗ, ㅡ/ㅜ y la aspiración son EL error del hispanohablante: darlos por buenos
  // enseña al revés. Quedan en pie ㄹ→«l» y ㅜ→«oo», que no son de nadie más.
  function sinChoque(tabla, rr) {
    const out = {};
    for (const j of Object.keys(tabla)) {
      const otros = new Set(Object.keys(rr).filter((x) => x !== j).map((x) => rr[x]).filter(Boolean));
      out[j] = tabla[j].filter((a) => a && !otros.has(a));
    }
    return out;
  }
  const ALT_I_OK = sinChoque(ALT_I, RR_I);
  const ALT_M_OK = sinChoque(ALT_M, RR_M);

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
    const ini = [RR_I[d[0]]].concat(ALT_I_OK[d[0]] || []);
    const med = [RR_M[d[1]]].concat(ALT_M_OK[d[1]] || []);
    const fin = RR_F[d[2]] || '';
    const out = new Set();
    for (const a of ini) for (const b of med) out.add(a + b + fin);
    out.delete(romSilaba(s));
    return Array.from(out);
  }
  // Todas las formas con que se puede escribir una sílaba (la oficial y sus variantes limpias)
  const formasDe = (s) => [romSilaba(s)].concat(altSilaba(s)).map(normRom).filter(Boolean);
  // Sílabas con las que se confunde: misma final, inicial o vocal del grupo de confusión
  function vecinasDe(s) {
    const d = decompose(s);
    if (!d) return [];
    const out = [];
    for (const c of [d[0]].concat(grupoDe(d[0]))) for (const v of [d[1]].concat(grupoDe(d[1]))) {
      const t = compose(c, v, d[2]);
      if (t && t !== s) out.push(t);
    }
    return out;
  }

  /* ── Normalizar respuestas ─────────────────────────────────────────── */
  const normRom = (t) => (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
  const normKo = (t) => (t || '').normalize('NFC').replace(/[^가-힣ㄱ-ㆎ]/g, '');

  // ¿Esta cadena es en realidad OTRA palabra parecida? (머 «mo» = 모, 커피 «kopi» = 코피,
  // 한글 «hangul» = 한굴). Recorre la palabra sílaba por sílaba dejando cambiar cada una
  // por una vecina confundible; si se puede leer así cambiando al menos una, choca.
  function chocaCon(ko, cadena) {
    const sil = Array.from(ko || '').filter(esSilaba);
    const meta = normRom(cadena);
    if (!sil.length || !meta) return false;
    let est = [[0, false]]; // [letras ya leídas, ¿se cambió alguna sílaba?]
    for (const s of sil) {
      const opciones = [[s, false]].concat(vecinasDe(s).map((t) => [t, true]));
      const sig = new Map();
      for (const [pos, cambio] of est) {
        for (const [t, esOtra] of opciones) {
          for (const f of formasDe(t)) {
            if (f && meta.startsWith(f, pos)) sig.set((pos + f.length) + ':' + (cambio || esOtra), [pos + f.length, cambio || esOtra]);
          }
        }
      }
      est = Array.from(sig.values());
      if (!est.length) return false;
    }
    return est.some(([pos, cambio]) => pos === meta.length && cambio);
  }

  // Lo que de verdad se acepta: la romanización oficial siempre, y las variantes
  // solo si no son la lectura de otra palabra (si no, decirle «correcto» sería mentir).
  const CACHE_OK = new Map();
  function aceptadas(item) {
    const rom = normRom(item.rom);
    const alt = (item.alt || []).map(normRom).filter(Boolean);
    const clave = item.ko + '\u0000' + rom + '\u0000' + alt.join('\u0001');
    let out = CACHE_OK.get(clave);
    if (!out) {
      out = Array.from(new Set([rom].concat(alt.filter((a) => a !== rom && !chocaCon(item.ko, a))))).filter(Boolean);
      CACHE_OK.set(clave, out);
    }
    return out;
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
  let C = null, ITEM = {}, JAMO = {}, PORKO = {};

  function cargar(json) {
    C = json;
    ITEM = {};
    JAMO = {};
    PORKO = {};
    CACHE_OK.clear(); // los choques dependen de C.confusiones
    for (const it of json.items) {
      ITEM[it.id] = it;
      PORKO[normKo(it.ko)] = it;
      if (it.tipo === 'vocal' || it.tipo === 'consonante') JAMO[it.ko] = it;
    }
    return C;
  }
  // ¿Podemos decir «eso es 코피» sin inventar una palabra? Solo si es una sílaba suelta
  // (ahí la frase habla de la lectura: «ko» se lee 코), si está en el contenido, o si
  // está en la lista «vecinas» del json (palabras reales, con su significado).
  function vecinaConocida(ko) {
    const limpio = normKo(ko);
    if (Array.from(limpio).length === 1) return { ok: true, es: '' };
    if (PORKO[limpio]) return { ok: true, es: PORKO[limpio].es || '' };
    const v = (C && C.vecinas) || {};
    if (Object.prototype.hasOwnProperty.call(v, limpio)) return { ok: true, es: v[limpio] || '' };
    return { ok: false, es: '' };
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

  const nomI = (c) => (c === 'ㅇ' ? 'muda' : RR_I[c]);
  // Explicación en español de una sílaba: 거 = ㄱ (g) + ㅓ (eo)
  function explicaSilaba(s) {
    const d = decompose(s);
    if (!d) return '';
    const p = [d[0] + ' (' + nomI(d[0]) + ')', d[1] + ' (' + RR_M[d[1]] + ')'];
    if (d[2]) p.push(d[2] + ' (' + RR_F[d[2]] + ')');
    return s + ' = ' + p.join(' + ');
  }

  // ¿Lo que escribió (o eligió) es otra palabra parecida? Devuelve cuál y qué jamo cambió,
  // para poder decirle «casi: escribiste la ㅗ, aquí va la ㅓ» en vez de un error seco.
  function casiDe(ko, entrada) {
    const r = normRom(entrada);
    if (!r || normKo(entrada)) return null;
    const sil = Array.from(ko || '');
    for (let i = 0; i < sil.length; i++) {
      const d = decompose(sil[i]);
      if (!d) continue;
      for (const c of [d[0]].concat(grupoDe(d[0]))) for (const v of [d[1]].concat(grupoDe(d[1]))) {
        if (c === d[0] && v === d[1]) continue;
        const t = compose(c, v, d[2]);
        if (!t) continue;
        const otras = sil.slice();
        otras[i] = t;
        const palabra = otras.join('');
        if (normRom(romPorSilabas(palabra).join('')) !== r) continue;
        const lineas = [];
        if (v !== d[1]) lineas.push('Escribiste la ' + v + ' (' + RR_M[v] + '); aquí va la ' + d[1] + ' (' + RR_M[d[1]] + ').');
        if (c !== d[0]) lineas.push('Escribiste la ' + c + ' (' + nomI(c) + '); aquí va la ' + d[0] + ' (' + nomI(d[0]) + ').');
        const conocida = vecinaConocida(palabra);
        return { ko: palabra, silaba: t, rom: normRom(romPorSilabas(palabra).join('')), lineas, real: conocida.ok, es: conocida.es };
      }
    }
    return null;
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
  // Las confundibles (거/고, 그/구, 가/카) van primero a propósito: la confusión se entrena,
  // no se esconde. Antes quedaban fuera porque «go» contaba como respuesta válida de 거.
  function preguntaReconoce(item, pool, r) {
    const correcta = item.rom;
    const cerca = [], lejos = [];
    if (item.tipo === 'silaba') {
      const d = decompose(item.ko);
      for (const v of grupoDe(d[1])) { const s = compose(d[0], v, d[2]); if (s) cerca.push(romSilaba(s)); } // la vocal: ㅓ/ㅗ, ㅡ/ㅜ
      for (const c of grupoDe(d[0])) { const s = compose(c, d[1], d[2]); if (s) cerca.push(romSilaba(s)); } // la consonante: ㄱ/ㅋ
      for (const p of pool) lejos.push(p.rom);
    } else {
      for (const j of grupoDe(item.ko)) if (JAMO[j] && JAMO[j].tipo === item.tipo) cerca.push(JAMO[j].rom);
      for (const p of pool) lejos.push(p.rom);
    }
    // nunca una opción que también se aceptaría como correcta
    const validas = aceptadas(item);
    const distractores = [];
    for (const c of barajar(cerca, r).concat(barajar(lejos, r))) {
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

  // La pista del primer fallo. En una palabra, la primera sílaba («seon…»); en una sílaba
  // suelta eso sería la respuesta completa, así que solo se nombra la consonante: la vocal
  // (ㅓ/ㅗ, ㅡ/ㅜ) es justo lo que hay que acertar.
  function pistaCorre(item) {
    const sil = Array.from(item.ko || '').filter(esSilaba);
    if (!sil.length) return { texto: 'escríbelo como suena', clave: item.rom.slice(0, 2) + '…' };
    if (sil.length > 1) return { texto: 'empieza con', clave: romSilaba(sil[0]) + '…' };
    const d = decompose(sil[0]);
    if (d[0] === 'ㅇ') return { texto: 'la ㅇ del principio no suena:', clave: 'lee solo la vocal' };
    return { texto: 'empieza con la', clave: d[0] + ' (' + RR_I[d[0]] + ')' };
  }

  function preguntaCorre(item) {
    return { modo: 'corre', item, prompt: item.ko, correcta: item.rom, pista: romPorSilabas(item.ko), ayuda: pistaCorre(item) };
  }

  /* ── Explicaciones cuando la respuesta no es la correcta ───────────── */
  function explicar(pregunta, elegida) {
    const it = pregunta.item;
    const out = { titulo: '', lineas: [], casi: false };
    if (pregunta.modo === 'reconoce') {
      if (it.tipo === 'silaba') {
        out.titulo = it.ko + ' se lee ' + it.rom;
        const c = casiDe(it.ko, elegida);
        if (c) {
          out.casi = true;
          // Solo nombramos la otra palabra si existe de verdad: 한굴 o 킴치 no son palabras
          if (c.real) out.lineas.push('«' + elegida + '» es ' + c.ko + (c.es ? ' (' + c.es + ')' : '') + '.');
          for (const l of c.lineas) out.lineas.push(l);
        }
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
      // Corre (escribir): si lo que escribió es otra palabra, se lo decimos sin regalar
      // la respuesta, para que lo reintente: «Casi: «ko» es 코».
      const c = casiDe(it.ko, elegida);
      if (c) {
        out.casi = true;
        // Nombrar la otra palabra solo si existe (sílaba suelta, ítem del json o lista «vecinas»);
        // si no, se dice qué letra cambió y nada más: 한굴, 킴치 y 학쿄 no son palabras.
        out.titulo = c.real
          ? 'Casi: «' + String(elegida).trim() + '» es ' + c.ko + (c.es ? ' (' + c.es + ')' : '')
          : 'Casi: cambiaste ' + (c.lineas.length > 1 ? 'dos letras' : 'una letra');
        for (const l of c.lineas) out.lineas.push(l);
        if (it.tip) out.lineas.push(it.tip);
      } else {
        out.titulo = it.ko + ' se lee ' + it.rom;
        if (it.tip) out.lineas.push(it.tip);
        else out.lineas.push(Array.from(it.ko).filter(esSilaba).map(explicaSilaba).join(' · '));
      }
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
    normRom, normKo, coincide, vaBien, aceptadasDe, chocaCon, casiDe, vecinasDe, pistaCorre, rng, barajar,
    cargar, modo, nivel, poolDe, itemSilaba, queSuena,
    nuevaPartida, siguiente, responder, pasar, resumen, explicar,
    cargarProgreso, guardarProgreso, registrar, rango, recomendado, despuesDe, RUTA, XP,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HR = api;
})(typeof window !== 'undefined' ? window : globalThis);
