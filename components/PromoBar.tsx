'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PRECIO_UNICO, PRECIO_MENSUAL, MESES } from '@/lib/nivel1';

// Barra de anuncio: matrícula abierta cohorte octubre 2026.
// El visitante puede cerrarla y no vuelve a aparecer (clave nueva por campaña).
export default function PromoBar() {
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem('oct2026BarClosed') === '1') setClosed(true);
    } catch {}
  }, []);

  if (!mounted || closed) return null;

  const close = () => {
    setClosed(true);
    try {
      localStorage.setItem('oct2026BarClosed', '1');
    } catch {}
  };

  return (
    <div className="w-full" style={{ backgroundColor: '#4236F6' }}>
      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-x-4 gap-y-1 flex-wrap px-4 py-2 pr-12 text-white">
        <a href="/nivel-1#clases" className="text-sm font-bold sm:pointer-events-none">
          🎓 Matrícula abierta · <span className="text-[#E8B84B]">clases desde <span className="sm:hidden">el</span><span className="hidden sm:inline">la semana del</span> 5 de octubre</span>
          <span className="hidden md:inline"> — US${PRECIO_UNICO} el curso (o {MESES} × US${PRECIO_MENSUAL}) · mismo precio en todos los niveles</span>
          <span className="sm:hidden"> →</span>
        </a>

        <a
          href="/nivel-1#clases"
          className="hidden sm:inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#4236F6] hover:bg-[#E8B84B] hover:text-[#0D0D0D] transition-colors"
        >
          Elegir mi clase →
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
