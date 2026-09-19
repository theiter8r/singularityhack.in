'use client';

import React from 'react';
import { PARTNERS, PARTNER_EMAIL } from '@/lib/event';
import { UnstopLogo } from '@/components/ui/unstop-logo';

/**
 * Logo lockups keyed by partner id. Kept here rather than in `lib/event.ts`
 * so the data file stays free of JSX and can be imported by the OG image
 * route, which runs through Satori and cannot render these components.
 */
const LOGOS: Record<string, React.ReactNode> = {
  unstop: <UnstopLogo className="h-[clamp(1.75rem,3.6vw,2.35rem)] w-auto" />,
};

export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-[#0B0D10] overflow-hidden border-t border-[#F2F4F7]/8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[76rem]">
        <h2 className="text-center font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#F2F4F7] font-normal leading-[1.1] mb-[3rem] md:mb-[4rem]">
          Our Partners
        </h2>

        {/* Role label + mark, nothing else */}
        <ul className="flex flex-wrap items-start justify-center gap-x-[clamp(3rem,10vw,8rem)] gap-y-[clamp(2.5rem,5vw,3.5rem)] list-none p-0 mb-[3rem] md:mb-[4rem]">
          {PARTNERS.map((partner) => {
            const body = (
              <>
                <span className="block text-[clamp(0.6rem,0.75vw,0.7rem)] font-semibold uppercase tracking-[0.22em] text-[#E3C77E]">
                  {partner.role}
                </span>
                {/* Shared row height so a stacked mark and a wordmark share a baseline */}
                <span className="flex h-[clamp(4.5rem,9vw,6rem)] items-center justify-center text-[#F2F4F7]">
                  {LOGOS[partner.id]}
                </span>
              </>
            );

            const shell =
              'flex flex-col items-center gap-[clamp(0.85rem,1.6vw,1.15rem)] text-center';

            return (
              <li key={partner.id}>
                {partner.href ? (
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${partner.name}, ${partner.role} (opens in a new tab)`}
                    className={`${shell} opacity-90 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#E3C77E]`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={shell}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        {/* One-line call for partners */}
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-[clamp(0.9rem,1.3vw,1.05rem)] text-[#F2F4F7]/60">
            Want your brand in the room?
          </p>
          <a
            href={`mailto:${PARTNER_EMAIL}?subject=Partnership%20enquiry%20%E2%80%94%20Singularity%202.0`}
            className="inline-flex items-center gap-2 rounded-full bg-[#E3C77E] text-[#0B0D10] px-8 py-3.5 text-[clamp(0.72rem,0.85vw,0.8rem)] font-bold uppercase tracking-[0.18em] hover:bg-[#F0D89B] transition-all active:scale-[0.98]"
          >
            <span>Partner With Us</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
