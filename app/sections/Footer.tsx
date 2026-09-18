'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { UNSTOP_URL } from '@/lib/event';
import { DitheredLogo } from '@/components/ui/dithered-logo';

const FooterMap = dynamic(() => import('@/components/FooterMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl border border-[#F2F4F7]/10 bg-[#171A1F] animate-pulse flex items-center justify-center">
      <span className="text-xs uppercase tracking-widest text-[#F2F4F7]/40 font-mono">
        Loading Map...
      </span>
    </div>
  ),
});

const exploreLinks = [
  { label: 'Register Now', href: UNSTOP_URL },
  { label: 'Themes', href: '#theme-section' },
  { label: 'Timeline', href: '#timeline-section' },
  { label: 'FAQ', href: '#faq-section' },
];

const connectLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/singularityhack.in/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/singularity-hack/' },
  { label: 'WhatsApp', href: '#' },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-[#0B0D10] min-h-[100dvh] flex flex-col justify-between pt-[1.5rem] md:pt-[2.5rem] pb-[clamp(2rem,4vw,4rem)] px-[4vw] md:px-[5vw] lg:px-[6vw]"
    >
      <div className="mx-auto w-full max-w-[92vw] lg:max-w-[80rem] flex flex-col justify-between flex-1 h-full">
        {/* Top Centered Giant Black Wordmark */}
        <div className="relative w-full flex items-center justify-center pt-2 pb-[1rem] md:pb-[1.5rem]">
          <div
            role="img"
            aria-label="SINGULARITY"
            className="relative mx-auto w-full max-w-[72rem] aspect-[6.1627] select-none"
          >
            {/*
              Driven off width with the wordmark's own 6.1627:1 aspect, because
              the canvas clips where the old <img> could letterbox.

              invert={false} is load-bearing: the dither treats pixels ABOVE the
              threshold as the filled set, so for this white-on-transparent
              artwork the glyphs are already "filled". Inverting (the component
              default, meant for dark artwork) subtracts them and draws nothing.
              Particles take their colour from `currentColor`, not the source.

              Mark width is `rect.height * scale`, so scale = the aspect ratio
              makes it span the box exactly; gridSize sets dot density.
            */}
            <DitheredLogo
              imageSrc="/logo/logo-white.svg"
              className="h-full w-full text-[#F2F4F7]"
              invert={false}
              gridSize={420}
              scale={6.1627}
              dotScale={0.6}
              blur={1.2}
              threshold={128}
              cornerRadius={0}
            />
          </div>
        </div>

        {/* Crisp Horizontal Divider */}
        <div className="w-full border-t border-[#F2F4F7]/10" />

        {/* 3-Column Navigation & Graphic Art Grid: Mobile (2 col links, then Map below), Tablet/Desktop (3 cols) */}
        <div className="grid items-start pt-[1.5rem] md:pt-[2rem] grid-cols-2 md:grid-cols-[1fr_1.3fr_1fr] gap-x-[1.5rem] gap-y-[2rem] md:gap-[2.5vw]">
          {/* Left: Explore Links */}
          <section className="order-1 md:order-1">
            <p className="mb-3 md:mb-4 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#F2F4F7]/55">
              EXPLORE
            </p>
            <ul className="space-y-1 md:space-y-1.5 text-[clamp(1.15rem,2.8vw,1.45rem)] md:text-[clamp(1.45rem,2vw,1.85rem)] leading-[1.2]">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-serif italic tracking-[-0.05em] text-[#F2F4F7] hover:text-[#E3C77E] transition-colors cursor-pointer inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Right: Connect Links (Aligned to the rightmost edge on mobile and desktop) */}
          <section className="order-2 md:order-3 text-right justify-self-end">
            <p className="mb-3 md:mb-4 text-[0.68rem] font-medium uppercase tracking-[0.38em] text-[#F2F4F7]/55 text-right">
              CONNECT
            </p>
            <ul className="space-y-1 md:space-y-1.5 text-[clamp(1.15rem,2.8vw,1.45rem)] md:text-[clamp(1.45rem,2vw,1.85rem)] leading-[1.2] text-right">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-serif italic tracking-[-0.05em] text-[#F2F4F7] hover:text-[#E3C77E] transition-colors cursor-pointer text-right inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Center on desktop, Bottom full-width on mobile: Interactive Map */}
          <div className="order-3 md:order-2 col-span-2 md:col-span-1 w-full">
            <FooterMap />
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-[2rem] md:mt-[3rem] pt-4 flex items-center justify-center text-[clamp(0.625rem,0.75vw,0.72rem)] uppercase tracking-[0.28em] text-[#F2F4F7]/55">
          <span>&copy; 2026 Singularity</span>
        </div>
      </div>
    </footer>
  );
}
