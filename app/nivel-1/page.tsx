"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Escalera from "@/components/Escalera";
import HorarioSemanal from "@/components/HorarioSemanal";
import EquipoProfes from "@/components/EquipoProfes";
import ResumenReserva from "@/components/ResumenReserva";
import SidebarCursos from "@/components/SidebarCursos";
import { useHoraLocal } from "@/lib/useHoraLocal";
import { useT, i18n, Tr } from "@/lib/i18n";
import {
  COHORTE_ABIERTA,
  PROXIMA_COHORTE_LABEL,
  INICIO_SEMANA,
  CIERRE_MATRICULA,
  PRECIO_UNICO,
  PRECIO_MENSUAL,
  MESES,
  precioLabel,
  PAYPAL_LINK_UNICO,
  PAYPAL_LINK_MENSUAL,
  HOTMART_LINK_UNICO,
  HOTMART_LINK_MENSUAL,
  WHATSAPP,
  CLASES,
  cursoDe,
  profeCorto,
  pdfDe,
  type ClaseId,
} from "@/lib/nivel1";

type Plan = "unico" | "mensual";
const RESERVA_KEY = "asReserva";
const CLP_REF = 950; // referencia CLP/USD para mostrar monto aproximado

export default function Nivel1Page() {
  const [selectedClase, setSelectedClase] = useState<ClaseId>("a11-martes");
  const [plan, setPlan] = useState<Plan>("unico");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { pais, esChile, info, hora } = useHoraLocal();
  const { t } = useT();
  const [desdeChile, setDesdeChile] = useState(true);
  const [tocoPais, setTocoPais] = useState(false);
  const [mostrarSticky, setMostrarSticky] = useState(false);
  const inscripcionRef = useRef<HTMLElement>(null);

  // Inscripción form
  const [form, setForm] = useState({ nombre: "", correo: "", whatsapp: "", edad: "", rut: "", pais: "", nivel: "", comoConocio: "", motivacion: "", apoderado: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Confirmación de pago (avisa al owner quién pagó)
  const [payConfirming, setPayConfirming] = useState(false);
  const [payConfirmed, setPayConfirmed] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [pagoStatus, setPagoStatus] = useState<string | null>(null);
  const [avisoPayPal, setAvisoPayPal] = useState(false);

  const clase = CLASES.find((c) => c.id === selectedClase) ?? CLASES[0];
  const curso = cursoDe(clase);
  const esNinos = curso.grupo === "ninos";
  const planLabel = plan === "unico" ? t("US${p} pago único", { p: PRECIO_UNICO }) : t("{n} cuotas de US${m}", { n: MESES, m: PRECIO_MENSUAL });
  const paso = submitted ? (payConfirmed ? 3 : 2) : 1;

  // País de pago: sigue al país detectado hasta que el usuario lo toque.
  useEffect(() => { if (!tocoPais) setDesdeChile(esChile); }, [esChile, tocoPais]);

  // Deep link ?clase= · resultado de pago ?pago= · restaurar reserva (sessionStorage)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("clase");
    try {
      const saved = sessionStorage.getItem(RESERVA_KEY);
      if (saved) {
        const r = JSON.parse(saved);
        if (r.form) setForm((f) => ({ ...f, ...r.form }));
        if (r.plan) setPlan(r.plan);
        if (r.selectedClase && CLASES.some((k) => k.id === r.selectedClase)) setSelectedClase(r.selectedClase);
        if (r.submitted) setSubmitted(true);
      }
    } catch {}
    if (c && CLASES.some((k) => k.id === c)) setSelectedClase(c as ClaseId);
    const p = params.get("pago");
    if (p) {
      setPagoStatus(p);
      if (p === "success") { setSubmitted(true); setPayConfirmed(true); }
      window.history.replaceState({}, "", "/nivel-1#pricing");
    }
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem(RESERVA_KEY, JSON.stringify({ form, plan, selectedClase, submitted })); } catch {}
  }, [form, plan, selectedClase, submitted]);

  // Barra sticky: visible desde que se pasa la grilla hasta que se llega al formulario.
  useEffect(() => {
    const onScroll = () => {
      const grid = document.getElementById("clases");
      const ins = inscripcionRef.current;
      if (!grid || !ins) return;
      const y = window.scrollY + window.innerHeight;
      setMostrarSticky(window.scrollY > grid.offsetTop + 200 && y < ins.offsetTop + 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const elegirClase = (id: ClaseId) => {
    setSelectedClase(id);
    setFormError("");
  };
  // Desde el sidebar: seleccionar y llevar al detalle de la clase.
  const elegirDesdeSidebar = (id: string) => {
    elegirClase(id as ClaseId);
    const el = document.getElementById("clases");
    if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: "smooth" });
  };
  const sidebarCursos = CLASES.map((c) => {
    const cu = cursoDe(c);
    return { id: c.id, emoji: cu.emoji, label: t(cu.nombreCorto), sub: `${t(c.dia)} ${hora(c.horaChile)}${esChile ? "" : ` ${t(info.corto)}`} · ${t(profeCorto(c))}` };
  });
  const sidebarSecciones = [
    { id: "clases", label: t("¿Qué curso tomo?") },
    { id: "programa", label: t("Las 8 semanas") },
    { id: "profes", label: t("Profesores") },
    { id: "inscripcion", label: t("Inscripción") },
    { id: "pricing", label: t("Pago") },
    { id: "faq", label: t("Preguntas frecuentes") },
  ];

  const camposFaltantes = () => {
    const req: [string, string][] = [
      [form.nombre, esNinos ? t("nombre del niño/a") : t("nombre")],
      [form.correo, t("correo")],
      [form.whatsapp, "WhatsApp"],
      [form.edad, t("edad")],
      [form.pais, t("país")],
      [form.nivel, t("nivel")],
      [form.comoConocio, t("cómo nos conociste")],
    ];
    if (esNinos) req.unshift([form.apoderado, t("nombre del apoderado/a")]);
    return req.filter(([v]) => !v).map(([, n]) => n);
  };

  const handleInscribir = async (e: React.FormEvent) => {
    e.preventDefault();
    const faltan = camposFaltantes();
    if (faltan.length) { setFormError(t("Falta: {campos}.", { campos: faltan.join(", ") })); return; }
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("https://formspree.io/f/mzdypyky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Nueva inscripción — ${curso.nombreCorto}`,
          curso: curso.nombreCorto,
          clase: clase.label,
          plan: planLabel,
          nombre: form.nombre,
          apoderado: esNinos ? form.apoderado : "",
          correo: form.correo,
          whatsapp: form.whatsapp,
          edad: form.edad,
          documento: form.rut || "(pendiente)",
          pais_ciudad: form.pais,
          pais_horario: info.label,
          nivel_coreano: form.nivel,
          como_nos_conociste: form.comoConocio,
          motivacion: form.motivacion,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setFormError(t("Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp."));
    } catch {
      setFormError(t("Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp."));
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
          _subject: `💰 PAGO ${curso.nombreCorto} — ${form.nombre || "alumno sin nombre"}`,
          tipo: "Confirmación de pago",
          nombre: form.nombre || "(no completó inscripción)",
          apoderado: esNinos ? form.apoderado : "",
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
      setFormError(t("Primero completa tus datos arriba para reservar tu cupo."));
      document.getElementById("inscripcion")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setPayLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre, correo: form.correo, whatsapp: form.whatsapp, clase: clase.label, cohorteKey: clase.id, plan }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) { window.location.href = data.url; return; }
      }
      window.location.href = waLink(t("Hola Jay! Quiero pagar con tarjeta mi cupo en {curso} ({plan}) y el pago online no cargó.", { curso: t(curso.nombreCorto), plan: planLabel }));
    } catch {
      window.location.href = `https://wa.me/${WHATSAPP}`;
    } finally {
      setPayLoading(false);
    }
  };

  // Countdown al inicio de la cohorte: lunes 19 de octubre de 2026 (hora Chile)
  useEffect(() => {
    const deadline = new Date("2026-10-12T00:00:00-03:00").getTime();
    const tick = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const verbo = esNinos ? t("inscribir a mi hijo/a") : t("inscribirme");
  const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  const waTransfer = waLink(t("Hola Jay! Quiero {verbo} en {curso} ({dia} {hora} Chile) con {plan}. ¿Me pasas los datos para la transferencia?", { verbo, curso: t(curso.nombreCorto), dia: t(clase.dia), hora: clase.horaChile, plan: planLabel }));
  const waPayPalMensual = waLink(t("Hola Jay! Estoy fuera de Chile y quiero pagar {curso} en {n} cuotas de US${m}. ¿Me envías el link de PayPal?", { curso: t(curso.nombreCorto), n: MESES, m: PRECIO_MENSUAL }));
  const clpRef = (usd: number) => t("${clp} CLP aprox.", { clp: (usd * CLP_REF).toLocaleString("es-CL") });

  const faqs = [
    { q: t("¿Las clases son en vivo o grabadas?"), a: t("En vivo por Zoom (60 min cada una). Si te pierdes alguna, recibes la grabación dentro de las 24 horas y puedes escribirnos para resolver dudas de esa clase.") },
    { q: t("¿Cuánto dura cada curso y cuándo empieza?"), a: t("Todos los cursos duran 8 semanas (2 meses), con 1 clase en vivo por semana. La cohorte arranca {inicio} y termina la semana del 30 de noviembre. Matrícula abierta hasta el {cierre}.", { inicio: t(INICIO_SEMANA), cierre: t(CIERRE_MATRICULA) }) },
    { q: t("¿Cuánto cuesta y cómo pago?"), a: t("{precio} — mismo precio en todos los cursos. Aceptamos transferencia bancaria en Chile (sin comisión), tarjeta de crédito/débito vía Mercado Pago (se cobra en pesos chilenos) y PayPal en dólares (también con tarjeta, sin cuenta PayPal).", { precio: t(precioLabel()) }) },
    { q: t("¿Necesito experiencia previa?"), a: t("Para Básico 1 (A1.1) y Coreano para Niños: cero, empezamos desde el alfabeto. Básico 2 (A1.2) requiere Básico 1 (o el Nivel 1 de julio). Conversacional 1 (A2.1) requiere Básico 2 o el test de nivel. TOPIK II es para nivel intermedio.") },
    { q: t("Fui alumno/a del Nivel 1 en julio, ¿qué curso sigo?"), a: t("Ese curso hoy se llama Básico 1 (A1.1) y tu certificado equivale a A1.1. Tu siguiente paso es Básico 2 (A1.2) · miércoles 21:00 Chile · con Jay. Si lo que quieres es hablar, también puedes entrar a Conversacional 1 con test de nivel.") },
    { q: t("¿Cuántas personas hay por clase?"), a: t("Máximo 15 alumnos por clase (8 en TOPIK II y 12 en Niños). Grupos chicos para que el profesor corrija tu pronunciación personalmente.") },
    { q: t("¿Recibo certificado?"), a: t("Sí, está incluido en todos los cursos. Al completar tu curso recibes el certificado de Academia Seúl del nivel correspondiente, en base a tu asistencia y participación.") },
    { q: t("¿Cómo es la clase de Niños?"), a: t("60 minutos divididos en bloques de 10–15 min (canción · juego · lectura · dibujo) con un grupo de máximo 12. Las grabaciones son privadas, solo para las familias del grupo, y el apoderado recibe un grupo de WhatsApp propio. Tu hijo/a solo necesita un computador o tablet con cámara y ganas de jugar.") },
    { q: t("¿En qué hora llegan las clases a mi país?"), a: t("Elige tu país en la grilla de horarios de esta página y verás la hora exacta. Las clases de 20:00 y 21:00 Chile caen de madrugada en España; la de Niños (18:00 Chile) llega a las 23:00 / 22:00 en España.") },
  ];

  // Página de cierre + lista de espera cuando la cohorte no está abierta.
  if (!COHORTE_ABIERTA) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation solid />
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 bg-[#F5F3FF]">
          <span className="inline-flex items-center gap-2 bg-white border border-[#E5E1FB] text-[#4036ED] text-xs font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-6">{t("Cursos en vivo")}</span>
          <h1 className="font-black text-gray-900 leading-tight mb-5" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>{t("Esta cohorte ya está en marcha")}</h1>
          <p className="text-gray-600 text-lg max-w-xl mb-8">{t("Anótate en la lista de espera y te avisamos apenas se abran los cupos de la próxima cohorte ({cohorte}) — con acceso prioritario a horarios y precio.", { cohorte: t(PROXIMA_COHORTE_LABEL) })}</p>
          <Link href="/notificarme?curso=nivel1" className="inline-flex items-center gap-2 bg-[#4036ED] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#332BC7] transition-colors">{t("Anotarme en la lista de espera →")}</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const input = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3D2EE8] focus:ring-2 focus:ring-[#3D2EE8]/20 outline-none transition";
  const label = "block text-sm font-bold text-gray-700 mb-1";

  return (
    <main className="min-h-screen bg-white">
      <Navigation solid />


      {/* Barra sticky de reserva */}
      <ResumenReserva clase={clase} plan={plan} pais={pais} sticky visible={mostrarSticky && !submitted} onCambiar={() => document.getElementById("clases")?.scrollIntoView({ behavior: "smooth" })} />

      <div className="lg:pl-64">

      {/* Aviso de resultado de pago (al volver de Mercado Pago / PayPal) */}
      {pagoStatus && (
        <div className="pt-36 md:pt-40 px-6">
          <div className={`max-w-2xl mx-auto rounded-2xl p-5 text-center border ${pagoStatus === "success" ? "bg-[#F0FBF4] border-[#BCEBCD] text-green-800" : pagoStatus === "pending" ? "bg-[#FFF8E6] border-[#F2E2A8] text-yellow-800" : "bg-gray-100 border-gray-300 text-gray-700"}`}>
            {pagoStatus === "success" && <p className="font-bold">{t("✅ ¡Pago recibido! Tu cupo en {curso} está confirmado. Te escribimos por correo/WhatsApp con los siguientes pasos. 🎉", { curso: t(curso.nombreCorto) })}</p>}
            {pagoStatus === "pending" && <p className="font-bold">{t("⏳ Tu pago quedó pendiente. Apenas se acredite, confirmamos tu cupo y te avisamos.")}</p>}
            {pagoStatus === "failure" && <p className="font-bold">{t("No se completó el pago. Puedes intentar de nuevo abajo o escribirnos por WhatsApp.")}</p>}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden text-white pt-16 md:pt-20" style={{ backgroundColor: "#3D2EE8" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 text-xs font-bold tracking-widest">{t("TODOS LOS NIVELES · COHORTE OCTUBRE 2026")}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="block text-2xl md:text-3xl mb-3 opacity-80">한국어 수업</span>
            {t("Matrícula octubre 2026")}
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90">{t("De Básico 1 a TOPIK II, y Coreano para Niños de 8 a 12 — elige tu clase.")}</p>
          <p className="text-base mt-3 max-w-2xl mx-auto opacity-80">{t("8 semanas desde {inicio} · 1 clase en vivo por semana · 60 min · {precio} · certificado incluido", { inicio: t(INICIO_SEMANA), precio: t(precioLabel()) })}</p>

          <div className="mt-8 inline-block bg-white/10 backdrop-blur rounded-2xl px-6 py-4">
            <div className="text-xs tracking-widest opacity-80 mb-2">{t("⏰ LAS CLASES EMPIEZAN EN")}</div>
            <div className="flex gap-4 md:gap-6 justify-center text-2xl md:text-4xl font-bold">
              <div><div>{timeLeft.days}</div><div className="text-xs opacity-70 mt-1">{t("DÍAS")}</div></div>
              <div className="opacity-40">:</div>
              <div><div>{timeLeft.hours.toString().padStart(2, "0")}</div><div className="text-xs opacity-70 mt-1">{t("HORAS")}</div></div>
              <div className="opacity-40">:</div>
              <div><div>{timeLeft.minutes.toString().padStart(2, "0")}</div><div className="text-xs opacity-70 mt-1">{t("MIN")}</div></div>
              <div className="opacity-40">:</div>
              <div><div>{timeLeft.seconds.toString().padStart(2, "0")}</div><div className="text-xs opacity-70 mt-1">{t("SEG")}</div></div>
            </div>
            <div className="text-xs opacity-70 mt-2">{t("Matrícula abierta hasta el {cierre}", { cierre: t(CIERRE_MATRICULA) })}</div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#clases" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">{t("Elegir mi clase")}</a>
            <a href="/programa" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">{t("Ver syllabus completo")}</a>
          </div>
        </div>
      </section>

      <SidebarCursos
        cursos={sidebarCursos}
        secciones={sidebarSecciones}
        activoCurso={selectedClase}
        onCurso={elegirDesdeSidebar}
        cta={{ label: esNinos ? t("Inscribir a mi hijo/a →") : t("Reservar mi cupo →"), href: "#inscripcion" }}
      />

      {/* Paso 0 · ¿Qué curso tomo? + grilla */}
      <section id="clases" className="py-16 bg-[#F5F3FF]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">{t("¿Qué curso tomo?")}</h2>
          <p className="text-gray-600 text-center mb-8">{t("Toca tu caso y te decimos tu peldaño — o elige directo en el horario.")}</p>
          <Escalera activo={curso.cursoId} compacta />

          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mt-14 mb-2">{t("Elige tu clase")}</h2>
          <p className="text-gray-600 text-center mb-6">{t("5 cursos · 6 horarios (Básico 1 se dicta martes y jueves: elige uno)")}</p>
          <HorarioSemanal seleccionada={selectedClase} onSelect={elegirClase} />

          {/* Detalle de la clase elegida */}
          <div className="mt-8 bg-white rounded-3xl border-2 border-[#3D2EE8] p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#818CF8" }}>{t("Tu selección")}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{curso.emoji} {t(curso.nombreCorto)}</h3>
                <div className="text-gray-500 mb-3">{t(curso.subtitulo)} · {curso.koreanTitle}</div>
                <p className="text-gray-700 mb-4">{t(curso.descripcion)}</p>
                {curso.requiere && <p className="text-sm text-gray-600 mb-1"><strong>{t("Requiere:")}</strong> {t(curso.requiere)}</p>}
                {curso.alias && <p className="text-sm text-gray-600 mb-1"><strong>{t("Antes se llamaba:")}</strong> {t(curso.alias)}</p>}
                <ResumenReserva clase={clase} plan={plan} pais={pais} />
              </div>
              <div className="md:w-72 flex-shrink-0 flex flex-col gap-3">
                <a href="#inscripcion" className="text-center px-6 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transition" style={{ backgroundColor: "#3D2EE8" }}>
                  {esNinos ? t("Inscribir a mi hijo/a →") : t("Reservar mi cupo →")}
                </a>
                <a href={pdfDe(curso.cursoId)} download className="text-center px-6 py-3 rounded-full font-bold border-2 border-[#3D2EE8] text-[#3D2EE8] hover:bg-[#F5F3FF] transition">{t("📄 Programa PDF")}</a>
                <a href={`/programa#${curso.cursoId}`} className="text-center text-sm font-semibold text-[#3D2EE8] underline">{t("Ver syllabus semana a semana")}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Las 8 semanas de la clase elegida */}
      <section id="programa" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">{t("Las 8 semanas de {curso}", { curso: t(curso.nombreCorto) })}</h2>
          <p className="text-gray-600 text-center mb-12">{t(curso.subtitulo)} · {curso.requiere ? t("Requiere {req}", { req: t(curso.requiere) }) : t("desde cero")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curso.sesiones.map((s) => (
              <div key={s.num} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#3D2EE8] transition">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>{s.num.toString().padStart(2, "0")}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{t(s.titulo)}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t(s.desc)}</p>
                </div>
              </div>
            ))}
          </div>
          {esNinos && (
            <p className="text-center text-sm text-gray-600 mt-6 max-w-2xl mx-auto">{t("🧒 En Niños la hora se divide en bloques de 10–15 min (canción · juego · lectura · dibujo) y la tarea es breve, para hacer con el apoderado.")}</p>
          )}
        </div>
      </section>

      {/* Profes */}
      <section id="profes" className="py-16 bg-gradient-to-b from-white to-[#F5F3FF]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">{t("Tu equipo de profesores")}</h2>
          <p className="text-gray-600 text-center mb-10">{t("Nativos y bilingües, con años de experiencia enseñando coreano a hispanohablantes.")}</p>
          <EquipoProfes destacado={clase.profeId} />
        </div>
      </section>

      {/* Inscripción form */}
      <section id="inscripcion" ref={inscripcionRef} className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6">
          {/* Stepper */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
            {[{ n: 1, t: t("Regístrate") }, { n: 2, t: t("Paga") }, { n: 3, t: t("Confirma tu pago") }].map((s, i) => (
              <div key={s.n} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: paso >= s.n ? "#3D2EE8" : "#CBC7EA" }}>{paso > s.n ? "✓" : s.n}</div>
                  <span className={`text-sm font-bold ${paso === s.n ? "text-[#3D2EE8]" : "text-gray-400"}`}>{s.t}</span>
                </div>
                {i < 2 && <div className="w-6 sm:w-10 h-px bg-gray-300" />}
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="inline-block px-4 py-1 mb-4 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>{t("PASO 1 · FORMULARIO DE INSCRIPCIÓN")}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{esNinos ? t("Reserva el cupo de tu hijo/a") : t("Reserva tu cupo")}</h2>
          </div>

          <div className="mb-6">
            <ResumenReserva clase={clase} plan={plan} pais={pais} onCambiar={() => document.getElementById("clases")?.scrollIntoView({ behavior: "smooth" })} />
          </div>

          {!submitted ? (
            <form onSubmit={handleInscribir} className="bg-[#F5F3FF] rounded-3xl p-6 md:p-8 border border-[#E5E1FB] space-y-4">
              {esNinos && (
                <>
                  <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--as-azul-txt)" }}>{t("Datos del apoderado/a")}</div>
                  <div>
                    <label className={label}>{t("Nombre del apoderado/a *")}</label>
                    <input type="text" value={form.apoderado} onChange={(e) => setForm({ ...form, apoderado: e.target.value })} placeholder={t("Tu nombre y apellido")} className={input} />
                  </div>
                </>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>{t("Correo *")}</label>
                  <input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} placeholder={t("tucorreo@email.com")} className={input} />
                </div>
                <div>
                  <label className={label}>WhatsApp *</label>
                  <input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder={t("+56 9 1234 5678 (con código de país)")} className={input} />
                </div>
              </div>
              <div>
                <label className={label}>{t("País y ciudad *")}</label>
                <input type="text" value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })} placeholder={info.corto === "Chile" ? t("Ej: Chile, Santiago") : t("Ej: {pais}, ciudad", { pais: t(info.corto) })} className={input} />
              </div>

              {esNinos && <div className="text-xs font-bold tracking-widest uppercase pt-2" style={{ color: "var(--as-azul-txt)" }}>{t("Datos del alumno/a")}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>{esNinos ? t("Nombre del niño/a *") : t("Nombre completo *")}</label>
                  <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder={esNinos ? t("Nombre y apellido del niño/a") : t("Tu nombre y apellido")} className={input} />
                </div>
                <div>
                  <label className={label}>{esNinos ? t("Edad del niño/a *") : t("Edad *")}</label>
                  <input type="number" min={1} value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} placeholder={esNinos ? t("Ej: 10") : t("Ej: 24")} className={input} />
                </div>
              </div>
              <div>
                <label className={label}>{t("Documento de identidad")} <span className="font-normal text-gray-400">{t("(opcional)")}</span></label>
                <input type="text" value={form.rut} onChange={(e) => setForm({ ...form, rut: e.target.value })} placeholder={t("RUT o ID — lo pediremos al emitir el certificado")} className={input} />
              </div>
              <div>
                <label className={label}>{esNinos ? t("¿Qué nivel de coreano tiene tu hijo/a? *") : t("¿Cuál es tu nivel de coreano? *")}</label>
                <select
                  value={form.nivel}
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm({ ...form, nivel: v });
                    if (v === "Fui alumno/a del Nivel 1 (julio 2026)") elegirClase("a12");
                  }}
                  className={`${input} bg-white`}
                >
                  <option value="">{t("Selecciona un nivel")}</option>
                  {!esNinos && <option value="Fui alumno/a del Nivel 1 (julio 2026)">{t("Fui alumno/a del Nivel 1 (julio 2026) — quiero seguir con Básico 2")}</option>}
                  <option value="Desde cero">{t("Desde cero (no sabe nada) 🐣")}</option>
                  <option value="Lee algo del alfabeto">{t("Lee algo del alfabeto (한글)")}</option>
                  <option value="Terminó Básico 1 o equivalente">{t("Terminó Básico 1 o equivalente (lee 한글 y se presenta)")}</option>
                  <option value="Intermedio (TOPIK II)">{t("Intermedio — va por el TOPIK II")}</option>
                </select>
              </div>
              <div>
                <label className={label}>{t("¿Cómo nos conociste? *")}</label>
                <select value={form.comoConocio} onChange={(e) => setForm({ ...form, comoConocio: e.target.value })} className={`${input} bg-white`}>
                  <option value="">{t("Selecciona una opción")}</option>
                  {["Instagram", "TikTok", "YouTube", "Facebook", i18n("El Lector de Hangul"), i18n("Recomendación de un amigo"), i18n("Google / búsqueda"), i18n("Ya fui alumno/a"), i18n("Otro")].map((o) => (
                    <option key={o} value={o}>{t(o)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>{esNinos ? t("¿Por qué quiere aprender coreano?") : t("¿Por qué quieres aprender coreano?")} <span className="font-normal text-gray-400">{t("(opcional)")}</span></label>
                <textarea value={form.motivacion} onChange={(e) => setForm({ ...form, motivacion: e.target.value })} rows={3} placeholder={t("K-pop, K-drama, un viaje, trabajo, la cultura... ¡Nos ayuda a conocerte! 💜")} className={`${input} resize-none`} />
              </div>

              {formError && <p className="text-sm font-medium" style={{ color: "var(--as-azul-txt)" }}>{formError}</p>}

              <button type="submit" disabled={submitting} className="w-full py-4 rounded-full text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-60" style={{ backgroundColor: "#3D2EE8" }}>
                {submitting ? t("Enviando...") : t("Reservar cupo en {curso} →", { curso: t(curso.nombreCorto).split(" (")[0] })}
              </button>
              <p className="text-center text-xs text-gray-500">{t("🔒 Tus datos están protegidos y no se comparten.")}</p>
            </form>
          ) : (
            <div className="bg-[#F0FBF4] rounded-3xl p-8 border border-[#BCEBCD] text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("¡Cupo reservado para {nombre}!", { nombre: form.nombre.split(" ")[0] || t("ti") })}</h3>
              <p className="text-gray-700 mb-2">
                <Tr k="{curso} · {dia} {hora} Chile. Te escribimos a **{correo}**. Ahora elige cómo pagar abajo para confirmar el lugar." vars={{ curso: t(curso.nombreCorto), dia: t(clase.dia), hora: clase.horaChile, correo: form.correo }} />
              </p>
              <a href="#pricing" className="inline-block mt-4 px-8 py-3 rounded-full text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>{t("Ir a pagar ↓")}</a>
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 mb-3 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>{t("PASO 2 · PAGO")}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{t("Completa tu pago")}</h2>
            <p className="text-sm font-bold tracking-widest" style={{ color: "#818CF8" }}>{t("MISMO PRECIO EN TODOS LOS CURSOS")}</p>
          </div>

          <div className="bg-white border-2 border-[#3D2EE8] rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="mb-6"><ResumenReserva clase={clase} plan={plan} pais={pais} /></div>

            {/* Plan selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button type="button" onClick={() => setPlan("unico")} className={`p-6 rounded-2xl border-2 text-center transition ${plan === "unico" ? "border-[#3D2EE8] bg-[#F5F3FF] shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">{t("PAGO ÚNICO")}</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: "var(--as-azul-txt)" }}>US${PRECIO_UNICO}</div>
                <div className="text-sm text-gray-600 mt-2">{t("El curso completo de 8 semanas")}{desdeChile ? ` · ${clpRef(PRECIO_UNICO)}` : ""}</div>
                {plan === "unico" && <div className="mt-3 text-xs font-bold" style={{ color: "var(--as-azul-txt)" }}>{t("✓ Seleccionado")}</div>}
              </button>
              <button type="button" onClick={() => setPlan("mensual")} className={`p-6 rounded-2xl border-2 text-center transition ${plan === "mensual" ? "border-[#3D2EE8] bg-[#F5F3FF] shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">{t("{n} CUOTAS", { n: MESES })}</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: "var(--as-azul-txt)" }}>{MESES} × US${PRECIO_MENSUAL}</div>
                <div className="text-sm text-gray-600 mt-2">{t("Una al inscribirte y otra al inicio del mes 2")}{desdeChile ? ` · ${clpRef(PRECIO_MENSUAL)} ${t("c/u")}` : ""}</div>
                {!desdeChile && !PAYPAL_LINK_MENSUAL && <div className="text-xs text-gray-500 mt-1">{t("Fuera de Chile se coordina por WhatsApp")}</div>}
                {plan === "mensual" && <div className="mt-3 text-xs font-bold" style={{ color: "var(--as-azul-txt)" }}>{t("✓ Seleccionado")}</div>}
              </button>
            </div>

            {/* What's included */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-center">{t("Incluye:")}</h3>
              <ul className="space-y-2.5 max-w-md mx-auto">
                {[
                  t("8 clases en vivo por Zoom (60 min c/u)"),
                  t("Certificado de Academia Seúl al terminar"),
                  esNinos ? t("Grabaciones privadas, solo para las familias del grupo") : t("Grabaciones de cada clase (24 h después)"),
                  t("Slides + hojas de actividad por sesión"),
                  t("Lector de Hangul con audio nativo (tarea gamificada)"),
                  t("Pronunciación corregida personalmente"),
                  t("Grupo chico (máx. {n})", { n: clase.cupos }),
                  esNinos ? t("Grupo de WhatsApp solo para apoderados") : t("Comunidad de alumnos por WhatsApp/Discord"),
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start"><span style={{ color: "var(--as-azul-txt)" }} className="font-bold">✓</span><span className="text-gray-700">{item}</span></li>
                ))}
              </ul>
            </div>

            {/* País de pago */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5 text-sm">
              <span className="text-gray-500">{t("¿Desde dónde pagas?")}</span>
              {[{ v: true, t: t("🇨🇱 Chile") }, { v: false, t: t("🌎 Otro país") }].map((o) => (
                <button key={o.t} type="button" onClick={() => { setDesdeChile(o.v); setTocoPais(true); }} className={`px-3 py-1.5 rounded-full border-2 text-sm font-semibold transition ${desdeChile === o.v ? "border-[#3D2EE8] bg-[#3D2EE8] text-white" : "border-gray-300 text-gray-700"}`}>{o.t}</button>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-center text-xs font-bold tracking-widest text-gray-400 mb-1">{t("ELIGE CÓMO PAGAR")}</p>

              {desdeChile ? (
                <>
                  <div className="bg-[#F5F3FF] border-2 border-[#3D2EE8] rounded-2xl p-6 text-left">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <p className="text-base font-bold text-gray-900">{t("🏦 Transferencia bancaria · Chile")}</p>
                      <span className="text-[10px] font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: "#16a34a" }}>{t("RECOMENDADO · SIN COMISIÓN")}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{t("Sin comisión: el monto llega completo ({monto} — te confirmamos el monto exacto). Escríbenos y te enviamos los datos.", { monto: plan === "unico" ? clpRef(PRECIO_UNICO) : t("{clp} por cuota", { clp: clpRef(PRECIO_MENSUAL) }) })}</p>
                    <a href={waTransfer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold" style={{ backgroundColor: "#25D366" }}>{t("📲 Pedir datos por WhatsApp")}</a>
                  </div>
                  <p className="text-center text-xs text-gray-400 pt-2">{t("o paga al instante con")}</p>
                  <button type="button" onClick={pagarConTarjeta} disabled={payLoading} className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition disabled:opacity-60">
                    {payLoading ? t("Abriendo pago seguro…") : t("💳 Tarjeta de crédito / débito · Mercado Pago ({plan})", { plan: planLabel })}
                  </button>
                  <p className="text-center text-xs text-gray-500 -mt-1">{t("Visa, Mastercard y débito · se cobra el equivalente en CLP. Reserva tu cupo arriba antes de pagar.")}</p>
                  <BotonPayPal plan={plan} onClick={() => setAvisoPayPal(true)} waMensual={waPayPalMensual} relleno={false} />
                </>
              ) : (
                <>
                  <BotonPayPal plan={plan} onClick={() => setAvisoPayPal(true)} waMensual={waPayPalMensual} relleno />
                  <p className="text-center text-xs text-gray-500 -mt-1"><Tr k="Recomendado fuera de Chile · pagas en dólares con cualquier tarjeta, **sin cuenta PayPal** (opción “Pagar con tarjeta”)." /></p>
                  {(plan === "unico" ? HOTMART_LINK_UNICO : HOTMART_LINK_MENSUAL) && (
                    <a href={plan === "unico" ? HOTMART_LINK_UNICO : HOTMART_LINK_MENSUAL} target="_blank" rel="noopener noreferrer" className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition">
                      {t("🌐 Tarjeta en tu moneda (USD/EUR/local) · Hotmart")}
                    </a>
                  )}
                  <button type="button" onClick={pagarConTarjeta} disabled={payLoading} className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition disabled:opacity-60">
                    {payLoading ? t("Abriendo pago seguro…") : t("💳 Mercado Pago ({plan})", { plan: planLabel })}
                  </button>
                  <p className="text-center text-xs text-gray-500 -mt-1">{t("Se cobra en pesos chilenos; tu banco puede cobrar comisión por cambio de moneda.")}</p>
                  <p className="text-center text-xs text-gray-500">{t("¿Prefieres transferencia internacional?")} <a href={waTransfer} target="_blank" rel="noopener noreferrer" className="underline font-semibold" style={{ color: "var(--as-azul-txt)" }}>{t("Escríbenos por WhatsApp")}</a>.</p>
                </>
              )}

              {avisoPayPal && (
                <div className="rounded-2xl bg-[#FFF8E6] border border-[#F2E2A8] p-4 text-sm text-yellow-900 text-center">
                  <Tr k="Cuando termines en PayPal, vuelve a esta pestaña y toca **“Ya pagué con PayPal”** para que reservemos tu cupo." />
                </div>
              )}

              {/* Paso 3 · Confirmar pago */}
              <div className="mt-6 pt-6 border-t border-dashed border-gray-300">
                {!payConfirmed ? (
                  <div className="text-center">
                    <div className="inline-block px-3 py-1 mb-2 rounded-full text-[10px] font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>{t("PASO 3 · CONFIRMA")}</div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{t("¿Ya hiciste tu pago?")}</p>
                    <p className="text-xs text-gray-500 mb-4"><Tr k="Confírmalo aquí y reservamos el cupo en **{curso}**. Te escribimos por correo/WhatsApp para darte la bienvenida." vars={{ curso: t(curso.nombreCorto) }} /></p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { m: i18n("Mercado Pago (tarjeta)"), e: "💳" },
                        { m: "PayPal", e: "🌍" },
                        ...(HOTMART_LINK_UNICO ? [{ m: "Hotmart", e: "🌐" }] : []),
                        { m: i18n("Transferencia bancaria"), e: "🏦" },
                      ].map((opt) => (
                        <button key={opt.m} type="button" disabled={payConfirming} onClick={() => confirmarPago(opt.m)} className="px-4 py-2.5 rounded-full text-sm font-bold border-2 border-[#3D2EE8] text-[#3D2EE8] hover:bg-[#3D2EE8] hover:text-white transition disabled:opacity-50">
                          {opt.e} {t("Ya pagué con {metodo}", { metodo: t(opt.m) })}
                        </button>
                      ))}
                    </div>
                    {payConfirming && <p className="text-xs text-gray-400 mt-3">{t("Enviando confirmación…")}</p>}
                  </div>
                ) : (
                  <div className="text-center bg-[#F0FBF4] border border-[#BCEBCD] rounded-2xl p-5">
                    <div className="text-3xl mb-1">✅</div>
                    <p className="text-sm font-bold text-gray-900">{form.nombre ? t("¡Gracias, {nombre}! Registramos tu pago.", { nombre: form.nombre.split(" ")[0] }) : t("¡Gracias! Registramos tu pago.")}</p>
                    <p className="text-xs text-gray-600 mt-1">{t("Verificamos y te confirmamos el cupo por correo/WhatsApp en las próximas horas. 화이팅!")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-6">{t("🔒 Certificado incluido · Grabaciones incluidas · Tu información está protegida")}</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#F5F3FF]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">{t("Preguntas frecuentes")}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl p-5 group">
                <summary className="cursor-pointer font-bold text-gray-900 list-none flex justify-between items-center"><span>{faq.q}</span><span className="text-[#3D2EE8] group-open:rotate-45 transition-transform text-2xl">+</span></summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-white" style={{ backgroundColor: "#3D2EE8" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("¿Listo para empezar?")}</h2>
          <p className="text-lg opacity-90 mb-8">{t("Las clases arrancan {inicio} — {precio}. Certificado incluido.", { inicio: t(INICIO_SEMANA), precio: t(precioLabel()) })}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#clases" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">{t("Elegir mi clase")}</a>
            <a href={waLink(t("Hola Jay! Tengo una duda sobre los cursos de octubre."))} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">{t("💬 Hablar con Jay primero")}</a>
          </div>
          <div className="mt-8 text-sm opacity-70">{t("화이팅 chingu! Nos vemos {inicio}.", { inicio: t(INICIO_SEMANA) })}</div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}

function BotonPayPal({ plan, onClick, waMensual, relleno }: { plan: Plan; onClick: () => void; waMensual: string; relleno: boolean }) {
  const { t } = useT();
  const cls = relleno
    ? "block w-full py-3.5 rounded-full text-white font-bold text-base text-center hover:scale-[1.01] transition"
    : "block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition";
  const style = relleno ? { backgroundColor: "#3D2EE8" } : undefined;
  if (plan === "unico" || PAYPAL_LINK_MENSUAL) {
    return (
      <a href={plan === "unico" ? PAYPAL_LINK_UNICO : PAYPAL_LINK_MENSUAL} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls} style={style}>
        {t("🌍 PayPal · en dólares ({monto})", { monto: plan === "unico" ? `US$${PRECIO_UNICO}` : t("US${m} por cuota", { m: PRECIO_MENSUAL }) })}
      </a>
    );
  }
  return (
    <a href={waMensual} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
      {t("🌍 PayPal en {n} cuotas · te enviamos el link por WhatsApp", { n: MESES })}
    </a>
  );
}
