'use client';

import React from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';
import { SoundToggle } from './BackgroundMusic';

interface SiteHeaderProps {
  onMenuClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Always-on top bar for the sub-pages.
 *
 * The landing page uses `Header`, which stays hidden until the hero scrolls
 * away because the hero draws its own wordmark and Explore button. Sub-pages
 * have no hero, so they need the same controls pinned from the first frame —
 * the geometry below is copied from the hero bar so the two never disagree.
 */
export default function SiteHeader({ onMenuClick }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D10]/85 backdrop-blur-md border-b border-[#F2F4F7]/8">
      <div className="relative w-full h-[clamp(3.8rem,5vw,5.125rem)] px-[1vw] flex items-center justify-between">
        {/* Left: wordmark, home */}
        <Link
          href="/"
          aria-label="Singularity 2.0 — home"
          className="relative flex items-center select-none pl-[clamp(0.75rem,1.8vw,2.25rem)] h-[clamp(2.1rem,5.5vw,2.6rem)] sm:h-[clamp(2rem,2.5vw,2.5rem)] w-[clamp(11rem,42vw,14rem)] sm:w-[clamp(10rem,13vw,12.5rem)]"
        >
          <Wordmark
            wrapperClassName="h-full items-center transition-opacity hover:opacity-85"
            className="h-full aspect-[6.1627]"
          />
        </Link>

        {/* Right: sound + full-screen menu trigger */}
        <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)] pr-[clamp(1rem,2vw,2.25rem)]">
          <SoundToggle />

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Explore Menu"
            className="group flex h-[clamp(2.25rem,2.8vw,2.8rem)] w-[clamp(6.75rem,8.8vw,8.75rem)] items-center justify-between rounded-full border-2 border-[#F2F4F7]/15 bg-[#0B0D10] pl-[clamp(0.85rem,1.3vw,1.375rem)] pr-[clamp(0.35rem,0.5vw,0.5rem)] text-[#F2F4F7] shadow-[0_4px_16px_rgba(0,0,0,0.14)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            <span className="font-seasonmix text-[clamp(0.85rem,1vw,1rem)] tracking-[-0.03em] select-none">
              Explore
            </span>

            <div className="flex h-[clamp(1.75rem,2vw,2.125rem)] w-[clamp(1.75rem,2vw,2.125rem)] items-center justify-center rounded-full bg-[#F2F4F7] text-[#0B0D10] transition-transform duration-300 group-hover:rotate-45">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[clamp(0.75rem,1vw,0.95rem)] h-[clamp(0.75rem,1vw,0.95rem)]"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
