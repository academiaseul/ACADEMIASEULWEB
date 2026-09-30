// Versión "enero 2027" de E0c, para cuando la institución lo mande después del cierre del dom 11 oct.
// Quita el Día del Hangul (9 oct), cambia el recuadro de cursos por el aviso de enero (sin precio ni fechas),
// cambia el botón del PDF de octubre por /notificarme y pasa la campaña de los links a educadores_ene.
// Uso: node Brevo/Envios_desde_29sep/herramientas/e0c_enero.js <entrada.html> <salida.html>
// Luego: e0c_check_mailchimp.js <salida.html> (Mailchimp) o preview.js <salida.html> (Brevo). La salida va fuera del repo o a _privado/ si no se va a versionar.
const fs = require('fs');
const [, , IN, OUT] = process.argv;
if (!IN || !OUT) { console.log('Uso: node e0c_enero.js <entrada.html> <salida.html>'); process.exit(1); }
let s = fs.readFileSync(IN, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('No encontré: ' + a.slice(0, 80)); s = s.split(a).join(b); };
// 1 · sin la frase del Día del Hangul (9 oct)
rep(' El viernes 9 de octubre es el Día del Hangul (한글날) en Corea: una buena excusa para probarlos en&nbsp;clase.', '');
// 2 · el recuadro de cursos
const a = s.indexOf('<div style="font-size:15px;line-height:22px;color:#1B1C24;padding-top:10px;"><a href="https://www.academiaseul.com/nivel-1?clase=ninos');
const b = s.indexOf('</td>', a);
if (a < 0 || b < 0) throw new Error('No encontré el recuadro de cursos');
s = s.slice(0, a) + '<div style="font-size:15px;line-height:22px;color:#1B1C24;padding-top:10px;">En enero de 2027 abre la próxima cohorte de Academia Seúl, con <strong>Coreano para Niños <span style="white-space:nowrap;">(8–15)</span></strong> y <strong>Básico 1 <span style="white-space:nowrap;">(A1.1)</span></strong> para adultos, desde cero y profes incluidos. Clases en vivo por Zoom, con profes&nbsp;coreanos.</div>\n' + s.slice(b);
// 3 · el botón: del PDF de octubre al aviso de enero
rep('Todo en una página, para reenviar a apoderados o&nbsp;colegas:', 'Para recibir el aviso cuando abran las&nbsp;inscripciones:');
rep('<a href="https://www.academiaseul.com/programas/Hoja_Resumen_Cursos_Octubre_2026.pdf" target="_blank" style="display:inline-block;padding:14px 26px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#FFFFFF;text-decoration:none;border-radius:10px;">Ver el programa <span style="white-space:nowrap;">en una página (PDF)</span></a>',
    '<a href="https://www.academiaseul.com/notificarme?utm_source=institucion&utm_medium=email&utm_campaign=educadores_oct" target="_blank" style="display:inline-block;padding:14px 26px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:22px;font-weight:bold;color:#FFFFFF;text-decoration:none;border-radius:10px;">Quiero el aviso de enero</a>');
const c = s.indexOf('<div style="font-size:14px;line-height:21px;color:#5C5F6B;padding-top:12px;">Cursos e inscripción:');
if (c < 0) throw new Error('No encontré la línea "Cursos e inscripción"');
s = s.slice(0, c) + s.slice(s.indexOf('</div>', c) + 6).replace(/^\n/, '');
// 4 · UTM de la campaña de enero
s = s.split('utm_campaign=educadores_oct').join('utm_campaign=educadores_ene');
const plano = s.replace(/<[^>]+>/g, '');
if (/octubre|Octubre_2026|US\$/.test(plano)) console.log('OJO: queda texto de octubre o precio:', (plano.match(/.{0,40}(octubre|US\$).{0,40}/g) || []).join(' | '));
fs.writeFileSync(OUT, s, 'utf8');
console.log('OK', OUT);
