"use client";

import { useEffect, useState } from "react";
import { PROXIMO_TALLER, TALLER_GRABADO, tallerVigente } from "@/lib/taller";
import Link from "next/link";
import LiteYouTube from "@/components/LiteYouTube";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type FormData = {
  nombre: string;
  email: string;
  edad: string;
  pais: string;
  nivel: string;
  razon: string;
};

export default function TallerPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    edad: "",
    pais: "",
    nivel: "",
    razon: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // true mientras haya un taller anunciado y vigente; false => modo "próximo taller"
  const [vigente, setVigente] = useState(true);

  useEffect(() => {
    setVigente(tallerVigente());
  }, []);

  const fechaCompleta = `${PROXIMO_TALLER.fechaLabel} · ${PROXIMO_TALLER.horaLabel}`;

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
          _subject: vigente
            ? "Nueva inscripción — Taller Hangul"
            : "Taller grabado — material + aviso del próximo en vivo",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Hubo un problema al enviar tu inscripción. Intenta nuevamente.");
      }
    } catch {
      setError("Hubo un problema al enviar tu inscripción. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const hangulCards = [
    { char: "ㄱ", roman: "G/K", accent: true },
    { char: "ㄴ", roman: "N", accent: false },
    { char: "ㄷ", roman: "D/T", accent: false },
    { char: "아", roman: "A", accent: false },
    { char: "이", roman: "I", accent: true },
    { char: "우", roman: "U", accent: false },
    { char: "한", roman: "HAN", accent: false },
    { char: "글", roman: "GEUL", accent: false },
    { char: "💬", roman: "YOU!", accent: true },
  ];

  const learns = [
    {
      num: "01",
      emoji: "🔤",
      title: "Las consonantes básicas",
      desc: "Aprenderás los 14 consonantes del Hangul con un método de asociación visual diseñado para hispanohablantes.",
    },
    {
      num: "02",
      emoji: "🗣",
      title: "Las vocales y la pronunciación",
      desc: "Dominarás las 10 vocales principales y entenderás por qué el coreano suena diferente al español — y cómo aprovecharlo.",
    },
    {
      num: "03",
      emoji: "🧩",
      title: "Cómo se forman las sílabas",
      desc: "Descubrirás la lógica silábica del coreano y combinarás consonantes + vocales para leer tus primeras palabras reales.",
    },
  ];

  const faqs = [
    {
      q: "¿De verdad es gratuito?",
      a: "100%. Sin tarjeta de crédito ni pagos. Es un regalo de Academia Seúl para Los Chingus.",
    },
    {
      q: "¿Necesito saber algo de coreano?",
      a: "¡Para nada! El taller está diseñado para personas que nunca han visto una letra coreana.",
    },
    {
      q: "¿Cuánto dura el taller?",
      a: "Aproximadamente 1 hora. Dinámico, práctico y con tiempo para preguntas al final.",
    },
    {
      q: "¿Hay grabación disponible?",
      a: "Sí: el taller completo está grabado y lo ves aquí mismo, cuando quieras y las veces que quieras. Cuando haya un nuevo taller en vivo, te avisamos por correo.",
    },
    {
      q: "¿Qué pasa después del taller?",
      a: "Tendrás la oportunidad de unirte a los cursos en vivo de Academia Seúl — 8 semanas de coreano por Zoom, certificado incluido, con matrícula abierta desde octubre de 2026.",
    },
    {
      q: "¿En qué plataforma se ve?",
      a: "El taller grabado se ve aquí mismo (YouTube), en celular o computador. El próximo en vivo será por Zoom o Instagram y te mandamos el link por correo.",
    },
  ];

  // LATAM time zones for Saturday June 6, 2026 at 20:00 Chile time
  // Chile is UTC-4 in June (winter, no DST)
  const timezones = [
    { flag: "🇲🇽", country: "México (CDMX)",         time: "18:00" },
    { flag: "🇨🇴", country: "Colombia",              time: "19:00" },
    { flag: "🇵🇪", country: "Perú / Ecuador",         time: "19:00" },
    { flag: "🇨🇱", country: "Chile",                 time: "20:00", highlight: true },
    { flag: "🇦🇷", country: "Argentina / Uruguay",    time: "21:00" },
    { flag: "🇧🇴", country: "Bolivia / Venezuela",    time: "20:00" },
    { flag: "🇪🇸", country: "España",                time: "02:00 (dom)" },
  ];

  // Form field configurations
  const textFields = [
    { label: "Tu nombre", key: "nombre" as const, type: "text", placeholder: "¿Cómo te llamas, chingu?" },
    { label: "Tu correo electrónico", key: "email" as const, type: "email", placeholder: "hola@tucorreo.com" },
  ];

  const selectFields = [
    {
      label: "Tu edad",
      key: "edad" as const,
      placeholder: "Selecciona tu rango de edad",
      options: ["Menor de 18", "18 – 24", "25 – 34", "35 – 44", "45 – 54", "55+"],
    },
    {
      label: "¿De dónde eres?",
      key: "pais" as const,
      placeholder: "Selecciona tu país 🌎",
      options: [
        "🇦🇷 Argentina", "🇧🇴 Bolivia", "🇨🇱 Chile", "🇨🇴 Colombia",
        "🇨🇷 Costa Rica", "🇨🇺 Cuba", "🇪🇨 Ecuador", "🇸🇻 El Salvador",
        "🇬🇹 Guatemala", "🇭🇳 Honduras", "🇲🇽 México", "🇳🇮 Nicaragua",
        "🇵🇦 Panamá", "🇵🇾 Paraguay", "🇵🇪 Perú", "🇩🇴 República Dominicana",
        "🇺🇾 Uruguay", "🇻🇪 Venezuela", "🌍 Otro",
      ],
    },
    {
      label: "Tu nivel de coreano",
      key: "nivel" as const,
      placeholder: "Selecciona tu nivel",
      options: [
        "Ninguno (nunca he visto coreano)",
        "Sé algunas palabras de K-pop / K-dramas",
        "Conozco un poco el Hangul",
        "Nivel básico (A1 – A2)",
        "Intermedio o más (B1+)",
      ],
    },
    {
      label: "¿Por qué quieres aprender coreano?",
      key: "razon" as const,
      placeholder: "Elige una razón",
      options: [
        "K-pop 🎵",
        "K-dramas / Netflix 🎬",
        "Viaje a Corea ✈️",
        "Cultura coreana en general",
        "Trabajo o negocios",
        "Por curiosidad / hobby",
      ],
    },
  ];

  return (
    <main className="bg-[#F4F7FF] overflow-x-hidden">

      {/* ── NAV ── */}
      <Navigation solid />

      {/* ── HERO ── */}
      <section className="min-h-screen pt-16 md:pt-20 grid grid-cols-1 lg:grid-cols-2">

        {/* Left — Red */}
        <div className="bg-[#3D2EE8] flex flex-col justify-center px-8 md:px-14 py-20 relative">
          {/* Diagonal edge on desktop */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-0 border-r-[60px] border-r-transparent border-t-[100vh] border-t-[#3D2EE8] z-10" />

          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white text-xs font-bold tracking-[2px] uppercase px-3 py-1.5 w-fit mb-7">
            🇰🇷 Taller Gratuito · 무료 강의{!vigente && " · grabado"}
          </span>

          <h1 className="font-black text-white leading-[0.92] mb-4" style={{ fontSize: "clamp(52px, 7vw, 88px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}>
            Aprende a leer
            <span className="block text-[#E8B84B]" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: "clamp(44px, 6vw, 76px)" }}>
              한글
            </span>
            en 1 hora
          </h1>

          {/* Date badge */}
          <div className="flex flex-col gap-1 bg-[#0D0D0D] border-2 border-[#E8B84B] px-5 py-3 w-fit mb-6 shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            <span className="text-[#E8B84B] text-[10px] font-bold tracking-[2px] uppercase">
              {vigente ? "📅 Fecha confirmada" : "▶ Disponible ahora"}
            </span>
            <span className="text-white font-black text-lg leading-tight" style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}>
              {vigente ? fechaCompleta : `Clase completa grabada · ${TALLER_GRABADO.duracion} · gratis`}
            </span>
          </div>

          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-sm mb-8">
            El sistema de escritura coreano es{" "}
            <strong className="text-white">más fácil de lo que crees</strong>.{" "}
            {vigente ? "En este taller en vivo leerás tu primera palabra en coreano antes de que termine la sesión." : "Mira la clase completa (grabada en vivo) y lee tu primera palabra en coreano antes de que termine el video."}
          </p>

          <div className="flex flex-col gap-3 mb-10">
            {[
              { icon: "🎓", text: "100% gratuito — sin tarjeta de crédito" },
              { icon: "⏱", text: vigente ? "1 hora en vivo por Zoom — con Jay Chingu" : "1 hora de clase con Jay Chingu — a tu ritmo, pausa y repite" },
              { icon: "🌎", text: "Para hispanohablantes de toda Latinoamérica" },
            ].map((m) => (
              <div key={m.text} className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-base flex-shrink-0">
                  {m.icon}
                </div>
                {m.text}
              </div>
            ))}
          </div>

          <a
            href={vigente ? "#registro" : "#video"}
            className="inline-flex items-center gap-3 bg-[#E8B84B] text-[#0D0D0D] font-bold text-sm px-8 py-4 w-fit shadow-[4px_4px_0_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            {vigente ? "Reservar mi lugar gratis" : "Ver el taller ahora"} <span className="text-lg">→</span>
          </a>
        </div>

        {/* Right — Cream */}
        <div className="bg-[#F4F7FF] flex flex-col items-center justify-center gap-8 px-6 md:px-12 py-14 lg:py-20">
          {!vigente && (
            <div id="video" className="w-full max-w-xl scroll-mt-24">
              <div className="relative aspect-video overflow-hidden bg-black border-2 border-[#0D0D0D] shadow-[8px_8px_0_#3D2EE8]">
                <LiteYouTube id={TALLER_GRABADO.youtubeId} start={TALLER_GRABADO.start} title={TALLER_GRABADO.titulo} />
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">▶ {TALLER_GRABADO.titulo} · {TALLER_GRABADO.duracion} · grabado en vivo con Jay Chingu</p>
            </div>
          )}
          {/* Hangul Grid */}
          <div className={`grid grid-cols-3 gap-3 w-full max-w-xs ${vigente ? "" : "hidden lg:grid"}`}>
            {hangulCards.map((card) => (
              <div
                key={card.char}
                className={`border-2 px-3 py-4 text-center transition-all hover:-translate-x-1 hover:-translate-y-1 cursor-default
                  ${card.accent
                    ? "border-[#3D2EE8] shadow-[4px_4px_0_#3D2EE8] hover:shadow-[7px_7px_0_#3D2EE8]"
                    : "border-[#0D0D0D] bg-white shadow-[4px_4px_0_#0D0D0D] hover:shadow-[7px_7px_0_#0D0D0D]"
                  }`}
              >
                <div
                  className={`text-4xl font-black leading-none mb-1 ${card.accent ? "text-[#3D2EE8]" : "text-[#0D0D0D]"}`}
                  style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
                >
                  {card.char}
                </div>
                <div className="text-[10px] font-bold tracking-wider text-gray-500">
                  {card.roman}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALLER GRABADO (solo cuando no hay taller en vivo agendado) ── */}
      {!vigente && (
        <section className="bg-[#F4F7FF] py-16 px-6 md:px-14 border-t-4 border-[#0D0D0D]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#3D2EE8] text-xs font-bold tracking-[3px] uppercase mb-3">
              ¿Ya viste el taller?
            </p>
            <h2
              className="font-black text-[#0D0D0D] leading-none mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
            >
              Tu siguiente paso, gratis
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Practica lo que viste en el video con nuestras dos apps gratuitas, y cuando quieras ir en serio,
              Básico 1 parte la semana del 12 de octubre.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { e: "🧩", t: "Dubu · 두부", d: "Puzzle: combina consonante + vocal y forma la palabra que lees o escuchas.", h: "/dubu", c: "Jugar" },
                { e: "🐯", t: "Lector de Hangul", d: "Toca cada letra y escucha la voz nativa. Practica lectura y números.", h: "/lector-coreano", c: "Practicar" },
                { e: "🌱", t: "Básico 1 (A1.1)", d: "8 semanas en vivo con la Prof.ª Kiran · martes o jueves 20:00 Chile · US$150 el curso completo · o 2 cuotas de US$75.", h: "/nivel-1?clase=a11-martes", c: "Ver el curso" },
              ].map((x) => (
                <Link key={x.h} href={x.h} className="bg-white border-2 border-[#0D0D0D] p-5 shadow-[4px_4px_0_#0D0D0D] hover:shadow-[6px_6px_0_#3D2EE8] hover:-translate-y-0.5 transition-all">
                  <div className="text-3xl mb-2">{x.e}</div>
                  <div className="font-bold text-[#0D0D0D] mb-1">{x.t}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{x.d}</p>
                  <span className="text-[#3D2EE8] font-bold text-sm">{x.c} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TIME ZONES (solo con taller vigente) ── */}
      {vigente && (
      <section className="bg-[#0D0D0D] py-16 px-6 md:px-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#E8B84B] text-xs font-bold tracking-[3px] uppercase mb-3 text-center">
            Horario por país
          </p>
          <h2 className="font-black text-white leading-none mb-2 text-center"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
          >
            {PROXIMO_TALLER.fechaLabel}
          </h2>
          <p className="text-white/60 text-sm text-center mb-10">
            Conéctate desde donde estés — encuentra tu hora local 🌎
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {timezones.map((tz) => (
              <div
                key={tz.country}
                className={`flex items-center justify-between gap-3 px-5 py-4 border-2 transition-all ${
                  tz.highlight
                    ? "bg-[#3D2EE8] border-[#E8B84B] shadow-[4px_4px_0_#E8B84B]"
                    : "bg-white/5 border-white/15 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tz.flag}</span>
                  <span className={`text-sm font-semibold ${tz.highlight ? "text-white" : "text-white/80"}`}>
                    {tz.country}
                  </span>
                </div>
                <span
                  className={`font-black text-lg ${tz.highlight ? "text-[#E8B84B]" : "text-white"}`}
                  style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
                >
                  {tz.time}
                </span>
              </div>
            ))}
          </div>

          <p className="text-white/40 text-xs text-center mt-6">
            ¿No estás seguro de tu horario? Te lo confirmaremos por correo al registrarte.
          </p>
        </div>
      </section>
      )}

      {/* ── LEARNS ── */}
      <section className="bg-[#F4F7FF] py-24 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#3D2EE8] text-xs font-bold tracking-[3px] uppercase mb-3">
            Lo que aprenderás
          </p>
          <h2 className="font-black leading-none mb-12 text-[#0D0D0D]"
            style={{ fontSize: "clamp(36px, 5vw, 58px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
          >
            En 1 hora dominarás:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learns.map((l) => (
              <div key={l.num} className="bg-white border-2 border-[#0D0D0D] p-7 shadow-[4px_4px_0_#0D0D0D] hover:shadow-[6px_6px_0_#0D0D0D] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{l.emoji}</span>
                  <span className="text-[#3D2EE8] font-black text-2xl"
                    style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
                  >
                    {l.num}
                  </span>
                </div>
                <h3 className="font-bold text-[#0D0D0D] text-lg mb-2">{l.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTOR ── */}
      <section className="bg-[#0D0D0D] py-24 px-6 md:px-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* YouTube Short — 10 palabras en coreano */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0">
            <div className="relative aspect-[9/16] overflow-hidden bg-black">
              <LiteYouTube id="0SA2X1LGsgA" title="10 palabras en coreano — Jay Chingu" vertical />
            </div>
            <div className="absolute -bottom-1 -left-1 -right-1 h-1.5 bg-gradient-to-r from-[#003478] via-white to-[#3D2EE8]" />
          </div>

          {/* Text */}
          <div>
            <p className="text-[#E8B84B] text-xs font-bold tracking-[3px] uppercase mb-3">
              Tu instructor
            </p>
            <h2 className="font-black text-white leading-none mb-5"
              style={{ fontSize: "clamp(34px, 4vw, 50px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
            >
              Hola, soy Jay Chingu 👋
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-7">
              Nací en <strong className="text-[#E8B84B]">Seúl, Corea del Sur</strong> y llevo años viviendo en Latinoamérica. Sé exactamente qué le cuesta a un hispanohablante aprender coreano — y cómo hacerlo mucho más fácil.
              <br /><br />
              Soy el fundador de <strong className="text-white">Academia Seúl</strong> y creador de contenido en{" "}
              <strong className="text-[#E8B84B]">@jaychingu.oficial</strong>, donde Los Chingus aprenden coreano de una forma que ningún libro puede enseñar.
            </p>
            <div className="flex flex-wrap gap-2">
              {["🇰🇷 Seulita de corazón", "🇨🇱 Viviendo en Santiago", "🎓 Método Chingu™", "📱 @jaychingu.oficial", "🌎 Para toda LATAM"].map((tag) => (
                <span key={tag} className="bg-white/8 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTRO ── */}
      <section id="registro" className="bg-[#3D2EE8] py-24 px-6 md:px-14 relative overflow-hidden">
        <div
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none"
          style={{
            fontSize: "280px",
            fontFamily: "'Noto Sans KR', sans-serif",
            color: "rgba(255, 255, 255, 0.06)",
          }}
        >
          한글
        </div>

        <div className="max-w-xl mx-auto relative z-10 text-center">
          <p className="text-[#E8B84B] text-xs font-bold tracking-[3px] uppercase mb-3">
            {vigente ? "¡Cupos limitados!" : "Material + próximo taller en vivo"}
          </p>
          <h2 className="font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
          >
            {vigente ? "Reserva tu lugar" : "Quiero el material del taller"}
          </h2>
          <p className="text-white/90 text-sm font-bold mb-2 tracking-wider uppercase">
            {vigente ? `📅 ${fechaCompleta}` : "📩 Guía del alfabeto en PDF + aviso del próximo taller en vivo"}
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            {vigente
              ? "Regístrate gratis y te enviamos el link de Zoom por correo. No necesitas saber nada de coreano — solo ganas. 화이팅 chingu 🇰🇷"
              : "Déjanos tus datos y te mandamos la guía del alfabeto para repasar lo del video, y serás de los primeros en saber la fecha del próximo taller en vivo. 화이팅 chingu 🇰🇷"}
          </p>

          {submitted ? (
            <div className="bg-white/15 border border-white/30 p-10 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-white font-black text-2xl mb-2"
                style={{ fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
              >
                {vigente ? "¡Tu lugar está reservado!" : "¡Listo, chingu!"}
              </h3>
              <p className="text-white/80 text-sm mb-3">
                {vigente ? (
                  <>Nos vemos el <strong>{fechaCompleta}</strong>.</>
                ) : (
                  <>Te avisaremos por correo apenas anunciemos la fecha del próximo taller.</>
                )}
              </p>
              <p className="text-white/70 text-sm">
                {vigente
                  ? "Te enviaremos el link de Zoom por correo unas horas antes. 화이팅!"
                  : "Mientras tanto, sígueme en @jaychingu.oficial para contenido diario. 화이팅!"}
              </p>
            </div>
          ) : (
            <div className="text-left space-y-4">
              {textFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-white/70 text-xs font-bold tracking-[1.5px] uppercase mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/30 text-white placeholder-white/40 outline-none focus:border-[#E8B84B] transition-colors font-sans text-sm"
                  />
                </div>
              ))}

              {selectFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-white/70 text-xs font-bold tracking-[1.5px] uppercase mb-2">
                    {field.label}
                  </label>
                  <select
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/30 text-white outline-none focus:border-[#E8B84B] transition-colors appearance-none text-sm"
                  >
                    <option value="" disabled>{field.placeholder}</option>
                    {field.options.map((o) => <option key={o} value={o} className="bg-[#1A1A2E]">{o}</option>)}
                  </select>
                </div>
              ))}

              {error && (
                <div className="bg-white/15 border border-white/40 text-white text-sm p-3">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || !formData.nombre || !formData.email}
                className="w-full py-4 mt-2 bg-[#E8B84B] text-[#0D0D0D] font-bold text-base border-2 border-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D] hover:shadow-[6px_6px_0_#0D0D0D] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando..." : vigente ? "🎓 ¡Quiero mi lugar gratis!" : "📩 Quiero el material y el aviso del próximo taller"}
              </button>
              <p className="text-white/50 text-xs text-center pt-1">
                Sin spam. Sin cargos. Solo te avisamos sobre el taller.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 md:px-14 max-w-6xl mx-auto">
        <p className="text-[#3D2EE8] text-xs font-bold tracking-[3px] uppercase mb-3">
          Preguntas frecuentes
        </p>
        <h2 className="font-black leading-none mb-12 text-[#0D0D0D]"
          style={{ fontSize: "clamp(36px, 5vw, 58px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
        >
          ¿Tienes dudas?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((f) => (
            <div key={f.q} className="bg-white border-2 border-[#0D0D0D] p-7 shadow-[4px_4px_0_#0D0D0D]">
              <p className="font-bold text-[#0D0D0D] text-sm mb-2">{f.q}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0D0D0D] py-20 px-6 text-center">
        <p className="text-white/50 text-xs font-bold tracking-[3px] uppercase mb-4">¿Listo para empezar?</p>
        <h2 className="font-black text-white leading-none mb-3"
          style={{ fontSize: "clamp(36px, 5vw, 60px)", fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)" }}
        >
          Tu primera palabra coreana<br />
          <span className="text-[#3D2EE8]">te espera.</span>
        </h2>
        <p className="text-[#E8B84B] text-sm font-bold tracking-wider uppercase mb-6">
          {vigente ? `📅 ${fechaCompleta}` : "▶ Taller grabado · gratis · míralo cuando quieras"}
        </p>
        <a
          href={vigente ? "#registro" : "#video"}
          className="inline-flex items-center gap-3 bg-[#3D2EE8] text-white font-bold text-sm px-10 py-4 shadow-[4px_4px_0_rgba(255,255,255,0.2)] hover:bg-[#2C1FB0] transition-colors"
        >
          {vigente ? "Reservar mi lugar gratis" : "Ver el taller ahora"} →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

    </main>
  );
}