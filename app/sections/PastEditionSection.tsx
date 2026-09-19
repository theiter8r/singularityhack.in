'use client';

import React from 'react';
import ScrollExpand from '../components/ScrollExpand';
import { PAST_EDITION } from '@/lib/event';

/** Verified results from the previous edition. Never presented as 2.0 promises. */
const PAST_STATS = [
  { value: PAST_EDITION.prizePool, label: 'Prize pool' },
  { value: PAST_EDITION.participants, label: 'Participants' },
  { value: PAST_EDITION.teams, label: 'Teams' },
  { value: PAST_EDITION.projects, label: 'Projects shipped' },
];

export default function PastEditionSection() {
  return (
    <section id="past-editions" className="relative w-full bg-[#0B0D10]">
      {/* 1. Expandable Image Component with "Our Glory" headline */}
      <ScrollExpand
        src="/videos/glory.mp4"
        mediaType="video"
        poster="/images/glory-poster.jpg"
        alt="Our Glory"
        title="Our Glory"
        useWindowScroll={true}
        startWidth={52}
        startHeight={62}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.25}
        scrollDistance={1.2}
        holdDistance={0.35}
        titleMinOpacity={0.25}
        overlayScrim={0}
        smoothing={0.08}
        className="w-full"
      />

      {/* 2. Content & Numbers After The Image Component */}
      <div className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-[#0B0D10]">
        <div className="mx-auto w-full max-w-[92vw] md:max-w-[82vw] lg:max-w-[66rem]">
          {/* Narrative Paragraph */}
          <p className="text-[clamp(0.95rem,2.4vw,1.1rem)] md:text-[clamp(1.1rem,1.8vw,1.22rem)] lg:text-[clamp(1.22rem,1.35vw,1.3rem)] text-[#C2C7CE] font-light leading-[1.8] md:leading-[1.85] tracking-[-0.01em] mb-[3rem] md:mb-[4.5rem] lg:mb-[5.5rem]">
            <span className="gold-ink">Singularity 1.0</span> started as a simple bet: give students a room, a deadline, and no
            template, and they will build things nobody asked permission for. Over 400 participants
            took it, forming 120+ teams that went from an empty repository to a working demo in a
            single sitting. Every one of those teams shipped something.{' '}
            <span className="gold-ink">Singularity 2.0</span> is the same bet, scaled up.
          </p>

          {/* Metrics / Numbers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5rem] md:gap-[2.5rem] lg:gap-[3.5rem] text-center">
            {PAST_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-[clamp(2.5rem,6vw,3.25rem)] md:text-[clamp(3.25rem,4.5vw,4.25rem)] lg:text-[clamp(4.25rem,4vw,5rem)] text-[#F2F4F7] font-normal tracking-tight mb-[0.5rem] leading-none">
                  {stat.value}
                </div>
                <div className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold uppercase tracking-[0.22em] text-[#8A9099]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Attribution so these numbers are never read as 2.0 guarantees */}
          <p className="mt-[2rem] md:mt-[2.75rem] text-center text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold uppercase tracking-[0.22em] text-[#F2F4F7]/40">
            Results from {PAST_EDITION.label}
          </p>
        </div>
      </div>
    </section>
  );
}
