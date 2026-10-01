// Versión "enero 2027" de E0c, para cuando la institución lo mande después del cierre del dom 11 oct.
// Quita el Día del Hangul (9 oct), cambia el bloque de cursos (Niños, Básico 1, precio y plazo) por el aviso de enero
// (sin precio ni fechas), cambia el botón del PDF de octubre por /notificarme y pasa la campaña de los links a educadores_ene.
// El bloque "¿Conversamos?" (reunión breve con Jay) se queda igual.
// Hecho para la plantilla académica (1 oct 2026). Uso: node Brevo/Envios_desde_29sep/herramientas/e0c_enero.js <entrada.html> <salida.html>
// Luego: e0c_check_mailchimp.js <salida.html> (Mailchimp) o preview.js <salida.html> (Brevo). La salida va fuera del repo o a _privado/ si no se va a versionar.
const fs = require('fs');
const [, , IN, OUT] = process.argv;
if (!IN || !OUT) { console.log('Uso: node e0c_enero.js <entrada.html> <salida.html>'); process.exit(1); }
let s = fs.readFileSync(IN, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('No encontré: ' + a.slice(0, 80)); s = s.split(a).join(b); };
const SANS = "Arial,Helvetica,'Apple SD Gothic Neo','Malgun Gothic',sans-serif";
// 1 · sin la frase del Día del Hangul (9 oct)
rep(' El viernes 9 de octubre es el Día del Hangul (한글날) en Corea: una buena excusa para probarlos en&nbsp;clase.', '');
// 2 · el bloque de cursos: desde la fila de "Coreano para Niños" hasta el destacado del plazo (incluye el precio)
const ninos = s.indexOf('clase=ninos');
const a = s.lastIndexOf('<tr>', ninos);
const plazo = s.indexOf('si se llenan los&nbsp;cupos).');
const finTabla = plazo < 0 ? -1 : s.indexOf('</table>', plazo);
const b = finTabla < 0 ? -1 : s.indexOf('</tr>', finTabla) + '</tr>'.length;
if (ninos < 0 || a < 0 || plazo < 0 || b <= a) throw new Error('No encontré el bloque de cursos (Niños → plazo)');
s = s.slice(0, a) + `<tr>
<td align="left" style="padding:24px 0 0 0;font-family:${SANS};font-size:16px;line-height:26px;color:#2B2F3A;mso-line-height-rule:exactly;">En enero de 2027 abre la próxima cohorte de Academia Seúl, con <strong style="color:#003478;">Coreano para Niños <span style="white-space:nowrap;">(8–15)</span></strong> y <strong style="color:#003478;">Básico 1 <span style="white-space:nowrap;">(A1.1)</span></strong> para adultos, desde cero y profes incluidos. Clases en vivo por Zoom, con profes&nbsp;coreanos.</td>
</tr>` + s.slice(b);
// 3 · el botón: del PDF de octubre al aviso de enero
rep('Todo en una página, para reenviar a apoderados o&nbsp;colegas:', 'Para recibir el aviso cuando abran las&nbsp;inscripciones:');
const boton = /<a href="https:\/\/www\.academiaseul\.com\/programas\/Hoja_Resumen_Cursos_Octubre_2026\.pdf"(\s[^>]*)>Ver el programa <span style="white-space:nowrap;">en una página \(PDF\)<\/span><\/a>/;
if (!boton.test(s)) throw new Error('No encontré el botón del PDF');
s = s.replace(boton, '<a href="https://www.academiaseul.com/notificarme?utm_source=institucion&utm_medium=email&utm_campaign=educadores_oct"$1>Quiero el aviso de enero</a>');
const c = s.indexOf('Cursos e inscripción:');
if (c < 0) throw new Error('No encontré la línea "Cursos e inscripción"');
const ca = s.lastIndexOf('<tr>', c), cb = s.indexOf('</tr>', c) + '</tr>'.length;
s = s.slice(0, ca) + s.slice(cb).replace(/^\n/, '');
// 4 · UTM de la campaña de enero
s = s.split('utm_campaign=educadores_oct').join('utm_campaign=educadores_ene');
const plano = s.replace(/<[^>]+>/g, '');
if (/octubre|Octubre_2026|US\$/.test(plano)) console.log('OJO: queda texto de octubre o precio:', (plano.match(/.{0,40}(octubre|US\$).{0,40}/g) || []).join(' | '));
fs.writeFileSync(OUT, s, 'utf8');
console.log('OK', OUT);
