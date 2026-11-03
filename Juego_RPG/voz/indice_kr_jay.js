/* Arma public/audio/kr-jay/indice.json con los textos que ya tienen clip de Jay.
   Los clips se llaman <hex del UTF-8 del texto>.mp3, igual que public/audio/kr/.
   El juego (public/aventura) solo pide un clip de Jay si su texto está en este índice.
   Uso: node Juego_RPG/voz/indice_kr_jay.js */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', '..', 'public', 'audio', 'kr-jay');
if (!fs.existsSync(DIR)) { console.log('No existe public/audio/kr-jay/: todavía no hay clips de Jay.'); process.exit(0); }
const textos = fs.readdirSync(DIR).filter((f) => /^[0-9a-f]+\.mp3$/.test(f)).map((f) => Buffer.from(f.slice(0, -4), 'hex').toString('utf8')).sort();
fs.writeFileSync(path.join(DIR, 'indice.json'), JSON.stringify(textos) + '\n');
console.log(`${textos.length} clips de Jay → public/audio/kr-jay/indice.json`);
