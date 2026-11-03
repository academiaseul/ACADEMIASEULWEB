/* Genera public/aventura/preguntas.json desde los ítems revisados de Tigre 100
   (Juego_100/borrador/t00-10.json, niveles 1–10). El juego no inventa coreano:
   solo toma la respuesta, los distractores, el audio y la explicación de cada ítem.

   Uso: node Juego_RPG/construir_preguntas.js
*/
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const ORIGEN = path.join(RAIZ, 'Juego_100', 'borrador', 't00-10.json');
const DESTINO = path.join(RAIZ, 'public', 'aventura', 'preguntas.json');

const niveles = JSON.parse(fs.readFileSync(ORIGEN, 'utf8'));
const SIRVEN = new Set(['reconoce', 'pares', 'escucha-imagen', 'construye', 'arma-tablero', 'dos-formas']);
const soloHangul = (s) => /^[가-힣ㄱ-ㅣ\[\] ]+$/.test(s);

// «pepino (오이)» → «pepino» · «너 (ㄴ + ㅓ)» → «너» · «[옫]» queda igual
const etiqueta = (s) => s.replace(/\s*\([^)]*\)\s*$/, '').trim();

function instruccion(it) {
  const e = it.enunciado;
  const significa = (e.match(/\(significa '([^']+)'\)/) || [])[1] || (e.match(/la palabra '([^']+)'/) || [])[1];
  if (it.tipo === 'construye' || it.tipo === 'arma-tablero') {
    const pal = it.tipo === 'arma-tablero' && Array.from(etiqueta(it.respuesta)).length > 1 ? 'palabra' : 'sílaba';
    return `Escucha 🔊 y toca la ${pal} bien armada${significa ? ` (significa «${significa}»)` : ''}.`;
  }
  if (it.tipo === 'escucha-imagen') return 'Escucha 🔊 y toca lo que significa.';
  let t = e.replace(/\s*Opciones( \([^)]*\))?:.*$/s, '').trim();
  t = t
    .replace(/^ADIVINA PRIMERO \([^)]*\)\.\s*/, '')
    .replace(/^Aviso al empezar: '[^']*'\s*/, '')
    .replace(/^TRANSFERENCIA(?: \([^)]*\))?\.\s*/, 'Palabra nueva. ')
    .replace(/^DICHO DEL BARRIO \([^)]*\)\.\s*/, 'Dicho del barrio. ')
    .replace(/^OÍDO [^.]*\.\s*/, '')
    .replace(/^Dibujo de un perro \([^)]*\)\.\s*/, '')
    .replace(/ \(2 voces\)/, '')
    .replace(/ \(🔊 en cada opción\)/, '')
    .replace(/\(el audio suena al responder\)/, '')
    .replace(/ y toca el dibujo/, ' y toca lo que significa')
    .replace(/Lee\s+:/, 'Lee:')
    .replace(/^'([^']+)'\s*/, '$1 ')
    .replace(/'([^']+)'/g, '«$1»')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return t;
}

const out = [];
const saltadas = [];
for (const nivel of Object.values(niveles)) {
  if (nivel.n < 1 || nivel.n > 10) continue;
  for (const it of nivel.items) {
    if (!SIRVEN.has(it.tipo)) { saltadas.push(`${it.id} (${it.tipo})`); continue; }
    const armar = it.tipo === 'construye' || it.tipo === 'arma-tablero';
    const respuesta = etiqueta(it.respuesta);
    let distractores = it.distractores.map(etiqueta);
    // En «arma» solo valen distractores que son bloques de Hangul (no «가 y la ㅇ suelta al lado»)
    if (armar) distractores = distractores.filter(soloHangul);
    distractores = distractores.filter((d) => d && d !== respuesta);
    if (!distractores.length) { saltadas.push(`${it.id} (sin distractores usables)`); continue; }
    const e = it.enunciado;
    // Suena al aparecer solo si el ítem es de oído; si es de lectura, suena al responder
    const suenaAntes = /Escucha 🔊|Toca 🔊|^Suena \[/.test(e) && !/sin audio/.test(e);
    out.push({
      id: it.id,
      nivel: nivel.n,
      tipo: it.tipo,
      instruccion: instruccion(it),
      audio: it.audio_texto || null,
      suenaAntes,
      respuesta,
      distractores,
      explicacion: it.explicacion_error,
      rom: (it.romanizacion || '').replace(/^pista:\s*/, ''),
      pron: it.pronunciacion || '',
    });
  }
}

fs.writeFileSync(DESTINO, JSON.stringify({ origen: 'Juego_100/borrador/t00-10.json', generado: new Date().toISOString().slice(0, 10), preguntas: out }, null, 1) + '\n');
const porNivel = {};
for (const q of out) porNivel[q.nivel] = (porNivel[q.nivel] || 0) + 1;
console.log(`${out.length} preguntas → ${path.relative(RAIZ, DESTINO)}`);
console.log('Por nivel:', porNivel);
console.log('Saltadas:', saltadas.join(', '));
