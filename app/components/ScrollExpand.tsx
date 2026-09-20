'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { useBackgroundMusic } from './BackgroundMusic';
import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'enabled'
  | 'titleMinOpacity';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: ReactNode;
  scrollHint?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  titleMinOpacity?: number;
  /** Overlays drifting film grain on the media, clipped to the frame. */
  grain?: boolean;
  /** Grain strength, 0-1. Only meaningful with `grain`. */
  grainOpacity?: number;
  /** Video only: shows a tap-to-unmute control and plays the clip's own audio track. */
  allowSound?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  titleMinOpacity = 0.25,
  grain = false,
  grainOpacity = 0.07,
  allowSound = false,
  children,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const { duck, unduck } = useBackgroundMusic();
  const [soundOn, setSoundOn] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>(
    {} as Required<Pick<ScrollExpandProps, ConfigKey>>
  );
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
    titleMinOpacity
  };

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const minOp = c.titleMinOpacity;
      const out = smoothstep(0.25, 0.85, p);
      titleRef.current.style.opacity = `${1 - out * (1 - minOp)}`;
      titleRef.current.style.transform = `translate3d(0, 0, 0)`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
      overlayRef.current.style.pointerEvents = inn > 0.85 ? 'auto' : 'none';
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      // Use visualViewport.height (actual visible area) on mobile — window.innerHeight
      // includes space behind the browser address bar, causing content to be cut.
      const vvHeight = window.visualViewport?.height ?? window.innerHeight;
      stageH = c.useWindowScroll ? vvHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      // During the page scroll-lock period, snap instantly so enforcement scrolls
      // don't drive the animation to a wrong state that unwinds visibly on unlock.
      if ((window as unknown as { __scrollLocked?: boolean }).__scrollLocked) {
        current = target;
        applyProgress(current);
        return;
      }
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // visualViewport fires when mobile browser UI (address bar) shows/hides
    window.visualViewport?.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    // Sync with Lenis if available
    const lenisInstance = (
      window as unknown as {
        lenis?: {
          on: (event: string, handler: () => void) => void;
          off: (event: string, handler: () => void) => void;
        };
      }
    ).lenis;
    if (lenisInstance && useWindowScroll) {
      lenisInstance.on('scroll', onScroll);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      ro.disconnect();
      if (lenisInstance && useWindowScroll) {
        lenisInstance.off('scroll', onScroll);
      }
    };
  }, [applyProgress, useWindowScroll]);

  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;

  // If the visitor scrolls away (or the section unmounts) with the clip
  // unmuted, hand the soundstage back to the background track.
  useEffect(() => {
    return () => {
      if (soundOnRef.current) unduck();
    };
  }, [unduck]);

  const handleSoundToggle = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      if (next) duck();
      else unduck();
      return next;
    });
  }, [duck, unduck]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef as unknown as React.RefObject<HTMLVideoElement>}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted={!soundOn}
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef as unknown as React.RefObject<HTMLImageElement>}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {grain ? (
              <div
                className="film-grain"
                style={{ '--grain-opacity': grainOpacity } as CSSProperties}
                aria-hidden="true"
              />
            ) : null}
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
          {mediaType === 'video' && allowSound ? (
            <button
              type="button"
              onClick={handleSoundToggle}
              aria-label={soundOn ? 'Mute video' : 'Unmute video'}
              aria-pressed={soundOn}
              className="scroll-expand__sound"
            >
              {soundOn ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="4 9 8 9 12 5 12 19 8 15 4 15 4 9" />
                  <path d="M16 8.5a4.5 4.5 0 0 1 0 7" />
                  <path d="M18.5 6a8 8 0 0 1 0 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="4 9 8 9 12 5 12 19 8 15 4 15 4 9" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                </svg>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
