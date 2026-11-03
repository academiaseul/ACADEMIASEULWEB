/* ======================================================================
   호랑이의 모험 · La aventura del Tigre · motor del juego (sin DOM)
   Stats, combate por preguntas, inventario, tienda, misiones, letreros,
   IA de los 도깨비 (máquina de estados), rutas y guardado.
   El contenido vive en mundo.json y preguntas.json: el motor no tiene
   palabras propias. La pantalla (index.html + juego.js) solo llama a RPG.*.
   Prueba: node Juego_RPG/prueba_motor.js
   ====================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RPG = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ── Hangul (mismas tablas que 한글 Race) ─────────────────────────────── */
  const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
  const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const RR_I = { 'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt', 'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's', 'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h' };
  const RR_M = { 'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo', 'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa', 'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo', 'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui', 'ㅣ': 'i' };
  const RR_F = { '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄴ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅅ': 't', 'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't' };

  function compose(c, v, f) {
    const i = CHO.indexOf(c), m = JUNG.indexOf(v), k = JONG.indexOf(f || '');
    if (!c || !v || i < 0 || m < 0 || k < 0) return null;
    return String.fromCharCode(0xac00 + (i * 21 + m) * 28 + k);
  }
  function decompose(s) {
    const n = (s || '').charCodeAt(0) - 0xac00;
    if (!(n >= 0 && n < 11172)) return null;
    return [CHO[Math.floor(n / 588)], JUNG[Math.floor((n % 588) / 28)], JONG[n % 28]];
  }
  const esVocal = (j) => JUNG.includes(j) && j.length === 1;
  const esConsonante = (j) => CHO.includes(j) && j.length === 1;
  // La letra suelta suena con su sílaba de referencia (regla de Dubu): ㄱ → 가, ㅗ → 오
  function silabaDeLetra(j) {
    if (esConsonante(j)) return compose(j, 'ㅏ');
    if (esVocal(j)) return compose('ㅇ', j);
    return j;
  }
  function romLetra(j) {
    if (esVocal(j)) return RR_M[j];
    if (j === 'ㅇ') return 'muda al inicio · ng al final';
    if (esConsonante(j)) return RR_I[j];
    return '';
  }
  function romSilaba(s) {
    const d = decompose(s);
    return d ? (RR_I[d[0]] || '') + (RR_M[d[1]] || '') + (RR_F[d[2]] || '') : '';
  }
  // Las letras que hacen falta para escribir una palabra (sin repetir)
  function letrasDe(palabra) {
    const out = [];
    for (const s of Array.from(palabra || '')) {
      const d = decompose(s);
      if (!d) continue;
      for (const j of d) if (j && !out.includes(j)) out.push(j);
    }
    return out;
  }

  /* ── Azar con semilla ───────────────────────────────────────────────── */
  function azar(seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function barajar(arr, rnd) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const entre = (rnd, a, b) => a + Math.floor(rnd() * (b - a + 1));

  /* ── Mapas y baldosas ───────────────────────────────────────────────── */
  // Se camina por: . pasto · , flores · = piedra · : tierra · _ arena · - piso · b puente · D puerta
  const BLOQUEA = new Set(['R', 'G', 'T', '#', 'W', 'V', '^', 'F', 'S', 'C', 'H', 'L', 'X', 'd', '~', 'h']);
  function baldosa(mundo, mapaId, x, y) {
    const m = mundo.mapas[mapaId];
    if (!m || y < 0 || y >= m.filas.length || x < 0 || x >= m.filas[0].length) return null;
    return m.filas[y][x];
  }
  function caminable(mundo, mapaId, x, y) {
    const t = baldosa(mundo, mapaId, x, y);
    return t !== null && !BLOQUEA.has(t);
  }
  const DIRS = { arriba: [0, -1], abajo: [0, 1], izquierda: [-1, 0], derecha: [1, 0] };
  const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  // Ruta más corta (BFS) para «tocar para caminar». ocupado(x,y) marca NPC y 도깨비.
  // Si el destino no se pisa (un NPC, un letrero), llega a la casilla de al lado.
  function ruta(mundo, mapaId, desde, hasta, ocupado) {
    const libre = (x, y) => caminable(mundo, mapaId, x, y) && !(ocupado && ocupado(x, y));
    const m = mundo.mapas[mapaId];
    const W = m.filas[0].length, H = m.filas.length;
    const metas = libre(hasta.x, hasta.y) ? [hasta] :
      Object.values(DIRS).map(([dx, dy]) => ({ x: hasta.x + dx, y: hasta.y + dy })).filter((p) => libre(p.x, p.y) || (p.x === desde.x && p.y === desde.y));
    if (!metas.length) return null;
    const esMeta = (x, y) => metas.some((p) => p.x === x && p.y === y);
    if (esMeta(desde.x, desde.y)) return [];
    const prev = new Map(), k = (x, y) => y * W + x;
    const cola = [[desde.x, desde.y]];
    prev.set(k(desde.x, desde.y), null);
    while (cola.length) {
      const [x, y] = cola.shift();
      for (const [dx, dy] of Object.values(DIRS)) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H || prev.has(k(nx, ny)) || !libre(nx, ny)) continue;
        prev.set(k(nx, ny), [x, y]);
        if (esMeta(nx, ny)) {
          const out = [];
          let p = [nx, ny];
          while (p && !(p[0] === desde.x && p[1] === desde.y)) { out.unshift({ x: p[0], y: p[1] }); p = prev.get(k(p[0], p[1])); }
          return out;
        }
        cola.push([nx, ny]);
      }
    }
    return null;
  }

  /* ── Estado de la partida ───────────────────────────────────────────── */
  const VERSION = 1;
  function crearEstado(mundo) {
    const ini = mundo.inicio;
    const est = {
      v: VERSION, mapa: ini.mapa, x: ini.x, y: ini.y, dir: ini.dir || 'abajo',
      nivel: 1, xp: 0, hp: 0, won: ini.won || 0,
      objetos: {}, letras: [], letreros: {}, misiones: {}, flags: {},
      ajustes: { sonido: true, rom: false },
      stats: { aciertos: 0, errores: 0, duelos: 0, inicio: Date.now(), fin: null },
    };
    est.hp = hpMax(est);
    for (const id of ini.misiones || []) iniciarMision(est, mundo, id);
    return est;
  }

  /* ── Stats y nivel ──────────────────────────────────────────────────── */
  const xpTotalPara = (n) => 10 * n * (n - 1); // nivel 2: 20 · 3: 60 · 4: 120 · 5: 200
  const hpMax = (est) => 30 + 6 * (est.nivel - 1);
  const ataque = (est) => 10 + 2 * (est.nivel - 1);
  function ganarXP(est, n) {
    est.xp += n;
    let subio = 0;
    while (est.xp >= xpTotalPara(est.nivel + 1)) { est.nivel++; subio++; }
    if (subio) est.hp = hpMax(est); // subir de nivel recupera el 기운
    return subio;
  }
  function curar(est, n) {
    const antes = est.hp;
    est.hp = Math.min(hpMax(est), est.hp + n);
    return est.hp - antes;
  }

  /* ── Objetos y letras ───────────────────────────────────────────────── */
  const cuantos = (est, id) => est.objetos[id] || 0;
  function agregar(est, id, n) { est.objetos[id] = cuantos(est, id) + (n == null ? 1 : n); if (est.objetos[id] <= 0) delete est.objetos[id]; }
  function quitar(est, id, n) { if (cuantos(est, id) < (n || 1)) return false; agregar(est, id, -(n || 1)); return true; }
  function darLetra(est, j) {
    if (!j || est.letras.includes(j)) return false;
    est.letras.push(j);
    return true;
  }

  // Usar un objeto. En el mapa solo sirven los que curan; en el duelo, todos.
  function usarObjeto(est, mundo, id, batalla) {
    const o = mundo.objetos[id];
    if (!o || !cuantos(est, id)) return { ok: false, msg: 'No tienes ese objeto.' };
    const ef = o.efecto || {};
    if (ef.curar) {
      if (est.hp >= hpMax(est)) return { ok: false, msg: 'Ya tienes el 기운 lleno.' };
      quitar(est, id);
      const n = curar(est, ef.curar);
      return { ok: true, msg: `+${n} 기운`, curo: n };
    }
    if (!batalla) return { ok: false, msg: 'Este objeto se usa en un duelo.' };
    if (batalla.fin) return { ok: false, msg: 'El duelo ya terminó.' };
    if (ef.quitarOpcion) {
      const q = preguntaActual(batalla);
      const malas = q.opciones.filter((x) => x !== q.respuesta && !batalla.tachadas.includes(x) && !batalla.ocultas.includes(x));
      if (!malas.length) return { ok: false, msg: 'Ya no quedan opciones incorrectas.' };
      quitar(est, id);
      batalla.ocultas.push(malas[0]);
      return { ok: true, msg: 'El 부채 se llevó una opción incorrecta.', oculta: malas[0] };
    }
    if (ef.pista) {
      if (batalla.pista) return { ok: false, msg: 'Ya ves la pista.' };
      quitar(est, id);
      batalla.pista = true;
      return { ok: true, msg: 'El 붓 escribió la pista.' };
    }
    if (ef.escudo) {
      if (batalla.escudo) return { ok: false, msg: 'El 부적 ya te protege.' };
      quitar(est, id);
      batalla.escudo = true;
      return { ok: true, msg: 'El 부적 te protege del próximo golpe.' };
    }
    return { ok: false, msg: 'Este objeto no se usa así.' };
  }

  /* ── Tienda ─────────────────────────────────────────────────────────── */
  function comprar(est, mundo, tiendaId, id) {
    const t = mundo.tiendas[tiendaId], o = mundo.objetos[id];
    if (!t || !o || !t.objetos.includes(id)) return { ok: false, msg: 'Eso no se vende aquí.' };
    if (est.won < o.precio) return { ok: false, msg: `Te faltan ${fmtWon(o.precio - est.won)}.` };
    est.won -= o.precio;
    agregar(est, id);
    return { ok: true, msg: `Compraste ${o.nombre}.`, eventos: evento(est, mundo, { tipo: 'comprar', id }) };
  }
  const fmtWon = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';

  /* ── Misiones ───────────────────────────────────────────────────────── */
  function estadoMision(est, mundo, id) {
    const m = mundo.misiones[id], e = est.misiones[id];
    if (!m) return null;
    if (e && e.estado === 'hecha') return 'hecha';
    if (e && e.estado === 'activa') return objetivosCumplidos(est, mundo, id) ? 'lista' : 'activa';
    return (m.requiere || []).every((r) => est.misiones[r] && est.misiones[r].estado === 'hecha') ? 'disponible' : 'bloqueada';
  }
  function iniciarMision(est, mundo, id) {
    const m = mundo.misiones[id];
    if (!m || est.misiones[id]) return false;
    est.misiones[id] = { estado: 'activa', prog: m.objetivos.map(() => 0) };
    // Lo que ya se hizo antes también cuenta (un letrero armado, un objeto en la mochila)
    m.objetivos.forEach((o, i) => {
      if (o.tipo === 'letrero' && est.letreros[o.id]) est.misiones[id].prog[i] = 1;
      if (o.tipo === 'flag' && est.flags[o.id]) est.misiones[id].prog[i] = 1;
    });
    return true;
  }
  const metaDe = (o) => o.n || 1;
  function objetivosCumplidos(est, mundo, id) {
    const m = mundo.misiones[id], e = est.misiones[id];
    return !!e && m.objetivos.every((o, i) => (e.prog[i] || 0) >= metaDe(o));
  }
  // Un evento del juego (derrotar, letrero, comprar, flag) avanza las misiones activas
  function evento(est, mundo, ev) {
    const out = [];
    if (ev.tipo === 'flag') est.flags[ev.id] = true;
    for (const id of Object.keys(est.misiones)) {
      const e = est.misiones[id];
      if (e.estado !== 'activa') continue;
      const m = mundo.misiones[id];
      const antes = objetivosCumplidos(est, mundo, id);
      m.objetivos.forEach((o, i) => {
        if (o.tipo === ev.tipo && o.id === ev.id && (e.prog[i] || 0) < metaDe(o)) {
          e.prog[i] = (e.prog[i] || 0) + 1;
          out.push({ mision: id, texto: o.texto, prog: e.prog[i], meta: metaDe(o) });
        }
      });
      if (!antes && objetivosCumplidos(est, mundo, id)) out.push({ mision: id, lista: true, entrega: m.entrega || null });
    }
    return out;
  }
  function completarMision(est, mundo, id) {
    const m = mundo.misiones[id], e = est.misiones[id];
    if (!m || !e || e.estado === 'hecha') return null;
    e.estado = 'hecha';
    const r = m.recompensa || {};
    const res = { mision: id, titulo: m.titulo, xp: r.xp || 0, won: r.won || 0, objetos: r.objetos || {}, subio: 0 };
    if (r.won) est.won += r.won;
    for (const [o, n] of Object.entries(r.objetos || {})) agregar(est, o, n);
    if (r.xp) res.subio = ganarXP(est, r.xp);
    for (const s of m.abre || []) iniciarMision(est, mundo, s);
    return res;
  }

  /* ── Letreros (armar la palabra sílaba por sílaba) ──────────────────── */
  function faltanLetras(est, mundo, id) {
    const l = mundo.letreros[id];
    return letrasDe(l.palabra).filter((j) => !est.letras.includes(j));
  }
  // ¿El bloque armado es la sílaba que va? Si no, dice QUÉ parte falló.
  // Al primer error da una pista sin la respuesta; al segundo, la respuesta.
  function revisarSilaba(objetivo, ini, voc, fin, intento) {
    const meta = decompose(objetivo);
    const armada = compose(ini, voc, fin || '');
    if (armada === objetivo) return { ok: true, silaba: armada };
    const out = { ok: false, silaba: armada, partes: [] };
    if (ini !== meta[0]) out.partes.push('inicio');
    if (voc !== meta[1]) out.partes.push('vocal');
    if ((fin || '') !== meta[2]) out.partes.push('final');
    const p = out.partes[0];
    const segunda = (intento || 0) >= 1;
    if (p === 'inicio') {
      out.explicacion = ini === 'ㅇ' ? 'Esta sílaba no empieza con la ㅇ muda: escucha cómo arranca.' :
        meta[0] === 'ㅇ' ? `Esta sílaba empieza con vocal, así que adelante va la ㅇ muda (la silla vacía), no ${ini}.` :
        `El comienzo no suena «${RR_I[ini] || ini}». Escucha otra vez cómo arranca.`;
      if (segunda) out.explicacion += ` Va ${meta[0]} («${RR_I[meta[0]] || 'muda'}»).`;
    } else if (p === 'vocal') {
      out.explicacion = `La vocal no es ${voc} («${RR_M[voc]}»). Mira tus labios: ¿redondos, abiertos o en sonrisa?`;
      if (segunda) out.explicacion += ` Va ${meta[1]} («${RR_M[meta[1]]}»).`;
    } else {
      out.explicacion = meta[2] ? (fin ? `El piso de abajo (받침) no es ${fin}. Escucha cómo termina.` : 'Esta sílaba tiene piso de abajo (받침): escucha cómo termina.')
        : 'Esta sílaba no lleva nada abajo: termina en la vocal.';
      if (segunda && meta[2]) out.explicacion += ` Abajo va ${meta[2]} («${RR_F[meta[2]]}»).`;
    }
    return out;
  }
  function restaurarLetrero(est, mundo, id) {
    if (est.letreros[id]) return [];
    est.letreros[id] = true;
    return evento(est, mundo, { tipo: 'letrero', id });
  }

  /* ── Duelo ──────────────────────────────────────────────────────────── */
  function nuevaBatalla(mundo, est, tipo, banco, seed) {
    const E = mundo.enemigos[tipo];
    const rnd = azar(seed || Date.now());
    let pool = banco.filter((q) => E.niveles.includes(q.nivel));
    if (!pool.length) pool = banco.slice();
    const cola = barajar(pool, rnd).slice(0, E.preguntas || pool.length);
    return {
      tipo, nombre: E.nombre, hp: E.hp, hpMax: E.hp, atk: E.atk,
      cola, i: 0, combo: 0, intento: 0, tachadas: [], ocultas: [], pista: false, escudo: false,
      repetidas: [], opciones: null, fin: null, aciertos: 0, errores: 0, seed: Math.floor(rnd() * 1e9),
    };
  }
  function preguntaActual(b) {
    const q = b.cola[b.i % b.cola.length];
    if (!b.opciones) b.opciones = barajar([q.respuesta].concat(q.distractores), azar(b.seed + b.i));
    return Object.assign({}, q, { opciones: b.opciones });
  }
  function avanzar(b) {
    b.i++; b.intento = 0; b.tachadas = []; b.ocultas = []; b.pista = false; b.opciones = null;
  }
  function responder(b, est, opcion) {
    if (b.fin) return null;
    const q = preguntaActual(b);
    if (b.tachadas.includes(opcion) || b.ocultas.includes(opcion) || !q.opciones.includes(opcion)) return null;
    if (opcion === q.respuesta) {
      const primera = b.intento === 0;
      let dano = ataque(est), critico = false;
      if (primera) {
        b.combo++;
        if (b.combo % 3 === 0) { dano *= 2; critico = true; }
        b.aciertos++; est.stats.aciertos++;
      } else {
        b.combo = 0;
        dano = Math.ceil(dano / 2);
      }
      b.hp = Math.max(0, b.hp - dano);
      avanzar(b);
      if (b.hp === 0) b.fin = 'victoria';
      return { correcta: true, primera, dano, critico, combo: b.combo, pregunta: q, fin: b.fin };
    }
    b.combo = 0; b.intento++; b.errores++; est.stats.errores++;
    b.tachadas.push(opcion);
    // La pregunta fallada vuelve más adelante en este duelo (una vez)
    if (!b.repetidas.includes(q.id)) { b.repetidas.push(q.id); b.cola.splice(Math.min(b.i + 3, b.cola.length), 0, b.cola[b.i % b.cola.length]); }
    let dano = b.atk, escudo = false;
    if (b.escudo) { dano = 0; b.escudo = false; escudo = true; }
    est.hp = Math.max(0, est.hp - dano);
    if (est.hp === 0) b.fin = 'derrota';
    return { correcta: false, dano, escudo, pregunta: q, explicacion: q.explicacion, fin: b.fin };
  }
  // Botín: primero una letra que te falte para un letrero de una misión activa
  // (de las que ese 도깨비 puede llevar), si no, una letra nueva de su bolsa, y si
  // ya las tienes todas, más 원.
  function botin(b, est, mundo, rnd) {
    const E = mundo.enemigos[b.tipo];
    rnd = rnd || azar(b.seed + 7);
    const bolsa = bolsaDe(mundo, b.tipo);
    const necesarias = [];
    for (const id of Object.keys(est.misiones)) {
      if (est.misiones[id].estado !== 'activa') continue;
      for (const o of mundo.misiones[id].objetivos) {
        if (o.tipo !== 'letrero' || est.letreros[o.id]) continue;
        for (const j of faltanLetras(est, mundo, o.id)) if (bolsa.includes(j) && !necesarias.includes(j)) necesarias.push(j);
      }
    }
    const propias = (E.letras || []).filter((j) => !est.letras.includes(j));
    let letras = [], extra = 0;
    // El jefe devuelve de una vez todas las que falten
    if (necesarias.length) letras = E.jefe ? necesarias : [necesarias[0]];
    else if (propias.length) letras = [propias[Math.floor(rnd() * propias.length)]];
    else extra = 300;
    let won = entre(rnd, E.won[0], E.won[1]);
    won = Math.round((won + extra) / 100) * 100;
    for (const j of letras) darLetra(est, j);
    const letra = letras[0] || null;
    est.won += won;
    let objeto = null;
    if (E.objeto && rnd() < E.objeto.p) { objeto = E.objeto.id; agregar(est, objeto); }
    const subio = ganarXP(est, E.xp);
    est.stats.duelos++;
    const eventos = evento(est, mundo, { tipo: 'derrotar', id: b.tipo });
    return { letra, letras, won, objeto, xp: E.xp, subio, eventos };
  }
  // Un 도깨비 lleva sus letras y también las de los 도깨비 más débiles
  function bolsaDe(mundo, tipo) {
    const E = mundo.enemigos[tipo];
    const out = (E.letras || []).slice();
    for (const otro of Object.values(mundo.enemigos)) if (otro.rango < E.rango) for (const j of otro.letras || []) if (!out.includes(j)) out.push(j);
    return out;
  }

  /* ── Diálogos ───────────────────────────────────────────────────────── */
  function cumple(est, mundo, si) {
    if (!si) return true;
    if (si.mision) {
      const e = estadoMision(est, mundo, si.mision);
      const quiere = [].concat(si.estado || 'activa');
      if (!quiere.includes(e)) return false;
    }
    if (si.flag && !est.flags[si.flag]) return false;
    if (si.noFlag && est.flags[si.noFlag]) return false;
    if (si.objeto && !cuantos(est, si.objeto)) return false;
    if (si.letrero && !est.letreros[si.letrero]) return false;
    return true;
  }
  function elegirDialogo(est, mundo, npcId) {
    const n = mundo.npcs[npcId];
    return (n.dialogos || []).find((d) => cumple(est, mundo, d.si)) || null;
  }
  // Acciones que un diálogo puede disparar al terminar una línea
  function aplicarAccion(est, mundo, a) {
    const out = { mensajes: [], completadas: [], eventos: [] };
    if (!a) return out;
    if (a.iniciar) for (const id of [].concat(a.iniciar)) if (iniciarMision(est, mundo, id)) out.mensajes.push({ tipo: 'mision', id, texto: 'Nueva misión: ' + mundo.misiones[id].titulo });
    if (a.dar) for (const [o, n] of Object.entries(a.dar)) { agregar(est, o, n); out.mensajes.push({ tipo: 'objeto', id: o, texto: `+${n} ${mundo.objetos[o].nombre}` }); }
    if (a.quitar) for (const [o, n] of Object.entries(a.quitar)) quitar(est, o, n);
    if (a.letra) for (const j of [].concat(a.letra)) if (darLetra(est, j)) out.mensajes.push({ tipo: 'letra', id: j, texto: `Nueva letra: ${j}` });
    if (a.flag) out.eventos.push(...evento(est, mundo, { tipo: 'flag', id: a.flag }));
    if (a.curar) est.hp = hpMax(est);
    if (a.completar) for (const id of [].concat(a.completar)) { const r = completarMision(est, mundo, id); if (r) out.completadas.push(r); }
    return out;
  }

  /* ── IA de los 도깨비: quieto → paseo → persigue → vuelve ─────────── */
  // Devuelve la casilla a la que quiere moverse (o null). La pantalla decide si
  // está libre y anima el paso.
  function pensarEnemigo(en, jug, rnd) {
    const d = dist(en, jug), lejosDeCasa = dist(en, { x: en.casaX, y: en.casaY });
    if (en.aturdido > 0) { en.aturdido--; return null; }
    const ve = d <= (en.vista || 4);
    switch (en.estado) {
      case 'quieto':
        if (ve) { en.estado = 'persigue'; return hacia(en, jug); }
        if (--en.t <= 0) { en.estado = 'paseo'; en.t = entre(rnd, 2, 5); }
        return null;
      case 'paseo': {
        if (ve) { en.estado = 'persigue'; return hacia(en, jug); }
        if (--en.t <= 0) { en.estado = 'quieto'; en.t = entre(rnd, 2, 6); return null; }
        const [dx, dy] = Object.values(DIRS)[Math.floor(rnd() * 4)];
        const p = { x: en.x + dx, y: en.y + dy };
        return dentroDeZona(en, p) ? p : null;
      }
      case 'persigue':
        if (d > 6 || lejosDeCasa > 7) { en.estado = 'vuelve'; return hacia(en, { x: en.casaX, y: en.casaY }); }
        return hacia(en, jug);
      case 'vuelve':
        if (lejosDeCasa <= 1) { en.estado = 'quieto'; en.t = entre(rnd, 2, 5); return null; }
        if (ve && lejosDeCasa <= 4) { en.estado = 'persigue'; return hacia(en, jug); }
        return hacia(en, { x: en.casaX, y: en.casaY });
      default:
        en.estado = 'quieto'; en.t = 2; return null;
    }
  }
  function hacia(en, meta) {
    const dx = Math.sign(meta.x - en.x), dy = Math.sign(meta.y - en.y);
    if (!dx && !dy) return null;
    // Primero el eje más largo; si la pantalla lo encuentra bloqueado, prueba el otro (alt)
    const horiz = Math.abs(meta.x - en.x) >= Math.abs(meta.y - en.y);
    const a = horiz && dx ? { x: en.x + dx, y: en.y } : (dy ? { x: en.x, y: en.y + dy } : { x: en.x + dx, y: en.y });
    const b = horiz ? (dy ? { x: en.x, y: en.y + dy } : null) : (dx ? { x: en.x + dx, y: en.y } : null);
    return Object.assign(a, { alt: b });
  }
  function dentroDeZona(en, p) {
    const z = en.zona;
    return !z || (p.x >= z.x && p.y >= z.y && p.x < z.x + z.w && p.y < z.y + z.h);
  }

  /* ── Guardar y cargar ───────────────────────────────────────────────── */
  function serializar(est) { return JSON.stringify(est); }
  function cargar(texto, mundo) {
    try {
      const est = JSON.parse(texto);
      if (!est || est.v !== VERSION || !mundo.mapas[est.mapa]) return null;
      for (const k of ['objetos', 'letreros', 'misiones', 'flags']) if (!est[k] || typeof est[k] !== 'object') est[k] = {};
      if (!Array.isArray(est.letras)) est.letras = [];
      est.ajustes = Object.assign({ sonido: true, rom: false }, est.ajustes || {});
      est.stats = Object.assign({ aciertos: 0, errores: 0, duelos: 0, inicio: Date.now(), fin: null }, est.stats || {});
      est.hp = Math.min(Math.max(1, est.hp | 0), hpMax(est));
      return est;
    } catch (e) { return null; }
  }

  return {
    VERSION, CHO, JUNG, compose, decompose, esVocal, esConsonante, silabaDeLetra, romLetra, romSilaba, letrasDe,
    azar, barajar, BLOQUEA, baldosa, caminable, DIRS, dist, ruta,
    crearEstado, xpTotalPara, hpMax, ataque, ganarXP, curar,
    cuantos, agregar, quitar, darLetra, usarObjeto, comprar, fmtWon,
    estadoMision, iniciarMision, objetivosCumplidos, evento, completarMision,
    faltanLetras, revisarSilaba, restaurarLetrero,
    nuevaBatalla, preguntaActual, responder, botin, bolsaDe,
    cumple, elegirDialogo, aplicarAccion,
    pensarEnemigo, serializar, cargar,
  };
});
