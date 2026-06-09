import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Guías gratis para aprender coreano | Academia Seúl",
  description:
    "Descarga gratis nuestras guías para aprender coreano: la Guía del Alfabeto (한글) y la Guía de Pronunciación coreana para hispanohablantes.",
  alternates: { canonical: "https://www.academiaseul.com/recursos/guias" },
};

const guides = [
  {
    title: "Guía del Alfabeto Coreano",
    korean: "한글",
    preview: "/guia-hangul-preview.png",
    badge: "PDF · 1 hoja",
    desc:
      "Todas las letras del hangul en una sola hoja: las 14 consonantes y las 10 vocales con su pronunciación, cómo se arma una sílaba y tus primeras palabras. Ideal para empezar de cero.",
    file: "/Guia_Alfabeto_Coreano_Hangul.pdf",
    download: "Guia-Alfabeto-Coreano-Hangul.pdf",
  },
  {
    title: "Guía de Pronunciación Coreana",
    korean: "한국어",
    preview: "/pronunciacion-preview.png",
    badge: "PDF · 10 páginas",
    desc:
      "De cero a leer hangul correctamente: las vocales con la boca real, las consonantes y cómo diferenciar las aspiradas, el batchim y los 5 errores típicos del hispanohablante (y cómo evitarlos).",
    file: "/pronunciacion-coreana-academia-seul.pdf",
    download: "Pronunciacion-Coreana-Academia-Seul.pdf",
  },
];

export default function GuiasPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <Navigation solid />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-12 text-center">
        <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
          가이드 · Guías gratis
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-seoul-black mb-4">
          Guías para aprender <span className="text-seoul-red">coreano</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Material descargable para estudiar a tu ritmo. Gratis, sin registro —
          descarga, imprime y practica.
        </p>
      </section>

      {/* Guides */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-10">
        {guides.map((g) => (
          <div
            key={g.file}
            className="border-2 border-seoul-black bg-white shadow-[8px_8px_0_#0a0a0f] p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="border-2 border-seoul-black shadow-[5px_5px_0_#C8001E] overflow-hidden bg-[#1A1A2E]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.preview}
                alt={`Vista previa de ${g.title}`}
                className="w-full h-auto block"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-4">
                <span className="bg-seoul-red text-white px-3 py-1">{g.badge}</span>
                <span className="text-gray-400">Gratis</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-seoul-black leading-tight mb-3">
                {g.title} ·{" "}
                <span
                  className="text-seoul-red"
                  style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
                >
                  {g.korean}
                </span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{g.desc}</p>
              <a
                href={g.file}
                download={g.download}
                className="inline-block bg-seoul-red text-white font-bold text-lg px-8 py-4 border-2 border-seoul-black shadow-[5px_5px_0_#0a0a0f] hover:shadow-[8px_8px_0_#0a0a0f] hover:-translate-x-1 hover:-translate-y-1 transition-all"
              >
                📥 Descargar (PDF)
              </a>
            </div>
          </div>
        ))}

        <p className="text-center text-gray-400 text-sm pt-4">
          Más guías muy pronto. 화이팅 chingu! 🇰🇷
        </p>
      </section>

      <Footer />
    </main>
  );
}
