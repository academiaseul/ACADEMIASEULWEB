'use client';

import { useEffect, useRef, useState } from 'react';

type Item = { ko: string; rom: string; say: string; gloss?: string };

const CONSONANTS: Item[] = [
  { ko: 'ㄱ', rom: 'g·k', say: '가' },
  { ko: 'ㄴ', rom: 'n', say: '나' },
  { ko: 'ㄷ', rom: 'd·t', say: '다' },
  { ko: 'ㄹ', rom: 'r·l', say: '라' },
  { ko: 'ㅁ', rom: 'm', say: '마' },
  { ko: 'ㅂ', rom: 'b·p', say: '바' },
  { ko: 'ㅅ', rom: 's', say: '사' },
  { ko: 'ㅇ', rom: 'ng', say: '아' },
  { ko: 'ㅈ', rom: 'j/y', say: '자' },
  { ko: 'ㅊ', rom: 'ch', say: '차' },
  { ko: 'ㅋ', rom: 'k', say: '카' },
  { ko: 'ㅌ', rom: 't', say: '타' },
  { ko: 'ㅍ', rom: 'p', say: '파' },
  { ko: 'ㅎ', rom: 'h', say: '하' },
];

const VOWELS: Item[] = [
  { ko: 'ㅏ', rom: 'a', say: '아' },
  { ko: 'ㅓ', rom: 'eo', say: '어' },
  { ko: 'ㅗ', rom: 'o', say: '오' },
  { ko: 'ㅜ', rom: 'u', say: '우' },
  { ko: 'ㅡ', rom: 'eu', say: '으' },
  { ko: 'ㅑ', rom: 'ia', say: '야' },
  { ko: 'ㅕ', rom: 'ieo', say: '여' },
  { ko: 'ㅛ', rom: 'io', say: '요' },
  { ko: 'ㅠ', rom: 'iu', say: '유' },
  { ko: 'ㅣ', rom: 'i', say: '이' },
];

const WORDS: Item[] = [
  { ko: '고기', rom: 'go-gi', say: '고기', gloss: 'carne' },
  { ko: '우유', rom: 'u-iu', say: '우유', gloss: 'leche' },
  { ko: '바다', rom: 'ba-da', say: '바다', gloss: 'mar' },
  { ko: '나무', rom: 'na-mu', say: '나무', gloss: 'árbol' },
  { ko: '사랑', rom: 'sa-rang', say: '사랑', gloss: 'amor' },
  { ko: '친구', rom: 'chin-gu', say: '친구', gloss: 'amigo' },
  { ko: '안녕', rom: 'an-nyeong', say: '안녕', gloss: 'hola' },
  { ko: '김치', rom: 'kim-chi', say: '김치', gloss: 'kimchi' },
];

export default function HangulBoard() {
  const [active, setActive] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => v.lang === 'ko-KR') ||
        voices.find((v) => v.lang.toLowerCase().startsWith('ko')) ||
        null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (item: Item) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(item.say);
    u.lang = 'ko-KR';
    u.rate = 0.8;
    if (voiceRef.current) u.voice = voiceRef.current;
    window.speechSynthesis.speak(u);
    setActive(item.ko);
    window.setTimeout(() => setActive((cur) => (cur === item.ko ? null : cur)), 600);
  };

  const Tile = ({ item, big = false }: { item: Item; big?: boolean }) => {
    const isOn = active === item.ko;
    return (
      <button
        type="button"
        onClick={() => speak(item)}
        aria-label={`Escuchar ${item.ko}`}
        className={`flex flex-col items-center justify-center rounded-lg border-2 transition-all select-none ${
          big ? 'py-4 px-2' : 'py-3 px-1'
        } ${
          isOn
            ? 'bg-seoul-red border-seoul-red -translate-y-0.5 shadow-[4px_4px_0_#0a0a0f]'
            : 'bg-[#1A1A2E] border-[#1A1A2E] hover:border-seoul-red hover:-translate-y-0.5 shadow-[3px_3px_0_#0a0a0f]'
        }`}
      >
        <span
          className="font-black text-white leading-none"
          style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: big ? '1.6rem' : '1.5rem' }}
        >
          {item.ko}
        </span>
        <span className={`mt-1 text-[11px] font-bold ${isOn ? 'text-white' : 'text-[#9D96F2]'}`}>
          {item.rom}
        </span>
        {item.gloss && (
          <span className={`text-[10px] ${isOn ? 'text-white/80' : 'text-gray-400'}`}>
            {item.gloss}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="border-2 border-seoul-black bg-white shadow-[8px_8px_0_#0a0a0f] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-1">
        <span className="bg-seoul-red text-white px-3 py-1 text-xs font-bold tracking-wider uppercase">
          🔊 Audio · Gratis
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-seoul-black mt-3 mb-1">
        Tablero de pronunciación
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Haz clic en cada letra para escuchar su sonido en coreano. Las consonantes
        suenan con la vocal{' '}
        <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>ㅏ</span> (a).
      </p>

      {!supported && (
        <p className="text-sm text-seoul-red font-semibold mb-5">
          Tu navegador no soporta el audio de voz. Prueba en Chrome o Edge para
          escuchar la pronunciación.
        </p>
      )}

      <p className="text-xs font-bold tracking-[3px] uppercase text-seoul-red mb-3">
        14 consonantes · 자음
      </p>
      <div className="grid grid-cols-7 gap-2 mb-7">
        {CONSONANTS.map((it) => (
          <Tile key={it.ko} item={it} />
        ))}
      </div>

      <p className="text-xs font-bold tracking-[3px] uppercase text-seoul-red mb-3">
        10 vocales · 모음
      </p>
      <div className="grid grid-cols-5 gap-2 mb-7">
        {VOWELS.map((it) => (
          <Tile key={it.ko} item={it} />
        ))}
      </div>

      <p className="text-xs font-bold tracking-[3px] uppercase text-seoul-red mb-3">
        Primeras palabras
      </p>
      <div className="grid grid-cols-4 gap-2">
        {WORDS.map((it) => (
          <Tile key={it.ko} item={it} big />
        ))}
      </div>
    </div>
  );
}
