"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Cohorte = "martes" | "jueves" | "sabado";

export default function Nivel1Page() {
  const [selectedCohorte, setSelectedCohorte] = useState<Cohorte>("martes");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Inscripción form
  const [form, setForm] = useState({ nombre: "", correo: "", whatsapp: "", edad: "", rut: "", comoConocio: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Confirmación de pago (avisa al owner quién pagó)
  const [payConfirming, setPayConfirming] = useState(false);
  const [payConfirmed, setPayConfirmed] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [pagoStatus, setPagoStatus] = useState<string | null>(null);

  const handleInscribir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.whatsapp || !form.edad || !form.rut || !form.comoConocio) {
      setFormError("Completa todos los campos para continuar.");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      // NOTE: replace this Formspree endpoint with a dedicated one for el curso si quieres separarlo del taller.
      const res = await fetch("https://formspree.io/f/mzdypyky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "Nueva inscripción — Nivel 1 A1",
          curso: "Nivel 1 · A1 (CEFR A1 → TOPIK 1)",
          nombre: form.nombre,
          correo: form.correo,
          whatsapp: form.whatsapp,
          edad: form.edad,
          rut: form.rut,
          como_nos_conociste: form.comoConocio,
          clase: cohortes[selectedCohorte].label,
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
          _subject: `💰 PAGO Nivel 1 — ${form.nombre || "alumno sin nombre"}`,
          tipo: "Confirmación de pago",
          nombre: form.nombre || "(no completó inscripción)",
          correo: form.correo,
          whatsapp: form.whatsapp,
          clase: cohortes[selectedCohorte].label,
          metodo_de_pago: metodo,
          monto: "$89 USD / $85.000 CLP",
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
          clase: cohortes[selectedCohorte].label,
          cohorteKey: selectedCohorte,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
      // Fallback: link de pago estático de Mercado Pago
      window.location.href = cohortes[selectedCohorte].paymentLink;
    } catch {
      window.location.href = cohortes[selectedCohorte].paymentLink;
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

  // Countdown to Monday June 8, 2026 23:59 Chile time
  useEffect(() => {
    const deadline = new Date("2026-07-06T23:59:00-04:00").getTime();
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

  const cohortes = {
    martes: {
      label: "🇨🇱 Clase Martes",
      day: "Martes",
      hora: "20:00 hora Chile",
      ideal: "Ideal para: LATAM (Argentina, Chile, Venezuela, México, Colombia, Perú)",
      paymentLink: "https://mpago.li/2erRfe5",
    },
    jueves: {
      label: "🇨🇱 Clase Jueves",
      day: "Jueves",
      hora: "20:00 hora Chile",
      ideal: "Ideal para: LATAM con agenda flexible mid-week",
      paymentLink: "https://mpago.li/2qoSMzW",
    },
    sabado: {
      label: "🇪🇸 Clase Sábado",
      day: "Sábado",
      hora: "11:00 hora Chile · 16:00 hora España",
      ideal: "Ideal para: España + LATAM que prefiere fin de semana",
      paymentLink: "https://mpago.li/2tZRfqp",
    },
  };

  const lessons = [
    { num: "01", korean: "한글 I", title: "Hangul · Vocales", desc: "Aprende a leer las 11 vocales del coreano" },
    { num: "02", korean: "한글 II", title: "Hangul · Consonantes + Batchim", desc: "14 consonantes + reglas de sílaba" },
    { num: "03", korean: "인사", title: "Saludos y Presentación", desc: "은/는, 이에요/예요, países y profesiones" },
    { num: "04", korean: "일상생활", title: "Vida Diaria + Verbos", desc: "-어요/아요, 20 verbos esenciales" },
    { num: "05", korean: "날짜와 요일", title: "Fechas, Días y Números", desc: "Sistema sino-coreano, calendarios" },
    { num: "06", korean: "위치", title: "Ubicación y Espacio", desc: "있다/없다, 에 vs 에서, posiciones" },
    { num: "07", korean: "하루 일과", title: "Rutina Diaria", desc: "Horas, -고, 부터-까지, ㄷ irregular" },
    { num: "08", korean: "물건 사기", title: "Comprar en Corea", desc: "Clasificadores, 주세요, role-play tienda" },
    { num: "09", korean: "주말", title: "Hablar del Pasado", desc: "-었어요/았어요, razones, frecuencia" },
    { num: "10", korean: "휴가", title: "Vacaciones y Futuro", desc: "-ㄹ 거예요, -고 싶다, ㅂ irregular" },
    { num: "11", korean: "약속", title: "Invitar + Cierre A1", desc: "-ㄹ까요, repaso integral, proyecto final" },
  ];

  const bonos = [
    { icon: "🎁", title: "PDF Pronunciación Coreana", value: "$19", desc: "30 páginas con los sonidos clave para hispanohablantes" },
    { icon: "📞", title: "Sesión 1:1 con Jay", value: "$30", desc: "15 min conmigo personalmente para resolver dudas" },
    { icon: "💬", title: "Acceso Discord Permanente", value: "$20", desc: "Comunidad activa de Academia Seúl para toda la vida" },
    { icon: "⭐", title: "20% OFF Nivel 2", value: "$25", desc: "Descuento garantizado para A2 (sale en octubre)" },
  ];

  const faqs = [
    {
      q: "¿Necesito haber asistido al taller?",
      a: "No, para nada. El precio de lanzamiento de $89 USD es para todos y está vigente hasta el 6 de julio.",
    },
    {
      q: "¿Las clases son en vivo o grabadas?",
      a: "Las 11 sesiones son EN VIVO por Zoom (90 min cada una). Si te perdés alguna, te mando la grabación dentro de las 24 horas.",
    },
    {
      q: "¿Qué pasa si no puedo asistir a mi clase un día?",
      a: "Sin problema. Recibís la grabación + podés sumarte a otra clase esa semana como recuperación.",
    },
    {
      q: "¿Necesito experiencia previa?",
      a: "Cero. Empezamos desde el Hangul (alfabeto). Si ya sabés algo, igual te sirve como base sólida.",
    },
    {
      q: "¿Cómo pago?",
      a: "Aceptamos Mercado Pago (LATAM), PayPal (internacional), y transferencia bancaria (Chile). Pago único, sin cuotas mensuales.",
    },
    {
      q: "¿Cuántas personas hay por clase?",
      a: "Máximo 15 alumnos por clase. Es así para que pueda corregir la pronunciación de cada uno personalmente.",
    },
    {
      q: "¿Recibo certificado?",
      a: "Sí, al terminar las 11 sesiones + el proyecto final, recibís un certificado oficial de Academia Seúl equivalente a CEFR A1 / TOPIK 초급 1.",
    },
    {
      q: "¿Hay tarea entre clases?",
      a: "Sí, hoja de actividad de 45-60 min por sesión + audio de práctica. Todo está incluido en la matrícula.",
    },
  ];

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
              ACADEMIA SEÚL · A1 NIVEL 1
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="block text-3xl md:text-4xl mb-3 opacity-80">코리아 사랑</span>
              Coreano Básico
            </h1>
            <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto opacity-90">
              11 sesiones en vivo · 10 semanas · Método 한국어교실 엿보기
            </p>
            <p className="text-base md:text-lg mt-3 max-w-2xl mx-auto opacity-70 italic">
              De cero a leer y conversar en coreano. Equivalente CEFR A1 + TOPIK 초급 1.
            </p>

            {/* Countdown */}
            <div className="mt-10 inline-block bg-white/10 backdrop-blur rounded-2xl px-6 py-4">
              <div className="text-xs tracking-widest opacity-80 mb-2">⏰ PROMO DE LANZAMIENTO · TERMINA EN</div>
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
              <a href="#inscripcion" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">
                Inscribirme · $89 USD
              </a>
              <a href="#programa" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">
                Ver el programa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué enamorarte del coreano */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 mb-5 rounded-full text-xs font-bold tracking-widest" style={{ backgroundColor: "#FFE2E2", color: "#C8001E" }}>
            NO ES SOLO UN IDIOMA
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Aprender coreano es <span style={{ color: "#3D2EE8" }}>entrar a otra forma</span> de sentir el mundo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            No vas a memorizar reglas frías. Vas a vivir el idioma: la primera vez que lees una palabra y la
            entiendes, la canción que de pronto cobra sentido, la escena del drama que sientes sin subtítulos.
            Eso engancha — y no se olvida.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { emoji: "🎬", title: "Tus K-dramas, sin subtítulos", desc: "Entender lo que de verdad dicen — y lo que no se dice — cambia por completo cómo los sientes." },
              { emoji: "🎵", title: "Tus canciones, por dentro", desc: "Cantar el coreano que ya conoces de memoria… y por fin saber qué significa cada línea." },
              { emoji: "💛", title: "Palabras que el español no tiene", desc: "정 (jeong), 눈치 (nunchi)… conceptos que te hacen ver la vida de otra manera." },
            ].map((c) => (
              <div key={c.title} className="bg-[#F5F3FF] rounded-2xl p-6 border border-[#E5E1FB]">
                <div className="text-4xl mb-3">{c.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#0D0D0D] text-white rounded-3xl px-8 py-10 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              &ldquo;El coreano no es difícil. Simplemente nadie te lo había enseñado pensando en ti.&rdquo;
            </p>
            <p className="text-white/60 mt-4">— El Método Chingu™ pone la cultura antes que la gramática. Por eso se siente distinto.</p>
            <a href="#inscripcion" className="inline-block mt-7 px-8 py-3.5 rounded-full font-bold" style={{ backgroundColor: "#E8B84B", color: "#0D0D0D" }}>
              Quiero empezar →
            </a>
          </div>
        </div>
      </section>

      {/* What you'll learn quick stats */}
      <section className="py-16 bg-gradient-to-b from-[#F5F3FF] to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Al terminar el Nivel 1, vas a poder
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            No teoría — habilidades reales que usás desde el día 1 en Corea o frente a un K-drama.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "📖", title: "Leer y escribir Hangul", desc: "Todo el alfabeto + reglas de batchim" },
              { emoji: "🗣", title: "Presentarte completamente", desc: "Nombre, país, profesión, edad, gustos" },
              { emoji: "🛒", title: "Comprar en una tienda", desc: "Clasificadores, números, precios en 원" },
              { emoji: "🕒", title: "Hablar de tu rutina", desc: "Presente, pasado, futuro simples" },
              { emoji: "✈️", title: "Planificar un viaje", desc: "Decir qué querés hacer y dónde" },
              { emoji: "💬", title: "Invitar a alguien", desc: "Hacer planes, aceptar, rechazar" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camino CEFR A1 → TOPIK 1 */}
      <section className="py-16 bg-[#0D0D0D] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/10 text-xs font-bold tracking-widest">
              TU CAMINO EN EL COREANO
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              De cero a tu primer certificado oficial
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              El Nivel 1 es el primer escalón del marco <strong className="text-white">CEFR A1</strong>. Está
              diseñado para llevarte, paso a paso, hacia tu meta: aprobar el <strong className="text-white">TOPIK 1</strong>,
              el examen oficial de coreano reconocido en todo el mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", badge: "ESTÁS AQUÍ", title: "Nivel 1 · CEFR A1", desc: "Leer Hangul, presentarte, hablar de tu día y comprar. La base sólida.", active: true },
              { step: "2", badge: "SIGUIENTE", title: "Nivel 2 · CEFR A1+", desc: "Más gramática y vocabulario para conversaciones reales.", active: false },
              { step: "3", badge: "LA META", title: "TOPIK 1 (초급 1)", desc: "Preparación y rendición del examen oficial 한국어능력시험.", active: false },
            ].map((s) => (
              <div
                key={s.step}
                className={`rounded-2xl p-6 border ${
                  s.active ? "bg-[#3D2EE8] border-[#3D2EE8]" : "bg-white/5 border-white/10"
                }`}
              >
                <div className={`inline-block text-[10px] font-bold tracking-widest px-2 py-1 rounded-full mb-3 ${s.active ? "bg-white text-[#3D2EE8]" : "bg-white/10 text-white/70"}`}>
                  {s.badge}
                </div>
                <div className="text-2xl font-bold mb-1">{s.title}</div>
                <p className={`text-sm ${s.active ? "text-white/90" : "text-white/60"}`}>{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/50 text-sm mt-8">
            Empieza por la base correcta. El resto del camino se construye sobre el Nivel 1.
          </p>
        </div>
      </section>

      {/* 11 Sesiones programa */}
      <section id="programa" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Las 11 sesiones del programa
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Una clase en vivo por semana · 90 min · Desde el 7 de julio hasta el 15 de septiembre 2026
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson) => (
              <div key={lesson.num} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#3D2EE8] transition">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>
                  {lesson.num}
                </div>
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: "#FF5C5C" }}>{lesson.korean}</div>
                  <h3 className="font-bold text-gray-900">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{lesson.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/programa-curso-nivel-1-a1.pdf"
              download
              className="inline-flex items-center gap-2 bg-white text-[#3D2EE8] font-bold px-7 py-3.5 rounded-full border-2 border-[#3D2EE8] hover:bg-[#3D2EE8] hover:text-white transition"
            >
              📄 Descargar el programa completo (PDF)
            </a>
            <p className="text-xs text-gray-500 mt-2">Programa oficial · objetivos, cronograma y evaluación</p>
          </div>
        </div>
      </section>

      {/* Cohorts selector */}
      <section className="py-16" style={{ backgroundColor: "#F5F3FF" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Elegí tu clase
          </h2>
          <p className="text-gray-600 text-center mb-12">3 horarios para que encuentres el que mejor te acomode</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(cohortes).map(([key, c]) => (
              <button
                key={key}
                onClick={() => setSelectedCohorte(key as Cohorte)}
                className={`p-6 rounded-2xl border-2 text-left transition ${
                  selectedCohorte === key
                    ? "border-[#3D2EE8] bg-white shadow-lg"
                    : "border-gray-200 bg-white/50 hover:border-gray-300"
                }`}
              >
                <div className="text-xl font-bold text-gray-900 mb-2">{c.label}</div>
                <div className="text-sm text-gray-700 mb-3">{c.day} · {c.hora}</div>
                <div className="text-xs text-gray-500 italic">{c.ideal}</div>
                {selectedCohorte === key && (
                  <div className="mt-3 text-xs font-bold" style={{ color: "#3D2EE8" }}>✓ Seleccionada</div>
                )}
              </button>
            ))}
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>📌 15 cupos por clase · Para que pueda corregir tu pronunciación personalmente</p>
          </div>
        </div>
      </section>

      {/* Inscripción form */}
      <section id="inscripcion" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 mb-4 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>
              PASO 1 · TUS DATOS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Reserva tu cupo</h2>
            <p className="text-gray-600">
              Déjanos tus datos y elige tu clase. Luego eliges cómo pagar. Cupos limitados a 15 por clase.
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
                  placeholder="Tu nombre y apellido"
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
                <label className="block text-sm font-bold text-gray-700 mb-1">Edad</label>
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
                <p className="text-xs text-gray-500 mt-1">Lo usamos para tu certificado oficial.</p>
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
                  <option value="Taller gratuito">El taller gratuito</option>
                  <option value="Recomendación de un amigo">Recomendación de un amigo</option>
                  <option value="Google / búsqueda">Google / búsqueda</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Clase</label>
                <select
                  value={selectedCohorte}
                  onChange={(e) => setSelectedCohorte(e.target.value as Cohorte)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition bg-white"
                >
                  {Object.entries(cohortes).map(([key, c]) => (
                    <option key={key} value={key}>{c.label} · {c.day} {c.hora}</option>
                  ))}
                </select>
              </div>

              {formError && <p className="text-sm text-[#C8001E] font-medium">{formError}</p>}

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
                Te anotamos en la <strong>{cohortes[selectedCohorte].label}</strong>. Ahora elige cómo pagar abajo para confirmar tu lugar.
              </p>
              <a href="#pricing" className="inline-block mt-4 px-8 py-3 rounded-full text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>
                Ir a pagar · $89 USD ↓
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 mb-4 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#FF5C5C" }}>
              PROMO DE LANZAMIENTO · HASTA EL 6 DE JULIO
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Tu inversión
            </h2>
          </div>

          <div className="bg-white border-2 border-[#3D2EE8] rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Price comparison */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl text-gray-400 line-through">$129 USD</div>
                <div className="text-xs text-gray-500 mt-1">Precio regular</div>
              </div>
              <div className="text-4xl">→</div>
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold" style={{ color: "#3D2EE8" }}>$89</div>
                <div className="text-sm font-bold mt-1" style={{ color: "#FF5C5C" }}>USD · PROMO LANZAMIENTO</div>
              </div>
            </div>

            <div className="text-center text-gray-700 mb-8">
              <p className="font-bold">Pago único · Acceso permanente · 31% OFF</p>
            </div>

            {/* What's included */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Incluye:</h3>
              <ul className="space-y-3 max-w-md mx-auto">
                {[
                  "11 sesiones en vivo (90 min cada una)",
                  "Slides + hojas de actividad por sesión",
                  "Audios de pronunciación grabados",
                  "Grabaciones de cada clase",
                  "Pronunciación corregida 1:1 sesión por sesión",
                  "Cuaderno Maestro del Estudiante",
                  "200 flashcards digitales",
                  "Discord permanente",
                  "Certificado oficial A1",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span style={{ color: "#3D2EE8" }} className="font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonos */}
            <div className="bg-gradient-to-br from-[#FFE2E2] to-[#FFF5F5] rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-center">+ 4 BONOS GRATIS por inscribirte en junio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {bonos.map((b) => (
                  <div key={b.title} className="bg-white rounded-xl p-4 flex gap-3">
                    <div className="text-2xl">{b.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-gray-900">{b.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{b.desc}</div>
                      <div className="text-xs font-bold mt-2" style={{ color: "#FF5C5C" }}>Valor {b.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4 text-sm font-bold text-gray-900">
                Valor total bonos: $94 USD · GRATIS para vos
              </div>
            </div>

            {/* Payment buttons */}
            <div className="space-y-3">
              <div className="text-center text-sm text-gray-600 mb-1">
                Clase seleccionada: <strong className="text-gray-900">{cohortes[selectedCohorte].label}</strong>
              </div>
              <p className="text-center text-xs font-bold tracking-widest text-gray-400 mb-3">ELIGE CÓMO PAGAR</p>

              {/* Transferencia bancaria — RECOMENDADA (sin comisión) */}
              <div className="bg-[#F5F3FF] border-2 border-[#3D2EE8] rounded-2xl p-6 text-left">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <p className="text-base font-bold text-gray-900">🏦 Transferencia bancaria · Chile</p>
                  <span className="text-[10px] font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: "#16a34a" }}>RECOMENDADO · SIN COMISIÓN</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Pagas <strong style={{ color: "#3D2EE8" }}>$85.000 CLP</strong> y el monto llega completo (sin recargos).
                </p>
                <dl className="text-sm text-gray-700 space-y-1.5">
                  <div className="flex justify-between gap-4"><dt className="text-gray-500">Titular</dt><dd className="font-medium text-gray-900">Jae Hee Kim</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-gray-500">RUT</dt><dd className="font-medium text-gray-900">14.714.427-K</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-gray-500">Banco</dt><dd className="font-medium text-gray-900">BCI</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-gray-500">Tipo de cuenta</dt><dd className="font-medium text-gray-900">Cuenta Corriente</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-gray-500">N° de cuenta</dt><dd className="font-medium text-gray-900">70954542</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-gray-500">Correo</dt><dd className="font-medium text-gray-900">hola.academiaseul@gmail.com</dd></div>
                </dl>
                <p className="text-xs text-gray-600 mt-4">
                  Importante: pon <strong>tu nombre completo</strong> como referencia/glosa de la transferencia
                  para que podamos asociarla a tu inscripción. Luego envía tu comprobante por WhatsApp o al correo.
                </p>
                <a
                  href="https://wa.me/56942115562?text=Hola%20Jay%2C%20ya%20hice%20la%20transferencia%20del%20Nivel%201%20A1%20(%2485.000%20CLP).%20Aqu%C3%AD%20va%20mi%20comprobante%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-5 py-2.5 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: "#25D366" }}
                >
                  📲 Enviar comprobante por WhatsApp
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
                {payLoading ? "Abriendo pago seguro…" : "💳 Tarjeta de crédito / débito · Mercado Pago"}
              </button>
              <p className="text-center text-xs text-gray-500 -mt-1">Pago al instante · Visa, Mastercard y débito (incluye comisión de Mercado Pago). Reserva tu cupo arriba antes de pagar.</p>

              {/* PayPal */}
              <a
                href="https://www.paypal.com/ncp/payment/5X33QK4A928FU"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition"
              >
                🌍 PayPal · pago internacional · $89 USD
              </a>

              <p className="text-center text-xs text-gray-500">
                ¿Fuera de Chile? Escríbenos por WhatsApp y coordinamos tu transferencia internacional.
              </p>

              {/* Paso 3 · Confirmar pago (avisa al equipo quién pagó) */}
              <div className="mt-6 pt-6 border-t border-dashed border-gray-300">
                {!payConfirmed ? (
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 mb-1">¿Ya hiciste tu pago?</p>
                    <p className="text-xs text-gray-500 mb-4">
                      Confírmalo aquí y reservamos tu cupo en la <strong>{cohortes[selectedCohorte].label}</strong>.
                      Te escribimos por correo/WhatsApp para darte la bienvenida.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { m: "Mercado Pago (tarjeta)", e: "💳" },
                        { m: "PayPal", e: "🌍" },
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
              🔒 Pago único · Sin cuotas mensuales · Tu información está protegida
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F3FF]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              El método que vas a usar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Academia Seúl usa el método <strong>한국어교실 엿보기</strong>, el sistema pedagógico oficial del Korea Foundation, adaptado especialmente para hispanohablantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "1", title: "Presentación visual", desc: "Gramática con dibujos, gestos y ejemplos. No tablas aburridas." },
              { num: "2", title: "Práctica controlada", desc: "Drills coral, corrección de pronunciación en vivo." },
              { num: "3", title: "Aplicación libre", desc: "Role-plays reales: café, restaurante, presentación." },
              { num: "4", title: "Cultura integrada", desc: "Cada clase tiene un bloque corto de cultura coreana real." },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4" style={{ backgroundColor: "#3D2EE8" }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Jay */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tu profesor
              </h2>
              <div className="text-2xl font-bold mb-2" style={{ color: "#3D2EE8" }}>
                김재희 · Jay Kim
              </div>
              <p className="text-gray-600 mb-4">
                Fundador de Academia Seúl. Nacido en Seúl, formado en lingüística y pedagogía.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                8+ años enseñando coreano a hispanohablantes en Chile y de manera online. He enseñado a estudiantes que después siguieron carreras en Corea, viajaron al país, o trabajan en empresas coreanas.
              </p>
              <p className="text-gray-700 leading-relaxed">
                El <strong>Método Chingu™</strong> que desarrollé combina lo mejor del método oficial coreano con adaptaciones específicas para hispanohablantes. Por eso mis estudiantes aprenden 3x más rápido que con cursos genéricos.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#3D2EE8] to-[#FF5C5C] aspect-square flex items-center justify-center text-white text-center p-12">
              <div>
                <div className="text-6xl mb-4">👩‍🏫</div>
                <div className="text-4xl font-bold mb-2">김재희</div>
                <div className="text-sm opacity-80">Profesora · Fundadora</div>
                <div className="text-xs opacity-60 mt-3">Academia Seúl · 2026</div>
              </div>
            </div>
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
            El 7 de julio arranca el Nivel 1. El precio de lanzamiento de $89 termina el 6 de julio.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#pricing" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">
              Inscribirme ahora · $89 USD
            </a>
            <a href="https://wa.me/56942115562" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">
              💬 Hablar con Jay primero
            </a>
          </div>
          <div className="mt-8 text-sm opacity-70">
            화이팅 chingu! Te espero el 7 de julio.
          </div>
        </div>
      </section>

      {/* Back link */}
      {/* Footer */}
      <Footer />
    </main>
  );
}
