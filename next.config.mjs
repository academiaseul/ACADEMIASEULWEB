import { existsSync } from 'node:fs';
import { join } from 'node:path';

// PDFs de la campaña «Básico 1 · noviembre 2026». Si el archivo está en public/programas se enlaza;
// si todavía no se exportó, los links cortos caen a /programa y el sitio no muestra el botón de PDF.
const enPublic = (ruta) => existsSync(join(process.cwd(), 'public', ruta));
const PDF_BASICO1 = '/programas/Programa_Basico1_Noviembre_2026.pdf';
const HOJA_BASICO1 = '/programas/Hoja_Basico1_Noviembre_2026.pdf';
const pdfBasico1 = enPublic(PDF_BASICO1) ? PDF_BASICO1 : '';
const hojaBasico1 = enPublic(HOJA_BASICO1) ? HOJA_BASICO1 : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: ['remotion', '@remotion/player', '@remotion/transitions', '@remotion/cli'],
  // lib/nivel1.ts (PROGRAMA_BASICO1_PDF): "" mientras el PDF de Básico 1 de noviembre no exista.
  env: {
    AS_PDF_BASICO1: pdfBasico1,
  },
  // Apps estáticas: Lector de Hangul (public/lector-coreano), Dubu (public/dubu) y 한글 Race (public/hangul-race).
  async rewrites() {
    return [
      { source: '/lector-coreano', destination: '/lector-coreano/index.html' },
      { source: '/dubu', destination: '/dubu/index.html' },
      { source: '/hangul-race', destination: '/hangul-race/index.html' },
    ];
  },
  async redirects() {
    return [
      // URL oficial del Lector desde el 22 sept 2026: /lector-coreano. Alias y URLs viejas redirigen.
      // URL corta para reels, DMs y anuncios: academiaseul.com/inscribete (conserva ?clase=…)
      { source: '/inscribete', destination: '/nivel-1#clases', permanent: false },
      { source: '/inscribirme', destination: '/nivel-1#clases', permanent: false },
      { source: '/inscripcion', destination: '/nivel-1#clases', permanent: false },
      { source: '/matricula', destination: '/nivel-1#clases', permanent: false },
      // Links cortos a los programas, para pegar en DMs y WhatsApp (embudo "¿cuál es el costo?").
      // Modo «Básico 1 · noviembre 2026»: los PDFs de octubre traen fechas vencidas y ya no se enlazan.
      // /p/resumen → hoja de Básico 1 (si se copió a public/programas) · /p/basico1 → programa PDF de noviembre.
      { source: '/p/resumen', destination: hojaBasico1 || pdfBasico1 || '/programa#a11', permanent: false },
      { source: '/p/cursos', destination: '/programa', permanent: false },
      { source: '/p/basico1', destination: pdfBasico1 || '/programa#a11', permanent: false },
      { source: '/p/basico2', destination: '/programa#a12', permanent: false },
      { source: '/p/conversacional1', destination: '/programa#a21', permanent: false },
      { source: '/p/topik2', destination: '/programa#topik2', permanent: false },
      { source: '/p/ninos', destination: '/programa#ninos', permanent: false },
      // El Programa Completo (66 págs., incluye la guía interna de profes) no se manda: /p/completo lleva a la página /programa
      { source: '/p/completo', destination: '/programa', permanent: false },
      { source: '/coreano', destination: '/lector-coreano', permanent: true },
      { source: '/lector', destination: '/lector-coreano', permanent: true },
      { source: '/lector-hangul', destination: '/lector-coreano', permanent: true },
      { source: '/lectorhangul', destination: '/lector-coreano', permanent: true },
      { source: '/lectorcoreano', destination: '/lector-coreano', permanent: true },
    ];
  },
};

export default nextConfig;
