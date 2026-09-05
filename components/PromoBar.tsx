'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// Barra de anuncio: Lector de Hangul (herramienta gratuita).
// Sin fecha límite; el visitante puede cerrarla y no vuelve a aparecer.
export default function PromoBar() {
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem('lectorBarClosed') === '1') setClosed(true);
    } catch {}
  }, []);

  if (!mounted || closed) return null;

  const close = () => {
    setClosed(true);
    try {
      localStorage.setItem('lectorBarClosed', '1');
    } catch {}
  };

  return (
    <div className="w-full" style={{ backgroundColor: '#4236F6' }}>
      <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-x-4 gap-y-1 flex-wrap px-4 py-2 pr-12 text-white">
        <span className="text-sm font-bold">
          🐯 Nuevo y gratis · <span className="text-[#E8B84B]">Lector de Hangul</span> — aprende a leer coreano con audio nativo
        </span>

        <a
          href="/lector-hangul"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#4236F6] hover:bg-[#E8B84B] hover:text-[#0D0D0D] transition-colors"
        >
          Probar ahora →
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
