#!/usr/bin/env node
/*
 * rellenar_links.js · Academia Seúl · rellena los links privados de O1 y R1 (Zoom, grupos, guías, cuota 2)
 *
 * Uso (desde la carpeta del repo):
 *   node Brevo/Envios_desde_29sep/rellenar_links.js
 *   node Brevo/Envios_desde_29sep/rellenar_links.js --links otra/ruta.txt --out otra/carpeta
 *
 * Qué hace:
 *   1. Lee _privado/links_privados.txt (si no existe, lo crea desde links_privados_EJEMPLO.txt y se detiene).
 *   2. En cada O1*.html y R1*.html de esta carpeta cambia cada ⟪CLAVE⟫ por su valor.
 *   3. Guarda las copias rellenas en _privado/ (con el mismo nombre) y avisa si queda alguna ⟪marca⟫.
 * Las plantillas originales no se tocan. _privado/ está en .gitignore: el repo es público y los links
 * de Zoom y de los grupos de WhatsApp no deben quedar en GitHub.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i !== -1 && args[i + 1] ? path.resolve(args[i + 1]) : def; };
const PRIV = path.join(DIR, '_privado');
const LINKS = opt('--links', path.join(PRIV, 'links_privados.txt'));
const OUT = opt('--out', PRIV);
const EJEMPLO = path.join(DIR, 'links_privados_EJEMPLO.txt');

if (!fs.existsSync(LINKS)) {
  fs.mkdirSync(path.dirname(LINKS), { recursive: true });
  fs.copyFileSync(EJEMPLO, LINKS);
  console.log(`Creé ${LINKS}\nÁbrelo, pega cada link después del "=" (una línea por link), guárdalo y vuelve a correr este comando.`);
  process.exit(1);
}

// 1 · leer los valores
const valores = {};
const problemas = [];
for (const [n, linea] of fs.readFileSync(LINKS, 'utf8').replace(/^﻿/, '').split(/\r?\n/).entries()) {
  const l = linea.trim();
  if (!l || l.startsWith('#')) continue;
  const i = l.indexOf('=');
  if (i === -1) { problemas.push(`línea ${n + 1}: falta el "=" → ${l}`); continue; }
  const clave = l.slice(0, i).trim().replace(/[⟪⟫]/g, '');
  const valor = l.slice(i + 1).trim();
  if (!valor) continue; // vacío: se reporta después como marca pendiente
  if (clave.startsWith('PEGAR LINK')) {
    if (!/^https:\/\/\S+$/.test(valor) || /["<>]/.test(valor)) { problemas.push(`${clave}: "${valor}" no parece un link https:// completo (sin espacios ni comillas).`); continue; }
    // cada link debe ir al servicio que corresponde (evita pegar un grupo donde va un Zoom)
    let host = '';
    try { host = new URL(valor).hostname.toLowerCase(); } catch { problemas.push(`${clave}: "${valor}" no es un link válido.`); continue; }
    if (clave.startsWith('PEGAR LINK ZOOM') && !/(^|\.)zoom\.us$/.test(host)) { problemas.push(`${clave}: "${valor}" no es un link de Zoom (debe ser https://…zoom.us/j/…).`); continue; }
    if (clave.startsWith('PEGAR LINK GRUPO') && host !== 'chat.whatsapp.com') { problemas.push(`${clave}: "${valor}" no es un link de grupo de WhatsApp (debe ser https://chat.whatsapp.com/…).`); continue; }
    const repetida = Object.keys(valores).find((k) => valores[k] === valor);
    if (repetida) problemas.push(`${clave} tiene el mismo link que ${repetida}: cada clase y cada grupo tiene el suyo.`);
    valores[clave] = valor;
  } else {
    valores[clave] = valor.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

// 2 · rellenar las plantillas
fs.mkdirSync(OUT, { recursive: true });
const plantillas = fs.readdirSync(DIR).filter((f) => /^(O1|R1).*\.html$/i.test(f)).sort();
let pendientes = 0;
for (const f of plantillas) {
  let html = fs.readFileSync(path.join(DIR, f), 'utf8');
  html = html.replace(/⟪([^⟫]+)⟫/g, (m, clave) => (clave in valores ? valores[clave] : m));
  const quedan = [...new Set(html.match(/⟪[^⟫]+⟫/g) || [])];
  fs.writeFileSync(path.join(OUT, f), html, 'utf8');
  pendientes += quedan.length;
  console.log(`${quedan.length ? 'FALTA ' : 'LISTO '} ${path.join(OUT, f)}${quedan.length ? '\n        sin valor: ' + quedan.join('  ') : ''}`);
}
for (const p of problemas) console.log(`REVISA ${p}`);
if (!pendientes && !problemas.length) console.log('\nTodo relleno. Ahora pasa cada copia por preview.js (debe decir LISTO PARA PEGAR EN BREVO) y pega en Brevo la copia de _privado/, no la plantilla.');
process.exit(pendientes || problemas.length ? 1 : 0);
