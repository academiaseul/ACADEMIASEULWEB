"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const cursoLabels: Record<string, { nombre: string; korean: string }> = {
  intermedio:   { nombre: "Coreano Intermedio",   korean: "중급 한국어" },
  avanzado:     { nombre: "Coreano Avanzado",     korean: "고급 한국어" },
  kpop:         { nombre: "K-pop & K-drama",      korean: "케이팝 & 드라마" },
  conversacion: { nombre: "Conversación Express", korean: "대화 특급" },
  topik:        { nombre: "Preparación TOPIK",    korean: "TOPIK 준비" },
  general:      { nombre: "los próximos cursos",  korean: "다음 강의" },
};

function NotificarmeForm() {
  const searchParams = useSearchParams();
  const cursoParam = searchParams.get("curso") || "general";
  const curso = cursoLabels[cursoParam] || cursoLabels.general;

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    curso: cursoParam,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, curso: cursoParam }));
  }, [cursoParam]);

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.email) return;
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
          Recibirás un email con acceso prioritario y descuento de lanzamiento.
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
          abramos cupos. Los miembros de la lista de espera tienen acceso prioritario y
          descuento de lanzamiento.
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

        {error && (
          <div className="bg-seoul-red/10 border border-seoul-red/30 rounded-xl p-4 text-seoul-red text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !formData.nombre || !formData.email}
          className="w-full px-6 py-4 bg-seoul-red hover:bg-seoul-red-muted disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300"
        >
          {loading ? "Enviando..." : "💌 Apúntame a la lista de espera"}
        </button>

        <p className="text-center text-white/40 text-xs">
          Sin spam. Sin cargos. Solo te avisamos cuando lancemos.
        </p>
      </div>

      <div className="mt-12 pt-12 border-t border-white/10 text-center">
        <p className="text-white/50 text-sm mb-4">
          ¿Quieres empezar YA? Te invito al taller gratuito del 7 de junio:
        </p>
        <Link
          href="/taller"
          className="inline-flex items-center gap-2 px-6 py-3 border border-seoul-red text-seoul-red hover:bg-seoul-red hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm"
        >
          🎓 Taller GRATIS — Aprende a leer Hangul →
        </Link>
      </div>
    </div>
  );
}

export default function Notificarme() {
  return (
    <main className="min-h-screen bg-seoul-black text-white py-20 px-6">
      <Suspense fallback={<div className="text-white/40 text-center py-20">Cargando...</div>}>
        <NotificarmeForm />
      </Suspense>
    </main>
  );
}
