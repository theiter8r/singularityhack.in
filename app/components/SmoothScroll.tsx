'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRoute = useRef(true);
  /** Tears down the deep-link hold, if one is still running. */
  const holdRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // The inline script in layout.tsx already ran synchronously and set:
    //   history.scrollRestoration = 'manual'
    //   document.documentElement.style.opacity = '0'      ← hides ALL scroll jumps
    //   document.documentElement.style.overflow = 'hidden' ← prevents user scroll
    //   window.scrollTo(0, 0)
    //
    // overflow:hidden only prevents user-initiated scroll events (wheel/touch/keyboard).
    // It does NOT hide programmatic window.scrollTo() calls — those still visually move
    // the page. opacity:0 is the only reliable way to hide ALL scroll position changes.

    window.scrollTo(0, 0);

    // A `/#section` entry is a deep link into this page. Resolving it here —
    // inside the lock window below, while the page is still hidden — reuses the
    // settling this effect already does, instead of racing it from outside.
    const entryHash = window.location.hash.slice(1);
    const entryTarget = () => (entryHash ? document.getElementById(entryHash) : null);

    // Signal to scroll-driven components (e.g. ScrollExpand) to snap positions
    // instantly during the lock period instead of smoothly animating.
    // Prevents the "back-animation" from being visible when the page unlocks.
    (window as unknown as { __scrollLocked?: boolean }).__scrollLocked = true;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    lenis.scrollTo(0, { immediate: true });

    // Stop Lenis so ScrollTrigger.refresh() measurement scrolls don't
    // bleed into Lenis's scroll state
    const rafId = requestAnimationFrame(() => {
      lenis.resize();
      lenis.stop();
      ScrollTrigger.refresh();
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
    });

    // Re-sync Lenis size whenever ScrollTrigger refreshes (lazy content loading)
    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', handleRefresh);

    // Unlock at 1150ms — after ALL scroll restoration sources have settled:
    //   StorySection refresh timer 1: 300ms
    //   StorySection refresh timer 2: 1000ms
    //   We unlock at 1150ms, after all of the above.
    //
    // The page is invisible (opacity:0) during this entire window, so the user
    // never sees any scroll position fights. We then fade in cleanly at scroll=0.
    const unlockTimer = setTimeout(() => {
      // Force native scroll to the entry position first
      const settle = () => {
        const el = entryTarget();
        if (el) lenis.scrollTo(el, { immediate: true, force: true });
        else {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        }
      };

      settle();

      // Release the snap lock BEFORE revealing
      (window as unknown as { __scrollLocked?: boolean }).__scrollLocked = false;

      document.documentElement.style.overflow = '';

      // One rAF after overflow is restored — browser may recalculate layout/scroll here
      requestAnimationFrame(() => {
        settle();

        // A deep link has to survive what arrives after the reveal: the lazily
        // chunked sections finish loading and their ScrollTrigger.refresh()
        // calls restore the scroll they were measured at, which is the top.
        // Re-assert the landing until the layout stops moving it — and give up
        // the instant the reader scrolls, so this never fights a real gesture.
        if (entryHash) {
          const deadline = performance.now() + 2500;
          let holdTimer: ReturnType<typeof setTimeout>;

          const release = () => {
            clearTimeout(holdTimer);
            window.removeEventListener('wheel', release);
            window.removeEventListener('touchstart', release);
            window.removeEventListener('keydown', release);
          };

          const hold = () => {
            const el = entryTarget();
            if (el && Math.abs(el.getBoundingClientRect().top) > 2) settle();
            if (performance.now() < deadline) holdTimer = setTimeout(hold, 100);
            else release();
          };

          window.addEventListener('wheel', release, { passive: true, once: true });
          window.addEventListener('touchstart', release, { passive: true, once: true });
          window.addEventListener('keydown', release, { once: true });
          holdTimer = setTimeout(hold, 100);
          holdRef.current = release;
        }

        // Fade in after the position is guaranteed
        document.documentElement.style.transition = 'opacity 0.15s ease';
        document.documentElement.style.opacity = '1';

        setTimeout(() => {
          document.documentElement.style.transition = '';
          document.documentElement.style.opacity = '';
        }, 200);
      });
    }, 1150);

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      holdRef.current?.();
      holdRef.current = null;
      cancelAnimationFrame(rafId);
      clearTimeout(unlockTimer);
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      // Always restore visibility/scroll on unmount
      document.documentElement.style.opacity = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.transition = '';
      (window as unknown as { __scrollLocked?: boolean }).__scrollLocked = false;
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Client-side route changes never remount this component, so the mount effect
  // above (which hides and resets the page) does not run for them. Reset the
  // scroll ourselves. Deep links into a section are deliberately NOT routed
  // here — they are full loads, so the mount effect resolves them behind its
  // curtain rather than fighting it from the outside.
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    holdRef.current?.();
    holdRef.current = null;

    const lenis = (window as unknown as { lenis?: Lenis }).lenis;

    // Order matters: ScrollTrigger.refresh() restores the scroll position it
    // measured with, so it has to run BEFORE the reset, never after — otherwise
    // the new route opens wherever the old one was left.
    const reset = () => {
      lenis?.resize();
      ScrollTrigger.refresh();
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
    };

    reset();
    // Sections stream in as lazy chunks and grow the document after the commit,
    // so hold the top across the next frame and one macrotask too.
    const frame = requestAnimationFrame(reset);
    const settle = setTimeout(reset, 120);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [pathname]);

  return <>{children}</>;
}
