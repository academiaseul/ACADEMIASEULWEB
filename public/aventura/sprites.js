/* ======================================================================
   호랑이의 모험 · pixel art
   Personajes en texto (16×16, un carácter = un píxel; '.' = transparente)
   y baldosas dibujadas por código. Paleta sin rojo ni rosado.
   ====================================================================== */
(function (root) {
  'use strict';
  const T = 16;
  const K = '#1d1b2e';

  /* ── Personajes ─────────────────────────────────────────────────────── */
  const TIGRE = {
    abajo: [
      '................', '..KK........KK..', '.KwoK......KowK.', '.KooKKKKKKKKooK.',
      '.KoooooKKoooooK.', '.KKooooooooooKK.', '.KoeeooooooeeoK.', '.KKwwwwnnwwwwKK.',
      '.KowwwKwwKwwwoK.', '..KKoowwwwooKK..', '...KbbbbbbbbK...', '..KooKbBBbKooK..',
      '..KoKoowwooKoK..', '...KoowwwwooK...', '...KooKKKKooK...', '...KKK....KKK...'],
    arriba: [
      '................', '..KK........KK..', '.KoOK......KOoK.', '.KooKKKKKKKKooK.',
      '.KoooKooooKoooK.', '.KooKooooooKooK.', '.KoooKooooKoooK.', '.KKooooooooooKK.',
      '.KoooKooooKoooK.', '..KKooooooooKK..', '...KbbbbbbbbK...', '..KooKbbbbKooK..',
      '..KoKooooooKoK..', '...KooKooKooK...', '...KooKKKKooK...', '...KKK....KKK...'],
    derecha: [
      '................', '.....KK...KK....', '....KoOK.KoOK...', '....KooKKKooKK..',
      '...KooKoooooooK.', '...KoKooooooooK.', '...KooooooeoooK.', '...KKoooooowwwwK',
      '...KooooowwwwwnK', '....KKoowwwwKK..', '.....KbbbbbK....', '....KooKbbKoK...',
      '..KK.KoowwooK...', '.KoK.KoowwooK...', '.....KoKKKoK....', '.....KK...KK....'],
  };
  const PAL_TIGRE = { K, o: '#f0a23b', O: '#d4802a', w: '#fff4de', e: '#14142b', n: '#4a3426', b: '#4236F6', B: '#2d23c9' };

  const PERSONA = [
    '................', '.....KKKKKK.....', '....KhhhhhhK....', '...KhhhhhhhhK...',
    '...KhhhhhhhhK...', '...KhsssssshK...', '...KssessessK...', '...KssssssssK...',
    '....KssssssK....', '.....KKssKK.....', '....KccccccK....', '...KcccCCcccK...',
    '...KsccccccsK...', '....KppppppK....', '....KppKKppK....', '....KKK..KKK....'];
  const PEINADOS = {
    corto: {},
    largo: { 8: '...KhsssssshK...', 9: '...KhhKssKhhK...', 10: '...KhcccccchK...' },
    mono: { 0: '......KKKK......', 1: '.....KKhhKK.....' },
    coletas: { 4: '..hKhhhhhhhhKh..', 5: '..hKhsssssshKh..', 6: '.hhKssessessKhh.' },
    chef: { 0: '....KKKKKKKK....', 1: '....KwwwwwwK....', 2: '....KwwwwwwK....' },
    gorra: { 1: '.....KKKKKK.....', 2: '....KccccccK....', 3: '...KCCCCCCCCK...' },
  };
  function persona(peinado) {
    const filas = PERSONA.slice();
    for (const [i, f] of Object.entries(PEINADOS[peinado] || {})) filas[+i] = f;
    return filas;
  }

  const PERRO = [
    '................', '................', '................', '................',
    '................', '................', '..........KKK...', '.........KdddK..',
    '.........KdedddK', '..K......KddddnK', '..KK....KyyddK..', '...KKKKKdddddK..',
    '...KdddddddddK..', '...KdddddddddK..', '...KdKdK..KdKdK.', '...KK.KK..KK.KK.'];
  const PAL_PERRO = { K, d: '#d8b07a', e: '#14142b', n: '#3a2a22', y: '#f2c94c' };

  const DOKKAEBI = [
    '.......KK.......', '......KyyK......', '....KKKyyKKK....', '...KhhhhhhhhK...',
    '..KhgggggggghK..', '..KggweggweggK..', '..KgggggggggGK..', '..KgKwKwKwKwgK..',
    '...KgggggggggK..', '....KKggggKK.mM.', '...KgKvvvvKgmmMK', '..KggKvKvKKggMK.',
    '...KKvvvvvvKmK..', '....KggKKggK....', '....KggK.KggK...', '...KKKK..KKKK...'];
  const COLOR_DOKKAEBI = {
    verde: ['#5bb36a', '#3f8f50'], azul: ['#5b8fe0', '#3f6fc0'],
    morado: ['#9a7be0', '#7a5bc0'], jefe: ['#3d3a8f', '#2b2870'],
  };
  function palDokkaebi(color) {
    const [g, G] = COLOR_DOKKAEBI[color] || COLOR_DOKKAEBI.verde;
    return { K, g, G, y: '#f2e3b3', h: color === 'jefe' ? '#e8e6f5' : '#2a2440', w: '#ffffff', e: '#1d1b2e', v: '#e8b84b', m: '#a8784a', M: '#6b4a2e' };
  }

  const OBJETOS = {
    gimbap: ['................', '................', '................', '....KKKKKKKK....', '...KkkkkkkkkK...', '..KkwwwwwwwwkK..', '..KkwwyywwwwkK..', '..KkwwyyggwwkK..', '..KkwwoogggwkK..', '..KkwwoowwwwkK..', '..KkwwwwwwwwkK..', '...KkkkkkkkkK...', '....KKKKKKKK....', '................', '................', '................'],
    uyu: ['................', '......KKKK......', '.....KwwwwK.....', '....KwwwwwwK....', '....KKKKKKKK....', '....KwwwwwwK....', '....KbbbbbbK....', '....KbwwwwbK....', '....KbbbbbbK....', '....KwwwwwwK....', '....KwwwwwwK....', '....KwwwwwwK....', '....KKKKKKKK....', '................', '................', '................'],
    mul: ['................', '.......KK.......', '......KbbK......', '......KKKK......', '.....KllllK.....', '....KllllllK....', '....KllllllK....', '....KbbbbbbK....', '....KbwwwwbK....', '....KbbbbbbK....', '....KllllllK....', '....KllllllK....', '....KKKKKKKK....', '................', '................', '................'],
    buchae: ['................', '................', '................', '....KKKKKKKK....', '..KKbybybybyKK..', '.KbybybybybybK..', '.KybybybybybyK..', '..KybybybybyK...', '...KybybybyK....', '....KybybyK.....', '.....KybyK......', '......KmK.......', '......KmK.......', '.......K........', '................', '................'],
    yeonpil: ['................', '................', '................', '................', '................', '................', '...KKKKKKKKKK...', '..KlKyyyyyyyKtK.', '..KlKYYYYYYYKttK', '..KlKyyyyyyyKtK.', '...KKKKKKKKKK...', '................', '................', '................', '................', '................'],
    usan: ['................', '................', '.......KK.......', '.....KKbbKK.....', '...KKbbBBbbKK...', '..KbbBBbbBBbbK..', '.KbbBBbbbbBBbbK.', '.KKKKKKKKKKKKKK.', '.......Km.......', '.......Km.......', '.......Km.......', '.......Km.......', '.....Km.Km......', '......KmmK......', '................', '................'],
  };
  const PAL_OBJ = { K, k: '#1f2b24', w: '#ffffff', y: '#f2c94c', Y: '#d9a92e', g: '#3f9f50', o: '#f08a3c', b: '#4236F6', B: '#2d23c9', l: '#bfe3fb', m: '#8a5a30', t: '#e8c99a' };

  /* ── Pintar sprites (con caché) ─────────────────────────────────────── */
  const cache = new Map();
  function lienzo(w, h) {
    if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h);
    const c = document.createElement('canvas'); c.width = w; c.height = h; return c;
  }
  function deFilas(filas, pal, espejo) {
    const c = lienzo(T, T), x = c.getContext('2d');
    filas.forEach((f, j) => {
      for (let i = 0; i < f.length; i++) {
        const ch = f[i];
        if (ch === '.' || !pal[ch]) continue;
        x.fillStyle = pal[ch];
        x.fillRect(espejo ? T - 1 - i : i, j, 1, 1);
      }
    });
    return c;
  }
  // Paso: las dos filas de los pies se corren un píxel (da sensación de caminar)
  function correr(f, n) { return n > 0 ? '.'.repeat(n) + f.slice(0, -n) : f.slice(-n) + '.'.repeat(-n); }
  function conPaso(filas, paso) {
    if (!paso) return filas;
    const out = filas.slice();
    out[14] = correr(filas[14], paso === 1 ? -1 : 1);
    out[15] = correr(filas[15], paso === 1 ? 1 : -1);
    return out;
  }
  function memo(clave, fn) { if (!cache.has(clave)) cache.set(clave, fn()); return cache.get(clave); }

  function tigre(dir, paso) {
    return memo(`t-${dir}-${paso}`, () => {
      const base = dir === 'izquierda' ? TIGRE.derecha : TIGRE[dir];
      return deFilas(conPaso(base, paso), PAL_TIGRE, dir === 'izquierda');
    });
  }
  function npc(p) {
    return memo(`p-${p.peinado}-${p.pelo}-${p.piel}-${p.ropa}`, () => deFilas(persona(p.peinado), {
      K, h: p.pelo, s: p.piel, e: '#1d1b2e', c: p.ropa, C: p.sombra || p.ropa, p: p.pantalon || '#3b4358', w: '#ffffff',
    }));
  }
  function perro(dir, paso) { return memo(`d-${dir}-${paso}`, () => deFilas(conPaso(PERRO, paso), PAL_PERRO, dir === 'izquierda')); }
  function dokkaebi(color, espejo) { return memo(`g-${color}-${espejo}`, () => deFilas(DOKKAEBI, palDokkaebi(color), espejo)); }
  function objeto(id) { return memo(`o-${id}`, () => deFilas(OBJETOS[id] || OBJETOS.gimbap, PAL_OBJ)); }
  // Para <img> en la mochila y la tienda
  function aURL(spr, escala) {
    const c = document.createElement('canvas');
    c.width = T * escala; c.height = T * escala;
    const x = c.getContext('2d'); x.imageSmoothingEnabled = false;
    x.drawImage(spr, 0, 0, c.width, c.height);
    return c.toDataURL();
  }

  /* ── Baldosas ───────────────────────────────────────────────────────── */
  const SUELOS = new Set(['.', ',', '=', ':', '_', '-', 'b']);
  function hash(x, y, s) { let h = (x * 374761393 + y * 668265263 + (s || 0) * 2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
  function motas(c, px, py, x, y, color, n, s) {
    c.fillStyle = color;
    for (let k = 0; k < n; k++) c.fillRect(px + Math.floor(hash(x, y, k + s) * 15), py + Math.floor(hash(y, x, k + s + 9) * 15), 1, 1);
  }
  // Qué suelo pintar debajo de un árbol, un letrero o un farol
  function sueloVecino(filas, x, y) {
    for (const [dx, dy] of [[0, 1], [-1, 0], [1, 0], [0, -1]]) {
      const f = filas[y + dy]; const t = f && f[x + dx];
      if (t && SUELOS.has(t) && t !== 'b') return t === ',' ? '.' : t;
    }
    return '.';
  }
  function suelo(c, t, px, py, x, y) {
    switch (t) {
      case '.': case ',':
        c.fillStyle = '#7cc46b'; c.fillRect(px, py, T, T);
        motas(c, px, py, x, y, '#69b25a', 6, 1); motas(c, px, py, x, y, '#90d27e', 3, 2);
        if (t === ',') {
          for (let k = 0; k < 3; k++) {
            const fx = px + 2 + Math.floor(hash(x, y, 30 + k) * 11), fy = py + 2 + Math.floor(hash(y, x, 40 + k) * 11);
            c.fillStyle = ['#ffffff', '#a9b8ff', '#ffe27a'][k % 3];
            c.fillRect(fx - 1, fy, 3, 1); c.fillRect(fx, fy - 1, 1, 3);
            c.fillStyle = '#e8b84b'; c.fillRect(fx, fy, 1, 1);
          }
        }
        break;
      case '=':
        c.fillStyle = '#d9d3c5'; c.fillRect(px, py, T, T);
        c.fillStyle = '#c6bfb0';
        c.fillRect(px, py, T, 1); c.fillRect(px, py + 8, T, 1);
        c.fillRect(px + ((y % 2) ? 4 : 12), py, 1, 8); c.fillRect(px + ((y % 2) ? 12 : 4), py + 8, 1, 8);
        motas(c, px, py, x, y, '#e6e1d6', 4, 3);
        break;
      case ':':
        c.fillStyle = '#d9b98b'; c.fillRect(px, py, T, T);
        motas(c, px, py, x, y, '#c7a573', 7, 4); motas(c, px, py, x, y, '#e6caa0', 3, 5);
        break;
      case '_':
        c.fillStyle = '#eddaa8'; c.fillRect(px, py, T, T);
        motas(c, px, py, x, y, '#dcc58e', 8, 6);
        break;
      case '-':
        c.fillStyle = '#efe6d2'; c.fillRect(px, py, T, T);
        c.fillStyle = '#ddd1b8';
        for (let k = 0; k < 4; k++) c.fillRect(px, py + k * 4 + 3, T, 1);
        c.fillRect(px + ((x + y) % 2 ? 5 : 11), py, 1, 3);
        break;
      case 'b':
        c.fillStyle = '#a8784a'; c.fillRect(px, py, T, T);
        c.fillStyle = '#8a5f37';
        for (let k = 0; k < 4; k++) c.fillRect(px, py + k * 4, T, 1);
        break;
      default:
        c.fillStyle = '#7cc46b'; c.fillRect(px, py, T, T);
    }
  }
  function dibujarBaldosa(c, filas, x, y) {
    const t = filas[y][x], px = x * T, py = y * T;
    const vec = (dx, dy) => { const f = filas[y + dy]; return f ? f[x + dx] : null; };
    switch (t) {
      case '.': case ',': case '=': case ':': case '_': case '-':
        suelo(c, t, px, py, x, y); break;
      case 'b':
        suelo(c, 'b', px, py, x, y);
        c.fillStyle = '#6b4a2e';
        if (vec(-1, 0) === '~') c.fillRect(px, py, 2, T);
        if (vec(1, 0) === '~') c.fillRect(px + T - 2, py, 2, T);
        break;
      case '~':
        c.fillStyle = '#4f9fe0'; c.fillRect(px, py, T, T);
        if (vec(0, -1) && vec(0, -1) !== '~' && vec(0, -1) !== 'b') { c.fillStyle = '#3c86c6'; c.fillRect(px, py, T, 2); }
        break;
      case 'T': {
        suelo(c, sueloVecino(filas, x, y), px, py, x, y);
        c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(px + 3, py + 13, 10, 2);
        c.fillStyle = '#7a5230'; c.fillRect(px + 6, py + 10, 4, 5);
        c.fillStyle = '#2f7340'; circulo(c, px + 8, py + 7, 7);
        c.fillStyle = '#3f8f4f'; circulo(c, px + 8, py + 6, 6);
        c.fillStyle = '#59a865'; circulo(c, px + 6, py + 4, 3);
        c.fillStyle = '#2f7340'; c.fillRect(px + 9, py + 8, 2, 1); c.fillRect(px + 4, py + 9, 2, 1);
        break;
      }
      case '#':
        c.fillStyle = '#bcb4a5'; c.fillRect(px, py, T, T);
        c.fillStyle = '#a19989';
        for (let k = 0; k < 4; k++) c.fillRect(px, py + k * 4 + 3, T, 1);
        for (let k = 0; k < 4; k++) c.fillRect(px + ((k + x) % 2 ? 3 : 10), py + k * 4, 1, 3);
        break;
      case 'R':
        c.fillStyle = '#3b4358'; c.fillRect(px, py, T, T);
        c.fillStyle = '#56607a';
        for (let k = 0; k < 4; k++) c.fillRect(px, py + k * 4, T, 1);
        c.fillStyle = '#2c3245';
        for (let k = 0; k < 4; k++) c.fillRect(px + k * 4 + 2, py, 1, T);
        if (vec(0, 1) && vec(0, 1) !== 'R') { c.fillStyle = '#2c3245'; c.fillRect(px, py + 14, T, 2); }
        break;
      case 'W': case 'V': case 'D': case 'd': {
        c.fillStyle = '#f1e9d8'; c.fillRect(px, py, T, T);
        c.fillStyle = '#7a5230'; c.fillRect(px, py, T, 2); c.fillRect(px, py + T - 2, T, 2);
        if (vec(-1, 0) !== 'W' && vec(-1, 0) !== 'V' && vec(-1, 0) !== 'D' && vec(-1, 0) !== 'd') c.fillRect(px, py, 2, T);
        if (vec(1, 0) !== 'W' && vec(1, 0) !== 'V' && vec(1, 0) !== 'D' && vec(1, 0) !== 'd') c.fillRect(px + T - 2, py, 2, T);
        if (t === 'V') {
          c.fillStyle = '#fbf3e0'; c.fillRect(px + 3, py + 3, 10, 9);
          c.fillStyle = '#8a5a30';
          c.fillRect(px + 3, py + 3, 10, 1); c.fillRect(px + 3, py + 11, 10, 1); c.fillRect(px + 3, py + 3, 1, 9); c.fillRect(px + 12, py + 3, 1, 9);
          c.fillRect(px + 8, py + 3, 1, 9); c.fillRect(px + 3, py + 7, 10, 1);
        }
        if (t === 'D' || t === 'd') {
          c.fillStyle = t === 'D' ? '#8a5a30' : '#6b4a2e'; c.fillRect(px + 2, py + 2, 12, 14);
          c.fillStyle = t === 'D' ? '#a8784a' : '#7a5230'; c.fillRect(px + 3, py + 3, 4, 13); c.fillRect(px + 9, py + 3, 4, 13);
          c.fillStyle = '#e8b84b'; c.fillRect(px + 7, py + 9, 1, 2); c.fillRect(px + 8, py + 9, 1, 2);
        }
        break;
      }
      case 'F':
        suelo(c, sueloVecino(filas, x, y), px, py, x, y);
        c.fillStyle = '#8a5a30'; c.fillRect(px, py + 6, T, 10);
        c.fillStyle = '#c99560'; c.fillRect(px, py + 5, T, 3);
        for (let k = 0; k < 3; k++) {
          c.fillStyle = ['#3f9f50', '#ffffff', '#e8b84b'][(x + k) % 3];
          c.fillRect(px + 2 + k * 5, py + 2, 3, 3);
        }
        break;
      case 'S':
        suelo(c, sueloVecino(filas, x, y), px, py, x, y);
        c.fillStyle = '#6b4a2e'; c.fillRect(px + 3, py + 9, 2, 7); c.fillRect(px + 11, py + 9, 2, 7);
        break;
      case 'L':
        suelo(c, sueloVecino(filas, x, y), px, py, x, y);
        c.fillStyle = '#3b4358'; c.fillRect(px + 7, py + 4, 2, 12); c.fillRect(px + 5, py + 15, 6, 1);
        c.fillStyle = '#4236F6'; c.fillRect(px + 5, py, 6, 6);
        c.fillStyle = '#ffe08a'; c.fillRect(px + 6, py + 1, 4, 4);
        break;
      case 'X':
        suelo(c, ':', px, py, x, y);
        c.fillStyle = '#a8784a'; c.fillRect(px + 1, py + 3, 14, 12);
        c.fillStyle = '#6b4a2e';
        c.fillRect(px + 1, py + 3, 14, 1); c.fillRect(px + 1, py + 14, 14, 1);
        for (let k = 0; k < 12; k++) { c.fillRect(px + 2 + k, py + 3 + k, 1, 1); c.fillRect(px + 13 - k, py + 3 + k, 1, 1); }
        break;
      case 'C':
        suelo(c, '-', px, py, x, y);
        c.fillStyle = '#a8784a'; c.fillRect(px, py + 4, T, 12);
        c.fillStyle = '#c99560'; c.fillRect(px, py + 2, T, 4);
        break;
      case 'H':
        suelo(c, '-', px, py, x, y);
        c.fillStyle = '#8a5a30'; c.fillRect(px, py, T, T);
        c.fillStyle = '#c99560'; c.fillRect(px + 1, py + 7, 14, 1); c.fillRect(px + 1, py + 14, 14, 1);
        for (let k = 0; k < 4; k++) {
          c.fillStyle = ['#4236F6', '#e8b84b', '#3f9f50', '#ffffff'][(x + y + k) % 4];
          c.fillRect(px + 1 + k * 4, py + 2, 3, 5);
          c.fillStyle = ['#ffffff', '#4236F6', '#e8b84b', '#3f9f50'][(x + k) % 4];
          c.fillRect(px + 1 + k * 4, py + 9, 3, 5);
        }
        break;
      case 'G': case '^':
        suelo(c, '=', px, py, x, y); break;
      default:
        suelo(c, '.', px, py, x, y);
    }
  }
  function circulo(c, cx, cy, r) {
    for (let dy = -r; dy <= r; dy++) {
      const w = Math.floor(Math.sqrt(r * r - dy * dy));
      c.fillRect(cx - w, cy + dy, w * 2, 1);
    }
  }

  /* ── Objetos grandes: la puerta del palacio y la estatua ───────────── */
  function puertaPalacio(c, px, py) {
    const W = 9 * T;
    // Base de piedra con tres arcos
    c.fillStyle = '#cfc8b8'; c.fillRect(px, py + 30, W, 34);
    c.fillStyle = '#b8b1a1';
    for (let k = 0; k < 4; k++) c.fillRect(px, py + 34 + k * 8, W, 1);
    for (let k = 0; k < 10; k++) c.fillRect(px + k * 15 + ((k % 2) ? 5 : 0), py + 30, 1, 34);
    c.fillStyle = '#2a2840';
    arco(c, px + 22, py + 42, 18, 22); arco(c, px + W / 2 - 13, py + 38, 26, 26); arco(c, px + W - 40, py + 42, 18, 22);
    // Pabellón de madera
    c.fillStyle = '#6b4a2e'; c.fillRect(px + 12, py + 14, W - 24, 16);
    c.fillStyle = '#2f8f83'; c.fillRect(px + 12, py + 14, W - 24, 3);
    c.fillStyle = '#4a9fd0'; for (let k = 0; k < 14; k++) c.fillRect(px + 14 + k * 9, py + 15, 4, 1);
    c.fillStyle = '#4b3220'; for (let k = 0; k < 7; k++) c.fillRect(px + 18 + k * 18, py + 17, 3, 13);
    // Placa (el texto se escribe en la pasada de texto)
    c.fillStyle = '#14234a'; c.fillRect(px + W / 2 - 16, py + 18, 32, 9);
    c.fillStyle = '#e8b84b'; c.fillRect(px + W / 2 - 16, py + 18, 32, 1); c.fillRect(px + W / 2 - 16, py + 26, 32, 1);
    // Techo de dos aguas con aleros curvos
    techo(c, px - 4, py + 6, W + 8, 9);
    techo(c, px + 14, py, W - 28, 6);
  }
  function arco(c, x, y, w, h) {
    c.fillRect(x, y + w / 2, w, h - w / 2);
    for (let dy = 0; dy < w / 2; dy++) {
      const r = w / 2, ww = Math.floor(Math.sqrt(r * r - (r - dy) * (r - dy)));
      c.fillRect(x + r - ww, y + dy, ww * 2, 1);
    }
  }
  function techo(c, x, y, w, h) {
    c.fillStyle = '#2e3550';
    for (let k = 0; k < h; k++) {
      const curva = Math.max(0, 3 - k);
      c.fillRect(x + k - curva * 2 + 2, y + k, w - 2 * (k - curva * 2 + 2), 1);
    }
    c.fillStyle = '#4a5370'; c.fillRect(x + h, y + 1, w - 2 * h, 1);
    c.fillStyle = '#3d4562'; for (let k = 0; k < w; k += 4) c.fillRect(x + k, y + h - 2, 2, 2);
  }
  function estatua(c, px, py) {
    // Pedestal (2 baldosas de alto) y el rey sentado encima, sobresaliendo hacia arriba
    c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(px + 2, py + 62, 60, 3);
    c.fillStyle = '#bdb6a7'; c.fillRect(px + 2, py + 34, 60, 30);
    c.fillStyle = '#a7a090'; c.fillRect(px + 2, py + 34, 60, 3); c.fillRect(px + 8, py + 44, 48, 1);
    c.fillStyle = '#d4cdbd'; c.fillRect(px + 4, py + 37, 56, 2);
    const oro = '#c9a24a', sombra = '#9c7b2f', luz = '#e3c26e';
    c.fillStyle = sombra; c.fillRect(px + 14, py + 22, 36, 12);
    c.fillStyle = oro; c.fillRect(px + 18, py + 12, 28, 18); c.fillRect(px + 14, py + 26, 36, 8);
    c.fillStyle = luz; c.fillRect(px + 20, py + 13, 4, 14);
    c.fillStyle = oro; circulo(c, px + 32, py + 8, 6);
    c.fillStyle = sombra; c.fillRect(px + 25, py + 0, 14, 4); c.fillRect(px + 23, py + 2, 18, 2);
    c.fillStyle = sombra; c.fillRect(px + 29, py + 20, 6, 8);
    c.fillStyle = luz; c.fillRect(px + 30, py + 22, 4, 1);
  }

  // Tablero de un letrero (más ancho que la baldosa). El texto va en la pasada de texto.
  function tablero(c, px, py, armado) {
    c.fillStyle = '#6b4a2e'; c.fillRect(px - 6, py - 2, 28, 13);
    c.fillStyle = armado ? '#fff7e2' : '#d9cfbb'; c.fillRect(px - 5, py - 1, 26, 11);
    if (!armado) {
      c.fillStyle = '#c5b9a2';
      c.fillRect(px - 2, py + 3, 4, 1); c.fillRect(px + 6, py + 5, 5, 1); c.fillRect(px + 13, py + 2, 4, 1);
    }
  }

  root.SPRITES = { T, tigre, npc, perro, dokkaebi, objeto, aURL, dibujarBaldosa, puertaPalacio, estatua, tablero, circulo, OBJETOS };
})(typeof self !== 'undefined' ? self : this);
