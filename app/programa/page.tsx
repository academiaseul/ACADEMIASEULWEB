import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  CLASES,
  CURSOS,
  TZ_ROWS,
  TZ_NOTA,
  INICIO_LABEL,
  FIN_LABEL,
  PRECIO_UNICO,
  PRECIO_MENSUAL,
  MESES,
  WHATSAPP,
  PROGRAMA_GENERAL_PDF,
  pdfDe,
} from "@/lib/nivel1";

export const metadata: Metadata = {
  title: "Programa y syllabus · Cursos de coreano octubre 2026 — Academia Seúl",
  description:
    "Programa completo de los cursos en vivo de Academia Seúl: Coreano para Niños, Básico 1 (A1.1), Básico 2 (A1.2), Conversacional A2.1 y Preparación TOPIK II. 8 semanas, 60 min por clase, certificado incluido. US$150 o US$75/mes. Inicio 5 de octubre de 2026.",
  alternates: { canonical: "https://www.academiaseul.com/programa" },
  openGraph: {
    title: "Programa de cursos · Octubre 2026 — Academia Seúl",
    description:
      "Syllabus semana a semana de cada curso, horarios por país y precios. 8 semanas · certificado incluido · desde US$75/mes.",
    url: "https://www.academiaseul.com/programa",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Academia Seúl · Programa de cursos octubre 2026" }],
  },
};

const AZUL = "#3D2EE8";

export default function ProgramaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation solid />

      {/* Hero */}
      <section className="relative overflow-hidden text-white pt-16 md:pt-20" style={{ backgroundColor: AZUL }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 text-xs font-bold tracking-widest">
            PROGRAMA OFICIAL · COHORTE OCTUBRE 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="block text-2xl md:text-3xl mb-3 opacity-80">교육 과정</span>
            Programa y syllabus
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            5 cursos en vivo por Zoom · 8 semanas · 1 clase de 60 min por semana · certificado incluido
          </p>
          <p className="text-sm md:text-base mt-3 opacity-70">
            {INICIO_LABEL} → {FIN_LABEL.toLowerCase()} · US${PRECIO_UNICO} pago único o US${PRECIO_MENSUAL}/mes × {MESES}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/nivel-1#clases" className="px-8 py-3.5 bg-white text-[#3D2EE8] font-bold rounded-full hover:scale-105 transition">
              Inscribirme →
            </a>
            <a href={PROGRAMA_GENERAL_PDF} download className="px-8 py-3.5 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition">
              📄 Descargar programa (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Índice de cursos */}
      <section className="py-12 bg-[#F5F3FF]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CURSOS.map((c) => {
              const clase = CLASES.find((k) => k.cursoId === c.cursoId)!;
              return (
                <a
                  key={c.cursoId}
                  href={`#${c.cursoId}`}
                  className="bg-white rounded-2xl p-4 border border-[#E5E1FB] hover:border-[#3D2EE8] transition text-center"
                >
                  <div className="text-3xl mb-1">{clase.emoji}</div>
                  <div className="text-sm font-bold text-gray-900 leading-tight">{c.nombre.split(" · ")[0]}</div>
                  <div className="text-[11px] text-gray-500 mt-1">{c.nivel.split(" · ")[0]}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horarios */}
      <section id="horarios" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">Horarios de la cohorte</h2>
          <p className="text-gray-600 text-center mb-10">Todas las clases parten la {INICIO_LABEL.toLowerCase()} · horarios en hora de Chile</p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white text-left" style={{ backgroundColor: AZUL }}>
                  <th className="px-4 py-3 font-bold">Curso</th>
                  <th className="px-4 py-3 font-bold">Nivel</th>
                  <th className="px-4 py-3 font-bold">Día · hora Chile</th>
                  <th className="px-4 py-3 font-bold">Profesor/a</th>
                  <th className="px-4 py-3 font-bold">Primera clase</th>
                  <th className="px-4 py-3 font-bold">Cupos</th>
                </tr>
              </thead>
              <tbody>
                {CLASES.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 1 ? "bg-[#F5F3FF]" : "bg-white"}>
                    <td className="px-4 py-3 font-bold text-gray-900">{c.emoji} {c.nombre}</td>
                    <td className="px-4 py-3 text-gray-700">{c.nivel}</td>
                    <td className="px-4 py-3 text-gray-900 font-semibold whitespace-nowrap">{c.dia} {c.horaChile}</td>
                    <td className="px-4 py-3 text-gray-700">{c.profe}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.primeraClase}</td>
                    <td className="px-4 py-3 text-gray-700">{c.cupos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-center text-gray-900 mb-4">¿A qué hora es en tu país?</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="text-white" style={{ backgroundColor: AZUL }}>
                  <th className="px-4 py-3 font-bold">🇨🇱 Chile</th>
                  <th className="px-4 py-3 font-bold">🇲🇽 México</th>
                  <th className="px-4 py-3 font-bold">🇨🇴🇵🇪 Col/Perú</th>
                  <th className="px-4 py-3 font-bold">🇦🇷 Argentina</th>
                  <th className="px-4 py-3 font-bold">🇺🇸 EE.UU. (Este)</th>
                  <th className="px-4 py-3 font-bold">🇪🇸 España</th>
                  <th className="px-4 py-3 font-bold">🇰🇷 Corea</th>
                </tr>
              </thead>
              <tbody>
                {TZ_ROWS.map((row, i) => (
                  <tr key={row.horaChile} className={i % 2 === 1 ? "bg-[#F5F3FF]" : "bg-white"}>
                    <td className="px-4 py-3 font-bold text-gray-900">{row.horaChile}</td>
                    <td className="px-4 py-3 text-gray-700">{row.mexico}</td>
                    <td className="px-4 py-3 text-gray-700">{row.colombiaPeru}</td>
                    <td className="px-4 py-3 text-gray-700">{row.argentina}</td>
                    <td className="px-4 py-3 text-gray-700">{row.usaEste}</td>
                    <td className="px-4 py-3 text-gray-700">{row.espana}</td>
                    <td className="px-4 py-3 text-gray-700">{row.corea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">{TZ_NOTA}</p>
        </div>
      </section>

      {/* Método */}
      <section className="py-16 bg-[#0D0D0D] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/10 text-xs font-bold tracking-widest">CÓMO ES UNA CLASE</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">60 minutos que rinden</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              El drilling pesado (leer sílabas, memorizar números) vive en el Lector de Hangul como tarea con audio nativo.
              La hora en vivo se reserva para lo que solo la clase en vivo da: hablar y ser corregido.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { min: "5'", t: "Quiz de la clase anterior", d: "Activar lo aprendido" },
              { min: "30'", t: "Lección con el deck", d: "Gramática con dibujos y ejemplos reales" },
              { min: "20'", t: "Práctica oral en pares", d: "Role-play y corrección de pronunciación" },
              { min: "5'", t: "Cierre y tarea", d: "Lector de Hangul + hoja de la sesión" },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl p-5 bg-white/5 border border-white/10">
                <div className="text-3xl font-bold mb-1" style={{ color: "#818CF8" }}>{b.min}</div>
                <div className="font-bold">{b.t}</div>
                <div className="text-sm text-white/60 mt-1">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus por curso */}
      {CURSOS.map((curso, idx) => {
        const clases = CLASES.filter((k) => k.cursoId === curso.cursoId);
        const emoji = clases[0]?.emoji ?? "📚";
        return (
          <section key={curso.cursoId} id={curso.cursoId} className={`py-16 ${idx % 2 === 0 ? "bg-white" : "bg-[#F5F3FF]"}`}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Ficha */}
                <div className="lg:col-span-1">
                  <div className="text-5xl mb-3">{emoji}</div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#818CF8" }}>{curso.nivel}</div>
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-1">{curso.nombre}</h2>
                  <div className="text-lg text-gray-400 mb-4">{curso.koreanTitle}</div>
                  <p className="text-gray-700 leading-relaxed mb-5">{curso.descripcion}</p>

                  <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2 text-sm mb-5">
                    {clases.map((c) => (
                      <div key={c.id} className="flex justify-between gap-3">
                        <span className="text-gray-500">{c.dia}</span>
                        <span className="font-bold text-gray-900">{c.horaChile} Chile · {c.profe.replace("Prof.ª ", "").replace("Prof. ", "").split(" (")[0]}</span>
                      </div>
                    ))}
                    <div className="flex justify-between gap-3 pt-2 border-t border-gray-100">
                      <span className="text-gray-500">Libro / material</span>
                      <span className="font-semibold text-gray-900 text-right">{curso.libro}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Precio</span>
                      <span className="font-bold text-gray-900">US${PRECIO_UNICO} · o US${PRECIO_MENSUAL}/mes</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">Al terminar vas a poder:</h3>
                  <ul className="space-y-1.5 mb-6">
                    {curso.logros.map((l) => (
                      <li key={l} className="flex gap-2 text-sm text-gray-700">
                        <span className="font-bold" style={{ color: AZUL }}>✓</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/nivel-1#clases"
                      className="inline-block text-center px-7 py-3 rounded-full text-white font-bold hover:scale-105 transition"
                      style={{ backgroundColor: AZUL }}
                    >
                      Inscribirme →
                    </a>
                    <a
                      href={pdfDe(curso.cursoId)}
                      download
                      className="inline-block text-center px-7 py-3 rounded-full font-bold border-2 hover:bg-white transition"
                      style={{ borderColor: AZUL, color: AZUL }}
                    >
                      📄 Programa PDF
                    </a>
                  </div>
                </div>

                {/* Semanas */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Semana a semana</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {curso.sesiones.map((s) => (
                      <div key={s.num} className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#3D2EE8] transition">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: AZUL }}>
                          {s.num}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 leading-tight">{s.titulo}</h4>
                          <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
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

      {/* Precio + certificado */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Un solo precio para todos los cursos</h2>
          <p className="text-gray-600 mb-10">Cada curso de 8 semanas — sin importar el nivel — cuesta lo mismo.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <div className="rounded-2xl border-2 p-6" style={{ borderColor: AZUL }}>
              <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">PAGO ÚNICO</div>
              <div className="text-5xl font-bold" style={{ color: AZUL }}>US${PRECIO_UNICO}</div>
              <div className="text-sm text-gray-600 mt-2">8 semanas completas</div>
            </div>
            <div className="rounded-2xl border-2 border-gray-200 p-6">
              <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">PLAN MENSUAL</div>
              <div className="text-5xl font-bold" style={{ color: AZUL }}>US${PRECIO_MENSUAL}<span className="text-xl text-gray-500">/mes</span></div>
              <div className="text-sm text-gray-600 mt-2">{MESES} pagos mensuales</div>
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto text-left mb-10">
            {[
              "8 clases en vivo por Zoom de 60 min",
              "Certificado de Academia Seúl incluido",
              "Grabación de cada clase",
              "Slides + hojas de actividad",
              "Lector de Hangul con audio nativo",
              "Grupos chicos con corrección personal",
            ].map((i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700"><span className="font-bold" style={{ color: AZUL }}>✓</span>{i}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/nivel-1#clases" className="px-8 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transition" style={{ backgroundColor: AZUL }}>
              Inscribirme ahora →
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Jay! Vi el programa de octubre y tengo una duda sobre qué curso me conviene.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold text-lg border-2 hover:bg-[#F5F3FF] transition"
              style={{ borderColor: AZUL, color: AZUL }}
            >
              💬 ¿Qué nivel me conviene?
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
