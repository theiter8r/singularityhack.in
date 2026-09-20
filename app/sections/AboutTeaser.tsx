'use client';

import React from 'react';
import Link from 'next/link';
import { AnnotatedText } from '@/components/ui/annotated-text';
import { EVENT } from '@/lib/event';

const LINKS = [
  { href: '/about', label: 'About this edition', note: `${EVENT.prizePool} prize pool · the format` },
  { href: '/pastedition', label: 'Our Glory', note: 'What Singularity 1.0 shipped' },
];

/**
 * The landing-page introduction. Deliberately short: the full write-up lives at
 * /about and the previous edition at /pastedition, so the scroll to the tracks,
 * timeline and FAQ stays brief.
 */
export default function AboutTeaser() {
  return (
    <section
      id="about"
      className="relative w-full py-[10vh] px-[4vw] md:py-[12vh] md:px-[5vw] lg:py-[13vh] lg:px-[6vw] overflow-hidden bg-[#0B0D10]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[82vw] lg:max-w-[64rem] flex flex-col items-center text-center">
        <h2 className="font-seasonmix text-[clamp(2.4rem,6.5vw,3.2rem)] md:text-[clamp(3.2rem,5.5vw,4.5rem)] lg:text-[clamp(4.5rem,5.2vw,5.5rem)] font-normal leading-[1.08] tracking-[-0.01em] mb-[1.5rem] md:mb-[2rem]">
          <span className="gold-lustre">Singularity 2.0</span>
        </h2>

        <p className="mx-auto w-full max-w-[90vw] md:max-w-[78vw] lg:max-w-[52rem] text-[clamp(0.95rem,2.6vw,1.1rem)] md:text-[clamp(1.1rem,1.8vw,1.25rem)] lg:text-[clamp(1.22rem,1.35vw,1.35rem)] text-[#C2C7CE] font-normal leading-[1.75] md:leading-[1.82] lg:leading-[1.9] tracking-[-0.01em]">
          A national-level hackathon at K.C. College of Engineering &amp; Management Studies, Thane.
          An{' '}
          <AnnotatedText
            variant="highlight"
            color="text-[#E3C77E]/45"
            className="text-[#F2F4F7]"
            delay={0.15}
          >
            {EVENT.sprintHours}-hour offline sprint
          </AnnotatedText>{' '}
          with a <span className="gold-ink">{EVENT.prizePool}</span> prize pool, four tracks, and
          teams of two to four who arrive with an idea and leave with something that{' '}
          <AnnotatedText variant="underline" color="text-[#F3E2B4]" delay={0.55}>
            actually runs
          </AnnotatedText>
          .
        </p>

        {/* Routes to the long-form pages */}
        <div className="mt-[2.5rem] md:mt-[3.25rem] grid w-full max-w-[44rem] grid-cols-1 sm:grid-cols-2 gap-[0.85rem]">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-[1rem] rounded-2xl border border-[#F2F4F7]/10 bg-[#F2F4F7]/[0.02] px-[1.35rem] py-[1.15rem] text-left transition-colors duration-200 hover:border-[#E3C77E]/40 hover:bg-[#E3C77E]/[0.04]"
            >
              <span className="min-w-0">
                <span className="block font-seasonmix text-[clamp(1.05rem,2.6vw,1.25rem)] text-[#F2F4F7] leading-tight">
                  {link.label}
                </span>
                <span className="mt-[0.3rem] block text-[clamp(0.75rem,0.95vw,0.85rem)] text-[#8A9099]">
                  {link.note}
                </span>
              </span>
              <span className="shrink-0 font-serif italic text-[clamp(1.1rem,1.8vw,1.4rem)] text-[#F2F4F7]/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#E3C77E]">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
