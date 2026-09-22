"use client";

import { useState } from "react";

// Embed liviano de YouTube: muestra la miniatura y carga el reproductor (≈1,3 MB) solo al hacer clic.
type Props = {
  id: string;
  title: string;
  start?: number;
  className?: string;
  vertical?: boolean;
};

export default function LiteYouTube({ id, title, start = 0, className = "", vertical = false }: Props) {
  const [play, setPlay] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ""}`;
  const thumb = `https://i.ytimg.com/vi/${id}/${vertical ? "oardefault" : "hqdefault"}.jpg`;
  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      {play ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`Reproducir: ${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-14 rounded-2xl bg-[#3D2EE8] group-hover:bg-[#2C1FB0] shadow-xl transition-colors">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
