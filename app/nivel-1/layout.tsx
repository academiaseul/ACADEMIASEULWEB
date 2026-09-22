import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Cursos de coreano en vivo · Matrícula octubre 2026',
  description:
    'Matrícula abierta: Básico 1 (A1.1), Básico 2 (A1.2), Conversacional 1 (A2.1), TOPIK II (B1+) y Coreano para Niños (8–12). 8 semanas en vivo por Zoom, 60 min por clase, certificado incluido. US$150 el curso completo o 2 cuotas de US$75. Inicio la semana del 12 de octubre de 2026.',
  alternates: { canonical: '/nivel-1' },
  openGraph: {
    title: 'Cursos de coreano en vivo · Matrícula octubre 2026 — Academia Seúl',
    description:
      '8 semanas en vivo · desde cero hasta TOPIK II · certificado incluido · US$150 el curso completo o 2 cuotas de US$75 · inicio la semana del 12 de octubre de 2026.',
    url: 'https://www.academiaseul.com/nivel-1',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl · Cursos de coreano octubre 2026' }],
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
