'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const SRC = '/audio/theme.mp3';
const VOLUME = 0.32;
const FADE_MS = 1800;
const STORAGE_KEY = 'singularity:bgm';

interface BgmState {
  playing: boolean;
  /** True once the browser has refused autoplay and we're waiting on a gesture. */
  blocked: boolean;
  toggle: () => void;
}

const BgmContext = createContext<BgmState>({
  playing: false,
  blocked: false,
  toggle: () => {},
});

export const useBackgroundMusic = () => useContext(BgmContext);

/** Gestures that satisfy the browser's autoplay policy. */
const GESTURES = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'] as const;

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  /** Ramp the volume so the track slides in rather than slamming on. */
  const fadeTo = useCallback((to: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / FADE_MS);
      audio.volume = from + (to - from) * t;
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      // Attached on first play rather than in the markup, so a visitor who
      // muted (or never triggers playback) never downloads the track, and it
      // never competes with the hero video for bandwidth.
      if (!audio.src) audio.src = SRC;
      audio.volume = 0;
      await audio.play();
      setPlaying(true);
      setBlocked(false);
      fadeTo(VOLUME);
      return true;
    } catch {
      return false;
    }
  }, [fadeTo]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, () => audio.pause());
    setPlaying(false);
  }, [fadeTo]);

  // Autoplay where the browser allows it, otherwise on the visitor's first
  // gesture. Chrome and Safari only grant unprompted audio to sites the user
  // already engages with, so the gesture fallback is the normal path.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let optedOut = false;
    try {
      optedOut = window.localStorage.getItem(STORAGE_KEY) === 'off';
    } catch {
      /* private mode */
    }
    if (optedOut) return;

    let cancelled = false;
    const onGesture = () => {
      void start().then((ok) => {
        if (ok) detach();
      });
    };
    const detach = () => {
      GESTURES.forEach((type) => window.removeEventListener(type, onGesture));
    };

    void start().then((ok) => {
      if (ok || cancelled) return;
      setBlocked(true);
      GESTURES.forEach((type) =>
        window.addEventListener(type, onGesture, { passive: true })
      );
    });

    return () => {
      cancelled = true;
      detach();
      cancelAnimationFrame(fadeRef.current);
    };
  }, [start]);

  // Don't play to an empty room.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) audio.pause();
      else if (playing) void audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [playing]);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      try {
        window.localStorage.setItem(STORAGE_KEY, 'off');
      } catch {
        /* private mode */
      }
    } else {
      // Called from a click, so this play() is always permitted.
      void start();
      try {
        window.localStorage.setItem(STORAGE_KEY, 'on');
      } catch {
        /* private mode */
      }
    }
  }, [playing, start, stop]);

  return (
    <BgmContext.Provider value={{ playing, blocked, toggle }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} loop preload="auto" playsInline />
      {children}
    </BgmContext.Provider>
  );
}

/**
 * Four bars that dance while the track plays and flatten when it doesn't —
 * doubles as the on/off control. Sized to match the hero's social icons.
 */
export function SoundToggle({ className = '' }: { className?: string }) {
  const { playing, toggle } = useBackgroundMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Mute background music' : 'Play background music'}
      aria-pressed={playing}
      title={playing ? 'Sound on' : 'Sound off'}
      className={`pointer-events-auto group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(2.25rem,2.8vw,2.8rem)] shrink-0 items-center justify-center rounded-full border-2 border-[#0B0D10] bg-[#0B0D10] text-[#F2F4F7] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] cursor-pointer ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-[clamp(0.85rem,1.1vw,1.1rem)] w-[clamp(0.85rem,1.1vw,1.1rem)] items-end justify-center gap-[2px]"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-current transition-[height,opacity] duration-300 ${
              playing ? 'bgm-bar' : 'h-[3px] opacity-45'
            }`}
            style={playing ? { animationDelay: `${i * 0.16}s` } : undefined}
          />
        ))}
      </span>
    </button>
  );
}
