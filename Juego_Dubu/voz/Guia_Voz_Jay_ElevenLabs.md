# Guía · La voz de Jay en Dubu (y en el Lector) con ElevenLabs

Objetivo: que las sílabas y palabras del juego suenen con la voz de Jay en vez de la voz sintética actual (Azure · SunHi). Dos caminos; el A es el mejor para Dubu, el B escala a todo el sitio.

| | A · Grabar directo | B · Clonar con ElevenLabs |
|---|---|---|
| Qué se necesita | 20 minutos de Jay leyendo el guion | 2–3 min de audio limpio + cuenta ElevenLabs |
| Clips | los 97 de Dubu (o los 563 del Lector, ≈ 1 h) | ilimitados: cualquier palabra futura |
| Calidad | la mejor: voz real, nativa | muy buena; hay que revisar aspiradas/tensas |
| Costo | 0 | Starter ≈ US$5/mes (clon instantáneo) · Creator ≈ US$22/mes (clon profesional) — confirmar en elevenlabs.io/pricing |
| Recomendación | **Hacerlo ya para Dubu** | Hacerlo si queremos voz de Jay en todo (Lector, nuevas palabras, tarjetas, videos) |

Los dos caminos terminan igual: una carpeta `public/audio/kr-jay/` con archivos `<hex-utf8>.mp3` (mismo esquema que `public/audio/kr/`). Dubu ya tiene el interruptor **Ajustes → Voz de Jay**: si el clip existe en `kr-jay` lo usa; si no, cae a SunHi y luego al TTS del dispositivo. Así se puede publicar poco a poco.

---

## Camino A · Grabar directo (recomendado para Dubu)

1. **Dónde**: pieza chica con cortinas/ropa (sin eco), sin ventilador ni calle. Celular a 15–20 cm de la boca, en modo avión, o el micrófono del computador si es bueno. Formato: WAV o M4A/MP3 de máxima calidad.
2. **Cómo**: abre `guion_grabacion.txt` (está en esta carpeta). Lee cada ítem con **1 segundo de silencio** entre uno y otro, tono neutro de profesor, ni cantado ni apurado; las sílabas sueltas se leen como en clase (가 = "ga", no "기역-아"). Si te equivocas, repite el ítem después de una pausa (yo me quedo con la última toma).
3. **Marca el bloque**: antes de empezar cada bloque di su nombre ("bloque vocales", "bloque batchim") para que sea fácil cortar.
4. **Envíame** el archivo largo (o varios): yo lo corto por silencios, normalizo el volumen, lo convierto a MP3 44.1 kHz 64 kbps y lo dejo en `public/audio/kr-jay/` con el nombre hex de cada texto. Verifico que los 97 estén y activo la voz en el juego.
5. **Control de calidad**: escuchamos en el juego los pares 가/카/까, 어/오, 으/우, 안/앙. Si alguno no se distingue bien, se regraba solo ese.

Tiempo estimado: 15–20 min de grabación + 1 h de corte.

---

## Camino B · Clon de voz en ElevenLabs

### 1. Cuenta y plan
- Crea la cuenta en elevenlabs.io con hola.academiaseul@gmail.com. El plan gratuito **no permite clonar ni uso comercial**; el **Starter** incluye *Instant Voice Cloning* y uso comercial; el **Creator** añade *Professional Voice Cloning* (más fiel, requiere 30 min–3 h de audio y unas horas de entrenamiento). Para Dubu basta el instantáneo; si te gusta, subimos a profesional.
- Consentimiento: clonas **tu propia voz**, así que no hay problema legal. ElevenLabs te pedirá aceptar que tienes derecho sobre la voz (y en el profesional, leer un texto de verificación).

### 2. Graba las muestras para el clon (2–3 minutos)
- Mismo ambiente que el camino A. **Graba las muestras en coreano**, porque el clon imita el acento y la prosodia del idioma de las muestras: preséntate, cuenta qué es Academia Seúl, lee un párrafo tranquilo y después lee despacio 아 어 오 우 으 이 · 가 나 다 라 마 바 사 아 자 차 카 타 파 하 · 까 따 빠 싸 짜 · 강 안 암 압 알. Si también quieres usar la voz en español, graba otro archivo de 1–2 min en español y súbelo como segunda muestra (o crea dos voces: "Jay coreano" y "Jay español").
- Sin música, sin otras voces, sin "eh…" largos. 1–3 archivos, cada uno de 1–2 min, hasta 10 MB.

### 3. Crea el clon
Opción web: **Voices → Add a new voice → Instant Voice Clone**, sube los archivos, nombre "Jay Chingu (ko)", etiqueta idioma Korean, acepta el consentimiento → copia el **Voice ID** (Voices → tu voz → ID).
Opción por consola (el script de esta carpeta lo hace por ti):

```bash
node Juego_Dubu/voz/generate_voz.js clone "Jay Chingu (ko)" "C:\ruta\muestra1.m4a" "C:\ruta\muestra2.m4a"
```

La API key se guarda **fuera del repo** en `C:\Users\Chingu\.elevenlabs_key` (un archivo con la clave en una sola línea; en elevenlabs.io → perfil → API keys). Nunca la pegues en el chat ni en un commit.

### 4. Prueba antes de generar todo

```bash
node Juego_Dubu/voz/generate_voz.js probar <voiceId>
```

Genera 8 clips de prueba en `Juego_Dubu/voz/pruebas/` (가 카 까 · 어 오 · 안 앙 · 김치). Escúchalos: si las aspiradas/tensas suenan iguales o el acento no es natural, sube `stability` en el script (0.6 → 0.75), prueba el modelo `eleven_v3`, o pasa al clon profesional. Si suena bien, sigue.

### 5. Genera y publica

```bash
node Juego_Dubu/voz/generate_voz.js generate <voiceId> --dubu     # los 97 clips de Dubu (≈ 300 créditos)
node Juego_Dubu/voz/generate_voz.js generate <voiceId> --lector   # los 563 del Lector (≈ 1.800 créditos)
node Juego_Dubu/voz/generate_voz.js deploy                       # copia a public/audio/kr-jay/
```

Es reanudable (si se corta, vuelve a correr y sigue donde iba). Después: `git add public/audio/kr-jay && git commit && git push`, y en el juego activas **Ajustes → Voz de Jay**. Para el Lector, el mismo interruptor se puede agregar cuando la voz esté aprobada.

### 6. Costos reales
1 crédito ≈ 1 carácter. Dubu completo ≈ 300 créditos; el Lector ≈ 1.800; un mes Starter trae 30.000. Es decir: **una vez generado, no vuelve a costar** (los clips quedan estáticos en el sitio).

---

## Qué NO hacer
- No usar la voz clonada para decir cosas que Jay no diría (la voz es marca personal): solo sílabas, palabras del curso y frases del juego aprobadas.
- No subir la clave al repo ni al chat; no dejar el clon en una cuenta compartida sin 2FA.
- No mezclar dos voces en la misma pantalla (una sílaba con SunHi y la siguiente con Jay): el interruptor cambia la voz completa y cae a SunHi solo cuando falta un clip.
