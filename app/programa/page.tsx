import type { Metadata } from "next";
import ProgramaContent from "@/components/ProgramaContent";

export const metadata: Metadata = {
  title: "Programa y syllabus · Cursos de coreano en vivo",
  description:
    "Programa completo de los cursos en vivo de Academia Seúl: Básico 1 (A1.1), Básico 2 (A1.2), Conversacional 1 (A2.1), TOPIK II y Coreano para Niños. 8 semanas, 60 min por clase, certificado incluido. US$150 el curso completo · o 2 cuotas de US$75. Básico 1 abre el martes 10 de noviembre de 2026.",
  alternates: { canonical: "https://www.academiaseul.com/programa" },
  openGraph: {
    title: "Programa de cursos — Academia Seúl",
    description: "Syllabus semana a semana de cada curso, horarios en tu país y precios. 8 semanas · certificado incluido · US$150 el curso completo · o 2 cuotas de US$75. Básico 1 abre el 10 de noviembre.",
    url: "https://www.academiaseul.com/programa",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl · Programa de cursos" }],
  },
};

export default function ProgramaPage() {
  return <ProgramaContent />;
}
