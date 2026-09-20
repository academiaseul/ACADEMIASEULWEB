"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useT, i18n } from "@/lib/i18n";

const cards = [
  {
    href: "/dubu",
    korean: "두부",
    title: i18n("Dubu · el puzzle del Hangul"),
    desc:
      i18n("Combina consonante + vocal en un tablero de 2×2 o 3×3 y forma la palabra que lees o que escuchas. 30 niveles, 6 barrios de Seúl, voz nativa y entrenamiento del oído."),
    cta: i18n("Jugar a Dubu"),
    external: true,
  },
  {
    href: "/lector-hangul",
    korean: "한글",
    title: i18n("Lector de Hangul"),
    desc:
      i18n("Aprende a leer el alfabeto coreano con la lógica del 훈민정음: lecciones interactivas, constructor de sílabas y práctica con audio de voz nativa que cambia en cada ronda."),
    cta: i18n("Aprender a leer"),
    external: true,
  },
  {
    href: "/recursos/guias",
    korean: "가이드",
    title: i18n("Guías"),
    desc:
      i18n("Descarga gratis la Guía del Alfabeto (한글) y la Guía de Pronunciación coreana. PDFs listos para imprimir y estudiar."),
    cta: i18n("Ver guías"),
  },
  {
    href: "/recursos/pronunciacion",
    korean: "발음",
    title: i18n("Pronunciación coreana"),
    desc:
      i18n("Tablero interactivo: haz clic en cada consonante, vocal y palabra para escuchar su sonido en coreano. Gratis y desde el navegador."),
    cta: i18n("Practicar pronunciación"),
  },
  {
    href: "/generador-nombre",
    korean: "이름",
    title: i18n("Tu nombre en coreano"),
    desc:
      i18n("Escribe tu nombre, míralo en hangul y escúchalo con voz coreana. Descárgalo como imagen para compartir."),
    cta: i18n("Crear mi nombre"),
  },
  {
    href: "/#juego",
    korean: "놀이",
    title: i18n("Torpedo Coreano"),
    desc:
      i18n("Un juego rápido de vocabulario y gramática de Básico 1 (A1.1): saludos, partículas, familia y más. Ocho preguntas para poner a prueba lo que ya sabes."),
    cta: i18n("Jugar ahora"),
  },
  {
    href: "/hangul-dle",
    korean: "매일",
    title: "Hangul-dle",
    desc:
      i18n("Nuestro Wordle coreano: adivina la palabra del día en 6 intentos. Una palabra nueva cada 24 horas, con racha incluida."),
    cta: i18n("Jugar hoy"),
  },
];

export default function RecursosContent() {
  const { t } = useT();

  return (
    <main className="min-h-screen bg-[#F4F7FF]">
      <Navigation solid />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12 px-6 md:px-12 text-center">
        <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
          자료 · {t("Recursos gratis")}
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-seoul-black mb-4">
          {t("Aprende coreano")} <span className="text-seoul-red">{t("desde cero")}</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          {t("Todo gratis para empezar hoy: guías descargables, pronunciación con audio y tu nombre en coreano.")}
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => {
          const cardClass =
            "group flex flex-col border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] hover:shadow-[10px_10px_0_#3D2EE8] hover:border-seoul-red hover:-translate-x-1 hover:-translate-y-1 transition-all p-7";
          const inner = (
            <>
              <span
                className="text-5xl font-black text-seoul-red leading-none mb-4"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {c.korean}
              </span>
              <h2 className="text-2xl font-black text-seoul-black mb-3 group-hover:text-seoul-red transition-colors">
                {t(c.title)}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">{t(c.desc)}</p>
              <span className="mt-5 text-seoul-red font-bold text-sm">{t(c.cta)} →</span>
            </>
          );
          return "external" in c && c.external ? (
            <a key={c.href} href={c.href} className={cardClass}>
              {inner}
            </a>
          ) : (
            <Link key={c.href} href={c.href} className={cardClass}>
              {inner}
            </Link>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}
