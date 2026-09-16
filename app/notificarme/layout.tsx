import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lista de espera · próximos cursos de coreano',
  description:
    'Déjanos tus datos y te avisamos cuando abra el próximo curso de Academia Seúl (Conversacional 2 en enero 2027 y nuevas cohortes).',
  alternates: { canonical: '/notificarme' },
  openGraph: {
    title: 'Lista de espera · próximos cursos de coreano — Academia Seúl',
    description: 'Déjanos tus datos y te avisamos cuando abra el próximo curso de Academia Seúl (Conversacional 2 en enero 2027 y nuevas cohortes).',
    url: 'https://www.academiaseul.com/notificarme',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl' }],
  },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
