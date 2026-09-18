'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { FaqItem } from '@/components/ui/accordion-05';

const Accordion05 = dynamic(
  () => import('@/components/ui/accordion-05').then((m) => m.Accordion05),
  { ssr: false }
);

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '01',
    title: 'Who can participate?',
    content:
      'Singularity 2.0 is open to undergraduate engineering students across India: B.Tech (4-year) and Integrated (5-year) programmes, any branch or specialisation, graduating between 2027 and 2030. You do not need to be a K.C. College student, and you do not need prior hackathon experience. Bring a team that can build.',
  },
  {
    id: '02',
    title: 'How do I register?',
    content:
      'Registration happens entirely on Unstop. Hit \u201cRegister on Unstop\u201d anywhere on this site, create or join your team on the listing, and you are in. Registrations opened on 15 September 2026 and close on 20 November 2026. That same date is the Round 2 submission deadline, so register early enough to build.',
  },
  {
    id: '03',
    title: 'What is the team size?',
    content:
      'Teams of 2 to 4. Solo entries are not accepted, because the format is built around cross-disciplinary collaboration, so pair developers with designers, hardware folks, and domain thinkers. Every team member submits a resume during the team-formation stage, which runs until 31 October.',
  },
  {
    id: '04',
    title: 'Are there any prizes?',
    content:
      'Singularity 2.0 carries a \u20b940,000 prize pool, and every participant who competes in the final round receives a certificate. Winners are judged on the working prototype you ship inside the 18-hour sprint, not on the pitch deck alone.',
  },
  {
    id: '05',
    title: 'Is there a participation fee?',
    content:
      'Registering on Unstop is free. Only teams shortlisted for the offline finale pay a \u20b91,000 participation fee, charged once per team, regardless of whether you are 2 or 4 people. You will not be asked for anything until you have made it through Round 2.',
  },
  {
    id: '06',
    title: 'What resources will be provided?',
    content:
      'The final round is an 18-hour offline sprint at K.C. College of Engineering & Management Studies, Thane. You get the venue and power for the full duration, real-time guidance from industry mentors, and food and refreshments through the night. Bring your own laptops, hardware, and any dev kits your track needs.',
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-[#0B0D10] overflow-hidden border-t border-[#F2F4F7]/8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[76rem]">

        {/* Section Header */}
        <div className="text-center max-w-[42rem] mx-auto mb-[3rem] md:mb-[4.5rem]">
          <div className="text-[clamp(0.625rem,0.8vw,0.72rem)] font-semibold uppercase tracking-[0.32em] text-[#F2F4F7]/55 mb-3">
            Questions &amp; Insights
          </div>
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#F2F4F7] font-normal leading-[1.1]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <Accordion05
          items={FAQ_ITEMS}
          defaultOpen="01"
          className="max-w-[62rem] mx-auto"
        />
      </div>
    </section>
  );
}
