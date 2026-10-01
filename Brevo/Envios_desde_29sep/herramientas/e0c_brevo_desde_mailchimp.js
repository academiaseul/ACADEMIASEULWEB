// Genera E0c_Institucion_Brevo.html a partir de E0c_Institucion_Mailchimp.html: mismo cuerpo, etiquetas de Brevo.
// Cambian solo el <title>, el saludo, la firma y el pie legal (con el estilo de la plantilla académica). Después, validar con preview.js.
// Uso: node Brevo/Envios_desde_29sep/herramientas/e0c_brevo_desde_mailchimp.js
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..');
let s = fs.readFileSync(path.join(dir, 'E0c_Institucion_Mailchimp.html'), 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('No encontré: ' + a); s = s.split(a).join(b); };
rep('<title>*|MC:SUBJECT|*</title>', '<title>Academia Seúl · coreano para la sala de clases</title>');
rep('*|IF:FNAME|*Hola, *|FNAME|*:*|ELSE:|*Hola, profe:*|END:IF|*', 'Hola, {{ contact.FIRSTNAME|default:"profe" }}:');
rep('Un saludo cordial,<br><strong>*|LIST:COMPANY|*</strong>', 'Un saludo cordial de todo nuestro equipo.');
// el saludo ya no tiene *|END:IF|*, así que el primero que queda es el de REWARDS, al final del pie
const footerMC = s.slice(s.indexOf('*|LIST:DESCRIPTION|*'), s.indexOf('*|END:IF|*') + '*|END:IF|*'.length);
rep(footerMC, [
  'Recibes este correo porque estás en la lista de contactos de nuestra institución.<br>',
  '<a href="{{ unsubscribe }}" target="_blank" style="color:#003478;text-decoration:underline;">Darme de baja</a> &middot; <a href="{{ mirror }}" target="_blank" style="color:#003478;text-decoration:underline;">Ver en el navegador</a>',
].join('\n'));
const quedan = s.match(/\*\|[^|]*\|\*/g);
if (quedan) throw new Error('Quedan etiquetas de Mailchimp: ' + quedan.join(' '));
fs.writeFileSync(path.join(dir, 'E0c_Institucion_Brevo.html'), s, 'utf8');
console.log('OK · E0c_Institucion_Brevo.html ·', Buffer.byteLength(s), 'bytes');
