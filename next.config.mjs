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
  // Acceso corto al Lector de Hangul (public/lector-hangul/index.html).
  async rewrites() {
    return [{ source: '/lector-hangul', destination: '/lector-hangul/index.html' }];
  },
  async redirects() {
    return [
      { source: '/coreano', destination: '/lector-hangul', permanent: true },
      { source: '/lector', destination: '/lector-hangul', permanent: true },
    ];
  },
};

export default nextConfig;