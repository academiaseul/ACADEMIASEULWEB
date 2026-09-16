import type { Metadata } from "next";
import RecursosContent from "@/components/RecursosContent";

export const metadata: Metadata = {
  title: "Recursos gratis para aprender coreano",
  description:
    "Recursos gratuitos de Academia Seúl: Lector de Hangul interactivo, guías descargables (Alfabeto y Pronunciación), tablero de pronunciación y tu nombre en coreano con audio.",
  alternates: { canonical: "https://www.academiaseul.com/recursos" },
  openGraph: {
    title: "Recursos gratis para aprender coreano · Academia Seúl",
    description: "Lector de Hangul, guías PDF, pronunciación con audio, tu nombre en coreano y juegos. Gratis.",
    url: "https://www.academiaseul.com/recursos",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

export default function RecursosPage() {
  return <RecursosContent />;
}
