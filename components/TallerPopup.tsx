'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'taller_popup_dismissed_v1';
const SHOW_AFTER_MS = 15000; // 15 segundos
const EXCLUDED_PATHS = ['/taller', '/notificarme'];

export default function TallerPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // No mostrar en paginas excluidas
    if (EXCLUDED_PATHS.some((p) => pathname?.startsWith(p))) return;

    // No mostrar si ya lo cerro antes
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;
    } catch {
      // localStorage podria fallar en algunos navegadores, seguir
    }

    let exitHandler: ((e: MouseEvent) => void) | null = null;

    // Timer: aparece despues de 15 segundos
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, SHOW_AFTER_MS);

    // Exit intent: aparece si el mouse sale por arriba (cerrar tab)
    exitHandler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen) {
        setIsOpen(true);
      }
    };
    document.addEventListener('mouseleave', exitHandler);

    return () => {
      clearTimeout(timer);
      if (exitHandler) document.removeEventListener('mouseleave', exitHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // ignorar
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-seoul-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[92%] max-w-md"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10"
              style={{
                background:
                  'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(200,0,30,0.18) 0%, transparent 60%), #0f0f1a',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              {/* Top accent: badge */}
              <div className="pt-7 pb-2 px-7">
                <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-seoul-red bg-seoul-red/10 border border-seoul-red/30 px-3 py-1.5 rounded-full">
                  🎁 Taller gratuito
                </span>
              </div>

              {/* Korean Mark */}
              <div className="px-7 pt-2">
                <div
                  aria-hidden
                  className="font-korean font-black text-seoul-red/60 leading-none select-none"
                  style={{ fontSize: '3.5rem', letterSpacing: '-0.05em' }}
                >
                  한글
                </div>
              </div>

              {/* Title */}
              <div className="px-7 pt-2">
                <h2 className="font-serif text-3xl md:text-4xl text-seoul-white leading-tight">
                  Aprende a leer
                  <br />
                  <span className="text-gradient-red">coreano</span> en 1 hora
                </h2>
              </div>

              {/* Description */}
              <p className="px-7 pt-4 text-sm text-white/55 leading-relaxed">
                Taller en vivo por Zoom, 100% gratuito. Sé parte de la primera cohorte de Academia Seúl.
              </p>

              {/* Details grid */}
              <div className="px-7 pt-5 grid grid-cols-3 gap-3 text-xs">
                <div className="flex flex-col gap-1.5">
                  <Calendar size={14} className="text-seoul-red" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Fecha</div>
                    <div className="text-white/85 font-semibold">7 Junio</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Clock size={14} className="text-seoul-red" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Hora</div>
                    <div className="text-white/85 font-semibold">20:00 CL</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Globe size={14} className="text-seoul-red" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Modo</div>
                    <div className="text-white/85 font-semibold">Zoom · LATAM</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-7 pt-6 pb-7">
                <Link
                  href="/taller"
                  onClick={handleClose}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-seoul-red hover:bg-seoul-red-muted text-white font-bold text-sm rounded-xl transition-all duration-300"
                >
                  <span>Reservar mi cupo gratis</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
                <button
                  onClick={handleClose}
                  className="w-full mt-3 text-white/40 hover:text-white/70 text-xs font-medium tracking-wide transition-colors"
                >
                  No, gracias — quizás otra vez
                </button>
              </div>

              {/* Bottom hangul decoration */}
              <div
                aria-hidden
                className="absolute -bottom-6 -right-6 font-korean font-black text-white/[0.025] leading-none select-none pointer-events-none"
                style={{ fontSize: '8rem' }}
              >
                무료
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
