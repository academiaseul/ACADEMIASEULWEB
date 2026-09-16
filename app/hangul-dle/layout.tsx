import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hangul-dle · el Wordle coreano diario',
  description:
    'Adivina la palabra coreana del día en 6 intentos. Juego gratis de vocabulario básico con racha diaria, de Academia Seúl.',
  alternates: { canonical: '/hangul-dle' },
  openGraph: {
    title: 'Hangul-dle · el Wordle coreano diario — Academia Seúl',
    description: 'Adivina la palabra coreana del día en 6 intentos. Juego gratis de vocabulario básico con racha diaria, de Academia Seúl.',
    url: 'https://www.academiaseul.com/hangul-dle',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
