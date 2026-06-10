import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import TallerPopup from '@/components/TallerPopup';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MetaPixel from '@/components/MetaPixel';
import GoogleAnalytics from '@/components/GoogleAnalytics';

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
  metadataBase: new URL('https://www.academiaseul.com'),
  title: {
    default: 'Academia Seúl | Aprende Coreano Online con Clases en Vivo',
    template: '%s | Academia Seúl',
  },
  description:
    'Aprende coreano desde cero con clases en vivo por Zoom. Profesor nativo, grupos pequeños con cupos limitados, método Chingu. Para LATAM y España.',
  keywords: [
    'clases de coreano online',
    'aprender coreano',
    'curso coreano en vivo',
    'academia coreano',
    'coreano para hispanohablantes',
    'TOPIK',
    'hangul',
    'k-pop aprender coreano',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Academia Seúl | Aprende Coreano Online con Clases en Vivo',
    description:
      'Clases de coreano en vivo con profesor nativo. Grupos pequeños, método Korea Foundation. LATAM y España.',
    url: 'https://www.academiaseul.com',
    type: 'website',
    locale: 'es_CL',
    siteName: 'Academia Seúl',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Academia Seúl' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academia Seúl | Aprende Coreano Online',
    description: 'Clases de coreano en vivo con profesor nativo. LATAM y España.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
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
        <TallerPopup />
        <WhatsAppFloat />

        {/* Analytics (cargan solo si las env vars existen) */}
        <Suspense fallback={null}>
          <MetaPixel />
          <GoogleAnalytics />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
