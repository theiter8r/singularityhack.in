'use client';

import { useEffect, useRef } from 'react';

interface GoldenDustProps {
  /** Multiplies the area-derived mote count. */
  density?: number;
  /** Horizontal spread around the portal, 0.5 = full width. Auto-widens on portrait. */
  spread?: number;
  className?: string;
}

interface Mote {
  x: number; // normalised 0..1, spawn column
  y: number; // normalised 0..1, 0 = top
  r: number; // core radius in css px
  speed: number; // upward travel per second, normalised
  sway: number; // horizontal drift amplitude, normalised
  swayFreq: number;
  twinkleFreq: number;
  phase: number;
  alpha: number; // base brightness
}

// Roughly gaussian in [-1, 1] — keeps the field densest around the portal
// and lets a few strays wander into the dark.
const bell = () => (Math.random() + Math.random() + Math.random()) / 1.5 - 1;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/** One 64px radial glow, drawn scaled per mote — far cheaper than a gradient per frame. */
function createSprite() {
  const size = 64;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const c = sprite.getContext('2d');
  if (!c) return sprite;
  const half = size / 2;
  const g = c.createRadialGradient(half, half, 0, half, half, half);
  g.addColorStop(0, 'rgba(255,248,230,1)');
  g.addColorStop(0.16, 'rgba(255,226,166,0.82)');
  g.addColorStop(0.42, 'rgba(238,188,110,0.26)');
  g.addColorStop(1, 'rgba(224,170,84,0)');
  c.fillStyle = g;
  c.fillRect(0, 0, size, size);
  return sprite;
}

export default function GoldenDust({
  density = 1,
  spread,
  className = '',
}: GoldenDustProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sprite = createSprite();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let motes: Mote[] = [];
    let width = 0;
    let height = 0;
    let animId = 0;
    let onScreen = true;
    let lastTs = 0;
    let time = 0;

    const spawn = (mote: Mote, atBottom: boolean) => {
      // Portrait framing puts the portal edges further apart, so widen the band.
      const band = spread ?? (height > width ? 0.3 : 0.24);
      mote.x = 0.5 + bell() * band;
      mote.y = atBottom ? 1 + Math.random() * 0.18 : Math.random() * 1.18;
      mote.r = 0.5 + Math.pow(Math.random(), 2.2) * 2.1;
      mote.speed = 0.014 + (mote.r / 2.6) * 0.03;
      mote.sway = 0.004 + Math.random() * 0.016;
      mote.swayFreq = 0.12 + Math.random() * 0.34;
      mote.twinkleFreq = 0.5 + Math.random() * 1.9;
      mote.phase = Math.random() * Math.PI * 2;
      mote.alpha = 0.32 + Math.random() * 0.62;
    };

    const build = () => {
      const target = Math.round(
        Math.min(130, Math.max(42, (width * height) / 14000)) * density
      );
      motes = Array.from({ length: target }, () => {
        const mote = {} as Mote;
        spawn(mote, false);
        return mote;
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Motes only ever add light: they wash out inside the portal and
      // glow against the black meadow, the way embers actually read.
      ctx.globalCompositeOperation = 'lighter';

      for (const m of motes) {
        const x = (m.x + m.sway * Math.sin(time * m.swayFreq + m.phase)) * width;
        const y = m.y * height;
        const twinkle = 0.58 + 0.42 * Math.sin(time * m.twinkleFreq + m.phase);
        // Dense and bright near the grass line, thinning out toward the top edge.
        const depth = 0.4 + 0.6 * Math.min(1, m.y);
        const alpha = m.alpha * twinkle * depth * smoothstep(0, 0.3, m.y);
        if (alpha <= 0.01) continue;
        const glow = m.r * 5;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(sprite, x - glow, y - glow, glow * 2, glow * 2);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const frame = (ts: number) => {
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0;
      lastTs = ts;
      time += dt;

      for (const m of motes) {
        m.y -= m.speed * dt;
        if (m.y < -0.08) spawn(m, true);
      }

      draw();
      animId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (animId || reduceMotion) return;
      lastTs = 0;
      animId = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!animId) return;
      cancelAnimationFrame(animId);
      animId = 0;
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    // Don't burn frames once the hero is scrolled away or the tab is hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden || !onScreen) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, spread]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
