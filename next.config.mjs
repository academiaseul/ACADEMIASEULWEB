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
      // Links cortos a los programas en PDF, para pegar en DMs y WhatsApp (embudo "¿cuál es el costo?")
      { source: '/p/resumen', destination: '/programas/Hoja_Resumen_Cursos_Octubre_2026.pdf', permanent: false },
      { source: '/p/cursos', destination: '/programas/Programa_Cursos_Octubre_2026.pdf', permanent: false },
      { source: '/p/basico1', destination: '/programas/Programa_Basico1_Octubre_2026.pdf', permanent: false },
      { source: '/p/basico2', destination: '/programas/Programa_Basico2_Octubre_2026.pdf', permanent: false },
      { source: '/p/conversacional1', destination: '/programas/Programa_ConversacionalA21_Octubre_2026.pdf', permanent: false },
      { source: '/p/topik2', destination: '/programas/Programa_TOPIK2_Octubre_2026.pdf', permanent: false },
      { source: '/p/ninos', destination: '/programas/Programa_Ninos_Octubre_2026.pdf', permanent: false },
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