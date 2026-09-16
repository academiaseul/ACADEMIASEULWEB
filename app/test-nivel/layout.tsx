import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test de nivel de coreano gratis',
  description:
    'Descubre en 2 minutos qué curso de coreano te conviene: Básico 1, Básico 2, Conversacional 1 o TOPIK II. Gratis, sin registro.',
  alternates: { canonical: '/test-nivel' },
  openGraph: {
    title: 'Test de nivel de coreano gratis — Academia Seúl',
    description: 'Descubre en 2 minutos qué curso de coreano te conviene: Básico 1, Básico 2, Conversacional 1 o TOPIK II. Gratis, sin registro.',
    url: 'https://www.academiaseul.com/test-nivel',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
