# 호랑이의 모험 · La aventura del Tigre — documento de CTO

Fecha: 2 de noviembre de 2026. Estado: **prototipo jugable del capítulo 1** en `public/aventura/` (URL `/aventura`), **subido oculto el 3 nov 2026** (academiaseul.com/aventura funciona para quien tenga el link), sin enlazar, fuera del sitemap y con `noindex` hasta que Jay apruebe ponerlo en el menú.

## 1. La decisión de tecnología: web, no Unity

Jay mandó el curso de Udemy *Learn how to create a 2D RPG game with Unity* (19,5 h, C#). Lo leímos como lo que es: el temario de los sistemas que tiene un RPG. Todos esos sistemas están en el prototipo, pero **hechos para la web**, no en Unity.

| | Unity (C#) | Web (HTML5 Canvas + JS), lo elegido |
|---|---|---|
| Dónde llega el alumno | Desde un reel, en el celular | Igual, pero abre al instante con un link |
| Peso al abrir | Un build WebGL pesa varios MB antes de la primera palabra coreana, y la fuente con Hangul suma más | ~120 KB de código + los clips que se usan |
| Hangul | Hay que armar una fuente con los 11.172 bloques (o cargarla dinámica) | El navegador ya escribe Hangul nítido |
| Audio | Hay que importar los clips | Usa tal cual los 1.990 clips SunHi de `/audio/kr/` |
| Despliegue | Build aparte; tienda de apps (Google US$25 una vez, Apple US$99 al año) | `git push` y Vercel lo publica |
| Quién lo mantiene | Un programador de C# | El mismo patrón de 한글 Race y Dubu: motor sin DOM + contenido en JSON |
| Probarlo | Editor de Unity | `node Juego_RPG/prueba_motor.js` y el navegador |

**El curso: no hace falta comprarlo para este juego.** Si Jay quiere aprender a programar juegos como hobby, está bien (CLP 11.290), pero pide C# previo.

Cómo quedan los temas del curso en nuestro motor:

| Tema del curso | En La aventura del Tigre |
|---|---|
| Scriptable Objects | `mundo.json` (objetos, enemigos, NPC, misiones, tiendas, mapas) y `preguntas.json`: se agrega contenido sin tocar código |
| Tilemaps | Mapas en texto (un carácter = una baldosa), dibujados por código en pixel art |
| IA por estados (FSM) | Los 도깨비: quieto → paseo → persigue → vuelve |
| Combate | Duelo por turnos: cada golpe es una pregunta de coreano |
| Stats y subir de nivel | 기운 (energía), ataque, XP y nivel |
| Ítems, inventario y botín | Mochila con objetos y el 도감 de letras; los 도깨비 sueltan letras y 원 |
| Diálogos | Diálogos con opciones en coreano, audio y subtítulo en español |
| Misiones | 6 misiones del capítulo 1, con registro |
| Tienda | El 편의점: se compra diciendo 주세요 |
| Guardar y cargar | Guardado automático en el navegador, sin cuenta |

## 2. El juego

**Idea:** los 도깨비 se robaron las letras de los letreros de Gwanghwamun y nadie puede leer el barrio. El tigre del sello (con bufanda azul #4236F6) recupera las letras ganando duelos de coreano y, con ellas, **arma de nuevo cada letrero sílaba por sílaba**. El mundo se vuelve legible a medida que el jugador aprende a leer: esa es la mecánica central.

**Ciclo:** explorar → hablar → duelo con un 도깨비 (preguntas) → botín (letras + 원) → armar un letrero (construir la sílaba con las letras) → misión cumplida → subir de nivel.

**Reglas pedagógicas (heredadas de Tigre 100):**
- Las preguntas de los duelos salen de `Juego_100/borrador/t00-10.json` (niveles 1–10, revisión nativa adversarial del 8 oct; falta la revisión de Jay). El celular no inventa coreano.
- Equivocarse enseña: el 도깨비 golpea, aparece la explicación y se vuelve a intentar la misma pregunta.
- Al acertar suena la respuesta.
- Romanización solo como pista (objeto 붓, o el ajuste).
- Sin rojo ni rosado: el daño al jugador va en dorado #E8B84B, el acierto en azul.

**Capítulo 1 · Gwanghwamun (Básico 1, semanas 1–2):**

| Misión | Qué enseña | Niveles de Tigre 100 |
|---|---|---|
| 1 · 안녕하세요, 서울 | Moverse, hablar; saludo; la ㅇ muda | 0–1 |
| 2 · Las vocales robadas | 도깨비 verdes; letreros 우유 y 오이 | 1–2 |
| 3 · Un recado para la abuela | La tienda: 주세요, 감사합니다, 안녕히 계세요 / 가세요 | 9 |
| 4 · Consonantes rebeldes | 도깨비 azules; letreros 나무, 모자 y 고기 | 3–5 |
| 5 · Aire o apretón | 도깨비 morados; letreros 커피 y 빵 (primer 받침) | 6–8 |
| 6 · El jefe de Gwanghwamun | Jefe con 10 preguntas del nivel 10; letrero 한글 | 10 |

Personajes: los de las clases de Básico 2 (하나, 도윤, 서아, 발렌티나, 마테오, 콩이) y una 할머니 del puesto de verduras.

## 3. Arquitectura

Sigue el principio de Tigre 100 (`Juego_100/00_Plan_de_Accion.md` §7): app estática, sin build, motor sin DOM, contenido en JSON, prueba en Node.

```
public/aventura/
  index.html      pantalla: HUD, diálogos, duelo, mochila, tienda, letreros (HTML sobre el canvas)
  juego.js        bucle, cámara, dibujo, controles (teclado, toque, tocar para caminar)
  sprites.js      pixel art en texto (tigre, personas, 콩이, 도깨비) y baldosas dibujadas por código
  motor.js        lógica pura (UMD): stats, combate, inventario, tienda, misiones, letreros, guardado, FSM
  mundo.json      el contenido del mundo
  preguntas.json  generado desde Tigre 100 por Juego_RPG/construir_preguntas.js
Juego_RPG/
  00_Documento_CTO.md   este documento
  construir_preguntas.js
  prueba_motor.js       node Juego_RPG/prueba_motor.js
```

- Audio: clip de `/audio/kr/<hex-utf8>.mp3` → voz del dispositivo (ko-KR). Sonidos de juego con WebAudio, sin archivos.
- Guardado: `localStorage['as-aventura-v1']`, con try/catch.
- Tema: lee `as-theme` (día/noche) para la interfaz; el mundo en pixel art no cambia.
- Controles: flechas o WASD + Enter/Espacio; en el celular, cruz táctil y **tocar para caminar** (ruta BFS).

## 4. Hoja de ruta (cada capítulo = un tramo de Tigre 100)

| Fase | Qué | Cuándo |
|---|---|---|
| F0 | Prototipo del capítulo 1 (este) | 2 nov 2026 |
| F1 | Jay juega y decide: nombre, si es el «modo aventura» de Tigre 100, URL, si se enlaza en el menú | cuando Jay pueda; **después del cierre de matrícula del lun 9 nov** |
| F2 | Revisión nativa de los diálogos (Jay) + clips SunHi de las frases nuevas + prueba con 3–5 alumnos de Básico 1 | nov–dic |
| F3 | Capítulo 2 · Bukchon (niveles 11–20: 예요/이에요, presentarse) | enero 2027 |
| F4 | Capítulos 3+ con la llave de alumno (niveles 21+), cuando el repo sea privado | 2027 |

**Recomendación de CTO:** que este RPG sea la cara de Tigre 100 (el plan ya decía «el tigre del sello recorre Seúl de Incheon a Namsan»), en vez de construir dos juegos. Los 101 niveles son el contenido; el RPG es el viaje.

## 5. Qué mide si funciona

- % de quienes abren `/aventura` que terminan la misión 2 (llegan a armar su primer letrero).
- % de aciertos al primer intento por pregunta (para encontrar preguntas mal hechas).
- Clics al link de Básico 1 en la pantalla de fin de capítulo.
(Hoy el juego no manda datos a ningún lado: medirlo requiere decidir una herramienta, y desde el 1 dic de 2026 rige la Ley 21.719.)

## 6. Riesgos

- **Prioridad del negocio:** la matrícula de Básico 1 cierra el lun 9 nov y al 2 nov no se había publicado nada de la campaña. El juego no llena esa clase esta semana; un reel de Jay sí. El juego sirve como pieza para un reel («hice un videojuego para aprender coreano») y como imán desde enero.
- **Coreano nuevo sin revisar:** los diálogos de los NPC son nuevos. Pasaron una revisión nativa adversarial (ver §7), pero Jay tiene la última palabra.
- **Audio:** las frases nuevas de los diálogos no tienen clip todavía y usan la voz del dispositivo (en Windows sin voz coreana, no suenan). Las cubre el **bloque 9** del guion de voz de Jay (40 ítems, 7 min; `Juego_Dubu/voz/Guion_Voz_Jay_2nov2026.md`). El juego ya prefiere la voz de Jay cuando el clip existe: lee `public/audio/kr-jay/indice.json` (lo arma `node Juego_RPG/voz/indice_kr_jay.js`) y, si falta un clip, usa SunHi.
- **Repo público:** todo lo de `public/aventura/` es visible en GitHub. No hay nada privado ahí.

## 7. Revisión nativa

Ver `Juego_RPG/01_Revision_Nativa.md`.
