"use client";

import { useT } from "@/lib/i18n";

// Banners de la home (cliente para poder traducirlos con t()).
export function RecursoBanner() {
  const { t } = useT();
  return (
    <section className="bg-[#F4F7FF] border-y border-black/[0.06]">
      <div className="container-tight py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <span className="text-3xl">📄</span>
          <div>
            <div className="text-seoul-black font-bold text-base">
              {t("Guía del alfabeto coreano (한글) — gratis")}
            </div>
            <p className="text-seoul-black/55 text-sm">
              {t("Descárgala y aprende a leer desde cero, junto a más recursos gratuitos.")}
            </p>
          </div>
        </div>
        <a
          href="/recursos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm whitespace-nowrap"
        >
          {t("Ver recursos gratis →")}
        </a>
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
