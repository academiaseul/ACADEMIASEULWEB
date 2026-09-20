# Plan de choque · 20 sept → 6 oct 2026 · Academia Seúl

**Situación:** hoy domingo 20 no se ha publicado nada. Cierre de matrícula **domingo 4 de octubre 23:59** · clases desde la **semana del 5**. Tiempo real: 45 min/día entre semana + 90 min de grabación el domingo. Presupuesto US$0.
**Meta:** abrir las 6 clases (mínimo 4 por clase; objetivo 40 alumnos). Precio único: **US$150 el curso completo · o 2 cuotas de US$75**.

**Parrilla (hora Chile):** 🧒 Niños (8–12) lun 18:00 Jay y Abby · 🌱 Básico 1 (A1.1) mar 20:00 **o** jue 20:00 Guiran (eliges un día) · 💬 Conversacional 1 (A2.1) mar 21:00 Abby (desde Corea) · 🚀 Básico 2 (A1.2) mié 21:00 Jay · 🎯 TOPIK II (B1+) jue 21:00 Jay (cupo 8).

**Reglas fijas de estas dos semanas**
- Un solo calendario: **7 reels grabados + 1 clase en vivo**. Reto **#LeoCoreanoEn7Días = mié 23 → mar 29**, ganador **mié 30**.
- Cada reel = **UNA toma a cámara o UNA grabación de pantalla**, un solo texto en pantalla puesto en el editor nativo de Instagram, portada = diseño cuadrado si existe. Nada de multiclip, PiP ni Canva.
- Feed: 1 pieza al día como máximo y solo 4 grabadas por semana. Historias: **2 por día** (1 programada + 1 repost/respuesta); los stickers se contestan en bloque a las 21:00.
- **Link en bio:** dom 20 → dom 27 = `academiaseul.com` (la home tiene Dubu, Lector, Test e inscripción). Lun 28 → dom 4 = `academiaseul.com/nivel-1`. Lun 5 vuelve a `academiaseul.com`. Nada de Linktree.
- TikTok y Shorts: solo si las cuentas **ya existen** (se responde hoy sí/no). No se crean cuentas nuevas en campaña.
- Un solo regalo 1:1: **"trae un chingu"** (los dos reciben sesión 1:1 de 20 min con Jay). Ningún otro incentivo de sesión.
- Los dos cupos gratis (reto y sorteo con cuentas K-pop) son de **Básico 1** (martes o jueves, el que tenga más cupo).
- Nunca rojo. Sin cifras inventadas. Cupos reales desde la hoja de números.
- Clase abierta en vivo: **sábado 26 de septiembre, 20:00 Chile** (la campaña original la tenía un día corrida; esta es la fecha real).

---

## 0 · Hoy, domingo 20 · bloque 1 escritorio (≈ 110 min) + bloque 2 grabar y publicar (≈ 105 min)

**Bloque 1 · computador (en este orden)**

| # | min | Tarea | Resultado |
|---|---|---|---|
| 1 | 3 | Abrir `academiaseul.com` desde el celular → tarjeta **"Dubu · el puzzle del Hangul"** → jugar 1-1 con sonido → botón compartir. Ya está enlazado desde la home y `/recursos` (commit 48dba213): **no hay que tocar código.** | ✅ o anotar el bug |
| 2 | 10 | Recorrer el embudo como alumno: `/nivel-1?clase=a11-martes` → PayPal US$150 y 2×US$75 abren → Mercado Pago abre → botón WhatsApp abre el chat de +56 9 4211 5562 → `/test-nivel` termina en una clase. | anotar fallas; se arreglan antes de L1 |
| 3 | 60 | **Brevo desde cero** (`Brevo/Plan_Email_Brevo_2026.md` §2): (a) **remitente — decisión tomada:** si tienes acceso al DNS de academiaseul.com (Netlify DNS o registrador) → Senders → Domains → Authenticate (2 DKIM + 1 DMARC, 15 min) y usas `hola@academiaseul.com`; si **no**, L1 y L1-b salen desde **`hola.academiaseul@gmail.com` verificado** y el dominio se autentica antes de L4 (lun 28). (b) Atributos FIRSTNAME, CURSO_SUGERIDO, PAIS, ORIGEN, PRIORIDAD, WHATSAPP. (c) Importar `Brevo/contactos_brevo_import.csv` (97). (d) Listas `01 Leads sitio` + `02 Alumnos octubre` (vacía) + segmentos P1 / P2 / P3 y **`Ex-alumnos julio`** (los 2 contactos con ORIGEN = alumno_julio → variante 3 de L1). (e) Campaña L1: **pegar la versión de texto simple de la sección 3** en el editor (10 min); el HTML `Brevo/Email_Lanzamiento_Brevo.html` se deja para L4 porque hoy solo trae FIRSTNAME y utm `oct26`. (f) Prueba a tu Gmail, revisar en el celular. (g) **Programar L1 lun 21 10:00 (P1)** y **L1-b mar 22 10:00 (P2+P3)**. | 2 envíos programados |
| 4 | 15 | WhatsApp Business: bienvenida automática + `/precio` `/horarios` `/niños` `/pagar` (sección 4a). Estado de WhatsApp: captura de Dubu + "nuevo, gratis". | listo |
| 5 | 10 | Instagram → Respuestas guardadas: las 4 respuestas de la encuesta "¿cuál es tu caso?" (sección 4b). | listo |
| 6 | 5 | Mensajes a **Guiran y Abby** (sección 4c): clip de 15 s, **plazo miércoles 23 a las 22:00 Chile**, y pedir en el mismo mensaje sus links de Zoom del 6 de octubre. | enviados |
| 7 | 2 | ¿Existen cuentas de TikTok y YouTube Shorts de la academia? **Sí / No.** Si no, cross-post descartado hasta después del 5 oct. | decidido |
| 8 | 1 | Instagram → Configuración → Directos → **Archivar directos: activado** (sin esto no hay replay el sábado). | listo |
| 9 | 2 | Facebook: solicitar ingreso a 3 grupos "Aprender coreano" (o sacarlo del plan). Solo se comparte si aprueban. | solicitado |

**Bloque 2 · tarde (celular, luz de ventana, fondo azul o pizarra, vertical, No molestar)**

| # | min | Tarea |
|---|---|---|
| 10 | 90 | **Grabación 1: solo R1, R2, R3** (una toma cada uno, sección 2) **+ 4 clips de B-roll** de 10 s: tour del sitio (escalera → grilla con país → precio → botón), teaser del vivo ("el sábado te escribo tu nombre en coreano, en vivo"), Dubu "Tu oído", Lector pestaña Alfabeto. |
| 11 | 15 | **21:00 · publicar R1** + 2 historias: ① captura de Dubu con sticker de link a `/dubu` "¿cuántos niveles pasas hoy?" · ② encuesta "¿Cuál es tu caso?" (Nunca estudié / Ya leo hangul / Quiero hablar / Es para mi hijo). **La historia "Abrimos inscripciones" NO va hoy** (va el lunes después de las 10:00, cuando ya salió L1). |

**Pasa al lunes:** link en bio, destacadas, hoja de números.

---

## 1 · Calendario día a día · 20 sept → 6 oct

| Día | Feed (Instagram) | Historias (2) | Email (Brevo · 10:00 Chile) | WhatsApp / otros | Tiempo |
|---|---|---|---|---|---|
| **Dom 20** | **R1 Dubu** 21:00 | ① Dubu + link · ② encuesta "¿cuál es tu caso?" | Preparar y programar **L1 y L1-b**; decidir remitente | WhatsApp Business · Guiran y Abby · 🎬 Grabación 1 (R1, R2, R3 + B-roll) | ≈ 3 h 30 en dos bloques |
| **Lun 21** | — (sin feed; el anuncio va en historias) | ① **después de 10:00** "Abrimos inscripciones: 6 clases desde la semana del 5 · US$150 el curso completo o 2 cuotas de US$75" (captura de la escalera + link `/nivel-1`) · ② resultados de la encuesta + "si votaste X, tu clase es…" | **L1 · P1 (18)** · ex-alumnos julio con variante 3 | Link en bio → `academiaseul.com` · destacadas "Cursos oct" "Dubu" "Alumnos" · hoja de números (fila 1) · **WhatsApp 1:1 apertura** a los 10 (4d, msg 1) · 21:00: 5 DMs a cuentas K-pop (4f) | 45 |
| **Mar 22** | **R2 Tu curso según tu caso** | ① R2 reposteado + link `/nivel-1` · ② tour del sitio (B-roll) + sticker link · *(el test de nivel se ofrece aquí, no en el reel)* | **L1-b · P2+P3 (79)** con reto y vivo incluidos | Responder clics de L1 (Brevo → quién hizo clic) · 5 DMs restantes a cuentas K-pop · Dubu en grupos de Facebook solo si ya aprobaron | 45 |
| **Mié 23** · reto D1 | 📌 **Post: lanzamiento del reto** (diseño "Post Lector" o captura del Lector; caption en sección 2, "Día 1") + historia a cámara de 15 s con el guion Día 1 | ① reglas D1→D7 + link `/lector-hangul` · ② D1: vocales del Lector, "toca y repite" | **L2 · solo P1 que NO abrió L1 (~8)**, asunto distinto | **Estado de WhatsApp** "empieza el reto hoy" (no difusión) · 22:00 plazo clips Guiran/Abby | 45 |
| **Jue 24** · D2 | **R3 Tu primera palabra en 60 s** (우유) | ① R3 + link `/dubu` · ② **Guiran y Abby**: sus clips de 15 s (si no llegaron: foto + 1 línea de cada una desde `EquipoProfes`) | — | Segunda tanda de DMs K-pop solo si respondieron < 3 · programar L3 por la noche | 45 |
| **Vie 25** · D3 | 📌 **Post "Piso F"** (`Campana_Assets/instagram/03_piso_f_numeros.png`) | ① diseño Piso F + sticker con URL del artículo · ② D3: Dubu mundos 1 y 2 (Bukchon e Insadong), "¿hasta dónde llegaste?" + cuenta regresiva "mañana 20:00 en vivo" | **L3 · solo quienes abrieron/clicaron L1 o L1-b** | Inscritos parciales (llenaron `/nivel-1`, no pagaron): "¿te ayudo con el pago?" · **Prep del vivo:** lista de 10 nombres en hangul, Lector abierto en el PC, probar un directo de 10 s en "Practicar", confirmar "Archivar directos" activado | 45 |
| **Sáb 26** · D4 | 🟦 **EN VIVO 20:00 · "Lee tu nombre en coreano"** (30 min). Guion: 5 min qué es el Hangul · 15 min escribir 8–10 nombres del chat · 5 min "tu nombre en Dubu/Lector" · cierre: "si te inscribes con un chingu antes del domingo 4, los dos reciben una sesión 1:1 de 20 min conmigo; el link está en la bio". Al terminar: **Compartir en el perfil + descargar el video.** | ① 10:00 "hoy 20:00 en vivo" (teaser B-roll) · ② 18:00 "en 2 horas" + pregunta "¿cómo te llamas? te lo escribo en vivo" · ③ 21:00 clip de 15 s + "replay en el perfil" | — | 18:00 recordatorio solo a quien respondió algo · tras el vivo: cada "¿y mi nombre?" → escritura + link `/nivel-1?clase=…` | 30 prep + 30 vivo + 15 |
| **Dom 27** · D5 | 📌 **Recorte de 60 s del vivo** (Instagram lo permite sin editor). Plan B si falló el replay: B-roll del teaser + "me perdí el vivo → escríbeme tu nombre por DM" | ① replay + "te faltó tu nombre → DM" · ② D5: Dubu mundos 3 y 4 (Hongdae y Gwangjang) | Programar **L4** | 🎬 **Grabación 2 (90 min): R4 con cupos del día, R5 intro, R6, R7 + 3 clips "hoy cierra" de 10 s** · actualizar hoja · **PC abierto: preparar commit sin push** `COHORTE_ABIERTA=false` + `PROXIMA_COHORTE_LABEL="Enero 2027"` (sección 8) | 90 + 45 |
| **Lun 28** · D6 | **R4 Cupos reales: quedan 6 días** (Jay a cámara leyendo la hoja) | ① captura de la tabla de cupos + link `/nivel-1` · ② D6: Lector · Practicar, "mañana es la prueba" | **L4 · todos menos inscritos** (mover pagados a `02 Alumnos octubre` antes) | **Link en bio → `/nivel-1`** · **WhatsApp 1:1 cupos** a los 10 (4d, msg 2) · "trae un chingu" a los inscritos (4e) | 45 |
| **Mar 29** · D7 | 📌 **Post "Sopa de algas"** (`02_sopa_de_algas_topik.png`) | ① diseño + sticker URL del artículo · ② D7: Contrarreloj del Lector + "Tu oído" de Dubu, "sube tu captura hoy hasta las 23:59" · repost de cada captura que llegue | — | DM a quienes dijeron "me apunto": hoy cierra el reto · mandar diseño del sorteo a las cuentas K-pop que respondieron | 45 |
| **Mié 30** | **R5 Ganador del reto** (Jay a cámara 20 s) | ① capturas de participantes (con permiso) + felicitación · ② "¿quieres el cupo igual? quedan X en Básico 1" + link `/nivel-1?clase=a11-martes` | — | Confirmar clase con el ganador/a · Guía del Alfabeto (`/recursos`) por DM a cada participante | 45 |
| **Jue 1 oct** | 📌 **Carrusel: 5 capturas del FAQ de `/faq`** (¿y si falto? · ¿desde México? · ¿certificado? · ¿mi hijo de 9? · ¿en cuotas?) | ① las 5 preguntas como historias con sticker de link · ② "quedan 3 días · cupos reales" | **L5 · todos menos inscritos · 2 asuntos** | **Estado de WhatsApp** "cierro el domingo" · crear los **6 grupos de WhatsApp** por clase (nombre + descripción) · reunir los **6 links de Zoom** · sorteo K-pop cierra hoy | 45 |
| **Vie 2** | **R6 Jay a cámara, 45 s, sin edición** | ① R6 + link · ② "Conoce a tus profes": clips de Guiran y Abby (o foto + 1 línea) | — · programar **L5-b** para el domingo | Anunciar ganador/a del sorteo K-pop · 1 mensaje extra solo a quien respondió y no cerró · | 45 |
| **Sáb 3** 🇰🇷 개천절 | **R7 Dangún · 개천절** (portada `01_dangun_tigre.png`) | ① diseño Dangún + sticker URL del artículo · ② "mañana cierra la matrícula" + cupos por clase | — | Reel Dangún en grupos de Facebook solo si aprobaron (es cultura, no venta) | 30 |
| **Dom 4** · cierre 23:59 | — (todo en historias) | **5 historias**: 10:00 · 13:00 · 16:00 · 19:00 · 22:00 con cupos reales (los clips "hoy cierra" del dom 27). Última 22:00: "a las 23:59 cierro el formulario; el lunes empezamos" | **L5-b · 12:00 · solo "abrió algo" y no inscrito** (3 líneas) | **WhatsApp 1:1 cierre** a los 10 (4d, msg 3) · respuesta inmediata a cualquier "¿alcanzo?" · noche: programar **O1** con los 6 links de Zoom + grupos · el formulario **sigue abierto** hasta el lunes 9:00 | 45 repartidos |
| **Lun 5** · 🧒 Niños 18:00 | 📌 **"Empezamos"** 19:30 (pantalla o pizarra; sin caras de menores) + caption "si no entraste: enero 2027, lista de espera en bio" | ① bienvenida a los inscritos (sin nombres) + "hoy Niños, mañana Básico 1 y Conversacional 1" · ② "¿no entraste? lista de espera enero 2027 + Dubu y Lector gratis" | **O1 onboarding · 9:00 · lista `02 Alumnos octubre`** | **9:00 push del commit de lista de espera** · link en bio → `academiaseul.com` · agregar a cada inscrito a su grupo + link de Zoom · 16:00 recordatorio a Niños | 45 + clase |
| **Mar 6** · 🌱 Básico 1 20:00 · 💬 Conv. 1 21:00 | Descanso de feed | ① 10:00 "hoy empiezan Básico 1 con Guiran y Conversacional 1 con Abby (9:00 KST)" · ② 21:30 captura de clase (con permiso) | **N1 enero 2027 · 10:00 · todos menos inscritos** · recordatorio automático de clase 8:00 a Básico 1 mar y Conv. 1 | 18:00 recordatorio en los grupos · confirmar con Guiran y Abby link, lista y programa · anotar asistencia | 30 |

**Mié 7 (Básico 2 21:00) y jue 8 (Básico 1 20:00 · TOPIK II 21:00):** mismo patrón del martes: email automático 8:00, WhatsApp en el grupo 18:00.

**Reto #LeoCoreanoEn7Días (fuente única):** D1 mié 23 Lector · Aprender · vocales · D2 jue 24 consonantes (+R3) · D3 vie 25 Dubu mundos 1 y 2 (Bukchon e Insadong) · D4 sáb 26 clase en vivo · D5 dom 27 Dubu mundos 3 y 4 (Hongdae y Gwangjang) · D6 lun 28 Lector · Practicar · D7 mar 29 Contrarreloj del Lector + "Tu oído" de Dubu → captura en historia etiquetando @academiaseul. Premio: **1 cupo gratis en Básico 1** (sorteo entre quienes completen, se anuncia **mié 30**) + Guía del Alfabeto para todos los que participen. Reglamento: "Instagram no patrocina ni administra este reto".

---

## 2 · Los 8 reels (7 grabados + 1 en vivo)

**Antes de grabar:** vertical 9:16, 30–45 s, cámara frontal a la altura de los ojos, luz de ventana de frente, fondo azul/pizarra/sello del tigre, **nada rojo**, texto en pantalla blanco o dorado `#E8B84B`, subtítulos automáticos, música al 10 %. Grabaciones de pantalla: brillo máximo, volumen alto (se graba tu voz y la voz nativa a la vez), No molestar.
**Hashtags base (todos):** `#academiaseul #aprendecoreano #coreanoparalatinos #한글 #clasesdecoreano` + los 3 propios de cada reel. Ubicación: Santiago, Chile.
**Grabación 1 (dom 20, 90 min):** R1, R2, R3 + 4 clips B-roll. **Grabación 2 (dom 27, 90 min):** R4, R5, R6, R7 + 3 clips "hoy cierra".

### R1 · "¿Puedes leer esta palabra?" (Dubu) · dom 20 · 21:00
- **Formato:** UNA grabación de pantalla del celular en `academiaseul.com/dubu`, tu voz por el micrófono. Termina el 1-1 y salta al 1-5 antes de grabar.
- **Texto en pantalla:** "Tu primera palabra en coreano. 30 segundos. Gratis."
- **Guion (voz):** "¿Nunca leíste coreano? Dame 30 segundos. Esto es Dubu. Tocas una consonante y una vocal y formas la sílaba: ㅇ más ㅏ… 아." *(suena la voz nativa)* "Ahora una palabra completa: ㅇ + ㅜ, ㅇ + ㅠ… 우유. Leche. Acabas de leer tu primera palabra en coreano y no pagaste nada. Son 30 niveles con voz nativa y un modo donde solo escuchas y armas de oído."
- **CTA:** "Juega Dubu gratis: link en bio."
- **Caption:** Acabas de leer 우유 (leche) en coreano. Dubu es nuestro juego gratis del Hangul: consonante + vocal, voz nativa, 30 niveles. Juega en academiaseul.com/dubu · link en bio. 화이팅.
- **Hashtags propios:** #hangul #한글배우기 #juegodecoreano

### R2 · "Tu curso según tu caso" · mar 22
- **Formato:** UNA toma corrida de 40 s a cámara, leyendo la escalera desde la pantalla del PC (fuera de cuadro). Si te trabas, sigue.
- **Texto en pantalla:** "¿Qué curso de coreano me toca? 5 casos, 40 segundos."
- **Guion:** "Cinco casos, cinco respuestas. ¿Nunca estudiaste coreano? Básico 1, martes o jueves a las 20:00 hora de Chile, con Guiran; eliges un día. ¿Ya lees Hangul y sabes presentarte? Básico 2, miércoles 21:00, conmigo. ¿Quieres conversar con una profesora que está en Corea ahora mismo? Conversacional 1, martes 21:00, con Abby. ¿Vas por el TOPIK? TOPIK II, jueves 21:00, solo 8 cupos. ¿Tu hijo o hija de 8 a 12? Coreano para Niños, lunes 18:00, con Abby y conmigo. Todos: 8 semanas, una clase en vivo por Zoom a la semana, certificado incluido. Un solo precio: US$150 el curso completo, o 2 cuotas de US$75."
- **CTA:** "Elige tu caso en el link de la bio. Matrícula hasta el domingo 4 de octubre."
- **Caption:** Cinco casos, cinco cursos: Básico 1 si empiezas de cero · Básico 2 si ya lees Hangul · Conversacional 1 con Abby desde Corea · TOPIK II si vas por el examen · Coreano para Niños los lunes. US$150 el curso completo · o 2 cuotas de US$75. Elige tu caso en el link de la bio, hasta el 4 de octubre.
- **Hashtags propios:** #coreanoonline #한국어공부 #TOPIK

### Historia del mié 23 · "Día 1 del reto" (15 s a cámara, se graba ese día; NO es reel)
- **Guion:** "Hoy empieza el reto #LeoCoreanoEn7Días. 10 minutos al día, siete días, y el martes 29 te pones a prueba. Día 1: solo vocales. Abre el Lector de Hangul, toca cada vocal y repítela con la voz nativa. Diez minutos. Entre quienes completen los 7 días sorteamos 1 cupo gratis en Básico 1; el miércoles 30 anuncio quién."
- **Texto en pantalla:** "#LeoCoreanoEn7Días · día 1 = vocales del Lector"
- **Caption del post del mié 23:** Reto #LeoCoreanoEn7Días: 10 minutos al día, del 23 al 29. D1 vocales · D2 consonantes · D3 Dubu mundos 1–2 · D4 clase en vivo (sáb 20:00) · D5 Dubu mundos 3–4 · D6 Practicar · D7 Contrarreloj + Tu oído. Sube tu captura de cada día con el hashtag y etiqueta a @academiaseul. Premio: 1 cupo gratis en Básico 1 (se anuncia el mié 30) + Guía del Alfabeto para todos. Lector gratis en el link de la bio. Instagram no patrocina ni administra este reto.

### R3 · "Día 2 del reto: tu primera palabra en 60 s" · jue 24
- **Formato:** UNA grabación de pantalla continua: Lector de Hangul (pestaña Alfabeto) → cambio de pestaña a Dubu, nivel 1-5 (barrio Bukchon, nivel 5, abierto desde el inicio). Tu voz por el micrófono.
- **Texto en pantalla:** "Tu primera palabra en 60 s · ㅇ+ㅜ=우 · ㅇ+ㅠ=유 · 우유"
- **Guion:** "Día 2 del reto. Ayer vocales, hoy las juntamos con una consonante. ㅇ es muda al inicio. ㅇ más ㅜ: 우." *(voz nativa)* "ㅇ más ㅠ: 유." *(voz nativa)* "Juntas: 우유, leche. Ya leíste una palabra. Ahora ármala tú: en Dubu, barrio Bukchon, nivel 5." *(se arma 우유, suena)* "Diez minutos y listo. Sube tu captura."
- **CTA:** "Lector y Dubu gratis: link en bio. Sube tu captura con #LeoCoreanoEn7Días y etiqueta a @academiaseul."
- **Caption:** Día 2 del reto: ㅇ+ㅜ=우, ㅇ+ㅠ=유 → 우유 (leche). Léela en el Lector y ármala en Dubu (Bukchon, nivel 5). Los dos gratis en el link de la bio. #LeoCoreanoEn7Días
- **Hashtags propios:** #LeoCoreanoEn7Días #hangul #한글배우기

### 🟦 En vivo · "Lee tu nombre en coreano" · sáb 26 · 20:00 Chile (30 min)
- **Requisitos (vie 25):** "Archivar directos" activado · directo de prueba de 10 s en "Practicar" · Lector abierto en el PC como segunda pantalla · lista de 10 nombres: Camila 카밀라 · Sofía 소피아 · Mateo 마테오 · Valentina 발렌티나 · Daniela 다니엘라 · Andrés 안드레스 · José 호세 · María 마리아 · Nicolás 니콜라스 · Fernanda 페르난다.
- **Guion:** 0–5 min qué es el Hangul (14 consonantes básicas, 10 vocales, se lee en 1 hora) · 5–20 min escribir 8–10 nombres del chat en la pizarra o en el Lector · 20–25 min "busca tu sílaba en Dubu / escúchala en el Lector" · 25–30 min dudas de octubre + cierre: **"si te inscribes con un chingu antes del domingo 4, los dos reciben una sesión 1:1 de 20 min conmigo; el link está en la bio."**
- **Al terminar:** Compartir en el perfil + descargar el video. El dom 27 se recorta 60 s desde Instagram.

### R4 · "Así van las clases: quedan 6 días" · lun 28 (se graba dom 27)
- **Formato:** UNA toma a cámara de 25 s leyendo la hoja de números. La tabla de cupos va como captura en historia, no en el reel.
- **Texto en pantalla:** "Cupos reales · cierro el domingo 4"
- **Guion:** "Sin adornos: así van los cupos hoy [fecha]. Niños, lunes 18:00: quedan [N] de 12. Básico 1 martes: [N] de 15. Básico 1 jueves: [N] de 15. Conversacional 1 con Abby: [N] de 15. Básico 2: [N] de 15. TOPIK II: [N] de 8. Cierro la matrícula el domingo 4 y el lunes 5 empezamos."
- **CTA:** "Tu cupo en el link de la bio."
- **Caption:** Cupos reales al [fecha]. Cierre: domingo 4 de octubre 23:59. US$150 el curso completo · o 2 cuotas de US$75 · certificado incluido. Link en bio.
- **Hashtags propios:** #coreanoonline #한국어공부 #cursodecoreano

### R5 · "Ganador del reto" · mié 30 (intro grabada dom 27 · o se graba ese día en 5 min)
- **Formato:** UNA toma a cámara de 20 s. Las capturas de participantes van como historias con permiso.
- **Texto en pantalla:** "#LeoCoreanoEn7Días · ganador/a"
- **Guion:** "Siete días, diez minutos al día, y [X] personas llegaron al final leyendo coreano. Gracias. El cupo gratis en Básico 1 es para… [nombre]. Felicitaciones. Y a todos los que participaron les mando hoy la Guía del Alfabeto por DM. Si quieres el cupo igual, quedan lugares en Básico 1: link en bio."
- **CTA:** "Quedan lugares en Básico 1: link en bio."
- **Caption:** Terminó el reto #LeoCoreanoEn7Días. Ganador/a del cupo gratis en Básico 1: [nombre]. Todos los participantes reciben la Guía del Alfabeto. ¿Quieres entrar igual? Cierro el domingo 4 · link en bio.
- **Hashtags propios:** #LeoCoreanoEn7Días #hangul #한글배우기

### R6 · "Jay a cámara, sin edición" · vie 2 (se graba dom 27; o el mismo viernes en una toma)
- **Formato:** UNA toma, sin cortes, sin música, en el escritorio donde das clase. Si te equivocas, sigue. Los clips de Guiran y Abby van en la historia ② de ese día, no dentro del reel.
- **Texto en pantalla:** "Sin edición. Cierro el domingo 4."
- **Guion:** "Sin edición, sin guion. Soy Jay. Nací en Seúl, llegué a Chile a los 10 y llevo más de 8 años enseñando coreano. Academia Seúl la armé para enseñar como a mí me habría gustado aprender: grupos chicos, profes coreanas (Guiran desde Argentina, Abby desde Corea), en vivo, y sin promesas que no puedo cumplir. Ocho semanas no te hacen hablar fluido; te dan una base real y un lugar donde practicar. El lunes empiezan las clases: Niños el lunes, Básico 1 y Conversacional 1 el martes, Básico 2 el miércoles, TOPIK II el jueves. Cierro el domingo 4. US$150 el curso completo, o 2 cuotas de US$75, con certificado. Si tienes una duda, escríbeme al WhatsApp del perfil y te respondo yo. Nos vemos el lunes. 화이팅."
- **CTA:** "Inscríbete en el link de la bio. Cierro el domingo 4."
- **Caption:** Sin edición. Soy Jay, nací en Seúl y llevo más de 8 años enseñando coreano. El domingo 4 cierro la matrícula de octubre y el lunes empezamos. US$150 el curso completo · o 2 cuotas de US$75, certificado incluido. Link en bio · dudas por WhatsApp +56 9 4211 5562.
- **Hashtags propios:** #jaychingu #coreanoonline #화이팅

### R7 · "Dangún y el tigre que se rindió" · sáb 3 (개천절) · se graba dom 27
- **Formato:** UNA toma a cámara de 30 s con el sello del tigre detrás (impreso o en la pantalla del PC). Portada: `Campana_Assets/instagram/01_dangun_tigre.png`. Habla más lento: es un cuento.
- **Texto en pantalla:** "Corea nació de una osa. El tigre se rindió. 3 de octubre · 개천절"
- **Guion:** "¿Sabes por qué nuestro logo es un tigre? Un tigre y una osa querían ser humanos. Les dieron ajo y artemisa, y una cueva: cien días sin ver el sol. El tigre no aguantó y se fue. La osa se quedó, se volvió mujer, y de ella nació Dangún, el fundador de Corea. Hoy, 3 de octubre, Corea celebra ese día: 개천절, el día en que se abrió el cielo. Nuestro tigre sigue sin paciencia. Pero tú no necesitas cien días: mañana cierro la matrícula y el lunes empezamos."
- **CTA:** "La historia completa está en el blog: link en mis historias de hoy."
- **Caption:** Un tigre y una osa quisieron ser humanos; el tigre se rindió, la osa se quedó y de ella nació Dangún. Hoy Corea celebra su fundación (개천절); el lunes empezamos la tuya. Artículo completo: academiaseul.com/blog (link en historias). Cierro mañana 23:59.
- **Hashtags propios:** #개천절 #culturacoreana #한국문화

### Posts estáticos (diseños ya exportados, sin grabar)
- **Vie 25 · Piso F** (`03_piso_f_numeros.png`). Caption: En muchos edificios de Corea el ascensor salta del 3 al F. El cuatro se dice 사 y suena igual que 死 (muerte). 일 이 삼 사 오: escucha los números con voz nativa en el Lector de Hangul, gratis, link en bio. Hoy en el reto: Dubu, mundos 1 y 2. Artículo completo: academiaseul.com/blog (link en historias). Hashtags propios: #culturacoreana #한국문화 #numeroscoreanos.
- **Mar 29 · Sopa de algas** (`02_sopa_de_algas_topik.png`). Caption: Esto es 미역국, sopa de algas. Deliciosa. Y hay un día en que nadie la toca: el 수능, el examen de acceso a la universidad. El alga resbala, y en coreano resbalar es reprobar. Hoy es el día 7 del reto = tu prueba (Contrarreloj del Lector + Tu oído de Dubu): hoy nada de 미역국 🙂 Artículo completo: academiaseul.com/blog (link en historias). Y si vas por el TOPIK II: jueves 21:00, cupo 8. Hashtags propios: #미역국 #수능 #culturacoreana.
- Si Jay quiere grabar alguno de estos dos, va como **historia** de 15 s, no como reel.

---

## 3 · Emails de Brevo (cuerpos listos para pegar)

**Base:** lista `01 Leads sitio` (97: P1 18 · P2 21 · P3 58). Hora: 10:00 Chile salvo L5-b (12:00) y O1 (9:00). Remitente: "Jay · Academia Seúl" (`hola@academiaseul.com` si el dominio quedó autenticado hoy; si no, `hola.academiaseul@gmail.com` verificado y autenticar antes de L4).
**Pie obligatorio en todos:** Academia Seúl · Santiago, Chile · `{{ unsubscribe }}` ("Si no quieres recibir más correos, haz clic aquí").
**UTM:** `?utm_source=brevo&utm_medium=email&utm_campaign=` + `l1` `l1b` `l2` `l3` `l4` `l5` `l5b` `o1` `n1`.
**Personalización:** `{{ contact.FIRSTNAME | default: "chingu" }}` · `{{ contact.CURSO_SUGERIDO | default: "Básico 1 (A1.1)" }}`.
**Regla:** semana 1 = 1 comercial por persona (P1 recibe 1–2 toques, P2/P3 recibe 1 y +1 solo si abrió). Semana de cierre = 3 comerciales (L4, L5 y el L5-b corto del domingo). Antes de cada envío "todos menos inscritos": mover a los pagados a `02 Alumnos octubre` y excluir esa lista.
**Segmentos de actividad:** Contacts → Segments → Campaign activity → Opened / Clicked → guardar `Abrió L1` · `No abrió L1` · `Abrió L1 o L1-b` · `Abrió L4 o L5`.

| # | Día · hora | Segmento | Aprox. | Tipo |
|---|---|---|---|---|
| L1 | Lun 21 · 10:00 | P1 (ex-alumnos julio → variante 3) | 18 | Comercial |
| L1-b | Mar 22 · 10:00 | P2 + P3 | 79 | Comercial (incluye reto y vivo) |
| L2 | Mié 23 · 10:00 | P1 que **no abrió** L1 | ~8 | Contenido |
| L3 | Vie 25 · 10:00 | Abrió o clicó L1 / L1-b | variable | Recordatorio del vivo |
| L4 | Lun 28 · 10:00 | Todos menos inscritos | ≤ 97 | Comercial |
| L5 | Jue 1 · 10:00 | Todos menos inscritos · 2 asuntos | ≤ 97 | Comercial |
| L5-b | Dom 4 · 12:00 | Abrió L4 o L5 y no inscrito (programado vie 2) | variable | Comercial corto |
| O1 | Lun 5 · 9:00 | `02 Alumnos octubre` (programado dom 4 noche) | inscritos | Onboarding |
| N1 | Mar 6 · 10:00 | Todos menos inscritos | ≤ 97 | Lista enero 2027 |

### L1 · Lun 21 · P1
**Asunto:** `{{ contact.FIRSTNAME | default: "Chingu" }}, tu cupo en octubre 🇰🇷` · **Preheader:** `8 semanas · US$150 el curso completo o 2 × US$75 · certificado`

> ¡Hola {{ contact.FIRSTNAME | default: "chingu" }}! 안녕하세요 💙
>
> Soy Jay (김재희), de Academia Seúl. Me dejaste tus datos para avisarte cuando abriera la próxima cohorte, y hoy es el día: **la matrícula de octubre ya está abierta**, y te lo cuento a ti primero, con tu curso ya elegido según lo que me contaste.
>
> Según lo que me contaste, tu curso es **{{ contact.CURSO_SUGERIDO | default: "Básico 1 (A1.1)" }}**. Todas las clases parten la semana del 5 de octubre: 8 semanas, 1 clase en vivo por Zoom de 60 min a la semana, certificado incluido.
>
> Horarios (hora de Chile):
> 🧒 Coreano para Niños (8–12) · Lun 18:00 · Jay y Abby
> 🌱 Básico 1 (A1.1) · Mar 20:00 o Jue 20:00 (eliges uno) · Prof.ª Guiran
> 💬 Conversacional 1 (A2.1) · Mar 21:00 · Prof.ª Abby (nativa, desde Corea)
> 🚀 Básico 2 (A1.2) · Mié 21:00 · Jay
> 🎯 TOPIK II (B1+) · Jue 21:00 · Jay (cupo 8)
>
> 💙 **Un solo precio para todos: US$150 el curso completo, o 2 cuotas de US$75.** PayPal, Mercado Pago o transferencia.
>
> **[BOTÓN] Reservar mi cupo →** https://www.academiaseul.com/nivel-1?utm_source=brevo&utm_medium=email&utm_campaign=l1
>
> ¿Otro país? En esa página ves tu hora exacta. ¿Dudas de nivel? Responde este correo o escríbeme al WhatsApp +56 9 4211 5562 y lo vemos en 5 minutos.
>
> Cierro inscripciones el domingo 4 de octubre. Nos vemos el 5. 화이팅!
>
> P.D.: esta semana hay dos cosas gratis: el reto #LeoCoreanoEn7Días (empieza el miércoles 23 en @academiaseul, premio: 1 cupo gratis) y una clase abierta en vivo en Instagram el sábado 26 a las 20:00 hora Chile: "Lee tu nombre en coreano". Y si te inscribes con un chingu, los dos reciben una sesión 1:1 de 20 min conmigo.
>
> Jay Kim (김재희) · Academia Seúl · @academiaseul

**Variante 3 (los 2 ex-alumnos de julio, ORIGEN = alumno_julio):** reemplazar el primer párrafo por: "Hace dos meses no sabías leer 한글 y hoy ya te presentas en coreano. Abrí la cohorte de octubre y tu siguiente paso es **Básico 2 (A1.2)**, miércoles 21:00, conmigo (o Conversacional 1 con Abby si prefieres puro hablar). Te lo cuento a ti primero."

### L1-b · Mar 22 · P2 + P3
**Asunto:** `Del taller de Hangul a tu primera clase 🐯` · **Preheader:** `Clases desde el 5 de octubre · el Lector y Dubu siguen gratis`

> ¡Hola {{ contact.FIRSTNAME | default: "chingu" }}! 안녕하세요 💙
>
> Soy Jay, de Academia Seúl. Nos conocimos en el taller gratuito de Hangul: en una hora leíste tu primera palabra en coreano. Te escribo porque **ahora sí abrimos el curso para seguir desde ahí.**
>
> 🌱 **Básico 1 (A1.1) · Primeras Palabras**, desde cero absoluto · Martes 20:00 o Jueves 20:00 hora Chile (eliges uno) · con la Prof.ª Guiran (기란), coreana criada en Argentina, bilingüe. En 8 semanas: lees cualquier sílaba, te presentas, presentas a tu familia, cuentas en los dos sistemas de números y dices qué te gusta.
>
> ¿Ya tienes algo de base? Haz el test de nivel gratis (5 preguntas) y te digo si te conviene Básico 2: https://www.academiaseul.com/test-nivel?utm_source=brevo&utm_medium=email&utm_campaign=l1b
>
> Y mientras decides, dos regalos que siguen gratis: el **Lector de Hangul** (voz nativa) y **Dubu (두부)**, nuestro juego nuevo del Hangul: https://www.academiaseul.com/dubu?utm_source=brevo&utm_medium=email&utm_campaign=l1b
>
> **Mañana miércoles 23 empieza el reto #LeoCoreanoEn7Días** en @academiaseul: 10 minutos al día, un paso en el Lector o un barrio de Dubu, y el martes 29 te pones a prueba. Entre quienes completen los 7 días sorteamos 1 cupo gratis en Básico 1.
>
> 🗓️ Empieza la semana del 5 de octubre · 60 min por clase · certificado incluido
> 💙 US$150 el curso completo, o 2 cuotas de US$75 · PayPal, Mercado Pago o transferencia
>
> **[BOTÓN] Ver horarios y reservar →** https://www.academiaseul.com/nivel-1?utm_source=brevo&utm_medium=email&utm_campaign=l1b
>
> Cierro inscripciones el domingo 4 de octubre. Cualquier duda, responde este correo o escríbeme al WhatsApp +56 9 4211 5562.
>
> P.D.: esta semana hay dos cosas gratis: el reto #LeoCoreanoEn7Días (empieza el miércoles 23 en @academiaseul, premio: 1 cupo gratis) y una clase abierta en vivo en Instagram el sábado 26 a las 20:00 hora Chile: "Lee tu nombre en coreano". Y si te inscribes con un chingu, los dos reciben una sesión 1:1 de 20 min conmigo.
>
> 화이팅!
> Jay Kim (김재희) · Academia Seúl

### L2 · Mié 23 · solo P1 que no abrió L1 (~8)
**Asunto:** `Dubu: el juego gratis del Hangul 🐯` · **Preheader:** `7 días, 10 minutos al día · premio: 1 cupo gratis · clase abierta el sábado`

> ¡Hola {{ contact.FIRSTNAME | default: "chingu" }}! 안녕하세요 💙
>
> Hoy no te vendo nada. Te propongo un reto: **#LeoCoreanoEn7Días**. 10 minutos al día, del 23 al 29 de septiembre, y el día 7 te pones a prueba con el Contrarreloj del Lector y el modo Tu oído de Dubu.
>
> Así funciona:
> 1. Cada día, 10 minutos: un paso en el Lector de Hangul o un barrio de Dubu (두부), nuestro juego gratis del Hangul. Te digo qué toca cada mañana en las historias de @academiaseul.
> 2. Subes una captura a tus historias etiquetando a @academiaseul con #LeoCoreanoEn7Días.
> 3. Entre quienes completen los 7 días sorteamos **1 cupo gratis** en Básico 1 de octubre (se anuncia el miércoles 30).
>
> **[BOTÓN] Empezar el reto con Dubu →** https://www.academiaseul.com/dubu?utm_source=brevo&utm_medium=email&utm_campaign=l2
>
> Y guarda esta fecha: **sábado 26 de septiembre, 20:00 hora Chile**, clase abierta en vivo en Instagram (@academiaseul): "Lee tu nombre en coreano". Gratis, sin inscripción, 30 minutos.
>
> 화이팅!
> Jay Kim (김재희) · Academia Seúl

### L3 · Vie 25 · abrió o clicó L1 / L1-b (programar jue 24 por la noche)
**Asunto:** `Mañana 20:00 · clase abierta en Instagram` · **Preheader:** `Sábado 26 · gratis · en vivo en @academiaseul`

> {{ contact.FIRSTNAME | default: "Chingu" }}, mañana sábado 26 hago una clase abierta en vivo en Instagram: **"Lee tu nombre en coreano"**. 30 minutos, gratis, sin inscripción.
>
> 🕗 20:00 Chile y Argentina · 19:00 Venezuela · 18:00 Colombia y Perú · 17:00 México
>
> **[BOTÓN] Ir al perfil @academiaseul →** https://www.instagram.com/academiaseul
>
> Trae lápiz y papel. Al final respondo dudas sobre los cursos de octubre (cierre de matrícula: domingo 4).
>
> 화이팅! Jay

### L4 · Lun 28 · todos menos inscritos (programar dom 27; usar el HTML de marca si quedó editado)
**Asunto:** `{{ contact.FIRSTNAME | default: "Chingu" }}, cierro el domingo 4` · **Preheader:** `Matrícula hasta el domingo 4 de octubre · clases desde el 5`
**Rellenar `[N]`** con el conteo del dom 27 (Formspree "💰 PAGO" + PayPal + Mercado Pago). Máximos: 15 por sección, 8 TOPIK II, 12 Niños.

> ¡Hola {{ contact.FIRSTNAME | default: "chingu" }}! 안녕하세요 💙
>
> Última semana: **la matrícula de octubre cierra el domingo 4** y las clases parten la semana del 5.
>
> Así quedan los cupos hoy (hora de Chile):
> 🧒 Niños (8–12) · Lun 18:00 · quedan [N] de 12
> 🌱 Básico 1 · Mar 20:00 · quedan [N] de 15
> 🌱 Básico 1 · Jue 20:00 · quedan [N] de 15
> 💬 Conversacional 1 · Mar 21:00 · quedan [N] de 15
> 🚀 Básico 2 · Mié 21:00 · quedan [N] de 15
> 🎯 TOPIK II · Jue 21:00 · quedan [N] de 8
>
> Lo que dicen alumnas de mis cursos anteriores:
> "Fue entretenido y entendí muy bien las clases. Tiene mucha paciencia y hace agradable el aprender." — Valentina San Martín, Nivel A1
> "Cuando le preguntamos un concepto, nos cuenta una pequeña historia relacionada — así lo recuerdo más fácilmente." — Nedielka Curkovic, Básico 2
> "Siempre disponible para responder dudas dentro y fuera del horario de clases, además de explicar hasta que se entienda." — Carolina Morales, Nivel B1
>
> 💙 US$150 el curso completo, o 2 cuotas de US$75 · certificado incluido.
>
> **[BOTÓN] Reservar mi cupo →** https://www.academiaseul.com/nivel-1?utm_source=brevo&utm_medium=email&utm_campaign=l4
>
> ¿Aún no sabes tu nivel? Responde este correo con una línea sobre lo que ya sabes y te digo honestamente qué curso elegiría yo para ti.
>
> 화이팅!
> Jay Kim (김재희) · Academia Seúl

### L5 · Jue 1 · todos menos inscritos · 2 asuntos, mismo cuerpo (texto simple)
**Asunto para "Abrió algo":** `Quedan 3 días: ¿nos vemos el 5?` · **Asunto para "No abrió nada":** `¿Todavía quieres aprender coreano?` · **Preheader:** `Domingo 4 cierro la matrícula de octubre · un solo precio`

> {{ contact.FIRSTNAME | default: "Chingu" }}, te escribo corto y sin adornos.
>
> El **domingo 4 de octubre cierro la matrícula** de la cohorte de octubre y el lunes 5 empezamos. Después de eso, la próxima oportunidad es enero de 2027.
>
> Si estabas esperando una señal: es esta. Tu curso es **{{ contact.CURSO_SUGERIDO | default: "Básico 1 (A1.1)" }}**, 8 semanas, 1 clase en vivo de 60 min a la semana, certificado incluido, **US$150 el curso completo, o 2 cuotas de US$75**.
>
> **[BOTÓN] Reservar mi cupo antes del domingo →** https://www.academiaseul.com/nivel-1?utm_source=brevo&utm_medium=email&utm_campaign=l5
>
> Si octubre no te acomoda, dime "enero" respondiendo este correo y te aviso primero cuando abra la próxima. Y si ya no te interesa, sin problema: el link de baja está abajo y no te escribo más.
>
> Gracias por leerme. 화이팅!
> Jay Kim (김재희) · Academia Seúl · WhatsApp +56 9 4211 5562

### L5-b · Dom 4 · 12:00 · solo "Abrió L4 o L5" y no inscrito (programar vie 2)
**Asunto:** `Hoy cierra · 23:59` · **Preheader:** `Último día de matrícula de octubre`

> {{ contact.FIRSTNAME | default: "Chingu" }}, hoy a las 23:59 cierro la matrícula de octubre.
> Si ya te inscribiste, ignora esto.
> Si no: https://www.academiaseul.com/nivel-1?utm_source=brevo&utm_medium=email&utm_campaign=l5b
>
> 화이팅! Jay

### O1 · Lun 5 · 9:00 · lista `02 Alumnos octubre` (programar dom 4 por la noche, UNA versión con la tabla de links)
**Asunto:** `¡Empezamos! Tu link de Zoom y tu hora` · **Preheader:** `Todo lo que necesitas para tu primera clase esta semana`

> ¡{{ contact.FIRSTNAME | default: "chingu" }}, bienvenido/a a Academia Seúl! 환영합니다 💙
>
> Esta semana empieza tu curso **{{ contact.CURSO_SUGERIDO | default: "Básico 1 (A1.1)" }}**. Busca tu clase en la tabla y guarda tus dos links:
>
> | Curso | Primera clase (hora Chile) | Zoom | Grupo de WhatsApp |
> |---|---|---|---|
> | 🧒 Coreano para Niños | Lun 5 · 18:00 | [ZOOM NIÑOS] | [GRUPO NIÑOS] |
> | 🌱 Básico 1 · martes | Mar 6 · 20:00 | [ZOOM B1 MAR] | [GRUPO B1 MAR] |
> | 💬 Conversacional 1 | Mar 6 · 21:00 | [ZOOM C1] | [GRUPO C1] |
> | 🚀 Básico 2 | Mié 7 · 21:00 | [ZOOM B2] | [GRUPO B2] |
> | 🌱 Básico 1 · jueves | Jue 8 · 20:00 | [ZOOM B1 JUE] | [GRUPO B1 JUE] |
> | 🎯 TOPIK II | Jue 8 · 21:00 | [ZOOM TOPIK] | [GRUPO TOPIK] |
>
> 🌎 Tu hora exacta según tu país: https://www.academiaseul.com/programa
> 💻 Entra 5 minutos antes, con cámara encendida si puedes; las clases quedan grabadas.
> 📚 Programa completo (PDF): https://www.academiaseul.com/programas/Programa_Cursos_Octubre_2026.pdf
> 🐯 Practica entre clases, gratis: Lector de Hangul https://www.academiaseul.com/lector-hangul y Dubu https://www.academiaseul.com/dubu
>
> Tres normas simples: puntualidad, participar (equivocarse es parte), y avisar por el grupo si no puedes venir (te queda la grabación).
>
> Nos vemos en clase. 화이팅!
> Jay Kim (김재희) y el equipo · Academia Seúl

**Recordatorio automático de clase (Brevo, 8:00 del día de clase, solo a la lista de ese curso):** "{{ contact.FIRSTNAME | default: "Chingu" }}, hoy a las [hora] hora Chile tienes [curso]. Zoom: [link]. Lleva cuaderno. 화이팅."

### N1 · Mar 6 · 10:00 · todos menos inscritos
**Asunto:** `Tu lugar en enero 2027 🌱` · **Preheader:** `Lista de espera de enero abierta · Dubu y el Lector siguen gratis`

> ¡Hola {{ contact.FIRSTNAME | default: "chingu" }}! 안녕하세요 💙
>
> Esta semana partió la cohorte de octubre. Si esta vez no pudiste, no pasa nada: **la próxima abre en enero de 2027**, con Básico 1, Básico 2, Conversacional 1 y 2, TOPIK II y Niños.
>
> ¿Quieres que te avise primero, antes de anunciarlo en redes? Responde este correo con la palabra **"enero"** y quedas en la lista.
>
> Mientras tanto, dos cosas siguen gratis para que no pierdas el ritmo:
> 🐯 **Dubu (두부)**, el juego del Hangul: https://www.academiaseul.com/dubu
> 📖 **Lector de Hangul** con voz nativa: https://www.academiaseul.com/lector-hangul
>
> **[BOTÓN] Jugar Dubu →** https://www.academiaseul.com/dubu?utm_source=brevo&utm_medium=email&utm_campaign=n1
>
> Gracias por estar del otro lado. 화이팅!
> Jay Kim (김재희) · Academia Seúl

---

## 4 · WhatsApp · +56 9 4211 5562

Solo 10 de los 97 contactos tienen WhatsApp: trato 1:1, **máximo 3 mensajes a cada uno** (lun 21 · lun 28 · dom 4) + 1 extra solo a quien respondió. Nada de difusiones: los avisos del mié 23 y jue 1 van por **Estado de WhatsApp**. Etiquetas: `lead` · `abierto` · `inscrito` · `enero`.

### (a) Bienvenida automática + respuestas rápidas
**Bienvenida (saludo/ausencia):**
> ¡Hola! 안녕하세요 👋 Soy Jay de Academia Seúl. Te respondo hoy mismo (normalmente entre 19:00 y 22:00 hora Chile). Mientras tanto: horarios y precios en academiaseul.com/programa · inscripción en academiaseul.com/nivel-1 · y dos regalos gratis: Dubu, el juego del Hangul (academiaseul.com/dubu) y el Lector con voz nativa (academiaseul.com/lector-hangul) 🐯

**/precio**
> Todos los cursos cuestan lo mismo: US$150 el curso completo de 8 semanas, o 2 cuotas de US$75. Incluye clases en vivo por Zoom, grabaciones, material, Lector de Hangul, Dubu y certificado 🎓 Inscripción hasta el domingo 4 de octubre: academiaseul.com/nivel-1

**/horarios**
> Hora de Chile: 🧒 Niños lun 18:00 · 🌱 Básico 1 mar 20:00 o jue 20:00 (eliges uno) · 💬 Conversacional 1 mar 21:00 · 🚀 Básico 2 mié 21:00 · 🎯 TOPIK II jue 21:00 (cupo 8). Todo parte la semana del 5 de octubre. ¿Desde qué país me escribes? Te digo tu hora exacta.

**/niños**
> Coreano para Niños (8–12): lunes 18:00 Chile, 8 semanas, máximo 12, con Jay y Abby, juegos, canciones y show final para la familia. Grupo de WhatsApp solo para apoderados. Para que tu hijo/a vaya calentando motores: academiaseul.com/dubu (juego gratis del Hangul). Inscripción: academiaseul.com/nivel-1?clase=ninos

**/pagar**
> Puedes pagar por transferencia (Chile, te paso los datos), tarjeta vía Mercado Pago, o PayPal en dólares (US$150 el curso completo o 2 cuotas de US$75). ¿Cuál prefieres? Te mando el link exacto y te confirmo el cupo apenas llegue.

### (b) Respuestas guardadas de Instagram (encuesta "¿Cuál es tu caso?")
- **Nunca estudié →** "¡Perfecto, se empieza de cero! Tu clase es Básico 1 con Guiran: martes o jueves 20:00 hora Chile, tú eliges. Aquí con tu hora local: academiaseul.com/nivel-1?clase=a11-martes 🐯"
- **Ya leo hangul →** "¡Entonces ya pasaste lo más difícil! Tu clase es Básico 2 conmigo, miércoles 21:00 hora Chile: academiaseul.com/nivel-1?clase=a12 · ¿Dudas de nivel? Test gratis de 5 preguntas: academiaseul.com/test-nivel"
- **Quiero hablar →** "Conversacional 1 con Abby, que enseña desde Corea: martes 21:00 hora Chile, puro hablar. academiaseul.com/nivel-1?clase=a21 💬"
- **Es para mi hijo →** "Coreano para Niños (8–12), lunes 18:00 hora Chile, con Abby y conmigo, máximo 12: academiaseul.com/nivel-1?clase=ninos 🧒 Y mientras tanto, Dubu gratis: academiaseul.com/dubu"

### (c) Guiran y Abby · enviar hoy · plazo miércoles 23 a las 22:00 Chile
**Guiran:**
> ¡Guiran! 안녕 💙 Arranco la campaña de octubre mañana y me faltas tú.
> ¿Me grabas un video vertical de 15 s con el celular? Sin editar, luz de ventana, así:
> "Hola, soy Guiran, coreana criada en Argentina. En Básico 1 vamos desde cero: en 8 semanas lees, te presentas y hablas de tu familia. Nos vemos los martes o los jueves a las 20:00 hora Chile, el día que elijas. 화이팅!"
> Mándamelo por aquí como documento (calidad original), ideal antes del miércoles 23 a las 22:00. Y pásame tus links de Zoom para el martes 6 y el jueves 8. ¡Gracias, 고마워! 🐯

**Abby (recuerda: domingo 20:00 Chile = lunes 08:00 KST):**
> ¡Abby! 안녕하세요 💙 Esta semana lanzo la campaña de octubre y quiero presentarte a los alumnos.
> ¿Me grabas un video vertical de 15 s con el celular, cuando puedas esta semana? Sin editar, en español (una frase en coreano al inicio queda perfecta):
> "안녕하세요! Soy Abby, profesora coreana, y enseño desde Corea. En Conversacional 1 hablamos de K-pop, viajes, comida… puro hablar. Nos vemos los martes a las 21:00 hora Chile. 화이팅!"
> Si puedes, otro de 10 s saludando a los niños para Coreano para Niños 🧒. Ideal antes del miércoles 23 a las 22:00 hora Chile. Y pásame tu link de Zoom para el martes 6 (y el del lunes 5 de Niños si lo creas tú). ¡Gracias, 고마워요! 🐯

**Plan B (si el miércoles no llegaron):** jueves 24 y viernes 2 van foto + 1 línea de cada una: Guiran "Profesora coreana criada en Argentina, bilingüe. Años de experiencia enseñando coreano en español." · Abby "Profesora coreana nativa, pedagoga. Dicta el conversacional desde Corea: clases donde solo se habla."

### (d) 3 mensajes 1:1 a los 10 contactos con WhatsApp
**1 · Lun 21 (apertura):**
> ¡Hola [nombre]! Jay de Academia Seúl 💙 Hoy abrí la matrícula de octubre y te aviso antes que en redes.
> Según lo que me contaste, tu curso es [CURSO], [día] a las [hora] hora Chile (8 semanas, en vivo por Zoom, certificado). US$150 el curso completo o 2 cuotas de US$75.
> Todo aquí: academiaseul.com/nivel-1 · ¿Alguna duda de nivel u horario? 화이팅 🐯

**2 · Lun 28 (cupos):**
> [nombre], última semana: cierro la matrícula el domingo 4 y el lunes partimos.
> En [CURSO] quedan [N] cupos (conteo real de hoy). Si prefieres 2 cuotas de US$75, se puede.
> ¿Te reservo el cupo? academiaseul.com/nivel-1 🙌

**3 · Dom 4 (cierre):**
> [nombre], hoy es el último día de matrícula 🙏
> Sin presión: si octubre no te acomoda, te anoto para enero 2027 y te aviso primero.
> Si sí, aquí está: academiaseul.com/nivel-1
> Cualquiera de las dos respuestas me sirve 💙

**Extra (solo a quien respondió y no cerró, vie 2):**
> [nombre], quedan 2 días. ¿Te mando el link de pago de [CURSO] o prefieres que te anote para enero? Las dos opciones están bien 💙

**Estado de WhatsApp:** mié 23 "Empieza el reto #LeoCoreanoEn7Días: 10 min al día, gratis, en @academiaseul" · jue 1 "Cierro la matrícula de octubre el domingo 4 · academiaseul.com/nivel-1".

### (e) "Trae un chingu" · a cada inscrito al confirmar el pago y de nuevo el lun 28
> ¡[nombre], ya estás dentro! 🎉 환영합니다 💙
> Una cosa: aprender coreano de a dos es más fácil (y más divertido).
> Si un amigo o amiga se inscribe contigo antes del domingo 4, **los dos reciben una sesión 1:1 de 20 minutos conmigo** para practicar pronunciación o resolver dudas.
> Reenvíale esto: academiaseul.com/nivel-1 — y dime su nombre por aquí para anotar la sesión 🐯

### (f) Micro-colaboraciones · 10 cuentas K-pop/K-drama LATAM (2 por país: Chile, Colombia, México, Argentina, Perú; 5–30 k seguidores)
DM 5 el lun 21 y 5 el mar 22 a las 21:00; segunda tanda jue 24 solo si respondieron menos de 3. Sin seguimiento salvo respuesta. **Sorteo cierra jue 1, ganador/a anunciado vie 2**, cupo en Básico 1. Diseño del sorteo: `01_dangun_tigre.png` o captura de Dubu. Reglamento: "Instagram no patrocina ni administra este sorteo".
> ¡Hola! Soy Jay (@jaychingu.oficial), nací en Seúl, vivo en Chile y tengo una academia de coreano online, Academia Seúl (@academiaseul).
> Te propongo algo para tu comunidad, sin costo para ti: **sorteo de 1 cupo gratis (US$150) en nuestro curso Básico 1 de octubre** (8 semanas en vivo por Zoom, con profes coreanas).
> Tú solo publicas una historia con el sorteo; yo te mando el diseño listo (azul, con nuestro tigre) y el texto. Mecánica: seguir a las dos cuentas y comentar. Cierra el jueves 1 de octubre, ganador/a el viernes 2.
> Además, tu comunidad puede jugar gratis Dubu, nuestro juego del Hangul: academiaseul.com/dubu
> ¿Te interesa? Te paso todo en el momento 💙 화이팅!

---

## 5 · Historias · 6 plantillas reutilizables

| # | Plantilla | Cómo se arma (celular, 2 min) | Cuándo |
|---|---|---|---|
| 1 | **Encuesta "¿Cuál es tu caso?"** | Fondo azul · sticker de encuesta con 4 opciones: Nunca estudié / Ya leo hangul / Quiero hablar / Es para mi hijo · cada voto se responde por DM a las 21:00 con la respuesta guardada (4b) | dom 20 · repetir mar 29 |
| 2 | **"¿Desde dónde nos ves?" (hora en tu país)** | Captura de `HorarioSemanal` con el selector de país · sticker de pregunta · a las 21:00 responder a cada uno con su hora + link `/nivel-1` | lun 21 · lun 28 |
| 3 | **Prueba social honesta** | Captura de la cita textual de la web (Isidora, Nedielka, Carolina, Catalina, Paulina, Mariam, Valentina) o "ya somos X de Y países" con el número real de la hoja · sticker link `/nivel-1` | mar 22 · dom 27 · vie 2 |
| 4 | **Cuenta regresiva** | Sticker de cuenta regresiva: "En vivo sáb 26 20:00" / "Cierra la matrícula dom 4 23:59" · captura de la escalera de fondo | jue 24, vie 25 · jue 1 → dom 4 |
| 5 | **Pregunta "¿Qué te frena?"** | Sticker de pregunta · fondo con el precio oficial · cada respuesta = un DM personal (no público) | mié 30 · jue 1 |
| 6 | **Repost del reto** | Compartir la historia del participante (mención + #LeoCoreanoEn7Días) + texto "día X ✅" + link `/lector-hangul` o `/dubu` según el día | mié 23 → mar 29, cada día |

Regla: 2 historias/día (sáb 26: 3; dom 4: 5). Toda historia con link lleva **sticker de link** (los links en captions no son clicables). Los artículos del blog van con su URL solo en la historia del día del post: `/blog/por-que-en-corea-no-existe-el-piso-4` (vie 25) · `/blog/sopa-de-algas-antes-de-un-examen-supersticion-coreana` (mar 29) · `/blog/dangun-por-que-corea-nacio-de-una-osa` (sáb 3).

---

## 6 · Rutina diaria de 45 min (lun–vie, 20:30–21:15)

| min | Qué | Regla |
|---|---|---|
| 0–10 | **Publicar** la pieza del día (ya grabada o diseño listo): portada, caption, hashtags base + 3, ubicación | Nada se edita a esta hora |
| 10–20 | **2 historias**: la programada del calendario + 1 repost/respuesta | Stickers de link siempre |
| 20–40 | **DM y WhatsApp**: responder stickers y encuestas en bloque, DMs, WhatsApp 1:1 del día. Cada respuesta termina con una pregunta y un link | Sin difusiones |
| 40–45 | **Hoja de números**: fila del día | Lo que no cupo hoy se cae, no se acumula |

Fines de semana: dom 27 = grabación 2 (90 min) + 45 min; sáb 26 = vivo (75 min total); dom 4 = 45 min repartidos.

---

## 7 · Números · qué mirar cada noche y metas para el 4 de octubre

**Hoja de números (Google Sheet, una pestaña, 5 min/noche):** fecha · inscritos pagados por clase (6 columnas) · inscritos parciales (formulario sin pago) · leads abiertos (DM/WhatsApp con pregunta) · país · fuente (IG / email / WhatsApp / Dubu / colab).

**Cada noche (en este orden):** 1) Formspree "💰 PAGO" + PayPal + Mercado Pago → pagados por clase · 2) Brevo → aperturas y clics del envío del día · 3) Instagram → alcance del reel, respuestas a stickers, visitas a `/dubu` y `/lector-hangul` (analytics del sitio) · 4) Con eso decides qué clase empujar mañana en la historia ②.

| Métrica | Meta al dom 4 | Señal para actuar |
|---|---|---|
| Alumnos pagados | **40** (mínimo 4 por clase para abrir: 24) | Una clase con < 3 el lun 28 → toda la semana empuja esa clase |
| Apertura L1 / L1-b | ≥ 40 % / ≥ 25 % | < 20 % L1-b → cambiar asunto de L4 |
| Clics a `/nivel-1` desde email | ≥ 15 % de aperturas | — |
| Leads abiertos convertidos | ≥ 30 % | Lead sin respuesta 48 h → 1 mensaje, no más |
| Participantes del reto que completan | ≥ 5 | < 3 el vie 25 → historia diaria pidiendo "me apunto" |
| Alcance del vivo | ≥ 50 espectadores en vivo, replay ≥ 200 | — |
| Jugadores de Dubu (visitas a `/dubu`) | ≥ 300 en 14 días | — |
| Bajas de email | < 2 % por envío | > 3 % → no enviar L5-b |

Decisión del lun 28 (con la hoja): las clases con < 3 pagados se anuncian igual pero R4 y L4 empujan ahí; el jueves 1 se decide qué se abre y qué se fusiona (Básico 1 martes/jueves) y se avisa a los inscritos por WhatsApp.

---

## 8 · Qué necesito de Claude (tareas técnicas)

**Ya hecho (no repetir):** Dubu enlazado en la home y en `/recursos` (commit 48dba213) · 3 diseños exportados a PNG en `Campana_Assets/instagram/01_dangun_tigre.png`, `02_sopa_de_algas_topik.png`, `03_piso_f_numeros.png` · links de PayPal US$150 / US$75 en `lib/nivel1.ts` · página `/faq` existente.

| # | Tarea | Para cuándo |
|---|---|---|
| 1 | Editar `Brevo/Email_Lanzamiento_Brevo.html`: añadir "Según lo que me contaste, tu curso es {{ contact.CURSO_SUGERIDO \| default: "Básico 1 (A1.1)" }}", cambiar `utm_campaign=oct26` → `l4`, pegar el P.D. y el bloque de cupos `[N]` + 3 testimonios (cuerpo L4). Guardar como `Brevo/L4_Ultima_Semana.html`. | dom 27 |
| 2 | Generar HTML de texto simple (misma cabecera y pie) para L1, L1-b, L2, L3, L5, L5-b, O1 y N1 en `Brevo/` con UTMs correctos, para pegar en Brevo. | hoy dom 20 (L1, L1-b) · resto jue 24 |
| 3 | Añadir `ORIGEN`, `PRIORIDAD`, `WHATSAPP` como atributos en la guía de importación y marcar en el CSV los 2 `alumno_julio` para la variante 3. | hoy |
| 4 | Preparar el commit de cierre **sin push**: `COHORTE_ABIERTA = false` y `PROXIMA_COHORTE_LABEL = "Enero 2027"` en `lib/nivel1.ts`; verificar que `/nivel-1` muestra la lista de espera en `npm run build`. Push el lun 5 a las 9:00. | dom 27 |
| 5 | Plantilla de la **hoja de números** (CSV o Google Sheet con las columnas de la sección 7 y fórmulas de total por clase). | lun 21 |
| 6 | Tabla de **cupos reales** por clase a partir de Formspree + PayPal + Mercado Pago (script `scratchpad` que lee el CSV de Formspree) para R4 y L4. | dom 27 |
| 7 | Lista de 30 nombres hispanos en hangul (PDF de una página) para el vivo del sáb 26. | vie 25 |
| 8 | 5 capturas del `/faq` (1080×1350, sin rojo) para el carrusel del jue 1. | mié 30 |
| 9 | Diseño cuadrado del **sorteo con cuentas K-pop** (variante del Dangún con "Sorteo · 1 cupo gratis · Básico 1") y del **premio del reto**. | mar 22 |
| 10 | Guía DNS: qué registros DKIM/DMARC pide Brevo y dónde se pegan en Netlify DNS o el registrador, paso a paso. | hoy |
| 11 | Configurar en Brevo (guía) el recordatorio automático de clase 8:00 por lista de curso y crear las 6 listas por clase para O1 y los recordatorios. | jue 1 |
| 12 | Crear los 6 grupos de WhatsApp: nombre + descripción listos para pegar ("Academia Seúl · Básico 1 martes · octubre 2026"). | jue 1 |
| 13 | Pendientes de la auditoría del 15 sept que afectan la campaña: borrar `/taller` (sigue en `app/taller`), og-image y favicon azules, hero comprimido. | antes del lun 28 |
| 14 | Después del 4 de octubre: informe de la campaña (aperturas por envío, clics por UTM, alumnos por fuente) y lista `05 Espera enero 2027`. | mar 6 |

화이팅. Hoy: Brevo, WhatsApp, Guiran y Abby, y a grabar tres reels. Mañana a las 10:00 sale el primer correo y desde ahí son 45 minutos al día.
