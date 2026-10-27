'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { CLASE_PRINCIPAL, RITMO_LABEL } from '@/lib/nivel1';
import { usePrecio } from '@/lib/campana';
import PrecioCampana from '@/components/PrecioCampana';
import { useT } from '@/lib/i18n';

// Barra de anuncio: Básico 1 · noviembre 2026 (una oferta, una fecha, un botón).
// El visitante puede cerrarla y no vuelve a aparecer (clave nueva por campaña).
// Se oculta sola cuando cierra la matrícula (lun 9 nov 23:59 Chile).
const CLAVE = 'b1nov2026BarClosed';
export default function PromoBar() {
  const [mounted, setMounted] = useState(false);
  const [closed, setClosed] = useState(false);
  const { t } = useT();
  const precio = usePrecio();

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(CLAVE) === '1') setClosed(true);
    } catch {}
  }, []);

  if (!mounted || closed || !precio.matriculaAbierta) return null;

  const close = () => {
    setClosed(true);
    try {
      localStorage.setItem(CLAVE, '1');
    } catch {}
  };
  const href = `/nivel-1?clase=${CLASE_PRINCIPAL}#clases`;

  return (
    <div className="w-full" style={{ backgroundColor: '#4236F6' }}>
      <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-x-4 gap-y-1 flex-wrap px-4 py-2 pr-12 text-white">
        <a href={href} className="text-sm font-bold sm:pointer-events-none">
          🎓 <span className="sm:hidden">
            {precio.lanzamiento ? t('Básico 1 desde el 10 de noviembre · precio de lanzamiento') : t('Básico 1 desde el 10 de noviembre')} →
          </span>
          <span className="hidden sm:inline">
            {t('Básico 1 · coreano desde cero')} · <span className="text-[#E8B84B]">{t(RITMO_LABEL)}</span>
          </span>
          <span className="hidden lg:inline"> — <PrecioCampana corto conFecha={precio.lanzamiento} tachadoClassName="font-normal text-white/60" /></span>
        </a>

        <a
          href={href}
          className="hidden sm:inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#4236F6] hover:bg-[#E8B84B] hover:text-[#0D0D0D] transition-colors"
        >
          {t('Inscribirme →')}
        </a>

        <button
          onClick={close}
          aria-label={t('Cerrar')}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
