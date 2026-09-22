# Sistema de email con Brevo · Academia Seúl
### Plan estratégico con el límite gratis de 300 correos/día · 17 sept → diciembre 2026

**Archivos de esta carpeta**
- `contactos_brevo_import.csv` — tu lista limpia, lista para importar (97 contactos únicos, sin tus pruebas, con segmento y curso sugerido por persona).
- `Email_Lanzamiento_Brevo.html` — el email de lanzamiento ya adaptado a Brevo (`{{ contact.FIRSTNAME }}`, link de baja `{{ unsubscribe }}`, UTMs).
- `resumen_segmentos.json` — conteos por segmento/país/nivel.
- Los textos de los otros correos están en `Email_Octubre_2026/Email_Lanzamiento_Octubre.md` (variantes 2, 3 y 4 + WhatsApp).

> **Nota sobre la "primera hoja" (base de la escuela):** los dos archivos que me llegaron (`formspree_…csv` y `MailChimpChile.csv`) son el **mismo export de Formspree** (125 filas, 97 personas únicas). La base de la escuela no venía. Cuando me la pases (xlsx o csv con nombre + correo), la limpio, la cruzo con esta lista y la meto en el plan de la sección 6 — que ya está pensado para una lista grande con el tope de 300/día.

> **Actualización 20 sept (plan de choque):** los cuerpos y fechas vigentes están en `Plan_Choque_20sep_13oct_2026.md` §3 (L1 lun 21 · L1-b mar 22 · L2 mié 23 · L3 vie 25 · L4 lun 28 · L5 jue 1 · L5-b dom 4 · O1 lun 5 · N1 mar 6). HTML listos: `L1_Lanzamiento_P1.html` y `L1b_Taller_P2P3.html`. Al importar el CSV mapea también `ORIGEN`, `PRIORIDAD` y `WHATSAPP` (ya vienen en el archivo). Segmento extra: `Alumnos julio` = ORIGEN contiene `alumno_julio` (2 contactos) → reciben L1 con la variante 3. DNS: `Guia_DNS_Brevo.md`.

---

## 1. Lo que tienes hoy (lista del sitio)

| Segmento | Quiénes | Cuántos | Qué les vendemos |
|---|---|---|---|
| **P1 · calientes** | Lista de espera Nivel 1, intermedio/TOPIK, test de nivel hecho, ex-alumnos de julio, formulario de contacto | **18** | Su curso exacto (`CURSO_SUGERIDO`): 11 → Básico 1, 4 → Básico 2, 3 → Conversacional/TOPIK |
| **P2 · tibios** | Asistentes del taller que "conocen un poco el Hangul" o tienen base | **21** | Básico 1 (o Básico 2 con test de nivel) |
| **P3 · fríos** | Asistentes del taller que nunca han visto coreano / solo palabras de K-pop | **58** | Lector de Hangul gratis → Básico 1 |

Países: Chile 37 · Venezuela 18 · Argentina 8 · México 4 · Perú 3 · EE.UU. 2 · Ecuador 2 · resto 1 c/u · 13 sin país. Solo **10 tienen WhatsApp** → el email es el canal principal para el 90 %.

Con 300 correos/día, **tu lista completa cabe en un solo envío** (97 < 300). El límite solo importa para la base de la escuela (sección 6) y para el día en que mandes dos campañas seguidas: nunca sumes más de 300 destinatarios en 24 h.

---

## 2. Configuración inicial (una vez · ~45 min)

1. **Cuenta:** brevo.com → registrarse con `hola.academiaseul@gmail.com`. Plan Free (300/día, contactos ilimitados, con logo de Brevo al pie).
2. **Remitente:** *Senders & IP → Add sender*: nombre "Jay · Academia Seúl", correo **`hola@academiaseul.com`** (mejor entregabilidad que Gmail). Luego *Domains → Authenticate* `academiaseul.com`: Brevo te da 3 registros DNS (DKIM ×2 + DMARC) → se agregan donde administras el dominio (Netlify DNS o tu registrador). Sin esto, Gmail/Outlook manda parte a spam. Si no puedes autenticar hoy, usa el Gmail verificado y autentica esta semana.
3. **Atributos de contacto** (*Contacts → Settings → Contact attributes → Add*): crea, como texto, exactamente estos nombres: `NOMBRE_COMPLETO`, `PAIS`, `EDAD`, `NIVEL`, `INTERES`, `ORIGEN`, `PRIORIDAD`, `CURSO_SUGERIDO`, `FECHA_ALTA`, `ULTIMO_CONTACTO`, `WHATSAPP`, `NOTA`. (`EMAIL` y `FIRSTNAME` ya existen.)
4. **Listas** (*Contacts → Lists*): `01 Leads sitio` (este CSV), `02 Alumnos octubre` (los que paguen), `03 Base escuela` (cuando llegue), `04 Ex-alumnos` (julio).
5. **Importar:** *Contacts → Import → Upload file* → `contactos_brevo_import.csv` → mapea cada columna a su atributo → lista `01 Leads sitio` → marca "estos contactos me dieron consentimiento" (dejaron sus datos en tu formulario).
6. **Segmentos guardados** (*Contacts → Segments*): `P1` (PRIORIDAD = P1), `P2`, `P3`, `Básico 2 / test` (CURSO_SUGERIDO contiene "Básico 2"), `Chile` (PAIS = Chile) y `No abrió último envío` (filtro de actividad de campaña).
7. **Prueba:** cada campaña se envía primero a ti (*Send a test*) y se revisa en celular: asunto, nombre, links, PDF, botón de WhatsApp.

Reglas de Brevo que hay que cumplir: link de baja en todo correo (el HTML ya lo trae), dirección física en el pie (ya está: Santiago, Chile), y **nunca importar listas compradas**.

---

## 3. Calendario de campañas · lanzamiento (17 sept → 13 oct)

Horario de envío: **10:00 Chile** entre semana (LATAM despierta, España media tarde). Un solo envío por día.

| Día | Campaña | A quién | Contenido (fuente) | Correos |
|---|---|---|---|---|
| **Jue 18 sep** | **L1 · Lanzamiento** | Segmento **P1** | `Email_Lanzamiento_Brevo.html` con asunto A. Ex-alumnos de julio: párrafo inicial de la variante 3 (Básico 2 es su siguiente paso). | 18 |
| **Vie 19 sep** | **L1-b · Lanzamiento taller** | **P2 + P3** | Mismo HTML, cambiando la intro por la variante 4 ("nos conocimos en el taller… el Lector es gratis") | 79 |
| **Mar 23 sep** | **L2 · Reto 7 días** | P2 + P3 + quienes de P1 **no abrieron** L1 | Reto #LeoCoreanoEn7Días (reglas + premio: 1 cupo) + invitación a la **clase abierta del sáb 27, 20:00 Chile**. Texto corto, un botón: "Empezar el reto" → `/lector-coreano` | ~85 |
| **Vie 26 sep** | **L3 · Recordatorio clase abierta** | Todos los que **abrieron** L1 o L2 | 5 líneas: hora en 4 países + link de Instagram Live. | ~40 |
| **Lun 5 oct** | **L4 · Última semana** | Todos menos inscritos | Testimonios de julio (7 citas de la web) + tabla de horarios + cupos reales por clase + botón "Reservar mi cupo" | ~95 |
| **Jue 8 oct** | **L5 · Cierra el domingo** | Todos menos inscritos, **asunto distinto para quienes no abrieron nada** ("¿Todavía quieres aprender coreano?") | Correo corto y honesto de Jay, un botón, cierre domingo 4 | ~95 |
| **Lun 12 oct** | **O1 · ¡Empezamos!** | Lista `02 Alumnos octubre` | Onboarding: link de Zoom, hora en su país, programa completo (PDF), Lector, grupo de WhatsApp, normas | ~30 |
| **Mar 13 oct** | **N1 · Los que no entraron** | Todos menos inscritos | "Esta cohorte partió; el Lector sigue gratis y la próxima es en enero" → lista de espera enero | ~90 |

Total ≈ 530 correos en 3 semanas, nunca más de ~95 en un día. **Sobra capacidad**: úsala para la base de la escuela (sección 6).

Asuntos (elige por segmento; máx. ~45 caracteres, con preheader):
- P1: `Abrimos octubre: tu cupo en {{ contact.CURSO_SUGERIDO }} 🇰🇷` · preheader: "8 semanas · US$150 o 2 × US$75 · certificado"
- Taller: `Del taller de Hangul a tu primera clase 🐯` · preheader: "Clases desde el 12 de octubre · el Lector sigue gratis"
- L2: `Reto: lee coreano en 7 días (y gana un cupo)` · L3: `Hoy 20:00 · clase abierta en Instagram` · L4: `Última semana · quedan cupos en tu horario` · L5: `Cierro inscripciones el domingo` / `¿Todavía quieres aprender coreano?`

Personalización que ya viene en el CSV: `{{ contact.FIRSTNAME }}`, `{{ contact.CURSO_SUGERIDO }}`, `{{ contact.PAIS }}`. Úsalas en asunto y primera línea — sube la apertura sin trabajo extra.

---

## 4. Automatizaciones (Brevo Free incluye automatizaciones básicas)

1. **Bienvenida a leads nuevos** (*Automations → Welcome message*): disparador "contacto agregado a `01 Leads sitio`" → espera 5 min → correo "Bienvenido/a: el Lector de Hangul es gratis + tu curso según tu caso" → espera 3 días → "¿Ya leíste tu primera sílaba? Así son nuestras clases (video de Jay)". Los nuevos del formulario del sitio siguen llegando a Formspree: **cada lunes** exportas el CSV, corres el script de limpieza y reimportas (Brevo ignora duplicados). Cuando tenga sentido, conecto el formulario del sitio directo a la API de Brevo y esto queda automático.
2. **Onboarding de alumnos** (lista `02`): al agregar → correo O1 al instante → recordatorio 24 h antes de la clase 1 → semana 4 "mitad del curso: guía de estudio" → semana 8 "certificado + próximo curso (Básico 2 / Conversacional 2 en enero)".
3. **Reactivación**: contacto sin abrir 3 campañas seguidas → sale de los envíos comerciales (protege tu reputación de remitente) y solo recibe el newsletter mensual.

---

## 5. Después de octubre · cadencia mensual (1 correo al mes a toda la lista)

| Mes | Envío | Objetivo |
|---|---|---|
| Nov (2.ª semana) | Newsletter: cultura + tip de Hangul + "así va la cohorte" (foto de clase) | Mantener abierta la relación · guardables |
| Dic (1.ª semana) | **Abre cohorte enero 2027**: Conversacional 2 (A2.2) + repetición de Básico 1/2 + Niños | Ventas enero |
| Dic (3.ª semana) | Cierre de matrícula enero + regalo navideño (guía descargable) | Urgencia |

Regla de oro: una persona no recibe más de **1 correo comercial por semana** ni más de **4 al mes** (fuera de la semana de cierre).

---

## 6. La base de la escuela (cuando me la pases) · cómo meter una lista grande con 300/día

1. **Limpieza:** dedupe contra `01 Leads sitio`, quito correos inválidos/roles (`info@`, `ventas@`), separo nombre/apellido, país si viene.
2. **Consentimiento:** es una lista que "recibiste", no que se inscribió contigo. Para no quemar el dominio: el **primer correo es de presentación con salida fácil** ("Soy Jay, profesor coreano en Chile; te llegó este correo porque… si no te interesa, un clic y no te escribo más") con un regalo real (Lector de Hangul + guía del alfabeto). Sin precio en ese primer correo.
3. **Lotes:** lista `03 Base escuela` en tandas de **250/día** (dejando 50 para el resto). Ej.: 1.000 personas = 4 días. Brevo permite programar cada lote un día distinto. Empieza por los correos de Chile (mejor afinidad) y después el resto.
4. **Secuencia (3 correos, 10 días):** día 0 presentación + regalo · día 4 catálogo de cursos (boletín) · día 8 cierre de matrícula. Solo pasan al correo 2 los que **abrieron** el 1 (segmento de actividad); los que no abrieron nada en 3 correos salen de la lista.
5. **Vigila** en *Statistics*: rebotes duros < 2 %, quejas de spam < 0,1 %, bajas < 1 % por envío. Si un lote se pasa, para y me avisas.

---

## 7. Cómo medir (metas para el 11 de octubre)

| Indicador | Dónde | Meta |
|---|---|---|
| Apertura L1 | Brevo → Campaign statistics | > 45 % (lista propia y reciente) |
| Clics L1 | ídem | > 10 % |
| Visitas desde email | Google Analytics → Adquisición → `utm_source=brevo` | ≥ 60 |
| Inscritos atribuidos | Formspree (campo `como_nos_conociste`) + fecha del pago | ≥ 8 de los 97 |
| Bajas | Brevo | < 1 % por campaña |

---

## 8. Checklist para hoy (jueves 18)

- [ ] Crear cuenta y remitente (10 min)
- [ ] Crear los 12 atributos y la lista `01 Leads sitio` (10 min)
- [ ] Importar `contactos_brevo_import.csv` (5 min)
- [ ] Nueva campaña → "Code your own" → pegar `Email_Lanzamiento_Brevo.html` → asunto P1 → enviar prueba a ti (10 min)
- [ ] Enviar a segmento P1 a las 10:00; programar L1-b para el viernes 10:00 con la intro del taller (10 min)
- [ ] Mandarme la base de la escuela para preparar la sección 6
