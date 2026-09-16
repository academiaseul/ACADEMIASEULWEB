import type { Metadata } from "next";
import FaqContent from "@/components/FaqContent";

export const metadata: Metadata = {
  title: "Preguntas frecuentes (FAQ)",
  description:
    "Resolvemos todas tus dudas sobre las clases de coreano de Academia Seúl: niveles, precios, horarios, pagos, certificado y más.",
  alternates: { canonical: "https://www.academiaseul.com/faq" },
  openGraph: {
    title: "Preguntas frecuentes · Academia Seúl",
    description: "Niveles, precios, horarios, pagos y certificado de los cursos de coreano en vivo.",
    url: "https://www.academiaseul.com/faq",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

export default function FAQPage() {
  return <FaqContent />;
}
