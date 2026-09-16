import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        seoul: {
          black:      '#0a0a0f',
          dark:       '#0f0f23',
          charcoal:   '#16161f',
          white:      '#fafaf5',
          'off-white':'#f0efe8',
          red:        '#3D2EE8',
          'red-muted':'#2C1FB0',
          blue:       '#003478',
          'blue-mid': '#0050b3',
          gold:       '#D4AF37',
          pink:       '#FFB7C5',
          'pink-deep':'#e8899a',
        },
      },
      fontFamily: {
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif:  ['var(--font-dm-serif)', 'Georgia', 'serif'],
        korean: ['"Noto Sans KR"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float':      'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'marquee':    'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-18px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(66,54,246,0.2)' },
          '50%':      { boxShadow: '0 0 60px rgba(66,54,246,0.5)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
