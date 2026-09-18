'use client';

import React from 'react';
import { SPONSOR_EMAIL } from '@/lib/event';

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-[#0B0D10] overflow-hidden border-t border-[#F2F4F7]/8">
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[76rem]">
        {/* Section Header */}
        <div className="text-center max-w-[42rem] mx-auto mb-[3rem] md:mb-[4rem]">
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#F2F4F7] font-normal leading-[1.1] mb-4">
            Our Sponsors
          </h2>
          <p className="text-[clamp(0.9rem,2.2vw,1.05rem)] md:text-[clamp(1rem,1.5vw,1.125rem)] text-[#F2F4F7]/65 leading-relaxed font-normal">
            Singularity runs on the people who back it. Our partners put tools, prizes, and mentorship in front of a room full of engineering students who are actively building, and get to watch what they do with them.
          </p>
        </div>

        {/* Call for Sponsorship / Interested Section */}
        <div className="text-center rounded-[clamp(1.2rem,2vw,1.75rem)] bg-[#E3C77E]/[0.06] border border-[#E3C77E]/25 p-[clamp(2rem,4vw,3.5rem)] shadow-sm">
          <h3 className="font-seasonmix text-[clamp(1.6rem,3.5vw,2.5rem)] text-[#F2F4F7] mb-3 leading-[1.2]">
            Interested in Sponsoring Singularity 2.0?
          </h3>
          <p className="max-w-[38rem] mx-auto text-[clamp(0.88rem,1.3vw,1.05rem)] text-[#F2F4F7]/70 mb-7 leading-relaxed">
            Put your brand in front of a national-level cohort of engineering students, scout developer talent while they build under pressure, and mentor the teams shaping what comes next.
          </p>
          <a
            href={`mailto:${SPONSOR_EMAIL}?subject=Sponsorship%20enquiry%20%E2%80%94%20Singularity%202.0`}
            className="inline-flex items-center gap-2 rounded-full bg-[#E3C77E] text-[#0B0D10] px-8 py-3.5 text-[clamp(0.72rem,0.85vw,0.8rem)] font-bold uppercase tracking-[0.18em] shadow-lg hover:bg-[#F0D89B] transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <span>Request Sponsorship Deck</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
