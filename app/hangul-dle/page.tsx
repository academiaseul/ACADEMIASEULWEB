'use client';

import { useEffect, useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// ── Banco de palabras (todas de 2 sílabas · nivel A1) ──
type Word = { ko: string; roman: string; es: string };

const WORDS: Word[] = [
  { ko: '안녕', roman: 'annyeong', es: 'hola / chao (informal)' },
  { ko: '감사', roman: 'gamsa', es: 'gratitud (de 감사합니다)' },
  { ko: '사랑', roman: 'sarang', es: 'amor' },
  { ko: '친구', roman: 'chingu', es: 'amigo/a' },
  { ko: '가족', roman: 'gajok', es: 'familia' },
  { ko: '학교', roman: 'hakgyo', es: 'escuela' },
  { ko: '오늘', roman: 'oneul', es: 'hoy' },
  { ko: '저녁', roman: 'jeonyeok', es: 'noche / cena' },
  { ko: '아침', roman: 'achim', es: 'mañana / desayuno' },
  { ko: '여름', roman: 'yeoreum', es: 'verano' },
  { ko: '겨울', roman: 'gyeoul', es: 'invierno' },
  { ko: '공부', roman: 'gongbu', es: 'estudio' },
  { ko: '행복', roman: 'haengbok', es: 'felicidad' },
  { ko: '시간', roman: 'sigan', es: 'tiempo / hora' },
  { ko: '음식', roman: 'eumsik', es: 'comida' },
  { ko: '병원', roman: 'byeongwon', es: 'hospital' },
  { ko: '사진', roman: 'sajin', es: 'foto' },
  { ko: '커피', roman: 'keopi', es: 'café' },
  { ko: '회사', roman: 'hoesa', es: 'empresa' },
  { ko: '김치', roman: 'gimchi', es: 'kimchi' },
];

const MAX_GUESSES = 6;

type Cell = { syll: string; status: 'correct' | 'present' | 'absent' };

function evaluateGuess(guess: string[], target: string[]): Cell['status'][] {
  const result: Cell['status'][] = new Array(guess.length).fill('absent');
  const remaining: Record<string, number> = {};
  target.forEach((s) => (remaining[s] = (remaining[s] || 0) + 1));

  guess.forEach((s, i) => {
    if (target[i] === s) {
      result[i] = 'correct';
      remaining[s]--;
    }
  });
  guess.forEach((s, i) => {
    if (result[i] === 'correct') return;
    if (remaining[s] > 0) {
      result[i] = 'present';
      remaining[s]--;
    }
  });
  return result;
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function dailyIndex(): number {
  const dayCount = Math.floor(Date.now() / 86400000);
  return dayCount % WORDS.length;
}

type SavedState = {
  guesses: string[]; // koreano words guessed, in order
  status: 'playing' | 'won' | 'lost';
};

type Streak = { streak: number; lastWin: string };

export default function HangulDle() {
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState<Word>(WORDS[0]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [selected, setSelected] = useState<string>('');
  const [streak, setStreak] = useState<Streak>({ streak: 0, lastWin: '' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const key = todayKey();
    const w = WORDS[dailyIndex()];
    setTarget(w);

    try {
      const raw = localStorage.getItem(`hangul-dle-${key}`);
      if (raw) {
        const saved: SavedState = JSON.parse(raw);
        setGuesses(saved.guesses);
        setStatus(saved.status);
      }
      const streakRaw = localStorage.getItem('hangul-dle-streak');
      if (streakRaw) setStreak(JSON.parse(streakRaw));
    } catch {
      // ignore corrupt storage
    }
    setMounted(true);
  }, []);

  const targetSylls = useMemo(() => Array.from(target.ko), [target]);

  const persist = (nextGuesses: string[], nextStatus: 'playing' | 'won' | 'lost') => {
    const key = todayKey();
    localStorage.setItem(`hangul-dle-${key}`, JSON.stringify({ guesses: nextGuesses, status: nextStatus }));
    if (nextStatus === 'won') {
      const prev: Streak = JSON.parse(localStorage.getItem('hangul-dle-streak') || '{"streak":0,"lastWin":""}');
      const yesterday = new Date(Date.now() - 86400000);
      const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
      const next: Streak = {
        streak: prev.lastWin === yKey || prev.lastWin === key ? prev.streak + (prev.lastWin === key ? 0 : 1) : 1,
        lastWin: key,
      };
      localStorage.setItem('hangul-dle-streak', JSON.stringify(next));
      setStreak(next);
    }
  };

  const alreadyGuessedWords = new Set(guesses);

  const submitGuess = () => {
    if (!selected || status !== 'playing' || alreadyGuessedWords.has(selected)) return;
    const nextGuesses = [...guesses, selected];
    let nextStatus: 'playing' | 'won' | 'lost' = 'playing';
    if (selected === target.ko) nextStatus = 'won';
    else if (nextGuesses.length >= MAX_GUESSES) nextStatus = 'lost';

    setGuesses(nextGuesses);
    setStatus(nextStatus);
    setSelected('');
    persist(nextGuesses, nextStatus);
  };

  const buildShareText = () => {
    const rows = guesses.map((g) => {
      const gs = Array.from(g);
      const res = evaluateGuess(gs, targetSylls);
      return res.map((r) => (r === 'correct' ? '🟩' : r === 'present' ? '🟨' : '⬜')).join('');
    });
    return `Hangul-dle · academiaseul.com\n${guesses.length}/${MAX_GUESSES}\n${rows.join('\n')}`;
  };

  const share = async () => {
    const text = buildShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation solid />
        <div className="pt-40 pb-20 text-center text-gray-400">Cargando…</div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation solid />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-10 px-6 text-center" style={{ backgroundColor: '#3D2EE8' }}>
        <div className="max-w-2xl mx-auto text-white">
          <div className="inline-block px-4 py-1 mb-5 rounded-full bg-white/15 text-xs font-bold tracking-widest">
            JUEGO DIARIO · 매일
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Hangul-dle</h1>
          <p className="text-white/85 text-lg">
            Adivina la palabra coreana del día en {MAX_GUESSES} intentos, con una pista gratis para arrancar.
          </p>
          {streak.streak > 0 && (
            <p className="mt-4 text-sm font-semibold text-white/70">🔥 Racha actual: {streak.streak} día{streak.streak === 1 ? '' : 's'}</p>
          )}
        </div>
      </section>

      {/* Tool */}
      <section className="px-6 -mt-6">
        <div className="max-w-xl mx-auto">
          <div className="mt-6 rounded-3xl border-2 border-[#3D2EE8] bg-[#F5F3FF] p-6 md:p-10">
            {/* Pista */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-sm font-semibold text-center">
                💡 Pista: ¿cuál palabra empieza con{' '}
                <span
                  className="text-lg font-black"
                  style={{ fontFamily: "'Noto Sans KR','Malgun Gothic',sans-serif" }}
                >
                  {targetSylls[0]}
                </span>
                ?
              </span>
            </div>

            {/* Grid de intentos */}
            <div className="flex flex-col gap-2.5 mb-6">
              {Array.from({ length: MAX_GUESSES }).map((_, rowIdx) => {
                const guess = guesses[rowIdx];
                const guessSylls = guess ? Array.from(guess) : null;
                const evalResult = guessSylls ? evaluateGuess(guessSylls, targetSylls) : null;
                return (
                  <div key={rowIdx} className="flex gap-2.5 justify-center">
                    {Array.from({ length: targetSylls.length }).map((_, colIdx) => {
                      const syll = guessSylls?.[colIdx] ?? '';
                      const res = evalResult?.[colIdx];
                      const bg =
                        res === 'correct' ? 'bg-green-500 border-green-500 text-white'
                        : res === 'present' ? 'bg-amber-400 border-amber-400 text-white'
                        : res === 'absent' ? 'bg-gray-300 border-gray-300 text-white'
                        : 'bg-white border-gray-300 text-seoul-black';
                      return (
                        <div
                          key={colIdx}
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 flex items-center justify-center font-black text-2xl md:text-3xl ${bg}`}
                          style={{ fontFamily: "'Noto Sans KR','Malgun Gothic',sans-serif" }}
                        >
                          {syll}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Selector de palabra */}
            {status === 'playing' && (
              <>
                <p className="text-center text-sm text-gray-500 mb-3">
                  Elige tu intento {guesses.length + 1} de {MAX_GUESSES}:
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {WORDS.map((w) => {
                    const used = alreadyGuessedWords.has(w.ko);
                    const matchesHint = Array.from(w.ko)[0] === targetSylls[0];
                    return (
                      <button
                        key={w.ko}
                        disabled={used}
                        onClick={() => setSelected(w.ko)}
                        className={`px-3.5 py-2 rounded-lg border-2 font-bold text-base transition-all ${
                          used
                            ? 'opacity-30 border-gray-200 cursor-not-allowed'
                            : selected === w.ko
                              ? 'border-[#3D2EE8] bg-[#3D2EE8] text-white'
                              : matchesHint
                                ? 'border-amber-300 bg-amber-50 hover:border-[#3D2EE8]/50 text-seoul-black'
                                : 'border-gray-200 hover:border-[#3D2EE8]/50 text-seoul-black'
                        }`}
                        style={{ fontFamily: "'Noto Sans KR','Malgun Gothic',sans-serif" }}
                      >
                        {w.ko}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={submitGuess}
                    disabled={!selected}
                    className="px-8 py-3 rounded-full font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#3D2EE8' }}
                  >
                    Adivinar →
                  </button>
                </div>
              </>
            )}

            {status !== 'playing' && (
              <div className="text-center pt-2">
                <div className="text-5xl mb-3">{status === 'won' ? '🎉' : '💛'}</div>
                <h3 className="text-2xl font-black text-seoul-black mb-1">
                  {status === 'won' ? '¡Lo lograste!' : 'Casi — ¡mañana hay otra!'}
                </h3>
                <div
                  className="font-black text-[#3D2EE8] text-4xl mt-3"
                  style={{ fontFamily: "'Noto Sans KR','Malgun Gothic',sans-serif" }}
                >
                  {target.ko}
                </div>
                <p className="text-gray-500 mt-1">
                  {target.roman} · {target.es}
                </p>
                <button
                  onClick={share}
                  className="mt-6 px-7 py-3 rounded-full font-bold border-2 border-[#3D2EE8] text-[#3D2EE8] hover:bg-[#3D2EE8]/5 transition"
                >
                  {copied ? '¡Copiado! ✓' : '📋 Compartir resultado'}
                </button>
                <p className="text-gray-400 text-sm mt-4">Volvé mañana para una palabra nueva.</p>
              </div>
            )}
          </div>

          {/* Leyenda */}
          <div className="mt-5 flex items-center justify-center gap-5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-green-500 inline-block" /> posición correcta
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block" /> está, mal ubicada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-gray-300 inline-block" /> no está
            </span>
          </div>

          {/* CTA */}
          <div className="my-14 bg-seoul-black text-white rounded-3xl px-8 py-10 text-center">
            <div className="text-3xl font-black mb-2" style={{ fontFamily: "'Noto Sans KR',sans-serif" }}>한글</div>
            <h3 className="text-2xl font-black mb-3">¿Querés reconocer estas palabras sin adivinar?</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Todo este vocabulario (y mucho más) se ve paso a paso en nuestras clases en vivo, desde cero.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/lector-hangul" className="px-7 py-3.5 rounded-full font-bold" style={{ backgroundColor: '#E8B84B', color: '#0D0D0D' }}>
                Lector de Hangul gratis →
              </a>
              <a href="/nivel-1#clases" className="px-7 py-3.5 rounded-full font-bold bg-seoul-red text-white">
                Inscribirme a un curso →
              </a>
            </div>
            <p className="text-white/50 text-sm mt-5">화이팅 chingu! 🇰🇷</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
