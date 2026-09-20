import React from 'react';
import Link from 'next/link';
import PageShell from '../components/PageShell';
import PastEditionSection from '../sections/PastEditionSection';
import Footer from '../sections/Footer';
import { PAST_EDITION } from '@/lib/event';

export const metadata = {
  title: 'Our Glory | Singularity 2.0',
  description: `${PAST_EDITION.label} in numbers: ${PAST_EDITION.participants} participants, ${PAST_EDITION.teams} teams, ${PAST_EDITION.projects} projects shipped in a single sitting.`,
  alternates: { canonical: '/pastedition' },
  openGraph: {
    title: 'Our Glory | Singularity 2.0',
    description: `${PAST_EDITION.label}: ${PAST_EDITION.participants} participants, ${PAST_EDITION.teams} teams, ${PAST_EDITION.projects} projects shipped.`,
    url: '/pastedition',
  },
};

export default function PastEditionPage() {
  return (
    <PageShell>
      <PastEditionSection />

      {/* Hand-off to this edition rather than dead-ending the page */}
      <section className="w-full px-[4vw] pb-[8vh] md:px-[5vw] lg:px-[6vw]">
        <div className="mx-auto w-full max-w-[92vw] md:max-w-[86vw] lg:max-w-[72rem]">
          <Link
            href="/about"
            className="group flex items-center justify-between gap-[1rem] rounded-2xl border border-[#F2F4F7]/10 bg-[#F2F4F7]/[0.02] px-[1.5rem] py-[1.35rem] transition-colors duration-200 hover:border-[#E3C77E]/40 hover:bg-[#E3C77E]/[0.04]"
          >
            <span className="min-w-0">
              <span className="block text-[clamp(0.6rem,0.75vw,0.7rem)] font-semibold uppercase tracking-[0.22em] text-[#8A9099]">
                Next
              </span>
              <span className="mt-[0.4rem] block font-seasonmix text-[clamp(1.35rem,3.5vw,1.75rem)] text-[#F2F4F7] leading-tight">
                About Singularity 2.0
              </span>
            </span>
            <span className="shrink-0 font-serif italic text-[clamp(1.2rem,2vw,1.6rem)] text-[#F2F4F7]/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#E3C77E]">
              →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
