import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taller gratis de Hangul (video) · Aprende a leer coreano en 1 hora',
  description:
    'La clase completa de Hangul con Jay Chingu, grabada en vivo y gratis: consonantes, vocales y cómo se forman las sílabas. Lee tu primera palabra en coreano antes de que termine el video.',
  alternates: { canonical: '/taller' },
  openGraph: {
    title: 'Taller gratis de Hangul (video) — Academia Seúl',
    description: 'Aprende a leer coreano en 1 hora con la clase completa grabada en vivo. Gratis, sin cuenta.',
    url: 'https://www.academiaseul.com/taller',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl · Taller gratis de Hangul' }],
  },
};

export default function TallerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
