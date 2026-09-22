"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Escalera from "@/components/Escalera";
import HorarioSemanal from "@/components/HorarioSemanal";
import EquipoProfes from "@/components/EquipoProfes";
import SidebarCursos from "@/components/SidebarCursos";
import StructuredData from "@/components/StructuredData";
import {
  CLASES,
  CURSOS,
  INICIO_LABEL,
  INICIO_SEMANA,
  FIN_LABEL,
  PRECIO_UNICO,
  PRECIO_MENSUAL,
  MESES,
  precioLabel,
  WHATSAPP,
  PROGRAMA_GENERAL_PDF,
  PROGRAMA_COMPLETO_PDF,
  pdfDe,
  clasesDe,
  profeDe,
  primeraClaseDe,
} from "@/lib/nivel1";

import { useT } from "@/lib/i18n";

const AZUL = "#3D2EE8";
// Texto/borde azul: en modo noche se aclara (ver html.dark en globals.css).
const AZUL_TXT = "var(--as-azul-txt, #3D2EE8)";

export default function ProgramaContent() {
  const { t, td } = useT();
  const orden = [...CURSOS].sort((a, b) => (a.paso === 0 ? 99 : a.paso) - (b.paso === 0 ? 99 : b.paso));
  const sidebarCursos = orden.map((c) => {
    const cs = clasesDe(c.cursoId);
    return { id: c.cursoId, emoji: c.emoji, label: t(c.nombreCorto), sub: `${td(cs.map((k) => k.dia).join(" o "))} ${cs[0].horaChile} Chile · ${t(profeDe(cs[0].profeId).corto)}` };
  });
  const sidebarSecciones = [
    { id: "escalera", label: t("La escalera") },
    { id: "horarios", label: t("Horario semanal") },
    { id: "metodo", label: t("Cómo es una clase") },
    { id: "equipo", label: t("Equipo docente") },
    { id: "precio", label: t("Precio y pago") },
  ];
  // "Semana del 30 de noviembre" → minúscula inicial tras la flecha (vale para ES/EN/KO).
  const finTxt = t(FIN_LABEL);
  const finMin = finTxt.charAt(0).toLowerCase() + finTxt.slice(1);

  return (
    <main className="min-h-screen bg-white">
      <StructuredData />
      <Navigation solid />

      <div className="lg:pl-64">
      {/* Hero */}
      <section className="relative overflow-hidden text-white pt-16 md:pt-20" style={{ backgroundColor: AZUL }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 text-xs font-bold tracking-widest">{t("PROGRAMA OFICIAL · COHORTE OCTUBRE 2026")}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="block text-2xl md:text-3xl mb-3 opacity-80">교육 과정</span>
            {t("Programa y syllabus")}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">{t("5 cursos · 6 horarios · 8 semanas · 1 clase de 60 min por semana · certificado incluido")}</p>
          <p className="text-sm md:text-base mt-3 opacity-70">{t(INICIO_LABEL)} → {finMin} · {t(precioLabel())}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/nivel-1#clases" className="px-8 py-3.5 bg-white text-[#3D2EE8] font-bold rounded-full hover:scale-105 transition">{t("Inscribirme →")}</a>
            <a href={PROGRAMA_GENERAL_PDF} download className="px-8 py-3.5 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition">{t("📄 Descargar programa (PDF)")}</a>
          </div>
          <p className="text-xs md:text-sm mt-4 opacity-70">
            {t("¿Quieres el detalle semana a semana?")}{" "}
            <a href={PROGRAMA_COMPLETO_PDF.es} download className="underline underline-offset-2 hover:opacity-100">{t("Programa completo de estudios (PDF, español)")}</a>
            {" · "}
            <a href={PROGRAMA_COMPLETO_PDF.en} download className="underline underline-offset-2 hover:opacity-100">{t("Complete program (PDF, English)")}</a>
          </p>
        </div>
      </section>

      <SidebarCursos cursos={sidebarCursos} secciones={sidebarSecciones} cta={{ label: t("Inscribirme →"), href: "/nivel-1#clases" }} />

      {/* Escalera */}
      <section id="escalera" className="py-14 bg-[#F5F3FF]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">{t("La escalera de Academia Seúl")}</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">{t("Todos los cursos duran 8 semanas y cuestan lo mismo. Cada peldaño te deja listo para el siguiente. Toca tu caso y te decimos dónde entrar.")}</p>
          <Escalera />
        </div>
      </section>

      {/* Horarios */}
      <section id="horarios" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">{t("Horario semanal")}</h2>
          <p className="text-gray-600 text-center mb-8">{t("Todas las clases parten {inicio} · toca tu país para ver tu hora", { inicio: t(INICIO_SEMANA) })}</p>
          <HorarioSemanal />
        </div>
      </section>

      {/* Método */}
      <section id="metodo" className="py-16 bg-[#0D0D0D] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/10 text-xs font-bold tracking-widest">{t("CÓMO ES UNA CLASE")}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("60 minutos que rinden")}</h2>
            <p className="text-white/70 max-w-2xl mx-auto">{t("El drilling pesado (leer sílabas, memorizar números) vive en el Lector de Hangul como tarea con audio nativo. La hora en vivo se reserva para lo que solo la clase en vivo da: hablar y ser corregido.")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { min: "5'", t: t("Quiz de la clase anterior"), d: t("Activar lo aprendido") },
              { min: "30'", t: t("Lección con el deck"), d: t("Gramática con dibujos y ejemplos reales") },
              { min: "20'", t: t("Práctica oral en pares"), d: t("Role-play y corrección de pronunciación") },
              { min: "5'", t: t("Cierre y tarea"), d: t("Lector de Hangul + hoja de la sesión") },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl p-5 bg-white/5 border border-white/10">
                <div className="text-3xl font-bold mb-1" style={{ color: "#818CF8" }}>{b.min}</div>
                <div className="font-bold">{b.t}</div>
                <div className="text-sm text-white/60 mt-1">{b.d}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-white/60 mt-6">{t("🧒 En Niños la hora se divide en bloques de 10–15 min (canción · juego · lectura · dibujo) y la tarea es breve, para hacer con el apoderado.")}</p>
        </div>
      </section>

      {/* Syllabus por curso */}
      {orden.map((curso, idx) => {
        const clases = clasesDe(curso.cursoId);
        return (
          <section key={curso.cursoId} id={curso.cursoId} className={`py-16 ${idx % 2 === 0 ? "bg-white" : "bg-[#F5F3FF]"}`}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Ficha */}
                <div className="lg:col-span-1">
                  <div className="text-5xl mb-3">{curso.emoji}</div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#818CF8" }}>
                    {curso.grupo === "ninos" ? t("Ruta Niños") : t("Paso {n} de la escalera", { n: curso.paso })} · {t(curso.cefr)}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-1">{t(curso.nombreCorto)}</h2>
                  <div className="text-lg text-gray-400 mb-4">{t(curso.subtitulo)} · {curso.koreanTitle}</div>
                  <p className="text-gray-700 leading-relaxed mb-5">{t(curso.descripcion)}</p>

                  <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2 text-sm mb-5">
                    {clases.map((c) => (
                      <div key={c.id} className="grid grid-cols-[110px_1fr] gap-2">
                        <span className="text-gray-500">{t(c.dia)}</span>
                        <span className="font-bold text-gray-900">{t("{hora} Chile · primera clase {fecha}", { hora: c.horaChile, fecha: t(c.primeraClase) })}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-[110px_1fr] gap-2">
                      <span className="text-gray-500">{t("Profesor/a")}</span>
                      <span className="font-semibold text-gray-900">{t(profeDe(clases[0].profeId).nombre)}</span>
                    </div>
                    <div className="grid grid-cols-[110px_1fr] gap-2">
                      <span className="text-gray-500">{t("Requiere")}</span>
                      <span className="font-semibold text-gray-900">{curso.requiere ? t(curso.requiere) : t("Nada — desde cero")}</span>
                    </div>
                    <div className="grid grid-cols-[110px_1fr] gap-2 pt-2 border-t border-gray-100">
                      <span className="text-gray-500">{t("Material")}</span>
                      <span className="font-semibold text-gray-900">{t(curso.libro)}</span>
                    </div>
                    <div className="grid grid-cols-[110px_1fr] gap-2">
                      <span className="text-gray-500">{t("Precio")}</span>
                      <span className="font-bold text-gray-900">{t("US${p} · o {n} × US${m}", { p: PRECIO_UNICO, n: MESES, m: PRECIO_MENSUAL })}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">{t("Al terminar vas a poder:")}</h3>
                  <ul className="space-y-1.5 mb-6">
                    {curso.logros.map((l) => (
                      <li key={l} className="flex gap-2 text-sm text-gray-700"><span className="font-bold" style={{ color: AZUL_TXT }}>✓</span><span>{t(l)}</span></li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={`/nivel-1?clase=${primeraClaseDe(curso.cursoId)}#clases`} className="inline-block text-center px-7 py-3 rounded-full text-white font-bold hover:scale-105 transition" style={{ backgroundColor: AZUL }}>
                      {curso.grupo === "ninos" ? t("Inscribir a mi hijo/a →") : t("Inscribirme en {curso} →", { curso: t(curso.nombreCorto).split(" (")[0] })}
                    </a>
                    <a href={pdfDe(curso.cursoId)} download className="inline-block text-center px-7 py-3 rounded-full font-bold border-2 hover:bg-white transition" style={{ borderColor: AZUL_TXT, color: AZUL_TXT }}>{t("📄 Programa PDF")}</a>
                  </div>
                </div>

                {/* Semanas */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t("Semana a semana")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {curso.sesiones.map((s) => (
                      <div key={s.num} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#3D2EE8] transition">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: AZUL }}>{s.num}</div>
                        <div>
                          <h4 className="font-bold text-gray-900 leading-tight">{t(s.titulo)}</h4>
                          <p className="text-sm text-gray-600 mt-1">{t(s.desc)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Profes */}
      <section id="equipo" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">{t("Equipo docente")}</h2>
          <EquipoProfes />
        </div>
      </section>

      {/* Precio + certificado */}
      <section id="precio" className="py-16 bg-[#F5F3FF]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t("Un solo precio para todos los cursos")}</h2>
          <p className="text-gray-600 mb-10">{t("{precio} — sin importar el nivel.", { precio: t(precioLabel()) })}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <div className="rounded-2xl border-2 bg-white p-6" style={{ borderColor: AZUL_TXT }}>
              <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">{t("PAGO ÚNICO")}</div>
              <div className="text-5xl font-bold" style={{ color: AZUL_TXT }}>US${PRECIO_UNICO}</div>
              <div className="text-sm text-gray-600 mt-2">{t("El curso completo de 8 semanas")}</div>
            </div>
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
              <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">{t("{n} CUOTAS", { n: MESES })}</div>
              <div className="text-5xl font-bold" style={{ color: AZUL_TXT }}>{MESES} × US${PRECIO_MENSUAL}</div>
              <div className="text-sm text-gray-600 mt-2">{t("Una al inscribirte, otra al inicio del mes 2")}</div>
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto text-left mb-10">
            {[t("8 clases en vivo por Zoom de 60 min"), t("Certificado de Academia Seúl incluido"), t("Grabación de cada clase"), t("Slides + hojas de actividad"), t("Lector de Hangul con audio nativo"), t("Grupos chicos con corrección personal")].map((i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700"><span className="font-bold" style={{ color: AZUL_TXT }}>✓</span>{i}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/nivel-1#clases" className="px-8 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transition" style={{ backgroundColor: AZUL }}>{t("Inscribirme · Octubre 2026 →")}</a>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t("Hola Jay! Vi el programa de octubre y tengo una duda sobre qué curso me conviene."))}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full font-bold text-lg border-2 bg-white hover:bg-[#F5F3FF] transition" style={{ borderColor: AZUL_TXT, color: AZUL_TXT }}>{t("💬 ¿Qué nivel me conviene?")}</a>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
