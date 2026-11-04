/* Genera con la voz del sitio los clips que el juego usa y todavía no existen en public/audio/kr/.
   Voz ko-KR-SunHiNeural · rate -8 % · MP3 24 kHz 48 kbps mono, igual que los otros clips.
   Nunca sobrescribe. El texto va con su puntuación (da mejor entonación); el archivo se llama
   como el texto sin la puntuación final, que es como lo busca el juego.
   Uso: MSEDGE_TTS=<ruta a node_modules/msedge-tts> node Juego_RPG/voz/generar_clips_sunhi.js [--ver] */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const AUDIO = path.join(__dirname, '..', '..', 'public', 'audio', 'kr');
const hex = (t) => Buffer.from(t, 'utf8').toString('hex');
const json = execFileSync(process.execPath, [path.join(__dirname, 'textos_aventura.js'), '--json'], { encoding: 'utf8', maxBuffer: 1 << 24 });
const faltan = JSON.parse(json).filter((x) => !x.sunhi);
console.log(`Sin clip: ${faltan.length}`);
console.log(faltan.map((x) => x.original).join(' · '));
if (process.argv.includes('--ver') || !faltan.length) process.exit(0);

const { MsEdgeTTS, OUTPUT_FORMAT } = require(process.env.MSEDGE_TTS || 'msedge-tts');
const TMP = path.join(require('os').tmpdir(), 'aventura_clips');
fs.mkdirSync(TMP, { recursive: true });
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));
let tts;
async function conectar() {
  try { if (tts && tts.close) tts.close(); } catch (e) {}
  tts = new MsEdgeTTS();
  await tts.setMetadata('ko-KR-SunHiNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
}
async function sintetizar(texto, archivo) {
  let r = tts.toStream(texto, { rate: '-8%' });
  if (r && typeof r.then === 'function') r = await r;
  const flujo = r && r.audioStream ? r.audioStream : r;
  await new Promise((ok, mal) => {
    const ws = fs.createWriteStream(archivo);
    const reloj = setTimeout(() => mal(new Error('tiempo agotado')), 25000);
    flujo.pipe(ws);
    ws.on('finish', () => { clearTimeout(reloj); ok(); });
    flujo.on('error', (e) => { clearTimeout(reloj); mal(e); });
  });
}
const esMp3 = (f) => { const b = fs.readFileSync(f).subarray(0, 3); return b[0] === 0xff || b.toString('latin1') === 'ID3'; };

(async () => {
  await conectar();
  const errores = [];
  for (const it of faltan) {
    const destino = path.join(AUDIO, hex(it.texto) + '.mp3'), tmp = path.join(TMP, hex(it.texto) + '.mp3');
    if (fs.existsSync(destino)) continue;
    let listo = false, ultimo = '';
    for (let n = 0; n < 5 && !listo; n++) {
      try {
        try { fs.unlinkSync(tmp); } catch (e) {}
        await sintetizar(it.original, tmp);
        if (fs.statSync(tmp).size <= 1024) throw new Error('muy chico');
        if (!esMp3(tmp)) throw new Error('no parece mp3');
        listo = true;
      } catch (e) { ultimo = e.message; await dormir(1500 * (n + 1)); try { await conectar(); } catch (_) {} }
    }
    if (listo) { fs.copyFileSync(tmp, destino, fs.constants.COPYFILE_EXCL); console.log(`  ✓ ${it.texto} (${fs.statSync(destino).size} bytes)`); }
    else errores.push(`${it.texto}: ${ultimo}`);
    await dormir(350);
  }
  if (errores.length) { console.log('ERRORES:\n' + errores.join('\n')); process.exit(1); }
  console.log('Listo.');
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
