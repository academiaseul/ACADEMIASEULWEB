#!/usr/bin/env node
/*
 * limpiar_lista_educadores.js · Academia Seúl
 * Limpia una lista de contactos exportada (CSV) y la deja lista para importar a Brevo, en lotes.
 * No importa nada, no manda correos y no se conecta a ningún servidor de correo: la importación la hace Jay a mano.
 *
 * Uso (desde la carpeta del repo; solo usa módulos de Node, no necesita node_modules):
 *   node Brevo/Envios_desde_29sep/herramientas/limpiar_lista_educadores.js
 *   node Brevo/Envios_desde_29sep/herramientas/limpiar_lista_educadores.js --in "C:/ruta/lista.csv" --out "C:/ruta/carpeta"
 *
 * Opciones:
 *   --in <csv>        lista original (por defecto C:/Users/Chingu/Downloads/MailChimpChile (1).csv).
 *                     Columnas que usa: EMAIL, Primer Nombre, Apellido, Establecimiento Educacional, Comuna, Region.
 *                     Teléfono y país se ignoran a propósito (minimización de datos).
 *   --out <carpeta>   dónde escribir (por defecto C:/Users/Chingu/Downloads/Brevo_Educadores). Nunca dentro del repo.
 *   --excluir <csv>   correos que ya están en Brevo (columna EMAIL); varios archivos separados por coma.
 *                     Por defecto usa Brevo/contactos_brevo_import.csv (lista 01 Leads sitio) si existe.
 *   --lotes <n>       número mínimo de lotes, contando el de prueba (3).   --tope <n>  máximo por lote (250).
 *   --prueba <n>      tamaño del lote 1 = muestra de prueba al azar (100; 0 = sin lote de prueba).
 *   --relotear        no vuelve a limpiar ni a consultar el DNS: parte de nuevo en lotes el educadores_limpia.csv
 *                     que ya está en --out y reescribe lote_N.csv, la sección 6 del informe y el LEEME.
 *   --sin-mx          no consulta el DNS (solo para trabajar sin internet; el informe lo advierte).
 *
 * Qué escribe en --out:
 *   educadores_limpia.csv         EMAIL;FIRSTNAME;LASTNAME;ESTABLECIMIENTO;COMUNA;REGION · UTF-8 con BOM, separador ";"
 *                                 (referencia para Jay; NO es lo que se importa)
 *   educadores_revisar.csv        lo que NO entra a la lista limpia, con MOTIVO, DETALLE y SUGERENCIA
 *                                 (rol genérico, error de tipeo, dominio sin MX, formato inválido, correo extra en la celda)
 *   lote_1.csv … lote_N.csv       lo que se importa: solo EMAIL;FIRSTNAME;LASTNAME (minimización: el correo E0b no usa
 *                                 nada más). Lote 1 = prueba de 100 al azar con la misma mezcla que la lista completa;
 *                                 el resto en lotes parejos de ≤ 250 (plan gratis de Brevo: 300 envíos al día en total)
 *   informe.txt                   solo cifras agregadas
 *   LEEME_importar_en_Brevo.txt   guía corta para importar (el plan completo: Brevo/Envios_desde_29sep/E0b_Educadores_notas.md)
 *
 * Privacidad: el repo es PÚBLICO. Este archivo no trae datos: lee la lista desde fuera del repo, se niega a escribir
 * dentro del repo y por consola solo muestra cifras. MX: una consulta dns.resolveMx por dominio distinto, con timeout.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const dns = require('dns');
const crypto = require('crypto');

// ─── opciones ────────────────────────────────────────────────────────────────
const REPO = path.resolve(__dirname, '..', '..', '..');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i !== -1 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const ENTRADA = path.resolve(opt('--in', 'C:/Users/Chingu/Downloads/MailChimpChile (1).csv'));
const SALIDA = path.resolve(opt('--out', 'C:/Users/Chingu/Downloads/Brevo_Educadores'));
const EXCLUIR_DEF = path.join(REPO, 'Brevo', 'contactos_brevo_import.csv');
const EXCLUIR = opt('--excluir', '')
  ? opt('--excluir', '').split(',').map((s) => path.resolve(s.trim())).filter(Boolean)
  : (fs.existsSync(EXCLUIR_DEF) ? [EXCLUIR_DEF] : []);
const MIN_LOTES = Math.max(1, parseInt(opt('--lotes', '3'), 10) || 3);
const TOPE = Math.max(1, parseInt(opt('--tope', '250'), 10) || 250);
const SIN_MX = args.includes('--sin-mx');
const RELOTEAR = args.includes('--relotear');
const PRUEBA = Math.max(0, parseInt(opt('--prueba', '100'), 10) || 0);
const COLS_LOTE = ['EMAIL', 'FIRSTNAME', 'LASTNAME']; // lo único que se importa a Brevo
// Dónde se decide si una lista puede ir a Brevo y qué hacer si no (va en el informe, punto 7)
const REF_PERMISO = 'quién entra: Brevo/Calendario_Envios_desde_29sep_2026.md §7.1 · si no va por Brevo: Brevo/Envios_desde_29sep/E0b_Educadores_notas.md §12';
const DNS_TIMEOUT_MS = 4000;
const DNS_PARALELO = 8;

const dentroDe = (p, raiz) => { const r = path.relative(raiz, p); return r === '' || (!r.startsWith('..') && !path.isAbsolute(r)); };
if (dentroDe(SALIDA, REPO)) {
  console.error(`No escribo dentro del repo (es público): ${SALIDA}\nUsa --out con una carpeta fuera de ${REPO}.`);
  process.exit(1);
}
if (!RELOTEAR && !fs.existsSync(ENTRADA)) { console.error(`No encuentro la lista: ${ENTRADA}`); process.exit(1); }

// ─── utilidades ──────────────────────────────────────────────────────────────
const quitarTildes = (s) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const clave = (s) => quitarTildes(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const hash = (s) => crypto.createHash('sha1').update(s).digest('hex');
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1).replace('.', ',')} %` : '0 %');
const n = (x) => x.toLocaleString('es-CL');

function parseCSV(texto, sep) {
  const filas = []; let fila = [], campo = '', comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"') { if (texto[i + 1] === '"') { campo += '"'; i++; } else comillas = false; } else campo += c;
    } else if (c === '"' && campo === '') comillas = true;
    else if (c === sep) { fila.push(campo); campo = ''; }
    else if (c === '\n') { fila.push(campo); filas.push(fila); fila = []; campo = ''; }
    else if (c !== '\r') campo += c;
  }
  if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila); }
  return filas.filter((f) => f.some((v) => v.trim() !== ''));
}
function leerCSV(ruta) {
  const texto = fs.readFileSync(ruta, 'utf8').replace(/^\uFEFF/, '');
  const primera = texto.split(/\r?\n/, 1)[0];
  const sep = (primera.match(/;/g) || []).length >= (primera.match(/,/g) || []).length ? ';' : ',';
  const filas = parseCSV(texto, sep);
  return { cabecera: filas[0] || [], datos: filas.slice(1) };
}
const celdaCSV = (v) => { const s = String(v ?? ''); return /[;"\r\n]|^\s|\s$/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
function escribirCSV(ruta, columnas, filas) {
  const lineas = [columnas.join(';'), ...filas.map((f) => columnas.map((c) => celdaCSV(f[c])).join(';'))];
  fs.writeFileSync(ruta, '\uFEFF' + lineas.join('\r\n') + '\r\n', 'utf8');
}
// Distancia de edición que cuenta una transposición como 1 error ("gmial" está a 1 de "gmail").
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}

// ─── texto: nombres, establecimiento, comuna, región ─────────────────────────
const GRAVES = { à: 'á', è: 'é', ì: 'í', ò: 'ó', ù: 'ú', À: 'Á', È: 'É', Ì: 'Í', Ò: 'Ó', Ù: 'Ú' }; // en Chile no hay acento grave
function limpiarTexto(s) {
  return (s || '').normalize('NFC')
    .replace(/[\u0000-\u001f\u007f\u00a0\u2000-\u200d\u2028\u2029\ufeff]/g, ' ')
    .replace(/[àèìòùÀÈÌÒÙ]/g, (c) => GRAVES[c])
    .replace(/[“”«»]/g, '"').replace(/[‘’´`]/g, "'")
    .replace(/\s+/g, ' ').trim()
    .replace(/^["'=+@\-–—,.;:\s]+/, '')   // nada de fórmulas de Excel ni basura al inicio
    .replace(/[\s,;:"'\-–—]+$/, '')
    .trim();
}
const esTodoMayus = (s) => { const l = s.replace(/[^\p{L}]/gu, ''); return l.length > 0 && l === l.toLocaleUpperCase('es') && l !== l.toLocaleLowerCase('es'); };
const esTodoMinus = (s) => { const l = s.replace(/[^\p{L}]/gu, ''); return l.length > 0 && l === l.toLocaleLowerCase('es'); };

// Palabra en formato Nombre Propio. Conserva mayúsculas internas escritas a propósito (McKay, DeLuca, MacArthur).
function palabraPropia(w) {
  if (/^\p{Lu}\p{Ll}+\p{Lu}\p{Ll}+$/u.test(w)) return w;
  return w.toLocaleLowerCase('es').replace(/(^|[-'])(\p{Ll})/gu, (m, a, b) => a + b.toLocaleUpperCase('es'));
}
const PARTICULAS = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e', 'da', 'das', 'do', 'dos', 'van', 'von', 'der', 'den', 'di', 'du', 'le']);
const INCOMPLETOS = new Set([...PARTICULAS, 'san', 'santa', 'mc', 'mac']); // apellido cortado: "Del", "San"…
function nombrePropio(s, particulaAlInicio) {
  const ws = s.split(' ').filter(Boolean);
  return ws.map((w, i) => {
    const l = w.toLocaleLowerCase('es');
    if (PARTICULAS.has(l) && ws.length > 1 && i < ws.length - 1 && (i > 0 || particulaAlInicio)) return l;
    return palabraPropia(w);
  }).join(' ');
}
const HONORIFICOS = /^(sr|sra|srta|sres|prof|profe|profesor|profesora|don|dona|doña|dr|dra|mg|lic)\.?\s+/i;
const BASURA = new Set(['test', 'prueba', 'xxx', 'asd', 'asdf', 'qwerty', 'nn', 'sn', 'sinnombre', 'no', 'na', 'ninguno', 'null', 'undefined', 'nombre', 'apellido', 'sin', 'anonimo', 'anonima', 'x', 'xx']);
const ROL_EN_NOMBRE = /^(colegio|escuela|liceo|jardin|instituto|direccion|director|directora|convivencia|secretaria|utp|inspectoria|orientacion|contacto|administracion|admin|jefe|jefa|coordinador|coordinadora|unidad|encargado|encargada|profesor|profesora|docente|equipo|departamento|depto|biblioteca|recepcion|oficina|informacion|info|rectoria)\b/;
const SIGLAS = new Set(['utp', 'cra', 'pie', 'daem', 'dem', 'slep', 'ceia', 'junji', 'sep', 'tp', 'hc', 'cgpa', 'uc', 'pdi', 'mineduc', 'dir', 'sec', 'rrhh', 'adm', 'eib', 'cft', 'ip']);
const NOMBRES_CORTOS = new Set(['ana', 'eva', 'luz', 'paz', 'pia', 'bea', 'ema', 'ada', 'ivo', 'leo', 'teo', 'noa', 'mia', 'ian', 'rut', 'ena', 'ida', 'isa', 'ely', 'kim', 'zoe', 'lia', 'gil', 'ari', 'eli', 'edy', 'ely', 'max', 'jon', 'ivy']);

// Devuelve { valor, motivo }; valor '' = que Brevo use el saludo por defecto (en E0b, "¡Hola, profe!").
function limpiarNombre(bruto, tipo) {
  let s = limpiarTexto(bruto);
  if (!s) return { valor: '', motivo: 'vacío en la lista original' };
  if (/[\d@_/\\#$%&*=+<>|{}[\]]/.test(s)) return { valor: '', motivo: 'raro (números, @ o símbolos)' };
  s = s.replace(/["()]/g, '').replace(/\s*-\s*/g, '-').replace(/\s+/g, ' ').trim();
  if (tipo === 'nombre') s = s.replace(HONORIFICOS, '').trim();
  const letras = (s.match(/\p{L}/gu) || []).length;
  if (letras < 2) return { valor: '', motivo: 'raro (una sola letra)' };
  if (tipo === 'nombre' && /\.$/.test(s)) return { valor: '', motivo: 'raro (abreviado)' };
  const k = clave(s);
  if (BASURA.has(k) || /^(.)\1+$/.test(k)) return { valor: '', motivo: 'raro (relleno)' };
  if (ROL_EN_NOMBRE.test(quitarTildes(s).toLowerCase())) return { valor: '', motivo: 'es un cargo, no un nombre' };
  if (esTodoMayus(s)) {
    const solo = quitarTildes(s.replace(/[^\p{L}]/gu, '')).toLowerCase();
    if (SIGLAS.has(solo) || !/[aeiouy]/.test(solo) || (solo.length <= 3 && !NOMBRES_CORTOS.has(solo)))
      return { valor: '', motivo: 'sigla en mayúsculas' };
  }
  if (s.split(' ').every((w) => INCOMPLETOS.has(w.toLocaleLowerCase('es').replace(/\.$/, ''))))
    return { valor: '', motivo: 'incompleto (solo "de", "del", "San"…)' };
  return { valor: nombrePropio(s, tipo === 'apellido'), motivo: '' };
}

// Establecimiento y comuna: solo se retocan si vienen TODO en mayúsculas o TODO en minúsculas.
const MINUS_LUGAR = new Set(['de', 'del', 'y', 'e', 'en', 'para']);
const ROMANOS = /^(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii|xiii|xiv|xv)$/;
const SIGLAS_LUGAR = new Set([...SIGLAS, 'ceia', 'cft', 'insuco', 'inba', 'usach', 'utfsm', 'duoc', 'inacap', 'sip', 'jfk', 'tp', 'hc', 'ep', 'eb']);
const ABREVIATURAS = new Set(['dr', 'sr', 'srs', 'sn', 'st', 'fr', 'pdt', 'mns', 'ntra', 'nstra']); // Dr., Sr., Sn. no son siglas
function lugarPropio(bruto) {
  const s = limpiarTexto(bruto).replace(/\s+/g, ' ');
  if (!s || !(esTodoMayus(s) || esTodoMinus(s))) return s;
  return s.split(' ').map((w, i) => {
    const l = w.toLocaleLowerCase('es');
    const sinPunto = quitarTildes(l).replace(/[^a-z0-9]/g, '');
    if (/\d/.test(l)) return l.toLocaleUpperCase('es');                         // D-456, N°5, A-12
    if (ROMANOS.test(sinPunto) && i > 0) return l.toLocaleUpperCase('es');      // Liceo III
    if (SIGLAS_LUGAR.has(sinPunto) || (!ABREVIATURAS.has(sinPunto) && sinPunto.length >= 2 && sinPunto.length <= 4 && !/[aeiouy]/.test(sinPunto))) return l.toLocaleUpperCase('es');
    if (i > 0 && MINUS_LUGAR.has(l)) return l;
    return palabraPropia(l);
  }).join(' ');
}
const REGIONES = {
  aricayparinacota: 'Arica y Parinacota', arica: 'Arica y Parinacota', tarapaca: 'Tarapacá', iquique: 'Tarapacá',
  antofagasta: 'Antofagasta', atacama: 'Atacama', copiapo: 'Atacama', coquimbo: 'Coquimbo', laserena: 'Coquimbo',
  valparaiso: 'Valparaíso', rm: 'Metropolitana', metropolitana: 'Metropolitana', regionmetropolitana: 'Metropolitana',
  regionmetropolitanadesantiago: 'Metropolitana', santiago: 'Metropolitana',
  libertadorgeneralbernardoohiggins: "O'Higgins", ohiggins: "O'Higgins", libertadorbernardoohiggins: "O'Higgins", rancagua: "O'Higgins",
  maule: 'Maule', talca: 'Maule', nuble: 'Ñuble', chillan: 'Ñuble', biobio: 'Biobío', concepcion: 'Biobío',
  araucania: 'La Araucanía', laaraucania: 'La Araucanía', temuco: 'La Araucanía', losrios: 'Los Ríos', valdivia: 'Los Ríos',
  loslagos: 'Los Lagos', puertomontt: 'Los Lagos', aysen: 'Aysén', aisen: 'Aysén', coyhaique: 'Aysén',
  magallanes: 'Magallanes', magallanesylaantarticachilena: 'Magallanes', puntaarenas: 'Magallanes',
};
function regionPropia(bruto) {
  const s = limpiarTexto(bruto);
  if (!s) return '';
  const k = clave(s).replace(/^(region|reg)(del|de)?/, '') || clave(s);
  return REGIONES[k] || REGIONES[clave(s)] || lugarPropio(s);
}

// ─── correos ─────────────────────────────────────────────────────────────────
const RE_CORREO = /^(?=.{6,254}$)(?=[^@]{1,64}@)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/;
const PERSONAL = /^(gmail\.com|googlemail\.com|(hotmail|outlook|live|msn|windowslive)\.[a-z.]+|yahoo\.[a-z.]+|ymail\.com|rocketmail\.com|icloud\.com|me\.com|mac\.com|aol\.[a-z.]+|gmx\.[a-z.]+|protonmail\.(com|ch)|proton\.me|pm\.me|zoho\.com|mail\.com|yandex\.[a-z.]+|terra\.cl|vtr\.net|entelchile\.net|ctcinternet\.cl|tie\.cl|surnet\.cl|manquehue\.net|chilesat\.net)$/;
function proveedor(dominio) {
  if (/^(gmail|googlemail)\./.test(dominio)) return 'Gmail';
  if (/^(hotmail|outlook|live|msn|windowslive)\./.test(dominio)) return 'Hotmail / Outlook / Live';
  if (/^(yahoo|ymail|rocketmail)\./.test(dominio)) return 'Yahoo';
  if (/^(icloud|me|mac)\.com$/.test(dominio)) return 'iCloud';
  return 'otros personales (ISP, etc.)';
}

// ─── lotes ───────────────────────────────────────────────────────────────────
// Lote 1 = PRUEBA (--prueba, 100): una muestra al azar, reproducible (sha1 del correo), con la misma mezcla de correos
// personales e institucionales que la lista completa, para que el semáforo mida la lista entera y no solo su parte
// "buena". El resto va en lotes parejos de ≤ TOPE con la misma mezcla. Con la misma lista y el mismo --prueba, el lote 1
// no cambia aunque se rehaga el resto con otro --tope (sirve si el semáforo da amarillo). Cada c: EMAIL y esPersonal.
function armarLotes(limpia) {
  const total = limpia.length;
  const tamPrueba = PRUEBA > 0 ? Math.min(PRUEBA, total) : 0;
  const resto = total - tamPrueba;
  const kResto = resto ? Math.max(1, MIN_LOTES - (tamPrueba ? 1 : 0), Math.ceil(resto / TOPE)) : 0;
  const tam = [...(tamPrueba ? [tamPrueba] : []),
    ...Array.from({ length: kResto }, (_, i) => Math.floor(resto / kResto) + (i < resto % kResto ? 1 : 0))];
  const azar = (a, b) => hash(`lote|${a.EMAIL}`).localeCompare(hash(`lote|${b.EMAIL}`));
  const P = limpia.filter((c) => c.esPersonal).sort(azar);
  const I = limpia.filter((c) => !c.esPersonal).sort(azar);
  const p = total ? P.length / total : 0;
  let acum = 0, yaP = 0; // reparto proporcional acumulado: la suma da exactamente P.length
  const cuota = tam.map((t) => { acum += t; const hasta = Math.min(P.length, Math.round(acum * p)); const q = Math.min(t, hasta - yaP); yaP += q; return q; });
  const lotes = []; let ip = 0, ii = 0;
  tam.forEach((t, i) => {
    const per = P.slice(ip, ip + cuota[i]); ip += per.length;
    const ins = I.slice(ii, ii + (t - per.length)); ii += ins.length;
    const lote = []; // intercalados, para que el archivo también se vea mezclado
    for (let a = 0, b = 0; a < per.length || b < ins.length;) {
      if (a < per.length && (b >= ins.length || a / per.length <= b / ins.length)) lote.push(per[a++]); else lote.push(ins[b++]);
    }
    lotes.push(lote);
  });
  return lotes;
}

function lineasLotes(lotes) {
  const L = ['6 · LOTES (se importa solo EMAIL, FIRSTNAME y LASTNAME · plan gratis de Brevo = 300 envíos al día sumando TODAS las campañas)'];
  lotes.forEach((l, i) => {
    const pe = l.filter((c) => c.esPersonal).length;
    L.push(`  lote_${i + 1}.csv: ${n(l.length)}${i === 0 && PRUEBA > 0 ? ' (PRUEBA, al azar)' : ''} · personales ${n(pe)} (${pct(pe, l.length)}) · institucionales ${n(l.length - pe)} · sin nombre ${n(l.filter((c) => !c.FIRSTNAME).length)}`);
  });
  L.push(PRUEBA > 0
    ? '  El lote 1 es una muestra al azar con la misma mezcla que la lista completa: su semáforo mide toda la lista.'
    : '  Todos los lotes llevan la misma mezcla de correos personales e institucionales.',
  '  Fechas, tope diario y semáforo: Brevo/Envios_desde_29sep/E0b_Educadores_notas.md §4 y §6.');
  return L;
}

function textoLeeme(lotes) {
  const nombres = lotes.map((_, i) => `"04 · Lote ${i + 1}"`).join(', ');
  return [
    'CÓMO IMPORTAR LA LISTA DE EDUCADORES EN BREVO · Academia Seúl',
    'Resumen para tener a mano. La guía completa (fechas, tope diario, semáforo, respuestas) está en el repo:',
    'Brevo/Envios_desde_29sep/E0b_Educadores_notas.md. El correo es E0b_Presentacion_Educadores.html.',
    '',
    '0 · ANTES QUE NADA: EL PERMISO',
    '   Brevo prohíbe listas compradas, sacadas de internet o de personas que no aceptaron recibir tus correos, y al importar',
    '   te pregunta si los contactos dieron su permiso. Si hay muchas quejas o rebotes, SUSPENDE LA CUENTA (y con ella E3, E4,',
    '   E5, O1 y los recordatorios de clase). Solo importa si sabes de dónde salió la lista y puedes responder que sí con la',
    '   verdad: recuadro "ANTES DE IMPORTAR" de las notas. En la duda, no se importa.',
    '   La frase "¿Por qué te llega este correo?" de E0b dice hoy "porque tu dirección aparece en una lista de contactos de',
    '   educadores de Chile". Cámbiala por el origen real antes de enviar (notas §2).',
    '',
    '1 · LOS ARCHIVOS',
    `   - lote_1.csv … lote_${lotes.length}.csv = lo que se importa: solo EMAIL, FIRSTNAME y LASTNAME. Juntos suman educadores_limpia.csv.`,
    PRUEBA > 0 ? `     lote_1.csv (${n(lotes[0] ? lotes[0].length : 0)}) es la PRUEBA: una muestra al azar de toda la lista. Los demás, solo si la prueba sale bien.` : '     Todos los lotes llevan la misma mezcla.',
    '   - educadores_limpia.csv trae además establecimiento, comuna y región: es tu referencia. NO se importa.',
    '   - Formato: UTF-8 con BOM y separador punto y coma (;). Brevo lo acepta. En la vista previa del import revisa que las',
    '     columnas salgan separadas y las tildes bien (María, no MarÃ­a). Si salen juntas, elige ";" como separador.',
    '   - NO abras y guardes los CSV con Excel: puede cambiar la codificación o el separador. Si los abres, cierra sin guardar.',
    '   - educadores_revisar.csv NO se importa (punto 5).',
    '',
    '2 · LISTAS EN BREVO (una vez)',
    `   CRM › Contacts › Lists › Create a list: "04 Educadores Chile" y una por lote: ${nombres}.`,
    '   No hace falta crear atributos: EMAIL, FIRSTNAME y LASTNAME ya existen en toda cuenta de Brevo.',
    '',
    '3 · IMPORTAR (cada lote el día de su envío o el anterior; nunca todos juntos)',
    '   CRM › Contacts › Import contacts › Upload a file → lote_N.csv → mapea EMAIL, FIRSTNAME y LASTNAME → elige las listas',
    '   "04 Educadores Chile" y "04 · Lote N" (si deja elegir una sola, importa el mismo archivo dos veces) → confirma.',
    '   Revisa que el número de contactos de la lista del lote coincida con el informe.',
    '',
    '4 · ENVIAR',
    '   - Tope del plan gratis: 300 envíos al día SUMANDO todas las campañas. Deja margen para las pruebas: no pases de 290.',
    '   - Cada campaña: Send to = "04 · Lote N" · Don\'t send to = 01 Leads sitio + 02 Alumnos octubre + 03 Primer contacto.',
    '   - Antes del lote 1: en E4 A y en E5 agrega "04 Educadores Chile" a Don\'t send to (notas §7).',
    '   - Fechas: notas §4. Semáforo 24 h después de cada lote (notas §6): menos de 2 rebotes por cada 100 y 0 quejas → sigue.',
    '     Más de 5 rebotes por cada 100, o 2 quejas o más → PARA y no importes los otros lotes. Lo del medio → pausa y',
    '     pregúntale a Claude. Si solo salió el lote 1, puede rehacer los demás más chicos (--relotear --tope 120; el lote 1',
    '     no cambia). Si ya salió el lote 2, NO se rehace nada: le llegaría el correo dos veces a la misma gente.',
    '   - Bajas y "¿de dónde sacaron mi correo?": ese mismo día dalos de baja y no les escribas más (Ley 19.496, art. 28 B).',
    '',
    '5 · LO QUE QUEDÓ EN educadores_revisar.csv',
    '   - error de tipeo: si la SUGERENCIA es obvia (gmial → gmail) y no dice que ya está en la lista limpia, puedes',
    '     corregirla a mano y sumarla al último lote.',
    '   - rol genérico (contacto@, direccion@, convivencia@…): no van a Brevo. Si quieres llegar al colegio, que sea 1:1.',
    '   - dominio inexistente o sin MX: rebotarían seguro. No los importes.',
    '   - MX sin respuesta: el DNS no contestó; vuelve a correr el script otro día.',
    '   - formato inválido y correo extra en la misma celda: solo si sabes cuál es el correo correcto y de quién es.',
    '',
    '6 · PRIVACIDAD',
    '   Estos archivos tienen datos personales: nunca van al repo (es público) ni se comparten. Cuando termines de importar,',
    '   guarda solo lo necesario.',
  ];
}

// Separa una celda en correos. Varias direcciones en la misma celda (con coma, espacio o salto de línea) → varias.
function extraerCorreos(celda) {
  const bruto = (celda || '').normalize('NFC').toLowerCase().trim();
  if (!bruto) return [];
  const arrobas = (bruto.match(/@/g) || []).length;
  if (arrobas > 1) {
    const partes = bruto.split(/[\s,;/|]+/).filter((p) => p.includes('@'));
    if (partes.length === arrobas && partes.every((p) => /^[^@]+@[^@]+\.[^@]+$/.test(p))) return partes.map((p) => p.replace(/^[<(["']+|[>)\]"'.]+$/g, ''));
  }
  return [bruto.replace(/\s+/g, '').replace(/^[<(["']+|[>)\]"']+$/g, '')];
}

// Errores típicos de tipeo. Devuelve null o { detalle, sugerencia }.
const PROVEEDORES = ['gmail', 'hotmail', 'yahoo', 'outlook', 'icloud'];
const TLD_TIPEO = { con: 'com', cmo: 'com', ocm: 'com', comm: 'com', coom: 'com', vom: 'com', xom: 'com', cpm: 'com', cim: 'com', clm: 'cl', cll: 'cl', lc: 'cl' };
const DOMINIOS_OK = {
  hotmail: /^(com|es|cl|com\.ar|com\.mx|co\.uk|fr|it|de|be|com\.br)$/,
  outlook: /^(com|es|cl|com\.ar|com\.mx|fr|de|it|com\.br)$/,
  live: /^(com|cl|com\.ar|com\.mx|co\.uk|fr|it|de|be|com\.pe)$/,
  yahoo: /^(com|es|cl|com\.ar|com\.mx|co\.uk|fr|it|de|com\.br)$/,
  icloud: /^com$/,
};
function detectarTipeo(correo) {
  const motivos = []; let sug = correo;
  if (/[^\x00-\x7f]/.test(sug)) { motivos.push('tilde o ñ dentro del correo'); sug = quitarTildes(sug).replace(/[^\x00-\x7f]/g, ''); }
  if (sug.includes(',')) { motivos.push('coma dentro del correo'); sug = sug.replace(/,/g, '.').replace(/\.{2,}/g, '.'); }
  if (/\.\.|\.@|@\.|^\.|\.$/.test(sug)) { motivos.push('punto de más'); sug = sug.replace(/\.{2,}/g, '.').replace(/\.@/g, '@').replace(/@\./g, '@').replace(/^\.|\.$/g, ''); }
  const at = sug.indexOf('@');
  let dudoso = false;
  if (at > 0 && at === sug.lastIndexOf('@')) {
    const local = sug.slice(0, at); let dom = sug.slice(at + 1);
    const rep = dom.match(/\.(cl|com|net|org)\.\1$/);
    if (rep) { motivos.push(`termina en .${rep[1]}.${rep[1]}`); dom = dom.slice(0, -(rep[1].length + 1)); }
    const partes = dom.split('.');
    const tld = partes[partes.length - 1];
    if (TLD_TIPEO[tld]) { motivos.push(`termina en .${tld}`); partes[partes.length - 1] = TLD_TIPEO[tld]; }
    else if (partes.length > 1 && tld.length === 1) { motivos.push(`termina en .${tld} (¿.cl o .com?)`); dudoso = true; }
    const etiqueta = partes[0];
    for (const p of PROVEEDORES) {
      if (etiqueta === p) break;
      const d = lev(etiqueta, p);
      if (etiqueta[0] === p[0] && d > 0 && d <= (p.length >= 6 ? 2 : 1) && Math.abs(etiqueta.length - p.length) <= 2) {
        motivos.push(`${etiqueta} en vez de ${p}`); partes[0] = p; break;
      }
    }
    dom = partes.join('.');
    const resto = partes.slice(1).join('.');
    if (partes[0] === 'gmail' && dom !== 'gmail.com') {
      motivos.push('Gmail solo existe como gmail.com'); dom = 'gmail.com'; dudoso = false;
    } else if (DOMINIOS_OK[partes[0]] && resto && !DOMINIOS_OK[partes[0]].test(resto)) {
      motivos.push(`${partes[0]}.${resto} no existe`); dom = `${partes[0]}.com`; dudoso = false;
    }
    sug = `${local}@${dom}`;
  }
  if (!motivos.length) return null;
  return { detalle: [...new Set(motivos)].join(' · '), sugerencia: !dudoso && sug !== correo && RE_CORREO.test(sug) ? sug : '' };
}

// Direcciones de rol (buzones de un cargo o de la institución, no de una persona).
const ROLES_LARGOS = ['contacto', 'contact', 'informacion', 'informaciones', 'secretaria', 'secretario', 'secretariado', 'direccion', 'director', 'directora',
  'subdireccion', 'subdirector', 'subdirectora', 'rectoria', 'rector', 'rectora', 'admin', 'administracion', 'administrador', 'administrativo', 'colegio', 'escuela',
  'liceo', 'jardin', 'instituto', 'complejo', 'centroeducacional', 'salacuna', 'inspectoria', 'inspeccion', 'inspector', 'inspectora', 'convivencia', 'orientacion',
  'orientador', 'orientadora', 'matricula', 'admision', 'biblioteca', 'enlaces', 'informatica', 'soporte', 'comunicaciones', 'prensa', 'recursoshumanos',
  'finanzas', 'contabilidad', 'tesoreria', 'recaudacion', 'cobranza', 'pagos', 'ventas', 'webmaster', 'postmaster', 'hostmaster', 'noreply', 'donotreply',
  'oficina', 'recepcion', 'academico', 'academica', 'coordinacion', 'fundacion', 'corporacion', 'sostenedor', 'apoderados', 'centrodepadres', 'extraescolar',
  'consultas', 'notificaciones', 'mesadeayuda', 'unidadtecnica', 'jefatura', 'pastoral', 'duplapsicosocial', 'bienestar', 'utp', 'info', 'rrhh', 'daem', 'slep',
  'coordinador', 'coordinadora', 'psicologa', 'psicologo', 'psicologia', 'psicopedagoga', 'psicopedagogo', 'fonoaudiologa', 'fonoaudiologo',
  'trabajadorasocial', 'asistentesocial', 'enfermeria', 'escolar', 'gestion', 'comunidad'];
// Palabras que delatan un buzón de la institución aunque vayan en medio (p. ej. una cuenta de Gmail "<colegio>convivencia").
const ROLES_EN_MEDIO = ['convivencia', 'colegio', 'escuela', 'liceo', 'direccion', 'inspectoria', 'secretaria', 'orientacion', 'coordinacion',
  'subdireccion', 'rectoria', 'biblioteca', 'matricula', 'admision', 'administracion', 'jardininfantil', 'salacuna', 'unidadtecnica', 'centrodepadres',
  'corporacion', 'fundacion', 'contacto', 'informaciones', 'recepcion', 'extraescolar', 'apoderados'];
const ROLES_EXACTOS = new Set(['cra', 'pie', 'dir', 'sec', 'hola', 'mail', 'correo', 'dem', 'cgpa', 'personal', 'equipo', 'test', 'prueba', 'no-reply']);
function detectarRol(local, nombre, apellido) {
  const base = quitarTildes(local).toLowerCase();
  const tokens = base.split(/[._\-+0-9]+/).filter(Boolean);
  const compacto = tokens.join('');
  const nom = clave(nombre).replace(/\d/g, '');
  const ape = clave(apellido).replace(/\d/g, '');
  // si el buzón lleva el nombre o el apellido de la persona ("inspector.juan.p", "juanconvivencia"), es personal
  if ((nom.length >= 3 && tokens.includes(nom)) || (nom.length >= 4 && compacto.includes(nom)) || (ape.length >= 4 && compacto.includes(ape))) return null;
  const largo = ROLES_LARGOS.find((r) => compacto.startsWith(r) || tokens.includes(r));
  if (largo) return largo;
  const medio = ROLES_EN_MEDIO.find((r) => compacto.includes(r));
  if (medio) return medio;
  const exacto = tokens.find((t) => ROLES_EXACTOS.has(t));
  return exacto || null;
}

// ─── DNS: registros MX ───────────────────────────────────────────────────────
async function consultarMx(dominios) {
  const sistema = new dns.promises.Resolver({ timeout: DNS_TIMEOUT_MS, tries: 2 });
  const publico = new dns.promises.Resolver({ timeout: DNS_TIMEOUT_MS, tries: 2 });
  publico.setServers(['1.1.1.1', '8.8.8.8']);
  async function preguntar(r, d) {
    try {
      const mx = await r.resolveMx(d);
      const utiles = (mx || []).filter((x) => x.exchange && x.exchange !== '.');
      return utiles.length ? { estado: 'ok' } : { estado: 'sin_mx', detalle: 'MX nulo: el dominio declara que no recibe correo' };
    } catch (e) {
      if (e.code === 'ENODATA') {
        let web = false; try { web = (await r.resolve4(d)).length > 0; } catch { /* sin A */ }
        return { estado: 'sin_mx', detalle: web ? 'el dominio existe (tiene web) pero no tiene MX' : 'el dominio existe pero no tiene MX' };
      }
      if (e.code === 'ENOTFOUND') return { estado: 'no_existe', detalle: 'el dominio no existe' };
      return { estado: 'error', detalle: e.code || 'error' };
    }
  }
  const res = new Map();
  const cola = [...dominios];
  async function trabajador() {
    while (cola.length) {
      const d = cola.shift();
      const a = await preguntar(sistema, d);
      if (a.estado === 'ok') { res.set(d, a); continue; }
      const b = await preguntar(publico, d); // segunda opinión antes de descartar
      if (b.estado === 'ok') res.set(d, b);
      else if (b.estado !== 'error') res.set(d, b);
      else if (a.estado !== 'error') res.set(d, a);
      else res.set(d, { estado: 'sin_respuesta', detalle: `el DNS no respondió (${a.detalle})` });
    }
  }
  await Promise.all(Array.from({ length: DNS_PARALELO }, trabajador));
  // segunda vuelta, de a uno y con resolvers nuevos, para los que no respondieron
  const mudos = [...res].filter(([, r]) => r.estado === 'sin_respuesta').map(([d]) => d);
  for (const d of mudos) {
    for (const servidores of [null, ['1.1.1.1', '8.8.8.8']]) {
      const r = new dns.promises.Resolver({ timeout: DNS_TIMEOUT_MS * 2, tries: 3 });
      if (servidores) r.setServers(servidores);
      const x = await preguntar(r, d);
      if (x.estado !== 'error') { res.set(d, x); break; }
    }
  }
  return res;
}

// ─── principal ───────────────────────────────────────────────────────────────
(async () => {
  if (RELOTEAR) {
    // Rehace solo los lotes a partir de la lista limpia que ya existe (sin volver a limpiar ni consultar el DNS).
    const rutaLimpia = path.join(SALIDA, 'educadores_limpia.csv');
    if (!fs.existsSync(rutaLimpia)) { console.error(`No encuentro ${rutaLimpia}: corre primero el script sin --relotear.`); process.exit(1); }
    const x = leerCSV(rutaLimpia);
    const limpia = x.datos.filter((f) => f.some((v) => v.trim())).map((f) => {
      const c = Object.fromEntries(x.cabecera.map((h, i) => [h.trim(), f[i] || '']));
      c.esPersonal = PERSONAL.test((c.EMAIL || '').split('@').pop()); return c;
    });
    const lotes = armarLotes(limpia);
    for (const f of fs.readdirSync(SALIDA)) if (/^lote_\d+\.csv$/.test(f)) fs.unlinkSync(path.join(SALIDA, f));
    lotes.forEach((l, i) => escribirCSV(path.join(SALIDA, `lote_${i + 1}.csv`), COLS_LOTE, l));
    const hoy = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago', dateStyle: 'long', timeStyle: 'short' });
    const rutaInf = path.join(SALIDA, 'informe.txt');
    const seis = [...lineasLotes(lotes), `  (lotes rehechos con --relotear el ${hoy}, hora de Chile; la limpieza no cambió)`].join('\r\n');
    if (fs.existsSync(rutaInf)) {
      let inf = fs.readFileSync(rutaInf, 'utf8').replace(/^\uFEFF/, '');
      inf = inf.replace(/6 · LOTES[\s\S]*?(?=\r?\n\r?\n7 · )/, seis)
        .replace('(Brevo saluda "¡Hola, chingu!")', '(E0b saluda "¡Hola, profe!")')
        .replace(/\(ver Brevo\/Envios_desde_29sep\/[^)\r\n]*\)/, `(${REF_PERMISO})`); // informes anteriores: apuntaban a notas que ya no existen
      fs.writeFileSync(rutaInf, '\uFEFF' + inf, 'utf8');
    }
    fs.writeFileSync(path.join(SALIDA, 'LEEME_importar_en_Brevo.txt'), '\uFEFF' + textoLeeme(lotes).join('\r\n') + '\r\n', 'utf8');
    console.log(seis.replace(/\r\n/g, '\n'));
    console.log(`\nLista limpia: ${n(limpia.length)} · lotes: ${lotes.map((l) => n(l.length)).join(' + ')} · en ${SALIDA}`);
    return;
  }
  const { cabecera, datos } = leerCSV(ENTRADA);
  const hk = cabecera.map(clave);
  const col = (...alias) => hk.findIndex((h) => alias.includes(h));
  const C = {
    email: col('email', 'correo', 'correoelectronico', 'mail', 'emailaddress'),
    nombre: col('primernombre', 'nombre', 'nombres', 'firstname'),
    apellido: col('apellido', 'apellidos', 'lastname', 'apellidopaterno'),
    est: col('establecimientoeducacional', 'establecimiento', 'colegio', 'escuela', 'institucion'),
    comuna: col('comuna', 'ciudad'),
    region: col('region'),
  };
  if (C.email < 0) { console.error('La lista no tiene una columna EMAIL.'); process.exit(1); }
  const val = (fila, i) => (i >= 0 ? fila[i] || '' : '');

  // correos que ya están en Brevo
  const enBrevo = new Set();
  for (const ruta of EXCLUIR) {
    if (!fs.existsSync(ruta)) { console.warn(`Aviso: no encuentro ${ruta}; no excluyo nada de ahí.`); continue; }
    const x = leerCSV(ruta); const ie = x.cabecera.map(clave).indexOf('email');
    if (ie >= 0) for (const f of x.datos) for (const e of extraerCorreos(f[ie])) enBrevo.add(e);
  }

  // 1 · candidatos (una fila puede traer varios correos)
  const stats = { filas: datos.length, sinCorreo: 0, celdasMultiples: 0, extras: 0 };
  const candidatos = [];
  datos.forEach((fila, idx) => {
    const correos = extraerCorreos(val(fila, C.email));
    if (!correos.length) { stats.sinCorreo++; return; }
    if (correos.length > 1) { stats.celdasMultiples++; stats.extras += correos.length - 1; }
    const nombre = limpiarNombre(val(fila, C.nombre), 'nombre');
    const apellido = limpiarNombre(val(fila, C.apellido), 'apellido');
    const c = {
      FIRSTNAME: nombre.valor, motivoNombre: nombre.motivo, LASTNAME: apellido.valor,
      ESTABLECIMIENTO: lugarPropio(val(fila, C.est)), COMUNA: lugarPropio(val(fila, C.comuna)), REGION: regionPropia(val(fila, C.region)),
      nombreOriginal: clave(val(fila, C.nombre)), apellidoOriginal: clave(val(fila, C.apellido)),
    };
    c.completitud = ['FIRSTNAME', 'LASTNAME', 'ESTABLECIMIENTO', 'COMUNA', 'REGION'].filter((k) => c[k]).length;
    correos.forEach((correo, j) => candidatos.push({ ...c, EMAIL: correo, extra: j > 0, orden: idx }));
  });

  // 2 · deduplicar por correo: gana la fila principal (no la dirección extra) más completa; en empate, la primera
  const grupos = new Map();
  for (const c of candidatos) { if (!grupos.has(c.EMAIL)) grupos.set(c.EMAIL, []); grupos.get(c.EMAIL).push(c); }
  const unicos = []; let nombresEnConflicto = 0;
  for (const [, g] of grupos) {
    const elegido = [...g].sort((a, b) => (a.extra - b.extra) || (b.completitud - a.completitud) || (a.orden - b.orden))[0];
    const nombres = new Set(g.filter((x) => !x.extra && x.FIRSTNAME).map((x) => clave(x.FIRSTNAME)));
    if (nombres.size > 1) { // el mismo buzón con nombres distintos: probablemente compartido → saludo genérico
      nombresEnConflicto++; elegido.FIRSTNAME = ''; elegido.LASTNAME = ''; elegido.motivoNombre = 'el mismo correo trae nombres distintos';
    }
    elegido.repeticiones = g.length;
    unicos.push(elegido);
  }
  const duplicadas = candidatos.length - unicos.length;

  // 3 · formato y tipeo
  for (const c of unicos) {
    c.motivos = [];
    c.tipeo = detectarTipeo(c.EMAIL);
    c.valido = RE_CORREO.test(c.EMAIL);
    c.dominio = c.EMAIL.includes('@') ? c.EMAIL.split('@').pop() : '';
  }

  // 4 · MX: un dominio distinto a la vez (también el de las sugerencias, para no sugerir algo que no existe)
  const dominios = new Set();
  for (const c of unicos) {
    if (c.valido && !c.tipeo) dominios.add(c.dominio);
    if (c.tipeo && c.tipeo.sugerencia) dominios.add(c.tipeo.sugerencia.split('@').pop());
  }
  let mx = new Map();
  if (!SIN_MX) {
    process.stdout.write(`Consultando MX de ${n(dominios.size)} dominios… `);
    mx = await consultarMx(dominios);
    const mudos = [...mx.values()].filter((r) => r.estado === 'sin_respuesta').length;
    console.log('listo.');
    if (dominios.size >= 10 && mudos / dominios.size > 0.5) {
      console.error(`El DNS no respondió en ${mudos} de ${dominios.size} dominios: parece que no hay internet. No escribo nada; vuelve a correrlo con conexión.`);
      process.exit(2);
    }
  }
  const estadoMx = (d) => (SIN_MX ? { estado: 'ok' } : mx.get(d) || { estado: 'sin_respuesta', detalle: 'sin consultar' });

  // 5 · clasificar: motivo principal en este orden
  const limpia = []; const revisar = []; let yaEnBrevo = 0;
  for (const c of unicos) {
    if (enBrevo.has(c.EMAIL)) { yaEnBrevo++; continue; }
    const local = c.EMAIL.split('@')[0];
    const detalles = [];
    let motivo = '';
    if (c.tipeo) {
      motivo = 'error de tipeo'; detalles.push(c.tipeo.detalle);
      if (c.tipeo.sugerencia && !SIN_MX && estadoMx(c.tipeo.sugerencia.split('@').pop()).estado !== 'ok') c.tipeo.sugerencia = '';
    } else if (!c.valido) {
      motivo = 'formato inválido'; detalles.push(c.EMAIL.includes('@') ? 'no es una dirección válida' : 'no tiene @');
    } else {
      const m = estadoMx(c.dominio);
      if (m.estado !== 'ok') {
        motivo = { no_existe: 'dominio inexistente', sin_mx: 'dominio sin MX', sin_respuesta: 'MX sin respuesta' }[m.estado] || 'dominio sin MX';
        detalles.push(m.detalle);
      }
      const rol = detectarRol(local, c.nombreOriginal, c.apellidoOriginal);
      if (rol) { if (!motivo) motivo = 'rol genérico'; detalles.push(`buzón de cargo o institución: ${rol}`); }
      if (c.extra) { if (!motivo) motivo = 'correo extra en la misma celda'; detalles.push('venía junto a otro correo en la misma celda: no se sabe de quién es'); }
    }
    c.esPersonal = PERSONAL.test(c.dominio);
    if (!motivo) { limpia.push(c); continue; }
    c.MOTIVO = motivo; c.DETALLE = detalles.join(' · '); c.SUGERENCIA = c.tipeo ? c.tipeo.sugerencia : '';
    if (c.extra) { c.FIRSTNAME = ''; c.LASTNAME = ''; }
    revisar.push(c);
  }

  const enLimpia = new Set(limpia.map((c) => c.EMAIL));
  for (const c of revisar) if (c.SUGERENCIA && (enLimpia.has(c.SUGERENCIA) || enBrevo.has(c.SUGERENCIA))) c.DETALLE += ' · la versión corregida ya está en la lista limpia o en Brevo: no hace falta sumarla';

  // 6 · lotes: el 1 es la prueba al azar; todos con la misma mezcla de personales e institucionales (armarLotes)
  const P = limpia.filter((c) => c.esPersonal);
  const lotes = armarLotes(limpia);

  // 7 · escribir
  fs.mkdirSync(SALIDA, { recursive: true });
  const COLS = ['EMAIL', 'FIRSTNAME', 'LASTNAME', 'ESTABLECIMIENTO', 'COMUNA', 'REGION'];
  const porLote = new Map(); lotes.forEach((l, i) => l.forEach((c) => porLote.set(c.EMAIL, i)));
  const limpiaOrdenada = [...limpia].sort((a, b) => porLote.get(a.EMAIL) - porLote.get(b.EMAIL) || a.EMAIL.localeCompare(b.EMAIL));
  escribirCSV(path.join(SALIDA, 'educadores_limpia.csv'), COLS, limpiaOrdenada);
  const ORDEN_MOTIVOS = ['formato inválido', 'error de tipeo', 'dominio inexistente', 'dominio sin MX', 'MX sin respuesta', 'rol genérico', 'correo extra en la misma celda'];
  revisar.sort((a, b) => ORDEN_MOTIVOS.indexOf(a.MOTIVO) - ORDEN_MOTIVOS.indexOf(b.MOTIVO) || a.EMAIL.localeCompare(b.EMAIL));
  escribirCSV(path.join(SALIDA, 'educadores_revisar.csv'), [...COLS, 'MOTIVO', 'DETALLE', 'SUGERENCIA'], revisar);
  for (const f of fs.readdirSync(SALIDA)) if (/^lote_\d+\.csv$/.test(f)) fs.unlinkSync(path.join(SALIDA, f)); // lotes de una corrida anterior
  lotes.forEach((l, i) => escribirCSV(path.join(SALIDA, `lote_${i + 1}.csv`), COLS_LOTE, l));

  // 8 · informe (solo cifras)
  const cuenta = (arr, f) => arr.reduce((m, x) => { const kk = f(x); m[kk] = (m[kk] || 0) + 1; return m; }, {});
  const porMotivo = cuenta(revisar, (c) => c.MOTIVO);
  const provs = cuenta(limpia.filter((c) => c.esPersonal), (c) => proveedor(c.dominio));
  const inst = limpia.filter((c) => !c.esPersonal);
  const instCl = inst.filter((c) => c.dominio.endsWith('.cl')).length;
  const sinNombre = limpia.filter((c) => !c.FIRSTNAME);
  const porQueSinNombre = cuenta(sinNombre, (c) => c.motivoNombre || 'otro');
  const estados = cuenta([...mx.values()], (r) => r.estado);
  const hoy = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago', dateStyle: 'long', timeStyle: 'short' });
  const L = [];
  L.push('INFORME · limpieza de la lista de educadores para Brevo', `Generado: ${hoy} (hora de Chile) · archivo: ${path.basename(ENTRADA)}`,
    'Solo cifras agregadas. Los datos quedan en esta carpeta, fuera del repo. Nada se importó ni se envió.', '');
  L.push('1 · ENTRADA',
    `  Filas con datos: ${n(stats.filas)}`,
    `  Filas sin correo: ${n(stats.sinCorreo)}`,
    `  Celdas con más de un correo: ${n(stats.celdasMultiples)} (${n(stats.extras)} direcciones extra, separadas)`,
    `  Direcciones leídas: ${n(candidatos.length)} · repetidas eliminadas: ${n(duplicadas)} · distintas: ${n(unicos.length)}`,
    `  Correos repetidos con nombres distintos (buzón compartido → sin nombre): ${n(nombresEnConflicto)}`,
    `  Ya estaban en Brevo (${EXCLUIR.length ? EXCLUIR.map((r) => path.basename(r)).join(', ') : 'sin archivo de exclusión'}): ${n(yaEnBrevo)}`, '');
  L.push('2 · RESULTADO',
    `  Lista limpia (educadores_limpia.csv): ${n(limpia.length)} (${pct(limpia.length, unicos.length)} de las distintas)`,
    `  A revisar, NO van a Brevo (educadores_revisar.csv): ${n(revisar.length)}`);
  for (const m of ORDEN_MOTIVOS) if (porMotivo[m]) L.push(`    - ${m}: ${n(porMotivo[m])}`);
  L.push('    (un correo puede tener más de un problema; cuenta el primero de esta lista y el resto va en DETALLE)',
    `    - con sugerencia de corrección: ${n(revisar.filter((c) => c.SUGERENCIA).length)}`, '');
  L.push('3 · DOMINIOS (lista limpia)',
    `  Personales: ${n(P.length)} (${pct(P.length, limpia.length)})`);
  for (const [k2, v] of Object.entries(provs).sort((a, b) => b[1] - a[1])) L.push(`    - ${k2}: ${n(v)}`);
  L.push(`  Institucionales: ${n(inst.length)} (${pct(inst.length, limpia.length)}) · terminados en .cl: ${n(instCl)} · otros (.com, .org, .net…): ${n(inst.length - instCl)}`,
    `  Dominios institucionales distintos: ${n(new Set(inst.map((c) => c.dominio)).size)}`, '');
  L.push('4 · MX (dns.resolveMx por dominio, sin conectarse a los servidores de correo)');
  if (SIN_MX) L.push('  NO SE CONSULTÓ (--sin-mx). Vuelve a correr el script con internet antes de importar.');
  else L.push(`  Dominios consultados: ${n(dominios.size)} · con MX: ${n(estados.ok || 0)} · sin MX: ${n(estados.sin_mx || 0)} · inexistentes: ${n(estados.no_existe || 0)} · sin respuesta: ${n(estados.sin_respuesta || 0)}`);
  L.push('');
  L.push('5 · NOMBRES (lista limpia)',
    `  Con FIRSTNAME: ${n(limpia.length - sinNombre.length)} · sin FIRSTNAME (E0b saluda "¡Hola, profe!"): ${n(sinNombre.length)}`);
  for (const [k2, v] of Object.entries(porQueSinNombre).sort((a, b) => b[1] - a[1])) L.push(`    - ${k2}: ${n(v)}`);
  L.push(`  Con LASTNAME: ${n(limpia.filter((c) => c.LASTNAME).length)} · con ESTABLECIMIENTO: ${n(limpia.filter((c) => c.ESTABLECIMIENTO).length)} · con COMUNA: ${n(limpia.filter((c) => c.COMUNA).length)} · con REGION: ${n(limpia.filter((c) => c.REGION).length)}`,
    '  Teléfonos y país: no se exportan (minimización de datos).', '');
  L.push(...lineasLotes(lotes), '');
  L.push('7 · ANTES DE IMPORTAR',
    '  - Confirma de dónde salió la lista y que estas personas aceptaron recibir correos de Academia Seúl.',
    `    Si no, no la subas a Brevo (${REF_PERMISO}). Guía: LEEME_importar_en_Brevo.txt`);
  fs.writeFileSync(path.join(SALIDA, 'informe.txt'), '\uFEFF' + L.join('\r\n') + '\r\n', 'utf8');

  // 9 · guía de importación (sin datos)
  const G = textoLeeme(lotes);
  fs.writeFileSync(path.join(SALIDA, 'LEEME_importar_en_Brevo.txt'), '\uFEFF' + G.join('\r\n') + '\r\n', 'utf8');

  console.log(L.join('\n'));
  console.log(`\nArchivos en ${SALIDA}: educadores_limpia.csv, educadores_revisar.csv, ${lotes.map((_, i) => `lote_${i + 1}.csv`).join(', ')}, informe.txt, LEEME_importar_en_Brevo.txt`);
})().catch((e) => { console.error(e); process.exit(1); });
