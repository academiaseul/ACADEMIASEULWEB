# Plan del bot vendedor y community manager · WhatsApp e Instagram · noviembre de 2026

**Para Jay.** Lo pidió el 2 de noviembre de 2026: «un bot vendedor / community manager de mensajes automatizado por WhatsApp y contacto, para hacer seguimiento, buscar contactos y ofrecer nuestros servicios, para @jaychingu.oficial y @academiaseul».

Versión para el celular, con los textos listos para copiar: https://claude.ai/artifact/Phh3erZsHZoGSzhvfCBE4y

## 0 · Veredicto

Se puede automatizar la PUERTA (quién llega, qué recibe, cómo queda etiquetado), no la VENTA: el cierre lo sigue haciendo Jay a mano, porque eso es justo lo que hace funcionar @jaychingu.oficial.
Esta semana y gratis: app de WhatsApp Business con el mismo número (bienvenida + ausencia + 50 respuestas rápidas, ya están escritas en Embudo_Costo_Octubre_2026.md) y ManyChat Free sobre Instagram DM de @jaychingu.oficial con comentario→DM por palabra clave.
Lo que NO se puede hacer nunca: que el bot escriba primero. Meta lo prohíbe (Developer Policy 5.2.a y la política de WhatsApp exigen opt-in) y en Chile la Ley 21.719 entra en vigencia el 1 de diciembre de 2026 (en 29 días). Comprar o extraer contactos = número bloqueado y riesgo de perder @jaychingu.oficial, que es el activo irreemplazable.
El «buscar contactos» de Jay sí tiene versión legal y rinde más: reels con palabra clave → DM automático con el imán gratis, imanes con casilla de consentimiento, posts en colaboración y un anuncio Click-to-WhatsApp de US$21 que abre 7 días de conversación sin costo de mensajes.
Presupuesto: US$0 esta semana, US$14 a US$35 en noviembre, y la decisión de la API de WhatsApp recién en enero de 2027 con datos propios. No pagar ManyChat Pro (US$39) ni dos suscripciones hoy.

## 1 · Seis correcciones que mandan sobre todo lo demás

Cuatro revisores adversariales (riesgo de bloqueo · legal · venta · proporción) encontraron 73 problemas en el borrador, 13 de ellos bloqueantes. Estas seis son las que cambian lo que hay que hacer. **Donde el resto del documento diga otra cosa, manda esta sección.**

### 1 · El permiso se parte en tres y no se cruza nunca

**El problema.** El plan pide el permiso en un DM de Instagram («¿te aviso por aquí?») y después usa esa misma etiqueta para autorizar plantillas de marketing por WhatsApp. No sirve: en ese flujo nunca hubo número de teléfono, nunca se nombró WhatsApp y nunca se habló de correo.

**La regla.** Tres etiquetas distintas: **7a Permiso Instagram**, **7b Permiso WhatsApp**, **7c Permiso correo**. Un DM solo a 7a, una plantilla de WhatsApp solo a 7b, un correo de Brevo solo a 7c, y **ninguna se deriva de otra**. Donde el documento dice «7 Consentimiento OK», lee la del canal que corresponde. Y el texto del permiso tiene que ser informado: nombrar a Academia Seúl y a Jay Kim como responsable, decir el canal, decir qué se hace con el dato, mencionar los derechos de acceso, rectificación y supresión, y enlazar /privacidad. «Te aviso por aquí» no es consentimiento informado.

### 2 · La baja NO es automática en WhatsApp

**El problema.** El plan declara que la respuesta a BAJA es el automático que no puede fallar nunca, y la promete en todos los mensajes. Pero la app de WhatsApp Business no tiene automatización por palabra clave: solo mensaje de bienvenida, mensaje de ausencia, respuestas rápidas que se pegan a mano y etiquetas. La persona escribiría BAJA y no le contestaría nadie.

**La regla.** Automática **solo en Instagram** (ManyChat, coincidencia «contiene», con y sin tilde). En **WhatsApp es a mano**: respuesta rápida `/baja`, etiqueta «14 NO ESCRIBIR (fecha)» y sacarla de Brevo el mismo día. Entra como **primer punto** de la rutina de cierre de las 21:30, antes de los DMs, y se revisa también a las 09:00.

### 3 · ManyChat Free no alcanza si la cosa funciona

**El problema.** Todo el motor de captación cuelga de ManyChat Free: 25 contactos activos al mes. El mejor reel de Jay tiene 803 me gusta con 793 seguidores — un reel mediano pasa de 25 comentaristas en horas. Cuando se agota el cupo la automatización deja de responder **sin avisar**: el reel sigue juntando comentarios y nadie recibe nada.

**La regla.** Si vas a anunciar una palabra clave en más de una pieza, contrata **Essential (US$14 al mes pagando el año, o US$17 mensual, 250 contactos)** antes de publicarla, no después. Son US$17 por toda la campaña: el 14 % de una matrícula. Si no quieres pagar nada esta semana, anuncia la palabra clave en **un solo reel y una sola historia**, y revisa el cupo en ManyChat cada día.

### 4 · El test de nivel no da el resultado en pantalla

**El problema.** Seis textos del bot prometen que el test «te da el resultado al instante en pantalla» y uno lo mete en la lista de lo gratis que termina con «no tienes que darme nada a cambio». Es falso: en `app/test-nivel/page.tsx` el botón «Ver mi resultado» está deshabilitado mientras no haya nombre **y** correo (línea 250). El resultado está detrás de un muro de correo.

**La regla.** Mientras el test sea así, en todos esos textos va: «El test son 10 preguntas, es gratis y **te llega el resultado al correo** con la guía del alfabeto: academiaseul.com/test-nivel». Y el test **sale** de la lista de `/gratis`. Aparte: mostrar el resultado en pantalla y pedir el correo después es media hora de desarrollo. Dime y lo hago.

### 5 · El pago con tarjeta al precio de lanzamiento ya funciona solo

**El problema.** El plan dice que «no hay links de pago de US$120/US$60, así que todo el que dice sí pasa obligatoriamente por Jay». Es falso y es el error más caro, porque está justo en el paso del dinero: `app/api/checkout/route.ts` calcula el monto en el servidor y cobra $120.000 o $60.000 CLP hasta el domingo 8. Lo que no existe son los links **estáticos** de Mercado Pago y PayPal, que es otra cosa.

**La regla.** El bot **sí** entrega el camino de pago: formulario en `academiaseul.com/inscribete?clase=a11-martes` → botón de tarjeta → Mercado Pago. Compruébalo una vez desde el celular antes de activar los textos. Si cae a WhatsApp, falta `MP_ACCESS_TOKEN` en Vercel y me lo dices.

### 6 · Hoy no caben 3 ni 4 horas de esto

**El problema.** La Fase 1 pedía 3 a 4 horas hoy lunes y mañana martes. Hoy tienes que ir a la oficina y el plan de la semana ya tiene el lunes lleno, con cuatro bloques marcados «no se cae». Ese plan presupuesta 20 minutos para el bot, a las 11:25.

**La regla.** **Fase 1a · hoy, 20 minutos y nada más:** en ManyChat, tres palabras clave en @jaychingu.oficial — PRECIO (flujo 1), INSCRIBIRME (flujo 2) y LECTOR (flujo 4) — y en @academiaseul la respuesta instantánea nativa de Meta Business Suite. **Fase 1b · hoy en la noche, 35 min:** bienvenida, ausencia y seis respuestas rápidas en WhatsApp Business: `/costo`, `/b1`, `/pago`, `/hora`, `/certi`, `/enero`. **El resto (las otras 24 respuestas rápidas, las 16 etiquetas, los flujos 5 a 10) pasa al miércoles 4 y al jueves 5.** El plan de la semana manda sobre el lunes.

### Hallazgo aparte, en el código: el formulario de inscripción pide tu RUT

`app/nivel-1/page.tsx` línea 589 tiene un campo de documento de identidad con el texto «RUT o ID — lo pediremos al emitir el certificado». Es opcional (si va vacío se guarda «(pendiente)»), pero mientras esté ahí el formulario trata un identificador nacional que nadie necesita todavía, y la **Ley 21.719 entra en vigencia el 1 de diciembre de 2026** — en 29 días. El propio texto del campo dice cuándo hace falta: al emitir el certificado, en diciembre, y entonces se puede pedir uno a uno por WhatsApp.

**No lo toqué, porque es tu formulario y estamos en matrícula.** Mi recomendación es sacarlo hoy; son dos minutos y un deploy. Dime y lo hago.

## 2 · La decisión del número de WhatsApp

RECOMENDACIÓN: no conectar el +56 9 4211 5562 a la API de WhatsApp. Hacer dos cosas, en este orden exacto.

PASO 1 (hoy, gratis, 20 minutos, sin riesgo): pasar el +56 9 4211 5562 de WhatsApp normal a la app de WhatsApp Business. El repo dice que Jay usa WhatsApp normal (Plan_Choque_20sep_13oct_2026.md línea 381; Embudo_Costo_Octubre_2026.md tiene una sección entera titulada «Seguimiento sin WhatsApp Business»), pero es de septiembre: lo primero es mirar el teléfono (Ajustes → ¿aparece «Herramientas para la empresa»?). Si no aparece: respaldar el chat y migrar a la app Business con el MISMO número. La migración dentro del teléfono conserva los chats y es gratis. Con eso Jay gana hoy mensaje de bienvenida automático, mensaje de ausencia, 50 respuestas rápidas con «/» y etiquetas por estado del lead: el 70 % de lo que pidió como «community manager automatizado», sin API, sin plantillas y sin pagar nada. Además deja la puerta abierta a Coexistence más adelante, que es lo contrario de lo que pasa si el número se queda en la app personal.

PASO 2 (cuando y si se quiere bot de WhatsApp, no antes de enero de 2027): comprar un chip prepago chileno nuevo y usar ESE número para la API/ManyChat. El +56 9 4211 5562 queda como el número humano de Jay.

QUÉ SE PIERDE EN CADA CASO:
· Si se migra el +56 9 4211 5562 directo a la Cloud API: la documentación oficial de Meta es explícita — «your existing messaging history will be lost» y el número queda «unable to use that number with the WhatsApp Business app again» salvo que se dé de baja de la API. O sea: se pierden las conversaciones con los ex-alumnos de julio y con el grupo de Básico 2 en curso, y el celular deja de servir para contestar a mano, que es exactamente lo que hoy funciona. Esto no se hace.
· Si se usa Coexistence (la única ruta que conserva historial y app): Meta dice que «your messaging history will be preserved» y que se pueden usar la app y el proveedor a la vez. Pero es frágil y está en beta en ManyChat: el propio blog de ManyChat dice que solo sirve para números nuevos y que no se puede pasar un número ya conectado por el método antiguo; Meta advierte que si el cliente cambia de dispositivo o vuelve a registrar la app de WhatsApp Business, «su compañero de Cloud API se da de baja automáticamente». Jay cambia de celular una vez y el bot se cae solo. Y no está confirmado que Coexistence esté disponible para números +56.
· Si se usa un segundo número: no se pierde nada de lo publicado. El costo es que hay dos canales que atender y que, si algún día el bot pasa a ser el canal principal, habría que cambiar el número en la web (lib/nivel1.ts y componentes), en los PDF de public/programas/, en el folleto, en la hoja resumen, en los correos de Brevo y en los diseños de Campana_Assets. Por eso, mientras el bot sea una prueba, el número nuevo NO se publica en ninguna pieza: se usa solo como destino de los anuncios Click-to-WhatsApp y de los links wa.me de prueba. Si la prueba funciona, recién entonces se evalúa el cambio, con una semana de redirección («este número sigue activo, escríbenos al …»).
· Si el bot no se hace nunca: Jay no pierde nada importante. La app de WhatsApp Business gratis cubre bienvenida, ausencia, respuestas rápidas y etiquetas, y el riesgo del número queda en cero.

ADVERTENCIA DE RIESGO CONCENTRADO: el +56 9 4211 5562 está impreso en toda la web, los correos, el folleto y la hoja resumen. Si Meta lo marca Flagged 7 días seguidos le baja el límite de inmediato, y la escalera de sanciones llega hasta el bloqueo indefinido. Un solo número que es a la vez canal de ventas, canal de alumnos y número publicado no debería ser nunca el que haga envíos automatizados.

QUÉ VERIFICAR ANTES DE PAGAR O TOCAR ALGO (5 minutos de Jay, hoy):
1. ¿El +56 9 4211 5562 está en WhatsApp normal o en WhatsApp Business? (ícono y Ajustes → Herramientas para la empresa).
2. Ajustes → Difusiones: ¿aparece un tope mensual de difusiones? (hay reportes de ~35 al mes, no confirmado para Chile).
3. manychat.com/pricing abierto en su navegador: nombre de los planes, precio mensual y anual, contactos incluidos y en qué plan aparece WhatsApp. Las cifras de este plan vienen de análisis de terceros; la página oficial bloquea la lectura automática.
4. En el checkout de ManyChat: si la IA viene incluida en Pro o se cobra US$29 aparte (son US$348 al año de diferencia).
5. senado.cl, Boletín 18.623-07: si la Ley 21.719 se postergó a 2027 o sigue entrando el 1 de diciembre de 2026.

## 3 · Las fases

### Fase 0 · Verificar y no romper nada

**Cuándo:** Hoy, lunes 2 de noviembre (antes de cualquier otra cosa) · **Costo:** US$0 al mes · puesta en marcha US$0 · **Tiempo tuyo:** 30 minutos

**Qué desbloquea:** Es la bifurcación del proyecto: sin saber qué app tiene el número, cualquier paso puede borrar el historial de los alumnos de julio y de Básico 2. También evita pagar un plan equivocado.

- Mirar el teléfono: ¿el +56 9 4211 5562 está en WhatsApp normal o en WhatsApp Business? (Ajustes → ¿existe «Herramientas para la empresa»?)
- Respaldar el historial de WhatsApp en Google Drive antes de tocar la app
- Abrir manychat.com/pricing y la pantalla de facturación de la cuenta de Jay: anotar plan actual, precio en CLP y si la IA está incluida
- Ajustes → Difusiones: ver si Chile ya tiene tope mensual de difusiones gratis
- Revisar en senado.cl el Boletín 18.623-07 (postergación de la Ley 21.719)
- Anotar las 5 respuestas en un solo lugar: de ahí sale la decisión de las fases 4 y 5

_Requisitos:_
- El teléfono de Jay
- El login de ManyChat

### Fase 1 · El community manager gratis (lo que ayuda a llenar la clase del martes 10)

**Cuándo:** Hoy lunes 2 y mañana martes 3 de noviembre · **Costo:** US$0 al mes · puesta en marcha US$0 · **Tiempo tuyo:** 3 a 4 horas en total (2 h de respuestas rápidas, 1 h de ManyChat, 1 h de grabar los dos reels)

**Qué desbloquea:** Cubre el 70 % de lo que Jay pidió, hoy y gratis: responde solo a quien escribe, entrega el imán sin que Jay esté frente al teléfono, deja los leads etiquetados y libera a Jay para la única cosa que no se puede automatizar, que es cerrar la venta. Es lo único de este plan que puede sumar alumnos antes del martes 10.

- Migrar el +56 9 4211 5562 a la app de WhatsApp Business (gratis, conserva los chats, mismo número; NO conectar a ninguna API)
- Mensaje de bienvenida automático: «Hola, soy del equipo de Academia Seúl 안녕하세요. Básico 1 empieza el martes 10 de noviembre, 20:00 hora de Chile, con la profesora Kiran. US$120 el curso completo · o 2 cuotas de US$60 hasta el domingo 8. Cuéntame: ¿es tu primera vez con el coreano? Jay te responde en persona hoy mismo. Si no quieres más avisos, responde BAJA.»
- Mensaje de ausencia con horario real de respuesta y el link academiaseul.com/inscribete?clase=a11-martes
- Volcar a respuestas rápidas (máx. 50) los textos que YA están escritos en Lanzamiento_Octubre_2026/alumnos/Embudo_Costo_Octubre_2026.md (;costo, ;cursos, ;pago, ;cuotas, ;caro, ;hora, ;certi, ;vivo, ;espanol, ;enero) y en Kit_Como_Me_Inscribo_Octubre_2026.md, actualizados a US$120/US$60 y al martes 10
- Etiquetas: 1 Interesado · 2 Formulario sin pago · 3 Inscrito · 4 Enero 2027 · 5 NO ESCRIBIR (baja)
- ManyChat Free conectado SOLO a @jaychingu.oficial: 3 automatizaciones de comentario→DM por palabra clave (LECTOR → academiaseul.com/lector-coreano · DUBU → /dubu · CLASE → /inscribete?clase=a11-martes)
- El DM automático lleva: el imán + una pregunta que obliga a responder + «sígueme para que el mensaje te llegue a la bandeja y no a Solicitudes» (es UN solo mensaje por persona, no hay segundo intento)
- En @academiaseul: respuestas automáticas nativas gratis de Meta Business Suite (instantánea, ausencia, 5 palabras clave: PRECIO, HORARIO, CLASE, GRATIS, CERTIFICADO). Cero pago en esta cuenta.
- Un reel el lunes y otro el miércoles en @jaychingu.oficial con la palabra clave en el texto y en el audio
- Link wa.me con texto prellenado para bio, reels y DMs: wa.me/56942115562?text=Hola%2C%20quiero%20info%20de%20B%C3%A1sico%201
- HANDOFF A JAY, escrito como regla: en el momento en que la persona pregunta precio, forma de pago, nivel o certificado, el bot deja de responder y le avisa a Jay. El bot nunca manda links de pago ni afirma nada del certificado.

_Requisitos:_
- Fase 0 hecha
- @jaychingu.oficial como cuenta profesional conectada a una página de Facebook
- Nada de pagar: ManyChat Free y Meta Business Suite bastan

### Fase 2 · Captación limpia para el cierre de matrícula

**Cuándo:** Miércoles 4 a domingo 8 de noviembre · **Costo:** US$0 al mes · US$21 una sola vez por el anuncio de prueba (opcional) · **Tiempo tuyo:** 1 hora al día de lunes a domingo, más 2 horas el miércoles para armar el anuncio y los mensajes 1 a 1

**Qué desbloquea:** Es la respuesta real al «buscar contactos»: trae gente nueva que levanta la mano por voluntad propia, sin tocar la política de Meta ni la ley chilena, y deja el primer dato propio de costo por contacto para decidir si vale la pena escalar.

- Jay escribe 1 a 1 por WhatsApp a los ex-alumnos de julio y al grupo de Básico 2 (no difusión masiva, no plantilla): es el canal más rentable y es legal en todos los países porque hay relación contractual previa y Básico 1 es un servicio similar
- Difusión (solo app, gratis) a quienes YA tienen guardado el número de la academia, avisando el cierre del lunes 9 y el precio de lanzamiento hasta el domingo 8. Probar primero con una lista de 10 para ver si Chile ya tiene tope mensual
- Correo por Brevo a 01 Leads sitio y P1 (18 contactos calientes): asunto claro, remitente identificado y baja visible, como exige el art. 28 B de la Ley 19.496. Etiquetar el país de cada contacto y excluir España de cualquier envío que no califique por el art. 21.2 de la LSSI
- 3 a 5 reels más en @jaychingu.oficial con palabra clave (es la cuenta que rinde: 793 seguidores y un reel de 803 me gusta, contra 3–12 me gusta en @academiaseul)
- Anuncio Click-to-WhatsApp de prueba: US$3 al día por 7 días (US$21 en total) desde @jaychingu.oficial, apuntando a Chile y México, con el texto del embudo «¿cuál es el costo?». Ventaja verificada: ese anuncio abre una ventana de entrada gratuita de hasta 7 días en la que Meta no cobra los mensajes. Medir costo por conversación iniciada en Ads Manager: no existe benchmark público confiable para Chile, el dato tiene que ser propio
- Escribir a 3 cuentas afines para un post en colaboración (Collab, hasta 5 cuentas): K-pop y K-dramas en español, taekwondo (ya hay precedente), centros culturales coreanos. El post sale desde @jaychingu.oficial y cierra con la palabra clave
- Casilla de opt-in en el formulario de /taller y en el de Formspree mzdypyky: vacía, opcional y SEPARADA de la que da acceso al material («Acepto recibir mensajes de Academia Seúl sobre cursos y material gratis. Puedo pedir que paren cuando quiera»). Sin esa casilla, los leads del sitio no están habilitados para que nadie les escriba primero
- Automatización STOP: si alguien escribe BAJA, STOP, CANCEL o UNSUBSCRIBE en cualquier canal, se etiqueta 5 NO ESCRIBIR y se da de baja en Brevo y en ManyChat el mismo día

_Requisitos:_
- Fase 1 funcionando
- Un método de pago en la cuenta publicitaria de Meta
- Casilla de opt-in publicada antes de meter un solo contacto nuevo en Brevo

### Fase 3 · Cierre de matrícula a mano

**Cuándo:** Lunes 9 (hasta 23:59) y martes 10 de noviembre · **Costo:** US$0 al mes · **Tiempo tuyo:** 3 a 4 horas el lunes 9, 1 hora el martes 10

**Qué desbloquea:** Convierte en alumnos lo que trajeron las fases 1 y 2 sin quemar el número. Aquí es donde queda clarísimo que el bot es portero y Jay es el vendedor.

- El lunes 9 el bot queda en modo «atender», no en modo «vender»: la bienvenida cambia a «la matrícula cierra hoy a las 23:59, cuéntame y Jay te responde ahora»
- Jay revisa a mano Formspree, Mercado Pago, PayPal y el banco, y contesta a cada persona en persona. No hay secuencia de 7 mensajes: Meta deja de entregar a quien no abre (error 131049) y lo que castiga son los reportes negativos
- Recordar que no hay links de pago de US$120/US$60: el lanzamiento se paga por WhatsApp, así que todo el que dice «sí» pasa obligatoriamente por Jay
- Martes 10: quitar el precio de lanzamiento de la metadata de app/nivel-1/layout.tsx y redesplegar; si la clase no abre, estado: "enero_2027" o COHORTE_ABIERTA = false
- Cambiar la bienvenida a la versión post-cierre: «la clase de Básico 1 ya empezó; la siguiente es en enero de 2027, ¿te aviso?» + los imanes gratis

_Requisitos:_
- Fases 1 y 2 hechas

### Fase 4 · Cumplimiento y medición antes del 1 de diciembre

**Cuándo:** Miércoles 11 a lunes 30 de noviembre (fecha tope: 30 de noviembre) · **Costo:** US$0 a US$17 al mes · puesta en marcha US$0 (más, si Jay quiere, 1 hora de abogado chileno de datos) · **Tiempo tuyo:** 1 jornada repartida en el mes, más media a una jornada de desarrollo por cada página de imán

**Qué desbloquea:** Deja la base de contactos usable y defendible: cada contacto con su origen demostrable. Reconstruir esto en diciembre, con la base ya cargada, cuesta mucho más que hacerlo ahora.

- Política de privacidad: revisar /terminos para que diga qué datos se guardan, para qué, por cuánto tiempo, y que se usan Instagram/Messenger y ManyChat (las Platform Terms 4.c de Meta lo exigen). Resolver también el correo de contacto (hola.academiaseul@gmail.com vs hola@academiaseul.com), que está pendiente desde octubre
- Registro de consentimiento: guardar fecha, hora y el texto exacto aceptado por cada contacto, en Brevo y en ManyChat. La carga de probar el consentimiento es de la empresa
- Lista única de exclusión que Jay revisa antes de cada envío (hoy no existe en ningún lado)
- Casilla de opt-in en los otros imanes: Lector de Hangul, Dubu, 한글 Race, generador de nombre y test de nivel. Regla no negociable: casilla vacía, opcional, y el material se entrega igual si no la marca (no se puede condicionar la descarga a aceptar publicidad)
- Aviso de finalidades completo desde el principio (México, art. 11 de la nueva LFPDPPP: si el formulario solo dice «para enviarte el material», usar después ese correo para vender exige pedir permiso otra vez)
- Un estándar único para toda la base, el más alto (España y Perú exigen opt-in previo expreso): una sola regla, un solo formulario, cero decisiones por contacto
- Instalar analítica (Vercel Analytics o Plausible): hoy no se sabe cuánto tráfico tienen /lector-coreano, /dubu, /hangul-race, /taller ni el test de nivel, y sin eso no se puede priorizar qué imán convertir primero
- Evaluar pasar ManyChat de Free a Essential (US$14–17 al mes, 250 contactos) solo si los 25 contactos activos del plan Free se llenaron

_Requisitos:_
- Saber si la Ley 21.719 se postergó (Fase 0, punto 5). Si no se postergó, esto NO es opcional y la fecha tope es el 30 de noviembre

### Fase 5 · Decidir el bot de WhatsApp con datos propios

**Cuándo:** Diciembre de 2026 (decisión) · enero de 2027 (ejecución, junto con la vuelta de los otros cursos) · **Costo:** US$18 a US$39 al mes · puesta en marcha: un chip prepago (unos pocos miles de pesos) + US$5 en el Wallet para la prueba de cobro · **Tiempo tuyo:** 1 jornada de configuración, más 2 a 3 horas de plantillas

**Qué desbloquea:** El bot vendedor de WhatsApp de verdad, con seguimiento fuera de la ventana de 24 h, pero recién cuando el negocio lo justifique y sobre un número que, si se quema, no rompe nada de lo publicado.

- Revisar los números de noviembre: conversaciones iniciadas, costo por contacto del anuncio, contactos activos usados en ManyChat, alumnos cerrados. Si Básico 1 no abrió, esta fase no se hace: se vuelve a la Fase 1 y se espera enero
- Comparar ManyChat Pro (US$29 al mes anual / US$39 mensual, WhatsApp recién aparece desde Pro) contra Chatfuel Business S (US$18 al mes anual, incluye WhatsApp e Instagram en el mismo plan y sin límite de contactos, solo de créditos). Descartados por precio: Wati US$45 (solo WhatsApp), respond.io US$79–99, 360dialog €49 (API cruda, sin bandeja)
- Comprar un chip prepago chileno nuevo para el bot. NO conectar el +56 9 4211 5562
- Crear y mandar a aprobar las plantillas 48 h antes de cualquier campaña: la revisión «puede tardar hasta 24 horas». Regla de la casa: nada de precio, descuento ni «últimos cupos» dentro de una plantilla declarada utility, porque la mala categorización está nombrada expresamente por Meta como causa de sanción. El precio de lanzamiento va en marketing y se paga
- Cargar US$5 en el Manychat Wallet, mandar 10 mensajes y comparar el cobro real contra la tarifa de Meta (las tablas publicadas por ManyChat son exactamente 1,15× las de Meta en marketing y utility)
- Nunca campañas de marketing por WhatsApp a Estados Unidos: Meta no entrega plantillas de marketing a números de EE. UU. y devuelve error. Para ellos, correo y DM de Instagram
- Si se hace alguna campaña de marketing pagada, empezar por Colombia (≈US$0,0125 por mensaje) y México (≈US$0,0397), no por Chile (≈US$0,0889: una difusión a 1.000 chilenos se come el 74 % de una matrícula)
- Postular a Official Business Account (insignia AZUL, es gratis; el check verde ya no existe): requiere 30 días en la plataforma y verificación del portafolio. No es urgente, pero compra confianza en gente que paga US$120 por adelantado desde otro país
- Programa de referidos «trae un chingu» con link propio: el amigo se inscribe él mismo en academiaseul.com/inscribete. Nunca pedirle el teléfono del amigo

_Requisitos:_
- Fases 1 a 4 hechas
- Al menos una clase abierta y funcionando
- Precio de ManyChat confirmado en pantalla
- Soporte de ManyChat consultado sobre si Coexistence existe para números +56

## 4 · El stack y lo que cuesta

| Herramienta | Para qué | Precio | Alternativa |
|---|---|---|---|
| App de WhatsApp Business (mismo número +56 9 4211 5562) | Bienvenida automática, mensaje de ausencia, 50 respuestas rápidas con «/», etiquetas por estado del lead, difusión a quien ya tiene el número guardado. Es el community manager automatizado de Jay, sin API. | US$0 al mes (gratis; los mensajes enviados desde la app no tienen cargo de Meta) | Meta One Essential, desde US$14,99 al mes: agrega insignia verificada, canal verificado y más acceso a Meta Business Agent para responder 24/7, sin tocar la Cloud API. El plan Advanced (US$49,99) trae los créditos de difusión, que importan si Chile ya tiene el tope mensual. Hay que mirar qué planes aparecen efectivamente en la app de Jay en Chile. |
| ManyChat Free, conectado solo a @jaychingu.oficial | Comentario→DM por palabra clave en Instagram (LECTOR, DUBU, CLASE), respuestas a historias y menciones. Es el único motor de captación que Meta bendice. | US$0 al mes con 25 contactos activos, 1 usuario, hasta 4 automatizaciones y 2 canales. Instagram está incluido en Free; WhatsApp y la IA recién aparecen en Pro. | ManyChat Essential US$14–17 al mes con 250 contactos, cuando los 25 de Free se llenen (es el salto correcto, NO Pro). Alternativa real: Chatfuel Business S, US$18 al mes facturado anual, que incluye WhatsApp e Instagram en el mismo plan y no limita contactos sino créditos, y además no tiene el problema de «una cuenta de Instagram por cuenta de ManyChat». |
| Automatizaciones nativas gratis de Meta Business Suite, en @academiaseul | Respuesta instantánea, mensaje de ausencia y hasta 5 palabras clave en la cuenta de marca, que rinde 60 veces menos (3–12 me gusta por post). Así no se paga una segunda suscripción. | US$0 al mes | Preguntas frecuentes de la app de Instagram (hasta 4 preguntas con respuesta automática). Lo que NO se recomienda: una segunda cuenta de ManyChat para @academiaseul, porque cada cuenta admite una sola cuenta de Instagram y eso cuesta US$168–348 al año extra para la cuenta que menos rinde. |
| Brevo (ya en uso) | Correo a 01 Leads sitio, 02g Básico 1 noviembre y P1. Único canal válido para los contactos de España, donde el art. 21.1 de la LSSI exige opt-in previo expreso. | US$0 al mes en el plan gratuito (300 correos al día, muy por encima de lo que necesita una base de 18 contactos calientes); confirmar en la cuenta de Jay | Brevo Starter desde US$9 al mes si algún día hacen falta más de 300 correos diarios o quitar el logo (complemento de US$12). MailerLite si Brevo sube de precio. El presupuesto de este plan NO debe ir al correo. |
| Anuncios Click-to-WhatsApp desde @jaychingu.oficial (Meta Ads) | La única forma legal de que «lleguen contactos nuevos» a WhatsApp. Abre una ventana de entrada gratuita de hasta 7 días en la que Meta no cobra los mensajes: se paga el anuncio, no la conversación. | US$3 al día. Prueba recomendada: US$21 en 7 días. No hay benchmark público confiable de costo por conversación para Chile: el dato se mide en Ads Manager. | Reels orgánicos con palabra clave en @jaychingu.oficial: US$0 y es lo que ya funciona (mejor reel: 803 me gusta). Si el anuncio no trae ninguna conversación en 7 días, se apaga y se perdieron US$21, no un presupuesto. |
| Vercel Analytics o Plausible en academiaseul.com | Saber cuánto tráfico tienen /lector-coreano, /dubu, /hangul-race, /taller, el generador de nombre y el test de nivel. Sin eso no se puede priorizar qué imán convertir en capturador. | US$0 a US$9 al mes según plan | Links con UTM distintos por imán y conteo a mano de los envíos de Formspree. Gratis, menos preciso, suficiente para empezar. |
| Formspree mzdypyky (ya en uso) con casilla de opt-in | Capturar el dato con consentimiento registrado: fecha, hora y texto aceptado. Es el requisito que vuelve usable toda la base ante la Ley 21.719. | US$0 al mes (plan actual) | Formulario nativo de Brevo, que guarda el consentimiento en el mismo lugar que la lista y ahorra el paso de importar. Vale la pena evaluarlo antes del 1 de diciembre. |
| ManyChat Pro o Chatfuel, para el bot de WhatsApp (solo Fase 5) | Automatizar WhatsApp de verdad: plantillas de seguimiento fuera de la ventana de 24 h, bandeja compartida, flujos. Sobre un número nuevo, nunca sobre el +56 9 4211 5562. | ManyChat Pro US$29 al mes pagando el año (US$348) o US$39 mensual, 2.500 contactos · Chatfuel Business S US$18 al mes anual. Encima va el consumo de mensajes de Meta, que para este volumen es casi cero: 1.000 mensajes de service gratis al mes por número. | No contratarlo. Descartados por precio y tamaño: Wati US$45 al mes (solo WhatsApp, no resuelve Instagram), respond.io US$79–99 (US$948 al año, más que un curso completo de 8 alumnos), 360dialog €49 (API cruda sin bandeja, obliga a armar todo con n8n o Make). |

## 5 · Lo que NO se hace nunca

- No comprar bases de contactos ni extraer números de grupos, comentarios o seguidores. Consecuencia: la sección 3.2 de los Términos de Meta prohíbe recopilar datos con medios automatizados «independientemente de si dicho acceso se realiza mientras tienes la sesión iniciada», y WhatsApp bloquea cuentas por sospecha de scraping. En Chile, la Ley 21.719 (vigente el 1 de diciembre de 2026) clasifica tratar datos sin base de licitud como infracción GRAVE, con multa de hasta 10.000 UTM (≈ CLP 724 millones con la UTM de noviembre, $72.440). Riesgo peor que la multa: perder @jaychingu.oficial, que no se recupera.

- No conectar el +56 9 4211 5562 directamente a la Cloud API. Consecuencia: Meta lo dice textual — «your existing messaging history will be lost» y el número queda inhabilitado para la app de WhatsApp Business. Se pierden las conversaciones con los ex-alumnos de julio y con el grupo de Básico 2, y el celular deja de servir para contestar a mano.

- No registrar el número en la app PERSONAL de WhatsApp si algún día se quiere Coexistence. Consecuencia: ManyChat no puede tomar por Coexistence un número que está en la app personal ni uno ya conectado por el método antiguo, y la puerta se cierra sin aviso.

- No poner un bot que salude a cada nuevo seguidor ni que escriba a quien da «me gusta». Consecuencia: no existe ese disparador en la API oficial de Meta. Cualquier herramienta que lo prometa automatiza el teléfono por fuera y pone en riesgo las DOS cuentas de Instagram a la vez.

- No escribir primero por Instagram ni por WhatsApp a nadie que no haya escrito antes o dado permiso. Consecuencia: la Developer Policy 5.2.a de Meta lo prohíbe («No te pongas en contacto con personas a través de mensajes de Messenger o Instagram, a menos que hayas obtenido la aceptación requerida») y la política de WhatsApp exige opt-in confirmado. La escalera de sanciones va de aviso a bloqueo de 1–3 días, 5–30 días, bloqueo indefinido y baja permanente.

- No escribir primero a ningún contacto de España, ni por correo ni por WhatsApp, salvo que haya marcado la casilla o sea ex-alumno. Consecuencia: el art. 21.1 de la LSSI exige autorización expresa previa; las multas citadas van de 30.000 € (leve) a 150.000 € (grave, envío masivo o insistente). Los ex-alumnos españoles de julio sí califican por la excepción del art. 21.2, siempre que el mensaje hable de cursos de coreano y lleve vía de baja.

- No usar difusiones como canal de campaña. Consecuencia doble: la difusión solo llega a quien tiene el número guardado (a un lead nuevo simplemente no le llega), y hay un tope mensual de difusiones gratis en despliegue, reportado en torno a 35 al mes. Además, WhatsApp advierte que el uso frecuente de difusiones lleva a que la gente reporte y «baneamos cuentas que son reportadas varias veces». La difusión sirve para alumnos y ex-alumnos, no para captar.

- No poner precio, descuento, «últimos cupos» ni «US$120 hasta el domingo» dentro de una plantilla declarada utility. Consecuencia: Meta nombra expresamente la mala clasificación de plantillas como causa de sanción. El precio de lanzamiento va en categoría marketing, y se paga (Chile ≈US$0,0889 por mensaje).

- No armar una secuencia de 5 o 7 mensajes de seguimiento. Consecuencia: el límite por usuario de plantillas de marketing es adaptativo y Meta deja de entregar (error 131049); reintentar antes de 24 horas puede bloquear la entrega a esa persona otras 24 h. Pocos toques, bien escritos, y con una pregunta que provoque respuesta: si responde, se abre la ventana de 24 h y los mensajes dejan de contar.

- No hacer campañas de marketing por WhatsApp a números de Estados Unidos. Consecuencia: la documentación oficial de Meta dice que WhatsApp no entrega plantillas de marketing a números de EE. UU. y devuelve error. Para los hispanohablantes de EE. UU.: correo por Brevo, DM de Instagram y la ventana de 24 h cuando ellos escriban.

- No condicionar la entrega de un imán gratis a aceptar publicidad, ni dejar la casilla premarcada. Consecuencia: la Ley 21.719 da derecho a oponerse al marketing directo y la casilla premarcada no vale como consentimiento; la carga de probarlo es de la empresa. El Lector, Dubu, 한글 Race y el taller se entregan igual si la persona no marca la casilla.

- No dejar que el bot hable de precio, forma de pago o certificado. Consecuencia: una IA puede inventar un precio o una fecha, y afirmar que el certificado tiene reconocimiento oficial es publicidad engañosa (es un certificado propio de Academia Seúl, sin reconocimiento estatal). Las cinco preguntas reales se responden con botones fijos, y en cuanto aparece una de ellas el bot entrega la conversación a Jay.

- No pedir ni manejar contraseñas, datos de tarjeta ni documentos de identidad por el bot, ni mandar links de pago automáticos. Consecuencia: no hay links de Mercado Pago ni PayPal de US$120/US$60 (Jay los crea), así que el lanzamiento se paga por WhatsApp con Jay en persona. Un bot que pida datos de pago destruye la confianza que sostiene la marca.

- No pagar ManyChat Pro ni dos suscripciones de ManyChat hoy. Consecuencia: US$39 al mes es un tercio de un curso de lanzamiento, y una segunda cuenta para @academiaseul cuesta US$168–348 al año por la cuenta que saca 3–12 me gusta por post. Con 1 alumno pagado, eso es gasto sin retorno medible.

- No usar «cohorte» con alumnos (se dice clase o grupo), no escribir «desde US$120» ni «US$60/mes» sin «×2», no usar «Nivel 1» (es Básico 1), y nunca rojo, rosado, coral ni magenta en ninguna pieza. Consecuencia: rompe la nomenclatura única y, en el caso del rojo, es una señal muy mala en la cultura coreana, que es justo lo que la academia vende.

## 6 · Buscar contactos, la versión que sí es legal y sí rinde

Esto es la respuesta real a tu punto 3. Ordenado por retorno.

### Ex-alumnos de julio y grupo de Básico 2, uno a uno por WhatsApp, escrito por Jay

**Cómo:** Jay escribe a mano, no plantilla ni difusión. El mensaje habla de cursos de coreano (si se desvía a otro tema se cae la excepción española), identifica a Academia Seúl en la primera línea y cierra con «si no quieres más avisos, responde BAJA». Tono de chingu, no de campaña. Anotar la fecha de baja de quien la pida, porque hoy esa lista no existe.

**Costo:** US$0 · 1 a 2 horas de Jay · **Cuándo rinde:** Días. Es lo único de esta lista que puede sumar un alumno antes del martes 10 de noviembre.

**Legalidad:** Legal en todos los países en juego: hay relación contractual previa y Básico 1 es un servicio similar al curso de julio. Chile art. 28 B de la Ley 19.496 (opt-out: se puede escribir mientras no hayan pedido la baja, con asunto, remitente y vía de suspensión). España: califica por la excepción del art. 21.2 de la LSSI. México: revisar que el aviso de privacidad de julio mencionara el envío de información de nuevos cursos (art. 11 de la nueva LFPDPPP).

### Comentario → DM por palabra clave en @jaychingu.oficial (el motor de captación)

**Cómo:** Un reel que diga «comenta LECTOR y te mando gratis la app para leer Hangul» → ManyChat detecta la palabra y manda un DM con el link a academiaseul.com/lector-coreano. Palabras clave, una por imán: LECTOR, DUBU, RACE, TALLER, NOMBRE, NIVEL, CLASE. Dos detalles tácticos que deciden si funciona: (1) el reel tiene que pedir que sigan la cuenta, porque si no la siguen el DM cae en Solicitudes; (2) es UN SOLO mensaje automático por persona, así que ese mensaje tiene que traer el imán Y una pregunta que obligue a responder, porque si no responde no hay segundo intento. Plazo: hasta 7 días desde el comentario.

**Costo:** US$0 · 1 hora de configuración + el tiempo de grabar los reels · **Cuándo rinde:** Inmediato en cada reel que funcione. Es el canal con el techo más alto, porque el mejor reel de Jay tiene 803 me gusta contra 793 seguidores.

**Legalidad:** Es el único mecanismo de captación que Meta bendice expresamente: la documentación oficial de private replies permite un mensaje directo a quien comentó. Límites a respetar en el guion: un solo mensaje por comentarista, 7 días de plazo, y si no responde no se puede insistir.

### Convertir en capturadores los seis imanes gratis que ya están publicados

**Cómo:** Son cinco páginas que ya reciben tráfico y no piden nada. En orden de esfuerzo creciente: (1) Lector, Dubu y 한글 Race — al terminar un nivel o el alfabeto, un bloque «¿te mando tu progreso y la guía de pronunciación?» con correo + casilla vacía; (2) generador de nombre — pedir el correo para enviar la tarjeta del nombre en PNG, que es un motivo genuino y no un peaje; (3) test de nivel — el resultado se muestra SIEMPRE en pantalla (no se retiene como rehén) y el correo se ofrece para «mandarte qué curso te toca y el programa en PDF»; (4) /taller ya tiene formulario, solo hay que separar la casilla del material de la de promociones. Condición no negociable: casilla vacía, opcional, y el material se entrega igual si no la marca.

**Costo:** US$0 en plata · media a una jornada de desarrollo por página · **Cuándo rinde:** Semanas, y depende del tráfico de esas páginas, que hoy NO está medido. Por eso la analítica de la Fase 4 va antes de elegir cuál convertir primero.

**Legalidad:** Es el estándar más alto y sirve para todos los países a la vez: consentimiento explícito, separado, no premarcado y con finalidades declaradas desde el principio (lo que exige el art. 11 mexicano y lo que piden España y Perú). También es lo que vuelve defendible toda la base ante la Ley 21.719 el 1 de diciembre.

### Publicaciones en colaboración (Collab) con cuentas afines

**Cómo:** Hasta 5 cuentas colaboradoras por publicación. Objetivos naturales: cuentas de K-pop y K-dramas en español, escuelas de taekwondo (ya hay precedente con una), centros culturales coreanos, cuentas de cultura coreana. El post sale desde @jaychingu.oficial, NO desde @academiaseul, y cierra con la misma palabra clave del comentario→DM para que el mecanismo de private replies capture a la audiencia del socio. Formato: feed, reel o carrusel (las historias no soportan Collab).

**Costo:** US$0 en plata · 2 a 4 horas por alianza entre contacto, acuerdo y pieza · **Cuándo rinde:** 1 a 3 semanas por socio. Es la mejor relación costo-beneficio después de los ex-alumnos.

**Legalidad:** Impecable, y es la respuesta directa al «buscar contactos»: el colaborador trae su propia audiencia sin que nadie extraiga ningún dato de nadie. El contraste con el scraping es exactamente este.

### Anuncios Click-to-WhatsApp desde @jaychingu.oficial

**Cómo:** US$3 al día por 7 días = US$21, apuntando a Chile y México, con el texto del embudo «¿cuál es el costo?» que ya está escrito en Embudo_Costo_Octubre_2026.md. Medir en Ads Manager el costo por conversación iniciada. Si en 7 días no sale ninguna conversación, se apaga. Dirigir el anuncio al número nuevo del bot si ya existe; si no, al +56 9 4211 5562 con Jay contestando.

**Costo:** US$21 una sola vez · 2 horas de armado · **Cuándo rinde:** 7 a 14 días, y lo que entrega no es solo contactos: entrega el primer dato PROPIO de costo por contacto, que hoy no existe (no hay benchmark público confiable para Chile).

**Legalidad:** Totalmente legal: la persona hace clic y escribe ella. Ventaja verificada en la documentación oficial de precios de Meta: abre una ventana de entrada gratuita de hasta 7 días en la que Meta no cobra marketing, utility, authentication ni service. Se paga el anuncio, no los mensajes. Único cuidado: alguien tiene que contestar, y el único que puede es Jay.

### Respuestas a historias y menciones como disparador

**Cómo:** Historias con encuesta, pregunta o sticker «mándame una palabra» en @jaychingu.oficial: cada respuesta a una historia es una acción del usuario que abre la ventana de mensajería y permite que ManyChat conteste con el imán. Es el canal más barato de todos porque Jay ya publica historias.

**Costo:** US$0 · minutos al día · **Cuándo rinde:** Inmediato, con volumen bajo pero constante.

**Legalidad:** Disparador oficial de Meta: la ventana la abre una acción del usuario (mensaje, botón, link ig.me, reacción, comentario o respuesta a historia). No es el bot escribiendo primero.

### Difusión a quien ya tiene guardado el número de la academia

**Cómo:** Lista de difusión en la app de WhatsApp Business (máx. 256 por lista) para avisar el cierre de matrícula del lunes 9 y el precio de lanzamiento hasta el domingo 8. Probar primero con una lista de 10 para ver si Chile ya tiene el tope mensual (Ajustes → Difusiones).

**Costo:** US$0 · 15 minutos · **Cuándo rinde:** Días, pero es retención, no captación.

**Legalidad:** Legal con los alumnos y ex-alumnos que ya tienen relación previa. Dos límites que la vuelven inútil para gente nueva: solo llega a quien tiene el número guardado, y hay un tope mensual de difusiones gratis en despliegue (reportado en torno a 35). No reemplaza al bot ni al correo.

### Correo por Brevo a la lista con consentimiento

**Cómo:** Envíos a 01 Leads sitio, 02g Básico 1 noviembre y P1 (18 contactos calientes, solo 2 ex-alumnos de julio) con la plantilla académica que ya existe en Brevo/Envios_desde_29sep/herramientas/_base_academica.html. Agregar una etiqueta de país a cada contacto, porque hoy no hay forma de excluir España de un envío.

**Costo:** US$0 al mes en el plan gratuito de Brevo · 1 hora por envío · **Cuándo rinde:** Días. Volumen bajo porque la lista es chica, pero es el ÚNICO canal válido para los contactos de España y de EE. UU.

**Legalidad:** Chile art. 28 B: asunto claro, remitente identificado y dirección de baja en cada correo, y una vez pedida la baja el envío queda prohibido. España: solo a quien dio permiso expreso o es ex-alumno por el art. 21.2. Nota importante: los datos que ManyChat recoja de Instagram NO se pueden exportar a Brevo sin consentimiento propio (Platform Terms 3.a de Meta): el correo hay que pedirlo de nuevo dentro de la conversación.

### Referidos «trae un chingu» y participar en comunidades

**Cómo:** El alumno comparte academiaseul.com/inscribete?clase=a11-martes con su código y el amigo se inscribe él mismo. Premio que no sea plata: una clase extra, flashcards impresas o acceso a los niveles 21+ de Tigre 100. En grupos y comunidades de K-pop o cultura coreana, Jay publica como persona que aporta, nunca mandando DMs a los miembros.

**Costo:** Solo el premio que Jay decida · US$0 de plataforma · **Cuándo rinde:** Enero de 2027, no el 9 de noviembre: el volumen depende de tener alumnos, y hoy hay 1 pagado en Básico 1 más el grupo de Básico 2.

**Legalidad:** Nada lo prohíbe, porque el consentimiento lo entrega el nuevo interesado al inscribirse. Lo que NO se puede hacer es pedirle al alumno el teléfono del amigo para escribirle: eso es tratar datos de un tercero sin base de licitud y además es escribir primero, prohibido por la Developer Policy 5.2.a. Publicar en un grupo no infringe nada; mandar DMs a sus miembros sí.

## 7 · Los flujos

Ojo con las correcciones 1, 2, 4 y 5 de la sección 1: afectan a los flujos 1, 2, 3, 4 y 10.

### 1 · PRECIO / COSTO (el que más se usa)

**Canal:** ambos · **Disparador:** DM con cualquiera de estas palabras: precio, precios, costo, costos, cuánto cuesta, cuanto cuesta, cuánto vale, cuanto vale, cuánto sale, cuanto sale, valor del curso, programa, programas. En ManyChat (@jaychingu.oficial): Instagram → Keywords, coincidencia «contiene». En @academiaseul: Meta Business Suite → palabras clave. En comentarios de reels: la palabra PRECIO, anunciada en el reel y en el comentario fijado. En WhatsApp lo pega Jay a mano con /costo. NO agregar «info», «cuesta» ni «valor» solos: saltan en cualquier frase («me cuesta pronunciar»).

**Cuándo deja de responder el bot y te avisa:** Apenas la persona responde cualquier cosa al paso 1. El bot da el precio UNA vez, con este texto fijo, y después se calla: no negocia, no repite el precio, no lo recalcula, no manda links de pago y no vuelve a hablar de plata. Si el primer mensaje ya trae «descuento», «beca», «transferencia», «tarjeta», «cuota», «certificado», «título», «reembolso» o «devolución», el bot se salta el paso 2, manda el paso 4 y avisa a Jay de inmediato.

**P1 · Precio de frente + hoja + pregunta (automático, al instante)** · etiqueta: 1 Interesado · espera: ninguna, sale al instante. En WhatsApp va adjunta además la imagen Curriculo/publico/Hoja_Basico1_Noviembre_2026.png, que se ve sin abrir nada

```
¡Hola! Soy Jay, de Academia Seúl 💙 Gracias por escribir. Te respondo yo en persona apenas vea tu mensaje; mientras, te dejo todo:

Ahora está abierto *Básico 1 · coreano desde cero*, con Kiran (기란), profesora coreana criada en Argentina que te explica en español.

🗓️ 8 martes desde el *martes 10 de noviembre*
🕗 20:00 hora de Chile · 20:00 Argentina y Uruguay · 18:00 Perú y Colombia · 17:00 México
💻 En vivo por Zoom, 60 minutos, grupo chico
💰 *Precio de lanzamiento, hasta el domingo 8: US$120 el curso completo · o 2 cuotas de US$60* (precio normal: US$150 el curso completo · o 2 cuotas de US$75)
🎁 Grabación de cada clase, material de cada semana con audio nativo, grupo de WhatsApp y certificado de Academia Seúl incluido

El curso en una hoja: academiaseul.com/p/resumen
Inscripción: academiaseul.com/inscribete?clase=a11-martes

Cuéntame: ¿partes desde cero o ya lees algo de 한글?
```

Botones: `Parto desde cero 🌱` · `Ya leo algo de 한글` · `Quiero inscribirme 🙌`

**P2a · «Parto desde cero» (automático) y fin del bot** · etiqueta: 2 Curso enviado · espera: ninguna. Después de este mensaje el bot queda en silencio en esta conversación

```
¡Perfecto, desde cero se puede! 🌱 Básico 1 es exactamente eso: en las clases 1 y 2 ya lees y escribes 한글, y al final del curso te presentas, hablas de tu familia, de los lugares a los que vas y de lo que te gusta, en coreano.

Sigue el libro 한글학교 한국어 1, con material propio y audio nativo. Romanización solo en las clases 1 y 2; desde la 3, puro 한글.

Programa semana a semana: academiaseul.com/p/basico1
Formulario (2 min, sin crear cuenta): academiaseul.com/inscribete?clase=a11-martes

Ya le avisé a Jay que estás aquí y te escribe él 💙
```

Botones: `Quiero inscribirme 🙌` · `Tengo una duda`

**P2b · «Ya leo algo de 한글» (automático) y fin del bot** · etiqueta: 1 Interesado · espera: ninguna

```
¡Buenísimo! 🙌 Te soy honesto, que es lo que corresponde:

• Si lees 한글 lento, o nunca has tenido clases con profe, *Básico 1 te sirve igual*: las clases 1 y 2 son tu repaso rápido del alfabeto y desde la clase 3 todo es hablar, sin romanización.
• Si ya conversas, Básico 1 te va a quedar chico y no quiero que pagues algo que no te sirve. *Básico 2 ya está en curso* (empezó el 21 de octubre) y Conversacional 1, TOPIK II y Niños vuelven en *enero de 2027*.

Para saberlo seguro, el test de nivel es gratis y te da el resultado en pantalla al instante: academiaseul.com/test-nivel

Jay te escribe en persona para decirte qué te conviene de verdad 💙
```

Botones: `Hago el test 📊` · `Que me escriba Jay`

**P3 · «Quiero inscribirme» → salta al flujo 2** · etiqueta: 2 Curso enviado · espera: ninguna; continúa en el flujo 2 · INSCRIBIRME

```
¡Vamos! 🙌 Te paso los 3 pasos ahora mismo.
```

**P4 · Handoff: el bot se calla y avisa a Jay (no es un mensaje para la persona)** · etiqueta: 12 Para Jay · conversación abierta · espera: 2 minutos después de la respuesta de la persona

```
⚠️ Esto NO se le manda a la persona: es la notificación interna.

En ManyChat: acción *Notify Admin* con el texto «PRECIO · {{first_name}} · {{ig_username}} · respondió: [su respuesta] · entra tú, el bot ya se calló».
En WhatsApp: la conversación queda con la etiqueta 1 Interesado y arriba en la bandeja.

Y a la persona, solo esta línea si pasaron más de 2 minutos sin que Jay entre:
«Jay ya vio tu mensaje y te responde en persona en un rato 💙 Si es muy tarde, mañana a primera hora, pero te responde él.»
```

### 2 · INSCRIBIRME / QUIERO

**Canal:** ambos · **Disparador:** Botón «Quiero inscribirme» del flujo 1, o DM con: INSCRIBIRME, QUIERO, ME INSCRIBO, INSCRIPCIÓN, CUPO, «cómo me inscribo», «quiero entrar», «dónde pago». En comentarios de reels: la palabra CLASE o INSCRIBIRME (las palabras clave solo funcionan en mensajes, no en comentarios: por eso el comentario fijado invita a escribirlas por DM). En la lámina 4 del destacado INSCRÍBETE ya está anunciado INSCRIBIRME.

**Cuándo deja de responder el bot y te avisa:** En cuanto toca «¿Cómo pago?», «Tengo una duda», o escribe cualquier cosa que no sea uno de los 3 botones. El bot nunca manda un link de pago, nunca dice un monto en pesos, nunca da datos bancarios y nunca recibe ni da por bueno un comprobante: eso es 100 % de Jay. Con el precio de lanzamiento esto además es obligatorio, porque no existen links de US$120 ni de US$60.

**P1 · Los 3 pasos (automático)** · etiqueta: 2 Curso enviado · espera: ninguna

```
¡Vamos! 🙌 Son 3 pasos y no tienes que crear ninguna cuenta:

1️⃣ Llenas el formulario, 2 minutos: academiaseul.com/inscribete?clase=a11-martes (así el cupo queda a tu nombre)
2️⃣ Eliges cómo pagar: tarjeta o transferencia por Mercado Pago, PayPal, o transferencia en Chile
3️⃣ Jay te confirma el cupo por aquí, y el *lunes 9* te llega tu link de Zoom y el grupo de WhatsApp de la clase

💰 Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60. La cuota 2 se paga antes de la clase 5, y te avisamos con tiempo.
🗓️ Primera clase: *martes 10 de noviembre, 20:00 hora de Chile*
📅 Matrícula abierta hasta el *lunes 9 a las 23:59*

Llena el formulario y Jay te coordina el pago por aquí mismo. ¿Desde qué país me escribes? Así te dice la forma más barata de pagar 💙
```

Botones: `Ya llené el formulario ✅` · `¿Cómo pago? 💳` · `Tengo una duda`

**P2 · «¿Cómo pago?» → handoff inmediato (automático, y el bot se calla)** · etiqueta: 1 Interesado + 12 Para Jay · conversación abierta · espera: ninguna. Aviso a Jay en el mismo segundo (Notify Admin)

```
¡Esa te la responde Jay en persona, en un rato! 💳 Y es a propósito: con el precio de lanzamiento los montos se coordinan uno a uno, así nadie paga de más ni de menos.

Ya le avisé que estás aquí. Mientras, si llenas el formulario tu cupo queda a tu nombre: academiaseul.com/inscribete?clase=a11-martes

Una cosa importante: por aquí *nunca* te vamos a pedir tu clave, el número de tu tarjeta, un código que te llegue por SMS ni una foto de tu carnet. Si alguien te lo pide, no somos nosotros 🐯
```

**P3 · «Ya llené el formulario» (automático)** · etiqueta: 3 Formulario sin pago · espera: ninguna

```
¡Gracias! 🙌 Lo reviso y Jay te escribe por aquí para cerrar el cupo, hoy mismo.

Si ya pagaste, mándale el comprobante en este mismo chat con tu nombre completo y te lo confirma él.

Para ir calentando motores, gratis y sin cuenta: Dubu, el puzzle del Hangul (academiaseul.com/dubu) y el Lector con voz nativa (academiaseul.com/lector-coreano) 🐯
```

**P4 · «Tengo una duda» (automático, una sola pregunta y handoff)** · etiqueta: 12 Para Jay · conversación abierta · espera: ninguna

```
¡Dale, cuéntame! 💙 Escríbeme la duda aquí y Jay te la responde en persona. Las que más me preguntan, por si es una de ellas:

• ¿Es en vivo? → Sí, por Zoom, grupo chico, y queda grabada por si un día no llegas (te llega en 24 horas).
• ¿Es en español? → Kiran explica en español y se practica en coreano.
• ¿No puedo un martes? → La grabación te llega igual, pero la clase está pensada para ir en vivo y hablar.

Lo demás (plata, nivel, certificado) te lo responde Jay, no un automático 🐯
```

**P5 · Recordatorio de formulario sin pago (solo dentro de la ventana de 24 h, o a mano por WhatsApp)** · etiqueta: 3 Formulario sin pago · espera: 20 a 24 horas después del formulario, entre las 10:00 y las 20:00 de su hora. Nunca de madrugada. Una sola vez

```
¡Hola, [nombre]! Vi que llenaste el formulario de Básico 1 🙌 Tu cupo está apartado a tu nombre, pero se confirma con el pago.

Con el precio de lanzamiento (hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60) el pago lo coordino yo por aquí, así que dime cómo te acomoda y lo dejamos listo en 5 minutos 💙

¿Transferencia en Chile, tarjeta o PayPal?
```

### 3 · NIVEL · «¿qué curso me toca?»

**Canal:** ambos · **Disparador:** Comentario o DM con NIVEL, o DM con: «qué curso», «qué nivel», «soy principiante», «ya sé algo», «sé lo básico», «para mi hijo», «para mi hija», «para un niño», «tengo el TOPIK». También el botón «Hago el test» del flujo 1.

**Cuándo deja de responder el bot y te avisa:** Siempre, al final de la rama que corresponda. Y de inmediato, sin mandar el paso 2, si la persona escribe texto libre en vez de tocar un botón (por ejemplo «estudié un año en Corea» o «tengo TOPIK 2 nivel 3»): el nivel real de alguien no lo decide un bot, y recomendar mal un curso de US$120 es la peor publicidad posible.

**P1 · Tres opciones, cero adornos (automático)** · etiqueta: 1 Interesado · espera: ninguna

```
¡Buena pregunta! 🐯 Te lo digo en 30 segundos y sin venderte humo. Dime cuál eres:
```

Botones: `No sé nada de coreano` · `Leo 한글 pero no hablo` · `Ya converso un poco` · `Es para un niño o niña`

**P2a · «No sé nada de coreano» (automático)** · etiqueta: 2 Curso enviado · espera: ninguna

```
Tu curso es *Básico 1 (A1.1)*, y está abierto justo ahora 🌱

Con Kiran, 8 martes desde el *martes 10 de noviembre*, 20:00 hora de Chile, en vivo por Zoom. En las clases 1 y 2 ya lees 한글; al final te presentas y hablas de tu familia y de lo que te gusta. Proyecto final: «Yo en coreano».

💰 Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60 (después, US$150 el curso completo · o 2 cuotas de US$75)
👉 academiaseul.com/inscribete?clase=a11-martes

¿Te guardo el cupo? Jay te escribe en un rato para cerrarlo 💙
```

Botones: `Sí, guárdame el cupo 🙌` · `Primero quiero algo gratis 🎁`

**P2b · «Leo 한글 pero no hablo» (automático)** · etiqueta: 2 Curso enviado · espera: ninguna

```
Entonces Básico 1 también es para ti, y te explico por qué, sin cuento: las clases 1 y 2 repasan el 한글 rápido (es tu repaso, no tu primera vez) y desde la clase 3 todo es hablar, puro 한글, sin romanización.

Si quieres asegurarte antes de pagar, el test de nivel es gratis y el resultado te sale en pantalla al instante: academiaseul.com/test-nivel

🗓️ 8 martes desde el *martes 10 de noviembre* · 20:00 hora de Chile · Zoom
💰 Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60
👉 academiaseul.com/inscribete?clase=a11-martes

Jay te escribe para verlo contigo 💙
```

Botones: `Hago el test 📊` · `Que me escriba Jay`

**P2c · «Ya converso un poco» (automático, y la verdad por delante)** · etiqueta: 5 Enero 2027 · espera: ninguna

```
Te voy a ser honesto, aunque me convenga lo contrario: *Básico 1 te va a quedar chico*, y no quiero que pagues algo que no te sirve 💙

Lo que te calza de verdad:
• *Básico 2 (A1.2)* ya está en curso (empezó el 21 de octubre), así que entrar ahora sería a mitad de camino.
• *Conversacional 1 (A2.1)* con Abby y *TOPIK II* vuelven en *enero de 2027*.

Haz el test gratis (academiaseul.com/test-nivel) y anótate en la lista de enero para que te avisemos primero: academiaseul.com/notificarme

Jay te escribe para ver tu caso en concreto, que es lo que corresponde aquí 🐯
```

Botones: `Anótame para enero 📅` · `Que me escriba Jay`

**P2d · «Es para un niño o niña» (automático)** · etiqueta: 5 Enero 2027 · espera: ninguna

```
¡Qué bueno! 🧒 *Coreano para Niños (8–15)* es un curso aparte, con Jay y Abby, y *vuelve en enero de 2027*. Hoy no está abierto, así que no te voy a vender Básico 1 como si fuera lo mismo: Básico 1 es un curso de adultos.

Anótalo en la lista de espera y les avisamos primero cuando abra: academiaseul.com/notificarme

Y mientras, gratis y perfecto para su edad:
🧩 Dubu · 두부, el puzzle del Hangul: academiaseul.com/dubu
🏁 한글 Race, leer contra el reloj: academiaseul.com/hangul-race

Si tiene 16 o más, ahí sí Básico 1 le sirve y te cuento 💙
```

Botones: `Anótame para enero 📅` · `Tiene 16 o más`

### 4 · GRATIS / HANGUL · el imán (convierte un comentario en un contacto legal)

**Canal:** ambos · **Disparador:** Comentario con LECTOR, DUBU, RACE, TALLER o NOMBRE en un reel de @jaychingu.oficial (ManyChat → Instagram → Comments; la palabra se dice en el audio del reel Y se escribe en el caption y en el comentario fijado). También: respuesta a una historia con esa palabra, mención, o DM con «gratis», «hangul», «alfabeto», «leer coreano», «app». En @academiaseul, la palabra clave GRATIS en las respuestas nativas de Meta Business Suite.

**Cuándo deja de responder el bot y te avisa:** Cuando la persona responde con una letra, una duda o cualquier cosa que no sea un botón. El bot entrega el imán; la conversación la toma Jay. Si lo que escribe es sobre precio, nivel o pago, se va al flujo 1, 2 o 3 y Jay entra ahí. El paso del consentimiento (P3) es el único que el bot puede mandar solo, porque es la pregunta, no la venta.

**P1 · Imán por comentario: UN solo mensaje (LECTOR)** · etiqueta: 6 Imán entregado · LECTOR · espera: ninguna. Es UN solo mensaje por persona: si no responde, NO hay segundo intento (Meta permite un mensaje por comentarista y hasta 7 días de plazo). Por eso este mensaje trae el imán Y una pregunta que obliga a responder

```
¡Ahí va, de regalo! 🎁 El *Lector de Hangul*: tocas una letra y la escuchas con voz nativa, practicas y ves tu progreso. Sin cuenta, sin descargar nada y sin pagar 👉 academiaseul.com/lector-coreano

Dos cosas rápidas:
1️⃣ Sígueme, así mis mensajes te llegan a la bandeja y no se pierden en Solicitudes 🙏
2️⃣ Respóndeme con la letra que más te cuesta (ㅓ, ㅡ, ㅊ…) y te digo el truco para no confundirla nunca más. Te contesto yo, Jay 🐯
```

Botones: `Mándame más gratis 🎁` · `¿Y las clases? 🇰🇷`

**P1b · Variantes del mismo mensaje, una por palabra clave** · etiqueta: 6 Imán entregado · DUBU / RACE / TALLER / NOMBRE (una etiqueta por imán, para saber cuál rinde) · espera: ninguna

```
DUBU:
«¡Toma tu 두부! 🧩 Dubu es un puzzle gratis: juntas una consonante y una vocal y te sale una palabra que escuchas y lees. 30 niveles, sin cuenta 👉 academiaseul.com/dubu
Sígueme para que no se me pierda este chat 🙏 y cuéntame: ¿en qué nivel te quedaste pegado? Te doy la pista 🐯»

RACE:
«¡Partimos la carrera! 🏁 한글 Race es gratis: lees Hangul contra el reloj, juntas XP y haces racha 👉 academiaseul.com/hangul-race
Sígueme para que el mensaje te llegue a la bandeja 🙏 y mándame tu récord, que te quiero ganar 😄»

TALLER:
«¡Ahí está la clase completa! 🎬 60 minutos de Hangul, grabados, de principio a fin y gratis 👉 academiaseul.com/taller
Sígueme para que no se me pierda este chat 🙏 Y dime: ¿la vas a ver hoy o el fin de semana? Te mando la guía de pronunciación cuando la termines 🐯»

NOMBRE:
«¡Tu nombre en coreano, al tiro! ✍️ Escríbelo aquí y te lo devuelvo en 한글 escrito a mano. Si quieres verlo solo, el generador es gratis 👉 academiaseul.com/generador-nombre
Sígueme para que te llegue mi respuesta 🙏 ¿Cómo te llamas? 💙»
```

Botones: `Mándame más gratis 🎁` · `¿Y las clases? 🇰🇷`

**P2 · «Mándame más gratis» (automático)** · etiqueta: 6 Imán entregado · espera: ninguna

```
¡Toma, todo gratis, sin cuenta y sin letra chica! 🎁

🔊 Lector de Hangul, con voz nativa: academiaseul.com/lector-coreano
🧩 Dubu · 두부, el puzzle del Hangul: academiaseul.com/dubu
🏁 한글 Race, leer contra el reloj: academiaseul.com/hangul-race
🎬 La clase completa de Hangul, 60 min grabados: academiaseul.com/taller
✍️ Tu nombre en coreano: academiaseul.com/generador-nombre
📊 Test de nivel, resultado al instante: academiaseul.com/test-nivel

Todo esto es tuyo y no tienes que darme nada a cambio 💙
```

**P3 · El permiso (el paso que vuelve legal el contacto)** · etiqueta: «Sí, avísame» → 7 Consentimiento OK (ManyChat guarda fecha, hora y este texto exacto en un campo personalizado) · «No, gracias» → 8 Solo material · nunca promoción · espera: 4 horas después del paso 2, o al instante si la persona escribió ella primero

```
Última cosa y te dejo tranquilo 🙏

¿Te aviso por aquí cuando abramos clases nuevas y cuando saque material gratis nuevo? Sería un mensaje de vez en cuando, nada de spam, y te sales cuando quieras escribiendo *BAJA*.

Si me dices que no, igual te quedas con todo lo de arriba: eso ya es tuyo y no se lo cambio a nadie por un permiso.
```

Botones: `Sí, avísame 💙` · `No, gracias`

**P4a · Si dijo «Sí, avísame» (automático)** · etiqueta: 7 Consentimiento OK · espera: ninguna

```
¡Anotado! 💙 Te escribo poco y solo cuando valga la pena. Para salirte, en cualquier momento, escribe *BAJA* y listo, sin preguntas.

Y por si te pica la curiosidad ahora: está abierto *Básico 1 desde cero con Kiran*, 8 martes desde el *martes 10 de noviembre*, 20:00 hora de Chile. Me preguntas y te cuento todo 🐯
```

Botones: `Cuéntame de Básico 1 🇰🇷`

**P4b · Si dijo «No, gracias» (automático)** · etiqueta: 8 Solo material · nunca promoción · espera: ninguna. No se le vuelve a preguntar: preguntar dos veces es insistir, y es exactamente lo que hace que reporten la cuenta

```
¡Perfecto, así queda! 💙 No te escribo nada promocional. Lo gratis se queda contigo igual, y si algún día quieres clases, aquí estoy.

화이팅 🐯
```

### 5 · SEGUIMIENTO (preguntó y no pagó)

**Canal:** ambos · **Disparador:** Etiqueta 1 Interesado o 3 Formulario sin pago, sin la etiqueta 4 Inscrito, y 20 horas o más desde su último mensaje. No es un disparador automático de campaña: es una lista que Jay revisa en la rutina de las 21:30.

**Cuándo deja de responder el bot y te avisa:** Este flujo no lo manda un bot: lo manda Jay a mano desde la app de WhatsApp Business, con los atajos /dato1, /cierra y /enero y la primera línea siempre personalizada (su nombre y lo que preguntó). ManyChat solo puede mandarlo dentro de las 24 h siguientes al último mensaje de la persona; pasadas las 24 h en Instagram no hay seguimiento automático posible y no se fuerza con ningún truco. Regla dura: máximo 3 toques en toda la campaña, y si no responde dos toques seguidos, no se le escribe más.

**P1 · Toque 1 · un dato nuevo, no un recordatorio** · etiqueta: 9 Toque 1 · espera: 20 a 24 horas después de su último mensaje, entre las 10:00 y las 20:00 de SU hora. Nunca de madrugada, nunca dos en el mismo día

```
¡Hola, [nombre]! Jay de nuevo 🐯 Un dato de Básico 1 que no te conté: la lectura la practicas de tarea en el Lector, con voz nativa y gratis (academiaseul.com/lector-coreano), así la hora en vivo con Kiran es para hablar y no para mirar el alfabeto.

El precio de lanzamiento (US$120 el curso completo · o 2 cuotas de US$60) dura hasta el *domingo 8*. ¿Te quedó alguna duda de horario, de nivel o de pago? 💙
```

**P2 · Toque 2 · el último si no respondió** · etiqueta: 10 Toque 2 · si no responde este, se termina · espera: 3 días después del toque 1

```
¡Hola, [nombre]! Te escribo corto, y no insisto más si no es tu momento 💙

El *domingo 8 a las 23:59 (hora de Chile)* termina el precio de lanzamiento: *US$120 el curso completo · o 2 cuotas de US$60*. Desde el lunes vuelve a US$150 el curso completo · o 2 cuotas de US$75, y la matrícula cierra ese mismo *lunes 9 a las 23:59*.

Empezamos el *martes 10 a las 20:00*: academiaseul.com/inscribete?clase=a11-martes

¿Lo vemos ahora o lo dejamos para enero? Cero presión, de verdad 🐯
```

**P3 · Toque 3 · SOLO a quien respondió algo antes** · etiqueta: 11 Toque 3 · espera: 48 h después del toque 2, y solo si contestó algún toque anterior. A quien nunca respondió, esto NO se le manda

```
¡Hola, [nombre]! Como quedamos, te aviso: *hoy domingo 8, a las 23:59 (hora de Chile)*, termina el precio de lanzamiento de Básico 1 (US$120 el curso completo · o 2 cuotas de US$60).

¿Te ayudo con algo antes? Estoy aquí toda la tarde 🐯
academiaseul.com/inscribete?clase=a11-martes
```

**P4 · Dos toques sin respuesta = se termina (no se manda nada)** · etiqueta: 5 Enero 2027 · espera: —

```
(Sin texto. Es la regla y se cumple: dos toques sin respuesta y la persona sale del seguimiento. Se le saca la etiqueta 9/10 y queda con 5 Enero 2027. No se le vuelve a escribir en esta campaña, ni por WhatsApp ni por DM, y no entra a ninguna difusión. A esa gente le llega el anuncio pagado a «personas que te escribieron», que es la vía que Meta sí permite.)
```

**P5 · Si dice «ahora no» o «no me alcanza»** · etiqueta: 5 Enero 2027 · espera: se manda al instante, en el mismo momento en que lo dice. No se insiste después

```
¡Gracias por contarme, de verdad! 💙 Cero presión: cuando sea tu momento, aquí estamos.

Mientras, para que el coreano no se enfríe, todo esto es gratis:
🎬 Clase completa de Hangul, grabada: academiaseul.com/taller
🔊 Lector de Hangul con voz nativa: academiaseul.com/lector-coreano
🏁 한글 Race: academiaseul.com/hangul-race

Y te anoto para *enero de 2027*, así te aviso primero cuando abra la próxima clase: academiaseul.com/notificarme 🐯
```

**P6 · Si dice «lo voy a pensar»** · etiqueta: 9 Toque 1 (y queda apuntado para el toque 3 del sáb 7 o dom 8) · espera: ninguna

```
¡Claro, piénsalo con calma! 💙 Si hay algo puntual que te haga dudar (el horario, el nivel o el pago), cuéntamelo y lo vemos ahora mismo.

Solo para que lo tengas: el precio de lanzamiento se va el *domingo 8 a las 23:59* y la matrícula cierra el *lunes 9*. ¿Te parece si te escribo el sábado para ver cómo vas? 🐯
```

### 6 · PAGO CONFIRMADO

**Canal:** WhatsApp · **Disparador:** Jay vio el pago en Mercado Pago, PayPal o el banco, o recibió el comprobante. NUNCA lo dispara el bot: ningún automatismo marca a nadie como pagado ni confirma un cupo.

**Cuándo deja de responder el bot y te avisa:** Todo este flujo es de Jay, de principio a fin. Lo único automatizable el día que exista un bot sobre un número nuevo es el recordatorio de 1 hora (plantilla utility b1_recordatorio_clase). El bot nunca confirma un pago, nunca da por bueno un comprobante y nunca manda links de Zoom ni del grupo de WhatsApp.

**P1 · Confirmación (lo manda Jay, al instante)** · etiqueta: 4 Inscrito · pagado (y a la lista 02g Básico 1 noviembre en Brevo) · espera: ninguna, el mismo día del pago

```
¡Pago recibido, [nombre]! 🎉 Tu cupo en *Básico 1 con Kiran* está confirmado.

🗓️ Primera clase: *martes 10 de noviembre, 20:00 hora de Chile* (20:00 Argentina · 18:00 Perú y Colombia · 17:00 México)
💻 Por Zoom, 60 minutos. La sala se abre a las 19:55.
📩 El *lunes 9* te llega por correo tu link de Zoom, el grupo de WhatsApp de la clase y qué tener a mano (si no lo ves, revisa Promociones o Spam).
💰 [solo si pagó la cuota 1] La segunda cuota (US$60) se paga antes de la clase 5; te aviso con tiempo, no tienes que acordarte.

Gracias por confiar en Academia Seúl 💙 화이팅!
```

**P2 · Zoom y grupo (lunes 9, en la mañana)** · etiqueta: 4 Inscrito · pagado · espera: lunes 9. A quien pague después de las 18:00 del lunes 9, Jay le manda esto a mano de inmediato

```
¡[nombre], mañana empezamos! 🎉

💻 Zoom: [link] · la sala se abre a las 19:55
👥 Grupo de WhatsApp de la clase: [link]
🗓️ *Martes 10 de noviembre, 20:00 hora de Chile*
📄 El material de la clase 1 te lo deja Kiran en el grupo

Lleva cuaderno, lápiz y ganas: nada más. Y si quieres llegar calentito, el Lector es gratis: academiaseul.com/lector-coreano

¡Nos vemos mañana! 화이팅 🐯
```

**P3 · Recordatorio de 1 hora (martes 10, 19:00, en el grupo de la clase)** · etiqueta: 4 Inscrito · pagado · espera: martes 10 a las 19:00. Es el único mensaje de este flujo que algún día se podría automatizar, con plantilla utility

```
¡Chingus, en una hora empezamos! 🐯
🕗 20:00 hora de Chile
💻 Zoom: [link]

Kiran los está esperando. Si tienen cualquier problema para entrar, escriban aquí y los ayudo al tiro 💙
```

**P4 · Después de la clase 1 (martes 10, 22:00)** · etiqueta: 4 Inscrito · pagado · espera: martes 10, 22:00

```
¡Lo hicieron increíble! 🎉 안녕하세요 ya está en la casa.

🎬 La grabación les llega dentro de 24 horas.
📄 El material de la semana queda aquí en el grupo.
❓ Las dudas se preguntan aquí: para eso está el grupo, y Kiran les responde.

다음 주 화요일에 만나요! Nos vemos el próximo martes 💙
```

**P5 · Lo que el bot nunca dice aquí** · etiqueta: — · espera: —

```
(Sin texto. Prohibido para cualquier automático: «tu pago está confirmado», «recibimos tu transferencia», «tu cupo está reservado», o mandar el link de Zoom o del grupo. Un automático que confirma un pago que no entró es el único error de este plan que cuesta un alumno y la confianza. Lo confirma Jay, con el banco a la vista.)
```

### 7 · FUERA DE HORARIO y FUERA DE ALCANCE

**Canal:** ambos · **Disparador:** Fuera de horario: cualquier mensaje entre las 21:30 y las 09:00 (hora de Chile) y los domingos; se configura en WhatsApp Business → Herramientas para la empresa → Mensaje de ausencia, horario personalizado. Fuera de alcance: cualquier mensaje que no calce con ninguna palabra clave ni con ningún botón.

**Cuándo deja de responder el bot y te avisa:** Siempre, y es el punto del flujo. Estos mensajes no abren ninguna rama: avisan que hay una persona detrás y ponen un plazo real (hoy, o mañana a primera hora). Lo único que no se puede fallar es ese plazo: un «te respondo yo» sin respuesta es peor que no haber puesto nada.

**P1 · Bienvenida de WhatsApp Business (primer mensaje de alguien nuevo, en horario)** · etiqueta: 1 Interesado · espera: ninguna. Se manda una sola vez por contacto nuevo (WhatsApp Business lo hace solo)

```
¡Hola! Soy Jay, de Academia Seúl 안녕하세요 💙 Gracias por escribir: te contesto yo en persona en un rato, no un robot.

Para ir rápido, cuéntame en una línea qué buscas: ¿partes desde cero, ya sabes algo de coreano, o es para un niño o niña?

Dato por si acaso: *Básico 1 desde cero con Kiran* empieza el *martes 10 de noviembre*, 20:00 hora de Chile, en vivo por Zoom. Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60.
👉 academiaseul.com/inscribete?clase=a11-martes

Si no quieres más avisos de la academia, escribe *BAJA* y no te escribo más 🐯
```

**P2 · Mensaje de ausencia (21:30 a 09:00 y domingos)** · etiqueta: 1 Interesado · espera: ninguna. Del lun 9 en la noche y el mar 10 en adelante cambia la línea de la matrícula: ver el paso P5

```
¡Hola! Soy Jay, de Academia Seúl 💙 Ahora estoy fuera de hora (respondo de *9:00 a 21:30, hora de Chile*), pero mañana a primera hora te contesto yo en persona.

Mientras, por si te sirve:
🗓️ *Básico 1 · coreano desde cero con Kiran*: 8 martes desde el *martes 10 de noviembre*, 20:00 hora de Chile, en vivo por Zoom
💰 Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60
👉 academiaseul.com/inscribete?clase=a11-martes
🎁 Y gratis, para empezar hoy mismo: academiaseul.com/lector-coreano

Déjame tu pregunta aquí y la leo apenas despierte 🐯
```

**P3 · Fuera de alcance: el bot no sabe y lo dice** · etiqueta: 12 Para Jay · conversación abierta · espera: ninguna

```
Esa es buena, y no te la voy a inventar 🙏 Prefiero que te la responda Jay, que es el que sabe de verdad. Ya le avisé y te contesta en persona hoy mismo; si es muy tarde, mañana a primera hora.

Mientras lo esperas, todo lo gratis está junto aquí: academiaseul.com/recursos 💙
```

**P4 · Lo que NUNCA se contesta con un automático (regla, sin texto)** · etiqueta: 12 Para Jay · conversación abierta · espera: —

```
(Sin texto automático. El bot se calla y avisa a Jay cuando aparece: devoluciones, reclamos, «quiero que me devuelvan la plata», un problema con un profe o con una clase, datos bancarios, algo que involucre a un menor de edad, un periodista o una institución, alguien que pregunta si el certificado es un título oficial, o cualquier mensaje con tono molesto. Y jamás un automático a un mensaje de condolencias, de salud o personal: ahí Jay escribe a mano, o no escribe.)
```

**P5 · Versión del mar 10 en adelante (Básico 1 ya empezó)** · etiqueta: 5 Enero 2027 · espera: se activa el martes 10 de noviembre por la mañana, y reemplaza a P1 y P2

```
¡Hola! Soy Jay, de Academia Seúl 💙 Te contesto yo en persona en un rato.

*Básico 1 ya empezó* (el martes 10 de noviembre), así que no te voy a vender un cupo a mitad de camino. La próxima clase abre en *enero de 2027* y te puedo avisar primero: academiaseul.com/notificarme

Mientras, todo esto es gratis y te deja listo para enero:
🎬 La clase completa de Hangul, 60 min: academiaseul.com/taller
🔊 El Lector con voz nativa: academiaseul.com/lector-coreano
🧩 Dubu: academiaseul.com/dubu

Cuéntame qué buscas y te digo por dónde partir 🐯
```

### 8 · COMMUNITY MANAGER (comentarios e historias, las dos cuentas)

**Canal:** ambos · **Disparador:** Comentarios en reels y posts, respuestas a historias y menciones. En @jaychingu.oficial, con ManyChat Free (es la cuenta que rinde: 793 seguidores y un reel de 803 me gusta). En @academiaseul, solo con las respuestas automáticas nativas y gratis de Meta Business Suite (máximo 5 palabras clave), porque esa cuenta saca 3 a 12 me gusta por post y no justifica una segunda suscripción.

**Cuándo deja de responder el bot y te avisa:** Los comentarios sin palabra clave son 100 % de Jay, en 2 bloques de 10 minutos al día (13:00 y 21:00). El automático solo cubre las palabras clave que él mismo anunció en el reel. En cuanto una conversación de DM pasa del primer mensaje, es de Jay. Y el automático se apaga en cualquiera de los casos del paso P6.

**P1 · Respuesta pública al comentario con palabra clave (ManyChat, Reply to comment)** · etiqueta: 6 Imán entregado · espera: al instante. El DM del flujo 4 va en paralelo; esta respuesta pública es la que hace que el resto de la gente comente también

```
¡Ahí te lo mandé por mensaje! 💙 Revisa tu bandeja, y si no te llega sígueme y te lo reenvío 🐯
```

**P2 · Alguien pregunta el precio en un comentario público** · etiqueta: 1 Interesado · espera: al instante

```
¡Te lo mando por mensaje! 💙

(Y sale solo el DM del flujo 1. Regla de la casa: el precio no se discute en los comentarios, ni para decirlo ni para defenderlo.)
```

**P3 · Comentarios sin palabra clave: los contesta Jay a mano** · etiqueta: 1 Interesado · espera: dentro del día

```
Respuestas cortas, a mano, de Jay (2 bloques de 10 min: 13:00 y 21:00):

• Elogio o emoji → el nombre de la persona y un 💙. Nada más.
• «¿Desde cero se puede?» → «¡Desde cero se puede! 🌱 Básico 1 con Kiran, martes 20:00 hora de Chile, desde el 10 de noviembre. Link en la bio, o escríbeme PRECIO por mensaje»
• «¿Es en vivo?» → «¡En vivo por Zoom, grupo chico, y queda grabada por si un día no llegas! 🐯»
• Una duda de coreano → se responde de verdad, con la palabra en 한글. Esto es lo que hace crecer la cuenta, no el link.
• Pregunta por un curso que no está abierto → «Ese vuelve en enero de 2027 💙 Anótate en academiaseul.com/notificarme y te avisamos primero»
• Comentario en coreano → se responde en coreano. Siempre.
```

**P4 · Respuesta a una historia (abre la ventana de mensajería)** · etiqueta: 6 Imán entregado · espera: al instante. Es el canal más barato que hay: Jay ya publica historias, y cada respuesta es una acción del usuario que abre la ventana

```
¡Gracias por responder! 🙌 Te dejo lo mejor que tengo, y es gratis: el Lector de Hangul, con voz nativa 👉 academiaseul.com/lector-coreano

¿Vas a empezar por el alfabeto o ya lees algo? Cuéntame y te digo por dónde partir 🐯
```

Botones: `Parto de cero 🌱` · `Ya leo algo`

**P5 · @academiaseul · respuesta instantánea nativa (sin ManyChat, gratis)** · etiqueta: 1 Interesado · espera: al instante. En esta cuenta solo 5 palabras clave: PRECIO · HORARIO · CLASE · GRATIS · CERTIFICADO

```
¡Hola! Gracias por escribir a Academia Seúl 💙 Te responde Jay en persona en un rato.

Ahora está abierto *Básico 1 desde cero con Kiran*: 8 martes desde el *martes 10 de noviembre*, 20:00 hora de Chile, en vivo por Zoom. Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60.
👉 academiaseul.com/inscribete?clase=a11-martes

¿Partes desde cero o ya sabes algo de coreano?
```

**P6 · Cuándo NO responder automáticamente (la regla, sin texto)** · etiqueta: 12 Para Jay · conversación abierta · espera: —

```
(Sin texto. El automático se apaga o se salta cuando: el comentario es un reclamo, una queja o una burla; menciona a un profe por su nombre; viene de un alumno actual (a un alumno se le contesta como persona, siempre); es una duda de plata, devolución o certificado oficial; parece escrito por un menor de edad; o es spam. Y nunca un automático sobre un tema de salud, un duelo o algo personal.

También se apaga todo el día si el número o la cuenta aparecen con una baja de calidad o un reporte: esa señal tiene veto sobre cualquier objetivo de campaña.)
```

**P7 · Lo que NO existe y no se contrata (regla)** · etiqueta: — · espera: —

```
(Sin texto. No hay, en ninguna herramienta oficial, un disparador que salude a cada nuevo seguidor ni que escriba a quien da «me gusta». Cualquier app que lo prometa automatiza el teléfono por fuera y pone en riesgo las DOS cuentas de Instagram a la vez. @jaychingu.oficial es el activo que no se recupera: eso no se arriesga por un saludo automático.)
```

### 9 · EX-ALUMNOS · «trae un chingu» (no venderles Básico 1)

**Canal:** WhatsApp · **Disparador:** Lista de ex-alumnos del curso de julio y grupo de Básico 2 en curso. Hay relación contractual previa, así que escribirles es legal en todos los países en juego (en España califica por la excepción del art. 21.2 de la LSSI, siempre que el mensaje hable de cursos de coreano y lleve vía de baja). Pero NO por difusión y NO con plantilla: uno a uno, escrito por Jay, una sola vez por persona en toda la campaña.

**Cuándo deja de responder el bot y te avisa:** Este flujo es de Jay entero: no hay bot, en ninguno de sus pasos. Si algún día existe la API sobre un número nuevo, el aviso de apertura de clases a ex-alumnos va con la plantilla marketing as_apertura_clase_nueva, nunca con una utility, y solo a quien no pidió la baja.

**P1 · Al grupo de Básico 2, después de la clase del miércoles** · etiqueta: 13 Alumno · embajador · espera: una sola vez. El recordatorio del miércoles siguiente es oral, en los últimos 30 segundos de la clase: no un mensaje nuevo. Adjuntar b1n_17_trae_un_chingu_story.png, que está hecha para que ellos la suban

```
¡Hola, chingus de Básico 2! 🐯

Una pregunta: ¿tienen a alguien (amigo, amiga, hermano, pareja, compañero de pega) que siempre ha querido aprender coreano y nunca ha partido?

El *martes 10 de noviembre* empieza *Básico 1 desde cero con Kiran*: martes 20:00 (hora de Chile), 8 martes en vivo por Zoom.
💰 Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60 (después, US$150 el curso completo · o 2 cuotas de US$75).

Si alguien entra de parte de ustedes, a los dos les regalo una sesión 1:1 de 20 minutos conmigo para practicar 💙 Solo tiene que decirme de parte de quién viene.

Les dejo la imagen para sus historias (etiqueten a su chingu 😉) y el link para reenviar: academiaseul.com/inscribete?clase=a11-martes
친구랑 같이 배워요! 화이팅!
```

**P2 · A un ex-alumno de julio, 1 a 1** · etiqueta: 13 Alumno · embajador · espera: una sola vez por persona, en toda la campaña. Primera línea personalizada siempre; nada de copiar y pegar en serie. Tope de 15 a 20 WhatsApp al día

```
¡Hola, [nombre]! ¿Cómo vas con el coreano? 💙 Soy Jay, de Academia Seúl.

Te escribo por un favor, no para venderte nada: el *martes 10 de noviembre* empieza *Básico 1 desde cero con Kiran*, y nadie lo cuenta mejor que alguien que ya estudió con nosotros.

¿Conoces a alguien que siempre haya querido aprender? Le puedes reenviar esto: academiaseul.com/inscribete?clase=a11-martes (hasta el domingo 8 está a US$120 el curso completo · o 2 cuotas de US$60).

Y por si te lo preguntas: tu siguiente paso es *Básico 2 (A1.2)*, que ya está en curso desde el 21 de octubre. Te aviso en cuanto abra el próximo, con tu cupo apartado 🐯

Si no quieres más avisos, me dices *BAJA* y listo.
```

**P3 · Si el ex-alumno pregunta por él mismo** · etiqueta: 5 Enero 2027 · espera: ninguna

```
¡Me encanta que quieras seguir! 💙 Tu siguiente paso es *Básico 2 (A1.2)*, pero te soy honesto: ya está en curso (empezó el 21 de octubre), así que entrar ahora sería a mitad de camino y no te lo recomiendo.

Te anoto para la próxima apertura de Básico 2 y te aviso primero: academiaseul.com/notificarme

Mientras, para mantener la mano caliente: el material de Básico 1 sigue siendo tuyo, y el Lector es gratis (academiaseul.com/lector-coreano). Si quieres, te armo un repaso de 20 minutos por Zoom un día de estos 🐯
```

**P4 · Referidos: cómo se hace y cómo NO (regla, sin texto)** · etiqueta: — · espera: —

```
(Sin texto para nadie. Lo que NO se hace con ex-alumnos: venderles Básico 1, que es el curso que ya hicieron — es la forma más rápida de que dejen de leer tus mensajes. Y nunca se les pide el teléfono del amigo: el amigo se inscribe él mismo en academiaseul.com/inscribete?clase=a11-martes. Pedir el número de un tercero es tratar datos de otra persona sin permiso, y escribirle sería escribir primero: las dos cosas prohibidas a la vez.)
```

### 10 · BAJA / STOP (el automático que no puede fallar nunca)

**Canal:** ambos · **Disparador:** La persona escribe BAJA, STOP, CANCEL, CANCELAR, UNSUBSCRIBE, «no me escribas», «sácame», «dar de baja», «no quiero más mensajes», en cualquier canal. Coincidencia por «contiene», no exacta, y con y sin tilde.

**Cuándo deja de responder el bot y te avisa:** El automático responde solo y a cualquier hora: es el único que no tiene horario. Jay no tiene que escribir nada; solo ejecutar la baja en los tres canales el mismo día. Si además el mensaje venía enojado, Jay responde a mano una línea pidiendo disculpas y nada más: no se intenta recuperar a nadie que pidió la baja.

**P1 · Respuesta automática, al instante** · etiqueta: 14 NO ESCRIBIR · baja (con la fecha en el nombre de la etiqueta o en una nota) · espera: ninguna. Sale a cualquier hora, incluso de madrugada: es la única excepción al horario

```
Listo, ya te saqué 💙 No te vuelvo a escribir.

Lo gratis se queda contigo igual, sin cuenta y sin que te escriba nadie: academiaseul.com/recursos

Y si algún día cambias de idea, aquí estoy. 화이팅 🐯
```

**P2 · Lo que pasa detrás, el mismo día (sin texto para la persona)** · etiqueta: 14 NO ESCRIBIR · espera: el mismo día, siempre menos de 24 horas

```
(Sin texto. El mismo día, sin excepción: etiqueta 14 NO ESCRIBIR con la fecha · baja en Brevo · pausa o bloqueo en ManyChat · y el contacto a la lista única de exclusión que Jay revisa ANTES de cada envío, lista que hoy no existe en ningún lado y hay que crear.

Una baja no respetada es una infracción del art. 28 B de la Ley 19.496 y, peor, una invitación a que reporten el número. Con un número que está impreso en toda la web, los correos, el folleto y la hoja resumen, una sola basta para arruinar el canal.)
```

## 8 · Palabras clave

| Palabra | Dónde se anuncia | Flujo |
|---|---|---|
| PRECIO | Se anuncia en el audio y en el texto en pantalla de cada reel de @jaychingu.oficial, en el comentario fijado de todos los posts y en el destacado INSCRÍBETE. Se configura en ManyChat (Instagram → Keywords, «contiene») y en Meta Business Suite para @academiaseul. | 1 · PRECIO / COSTO |
| COSTO · COSTOS · CUÁNTO CUESTA · CUANTO CUESTA · CUÁNTO VALE · CUANTO VALE · CUÁNTO SALE · CUANTO SALE · VALOR DEL CURSO | Solo como palabras clave de DM, no se anuncian: cubren la forma en que la gente pregunta de verdad. Se cargan una por una, con y sin tilde. | 1 · PRECIO / COSTO |
| PROGRAMA · PROGRAMAS | Palabra clave de DM en las dos cuentas. Manda el mismo mensaje del precio, que ya lleva academiaseul.com/p/resumen (la hoja de noviembre) y academiaseul.com/p/basico1 (el programa en PDF de noviembre). | 1 · PRECIO / COSTO |
| NO USAR: «info», «cuesta» ni «valor» solos | Saltan dentro de cualquier frase («me cuesta pronunciar», «vale la pena») y la persona recibe un precio que no pidió. A quien escribe «info» lo cubre la bienvenida. | ninguno · prohibidas |
| INSCRIBIRME | Se anuncia en el comentario fijado, en la lámina 4 del destacado INSCRÍBETE y al final de los reels. Es la palabra con más intención de compra de todas. | 2 · INSCRIBIRME / QUIERO |
| QUIERO · ME INSCRIBO · INSCRIPCIÓN · CUPO · CÓMO ME INSCRIBO · DÓNDE PAGO | Palabras clave de DM, no anunciadas. | 2 · INSCRIBIRME / QUIERO |
| CLASE | Se anuncia en los reels de campaña («comenta CLASE y te mando el link») y es una de las 5 de @academiaseul. Es la palabra clave de comentario→DM con intención de compra. | 2 · INSCRIBIRME / QUIERO |
| NIVEL | Se anuncia en el reel del test de nivel y en la historia de la caja de preguntas. También palabra clave de DM. | 3 · NIVEL |
| QUÉ CURSO · QUE CURSO · SOY PRINCIPIANTE · YA SÉ ALGO · PARA MI HIJO · PARA MI HIJA · PARA UN NIÑO · TENGO EL TOPIK | Palabras clave de DM, no anunciadas. | 3 · NIVEL |
| LECTOR | Se anuncia en el audio y en pantalla del Reel D («comenta LECTOR y te mando gratis la app para leer Hangul») y en el comentario fijado. Es el imán estrella: la app ya existe y no hay que construir nada. | 4 · GRATIS / HANGUL (variante Lector) |
| DUBU | Se anuncia en el reel o la historia de Dubu y en el pie de los posts dirigidos a adolescentes y familias. | 4 · GRATIS / HANGUL (variante Dubu) |
| RACE | Se anuncia en el reel de 한글 Race. Ojo: el juego todavía no está en el menú ni en /recursos (solo en el sitemap), así que la palabra clave es la única puerta y conviene usarla poco hasta que Jay lo apruebe. | 4 · GRATIS / HANGUL (variante Race) |
| TALLER | Se anuncia en la historia del taller («한글 en 60 minutos, gratis») y en el destacado. Es el único imán con formulario propio, así que es el que mejor registra el consentimiento. | 4 · GRATIS / HANGUL (variante Taller) |
| NOMBRE | Se anuncia en el Reel A («comenta tu nombre y te lo escribo en coreano»). Es el que genera más comentarios, porque la gente quiere ver SU nombre. | 4 · GRATIS / HANGUL (variante Nombre) |
| GRATIS | Palabra clave de DM en las dos cuentas (una de las 5 de @academiaseul). | 4 · GRATIS / HANGUL (paso P2, los 6 imanes juntos) |
| HANGUL · 한글 · ALFABETO · LEER COREANO · APP | Palabras clave de DM, no anunciadas. | 4 · GRATIS / HANGUL |
| HORARIO · HORA · QUÉ HORA | Palabra clave de DM en las dos cuentas (una de las 5 de @academiaseul). | 1 · PRECIO / COSTO (rama horario) y respuesta rápida /hora |
| CERTIFICADO · CERTI · DIPLOMA · TÍTULO | Palabra clave de DM en las dos cuentas (una de las 5 de @academiaseul). Respuesta fija escrita a mano, nunca generada por IA, y handoff inmediato a Jay: es el punto donde una palabra mal puesta se vuelve publicidad engañosa. | 7 · FUERA DE ALCANCE + respuesta rápida /certi |
| CHINGU | Se anuncia solo en el grupo de Básico 2 y a los ex-alumnos («dime CHINGU y te mando la imagen para tus historias»). No se anuncia en público. | 9 · EX-ALUMNOS |
| BAJA · STOP · CANCEL · CANCELAR · UNSUBSCRIBE · NO ME ESCRIBAS · SÁCAME · DAR DE BAJA | No se anuncian como palabra clave, pero SÍ van escritas al final de la bienvenida de WhatsApp y de todos los mensajes 1:1 («si no quieres más avisos, responde BAJA»). Configurarlas es lo primero que se hace, antes que cualquier otra. | 10 · BAJA / STOP |

## 9 · Etiquetas

Con la corrección 1 aplicada: la etiqueta 7 se parte en 7a Instagram, 7b WhatsApp y 7c correo, y ninguna se deriva de otra.

- 1 Interesado — habló de Básico 1 por DM o WhatsApp y todavía no sabe qué curso le toca. Se pone con el primer mensaje automático. Sale cuando pasa a 2, 4, 5 o 14. Es una de las del plan, y va con el mismo nombre en los tres lados: etiquetas de WhatsApp Business, tags de ManyChat y etiquetas de la bandeja de Instagram. Si el nombre no es idéntico, el esquema no sirve de nada.

- 2 Curso enviado — ya recibió el programa, la hoja o el link de su curso, y no ha pagado. Es la etiqueta de quien está decidiendo: la primera que Jay mira cada noche.

- 3 Formulario sin pago — llenó el formulario de /inscribete y el pago no entró. Son los contactos más calientes que existen: se revisan todos los días cruzando Formspree con Mercado Pago, PayPal y el banco. Es una de las del plan.

- 4 Inscrito · pagado — pago verificado por Jay en el banco o en la pasarela, nunca por un automático. Esta etiqueta la pone una persona. Además entra a la lista 02g Básico 1 noviembre en Brevo, para que los correos de campaña lo excluyan. Es una de las del plan.

- 5 Enero 2027 — pidió que le avisen para la próxima apertura, su nivel no calza con lo que está abierto, o dijo «ahora no». No recibe nada más de esta campaña. Es una de las del plan.

- 6 Imán entregado · LECTOR / DUBU / RACE / TALLER / NOMBRE — recibió un recurso gratis por comentario→DM. Una etiqueta por imán, no una genérica: es la única forma de saber qué reel y qué imán traen gente de verdad, y de decidir cuál convertir primero en capturador.

- 7 Consentimiento OK — dijo «Sí, avísame» a la pregunta del paso P3 del flujo 4. ManyChat guarda en un campo personalizado la fecha, la hora y el texto exacto que aceptó: la carga de probar el consentimiento es de la empresa, no del contacto. Es el único grupo al que se le puede escribir primero.

- 8 Solo material · nunca promoción — recibió el imán y dijo «No, gracias» al permiso. Se le responde si él escribe, y nada más. No se le vuelve a preguntar: preguntar dos veces es insistir.

- 9 Toque 1 — Jay ya le mandó el primer mensaje de seguimiento. Lleva la fecha.

- 10 Toque 2 · último — Jay ya le mandó el segundo. Si no responde a este, sale del seguimiento y pasa a 5 Enero 2027. Esta etiqueta es un freno, no un permiso.

- 11 Toque 3 — solo para quien respondió algún toque anterior y no ha pagado. Nadie recibe un cuarto mensaje, por ningún motivo.

- 12 Para Jay · conversación abierta — el bot se calló y hay alguien esperando respuesta humana. Es la etiqueta que Jay mira antes que todas, varias veces al día. Si esta cola crece, el bot está mal configurado: su trabajo es ahorrarle horas, no generarle cola.

- 13 Alumno · embajador — alumno actual o ex-alumno al que ya se le pidió el favor del «trae un chingu». Una vez por campaña: la etiqueta existe justamente para no pedirle dos veces.

- 14 NO ESCRIBIR · baja (con fecha) — pidió la baja. Se pone el mismo día, junto con la baja en Brevo y la pausa en ManyChat, y el nombre va a la lista única de exclusión que Jay revisa antes de cada envío. No se saca nunca, salvo que la propia persona escriba pidiendo volver. Es una de las del plan.

- REGLA DE USO — las etiquetas 1, 3, 4, 5 y 14 son las cinco del plan y son obligatorias; las demás son operativas. WhatsApp Business permite hasta 20, así que sobra espacio, pero no se inventan etiquetas nuevas sobre la marcha: una etiqueta que solo entiende quien la creó deja de servir el día que Jay delegue la bandeja.

- LO QUE NO SE ETIQUETA — nada sensible: ni la plata que dijo que tenía, ni su situación personal, ni notas sobre su carácter. La bandeja no es un CRM privado: si algún día alguien más la abre, todo lo escrito ahí queda a la vista.

## 10 · Respuestas rápidas para la app de WhatsApp Business

Estas las usas tú a mano, desde hoy, sin pagar nada. Las seis de la corrección 6 van primero: `/costo`, `/b1`, `/pago`, `/hora`, `/certi`, `/enero`.

### `/costo`

```
¡Hola! Soy Jay, de Academia Seúl 💙 Gracias por escribir.

Ahora está abierto *Básico 1 · coreano desde cero*, con Kiran (기란), profesora coreana criada en Argentina que te explica en español.
🗓️ 8 martes desde el *martes 10 de noviembre* · 20:00 hora de Chile · en vivo por Zoom, 60 min
💰 *Precio de lanzamiento, hasta el domingo 8: US$120 el curso completo · o 2 cuotas de US$60* (precio normal: US$150 el curso completo · o 2 cuotas de US$75)
🎁 Grabación de cada clase, material con audio nativo, grupo de WhatsApp y certificado incluido

El curso en una hoja: academiaseul.com/p/resumen
¿Partes desde cero o ya lees algo de 한글?
```

### `/b1`

```
¡Perfecto, desde cero se puede! 🌱 Tu curso es *Básico 1 (A1.1)* con Kiran. En las clases 1 y 2 ya lees y escribes 한글, y al final te presentas, hablas de tu familia y cuentas lo que te gusta, en coreano.

Sigue el libro 한글학교 한국어 1, con material propio y audio nativo. Romanización solo en las clases 1 y 2; desde la 3, puro 한글.

🗓️ 8 martes desde el *martes 10 de noviembre* · 20:00 hora de Chile
💰 Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60

Programa semana a semana: academiaseul.com/p/basico1
Formulario: academiaseul.com/inscribete?clase=a11-martes

¿Te guardo el cupo? 🐯
```

### `/pago`

```
¡Genial! 🙌 Con el precio de lanzamiento (hasta el *domingo 8*) lo coordinamos así:

1️⃣ *Transferencia en Chile:* $120.000 el curso completo · o 2 cuotas de $60.000, sin comisión. Te paso los datos por aquí.
2️⃣ *Tarjeta (Mercado Pago):* en academiaseul.com/inscribete?clase=a11-martes llenas el formulario, eliges el plan y tocas el botón: el monto se calcula con el precio de lanzamiento.
3️⃣ *PayPal, en dólares:* te mando el link por aquí.

Te recomiendo llenar primero el formulario, así el cupo queda a tu nombre. Cuando pagues, mándame el comprobante por aquí y te confirmo 💙
```

### `/cuotas`

```
¡Sí, se puede en 2 cuotas! 💙 Hasta el *domingo 8*: *US$120 el curso completo · o 2 cuotas de US$60* (en Chile, $60.000 por cuota por transferencia, sin comisión).

La primera la pagas al inscribirte y la segunda antes de tu clase 5. Yo te aviso unos días antes, así no tienes que acordarte.

¿Te acomoda en 2 cuotas? Te paso los datos al tiro 🐯
```

### `/caro`

```
Te entiendo 💙 Por eso se puede en 2 cuotas: *US$120 el curso completo · o 2 cuotas de US$60*, hasta el domingo 8.

Son 8 clases en vivo de 60 minutos con una profe coreana, más la grabación de cada clase, el material de cada semana con audio nativo, el grupo de WhatsApp y el certificado: US$15 por clase. Es el precio más bajo que vamos a tener, y desde el lunes vuelve a US$150 el curso completo · o 2 cuotas de US$75.

¿Te acomoda en 2 cuotas?
```

### `/dcto`

```
No hay descuentos sueltos: el precio es el mismo para todos. Lo que hay ahora es el *precio de lanzamiento, hasta el domingo 8: US$120 el curso completo · o 2 cuotas de US$60*, que es un 20 % menos que el normal.

Y si entras con un amigo o amiga antes del domingo 8, a los dos les regalo una sesión 1:1 de 20 minutos conmigo para practicar pronunciación 🐯 ¿Tienes a alguien con quien inscribirte?
```

### `/hora`

```
¡La web te lo resuelve! En academiaseul.com/inscribete los horarios salen en la hora de tu país.

De referencia, las *20:00 de Chile* son:
🇦🇷 🇺🇾 20:00 Argentina y Uruguay
🇧🇴 🇻🇪 19:00 Bolivia y Venezuela
🇵🇪 🇨🇴 🇪🇨 18:00 Perú, Colombia y Ecuador
🇺🇸 18:00 EE. UU. (Este)
🇲🇽 17:00 México
🇪🇸 00:00 España (ya es miércoles)

Y si un martes no llegas, la grabación te llega dentro de 24 horas. ¿Desde qué país me escribes? Te confirmo tu hora exacta 💙
```

### `/vivo`

```
¡Sí, en vivo! 🐯 Una clase por Zoom a la semana, de 60 minutos, con Kiran y un grupo chico, con cámara y micrófono para hablar y que te corrijan en el momento.

No son videos pregrabados: la grabación es un respaldo que te llega dentro de 24 horas por si un día no puedes llegar.

¿Te queda alguna otra duda? 💙
```

### `/espanol`

```
¡Sí! En Básico 1, Kiran *explica en español* y se practica en coreano. Ella es coreana criada en Argentina, así que te entiende el español perfecto y te corrige la pronunciación como una nativa.

Y cualquier duda de pago, horario o material la ves conmigo, en español, por aquí 💙
```

### `/certi`

```
¡Sí, está incluido! Al terminar recibes el certificado digital de Academia Seúl de tu nivel (Básico 1 · A1.1); para otorgarlo se consideran tu asistencia y tu participación.

Te lo digo claro, porque corresponde: es un *certificado propio de la academia, no una acreditación oficial* ni un título con reconocimiento estatal, y no reemplaza al examen TOPIK. Lo que sí hace es habilitarte directo para Básico 2 💙

¿Te queda alguna otra duda?
```

### `/nivel`

```
¡Buena pregunta! 🐯 Dime cuál eres y te lo digo al tiro, sin venderte humo:

1️⃣ No sé nada de coreano → *Básico 1*, que es justo lo que está abierto.
2️⃣ Leo 한글 lento o nunca tuve clases con profe → *Básico 1* también te sirve: las clases 1 y 2 son tu repaso y desde la 3 es hablar.
3️⃣ Ya converso un poco → Básico 1 te queda chico. *Básico 2* ya está en curso, y Conversacional 1 y TOPIK II vuelven en *enero de 2027*.

Y si quieres asegurarte, el test es gratis y el resultado te sale al instante: academiaseul.com/test-nivel
```

### `/pensar`

```
¡Claro, piénsalo con calma! 💙 Si hay algo puntual que te haga dudar (el horario, el nivel o el pago), cuéntamelo y lo vemos ahora mismo.

Solo para que lo tengas: el precio de lanzamiento se va el *domingo 8 a las 23:59* (hora de Chile) y la matrícula cierra el *lunes 9*. Empezamos el *martes 10 a las 20:00*.

¿Te parece si te escribo el sábado para ver cómo vas? 🐯
```

### `/gratis`

```
¡Toma, todo gratis, sin cuenta y sin letra chica! 🎁

🔊 Lector de Hangul, con voz nativa: academiaseul.com/lector-coreano
🧩 Dubu · 두부, el puzzle del Hangul: academiaseul.com/dubu
🏁 한글 Race, leer contra el reloj: academiaseul.com/hangul-race
🎬 La clase completa de Hangul, 60 min grabados: academiaseul.com/taller
✍️ Tu nombre en coreano: academiaseul.com/generador-nombre
📊 Test de nivel, resultado al instante: academiaseul.com/test-nivel

Todo esto es tuyo y no tienes que darme nada a cambio 💙
```

### `/permiso`

```
Una cosita y te dejo tranquilo 🙏

¿Te aviso por aquí cuando abramos clases nuevas y cuando saque material gratis nuevo? Sería un mensaje de vez en cuando, nada de spam, y te sales cuando quieras escribiendo *BAJA*.

Si me dices que no, igual te quedas con todo lo de arriba: eso ya es tuyo y no se lo cambio a nadie por un permiso 💙
```

### `/dato1`

```
¡Hola de nuevo! Jay 🐯 Un dato de Básico 1 que no te conté: la lectura la practicas de tarea en el Lector, con voz nativa y gratis (academiaseul.com/lector-coreano), así la hora en vivo con Kiran es para hablar y no para mirar el alfabeto.

El precio de lanzamiento (US$120 el curso completo · o 2 cuotas de US$60) dura hasta el *domingo 8*. ¿Te quedó alguna duda de horario, de nivel o de pago? 💙
```

### `/cierra`

```
¡Hola! Te escribo corto 🐯

*Hoy domingo 8, a las 23:59 (hora de Chile)*, termina el precio de lanzamiento de Básico 1: *US$120 el curso completo · o 2 cuotas de US$60*. Desde mañana vuelve a US$150 el curso completo · o 2 cuotas de US$75, y la matrícula cierra el *lunes 9 a las 23:59*.

Empezamos el *martes 10 a las 20:00*: academiaseul.com/inscribete?clase=a11-martes

¿Te ayudo a inscribirte o lo dejamos para enero? Cero presión 💙
```

### `/manana`

```
¡Hola! *Mañana lunes 9, a las 23:59 (hora de Chile)*, cierra la matrícula de Básico 1. El precio de lanzamiento ya terminó, así que ahora es *US$150 el curso completo · o 2 cuotas de US$75*.

Primera clase: *martes 10 a las 20:00*, con Kiran, en vivo por Zoom.
👉 academiaseul.com/inscribete?clase=a11-martes

¿Entras? Te ayudo con lo que necesites 🐯
```

### `/enero`

```
¡Gracias por contarme, de verdad! 💙 Cero presión: cuando sea tu momento, aquí estamos.

Mientras, para que el coreano no se enfríe, todo esto es gratis:
🎬 Clase completa de Hangul, grabada: academiaseul.com/taller
🔊 Lector de Hangul con voz nativa: academiaseul.com/lector-coreano
🏁 한글 Race: academiaseul.com/hangul-race

Y te anoto para *enero de 2027*, así te aviso primero cuando abra la próxima clase: academiaseul.com/notificarme 🐯
```

### `/sigo`

```
Buena pregunta 🙏 El cupo se confirma con el pago y, una vez que el curso empieza, el pago no es reembolsable. Pero si por algo no puedes seguir, me escribes y buscamos una solución juntos, como pasarte a una clase posterior.

Y si la academia cancelara un curso antes de empezar, se devuelve el 100 % de lo pagado: está publicado en academiaseul.com/terminos 💙

¿Te queda alguna otra duda?
```

### `/grupo`

```
Buena pregunta 🙏 Te lo confirmo yo personalmente *antes* de que pagues, así no te arriesgas a nada.

Y para tu tranquilidad: si la academia cancela un curso antes de empezar, se devuelve el 100 % de lo pagado (academiaseul.com/terminos) 💙
```

### `/yapague`

```
¡Gracias! 🙌 Mándame por aquí el comprobante, tu nombre completo y el curso, y te confirmo el cupo.

Si pagaste directo desde el link y todavía no llenaste el formulario, llénalo aquí para que tenga tus datos: academiaseul.com/inscribete?clase=a11-martes

Qué viene después:
1️⃣ Te confirmo el cupo por aquí.
2️⃣ El *lunes 9* te llega tu link de Zoom, el grupo de WhatsApp de la clase y qué tener a mano.
3️⃣ El *martes 10 a las 19:00* te mando el recordatorio con el link.

Para ir calentando, gratis: academiaseul.com/dubu y academiaseul.com/lector-coreano 🐯
```

### `/gracias`

```
¡Pago recibido! 🎉 Tu cupo en *Básico 1 con Kiran* está confirmado.

🗓️ Primera clase: *martes 10 de noviembre, 20:00 hora de Chile*
💻 Por Zoom, 60 min. La sala se abre a las 19:55.
📩 El *lunes 9* te llega tu link de Zoom y el grupo de WhatsApp de la clase (si no lo ves, revisa Promociones o Spam).

Gracias por confiar en Academia Seúl 💙 화이팅!
```

### `/chingu`

```
¡Hola! 🐯 Una pregunta: ¿tienes a alguien (amigo, amiga, hermano, pareja, compañero de pega) que siempre ha querido aprender coreano y nunca ha partido?

El *martes 10 de noviembre* empieza *Básico 1 desde cero con Kiran*: martes 20:00 (hora de Chile), 8 martes en vivo por Zoom. Hasta el *domingo 8*: US$120 el curso completo · o 2 cuotas de US$60.

Si alguien entra de tu parte, a los dos les regalo una sesión 1:1 de 20 minutos conmigo 💙 Le puedes reenviar esto: academiaseul.com/inscribete?clase=a11-martes
친구랑 같이 배워요! 화이팅!
```

### `/ninos`

```
¡Qué bueno! 🧒 *Coreano para Niños (8–15)* es un curso aparte, con Abby y conmigo, y *vuelve en enero de 2027*: hoy no está abierto, y no te voy a ofrecer Básico 1 como si fuera lo mismo, porque es un curso de adultos.

Te anoto en la lista de espera y les aviso primero: academiaseul.com/notificarme

Y mientras, gratis y perfecto para su edad: Dubu (academiaseul.com/dubu) y 한글 Race (academiaseul.com/hangul-race) 💙
```

### `/b2`

```
¡Qué bueno que quieras seguir! 💙 Tu siguiente paso es *Básico 2 (A1.2)*, pero te soy honesto: ya está en curso (empezó el 21 de octubre), así que entrar ahora sería a mitad de camino y no te lo recomiendo.

Te anoto para la próxima apertura y te aviso primero: academiaseul.com/notificarme

Y si conoces a alguien que quiera partir de cero, Básico 1 empieza el martes 10: academiaseul.com/inscribete?clase=a11-martes 🐯
```

### `/topik`

```
*TOPIK II (B1+)* vuelve en *enero de 2027*, con cupo de 8 personas y enfocado 100 % en el examen: corrección de 쓰기 y simulacros.

Antes de que pagues hacemos un diagnóstico por aquí, porque si el nivel no calza prefiero decírtelo que venderte el curso 🙏

Anótate y te aviso primero: academiaseul.com/notificarme 💙
```

### `/viaje`

```
¡Sí sirve, y desde la primera semana! 🇰🇷 En Básico 1 aprendes a leer 한글 (carteles, menús, letras de canciones), a presentarte y a decir adónde vas y qué te gusta.

Te soy honesto: en 8 clases te llevas una base sólida, no fluidez. Es el primer peldaño, y es el que cuesta más dar solo 🐯

¿Partes desde cero o ya tienes algo de base?
```

### `/baja`

```
Listo, ya te saqué 💙 No te vuelvo a escribir.

Lo gratis se queda contigo igual, sin cuenta y sin que te escriba nadie: academiaseul.com/recursos

Y si algún día cambias de idea, aquí estoy. 화이팅 🐯
```

### `/espera`

```
Dame un ratito y te respondo bien 🙏 Estoy en clase ahora, pero te contesto yo mismo hoy, no un robot.

Si es urgente, dime «urgente» y lo vemos al tiro 💙
```

### `/pospago`

```
Básico 1 *ya empezó* (martes 10 de noviembre), así que no te voy a vender un cupo a mitad de camino 💙 La próxima clase abre en *enero de 2027* y te puedo avisar primero: academiaseul.com/notificarme

Mientras, esto te deja listo para enero y es gratis:
🎬 La clase completa de Hangul, 60 min: academiaseul.com/taller
🔊 El Lector con voz nativa: academiaseul.com/lector-coreano
🧩 Dubu: academiaseul.com/dubu

Cuéntame qué buscas y te digo por dónde partir 🐯
```

## 11 · Plantillas de WhatsApp (solo para la Fase 5, enero de 2027)

No se manda ninguna hasta decidir el número. Y con la corrección 1: las de marketing solo a la etiqueta 7b.

### NOTA ANTES DE MANDAR CUALQUIERA A APROBACIÓN (leer primero) · nota operativa · no es una plantilla

**Cuándo:** Leer antes de crear la primera plantilla en el Business Manager.

```
Estas plantillas NO se usan hoy, y hoy no debe haber API de WhatsApp. El +56 9 4211 5562 está impreso en la web, los correos, el folleto y la hoja resumen; conectarlo a la Cloud API borra el historial (Meta lo dice textual: «your existing messaging history will be lost») y deja el número inhabilitado para la app de WhatsApp Business. Se perderían las conversaciones con los ex-alumnos de julio y con el grupo de Básico 2, y el celular dejaría de servir para contestar a mano, que es justo lo que hoy funciona.

Cuando llegue el momento (enero de 2027, con al menos una clase abierta y funcionando), estas plantillas van sobre un CHIP PREPAGO NUEVO, nunca sobre el número publicado.
```

_Mandarlas a aprobación 48 horas antes de cualquier campaña: la revisión de Meta puede tardar hasta 24 horas y una plantilla rechazada el mismo día deja la campaña sin canal. Y antes de la primera campaña real: cargar US$5 en el Manychat Wallet, mandar 10 mensajes y comparar el cobro contra la tarifa de Meta (las tablas de ManyChat son exactamente 1,15× las de Meta en marketing y utility)._

### b1_recordatorio_clase · utility

**Cuándo:** El día de cada clase, 1 hora antes. Solo a alumnos con la etiqueta 4 Inscrito · pagado. Es el único mensaje del flujo de alumnos que vale la pena automatizar.

```
Hola {{1}}, te recordamos que tu clase de {{2}} en Academia Seúl empieza hoy a las {{3}} (hora de Chile).

Tu enlace de Zoom: {{4}}

La sala se abre 5 minutos antes. Si tienes algún problema para entrar, responde a este mensaje y te ayudamos.
```

_Pasa como utility porque es el seguimiento de una transacción que la persona inició (se matriculó y pagó): no hay precio, ni descuento, ni «últimos cupos», ni invitación a comprar nada. Sin emojis promocionales ni botón de marketing. Meta nombra expresamente la mala clasificación de plantillas como causa de sanción, así que esta plantilla NUNCA se reutiliza para avisar de una apertura o de un precio: para eso está as_apertura_clase_nueva, que es marketing y se paga._

### b1_cuota_2_aviso · utility

**Cuándo:** Unos días antes de la clase 5, solo a quienes pagaron en 2 cuotas (etiqueta 4 Inscrito · pagado). La fecha exacta de la cuota 2 está [POR CONFIRMAR con Jay]; /terminos §3 dice «antes de la clase 5».

```
Hola {{1}}, te escribimos de Academia Seúl por la segunda cuota de tu curso {{2}}.

Monto: {{3}}
Se paga antes de tu clase 5, el {{4}}.

Responde a este mensaje y coordinamos el pago por el medio que prefieras.
```

_Utility legítima: avisa de un pago pendiente de una transacción ya existente. El monto aquí NO es publicidad, es el saldo de algo que la persona ya compró, y eso sí puede ir en una utility. Lo que la haría caer en marketing sería agregar «aprovecha», «últimos días» o el precio de otro curso. No lleva ningún enlace de pago dentro: el pago se coordina respondiendo, lo que además abre la ventana de 24 h y deja de costar._

### b1_grabacion_lista · utility

**Cuándo:** Dentro de las 24 horas siguientes a cada clase, a los alumnos del grupo. Sirve sobre todo para quien no pudo asistir en vivo.

```
Hola {{1}}, ya está lista la grabación de tu clase {{2}} de {{3}}.

La encuentras en el grupo de tu clase. Si no la ves, responde a este mensaje y te la enviamos.
```

_Utility clara: cumple algo que se le prometió al alumno al matricularse («la grabación te llega dentro de 24 horas»). Sin precio, sin oferta, sin enlace externo. El «responde a este mensaje» es el patrón correcto: en vez de empujar a comprar, abre la ventana de servicio._

### as_apertura_clase_nueva · marketing

**Cuándo:** Cuando abre una clase nueva (enero de 2027), SOLO a contactos con la etiqueta 7 Consentimiento OK y sin la 14. Nunca a una lista comprada, nunca a quien no dio permiso, y nunca a números de Estados Unidos: Meta no entrega plantillas de marketing a números de EE. UU. y devuelve error (a ellos, correo por Brevo y DM de Instagram).

```
Hola {{1}}, soy Jay de Academia Seúl. Nos diste permiso para avisarte cuando abriéramos clases nuevas de coreano, así que aquí va.

Abrimos {{2}}: empieza el {{3}} y las clases son en vivo por Zoom, en español.

Toda la información y la inscripción: {{4}}

Si no quieres recibir más avisos, responde BAJA y no te volvemos a escribir.
```

_Declarada marketing desde el principio, que es lo honesto y lo que evita la sanción. Tres cosas la hacen aprobable y defendible: la primera línea identifica a la empresa y recuerda el permiso; hay vía de baja explícita en el cuerpo, como exige el art. 28 B de la Ley 19.496; y no promete nada que no esté publicado. El precio puede ir en {{2}} con la fórmula exacta de la casa («US$120 el curso completo · o 2 cuotas de US$60»), nunca «desde» ni «/mes». Si se hace campaña paga, empezar por Colombia (≈US$0,0125 por mensaje) y México (≈US$0,0397), no por Chile (≈US$0,0889: una difusión a 1.000 chilenos se come el 74 % de una matrícula)._

### as_material_gratis · marketing

**Cuándo:** Cuando se publica un recurso gratis nuevo (un juego, una guía, un nivel de Tigre 100), solo a la etiqueta 7 Consentimiento OK. Es el mensaje que mantiene vivo el contacto entre campañas sin pedir nada, y el que hace que en enero la gente abra en vez de reportar.

```
Hola {{1}}, soy Jay de Academia Seúl. Te escribimos porque nos diste permiso para mandarte material gratis de coreano.

Acabamos de publicar {{2}}, y es gratis, sin crear cuenta: {{3}}

Si te sirve, cuéntanos qué te pareció respondiendo aquí. Y si no quieres más avisos, responde BAJA.
```

_Marketing, porque promociona a la academia aunque lo que entregue sea gratis: no se intenta disfrazar de utility. Pide una respuesta de forma natural («cuéntanos qué te pareció»), que es la jugada correcta: si responde, se abre la ventana de 24 h y los mensajes siguientes dejan de costar. Lleva baja explícita y no condiciona la entrega del material a nada._

### as_retomamos_conversacion · marketing

**Cuándo:** Una sola vez por persona, y solo a quien escribió primero en algún momento Y tiene la etiqueta 7 Consentimiento OK. Jamás a quien nunca escribió, jamás a una lista importada.

```
Hola {{1}}, soy Jay de Academia Seúl. Hace un tiempo me escribiste preguntando por las clases de coreano y quedó la conversación a medias.

¿Sigues con ganas de aprender? Cuéntame y te digo qué hay abierto ahora.

Si ya no te interesa, responde BAJA y no te escribo más.
```

_Es la más delicada del set, así que va deliberadamente corta y sin oferta: no dice precio, no dice fecha, no dice «últimos cupos». Solo pregunta. Así es marketing limpio y, si la persona contesta, la venta sigue dentro de la ventana de 24 h, gratis y con Jay escribiendo. No armar una secuencia con esto: el límite por usuario de plantillas de marketing es adaptativo, Meta deja de entregar (error 131049) y reintentar antes de 24 h puede bloquear la entrega a esa persona otras 24 h. Un toque, bien escrito, con una pregunta que provoque respuesta._

## 12 · Lo que el bot nunca puede decir ni hacer

- NUNCA escribe primero. Ni el bot ni ninguna automatización inician una conversación: solo responden a quien escribió, comentó, respondió una historia, tocó un botón o hizo clic en un anuncio. La Developer Policy 5.2.a de Meta lo prohíbe expresamente y la política de WhatsApp exige opt-in confirmado. La escalera de sanciones va de aviso a bloqueo de 1–3 días, de 5–30 días, bloqueo indefinido y baja permanente, y lo que está en juego es @jaychingu.oficial, que no se recupera.

- NUNCA manda un link de pago, un monto en pesos ni datos bancarios. Con el precio de lanzamiento no existen links de US$120 ni de US$60 (Jay los crea), así que todo el que dice «sí» pasa por Jay. El bot dice el precio en dólares UNA vez, con el texto fijo, y se calla.

- NUNCA pide ni recibe contraseñas, números de tarjeta, códigos que lleguen por SMS, fotos de carnet ni documentos de identidad. Si alguien los ofrece, responde «eso no lo manejamos por aquí» y avisa a Jay. Y lo dice al revés también, para proteger a la persona: «por aquí nunca te vamos a pedir tu clave ni tu tarjeta; si alguien lo hace, no somos nosotros».

- NUNCA confirma un pago ni un cupo. No dice «tu pago está confirmado», «recibimos tu transferencia» ni «tu cupo está reservado», y no manda links de Zoom ni del grupo de WhatsApp. Eso lo hace Jay, con el banco a la vista. Un automático que confirma un pago que no entró cuesta un alumno y la confianza de todos los que lo cuenten.

- NUNCA da a entender que el certificado es un título oficial. Es un certificado propio de Academia Seúl, sin reconocimiento estatal, y no reemplaza al examen TOPIK. La palabra clave CERTIFICADO tiene respuesta fija, escrita a mano, que lo dice de frente. Nada de «título», «acreditado», «avalado», «oficial» ni «reconocido».

- NUNCA improvisa precios, fechas, horarios ni nombres de cursos. Todos los números y fechas están escritos en estos textos; si una conversación necesita un dato que no está, el bot entrega a Jay. No se activa IA generativa en ninguna rama de venta: una IA que invente «US$99» o «empieza el 12» genera un problema real con una persona real.

- NUNCA dice el mínimo de alumnos para abrir una clase. Si preguntan «¿y si no se junta el grupo?»: «Te lo confirmo yo personalmente antes de que pagues», más lo publicado en /terminos §4 (si la academia cancela antes de empezar, se devuelve el 100 %). El mínimo es una decisión interna y no está publicado.

- NUNCA usa «cohorte» con alumnos ni interesados: se dice «clase» o «grupo». «Cohorte» solo en código y documentos internos.

- NUNCA escribe el precio mal. La fórmula es exacta y completa: «US$120 el curso completo · o 2 cuotas de US$60». Nunca «desde US$120», nunca «US$60/mes» sin el «×2», nunca el precio partido en dos mensajes. Desde el lunes 9: «US$150 el curso completo · o 2 cuotas de US$75».

- NUNCA dice «Nivel 1». Los nombres son Básico 1 (A1.1), Básico 2 (A1.2), Conversacional 1 (A2.1), TOPIK II (B1+) y Coreano para Niños (8–15). El «Nivel 1» de julio de 2026 equivale a Básico 1, y si alguien lo menciona se le dice explícito.

- NUNCA ofrece un curso que no está abierto como si lo estuviera. Hoy solo Básico 1 está abierto; Básico 2 está en curso y Conversacional 1, TOPIK II y Niños vuelven en enero de 2027. A quien pide esos cursos se le manda a /notificarme, no se le empuja a Básico 1.

- NUNCA recomienda un nivel cuando la persona escribe texto libre sobre su experiencia («estudié un año en Corea», «tengo TOPIK 3»). Ahí el bot entrega a Jay: recomendar mal un curso de US$120 es peor que no responder.

- NUNCA insiste. Máximo 3 toques de seguimiento por persona en toda la campaña, y si no responde dos toques seguidos, se termina: nada de cuarto mensaje, nada de meterla a una difusión, nada de probar por el otro canal. Lo que castiga Meta son los reportes negativos, y lo que los genera es insistir.

- NUNCA usa difusiones como canal de campaña. Solo llegan a quien tiene el número guardado (a un lead nuevo no le llega nada), hay un tope mensual de difusiones gratis en despliegue, y WhatsApp bloquea cuentas que son reportadas varias veces. La difusión sirve para alumnos y ex-alumnos, no para captar.

- NUNCA pone precio, descuento, «últimos cupos» ni una fecha de cierre dentro de una plantilla declarada utility. Meta nombra expresamente la mala clasificación como causa de sanción. El precio va en marketing, y se paga.

- NUNCA hace campañas de marketing por WhatsApp a números de Estados Unidos: Meta no entrega plantillas de marketing a números de EE. UU. y devuelve error. Para los hispanohablantes de EE. UU.: correo por Brevo, DM de Instagram y la ventana de 24 h cuando ellos escriban.

- NUNCA escribe primero a un contacto de España, por ningún canal, salvo que haya marcado la casilla de permiso o sea ex-alumno (excepción del art. 21.2 de la LSSI, y solo si el mensaje habla de cursos de coreano y lleva vía de baja).

- NUNCA condiciona la entrega de un recurso gratis a aceptar publicidad, y el botón o la casilla de permiso nunca va premarcado. El Lector, Dubu, 한글 Race, el taller, el generador de nombre y el test se entregan igual si la persona dice «No, gracias». Y no se pregunta dos veces.

- NUNCA ignora una baja. BAJA, STOP, CANCEL o UNSUBSCRIBE se responden al instante, a cualquier hora, y la baja se ejecuta el mismo día en WhatsApp, Brevo y ManyChat. Es el único automático sin horario.

- NUNCA contesta con un automático un reclamo, una queja, un tema de salud, un duelo, algo que involucre a un menor de edad, un mensaje de un periodista o una institución, ni un mensaje de un alumno actual. Ahí el bot se calla y Jay escribe a mano, aunque tarde tres horas.

- NUNCA promete un plazo de respuesta que Jay no pueda cumplir. Si el mensaje dice «te respondo yo hoy mismo», tiene que ser verdad: un «te respondo yo» sin respuesta es peor que no haber puesto nada, y rompe exactamente lo que hace funcionar a @jaychingu.oficial.

- NUNCA suena a call center. Nada de «Estimado cliente», «su consulta será atendida», «nuestro ejecutivo» ni «hemos recibido su solicitud». Se escribe como escribe Jay: cercano, chileno neutro, chingu, un emoji donde suma, 화이팅. La marca se construyó sobre que él contesta: un bot que lo disimule la mata.

- NUNCA usa rojo, rosado, coral ni magenta en ninguna pieza visual asociada al bot (imágenes, stickers, placas de cierre, tarjetas). El azul es #4236F6, el navy #003478 y el acento es oro. El rojo en la cultura coreana se asocia con la muerte, y eso es justo lo que la academia vende.

- NUNCA se deja corriendo si el número o la cuenta dan señales malas. Si WhatsApp Manager baja la calidad del número, o aparecen reportes o comentarios negativos en la bandeja de Instagram, la automatización se apaga ESE día. Esta regla tiene veto sobre cualquier objetivo de campaña.

- NUNCA sube a Brevo un correo que ManyChat haya recogido de Instagram sin consentimiento propio (Platform Terms 3.a de Meta): el correo se pide otra vez, dentro de la conversación, con su propia pregunta de permiso.

## 13 · Qué se mide cada semana

- CONVERSACIONES NUEVAS INICIADAS POR OTROS (la métrica madre): cuánta gente le escribió primero esta semana, por WhatsApp y por DM de Instagram, sumando los dos canales. Funcionó si pasa de 10 a la semana en noviembre. Es la única métrica que mide si el embudo trae gente; los seguidores no miden nada.

- DMs AUTOMÁTICOS ENTREGADOS POR PALABRA CLAVE y cuántos de esos CONTESTARON. Funcionó si contesta 1 de cada 4 (25 %). Si contesta menos, el problema es el texto del DM: le falta la pregunta que obliga a responder. Recordar que es un solo mensaje por persona y no hay segundo intento.

- ALUMNOS PAGADOS EN LA SEMANA (el número que manda). Para Básico 1 de noviembre: la clase se declara llena con 3 o 4 alumnos, que es el mínimo que decidió Jay. Hoy hay 1. El plan completo funcionó si el martes 10 de noviembre la clase abre; funcionó muy bien si abre con 5 o más.

- TIEMPO DE JAY POR ALUMNO CERRADO: horas que gastó atendiendo mensajes dividido por alumnos pagados. Funcionó si baja respecto de la semana anterior. Es la métrica del bot: su trabajo es comprarle tiempo a Jay, no generarle más ruido. Si el bot aumenta las horas, el bot está mal configurado.

- CONTACTOS NUEVOS CON CONSENTIMIENTO REGISTRADO (correo o WhatsApp, con fecha, hora y texto aceptado). Funcionó si entran 15 a la semana. Es el activo que queda cuando la campaña termina, y el único que sirve para enero de 2027.

- CALIDAD Y ESTADO DEL NÚMERO en WhatsApp Manager (Account tools → Phone numbers) y comentarios negativos en la bandeja de Instagram. El número que define el éxito es ZERO: cero bajadas de calidad, cero bloqueos, cero reportes. Un amarillo es una alarma; 7 días en Flagged bajan el límite de inmediato. Esta métrica tiene veto sobre todas las demás: si se degrada, se apaga la automatización ese día.

- BAJAS Y PEDIDOS DE STOP atendidos en menos de 24 horas, en los tres canales (WhatsApp, Brevo y ManyChat). Funcionó si es el 100 %. Una sola baja no respetada es una infracción del art. 28 B y una invitación a que reporten el número.

- COSTO POR CONVERSACIÓN INICIADA del anuncio Click-to-WhatsApp, medido en Ads Manager con datos propios. Funcionó si queda bajo US$3. Si en 7 días y US$21 no hay ninguna conversación, se apaga y no se repite.

- CONTACTOS ACTIVOS USADOS EN MANYCHAT contra el límite del plan (25 en Free, 250 en Essential). Es el semáforo del gasto: cuando se llene Free se pasa a Essential (US$14–17), NO a Pro. Pasar a Pro solo se justifica con WhatsApp conectado y al menos una clase abierta.

- REVISIÓN SEMANAL, 20 MINUTOS, LUNES POR LA NOCHE: Jay anota estos nueve números en una sola hoja. Si en tres semanas seguidas las conversaciones iniciadas no suben y los alumnos pagados no se mueven, el problema no es la herramienta: es la oferta o el reel, y hay que cambiar eso antes de pagar un peso más de software.

## 14 · Lo que hay que verificar antes de pagar algo

Los precios de ManyChat de este documento vienen de análisis de terceros que coinciden entre sí: **manychat.com/pricing y su centro de ayuda bloquean la lectura automática**, así que no se pudieron leer en la fuente oficial. Ábrelos tú en el navegador antes de pagar.

### manychat

- Los precios de ManyChat no están verificados en la fuente oficial. manychat.com/pricing y help.manychat.com devuelven HTTP 403 a cualquier lectura automática, y la página tiene verificación anti-bot de Cloudflare que NO intenté saltar (es una restricción que debo respetar). Todas las cifras de planes, contactos y excedentes vienen de análisis de terceros que coinciden entre sí. Jay tiene que abrir manychat.com/pricing en su navegador normal y confirmar: nombres de los planes, precio mensual y anual, contactos incluidos, excedente por contacto, y en qué plan aparece WhatsApp. Lo mismo en la pantalla de checkout antes de pagar.

- Si las funciones de IA de ManyChat (AI Step, intenciones, agente) vienen incluidas en Pro o se cobran US$29 al mes aparte. Las fuentes se contradicen según su fecha. Es la diferencia entre US$29 y US$58 al mes. Verificar en el checkout de ManyChat.

- Si ManyChat cobra por créditos de IA aparte del plan. No encontré ninguna fuente que lo afirme, pero tampoco la página oficial que lo descarte.

- Si el +56 9 4211 5562 está hoy en WhatsApp normal o en la app de WhatsApp Business. Esto no se puede averiguar desde fuera: Jay tiene que mirar el ícono en su teléfono. De esta respuesta depende si conectar el número a la API le borra o no las conversaciones. Hasta saberlo, el plan debe asumir el peor caso (WhatsApp normal) y no tocar el número.

- El estatus exacto de ManyChat ante Meta: si es Solution Partner (con línea de crédito, factura los mensajes) o Tech Provider (Meta te cobra directo). Su centro de ayuda habla de un «Manychat Wallet» y de cobrar por cada mensaje de plantilla entregado, lo que apunta a Solution Partner, pero no pude leer la página (403) ni encontrar a ManyChat en el directorio oficial de partners de Meta. Importa para saber quién le cobra a Jay y en qué moneda.

- Los detalles del Manychat Wallet: si exige recarga mínima, en qué moneda, y si ManyChat aplica recargo sobre la tarifa de Meta. La página de ayuda (help.manychat.com/hc/en-us/articles/14281380243740) devuelve 403.

- Si Coexistence de ManyChat está disponible hoy para números chilenos (+56). Un blog de ManyChat de hace ~1 año excluía varios países y lo llamaba beta; fuentes de terceros de octubre de 2026 dicen que Meta ya no documenta restricciones de país. Hay reportes de usuarios a quienes la opción no les aparece. Hay que probarlo en la pantalla de alta de WhatsApp de ManyChat, o preguntar a su soporte, antes de comprometer el plan a esta ruta.

- Si el límite de ManyChat de «una cuenta por tipo de canal» admite alguna excepción en los planes altos. La fuente principal son hilos del foro de ManyChat (incluido un miembro del equipo) y un blog de terceros, no la página oficial de precios. Un usuario del foro sugirió que dos cuentas de Instagram podrían caber en un plan Essential; está sin verificar y contradice el resto. Confirmar con soporte de ManyChat antes de pagar dos suscripciones.

- Las tarifas por mensaje de Meta para Chile, México, Colombia, Argentina, Perú y España. La documentación de Meta describe el modelo y da ejemplos sueltos (Brasil utility ≈0,68 centavos, Meta Business Agent US$2 por millón de tokens), pero no pude abrir el rate card por país: developers.facebook.com/docs/whatsapp/pricing/rate-cards devuelve 404. Las cifras de terceros para EE.UU. (marketing ≈US$0,025, utility ≈US$0,004) y Colombia (≈US$0,014) son de agregadores sin verificar, y una fuente de octubre de 2026 incluso afirma que WhatsApp no entrega mensajes de marketing a números de EE.UU., lo que contradice a las demás. No usar ninguna de estas cifras para un presupuesto.

- Si WhatsApp está limitando las difusiones gratuitas de la app de WhatsApp Business con «créditos de mensajes». WABetaInfo reportó en mayo de 2026 una prueba con un tope aproximado de 35 difusiones al mes, variable por región. Es una fuente de filtraciones sobre una función en prueba, no disponible para todos. No pude abrir la página de ayuda oficial de WhatsApp (404). Afecta directamente si Jay piensa usar difusiones para avisar del cierre de matrícula: hay que probar con una lista chica primero.

- Si la Ley 21.719 ya se postergó. Al 11 de octubre de 2026 el proyecto (Boletín 18.623-07) estaba en Comisión de Constitución del Senado sin votaciones. Hay que verificar en senado.cl si se aprobó y se publicó en el Diario Oficial en las últimas tres semanas. Mientras no se publique, la fecha vigente es el 1 de diciembre de 2026, en 29 días. No pude abrir bcn.cl/leychile (la página se queda cargando), así que el texto del art. 28 B de la Ley 19.496 está citado desde SERNAC y no desde el texto oficial.

- Qué exige exactamente la Ley 21.719 sobre consentimiento para marketing directo. Ninguna de las fuentes consultadas lo detalla y no pude abrir el texto oficial. Antes del 1 de diciembre conviene revisarlo en bcn.cl o con un abogado, sobre todo por el formulario de Formspree y las listas de Brevo.

- Si Meta extendió la ventana estándar de mensajería de Instagram a 7 días para conversaciones iniciadas desde anuncios click-to-message con fecha 28 de septiembre de 2026. La documentación oficial de Meta que leí sí menciona los hasta 7 días para esos anuncios, pero no confirma esa fecha de entrada en vigencia, que viene de un blog de proveedor.

- Si existe algún disparador oficial de «nuevo seguidor» o «me gusta» en la API de Instagram. No encontré ninguno documentado por Meta, y las fuentes de proveedores coinciden en que no existe o está en beta controlada por Meta. Pero no pude revisar la lista completa de campos de webhook de Instagram Messaging para descartarlo del todo.

- Las cifras exactas de las automatizaciones nativas gratis de Meta Business Suite (tope de 5 palabras clave por automatización, retardo de 15 minutos, 4 preguntas frecuentes en la app de Instagram). Vienen de blogs de terceros; no confirmé la redacción actual del centro de ayuda de Meta.

- Los precios mensuales (no anuales) de Wati y de Chatfuel. Las dos páginas oficiales muestran por defecto el precio anual y el mensual queda detrás de un selector que no se cargó. Y en respond.io los datos estructurados de la propia página dan precios mensuales distintos (US$99/199/349) de los mostrados (US$79/159/279): confirmar en el checkout.

- Si ManyChat tiene interfaz en español y si su soporte atiende en español. No lo verifiqué, e importa porque Jay trabaja en español e inglés pero Kiran y Abby no necesariamente.

### whatsapp_politica

- Si el +56 9 4211 5562 es WhatsApp normal o la app de WhatsApp Business: no se puede saber desde fuera. Hay que abrir el teléfono de Jay y ver si existe la pestaña 'Herramientas para la empresa' (Ajustes → Herramientas para la empresa). Si no está, hoy no hay mensaje de bienvenida, ni de ausencia, ni etiquetas, ni respuestas rápidas.

- La tarifa exacta de Chile. Hay dos juegos de cifras circulando, los dos fechados 1 de octubre de 2026: US$0,0889 marketing / US$0,0200 utility (flowcall, whapi y la fuente chilena automatizaweb) y US$0,1022 / US$0,0230 (ManyChat y Gallabox, exactamente 1,15× las primeras en los 7 mercados). Me inclino por la primera como tarifa de lista de Meta, pero hay que bajar el rate card USD oficial desde developers.facebook.com/docs/whatsapp/pricing#rate-cards (links 'USD list rates' CSV y 'USD rates and volume tiers' PDF) y mirar la fila de Chile.

- No pude abrir el rate card oficial de Meta (CSV ni PDF): la página de precios solo expone las etiquetas de los enlaces y la tabla interactiva de business.whatsapp.com no carga los valores al convertirla a texto. Todas las tarifas por país de este informe vienen de proveedores que dicen haber descargado el rate card, no de Meta directamente.

- Si Meta suma IVA 19 % chileno encima de las tarifas, y si efectivamente factura en CLP a Academia Seúl. Una fuente chilena dice que Meta empezó a facturar en moneda local en Chile en abril de 2026, pero ninguna fuente aclara el IVA. Se confirma en el administrador de facturación de WhatsApp Manager o con el proveedor.

- Si la cuota de 1.000 mensajes de service gratis al mes aplica igual cuando los mensajes salen a través de ManyChat o de otro BSP, o si se consume de otra forma. No encontré la regla para el caso de un intermediario.

- El plan mínimo de ManyChat que habilita WhatsApp y su precio real hoy: manychat.com/pricing devuelve 403 y el propio blog de ManyChat se contradice (Essential US$15 vs Pro US$15 vs Pro US$29–39). Hay que entrar a la cuenta de Jay y mirar la pantalla de planes desde dentro.

- Si ManyChat agrega markup sobre las tarifas de Meta. ManyChat afirma que no, pero sus cifras publicadas son 1,15× las de Meta en marketing y utility (y 1,00× en service). Se resuelve cargando US$5 en el Manychat Wallet, enviando 10 mensajes y comparando el cobro real contra la tarifa de Meta.

- Si el nuevo tope mensual de difusiones de negocio gratuitas (reportado en ~35 al mes) ya está activo en Chile. El dato viene de WABetaInfo y blogs, no de un anuncio oficial de Meta, y el despliegue es gradual por país. Se mira en el teléfono: Ajustes → Difusiones.

- El costo real de un anuncio Click-to-WhatsApp en Chile y Latinoamérica: no existe benchmark público confiable de CPM ni de costo por conversación iniciada para 2026. Solo se puede medir con una prueba propia en Meta Ads Manager (sugerencia: US$5/día por 5 días desde @jaychingu.oficial).

- La duración exacta de la ventana de entrada gratuita de los anuncios Click-to-WhatsApp: la documentación de desarrolladores de Meta dice 'up to 7 days' y la página comercial de WhatsApp en español dice 72 horas. Son dos páginas de Meta que no coinciden. Para presupuestar conviene asumir 72 horas (el caso conservador).

- Si los planes Advanced, Expert y Max de Meta One incluyen también la insignia verificada y el canal verificado, o solo Essential los trae: el anuncio no lo dice. Tampoco encontré el precio de Meta One en Chile en CLP ni confirmación de que los paquetes de negocios ya estén disponibles ahí. Se mira dentro de la app.

- Los niveles exactos de la calificación de calidad del número (verde/amarillo/rojo o High/Medium/Low), la ventana de tiempo que cubre y los umbrales para pasar de un nivel a otro: la página oficial de quality rating de Meta devolvió 404 en todas sus variantes que probé. Solo pude confirmar que se necesita YELLOW/Medium o mejor para escalar y que 7 días en Flagged bajan el límite un nivel de inmediato.

- El tiempo real de aprobación de plantillas por categoría. Lo único oficial es 'puede tardar hasta 24 horas' en WhatsApp Manager; los blogs de agencias dicen 1–5 minutos para utility y authentication y 24–48 h para marketing en temporada alta, pero ninguno cita a Meta. Para planificar hay que usar las 24 horas oficiales.

- Las causas de rechazo de plantillas con su lista oficial: la página de Meta solo dice que una plantilla rechazada 'viola una o más políticas' y remite a una guía de revisión que no alcancé a leer. La mala categorización está confirmada como causa de sanción, pero no tengo la lista completa.

- El texto completo de los FAQ oficiales de WhatsApp sobre baneos, cuentas restringidas y difusiones (faq.whatsapp.com/723378546580115, /717472490411581, /1655751878365653, /740266744985664): esas páginas solo entregaron el título por WebFetch porque se arman con JavaScript. Lo que cito de ellas viene de extractos de búsqueda de esas mismas URLs oficiales, no de la lectura completa.

### legal_captacion

- Si el número +56 9 4211 5562 está hoy en WhatsApp normal o en la app WhatsApp Business. Los documentos del repo son claros pero son de septiembre y octubre de 2026 (Plan_Choque_20sep_13oct_2026.md línea 381 dice «Jay usa WhatsApp normal, no Business»). Hay que mirar el celular: Ajustes → ¿aparece «Herramientas para la empresa»? Es el dato que define si el bot es posible y hay que confirmarlo antes de pagar nada.

- El texto oficial de la Ley 21.719. El sitio de la Biblioteca del Congreso Nacional (bcn.cl/leychile, idNorma 1209272) no renderiza para esta herramienta y devuelve siempre «Este proceso demora demasiado». Quedan sin verificar contra el texto oficial: la numeración exacta de los artículos (8 letra b, 12, 13, 34 bis a 34 quáter, 35), los tramos de multa de 5.000 / 10.000 / 20.000 UTM, y el porcentaje de ingresos anuales en caso de reincidencia (hay fuentes que dicen 2 % y otras 4 %). Todo lo que reporté sobre esta ley viene de consultoras y estudios jurídicos chilenos que coinciden entre sí, no del Diario Oficial.

- El estado actual del Boletín 18.623-07 (la postergación a 2027). La información más reciente que encontré es del 20 de octubre de 2026: aprobado en general en la Comisión de Constitución del Senado. No pude abrir la ficha oficial en tramitacion.senado.cl ni en portallegislativo.senado.cl. Hay que revisarla antes de decidir el calendario de cumplimiento, porque son 4 semanas de diferencia.

- Si existe el Decreto N° 662 publicado el 9 de septiembre de 2026 sobre modelos de prevención de infracciones de la Ley 21.719. Solo una fuente lo menciona y no lo pude confirmar en ningún otro lugar.

- Si Academia Seúl califica como «empresa de menor tamaño» para efectos de la Ley 21.719 y qué reduce eso en la exposición. Varias fuentes mencionan la distinción pero ninguna explica el criterio ni el efecto concreto. Conviene preguntarlo a un abogado chileno de datos, es una consulta de una hora.

- Si WhatsApp queda cubierto por la expresión «servicios de mensajería telefónicos» del artículo 28 B de la Ley 19.496 y por el registro «No Molestar». Ni el texto del artículo ni la página oficial de SERNAC nombran WhatsApp. Es el punto gris más relevante del plan: afecta directamente si los mensajes promocionales de WhatsApp necesitan vía de baja obligatoria en Chile. Mi recomendación es incluirla igual, porque cuesta una línea.

- El plazo exacto en días que tiene un proveedor para suspender los envíos a alguien inscrito en «No Molestar». La página de SERNAC solo dice que desde el día 7 el consumidor puede presentar un Aviso de Incumplimiento. Una guía de divulgación habla de un día hábil, sin respaldo oficial. Está en el Decreto N° 62 de 2019 del Ministerio de Economía, que no pude leer.

- Los precios y el contenido exacto de los planes de ManyChat. manychat.com y help.manychat.com devuelven HTTP 403 a la herramienta de lectura; las cifras que reporté (Free 25 contactos, Essential US$14, Pro US$39 o US$29 anual, Business US$69, Advanced US$139) salieron de fragmentos de las propias páginas de ManyChat vía búsqueda. Jay tiene cuenta: hay que mirarlas en la pantalla de facturación, que además muestra el precio en su moneda y con impuestos.

- Si ManyChat es un tech provider aprobado por Meta para la Marketing Message API, y si esa API está disponible para cuentas chilenas a través de ManyChat. La documentación de Meta confirma que Chile está en la lista de países habilitados, pero exige que la app del proveedor haya pasado el App Review, y eso depende de ManyChat, no de Jay.

- Si la Marketing Message API funciona en Instagram o solo en Messenger. La documentación oficial de Meta solo menciona Messenger. Como el activo de Academia Seúl es Instagram (@jaychingu.oficial), este dato cambia bastante el plan de reactivación de DMs fuera de la ventana de 24 horas.

- Si la función WhatsApp Coexistence de ManyChat está disponible para Chile y si sigue en beta. ManyChat la describe como beta y «disponible solo en países seleccionados», sin publicar la lista. Hay que preguntarlo al soporte de ManyChat ANTES de tocar la configuración del número, porque la migración directa es irreversible sin perder el historial.

- Las tarifas exactas de los mensajes de plantilla de marketing de WhatsApp para Chile, México, Colombia, Perú, Argentina y España. Meta las publica en tablas CSV y PDF enlazadas desde developers.facebook.com/docs/whatsapp/pricing (vigentes desde el 1 de octubre de 2026), pero los archivos no estaban en el texto que pude leer. Un proveedor estima US$0,015 a 0,063 por mensaje según país, con Chile y Perú entre los más altos, pero es una sola fuente comercial.

- Los costos reales de Click-to-WhatsApp en Latinoamérica. No existen benchmarks públicos independientes: una de las propias fuentes consultadas (spurnow.com) lo dice explícitamente. Los números que circulan (CPC US$0,30 a 1,00, conversación iniciada US$1 a 3) son estimaciones de proveedores sin fuente primaria. La única forma de saberlo es gastar US$21 en una prueba de 7 días y medir con datos propios.

- El presupuesto diario mínimo oficial de Meta Ads. La página de ayuda de Meta devolvió 404 y las cifras que reporté (US$0,50 por impresiones, US$2,50 a 5 por clic, US$40 eventos de baja frecuencia) son de un blog de agencia. Se ve en el Administrador de anuncios al crear la campaña, que es gratis.

- Los montos de multa del artículo 38 de la LSSI española (leve hasta 30.000 €, grave 30.001 a 150.000 €). Solo los vi en blogs de consultoría; no pude verificarlos en el BOE ni las resoluciones citadas en aepd.es. También quedó sin resolver la discrepancia sobre si la AEPD acepta el interés legítimo para escribir a direcciones profesionales genéricas tipo info@: hay fuentes en ambos sentidos.

- El reglamento de la nueva LFPDPPP mexicana de 2025. Una fuente menciona que el Ejecutivo tenía 90 días para ajustarlo; no pude confirmar si ya se publicó ni qué dice sobre comunicaciones comerciales. Tampoco encontré el régimen de sanciones de la nueva ley.

- Los montos exactos de sanción en Perú, Colombia y Argentina. Las cifras que reporté vienen de guías comerciales y varias dependen del salario mínimo o de la UIT del año. Para Argentina no encontré montos específicos. Las fuentes oficiales son la ANPD/MINJUS de Perú, la SIC de Colombia y la AAIP de Argentina.

- Si la TCPA de EE. UU. alcanza a los mensajes de WhatsApp, que no son SMS. Ninguna de las fuentes consultadas lo trata. Tampoco pude verificar las reglas de CAN-SPAM para el correo comercial, que es lo que aplicaría a los envíos de Brevo a contactos estadounidenses.

- Las fechas de las prórrogas parciales de la regla de revocación de la TCPA. Las fuentes se contradicen: una habla del 11 de abril de 2026, otra del 31 de enero de 2027, y hay una orden de la FCC del 6 de enero de 2026 que extendió una exención limitada. Hay que ver la orden de la FCC directamente.

- Cómo funciona el alcance de una publicación en colaboración (Collab) de Instagram: si aparece en el perfil y en el feed de los seguidores de ambas cuentas. help.instagram.com no renderiza para la herramienta. El límite de 5 colaboradores sí está confirmado en la documentación de la Graph API, pero no en la ayuda de la app.

- Si el post existente con la escuela de taekwondo es una publicación en colaboración (con coautor) o solo una mención. Cambia bastante el alcance que se puede esperar de repetir la jugada, y se ve entrando a la publicación en Instagram.

- El tráfico actual de /lector-coreano, /dubu, /hangul-race, /taller, el generador de nombre y el test de nivel. Sin ese dato no se puede priorizar cuál convertir primero en capturador ni estimar cuántos contactos daría. No hay analítica mencionada en el repositorio; Vercel Analytics o Plausible resolverían esto.

## 15 · Fuentes

Solo las oficiales y las que sostienen una decisión. El resto está en los hallazgos de cada área.

- https://setsmart.io/blog/manychat-pricing (tabla completa, dice «vigente a agosto 2026»)

- https://www.eesel.ai/blog/manychat-pricing

- https://www.featurebase.app/blog/manychat-pricing — ninguna es fuente oficial

- https://setsmart.io/blog/manychat-pricing

- https://manychat.com/product/whatsapp (citado vía búsqueda; la página bloquea lectura automática)

- https://community.manychat.com/general-q-a-43/connecting-multiple-instagram-accounts-to-one-manychat-9254

- https://community.manychat.com/general-q-a-43/can-i-add-multiple-account-on-just-1-billed-account-1958

- https://indm.social/blog/does-manychat-have-an-agency-plan

- https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/migrate-existing-whatsapp-number-to-a-business-account

- https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/version-4-public-preview/

- https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/reconnect-offboarded-coexistence-clients/

- https://manychat.com/blog/whatsapp-coexistence-grow-and-keep-your-number/

- https://help.manychat.com/hc/en-us/articles/19247843644060-How-to-connect-WhatsApp-to-Manychat-choosing-the-best-method

- https://manychat.com/product/whatsapp (los tres citados vía búsqueda; manychat.com

- https://developers.facebook.com/docs/whatsapp/pricing/

- https://whatsappbusiness.com/es-la/policy/ (política oficial, la antigua business.whatsapp.com/policy redirige aquí)

- https://developers.facebook.com/docs/whatsapp/messaging-limits

- https://developers.facebook.com/docs/messenger-platform/send-messages

- https://developers.facebook.com/docs/messenger-platform/instagram/features/private-replies

- https://www.inro.social/blog/how-to-send-a-message-to-new-followers-on-instagram-2026

- https://setsmart.io/blog/manychat-instagram

- https://post.buzz/blog/instagram-dm-automation-2026 (fuentes de terceros/proveedores, no oficiales)

- https://dmchamp.com/resources/manychat-pricing-2026/ (dice haber consultado la página de precios de ManyChat el 26 de octubre de 2026)

- https://www.reachlee.co/guides/manychat-ai-pricing/ — ambas de terceros; la página oficial bloquea lectura automática

- https://gurusup.com/blog/whatsapp-for-business

- https://setsmart.io/blog/whatsapp-broadcast (fuentes de terceros; no pude abrir la página de ayuda oficial de WhatsApp, devolvió 404)

- https://fridai.fansnetwork.ai/en/blog/instagram-auto-reply-tools

- https://creatorflow.so/blog/instagram-built-in-automation/ (fuentes de terceros; no confirmé la redacción actual del centro de ayuda de Meta)

- https://chatfuel.com/pricing (página oficial, leída el 2 de noviembre de 2026)

- https://respond.io/pricing (página oficial, leída el 2 de noviembre de 2026)

- https://www.wati.io/pricing/ (página oficial, leída el 2 de noviembre de 2026)

- https://www.360dialog.com/pricing (página oficial, leída el 2 de noviembre de 2026)

- https://www.sernac.cl/portal/609/w3-propertyvalue-58918.html (texto del artículo en SERNAC)

- https://www.sernac.cl/portal/618/w3-article-13378.html

- https://intrafavet.uchile.cl/file/guia-anti-spam_SERNAC.pdf (guía anti-spam de SERNAC)

- https://www.carey.cl/gobierno-ingresa-proyecto-de-ley-que-posterga-en-un-ano-entrada-en-vigor-de-la-ley-sobre-proteccion-de-datos-personales

- https://www.garrigues.com/es_ES/noticia/chile-ejecutivo-presenta-proyecto-postergar-entrada-vigor-nueva-ley-proteccion-datos

- https://orbixconsultor.cl/guias/vigencia-ley-21719 (estudios jurídicos, no el registro legislativo oficial)

- https://respond.io/blog/manychat-alternative

- https://setsmart.io/blog/manychat-tiktok

- https://www.tidio.com/blog/manychat-review/ (todas de terceros)

- https://whatsappbusiness.com/policy/ (Sección 2)

- https://www.flowcall.co/blog/whatsapp-business-api-pricing (dice haber descargado los rate cards de Meta el 28 sep 2026)

- https://usewhapi.com/whatsapp-api-pricing/ (verificado contra el rate card el 20 oct 2026); el agrupamiento por mercado sí es oficial: https://developers.facebook.com/docs/whatsapp/pricing/

- https://www.automatizaweb.cl/blog/costos-whatsapp-business-api-chile-2026 (publicado 17 may 2026, actualizado 20 oct 2026, cita la página de precios de Meta)

- https://www.flowcall.co/blog/whatsapp-business-api-pricing

- https://help.manychat.com/hc/en-us/articles/14281380243740-WhatsApp-pricing-guide

- https://docs.gallabox.com/pricing-and-billing/whatsapp-pricing/rate-card ; tarifas de Meta en https://usewhapi.com/whatsapp-api-pricing/

- https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits.md

- https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview

- https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in.md

- https://whatsappbusiness.com/policy/

- https://faq.whatsapp.com/361005896189245/ , https://faq.whatsapp.com/434518851968943

- https://developers.facebook.com/docs/whatsapp/pricing/ (documentación de desarrolladores); la versión de 72 h está en https://whatsappbusiness.com/es-la/products/platform-pricing/

- https://getkanal.com/blog/click-to-whatsapp-ads-benchmarks-2026

- https://guiawabusiness.cliengo.com/click-to-whatsapp

- https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits

- https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits.md

- https://developers.facebook.com/docs/whatsapp/api/rate-limits/

- https://developers.facebook.com/documentation/business-messaging/whatsapp/support/error-codes

- https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement

- https://faq.whatsapp.com/361005896189245/ , https://www.whatsapp.com/legal/terms-of-service , https://faq.whatsapp.com/717472490411581/

- https://faq.whatsapp.com/723378546580115

- https://whatsappbusiness.com/resources/faq/ , https://faq.whatsapp.com/1791149784551042/

- https://whatsappbusiness.com/resources/resource-library/small-business-use-whatsapp-business-app/

- https://sheetwa.com/news/whatsapp-broadcast-list-paid-limits/

- https://developers.facebook.com/documentation/business-messaging/whatsapp/official-business-accounts/

- https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/

- https://help.manychat.com/hc/en-us/articles/14281283755164-Manychat-Wallet-for-Email-Message-Templates , https://help.manychat.com/hc/en-us/articles/14281326740124-How-to-use-WhatsApp-Messages-Templates-in-Manychat

- https://manychat.com/blog/whatsapp-business-api/ (el blog tiene ~136 días)

- https://manychat.com/blog/whatsapp-business-api/

- https://developers.facebook.com/docs/whatsapp/pricing/ (regla de la ventana)

- https://www.thenextsecurity.cl/insights/ley-21719-comision-senado-propone-postergar-2027/

- https://preyproject.com/es/blog/multas-y-sanciones-ley-21719

- https://cumpliai.com/sanciones-ley-21719-proteccion-datos-personales-chile/ — ambas son consultoras, no el texto oficial; no logré contrastarlo con BCN

- https://valor-utm.cl/utm-historico/2026/noviembre/

- https://utmchile.cl/utm-historico/2026/ (sitios de terceros que citan al SII; no pude abrir la tabla oficial del SII)

- https://agasociados.cl/fuentes-de-acceso-publico-ley-21719/

- https://www.datactil.com/post/base-clientes-leads-ley-21719-chile (citan el texto de la ley; no pude verificar el articulado en BCN)

- https://blog.hackmetrix.com/derechos-del-titular-ley-21719-como-responder/

- https://czabogados.cl/ley-21719-obligaciones-ti-marketing-empresas/

- https://www.sernac.cl/portal/609/w3-propertyvalue-58918.html (fuente oficial de SERNAC)

- https://www.sernac.cl/portal/618/w3-propertyvalue-62998.html (fuente oficial de SERNAC)

- https://clearrows.com/blog/2026-07-17-lssi-multas-email-marketing-espana

- https://blog.iqlex.es/correo-comercial-sin-consentimiento-asi-sanciona-la-aepd/ (blogs de consultoría; los montos del art. 38 no los pude verificar en el BOE ni en aepd.es)

- https://basham.com.mx/en/nueva-ley-federal-de-proteccion-de-datos-personales-en-posesion-de-los-particulares-publicada-en-el-diario-oficial-de-la-federacion/

- https://www.gtlaw.com/en/insights/2025/3/nueva-ley-general-proteccion-de-datos

- https://funnel.pe/ley-29733-proteccion-datos-marketing-peru/, https://rulex.org/blog/habeas-data-ley-1581-colombia-2026-guia-empresas

- http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html — las cifras de Perú

- https://www.bclplaw.com/en-US/events-insights-news/the-tcpas-new-opt-out-rules-take-effect-on-april-11-2025-what-does-this-mean-for-businesses.html

- https://www.jdsupra.com/legalnews/fcc-s-tcpa-consent-revocation-rule-8022288/

- https://www.facebook.com/terms.php (fuente oficial de Meta)

- https://developers.facebook.com/terms/ (fuente oficial de Meta)

- https://developers.facebook.com/devpolicy/ (fuente oficial de Meta)

- https://developers.facebook.com/docs/messenger-platform/instagram/features/private-replies/ (fuente oficial de Meta)

- https://developers.facebook.com/documentation/business-messaging/messenger-platform/marketing-messages-on-messenger/get-started (fuente oficial de Meta)

- https://whatsappbusiness.com/es-la/policy/ (política oficial de WhatsApp; business.whatsapp.com/policy redirige aquí)

- https://developers.facebook.com/docs/whatsapp/cloud-api/get-started/migrate-existing-whatsapp-number-to-a-business-account/ (oficial de Meta)

- https://developers.facebook.com/docs/whatsapp/pricing (fuente oficial de Meta)

- https://www.aureliusmedia.co/blog/meta-ads-minimum-budget

- https://www.aurorainbox.com/en/2026/05/13/what-is-click-to-whatsapp-ads/ — AMBAS son blogs de proveedores, no documentación de Meta; la página de ayuda oficial de Meta sobre presupuesto mínimo devolvió 404. Una tercera fuente (spurnow.com) afirma directamente que no existen benchmarks públicos independientes de CTWA

- https://developers.facebook.com/documentation/instagram-platform/instagram-graph-api/reference/ig-media/collaborators.md (fuente oficial de Meta). No pude confirmar en help.instagram.com cómo afecta el alcance ni si la publicación aparece en el feed de los seguidores de ambas cuentas: la página no renderiza

- https://www.sernac.cl/portal/609/w3-propertyvalue-58918.html (art. 28 B), https://clearrows.com/blog/2026-07-17-lssi-multas-email-marketing-espana (LSSI 21.2)

- https://developers.facebook.com/devpolicy/ (oficial de Meta)

- https://www.omnisend.com/blog/brevo-pricing/

- https://smtpedia.com/brevo-pricing/ — son blogs de competidores

- https://www.zavu.dev/es/blog/lista-transmissao-whatsapp-business

- https://leadsales.io/blog/listas-difusion-whatsapp-buisness/ — blogs de proveedores; la FAQ oficial de WhatsApp que intenté abrir (faq.whatsapp.com/639838016173499) devolvió «Página no encontrada», así que el límite de 256

- https://developers.facebook.com/devpolicy/

- https://whatsappbusiness.com/es-la/policy/ (ambas oficiales)
