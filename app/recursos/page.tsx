import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HangulBoard from "@/components/HangulBoard";

export const metadata: Metadata = {
  title: "Recursos gratis | Academia Seúl — Aprende coreano desde cero",
  description:
    "Descarga gratis la Guía del Alfabeto Coreano (한글): todas las consonantes y vocales en una hoja, con su pronunciación. Material gratuito de Academia Seúl.",
  alternates: { canonical: "https://www.academiaseul.com/recursos" },
};

export default function RecursosPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <Navigation solid />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-12 text-center">
        <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
          자료 · Recursos gratis
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-seoul-black mb-4">
          Aprende coreano <span className="text-seoul-red">desde cero</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Material gratuito para empezar hoy mismo. Descárgalo, imprímelo y
          practica — sin costo, sin registro.
        </p>
      </section>

      {/* Featured resource: Hangul guide */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="border-2 border-seoul-black bg-white shadow-[8px_8px_0_#0a0a0f] p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Preview */}
          <div className="order-1 md:order-none">
            <div className="border-2 border-seoul-black shadow-[5px_5px_0_#C8001E] overflow-hidden bg-[#1A1A2E]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/guia-hangul-preview.png"
                alt="Vista previa de la Guía del Alfabeto Coreano Hangul"
                className="w-full h-auto block"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase mb-4">
              <span className="bg-seoul-red text-white px-3 py-1">PDF · Gratis</span>
              <span className="text-gray-400">1 hoja · imprimible</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-seoul-black leading-tight mb-3">
              Guía del Alfabeto Coreano ·{" "}
              <span
                className="text-seoul-red"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                한글
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Todas las letras del hangul en una sola hoja: las 14 consonantes y
              las 10 vocales con su <strong>pronunciación coreana</strong>, cómo
              se arma una sílaba y tus primeras palabras para leer. Perfecta para
              empezar desde cero.
            </p>

            <ul className="text-sm text-gray-700 space-y-2 mb-7">
              <li className="flex items-start gap-2">
                <span className="text-seoul-red font-black">✓</span> 14 consonantes
                + 10 vocales con su sonido
              </li>
              <li className="flex items-start gap-2">
                <span className="text-seoul-red font-black">✓</span> Cómo se forma
                una sílaba (ㄱ + ㅏ = 가)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-seoul-red font-black">✓</span> Tus primeras
                palabras sin batchim
              </li>
            </ul>

            <a
              href="/Guia_Alfabeto_Coreano_Hangul.pdf"
              download
              className="inline-block bg-seoul-red text-white font-bold text-lg px-8 py-4 border-2 border-seoul-black shadow-[5px_5px_0_#0a0a0f] hover:shadow-[8px_8px_0_#0a0a0f] hover:-translate-x-1 hover:-translate-y-1 transition-all"
            >
              📥 Descargar la guía (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Interactive pronunciation board */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <HangulBoard />
      </section>

      {/* Related: pronunciation tool */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <p className="text-center text-xs font-bold tracking-[3px] uppercase text-gray-400 mb-6">
          Practica la pronunciación
        </p>
        <Link
          href="/generador-nombre"
          className="group block border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] hover:shadow-[10px_10px_0_#C8001E] hover:border-seoul-red hover:-translate-x-1 hover:-translate-y-1 transition-all p-7 md:p-8"
        >
          <div className="flex items-start gap-5">
            <span
              className="text-5xl md:text-6xl font-black text-seoul-red leading-none"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              소리
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-seoul-black leading-tight mb-2 group-hover:text-seoul-red transition-colors">
                Tu nombre en 한글 (con pronunciación)
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Escribe tu nombre, míralo en coreano y escúchalo con voz coreana.
                La forma más divertida de oír cómo suena el hangul.
              </p>
              <div className="mt-4 text-seoul-red font-bold text-sm">
                Probar ahora →
              </div>
            </div>
          </div>
        </Link>

        <p className="text-center text-gray-400 text-sm mt-12">
          Más recursos muy pronto. 화이팅 chingu! 🇰🇷
        </p>
      </section>

      <Footer />
    </main>
  );
}
