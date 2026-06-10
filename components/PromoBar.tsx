'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// Fin de la promo: 30 de junio 2026, 23:59 hora Chile
const DEADLINE = new Date('2026-06-30T23:59:00-04:00').getTime();

function diff() {
  const d = DEADLINE - Date.now();
  if (d <= 0) return null;
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export default function PromoBar() {
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const [t, setT] = useState<ReturnType<typeof diff>>(null);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem('promoBarClosed') === '1') setClosed(true);
    } catch {}
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || closed || !t) return null;

  const close = () => {
    setClosed(true);
    try {
      localStorage.setItem('promoBarClosed', '1');
    } catch {}
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="fixed inset-x-0 bottom-0 z-40" style={{ backgroundColor: '#3D2EE8' }}>
      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-x-4 gap-y-1 flex-wrap px-4 py-2.5 pr-12 text-white">
        <span className="text-sm font-bold">
          🔥 Promo lanzamiento · Nivel 1 a <span className="text-[#E8B84B]">$89</span>{' '}
          <span className="line-through opacity-60 font-normal">$129</span>
        </span>

        <span className="hidden sm:inline text-xs font-mono bg-white/15 rounded-md px-2 py-1">
          Termina en {t.days}d {pad(t.hours)}:{pad(t.minutes)}:{pad(t.seconds)}
        </span>

        <a
          href="/nivel-1"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#3D2EE8] hover:bg-[#E8B84B] hover:text-[#0D0D0D] transition-colors"
        >
          Inscríbete →
        </a>

        <button
          onClick={close}
          aria-label="Cerrar"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
