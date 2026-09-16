"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

// Columna de navegación fija a la izquierda (desktop) / barra de chips pegada
// bajo el menú (móvil) para saltar entre las clases y las secciones de la página.
// La página envuelve su contenido en <div className="lg:pl-64"> para dejarle sitio.

export type SidebarItem = {
  id: string; // id del elemento destino (sin #)
  label: string;
  emoji?: string;
  sub?: string;
};

function CursoBtn({
  c,
  activo,
  compacto,
  onCurso,
  ir,
}: {
  c: SidebarItem;
  activo: boolean;
  compacto?: boolean;
  onCurso?: (id: string) => void;
  ir: (id: string) => void;
}) {
  const cls = compacto
    ? `flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-bold whitespace-nowrap transition ${
        activo ? "border-[#4236F6] bg-[#4236F6] text-white" : "border-gray-200 bg-white text-gray-700"
      }`
    : `w-full text-left flex items-start gap-2.5 rounded-xl px-3 py-2.5 border-2 transition ${
        activo ? "border-[#4236F6] bg-[#F5F3FF] shadow-sm" : "border-transparent hover:bg-gray-50"
      }`;
  const inner = compacto ? (
    <>
      {c.emoji && <span>{c.emoji}</span>}
      {c.label}
    </>
  ) : (
    <>
      {c.emoji && <span className="text-xl leading-none mt-0.5">{c.emoji}</span>}
      <span className="min-w-0">
        <span className={`block text-sm font-bold leading-tight ${activo ? "text-[#4236F6]" : "text-gray-900"}`}>{c.label}</span>
        {c.sub && <span className="block text-[11px] text-gray-500 mt-0.5">{c.sub}</span>}
      </span>
    </>
  );
  if (onCurso) {
    return (
      <button type="button" onClick={() => onCurso(c.id)} className={cls} aria-current={activo ? "true" : undefined}>
        {inner}
      </button>
    );
  }
  return (
    <a
      href={`#${c.id}`}
      onClick={(e) => {
        e.preventDefault();
        ir(c.id);
      }}
      className={cls}
      aria-current={activo ? "true" : undefined}
    >
      {inner}
    </a>
  );
}

export default function SidebarCursos({
  cursos,
  secciones = [],
  activoCurso,
  onCurso,
  tituloCursos,
  tituloSecciones,
  cta,
}: {
  cursos: SidebarItem[];
  secciones?: SidebarItem[];
  activoCurso?: string;
  onCurso?: (id: string) => void;
  tituloCursos?: string;
  tituloSecciones?: string;
  cta?: { label: string; href: string };
}) {
  const [headerH, setHeaderH] = useState(120);
  const [activaSeccion, setActivaSeccion] = useState<string>("");
  const { t } = useT();
  // Los títulos que llegan por props ya vienen traducidos por quien los pasa.
  const tituloCursosTxt = tituloCursos ?? t("Clases de octubre");
  const tituloSeccionesTxt = tituloSecciones ?? t("En esta página");

  // Altura real del header fijo (nav + barra promo, que puede cerrarse).
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setHeaderH(Math.round(header.getBoundingClientRect().height));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // Sección activa según el scroll (los cursos también, cuando son anclas).
  // De paso re-mide el header por si el ResizeObserver no alcanzó a disparar.
  useEffect(() => {
    const ids = [...secciones.map((s) => s.id), ...(onCurso ? [] : cursos.map((c) => c.id))];
    const onScroll = () => {
      const h = document.querySelector("header")?.getBoundingClientRect().height;
      if (h && Math.round(h) !== headerH) setHeaderH(Math.round(h));
      const y = window.scrollY + headerH + 40;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActivaSeccion(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [secciones, cursos, onCurso, headerH]);

  const ir = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - headerH - 16, behavior: "smooth" });
  };

  const esActivo = (c: SidebarItem) => (onCurso ? activoCurso === c.id : activaSeccion === c.id);

  return (
    <>
      {/* Desktop: columna fija */}
      <aside
        className="hidden lg:flex fixed left-0 bottom-0 w-64 z-30 flex-col bg-white border-r border-gray-200 overflow-y-auto"
        style={{ top: headerH }}
        aria-label={t("Navegación de cursos")}
      >
        <div className="px-4 pt-6 pb-8 flex-1">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 px-1">{tituloCursosTxt}</div>
          <nav className="flex flex-col gap-1">
            {cursos.map((c) => (
              <CursoBtn key={c.id} c={c} activo={esActivo(c)} onCurso={onCurso} ir={ir} />
            ))}
          </nav>

          {secciones.length > 0 && (
            <>
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mt-7 mb-2 px-1">{tituloSeccionesTxt}</div>
              <nav className="flex flex-col">
                {secciones.map((s) => {
                  const activo = activaSeccion === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        ir(s.id);
                      }}
                      className={`text-sm px-3 py-2 rounded-lg border-l-2 transition ${
                        activo ? "border-[#4236F6] text-[#4236F6] font-bold bg-[#F5F3FF]" : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {s.label}
                    </a>
                  );
                })}
              </nav>
            </>
          )}
        </div>

        {cta && (
          <div className="px-4 py-4 border-t border-gray-200 bg-white">
            <a href={cta.href} className="block text-center px-4 py-3 rounded-full text-white font-bold text-sm hover:scale-[1.02] transition" style={{ backgroundColor: "#4236F6" }}>
              {cta.label}
            </a>
          </div>
        )}
      </aside>

      {/* Móvil / tablet: chips pegados bajo el menú */}
      <div className="lg:hidden sticky z-30 bg-white/95 backdrop-blur border-b border-gray-200" style={{ top: headerH }}>
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cursos.map((c) => (
            <CursoBtn key={c.id} c={c} activo={esActivo(c)} compacto onCurso={onCurso} ir={ir} />
          ))}
          {cta && (
            <a href={cta.href} className="flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ backgroundColor: "#4236F6" }}>
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
