"use client";

import { useT } from "@/lib/i18n";

// Banners de la home (cliente para poder traducirlos con t()).
export function RecursoBanner() {
  const { t } = useT();
  const tiles = [
    { emoji: "🧩", title: t("Dubu · el puzzle del Hangul"), desc: t("Combina consonante + vocal y forma la palabra que lees o que escuchas. 30 niveles con voz nativa."), cta: t("Jugar a Dubu →"), href: "/dubu" },
    { emoji: "🔤", title: t("Lector de Hangul"), desc: t("Aprende a leer 한글 con audio de voz nativa, directo en tu navegador."), cta: t("Abrir el Lector →"), href: "/lector-hangul" },
    { emoji: "📝", title: t("Test de nivel"), desc: t("Descubre en qué peldaño empiezas."), cta: t("Hacer el test →"), href: "/test-nivel" },
    { emoji: "📄", title: t("Guía del alfabeto coreano (PDF)"), desc: t("Descárgala y empieza a leer desde cero."), cta: t("Ver recursos gratis →"), href: "/recursos" },
  ];
  return (
    <section id="recursos" className="bg-white border-y border-black/[0.06]">
      <div className="container-tight py-16 md:py-20">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
            {t("Gratis, sin inscribirte")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-seoul-black leading-tight">{t("Empieza gratis hoy")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((tile) => (
            <a
              key={tile.href}
              href={tile.href}
              className="glass-light rounded-2xl p-6 flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "0 6px 24px rgba(10,10,40,0.06)" }}
            >
              <span className="text-3xl">{tile.emoji}</span>
              <span className="font-bold text-seoul-black">{tile.title}</span>
              <span className="text-sm text-seoul-black/65 leading-relaxed flex-1">{tile.desc}</span>
              <span className="text-sm font-semibold mt-1" style={{ color: "var(--as-azul-txt)" }}>{tile.cta}</span>
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm">
          <a href="/blog" className="underline underline-offset-4 text-seoul-black/60 hover:text-seoul-red">{t("Lee sobre cultura coreana en el blog →")}</a>
        </p>
      </div>
    </section>
  );
}

export function BannerInferior() {
  const { t } = useT();
  return (
    <section style={{ backgroundColor: '#3D2EE8' }} className="text-white">
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="text-3xl md:text-4xl font-black">Academia Seúl</div>
          <p className="text-white/80 mt-1">
            {t("Aprende coreano con un")} <span className="font-bold">chingu</span>. {t("¿Tienes dudas? Hablemos.")}
          </p>
        </div>
        <a
          href={"https://wa.me/56942115562?text=" + encodeURIComponent(t("Hola Jay! Vi academiaseul.com y quiero información sobre los cursos de coreano."))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-[#3D2EE8] font-bold px-8 py-4 rounded-full hover:bg-[#E8B84B] hover:text-[#0D0D0D] transition-colors"
        >
          {t("💬 Escribir a Jay por WhatsApp →")}
        </a>
      </div>
    </section>
  );
}
