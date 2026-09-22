"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useT, i18n } from "@/lib/i18n";
import { INICIO_SEMANA, precioLabel } from "@/lib/nivel1";

const destinos = [
  { href: "/nivel-1", emoji: "🎓", title: i18n("Inscripción octubre 2026"), desc: i18n("Elige tu clase, mira tu horario local y reserva tu cupo.") },
  { href: "/dubu", emoji: "🧩", title: i18n("Dubu · el puzzle del Hangul"), desc: i18n("Combina consonante + vocal y lee tu primera palabra. Gratis.") },
  { href: "/lector-coreano", emoji: "🐯", title: i18n("Lector de Hangul"), desc: i18n("Toca cada letra y escúchala con voz nativa. Gratis.") },
  { href: "/taller", emoji: "▶️", title: i18n("Taller gratis de Hangul (video)"), desc: i18n("La clase completa de 1 hora, grabada en vivo.") },
  { href: "/programa", emoji: "📘", title: i18n("Programa y syllabus"), desc: i18n("Qué se aprende semana a semana en cada curso.") },
  { href: "/blog", emoji: "📰", title: i18n("Blog de cultura coreana"), desc: i18n("Hangul, supersticiones, leyendas y vida en Corea.") },
];

export default function NotFound() {
  const { t } = useT();
  return (
    <main className="bg-white min-h-screen">
      <Navigation solid />

      <section className="pt-28 md:pt-36 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[4px] uppercase mb-4" style={{ color: "var(--as-azul-txt)" }}>
            {t("Error 404")}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-4">
            {t("Esta página no existe")}{" "}
            <span className="block text-2xl md:text-4xl mt-2" style={{ color: "var(--as-azul-txt)", fontFamily: "'Noto Sans KR', sans-serif" }}>
              없어요 🐯
            </span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto mb-3">
            {t("Puede que el link esté mal escrito o que la página haya cambiado de dirección. Te dejamos los atajos más usados:")}
          </p>
          <p className="text-sm text-gray-500 mb-10">
            {t("Cohorte octubre 2026 · clases desde {semana}", { semana: t(INICIO_SEMANA) })} · {t(precioLabel())}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {destinos.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="rounded-2xl border-2 border-gray-200 hover:border-[#3D2EE8] p-5 transition-colors bg-white"
              >
                <div className="text-3xl mb-2">{d.emoji}</div>
                <div className="font-bold text-gray-900 mb-1">{t(d.title)}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{t(d.desc)}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm"
              style={{ backgroundColor: "#3D2EE8" }}
            >
              {t("Volver al inicio")} →
            </Link>
            <a
              href="https://wa.me/56942115562"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-gray-200 hover:border-[#3D2EE8] font-bold text-sm text-gray-900"
            >
              {t("Escríbenos por WhatsApp")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
