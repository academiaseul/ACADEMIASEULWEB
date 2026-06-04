import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coreano Básico A1 · Nivel 1 — Promo de lanzamiento $89',
  description:
    'Curso de coreano desde cero: 11 sesiones en vivo por Zoom, 10 semanas, método Korea Foundation. Cohortes martes, jueves y sábado. Promo de lanzamiento $89 USD hasta el 30 de junio.',
  alternates: { canonical: '/nivel-1' },
  openGraph: {
    title: 'Coreano Básico A1 · Nivel 1 — Academia Seúl',
    description:
      '11 sesiones en vivo · De cero a leer y conversar en coreano · Promo de lanzamiento $89 USD hasta el 30 de junio.',
    url: 'https://www.academiaseul.com/nivel-1',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl · Nivel 1' }],
  },
};

export default function Nivel1Layout({ children }: { children: React.ReactNode }) {
  return children;
}
