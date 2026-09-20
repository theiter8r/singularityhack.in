import React from 'react';
import Link from 'next/link';
import PageShell from '../components/PageShell';
import AboutSection from '../sections/AboutSection';
import EditionDetailsSection from '../sections/EditionDetailsSection';
import Footer from '../sections/Footer';
import { EVENT } from '@/lib/event';

export const metadata = {
  title: 'About | Singularity 2.0',
  description: `What Singularity 2.0 is, how the ${EVENT.sprintHours}-hour offline sprint runs, and the ${EVENT.prizePool} prize pool behind it at K.C. College of Engineering & Management Studies, Thane.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Singularity 2.0',
    description: `An ${EVENT.sprintHours}-hour offline sprint at K.C. College, Thane. Teams of ${EVENT.minTeamSize}–${EVENT.maxTeamSize}. ${EVENT.prizePool} prize pool.`,
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection />

      <EditionDetailsSection />

      {/* Hand-off to the previous edition rather than dead-ending the page */}
      <section className="w-full px-[4vw] pb-[8vh] md:px-[5vw] lg:px-[6vw]">
        <div className="mx-auto w-full max-w-[92vw] md:max-w-[86vw] lg:max-w-[72rem]">
          <Link
            href="/pastedition"
            className="group flex items-center justify-between gap-[1rem] rounded-2xl border border-[#F2F4F7]/10 bg-[#F2F4F7]/[0.02] px-[1.5rem] py-[1.35rem] transition-colors duration-200 hover:border-[#E3C77E]/40 hover:bg-[#E3C77E]/[0.04]"
          >
            <span className="min-w-0">
              <span className="block text-[clamp(0.6rem,0.75vw,0.7rem)] font-semibold uppercase tracking-[0.22em] text-[#8A9099]">
                Next
              </span>
              <span className="mt-[0.4rem] block font-seasonmix text-[clamp(1.35rem,3.5vw,1.75rem)] text-[#F2F4F7] leading-tight">
                Our Glory
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
