// Control de SVG de la casa. Uso: node check.js <carpeta o archivos…>
// Marca: colores rojos o rosados (prohibidos), imágenes o fuentes externas, falta de viewBox, texto con fuente que no sea Malgun Gothic/Arial, scripts.
const fs = require("fs"), path = require("path");
const args = process.argv.slice(2); const files = [];
for (const a of args) { if (fs.statSync(a).isDirectory()) fs.readdirSync(a).filter((f) => f.endsWith(".svg")).forEach((f) => files.push(path.join(a, f))); else files.push(a); }
const hsl = (hex) => { const n = parseInt(hex.slice(1), 16); let r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0; if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return { h, s, l }; };
const NOMBRES = /\b(red|crimson|pink|hotpink|deeppink|magenta|fuchsia|salmon|tomato|coral|lightcoral|indianred|firebrick|darkred|maroon|palevioletred|mediumvioletred|lightpink|lightsalmon|darksalmon|orangered)\b/i;
let malos = 0;
for (const f of files) {
  const s = fs.readFileSync(f, "utf8"); const prob = [];
  if (!/viewBox=/.test(s)) prob.push("sin viewBox");
  if (/<script|on\w+=/i.test(s)) prob.push("script o evento");
  if (/(xlink:)?href="(https?:|\/\/|data:image\/(png|jpe?g))/i.test(s)) prob.push("imagen externa o incrustada");
  if (/@import|url\(\s*['"]?https?:/i.test(s)) prob.push("fuente o recurso externo");
  const nom = s.replace(/<!--[\s\S]*?-->/g, "").match(new RegExp("(fill|stroke|stop-color|color)\s*[=:]\s*\"?\s*" + NOMBRES.source, "i")); if (nom) prob.push("color por nombre prohibido: " + nom[0]);
  const rojos = new Set();
  for (const m of s.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
    let hx = m[1]; if (hx.length === 3) hx = hx.split("").map((c) => c + c).join("");
    const { h, s: sat, l } = hsl("#" + hx);
    // rojo/rosado: matiz 330°–15° con saturación ≥ 0,35 y luz entre 0,2 y 0,9 (el durazno de las mejillas #FFB98A, matiz 23°, pasa)
    if ((h >= 330 || h <= 15) && sat >= 0.35 && l >= 0.2 && l <= 0.9) rojos.add("#" + hx.toUpperCase());
  }
  for (const m of s.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) { const hx = "#" + [m[1], m[2], m[3]].map((v) => (+v).toString(16).padStart(2, "0")).join(""); const { h, s: sat, l } = hsl(hx); if ((h >= 330 || h <= 15) && sat >= 0.35 && l >= 0.2 && l <= 0.9) rojos.add(hx.toUpperCase()); }
  if (rojos.size) prob.push("rojo/rosado: " + [...rojos].join(" "));
  for (const m of s.matchAll(/font-family\s*[=:]\s*"?([^";>]+)/g)) if (!/malgun|arial|sans-serif/i.test(m[1])) prob.push("fuente: " + m[1].trim());
  const textos = [...s.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
  console.log((prob.length ? "✗ " : "✓ ") + path.basename(f) + (prob.length ? "  " + prob.join(" · ") : "") + (textos.length ? "  | textos: " + textos.join(" / ") : ""));
  if (prob.length) malos++;
}
console.log(files.length + " archivos · " + malos + " con problemas"); process.exitCode = malos ? 1 : 0;
