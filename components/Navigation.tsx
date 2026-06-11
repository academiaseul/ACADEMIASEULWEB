'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import PromoBar from './PromoBar';

type NavChild = { label: string; href: string };
type NavLink = { label: string; href: string; highlight?: boolean; children?: NavChild[] };

const navLinks: NavLink[] = [
  { label: 'Inicio',        href: '/#hero'     },
  { label: 'Nivel 1 · $89', href: '/nivel-1', highlight: true },
  { label: 'Sobre Jay',     href: '/sobre'     },
  { label: 'Taller Gratis', href: '/taller'    },
  {
    label: 'Recursos',
    href: '/recursos',
    children: [
      { label: 'Test de nivel',         href: '/test-nivel'            },
      { label: 'Guías',                 href: '/recursos/guias'        },
      { label: 'Pronunciación coreana', href: '/recursos/pronunciacion' },
      { label: 'Tu nombre en coreano',  href: '/generador-nombre'      },
    ],
  },
  { label: 'Blog',          href: '/blog'      },
  { label: 'Contacto',      href: '/#contact'  },
];

export default function Navigation({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled || solid
            ? 'bg-seoul-black/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl'
            : 'bg-transparent',
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <PromoBar />
        <div className="container-tight">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
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
            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href} className="relative group">
                    <a
                      href={link.href}
                      className="text-sm font-medium text-seoul-white/70 hover:text-seoul-white transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="opacity-60 group-hover:rotate-180 transition-transform duration-200"
                      />
                    </a>
                    {/* Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                      <div className="min-w-[230px] bg-seoul-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2">
                        {link.children.map((c) => (
                          <a
                            key={c.href}
                            href={c.href}
                            className="block px-4 py-3 rounded-lg text-sm text-seoul-white/75 hover:text-seoul-white hover:bg-white/[0.06] transition-colors duration-150"
                          >
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'text-sm font-medium transition-colors duration-200 relative group',
                      link.highlight
                        ? 'text-seoul-red hover:text-[#818CF8]'
                        : 'text-seoul-white/70 hover:text-seoul-white',
                    )}
                  >
                    {link.label}
                    <span
                      className={clsx(
                        'absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300',
                        link.highlight ? 'bg-[#818CF8]' : 'bg-seoul-red',
                      )}
                    />
                  </a>
                ),
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/taller"
                className="px-5 py-2.5 bg-seoul-red hover:bg-[#2C1FB0] text-white text-sm font-semibold rounded-md transition-all duration-200 shadow-lg shadow-seoul-red/20 hover:shadow-seoul-red/40 hover:-translate-y-0.5 whitespace-nowrap"
              >
                Clase gratis →
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-seoul-white/80 hover:text-seoul-white p-2"
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
        className="fixed inset-0 z-40 lg:hidden bg-seoul-black/98 backdrop-blur-xl flex flex-col pt-20 px-6 pb-8 overflow-y-auto"
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: mobileOpen ? 'auto' : 'none' }}
      >
        <div className="flex justify-center items-center gap-3 mb-8">
          <img src="/logo-tiger-red.png" alt="Academia Seúl" className="h-11 w-11 object-contain" />
          <img src="/logo-text-red.png" alt="Academia Seúl" className="h-8 w-auto object-contain" />
        </div>
        <nav className="flex flex-col">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
              transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
            >
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'block py-4 text-2xl font-bold border-b border-white/[0.06] transition-colors duration-200',
                  link.highlight ? 'text-seoul-red hover:text-[#818CF8]' : 'text-seoul-white/80 hover:text-seoul-red',
                )}
              >
                {link.label}
              </a>
              {link.children && (
                <div className="flex flex-col">
                  {link.children.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 pl-5 text-lg font-semibold text-seoul-white/55 hover:text-seoul-red border-b border-white/[0.04] transition-colors duration-200"
                    >
                      ↳ {c.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </nav>
        <div className="mt-auto">
          <a
            href="/taller"
            className="block w-full text-center py-4 bg-seoul-red text-white font-bold text-lg rounded-lg mt-8 hover:bg-[#2C1FB0] transition-colors duration-200"
            onClick={() => setMobileOpen(false)}
          >
            Clase de prueba gratis →
          </a>
        </div>
      </motion.div>
    </>
  );
}
