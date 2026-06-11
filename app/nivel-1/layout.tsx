import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coreano Nivel 1 (A1) · Primeras Palabras — Promo de lanzamiento $89',
  description:
    'Curso de coreano desde cero: 11 sesiones en vivo por Zoom, Método Chingu, grupos pequeños. Clases martes, jueves y sábado. Promo de lanzamiento $89 USD hasta el 6 de julio.',
  alternates: { canonical: '/nivel-1' },
  openGraph: {
    title: 'Coreano Nivel 1 (A1) · Primeras Palabras — Academia Seúl',
    description:
      '11 sesiones en vivo · De cero a leer y conversar en coreano · Promo de lanzamiento $89 USD hasta el 6 de julio.',
    url: 'https://www.academiaseul.com/nivel-1',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl · Nivel 1 (A1) Primeras Palabras' }],
  },
};

export default function Nivel1Layout({ children }: { children: React.ReactNode }) {
  return children;
}
