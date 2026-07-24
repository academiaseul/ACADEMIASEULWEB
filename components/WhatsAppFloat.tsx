'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '56942115562';
const DEFAULT_MESSAGE = encodeURIComponent(
  'Hola Jay! Vi tu sitio Academia Seul y tengo una consulta sobre tus cursos de coreano.'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

const QUICK_REPLIES = [
  {
    label: 'Quiero la próxima cohorte del Nivel 1',
    msg: 'Hola Jay! Quiero sumarme a la próxima cohorte del Nivel 1 con el precio de lanzamiento de $89.',
  },
  {
    label: 'Info del Curso Nivel 1',
    msg: 'Hola Jay! Me interesa el Curso Nivel 1. Me pasas info?',
  },
  {
    label: 'Consulta personalizada',
    msg: 'Hola Jay! Tengo una consulta sobre tus cursos de coreano.',
  },
];

const SHOW_AFTER_MS = 4000;

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  const buildUrl = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 pointer-events-none">
          {/* Quick replies panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl overflow-hidden border border-white/10"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(34,197,94,0.18) 0%, transparent 60%), #0f0f1a',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                }}
              >
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white flex-shrink-0">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-seoul-white leading-tight">Jay Chingu</div>
                    <div className="text-[11px] text-white/50 leading-tight">Te respondo en horas</div>
                  </div>
                  <button
                    onClick={() => setExpanded(false)}
                    aria-label="Cerrar"
                    className="ml-auto w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Quick replies */}
                <div className="px-3 py-3">
                  <p className="px-2 pb-2 text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                    Empieza la conversacion
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_REPLIES.map((qr) => (
                      <a
                        key={qr.label}
                        href={buildUrl(qr.msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setExpanded(false)}
                        className="group px-3 py-2.5 rounded-lg bg-white/[0.03] hover:bg-[#25D366]/15 border border-white/[0.06] hover:border-[#25D366]/40 transition-all text-left"
                      >
                        <span className="text-sm text-white/85 group-hover:text-white font-medium leading-snug">
                          {qr.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Footer note */}
                <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.015]">
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    Abre WhatsApp con mensaje listo. 100% sin compromiso.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded((v) => !v)}
            aria-label="Abrir WhatsApp"
            className="pointer-events-auto relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-colors"
          >
            <MessageCircle size={26} strokeWidth={2.2} />
            {/* Pulse ring */}
            {!expanded && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30"
              />
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}

export { WHATSAPP_URL };
