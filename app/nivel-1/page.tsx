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
  const planLabel = plan === "unico" ? `US$${PRECIO_UNICO} pago único` : `${MESES} cuotas de US$${PRECIO_MENSUAL}`;
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
    return { id: c.id, emoji: cu.emoji, label: cu.nombreCorto, sub: `${c.dia} ${hora(c.horaChile)}${esChile ? "" : ` ${info.corto}`} · ${profeCorto(c)}` };
  });
  const sidebarSecciones = [
    { id: "clases", label: "¿Qué curso tomo?" },
    { id: "programa", label: "Las 8 semanas" },
    { id: "profes", label: "Profesores" },
    { id: "inscripcion", label: "Inscripción" },
    { id: "pricing", label: "Pago" },
    { id: "faq", label: "Preguntas frecuentes" },
  ];

  const camposFaltantes = () => {
    const req: [string, string][] = [
      [form.nombre, esNinos ? "nombre del niño/a" : "nombre"],
      [form.correo, "correo"],
      [form.whatsapp, "WhatsApp"],
      [form.edad, "edad"],
      [form.pais, "país"],
      [form.nivel, "nivel"],
      [form.comoConocio, "cómo nos conociste"],
    ];
    if (esNinos) req.unshift([form.apoderado, "nombre del apoderado/a"]);
    return req.filter(([v]) => !v).map(([, n]) => n);
  };

  const handleInscribir = async (e: React.FormEvent) => {
    e.preventDefault();
    const faltan = camposFaltantes();
    if (faltan.length) { setFormError(`Falta: ${faltan.join(", ")}.`); return; }
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
      else setFormError("Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.");
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
      setFormError("Primero completa tus datos arriba para reservar tu cupo.");
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
      window.location.href = waLink(`Hola Jay! Quiero pagar con tarjeta mi cupo en ${curso.nombreCorto} (${planLabel}) y el pago online no cargó.`);
    } catch {
      window.location.href = `https://wa.me/${WHATSAPP}`;
    } finally {
      setPayLoading(false);
    }
  };

  // Countdown al inicio de la cohorte: lunes 5 de octubre de 2026 (hora Chile)
  useEffect(() => {
    const deadline = new Date("2026-10-05T00:00:00-03:00").getTime();
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

  const verbo = esNinos ? "inscribir a mi hijo/a" : "inscribirme";
  const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  const waTransfer = waLink(`Hola Jay! Quiero ${verbo} en ${curso.nombreCorto} (${clase.dia} ${clase.horaChile} Chile) con ${planLabel}. ¿Me pasas los datos para la transferencia?`);
  const waPayPalMensual = waLink(`Hola Jay! Estoy fuera de Chile y quiero pagar ${curso.nombreCorto} en ${MESES} cuotas de US$${PRECIO_MENSUAL}. ¿Me envías el link de PayPal?`);
  const clpRef = (usd: number) => `$${(usd * CLP_REF).toLocaleString("es-CL")} CLP aprox.`;

  const faqs = [
    { q: "¿Las clases son en vivo o grabadas?", a: "En vivo por Zoom (60 min cada una). Si te pierdes alguna, recibes la grabación dentro de las 24 horas y puedes escribirnos para resolver dudas de esa clase." },
    { q: "¿Cuánto dura cada curso y cuándo empieza?", a: `Todos los cursos duran 8 semanas (2 meses), con 1 clase en vivo por semana. La cohorte arranca ${INICIO_SEMANA} y termina la semana del 23 de noviembre. Matrícula abierta hasta el ${CIERRE_MATRICULA}.` },
    { q: "¿Cuánto cuesta y cómo pago?", a: `${precioLabel()} — mismo precio en todos los cursos. Aceptamos transferencia bancaria en Chile (sin comisión), tarjeta de crédito/débito vía Mercado Pago (se cobra en pesos chilenos) y PayPal en dólares (también con tarjeta, sin cuenta PayPal).` },
    { q: "¿Necesito experiencia previa?", a: "Para Básico 1 (A1.1) y Coreano para Niños: cero, empezamos desde el alfabeto. Básico 2 (A1.2) requiere Básico 1 (o el Nivel 1 de julio). Conversacional 1 (A2.1) requiere Básico 2 o el test de nivel. TOPIK II es para nivel intermedio." },
    { q: "Fui alumno/a del Nivel 1 en julio, ¿qué curso sigo?", a: "Ese curso hoy se llama Básico 1 (A1.1) y tu certificado equivale a A1.1. Tu siguiente paso es Básico 2 (A1.2) · miércoles 21:00 Chile · con Jay. Si lo que quieres es hablar, también puedes entrar a Conversacional 1 con test de nivel." },
    { q: "¿Cuántas personas hay por clase?", a: "Máximo 15 alumnos por clase (8 en TOPIK II y 12 en Niños). Grupos chicos para que el profesor corrija tu pronunciación personalmente." },
    { q: "¿Recibo certificado?", a: "Sí, está incluido en todos los cursos. Al completar tu curso recibes el certificado de Academia Seúl del nivel correspondiente, en base a tu asistencia y participación." },
    { q: "¿Cómo es la clase de Niños?", a: "60 minutos divididos en bloques de 10–15 min (canción · juego · lectura · dibujo) con un grupo de máximo 12. Las grabaciones son privadas, solo para las familias del grupo, y el apoderado recibe un grupo de WhatsApp propio. Tu hijo/a solo necesita un computador o tablet con cámara y ganas de jugar." },
    { q: "¿En qué hora llegan las clases a mi país?", a: "Elige tu país en la grilla de horarios de esta página y verás la hora exacta. Las clases de 20:00 y 21:00 Chile caen de madrugada en España; la de Niños (18:00 Chile) llega a las 23:00 / 22:00 en España." },
  ];

  // Página de cierre + lista de espera cuando la cohorte no está abierta.
  if (!COHORTE_ABIERTA) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation solid />
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 bg-[#F5F3FF]">
          <span className="inline-flex items-center gap-2 bg-white border border-[#E5E1FB] text-[#4036ED] text-xs font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-6">Cursos en vivo</span>
          <h1 className="font-black text-gray-900 leading-tight mb-5" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Esta cohorte ya está en marcha</h1>
          <p className="text-gray-600 text-lg max-w-xl mb-8">Anótate en la lista de espera y te avisamos apenas se abran los cupos de la próxima cohorte ({PROXIMA_COHORTE_LABEL}) — con acceso prioritario a horarios y precio.</p>
          <Link href="/notificarme?curso=nivel1" className="inline-flex items-center gap-2 bg-[#4036ED] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#332BC7] transition-colors">Anotarme en la lista de espera →</Link>
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
            {pagoStatus === "success" && <p className="font-bold">✅ ¡Pago recibido! Tu cupo en {curso.nombreCorto} está confirmado. Te escribimos por correo/WhatsApp con los siguientes pasos. 🎉</p>}
            {pagoStatus === "pending" && <p className="font-bold">⏳ Tu pago quedó pendiente. Apenas se acredite, confirmamos tu cupo y te avisamos.</p>}
            {pagoStatus === "failure" && <p className="font-bold">No se completó el pago. Puedes intentar de nuevo abajo o escribirnos por WhatsApp.</p>}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden text-white pt-16 md:pt-20" style={{ backgroundColor: "#3D2EE8" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 text-xs font-bold tracking-widest">TODOS LOS NIVELES · COHORTE OCTUBRE 2026</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="block text-2xl md:text-3xl mb-3 opacity-80">한국어 수업</span>
            Matrícula octubre 2026
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90">De Básico 1 a TOPIK II, y Coreano para Niños de 8 a 12 — elige tu clase.</p>
          <p className="text-base mt-3 max-w-2xl mx-auto opacity-80">8 semanas desde {INICIO_SEMANA} · 1 clase en vivo por semana · 60 min · {precioLabel()} · certificado incluido</p>

          <div className="mt-8 inline-block bg-white/10 backdrop-blur rounded-2xl px-6 py-4">
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
            <div className="text-xs opacity-70 mt-2">Matrícula abierta hasta el {CIERRE_MATRICULA}</div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#clases" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">Elegir mi clase</a>
            <a href="/programa" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">Ver syllabus completo</a>
          </div>
        </div>
      </section>

      <SidebarCursos
        cursos={sidebarCursos}
        secciones={sidebarSecciones}
        activoCurso={selectedClase}
        onCurso={elegirDesdeSidebar}
        cta={{ label: esNinos ? "Inscribir a mi hijo/a →" : "Reservar mi cupo →", href: "#inscripcion" }}
      />

      {/* Paso 0 · ¿Qué curso tomo? + grilla */}
      <section id="clases" className="py-16" style={{ backgroundColor: "#F5F3FF" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">¿Qué curso tomo?</h2>
          <p className="text-gray-600 text-center mb-8">Toca tu caso y te decimos tu peldaño — o elige directo en el horario.</p>
          <Escalera activo={curso.cursoId} compacta />

          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mt-14 mb-2">Elige tu clase</h2>
          <p className="text-gray-600 text-center mb-6">5 cursos · 6 horarios (Básico 1 se dicta martes y jueves: elige uno)</p>
          <HorarioSemanal seleccionada={selectedClase} onSelect={elegirClase} />

          {/* Detalle de la clase elegida */}
          <div className="mt-8 bg-white rounded-3xl border-2 border-[#3D2EE8] p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#818CF8" }}>Tu selección</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{curso.emoji} {curso.nombreCorto}</h3>
                <div className="text-gray-500 mb-3">{curso.subtitulo} · {curso.koreanTitle}</div>
                <p className="text-gray-700 mb-4">{curso.descripcion}</p>
                {curso.requiere && <p className="text-sm text-gray-600 mb-1"><strong>Requiere:</strong> {curso.requiere}</p>}
                {curso.alias && <p className="text-sm text-gray-600 mb-1"><strong>Antes se llamaba:</strong> {curso.alias}</p>}
                <ResumenReserva clase={clase} plan={plan} pais={pais} />
              </div>
              <div className="md:w-72 flex-shrink-0 flex flex-col gap-3">
                <a href="#inscripcion" className="text-center px-6 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transition" style={{ backgroundColor: "#3D2EE8" }}>
                  {esNinos ? "Inscribir a mi hijo/a →" : "Reservar mi cupo →"}
                </a>
                <a href={pdfDe(curso.cursoId)} download className="text-center px-6 py-3 rounded-full font-bold border-2 border-[#3D2EE8] text-[#3D2EE8] hover:bg-[#F5F3FF] transition">📄 Programa PDF</a>
                <a href={`/programa#${curso.cursoId}`} className="text-center text-sm font-semibold text-[#3D2EE8] underline">Ver syllabus semana a semana</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Las 8 semanas de la clase elegida */}
      <section id="programa" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">Las 8 semanas de {curso.nombreCorto}</h2>
          <p className="text-gray-600 text-center mb-12">{curso.subtitulo}{curso.requiere ? ` · Requiere ${curso.requiere}` : " · desde cero"}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curso.sesiones.map((s) => (
              <div key={s.num} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#3D2EE8] transition">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>{s.num.toString().padStart(2, "0")}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{s.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {esNinos && (
            <p className="text-center text-sm text-gray-600 mt-6 max-w-2xl mx-auto">🧒 En Niños la hora se divide en bloques de 10–15 min (canción · juego · lectura · dibujo) y la tarea es breve, para hacer con el apoderado.</p>
          )}
        </div>
      </section>

      {/* Profes */}
      <section id="profes" className="py-16 bg-gradient-to-b from-white to-[#F5F3FF]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">Tu equipo de profesores</h2>
          <p className="text-gray-600 text-center mb-10">Nativos y bilingües, con años de experiencia enseñando coreano a hispanohablantes.</p>
          <EquipoProfes destacado={clase.profeId} />
        </div>
      </section>

      {/* Inscripción form */}
      <section id="inscripcion" ref={inscripcionRef} className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6">
          {/* Stepper */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
            {[{ n: 1, t: "Regístrate" }, { n: 2, t: "Paga" }, { n: 3, t: "Confirma tu pago" }].map((s, i) => (
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
            <div className="inline-block px-4 py-1 mb-4 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>PASO 1 · FORMULARIO DE INSCRIPCIÓN</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{esNinos ? "Reserva el cupo de tu hijo/a" : "Reserva tu cupo"}</h2>
          </div>

          <div className="mb-6">
            <ResumenReserva clase={clase} plan={plan} pais={pais} onCambiar={() => document.getElementById("clases")?.scrollIntoView({ behavior: "smooth" })} />
          </div>

          {!submitted ? (
            <form onSubmit={handleInscribir} className="bg-[#F5F3FF] rounded-3xl p-6 md:p-8 border border-[#E5E1FB] space-y-4">
              {esNinos && (
                <>
                  <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "#3D2EE8" }}>Datos del apoderado/a</div>
                  <div>
                    <label className={label}>Nombre del apoderado/a *</label>
                    <input type="text" value={form.apoderado} onChange={(e) => setForm({ ...form, apoderado: e.target.value })} placeholder="Tu nombre y apellido" className={input} />
                  </div>
                </>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>Correo *</label>
                  <input type="email" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} placeholder="tucorreo@email.com" className={input} />
                </div>
                <div>
                  <label className={label}>WhatsApp *</label>
                  <input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="+56 9 1234 5678 (con código de país)" className={input} />
                </div>
              </div>
              <div>
                <label className={label}>País y ciudad *</label>
                <input type="text" value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })} placeholder={`Ej: ${info.corto === "Chile" ? "Chile, Santiago" : info.corto + ", ciudad"}`} className={input} />
              </div>

              {esNinos && <div className="text-xs font-bold tracking-widest uppercase pt-2" style={{ color: "#3D2EE8" }}>Datos del alumno/a</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>{esNinos ? "Nombre del niño/a *" : "Nombre completo *"}</label>
                  <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder={esNinos ? "Nombre y apellido del niño/a" : "Tu nombre y apellido"} className={input} />
                </div>
                <div>
                  <label className={label}>{esNinos ? "Edad del niño/a *" : "Edad *"}</label>
                  <input type="number" min={1} value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} placeholder={esNinos ? "Ej: 10" : "Ej: 24"} className={input} />
                </div>
              </div>
              <div>
                <label className={label}>Documento de identidad <span className="font-normal text-gray-400">(opcional)</span></label>
                <input type="text" value={form.rut} onChange={(e) => setForm({ ...form, rut: e.target.value })} placeholder="RUT o ID — lo pediremos al emitir el certificado" className={input} />
              </div>
              <div>
                <label className={label}>{esNinos ? "¿Qué nivel de coreano tiene tu hijo/a? *" : "¿Cuál es tu nivel de coreano? *"}</label>
                <select
                  value={form.nivel}
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm({ ...form, nivel: v });
                    if (v === "Fui alumno/a del Nivel 1 (julio 2026)") elegirClase("a12");
                  }}
                  className={`${input} bg-white`}
                >
                  <option value="">Selecciona un nivel</option>
                  {!esNinos && <option value="Fui alumno/a del Nivel 1 (julio 2026)">Fui alumno/a del Nivel 1 (julio 2026) — quiero seguir con Básico 2</option>}
                  <option value="Desde cero">Desde cero (no sabe nada) 🐣</option>
                  <option value="Lee algo del alfabeto">Lee algo del alfabeto (한글)</option>
                  <option value="Terminó Básico 1 o equivalente">Terminó Básico 1 o equivalente (lee 한글 y se presenta)</option>
                  <option value="Intermedio (TOPIK II)">Intermedio — va por el TOPIK II</option>
                </select>
              </div>
              <div>
                <label className={label}>¿Cómo nos conociste? *</label>
                <select value={form.comoConocio} onChange={(e) => setForm({ ...form, comoConocio: e.target.value })} className={`${input} bg-white`}>
                  <option value="">Selecciona una opción</option>
                  {["Instagram", "TikTok", "YouTube", "Facebook", "El Lector de Hangul", "Recomendación de un amigo", "Google / búsqueda", "Ya fui alumno/a", "Otro"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>{esNinos ? "¿Por qué quiere aprender coreano?" : "¿Por qué quieres aprender coreano?"} <span className="font-normal text-gray-400">(opcional)</span></label>
                <textarea value={form.motivacion} onChange={(e) => setForm({ ...form, motivacion: e.target.value })} rows={3} placeholder="K-pop, K-drama, un viaje, trabajo, la cultura... ¡Nos ayuda a conocerte! 💜" className={`${input} resize-none`} />
              </div>

              {formError && <p className="text-sm font-medium" style={{ color: "#3D2EE8" }}>{formError}</p>}

              <button type="submit" disabled={submitting} className="w-full py-4 rounded-full text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-60" style={{ backgroundColor: "#3D2EE8" }}>
                {submitting ? "Enviando..." : `Reservar cupo en ${curso.nombreCorto.split(" (")[0]} →`}
              </button>
              <p className="text-center text-xs text-gray-500">🔒 Tus datos están protegidos y no se comparten.</p>
            </form>
          ) : (
            <div className="bg-[#F0FBF4] rounded-3xl p-8 border border-[#BCEBCD] text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Cupo reservado para {form.nombre.split(" ")[0] || "ti"}!</h3>
              <p className="text-gray-700 mb-2">
                {curso.nombreCorto} · {clase.dia} {clase.horaChile} Chile. Te escribimos a <strong>{form.correo}</strong>. Ahora elige cómo pagar abajo para confirmar el lugar.
              </p>
              <a href="#pricing" className="inline-block mt-4 px-8 py-3 rounded-full text-white font-bold" style={{ backgroundColor: "#3D2EE8" }}>Ir a pagar ↓</a>
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 mb-3 rounded-full text-xs font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>PASO 2 · PAGO</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Completa tu pago</h2>
            <p className="text-sm font-bold tracking-widest" style={{ color: "#818CF8" }}>MISMO PRECIO EN TODOS LOS CURSOS</p>
          </div>

          <div className="bg-white border-2 border-[#3D2EE8] rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="mb-6"><ResumenReserva clase={clase} plan={plan} pais={pais} /></div>

            {/* Plan selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button type="button" onClick={() => setPlan("unico")} className={`p-6 rounded-2xl border-2 text-center transition ${plan === "unico" ? "border-[#3D2EE8] bg-[#F5F3FF] shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">PAGO ÚNICO</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: "#3D2EE8" }}>US${PRECIO_UNICO}</div>
                <div className="text-sm text-gray-600 mt-2">El curso completo de 8 semanas{desdeChile ? ` · ${clpRef(PRECIO_UNICO)}` : ""}</div>
                {plan === "unico" && <div className="mt-3 text-xs font-bold" style={{ color: "#3D2EE8" }}>✓ Seleccionado</div>}
              </button>
              <button type="button" onClick={() => setPlan("mensual")} className={`p-6 rounded-2xl border-2 text-center transition ${plan === "mensual" ? "border-[#3D2EE8] bg-[#F5F3FF] shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="text-xs font-bold tracking-widest text-gray-500 mb-1">{MESES} CUOTAS</div>
                <div className="text-4xl md:text-5xl font-bold" style={{ color: "#3D2EE8" }}>{MESES} × US${PRECIO_MENSUAL}</div>
                <div className="text-sm text-gray-600 mt-2">Una al inscribirte y otra al inicio del mes 2{desdeChile ? ` · ${clpRef(PRECIO_MENSUAL)} c/u` : ""}</div>
                {!desdeChile && !PAYPAL_LINK_MENSUAL && <div className="text-xs text-gray-500 mt-1">Fuera de Chile se coordina por WhatsApp</div>}
                {plan === "mensual" && <div className="mt-3 text-xs font-bold" style={{ color: "#3D2EE8" }}>✓ Seleccionado</div>}
              </button>
            </div>

            {/* What's included */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Incluye:</h3>
              <ul className="space-y-2.5 max-w-md mx-auto">
                {[
                  "8 clases en vivo por Zoom (60 min c/u)",
                  "Certificado de Academia Seúl al terminar",
                  esNinos ? "Grabaciones privadas, solo para las familias del grupo" : "Grabaciones de cada clase (24 h después)",
                  "Slides + hojas de actividad por sesión",
                  "Lector de Hangul con audio nativo (tarea gamificada)",
                  "Pronunciación corregida personalmente",
                  `Grupo chico (máx. ${clase.cupos})`,
                  esNinos ? "Grupo de WhatsApp solo para apoderados" : "Comunidad de alumnos por WhatsApp/Discord",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start"><span style={{ color: "#3D2EE8" }} className="font-bold">✓</span><span className="text-gray-700">{item}</span></li>
                ))}
              </ul>
            </div>

            {/* País de pago */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5 text-sm">
              <span className="text-gray-500">¿Desde dónde pagas?</span>
              {[{ v: true, t: "🇨🇱 Chile" }, { v: false, t: "🌎 Otro país" }].map((o) => (
                <button key={o.t} type="button" onClick={() => { setDesdeChile(o.v); setTocoPais(true); }} className={`px-3 py-1.5 rounded-full border-2 text-sm font-semibold transition ${desdeChile === o.v ? "border-[#3D2EE8] bg-[#3D2EE8] text-white" : "border-gray-300 text-gray-700"}`}>{o.t}</button>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-center text-xs font-bold tracking-widest text-gray-400 mb-1">ELIGE CÓMO PAGAR</p>

              {desdeChile ? (
                <>
                  <div className="bg-[#F5F3FF] border-2 border-[#3D2EE8] rounded-2xl p-6 text-left">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <p className="text-base font-bold text-gray-900">🏦 Transferencia bancaria · Chile</p>
                      <span className="text-[10px] font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: "#16a34a" }}>RECOMENDADO · SIN COMISIÓN</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">Sin comisión: el monto llega completo ({plan === "unico" ? clpRef(PRECIO_UNICO) : clpRef(PRECIO_MENSUAL) + " por cuota"} — te confirmamos el monto exacto). Escríbenos y te enviamos los datos.</p>
                    <a href={waTransfer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold" style={{ backgroundColor: "#25D366" }}>📲 Pedir datos por WhatsApp</a>
                  </div>
                  <p className="text-center text-xs text-gray-400 pt-2">o paga al instante con</p>
                  <button type="button" onClick={pagarConTarjeta} disabled={payLoading} className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition disabled:opacity-60">
                    {payLoading ? "Abriendo pago seguro…" : `💳 Tarjeta de crédito / débito · Mercado Pago (${planLabel})`}
                  </button>
                  <p className="text-center text-xs text-gray-500 -mt-1">Visa, Mastercard y débito · se cobra el equivalente en CLP. Reserva tu cupo arriba antes de pagar.</p>
                  <BotonPayPal plan={plan} onClick={() => setAvisoPayPal(true)} waMensual={waPayPalMensual} relleno={false} />
                </>
              ) : (
                <>
                  <BotonPayPal plan={plan} onClick={() => setAvisoPayPal(true)} waMensual={waPayPalMensual} relleno />
                  <p className="text-center text-xs text-gray-500 -mt-1">Recomendado fuera de Chile · pagas en dólares con cualquier tarjeta, <strong>sin cuenta PayPal</strong> (opción &ldquo;Pagar con tarjeta&rdquo;).</p>
                  {(plan === "unico" ? HOTMART_LINK_UNICO : HOTMART_LINK_MENSUAL) && (
                    <a href={plan === "unico" ? HOTMART_LINK_UNICO : HOTMART_LINK_MENSUAL} target="_blank" rel="noopener noreferrer" className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition">
                      🌐 Tarjeta en tu moneda (USD/EUR/local) · Hotmart
                    </a>
                  )}
                  <button type="button" onClick={pagarConTarjeta} disabled={payLoading} className="block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition disabled:opacity-60">
                    {payLoading ? "Abriendo pago seguro…" : `💳 Mercado Pago (${planLabel})`}
                  </button>
                  <p className="text-center text-xs text-gray-500 -mt-1">Se cobra en pesos chilenos; tu banco puede cobrar comisión por cambio de moneda.</p>
                  <p className="text-center text-xs text-gray-500">¿Prefieres transferencia internacional? <a href={waTransfer} target="_blank" rel="noopener noreferrer" className="underline font-semibold" style={{ color: "#3D2EE8" }}>Escríbenos por WhatsApp</a>.</p>
                </>
              )}

              {avisoPayPal && (
                <div className="rounded-2xl bg-[#FFF8E6] border border-[#F2E2A8] p-4 text-sm text-yellow-900 text-center">
                  Cuando termines en PayPal, vuelve a esta pestaña y toca <strong>&ldquo;Ya pagué con PayPal&rdquo;</strong> para que reservemos tu cupo.
                </div>
              )}

              {/* Paso 3 · Confirmar pago */}
              <div className="mt-6 pt-6 border-t border-dashed border-gray-300">
                {!payConfirmed ? (
                  <div className="text-center">
                    <div className="inline-block px-3 py-1 mb-2 rounded-full text-[10px] font-bold tracking-widest text-white" style={{ backgroundColor: "#3D2EE8" }}>PASO 3 · CONFIRMA</div>
                    <p className="text-sm font-bold text-gray-900 mb-1">¿Ya hiciste tu pago?</p>
                    <p className="text-xs text-gray-500 mb-4">Confírmalo aquí y reservamos el cupo en <strong>{curso.nombreCorto}</strong>. Te escribimos por correo/WhatsApp para darte la bienvenida.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { m: "Mercado Pago (tarjeta)", e: "💳" },
                        { m: "PayPal", e: "🌍" },
                        ...(HOTMART_LINK_UNICO ? [{ m: "Hotmart", e: "🌐" }] : []),
                        { m: "Transferencia bancaria", e: "🏦" },
                      ].map((opt) => (
                        <button key={opt.m} type="button" disabled={payConfirming} onClick={() => confirmarPago(opt.m)} className="px-4 py-2.5 rounded-full text-sm font-bold border-2 border-[#3D2EE8] text-[#3D2EE8] hover:bg-[#3D2EE8] hover:text-white transition disabled:opacity-50">
                          {opt.e} Ya pagué con {opt.m}
                        </button>
                      ))}
                    </div>
                    {payConfirming && <p className="text-xs text-gray-400 mt-3">Enviando confirmación…</p>}
                  </div>
                ) : (
                  <div className="text-center bg-[#F0FBF4] border border-[#BCEBCD] rounded-2xl p-5">
                    <div className="text-3xl mb-1">✅</div>
                    <p className="text-sm font-bold text-gray-900">¡Gracias{form.nombre ? `, ${form.nombre.split(" ")[0]}` : ""}! Registramos tu pago.</p>
                    <p className="text-xs text-gray-600 mt-1">Verificamos y te confirmamos el cupo por correo/WhatsApp en las próximas horas. 화이팅!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-6">🔒 Certificado incluido · Grabaciones incluidas · Tu información está protegida</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#F5F3FF]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Preguntas frecuentes</h2>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-lg opacity-90 mb-8">Las clases arrancan {INICIO_SEMANA} — {precioLabel()}. Certificado incluido.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#clases" className="px-8 py-4 bg-white text-[#3D2EE8] font-bold rounded-full text-lg hover:scale-105 transition">Elegir mi clase</a>
            <a href={waLink("Hola Jay! Tengo una duda sobre los cursos de octubre.")} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition">💬 Hablar con Jay primero</a>
          </div>
          <div className="mt-8 text-sm opacity-70">화이팅 chingu! Nos vemos {INICIO_SEMANA}.</div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}

function BotonPayPal({ plan, onClick, waMensual, relleno }: { plan: Plan; onClick: () => void; waMensual: string; relleno: boolean }) {
  const cls = relleno
    ? "block w-full py-3.5 rounded-full text-white font-bold text-base text-center hover:scale-[1.01] transition"
    : "block w-full py-3.5 rounded-full text-[#3D2EE8] font-bold text-base text-center border-2 border-[#3D2EE8] hover:bg-[#F5F3FF] transition";
  const style = relleno ? { backgroundColor: "#3D2EE8" } : undefined;
  if (plan === "unico" || PAYPAL_LINK_MENSUAL) {
    return (
      <a href={plan === "unico" ? PAYPAL_LINK_UNICO : PAYPAL_LINK_MENSUAL} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls} style={style}>
        🌍 PayPal · en dólares ({plan === "unico" ? `US$${PRECIO_UNICO}` : `US$${PRECIO_MENSUAL} por cuota`})
      </a>
    );
  }
  return (
    <a href={waMensual} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
      🌍 PayPal en {MESES} cuotas · te enviamos el link por WhatsApp
    </a>
  );
}
