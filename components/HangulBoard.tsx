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

// Composición de bloques silábicos (Unicode hangul) para el modo combinación
const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const CHO_R: Record<string, string> = {
  'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅅ': 's',
  'ㅇ': '', 'ㅈ': 'j', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
};
const composeSyl = (c: string, v: string) => {
  const ci = CHO.indexOf(c);
  const vi = JUNG.indexOf(v);
  if (ci < 0 || vi < 0) return '';
  return String.fromCharCode(0xac00 + (ci * 21 + vi) * 28);
};

// Clips pregrabados con voz neural coreana en /public/audio/kr, nombrados por el
// hex UTF-8 del texto. speechSynthesis queda solo como respaldo si falta un clip.
const hexOf = (t: string) =>
  Array.from(new TextEncoder().encode(t))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

export default function HangulBoard() {
  const [active, setActive] = useState<string | null>(null);
  const [selCons, setSelCons] = useState<string | null>(null);
  const [selVowel, setSelVowel] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const audioRef = useRef<Record<string, HTMLAudioElement>>({});
  const currentRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
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

  const ttsSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = 0.8;
    if (voiceRef.current) u.voice = voiceRef.current;
    window.speechSynthesis.speak(u);
  };

  const play = (text: string) => {
    if (!text) return;
    currentRef.current?.pause();
    let a = audioRef.current[text];
    if (!a) {
      a = new Audio(`/audio/kr/${hexOf(text)}.mp3`);
      audioRef.current[text] = a;
    }
    currentRef.current = a;
    a.currentTime = 0;
    a.play().catch((err) => {
      if (err && err.name === 'NotAllowedError') return; // autoplay bloqueado, no es un clip roto
      delete audioRef.current[text];
      ttsSpeak(text);
    });
  };

  const flash = (ko: string) => {
    setActive(ko);
    window.setTimeout(() => setActive((cur) => (cur === ko ? null : cur)), 600);
  };

  const clickCons = (item: Item) => {
    setSelCons(item.ko);
    flash(item.ko);
    play(selVowel ? composeSyl(item.ko, selVowel) : item.say);
  };

  const clickVowel = (item: Item) => {
    setSelVowel(item.ko);
    flash(item.ko);
    play(composeSyl(selCons ?? 'ㅇ', item.ko));
  };

  const clickWord = (item: Item) => {
    flash(item.ko);
    play(item.say);
  };

  const comboSyl = selVowel ? composeSyl(selCons ?? 'ㅇ', selVowel) : null;
  const comboRom = selVowel
    ? (selCons ? CHO_R[selCons] : '') + (VOWELS.find((v) => v.ko === selVowel)?.rom ?? '')
    : null;

  const Tile = ({
    item,
    big = false,
    selected = false,
    onTap,
  }: {
    item: Item;
    big?: boolean;
    selected?: boolean;
    onTap: (item: Item) => void;
  }) => {
    const isOn = active === item.ko || selected;
    return (
      <button
        type="button"
        onClick={() => onTap(item)}
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
      <p className="text-gray-600 text-sm mb-5">
        Toca una consonante y luego una vocal: escucharás la{' '}
        <span className="font-bold text-seoul-black">sílaba combinada</span> (
        <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>ㄱ + ㅏ = 가</span>). Una vocal
        sola suena con <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>ㅇ</span> mudo.
      </p>

      {/* Combinador de sílabas */}
      <div className="border-2 border-seoul-black bg-[#1A1A2E] shadow-[5px_5px_0_#3D2EE8] px-5 py-4 mb-7 flex items-center gap-x-4 gap-y-2 flex-wrap min-h-[76px]">
        {comboSyl ? (
          <>
            <span
              className="text-4xl font-black text-white leading-none"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              {comboSyl}
            </span>
            <span
              className="text-[#9D96F2] font-bold text-sm"
              style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
            >
              {selCons ?? 'ㅇ'} + {selVowel} = {comboSyl}
            </span>
            <span className="text-white font-bold text-sm">· {comboRom}</span>
            <button
              type="button"
              onClick={() => play(comboSyl)}
              className="ml-auto bg-seoul-red text-white font-bold text-sm px-3 py-1.5 rounded hover:opacity-90"
            >
              🔊 Repetir
            </button>
            <button
              type="button"
              onClick={() => {
                setSelCons(null);
                setSelVowel(null);
              }}
              className="text-[#9D96F2] font-bold text-sm underline"
            >
              borrar
            </button>
          </>
        ) : (
          <span className="text-[#9D96F2] font-bold text-sm">
            👆 Tu sílaba aparecerá aquí: elige una consonante y una vocal
          </span>
        )}
      </div>

      {!supported && (
        <p className="text-sm text-seoul-red font-semibold mb-5">
          Tu navegador no pudo reproducir el audio. Prueba en Chrome, Edge o Safari.
        </p>
      )}

      <p className="text-xs font-bold tracking-[3px] uppercase text-seoul-red mb-3">
        14 consonantes · 자음
      </p>
      <div className="grid grid-cols-7 gap-2 mb-7">
        {CONSONANTS.map((it) => (
          <Tile key={it.ko} item={it} selected={selCons === it.ko} onTap={clickCons} />
        ))}
      </div>

      <p className="text-xs font-bold tracking-[3px] uppercase text-seoul-red mb-3">
        10 vocales · 모음
      </p>
      <div className="grid grid-cols-5 gap-2 mb-7">
        {VOWELS.map((it) => (
          <Tile key={it.ko} item={it} selected={selVowel === it.ko} onTap={clickVowel} />
        ))}
      </div>

      <p className="text-xs font-bold tracking-[3px] uppercase text-seoul-red mb-3">
        Primeras palabras
      </p>
      <div className="grid grid-cols-4 gap-2">
        {WORDS.map((it) => (
          <Tile key={it.ko} item={it} big onTap={clickWord} />
        ))}
      </div>
    </div>
  );
}
