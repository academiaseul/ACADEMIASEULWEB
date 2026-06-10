'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// Cierre de la promo: 6 de julio 2026, 23:59 hora Chile
const DEADLINE = new Date('2026-07-06T23:59:00-04:00').getTime();

function daysLeft() {
  const d = DEADLINE - Date.now();
  if (d <= 0) return null;
  return Math.ceil(d / 86400000);
}

export default function PromoBar() {
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem('promoBarClosed') === '1') setClosed(true);
    } catch {}
    setDays(daysLeft());
    const id = setInterval(() => setDays(daysLeft()), 60000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || closed || days === null) return null;

  const close = () => {
    setClosed(true);
    try {
      localStorage.setItem('promoBarClosed', '1');
    } catch {}
  };

  const cierre = days <= 1 ? 'Último día' : `Cierra en ${days} días`;

  return (
    <div className="w-full" style={{ backgroundColor: '#3D2EE8' }}>
      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-x-4 gap-y-1 flex-wrap px-4 py-2 pr-12 text-white">
        <span className="text-sm font-bold">
          🔥 Promo de lanzamiento · Nivel 1 <span className="text-[#E8B84B]">$89&nbsp;USD</span> · Cupos limitados
        </span>

        <span className="hidden sm:inline text-xs font-semibold bg-white/15 rounded-md px-2 py-1">
          {cierre} · hasta el 6 jul
        </span>

        <a
          href="/nivel-1"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#3D2EE8] hover:bg-[#E8B84B] hover:text-[#0D0D0D] transition-colors"
        >
          Reserva tu cupo →
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
