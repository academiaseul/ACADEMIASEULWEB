import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coreano Nivel 1 (A1) · Primeras Palabras — Academia Seúl',
  description:
    'Curso de coreano desde cero: 11 sesiones en vivo por Zoom, Método Chingu, grupos pequeños. Próxima cohorte: octubre 2026 — anotate en la lista de espera y recibe primero horarios y precio.',
  alternates: { canonical: '/nivel-1' },
  openGraph: {
    title: 'Coreano Nivel 1 (A1) · Primeras Palabras — Academia Seúl',
    description:
      '11 sesiones en vivo · De cero a leer y conversar en coreano · Próxima cohorte: octubre 2026.',
    url: 'https://www.academiaseul.com/nivel-1',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl · Nivel 1 (A1) Primeras Palabras' }],
  },
};

export default function Nivel1Layout({ children }: { children: React.ReactNode }) {
  return children;
}
