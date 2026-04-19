import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
} from 'remotion';

// ── Floating Korean Character ──────────────────────────────────────────────
type FloatingCharProps = {
  char: string;
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
};

const FloatingChar: React.FC<FloatingCharProps> = ({
  char, x, y, delay, size, color,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [delay, delay + fps * 0.8, durationInFrames - fps * 1.5, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const translateY = interpolate(
    frame,
    [delay, durationInFrames],
    [30, -90],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Subtle swaying: sine-wave approximation via interpolate
  const cycle = (frame - delay) % (fps * 4);
  const sway = interpolate(cycle, [0, fps * 2, fps * 4], [-3, 3, -3], {});

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `translateY(${translateY}px) rotate(${sway}deg)`,
        fontSize: size,
        color,
        fontFamily: '"Noto Sans KR", serif',
        fontWeight: 900,
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
        filter: `blur(${interpolate(frame, [delay, delay + fps * 0.5], [4, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}px)`,
      }}
    >
      {char}
    </div>
  );
};

// ── Particle Dot ─────────────────────────────────────────────────────────
type ParticleDotProps = {
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
  speedY: number;
};

const ParticleDot: React.FC<ParticleDotProps> = ({
  x, y, size, delay, color, speedY,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [delay, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.1, 0.8, 1], [0, 0.6, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const travelY = speedY * progress * 200;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity,
        transform: `translateY(-${travelY}px)`,
        filter: 'blur(1px)',
      }}
    />
  );
};

// ── Pulsing Ring ──────────────────────────────────────────────────────────
const PulsingRing: React.FC<{ x: string; y: string; delay: number }> = ({
  x, y, delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cycle = (frame + delay) % (fps * 3);
  const scale = interpolate(cycle, [0, fps * 3], [0.5, 2.5], {});
  const opacity = interpolate(cycle, [0, fps * 1.5, fps * 3], [0.3, 0.1, 0], {});

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 120,
        height: 120,
        border: '1px solid rgba(200,0,30,0.4)',
        borderRadius: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

// ── Main Composition: BACKGROUND ONLY ──────────────────────────────────────
// All text (headline, eyebrow, buttons, etc.) is now rendered as real HTML
// in components/Hero.tsx — this composition handles the atmosphere only.
export const HeroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Gradient animation
  const gradientPos = interpolate(frame, [0, durationInFrames], [0, 100], {});

  // Overall fade in
  const bgOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Floating chars data
  const chars: FloatingCharProps[] = [
    { char: '한', x: 3,  y: 8,  delay: fps * 0.1,  size: 88,  color: 'rgba(200,0,30,0.12)' },
    { char: '국', x: 87, y: 12, delay: fps * 0.2,  size: 68,  color: 'rgba(0,52,120,0.12)' },
    { char: '어', x: 12, y: 65, delay: fps * 0.4,  size: 110, color: 'rgba(200,0,30,0.08)' },
    { char: '서', x: 78, y: 55, delay: fps * 0.15, size: 78,  color: 'rgba(0,52,120,0.1)'  },
    { char: '울', x: 50, y: 80, delay: fps * 0.3,  size: 96,  color: 'rgba(200,0,30,0.07)' },
    { char: '아', x: 92, y: 72, delay: fps * 0.5,  size: 56,  color: 'rgba(200,0,30,0.1)'  },
    { char: '가', x: 63, y: 6,  delay: fps * 0.6,  size: 72,  color: 'rgba(0,52,120,0.08)' },
    { char: '나', x: 25, y: 18, delay: fps * 0.05, size: 50,  color: 'rgba(200,0,30,0.06)' },
    { char: '다', x: 72, y: 38, delay: fps * 0.7,  size: 62,  color: 'rgba(0,52,120,0.09)' },
    { char: '라', x: 18, y: 42, delay: fps * 0.45, size: 82,  color: 'rgba(200,0,30,0.06)' },
    { char: '마', x: 40, y: 92, delay: fps * 0.55, size: 60,  color: 'rgba(0,52,120,0.07)' },
    { char: '바', x: 95, y: 40, delay: fps * 0.35, size: 48,  color: 'rgba(200,0,30,0.08)' },
  ];

  // Particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 5.3) % 100,
    y: (i * 7.1 + 20) % 80,
    size: (i % 4) + 2,
    delay: (i * 12) % (fps * 2),
    color:
      i % 3 === 0 ? 'rgba(200,0,30,0.5)'
      : i % 3 === 1 ? 'rgba(0,52,120,0.5)'
      : 'rgba(212,175,55,0.4)',
    speedY: 0.4 + (i % 5) * 0.15,
  }));

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at ${gradientPos}% 50%, #1a0a1a 0%, #0f0f23 40%, #0a0a0f 100%)`,
        overflow: 'hidden',
        opacity: bgOpacity,
      }}
    >
      {/* Grid overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            'linear-gradient(rgba(200,0,30,0.04) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(200,0,30,0.04) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '72px 72px',
          opacity: 0.8,
        }}
      />

      {/* Radial glow – center */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,0,30,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Pulsing rings */}
      <PulsingRing x="50%" y="50%" delay={0} />
      <PulsingRing x="50%" y="50%" delay={fps} />
      <PulsingRing x="50%" y="50%" delay={fps * 2} />

      {/* Floating Korean chars */}
      {chars.map((c, i) => (
        <FloatingChar key={i} {...c} />
      ))}

      {/* Particles */}
      {particles.map((p, i) => (
        <ParticleDot key={i} {...p} />
      ))}

      {/* Bottom fade to page */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.4) 15%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
