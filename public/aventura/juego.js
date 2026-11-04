/* ======================================================================
   호랑이의 모험 · pantalla
   Bucle, cámara, dibujo, controles y ventanas (diálogo, duelo, tienda,
   letreros, mochila). Toda la lógica de juego está en motor.js (RPG.*);
   todo el contenido, en mundo.json y preguntas.json.
   ====================================================================== */
(function () {
  'use strict';
  // /aventura?prueba=1: el bucle corre con un reloj, para poder probar con la pestaña oculta
  if (/[?&]prueba=1/.test(location.search)) window.requestAnimationFrame = (f) => setTimeout(() => f(performance.now()), 33);
  const R = window.RPG, S = window.SPRITES, T = S.T;
  const $ = (id) => document.getElementById(id);
  const CLAVE = 'as-aventura-v1';
  const BASE = '/aventura/';
  let MUNDO = null, BANCO = [], est = null;
  let modo = 'titulo'; // titulo · mapa · dialogo · batalla · capa
  const rnd = R.azar(Date.now() & 0xffffff);

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ── Audio: voz de Jay (/audio/kr-jay) → SunHi (/audio/kr) → voz del dispositivo ── */
  const AUDIO_BASE = '/audio/kr/', AUDIO_JAY = '/audio/kr-jay/', cacheAudio = {}, falta = {};
  let sonando = null, koVoz = null;
  // indice.json lista los textos que Jay ya grabó (lo arma Juego_RPG/voz/indice_kr_jay.js).
  // Si no existe, no se pide ningún clip de Jay y todo suena como hoy.
  let vozJay = new Set();
  fetch(AUDIO_JAY + 'indice.json').then((r) => (r.ok ? r.json() : [])).then((l) => { if (Array.isArray(l)) vozJay = new Set(l); }).catch(() => {});
  function eligeVoz() { try { koVoz = speechSynthesis.getVoices().find((v) => (v.lang || '').toLowerCase().startsWith('ko')) || null; } catch (e) {} }
  if ('speechSynthesis' in window) { eligeVoz(); try { speechSynthesis.onvoiceschanged = eligeVoz; } catch (e) {} }
  const hex = (t) => { try { return Array.from(new TextEncoder().encode(t)).map((b) => b.toString(16).padStart(2, '0')).join(''); } catch (e) { return null; } };
  function tts(t) { try { if (!('speechSynthesis' in window)) return; const u = new SpeechSynthesisUtterance(t); u.lang = 'ko-KR'; if (koVoz) u.voice = koVoz; u.rate = 0.85; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} }
  // El clip se busca con el texto tal cual y, si no está, sin la puntuación final
  function oir(texto) {
    if (!texto || (est && !est.ajustes.sonido)) return;
    bajarMusica(6000);
    const limpio = texto.replace(/[.!?~…]+$/u, '').trim();
    const candidatos = [limpio, texto].filter((x, i, a) => x && a.indexOf(x) === i).map((x) => AUDIO_BASE + hex(x) + '.mp3');
    if (vozJay.has(limpio) && !(est && est.ajustes.vozJay === false)) candidatos.unshift(AUDIO_JAY + hex(limpio) + '.mp3');
    probar(candidatos, 0, limpio || texto);
  }
  function probar(lista, i, texto) {
    const src = lista[i];
    if (!src) { tts(texto); return; }
    if (falta[src]) { probar(lista, i + 1, texto); return; }
    try {
      if (sonando) sonando.pause();
      let a = cacheAudio[src];
      if (!a) { a = new Audio(src); cacheAudio[src] = a; }
      sonando = a; a.currentTime = 0; a.onended = subirMusica;
      const p = a.play();
      if (p && p.catch) p.catch((err) => { if (err && err.name === 'NotAllowedError') return; falta[src] = 1; delete cacheAudio[src]; probar(lista, i + 1, texto); });
    } catch (e) { tts(texto); }
  }
  const oirLetra = (j) => oir(R.silabaDeLetra(j));
  // Sonidos de juego, sin archivos
  let actx = null;
  function blip(f, dur, tipo, vol, a) {
    if (est && !est.ajustes.sonido) return;
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + (a || 0);
      o.type = tipo || 'square'; o.frequency.setValueAtTime(f, t0);
      g.gain.setValueAtTime(vol || 0.05, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(actx.destination); o.start(t0); o.stop(t0 + dur + 0.02);
    } catch (e) {}
  }
  const SFX = {
    golpe: () => { blip(520, 0.08); blip(780, 0.12, 'square', 0.05, 0.07); },
    zarpazo: () => { blip(520, 0.07); blip(780, 0.07, 'square', 0.05, 0.06); blip(1040, 0.18, 'square', 0.06, 0.12); },
    error: () => { blip(220, 0.16, 'triangle', 0.07); blip(180, 0.2, 'triangle', 0.06, 0.1); },
    moneda: () => { blip(988, 0.06, 'square', 0.04); blip(1319, 0.14, 'square', 0.04, 0.06); },
    nivel: () => { [523, 659, 784, 1047].forEach((f, i) => blip(f, 0.14, 'square', 0.045, i * 0.09)); },
    letra: () => { [784, 988, 1175].forEach((f, i) => blip(f, 0.12, 'triangle', 0.06, i * 0.07)); },
    toque: () => blip(660, 0.04, 'square', 0.025),
    choque: () => blip(110, 0.06, 'triangle', 0.05),
  };

  /* ── Música: pentatónica y patrones de 장구, compuesta para este juego y sin archivos ── */
  const NOTA = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const hz = (n) => 440 * Math.pow(2, (NOTA[n[0]] + (+n[1] + 1) * 12 - 69) / 12);
  // 'A4:3' = la nota A4 durante 3 pasos · 'r:3' = 3 pasos de silencio
  function pauta(txt) {
    const notas = [];
    let p = 0;
    for (const t of txt.trim().split(/\s+/)) { const [n, d] = t.split(':'); if (n !== 'r') notas[p] = { f: hz(n), d: +d }; p += +d; }
    return { notas, largo: p };
  }
  const TEMAS = {
    plaza: { paso: 0.2, vol: 0.028, perc: 'D..k.kD..',
      mel: pauta('A4:3 B4:3 D5:3 E5:6 D5:3 B4:3 A4:3 G4:3 A4:9 D5:3 E5:3 G5:3 E5:3 D5:3 B4:3 A4:3 B4:2 A4:1 G4:3 E4:6 r:3'),
      baj: pauta('D3:9 A2:9 G2:9 D3:9 G2:9 E3:9 A2:9 D3:9') },
    duelo: { paso: 0.115, vol: 0.024, perc: 'D.kDk.D.k.kk',
      mel: pauta('D5:3 F5:3 G5:3 A5:3 G5:3 F5:3 D5:6 C5:3 D5:3 F5:3 G5:3 F5:3 D5:3 C5:3 A4:3'),
      baj: pauta('D3:3 r:3 D3:3 C3:3 D3:3 r:3 A2:3 C3:3 D3:3 r:3 D3:3 F3:3 C3:3 r:3 A2:3 C3:3') },
    jefe: { paso: 0.095, vol: 0.026, perc: 'D.kDk.DkD.kk',
      mel: pauta('A4:3 C5:3 D5:3 F5:3 D5:3 C5:3 A4:6 G4:3 A4:3 C5:3 D5:3 C5:3 A4:3 G4:3 F4:3'),
      baj: pauta('A2:3 r:3 A2:3 G2:3 A2:3 r:3 F2:3 G2:3 A2:3 r:3 A2:3 C3:3 G2:3 r:3 F2:3 G2:3') },
  };
  let mus = null, ruido = null, relojBaja = 0;
  // Sin esto la música queda unos 22 dB bajo la voz y en un celular casi no se oye. Con 3 queda
  // unos 13 dB bajo la voz, sin saturar. Si suena fuerte o suave, es el único número que hay que tocar.
  const VOL_MUSICA = 3;
  function notaMus(f, t, dur, tipo, vol) {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = tipo; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(mus.salida); o.start(t); o.stop(t + dur + 0.02);
  }
  // 덩 (D): golpe grave · 덕 (k): golpe seco
  function jang(t, grave) {
    const g = actx.createGain();
    g.connect(mus.salida);
    if (grave) {
      const o = actx.createOscillator();
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(70, t + 0.09);
      g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      o.connect(g); o.start(t); o.stop(t + 0.14);
      return;
    }
    if (!ruido) {
      ruido = actx.createBuffer(1, Math.floor(actx.sampleRate * 0.08), actx.sampleRate);
      const d = ruido.getChannelData(0);
      for (let k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
    }
    const s = actx.createBufferSource(), f = actx.createBiquadFilter();
    s.buffer = ruido; f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = 1.2;
    g.gain.setValueAtTime(0.04, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    s.connect(f); f.connect(g); s.start(t); s.stop(t + 0.08);
  }
  function programar() {
    if (!mus) return;
    const M = TEMAS[mus.tema];
    while (mus.prox < actx.currentTime + 0.3) {
      const t = mus.prox, p = mus.p;
      const m = M.mel.notas[p % M.mel.largo]; if (m) notaMus(m.f, t, m.d * M.paso * 0.92, 'triangle', M.vol);
      const b = M.baj.notas[p % M.baj.largo]; if (b) notaMus(b.f, t, b.d * M.paso * 0.9, 'square', M.vol * 0.32);
      const c = M.perc[p % M.perc.length]; if (c !== '.') jang(t, c === 'D');
      mus.prox += M.paso; mus.p++;
    }
  }
  function pararMusica() {
    if (!mus) return;
    clearInterval(mus.reloj);
    const s = mus.salida;
    s.gain.setTargetAtTime(0, actx.currentTime, 0.05);
    setTimeout(() => { try { s.disconnect(); } catch (e) {} }, 500);
    mus = null;
  }
  function tocarMusica(tema) {
    if (!actx) return;
    const quiere = est && est.ajustes.sonido && est.ajustes.musica ? tema : null;
    if (mus && mus.tema === quiere) return;
    pararMusica();
    if (!quiere) return;
    const salida = actx.createGain();
    salida.gain.value = VOL_MUSICA;
    salida.connect(actx.destination);
    mus = { tema: quiere, p: 0, prox: actx.currentTime + 0.12, salida, reloj: setInterval(programar, 90) };
    programar();
  }
  const temaActual = () => (modo === 'batalla' && bat ? (bat.en.jefe ? 'jefe' : 'duelo') : 'plaza');
  // Mientras suena el coreano la música casi desaparece: lo importante es oír la sílaba.
  // Vuelve cuando termina el clip; ms es solo un tope por si el clip nunca avisa (el más largo dura 4,9 s).
  function bajarMusica(ms) {
    if (!mus) return;
    mus.salida.gain.setTargetAtTime(VOL_MUSICA * 0.08, actx.currentTime, 0.03);
    clearTimeout(relojBaja);
    relojBaja = setTimeout(subirMusica, ms);
  }
  function subirMusica() {
    clearTimeout(relojBaja);
    if (mus) mus.salida.gain.setTargetAtTime(VOL_MUSICA, actx.currentTime, 0.25);
  }

  /* ── Guardar ───────────────────────────────────────────────────────── */
  let borrando = false;   // Al recargar se dispara visibilitychange, que guardaría de nuevo lo recién borrado
  function guardar() { if (!est || borrando) return; est.x = jug.x; est.y = jug.y; est.dir = jug.dir; try { localStorage.setItem(CLAVE, R.serializar(est)); } catch (e) {} }
  function leerGuardado() { try { return R.cargar(localStorage.getItem(CLAVE), MUNDO); } catch (e) { return null; } }

  /* ── Lienzo, escala y cámara ───────────────────────────────────────── */
  const cv = $('mundo'), ctx = cv.getContext('2d');
  let dpr = 1, escala = 4;
  function medir() {
    dpr = Math.min(3, window.devicePixelRatio || 1);
    cv.width = Math.round(window.innerWidth * dpr);
    cv.height = Math.round(window.innerHeight * dpr);
    escala = Math.max(2, Math.floor(Math.min(cv.width, cv.height) / (T * 10.5)));
  }
  window.addEventListener('resize', medir);
  const pintados = {};
  function pintarMapa(id) {
    const m = MUNDO.mapas[id], W = m.filas[0].length, H = m.filas.length;
    const c = document.createElement('canvas'); c.width = W * T; c.height = H * T;
    const x = c.getContext('2d');
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) S.dibujarBaldosa(x, m.filas, i, j);
    for (const o of m.objetos || []) {
      if (o.tipo === 'puerta-palacio') S.puertaPalacio(x, o.x * T, o.y * T);
      if (o.tipo === 'estatua') S.estatua(x, o.x * T, o.y * T);
    }
    const agua = [];
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) if (m.filas[j][i] === '~') agua.push([i, j]);
    pintados[id] = { c, W, H, agua };
  }

  /* ── Entidades ─────────────────────────────────────────────────────── */
  const jug = { x: 0, y: 0, dir: 'abajo', mov: null, ruta: [], alFinal: null, pasos: 0 };
  let npcs = [], enemigos = [], reapariciones = [], uid = 0;
  const mapa = () => MUNDO.mapas[est.mapa];
  const destino = (e) => (e.mov ? e.mov.to : e);
  function npcOculto(id) { const n = MUNDO.npcs[id]; return n.ocultoSi && R.cumple(est, MUNDO, n.ocultoSi); }
  function refrescarNPCs() { npcs = npcs.filter((n) => !npcOculto(n.id)); }
  function npcEn(x, y) { return npcs.find((n) => { const d = destino(n); return (n.x === x && n.y === y) || (d.x === x && d.y === y); }) || null; }
  function enemigoEn(x, y, salvo) { return enemigos.find((e) => e !== salvo && ((e.x === x && e.y === y) || (destino(e).x === x && destino(e).y === y))) || null; }
  function libre(x, y, salvo) { return R.caminable(MUNDO, est.mapa, x, y) && !npcEn(x, y) && !enemigoEn(x, y, salvo); }

  function cargarMapa(id, x, y, dir) {
    est.mapa = id;
    Object.assign(jug, { x, y, dir: dir || 'abajo', mov: null, ruta: [], alFinal: null });
    if (!pintados[id]) pintarMapa(id);
    npcs = mapa().npcs.filter((n) => !npcOculto(n.id)).map((n) => ({ id: n.id, x: n.x, y: n.y, dir: 'abajo', zona: n.zona || null, mov: null, cool: 800 }));
    enemigos = []; reapariciones = [];
    poblarZonas();
    mostrarLugar(mapa().nombre);
  }
  function zonaActiva(z) {
    if (!z.desde) return true;
    const e = R.estadoMision(est, MUNDO, z.desde);
    return e === 'activa' || e === 'lista' || e === 'hecha';
  }
  // Cuando su misión ya se cumplió, esos 도깨비 dejan de perseguirte: siguen ahí si quieres un duelo
  const vistaDe = (z) => (z.desde && R.estadoMision(est, MUNDO, z.desde) === 'hecha' ? -1 : 4);
  function poblarZonas() {
    for (const en of enemigos) if (en.zona) en.vista = vistaDe(en.zona);
    (mapa().zonas || []).forEach((z, zi) => {
      if (!zonaActiva(z)) return;
      const vivos = enemigos.filter((e) => e.zi === zi).length + reapariciones.filter((r) => r.zi === zi).length;
      for (let k = vivos; k < z.n; k++) aparecer(zi);
    });
    poblarDorado();
  }
  // El 도깨비 dorado: una vez al día, con las preguntas que más te cuestan. No persigue a nadie.
  let doradoAvisado = false;
  function poblarDorado() {
    const d = MUNDO.dorado;
    if (est.mapa !== d.mapa || enemigos.some((e) => e.tipo === 'oro') || !libre(d.x, d.y) || (jug.x === d.x && jug.y === d.y) || !R.doradoDisponible(est, Date.now())) return;
    enemigos.push({ uid: ++uid, tipo: 'oro', x: d.x, y: d.y, casaX: d.x, casaY: d.y, estado: 'quieto', t: 2, aturdido: 0, cool: 0, mov: null, dir: 'izquierda', fijo: true });
    if (!doradoAvisado) { doradoAvisado = true; aviso('✦ Apareció el 황금 도깨비: viene a repasar lo que te costó', 'oro'); }
  }
  function aparecer(zi) {
    const z = mapa().zonas[zi];
    for (let intento = 0; intento < 60; intento++) {
      const x = z.x + Math.floor(rnd() * z.w), y = z.y + Math.floor(rnd() * z.h);
      if (!libre(x, y) || R.dist({ x, y }, jug) < 5) continue;
      enemigos.push({ uid: ++uid, zi, tipo: z.enemigo, x, y, casaX: x, casaY: y, zona: z, estado: 'quieto', t: 2, aturdido: 0, cool: 600 + rnd() * 900, mov: null, dir: 'abajo', vista: vistaDe(z) });
      return true;
    }
    return false;
  }

  /* ── Entrada ───────────────────────────────────────────────────────── */
  const TECLAS = { ArrowUp: 'arriba', KeyW: 'arriba', ArrowDown: 'abajo', KeyS: 'abajo', ArrowLeft: 'izquierda', KeyA: 'izquierda', ArrowRight: 'derecha', KeyD: 'derecha' };
  const pulsadas = [];
  let dirTactil = null;
  function dirPedida() { return dirTactil || pulsadas[pulsadas.length - 1] || null; }
  const LETRAS = { w: 'KeyW', a: 'KeyA', s: 'KeyS', d: 'KeyD', q: 'KeyQ', m: 'KeyM', i: 'KeyI', z: 'KeyZ', e: 'KeyE', ' ': 'Space' };
  const codigo = (e) => e.code || LETRAS[(e.key || '').toLowerCase()] || e.key;
  window.addEventListener('keydown', (ev) => {
    const e = { code: codigo(ev), key: ev.key, preventDefault: () => ev.preventDefault() };
    const d = TECLAS[e.code];
    if (modo === 'escena') {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') { e.preventDefault(); terminarCine(); }
      return;
    }
    if (modo === 'mapa') {
      if (d) { e.preventDefault(); if (!pulsadas.includes(d)) pulsadas.push(d); return; }
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyZ' || e.code === 'KeyE') { e.preventDefault(); interactuar(); return; }
      if (e.code === 'KeyQ' || e.code === 'KeyM' || e.code === 'Escape') { abrirPanel('misiones'); return; }
      if (e.code === 'KeyI') { abrirPanel('mochila'); return; }
    } else if (modo === 'dialogo') {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyZ' || e.code === 'KeyE') { e.preventDefault(); avanzarDialogo(); return; }
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) { const b = $('dlg-ops').children[n - 1]; if (b && !b.disabled) b.click(); }
    } else if (modo === 'batalla') {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) { const b = [...$('bt-ops').children].filter((x) => !x.classList.contains('oculta'))[n - 1]; if (b && !b.disabled) b.click(); }
      if ((e.code === 'Space' || e.code === 'Enter') && document.activeElement === document.body) { e.preventDefault(); const s = $('bt-seguir'); if (s) s.click(); }
    } else if (modo === 'capa') {
      if (e.code === 'Escape') { const c = $('tarjeta').querySelector('.cerrar'); if (c) c.click(); }
    }
  });
  window.addEventListener('keyup', (e) => { const d = TECLAS[codigo(e)]; const i = pulsadas.indexOf(d); if (i >= 0) pulsadas.splice(i, 1); });
  window.addEventListener('blur', () => { pulsadas.length = 0; dirTactil = null; });
  document.querySelectorAll('.cruz button').forEach((b) => {
    const on = (e) => { e.preventDefault(); dirTactil = b.dataset.dir; b.classList.add('on'); try { b.setPointerCapture(e.pointerId); } catch (_) {} };
    const off = () => { if (dirTactil === b.dataset.dir) dirTactil = null; b.classList.remove('on'); };
    b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
  });
  $('btn-a').addEventListener('click', () => { if (modo === 'mapa') interactuar(); else if (modo === 'dialogo') avanzarDialogo(); });
  window.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') document.body.classList.add('tactil'); }, { passive: true });
  if (matchMedia('(pointer: coarse)').matches) document.body.classList.add('tactil');

  // Tocar o hacer clic en el mapa: caminar hasta ahí (y hablar si hay alguien)
  let marca = null;
  cv.addEventListener('pointerdown', (e) => {
    if (modo === 'escena') { terminarCine(); return; }
    if (modo !== 'mapa') return;
    guiaAuto = false;
    const cam = camara();
    const gx = Math.floor(((e.clientX * dpr - cam.ox) / escala + cam.x) / T);
    const gy = Math.floor(((e.clientY * dpr - cam.oy) / escala + cam.y) / T);
    marca = { x: gx, y: gy, t: performance.now() };
    if (gx === jug.x && gy === jug.y) { interactuar(); return; }
    caminarA(gx, gy);
  });
  function caminarA(gx, gy) {
    const objetivo = interactuableEn(gx, gy);
    const r = R.ruta(MUNDO, est.mapa, destino(jug), { x: gx, y: gy }, (x, y) => !!npcEn(x, y) || (!!enemigoEn(x, y) && !(x === gx && y === gy)));
    if (!r) return false;
    jug.ruta = r;
    jug.alFinal = objetivo ? { x: gx, y: gy } : null;
    if (!r.length && objetivo && !jug.mov) { mirarHacia(gx, gy); interactuar(); }
    return true;
  }
  function mirarHacia(x, y) {
    const dx = x - jug.x, dy = y - jug.y;
    if (Math.abs(dx) >= Math.abs(dy) && dx) jug.dir = dx > 0 ? 'derecha' : 'izquierda';
    else if (dy) jug.dir = dy > 0 ? 'abajo' : 'arriba';
  }

  /* ── Bucle ─────────────────────────────────────────────────────────── */
  let ultimo = performance.now(), relojGuardado = 0;
  function bucle(t) {
    const dt = Math.min(50, t - ultimo); ultimo = t;
    if (modo === 'mapa' && est) actualizar(dt);
    dibujar(t);
    if (modo === 'batalla' && bat) dibujarDuelo(t);
    if (est) botonA(t);
    requestAnimationFrame(bucle);
  }
  function actualizar(dt) {
    // Jugador
    if (jug.mov) {
      jug.mov.t += dt;
      if (jug.mov.t >= jug.mov.dur) { jug.x = jug.mov.to.x; jug.y = jug.mov.to.y; jug.mov = null; jug.pasos++; alLlegar(); }
    }
    if (!jug.mov && modo === 'mapa') {
      const d = dirPedida();
      if (d) { jug.ruta = []; jug.alFinal = null; guiaAuto = false; intentarPaso(d); }
      else if (jug.ruta.length) {
        const p = jug.ruta[0];
        const dd = p.x > jug.x ? 'derecha' : p.x < jug.x ? 'izquierda' : p.y > jug.y ? 'abajo' : 'arriba';
        if (intentarPaso(dd)) jug.ruta.shift(); else { jug.ruta = []; }
        if (!jug.ruta.length && jug.alFinal) { const f = jug.alFinal; jug.alFinal = null; jug.alFinalPend = f; }
      } else if (jug.alFinalPend) { const f = jug.alFinalPend; jug.alFinalPend = null; mirarHacia(f.x, f.y); guiaAuto = false; interactuar(); }
      else if (guiaAuto) {
        // El 도깨비 se movió mientras caminabas: la guía lo vuelve a buscar
        guiaAuto = false;
        if (paso && paso.tipo === 'zona' && enemigos.some((e) => e.tipo === paso.id) && guiaVueltas++ < 6) autoCaminar();
      }
    }
    if (modo !== 'mapa') return;
    // 도깨비
    for (const en of enemigos.slice()) { actualizarEnemigo(en, dt); if (modo !== 'mapa') return; }
    // NPC que pasean (콩이)
    for (const n of npcs) {
      if (n.mov) { n.mov.t += dt; if (n.mov.t >= n.mov.dur) { n.x = n.mov.to.x; n.y = n.mov.to.y; n.mov = null; } continue; }
      if (!n.zona || (n.cool -= dt) > 0) continue;
      n.cool = 700 + rnd() * 1400;
      const [dx, dy] = Object.values(R.DIRS)[Math.floor(rnd() * 4)];
      const p = { x: n.x + dx, y: n.y + dy };
      const z = n.zona;
      if (p.x < z.x || p.y < z.y || p.x >= z.x + z.w || p.y >= z.y + z.h) continue;
      if (!libre(p.x, p.y) || (destino(jug).x === p.x && destino(jug).y === p.y)) continue;
      if (dx) n.dir = dx > 0 ? 'derecha' : 'izquierda';
      n.mov = { from: { x: n.x, y: n.y }, to: p, t: 0, dur: 260 };
    }
    // Reapariciones
    for (const r of reapariciones) r.t -= dt;
    reapariciones = reapariciones.filter((r) => { if (r.t > 0) return true; return !aparecer(r.zi) && (r.t = 3000) > 0; });
    relojGuardado += dt;
    if (relojGuardado > 8000) { relojGuardado = 0; guardar(); }
  }
  function intentarPaso(d) {
    jug.dir = d;
    const [dx, dy] = R.DIRS[d];
    const x = jug.x + dx, y = jug.y + dy;
    const en = enemigoEn(x, y);
    if (en) { empezarDuelo(en); return false; }
    if (!libre(x, y)) { return false; }
    jug.mov = { from: { x: jug.x, y: jug.y }, to: { x, y }, t: 0, dur: 150 };
    return true;
  }
  function alLlegar() {
    est.x = jug.x; est.y = jug.y;
    leerCerca();
    const p = (mapa().portales || []).find((q) => q.x === jug.x && q.y === jug.y);
    if (!p) return;
    jug.ruta = []; jug.alFinal = null; jug.alFinalPend = null; pulsadas.length = 0; dirTactil = null;
    const seguir = guiaAuto;
    const cruzar = () => fundido(() => { cargarMapa(p.a.mapa, p.a.x, p.a.y, p.a.dir); guardar(); hud(); if (seguir) setTimeout(autoCaminar, 240); });
    if (p.despedida) {
      if (!est.flags.despedida) { abrirDialogo(MUNDO.despedida, 'jeomwon', cruzar); return; }
      aviso('점원: 안녕히 가세요!'); oir('안녕히 가세요');
    }
    cruzar();
  }
  function fundido(fn) {
    const v = $('velo'); v.classList.add('on'); modo = 'transicion';
    setTimeout(() => { fn(); v.classList.remove('on'); modo = 'mapa'; }, 170);
  }
  function actualizarEnemigo(en, dt) {
    if (en.fijo) return;
    if (en.mov) { en.mov.t += dt; if (en.mov.t >= en.mov.dur) { en.x = en.mov.to.x; en.y = en.mov.to.y; en.mov = null; } return; }
    if ((en.cool -= dt) > 0) return;
    const yo = destino(jug);
    const quiere = R.pensarEnemigo(en, yo, rnd);
    en.cool = en.estado === 'persigue' ? 80 : 380 + rnd() * 300;
    if (!quiere) return;
    const mover = (p) => {
      if (p.x === yo.x && p.y === yo.y) { if (en.estado === 'persigue' && !jug.mov) empezarDuelo(en); return true; }
      if (R.baldosa(MUNDO, est.mapa, p.x, p.y) === 'D' || !libre(p.x, p.y, en)) return false;
      en.dir = p.x > en.x ? 'derecha' : p.x < en.x ? 'izquierda' : en.dir;
      en.mov = { from: { x: en.x, y: en.y }, to: { x: p.x, y: p.y }, t: 0, dur: en.estado === 'persigue' ? 240 : 340 };
      return true;
    };
    for (const p of [quiere, quiere.alt].filter(Boolean)) if (mover(p)) return;
    // Si el paso directo choca con un árbol o un letrero, rodea el obstáculo (ruta corta)
    if (en.estado === 'persigue' || en.estado === 'vuelve') {
      const meta = en.estado === 'persigue' ? yo : { x: en.casaX, y: en.casaY };
      const r = R.ruta(MUNDO, est.mapa, en, meta, (x, y) => !(x === meta.x && y === meta.y) && (!!npcEn(x, y) || !!enemigoEn(x, y, en) || R.baldosa(MUNDO, est.mapa, x, y) === 'D'));
      if (r && r.length && r.length <= 12) mover(r[0]);
    }
  }

  /* ── Dibujo ────────────────────────────────────────────────────────── */
  function pix(e) {
    if (!e.mov) return { x: e.x * T, y: e.y * T };
    const k = Math.min(1, e.mov.t / e.mov.dur);
    return { x: (e.mov.from.x + (e.mov.to.x - e.mov.from.x) * k) * T, y: (e.mov.from.y + (e.mov.to.y - e.mov.from.y) * k) * T };
  }
  function camara() {
    const mp = pintados[est.mapa], p = pix(jug);
    const vw = cv.width / escala, vh = cv.height / escala;
    let x, y, ox = 0, oy = 0;
    if (mp.W * T <= vw) { x = 0; ox = Math.round((vw - mp.W * T) / 2 * escala); } else x = Math.max(0, Math.min(mp.W * T - vw, p.x + T / 2 - vw / 2));
    if (mp.H * T <= vh) { y = 0; oy = Math.round((vh - mp.H * T) / 2 * escala); } else y = Math.max(0, Math.min(mp.H * T - vh, p.y + T / 2 - vh / 2));
    return { x: Math.round(x * escala) / escala, y: Math.round(y * escala) / escala, ox, oy };
  }
  function dibujar(t) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#14142b'; ctx.fillRect(0, 0, cv.width, cv.height);
    if (!est || !pintados[est.mapa]) return;
    const mp = pintados[est.mapa], cam = camara();
    ctx.imageSmoothingEnabled = false;
    ctx.setTransform(escala, 0, 0, escala, cam.ox - cam.x * escala, cam.oy - cam.y * escala);
    ctx.drawImage(mp.c, 0, 0);
    // Agua que brilla
    const vw = cv.width / escala, vh = cv.height / escala;
    ctx.fillStyle = 'rgba(255,255,255,.35)';
    for (const [i, j] of mp.agua) {
      if (i * T < cam.x - T || i * T > cam.x + vw || j * T < cam.y - T || j * T > cam.y + vh) continue;
      const o = Math.floor((t / 160 + i * 5 + j * 3) % 16);
      ctx.fillRect(i * T + o, j * T + 5, 4, 1); ctx.fillRect(i * T + ((o + 8) % 16), j * T + 11, 3, 1);
    }
    // Letreros (el tablero; la palabra va en la pasada de texto)
    for (const l of Object.values(MUNDO.letreros)) if (l.mapa === est.mapa) S.tablero(ctx, l.x * T, l.y * T + 1, !!est.letreros[idLetrero(l)] || (cine && cine.l === l && t - cine.t0 < CINE.huye));
    // Personajes, de atrás hacia adelante
    const cuerpos = [];
    for (const n of npcs) cuerpos.push({ y: pix(n).y, f: () => dibujarNPC(n, t) });
    for (const en of enemigos) cuerpos.push({ y: pix(en).y, f: () => dibujarEnemigo(en, t) });
    cuerpos.push({ y: pix(jug).y, f: () => dibujarJugador(t) });
    if (cine) cuerpos.push({ y: 1e6, f: () => dibujarDokkaebiCine(t) });
    cuerpos.sort((a, b) => a.y - b.y).forEach((c) => c.f());
    if (!mapa().interior) hojas(t, cam, vw, vh);
    // Pasada de texto, nítida a la escala real de la pantalla
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const aPantalla = (wx, wy) => ({ x: cam.ox + (wx - cam.x) * escala, y: cam.oy + (wy - cam.y) * escala });
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const l of Object.values(MUNDO.letreros)) {
      if (l.mapa !== est.mapa) continue;
      const id = idLetrero(l), p = aPantalla(l.x * T + 8, l.y * T + 6.5);
      const alfaCine = cine && cine.l === l ? Math.max(0, 1 - (t - cine.t0 - CINE.letras) / (CINE.cada * cine.jamo.length)) : 0;
      if (est.letreros[id] || alfaCine > 0) {
        ctx.globalAlpha = alfaCine > 0 ? Math.min(1, alfaCine) : 1;
        ctx.fillStyle = '#14234a'; ctx.font = `900 ${Math.round(7.5 * escala)}px "Noto Sans KR",sans-serif`;
        ctx.fillText(l.palabra, p.x, p.y);
        ctx.globalAlpha = 1;
      }
      const marcaL = marcaLetrero(id);
      if (marcaL) burbuja(aPantalla(l.x * T + 8, l.y * T - 6), marcaL, t);
    }
    for (const e of mapa().etiquetas || []) {
      const p = aPantalla(e.x * T, e.y * T);
      if (e.tipo === 'placa') { ctx.fillStyle = '#e8b84b'; ctx.font = `700 ${Math.round(6 * escala)}px "Noto Serif KR","Noto Sans KR",serif`; }
      else { ctx.fillStyle = '#ffffff'; ctx.font = `900 ${Math.round(8 * escala)}px "Noto Sans KR",sans-serif`; }
      ctx.fillText(e.texto, p.x, p.y);
    }
    for (const n of npcs) { const m = n.feliz > t ? '♪' : marcaNPC(n.id); if (m) { const q = pix(n); burbuja(aPantalla(q.x + 8, q.y - (n.id === 'jefe' ? 22 : 6)), m, t); } }
    if (cine) dibujarCine(t, aPantalla);
    dibujarFx(t, aPantalla);
    dibujarGuia(t, aPantalla);
    if (marca && t - marca.t < 450) {
      const p = aPantalla(marca.x * T + 8, marca.y * T + 8);
      ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = Math.max(2, escala / 2);
      ctx.beginPath(); ctx.arc(p.x, p.y, (4 + (t - marca.t) / 60) * escala, 0, Math.PI * 2); ctx.stroke();
    }
  }
  // Hojas de 은행나무 que caen. No guardan estado: la posición sale del reloj.
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function hojas(t, cam, vw, vh) {
    if (quieto) return;
    for (let k = 0; k < 16; k++) {
      const a = (k * 0.6180339887) % 1, b = (k * 0.7548776662) % 1;
      const x = ((a * vw + t * 0.006 + Math.sin(t / 900 + k) * 6) % vw + vw) % vw;
      const y = (b * vh + t * (0.012 + b * 0.01)) % vh;
      ctx.fillStyle = k % 3 ? '#f2c94c' : '#e8b84b';
      ctx.fillRect(Math.round(cam.x + x), Math.round(cam.y + y), 2, 1 + (Math.floor(t / 300 + k) % 2));
    }
  }
  /* Efectos en el mapa: chispas y palabras que suben */
  const fx = [];
  function chispas(wx, wy, n, colores, fuerza) {
    const t0 = performance.now();
    for (let k = 0; k < n; k++) {
      const a = rnd() * Math.PI * 2, v = (fuerza || 0.05) * (0.4 + rnd());
      fx.push({ x: wx, y: wy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.02, t0, dur: 450 + rnd() * 450, c: colores[k % colores.length] });
    }
  }
  function textoEn(wx, wy, txt, dur) { fx.push({ x: wx, y: wy, vx: 0, vy: -0.008, t0: performance.now(), dur: dur || 1800, txt }); }
  function dibujarFx(t, aPantalla) {
    for (let k = fx.length - 1; k >= 0; k--) {
      const f = fx[k], e = t - f.t0;
      if (e >= f.dur) { fx.splice(k, 1); continue; }
      if (e < 0) continue;
      const p = aPantalla(f.x + f.vx * e, f.y + f.vy * e + (f.txt ? 0 : 0.00004 * e * e));
      const a = 1 - e / f.dur;
      if (f.txt) {
        ctx.globalAlpha = Math.min(1, a * 2.5);
        ctx.font = `900 ${Math.round(8 * escala)}px "Noto Sans KR",sans-serif`;
        ctx.lineWidth = Math.max(3, escala); ctx.strokeStyle = '#14142b'; ctx.strokeText(f.txt, p.x, p.y);
        ctx.fillStyle = '#ffffff'; ctx.fillText(f.txt, p.x, p.y);
      } else {
        ctx.globalAlpha = a; ctx.fillStyle = f.c;
        const s = Math.max(2, escala * 1.4); ctx.fillRect(p.x, p.y, s, s);
      }
    }
    ctx.globalAlpha = 1;
  }
  // La flecha de la guía: sobre el objetivo si se ve, en el borde de la pantalla si no
  function dibujarGuia(t, aPantalla) {
    if (modo !== 'mapa') return;
    const d = destinoGuia();
    if (!d) return;
    const p = aPantalla(d.x * T + 8, d.y * T + 8), W = cv.width, H = cv.height;
    const m = 34 * dpr, arriba = 128 * dpr;
    ctx.fillStyle = '#e8b84b'; ctx.strokeStyle = '#14142b'; ctx.lineWidth = Math.max(2, escala * 0.6);
    const tri = (a, b, c) => { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.closePath(); ctx.fill(); ctx.stroke(); };
    if (p.x > m && p.x < W - m && p.y > arriba && p.y < H - m) {
      const y = p.y - (24 + Math.sin(t / 220) * 2) * escala, s = 4.5 * escala;
      tri([p.x - s, y - s], [p.x + s, y - s], [p.x, y + s * 0.7]);
      return;
    }
    const cx = W / 2, cy = H / 2, dx = p.x - cx, dy = p.y - cy;
    const k = Math.min((W / 2 - m) / Math.abs(dx || 1), (dy < 0 ? cy - arriba : H / 2 - m) / Math.abs(dy || 1));
    const r = 15 * dpr + Math.sin(t / 220) * dpr;
    ctx.save();
    ctx.translate(cx + dx * k, cy + dy * k); ctx.rotate(Math.atan2(dy, dx));
    tri([r, 0], [-r * 0.7, r * 0.8], [-r * 0.7, -r * 0.8]);
    ctx.restore();
  }
  function burbuja(p, txt, t) {
    const r = 5.5 * escala, y = p.y + Math.sin(t / 250) * escala;
    ctx.fillStyle = txt === '!' ? '#e8b84b' : '#4236F6';
    ctx.beginPath(); ctx.arc(p.x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = Math.max(1, escala / 2); ctx.strokeStyle = '#14142b'; ctx.stroke();
    ctx.fillStyle = txt === '!' ? '#14142b' : '#ffffff';
    ctx.font = `900 ${Math.round(7 * escala)}px "Noto Sans KR",sans-serif`;
    ctx.fillText(txt, p.x, y + escala * 0.4);
  }
  function sombra(px, py, w) { ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(px + 8 - w / 2, py + 14, w, 2); }
  function dibujarJugador(t) {
    const p = pix(jug);
    const paso = jug.mov ? (Math.floor(jug.mov.t / 75) % 2 ? 1 : 2) : 0;
    sombra(p.x, p.y, 10);
    ctx.drawImage(S.tigre(jug.dir, paso), Math.round(p.x), Math.round(p.y - 2 - (paso ? 1 : 0)));
  }
  function dibujarNPC(n, t) {
    const p = pix(n), sp = MUNDO.npcs[n.id].sprite;
    if (sp.tipo === 'dokkaebi') {
      const b = Math.round(Math.sin(t / 300));
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(p.x - 4, p.y + 14, 24, 3);
      ctx.drawImage(S.dokkaebi(sp.color), p.x - 8, p.y - 16 + b, 32, 32);
      if (!R.cumple(est, MUNDO, { mision: 'q6', estado: ['activa', 'lista'] })) {
        ctx.fillStyle = '#ffffff'; ctx.font = '6px sans-serif'; ctx.fillText('z', p.x + 20, p.y - 14 - ((t / 400) % 6));
      }
      return;
    }
    sombra(p.x, p.y, 10);
    let img;
    if (sp.tipo === 'perro') img = S.perro(n.dir === 'izquierda' ? 'izquierda' : 'derecha', n.mov ? (Math.floor(n.mov.t / 70) % 2 ? 1 : 2) : 0);
    else img = S.npc(sp);
    ctx.drawImage(img, Math.round(p.x), Math.round(p.y - 2));
  }
  function dibujarEnemigo(en, t) {
    const p = pix(en), b = Math.round(Math.sin(t / 220 + en.uid) * 0.8);
    sombra(p.x, p.y, 12);
    ctx.drawImage(S.dokkaebi(MUNDO.enemigos[en.tipo].color, en.dir === 'izquierda'), Math.round(p.x), Math.round(p.y - 2 + b));
    if (en.tipo === 'oro') {
      ctx.fillStyle = '#fff4c2';
      const k = Math.floor(t / 180) % 4;
      ctx.fillRect(p.x + [1, 13, 3, 14][k], p.y + [1, 3, 11, 9][k], 2, 2);
    }
    if (en.estado === 'persigue' && !en.aturdido) {
      ctx.fillStyle = '#e8b84b'; ctx.fillRect(Math.round(p.x) + 7, Math.round(p.y) - 9, 2, 4); ctx.fillRect(Math.round(p.x) + 7, Math.round(p.y) - 4, 2, 1);
    }
  }
  const idLetrero = (l) => l._id || (l._id = Object.keys(MUNDO.letreros).find((k) => MUNDO.letreros[k] === l));
  function marcaLetrero(id) {
    const l = MUNDO.letreros[id];
    if (est.letreros[id] || R.estadoMision(est, MUNDO, l.mision) !== 'activa') return null;
    return R.faltanLetras(est, MUNDO, id).length ? null : '✦';
  }
  function marcaNPC(id) {
    for (const [mid, m] of Object.entries(MUNDO.misiones)) {
      const e = R.estadoMision(est, MUNDO, mid);
      if (e === 'lista' && m.entrega === id) return '★';
      if (e === 'disponible' && m.da === id && id !== 'jefe') return '!';
      // Misión que solo pide hablar (la primera): marca a quien hay que saludar
      if (e === 'activa' && m.entrega === id && m.objetivos.every((o) => o.tipo === 'flag')) return '!';
    }
    if (id === 'jefe' && R.estadoMision(est, MUNDO, 'q6') === 'activa') return '!';
    return null;
  }

  /* ── HUD y avisos ──────────────────────────────────────────────────── */
  function hud() {
    if (!est) return;
    const max = R.hpMax(est);
    $('hud-nivel').textContent = est.nivel;
    $('hud-hp').style.transform = `scaleX(${est.hp / max})`;
    $('hud-hp-txt').textContent = `${est.hp}/${max}`;
    $('hud-won').textContent = R.fmtWon(est.won);
    const a = R.xpTotalPara(est.nivel), b = R.xpTotalPara(est.nivel + 1);
    $('hud-xp').style.transform = `scaleX(${(est.xp - a) / (b - a)})`;
    const hayLista = Object.keys(MUNDO.misiones).some((id) => R.estadoMision(est, MUNDO, id) === 'lista');
    $('punto-misiones').hidden = !hayLista;
    refrescarGuia();
  }
  /* ── La guía: el siguiente paso, siempre a la vista ────────────────── */
  let paso = null, guiaAuto = false, guiaVueltas = 0;
  function refrescarGuia() {
    paso = R.siguientePaso(est, MUNDO);
    if (!paso && R.doradoDisponible(est, Date.now())) {
      const d = MUNDO.dorado;
      paso = { tipo: 'zona', id: 'oro', texto: 'Repaso del día: gánale al 황금 도깨비', mapa: d.mapa, x: d.x, y: d.y };
    }
    $('guia').hidden = !paso;
    if (!paso) return;
    $('guia-txt').textContent = paso.texto;
    const aprende = est.stats.duelos === 0 && est.misiones.q2 && est.misiones.q2.estado === 'activa';
    $('guia').classList.toggle('pulso', !!aprende);
    $('guia-sub').hidden = !aprende;
  }
  // Dónde está lo que busca la guía en este mapa: la persona, el 도깨비 más cercano o la puerta
  function destinoGuia() {
    if (!paso) return null;
    if (paso.mapa !== est.mapa) {
      const p = (mapa().portales || []).find((q) => q.a.mapa === paso.mapa);
      return p ? { x: p.x, y: p.y } : null;
    }
    if (paso.tipo === 'zona') {
      const cerca = enemigos.filter((e) => e.tipo === paso.id).sort((a, b) => R.dist(a, jug) - R.dist(b, jug))[0];
      if (cerca) return { x: destino(cerca).x, y: destino(cerca).y };
    }
    if (paso.tipo === 'npc') { const n = npcs.find((q) => q.id === paso.id); if (n) return { x: n.x, y: n.y }; }
    return { x: paso.x, y: paso.y };
  }
  function autoCaminar() {
    if (modo !== 'mapa') return;
    const d = destinoGuia();
    if (!d) return;
    guiaAuto = true;
    marca = { x: d.x, y: d.y, t: performance.now() };
    caminarA(d.x, d.y);
  }
  $('guia').addEventListener('click', () => { guiaVueltas = 0; autoCaminar(); });
  function aviso(texto, tipo) {
    const d = document.createElement('div');
    d.className = 'aviso' + (tipo ? ' ' + tipo : '');
    d.textContent = texto;
    const cont = $('avisos');
    cont.appendChild(d);
    while (cont.children.length > 4) cont.firstChild.remove();
    setTimeout(() => { d.classList.add('sale'); setTimeout(() => d.remove(), 320); }, 3200);
  }
  let relojLugar = 0;
  function mostrarLugar(txt) { const l = $('lugar'); l.textContent = txt; l.classList.add('on'); clearTimeout(relojLugar); relojLugar = setTimeout(() => l.classList.remove('on'), 2400); }
  const nombreNPC = (id) => (MUNDO.npcs[id] || {}).nombre || id;
  // Avisos de misiones (avance, lista, cumplida) y de subir de nivel
  function avisarEventos(evs) {
    for (const e of evs || []) {
      if (e.lista) aviso(`✓ ${MUNDO.misiones[e.mision].titulo}: ${e.entrega ? 'vuelve con ' + nombreNPC(e.entrega) : 'lista'}`);
      else if (e.meta > 1) aviso(`${e.texto} · ${e.prog}/${e.meta}`);
      else aviso('✓ ' + e.texto);
    }
  }
  function avisarCompletadas(cs) {
    for (const c of cs || []) {
      SFX.moneda();
      const extra = [c.xp ? `+${c.xp} XP` : '', c.won ? '+' + R.fmtWon(c.won) : '', ...Object.entries(c.objetos).map(([o, n]) => `+${n} ${MUNDO.objetos[o].nombre}`)].filter(Boolean).join(' · ');
      aviso(`★ Misión cumplida: ${c.titulo}${extra ? ' · ' + extra : ''}`, 'oro');
      if (c.subio) { SFX.nivel(); aviso(`¡Subiste al nivel ${est.nivel}! Tu 기운 se llenó.`, 'oro'); }
    }
    poblarZonas();
  }

  /* ── Interactuar ───────────────────────────────────────────────────── */
  function letreroEn(x, y) { return Object.keys(MUNDO.letreros).find((k) => { const l = MUNDO.letreros[k]; return l.mapa === est.mapa && l.x === x && l.y === y; }) || null; }
  function infoEn(x, y) { const i = (mapa().info || []).find((q) => x >= q.x && y >= q.y && x < q.x + (q.w || 1) && y < q.y + (q.h || 1)); return i ? i.id : null; }
  function interactuableEn(x, y) { return npcEn(x, y) || enemigoEn(x, y) || letreroEn(x, y) || infoEn(x, y) || (R.baldosa(MUNDO, est.mapa, x, y) === 'C'); }
  // Lo que hay para hacer aquí: primero al frente, después a los lados
  function cerca() {
    for (const d of [jug.dir].concat(Object.keys(R.DIRS).filter((q) => q !== jug.dir))) {
      const [dx, dy] = R.DIRS[d];
      let x = jug.x + dx, y = jug.y + dy;
      if (enemigoEn(x, y)) return { d, x, y, que: 'Duelo' };
      if (R.baldosa(MUNDO, est.mapa, x, y) === 'C') { x += dx; y += dy; }
      if (npcEn(x, y)) return { d, x, y, que: 'Hablar' };
      const l = letreroEn(x, y);
      if (l) return { d, x, y, que: est.letreros[l] ? 'Leer' : 'Armar' };
      if (infoEn(x, y)) return { d, x, y, que: 'Mirar' };
    }
    return null;
  }
  function interactuar() {
    if (jug.mov || modo !== 'mapa') return;
    const c = cerca();
    if (!c) return;
    jug.dir = c.d;
    const en = enemigoEn(c.x, c.y);
    if (en) { empezarDuelo(en); return; }
    const n = npcEn(c.x, c.y);
    if (n) { hablar(n); return; }
    const l = letreroEn(c.x, c.y);
    if (l) { tocarLetrero(l); return; }
    const i = infoEn(c.x, c.y);
    if (i) abrirDialogo(MUNDO.info[i], null);
  }
  // El botón ✋ solo aparece cuando hay algo que hacer, y dice qué
  let relojA = 0;
  function botonA(t) {
    if (t - relojA < 180 || jug.mov) return;
    relojA = t;
    const c = modo === 'mapa' ? cerca() : null, b = $('btn-a');
    b.classList.toggle('oculto', !c);
    if (c) $('btn-a-txt').textContent = c.que.toUpperCase();
  }
  // Al pasar junto a un letrero ya armado, el mundo se lee solo
  const leidos = {};
  function leerCerca() {
    const ahora = performance.now();
    for (const [dx, dy] of Object.values(R.DIRS)) {
      const id = letreroEn(jug.x + dx, jug.y + dy);
      if (!id || !est.letreros[id] || ahora - (leidos[id] || -1e9) < 30000) continue;
      leidos[id] = ahora;
      const l = MUNDO.letreros[id];
      oir(l.palabra);
      textoEn(l.x * T + 8, l.y * T - 6, `${l.palabra} · ${l.es}`);
    }
  }
  function celebrar(id) {
    const l = MUNDO.letreros[id], x = l.x * T + 8, y = l.y * T + 4, t = performance.now();
    chispas(x, y, 30, ['#ffe08a', '#e8b84b', '#ffffff', '#a49eff'], 0.07);
    textoEn(x, y - 14, l.palabra, 2200);
    leidos[id] = t;
    SFX.nivel();
    for (const n of npcs) if (R.dist(n, l) <= 7) n.feliz = t + 1800;
  }
  function hablar(n) {
    if (n.mov) return;
    const d = R.elegirDialogo(est, MUNDO, n.id);
    if (!d) return;
    if (n.x !== jug.x && MUNDO.npcs[n.id].sprite.tipo === 'perro') n.dir = jug.x < n.x ? 'izquierda' : 'derecha';
    abrirDialogo(d.lineas, n.id);
  }

  /* ── Diálogo ───────────────────────────────────────────────────────── */
  let dlg = null;
  function abrirDialogo(lineas, quien, alTerminar) {
    jug.ruta = []; pulsadas.length = 0; dirTactil = null;
    dlg = { lineas, i: -1, quien, alTerminar, despues: [], esperando: false };
    modo = 'dialogo';
    $('dialogo').hidden = false;
    avanzarDialogo();
  }
  function retrato(id) {
    const c = $('retrato'), x = c.getContext('2d');
    x.clearRect(0, 0, 16, 16);
    if (!id || !MUNDO.npcs[id]) { c.style.visibility = 'hidden'; return; }
    c.style.visibility = 'visible';
    const sp = MUNDO.npcs[id].sprite;
    const img = sp.tipo === 'persona' ? S.npc(sp) : sp.tipo === 'perro' ? S.perro('derecha', 0) : S.dokkaebi(sp.color);
    x.drawImage(img, 0, 0);
  }
  function avanzarDialogo() {
    if (!dlg || dlg.esperando) return;
    dlg.i++;
    if (dlg.i >= dlg.lineas.length) { cerrarDialogo(); return; }
    const l = dlg.lineas[dlg.i];
    const quien = l.quien || dlg.quien;
    retrato(quien);
    $('dlg-quien').textContent = l.titulo || (quien ? nombreNPC(quien) : '');
    $('dlg-quien').hidden = !(l.titulo || quien);
    $('dlg-ko-fila').hidden = !l.ko;
    $('dlg-ko').textContent = l.ko || '';
    $('dlg-es').textContent = l.elige ? l.elige.pregunta : (l.es || '');
    $('dlg-es').classList.toggle('sub-es', !!l.ko && !l.elige);
    $('dlg-nota').hidden = true;
    const ops = $('dlg-ops'); ops.innerHTML = '';
    $('dlg-sigue').hidden = !!l.elige;
    if (l.ko) setTimeout(() => oir(l.ko), 120);
    if (l.elige) {
      dlg.esperando = true;
      R.barajar(l.elige.opciones, rnd).forEach((o) => {
        const b = document.createElement('button');
        b.className = 'op';
        b.innerHTML = `<span class="ko">${esc(o.ko)}</span>`;
        b.addEventListener('click', (ev) => { ev.stopPropagation(); elegirOpcion(o, b); });
        ops.appendChild(b);
      });
    }
    if (l.accion) aplicarAccion(l.accion);
  }
  function elegirOpcion(o, b) {
    const nota = $('dlg-nota');
    oir(o.ko);
    nota.hidden = false;
    if (o.ok) {
      SFX.golpe();
      b.classList.add('bien');
      b.innerHTML = `<span class="ko">${esc(o.ko)}</span><small>${esc(o.es)}</small>`;
      [...$('dlg-ops').children].forEach((x) => { x.disabled = true; });
      nota.className = 'nota bien'; nota.textContent = o.dice;
      dlg.esperando = false;
      $('dlg-sigue').hidden = false;
    } else {
      SFX.error();
      b.classList.add('mal'); b.disabled = true;
      b.innerHTML = `<span class="ko">${esc(o.ko)}</span><small>${esc(o.es)}</small>`;
      nota.className = 'nota mal'; nota.textContent = o.porque;
    }
  }
  $('globo').addEventListener('click', (e) => { if (e.target.closest('.oir') || e.target.closest('.op')) return; avanzarDialogo(); });
  $('dlg-oir').addEventListener('click', (e) => { e.stopPropagation(); if (dlg) oir(dlg.lineas[dlg.i].ko); });
  function aplicarAccion(a) {
    const r = R.aplicarAccion(est, MUNDO, a);
    for (const m of r.mensajes) {
      if (m.tipo === 'letra') { SFX.letra(); aviso(`Nueva letra: ${m.id} (${R.romLetra(m.id)})`, 'letra'); }
      else aviso(m.texto, m.tipo === 'mision' ? '' : 'oro');
    }
    const cumplidas = r.completadas.map((c) => c.mision);
    avisarEventos(r.eventos.filter((ev) => !cumplidas.includes(ev.mision)));
    avisarCompletadas(r.completadas);
    if (a.tienda) dlg.despues.push(() => abrirTienda(a.tienda));
    if (a.duelo) dlg.despues.push(() => empezarDuelo({ tipo: a.duelo, jefe: true }));
    if (r.completadas.some((c) => c.mision === 'q6')) dlg.despues.push(() => setTimeout(mostrarFin, 400));
    hud(); guardar();
  }
  function cerrarDialogo() {
    $('dialogo').hidden = true;
    const d = dlg; dlg = null; modo = 'mapa';
    refrescarNPCs(); poblarZonas(); hud();
    for (const f of d.despues) f();
    if (d.alTerminar) d.alTerminar();
  }

  /* ── Duelo ─────────────────────────────────────────────────────────── */
  let bat = null;
  function empezarDuelo(en) {
    if (modo === 'batalla') return;
    jug.ruta = []; jug.alFinal = null; jug.alFinalPend = null; pulsadas.length = 0; dirTactil = null;
    guiaAuto = false;
    modo = 'batalla';
    const E = MUNDO.enemigos[en.tipo];
    bat = { b: R.nuevaBatalla(MUNDO, est, en.tipo, BANCO, Math.floor(rnd() * 1e9)), en, bloqueado: false };
    tocarMusica(temaActual());
    chisp.length = 0; accion('entra');
    $('bt-nombre').textContent = E.nombre;
    const el = $('batalla');
    el.hidden = false; el.classList.remove('entra'); void el.offsetWidth; el.classList.add('entra');
    $('bt-objetos').hidden = true;
    $('bt-acciones').hidden = false;
    $('bt-racha').textContent = est.stats.duelos === 0 ? '🐯 Acierta y el tigre ataca. Si fallas, aprendes y sigues.' :
      E.repaso ? '✦ Repaso del día: lo que más te ha costado.' : en.jefe ? '¡El 도깨비 대장 te desafía!' : `¡Un ${E.es} te desafía!`;
    blip(330, 0.1, 'square', 0.05); blip(440, 0.1, 'square', 0.05, 0.1); blip(660, 0.2, 'square', 0.05, 0.2);
    barrasDuelo();
    mostrarPregunta();
  }
  /* Escenario del duelo: el tigre a la izquierda, el 도깨비 a la derecha */
  const EW = 176, EH = 72, TX = 26, EX = 118, ce = $('bt-escena').getContext('2d');
  const chisp = [], suelos = {};
  let ani = null;
  function accion(tipo) { ani = { tipo, t0: performance.now(), hecho: false }; }
  function sueloDuelo(tipo) {
    if (suelos[tipo]) return suelos[tipo];
    const t = { verde: '.', azul: ',', morado: ':', jefe: '=', oro: '=' }[tipo] || '.';
    const fila = t.repeat(12), c = document.createElement('canvas');
    c.width = EW; c.height = 16;
    const x = c.getContext('2d');
    for (let i = 0; i < 12; i++) S.dibujarBaldosa(x, [fila], i, 0);
    return (suelos[tipo] = c);
  }
  function chispasDuelo(x, y, n, colores) {
    for (let k = 0; k < n; k++) {
      const a = rnd() * Math.PI * 2, v = 0.02 + rnd() * 0.05;
      chisp.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.02, t0: performance.now(), dur: 300 + rnd() * 300, c: colores[k % colores.length] });
    }
  }
  const ease = (k) => k * k * (3 - 2 * k);
  function zarpazo(x, y, k, oro) {
    ce.fillStyle = oro ? '#ffe08a' : '#ffffff';
    const largo = Math.floor(14 * Math.min(1, k * 2.5));
    for (let i = 0; i < 3; i++) for (let j = 0; j < largo; j++) ce.fillRect(x + i * 7 + 8 - j * 0.6, y + j * 1.6, 2, 2);
  }
  function dibujarDuelo(t) {
    const jefe = !!bat.en.jefe, color = MUNDO.enemigos[bat.en.tipo].color, tamE = jefe ? 48 : 32, piso = EH - 8;
    let tx = TX, ex = EX, ty = piso - 32 + Math.round(Math.sin(t / 260)), ey = piso - tamE + Math.round(Math.sin(t / 220 + 1) * 1.4);
    let flashT = false, flashE = false, alfaE = 1, alfaT = 1, paso = 0, garra = null;
    if (ani) {
      const e = t - ani.t0;
      if (ani.tipo === 'entra') {
        const k = Math.min(1, e / 360);
        tx = TX - 60 * (1 - ease(k)); ex = EX + 60 * (1 - ease(k));
        if (k >= 1) ani = null;
      } else if (ani.tipo === 'ataque' || ani.tipo === 'critico') {
        const D = ani.tipo === 'critico' ? 620 : 440, k = Math.min(1, e / D);
        const ida = k < 0.34 ? k / 0.34 : k < 0.56 ? 1 : 1 - (k - 0.56) / 0.44;
        tx = TX + (EX - TX - 26) * ease(ida); paso = k < 0.34 ? (Math.floor(e / 60) % 2) + 1 : 0;
        if (k >= 0.34 && !ani.hecho) {
          ani.hecho = true;
          chispasDuelo(EX + 16, piso - 16, ani.tipo === 'critico' ? 26 : 12, ani.tipo === 'critico' ? ['#ffe08a', '#e8b84b', '#ffffff'] : ['#ffffff', '#cfcaff']);
          if (ani.tipo === 'critico') sacudir();
        }
        if (k >= 0.34 && k < 0.7) {
          flashE = Math.floor(e / 50) % 2 === 0; ex = EX + 5;
          garra = { k: (k - 0.34) / 0.36, oro: ani.tipo === 'critico' };
        }
        if (k >= 1) { const fin = bat.b.fin === 'victoria'; ani = null; if (fin) accion('vence'); }
      } else if (ani.tipo === 'golpe') {
        const D = 460, k = Math.min(1, e / D);
        const ida = k < 0.34 ? k / 0.34 : k < 0.56 ? 1 : 1 - (k - 0.56) / 0.44;
        ex = EX - (EX - TX - 22) * ease(ida);
        if (k >= 0.34 && !ani.hecho) { ani.hecho = true; sacudir(); chispasDuelo(TX + 16, piso - 16, 10, ['#e8b84b', '#ffe08a']); }
        if (k >= 0.34 && k < 0.7) { flashT = Math.floor(e / 50) % 2 === 0; tx = TX - 5; }
        if (k >= 1) ani = null;
      } else if (ani.tipo === 'vence') {
        const k = Math.min(1, e / 620);
        if (!ani.hecho) { ani.hecho = true; chispasDuelo(EX + tamE / 2, piso - tamE / 2, 30, ['#ffe08a', '#e8b84b', '#ffffff', '#a49eff']); }
        alfaE = Math.max(0, 1 - k * 1.5); ey -= k * 8;
        ty -= Math.abs(Math.sin(e / 130)) * 7;
      } else if (ani.tipo === 'cae') {
        alfaT = Math.max(0.35, 1 - e / 500);
      }
    }
    ce.imageSmoothingEnabled = false;
    ce.clearRect(0, 0, EW, EH);
    ce.drawImage(sueloDuelo(bat.en.tipo), 0, EH - 16);
    ce.fillStyle = 'rgba(0,0,0,.22)';
    ce.fillRect(Math.round(tx) + 4, piso - 2, 24, 3);
    if (alfaE > 0) ce.fillRect(Math.round(ex) + 4, piso - 2, tamE - 8, 3);
    const sprT = S.tigre('derecha', paso), sprE = S.dokkaebi(color, true);
    ce.globalAlpha = alfaT;
    ce.drawImage(flashT ? S.silueta(sprT) : sprT, Math.round(tx), Math.round(ty), 32, 32);
    ce.globalAlpha = alfaE;
    if (alfaE > 0) ce.drawImage(flashE ? S.silueta(sprE) : sprE, Math.round(ex), Math.round(ey), tamE, tamE);
    ce.globalAlpha = 1;
    if (garra) zarpazo(EX + 2, piso - 30, garra.k, garra.oro);
    for (let k = chisp.length - 1; k >= 0; k--) {
      const c = chisp[k], e = t - c.t0;
      if (e >= c.dur) { chisp.splice(k, 1); continue; }
      ce.globalAlpha = 1 - e / c.dur; ce.fillStyle = c.c;
      ce.fillRect(Math.round(c.x + c.vx * e), Math.round(c.y + c.vy * e + 0.00008 * e * e), 2, 2);
    }
    ce.globalAlpha = 1;
  }
  function sacudir() { const b = $('bt-escena'); b.classList.remove('sacude'); void b.offsetWidth; b.classList.add('sacude'); }
  function barrasDuelo() {
    const b = bat.b, max = R.hpMax(est);
    $('bt-nv').textContent = est.nivel;
    $('bt-hp').style.transform = `scaleX(${est.hp / max})`;
    $('bt-hp-txt').textContent = `기운 ${est.hp}/${max}`;
    $('bt-ehp').style.transform = `scaleX(${b.hp / b.hpMax})`;
    $('bt-ehp-txt').textContent = `${b.hp}/${b.hpMax}`;
  }
  function mostrarPregunta() {
    const b = bat.b, q = R.preguntaActual(b);
    bat.q = q; bat.bloqueado = false;
    $('bt-pregunta').innerHTML = `<div class="cab"><div class="instr" id="bt-instr"></div><button class="oir" id="bt-oir" aria-label="Escuchar">🔊</button></div><div class="pista" id="bt-pista" hidden></div><div class="ops" id="bt-ops"></div><div class="nota" id="bt-nota" hidden></div>`;
    $('bt-instr').textContent = q.instruccion;
    const oirBtn = $('bt-oir');
    oirBtn.hidden = !(q.audio && q.suenaAntes);
    oirBtn.addEventListener('click', () => oir(q.audio));
    pista();
    const ops = $('bt-ops');
    const largas = q.opciones.some((o) => o.length > 14);
    ops.classList.toggle('largas', largas);
    q.opciones.forEach((o) => {
      const btn = document.createElement('button');
      btn.textContent = o;
      if (!/[가-힣ㄱ-ㅣ]/.test(o)) btn.classList.add('es');
      if (b.ocultas.includes(o)) btn.classList.add('oculta');
      if (b.tachadas.includes(o)) { btn.classList.add('mal'); btn.disabled = true; }
      btn.addEventListener('click', () => responder(o, btn));
      ops.appendChild(btn);
    });
    if (q.audio && q.suenaAntes) setTimeout(() => { if (bat && bat.q === q) oir(q.audio); }, 380);
  }
  function pista() {
    const q = bat.q, p = $('bt-pista');
    if ((bat.b.pista || est.ajustes.rom) && q.rom) { p.hidden = false; p.textContent = `Pista: ${q.rom}`; } else p.hidden = true;
  }
  function numero(el, txt, clase, x) {
    const r = el.getBoundingClientRect();
    const d = document.createElement('div');
    d.className = 'flota-num ' + clase; d.textContent = txt;
    d.style.left = (r.left + r.width * x - 20) + 'px'; d.style.top = (r.top + 6) + 'px';
    document.body.appendChild(d); setTimeout(() => d.remove(), 950);
  }
  function responder(op, btn) {
    if (!bat || bat.bloqueado) return;
    const q = bat.q;
    const r = R.responder(bat.b, est, op);
    if (!r) return;
    const nota = $('bt-nota');
    if (r.correcta) {
      bat.bloqueado = true;
      btn.classList.add('bien');
      [...$('bt-ops').children].forEach((x) => { x.disabled = true; });
      (r.critico ? SFX.zarpazo : SFX.golpe)();
      if (q.audio) setTimeout(() => oir(q.audio), 150);
      accion(r.critico ? 'critico' : 'ataque');
      numero($('bt-escena'), `-${r.dano}`, 'azul', 0.8);
      nota.hidden = false; nota.className = 'nota bien';
      const lectura = [q.audio && q.audio !== q.respuesta ? q.audio : '', q.pron, q.rom ? `«${q.rom}»` : ''].filter(Boolean).join(' · ');
      nota.textContent = (r.primera ? '✓ ¡Bien!' : '✓ Ahora sí.') + (lectura ? ' ' + lectura : '');
      $('bt-racha').textContent = r.critico ? '🐯 ¡Zarpazo de tigre! Daño ×2' : (r.combo >= 2 ? `🔥 ${r.combo} seguidas` : '');
      barrasDuelo(); hud();
      setTimeout(() => { if (!bat) return; if (r.fin === 'victoria') victoria(); else mostrarPregunta(); }, r.critico ? 1500 : 1150);
    } else {
      btn.classList.add('mal'); btn.disabled = true;
      SFX.error();
      const caja = $('bt-pregunta'); caja.classList.remove('tiembla'); void caja.offsetWidth; caja.classList.add('tiembla');
      accion('golpe');
      numero($('bt-escena'), r.escudo ? '☂ 0' : `-${r.dano}`, 'oro', 0.2);
      nota.hidden = false; nota.className = 'nota mal';
      nota.textContent = (r.escudo ? '☂ Tu 우산 paró el golpe. ' : '뚝딱! ') + r.explicacion + ' Prueba otra vez.';
      $('bt-racha').textContent = '';
      barrasDuelo(); hud();
      if (r.fin === 'derrota') { bat.bloqueado = true; setTimeout(() => accion('cae'), 500); setTimeout(derrota, 1600); }
    }
  }
  $('bt-mochila').addEventListener('click', () => {
    const cont = $('bt-objetos');
    if (!cont.hidden) { cont.hidden = true; return; }
    const usables = Object.keys(est.objetos).filter((id) => R.cuantos(est, id) > 0);
    cont.innerHTML = usables.length ? '' : '<span style="opacity:.8;font-size:.9rem">No tienes objetos. En el 편의점 venden.</span>';
    for (const id of usables) {
      const o = MUNDO.objetos[id];
      const b = document.createElement('button');
      b.innerHTML = `<img alt="" src="${iconoObjeto(id)}"><span><span class="ko">${esc(o.nombre)}</span> ×${R.cuantos(est, id)}</span>`;
      b.title = o.desc;
      b.addEventListener('click', () => {
        const r = R.usarObjeto(est, MUNDO, id, bat.b);
        aviso(r.msg, r.ok ? '' : 'oro');
        if (!r.ok) return;
        cont.hidden = true;
        if (r.oculta) { const x = [...$('bt-ops').children].find((y) => y.textContent === r.oculta); if (x) x.classList.add('oculta'); }
        if (o.efecto.pista) pista();
        if (r.curo) SFX.moneda();
        barrasDuelo(); hud(); guardar();
      });
      cont.appendChild(b);
    }
    cont.hidden = false;
  });
  $('bt-huir').addEventListener('click', () => {
    if (!bat || bat.bloqueado) return;
    if (bat.en && !bat.en.jefe) { bat.en.aturdido = 10; bat.en.estado = 'vuelve'; }
    cerrarDuelo();
    aviso('Huiste. El 도깨비 se queda con sus letras... por ahora.');
  });
  function cerrarDuelo() { $('batalla').hidden = true; bat = null; modo = 'mapa'; ani = null; tocarMusica('plaza'); hud(); guardar(); }
  function victoria() {
    const { b, en } = bat;
    const bot = R.botin(b, est, MUNDO, rnd);
    if (en.jefe) R.evento(est, MUNDO, { tipo: 'flag', id: 'jefe_vencido' });
    else {
      enemigos = enemigos.filter((x) => x !== en);
      if (!MUNDO.enemigos[en.tipo].repaso) reapariciones.push({ zi: en.zi, t: 35000 });
    }
    refrescarNPCs();
    SFX.moneda();
    $('bt-acciones').hidden = true; $('bt-objetos').hidden = true;
    const letras = (bot.letras || []).map((j) => `<div class="letra"><b class="ko">${esc(j)}</b><div><div class="linea">Nueva letra: ${esc(j)}</div><small>Suena «${esc(R.romLetra(j))}» · como en ${esc(R.silabaDeLetra(j))}</small></div><button class="oir" data-letra="${esc(j)}" aria-label="Escuchar">🔊</button></div>`).join('');
    const lineas = [`+${bot.xp} XP`, '+' + R.fmtWon(bot.won)];
    if (bot.objeto) lineas.push(`+1 ${MUNDO.objetos[bot.objeto].nombre} (lo soltó al huir)`);
    if (!bot.letras.length && !MUNDO.enemigos[en.tipo].repaso) lineas.push('Ya tenías todas sus letras: te pagó en 원.');
    if (bot.racha) lineas.push(`🔥 Racha de repaso: ${bot.racha} ${bot.racha === 1 ? 'día' : 'días seguidos'}. Vuelve mañana.`);
    if (bot.subio) lineas.push(`¡Subiste al nivel ${est.nivel}! Tu 기운 se llenó y pegas más fuerte.`);
    $('bt-pregunta').innerHTML = `<h2 style="margin:0">¡Ganaste el duelo!</h2><p class="sub" style="margin:4px 0 0;color:var(--muted)">${b.aciertos} de ${b.aciertos + b.errores} al primer intento</p><div class="botin">${letras}${lineas.map((l) => `<div class="linea">${esc(l)}</div>`).join('')}</div><button class="btn ancho" id="bt-seguir">Seguir</button>`;
    $('bt-pregunta').querySelectorAll('[data-letra]').forEach((x) => x.addEventListener('click', () => oirLetra(x.dataset.letra)));
    if (bot.letras.length) { SFX.letra(); setTimeout(() => oirLetra(bot.letras[0]), 450); }
    $('bt-seguir').addEventListener('click', () => {
      cerrarDuelo();
      if (bot.subio) SFX.nivel();
      avisarEventos(bot.eventos);
      poblarZonas();
      if (paso && paso.tipo === 'letrero') aviso('✦ ¡Ya tienes las letras para armar un letrero!', 'oro');
    });
    $('bt-seguir').focus();
    barrasDuelo(); hud(); guardar();
  }
  function derrota() {
    $('bt-acciones').hidden = true;
    $('bt-pregunta').innerHTML = `<h2 style="margin:0">Te quedaste sin 기운</h2><p style="line-height:1.5">하나 te encontró, te dio un 김밥 y te llevó a la plaza a descansar. No pierdes nada: tus letras y tus 원 siguen contigo.</p><button class="btn ancho" id="bt-seguir">Volver a la plaza</button>`;
    $('bt-seguir').addEventListener('click', () => {
      est.hp = R.hpMax(est);
      const r = MUNDO.reaparecer;
      cerrarDuelo();
      fundido(() => { cargarMapa(r.mapa, r.x, r.y, r.dir); guardar(); });
    });
    $('bt-seguir').focus();
  }

  /* ── Ventanas (capa) ───────────────────────────────────────────────── */
  function abrirCapa(html, alCerrar) {
    jug.ruta = []; pulsadas.length = 0; dirTactil = null;
    modo = 'capa';
    $('tarjeta').innerHTML = html;
    $('capa').hidden = false;
    const c = $('tarjeta').querySelector('.cerrar');
    if (c) c.addEventListener('click', () => { cerrarCapa(); if (alCerrar) alCerrar(); });
    $('tarjeta').scrollTop = 0;
  }
  function cerrarCapa() { $('capa').hidden = true; modo = 'mapa'; hud(); guardar(); }
  $('capa').addEventListener('click', (e) => { if (e.target === $('capa')) { const c = $('tarjeta').querySelector('.cerrar'); if (c) c.click(); } });
  const iconos = {};
  function iconoObjeto(id) { return iconos[id] || (iconos[id] = S.aURL(S.objeto(id), 3)); }

  /* ── Tienda ─────────────────────────────────────────────────────────── */
  function abrirTienda(id) {
    const t = MUNDO.tiendas[id];
    const filas = t.objetos.map((oid) => {
      const o = MUNDO.objetos[oid], puede = est.won >= o.precio;
      return `<div class="fila-obj"><img alt="" src="${iconoObjeto(oid)}"><div class="txt"><b class="ko">${esc(o.nombre)}</b> · ${esc(o.es)}<small>${esc(o.desc)}</small></div><button class="btn" data-obj="${oid}" ${puede ? '' : 'disabled'}>${esc(R.fmtWon(o.precio))}</button></div>`;
    }).join('');
    abrirCapa(`<button class="cerrar" aria-label="Salir de la tienda">✕</button><h2 class="ko">${esc(t.nombre)}</h2><p class="sub">${esc(t.es)} · tienes <b>${esc(R.fmtWon(est.won))}</b>. Toca lo que quieres y pídelo en coreano.</p><p class="sub" style="margin-top:-8px">Dato: en un 편의점 de verdad tomas el producto y lo llevas a la caja. 주세요 lo usas en el mercado, en un café o para lo que está detrás del mostrador.</p>${filas}`);
    $('tarjeta').querySelectorAll('[data-obj]').forEach((b) => b.addEventListener('click', () => pedir(id, b.dataset.obj)));
  }
  function pedir(tiendaId, oid) {
    const o = MUNDO.objetos[oid];
    const ops = R.barajar([
      { ko: o.pedir, ok: true },
      { ko: o.noPedir, porque: `«${o.noPedir.replace(/\.$/, '')}» significa «Es ${o.esUn}»: describe, no pide. Para pedir se dice «${o.pedir.replace(/\.$/, '')}»` },
      { ko: '안녕히 계세요.', porque: `안녕히 계세요 es para despedirte cuando te vas. Para pedir se dice «${o.pedir.replace(/\.$/, '')}»` },
    ], rnd);
    abrirCapa(`<button class="cerrar" aria-label="Volver">✕</button><h2>¿Qué le dices al 점원?</h2><p class="sub">Quieres <b class="ko">${esc(o.nombre)}</b> (${esc(o.es)}).</p><div class="opciones" id="t-ops" style="display:grid;gap:8px"></div><div class="nota" id="t-nota" hidden></div>`, () => abrirTienda(tiendaId));
    const cont = $('t-ops');
    ops.forEach((op) => {
      const b = document.createElement('button');
      b.className = 'op'; b.innerHTML = `<span class="ko">${esc(op.ko)}</span>`;
      b.addEventListener('click', () => {
        oir(op.ko);
        const nota = $('t-nota'); nota.hidden = false;
        if (!op.ok) { SFX.error(); b.classList.add('mal'); b.disabled = true; nota.className = 'nota mal'; nota.textContent = op.porque; return; }
        const r = R.comprar(est, MUNDO, tiendaId, oid);
        if (!r.ok) { nota.className = 'nota mal'; nota.textContent = r.msg; return; }
        SFX.moneda();
        b.classList.add('bien');
        [...cont.children].forEach((x) => { x.disabled = true; });
        nota.className = 'nota bien';
        nota.innerHTML = `✓ ¡Eso! 주세요 = «deme, por favor».<br><span class="ko">점원: 네, 여기 있어요.</span> (Sí, aquí tiene.)`;
        setTimeout(() => oir('네, 여기 있어요'), 900);
        avisarEventos(r.eventos);
        hud(); guardar();
        const seguir = document.createElement('button');
        seguir.className = 'btn ancho'; seguir.style.marginTop = '12px'; seguir.textContent = 'Seguir comprando';
        seguir.addEventListener('click', () => abrirTienda(tiendaId));
        $('tarjeta').appendChild(seguir);
      });
      cont.appendChild(b);
    });
  }

  /* ── Letreros ───────────────────────────────────────────────────────── */
  function tocarLetrero(id) {
    const l = MUNDO.letreros[id];
    if (est.letreros[id]) { abrirDialogo([{ titulo: 'Letrero', ko: l.palabra, es: `${l.palabra} = ${l.es}` }], null); return; }
    const em = R.estadoMision(est, MUNDO, l.mision);
    if (em !== 'activa' && em !== 'lista') { abrirDialogo([{ titulo: 'Letrero', es: 'El letrero está en blanco: los 도깨비 se llevaron sus letras.' }], null); return; }
    const faltan = R.faltanLetras(est, MUNDO, id);
    if (faltan.length) {
      const quienes = [...new Set(faltan.map((j) => Object.values(MUNDO.enemigos).find((e) => e.letras.includes(j))).filter(Boolean).map((e) => e.donde))];
      const donde = quienes.length ? ` Las tienen ${quienes.join(' y ')}.` : '';
      abrirDialogo([{ titulo: 'Letrero', es: `Aquí decía algo que significa «${l.es}». Para armarlo te ${faltan.length === 1 ? 'falta 1 letra' : `faltan ${faltan.length} letras`}.${donde}` }], null);
      return;
    }
    abrirArmado(id);
  }
  let arm = null;
  function abrirArmado(id) {
    const l = MUNDO.letreros[id];
    arm = { id, sil: Array.from(l.palabra), i: 0, ini: null, voc: null, fin: '', intentos: 0, conFinal: Array.from(l.palabra).some((s) => R.decompose(s)[2]) };
    pintarArmado();
    setTimeout(() => oir(arm.sil[0]), 300);
  }
  function pintarArmado() {
    const l = MUNDO.letreros[arm.id];
    const cons = R.CHO.split('').filter((j) => est.letras.includes(j));
    const vocs = R.JUNG.split('').filter((j) => est.letras.includes(j));
    const casillas = arm.sil.map((s, k) => k < arm.i ? `<span class="lista ko">${esc(s)}</span>` : `<span class="${k === arm.i ? 'ahora' : ''}">?</span>`).join('');
    const ficha = (j, parte) => `<button class="ko ${arm[parte] === j ? 'sel' : ''}" data-parte="${parte}" data-j="${esc(j)}" aria-label="${esc(j)}">${esc(j)}</button>`;
    const armada = arm.ini && arm.voc ? R.compose(arm.ini, arm.voc, arm.fin) : (arm.ini || '') + (arm.voc || '');
    abrirCapa(`<button class="cerrar" aria-label="Dejar para después">✕</button>
      <h2>Arma el letrero</h2>
      <p class="sub">${esc(l.lugar.charAt(0).toUpperCase() + l.lugar.slice(1))} · significa «${esc(l.es)}». Escucha cada sílaba y ármala con tus letras.</p>
      <div class="tabla-letrero">${casillas}</div>
      <div class="vista"><button class="oir" id="a-oir" aria-label="Escuchar la sílaba">🔊</button><div class="bloque ko" aria-live="polite">${esc(armada || '·')}</div><span style="color:var(--muted);font-weight:700;font-size:.85rem">Sílaba ${arm.i + 1} de ${arm.sil.length}</span></div>
      <div class="armar">
        <h3>Empieza con</h3><div class="fichas">${cons.map((j) => ficha(j, 'ini')).join('')}</div>
        <h3>Vocal</h3><div class="fichas">${vocs.map((j) => ficha(j, 'voc')).join('')}</div>
        ${arm.conFinal ? `<h3>Abajo (받침)</h3><div class="fichas"><button class="nada ${arm.fin === '' ? 'sel' : ''}" data-parte="fin" data-j="">nada</button>${cons.map((j) => ficha(j, 'fin')).join('')}</div>` : ''}
      </div>
      <div class="nota" id="a-nota" hidden></div>
      <button class="btn ancho" id="a-poner" style="margin-top:12px" ${arm.ini && arm.voc ? '' : 'disabled'}>Poner la sílaba</button>`);
    $('a-oir').addEventListener('click', () => oir(arm.sil[arm.i]));
    $('tarjeta').querySelectorAll('[data-parte]').forEach((b) => b.addEventListener('click', () => {
      arm[b.dataset.parte] = b.dataset.j;
      if (b.dataset.j) oirLetra(b.dataset.j); else SFX.toque();
      const nota = arm.nota; pintarArmado(); if (nota) mostrarNotaArmado(nota);
    }));
    $('a-poner').addEventListener('click', ponerSilaba);
  }
  function mostrarNotaArmado(n) { const el = $('a-nota'); el.hidden = false; el.className = 'nota ' + n.clase; el.textContent = n.texto; }
  function ponerSilaba() {
    const meta = arm.sil[arm.i];
    const r = R.revisarSilaba(meta, arm.ini, arm.voc, arm.fin, arm.intentos);
    if (!r.ok) {
      SFX.error(); arm.intentos++;
      arm.nota = { clase: 'mal', texto: r.explicacion };
      mostrarNotaArmado(arm.nota);
      setTimeout(() => oir(meta), 500);
      return;
    }
    SFX.golpe(); oir(meta);
    arm.i++; arm.ini = null; arm.voc = null; arm.fin = ''; arm.intentos = 0; arm.nota = null;
    if (arm.i < arm.sil.length) { pintarArmado(); mostrarNotaArmado({ clase: 'bien', texto: `✓ ${meta}. Ahora la sílaba ${arm.i + 1}.` }); setTimeout(() => oir(arm.sil[arm.i]), 800); return; }
    const l = MUNDO.letreros[arm.id];
    const evs = R.restaurarLetrero(est, MUNDO, arm.id);
    SFX.letra(); setTimeout(() => oir(l.palabra), 600);
    abrirCapa(`<h2>¡Letrero armado!</h2><div class="fin-dicho"><div class="ko">${esc(l.palabra)}</div><div>${esc(l.es)}</div></div><p class="sub">${esc(l.lugar.charAt(0).toUpperCase() + l.lugar.slice(1))} se puede leer otra vez.</p><button class="btn ancho cerrar-final" id="a-listo">Seguir</button>`);
    $('a-listo').addEventListener('click', () => { cerrarCapa(); celebrar(arm.id); avisarEventos(evs); });
    $('a-listo').focus();
    hud(); guardar();
  }

  /* ── Panel: misiones, mochila, letras, ajustes ─────────────────────── */
  let pestana = 'misiones';
  $('btn-misiones').addEventListener('click', () => { if (modo === 'mapa') abrirPanel('misiones'); });
  $('btn-mochila').addEventListener('click', () => { if (modo === 'mapa') abrirPanel('mochila'); });
  $('btn-ajustes').addEventListener('click', () => { if (modo === 'mapa') abrirPanel('ajustes'); });
  function abrirPanel(p) {
    pestana = p || pestana;
    const tabs = [['misiones', '📜 Misiones'], ['mochila', '🎒 Mochila'], ['letras', '한 Letras'], ['ajustes', '⚙️ Ajustes']];
    abrirCapa(`<button class="cerrar" aria-label="Cerrar">✕</button><div class="pestanas" role="tablist">${tabs.map(([id, t]) => `<button role="tab" data-tab="${id}" aria-selected="${id === pestana}">${t}</button>`).join('')}</div><div id="p-cuerpo"></div>`);
    $('tarjeta').querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => abrirPanel(b.dataset.tab)));
    ({ misiones: panelMisiones, mochila: panelMochila, letras: panelLetras, ajustes: panelAjustes })[pestana]($('p-cuerpo'));
  }
  function panelMisiones(el) {
    const ids = Object.keys(MUNDO.misiones);
    const activas = ids.filter((id) => ['activa', 'lista'].includes(R.estadoMision(est, MUNDO, id)));
    const disponibles = ids.filter((id) => R.estadoMision(est, MUNDO, id) === 'disponible');
    const hechas = ids.filter((id) => R.estadoMision(est, MUNDO, id) === 'hecha');
    const tarjeta = (id) => {
      const m = MUNDO.misiones[id], e = est.misiones[id], estado = R.estadoMision(est, MUNDO, id);
      const objs = m.objetivos.map((o, i) => { const p = e ? e.prog[i] || 0 : 0, n = o.n || 1; return `<li class="${p >= n ? 'hecho' : ''}">${esc(o.texto)}${n > 1 ? ` (${Math.min(p, n)}/${n})` : ''}</li>`; }).join('');
      return `<div class="mision ${estado === 'hecha' ? 'hecha' : ''}"><h3>${esc(m.titulo)}${estado === 'hecha' ? '<small>✓ cumplida</small>' : ''}</h3>${estado === 'hecha' ? '' : `<ul>${objs}</ul>`}${estado === 'lista' ? `<div class="entrega">★ Listo: vuelve con ${esc(nombreNPC(m.entrega))}</div>` : ''}</div>`;
    };
    el.innerHTML = (activas.length ? activas.map(tarjeta).join('') : '') +
      disponibles.map((id) => `<div class="mision"><h3>${esc(MUNDO.misiones[id].titulo)}</h3><div class="entrega">! ${esc(nombreNPC(MUNDO.misiones[id].da))} te está buscando</div></div>`).join('') +
      (!activas.length && !disponibles.length ? '<p class="sub">No tienes misiones pendientes. ¡Explora!</p>' : '') +
      (hechas.length ? `<h3 style="font-size:.85rem;color:var(--muted);margin:16px 0 8px">CUMPLIDAS</h3>` + hechas.map(tarjeta).join('') : '');
  }
  function panelMochila(el) {
    const ids = Object.keys(est.objetos).filter((id) => R.cuantos(est, id) > 0);
    el.innerHTML = `<p class="sub">기운 ${est.hp}/${R.hpMax(est)} · ${esc(R.fmtWon(est.won))}</p>` + (ids.length ? ids.map((id) => {
      const o = MUNDO.objetos[id];
      return `<div class="fila-obj"><img alt="" src="${iconoObjeto(id)}"><div class="txt"><b class="ko">${esc(o.nombre)}</b> · ${esc(o.es)}<small>${esc(o.desc)}</small></div><span class="cant">×${R.cuantos(est, id)}</span>${o.efecto.curar ? `<button class="btn" data-usar="${id}">Usar</button>` : ''}</div>`;
    }).join('') : '<p class="sub">Tu mochila está vacía. En el 편의점 venden 김밥.</p>');
    el.querySelectorAll('[data-usar]').forEach((b) => b.addEventListener('click', () => {
      const r = R.usarObjeto(est, MUNDO, b.dataset.usar, null);
      aviso(r.msg, r.ok ? '' : 'oro'); if (r.ok) SFX.moneda();
      hud(); guardar(); abrirPanel('mochila');
    }));
  }
  function panelLetras(el) {
    const todas = R.CHO.split('').concat(R.JUNG.split(''));
    const n = todas.filter((j) => est.letras.includes(j)).length;
    el.innerHTML = `<p class="sub">Tu 도감 de letras: <b>${n} de ${todas.length}</b>. Toca una para escucharla. Las que faltan las tienen los 도깨비.</p>
      <h3 style="font-size:.8rem;color:var(--muted);margin:10px 0 6px">CONSONANTES</h3><div class="dogam">${R.CHO.split('').map(celda).join('')}</div>
      <h3 style="font-size:.8rem;color:var(--muted);margin:14px 0 6px">VOCALES</h3><div class="dogam">${R.JUNG.split('').map(celda).join('')}</div>` + palabrasYRepaso();
    el.querySelectorAll('[data-j]').forEach((b) => b.addEventListener('click', () => oirLetra(b.dataset.j)));
    el.querySelectorAll('[data-oir]').forEach((b) => b.addEventListener('click', () => oir(b.dataset.oir)));
    function celda(j) {
      const t = est.letras.includes(j);
      return t ? `<button class="tengo ko" data-j="${esc(j)}" aria-label="${esc(j)}">${esc(j)}<small>${esc(j === 'ㅇ' ? '— / ng' : R.romLetra(j))}</small></button>` : `<button class="no" disabled aria-label="Letra que falta">?</button>`;
    }
  }
  function palabrasYRepaso() {
    const palabras = Object.keys(MUNDO.letreros).filter((id) => est.letreros[id]).map((id) => MUNDO.letreros[id]);
    const dificiles = R.debiles(est, BANCO, 5);
    const titulo = (t) => `<h3 style="font-size:.8rem;color:var(--muted);margin:16px 0 6px">${t}</h3>`;
    const fila = (q) => {
      const audio = q.audio ? `<button class="oir" data-oir="${esc(q.audio)}" aria-label="Escuchar">🔊</button>` : '';
      return `<div class="repasar"><b class="ko">${esc(q.respuesta)}</b><small>${esc(q.explicacion)}</small>${audio}</div>`;
    };
    return (palabras.length ? titulo('PALABRAS QUE YA LEES') + `<div class="palabras">${palabras.map((l) => `<button class="ko" data-oir="${esc(l.palabra)}">${esc(l.palabra)}<small>${esc(l.es)}</small></button>`).join('')}</div>` : '') +
      (dificiles.length ? titulo('LO QUE MÁS TE HA COSTADO') + dificiles.map(fila).join('') : '');
  }
  function panelAjustes(el) {
    const sw = (id, on, titulo, desc) => `<div class="ajuste"><div><b>${titulo}</b><small>${desc}</small></div><button class="interruptor" role="switch" id="${id}" aria-checked="${on}" aria-label="${titulo}"></button></div>`;
    el.innerHTML = sw('aj-sonido', est.ajustes.sonido, 'Sonido', 'La voz coreana y los efectos.') +
      sw('aj-musica', est.ajustes.musica, 'Música', 'Baja sola cuando suena el coreano.') +
      (vozJay.size ? sw('aj-jay', est.ajustes.vozJay !== false, 'Voz de Jay', `Las palabras y frases que Jay grabó (${vozJay.size}) suenan con su voz; el resto, con la voz del sitio.`) : '') +
      sw('aj-rom', est.ajustes.rom, 'Pista en letras latinas', 'Muestra siempre la romanización en los duelos. Mejor dejarla apagada y usar 연필 cuando haga falta.') +
      sw('aj-cruz', est.ajustes.cruz, 'Cruz de control', 'En el celular. Sin ella, se camina tocando el mapa.') +
      `<div class="ajuste"><div><b>Prueba de sonido</b><small>Si no oyes nada, sube el volumen y quita el modo silencio.</small></div><button class="btn sec" id="aj-prueba">🔊 안녕하세요</button></div>
      <div class="ajuste"><div><b>Empezar de nuevo</b><small>Borra tu avance en este navegador.</small></div><button class="btn sec" id="aj-borrar">Borrar</button></div>
      <p class="sub" style="margin-top:16px">Capítulo 1 · ${esc(MUNDO.capitulo.curso)}. Las preguntas salen del material de Academia Seúl. <a href="/">academiaseul.com</a></p>`;
    $('aj-sonido').addEventListener('click', () => { est.ajustes.sonido = !est.ajustes.sonido; tocarMusica('plaza'); guardar(); abrirPanel('ajustes'); });
    $('aj-musica').addEventListener('click', () => { est.ajustes.musica = !est.ajustes.musica; tocarMusica('plaza'); guardar(); abrirPanel('ajustes'); });
    $('aj-cruz').addEventListener('click', () => { est.ajustes.cruz = !est.ajustes.cruz; document.body.classList.toggle('con-cruz', est.ajustes.cruz); guardar(); abrirPanel('ajustes'); });
    if ($('aj-jay')) $('aj-jay').addEventListener('click', () => { est.ajustes.vozJay = est.ajustes.vozJay === false; guardar(); abrirPanel('ajustes'); oir('안녕하세요'); });
    $('aj-rom').addEventListener('click', () => { est.ajustes.rom = !est.ajustes.rom; guardar(); abrirPanel('ajustes'); });
    $('aj-prueba').addEventListener('click', () => oir('안녕하세요'));
    $('aj-borrar').addEventListener('click', () => confirmar('¿Borrar tu avance y empezar de nuevo?', () => {
      borrando = true;
      try { localStorage.removeItem(CLAVE); } catch (e) {}
      location.reload();
    }));
  }

  /* ── Fin del capítulo ──────────────────────────────────────────────── */
  function mostrarFin() {
    if (!est.stats.fin) est.stats.fin = Date.now();
    const total = est.stats.aciertos + est.stats.errores;
    const prec = total ? Math.round(100 * est.stats.aciertos / total) : 0;
    const min = Math.max(1, Math.round((est.stats.fin - est.stats.inicio) / 60000));
    const letras = est.letras.length, todas = R.CHO.length + R.JUNG.length;
    SFX.nivel();
    abrirCapa(`<button class="cerrar" aria-label="Seguir explorando">✕</button>
      <p class="sub" style="margin:0">Capítulo 1 completo · Gwanghwamun</p>
      <h2>¡Ya lees Hangul!</h2>
      <div class="fin-dicho"><div class="ko">시작이 반이다</div><div>«Empezar ya es la mitad». En español: obra empezada, medio acabada.</div></div>
      <div class="cifras"><div><b>${letras}/${todas}</b><small>letras en tu 도감</small></div><div><b>${prec}%</b><small>al primer intento</small></div><div><b>${est.stats.duelos}</b><small>duelos ganados</small></div><div><b>${min} min</b><small>de juego</small></div></div>
      <p style="line-height:1.55">Lo que acabas de jugar es lo que se ve en las semanas 1 y 2 de <b>Básico 1</b>, la clase en vivo de Academia Seúl. Allí sigues con una profesora, en grupo y con certificado.</p>
      <div style="display:grid;gap:8px"><a class="btn" href="/inscribete?clase=a11-martes">Ver Básico 1</a><button class="btn sec" id="f-compartir">Compartir mi tarjeta</button><button class="btn sec" id="f-seguir">Seguir explorando</button></div>
      <p class="sub" style="margin-top:12px">Capítulo 2 · Bukchon (예요/이에요 y presentarte): próximamente.</p>`);
    $('f-seguir').addEventListener('click', cerrarCapa);
    $('f-compartir').addEventListener('click', () => compartir({ letras, todas, prec, duelos: est.stats.duelos }));
    guardar();
  }
  // Una imagen lista para Instagram o WhatsApp. No lleva ningún dato personal.
  async function compartir(c) {
    const cv2 = document.createElement('canvas'); cv2.width = 1080; cv2.height = 1350;
    const x = cv2.getContext('2d');
    const g = x.createRadialGradient(540, 420, 40, 540, 420, 1100);
    g.addColorStop(0, '#4236F6'); g.addColorStop(0.6, '#231c8f'); g.addColorStop(1, '#0d0c24');
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1350);
    x.imageSmoothingEnabled = false;
    x.drawImage(S.tigre('abajo', 0), 330, 110, 420, 420);
    x.textAlign = 'center'; x.fillStyle = '#ffffff';
    const f = (peso, n) => `${peso} ${n}px "Noto Sans KR",sans-serif`;
    x.font = f(900, 108); x.fillText('¡Ya leo Hangul!', 540, 680);
    x.font = f(900, 80); x.fillStyle = '#ffe08a'; x.fillText('시작이 반이다', 540, 800);
    x.font = f(700, 42); x.fillStyle = '#cfcaff'; x.fillText('Empezar ya es la mitad', 540, 866);
    x.font = f(900, 54); x.fillStyle = '#ffffff';
    x.fillText(`${c.letras} letras · ${c.prec}% al primer intento`, 540, 1000);
    x.fillText(`${c.duelos} duelos ganados`, 540, 1076);
    x.font = f(700, 40); x.fillStyle = 'rgba(255,255,255,.8)';
    x.fillText('호랑이의 모험 · academiaseul.com/aventura', 540, 1270);
    const blob = await new Promise((ok) => cv2.toBlob(ok, 'image/png'));
    if (!blob) return;
    const archivoImg = new File([blob], 'ya-leo-hangul.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [archivoImg] })) {
      try { await navigator.share({ files: [archivoImg], text: 'Aprendí a leer coreano jugando 🐯 academiaseul.com/aventura' }); return; } catch (e) { if (e.name === 'AbortError') return; }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = archivoImg.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    aviso('Tarjeta descargada.');
  }

  /* ── Confirmar (sin confirm(): en algunos navegadores integrados no aparece) ── */
  function confirmar(texto, si) {
    $('conf-txt').textContent = texto;
    $('confirma').hidden = false;
    $('conf-si').onclick = () => { $('confirma').hidden = true; si(); };
    $('conf-no').onclick = () => { $('confirma').hidden = true; };
    $('conf-no').focus();
  }

  /* ── Prólogo: un 도깨비 se roba las letras frente a la estatua ───── */
  const CINE = { bubble: 500, letras: 950, cada: 240, huye: 2650, dur: 1000 };
  let cine = null;
  function prologo(alTerminar) {
    if (quieto) { alTerminar(); return; }
    const P = MUNDO.prologo, l = MUNDO.letreros[P.letrero];
    modo = 'escena';
    document.body.classList.add('cine');
    cine = { t0: performance.now(), P, l, jamo: R.letrasDe(l.palabra), robadas: 0, dijo: false, segundo: false, fin: alTerminar };
    ponerNarra(P.textos[0]);
  }
  function ponerNarra(txt) { const n = $('narra'); n.hidden = false; n.innerHTML = `${esc(txt)}<small>Toca para saltar</small>`; }
  function terminarCine() {
    const c = cine;
    if (!c) return;
    cine = null;
    $('narra').hidden = true;
    document.body.classList.remove('cine');
    modo = 'mapa';
    hud();
    c.fin();
  }
  function posCine(t) {
    const P = cine.P, k = Math.max(0, Math.min(1, (t - cine.t0 - CINE.huye) / CINE.dur));
    return { x: (P.desde.x + (P.hasta.x - P.desde.x) * k) * T, y: P.desde.y * T, huye: k > 0 };
  }
  function dibujarDokkaebiCine(t) {
    const p = posCine(t), b = p.huye ? Math.abs(Math.round(Math.sin(t / 60) * 2)) : 0;
    sombra(p.x, p.y, 12);
    ctx.drawImage(S.dokkaebi('verde', p.huye), Math.round(p.x), Math.round(p.y - 2 - b));
  }
  function dibujarCine(t, aPantalla) {
    const e = t - cine.t0, c = cine, p = posCine(t);
    if (!c.dijo && e > CINE.bubble) { c.dijo = true; oir('뚝딱'); blip(180, 0.1, 'square', 0.06); }
    if (e > CINE.bubble && e < CINE.huye) {
      const q = aPantalla(p.x + 8, p.y - 7);
      ctx.font = `900 ${Math.round(8 * escala)}px "Noto Sans KR",sans-serif`;
      ctx.lineWidth = Math.max(3, escala); ctx.strokeStyle = '#14142b'; ctx.strokeText('뚝딱!', q.x, q.y);
      ctx.fillStyle = '#ffe08a'; ctx.fillText('뚝딱!', q.x, q.y);
    }
    c.jamo.forEach((j, k) => {
      const k0 = CINE.letras + k * CINE.cada, a = (e - k0) / 520;
      if (a < 0 || a >= 1) return;
      if (c.robadas <= k) { c.robadas = k + 1; blip(660 + k * 90, 0.08, 'square', 0.04); }
      const de = { x: c.l.x * T + 8, y: c.l.y * T + 6 }, s = ease(a);
      const q = aPantalla(de.x + (p.x + 8 - de.x) * s, de.y + (p.y + 4 - de.y) * s - Math.sin(a * Math.PI) * 14);
      ctx.font = `900 ${Math.round(9 * escala)}px "Noto Sans KR",sans-serif`;
      ctx.lineWidth = Math.max(3, escala); ctx.strokeStyle = '#14142b'; ctx.strokeText(j, q.x, q.y);
      ctx.fillStyle = '#ffe08a'; ctx.fillText(j, q.x, q.y);
    });
    if (!c.segundo && e > CINE.bubble + 500) { c.segundo = true; ponerNarra(c.P.textos[1]); }
    if (e > CINE.huye + CINE.dur + 250) terminarCine();
  }

  /* ── Título y arranque ─────────────────────────────────────────────── */
  function pintarElenco() {
    const p = (id, img) => { const c = $(id).getContext('2d'); c.imageSmoothingEnabled = false; c.clearRect(0, 0, 16, 16); c.drawImage(img, 0, 0); };
    p('t-tigre', S.tigre('abajo', 0));
    p('t-hana', S.npc(MUNDO.npcs.hana.sprite));
    p('t-dok', S.dokkaebi('verde', true));
  }
  function empezar(nueva) {
    // El primer toque desbloquea el audio en el celular
    try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); actx.resume(); } catch (e) {}
    est = nueva ? R.crearEstado(MUNDO) : (leerGuardado() || R.crearEstado(MUNDO));
    $('titulo').hidden = true;
    $('hud').hidden = false; $('controles').hidden = false; $('ayuda-teclas').hidden = false;
    document.body.classList.toggle('con-cruz', !!est.ajustes.cruz);
    cargarMapa(est.mapa, est.x, est.y, est.dir);
    modo = 'mapa';
    hud();
    tocarMusica('plaza');
    if (nueva) prologo(() => { jug.dir = 'derecha'; abrirDialogo(R.elegirDialogo(est, MUNDO, 'hana').lineas, 'hana'); });
    else aviso('¡Bienvenido de vuelta!');
    guardar();
    setTimeout(() => { $('ayuda-teclas').hidden = true; }, 15000);
  }
  async function iniciar() {
    medir();
    try {
      const [m, p] = await Promise.all([fetch(BASE + 'mundo.json').then((r) => r.json()), fetch(BASE + 'preguntas.json').then((r) => r.json())]);
      MUNDO = m; BANCO = p.preguntas;
    } catch (e) {
      $('titulo').querySelector('.acciones').innerHTML = '<p>No se pudo cargar el juego. Revisa tu conexión y recarga la página.</p>';
      return;
    }
    pintarElenco();
    const hay = leerGuardado();
    $('btn-continuar').hidden = !hay;
    if (hay) $('btn-nueva').classList.add('sec');
    $('btn-continuar').addEventListener('click', () => empezar(false));
    $('btn-nueva').addEventListener('click', () => {
      if (hay) confirmar('Ya tienes una partida guardada. ¿Empezar de nuevo y borrarla?', () => empezar(true));
      else empezar(true);
    });
    if (hay) {
      const n = R.rachaViva(hay, Date.now()), dorado = R.doradoDisponible(hay, Date.now());
      $('t-racha').hidden = !n && !dorado;
      $('t-racha').textContent = [n ? `🔥 ${n} ${n === 1 ? 'día' : 'días seguidos'}` : '', dorado ? 'El 황금 도깨비 te espera' : ''].filter(Boolean).join(' · ');
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) guardar();
      if (actx) { try { if (document.hidden) actx.suspend(); else actx.resume(); } catch (e) {} }
    });
    // Para probar: /aventura?prueba=1 deja mirar el estado desde la consola
    if (/[?&]prueba=1/.test(location.search)) window.__aventura = { get est() { return est; }, get bat() { return bat; }, get modo() { return modo; }, get enemigos() { return enemigos; }, get paso() { return paso; }, get jug() { return jug; }, get mus() { return mus; }, get arm() { return arm; }, duelo: (en) => empezarDuelo(en), mostrarFin, R, cargarMapa: (...a) => cargarMapa(...a), hud, poblarZonas, autoCaminar, destinoGuia, terminarCine, MUNDO };
    requestAnimationFrame(bucle);
  }
  iniciar();
})();
