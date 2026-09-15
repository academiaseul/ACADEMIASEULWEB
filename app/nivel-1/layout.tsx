import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursos de coreano en vivo · Matrícula octubre 2026 — Academia Seúl',
  description:
    'Matrícula abierta: Coreano para Niños, Básico 1 y 2, Conversacional A2.1 y TOPIK II. 8 semanas en vivo por Zoom, 60 min por clase, certificado incluido. US$150 o US$75/mes. Inicio 5 de octubre de 2026.',
  alternates: { canonical: '/nivel-1' },
  openGraph: {
    title: 'Cursos de coreano en vivo · Matrícula octubre 2026 — Academia Seúl',
    description:
      '8 semanas en vivo · desde cero hasta TOPIK II · certificado incluido · US$150 o US$75/mes · inicio 5 de octubre de 2026.',
    url: 'https://www.academiaseul.com/nivel-1',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl · Cursos de coreano octubre 2026' }],
  },
};

export default function Nivel1Layout({ children }: { children: React.ReactNode }) {
  return children;
}
