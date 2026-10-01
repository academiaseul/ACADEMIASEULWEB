// Construye tarjetas.html (estilo C · Kawaii pastel) desde palabras.json.
// Uso: node build.js   (desde cualquier carpeta). Base del mazo completo: ../../Basico1_completo/C_Kawaii_pastel/make.js
const fs = require('fs');
const path = require('path');
const req = require('module').createRequire('C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad/package.json');
const QR = req('qrcode');

const BASE = path.resolve(__dirname, '..'); // Basico1_5_estilos (palabras.json)
const OUT = path.join(BASE, 'C_Kawaii_pastel');
const palabras = JSON.parse(fs.readFileSync(path.join(BASE, 'palabras.json'), 'utf8'));

const AZUL = '#4236F6', NAVY = '#003478', DORADO = '#E8B84B';
const N = NAVY;
const CAT = {
  'Comida y bebida': { bg: '#CDE8FF', bd: '#B4D6F7', gr: '#B3D5F6' },
  'Naturaleza':      { bg: '#FFF1C9', bd: '#EFD995', gr: '#F0DA9C' },
  'Objetos':         { bg: '#E6E1FF', bd: '#CFC8FF', gr: '#D2CBFA' },
  'Animales':        { bg: '#CFF2E3', bd: '#ABDFC7', gr: '#A6DEC4' },
};

// ---------- piezas de dibujo ----------
const star = (x, y, s, fill) => {
  const k = +(s * 0.2).toFixed(2);
  return `<path d="M${x} ${y - s} Q${x + k} ${y - k} ${x + s} ${y} Q${x + k} ${y + k} ${x} ${y + s} Q${x - k} ${y + k} ${x - s} ${y} Q${x - k} ${y - k} ${x} ${y - s} Z" fill="${fill}"/>`;
};
const dot = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const ground = (cx, cy, rx, ry, fill) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
// cara kawaii: ojos navy con brillo, mejillas durazno, sonrisa
function face(cx, cy, o = {}) {
  const ex = o.ex ?? 14, r = o.r ?? 5.5, cdx = o.cdx ?? ex + 11, cdy = o.cdy ?? 11, crx = o.crx ?? 7, cry = o.cry ?? 4.5;
  const mw = o.mw ?? 6, my = o.my ?? 8;
  const hl = +(r * 0.33).toFixed(2), ho = +(r * 0.33).toFixed(2);
  return [
    `<ellipse cx="${cx - cdx}" cy="${cy + cdy}" rx="${crx}" ry="${cry}" fill="#FFCBA0"/>`,
    `<ellipse cx="${cx + cdx}" cy="${cy + cdy}" rx="${crx}" ry="${cry}" fill="#FFCBA0"/>`,
    `<circle cx="${cx - ex}" cy="${cy}" r="${r}" fill="${N}"/>`,
    `<circle cx="${cx + ex}" cy="${cy}" r="${r}" fill="${N}"/>`,
    `<circle cx="${cx - ex + ho}" cy="${cy - ho}" r="${hl}" fill="#FFFFFF"/>`,
    `<circle cx="${cx + ex + ho}" cy="${cy - ho}" r="${hl}" fill="#FFFFFF"/>`,
    `<path d="M${cx - mw} ${cy + my} Q${cx} ${cy + my + 7} ${cx + mw} ${cy + my}" fill="none" stroke="${N}" stroke-width="2.6" stroke-linecap="round"/>`,
  ].join('');
};
const S = `stroke="${N}" stroke-width="3" stroke-linejoin="round"`;
const drop = (x, y, s, fill) => `<path d="M${x} ${y - 1.3 * s} Q${x + s} ${y} ${x + s} ${y + 0.4 * s} A${s} ${s} 0 0 1 ${x - s} ${y + 0.4 * s} Q${x - s} ${y} ${x} ${y - 1.3 * s} Z" fill="${fill}" stroke="${N}" stroke-width="2.2" stroke-linejoin="round"/>`;

// ---------- 12 dibujos (viewBox 0 0 220 200) ----------
const ART = {
  // 1 우유 · cartón de leche (prototipo aprobado)
  1: (c) => `
    ${star(34, 40, 11, '#FFFFFF')}${star(190, 38, 8, DORADO)}${star(194, 118, 6, '#FFFFFF')}
    ${dot(28, 118, 3, '#FFFFFF')}${dot(40, 156, 2.5, DORADO)}${dot(200, 80, 2.5, '#FFFFFF')}
    ${ground(112, 187, 62, 8, c.gr)}
    <path d="M140 76 L168 62 L168 166 Q168 171 164 173 L140 182 Z" fill="#E4E0FF"/>
    <path d="M140 146 L168 132 L168 166 Q168 171 164 173 L140 182 Z" fill="#B9B0F5"/>
    <path d="M140 76 L168 62 L168 166 Q168 171 164 173 L140 182 Z" fill="none" ${S}/>
    <path d="M140 76 L98 40 L126 26 L168 62 Z" fill="#CFC8FF" ${S}/>
    <path d="M98 40 L126 26 L126 17 L98 31 Z" fill="#FFFFFF" ${S}/>
    <path d="M56 76 L98 40 L140 76 Z" fill="${AZUL}" ${S}/>
    <path d="M98 50 Q105 59 105 63 A7 7 0 0 1 91 63 Q91 59 98 50 Z" fill="#FFFFFF"/>
    <path d="M56 76 L140 76 L140 172 Q140 182 130 182 L66 182 Q56 182 56 172 Z" fill="#FFFFFF"/>
    <path d="M56 146 Q66.5 139 77 146 T98 146 T119 146 T140 146 L140 172 Q140 182 130 182 L66 182 Q56 182 56 172 Z" fill="#CFC8FF"/>
    <path d="M56 76 L140 76 L140 172 Q140 182 130 182 L66 182 Q56 182 56 172 Z" fill="none" ${S}/>
    ${face(98, 112)}`,

  // 2 나무 · árbol
  2: (c) => {
    const C = [[110, 72, 42], [72, 92, 30], [148, 92, 30], [84, 56, 26], [136, 56, 26], [88, 122, 24], [132, 122, 24], [110, 108, 34]];
    const circ = (fill, extra = '') => C.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`).join('');
    return `
    ${star(30, 38, 10, '#FFFFFF')}${star(194, 36, 7, '#CFC8FF')}${star(198, 140, 6, '#FFFFFF')}
    ${dot(24, 104, 3, '#FFFFFF')}${dot(200, 92, 2.5, '#FFFFFF')}${dot(34, 160, 2.5, '#CFC8FF')}
    ${ground(110, 188, 66, 8, c.gr)}
    <path d="M97 118 L123 118 Q122 158 134 178 Q137 186 129 186 L91 186 Q83 186 86 178 Q98 158 97 118 Z" fill="#E9C48E" ${S}/>
    <path d="M110 150 Q115 160 112 172" fill="none" stroke="#C99A5E" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M62 186 L65 175 L69 184 L73 173 L76 186 Z" fill="#8ED3A0" stroke="${N}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M146 186 L149 176 L153 184 L157 174 L160 186 Z" fill="#8ED3A0" stroke="${N}" stroke-width="2.2" stroke-linejoin="round"/>
    ${circ(N, `stroke="${N}" stroke-width="6"`)}
    ${circ('#A6E1B4')}
    <ellipse cx="74" cy="66" rx="11" ry="6.5" fill="#D6F4DD" transform="rotate(-35 74 66)"/>
    ${dot(92, 42, 4, '#D6F4DD')}
    <circle cx="58" cy="104" r="5.5" fill="${DORADO}" stroke="${N}" stroke-width="2"/>
    <circle cx="160" cy="78" r="5.5" fill="${DORADO}" stroke="${N}" stroke-width="2"/>
    <circle cx="130" cy="38" r="5" fill="${DORADO}" stroke="${N}" stroke-width="2"/>
    ${face(110, 96, { ex: 15, r: 6, cdx: 27, crx: 8, cry: 5 })}`;
  },

  // 3 바다 · mar con olas, sol y velero
  3: (c) => {
    const rays = Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4, cx = 172, cy = 48;
      const x1 = cx + 25 * Math.cos(a), y1 = cy + 25 * Math.sin(a), x2 = cx + 32 * Math.cos(a), y2 = cy + 32 * Math.sin(a);
      return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${DORADO}" stroke-width="3.5" stroke-linecap="round"/>`;
    }).join('');
    const xs = Array.from({ length: 9 }, (_, i) => -20 + 32.5 * i);
    let top = `M-20 126`;
    for (let i = 1; i < xs.length; i++) top += ` Q${(xs[i] - 16.25).toFixed(2)} 108 ${xs[i].toFixed(2)} 126`;
    const foam = xs.slice(1).map((x) => { const p = x - 16.25; return `<path d="M${(p - 8).toFixed(2)} 127 Q${p.toFixed(2)} 117 ${(p + 8).toFixed(2)} 127" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>`; }).join('');
    return `
    ${star(32, 34, 9, '#FFFFFF')}${star(24, 94, 6, '#CFC8FF')}${dot(206, 98, 2.5, '#FFFFFF')}${dot(120, 30, 2.5, '#FFFFFF')}
    ${rays}
    <circle cx="172" cy="48" r="18" fill="#FBDD7E" ${S}/>
    <path d="M38 60 Q45 51 52 60 Q59 51 66 60" fill="none" stroke="${N}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M80 44 Q85 38 90 44 Q95 38 100 44" fill="none" stroke="${N}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M152 104 L152 64" stroke="${N}" stroke-width="3" stroke-linecap="round"/>
    <path d="M155 66 L155 100 L178 100 Z" fill="${AZUL}" stroke="${N}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M149 72 L149 100 L133 100 Z" fill="#FFFFFF" stroke="${N}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M128 105 L180 105 L172 123 L136 123 Z" fill="#FFFFFF" ${S}/>
    <path d="${top} L240 220 L-20 220 Z" fill="#8CCBF6"/>
    <path d="M-20 170 Q6 160 32 170 T84 170 T136 170 T188 170 T240 170 L240 220 L-20 220 Z" fill="#6FB8EE"/>
    ${foam}
    <path d="M14 188 Q24 182 34 188 T54 188" fill="none" stroke="#B5DDFB" stroke-width="3" stroke-linecap="round"/>
    <path d="M164 190 Q174 184 184 190 T204 190" fill="none" stroke="#B5DDFB" stroke-width="3" stroke-linecap="round"/>
    <path d="${top}" fill="none" ${S}/>
    ${face(110, 146, { ex: 15, r: 6, cdx: 27, crx: 8, cry: 5 })}`;
  },

  // 4 모자 · sombrero (copa redonda, cinta azul con lazo)
  4: (c) => `
    ${star(32, 40, 10, DORADO)}${star(192, 34, 7, '#FFFFFF')}${star(198, 104, 5, DORADO)}
    ${dot(26, 98, 3, '#FFFFFF')}${dot(204, 70, 2.5, '#FFFFFF')}${dot(30, 176, 2.5, '#FFFFFF')}
    ${ground(110, 186, 78, 8, c.gr)}
    <ellipse cx="110" cy="150" rx="88" ry="25" fill="#F6D47A" ${S}/>
    <path d="M40 152 Q46 160 58 163 M162 163 Q174 160 180 152" fill="none" stroke="#E2B44E" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M70 168 L76 166 M100 172 L106 172 M130 171 L136 170 M154 166 L160 163 M50 160 L55 159" stroke="#E2B44E" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M58 146 Q54 72 110 70 Q166 72 162 146 Q110 160 58 146 Z" fill="#F9DD8E"/>
    <path d="M57 120 Q110 134 163 120 L162 140 Q110 154 58 140 Z" fill="${AZUL}"/>
    <path d="M58 146 Q54 72 110 70 Q166 72 162 146 Q110 160 58 146 Z" fill="none" ${S}/>
    <path d="M57 120 Q110 134 163 120 M58 140 Q110 154 162 140" fill="none" stroke="${N}" stroke-width="2.4"/>
    <path d="M140 132 Q156 116 166 124 Q170 134 140 132 Z" fill="${AZUL}" stroke="${N}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M140 132 Q150 148 164 146 Q168 138 140 132 Z" fill="${AZUL}" stroke="${N}" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="140" cy="132" r="5" fill="#7A70FF" stroke="${N}" stroke-width="2.4"/>
    <ellipse cx="80" cy="88" rx="8" ry="4.5" fill="#FFF3CC" transform="rotate(-40 80 88)"/>
    ${face(108, 100, { ex: 15, r: 6, cdx: 27, crx: 8, cry: 5 })}`,

  // 5 빵 · pan de molde con mantequilla
  5: (c) => `
    ${star(30, 36, 10, '#FFFFFF')}${star(194, 40, 8, DORADO)}${star(196, 128, 6, '#FFFFFF')}
    ${dot(24, 110, 3, '#FFFFFF')}${dot(34, 160, 2.5, DORADO)}${dot(204, 88, 2.5, '#FFFFFF')}
    ${ground(110, 188, 62, 8, c.gr)}
    <path d="M62 176 L62 106 Q40 102 40 78 Q40 46 76 44 Q92 30 110 30 Q128 30 144 44 Q180 46 180 78 Q180 102 158 106 L158 176 Q158 184 150 184 L70 184 Q62 184 62 176 Z" fill="#E7B46E" ${S}/>
    <path d="M72 176 L72 98 Q51 96 51 78 Q51 56 80 54 Q95 41 110 41 Q125 41 140 54 Q169 56 169 78 Q169 96 148 98 L148 174 Q148 176 146 176 L74 176 Q72 176 72 174 Z" fill="#FFF2D4"/>
    <g transform="rotate(-10 104 70)">
      <rect x="90" y="60" width="28" height="20" rx="5" fill="#FBE08A" stroke="${N}" stroke-width="2.6"/>
      <path d="M95 66 L104 66" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
    </g>
    ${dot(84, 150, 2, '#E7B46E')}${dot(136, 156, 2, '#E7B46E')}${dot(126, 164, 1.8, '#E7B46E')}
    ${face(110, 116, { ex: 15, r: 6, cdx: 27, crx: 8, cry: 5 })}`,

  // 6 물 · gota de agua + vaso
  6: (c) => `
    ${star(176, 40, 10, '#FFFFFF')}${star(30, 44, 7, DORADO)}${star(200, 92, 5, '#FFFFFF')}
    ${dot(22, 120, 3, '#FFFFFF')}${dot(150, 70, 2.5, DORADO)}${dot(30, 170, 2.5, '#FFFFFF')}
    ${ground(116, 189, 80, 7, c.gr)}
    <path d="M96 30 Q138 90 138 128 A42 42 0 0 1 54 128 Q54 90 96 30 Z" fill="#7FC3F4" ${S}/>
    <path d="M60 140 Q78 150 96 144 Q116 138 134 146 Q128 166 96 170 Q66 168 60 140 Z" fill="#6AB2EC"/>
    <path d="M96 30 Q138 90 138 128 A42 42 0 0 1 54 128 Q54 90 96 30 Z" fill="none" ${S}/>
    <ellipse cx="72" cy="112" rx="5.5" ry="12" fill="#FFFFFF" transform="rotate(22 72 112)"/>
    ${dot(80, 90, 3.5, '#FFFFFF')}
    ${face(96, 132, { ex: 14, r: 5.8, cdx: 25 })}
    <path d="M146 106 L190 106 L184 176 Q183 184 175 184 L161 184 Q153 184 152 176 Z" fill="#FFFFFF"/>
    <path d="M148 128 Q158 123 168 128 Q178 133 188 128 L184 175 Q183 181 175 181 L161 181 Q155 181 154 175 Z" fill="#A6D6FA"/>
    <path d="M157 136 L160 170" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M146 106 L190 106 L184 176 Q183 184 175 184 L161 184 Q153 184 152 176 Z" fill="none" ${S}/>
    <ellipse cx="168" cy="106" rx="22" ry="3.5" fill="#FFFFFF" stroke="${N}" stroke-width="2.4"/>`,

  // 7 책 · libro de pie, tapa dorada
  7: (c) => {
    const lines = Array.from({ length: 8 }, (_, k) => `<path d="M152 ${66 + 14 * k} L166 ${58 + 14 * k}" stroke="#CFC8FF" stroke-width="2" stroke-linecap="round"/>`).join('');
    return `
    ${star(32, 40, 10, DORADO)}${star(196, 132, 7, '#FFFFFF')}${star(192, 30, 6, '#FFFFFF')}
    ${dot(26, 104, 3, '#FFFFFF')}${dot(204, 84, 2.5, DORADO)}${dot(36, 168, 2.5, '#FFFFFF')}
    ${ground(114, 188, 70, 8, c.gr)}
    <path d="M56 48 L80 34 L172 34 L148 48 Z" fill="#FFFDF8" ${S}/>
    <path d="M70 46 L90 36 M86 46 L106 36 M102 46 L122 36 M118 46 L138 36 M134 46 L154 36" stroke="#E4E0FF" stroke-width="1.6"/>
    <path d="M148 48 L172 34 L172 166 Q172 171 168 173 L148 184 Z" fill="#FFFDF8"/>
    ${lines}
    <path d="M148 48 L172 34 L172 166 Q172 171 168 173 L148 184 Z" fill="none" ${S}/>
    <rect x="56" y="48" width="92" height="136" rx="9" fill="#F6D47A" ${S}/>
    <path d="M56 57 Q56 48 65 48 L72 48 L72 184 L65 184 Q56 184 56 175 Z" fill="${AZUL}" ${S}/>
    <rect x="82" y="64" width="54" height="26" rx="7" fill="#FFFFFF" stroke="${N}" stroke-width="2.4"/>
    <text x="109" y="83" text-anchor="middle" font-family="Jua, sans-serif" font-size="15" fill="${N}">ㄱㄴㄷ</text>
    <path d="M126 184 L126 196 L131 191.5 L136 196 L136 184" fill="${AZUL}" stroke="${N}" stroke-width="2.2" stroke-linejoin="round"/>
    ${face(110, 128, { ex: 14, r: 5.8, cdx: 24 })}`;
  },

  // 8 가방 · mochila
  8: (c) => `
    ${star(30, 40, 10, '#FFFFFF')}${star(194, 40, 8, DORADO)}${star(196, 130, 6, '#FFFFFF')}
    ${dot(24, 110, 3, DORADO)}${dot(202, 90, 2.5, '#FFFFFF')}${dot(32, 166, 2.5, '#FFFFFF')}
    ${ground(110, 189, 68, 7, c.gr)}
    <path d="M90 54 Q90 28 110 28 Q130 28 130 54" fill="none" stroke="${N}" stroke-width="11" stroke-linecap="round"/>
    <path d="M90 54 Q90 28 110 28 Q130 28 130 54" fill="none" stroke="#6CC7A4" stroke-width="5" stroke-linecap="round"/>
    <path d="M54 92 Q30 104 34 150 Q36 166 50 168" fill="none" stroke="${N}" stroke-width="11" stroke-linecap="round"/>
    <path d="M54 92 Q30 104 34 150 Q36 166 50 168" fill="none" stroke="#6CC7A4" stroke-width="5" stroke-linecap="round"/>
    <path d="M52 96 Q52 48 110 48 Q168 48 168 96 L168 166 Q168 184 150 184 L70 184 Q52 184 52 166 Z" fill="#A3E0C6" ${S}/>
    <path d="M52 96 Q52 48 110 48 Q168 48 168 96 Q140 112 110 112 Q80 112 52 96 Z" fill="#7FD0B0" ${S}/>
    <ellipse cx="78" cy="66" rx="10" ry="5" fill="#C6F0DE" transform="rotate(-30 78 66)"/>
    <rect x="70" y="96" width="13" height="30" rx="3" fill="${AZUL}" stroke="${N}" stroke-width="2.4"/>
    <rect x="137" y="96" width="13" height="30" rx="3" fill="${AZUL}" stroke="${N}" stroke-width="2.4"/>
    <rect x="67.5" y="114" width="18" height="11" rx="2.5" fill="#F6D47A" stroke="${N}" stroke-width="2.2"/>
    <rect x="134.5" y="114" width="18" height="11" rx="2.5" fill="#F6D47A" stroke="${N}" stroke-width="2.2"/>
    <rect x="70" y="146" width="80" height="32" rx="13" fill="#CDEFE0" ${S}/>
    <path d="M80 157 L140 157" stroke="${N}" stroke-width="2" stroke-dasharray="3 3"/>
    <circle cx="140" cy="157" r="3.6" fill="${DORADO}" stroke="${N}" stroke-width="2"/>
    <path d="M140 160 L140 168" stroke="${N}" stroke-width="2.4" stroke-linecap="round"/>
    ${face(110, 124, { ex: 12, r: 5.3, cdx: 0.001, crx: 0, cry: 0, mw: 5, my: 7 })}
    <ellipse cx="102" cy="138" rx="6" ry="3.8" fill="#FFCBA0"/><ellipse cx="118" cy="138" rx="6" ry="3.8" fill="#FFCBA0"/>`,

  // 9 커피 · taza de café con vapor
  9: (c) => `
    ${star(30, 40, 9, DORADO)}${star(196, 44, 8, '#FFFFFF')}${star(201, 152, 5, DORADO)}
    ${dot(26, 112, 3, '#FFFFFF')}${dot(204, 90, 2.5, '#FFFFFF')}${dot(28, 160, 2.5, '#FFFFFF')}
    ${ground(110, 191, 70, 6, c.gr)}
    <path d="M88 76 Q80 64 88 54 Q96 44 88 32" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M110 72 Q102 58 110 46 Q118 36 110 22" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M132 76 Q124 64 132 54 Q140 44 132 32" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round"/>
    <ellipse cx="110" cy="178" rx="76" ry="12" fill="#E4E0FF" ${S}/>
    <ellipse cx="110" cy="176" rx="44" ry="6" fill="#CFC8FF"/>
    <path d="M156 106 Q188 102 186 126 Q184 150 152 148" fill="none" stroke="${N}" stroke-width="14" stroke-linecap="round"/>
    <path d="M156 106 Q188 102 186 126 Q184 150 152 148" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
    <path d="M56 92 L164 92 L156 152 Q152 174 128 174 L92 174 Q68 174 64 152 Z" fill="#FFFFFF"/>
    <path d="M61.6 134 L158.4 134 L156.5 148 L63.5 148 Z" fill="#F6D47A"/>
    <path d="M56 92 L164 92 L156 152 Q152 174 128 174 L92 174 Q68 174 64 152 Z" fill="none" ${S}/>
    <ellipse cx="110" cy="92" rx="54" ry="12" fill="#FFFFFF" ${S}/>
    <ellipse cx="110" cy="93" rx="45" ry="8" fill="#8C6448"/>
    <path d="M98 93 Q104 88 112 92 Q118 96 124 91" fill="none" stroke="#E9D6C0" stroke-width="2.4" stroke-linecap="round"/>
    ${face(110, 114, { ex: 15, r: 6, cdx: 27, cdy: 10, crx: 8, cry: 5 })}`,

  // 10 우산 · paraguas con gotas
  10: (c) => `
    ${star(30, 36, 9, '#FFFFFF')}${star(194, 32, 7, DORADO)}
    ${dot(204, 82, 2.5, '#FFFFFF')}${dot(18, 86, 2.5, DORADO)}
    ${drop(30, 140, 7, '#9FD3FA')}${drop(190, 140, 7, '#9FD3FA')}${drop(48, 172, 5.5, '#9FD3FA')}${drop(176, 174, 5.5, '#9FD3FA')}
    ${ground(110, 189, 54, 6, c.gr)}
    <path d="M110 104 L110 164 Q110 182 96 182 Q84 182 84 170" fill="none" stroke="${N}" stroke-width="10" stroke-linecap="round"/>
    <path d="M110 104 L110 164 Q110 182 96 182 Q84 182 84 170" fill="none" stroke="#F6D47A" stroke-width="4" stroke-linecap="round"/>
    <path d="M30 112 Q32 38 110 34 Q188 38 190 112 Q167 100 144 112 Q110 96 76 112 Q53 100 30 112 Z" fill="#8FB6FF"/>
    <path d="M110 34 Q84 52 76 112 Q110 96 144 112 Q136 52 110 34 Z" fill="#D6E3FF"/>
    <path d="M110 34 Q84 52 76 112 M110 34 Q136 52 144 112" fill="none" stroke="${N}" stroke-width="2.6"/>
    <path d="M30 112 Q32 38 110 34 Q188 38 190 112 Q167 100 144 112 Q110 96 76 112 Q53 100 30 112 Z" fill="none" ${S}/>
    <ellipse cx="56" cy="70" rx="9" ry="5" fill="#C9DBFF" transform="rotate(-40 56 70)"/>
    <circle cx="110" cy="29" r="5.5" fill="#F6D47A" stroke="${N}" stroke-width="2.6"/>
    ${face(110, 74, { ex: 12, r: 5.3, cdx: 0.001, crx: 0, cry: 0, mw: 5, my: 7 })}
    <ellipse cx="96" cy="88" rx="5.5" ry="3.6" fill="#FFCBA0"/><ellipse cx="124" cy="88" rx="5.5" ry="3.6" fill="#FFCBA0"/>`,

  // 11 고양이 · gato (prototipo aprobado)
  11: (c) => `
    ${star(30, 46, 10, '#FFFFFF')}${star(192, 52, 8, '#CFC8FF')}${star(30, 151, 7, DORADO)}
    ${dot(24, 110, 3, '#FFFFFF')}${dot(198, 88, 2.5, '#FFFFFF')}${dot(46, 176, 2.5, '#FFFFFF')}
    ${ground(110, 189, 66, 8, c.gr)}
    <path d="M146 176 Q194 174 190 138 Q188 124 176 127" fill="none" stroke="${N}" stroke-width="17" stroke-linecap="round"/>
    <path d="M146 176 Q194 174 190 138 Q188 124 176 127" fill="none" stroke="#FFF6E6" stroke-width="11" stroke-linecap="round"/>
    <path d="M188 132 Q184 125 176 127" fill="none" stroke="#F3D27A" stroke-width="11" stroke-linecap="round"/>
    <path d="M68 176 Q62 128 110 122 Q158 128 152 176 Q152 186 142 186 L78 186 Q68 186 68 176 Z" fill="#FFF6E6" ${S}/>
    <ellipse cx="110" cy="160" rx="20" ry="17" fill="#FFFFFF"/>
    <ellipse cx="94" cy="182" rx="13" ry="8" fill="#FFF6E6" stroke="${N}" stroke-width="2.6"/>
    <ellipse cx="126" cy="182" rx="13" ry="8" fill="#FFF6E6" stroke="${N}" stroke-width="2.6"/>
    <path d="M91 180 L91 185 M97 180 L97 185 M123 180 L123 185 M129 180 L129 185" stroke="${N}" stroke-width="2" stroke-linecap="round"/>
    <path d="M60 82 Q54 34 70 32 Q82 34 98 52 Z" fill="#FFF6E6" ${S}/>
    <path d="M160 82 Q166 34 150 32 Q138 34 122 52 Z" fill="#F3D27A" ${S}/>
    <path d="M68 66 Q66 46 72 44 Q78 46 86 55 Z" fill="#CFC8FF"/>
    <path d="M152 66 Q154 46 148 44 Q142 46 134 55 Z" fill="#CFC8FF"/>
    <ellipse cx="110" cy="94" rx="58" ry="46" fill="#FFF6E6"/>
    <path d="M130 56 Q150 60 162 80 Q150 88 136 80 Q126 70 130 56 Z" fill="#F3D27A"/>
    <ellipse cx="110" cy="94" rx="58" ry="46" fill="none" stroke="${N}" stroke-width="3"/>
    <ellipse cx="76" cy="111" rx="9" ry="5.5" fill="#FFCBA0"/><ellipse cx="144" cy="111" rx="9" ry="5.5" fill="#FFCBA0"/>
    <circle cx="88" cy="98" r="6.5" fill="${N}"/><circle cx="132" cy="98" r="6.5" fill="${N}"/>
    <circle cx="90.2" cy="95.6" r="2.2" fill="#FFFFFF"/><circle cx="134.2" cy="95.6" r="2.2" fill="#FFFFFF"/>
    <path d="M106 106 Q110 104 114 106 Q112 110 110 110 Q108 110 106 106 Z" fill="#E8A866" stroke="${N}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M102 113 Q106 119 110 113 Q114 119 118 113" fill="none" stroke="${N}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M62 102 L46 98 M62 109 L46 111 M158 102 L174 98 M158 109 L174 111" stroke="${N}" stroke-width="2.2" stroke-linecap="round"/>`,

  // 12 강아지 · perrito con orejas caídas y collar
  12: (c) => `
    ${star(30, 40, 10, '#FFFFFF')}${star(196, 30, 7, '#CFC8FF')}${star(30, 150, 7, DORADO)}
    ${dot(22, 104, 3, '#FFFFFF')}${dot(204, 70, 2.5, '#FFFFFF')}${dot(44, 178, 2.5, '#FFFFFF')}
    ${ground(110, 189, 66, 8, c.gr)}
    <path d="M148 166 Q182 160 186 128" fill="none" stroke="${N}" stroke-width="15" stroke-linecap="round"/>
    <path d="M148 166 Q182 160 186 128" fill="none" stroke="#E2B271" stroke-width="9" stroke-linecap="round"/>
    <path d="M196 120 L204 114 M198 134 L207 133" stroke="${N}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M68 176 Q62 128 110 122 Q158 128 152 176 Q152 186 142 186 L78 186 Q68 186 68 176 Z" fill="#FFF6E6" ${S}/>
    <ellipse cx="110" cy="164" rx="19" ry="15" fill="#FFFFFF"/>
    <ellipse cx="94" cy="182" rx="13" ry="8" fill="#FFF6E6" stroke="${N}" stroke-width="2.6"/>
    <ellipse cx="126" cy="182" rx="13" ry="8" fill="#FFF6E6" stroke="${N}" stroke-width="2.6"/>
    <path d="M91 180 L91 185 M97 180 L97 185 M123 180 L123 185 M129 180 L129 185" stroke="${N}" stroke-width="2" stroke-linecap="round"/>
    <path d="M76 130 Q110 148 144 130 L146 141 Q110 160 74 141 Z" fill="${AZUL}" stroke="${N}" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="110" cy="154" r="6.5" fill="${DORADO}" stroke="${N}" stroke-width="2.4"/>
    <ellipse cx="110" cy="92" rx="56" ry="45" fill="#FFF6E6" ${S}/>
    <ellipse cx="132" cy="90" rx="15" ry="13" fill="#F3D27A"/>
    <path d="M90 50 Q60 44 46 70 Q34 96 46 118 Q58 130 68 112 Q74 96 76 80 Q80 62 90 50 Z" fill="#D9A462" ${S}/>
    <path d="M130 50 Q160 44 174 70 Q186 96 174 118 Q162 130 152 112 Q146 96 144 80 Q140 62 130 50 Z" fill="#D9A462" ${S}/>
    <ellipse cx="110" cy="112" rx="19" ry="13" fill="#FFFFFF"/>
    <ellipse cx="86" cy="113" rx="7.5" ry="4.8" fill="#FFCBA0"/><ellipse cx="134" cy="113" rx="7.5" ry="4.8" fill="#FFCBA0"/>
    <circle cx="92" cy="92" r="6.5" fill="${N}"/><circle cx="130" cy="92" r="6.5" fill="${N}"/>
    <circle cx="94.2" cy="89.6" r="2.2" fill="#FFFFFF"/><circle cx="132.2" cy="89.6" r="2.2" fill="#FFFFFF"/>
    <ellipse cx="110" cy="105" rx="7.5" ry="5.5" fill="${N}"/>
    <circle cx="107.6" cy="103.2" r="1.8" fill="#FFFFFF"/>
    <path d="M110 110 L110 114 M101 114 Q105.5 120 110 114 Q114.5 120 119 114" fill="none" stroke="${N}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
};

// ---------- íconos ----------
const speaker = (size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" aria-hidden="true"><path d="M4 9.5 H7.5 L12 5.5 V18.5 L7.5 14.5 H4 Z" stroke-width="2" stroke-linejoin="round"/><path d="M15.5 9 A4 4 0 0 1 15.5 15" stroke-width="2" stroke-linecap="round"/><path d="M18.5 6.5 A7.5 7.5 0 0 1 18.5 17.5" stroke-width="2" stroke-linecap="round"/></svg>`;
const sparkle = (size, fill) => `<svg width="${size}" height="${size}" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1 Q11.8 8.2 19 10 Q11.8 11.8 10 19 Q8.2 11.8 1 10 Q8.2 8.2 10 1 Z" fill="${fill}"/></svg>`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nn = (n) => String(n).padStart(2, '0') + '/12';

async function main() {
  // QR en SVG (navy sobre blanco, margen de 4 módulos)
  const qrs = {};
  for (const p of palabras) {
    let svg = await QR.toString(p.audio, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, color: { dark: '#003478ff', light: '#ffffffff' } });
    svg = svg.replace('<svg ', `<svg class="qr-svg" role="img" aria-label="QR: audio de ${esc(p.kr)}" `);
    qrs[p.n] = svg;
  }

  const front = (p) => {
    const c = CAT[p.categoria];
    const big = [...p.kr].length === 1 ? ' one' : '';
    return `<div class="card front" data-n="${p.n}"><div class="inner">
      <div class="art${p.n === 3 ? ' bleed' : ''}" style="background:${c.bg};border-color:${c.bd}">
        <div class="num">${nn(p.n)}</div>
        <svg class="ill" viewBox="0 0 220 200" width="268" height="244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.es)}">${ART[p.n](c)}</svg>
      </div>
      <div class="word">
        <div class="hangul${big}" lang="ko">${esc(p.kr)}</div>
        <div class="audio">${speaker(24, AZUL)}</div>
      </div>
    </div></div>`;
  };

  const back = (p) => {
    const c = CAT[p.categoria];
    return `<div class="card back" data-n="${p.n}"><div class="inner">
      <div class="top">
        <div class="pill" style="background:${c.bg};border-color:${c.bd}">${esc(p.categoria)}</div>
        <div class="num-sm">${sparkle(14, DORADO)}<span>${nn(p.n)}</span></div>
      </div>
      <div class="head">
        <div class="kr" lang="ko">${esc(p.kr)}</div>
        <div class="rom">${esc(p.rom)}</div>
        <div class="es fit">${esc(p.es)}</div>
      </div>
      <div class="divider"><span></span>${sparkle(12, '#CFC8FF')}<span></span></div>
      <div class="ex" style="background:${c.bg};border-color:${c.bd}">
        <div class="ex-label">Ejemplo</div>
        <div class="ex-kr" lang="ko">${esc(p.ejemplo_kr)}</div>
        <div class="ex-es">${esc(p.ejemplo_es)}</div>
      </div>
      <div class="foot">
        <div class="foot-l">
          <div class="lvl">Básico 1 · Semana ${p.semana}</div>
          <div class="brand">${sparkle(10, DORADO)}<span>Academia Seúl</span></div>
        </div>
        <div class="qr">
          <div class="qr-box">${qrs[p.n]}</div>
          <div class="qr-cap">${speaker(11, NAVY)}<span>Escúchala</span></div>
        </div>
      </div>
    </div></div>`;
  };

  // Página carta: 816 x 1056 px. Tarjeta 336 x 456. Gutter 24.
  const X = [60, 420], Y = [60, 540], W = 336, H = 456;
  const cutMarks = () => {
    const L = 11, G = 3; let s = '';
    for (const y of Y) for (const x of X) {
      for (const [cx, cy, dx, dy] of [[x, y, -1, -1], [x + W, y, 1, -1], [x, y + H, -1, 1], [x + W, y + H, 1, 1]]) {
        s += `<path d="M${cx + dx * G} ${cy} L${cx + dx * (G + L)} ${cy} M${cx} ${cy + dy * G} L${cx} ${cy + dy * (G + L)}"/>`;
      }
    }
    return `<svg class="cuts" width="816" height="1056" viewBox="0 0 816 1056" aria-hidden="true"><g stroke="#8E8E8E" stroke-width="0.6" fill="none">${s}</g></svg>`;
  };

  const pages = [];
  for (let g = 0; g < 3; g++) {
    const grupo = palabras.slice(g * 4, g * 4 + 4);
    // anversos: [1 2 / 3 4]
    const fSlots = grupo.map((p, i) => `<div class="slot" style="left:${X[i % 2]}px;top:${Y[Math.floor(i / 2)]}px">${front(p)}</div>`).join('');
    pages.push(`<section class="page" data-tipo="anversos" data-grupo="${g + 1}">${cutMarks()}${fSlots}</section>`);
    // reversos: columnas invertidas [2 1 / 4 3] para doble cara por el borde largo
    const bSlots = grupo.map((p, i) => `<div class="slot" style="left:${X[1 - (i % 2)]}px;top:${Y[Math.floor(i / 2)]}px">${back(p)}</div>`).join('');
    pages.push(`<section class="page" data-tipo="reversos" data-grupo="${g + 1}">${cutMarks()}${bSlots}</section>`);
  }

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flashcards Básico 1 · Kawaii pastel</title>
<meta name="description" content="Academia Seúl · 12 flashcards de Básico 1 (octubre 2026), estilo C Kawaii pastel. Carta, 4 tarjetas por hoja, imprimir a doble cara por el borde largo.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jua&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
@page { size: letter; margin: 0 }
:root {
  --azul: ${AZUL}; --navy: ${NAVY}; --dorado: ${DORADO};
  --crema: #FFFDF8; --lila: #C9C1FF; --lila-lip: #DAD4FF; --gris: #5F6478; --gris-2: #4B5170; --texto-2: #3B4566;
}
* { box-sizing: border-box }
html, body { margin: 0; padding: 0; background: #FFFFFF }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Nunito', 'Jua', sans-serif; color: var(--navy) }
.page { position: relative; width: 816px; height: 1056px; overflow: hidden; background: #FFFFFF; page-break-after: always; break-after: page }
.page:last-of-type { page-break-after: auto; break-after: auto }
@media screen {
  body { background: #E9E7F2; padding: 16px 0 }
  .page { margin: 0 auto 16px; box-shadow: 0 2px 10px rgba(0, 52, 120, .15) }
}
.cuts { position: absolute; inset: 0 }
.slot { position: absolute; width: 336px; height: 456px }

/* tarjeta: fondo lila punteado a sangre (tolera el desfase del doble cara) + tarjeta crema redondeada */
.card { width: 336px; height: 456px; padding: 7px 7px 9px; background-color: #F1EEFF; background-image: radial-gradient(#E0DAFF 1.4px, transparent 1.7px); background-size: 18px 18px; background-position: 4px 4px }
.inner { width: 100%; height: 100%; border-radius: 24px; background: var(--crema); border: 2px solid var(--lila); box-shadow: 0 3px 0 var(--lila-lip); display: flex; flex-direction: column; overflow: hidden }

/* ---------- anverso ---------- */
.front .inner { padding: 13px }
.art { position: relative; height: 252px; flex: none; border-radius: 18px; border: 1.5px solid; display: flex; align-items: center; justify-content: center }
.art .ill { display: block; margin-top: 4px }
.art.bleed { overflow: hidden }
.art.bleed .ill { overflow: visible }
.art .num { z-index: 1 }
.num { position: absolute; top: 10px; left: 10px; padding: 3px 10px; border-radius: 999px; background: #FFFFFF; color: var(--navy); font-weight: 800; font-size: 11px; letter-spacing: .5px }
.word { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding-top: 2px }
.hangul { font-family: 'Jua', sans-serif; font-size: 82px; line-height: 1; color: var(--azul); text-shadow: 0 4px 0 #DCD6FF; letter-spacing: 2px; white-space: nowrap }
.hangul.one { font-size: 88px; margin-top: 6px }
.audio { width: 46px; height: 46px; border-radius: 50%; background: #F0EDFF; border: 2px solid var(--azul); box-shadow: 0 3px 0 #CFC8FF; display: flex; align-items: center; justify-content: center }

/* ---------- reverso ---------- */
.back .inner { padding: 15px 17px 13px }
.top { display: flex; align-items: center; justify-content: space-between; flex: none }
.pill { padding: 5px 12px; border-radius: 999px; border: 1.5px solid; color: var(--navy); font-weight: 800; font-size: 12px; line-height: 1.2 }
.num-sm { display: flex; align-items: center; gap: 5px; font-weight: 800; font-size: 11px; color: var(--gris-2) }
.head { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6px 0 4px; flex: 1 1 auto; min-height: 0 }
.kr { font-family: 'Jua', sans-serif; font-size: 40px; line-height: 1.12; color: var(--navy) }
.rom { font-weight: 700; font-size: 14px; color: var(--gris); letter-spacing: 1px; margin-top: 1px }
.es { font-weight: 900; font-size: 52px; line-height: 1.02; color: var(--azul); margin-top: 8px; white-space: nowrap; text-align: center; max-width: 100% }
.es.two { white-space: normal; line-height: .98 }
.divider { display: flex; align-items: center; gap: 8px; margin-top: 4px; flex: none }
.divider span { flex: 1; border-top: 2px dashed #D9D3FF }
.ex { margin-top: 10px; border-radius: 16px; border: 1.5px solid; padding: 9px 13px 10px; display: flex; flex-direction: column; gap: 2px; flex: none }
.ex-label { font-weight: 800; font-size: 10.5px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--navy) }
.ex-kr { font-family: 'Jua', sans-serif; font-size: 22px; line-height: 1.25; color: var(--navy) }
.ex-es { font-weight: 700; font-size: 14px; line-height: 1.3; color: var(--texto-2) }
.foot { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 10px; flex: none }
.foot-l { display: flex; flex-direction: column; gap: 4px; padding-bottom: 4px }
.lvl { font-weight: 800; font-size: 12.5px; color: var(--navy) }
.brand { display: flex; align-items: center; gap: 5px; font-weight: 800; font-size: 10.5px; color: var(--gris-2) }
.qr { display: flex; flex-direction: column; align-items: center; gap: 2px }
.qr-box { width: 74px; height: 74px; border-radius: 8px; border: 1.5px solid #D9D3FF; overflow: hidden; background: #FFFFFF }
.qr-svg { display: block; width: 100%; height: 100% }
.qr-cap { display: flex; align-items: center; gap: 3px; font-weight: 800; font-size: 10.5px; color: var(--navy) }
</style>
</head>
<body>
${pages.join('\n')}
<script>
// Ajusta el significado en español al ancho de la tarjeta (una línea; si es "a, b" y quedaría muy chico, dos líneas).
function fitAll() {
  document.querySelectorAll('.es.fit').forEach(function (el) {
    var max = 52, min = 40, s = max;
    el.style.fontSize = s + 'px';
    var w = el.parentElement.clientWidth - 10;
    while (el.scrollWidth > w && s > min) { s -= 1; el.style.fontSize = s + 'px'; }
    if (el.scrollWidth > w && el.textContent.indexOf(', ') > 0) {
      var parts = el.textContent.split(', ');
      el.innerHTML = parts[0] + ', <br>' + parts.slice(1).join(', ');
      el.classList.add('two');
      s = 44; el.style.fontSize = s + 'px';
      while (el.scrollWidth > w && s > 30) { s -= 1; el.style.fontSize = s + 'px'; }
    } else {
      while (el.scrollWidth > w && s > 26) { s -= 1; el.style.fontSize = s + 'px'; }
    }
  });
}
(document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { fitAll(); window.__listo = true; });
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, 'tarjetas.html'), html, 'utf8');
  console.log('tarjetas.html', (html.length / 1024).toFixed(1) + ' KB');
}
main();
