// Hangul que salta por palabra (어절), nunca a mitad de palabra:
//  1. los runs con hangul se marcan como coreano (lang="ko-KR"): sin esto PowerPoint parte 친/구예요
//  2. eaLnBrk="0" en todos los párrafos (no partir palabras de Asia oriental)
const fs = require("fs"); const JSZip = require("jszip");
const HANGUL = /[\uAC00-\uD7AF\u3130-\u318F\u1100-\u11FF]/;
async function sinCorteCoreano(file) {
  const z = await JSZip.loadAsync(fs.readFileSync(file)); let n = 0;
  for (const name of Object.keys(z.files)) {
    if (!/^ppt\/.*\.xml$/.test(name)) continue;
    const x = await z.file(name).async("string");
    let y = x.replace(/eaLnBrk="1"/g, 'eaLnBrk="0"');
    if (/^ppt\/slides\/slide\d+\.xml$/.test(name)) {
      y = y.replace(/<a:pPr(?![^>]*eaLnBrk)([^>]*?)(\/?)>/g, '<a:pPr$1 eaLnBrk="0"$2>').replace(/<a:p>(?!<a:pPr)/g, '<a:p><a:pPr eaLnBrk="0"/>');
      y = y.replace(/<a:r><a:rPr lang="en-US"([^>]*)>((?:(?!<\/a:r>).)*?<a:t>([^<]*)<\/a:t><\/a:r>)/g, (m, a, rest, t) => (HANGUL.test(t) ? `<a:r><a:rPr lang="ko-KR" altLang="en-US"${a}>${rest}` : m));
    }
    if (y !== x) { z.file(name, y); n++; }
  }
  fs.writeFileSync(file, await z.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  return n;
}
module.exports = { sinCorteCoreano };
if (require.main === module) (async () => { for (const f of process.argv.slice(2)) console.log(f.split(/[\/]/).pop(), await sinCorteCoreano(f)); })();
