import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

// ⚠️ Lunes 9 de noviembre: quitar de esta metadata la mención del precio de lanzamiento y redesplegar
// (el HTML estático y las vistas previas de WhatsApp/Instagram no cambian solas).
export const metadata: Metadata = {
  title: 'Básico 1 · Coreano desde cero en vivo · desde el 10 de noviembre',
  description:
    'Básico 1 (A1.1) con Kiran: coreano desde cero, 8 martes en vivo por Zoom desde el 10 de noviembre de 2026, 20:00 hora de Chile, 60 min por clase, certificado incluido. US$150 el curso completo · o 2 cuotas de US$75 (precio de lanzamiento: US$120 el curso completo · o 2 cuotas de US$60 hasta el domingo 8 de noviembre). Matrícula hasta el lunes 9 de noviembre.',
  alternates: { canonical: '/nivel-1' },
  openGraph: {
    title: 'Básico 1 · Coreano desde cero · desde el 10 de noviembre — Academia Seúl',
    description:
      'Lee y escribe 한글 y preséntate en coreano: 8 martes en vivo con Kiran desde el 10 de noviembre · certificado incluido · precio de lanzamiento hasta el domingo 8 de noviembre.',
    url: 'https://www.academiaseul.com/nivel-1',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl · Básico 1 · coreano desde cero' }],
  },
};

export default function Nivel1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  );
}
