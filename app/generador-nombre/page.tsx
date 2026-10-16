"use client";

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { nombreACoreano } from "@/lib/nombreCoreano";

// Motor de transliteración español → hangul: lib/nombreCoreano.ts (norma oficial del 국립국어원)

export default function GeneradorNombre() {
  const [input, setInput] = useState("");
  const out = nombreACoreano(input);
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
            Según la norma oficial para escribir el español en coreano (국립국어원). Nombres de otro idioma pueden escribirse distinto. La pronunciación usa la voz coreana de tu dispositivo
            (si no se escucha, instala una voz en coreano en tu sistema).
          </p>

          {/* CTA */}
          <div className="my-14 bg-seoul-black text-white rounded-3xl px-8 py-10 text-center">
            <div className="text-3xl font-black mb-2" style={{ fontFamily: "'Noto Sans KR',sans-serif" }}>한글</div>
            <h3 className="text-2xl font-black mb-3">¿Quieres aprender a leerlo tú mismo?</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Practica gratis con el Lector de Hangul o revisa las próximas clases en vivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/lector-coreano" className="px-7 py-3.5 rounded-full font-bold" style={{ backgroundColor: "#E8B84B", color: "#0D0D0D" }}>
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
