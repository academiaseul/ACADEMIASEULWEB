import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recursos gratis para aprender coreano | Academia Seúl",
  description:
    "Recursos gratuitos de Academia Seúl: guías descargables (Alfabeto y Pronunciación), tablero de pronunciación interactivo y tu nombre en coreano con audio.",
  alternates: { canonical: "https://www.academiaseul.com/recursos" },
};

const cards = [
  {
    href: "/recursos/guias",
    korean: "가이드",
    title: "Guías",
    desc:
      "Descarga gratis la Guía del Alfabeto (한글) y la Guía de Pronunciación coreana. PDFs listos para imprimir y estudiar.",
    cta: "Ver guías",
  },
  {
    href: "/recursos/pronunciacion",
    korean: "발음",
    title: "Pronunciación coreana",
    desc:
      "Tablero interactivo: haz clic en cada consonante, vocal y palabra para escuchar su sonido en coreano. Gratis y desde el navegador.",
    cta: "Practicar pronunciación",
  },
  {
    href: "/generador-nombre",
    korean: "이름",
    title: "Tu nombre en coreano",
    desc:
      "Escribe tu nombre, míralo en hangul y escúchalo con voz coreana. Descárgalo como imagen para compartir.",
    cta: "Crear mi nombre",
  },
  {
    href: "/#juego",
    korean: "놀이",
    title: "Torpedo Coreano",
    desc:
      "Un juego rápido de vocabulario y gramática de Nivel 1: saludos, partículas, familia y más. Ocho preguntas para poner a prueba lo que ya sabés.",
    cta: "Jugar ahora",
  },
  {
    href: "/hangul-dle",
    korean: "매일",
    title: "Hangul-dle",
    desc:
      "Nuestro Wordle coreano: adivina la palabra del día en 6 intentos. Una palabra nueva cada 24 horas, con racha incluida.",
    cta: "Jugar hoy",
  },
];

export default function RecursosPage() {
  return (
    <main className="min-h-screen bg-[#F4F7FF]">
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
          Todo gratis para empezar hoy: guías descargables, pronunciación con
          audio y tu nombre en coreano.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] hover:shadow-[10px_10px_0_#3D2EE8] hover:border-seoul-red hover:-translate-x-1 hover:-translate-y-1 transition-all p-7"
          >
            <span
              className="text-5xl font-black text-seoul-red leading-none mb-4"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              {c.korean}
            </span>
            <h2 className="text-2xl font-black text-seoul-black mb-3 group-hover:text-seoul-red transition-colors">
              {c.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm flex-1">{c.desc}</p>
            <span className="mt-5 text-seoul-red font-bold text-sm">{c.cta} →</span>
          </Link>
        ))}
      </section>

      <Footer />
    </main>
  );
}
