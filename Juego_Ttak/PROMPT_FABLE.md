# Build prompt · **Ttak (딱)** — the Hangul workshop puzzle for Academia Seúl

## 1. Role and vision
You are a senior game/web engineer and Korean-pedagogy nerd building a free browser puzzle for Academia Seúl (Spanish-speaking beginners, "Método Chingu"). **Ttak (딱)** is a one-file puzzle where you do not pick letters, you **make** them: from 9 base forms (ㄱ ㄴ ㅁ ㅅ ㅇ · ㄹ · ㅣ ㅡ ●) you add a stroke, twin a consonant, or place the sky-dot to build syllable blocks that **speak with a native voice** and mean something in Spanish. A third of the levels are word ladders of real words (문→물→불: puerta→agua→fuego) where each step is one rule of the alphabet; most of the rest are listening puzzles where the goal is heard, not shown. The alphabet's logic is the mechanic; the ear is the judge. Ship it complete and polished in one pass.

## 2. Non-negotiables
- **One file**: `public/ttak/index.html` (HTML+CSS+JS, vanilla, no build). Served by Next/Netlify as-is (Jay adds the `/ttak` rewrite like `/lector-hangul`).
- **Mobile-first 375 px**, single column, no horizontal scroll, no page scroll during a level; desktop = same column centered at 480 px.
- **Theme**: read `localStorage["as-theme"]` (`"dark"|"light"`, fallback `prefers-color-scheme`), set `document.documentElement.dataset.theme`, moon/sun toggle writes it back. Exactly like the Lector.
- **Color tokens** (blue = action, correct, consonants; gold = tokens, dots, honey, hints, errors; gray = neutral/illegal). Buttons keep `--azul` with white text; blue **text/labels** in dark use `--azul-txt`. **Never red or orange anywhere** — not even emoji (no 🔥; inline gold SVG instead).
```css
:root{--bg:#F7F7FB;--card:#FFFFFF;--txt:#14142B;--muted:#5C6280;--border:#E3E5EF;--azul:#3D2EE8;--azul-txt:#3D2EE8;--oro:#E8B84B;--gris:#9AA0B4}
[data-theme=dark]{--bg:#0a0a0f;--card:#15152a;--txt:#F1F1F8;--muted:#A6ABC2;--border:#262645;--azul:#3D2EE8;--azul-txt:#9C97FF;--oro:#E8B84B;--gris:#6E7390}
```
- **Fonts**: Noto Sans KR from Google Fonts (only external resource allowed) with system fallback.
- **Copy**: Spanish, *tú*, warm "chingu" tone, neutral for LATAM and Spain (no "pararse"), no walls of text. In-game text max 6 words per bubble.
- **Scope for v1**: map = 6 labeled circles on a dotted line (no scenery); tiger seal = gold circle with a 호 glyph; Horang = one inline SVG face whose ears/eyebrows change via CSS classes (normal, escuchando, contento, hmm). Keyboard: Tab/Enter/Backspace only. No drag.
- **Audio**: copy this exactly (from the Lector) and call `speak(text)` everywhere:

```js
const AUDIO_BASE="/audio/kr/", audioCache={}, audioMissing={}; let currentAudio=null, koVoice=null;
function pickVoice(){try{koVoice=speechSynthesis.getVoices().find(v=>(v.lang||"").toLowerCase().startsWith("ko"))||null;}catch(e){}}
if("speechSynthesis" in window){pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice;}catch(e){}}
function hexOf(t){try{return Array.from(new TextEncoder().encode(t)).map(b=>b.toString(16).padStart(2,"0")).join("");}catch(e){return null;}}
function ttsSpeak(t){try{if(!("speechSynthesis" in window))return;const u=new SpeechSynthesisUtterance(t);u.lang="ko-KR";if(koVoice)u.voice=koVoice;u.rate=0.82;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
function speak(t){let src=null;if(!audioMissing[t]){const h=hexOf(t);if(h)src=AUDIO_BASE+h+".mp3";}
  if(src){try{if(currentAudio)currentAudio.pause();let a=audioCache[t];if(!a){a=new Audio(src);audioCache[t]=a;}currentAudio=a;a.currentTime=0;
    const p=a.play();if(p&&p.catch)p.catch(err=>{if(err&&err.name==="NotAllowedError")return;audioMissing[t]=1;delete audioCache[t];ttsSpeak(t);});return;}catch(e){}}
  ttsSpeak(t);}
```
  Add `speakQueue([...], gapMs=350)`: sequential — wait for the Audio `ended` (or `utterance.onend` for TTS, 1500 ms safety timeout), then `gapMs`, then next; a new `speak`/`speakQueue` cancels the pending queue. **Never send a lone jamo to `speak`** (TTS reads its name, "기역"). A letter's sound = its reference syllable, which has a clip: consonant → C+ㅏ (ㄱ→가 … ㅎ→하, ㄲ→까 ㄸ→따 ㅃ→빠 ㅆ→싸 ㅉ→짜); vowel → ㅇ+V (ㅏ→아 … ㅢ→의); consonant in the batchim slot → `compose('ㅇ','ㅏ', NEUTRAL[c]||c)` = 악 안 앋 알 암 압 앙 (ㅅ family → 앋, never 앗). ㅇ chip is special-cased: aria-label "ㅇ, muda al inicio; abajo suena ng", long-press plays 아 then 앙 via `speakQueue`. `speak` already falls back to TTS when a clip is missing: show the tiny "voz del dispositivo" label, never silence, never a chime.
- **Splash**: big blue button **"Toca para escuchar"**. On tap: create the AudioContext and `resume()` it, play a 30 ms WebAudio click, then `speak('아')`. Preload = `new Audio()` for the goal word, each goal syllable, each ladder state, each reconocer candidate and each tray chip's reference syllable of the current level; preload the next level on victory.
- **Progress**: `localStorage["ttak-progreso"]` = `{niveles:{id:{gotas,movs}}, oido:{par:{ok,total}}, roman:bool, tutos:{punto:true,…}, saltado:bool}`. World n+1 unlocks when all 5 levels of world n have an entry. "Ya sé leer" sets `saltado=true` and unlocks worlds 1–3 without honey. Álbum = union of goals/ladders of levels in `niveles` (a cadena adds inicio, via, fin). No accounts, no network except clips (playable with clips failing → TTS).

## 3. The game
### State
`{ mundo, nivel, casa:[bloque×1–3], bandeja:[chip], fichas:{trazo,gemela,punto}, sel:{tipo:'chip'|'slot'|null,…}, historial:[], fallos }`. A `bloque` = `{ini:jamo|null, voc:{barra:'ㅣ'|'ㅡ'|null, lado:'d'|'i'|'a'|'b'|null, puntos:0..2, cola:bool, comp:jamo|null}, fin:jamo|null}` and renders as the composed Unicode syllable (or partial jamo in slots).

### Actions (tap-tap, 44 px targets)
1. **Colocar**: tap a tray chip (plays its reference syllable) → tap a slot (inicial / vocal / batchim). Wrong slot type bounces (wood "tok" via WebAudio, gray shake ×2, ≤6-word gold label: "ㅏ va a la derecha" / "ㅗ va abajo"). **Occupied slot**: (a) vowel onto vowel slot → if `(placed, incoming)` is a key of `COMBINE` → combine (both chips consumed into the slot, no ● consumed; undo splits them back); any other vowel pair → swap (old chip returns to tray). (b) consonant onto consonant slot → swap. Batchim slot accepts only `FIN` members: ㄸ ㅃ ㅉ bounce with the gold label "ㄸ no baja al piso". Tapping a placed chip selects it; tapping the tray while it is selected returns it (removing a vowel returns its batchim too); tapping another compatible slot moves it.
2. **✦ Trazo** (pill when a consonant in any slot — initial or batchim — is selected; consumes 1 ✦): ㄱ→ㅋ · ㄴ→ㄷ→ㅌ · ㅁ→ㅂ→ㅍ · ㅅ→ㅈ→ㅊ · ㅇ→ㅎ. ㄹ has no family (pill disabled, Horang shakes head). **Copy**: first step "+fuerte" (ㄷ ㅂ ㅈ are plain stops, not aspirated), second step "+aire" (ㅋ ㅌ ㅍ ㅊ ㅎ). Never say "cada trazo = aire". Gold stroke overlay fades in 100 ms; a small wind icon puffs only on "+aire".
3. **⧉ Gemela** (consumes 1 ⧉ and an identical chip from the tray; initial or batchim): ㄱ→ㄲ ㄷ→ㄸ ㅂ→ㅃ ㅅ→ㅆ ㅈ→ㅉ only; in the batchim slot only ㄲ/ㅆ (pill disabled on a final ㄷ ㅂ ㅈ). The twin jumps in, block squashes like a spring. No twin in tray → disabled.
4. **● Punto**: with ㅣ or ㅡ selected (in a slot **or still in the tray** — vowels can be forged before placing, which is how ㅏ/ㅓ get dropped onto ㅗ/ㅜ for ㅘ/ㅝ), pads render as an overlay popover above the house (2 pads of 56×44 px) anchored to the selected chip; tap outside closes it. Pads: on ㅣ → left/right (ㅏ/ㅓ); on ㅡ → up/down (ㅗ/ㅜ); on ㅏ/ㅓ/ㅗ/ㅜ → only the pad on the side that already has a dot (second dot → ㅑ ㅕ ㅛ ㅠ); on ㅑㅕㅛㅠ, ㅐㅔㅒㅖ and wraps → no pads (● pill disabled). Each pad tap consumes 1 ●; undo refunds it. Batchim is unaffected by vowel changes. `COMBINE = {ㅏ+ㅣ:ㅐ, ㅓ+ㅣ:ㅔ, ㅑ+ㅣ:ㅒ, ㅕ+ㅣ:ㅖ, ㅗ+ㅏ:ㅘ, ㅗ+ㅐ:ㅙ, ㅗ+ㅣ:ㅚ, ㅜ+ㅓ:ㅝ, ㅜ+ㅔ:ㅞ, ㅜ+ㅣ:ㅟ, ㅡ+ㅣ:ㅢ}` (key = placed+incoming; wraps re-render as "envolvente"). ㅗ+ㅓ etc. is not a key → swap.
5. **⟲ Girar** (vowel selected): swap bar keeping polarity: ㅏ↔ㅗ, ㅓ↔ㅜ, ㅑ↔ㅛ, ㅕ↔ㅠ. **⇄ Lado** (pill when a vowel with dots is selected) = flip side: ㅏ↔ㅓ, ㅗ↔ㅜ, ㅐ↔ㅔ; tapping the dot itself does the same (44 px invisible hit area). Both are free (no token) but count as 1 move.
6. **Deshacer** (↶) unlimited; hold 1.5 s = reiniciar. No redo.
- **Verb debut**: a pill is hidden until its debut level (punto 1-1, Lado 1-4, piso 2-2, trazo 3-1, gemela 4-1, girar 5-1); from then on always shown (outlined when the counter is 0).
- **Counting**: `historial` stores full snapshots `{casa, bandeja, fichas}`. Undo pops one (tokens and chips come back); reset = snapshot 0. `movs` = `historial.length−1` at win (undone moves do not count; girar/Lado count 1). In cadena, `pasos` = number of **counted steps** = actions whose resulting house is a `DICC` word with a clip; a non-DICC state is shown translucent gray ("eso se escribe, pero aún no es palabra"), is NOT counted, and must be undone or built through.

### Resolution and audio model
- After **every** action each affected block speaks its current syllable (`speak(compose(...))`, TTS if no clip); blocks without an initial consonant are silent ("necesita ㅇ"); a block with only a consonant speaks its reference syllable.
- **forja**: goal shown (Hangul + gloss); win check after every action, no button. **oido**: goal hidden (big speaker + gloss); silhouette = N empty 96×96 dotted-outline blocks (N = goal length), slots appear as the player builds, exactly as in forja — nothing about vowel geometry or batchim is shown; blue **"Comprobar"** button (44 px, right of the verb bar) enabled when every block has initial+vowel; each press = one decision for the miss counter and the metric. **cadena**: house pre-filled with a real word; the **ladder** records DICC states only (gray states allowed, not recorded). Win when house = `fin` AND — if `via` is given — ladder = `[inicio, ...via, fin]`; otherwise when `ladder.length−1 === pasos` and last = `fin`. Ladder 문→분(gray)→불 is length 2 → no win; Horang "Falta un peldaño.", Eco plays `fin` vs current. **reconocer**: 2–3 built blocks shown, one plays; tap the one you heard; 4–5 rounds as listed; the goal plays on entry and on each new round.
- **Win**: house = goal → block "seals" (hop + gold glow, WebAudio "ttak" click), `speak(word)`, victory card slides up: word, gloss, speaker, romanization (`rr` from DICC; small, gray, worlds 1–2 only or if `roman`; tooltip "la romanización engaña: eo ≈ ㅓ, eu ≈ ㅡ"), honey drops. **par** (forja/oido) = Σ per block: 1 per chip placed (initial, vowel, batchim, combine-drop) + 1 per ● + 1 per ✦ + 1 per ⧉ (우유 = 7, 커피 = 8, 사과 = 8). Drops: forja/oido 3 if `movs ≤ par`, 2 if `≤ par+3`, else 1; reconocer 3 with 0 misses, 2 with 1, else 1; cadena 3 if `movs === pasos`, 2 if `≤ pasos+2`, else 1. Cadena replays the ladder with 350 ms gaps.
- **No losing, no timer.** **Auto-melt** fires only when ALL of: tray has no chips, every counter is 0, no free verb (girar/Lado/undo) can change the house, and house ≠ goal. It undoes exactly one action (Horang tilts head) and waits; it never fires twice without a player action in between.
- **ECO on wrong Comprobar (oido), wrong tap (reconocer) or wrong `fin` (cadena)**: `speakQueue([goal, yours], 600)`, only the differing zone (inicial / vocal / batchim) blinks gold, Horang "hmm". `wordOnly` words: `speak(word)` then TTS of the player's word. 2nd miss: Spanish hint under the card (Lector wording where it exists): ㅏ "a de amor" · ㅓ "o abierta, boca relajada" · ㅗ "o de oso, labios redondos" · ㅡ "sonríe y di u" · ㅜ "u de uva, labios muy redondos" · "+aire = sopla" · "gemela = garganta apretada" · "ㅇ abajo suena ng, como tango". 3rd miss: reveal the Hangul 3 s, level worth 1 drop.
- **Distractors** (oido): `distract` is an explicit array of BASE chips (ㄱ ㄴ ㅁ ㅅ ㅇ ㄹ ㅣ ㅡ only) added to the tray; the engine never derives them and the sufficiency assert ignores them. Placing one is legal: the block reads back its current syllable; the goal is never played on placement (the Eco handles the contrast on Comprobar).
- **Metric**: every reconocer tap and every oido Comprobar logs `(heard, chosen)` per block; the pair is **derived from the differing jamo** by `parDe(a,b)`: ㅓ/ㅗ → `'ㅓ/ㅗ'`, ㅡ/ㅜ → `'ㅡ/ㅜ'`, ㅓ/ㅡ → `'ㅓ/ㅡ'`; initial one ✦ step apart → `'simple/aspirada'`, ⧉ apart → `'simple/tensa'`; any final contrast → `'batchim'`; anything else (incl. ㅐ/ㅔ, which is spelling) → `null` = log nothing. A level's `par` is only the header label. End-of-world screen shows "Tu oído: ㅓ/ㅗ 80 % · aspiradas 60 %" and offers "Repasar" = 4 random rounds from `PARES` for the two lowest ok/total pairs (min 2 decisions).
- Batchim chip: ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ in the final slot show "suena ㄷ"; ㅋ ㄲ → "suena ㄱ"; ㅍ → "suena ㅂ" (7 representative finals).

### Hangul engine (implement exactly)
```js
const INI=['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];            // 19
const MED=['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];   // 21
const FIN=['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']; // 28
function compose(i,m,f){const a=INI.indexOf(i),b=MED.indexOf(m),c=FIN.indexOf(f||'');
  if(a<0||b<0||c<0){if(DEV)throw new Error('compose '+i+m+f);return '';}   // never compose silently
  return String.fromCharCode(0xAC00+(a*21+b)*28+c);}
decompose=s=>{const c=s.charCodeAt(0)-0xAC00;return [INI[Math.floor(c/588)],MED[Math.floor(c%588/28)],FIN[c%28]];};
const VERT=['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅣ'];            // vowel stands RIGHT of consonant  [C|V]
const HORIZ=['ㅗ','ㅛ','ㅜ','ㅠ','ㅡ'];                            // vowel lies BELOW               [C/V]
const WRAP={'ㅘ':['ㅗ','ㅏ'],'ㅙ':['ㅗ','ㅐ'],'ㅚ':['ㅗ','ㅣ'],'ㅝ':['ㅜ','ㅓ'],'ㅞ':['ㅜ','ㅔ'],'ㅟ':['ㅜ','ㅣ'],'ㅢ':['ㅡ','ㅣ']}; // wraps
const TRAZO={'ㄱ':'ㅋ','ㄴ':'ㄷ','ㄷ':'ㅌ','ㅁ':'ㅂ','ㅂ':'ㅍ','ㅅ':'ㅈ','ㅈ':'ㅊ','ㅇ':'ㅎ'};   // step label: to ㄷㅂㅈ = "+fuerte", to ㅋㅌㅍㅊㅎ = "+aire"
const GEMELA={'ㄱ':'ㄲ','ㄷ':'ㄸ','ㅂ':'ㅃ','ㅅ':'ㅆ','ㅈ':'ㅉ'};
const YANG=['ㅏ','ㅑ','ㅗ','ㅛ','ㅐ'], YIN=['ㅓ','ㅕ','ㅜ','ㅠ','ㅔ'];  // ㅡ ㅣ neutral
const GIRAR={'ㅏ':'ㅗ','ㅗ':'ㅏ','ㅓ':'ㅜ','ㅜ':'ㅓ','ㅑ':'ㅛ','ㅛ':'ㅑ','ㅕ':'ㅠ','ㅠ':'ㅕ'};
const NEUTRAL={'ㅅ':'ㄷ','ㅆ':'ㄷ','ㅈ':'ㄷ','ㅊ':'ㄷ','ㅌ':'ㄷ','ㅎ':'ㄷ','ㅋ':'ㄱ','ㄲ':'ㄱ','ㅍ':'ㅂ'};
const PARES={'ㅓ/ㅗ':[['서','소'],['거','고'],['너','노'],['더','도'],['머','모'],['버','보']],'ㅡ/ㅜ':[['그','구'],['느','누'],['드','두'],['브','부'],['스','수']],
 'simple/aspirada':[['가','카'],['다','타'],['바','파'],['자','차']],'simple/tensa':[['가','까'],['다','따'],['바','빠'],['사','싸'],['자','짜']],
 'batchim':[['안','앙'],['암','앙'],['곰','공'],['밥','방'],['산','삼']]};   // all clip-verified; Repasar draws from here
```
Double finals exist in `FIN` for correctness but no v1 level uses them. Vowel layout: VERT → block grid `[ini | voc]`, HORIZ → `[ini / voc]`, WRAP → ini top-left, horizontal part below, vertical part right; batchim row appears once a vowel exists and squashes the block.

### Tutorial by playing (no text walls)
Each verb debuts in a level where it is the **only** possible move; Horang says ≤6 words in a gold bubble that disappears on doing it, only the first time (`tutos`). 1-1 "Toca el punto." — if the player makes 어: "Ese es 어. Tócalo otra vez." and the dot pulses; tapping it flips to ㅏ (free, no ● consumed); both 어 and 아 are marked heard. 1-2 "Ahora con la raya acostada." 1-3 "Escucha. ¿Cuál oíste?" 1-4 "Toca el punto de la ㅏ." (dot highlighted). 2-2 "Hay un piso abajo." and, once 악 is formed: "ㅇ arriba: mudo. ㅇ abajo: ng." 3-1 "Toca ✦ sobre la ㅂ." 4-1 "Toca ⧉: dos ㅂ." 5-1 "Toca ⟲ para girar." First oido: "Escucha y construye." Idle 10 s in a tutorial level → bubble repeats. Romanization auto-off from world 3; toggle "Romanización" in ajustes (`roman`). Button "Ya sé leer" on the map jumps to world 3.

## 4. Level data (30 levels, 6 worlds) — only clip-backed goals
Format (a level is data; the engine derives everything else):
```js
// forja/oido: {id,tipo,meta,gloss,bandeja,fichas,distract?,par?}  cadena: {id,tipo,inicio,via?,fin,pasos,extra?,fichas?}  reconocer: {id,tipo,rondas:[[cands...],...],par}
// wordOnly:true = the word has a clip but syllables 친 김 선 생 님 do not: those blocks read back via TTS (never a chime); Eco = speak(word) then TTS of the player's word.
const MUNDOS=[
{n:1,nombre:'Bukchon',ensena:'ㅣ ㅡ + punto → ㅏ ㅓ ㅗ ㅜ; dos puntos = y; ㅇ asiento mudo; ㅓ/ㅗ y ㅡ/ㅜ al oído',niveles:[
 {id:'1-1',tipo:'forja',meta:'아',gloss:'¡ah!',bandeja:['ㅇ','ㅣ'],fichas:{punto:1},tutorial:'punto'},
 {id:'1-2',tipo:'forja',meta:'오',gloss:'¡oh!',bandeja:['ㅇ','ㅡ'],fichas:{punto:1},tutorial:'raya'},
 {id:'1-3',tipo:'reconocer',rondas:[['어','오'],['으','우'],['여','요'],['어','으']],par:'ㅓ/ㅗ'},
 {id:'1-4',tipo:'cadena',inicio:'나',fin:'너',pasos:1,tutorial:'flip'},                       // yo → tú
 {id:'1-5',tipo:'oido',meta:'우유',gloss:'leche',bandeja:['ㅇ','ㅇ','ㅡ','ㅡ'],fichas:{punto:3},par:'ㅡ/ㅜ'}]},
{n:2,nombre:'Insadong',ensena:'vocal vertical a la derecha, horizontal debajo; batchim = piso; ㅇ mudo arriba, ng abajo',niveles:[
 {id:'2-1',tipo:'forja',meta:'고기',gloss:'carne',bandeja:['ㄱ','ㄱ','ㅡ','ㅣ'],fichas:{punto:1}},
 {id:'2-2',tipo:'forja',meta:'강',gloss:'río',bandeja:['ㄱ','ㅇ','ㅣ'],fichas:{punto:1},tutorial:'piso'},   // ㅇ arriba + ㄱ abajo = 악, se oye
 {id:'2-3',tipo:'reconocer',rondas:[['안','앙'],['암','앙'],['안','암','앙'],['곰','공']],par:'batchim'},
 {id:'2-4',tipo:'cadena',inicio:'곰',fin:'공',pasos:1,extra:['ㅇ']},                            // oso → pelota
 {id:'2-5',tipo:'oido',meta:'바다',gloss:'mar',bandeja:['ㅂ','ㄷ','ㅣ','ㅣ'],fichas:{punto:2},distract:['ㅡ'],par:'ㅡ/ㅜ'}]},
{n:3,nombre:'Hongdae',ensena:'+fuerte / +aire: ㄱ→ㅋ, ㄴ→ㄷ→ㅌ, ㅁ→ㅂ→ㅍ, ㅅ→ㅈ→ㅊ, ㅇ→ㅎ; presupuesto exacto',niveles:[
 {id:'3-1',tipo:'cadena',inicio:'비',fin:'피',pasos:1,fichas:{trazo:1},tutorial:'trazo'},        // lluvia → sangre
 {id:'3-2',tipo:'forja',meta:'커피',gloss:'café',bandeja:['ㄱ','ㅁ','ㅣ','ㅣ'],fichas:{trazo:3,punto:1}},  // ㅍ a 2 pasos, ㅋ a 1
 {id:'3-3',tipo:'cadena',inicio:'십',fin:'집',pasos:1,fichas:{trazo:1}},                        // diez → casa
 {id:'3-4',tipo:'reconocer',rondas:[['다','타'],['바','파'],['자','차'],['가','카']],par:'simple/aspirada'},
 {id:'3-5',tipo:'cadena',inicio:'문',via:['물'],fin:'불',pasos:2,extra:['ㄹ'],fichas:{trazo:1}}]}, // puerta → agua → fuego
{n:4,nombre:'Gwangjang',ensena:'gemela = tensa (ㄲ ㄸ ㅃ ㅆ ㅉ); la gemela debe existir; simple / aspirada / tensa con el mismo cuerpo',niveles:[
 {id:'4-1',tipo:'cadena',inicio:'방',fin:'빵',pasos:1,extra:['ㅂ'],fichas:{gemela:1},tutorial:'gemela'}, // habitación → pan
 {id:'4-2',tipo:'reconocer',rondas:[['가','카','까'],['다','타','따'],['바','파','빠'],['사','싸'],['자','차','짜']],par:'simple/tensa'},
 {id:'4-3',tipo:'cadena',inicio:'밤',via:['밥','방'],fin:'빵',pasos:3,extra:['ㅂ','ㅇ'],fichas:{gemela:1}}, // noche → arroz → habitación → pan (la ㅂ que vuelve a la bandeja es la gemela)
 {id:'4-4',tipo:'forja',meta:'꽃',gloss:'flor',bandeja:['ㄱ','ㄱ','ㅅ','ㅡ'],fichas:{trazo:2,gemela:1,punto:1}}, // chip "suena ㄷ"
 {id:'4-5',tipo:'oido',meta:'피자',gloss:'pizza',bandeja:['ㅂ','ㅅ','ㅣ','ㅣ'],fichas:{trazo:2,punto:1},distract:['ㅡ'],par:'simple/aspirada'}]},
{n:5,nombre:'Río Han',ensena:'girar con polaridad (yang ㅏㅗ / yin ㅓㅜ); ㅐ/ㅔ como ortografía; ㅘ ㅝ envuelven',niveles:[
 {id:'5-1',tipo:'cadena',inicio:'손',fin:'산',pasos:1,tutorial:'girar'},                        // mano → montaña
 {id:'5-2',tipo:'cadena',inicio:'개',fin:'게',pasos:1},                                         // perro → cangrejo (tarjeta: "ㅐ y ㅔ: hoy suenan casi igual; es ortografía")
 {id:'5-3',tipo:'reconocer',rondas:[['서','소'],['그','구'],['너','노'],['드','두'],['머','모']],par:'ㅓ/ㅗ'},
 {id:'5-4',tipo:'forja',meta:'사과',gloss:'manzana',bandeja:['ㅅ','ㄱ','ㅣ','ㅡ','ㅣ'],fichas:{punto:3}}, // ㅘ = ㅗ + ㅏ
 {id:'5-5',tipo:'oido',meta:'뭐',gloss:'¿qué?',bandeja:['ㅁ','ㅡ','ㅣ'],fichas:{punto:2},distract:['ㅇ'],par:'ㅓ/ㅗ'}]},
{n:6,nombre:'Estación de Seúl',ensena:'todo junto con palabras de las primeras clases de Básico 1; casi todo oído; jefe 선생님',niveles:[
 {id:'6-1',tipo:'oido',meta:'우산',gloss:'paraguas',bandeja:['ㅇ','ㅅ','ㄴ','ㅡ','ㅣ'],fichas:{punto:2},distract:['ㅡ'],par:'batchim'},
 {id:'6-2',tipo:'oido',meta:'친구',gloss:'amigo/a',bandeja:['ㅅ','ㄴ','ㄱ','ㅣ','ㅡ'],fichas:{trazo:2,punto:1},wordOnly:true,par:'simple/aspirada'},
 {id:'6-3',tipo:'reconocer',rondas:[['밤','밥','방'],['산','삼'],['말','만'],['달','다']],par:'batchim'},
 {id:'6-4',tipo:'oido',meta:'김치',gloss:'kimchi',bandeja:['ㄱ','ㅁ','ㅅ','ㅣ','ㅣ'],fichas:{trazo:2},wordOnly:true,par:'simple/aspirada'},
 {id:'6-5',tipo:'oido',meta:'선생님',gloss:'profesor/a',bandeja:['ㅅ','ㅅ','ㄴ','ㄴ','ㅇ','ㅁ','ㅣ','ㅣ','ㅣ','ㅣ'],fichas:{punto:2},wordOnly:true,jefe:true,par:'batchim'}]}];
// DICC = {hangul:{gloss, rr, clip:true}} — ONE meaning each; rr = Revised Romanization with final neutralization, stored, never computed (김치 = "kimchi" by brand choice):
const DICC=d(`아 ¡ah! a · 오 ¡oh! o · 나 yo na · 너 tú neo · 우유 leche uyu · 고기 carne gogi · 강 río gang · 곰 oso gom · 공 pelota gong · 바다 mar bada · 비 lluvia bi · 피 sangre pi · 커피 café keopi · 십 diez sip · 집 casa jip · 문 puerta mun · 물 agua mul · 불 fuego bul · 방 habitación bang · 빵 pan ppang · 밤 noche bam · 밥 arroz bap · 꽃 flor kkot · 피자 pizza pija · 손 mano son · 산 montaña san · 개 perro gae · 게 cangrejo ge · 사과 manzana sagwa · 뭐 qué mwo · 우산 paraguas usan · 강아지 perrito gangaji · 친구 amigo/a chingu · 김치 kimchi kimchi · 선생님 profesor/a seonsaengnim · 안녕 hola annyeong · 나무 árbol namu · 하나 uno hana · 학교 escuela hakgyo · 한국 Corea hanguk · 눈 ojo nun · 돈 dinero don · 달 luna dal · 말 palabra mal · 만 diez mil man · 별 estrella byeol · 옷 ropa ot · 책 libro chaek · 코 nariz ko · 귀 oreja gwi · 배 barriga bae · 무 rábano mu · 새 pájaro sae · 차 té cha · 해 sol hae`);
```
**Load-time verification** (dev = `?dev=1`): a BFS over verbs × `DICC` — modeling the tray as a multiset with chip returns on swap and the ⧉ twin consumed — verifies each consecutive rung of every cadena ladder `[inicio, ...via, fin]` is exactly 1 counted step apart (without `via`: `fin` reachable in exactly `pasos` counted steps). For forja/oido it computes `par` and asserts tray + tokens are exactly sufficient (`distract` ignored). A level that fails **throws in dev; in prod it stays playable and logs `console.error`; never skip** (numbering, hexagons and unlocking depend on all 30).

## 5. UI spec
- **Screens**: (a) Splash; (b) **Mapa**: 6 labeled circles on a dotted line (Bukchon → Insadong → Hongdae → Gwangjang → Río Han → Estación), gold 호 seal on finished worlds, blue pulsing current, gray next; below: honey jar count, "Ya sé leer", "Álbum" (won words with speaker + gloss), moon/sun, "Cómo simplificamos" with exactly these 3 lines: "1) ✦ suma un trazo: primero +fuerte (ㄷ ㅂ ㅈ), después +aire (ㅋ ㅌ ㅍ ㅊ ㅎ). 2) ⧉ gemela = tensa, sin aire. 3) ㅐ y ㅔ hoy suenan casi igual: los distinguimos por ortografía."; (c) **Nivel**; (d) **Victoria** card; (e) **Fin de mundo**.
- **Nivel layout (375×~740)**: top bar 48 px (← mapa · "Hongdae · 3/5" · 5 mini hexagons · ↶ · ☾/☀). Goal card ≈110 px (forja: Hangul 44 px + "· hierba"; oido: 64 px blue speaker, gloss 20 px, dotted silhouette). Horang (72 px inline SVG face; ears up while the goal plays) peeks from the card corner with the gold bubble. House ≈220 px: 1–3 blocks 96×96, radius 18, dotted gray slots → solid blue when filled, active block 3 px blue ring, valid slots glow gold when a chip is selected; pad popover floats above the house. Verb bar 44 px: contextual pills ✦ Trazo ×N · ⧉ Gemela ×N · ● Punto ×N · ⟲ Girar · ⇄ Lado (hidden before debut, outlined at 0, never removed after) + blue "Comprobar" on oido. Tray ≈120 px: chips 56×56 with **shape = role** (consonants square, blue border; ㅣ tall and narrow, ㅡ wide and low, gold border; ㄹ blue with a gold corner). Chips >7 scroll horizontally.
- **Animations** (all ≤300 ms, off under `prefers-reduced-motion`): stroke overlay fade, spring squash for gemela, dot "pop" and roll to side, 90° rotate for girar, house "crouch" for batchim, seal hop + gold flash, honey drop flying to the jar, chip shake ×2 gray on illegal, "melt" one step on auto-undo.
- **Empty states**: tray empty → "Todo colocado. ¿Coincide?"; auto-melt conditions met → melt + Horang hmm; clip fails → TTS + tiny "voz del dispositivo" label.
- **Accessibility**: all targets ≥44 px; every chip/slot/pill has `aria-label` ("ㄱ, consonante, suena 가"; ㅇ as in §2); `aria-live="polite"` announces block readback and results; desktop keyboard: Tab cycles chips/slots/pills, Enter activates, Backspace undo; blue focus ring; `navigator.vibrate(10)` on valid actions if available.
- **Victory card**: slides from bottom; word 48 px, gloss, speaker, 1–3 honey drops animated, buttons "Siguiente" (blue) / "Repetir" (outline). Cadena shows the ladder 문 · 물 · 불 with gold arrows. Adds the word to Álbum.

## 6. Brand and copy
- Title: **Ttak · 딱** (always shown together the first time; 딱 has no clip yet, so the victory "ttak" is a WebAudio click, not `speak('딱')`). Tagline: **"Cada letra tiene su lugar. Escúchala, fórjala y encájala… ¡딱!"** Subline on the map: "Gratis · sin cuenta · voz nativa · Academia Seúl".
- Horang, el tigre chingu, is the only voice; bubbles ≤6 words; victory micro-copy rotates: "¡딱! Justo.", "Eso se oye.", "화이팅, chingu.".
- The game's phonetics copy (+fuerte / +aire, gemela = tensa sin aire, ㅐ/ㅔ = ortografía) is **canonical** for the brand; the Lector still says "un trazo más = más aire" and will be aligned in a follow-up.
- **Fin de mundo** (soft, one line, never a popup): full card with jar filling, "Ya lees N sílabas y M palabras", "Tu oído: …", primary "Siguiente barrio", and one gray-blue secondary line: **"Esto se ve en Básico 1 · la semana del 5 de octubre → Ver el curso"** linking to `https://www.academiaseul.com/nivel-1?utm_source=ttak&utm_campaign=mundoN`. After 6-5 the line becomes primary: "Acabas de leer lo que verás en las primeras clases de Básico 1".

## 7. Acceptance checklist (verify before you finish; print results to console on load in dev)
- [ ] All 30 levels load; BFS validates every cadena ladder (each rung 1 counted step, chip returns modeled); every forja/oido has `par` computed and a logged solution path; tray+tokens exactly sufficient ignoring `distract`.
- [ ] Every GOAL syllable/word, every ladder state of a cadena, every reconocer candidate, every `PARES` entry and every reference syllable has a clip (assert on load, hard fail). Intermediate states may fall back to TTS via `speak`; that is expected, not an error. No lone jamo ever reaches `speak`.
- [ ] Audio plays on first tap after the splash on iOS Safari and Android Chrome; goal replays unlimited; Eco plays goal → yours with 600 ms gap; `speakQueue` waits for `ended`/`onend` and never cuts the first item.
- [ ] No red/orange in CSS, SVG or emoji; both themes checked with the tokens; `as-theme` round-trips with the Lector.
- [ ] 375×667 no overflow/scroll during a level; 480 px desktop centered; Tab/Enter/Backspace path works; targets ≥44 px (incl. dot hit area); pad popover never overlaps neighbor blocks; reduced-motion respected.
- [ ] Undo/reset restore chips and tokens from snapshots; `movs` ignores undone moves; auto-melt fires only under its 4 conditions and never twice in a row; progress, `tutos` and `oido` metric persist across reload; "Repasar" draws from `PARES` for the two weakest pairs.
- [ ] Tutorial bubbles appear once; 1-1 handles 어 with the free flip; `rr` off from world 3 unless `roman`; "Ya sé leer" sets `saltado` and unlocks worlds 1–3.
- [ ] Single `index.html` under ~200 KB, no console errors, works from `file://` except clips.

## 8. Do NOT
- No frameworks, bundlers, CDN scripts or CSS libs — only Google Fonts.
- No Matcha clone: no sliding grid, no collide-to-merge, no empty board cells; the house is one structure with slots and never more than 3 blocks.
- No invented Korean facts: no "cada trazo = aire" (ㄷ ㅂ ㅈ are plain), no "ㄲ = más aire" (tense = no air), no 오 = "cinco nativo" (that is 다섯), no ㄴ "contra los dientes", no fake ㅐ/ㅔ hearing contrast (teach as spelling), no double batchim in play. ㄹ entre vocales = r simple de "pero" (nunca rr); ㄹ final o ㄹㄹ = l; never say "rr" or "vibrante múltiple".
- No romanization computed at runtime and none as the only feedback; no text walls; no red; no accounts, ads, analytics, or external calls beyond `/audio/kr/`.
- No jamo sent to TTS; no silence and no chime when a clip is missing.
