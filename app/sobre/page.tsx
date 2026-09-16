import type { Metadata } from "next";
import SobreContent from "@/components/SobreContent";

export const metadata: Metadata = {
  title: "Mi historia — Jay (김재희), fundador",
  description:
    "La historia de Jay Kim, fundador de Academia Seúl: de little Kim en Seúl a profesor en Chile. Por qué creó la primera academia de coreano pensada para hispanohablantes.",
  alternates: { canonical: "https://www.academiaseul.com/sobre" },
  openGraph: {
    title: "Mi historia — Jay (김재희), fundador de Academia Seúl",
    description: "De little Kim en Seúl a profesor en Chile: por qué creé la primera academia de coreano pensada para hispanohablantes.",
    url: "https://www.academiaseul.com/sobre",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl" }],
  },
};

export default function SobrePage() {
  return <SobreContent />;
}
