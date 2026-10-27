import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lista de espera · próximos cursos de coreano',
  description:
    'Déjanos tus datos y te avisamos cuando abra el próximo curso de Academia Seúl: Conversacional 1, TOPIK II, Coreano para Niños y Conversacional 2 vuelven en enero de 2027.',
  alternates: { canonical: '/notificarme' },
  openGraph: {
    title: 'Lista de espera · próximos cursos de coreano — Academia Seúl',
    description: 'Déjanos tus datos y te avisamos cuando abra el próximo curso de Academia Seúl: Conversacional 1, TOPIK II, Coreano para Niños y Conversacional 2 vuelven en enero de 2027.',
    url: 'https://www.academiaseul.com/notificarme',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl' }],
  },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
