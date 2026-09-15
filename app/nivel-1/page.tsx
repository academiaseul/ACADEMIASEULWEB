"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  COHORTE_ABIERTA,
  PROXIMA_COHORTE_LABEL,
  INICIO_LABEL,
  PRECIO_UNICO,
  PRECIO_MENSUAL,
  MESES,
  PAYPAL_LINK_UNICO,
  PAYPAL_LINK_MENSUAL,
  HOTMART_LINK_UNICO,
  HOTMART_LINK_MENSUAL,
  WHATSAPP,
  CLASES,
  TZ_ROWS,
  TZ_NOTA,
  cursoDe,
  type ClaseId,
} from "@/lib/nivel1";

type Plan = "unico" | "mensual";

export default function Nivel1Page() {
  const [selectedClase, setSelectedClase] = useState<ClaseId>("a11-martes");
  const [plan, setPlan] = useState<Plan>("unico");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Inscripción form
  const [form, setForm] = useState({ nombre: "", correo: "", whatsapp: "", edad: "", rut: "", pais: "", nivel: "", comoConocio: "", motivacion: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Confirmación de pago (avisa al owner quién pagó)
  const [payConfirming, setPayConfirming] = useState(false);
  const [payConfirmed, setPayConfirmed] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [pagoStatus, setPagoStatus] = useState<string | null>(null);

  const clase = CLASES.find((c) => c.id === selectedClase) ?? CLASES[1];
  const curso = cursoDe(clase);
  const planLabel =
    plan === "unico"
      ? `US$${PRECIO_UNICO} pago único`
      : `US$${PRECIO_MENSUAL}/mes × ${MESES} meses`;

  const handleInscribir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.whatsapp || !form.edad || !form.rut || !form.pais || !form.nivel || !form.comoConocio) {
      setFormError("Completa todos los campos obligatorios para continuar.");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("https://formspree.io/f/mzdypyky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Nueva inscripción — ${clase.nombre}`,
          curso: `${clase.nombre} (${clase.nivel})`,
          nombre: form.nombre,
          correo: form.correo,
          whatsapp: form.whatsapp,
          edad: form.edad,
          rut: form.rut,
          pais_ciudad: form.pais,
          nivel_coreano: form.nivel,
          como_nos_conociste: form.comoConocio,
          motivacion: form.motivacion,
          clase: clase.label,
          plan: planLabel,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setFormError("Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.");
      }
    } catch {
      setFormError("Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmarPago = async (metodo: string) => {
    setPayConfirming(true);
    try {
      await fetch("https://formspree.io/f/mzdypyky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `💰 PAGO ${clase.nombre} — ${form.nombre || "alumno sin nombre"}`,
          tipo: "Confirmación de pago",
          nombre: form.nombre || "(no completó inscripción)",
          correo: form.correo,
          whatsapp: form.whatsapp,
          clase: clase.label,
          metodo_de_pago: metodo,
          monto: planLabel,
        }),
      });
    } catch {
      /* aunque falle el aviso, confirmamos al alumno; el pago se concilia luego */
    } finally {
      setPayConfirmed(true);
      setPayConfirming(false);
    }
  };

  // Pago con tarjeta vía Mercado Pago (checkout dinámico con datos del alumno)
  const pagarConTarjeta = async () => {
    if (!submitted || !form.nombre || !form.correo) {
      setFormError("Primero completa tus datos arriba para reservar tu cupo.");
      document.getElementById("inscripcion")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setPayLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          correo: form.correo,
          whatsapp: form.whatsapp,
          clase: clase.label,
          cohorteKey: clase.id,
          plan,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
      // Fallback: coordinar por WhatsApp si el checkout no está disponible
      window.location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Hola Jay! Quiero pagar con tarjeta mi cupo en ${clase.nombre} (${planLabel}) y el pago online no cargó.`,
      )}`;
    } catch {
      window.location.href = `https://wa.me/${WHATSAPP}`;
    } finally {
      setPayLoading(false);
    }
  };

  // Lee el resultado del pago al volver de Mercado Pago (?pago=success|pending|failure)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("pago");
    if (!p) return;
    setPagoStatus(p);
    if (p === "success") {
      setSubmitted(true);
      setPayConfirmed(true);
    }
    window.history.replaceState({}, "", "/nivel-1");
  }, []);

  // Countdown al inicio de la cohorte: lunes 5 de octubre de 2026 (hora Chile)
  useEffect(() => {
    const deadline = new Date("2026-10-05T00:00:00-03:00").getTime();
    const tick = () => {
      const now = new Date().getTime();
      const diff = deadline - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const faqs = [
    {
      q: "¿Las clases son en vivo o grabadas?",
      a: "Las sesiones son EN VIVO por Zoom (60 min cada una). Si te perdés alguna, recibís la grabación dentro de las 24 horas.",
    },
    {
      q: "¿Cuánto dura cada curso y cuándo empieza?",
      a: `Todos los cursos duran 8 semanas (2 meses), con 1 clase en vivo por semana. La cohorte arranca la ${INICIO_LABEL.toLowerCase()} y termina la semana del 23 de noviembre.`,
    },
    {
      q: "¿Cuánto cuesta y cómo pago?",
      a: `Cada curso cuesta US$${PRECIO_UNICO} en pago único, o US$${PRECIO_MENSUAL}/mes durante ${MESES} meses. Aceptamos Mercado Pago (tarjetas de crédito y débito), PayPal (internacional) y transferencia bancaria en Chile (sin comisión).`,
    },
    {
      q: "¿Necesito experiencia previa?",
      a: "Para Básico 1 y Coreano para Niños: cero, empezamos desde el alfabeto. Conversacional A2.1 requiere A1 completo (o nuestro quiz de nivel), Básico 2 requiere Básico 1, y TOPIK II es para nivel intermedio.",
    },
    {
      q: "¿Qué pasa si no puedo asistir a mi clase un día?",
      a: "Sin problema. Recibís la grabación + podés escribirnos para una recuperación breve de dudas.",
    },
    {
      q: "¿Cuántas personas hay por clase?",
      a: "Máximo 15 alumnos por clase (8 en TOPIK II y 12 en Niños). Grupos chicos para que el profesor corrija tu pronunciación personalmente.",
    },
    {
      q: "¿Recibo certificado?",
      a: "Sí, está incluido. Al completar tu curso recibís el certificado de Academia Seúl del nivel correspondiente, en base a tu asistencia y participación.",
    },
    {
      q: "¿En qué hora llegan las clases a mi país?",
      a: "Los horarios son en hora de Chile. En la tabla de husos horarios de esta página ves la hora exacta para México, Colombia, Perú, Argentina, EE.UU. y España.",
    },
  ];

  // Página de cierre + lista de espera cuando la cohorte no está abierta.
  if (!COHORTE_ABIERTA) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation solid />
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 bg-[#F5F3FF]">
          <span className="inline-flex items-center gap-2 bg-white border border-[#E5E1FB] text-[#4036ED] text-xs font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-6">
            Cursos en vivo
          </span>
          <h1 className="font-black text-gray-900 leading-tight mb-5" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            Esta cohorte ya está en marcha
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mb-8">
            Anotate en la lista de espera y te avisamos apenas se abran los cupos de la próxima
            cohorte ({PROXIMA_COHORTE_LABEL}) — con acceso prioritario a horarios y precio.
          </p>
          <Link
            href="/notificarme?curso=nivel1"
            className="inline-flex items-center gap-2 bg-[#4036ED] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#332BC7] transition-colors"
          >
            Anotarme en la lista de espera →
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <Navigation solid />

      {/* Aviso de resultado de pago (al volver de Mercado Pago) */}
      {pagoStatus && (
        <div className="pt-20 md:pt-24 px-6">
          <div
            className={`max-w-2xl mx-auto rounded-2xl p-5 text-center border ${
              pagoStatus === "success"
                ? "bg-[#F0FBF4] border-[#BCEBCD] text-green-800"
                : pagoStatus === "pending"
                ? "bg-[#FFF8E6] border-[#F2E2A8] text-yellow-800"
                : "bg-[#FFF1F1] border-[#F3C6C6] text-red-800"
            }`}
          >
            {pagoStatus === "success" && (
              <p className="font-bold">✅ ¡Pago recibido! Tu cupo está confirmado. Te escribimos por correo/WhatsApp con los siguientes pasos. 🎉</p>
            )}
            {pagoStatus === "pending" && (
              <p className="font-bold">⏳ Tu pago quedó pendiente. Apenas se acredite, confirmamos tu cupo y te avisamos.</p>
            )}
            {pagoStatus === "failure" && (
              <p className="font-bold">No se completó el pago. Puedes intentar de nuevo abajo o escribirnos por WhatsApp.</p>
            )}
          </div>
        </div>
      )}

      {/* Hero Cobalto */}
      <section className="relative overflow-hidden text-white pt-16 md:pt-20" style={{ backgroundColor: "#3D2EE8" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 text-xs font-bold tracking-widest">
              MATRÍCULA ABIERTA · COHORTE OCTUBRE 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="block text-3xl md:text-4xl mb-3 opacity-80">한국어 수업</span>
              Cursos en vivo de coreano
            </h1>
            <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto opacity-90">
              8 semanas · 1 clase en vivo por semana · 60 min · certificado incluido
            </p>
            <p className="text-base md:text-lg mt-3 max-w-2xl mx-auto opacity-70 italic">
              Desde cero hasta TOPIK II — elige tu nivel y tu horario. Inicio: {INICIO_LABEL.toLowerCase()}.
            </p>

            {/* Countdown */}
            <div className="mt-10 inline-block bg-white/10 backdrop-blur rounded-2xl px-6 py-4">
              <div className="text-xs tracking-widest opacity-80 mb-2">⏰ LAS CLASES EMPIEZAN EN</div>
              <div className="flex gap-4 md:gap-6 justify-center text-2xl md:text-4xl font-bold">
                <div><div>{timeLeft.days}</div><div className="text-xs opacity-70 mt-1">DÍAS</div></div>
                <div className="opacity-40">:</div>
                <div><div>{timeLeft.hours.toString().padStart(2, "0")}</div><div className="text-xs opacity-70 mt-1">HORAS</div></div>
                <div className="opacity-40">:</div>
                <div><div>{timeLeft.minutes.toString().padStart(2, "0")}</div><div className="text-xs opacity-70 mt-1">MIN</div></div>
                <div className="opacity-40">:</div>
                <div><div>{timeLeft.seconds.toString().padStart(2, "0")}</div><div className="text-xs opacity-70 mt-1">SEG</div></div>
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="#clases" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">
                Elegir mi clase
              </a>
              <a href="/programa" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">
                Ver programa y syllabus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de clase */}
      <section id="clases" className="py-16" style={{ backgroundColor: "#F5F3FF" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Elige tu clase
          </h2>
          <p className="text-gray-600 text-center mb-12">
            6 clases · horarios en hora de Chile · todas parten la {INICIO_LABEL.toLowerCase()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {CLASES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClase(c.id)}
                className={`p-6 rounded-2xl border-2 text-left transition ${
                  selectedClase === c.id
                    ? "border-[#3D2EE8] bg-white shadow-lg"
                    : "border-gray-200 bg-white/50 hover:border-gray-300"
                }`}
              >
                <div className="text-3xl mb-2">{c.emoji}</div>
                <div className="text-lg font-bold text-gray-900 leading-tight mb-1">{c.nombre}</div>
                <div className="text-xs font-bold tracking-wide uppercase mb-3" style={{ color: "#818CF8" }}>{c.nivel}</div>
                <div className="text-sm text-gray-700 font-semibold">{c.dia} · {c.horaChile} Chile</div>
                <div className="text-xs text-gray-500 mt-1">{c.profe} · primera clase: {c.primeraClase}</div>
                <div className="text-xs text-gray-500 mt-1">Cupos: {c.cupos}</div>
                {selectedClase === c.id && (
                  <div className="mt-3 text-xs font-bold" style={{ color: "#3D2EE8" }}>✓ Seleccionada</div>
                )}
              </button>
            ))}
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>📌 Grupos chicos para corregir tu pronunciación personalmente · Básico 1 tiene dos secciones (martes o jueves): elige una</p>
          </div>
        </div>
      </section>

      {/* Husos horarios */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            ¿A qué hora es en tu país?
          </h2>
          <p className="text-gray-600 text-center mb-10">Los horarios de arriba son hora de Chile — aquí está la conversión</p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="text-white" style={{ backgroundColor: "#3D2EE8" }}>
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

      {/* Programa de la clase seleccionada */}
      <section id="programa" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Las 8 semanas de {curso.nombre}
          </h2>
          <p className="text-gray-600 text-center mb-12">
            {curso.nivel} · {clase.dia} {clase.horaChile} hora Chile · {clase.profe}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curso.sesiones.map((s) => (
              <div key={s.num} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#3D2EE8] transition">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>
                  {s.num.toString().padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{s.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/programa"
              className="inline-flex items-center gap-2 bg-white text-[#3D2EE8] font-bold px-7 py-3.5 rounded-full border-2 border-[#3D2EE8] hover:bg-[#3D2EE8] hover:text-white transition"
            >
              📚 Ver el programa completo de todos los cursos
            </a>
          </div>
        </div>
      </section>

      {/* Inscripción form */}
      <section id="inscripcion" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
            {[
              { n: "1", t: "Regístrate" },
              { n: "2", t: "Paga" },
              { n: "3", t: "¡Listo!" },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: i === 0 ? "#3D2EE8" : "#CBC7EA" }}
                  >
                    {s.n}
                  </div>
                  <span className={`text-sm font-bold ${i === 0 ? "text-[#3D2EE8]" : "text-gray-400"}`}>{s.t}</span>
                </div>
                {i < 2 && <div className="w-6 sm:w-10 h-px bg-gray-300" />}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 mb-4 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>
              PASO 1 · FORMULARIO DE INSCRIPCIÓN
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Reserva tu cupo</h2>
            <p className="text-gray-600">
              Completa tu inscripción y elige tu clase. En el siguiente paso confirmas tu cupo con el pago.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleInscribir} className="bg-[#F5F3FF] rounded-3xl p-6 md:p-8 border border-[#E5E1FB] space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre completo</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Tu nombre y apellido (o el de tu hijo/a para Niños)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Correo</label>
                  <input
                    type="email"
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                    placeholder="tucorreo@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp / Teléfono</label>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="+56 9 1234 5678"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Edad del alumno</label>
                <input
                  type="number"
                  min={1}
                  value={form.edad}
                  onChange={(e) => setForm({ ...form, edad: e.target.value })}
                  placeholder="Ej: 24"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">RUT / Documento de identidad</label>
                <input
                  type="text"
                  value={form.rut}
                  onChange={(e) => setForm({ ...form, rut: e.target.value })}
                  placeholder="12.345.678-9 (o tu ID si estás fuera de Chile)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition"
                />
                <p className="text-xs text-gray-500 mt-1">Lo usamos para tu certificado oficial (incluido en el curso).</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">País y ciudad</label>
                <input
                  type="text"
                  value={form.pais}
                  onChange={(e) => setForm({ ...form, pais: e.target.value })}
                  placeholder="Ej: Chile, Santiago"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition"
                />
                <p className="text-xs text-gray-500 mt-1">Para confirmar tu horario local y tu método de pago.</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">¿Cuál es tu nivel de coreano?</label>
                <select
                  value={form.nivel}
                  onChange={(e) => setForm({ ...form, nivel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition bg-white"
                >
                  <option value="">Selecciona tu nivel</option>
                  <option value="Desde cero">Empiezo desde cero (no sé nada) 🐣</option>
                  <option value="Leo algo del alfabeto">Sé leer algo del alfabeto (한글)</option>
                  <option value="Leo 한글 y algo de vocabulario">Ya leo 한글 y sé algo de vocabulario</option>
                  <option value="Nivel A1 completo">Terminé A1 (puedo presentarme y conversar básico)</option>
                  <option value="Intermedio (voy por TOPIK II)">Intermedio — voy por el TOPIK II</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">¿Cómo nos conociste?</label>
                <select
                  value={form.comoConocio}
                  onChange={(e) => setForm({ ...form, comoConocio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Lector de Hangul">El Lector de Hangul</option>
                  <option value="Taller gratuito">El taller gratuito</option>
                  <option value="Recomendación de un amigo">Recomendación de un amigo</option>
                  <option value="Google / búsqueda">Google / búsqueda</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">¿Por qué quieres aprender coreano? <span className="font-normal text-gray-400">(opcional)</span></label>
                <textarea
                  value={form.motivacion}
                  onChange={(e) => setForm({ ...form, motivacion: e.target.value })}
                  rows={3}
                  placeholder="Cuéntanos tu motivación: K-pop, K-drama, un viaje, trabajo, la cultura... ¡Nos ayuda a conocerte! 💜"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Clase</label>
                <select
                  value={selectedClase}
                  onChange={(e) => setSelectedClase(e.target.value as ClaseId)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition bg-white"
                >
                  {CLASES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {formError && <p className="text-sm text-[#3D2EE8] font-medium">{formError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-60"
                style={{ backgroundColor: "#3D2EE8" }}
              >
                {submitting ? "Enviando..." : "Reservar mi cupo →"}
              </button>
              <p className="text-center text-xs text-gray-500">🔒 Tus datos están protegidos y no se comparten.</p>
            </form>
          ) : (
            <div className="bg-[#F0FBF4] rounded-3xl p-8 border border-[#BCEBCD] text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Cupo reservado, {form.nombre.split(" ")[0]}!</h3>
              <p className="text-gray-700 mb-2">
                Te anotamos en <strong>{clase.nombre} · {clase.dia} {clase.horaChile} Chile</strong>. Ahora elige cómo pagar abajo para confirmar tu lugar.
              </p>
              <a href="#pricing" className="inline-block mt-4 px-8 py-3 rounded-full text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>
                Ir a pagar ↓
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 mb-3 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>
              PASO 2 · PAGO
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Completa tu pago
            </h2>
            <p className="text-sm font-bold tracking-widest" style={{ color: "#818CF8" }}>
              COHORTE OCTUBRE 2026 · MISMO PRECIO PARA TODOS LOS CURSOS
            </p>
          </div>

          <div className="bg-white border-2 border-[#3D2EE8] rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Plan selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setPlan("unico")}
                className={`p-6 rounded-2xl border-2 text-center transition ${
                  plan === "unico" ? "border-[#3D2EE8] bg-[#F5F3FF] shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">PAGO ÚNICO</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: "#3D2EE8" }}>US${PRECIO_UNICO}</div>
                <div className="text-sm text-gray-600 mt-2">El curso completo de 8 semanas, un solo pago</div>
                {plan === "unico" && <div className="mt-3 text-xs font-bold" style={{ color: "#3D2EE8" }}>✓ Seleccionado</div>}
              </button>
              <button
                type="button"
                onClick={() => setPlan("mensual")}
                className={`p-6 rounded-2xl border-2 text-center transition ${
                  plan === "mensual" ? "border-[#3D2EE8] bg-[#F5F3FF] shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">PLAN MENSUAL</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: "#3D2EE8" }}>
                  US${PRECIO_MENSUAL}<span className="text-xl font-bold text-gray-500">/mes</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">{MESES} pagos mensuales (total US${PRECIO_MENSUAL * MESES})</div>
                {plan === "mensual" && <div className="mt-3 text-xs font-bold" style={{ color: "#3D2EE8" }}>✓ Seleccionado</div>}
              </button>
            </div>

            {/* What's included */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Todos los cursos incluyen:</h3>
              <ul className="space-y-3 max-w-md mx-auto">
                {[
                  "8 clases en vivo por Zoom (60 min c/u)",
                  "Certificado oficial de Academia Seúl al terminar",
                  "Grabaciones de cada clase (24 h después)",
                  "Slides + hojas de actividad por sesión",
                  "Lector de Hangul con audio nativo (tarea gamificada)",
                  "Pronunciación corregida personalmente",
                  "Grupos chicos (máx. 15 · TOPIK 8 · Niños 12)",
                  "Comunidad de alumnos por WhatsApp/Discord",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span style={{ color: "#3D2EE8" }} className="font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment buttons */}
            <div className="space-y-3">
              <div className="text-center text-sm text-gray-600 mb-1">
                Clase: <strong className="text-gray-900">{clase.nombre} · {clase.dia} {clase.horaChile}</strong>
                {" · "}Plan: <strong className="text-gray-900">{planLabel}</strong>
              </div>
              <p className="text-center text-xs font-bold tracking-widest text-gray-400 mb-3">ELIGE CÓMO PAGAR</p>

              {/* Transferencia bancaria — datos por WhatsApp (privado, sin comisión) */}
              <div className="bg-[#F5F3FF] border-2 border-[#3D2EE8] rounded-2xl p-6 text-left">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <p className="text-base font-bold text-gray-900">🏦 Transferencia bancaria · Chile</p>
                  <span className="text-[10px] font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: "#16a34a" }}>RECOMENDADO · SIN COMISIÓN</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Es la opción <strong>sin comisión</strong>: el monto llega completo. Escríbenos por WhatsApp y
                  te enviamos los datos de la cuenta y te guiamos paso a paso.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    `Hola Jay! Quiero inscribirme en ${clase.nombre} (${clase.dia} ${clase.horaChile} Chile) con ${planLabel}. ¿Me pasas los datos para la transferencia?`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 px-6 py-3 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: "#25D366" }}
                >
                  📲 Pedir datos por WhatsApp
                </a>
              </div>

              <p className="text-center text-xs text-gray-400 pt-2">o paga al instante con</p>

              {/* Tarjeta crédito/débito (Mercado Pago — checkout con tus datos) */}
              <button
                type="button"
                onClick={pagarConTarjeta}
                disabled={payLoading}
                className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition disabled:opacity-60"
              >
                {payLoading ? "Abriendo pago seguro…" : `💳 Tarjeta de crédito / débito · Mercado Pago (${planLabel})`}
              </button>
              <p className="text-center text-xs text-gray-500 -mt-1">Visa, Mastercard y débito · se cobra el equivalente en CLP. Reserva tu cupo arriba antes de pagar.</p>

              {/* PayPal */}
              {plan === "unico" || PAYPAL_LINK_MENSUAL ? (
                <a
                  href={plan === "unico" ? PAYPAL_LINK_UNICO : PAYPAL_LINK_MENSUAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition"
                >
                  🌍 PayPal · pago internacional en USD ({plan === "unico" ? `US$${PRECIO_UNICO}` : `US$${PRECIO_MENSUAL}/mes`})
                </a>
              ) : (
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    `Hola Jay! Estoy fuera de Chile y quiero pagar ${clase.nombre} con el plan mensual de US$${PRECIO_MENSUAL}. ¿Me envías el link de PayPal?`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition"
                >
                  🌍 PayPal mensual · te enviamos el link por WhatsApp
                </a>
              )}
              <p className="text-center text-xs text-gray-500">
                Con PayPal también puedes pagar con tarjeta <strong>sin tener cuenta PayPal</strong> (opción &ldquo;Pagar con tarjeta&rdquo;).
              </p>

              {/* Hotmart — checkout en la moneda del alumno (EE.UU., España, resto del mundo) */}
              {(plan === "unico" ? HOTMART_LINK_UNICO : HOTMART_LINK_MENSUAL) && (
                <>
                  <a
                    href={plan === "unico" ? HOTMART_LINK_UNICO : HOTMART_LINK_MENSUAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition"
                  >
                    🌐 Tarjeta internacional en tu moneda · Hotmart ({plan === "unico" ? `US$${PRECIO_UNICO}` : `US$${PRECIO_MENSUAL}/mes`})
                  </a>
                  <p className="text-center text-xs text-gray-500 -mt-1">
                    Ideal desde EE.UU., España o Europa: pagas en USD, EUR o tu moneda local con cualquier tarjeta.
                  </p>
                </>
              )}

              {/* Paso 3 · Confirmar pago (avisa al equipo quién pagó) */}
              <div className="mt-6 pt-6 border-t border-dashed border-gray-300">
                {!payConfirmed ? (
                  <div className="text-center">
                    <div className="inline-block px-3 py-1 mb-2 rounded-full text-[10px] font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>
                      PASO 3 · CONFIRMA
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">¿Ya hiciste tu pago?</p>
                    <p className="text-xs text-gray-500 mb-4">
                      Confírmalo aquí y reservamos tu cupo en <strong>{clase.nombre}</strong>.
                      Te escribimos por correo/WhatsApp para darte la bienvenida.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { m: "Mercado Pago (tarjeta)", e: "💳" },
                        { m: "PayPal", e: "🌍" },
                        ...(HOTMART_LINK_UNICO ? [{ m: "Hotmart", e: "🌐" }] : []),
                        { m: "Transferencia bancaria", e: "🏦" },
                      ].map((opt) => (
                        <button
                          key={opt.m}
                          type="button"
                          disabled={payConfirming}
                          onClick={() => confirmarPago(opt.m)}
                          className="px-4 py-2.5 rounded-full text-sm font-bold border-2 border-[#3D2EE8] text-[#3D2EE8] hover:bg-[#3D2EE8] hover:text-white transition disabled:opacity-50"
                        >
                          {opt.e} Ya pagué con {opt.m}
                        </button>
                      ))}
                    </div>
                    {payConfirming && <p className="text-xs text-gray-400 mt-3">Enviando confirmación…</p>}
                  </div>
                ) : (
                  <div className="text-center bg-[#F0FBF4] border border-[#BCEBCD] rounded-2xl p-5">
                    <div className="text-3xl mb-1">✅</div>
                    <p className="text-sm font-bold text-gray-900">
                      ¡Gracias{form.nombre ? `, ${form.nombre.split(" ")[0]}` : ""}! Registramos tu pago.
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Verificamos y te confirmamos tu cupo por correo/WhatsApp en las próximas horas. 화이팅!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-6">
              🔒 Certificado incluido · Grabaciones incluidas · Tu información está protegida
            </div>
          </div>
        </div>
      </section>

      {/* Profesores */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F3FF]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Tu equipo de profesores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nativos y bilingües, con años de experiencia enseñando coreano a hispanohablantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nombre: "Jay Kim · 김재희",
                rol: "Fundador · Básico 2 y TOPIK II",
                desc: "Coreano nativo radicado en Chile. Creador del Método Chingu™ y del Lector de Hangul. 8+ años enseñando a hispanohablantes.",
                emoji: "🐯",
              },
              {
                nombre: "Abby · 홍미영",
                rol: "Conversacional A2.1",
                desc: "Profesora coreana nativa, pedagoga (MSU). Dicta el conversacional desde Corea — clases donde solo se habla.",
                emoji: "💬",
              },
              {
                nombre: "Guiran · 기란",
                rol: "Básico 1 (martes y jueves)",
                desc: "Profesora coreana criada en Argentina — bilingüe perfecta. Años de experiencia enseñando coreano en español.",
                emoji: "🌱",
              },
            ].map((p) => (
              <div key={p.nombre} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-5xl mb-3">{p.emoji}</div>
                <h3 className="font-bold text-gray-900">{p.nombre}</h3>
                <div className="text-xs font-bold tracking-wide uppercase mt-1 mb-3" style={{ color: "#3D2EE8" }}>{p.rol}</div>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F5F3FF]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl p-5 group">
                <summary className="cursor-pointer font-bold text-gray-900 list-none flex justify-between items-center">
                  <span>{faq.q}</span>
                  <span className="text-[#3D2EE8] group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-white" style={{ backgroundColor: "#3D2EE8" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Las clases arrancan la {INICIO_LABEL.toLowerCase()} — US${PRECIO_UNICO} el curso completo
            o US${PRECIO_MENSUAL}/mes. Certificado incluido.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#inscripcion" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">
              Reservar mi cupo
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">
              💬 Hablar con Jay primero
            </a>
          </div>
          <div className="mt-8 text-sm opacity-70">
            화이팅 chingu! Te esperamos el 5 de octubre.
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
