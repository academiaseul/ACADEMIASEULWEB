"use client";

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// ── Motor de transliteración español → Hangul (한글) ──
const INIT = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const MED = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const FIN = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

function compose(i: string, m: string, f?: string): string {
  const ii = INIT.indexOf(i), mm = MED.indexOf(m), ff = FIN.indexOf(f || "");
  if (ii < 0 || mm < 0) return i + m;
  return String.fromCharCode(0xac00 + (ii * 21 + mm) * 28 + (ff < 0 ? 0 : ff));
}

const VOW: Record<string, string> = { a: "ㅏ", e: "ㅔ", i: "ㅣ", o: "ㅗ", u: "ㅜ" };
const IOT: Record<string, string> = { a: "ㅑ", e: "ㅖ", o: "ㅛ", u: "ㅠ", i: "ㅣ" };
const CINIT: Record<string, string> = { b:"ㅂ", v:"ㅂ", d:"ㄷ", f:"ㅍ", j:"ㅎ", k:"ㅋ", m:"ㅁ", n:"ㄴ", p:"ㅍ", r:"ㄹ", s:"ㅅ", t:"ㅌ", z:"ㅅ", w:"ㅇ" };
const CANFIN: Record<string, string> = { "ㄴ":"ㄴ", "ㅁ":"ㅁ", "ㄹ":"ㄹ", "ㅇ":"ㅇ" };

type Tok = { k: string; init?: string; med?: string; n?: boolean; isL?: boolean };

function strip(s: string): string {
  return s.toLowerCase().normalize("NFD")
    .replace(/[̀-̂̄-ͯ]/g, "")
    .replace(/̃/g, "~");
}

function tokenize(w: string): Tok[] {
  w = w.replace(/n~/g, "Ñ");
  const t: Tok[] = [];
  let i = 0;
  while (i < w.length) {
    const c = w[i], c2 = w.substr(i, 2);
    if (c2 === "ch") { t.push({ k: "C", init: "ㅊ" }); i += 2; continue; }
    if (c2 === "ll") { t.push({ k: "Y" }); i += 2; continue; }
    if (c2 === "rr") { t.push({ k: "C", init: "ㄹ" }); i += 2; continue; }
    if (c2 === "qu") { t.push({ k: "C", init: "ㅋ" }); i += 2; continue; }
    if (c === "g") {
      const n = w[i + 1];
      if (n === "e" || n === "i") { t.push({ k: "C", init: "ㅎ" }); i++; continue; }
      if (n === "u" && (w[i + 2] === "e" || w[i + 2] === "i")) { t.push({ k: "C", init: "ㄱ" }); i += 2; continue; }
      t.push({ k: "C", init: "ㄱ" }); i++; continue;
    }
    if (c === "c") {
      const n = w[i + 1];
      if (n === "e" || n === "i") { t.push({ k: "C", init: "ㅅ" }); i++; continue; }
      t.push({ k: "C", init: "ㅋ" }); i++; continue;
    }
    if (c === "Ñ") { t.push({ k: "Y", n: true }); i++; continue; }
    if (c === "y") {
      const n = w[i + 1];
      if (n && "aeiou".includes(n)) { t.push({ k: "Y" }); i++; continue; }
      t.push({ k: "V", med: "ㅣ" }); i++; continue;
    }
    if (c === "h") { i++; continue; }
    if (c === "l") { t.push({ k: "C", init: "ㄹ", isL: true }); i++; continue; }
    if (c === "x") { t.push({ k: "C", init: "ㅋ" }); t.push({ k: "X" }); i++; continue; }
    if ("aeiou".includes(c)) { t.push({ k: "V", med: VOW[c] }); i++; continue; }
    if (CINIT[c]) { t.push({ k: "C", init: CINIT[c] }); i++; continue; }
    i++;
  }
  return t;
}

function transliterateWord(w: string): string {
  const t = tokenize(w);
  const out: string[] = [];
  let p: { i: string; m?: string; f?: string } | null = null;
  let i = 0;
  const flush = () => { if (p) { if (!p.m) p.m = "ㅡ"; out.push(compose(p.i, p.m, p.f)); p = null; } };
  while (i < t.length) {
    const tok = t[i];
    if (tok.k === "X") { flush(); out.push(compose("ㅅ", "ㅡ")); i++; continue; }
    if (tok.k === "V") {
      if (p && !p.m) { p.m = tok.med; } else { flush(); p = { i: "ㅇ", m: tok.med }; }
      i++; continue;
    }
    if (tok.k === "Y") {
      const nv = t[i + 1];
      flush();
      if (nv && nv.k === "V") {
        const base = Object.keys(VOW).find((k) => VOW[k] === nv.med) || "a";
        p = { i: tok.n ? "ㄴ" : "ㅇ", m: IOT[base] || nv.med! };
        i += 2; continue;
      }
      p = { i: tok.n ? "ㄴ" : "ㅇ", m: "ㅣ" }; i++; continue;
    }
    // consonante
    if (p && !p.m) { p.m = "ㅡ"; flush(); continue; }
    const next = t[i + 1];
    if (p && p.m) {
      if (tok.isL && next && next.k === "V") { p.f = "ㄹ"; flush(); p = { i: "ㄹ" }; i++; continue; }
      if (CANFIN[tok.init!] && (!next || next.k === "C" || next.k === "X")) { p.f = CANFIN[tok.init!]; flush(); i++; continue; }
      flush(); p = { i: tok.init! }; i++; continue;
    }
    p = { i: tok.init! }; i++;
  }
  flush();
  return out.join("");
}

function translate(s: string): string {
  return strip(s).split(/(\s+)/).map((seg) => (/\s/.test(seg) ? seg : transliterateWord(seg))).join("");
}

export default function GeneradorNombre() {
  const [input, setInput] = useState("");
  const out = translate(input);
  const cardRef = useRef<HTMLDivElement>(null);

  const speak = () => {
    if (!out || typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(out);
    u.lang = "ko-KR";
    u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const ko = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ko"));
    if (ko) u.voice = ko;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const download = () => {
    if (!out) return;
    const size = 1080;
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#3D2EE8"; ctx.fillRect(0, 0, size, size);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "600 34px Arial";
    ctx.fillText("MI NOMBRE EN COREANO", size / 2, 180);
    ctx.fillStyle = "#fff";
    ctx.font = "700 64px Arial";
    ctx.fillText(input.trim() || "Tu nombre", size / 2, 430);
    ctx.fillStyle = "#E8B84B";
    ctx.font = "900 150px 'Malgun Gothic','Noto Sans KR',sans-serif";
    ctx.fillText(out, size / 2, 640);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "600 30px Arial";
    ctx.fillText("화이팅 chingu! · academiaseul.com", size / 2, 900);
    const link = document.createElement("a");
    link.download = `mi-nombre-en-coreano.png`;
    link.href = c.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation solid />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-10 px-6 text-center" style={{ backgroundColor: "#3D2EE8" }}>
        <div className="max-w-2xl mx-auto text-white">
          <div className="inline-block px-4 py-1 mb-5 rounded-full bg-white/15 text-xs font-bold tracking-widest">
            HERRAMIENTA GRATIS · 무료
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Tu nombre en coreano</h1>
          <p className="text-white/85 text-lg">
            Escribe tu nombre (o cualquier frase) y descubre cómo se ve y se escucha en 한글.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="px-6 -mt-6">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu nombre… ej: María"
            className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 text-xl focus:border-[#3D2EE8] focus:ring-4 focus:ring-[#3D2EE8]/15 outline-none transition shadow-sm text-center"
            autoFocus
          />

          <div
            ref={cardRef}
            className="mt-6 rounded-3xl border-2 border-[#3D2EE8] bg-[#F5F3FF] p-8 md:p-12 text-center min-h-[220px] flex flex-col items-center justify-center"
          >
            {out ? (
              <>
                <div className="text-sm font-bold tracking-widest text-gray-400 mb-3">EN COREANO</div>
                <div
                  className="font-black text-[#3D2EE8] leading-none"
                  style={{ fontFamily: "'Noto Sans KR','Malgun Gothic',sans-serif", fontSize: "clamp(48px, 12vw, 110px)" }}
                >
                  {out}
                </div>
                <div className="mt-4 text-gray-500">{input.trim()}</div>
              </>
            ) : (
              <div className="text-gray-400 text-lg">Aquí aparecerá tu nombre en 한글 ✨</div>
            )}
          </div>

          {out && (
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={speak}
                className="px-7 py-3.5 rounded-full text-white font-bold text-lg hover:scale-105 transition"
                style={{ backgroundColor: "#3D2EE8" }}
              >
                🔊 Escuchar
              </button>
              <button
                onClick={download}
                className="px-7 py-3.5 rounded-full font-bold text-lg border-2 border-[#3D2EE8] text-[#3D2EE8] hover:bg-[#F5F3FF] transition"
              >
                📥 Descargar imagen
              </button>
            </div>
          )}

          <p className="mt-5 text-center text-sm text-gray-400">
            Transliteración aproximada al estilo coreano. La pronunciación usa la voz coreana de tu dispositivo
            (si no se escucha, instala una voz en coreano en tu sistema).
          </p>

          {/* CTA */}
          <div className="my-14 bg-seoul-black text-white rounded-3xl px-8 py-10 text-center">
            <div className="text-3xl font-black mb-2" style={{ fontFamily: "'Noto Sans KR',sans-serif" }}>한글</div>
            <h3 className="text-2xl font-black mb-3">¿Quieres aprender a leerlo tú mismo?</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Practica gratis con el Lector de Hangul o inscríbete en un curso en vivo desde la semana del 5 de octubre.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/lector-hangul" className="px-7 py-3.5 rounded-full font-bold" style={{ backgroundColor: "#E8B84B", color: "#0D0D0D" }}>
                Lector de Hangul gratis →
              </a>
              <a href="/nivel-1#clases" className="px-7 py-3.5 rounded-full font-bold bg-seoul-red text-white">
                Inscribirme a un curso →
              </a>
            </div>
            <p className="text-white/50 text-sm mt-5">화이팅 chingu! 🇰🇷</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
