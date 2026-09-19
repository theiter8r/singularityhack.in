'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Wordmark from './Wordmark';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  origin?: string;
}

export default function FullScreenMenu({
  isOpen,
  onClose,
  origin: propOrigin,
}: FullScreenMenuProps) {
  // Default origin coordinates matching the Explore / Close button position at top-right
  const [circleOrigin, setCircleOrigin] = useState<string>(
    'calc(100% - clamp(4rem, 6.5vw, 6.5rem)) clamp(2rem, 3.2vw, 3rem)'
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Active origin uses synchronously passed prop or fallback tracked origin
  const activeOrigin = propOrigin && propOrigin.trim() !== '' ? propOrigin : circleOrigin;

  const handleClose = useCallback(() => {
    if (closeButtonRef.current) {
      const rect = closeButtonRef.current.getBoundingClientRect();
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.top + rect.height / 2);
      setCircleOrigin(`${x}px ${y}px`);
    }
    onClose();
  }, [onClose]);

  // Measure exact position of Explore / Close button on tap/click
  const updateCloseOrigin = () => {
    if (closeButtonRef.current) {
      const rect = closeButtonRef.current.getBoundingClientRect();
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.top + rect.height / 2);
      setCircleOrigin(`${x}px ${y}px`);
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateCloseOrigin();
    }
  }, [isOpen]);

  useEffect(() => {
    const updateOriginFromElement = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.top + rect.height / 2);
      setCircleOrigin(`${x}px ${y}px`);
    };

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'button[aria-label="Explore Menu"], button[aria-label="Close Menu"]'
      ) as HTMLElement | null;
      if (target) {
        updateOriginFromElement(target);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    window.addEventListener('click', handlePointerDown, { capture: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      window.removeEventListener('click', handlePointerDown, { capture: true });
    };
  }, []);

  // Lock body scroll when menu is open & listen for ESC key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClose]);

  const handleNavigate = (targetId: string) => {
    handleClose();
    // Allow the silky circular collapse animation to complete before smooth scrolling
    setTimeout(() => {
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element =
          document.getElementById(targetId) ||
          document.getElementById(targetId.replace('-section', '')) ||
          document.getElementById(`${targetId}-section`);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 820);
  };

  const navLinks = [
    { number: '01', label: 'About', targetId: 'about-section' },
    { number: '02', label: 'Theme', targetId: 'theme-section' },
    { number: '03', label: 'Timeline', targetId: 'timeline-section' },
    { number: '04', label: 'FAQ', targetId: 'faq-section' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      style={{
        clipPath: isOpen
          ? `circle(150vmax at ${activeOrigin})`
          : `circle(0px at ${activeOrigin})`,
        WebkitClipPath: isOpen
          ? `circle(150vmax at ${activeOrigin})`
          : `circle(0px at ${activeOrigin})`,
        transition: isOpen
          ? 'clip-path 1.2s cubic-bezier(0.65, 0, 0.1, 1), -webkit-clip-path 1.2s cubic-bezier(0.65, 0, 0.1, 1)'
          : 'clip-path 0.85s cubic-bezier(0.7, 0, 0.2, 1), -webkit-clip-path 0.85s cubic-bezier(0.7, 0, 0.2, 1), visibility 0s 0.85s',
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
      className="fixed inset-0 z-[100] h-[100dvh] w-full bg-[#0B0D10] text-[#F2F4F7] flex flex-col justify-between overflow-y-auto will-change-[clip-path]"
    >
      {/* ===================================================================== */}
      {/* TOP BAR: Brand Logo + Close Button Aligned with Hero Explore Button   */}
      {/* ===================================================================== */}
      <div className="relative w-full h-[clamp(3.8rem,5vw,5.125rem)] pt-[1vw] px-[1vw] shrink-0 select-none">
        {/* Top-Left Logo (Identical coordinates & size to Hero Section Logo) */}
        <div className="absolute top-[clamp(0.65rem,1.5vw,1.25rem)] left-[1vw] z-30 h-[clamp(3.8rem,5vw,5.125rem)] pl-[clamp(0.75rem,1.8vw,2.25rem)] flex items-center">
          <div
            onClick={() => handleNavigate('hero')}
            className="relative flex items-center select-none cursor-pointer h-[clamp(2.5rem,6.8vw,3.2rem)] sm:h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(14rem,55vw,18rem)] sm:w-[clamp(10.5rem,14vw,13.5rem)]"
          >
            <Wordmark
              wrapperClassName="h-full items-center transition-opacity hover:opacity-85"
              className="h-full aspect-[6.1627]"
            />
          </div>
        </div>

        {/* Top-Right Close Button (EXACT MATCH to Hero Section Explore Button) */}
        <div className="absolute top-[clamp(0.65rem,1.5vw,1.25rem)] right-[1vw] z-30 h-[clamp(3.8rem,5vw,5.125rem)] pr-[clamp(1rem,2vw,2.25rem)] flex items-center">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close Menu"
            className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(6.75rem,8.8vw,8.75rem)] items-center justify-between rounded-full border-2 border-[#0B0D10] bg-[#0B0D10] pl-[clamp(0.85rem,1.3vw,1.375rem)] pr-[clamp(0.35rem,0.5vw,0.5rem)] text-[#F2F4F7] shadow-[0_4px_16px_rgba(0,0,0,0.14)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            <span className="font-seasonmix text-[clamp(0.85rem,1vw,1rem)] tracking-[-0.03em] text-[#F2F4F7] group-hover:text-[#F2F4F7] transition-colors select-none">
              Close
            </span>

            <div className="flex h-[clamp(1.75rem,2vw,2.125rem)] w-[clamp(1.75rem,2vw,2.125rem)] items-center justify-center rounded-full bg-[#F2F4F7] text-[#0B0D10]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[clamp(0.75rem,1vw,0.95rem)] h-[clamp(0.75rem,1vw,0.95rem)]"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MAIN BODY: Pure Editorial Navigation Links (Left-Aligned Across All Screen Sizes) */}
      {/* ===================================================================== */}
      <main className="my-auto w-full max-w-[clamp(28rem,55vw,50rem)] px-[clamp(1.5rem,5vw,6rem)] py-[clamp(2rem,5vh,4rem)] flex-1 flex flex-col justify-center items-start text-left">
        <nav className="flex flex-col w-full space-y-1 sm:space-y-2" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigate(item.targetId)}
              className="group flex w-full items-baseline justify-between border-b border-[#F2F4F7]/8 py-[clamp(0.65rem,1.8vh,1.35rem)] text-left transition-all duration-200 hover:pl-3 cursor-pointer"
            >
              <div className="flex items-baseline gap-[clamp(0.85rem,2vw,2.5rem)]">
                <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] text-[#F2F4F7]/35 font-medium transition-colors group-hover:text-[#F2F4F7]">
                  {item.number}
                </span>
                <span className="font-seasonmix text-[clamp(2.2rem,5vw,4rem)] font-normal tracking-[-0.02em] text-[#F2F4F7] transition-transform duration-300 group-hover:translate-x-2">
                  {item.label}
                </span>
              </div>
              <span className="font-serif italic text-[clamp(1.2rem,2.2vw,2rem)] text-[#F2F4F7]/0 transition-all duration-300 -translate-x-3 group-hover:translate-x-0 group-hover:text-[#F2F4F7]">
                →
              </span>
            </button>
          ))}
        </nav>
      </main>

      {/* ===================================================================== */}
      {/* BOTTOM BAR: Minimal Footer Metadata                                   */}
      {/* ===================================================================== */}
      <footer className="w-full bg-[#0B0D10] py-4 shrink-0">
        <div className="mx-auto flex w-full items-center justify-between px-[clamp(1rem,2vw,2.25rem)] text-xs text-[#F2F4F7]/40 font-mono">
          <span><span className="gold-ink">SINGULARITY 2.0</span> • 2026</span>
          <span>© ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
}
