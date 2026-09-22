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
  // Apps estáticas de un solo archivo: Lector de Hangul (public/lector-coreano) y Dubu (public/dubu).
  async rewrites() {
    return [
      { source: '/lector-coreano', destination: '/lector-coreano/index.html' },
      { source: '/dubu', destination: '/dubu/index.html' },
    ];
  },
  async redirects() {
    return [
      // URL oficial del Lector desde el 22 sept 2026: /lector-coreano. Alias y URLs viejas redirigen.
      { source: '/coreano', destination: '/lector-coreano', permanent: true },
      { source: '/lector', destination: '/lector-coreano', permanent: true },
      { source: '/lector-hangul', destination: '/lector-coreano', permanent: true },
      { source: '/lectorhangul', destination: '/lector-coreano', permanent: true },
      { source: '/lectorcoreano', destination: '/lector-coreano', permanent: true },
    ];
  },
};

export default nextConfig;