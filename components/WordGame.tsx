'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight, Trophy } from 'lucide-react';

type Question = {
  level: 'Básico' | 'Intermedio';
  hangul: string;
  roman: string;
  q: string;
  opts: string[];
  a: number;
};

const QUESTIONS: Question[] = [
  {
    level: 'Básico',
    hangul: '안녕하세요',
    roman: 'annyeonghaseyo',
    q: '¿Qué significa este saludo?',
    opts: ['Adiós', 'Hola', 'Gracias', 'Lo siento'],
    a: 1,
  },
  {
    level: 'Básico',
    hangul: '감사합니다',
    roman: 'gamsahamnida',
    q: '¿Qué significa esta frase?',
    opts: ['Por favor', 'De nada', 'Gracias', 'Perdón'],
    a: 2,
  },
  {
    level: 'Básico',
    hangul: '저__ 학생이에요',
    roman: 'jeo__ haksaeng-ieyo',
    q: 'Gramática: ¿qué partícula completa "Yo soy estudiante"?',
    opts: ['는', '를', '에', '도'],
    a: 0,
  },
  {
    level: 'Básico',
    hangul: '가족',
    roman: 'gajok',
    q: '¿Qué significa esta palabra?',
    opts: ['Amigo', 'Familia', 'Escuela', 'Trabajo'],
    a: 1,
  },
  {
    level: 'Intermedio',
    hangul: '커피 안 좋아해요?',
    roman: 'keopi an joahaeyo?',
    q: '"¿No te gusta el café?" — si es cierto que NO te gusta, ¿cómo respondes en coreano?',
    opts: ['아니요', '네', '맞아요', '몰라요'],
    a: 1,
  },
  {
    level: 'Intermedio',
    hangul: '이게 뭐예요?',
    roman: 'i-ge mwo-ye-yo?',
    q: '¿Qué significa esta pregunta?',
    opts: ['¿Quién es?', '¿Dónde está?', '¿Qué es esto?', '¿Cómo estás?'],
    a: 2,
  },
  {
    level: 'Intermedio',
    hangul: '커피__ 마셔요',
    roman: 'keopi__ masyeoyo',
    q: 'Gramática: ¿qué partícula completa "Bebo café"?',
    opts: ['는', '를', '가', '도'],
    a: 1,
  },
  {
    level: 'Intermedio',
    hangul: '우리 엄마',
    roman: 'uri eomma',
    q: 'Un coreano dice esto para referirse a...',
    opts: ['Nuestra mamá (de todos)', 'Mi mamá', 'La mamá de otro', 'Su abuela'],
    a: 1,
  },
];

export default function WordGame() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[index];
  const total = QUESTIONS.length;

  const handleStart = () => {
    setStarted(true);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
    setFinished(false);
  };

  const handleSelect = (idx: number) => {
    if (locked) return;
    setSelected(idx);
    setLocked(true);
    if (idx === current.a) setScore((s) => s + 1);

    setTimeout(() => {
      if (index + 1 < total) {
        setIndex((i) => i + 1);
        setSelected(null);
        setLocked(false);
      } else {
        setFinished(true);
      }
    }, 900);
  };

  const perfect = score === total;
  const good = score >= Math.ceil(total * 0.6);

  return (
    <section
      id="juego"
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(61,46,232,0.25) 0%, transparent 60%), #0a0a0f',
      }}
    >
      <div
        aria-hidden
        className="absolute -left-10 bottom-0 font-black font-korean leading-none text-white/[0.03] select-none pointer-events-none"
        style={{ fontSize: '38vw' }}
      >
        놀이
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-seoul-gold mb-4">
            <Sparkles size={14} /> Pruébalo tú mismo
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-4">
            ¿Cuánto coreano <span className="text-gradient-red">ya sabes?</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            8 preguntas rápidas de vocabulario y gramática, sacadas directo de nuestras clases de Básico 1 (A1.1).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg mx-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl"
        >
          {!started && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🇰🇷</div>
              <h3 className="font-serif text-2xl text-seoul-black mb-2">Torpedo Coreano</h3>
              <p className="text-seoul-black/55 text-sm mb-6">
                Mezcla de vocabulario y partículas — nivel básico a intermedio.
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300"
              >
                Empezar el juego <ArrowRight size={16} />
              </button>
            </div>
          )}

          {started && !finished && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-seoul-black/50 mb-2">
                <span>
                  Pregunta <b className="text-seoul-black">{index + 1}</b> de {total}
                </span>
                <span>
                  Puntaje: <b className="text-seoul-black">{score}</b>
                </span>
              </div>
              <div className="h-1.5 w-full bg-seoul-black/10 rounded-full overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-seoul-red rounded-full"
                  animate={{ width: `${(index / total) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-seoul-red bg-seoul-red/10 rounded-full px-3 py-1 mb-4">
                    {current.level}
                  </span>
                  <div className="text-center mb-2">
                    <div className="font-korean font-black text-4xl md:text-5xl text-seoul-black mb-1">
                      {current.hangul}
                    </div>
                    <div className="italic text-seoul-black/40 text-sm">{current.roman}</div>
                  </div>
                  <p className="text-center text-seoul-black/80 font-medium text-sm md:text-base mb-6 mt-4">
                    {current.q}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.opts.map((opt, idx) => {
                      const isCorrect = locked && idx === current.a;
                      const isWrong = locked && idx === selected && idx !== current.a;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelect(idx)}
                          disabled={locked}
                          className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold text-left transition-all duration-200 ${
                            isCorrect
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : isWrong
                                ? 'border-gray-400 bg-gray-100 text-gray-600 line-through'
                                : 'border-seoul-black/10 hover:border-seoul-red/40 hover:bg-seoul-red/5 text-seoul-black'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {finished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-seoul-red/10 flex items-center justify-center mx-auto mb-4">
                <Trophy size={28} className="text-seoul-red" />
              </div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-seoul-black/40 mb-1">
                Resultado
              </p>
              <div className="font-serif text-4xl text-seoul-black mb-3">
                {score} / {total}
              </div>
              <p className="text-seoul-black/60 text-sm mb-7 max-w-xs mx-auto">
                {perfect
                  ? '¡Puntaje perfecto! Ya tienes una base sólida — Básico 2 (A1.2) o Conversacional 1 (A2.1) son tu siguiente paso.'
                  : good
                    ? 'Nada mal para una probadita. En Básico 1 vemos todo esto (y mucho más) con calma, paso a paso.'
                    : 'Así arrancamos todos. En Básico 1 (A1.1) empezamos desde cero, sin apuro y con clases en vivo.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/nivel-1#clases"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-seoul-red hover:bg-seoul-red-muted text-white font-semibold rounded-lg transition-all duration-300 text-sm w-full sm:w-auto"
                >
                  Inscribirme · Octubre 2026 →
                </a>
                <button
                  onClick={handleStart}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-seoul-black/15 hover:border-seoul-red text-seoul-black font-semibold rounded-lg transition-all duration-300 text-sm w-full sm:w-auto"
                >
                  <RotateCcw size={15} /> Jugar de nuevo
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
