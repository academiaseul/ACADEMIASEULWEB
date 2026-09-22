'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useT, i18n, Tr } from '@/lib/i18n';

type Opt = { label: string; pts: number };
type Q = { q: string; korean?: string; opts: Opt[] };

const QUESTIONS: Q[] = [
  {
    q: i18n('¿Puedes leer esto?'),
    korean: '안녕',
    opts: [
      { label: i18n('Ni idea, son dibujitos para mí'), pts: 0 },
      { label: i18n('Reconozco alguna letra'), pts: 1 },
      { label: i18n('Sí, dice "annyeong"'), pts: 2 },
    ],
  },
  {
    q: i18n('¿Sabes qué es el 한글 (hangul)?'),
    opts: [
      { label: i18n('No'), pts: 0 },
      { label: i18n('He oído el término'), pts: 1 },
      { label: i18n('Es el alfabeto coreano, claro'), pts: 2 },
    ],
  },
  {
    q: i18n('¿Has estudiado coreano antes?'),
    opts: [
      { label: i18n('Nunca, parto de cero'), pts: 0 },
      { label: i18n('Por mi cuenta (apps, videos)'), pts: 1 },
      { label: i18n('En clases o academia'), pts: 2 },
    ],
  },
  {
    q: i18n('La partícula 은/는, ¿para qué sirve?'),
    opts: [
      { label: i18n('No tengo idea'), pts: 0 },
      { label: i18n('Creo que marca el tema de la frase'), pts: 1 },
      { label: i18n('Sí, marca el tema/sujeto'), pts: 2 },
    ],
  },
  {
    q: i18n('¿Puedes presentarte en coreano? (저는 ...이에요)'),
    opts: [
      { label: i18n('Para nada'), pts: 0 },
      { label: i18n('Más o menos, con ayuda'), pts: 1 },
      { label: i18n('Sí, sin problema'), pts: 2 },
    ],
  },
];

const GOALS = [
  i18n('🎵 Entender K-pop y K-dramas'),
  i18n('✈️ Viajar o vivir en Corea'),
  i18n('📜 Dar el examen TOPIK'),
  i18n('💜 Hobby y cultura'),
];

function resultFor(score: number) {
  if (score <= 3)
    return {
      tier: i18n('Principiante total'),
      emoji: '🌱',
      text: i18n('Estás partiendo desde cero — el lugar perfecto para empezar bien. Básico 1 (A1.1) te enseña a leer hangul en la primera semana y a construir tus primeras frases. Martes o jueves 20:00 (Chile), desde la semana del 12 de octubre.'),
      rec: i18n('Básico 1 (A1.1) · desde cero'),
    };
  if (score <= 7)
    return {
      tier: i18n('Falso principiante'),
      emoji: '🚀',
      text: i18n('Ya tienes contacto con el idioma, pero te faltan bases ordenadas. Básico 1 te llena los huecos y te da estructura para avanzar de verdad — y si ya lees hangul con soltura, Básico 2 (miércoles 21:00) es tu curso.'),
      rec: i18n('Básico 1 (A1.1) · o Básico 2 si ya lees hangul'),
    };
  return {
    tier: i18n('Tienes bases'),
    emoji: '🔥',
    text: i18n('Vas bien. Básico 2 (A1.2, miércoles 21:00) te lleva al pasado y al futuro; si ya conversas, Conversacional 1 (A2.1) con profesora nativa (martes 21:00) es para ti. ¿Vas por el examen? TOPIK II (B1+), jueves 21:00.'),
    rec: i18n('Básico 2 (A1.2) · Conversacional 1 (A2.1) · o TOPIK II (B1+)'),
  };
}

export default function TestNivelPage() {
  const { t } = useT();
  const [step, setStep] = useState(0); // 0..QUESTIONS.length-1, then goal, then email, then result
  const [answers, setAnswers] = useState<number[]>([]);
  const [goal, setGoal] = useState('');
  const [form, setForm] = useState({ nombre: '', correo: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const totalSteps = QUESTIONS.length + 1; // questions + goal
  const score = answers.reduce((a, b) => a + b, 0);
  const result = resultFor(score);

  const answer = (pts: number) => {
    setAnswers((prev) => [...prev, pts]);
    setStep((s) => s + 1);
  };

  const chooseGoal = (g: string) => {
    setGoal(g);
    setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!form.nombre || !form.correo) return;
    setSending(true);
    try {
      await fetch('https://formspree.io/f/mzdypyky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Test de nivel — ${form.nombre} (${result.tier})`,
          tipo: 'Test de nivel',
          nombre: form.nombre,
          correo: form.correo,
          resultado: result.tier,
          puntaje: `${score}/10`,
          meta: goal,
        }),
      });
    } catch {
      /* mostramos el resultado igual */
    } finally {
      setSending(false);
      setDone(true);
    }
  };

  const progress = Math.min(step, totalSteps) / totalSteps;
  const showQuestion = step < QUESTIONS.length;
  const showGoal = step === QUESTIONS.length;
  const showEmail = step === QUESTIONS.length + 1 && !done;
  const showResult = done;

  return (
    <main className="min-h-screen bg-[#F4F7FF]">
      <Navigation solid />

      <section className="pt-32 md:pt-40 pb-12 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-seoul-red text-xs font-bold tracking-[4px] uppercase mb-4">
            레벨 테스트 · {t('Test de nivel')}
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-seoul-black mb-3">
            {t('¿Qué nivel de coreano')} <span className="text-seoul-red">{t('tienes')}</span>?
          </h1>
          <p className="text-gray-600">
            {t('5 preguntas rápidas. Te decimos por dónde empezar (y te mandamos tu guía gratis).')}
          </p>
        </div>

        {/* Progress */}
        {!showResult && (
          <div className="h-2 w-full bg-[#E5E1FB] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[#3D2EE8] transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}

        {/* Question */}
        {showQuestion && (
          <div className="border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] p-7 md:p-9">
            <p className="text-xs font-bold text-gray-400 mb-2">
              {t('Pregunta {n} de {total}', { n: step + 1, total: QUESTIONS.length })}
            </p>
            <h2 className="text-xl md:text-2xl font-black text-seoul-black mb-1">
              {t(QUESTIONS[step].q)}
            </h2>
            {QUESTIONS[step].korean && (
              <p
                className="text-5xl font-black text-seoul-red my-5 text-center"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {QUESTIONS[step].korean}
              </p>
            )}
            <div className="space-y-3 mt-5">
              {QUESTIONS[step].opts.map((o) => (
                <button
                  key={o.label}
                  onClick={() => answer(o.pts)}
                  className="block w-full text-left px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-[#3D2EE8] hover:bg-[#F5F3FF] font-semibold text-gray-800 transition"
                >
                  {t(o.label)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Goal */}
        {showGoal && (
          <div className="border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] p-7 md:p-9">
            <h2 className="text-xl md:text-2xl font-black text-seoul-black mb-5">
              {t('Última: ¿cuál es tu meta principal?')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GOALS.map((g) => (
                <button
                  key={g}
                  onClick={() => chooseGoal(g)}
                  className="px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-[#3D2EE8] hover:bg-[#F5F3FF] font-semibold text-gray-800 transition text-left"
                >
                  {t(g)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email gate */}
        {showEmail && (
          <div className="border-2 border-seoul-black bg-white shadow-[6px_6px_0_#0a0a0f] p-7 md:p-9 text-center">
            <div className="text-4xl mb-3">{result.emoji}</div>
            <h2 className="text-2xl font-black text-seoul-black mb-2">
              {t('¡Listo! Tu resultado está calculado.')}
            </h2>
            <p className="text-gray-600 mb-6">
              <Tr k="Déjanos dónde enviarte tu resultado + la **guía del alfabeto gratis** y lo ves al instante." />
            </p>
            <div className="space-y-3 max-w-sm mx-auto">
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder={t('Tu nombre')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#3D2EE8] outline-none transition"
              />
              <input
                type="email"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                placeholder={t('Tu correo')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#3D2EE8] outline-none transition"
              />
              <button
                onClick={submit}
                disabled={sending || !form.nombre || !form.correo}
                className="w-full py-4 rounded-full bg-seoul-red text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50"
              >
                {sending ? t('Calculando…') : t('Ver mi resultado →')}
              </button>
              <p className="text-xs text-gray-400">{t('🔒 Sin spam. Solo tu resultado y tips de coreano.')}</p>
            </div>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="border-2 border-seoul-black bg-white shadow-[8px_8px_0_#3D2EE8] p-8 md:p-10 text-center">
            <div className="text-5xl mb-3">{result.emoji}</div>
            <p className="text-xs font-bold tracking-[3px] uppercase text-seoul-red mb-2">
              {t('Tu resultado · {score}/10', { score })}
            </p>
            <h2 className="text-3xl font-black text-seoul-black mb-4">{t(result.tier)}</h2>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-md mx-auto">{t(result.text)}</p>

            <div className="bg-[#F5F3FF] border border-[#E5E1FB] rounded-2xl p-5 mb-7">
              <p className="text-sm text-gray-500 mb-1">{t('Recomendado para ti')}</p>
              <p className="text-lg font-black text-[#3D2EE8]">{t(result.rec)}</p>
              {goal && <p className="text-sm text-gray-600 mt-2">{t('Tu meta: {goal}', { goal: t(goal) })}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/nivel-1#clases"
                className="inline-block bg-seoul-red text-white font-bold px-8 py-4 rounded-full hover:scale-[1.02] transition"
              >
                {t('Inscribirme · Octubre 2026 →')}
              </a>
              <a
                href="/recursos/guias"
                className="inline-block bg-white text-seoul-black font-bold px-8 py-4 rounded-full border-2 border-seoul-black hover:bg-gray-50 transition"
              >
                {t('Descargar mi guía')}
              </a>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
