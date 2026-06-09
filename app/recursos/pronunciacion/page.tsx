import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HangulBoard from "@/components/HangulBoard";

export const metadata: Metadata = {
  title: "Pronunciación coreana interactiva | Academia Seúl",
  description:
    "Aprende a pronunciar el coreano: haz clic en cada consonante, vocal y palabra para escuchar su sonido en coreano. Tablero interactivo gratis de Academia Seúl.",
  alternates: { canonical: "https://www.academiaseul.com/recursos/pronunciacion" },
};

export default function PronunciacionPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <Navigation solid />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-10 px-6 md:px-12 text-center">
        <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
          발음 · Pronunciación coreana
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-seoul-black mb-4">
          Escucha cómo suena el <span className="text-seoul-red">한글</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Haz clic en cualquier letra o palabra y escúchala en coreano. La forma
          más rápida de entrenar tu oído desde el primer día.
        </p>
      </section>

      {/* Board */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <HangulBoard />
      </section>

      {/* Cross-link to guide */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <p className="text-gray-600 mb-4">
          ¿Quieres tenerlo a mano? Descarga la guía con todas las letras.
        </p>
        <Link
          href="/recursos/guias"
          className="inline-block bg-white text-seoul-black font-bold px-7 py-3 border-2 border-seoul-black shadow-[5px_5px_0_#C8001E] hover:-translate-x-1 hover:-translate-y-1 transition-all"
        >
          Ver las guías →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
