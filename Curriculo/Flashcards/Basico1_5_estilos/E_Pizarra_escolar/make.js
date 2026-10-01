// Flashcards Básico 1 · estilo E · Pizarra escolar coreana
// Uso: node make.js   (genera tarjetas.html, el PDF de 6 páginas y vista_previa.png)
const fs = require('fs');
const path = require('path');
const req = require('module').createRequire('C:/Users/Chingu/AppData/Local/Temp/claude/C--Users-Chingu-Desktop-ACADEMIASEULWEB/d4111e1b-5523-44ea-97b2-b1a1d9545b9e/scratchpad/package.json');
const QR = req('qrcode');
const puppeteer = req('puppeteer-core');

const OUT = __dirname;
const DATOS = JSON.parse(fs.readFileSync(path.join(OUT, '..', 'palabras.json'), 'utf8'));
const HTML = path.join(OUT, 'tarjetas.html');
const PDF = path.join(OUT, 'Flashcards_Basico1_E_Pizarra_escolar.pdf');
const PNG = path.join(OUT, 'vista_previa.png');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// ---------- Paleta (sin rojo ni rosado) ----------
const W = '#F3F0E4';   // tiza blanca
const G = '#E8B84B';   // tiza dorada
const A = '#9FCBEF';   // tiza celeste (agua)
const P = '#F4B98C';   // mejillas durazno
const B = '#1F3B33';   // pizarra
const NAVY = '#003478';
// Color por categoría: >= 4.5:1 sobre el papel crema (#FBF6E8) y con ícono blanco legible
const CAT = {
  'Comida y bebida': '#9A5B00', // ámbar
  'Naturaleza': '#08707A',      // verde azulado
  'Objetos': '#4236F6',         // azul de marca
  'Animales': '#6E40C9',        // lila
};

// ---------- Ayudas de dibujo ----------
const r1 = (v) => Math.round(v * 10) / 10;
function cara(cx, cy, s = 1) {
  const ex = 11 * s;
  return `
    <ellipse cx="${r1(cx - ex)}" cy="${cy}" rx="${r1(4.4 * s)}" ry="${r1(5.4 * s)}" fill="${W}" stroke="none"/>
    <ellipse cx="${r1(cx + ex)}" cy="${cy}" rx="${r1(4.4 * s)}" ry="${r1(5.4 * s)}" fill="${W}" stroke="none"/>
    <circle cx="${r1(cx - ex - 1.4 * s)}" cy="${r1(cy - 1.8 * s)}" r="${r1(1.6 * s)}" fill="${B}" stroke="none"/>
    <circle cx="${r1(cx + ex - 1.4 * s)}" cy="${r1(cy - 1.8 * s)}" r="${r1(1.6 * s)}" fill="${B}" stroke="none"/>
    <path d="M${r1(cx - 8 * s)} ${r1(cy + 12 * s)} Q${cx} ${r1(cy + 20 * s)} ${r1(cx + 8 * s)} ${r1(cy + 12 * s)}" stroke-width="2.6"/>
    <ellipse cx="${r1(cx - 22 * s)}" cy="${r1(cy + 11 * s)}" rx="${r1(6 * s)}" ry="${r1(3.4 * s)}" fill="${P}" stroke="none"/>
    <ellipse cx="${r1(cx + 22 * s)}" cy="${r1(cy + 11 * s)}" rx="${r1(6 * s)}" ry="${r1(3.4 * s)}" fill="${P}" stroke="none"/>`;
}
function estrella(cx, cy, r, color = G, w = 2.2) {
  const k = 0.24 * r;
  return `<path d="M${cx} ${cy - r} L${r1(cx + k)} ${r1(cy - k)} L${cx + r} ${cy} L${r1(cx + k)} ${r1(cy + k)} L${cx} ${cy + r} L${r1(cx - k)} ${r1(cy + k)} L${cx - r} ${cy} L${r1(cx - k)} ${r1(cy - k)} Z" stroke="${color}" stroke-width="${w}"/>`;
}
function nube(cx, cy, rx, ry, n, k = 1.18, rot = -Math.PI / 2) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = rot + (2 * Math.PI * i) / n;
    const x = r1(cx + rx * Math.cos(a)), y = r1(cy + ry * Math.sin(a));
    if (i === 0) { d += `M${x} ${y}`; continue; }
    const am = rot + (2 * Math.PI * (i - 0.5)) / n;
    d += ` Q${r1(cx + rx * k * Math.cos(am))} ${r1(cy + ry * k * Math.sin(am))} ${x} ${y}`;
  }
  return d + ' Z';
}
function ola(x0, x1, y, amp, wl) {
  let d = `M${x0} ${y} q${wl / 4} ${-amp} ${wl / 2} 0`;
  let x = x0 + wl / 2;
  while (x + wl / 2 <= x1 + 0.01) { d += ` t${wl / 2} 0`; x += wl / 2; }
  return { d, x };
}
function gota(cx, cy, s, color = A, w = 2) {
  return `<path d="M${cx} ${r1(cy - 6 * s)} C${r1(cx + 2 * s)} ${r1(cy - 2 * s)}, ${r1(cx + 4 * s)} ${cy}, ${r1(cx + 4 * s)} ${r1(cy + 2 * s)} A${r1(4 * s)} ${r1(4 * s)} 0 0 1 ${r1(cx - 4 * s)} ${r1(cy + 2 * s)} C${r1(cx - 4 * s)} ${cy}, ${r1(cx - 2 * s)} ${r1(cy - 2 * s)}, ${cx} ${r1(cy - 6 * s)} Z" stroke="${color}" stroke-width="${w}" fill="url(#ra)"/>`;
}
const suelo = (d = 'M46 165 C 92 172, 150 172, 188 161') => `<path d="${d}" stroke-width="2.2" stroke-opacity="0.65"/>`;

// ---------- Las 12 ilustraciones (viewBox 220 x 176, tiza) ----------
const DIBUJOS = {
  // 우유 · cartón de leche (del prototipo)
  1: () => `<g transform="translate(-10 0)">
    <path d="M56 164 C 92 171, 150 171, 188 160" stroke-width="2.2" stroke-opacity="0.65"/>
    <path d="M142 66 L170 54 L170 146 L142 158 Z" fill="url(#rt)"/>
    <path d="M142 66 L156 34 L170 54 Z" fill="url(#rt)"/>
    <path d="M72 66 L86 34 L156 34 L142 66 Z"/>
    <path d="M86 34 L86 27 L156 27 L156 34"/>
    <path d="M72 66 H142 V158 H72 Z"/>
    <path d="M72 134 C 84 127, 96 141, 108 134 C 120 127, 132 141, 142 134 L142 158 L72 158 Z" fill="url(#rb)" stroke="none"/>
    <path d="M72 134 C 84 127, 96 141, 108 134 C 120 127, 132 141, 142 134"/>
    <path d="M114 40 C 117 45, 119 48, 119 51 A 5 5 0 0 1 109 51 C 109 48, 111 45, 114 40 Z" stroke="${G}" stroke-width="2.3" fill="url(#rd)"/>
    ${cara(107, 97)}
    <path d="M72 112 C 61 110, 54 102, 51 92"/>
    <circle cx="50" cy="88" r="3.8" fill="${W}" stroke="none"/>
    <path d="M170 108 C 178 112, 183 120, 184 130"/>
    <circle cx="184.5" cy="133.5" r="3.6" fill="${W}" stroke="none"/>
    ${estrella(44, 50.5, 10.5)}
    ${estrella(200, 78, 8, G, 2)}
    <path d="M192 34 C 194 38, 195 40, 195 42 A 3 3 0 0 1 189 42 C 189 40, 190 38, 192 34 Z" stroke-width="2.2"/>
  </g>`,

  // 나무 · árbol
  2: () => {
    const copa = nube(110, 66, 62, 46, 12, 1.17);
    const frutas = [[74, 50], [148, 44], [154, 86], [66, 88], [112, 28]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="5.5" fill="url(#rd)" stroke="${G}" stroke-width="2.2"/><path d="M${x} ${y - 5.5} l1.5 -4" stroke-width="1.8"/>`).join('');
    return `
    ${suelo()}
    <path d="M98 164 C 101 146, 102 128, 100 104 L120 104 C 118 128, 119 146, 122 164 Z" fill="url(#rt)"/>
    <path d="M106 138 C 108 144, 108 149, 106 155 M114 122 V130" stroke-width="1.8" stroke-opacity="0.8"/>
    <path d="M120 140 C 128 136, 133 130, 136 124" stroke-width="2.4"/>
    <path d="M136 124 C 144 120, 150 124, 148 130 C 142 132, 137 130, 136 124 Z" stroke="${G}" stroke-width="2" fill="url(#rd)"/>
    <path d="M84 164 l3 -9 l3 9 l3 -7 l2 7 M128 164 l3 -8 l3 8" stroke-width="2"/>
    <path d="${copa}" fill="${B}" stroke="none"/>
    <path d="${copa}" fill="url(#rt)"/>
    ${frutas}
    ${cara(110, 64)}
    ${estrella(34, 128, 9)}
    ${estrella(192, 120, 7, G, 2)}
    ${estrella(196, 34, 6, W, 2)}`;
  },

  // 바다 · mar
  3: () => {
    const o1 = ola(22, 198, 114, 7, 22);
    const o2 = ola(26, 194, 136, 6, 20);
    const o3 = ola(22, 198, 156, 5, 18);
    const rayos = Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4;
      return `M${r1(156 + 26 * Math.cos(a))} ${r1(50 + 26 * Math.sin(a))} L${r1(156 + 33 * Math.cos(a))} ${r1(50 + 33 * Math.sin(a))}`;
    }).join(' ');
    return `
    <path d="${rayos}" stroke="${G}" stroke-width="2.4"/>
    <circle cx="156" cy="50" r="19" fill="url(#rd)" stroke="${G}" stroke-width="2.6"/>
    <path d="M147 48 q3 -3.5 6 0 M159 48 q3 -3.5 6 0" stroke-width="2.2"/>
    <path d="M150 55 Q156 61 162 55" stroke-width="2.2"/>
    <path d="M40 44 q6 -6 12 0 q6 -6 12 0 M84 28 q5 -5 10 0 q5 -5 10 0" stroke-width="2.2"/>
    <path d="M22 98 H198" stroke-width="2" stroke-opacity="0.8"/>
    <path d="M71 92 V54" stroke-width="2.4"/>
    <path d="M71 54 L80 57 L71 60" stroke="${G}" stroke-width="2.2" fill="url(#rd)"/>
    <path d="M74 58 L74 88 L98 88 Z" fill="url(#rb)" stroke-width="2.4"/>
    <path d="M68 64 L68 88 L52 88 Z" fill="url(#rt)" stroke-width="2.2"/>
    <path d="M46 92 L98 92 L90 103 L54 103 Z" fill="url(#rt)" stroke-width="2.6"/>
    <path d="${o1.d} L${o1.x} 162 L22 162 Z" fill="url(#ra)" stroke="none"/>
    <path d="${o1.d}" stroke="${A}" stroke-width="3"/>
    <path d="${o2.d}" stroke="${A}" stroke-width="2.6"/>
    <path d="${o3.d}" stroke="${A}" stroke-width="2.2" stroke-opacity="0.9"/>
    <g transform="rotate(-24 130 112)">
      <path d="M118 114 C 124 104, 138 102, 146 110 C 138 116, 126 118, 118 114 Z" fill="url(#rd)" stroke="${G}" stroke-width="2.4"/>
      <path d="M118 114 L109 108 L111 121 Z" fill="url(#rd)" stroke="${G}" stroke-width="2.2"/>
      <circle cx="139" cy="109" r="1.6" fill="${W}" stroke="none"/>
    </g>
    <path d="M150 124 q1 -6 6 -8 M156 128 q3 -4 8 -4" stroke="${A}" stroke-width="2"/>
    <circle cx="60" cy="126" r="1.5" fill="${W}" stroke="none"/><circle cx="96" cy="146" r="1.5" fill="${W}" stroke="none"/><circle cx="176" cy="144" r="1.5" fill="${W}" stroke="none"/>
    ${estrella(196, 70, 6, W, 2)}`;
  },

  // 모자 · gorro
  4: () => {
    const ribs = Array.from({ length: 11 }, (_, i) => `M${r1(63 + i * 9.4)} 129 V148`).join(' ');
    const pompom = nube(110, 46, 15, 14, 9, 1.22);
    return `
    ${suelo()}
    <path d="M34 62 H48 M37 56 L45 68 M45 56 L37 68" stroke-width="2"/>
    <path d="M182 96 H194 M185 91 L191 101 M191 91 L185 101" stroke-width="2"/>
    <path d="M26 112 H34 M30 108 V116" stroke-width="1.8" stroke-opacity="0.8"/>
    <path d="M60 132 C 58 84, 82 58, 110 58 C 138 58, 162 84, 160 132 Z" fill="url(#rt)"/>
    <path d="M74 108 l4 5 l4 -5 M86 80 l4 5 l4 -5 M128 80 l4 5 l4 -5 M140 108 l4 5 l4 -5" stroke-width="1.8" stroke-opacity="0.75"/>
    ${cara(110, 94)}
    <path d="M54 126 C 80 119, 140 119, 166 126 L166 154 C 140 147, 80 147, 54 154 Z" fill="${B}"/>
    <path d="M54 126 C 80 119, 140 119, 166 126 L166 154 C 140 147, 80 147, 54 154 Z" fill="url(#rd)"/>
    <path d="${ribs}" stroke-width="1.6" stroke-opacity="0.6"/>
    <path d="${pompom}" fill="${B}" stroke="none"/>
    <path d="${pompom}" fill="url(#rd)" stroke="${G}" stroke-width="2.4"/>
    ${estrella(186, 40, 8)}`;
  },

  // 빵 · pan (rebanada + espiga)
  5: () => {
    const granos = [[180, 104, -30], [191, 101, 30], [179, 118, -30], [190, 115, 30], [178, 132, -30], [189, 129, 30]]
      .map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="6.4" transform="rotate(${a} ${x} ${y})" fill="url(#rd)" stroke="${G}" stroke-width="1.8"/>`).join('');
    return `
    ${suelo('M42 165 C 90 172, 150 172, 170 163')}
    <path d="M94 34 C 88 27, 99 21, 93 12 M110 31 C 104 24, 115 18, 109 8 M126 34 C 120 27, 131 21, 125 12" stroke-width="2.2" stroke-opacity="0.85"/>
    <path d="M66 160 L68 96 C 48 92, 46 58, 70 48 C 88 40, 132 40, 150 48 C 174 58, 172 92, 152 96 L154 160 Z" fill="url(#rd)"/>
    <path d="M78 150 L80 100 C 63 96, 62 69, 80 61 C 96 55, 124 55, 140 61 C 158 69, 157 96, 140 100 L142 150 Z" fill="${B}" stroke="none"/>
    <path d="M78 150 L80 100 C 63 96, 62 69, 80 61 C 96 55, 124 55, 140 61 C 158 69, 157 96, 140 100 L142 150 Z" fill="url(#rt)" stroke-width="2.2"/>
    <ellipse cx="92" cy="76" rx="2.6" ry="1.7" stroke-width="1.6"/><ellipse cx="128" cy="72" rx="2.4" ry="1.6" stroke-width="1.6"/>
    <ellipse cx="94" cy="138" rx="2.6" ry="1.7" stroke-width="1.6"/><ellipse cx="124" cy="140" rx="2.2" ry="1.5" stroke-width="1.6"/>
    ${cara(110, 104)}
    <path d="M185 162 C 185 140, 183 118, 186 92" stroke="${G}" stroke-width="2.2"/>
    ${granos}
    <ellipse cx="186" cy="88" rx="3.2" ry="6" fill="url(#rd)" stroke="${G}" stroke-width="1.8"/>
    ${estrella(36, 58, 9)}
    ${estrella(40, 128, 6, W, 2)}`;
  },

  // 물 · agua (vaso con bombilla + gota)
  6: () => {
    const o = ola(70, 130, 92, 4, 15);
    return `
    ${suelo('M44 166 C 90 172, 150 172, 196 162')}
    <path d="M118 150 L130 40 L148 28" stroke="${G}" stroke-width="3.4"/>
    <path d="${o.d} L124 158 C 122 164, 78 164, 76 158 Z" fill="url(#ra)" stroke="none"/>
    <path d="${o.d}" stroke="${A}" stroke-width="2.6"/>
    <ellipse cx="100" cy="54" rx="34" ry="7"/>
    <path d="M66 54 L76 158 C 78 164, 122 164, 124 158 L134 54"/>
    <path d="M76 66 L81 118" stroke-width="2.2" stroke-opacity="0.6"/>
    <circle cx="90" cy="140" r="2.4" stroke="${A}" stroke-width="1.6"/><circle cx="114" cy="146" r="2" stroke="${A}" stroke-width="1.6"/>
    ${cara(100, 114, 0.92)}
    <path d="M172 62 C 182 78, 194 90, 194 106 A 22 22 0 0 1 150 106 C 150 90, 162 78, 172 62 Z" fill="url(#ra)" stroke="${A}" stroke-width="2.8"/>
    <path d="M159 104 C 159 97, 162 92, 166 88" stroke-width="2.2"/>
    ${gota(38, 72, 1.3)}
    ${gota(194, 146, 1)}
    ${estrella(40, 124, 8)}
    ${estrella(184, 36, 6, W, 2)}`;
  },

  // 책 · libro abierto
  7: () => `
    ${suelo('M40 168 C 90 174, 150 174, 186 165')}
    <path d="M38 144 C 66 138, 94 142, 110 150 C 126 142, 154 138, 182 144 L182 156 C 154 150, 126 154, 110 162 C 94 154, 66 150, 38 156 Z" fill="${B}" stroke="none"/>
    <path d="M38 144 C 66 138, 94 142, 110 150 C 126 142, 154 138, 182 144 L182 156 C 154 150, 126 154, 110 162 C 94 154, 66 150, 38 156 Z" fill="url(#rd)" stroke="${G}" stroke-width="2.4"/>
    <path d="M110 146 C 92 134, 66 132, 44 138 L44 62 C 66 56, 92 58, 110 70 Z" fill="${B}"/>
    <path d="M110 146 C 128 134, 154 132, 176 138 L176 62 C 154 56, 128 58, 110 70 Z" fill="${B}"/>
    <path d="M44 138 L44 146 C 66 140, 92 142, 110 152 C 128 142, 154 140, 176 146 L176 138" stroke-width="1.8" stroke-opacity="0.75"/>
    <path d="M110 70 V146" stroke-width="2.2"/>
    <path d="M54 80 C 68 76, 86 78, 100 85 M54 94 C 68 90, 86 92, 100 99 M54 108 C 68 104, 86 106, 100 113 M54 122 C 64 119, 76 119, 86 122" stroke-width="2" stroke-opacity="0.8"/>
    <path d="M150 60 V166 L155 160 L160 166 V59" stroke="${G}" stroke-width="2.4" fill="url(#rd)"/>
    <path d="M120 85 C 126 81, 134 79, 142 79 M120 99 C 126 95, 134 93, 142 93 M120 113 C 126 109, 134 107, 142 107 M166 82 V96 M166 106 V120" stroke-width="2" stroke-opacity="0.8"/>
    ${estrella(62, 36, 10)}
    ${estrella(110, 26, 7, W, 2)}
    ${estrella(160, 34, 8)}
    <circle cx="86" cy="46" r="1.8" fill="${W}" stroke="none"/><circle cx="136" cy="44" r="1.8" fill="${G}" stroke="none"/><circle cx="96" cy="34" r="1.3" fill="${W}" stroke="none"/>`,

  // 가방 · mochila
  8: () => `
    ${suelo()}
    <path d="M68 76 C 54 94, 54 130, 64 152 M152 76 C 166 94, 166 130, 156 152" stroke-width="2.6"/>
    <path d="M96 54 C 96 36, 124 36, 124 54" stroke-width="3.2"/>
    <path d="M66 150 L64 82 C 64 60, 84 50, 110 50 C 136 50, 156 60, 156 82 L154 150 C 154 158, 148 162, 140 162 L80 162 C 72 162, 66 158, 66 150 Z" fill="${B}"/>
    <path d="M66 150 L64 82 C 64 60, 84 50, 110 50 C 136 50, 156 60, 156 82 L154 150 C 154 158, 148 162, 140 162 L80 162 C 72 162, 66 158, 66 150 Z" fill="url(#rt)"/>
    <path d="M72 86 C 82 63, 138 63, 148 86" stroke-width="1.8" stroke-dasharray="3 4"/>
    <path d="M148 86 L152 95" stroke="${G}" stroke-width="2.4"/><circle cx="153" cy="98.5" r="2.6" stroke="${G}" stroke-width="2"/>
    ${cara(110, 92, 0.95)}
    <path d="M78 120 L142 120 L144 150 C 144 155, 140 157, 136 157 L84 157 C 80 157, 76 155, 76 150 Z" fill="${B}"/>
    <path d="M78 120 L142 120 L144 150 C 144 155, 140 157, 136 157 L84 157 C 80 157, 76 155, 76 150 Z" fill="url(#rd)"/>
    <path d="M76 121 C 76 113, 144 113, 144 121 L144 130 C 122 137, 98 137, 76 130 Z" fill="${B}"/>
    <rect x="103" y="128" width="14" height="11" rx="2.5" fill="${B}" stroke="${G}" stroke-width="2.2"/>
    <path d="M110 131 V136" stroke="${G}" stroke-width="2"/>
    ${estrella(36, 48, 9)}
    ${estrella(190, 56, 7, W, 2)}
    ${estrella(188, 136, 6)}`,

  // 커피 · taza de café
  9: () => {
    const grano = (x, y, a) => `<g transform="rotate(${a} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="${B}" stroke="${G}" stroke-width="2.4"/><path d="M${x - 6.5} ${y} C ${x - 2} ${y - 3.5}, ${x + 2} ${y + 3.5}, ${x + 6.5} ${y}" stroke="${G}" stroke-width="2.2"/></g>`;
    return `
    <ellipse cx="108" cy="155" rx="58" ry="9" fill="${B}"/>
    <ellipse cx="108" cy="153" rx="34" ry="5" stroke-width="1.6" stroke-opacity="0.5"/>
    <path d="M147 86 C 176 82, 178 128, 143 128 M148 98 C 164 98, 164 116, 145 116"/>
    <path d="M64 70 L70 140 C 72 154, 144 154, 146 140 L152 70 Z" fill="${B}"/>
    <path d="M64 70 L70 140 C 72 154, 144 154, 146 140 L152 70 Z" fill="url(#rt)"/>
    <ellipse cx="108" cy="70" rx="44" ry="9" fill="${B}"/>
    <ellipse cx="108" cy="71" rx="38" ry="6" fill="url(#rd)" stroke="${G}" stroke-width="2"/>
    ${cara(108, 104)}
    <path d="M92 56 C 86 46, 98 40, 92 28 M108 52 C 102 40, 114 34, 108 20 M124 56 C 118 46, 130 40, 124 28" stroke-width="2.4" stroke-opacity="0.85"/>
    ${grano(36, 140, -30)}
    ${grano(188, 64, 25)}
    ${grano(186, 146, 60)}
    ${estrella(40, 46, 8)}`;
  },

  // 우산 · paraguas con lluvia
  10: () => {
    const xs = [34, 60, 86, 110, 134, 160, 186];
    const Y = 96, T = [110, 32];
    let paneles = '';
    for (let i = 0; i < xs.length - 1; i++) {
      const a = xs[i], b = xs[i + 1], m = (a + b) / 2;
      paneles += `<path d="M${T[0]} ${T[1]} Q${a} 40 ${a} ${Y} Q${m} 84 ${b} ${Y} Q${b} 40 ${T[0]} ${T[1]} Z" fill="url(#${i % 2 ? 'rt' : 'rd'})" stroke="none"/>`;
    }
    let borde = `M${T[0]} ${T[1]} Q${xs[0]} 40 ${xs[0]} ${Y}`;
    for (let i = 0; i < xs.length - 1; i++) borde += ` Q${(xs[i] + xs[i + 1]) / 2} 84 ${xs[i + 1]} ${Y}`;
    borde += ` Q${xs[6]} 40 ${T[0]} ${T[1]} Z`;
    const varillas = xs.slice(1, 6).map((x) => `M${T[0]} ${T[1]} Q${x} 40 ${x} ${Y}`).join(' ');
    const puntas = xs.map((x) => `<circle cx="${x}" cy="${Y}" r="2" fill="${W}" stroke="none"/>`).join('');
    return `
    ${suelo('M60 166 C 96 172, 140 172, 170 164')}
    <path d="M40 18 l-4 10 M72 10 l-4 10 M150 10 l-4 10 M186 18 l-4 10 M24 50 l-4 10 M200 54 l-4 10" stroke="${A}" stroke-width="2.2" stroke-opacity="0.8"/>
    ${paneles}
    <path d="${varillas}" stroke-width="2" stroke-opacity="0.8"/>
    <path d="${borde}"/>
    ${puntas}
    <path d="M110 32 V20" stroke-width="3"/><circle cx="110" cy="17.5" r="2.8" fill="${W}" stroke="none"/>
    <path d="M110 97 V146" stroke-width="3.2"/>
    <path d="M110 144 C 110 162, 90 162, 90 150" stroke="${G}" stroke-width="3.8"/>
    ${gota(30, 120, 1.2)}${gota(54, 142, 1)}${gota(166, 126, 1.1)}${gota(192, 146, 1.2)}${gota(146, 154, 0.9)}${gota(76, 160, 0.8)}`;
  },

  // 고양이 · gato (del prototipo)
  11: () => `
    <path d="M48 166 C 90 172, 150 172, 190 162" stroke-width="2.2" stroke-opacity="0.65"/>
    <path d="M144 152 C 176 154, 190 128, 178 106 C 172 96, 160 99, 163 109"/>
    <path d="M170 146 L176 152 M182 130 L189 132 M179 112 L186 109" stroke="${G}" stroke-width="2.6"/>
    <path d="M74 64 L70 28 L98 44 Z" fill="url(#rd)"/>
    <path d="M146 64 L150 28 L122 44 Z" fill="url(#rd)"/>
    <path d="M78 52 L76 36 L90 44" stroke="${P}" stroke-width="2.4"/>
    <path d="M142 52 L144 36 L130 44" stroke="${P}" stroke-width="2.4"/>
    <path d="M86 104 C 72 120, 68 146, 74 162 L146 162 C 152 146, 148 120, 134 104" fill="url(#rd)"/>
    <path d="M96 162 C 92 140, 98 124, 110 122 C 122 124, 128 140, 124 162 Z" fill="${B}" stroke="none"/>
    <path d="M96 162 C 92 140, 98 124, 110 122 C 122 124, 128 140, 124 162 Z" fill="url(#rt)" stroke="none"/>
    <path d="M76 130 L88 128 M75 142 L86 142 M144 130 L132 128 M145 142 L134 142" stroke="${G}" stroke-width="2.6"/>
    <path d="M90 162 C 90 151, 105 151, 105 162 M115 162 C 115 151, 130 151, 130 162" fill="${B}"/>
    <path d="M95 158 V162 M100 158 V162 M120 158 V162 M125 158 V162" stroke-width="1.6"/>
    <path d="M68 74 C 66 51, 85 40, 110 40 C 135 40, 154 51, 152 74 C 150 96, 133 108, 110 108 C 87 108, 70 96, 68 74 Z" fill="${B}"/>
    <path d="M102 47 L104 57 M110 45 V56 M118 47 L116 57" stroke="${G}" stroke-width="2.6"/>
    <circle cx="96" cy="74" r="7" fill="${W}" stroke="none"/>
    <circle cx="124" cy="74" r="7" fill="${W}" stroke="none"/>
    <circle cx="93.5" cy="71.5" r="2.4" fill="${B}" stroke="none"/>
    <circle cx="121.5" cy="71.5" r="2.4" fill="${B}" stroke="none"/>
    <circle cx="98.5" cy="77" r="1" fill="${B}" stroke="none"/>
    <circle cx="126.5" cy="77" r="1" fill="${B}" stroke="none"/>
    <path d="M106 85 L114 85 L110 90 Z" fill="${P}" stroke="${P}" stroke-width="1.6"/>
    <path d="M110 90 C 110 95, 104 97, 101 93 M110 90 C 110 95, 116 97, 119 93" stroke-width="2.4"/>
    <ellipse cx="85" cy="90" rx="6.5" ry="3.6" fill="${P}" stroke="none"/>
    <ellipse cx="135" cy="90" rx="6.5" ry="3.6" fill="${P}" stroke="none"/>
    <path d="M82 83 L60 79 M82 89 L58 91 M138 83 L160 79 M138 89 L162 91" stroke-width="2"/>
    <circle cx="40" cy="148" r="15" stroke="${G}" stroke-width="2.6"/>
    <path d="M27 141 C 35 147, 46 147, 54 139 M26 153 C 36 158, 48 158, 55 151 M33 135 C 39 145, 40 156, 35 162" stroke="${G}" stroke-width="2.2"/>
    <path d="M54 156 C 64 168, 78 168, 90 160" stroke="${G}" stroke-width="2"/>
    <path d="M182 52 C 182 46, 174 43, 173 49 C 172 55, 180 59, 182 64 C 184 59, 192 55, 191 49 C 190 43, 182 46, 182 52 Z" stroke="${G}" stroke-width="2.4"/>
    ${estrella(40, 52, 8, G, 2)}`,

  // 강아지 · perrito
  12: () => `
    <path d="M44 166 C 90 172, 150 172, 192 162" stroke-width="2.2" stroke-opacity="0.65"/>
    <path d="M140 148 C 166 150, 178 128, 170 108" />
    <path d="M178 102 L186 96 M184 116 L193 116 M180 128 L187 133" stroke="${G}" stroke-width="2.4"/>
    <path d="M86 104 C 72 120, 68 146, 74 162 L146 162 C 152 146, 148 120, 134 104" fill="${B}"/>
    <path d="M86 104 C 72 120, 68 146, 74 162 L146 162 C 152 146, 148 120, 134 104" fill="url(#rt)"/>
    <path d="M126 126 C 136 122, 144 132, 140 144 C 132 148, 122 142, 126 126 Z" fill="url(#rd)" stroke="none"/>
    <path d="M98 160 C 96 150, 97 140, 101 132 M122 160 C 124 150, 123 140, 119 132" stroke-width="2.2"/>
    <ellipse cx="96" cy="161" rx="10" ry="5.5" fill="${B}"/>
    <ellipse cx="124" cy="161" rx="10" ry="5.5" fill="${B}"/>
    <path d="M92 158 V163 M98 158 V163 M120 158 V163 M126 158 V163" stroke-width="1.6"/>
    <path d="M64 70 C 64 46, 84 34, 110 34 C 136 34, 156 46, 156 70 C 156 94, 136 106, 110 106 C 84 106, 64 94, 64 70 Z" fill="${B}"/>
    <path d="M84 104 C 98 114, 122 114, 136 104" stroke="${G}" stroke-width="4.5"/>
    <circle cx="110" cy="118.5" r="5.5" fill="url(#rd)" stroke="${G}" stroke-width="2"/>
    <path d="M74 44 C 58 38, 44 56, 46 80 C 47 92, 58 96, 66 88 C 68 74, 70 58, 78 48 Z" fill="${B}" stroke="none"/>
    <path d="M74 44 C 58 38, 44 56, 46 80 C 47 92, 58 96, 66 88 C 68 74, 70 58, 78 48 Z" fill="url(#rd)" stroke="${G}" stroke-width="2.6"/>
    <path d="M146 44 C 162 38, 176 56, 174 80 C 173 92, 162 96, 154 88 C 152 74, 150 58, 142 48 Z" fill="${B}" stroke="none"/>
    <path d="M146 44 C 162 38, 176 56, 174 80 C 173 92, 162 96, 154 88 C 152 74, 150 58, 142 48 Z" fill="url(#rd)" stroke="${G}" stroke-width="2.6"/>
    <ellipse cx="125" cy="66" rx="13" ry="11" fill="url(#rd)" stroke="none"/>
    <circle cx="96" cy="68" r="6.5" fill="${W}" stroke="none"/>
    <circle cx="125" cy="68" r="6.5" fill="${W}" stroke="none"/>
    <circle cx="93.8" cy="66" r="2.5" fill="${B}" stroke="none"/>
    <circle cx="122.8" cy="66" r="2.5" fill="${B}" stroke="none"/>
    <circle cx="98.4" cy="71" r="1" fill="${B}" stroke="none"/>
    <circle cx="127.4" cy="71" r="1" fill="${B}" stroke="none"/>
    <ellipse cx="110" cy="82" rx="6.5" ry="4.6" fill="${B}" stroke-width="2.4"/>
    <circle cx="108" cy="80.6" r="1.4" fill="${W}" stroke="none"/>
    <path d="M110 87 C 110 93, 104 95, 100 91 M110 87 C 110 93, 116 95, 120 91" stroke-width="2.4"/>
    <ellipse cx="82" cy="88" rx="6" ry="3.4" fill="${P}" stroke="none"/>
    <ellipse cx="138" cy="88" rx="6" ry="3.4" fill="${P}" stroke="none"/>
    <g transform="rotate(-18 38 142)"><path d="M28 138 L48 138 A 4.5 4.5 0 1 1 52 142 A 4.5 4.5 0 1 1 48 146 L28 146 A 4.5 4.5 0 1 1 24 142 A 4.5 4.5 0 1 1 28 138 Z" fill="url(#rd)" stroke="${G}" stroke-width="2.2"/></g>
    <path d="M186 46 C 186 40, 178 37, 177 43 C 176 49, 184 53, 186 58 C 188 53, 196 49, 195 43 C 194 37, 186 40, 186 46 Z" stroke="${G}" stroke-width="2.4"/>
    ${estrella(36, 54, 8)}`,
};

// ---------- Piezas comunes ----------
const ICONO_AUDIO = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 H7.5 L12.5 5.5 V18.5 L7.5 14.5 H4 Z"/><path d="M16 9.2 C 17.4 10.8, 17.4 13.2, 16 14.8"/><path d="M18.8 6.6 C 21.6 9.8, 21.6 14.2, 18.8 17.4"/></svg>`;

function filtroTiza(id, w, h, s1, s2, escala) {
  return `<filter id="${id}" filterUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="${s1}" result="ruido"/>
    <feDisplacementMap in="SourceGraphic" in2="ruido" scale="${escala}" xChannelSelector="R" yChannelSelector="G" result="temblor"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="${s2}" result="grano"/>
    <feColorMatrix in="grano" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3.4 -0.95" result="mascara"/>
    <feComposite in="temblor" in2="mascara" operator="in"/>
  </filter>`;
}

function defsGlobales() {
  let f = '';
  for (const d of DATOS) {
    f += filtroTiza(`tiza-${d.n}`, 220, 176, 3 + d.n * 2, 11 + d.n * 3, 2.6);
    f += filtroTiza(`tizab-${d.n}`, 190, 16, 8 + d.n, 2 + d.n * 2, 2.4);
  }
  return `<svg class="defs" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <pattern id="rb" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><rect width="1.7" height="5" fill="${W}" fill-opacity="0.6"/></pattern>
    <pattern id="rt" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-50)"><rect width="1.3" height="4" fill="${W}" fill-opacity="0.38"/></pattern>
    <pattern id="rd" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="1.8" height="4.5" fill="${G}" fill-opacity="0.75"/></pattern>
    <pattern id="ra" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="1.8" height="4.5" fill="${A}" fill-opacity="0.7"/></pattern>
    <pattern id="polvo" width="47" height="39" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="6" r="0.9" fill="${W}" fill-opacity="0.14"/><circle cx="19" cy="3" r="0.6" fill="${W}" fill-opacity="0.12"/>
      <circle cx="33" cy="11" r="1.1" fill="${W}" fill-opacity="0.09"/><circle cx="11" cy="22" r="0.7" fill="${W}" fill-opacity="0.13"/>
      <circle cx="27" cy="27" r="0.8" fill="${W}" fill-opacity="0.1"/><circle cx="42" cy="31" r="0.6" fill="${W}" fill-opacity="0.14"/>
      <circle cx="6" cy="35" r="1" fill="${W}" fill-opacity="0.08"/>
      <rect x="22" y="15" width="3" height="0.8" fill="${W}" fill-opacity="0.1" transform="rotate(-18 23.5 15.4)"/>
      <rect x="38" y="20" width="2.4" height="0.7" fill="${W}" fill-opacity="0.1" transform="rotate(24 39 20.3)"/>
    </pattern>
    <pattern id="motas" width="31" height="23" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="4" r="1.1" fill="${B}"/><circle cx="14" cy="9" r="0.8" fill="${B}"/><circle cx="25" cy="3" r="1.3" fill="${B}"/>
      <circle cx="8" cy="17" r="0.9" fill="${B}"/><circle cx="21" cy="15" r="1" fill="${B}"/><circle cx="29" cy="20" r="0.7" fill="${B}"/>
      <rect x="10" y="2" width="3.2" height="0.9" fill="${B}" transform="rotate(-24 11.6 2.45)"/>
      <rect x="17" y="20" width="2.8" height="0.8" fill="${B}" transform="rotate(18 18.4 20.4)"/>
    </pattern>
    ${f}
  </defs>
</svg>`;
}

const pad2 = (n) => String(n).padStart(2, '0');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- Anverso ----------
function anverso(d) {
  const ac = CAT[d.categoria];
  const flip = d.n % 2 ? 1 : -1;
  return `<div class="card front" data-n="${d.n}" data-cara="a">
  <div class="board">
    <svg class="polvo" width="100%" height="100%" viewBox="0 0 274 386" preserveAspectRatio="none" aria-hidden="true">
      <rect width="274" height="386" fill="url(#polvo)"/>
      <path d="M-10 ${d.n % 2 ? 318 : 300} C 60 ${d.n % 2 ? 300 : 322}, 150 ${d.n % 2 ? 334 : 292}, 290 ${d.n % 2 ? 304 : 318}" fill="none" stroke="${W}" stroke-opacity="0.045" stroke-width="38" stroke-linecap="round"/>
      <path d="M20 ${128 + d.n * 3} C 80 110, 150 140, 240 118" fill="none" stroke="${W}" stroke-opacity="0.03" stroke-width="30" stroke-linecap="round"/>
      <path d="M150 30 C 190 20, 230 44, 270 26" fill="none" stroke="${W}" stroke-opacity="0.035" stroke-width="22" stroke-linecap="round"/>
    </svg>
    <div class="head">
      <div class="titulo">
        <span>오늘의 단어</span>
        <svg width="80" height="7" viewBox="0 0 80 7" aria-hidden="true"><path d="M2 ${flip > 0 ? 4.2 : 3.4} C 22 ${flip > 0 ? 1.8 : 5.6}, 44 ${flip > 0 ? 5.8 : 1.8}, 78 ${flip > 0 ? 3 : 4}" fill="none" stroke="${G}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="18 3 26 4 60"/></svg>
      </div>
      <div class="der">
        <span class="num">${pad2(d.n)}/12</span>
        <div class="audio" style="background:${ac}">${ICONO_AUDIO}</div>
      </div>
    </div>
    <svg class="ilus" width="262" height="210" viewBox="0 0 220 176" aria-label="${esc(d.es)}">
      <g filter="url(#tiza-${d.n})"><g fill="none" stroke="${W}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${DIBUJOS[d.n]()}</g></g>
    </svg>
    <div class="hangul"><span lang="ko">${d.kr}</span><svg width="100%" height="100%" aria-hidden="true"><rect width="100%" height="100%" fill="url(#motas)" opacity="0.6"/></svg></div>
    <svg class="raya" width="${110 + d.kr.length * 30}" height="16" viewBox="0 0 ${110 + d.kr.length * 30} 16" aria-hidden="true">
      <path d="M8 ${flip > 0 ? 9 : 8} C 36 ${flip > 0 ? 3 : 13}, 60 ${flip > 0 ? 13 : 3}, ${(110 + d.kr.length * 30) / 2} 8 C ${(110 + d.kr.length * 30) * 0.7} 4, ${(110 + d.kr.length * 30) * 0.85} 7, ${102 + d.kr.length * 30} 9" fill="none" stroke="${G}" stroke-width="4" stroke-linecap="round" filter="url(#tizab-${d.n})"/>
    </svg>
  </div>
  <div class="tray">
    <div class="ledge"></div>
    <div class="borrador"><div></div><div></div></div>
    <div class="polvito"></div>
    <div class="tiza" style="left:178px;width:38px;background:${W}"></div>
    <div class="tiza" style="left:224px;width:30px;background:${ac}"></div>
    <div class="tiza" style="left:262px;width:22px;background:${G}"></div>
  </div>
</div>`;
}

// ---------- Reverso ----------
function reverso(d, qr) {
  const ac = CAT[d.categoria];
  const cajas = [...d.kr].map((s, i, arr) => `<span style="border-right:${i < arr.length - 1 ? `1.5px solid ${ac}` : 'none'}">${s}</span>`).join('');
  const rot = d.n % 2 ? -12 : 9;
  const lineas = Array.from({ length: 12 }, (_, k) => `M0 ${94.5 + 32 * k} H336`).join(' ');
  return `<div class="card back" data-n="${d.n}" data-cara="r">
  <svg class="renglones" width="336" height="456" viewBox="0 0 336 456" aria-hidden="true">
    <path d="M0 58.5 H336" stroke="#B7C4EC" stroke-width="1"/>
    <path d="M0 62 H336" stroke="#B7C4EC" stroke-width="2"/>
    <path d="${lineas}" stroke="#CBD5EF" stroke-width="1"/>
  </svg>
  <div class="margen" style="background:${ac}"></div>
  <div class="hoyo" style="top:100px"></div><div class="hoyo" style="top:220px"></div><div class="hoyo" style="top:340px"></div>
  <div class="b-head">
    <span class="cinta">Básico 1 · Semana ${d.semana}</span>
    <span class="cat" style="color:${ac}"><i style="background:${ac}"></i>${esc(d.categoria)}</span>
  </div>
  <div class="b-hangul">
    <div class="cajas" style="border-color:${ac}">${cajas}</div>
    <span class="rom">${esc(d.rom)}</span>
  </div>
  <div class="b-sig"><span class="sigw"><span class="hl" style="transform:rotate(${d.n % 2 ? -1.5 : 1.2}deg)"></span><span class="sig">${esc(d.es)}</span></span></div>
  <div class="b-label"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B6660" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20 L5 15 L16 4 L20 8 L9 19 Z"/><path d="M13.5 6.5 L17.5 10.5"/></svg><span>예문 · ejemplo</span></div>
  <div class="b-ej"><span class="ej" lang="ko">${esc(d.ejemplo_kr)}</span></div>
  <div class="b-tr"><svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="${ac}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 6.5 C 6 5.5, 10 6.5, 15 6"/><path d="M11 2 L15.5 6 L11 10"/></svg><span>${esc(d.ejemplo_es)}</span></div>
  <div class="sello" style="border-color:${ac};color:${ac};transform:rotate(${rot}deg)">
    <div class="sello-in" style="border-color:${ac}"></div>
    <svg width="24" height="11" viewBox="0 0 26 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 2.5 V4.5 M20 2.5 V4.5"/><path d="M6 7.5 C 9 11, 17 11, 20 7.5"/></svg>
    <span class="s1">참</span><span class="s2">잘했어요</span>
    <svg class="desgaste" width="78" height="78" viewBox="0 0 86 86" aria-hidden="true"><g fill="#FBF6E8"><circle cx="14" cy="30" r="1.6"/><circle cx="71" cy="22" r="1.2"/><circle cx="62" cy="70" r="1.8"/><circle cx="22" cy="64" r="1.1"/><circle cx="44" cy="8" r="1.3"/><circle cx="78" cy="48" r="1"/><circle cx="36" cy="50" r="0.9"/><circle cx="54" cy="36" r="0.8"/></g></svg>
  </div>
  <div class="qr">${qr}<div class="qr-cap"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${NAVY}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5 H7.5 L12.5 5.5 V18.5 L7.5 14.5 H4 Z"/><path d="M16 9.2 C 17.4 10.8, 17.4 13.2, 16 14.8"/><path d="M18.8 6.6 C 21.6 9.8, 21.6 14.2, 18.8 17.4"/></svg><span>Escúchala</span></div></div>
  <span class="marca">Academia Seúl</span>
</div>`;
}

// ---------- Página ----------
const CARD_W = 336, CARD_H = 456, GAP = 24, PAGE_W = 816, PAGE_H = 1056;
const X0 = (PAGE_W - (2 * CARD_W + GAP)) / 2, Y0 = (PAGE_H - (2 * CARD_H + GAP)) / 2;
function marcas() {
  let d = '';
  const L = 8, o = 3;
  for (let c = 0; c < 2; c++) for (let r = 0; r < 2; r++) {
    const x0 = X0 + c * (CARD_W + GAP), y0 = Y0 + r * (CARD_H + GAP), x1 = x0 + CARD_W, y1 = y0 + CARD_H;
    for (const [x, sx] of [[x0, -1], [x1, 1]]) for (const [y, sy] of [[y0, -1], [y1, 1]]) {
      d += `M${x + sx * o} ${y} H${x + sx * (o + L)} M${x} ${y + sy * o} V${y + sy * (o + L)} `;
    }
  }
  return `<svg class="marcas" width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}" aria-hidden="true"><path d="${d}" stroke="#9A9A9A" stroke-width="0.6" fill="none"/></svg>`;
}
function pagina(caras, num, titulo) {
  const pos = caras.map((html, i) => {
    const c = i % 2, r = Math.floor(i / 2);
    return `<div class="slot" style="left:${X0 + c * (CARD_W + GAP)}px;top:${Y0 + r * (CARD_H + GAP)}px">${html}</div>`;
  }).join('\n');
  return `<section class="page" data-pagina="${num}" aria-label="${titulo}">${marcas()}${pos}</section>`;
}

const CSS = `
@page { size: letter; margin: 0; }
* { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
html, body { margin: 0; padding: 0; }
body { background: #FFFFFF; font-family: 'Gowun Dodum', sans-serif; color: #2E2B3A; }
@media screen {
  body { background: #D9D4C7; padding: 24px 0; }
  .page { margin: 0 auto 24px; box-shadow: 0 6px 24px rgba(40,30,10,.18); }
}
.page { position: relative; width: 816px; height: 1056px; overflow: hidden; background: #FFFFFF; page-break-after: always; break-after: page; }
.page:last-of-type { page-break-after: auto; break-after: auto; }
.marcas { position: absolute; left: 0; top: 0; }
.slot { position: absolute; width: 336px; height: 456px; }
.card { position: relative; width: 336px; height: 456px; box-sizing: border-box; overflow: hidden; }

/* ---------- Anverso: pizarra con marco de madera ---------- */
.front { background: #B88654; padding: 12px 12px 0 12px; display: flex; flex-direction: column;
  box-shadow: inset 0 0 0 1px #8C5D33, inset 0 3px 0 rgba(255,232,196,.28), inset 0 -2px 0 rgba(110,70,35,.25); }
.board { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between;
  padding: 10px 16px 8px; border-radius: 6px; background: #1F3B33; overflow: hidden;
  box-shadow: inset 0 0 0 2px #15302A, inset 0 8px 18px rgba(0,0,0,.32); }
.board .polvo { position: absolute; left: 0; top: 0; pointer-events: none; }
.head { position: relative; align-self: stretch; height: 46px; display: flex; align-items: center; justify-content: space-between; }
.titulo { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding-left: 2px; }
.titulo span { font-family: 'Gaegu', cursive; font-weight: 700; font-size: 18px; line-height: 1; letter-spacing: .5px; color: #F3F0E4; text-shadow: 0 0 1px rgba(243,240,228,.8); }
.der { display: flex; align-items: center; gap: 12px; }
.num { font-family: 'Gaegu', cursive; font-weight: 700; font-size: 19px; line-height: 1; letter-spacing: 1px; color: #F3F0E4; opacity: .9; text-shadow: 0 0 1px rgba(243,240,228,.7); }
.audio { position: relative; width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: rotate(-6deg);
  box-shadow: 0 0 0 2px rgba(243,240,228,.22), 0 4px 0 rgba(0,0,0,.3), 0 9px 14px rgba(0,0,0,.28), inset 0 -4px 0 rgba(0,0,0,.2), inset 0 3px 0 rgba(255,255,255,.25); }
.ilus { position: relative; flex: none; }
.hangul { position: relative; display: inline-block; padding: 0 4px; }
.hangul span { position: relative; display: block; font-family: 'Gaegu', cursive; font-weight: 700; font-size: 84px; line-height: 1; letter-spacing: 3px; color: #F5F2E8;
  text-shadow: 0 0 1px rgba(245,242,232,.9), 0 0 8px rgba(245,242,232,.22); }
.hangul svg { position: absolute; left: 0; top: 0; pointer-events: none; }
.raya { position: relative; flex: none; margin-top: -6px; }
.tray { position: relative; height: 40px; flex: none; }
.ledge { position: absolute; left: -12px; right: -12px; top: 12px; height: 13px; background: #9A683A; box-shadow: inset 0 2px 0 rgba(255,236,205,.25), 0 3px 0 #77502C; }
.borrador { position: absolute; left: 22px; bottom: 28px; width: 64px; height: 20px; display: flex; flex-direction: column; border-radius: 4px; overflow: hidden; transform: rotate(-3deg); box-shadow: 0 2px 0 rgba(0,0,0,.25); }
.borrador div:first-child { height: 13px; background: #003478; box-shadow: inset 0 2px 0 rgba(255,255,255,.18); }
.borrador div:last-child { flex: 1; background: #D9D3C4; }
.polvito { position: absolute; left: 158px; bottom: 26px; width: 14px; height: 3px; border-radius: 2px; background: rgba(243,240,228,.55); }
.tiza { position: absolute; bottom: 28px; height: 8px; border-radius: 4px; box-shadow: 0 2px 0 rgba(0,0,0,.22), inset 0 2px 0 rgba(255,255,255,.25); }

/* ---------- Reverso: hoja de cuaderno ---------- */
.back { background: #FBF6E8; box-shadow: inset 0 0 0 1px #E2D5B6; }
.renglones { position: absolute; left: 0; top: 0; }
.margen { position: absolute; left: 46px; top: 0; bottom: 0; width: 2px; opacity: .75; }
.hoyo { position: absolute; left: 15px; width: 15px; height: 15px; border-radius: 50%; background: #E9E2D0; box-shadow: inset 0 2px 2px rgba(80,60,30,.28); }
.b-head { position: absolute; left: 62px; right: 18px; top: 0; height: 58px; display: flex; align-items: center; justify-content: space-between; }
.cinta { display: inline-block; margin-left: -24px; padding: 4px 11px; background: #F2D48A; color: #003478; font-size: 12px; letter-spacing: .2px; transform: rotate(-2deg);
  clip-path: polygon(0 10%, 3% 0, 97% 6%, 100% 0, 98% 50%, 100% 100%, 3% 94%, 0 100%, 2% 50%); }
.cat { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; letter-spacing: .3px; }
.cat i { display: inline-block; width: 8px; height: 8px; border-radius: 50%; }
.b-hangul { position: absolute; left: 62px; right: 18px; top: 66px; height: 56px; display: flex; align-items: center; gap: 12px; }
.cajas { display: flex; border: 1.5px solid; background: #FFFCF3; }
.cajas span { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; font-family: 'Gaegu', cursive; font-weight: 700; font-size: 32px; line-height: 1; color: #2E2B3A; }
.rom { font-size: 13px; letter-spacing: .5px; color: #6B6660; }
.b-sig { position: absolute; left: 60px; right: 18px; top: 126px; height: 96px; display: flex; align-items: flex-end; }
.sigw { position: relative; display: inline-block; margin-bottom: 1px; max-width: 100%; }
.sigw.dos .hl { display: none; }
.mk { background: linear-gradient(to bottom, transparent 50%, rgba(232,184,75,.42) 50%, rgba(232,184,75,.42) 84%, transparent 84%); border-radius: 4px 10px 6px 12px; padding: 0 6px; margin: 0 -6px; }
.hl { position: absolute; left: -6px; right: -8px; bottom: 15px; height: 22px; background: #E8B84B; opacity: .42; border-radius: 4px 10px 6px 12px; }
.sig { position: relative; display: block; font-family: 'Mali', cursive; font-weight: 700; font-size: 60px; line-height: 1; color: #003478; white-space: nowrap; }
.sig.dos { line-height: .95; }
.b-label { position: absolute; left: 62px; right: 18px; top: 222px; height: 32px; box-sizing: border-box; padding-bottom: 6px; display: flex; align-items: flex-end; gap: 6px; }
.b-label span { font-size: 11px; line-height: 1; letter-spacing: .6px; color: #6B6660; }
.b-ej { position: absolute; left: 62px; right: 18px; top: 254px; height: 32px; display: flex; align-items: flex-end; }
.ej { font-family: 'Gaegu', cursive; font-weight: 700; font-size: 23px; line-height: 1; color: #2E2B3A; margin-bottom: -3px; white-space: nowrap; }
.b-tr { position: absolute; left: 62px; right: 18px; top: 291px; display: flex; align-items: flex-start; gap: 6px; }
.b-tr svg { flex: none; margin-top: 12px; }
.b-tr span { font-family: 'Mali', cursive; font-weight: 500; font-size: 18px; line-height: 32px; color: #4A4560; }
.sello { position: absolute; left: 152px; top: 352px; width: 78px; height: 78px; box-sizing: border-box; border-radius: 50%; border: 3px solid; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; opacity: .95; mix-blend-mode: multiply; }
.sello-in { position: absolute; left: 3px; top: 3px; right: 3px; bottom: 3px; border-radius: 50%; border: 1.5px solid; }
.sello .s1 { font-family: 'Gaegu', cursive; font-weight: 700; font-size: 22px; line-height: 1; margin-top: 2px; }
.sello .s2 { font-family: 'Gaegu', cursive; font-weight: 700; font-size: 14px; line-height: 1; letter-spacing: .5px; }
.sello .desgaste { position: absolute; left: -3px; top: -3px; pointer-events: none; }
.qr { position: absolute; right: 18px; top: 354px; width: 72px; display: flex; flex-direction: column; align-items: center; gap: 3px; }
.qr > svg { display: block; width: 72px; height: 72px; box-shadow: 0 0 0 1px #E2D5B6; }
.qr-cap { display: flex; align-items: center; gap: 3px; }
.qr-cap span { font-family: 'Mali', cursive; font-weight: 700; font-size: 12.5px; line-height: 1; color: #003478; }
.marca { position: absolute; left: 62px; bottom: 14px; font-size: 10.5px; letter-spacing: .4px; color: #6B6660; }
`;

const AJUSTE = `
function ajustar() {
  document.querySelectorAll('.back').forEach(function (card) {
    // significado: una línea grande; si no cabe, dos líneas
    var caja = card.querySelector('.b-sig');
    var sig = card.querySelector('.sig');
    var max = caja.clientWidth - 10;
    if (sig.dataset.txt) sig.textContent = sig.dataset.txt;
    var fs = 60; sig.classList.remove('dos'); sig.parentNode.classList.remove('dos'); sig.style.fontSize = fs + 'px';
    while (sig.scrollWidth > max && fs > 46) { fs -= 2; sig.style.fontSize = fs + 'px'; }
    if (sig.scrollWidth > max) {
      // dos líneas: se corta después de la coma ("sombrero,⏎gorro")
      if (!sig.dataset.txt) sig.dataset.txt = sig.textContent;
      sig.innerHTML = sig.dataset.txt.split(', ').map(function (t, i, a) { return '<span class="mk">' + t + (i < a.length - 1 ? ',' : '') + '</span>'; }).join('<br>');
      sig.parentNode.classList.add('dos');
      sig.classList.add('dos'); fs = 46; sig.style.fontSize = fs + 'px';
      while ((sig.scrollWidth > max || sig.offsetHeight > 96) && fs > 30) { fs -= 2; sig.style.fontSize = fs + 'px'; }
    }
    // ejemplo en coreano: una sola línea
    var ej = card.querySelector('.ej');
    var maxEj = card.querySelector('.b-ej').clientWidth;
    var f2 = 23; ej.style.fontSize = f2 + 'px';
    while (ej.scrollWidth > maxEj && f2 > 16) { f2 -= 1; ej.style.fontSize = f2 + 'px'; }
  });
  document.body.setAttribute('data-listo', '1');
}
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { setTimeout(ajustar, 50); }); } else { window.addEventListener('load', ajustar); }
window.ajustar = ajustar;
`;

async function construirHTML() {
  const qrs = {};
  for (const d of DATOS) {
    let s = await QR.toString(d.audio, { type: 'svg', margin: 4, errorCorrectionLevel: 'M', color: { dark: NAVY, light: '#FFFFFF' } });
    s = s.replace('<svg ', `<svg width="72" height="72" role="img" aria-label="QR: audio de ${d.kr}" `).trim();
    qrs[d.n] = s;
  }
  const paginas = [];
  for (let g = 0; g < 3; g++) {
    const grupo = DATOS.slice(g * 4, g * 4 + 4);
    paginas.push(pagina(grupo.map(anverso), g * 2 + 1, `Anversos ${g * 4 + 1}–${g * 4 + 4}`));
    // Reversos: columnas invertidas (impresión a doble cara, volteo por borde largo)
    const rev = [grupo[1], grupo[0], grupo[3], grupo[2]].map((d) => reverso(d, qrs[d.n]));
    paginas.push(pagina(rev, g * 2 + 2, `Reversos ${g * 4 + 1}–${g * 4 + 4}`));
  }
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flashcards Básico 1 · Pizarra</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Gowun+Dodum&family=Mali:wght@400;500;700&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
${defsGlobales()}
${paginas.join('\n')}
<script>${AJUSTE}</script>
</body>
</html>
`;
  fs.writeFileSync(HTML, html, 'utf8');
}

async function renderizar() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-lcd-text'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1100, deviceScaleFactor: 1 });
    await page.goto('file:///' + HTML.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForSelector('body[data-listo="1"]', { timeout: 30000 });
    await page.evaluate(() => { window.ajustar(); return document.fonts.ready; });
    const informe = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.back').forEach((c) => {
        const n = c.getAttribute('data-n');
        const sig = c.querySelector('.sig'), ej = c.querySelector('.ej'), tr = c.querySelector('.b-tr span');
        out.push(`${n}: sig ${sig.style.fontSize}${sig.classList.contains('dos') ? ' (2 líneas)' : ''} · ej ${ej.style.fontSize} · trad ${Math.round(tr.offsetHeight / 32)} línea(s)`);
      });
      return out;
    });
    console.log(informe.join('\n'));
    await page.emulateMediaType('print');
    await page.pdf({ path: PDF, format: 'letter', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await page.emulateMediaType('screen');

    // Hoja de contacto: anversos y reversos por filas (1–6 / 1–6 / 7–12 / 7–12)
    await page.evaluate(() => {
      const caras = {};
      document.querySelectorAll('.card').forEach((c) => { caras[c.dataset.cara + c.dataset.n] = c; });
      const hoja = document.createElement('div');
      hoja.id = 'hoja';
      hoja.innerHTML = '<h1>Flashcards Básico 1 · E · Pizarra escolar</h1>';
      const filas = [['a', 1, 'Anversos 1–6'], ['r', 1, 'Reversos 1–6'], ['a', 7, 'Anversos 7–12'], ['r', 7, 'Reversos 7–12']];
      for (const [t, ini, nombre] of filas) {
        const et = document.createElement('div'); et.className = 'et'; et.textContent = nombre; hoja.appendChild(et);
        const fila = document.createElement('div'); fila.className = 'fila';
        for (let n = ini; n < ini + 6; n++) {
          const m = document.createElement('div'); m.className = 'mini';
          m.appendChild(caras[t + n]); fila.appendChild(m);
        }
        hoja.appendChild(fila);
      }
      document.querySelectorAll('.page').forEach((p) => p.remove());
      const st = document.createElement('style');
      st.textContent = `body{background:#ECE7DA!important;padding:0!important}
        #hoja{padding:22px 28px 26px;width:max-content}
        #hoja h1{margin:0 0 6px;font-family:'Gowun Dodum',sans-serif;font-size:20px;color:#003478;font-weight:400}
        .et{font-family:'Gowun Dodum',sans-serif;font-size:13px;color:#6B6660;margin:12px 0 6px}
        .fila{display:flex;gap:14px}
        .mini{width:168px;height:228px;position:relative;overflow:hidden;box-shadow:0 2px 8px rgba(40,30,10,.18)}
        .mini .card{position:absolute;left:0;top:0;transform:scale(.5);transform-origin:0 0}`;
      document.head.appendChild(st);
      document.body.prepend(hoja);
    });
    await page.setViewport({ width: 1200, height: 1100, deviceScaleFactor: 1.5 });
    await new Promise((r) => setTimeout(r, 300));
    const el = await page.$('#hoja');
    await el.screenshot({ path: PNG });
  } finally {
    await browser.close();
  }
}

(async () => {
  await construirHTML();
  await renderizar();
  console.log('Listo:\n ' + HTML + '\n ' + PDF + '\n ' + PNG);
})().catch((e) => { console.error(e); process.exit(1); });
