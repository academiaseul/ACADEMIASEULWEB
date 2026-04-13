import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Academia Seúl | Aprende Coreano en Santiago de Chile',
  description:
    'La academia de coreano más premium de Santiago. Clases presenciales y online para todos los niveles. Profesores nativos, metodología moderna y certificación TOPIK.',
  keywords: [
    'academia coreano santiago',
    'clases coreano chile',
    'aprender coreano',
    'coreano santiago',
    'TOPIK chile',
    'k-pop aprender coreano',
    'korean academy',
  ],
  openGraph: {
    title: 'Academia Seúl | Aprende Coreano en Santiago',
    description: 'La academia de coreano más premium de Santiago de Chile.',
    type: 'website',
    locale: 'es_CL',
    siteName: 'Academia Seúl',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-seoul-black antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
