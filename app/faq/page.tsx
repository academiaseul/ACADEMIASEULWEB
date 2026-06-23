import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { faqs } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Preguntas frecuentes (FAQ) | Academia Seúl",
  description:
    "Resolvemos todas tus dudas sobre las clases de coreano de Academia Seúl: niveles, precios, horarios, pagos, certificado y más.",
  alternates: { canonical: "https://www.academiaseul.com/faq" },
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-[#F4F7FF]">
      <Navigation solid />

      <section className="pt-32 md:pt-40 pb-12 px-6 text-center">
        <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
          질문 · Preguntas frecuentes
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-seoul-black mb-4">
          Todo lo que <span className="text-seoul-red">quieres saber</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Si después de leer esto te queda alguna duda, escríbenos: te
          respondemos personalmente.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl bg-white border-2 border-seoul-black/10 open:border-seoul-red/50 transition-colors"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 text-seoul-black font-bold text-base md:text-lg">
              <span>{f.q}</span>
              <ChevronDown
                size={20}
                className="flex-shrink-0 text-seoul-red transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <p className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-gray-600 leading-relaxed text-sm md:text-base">
              {f.a}
            </p>
          </details>
        ))}
      </section>

      <section className="text-center pb-24 px-6">
        <p className="text-gray-500 text-sm mb-4">¿Tienes otra duda?</p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-seoul-red hover:bg-seoul-red-muted text-white font-bold rounded-lg transition-all duration-300 text-sm"
        >
          Escríbenos →
        </a>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
