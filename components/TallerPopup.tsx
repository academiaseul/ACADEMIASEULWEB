'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { events } from '@/lib/analytics';

const STORAGE_KEY = 'taller_popup_dismissed_v1';
const SHOW_AFTER_MS = 15000;
const EXCLUDED_PATHS = ['/taller', '/notificarme'];

const TIMEZONES = [
  { flag: 'MX', country: 'México',    time: '18:00' },
  { flag: 'CO', country: 'Colombia',  time: '19:00' },
  { flag: 'PE', country: 'Perú',      time: '19:00' },
  { flag: 'CL', country: 'Chile',     time: '20:00' },
  { flag: 'AR', country: 'Argentina', time: '20:00' },
  { flag: 'ES', country: 'España',    time: '01:00*' },
];

const FLAG_EMOJI: Record<string, string> = {
  MX: '\u{1F1F2}\u{1F1FD}',
  CO: '\u{1F1E8}\u{1F1F4}',
  PE: '\u{1F1F5}\u{1F1EA}',
  CL: '\u{1F1E8}\u{1F1F1}',
  AR: '\u{1F1E6}\u{1F1F7}',
  ES: '\u{1F1EA}\u{1F1F8}',
};

export default function TallerPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (EXCLUDED_PATHS.some((p) => pathname?.startsWith(p))) return;

    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;
    } catch {
      // ignore
    }

    let exitHandler: ((e: MouseEvent) => void) | null = null;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, SHOW_AFTER_MS);

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
      // ignore
    }
  };

  const handleCtaClick = () => {
    events.popupCtaClick();
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-seoul-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md max-h-[92vh] overflow-y-auto pointer-events-auto rounded-2xl border border-white/10"
              style={{
                background:
                  'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(200,0,30,0.18) 0%, transparent 60%), #0f0f1a',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              <div className="px-7 py-8 text-center">
                <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-seoul-red bg-seoul-red/10 border border-seoul-red/30 px-3 py-1.5 rounded-full mb-5">
                  Taller gratuito
                </span>

                <div
                  aria-hidden
                  className="font-korean font-black text-seoul-red leading-none select-none mb-2"
                  style={{ fontSize: '3.25rem', letterSpacing: '-0.05em' }}
                >
                  {'한글'}
                </div>

                <h2 className="font-serif text-3xl md:text-4xl text-seoul-white leading-tight">
                  Aprende a leer
                  <br />
                  <span className="text-gradient-red">coreano</span> en 1 hora
                </h2>

                <p className="pt-4 text-sm text-white/55 leading-relaxed max-w-xs mx-auto">
                  Taller en vivo por Zoom, 100% gratuito. Se parte de la primera cohorte de Academia Seul.
                </p>

                <div className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10">
                  <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                    Sabado
                  </span>
                  <span className="text-base font-bold text-seoul-white">6 de junio</span>
                </div>

                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-4">
                    Horario por pais
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {TIMEZONES.map((tz) => (
                      <div
                        key={tz.country}
                        className="flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg bg-white/[0.025] border border-white/[0.05]"
                      >
                        <span className="text-xl leading-none mb-1">{FLAG_EMOJI[tz.flag]}</span>
                        <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">
                          {tz.country}
                        </span>
                        <span className="text-sm text-white/90 font-bold tabular-nums">
                          {tz.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/35 mt-3 italic">
                    *Espana: 01:00 del domingo (replay disponible 48h)
                  </p>
                </div>

                <Link
                  href="/taller"
                  onClick={handleCtaClick}
                  className="group mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-seoul-red hover:bg-seoul-red-muted text-white font-bold text-sm rounded-xl transition-all duration-300"
                >
                  <span>Reservar mi cupo gratis</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">{'->'}</span>
                </Link>
                <button
                  onClick={handleClose}
                  className="block mx-auto mt-3 text-white/40 hover:text-white/70 text-xs font-medium tracking-wide transition-colors"
                >
                  No, gracias - quizas otra vez
                </button>
              </div>

              <div
                aria-hidden
                className="absolute bottom-0 right-0 font-korean font-black text-white/[0.025] leading-none select-none pointer-events-none translate-x-4 translate-y-4"
                style={{ fontSize: '7rem' }}
              >
                {'무료'}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
