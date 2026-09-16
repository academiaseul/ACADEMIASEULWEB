import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tu nombre en coreano · generador gratis con audio',
  description:
    'Escribe tu nombre, míralo en hangul, escúchalo con voz coreana y descárgalo como imagen. Herramienta gratuita de Academia Seúl.',
  alternates: { canonical: '/generador-nombre' },
  openGraph: {
    title: 'Tu nombre en coreano · generador gratis con audio — Academia Seúl',
    description: 'Escribe tu nombre, míralo en hangul, escúchalo con voz coreana y descárgalo como imagen. Herramienta gratuita de Academia Seúl.',
    url: 'https://www.academiaseul.com/generador-nombre',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
