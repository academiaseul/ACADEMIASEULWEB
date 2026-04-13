'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { label: 'Inicio',       href: '#hero'     },
  { label: 'Academia',     href: '#about'    },
  { label: 'Cursos',       href: '#courses'  },
  { label: 'Cultura',      href: '#culture'  },
  { label: 'Testimonios',  href: '#testimonials' },
  { label: 'Contacto',     href: '#contact'  },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-seoul-black/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl'
            : 'bg-transparent',
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-tight">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group">
              <img
                src="/logo-tiger-red.png"
                alt="Academia Seúl"
                className="h-11 w-11 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <img
                src="/logo-text-red.png"
                alt="Academia Seúl"
                className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-seoul-white/70 hover:text-seoul-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-seoul-red group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                className="text-sm font-medium text-seoul-white/70 hover:text-seoul-white transition-colors duration-200"
              >
                Inscríbete
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-seoul-red hover:bg-red-700 text-white text-sm font-semibold rounded-md transition-all duration-200 shadow-lg shadow-seoul-red/20 hover:shadow-seoul-red/40 hover:-translate-y-0.5"
              >
                Clase de prueba gratis →
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-seoul-white/80 hover:text-seoul-white p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden bg-seoul-black/98 backdrop-blur-xl flex flex-col pt-20 px-6 pb-8"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: mobileOpen ? 'auto' : 'none' }}
      >
        <div className="flex justify-center items-center gap-3 mb-8">
          <img
            src="/logo-tiger-red.png"
            alt="Academia Seúl"
            className="h-11 w-11 object-contain"
          />
          <img
            src="/logo-text-red.png"
            alt="Academia Seúl"
            className="h-8 w-auto object-contain"
          />
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="py-4 text-2xl font-bold text-seoul-white/80 hover:text-seoul-red border-b border-white/[0.06] transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
              transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        <div className="mt-auto">
          <a
            href="#contact"
            className="block w-full text-center py-4 bg-seoul-red text-white font-bold text-lg rounded-lg mt-8 hover:bg-red-700 transition-colors duration-200"
            onClick={() => setMobileOpen(false)}
          >
            Clase de prueba gratis →
          </a>
        </div>
      </motion.div>
    </>
  );
}
