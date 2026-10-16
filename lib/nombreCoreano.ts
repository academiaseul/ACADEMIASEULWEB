// Nombres en español → hangul, según la norma oficial de transcripción del español
// (외래어 표기법: tabla 2 del español y 제3장 제4절 에스파냐어의 표기, artículos 1–6; hoy a cargo del 국립국어원).
//
// Resumen de la norma que sigue este motor:
//  · Vocales separadas, sin diptongos coreanos: María 마리아, Diego 디에고, Raúl 라울.
//  · c y g: ante e/i → ㅅ / ㅎ (Cecilia 세실리아, Jorge 호르헤); si no, ㅋ / ㄱ.
//  · gu/qu ante e/i → ㄱ/ㅋ (Miguel 미겔, Joaquín 호아킨); ante a → 과/콰 (Guadalupe 과달루페); ante o → 구오/쿠오.
//  · Consonante final o ante consonante: b, d, f, g, k, r, s, t, z → con ㅡ (브 드 프 그 크 르 스 트 스);
//    m, n → 받침; c → 받침 ㄱ (Víctor 빅토르) y p → 받침 ㅂ, salvo en los grupos cl, cr, pl, pr (클, 크, 플, 프).
//  · l: a final o ante consonante → 받침 ㄹ (Isabel 이사벨); entre vocales o tras consonante → ㄹㄹ (Camila 카밀라, Pablo 파블로).
//  · n ante c, g, k, qu → 받침 ㅇ (Blanca 블랑카, Ángel 앙헬, Domingo 도밍고).
//  · ll, y + vocal → 야 예 요 유 (Guillermo 기예르모, Yolanda 욜란다); y sin vocal → 이 (Paraguay 파라과이).
//  · ñ + vocal → 냐 녜 뇨 뉴 (Muñoz 무뇨스).
//  · x: al comienzo → ㅅ; en medio ante vocal → ㄱㅅ (México 멕시코, Alexis 알렉시스); al final o ante consonante → ㄱ스 (Félix 펠릭스).
//  · cc → ㄱㅅ (acción 악시온); otras consonantes dobles cuentan como una (Torres 토레스).
//  · h muda; j → ㅎ (y muda a final de palabra: reloj 렐로); v = b; z = s.

const INIT = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const MED = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const FIN = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

function silaba(i: string, m: string, f = ""): string {
  const ii = INIT.indexOf(i), mm = MED.indexOf(m), ff = FIN.indexOf(f);
  if (ii < 0 || mm < 0 || ff < 0) return "";
  return String.fromCharCode(0xac00 + (ii * 21 + mm) * 28 + ff);
}

const VOCAL: Record<string, string> = { a: "ㅏ", e: "ㅔ", i: "ㅣ", o: "ㅗ", u: "ㅜ" };
const CON_Y: Record<string, string> = { a: "ㅑ", e: "ㅖ", i: "ㅣ", o: "ㅛ", u: "ㅠ" };
const CON_W: Record<string, string> = { a: "ㅘ", e: "ㅞ", i: "ㅟ", o: "ㅝ", u: "ㅜ" };

// Fonemas: consonante (C), vocal (V), semivocal y (Y) o w (W), l (L)
type Fon =
  | { t: "C"; ini: string; coda: "ㅡ" | "ㄱ" | "ㅂ" | "ㅁ" | "ㄴ" | "ㄹ" | "mudo"; letra: string }
  | { t: "V"; v: string }
  | { t: "Y"; n?: boolean }
  | { t: "W"; libre?: boolean }
  | { t: "L" }
  | { t: "X" };

const BASE: Record<string, { ini: string; coda: "ㅡ" | "ㄱ" | "ㅂ" | "ㅁ" | "ㄴ" | "ㄹ" | "mudo" }> = {
  b: { ini: "ㅂ", coda: "ㅡ" }, v: { ini: "ㅂ", coda: "ㅡ" }, d: { ini: "ㄷ", coda: "ㅡ" }, f: { ini: "ㅍ", coda: "ㅡ" },
  k: { ini: "ㅋ", coda: "ㅡ" }, m: { ini: "ㅁ", coda: "ㅁ" }, n: { ini: "ㄴ", coda: "ㄴ" }, p: { ini: "ㅍ", coda: "ㅂ" },
  r: { ini: "ㄹ", coda: "ㅡ" }, s: { ini: "ㅅ", coda: "ㅡ" }, t: { ini: "ㅌ", coda: "ㅡ" }, z: { ini: "ㅅ", coda: "ㅡ" },
};

// Formas fijadas por el uso que el motor no deduce de la norma
const EXCEPCIONES: Record<string, string> = {
  ximena: "히메나", // en México la x de Ximena suena j; la norma diría 시메나
  ecuador: "에콰도르", // nombre fijado del país (la norma daría 에쿠아도르)
  // grafía española pero pronunciación distinta
  lourdes: "루르데스", montserrat: "몬세라트", boric: "보리치", miryam: "미리암", wladimir: "블라디미르",
  // grafía italiana o inglesa con l (no ll = y)
  isabella: "이사벨라", antonella: "안토넬라", fiorella: "피오렐라", daniella: "다니엘라", gabriella: "가브리엘라",
  rafaella: "라파엘라", marianella: "마리아넬라", priscilla: "프리실라", priscila: "프리실라",
  // nombres franceses
  nicole: "니콜", michelle: "미셸", michel: "미셸", camille: "카미유", ivonne: "이본", yvonne: "이본", arlette: "아를레트",
  ivette: "이베트", lizette: "리세트", odette: "오데트", brigitte: "브리지트", jean: "장", natalie: "나탈리",
  // nombres ingleses
  jennifer: "제니퍼", jessica: "제시카", jenny: "제니", katherine: "캐서린", jacqueline: "재클린", jaqueline: "재클린",
  evelyn: "에벌린", elizabeth: "엘리자베스", kimberly: "킴벌리", allison: "앨리슨", shirley: "셜리", ashley: "애슐리",
  josephine: "조세핀", geraldine: "제럴딘", stephanie: "스테파니", michael: "마이클", william: "윌리엄", williams: "윌리엄스",
  john: "존", jhon: "존", jonathan: "조나탄", jhonatan: "조나탄", bryan: "브라이언", brayan: "브라얀", ryan: "라이언",
  steven: "스티븐", brandon: "브랜던", dylan: "딜런", isaac: "이삭", aaron: "아론", jordi: "조르디", giovanni: "조반니",
  // lugares de varias palabras
  "costa rica": "코스타리카", "el salvador": "엘살바도르", "puerto rico": "푸에르토리코", "buenos aires": "부에노스아이레스",
  "la paz": "라파스", "la habana": "아바나", "punta arenas": "푼타아레나스", "machu picchu": "마추픽추",
};

function normalizar(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/ü/g, "W") // güe, güi: la u suena
    .replace(/ñ/g, "N")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zWN\s'-]/g, "");
}

function fonemas(w: string): Fon[] {
  const f: Fon[] = [];
  const voc = (c?: string) => !!c && "aeiou".includes(c);
  let i = 0;
  while (i < w.length) {
    const c = w[i], n = w[i + 1], n2 = w[i + 2];
    if (c === "-" || c === "'") { i++; continue; }
    if (voc(c)) { f.push({ t: "V", v: c }); i++; continue; }
    if (c === "W") { if (voc(n)) f.push({ t: "W" }); else f.push({ t: "V", v: "u" }); i++; continue; } // ü: güe → 궤
    if (c === "h") { i++; continue; }
    if (c === "c" && n === "h") {
      if (n2 === "r" || n2 === "l") { f.push({ t: "C", ini: "ㅋ", coda: "ㄱ", letra: "c" }); i += 2; continue; } // Christian 크리스티안
      f.push({ t: "C", ini: "ㅊ", coda: "ㅡ", letra: "ch" }); i += 2; continue;
    }
    if (c === "p" && n === "h") { f.push({ t: "C", ini: "ㅍ", coda: "ㅡ", letra: "f" }); i += 2; continue; } // Daphne 다프네
    if (c === "t" && (n === "x" || n === "z")) { f.push({ t: "C", ini: "ㅊ", coda: "ㅡ", letra: "ch" }); i += 2; continue; } // Arantxa 아란차, Itzel 이첼
    if (c === "j" && n === "h") { f.push({ t: "C", ini: "ㅈ", coda: "ㅡ", letra: "j" }); i += 2; continue; } // Jhon 존
    if (c === "c" && n === "k") { f.push({ t: "C", ini: "ㅋ", coda: "ㄱ", letra: "c" }); i += 2; continue; } // ck = c (Erick 에릭)
    if (c === "l" && n === "l") { f.push({ t: "Y" }); i += 2; continue; }
    if (c === "N") { f.push({ t: "Y", n: true }); i++; continue; }
    if (c === "y") { if (voc(n)) f.push({ t: "Y" }); else f.push({ t: "V", v: "i" }); i++; continue; }
    if (c === "w") { if (voc(n)) f.push({ t: "W", libre: true }); else f.push({ t: "V", v: "u" }); i++; continue; }
    if (c === "l") { f.push({ t: "L" }); i++; continue; }
    if (c === "q") { // qu + e/i → ㅋ ; qu + a → 콰 ; qu + o → 쿠오
      if (n === "u" && (n2 === "e" || n2 === "i")) { f.push({ t: "C", ini: "ㅋ", coda: "ㅡ", letra: "k" }); i += 2; continue; }
      if (n === "u" && n2 === "a") { f.push({ t: "C", ini: "ㅋ", coda: "ㅡ", letra: "k" }, { t: "W" }); i += 2; continue; }
      f.push({ t: "C", ini: "ㅋ", coda: "ㅡ", letra: "k" }); i++; continue; // quo → 쿠오 (la u queda como vocal)
    }
    if (c === "g") {
      if (n === "g") { f.push({ t: "C", ini: "ㄱ", coda: "ㅡ", letra: "g" }); i += 2; continue; } // gg: O'Higgins 오이긴스
      if (n === "e" || n === "i") { f.push({ t: "C", ini: "ㅎ", coda: "ㅡ", letra: "gh" }); i++; continue; }
      if (n === "u" && (n2 === "e" || n2 === "i")) { f.push({ t: "C", ini: "ㄱ", coda: "ㅡ", letra: "g" }); i += 2; continue; }
      if (n === "u" && n2 === "a") { f.push({ t: "C", ini: "ㄱ", coda: "ㅡ", letra: "g" }, { t: "W" }); i += 2; continue; }
      f.push({ t: "C", ini: "ㄱ", coda: "ㅡ", letra: "g" }); i++; continue;
    }
    if (c === "c") {
      if (n === "c") { f.push({ t: "C", ini: "ㅋ", coda: "ㄱ", letra: "c" }); i++; continue; } // cc → ㄱ + ㅅ
      if (n === "e" || n === "i") { f.push({ t: "C", ini: "ㅅ", coda: "ㅡ", letra: "s" }); i++; continue; }
      f.push({ t: "C", ini: "ㅋ", coda: "ㄱ", letra: "c" }); i++; continue;
    }
    if (c === "j") { f.push({ t: "C", ini: "ㅎ", coda: "mudo", letra: "j" }); i++; continue; }
    if (c === "x") { f.push({ t: "X" }); i++; continue; }
    if (BASE[c]) {
      if (c === n && c !== "c") { i++; continue; } // consonante doble = simple (rr, nn, ss, tt…)
      f.push({ t: "C", ...BASE[c], letra: c }); i++; continue;
    }
    i++;
  }
  return f;
}

type Sil = { i: string; m?: string; f?: string };

function palabra(w: string): string {
  if (EXCEPCIONES[w]) return EXCEPCIONES[w];
  const F = fonemas(w);
  const out: Sil[] = [];
  let cur: Sil | null = null;
  const cerrar = () => { if (cur) { if (!cur.m) cur.m = "ㅡ"; out.push(cur); cur = null; } };
  const esV = (x?: Fon) => !!x && (x.t === "V" || x.t === "Y" || (x.t === "W" && !x.libre));
  const sonidoK = (x?: Fon) => !!x && x.t === "C" && (x.letra === "c" || x.letra === "k" || x.letra === "g" || x.letra === "gh");

  for (let k = 0; k < F.length; k++) {
    const x = F[k], sig = F[k + 1];
    if (x.t === "V") {
      if (cur && !cur.m) cur.m = VOCAL[x.v];
      else { cerrar(); cur = { i: "ㅇ", m: VOCAL[x.v] }; }
      continue;
    }
    if (x.t === "Y") { // ll / y / ñ + vocal → 야 예 요 유 · 냐 녜 뇨 뉴
      if (sig && sig.t === "V") {
        if (cur && !cur.m && !x.n) cur.m = CON_Y[sig.v]; // consonante + y + vocal → 냐, 탸…
        else { cerrar(); cur = { i: x.n ? "ㄴ" : "ㅇ", m: CON_Y[sig.v] }; }
        k++;
      } else { cerrar(); cur = { i: x.n ? "ㄴ" : "ㅇ", m: "ㅣ" }; }
      continue;
    }
    if (x.t === "W") { // gua → 과, qua → 콰, wa → 와
      if (sig && sig.t === "V") {
        if (cur && !cur.m && !x.libre) cur.m = CON_W[sig.v];
        else { cerrar(); cur = { i: "ㅇ", m: CON_W[sig.v] }; }
        k++;
      } else { if (cur && !cur.m) cur.m = "ㅜ"; else { cerrar(); cur = { i: "ㅇ", m: "ㅜ" }; } }
      continue;
    }
    if (x.t === "X") { // x → ㅅ al comienzo; ㄱㅅ en medio; ㄱ스 al final
      const inicio = !cur && out.length === 0;
      if (inicio) { cur = { i: "ㅅ" }; continue; }
      if (cur && cur.m && !cur.f) cur.f = "ㄱ"; else { cerrar(); out.push({ i: "ㅋ", m: "ㅡ" }); }
      cerrar();
      cur = { i: "ㅅ" };
      if (!esV(sig)) cerrar(); // ㄱ스
      continue;
    }
    if (x.t === "L") {
      if (esV(sig)) {
        // l ante vocal: en medio de palabra → ㄹㄹ (la sílaba anterior se cierra con ㄹ)
        if (cur && !cur.m) { cur.m = "ㅡ"; cur.f = "ㄹ"; cerrar(); }
        else if (cur && cur.m && !cur.f) { cur.f = "ㄹ"; cerrar(); }
        else if (!cur && out.length && !out[out.length - 1].f) out[out.length - 1].f = "ㄹ"; // 브+ㄹ → 블 (Pablo), 르+ㄹ → 를 (Carlos)
        else cerrar();
        cur = { i: "ㄹ" };
      } else {
        // l final o ante consonante → 받침 ㄹ
        if (cur && cur.m && !cur.f) { cur.f = "ㄹ"; cerrar(); }
        else if (!cur && out.length && !out[out.length - 1].f) out[out.length - 1].f = "ㄹ";
        else { cerrar(); out.push({ i: "ㄹ", m: "ㅡ" }); }
      }
      continue;
    }
    // consonante
    if (esV(sig)) { // ataque de la sílaba siguiente
      if (cur && !cur.m) { cur.m = "ㅡ"; }
      cerrar(); cur = { i: x.ini }; continue;
    }
    // final de palabra o ante consonante
    if (x.coda === "mudo") continue;
    if (cur && !cur.m) { cur.m = "ㅡ"; cerrar(); }
    const grupo = sig && (sig.t === "L" || (sig.t === "C" && sig.letra === "r")); // cl, cr, pl, pr…
    let coda: string = x.coda;
    if (x.letra === "n" && sonidoK(sig)) coda = "ㅇ"; // nc, ng → ㅇ
    if ((coda === "ㄱ" || coda === "ㅂ") && (grupo || !sig)) coda = coda === "ㄱ" && !sig ? "ㄱ" : "ㅡ"; // grupos: 클 크 플 프; c final → ㄱ, p final → 프
    if (coda !== "ㅡ" && cur && cur.m && !cur.f) { cur.f = coda; cerrar(); continue; }
    cerrar(); out.push({ i: x.ini, m: "ㅡ" });
  }
  cerrar();
  return out.map((s) => silaba(s.i, s.m || "ㅡ", s.f || "")).join("");
}

/** Escribe un nombre (o varios separados por espacios) en hangul según la norma del 국립국어원. */
export function nombreACoreano(s: string): string {
  let t = normalizar(s).trim();
  // lugares de varias palabras (Costa Rica 코스타리카): se buscan antes de separar por espacios
  for (const [k, v] of Object.entries(EXCEPCIONES)) {
    if (k.includes(" ")) t = t.replace(new RegExp("(^|\\s)" + k + "(?=\\s|$)", "g"), "$1" + v);
  }
  return t
    .split(/(\s+)/)
    .map((seg) => (/\s/.test(seg) || !seg || /[가-힯]/.test(seg) ? seg : palabra(seg)))
    .join("")
    .trim();
}
