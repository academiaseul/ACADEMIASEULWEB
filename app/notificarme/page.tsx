"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { COHORTE_ABIERTA, precioLabel, INICIO_SEMANA } from "@/lib/nivel1";

const WHATSAPP_NUMBER = "56942115562";

// Cursos con matrícula abierta ahora mismo → mandar directo a inscripción.
const CURSOS_ABIERTOS = new Set(["nivel1", "topik", "ninos", "basico2", "conversacional"]);

const cursoLabels: Record<string, { nombre: string; korean: string }> = {
  nivel1:        { nombre: "Básico 1 (A1.1)",           korean: "첫 한국어" },
  basico2:       { nombre: "Básico 2 (A1.2)",           korean: "기초 한국어 2" },
  conversacional:{ nombre: "Conversacional 1 (A2.1)",   korean: "회화 A2.1" },
  ninos:         { nombre: "Coreano para Niños (8–12)", korean: "어린이 한국어" },
  topik:         { nombre: "TOPIK II (B1+)",            korean: "토픽 II 준비반" },
  conversacion:  { nombre: "Conversacional 2 (A2.2)",   korean: "회화 A2.2" },
  general:       { nombre: "los próximos cursos",   korean: "다음 강의" },
};

const PAISES = [
  "Argentina", "Bolivia", "Chile", "Colombia", "Costa Rica", "Cuba",
  "Ecuador", "El Salvador", "España", "Estados Unidos", "Guatemala",
  "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", "Perú",
  "Puerto Rico", "República Dominicana", "Uruguay", "Venezuela", "Otro",
];

const NIVELES_COREANO = [
  "Cero, nunca estudié",
  "Sé leer el alfabeto (한글)",
  "Nivel A1 básico",
  "Terminé Básico 1 o equivalente",
  "Nivel A2 o intermedio",
  "Nivel B1 o superior",
];

const MOTIVOS = [
  "K-pop / K-dramas",
  "Viajar a Corea",
  "Trabajo o negocios",
  "Pareja o familia coreana",
  "Cultura coreana en general",
  "Estudiar en Corea (TOPIK)",
  "Otro",
];

function NotificarmeForm() {
  const searchParams = useSearchParams();
  const cursoParam = searchParams.get("curso") || "general";
  const curso = cursoLabels[cursoParam] || cursoLabels.general;

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    pais: "",
    nivelCoreano: "",
    motivo: "",
    mensaje: "",
    curso: cursoParam,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, curso: cursoParam }));
  }, [cursoParam]);

  const isValid =
    !!formData.nombre &&
    !!formData.email &&
    !!formData.telefono &&
    !!formData.pais &&
    !!formData.nivelCoreano &&
    !!formData.motivo;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/mzdypyky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `Lista de espera — ${curso.nombre}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Hubo un problema al enviarte. Intenta nuevamente.");
      }
    } catch {
      setError("Hubo un problema al enviarte. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="text-7xl mb-6">💜</div>
        <h2 className="font-serif text-3xl md:text-4xl text-seoul-white mb-4">
          ¡Listo, {formData.nombre}!
        </h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Te aviso apenas abramos cupos de <strong className="text-seoul-red">{curso.nombre}</strong>.
          Recibirás un email con acceso prioritario a horarios y cupos.
        </p>
        <p className="text-white/40 text-sm font-korean mb-8">화이팅 chingu! 🇰🇷</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-seoul-red text-seoul-white hover:text-white font-semibold rounded-lg transition-all duration-300 hover:bg-seoul-red/10 text-sm"
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {COHORTE_ABIERTA && CURSOS_ABIERTOS.has(cursoParam) && (
        <div className="mb-10 rounded-2xl border border-seoul-red/40 bg-seoul-red/10 p-6">
          <p className="text-seoul-white font-bold text-lg mb-1">
            🎓 ¡Buenas noticias! {curso.nombre} ya tiene matrícula abierta.
          </p>
          <p className="text-white/70 text-sm mb-4">
            Las clases empiezan {INICIO_SEMANA} de 2026 — 8 semanas, certificado incluido,
            {precioLabel()}. No necesitas lista de espera: elige tu horario y reserva tu cupo.
          </p>
          <Link
            href="/nivel-1#clases"
            className="inline-flex items-center gap-2 px-6 py-3 bg-seoul-red hover:bg-seoul-red-muted text-white font-bold rounded-lg transition-all duration-300 text-sm"
          >
            Inscribirme · Octubre 2026 →
          </Link>
          <p className="text-white/40 text-xs mt-4">
            ¿Prefieres que te avisemos para una cohorte futura? Deja tus datos abajo.
          </p>
        </div>
      )}
      <div className="mb-12">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-seoul-red mb-4">
          Lista de espera
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-seoul-white leading-tight mb-4">
          Te avisamos cuando lance
          <br />
          <em className="not-italic text-gradient-red">{curso.nombre}</em>
        </h1>
        <p className="text-white/60 text-lg mt-6">
          <span className="font-korean">{curso.korean}</span> · Sé el/la primer/a en saber cuando
          abramos cupos. Los miembros de la lista de espera tienen acceso prioritario a
          horarios y cupos.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
            Tu nombre
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Cómo te llamamos"
            className="w-full px-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white placeholder:text-white/30 focus:border-seoul-red focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
            Tu email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="donde te avisamos"
            className="w-full px-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white placeholder:text-white/30 focus:border-seoul-red focus:outline-none transition-colors"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
              Tu teléfono / WhatsApp
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              placeholder="+56 9 1234 5678"
              className="w-full px-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white placeholder:text-white/30 focus:border-seoul-red focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
              Tu país
            </label>
            <select
              value={formData.pais}
              onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
              className="w-full px-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white focus:border-seoul-red focus:outline-none transition-colors"
            >
              <option value="" disabled className="bg-seoul-black">Selecciona tu país</option>
              {PAISES.map((p) => (
                <option key={p} value={p} className="bg-seoul-black">{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
            ¿Cuál es tu nivel de coreano?
          </label>
          <select
            value={formData.nivelCoreano}
            onChange={(e) => setFormData({ ...formData, nivelCoreano: e.target.value })}
            className="w-full px-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white focus:border-seoul-red focus:outline-none transition-colors"
          >
            <option value="" disabled className="bg-seoul-black">Selecciona tu nivel</option>
            {NIVELES_COREANO.map((n) => (
              <option key={n} value={n} className="bg-seoul-black">{n}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
            ¿Por qué quieres aprender coreano?
          </label>
          <select
            value={formData.motivo}
            onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
            className="w-full px-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white focus:border-seoul-red focus:outline-none transition-colors"
          >
            <option value="" disabled className="bg-seoul-black">Selecciona una opción</option>
            {MOTIVOS.map((m) => (
              <option key={m} value={m} className="bg-seoul-black">{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
            Mensaje adicional <span className="normal-case text-white/25">(opcional)</span>
          </label>
          <textarea
            value={formData.mensaje}
            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
            placeholder="Cuéntanos algo más, si quieres"
            rows={4}
            className="w-full px-4 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-seoul-white placeholder:text-white/30 focus:border-seoul-red focus:outline-none transition-colors resize-none"
          />
        </div>

        {error && (
          <div className="bg-seoul-red/10 border border-seoul-red/30 rounded-xl p-4 text-seoul-red text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !isValid}
          className="w-full px-6 py-4 bg-seoul-red hover:bg-seoul-red-muted disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300"
        >
          {loading ? "Enviando..." : "💌 Apúntame a la lista de espera"}
        </button>

        <p className="text-center text-white/40 text-xs">
          Sin spam. Sin cargos. Solo te avisamos cuando lancemos.
        </p>
      </div>

      <div className="mt-10 pt-10 border-t border-white/10 text-center">
        <p className="text-white/50 text-sm mb-4">
          ¿Prefieres hablar directo? Escríbele a Jay por WhatsApp:
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hola Jay! Quiero más información sobre ${curso.nombre}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-full transition-all duration-300 text-sm"
        >
          💬 Hablar con Jay por WhatsApp
        </a>
      </div>

      <div className="mt-12 pt-12 border-t border-white/10 text-center">
        <p className="text-white/50 text-sm mb-4">
          ¿Quieres empezar YA? Aprende a leer coreano gratis con el Lector de Hangul:
        </p>
        <a
          href="/lector-hangul"
          className="inline-flex items-center gap-2 px-6 py-3 border border-seoul-red text-seoul-red hover:bg-seoul-red hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm"
        >
          🐯 Lector de Hangul — gratis con audio nativo →
        </a>
      </div>
    </div>
  );
}

export default function Notificarme() {
  return (
    <main className="min-h-screen bg-seoul-black text-white">
      <Navigation solid />
      <div className="pt-32 pb-20 px-6">
        <Suspense fallback={<div className="text-white/40 text-center py-20">Cargando...</div>}>
          <NotificarmeForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
