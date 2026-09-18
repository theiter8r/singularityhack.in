'use client';

import React from 'react';
import { AnnotatedText } from '@/components/ui/annotated-text';

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-[10vh] px-[4vw] md:py-[12vh] md:px-[5vw] lg:py-[14vh] lg:px-[6vw] overflow-hidden bg-[#0B0D10]">
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[82vw] lg:max-w-[64rem] flex flex-col items-center text-center">
        {/* Title: Singularity 2.0 */}
        <h2 className="font-seasonmix text-[clamp(2.4rem,6.5vw,3.2rem)] md:text-[clamp(3.2rem,5.5vw,4.5rem)] lg:text-[clamp(4.5rem,5.2vw,5.5rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[#F2F4F7] mb-[1.5rem] md:mb-[2rem]">
          Singularity 2.0
        </h2>

        {/* Paragraph Container */}
        <div className="relative mx-auto w-full max-w-[90vw] md:max-w-[78vw] lg:max-w-[54rem]">
          <p className="text-[clamp(0.95rem,2.6vw,1.1rem)] md:text-[clamp(1.1rem,1.8vw,1.25rem)] lg:text-[clamp(1.22rem,1.35vw,1.35rem)] text-[#C2C7CE] font-normal leading-[1.75] md:leading-[1.82] lg:leading-[1.9] tracking-[-0.01em]">
            A singularity is the point where the standard laws stop applying. We took the name
            literally. Singularity 2.0 is a national-level hackathon hosted by K.C. College of
            Engineering &amp; Management Studies, Thane. It is an{' '}
            <AnnotatedText
              variant="highlight"
              color="text-[#E3C77E]/45"
              className="text-[#F2F4F7]"
              delay={0.15}
            >
              18-hour offline sprint
            </AnnotatedText>{' '}
            built to test technical endurance, collaboration, and the ability to{' '}
            <AnnotatedText variant="arrow" color="text-[#E3C77E]" delay={0.55}>
              actually ship
            </AnnotatedText>
            .
          </p>

          <p className="mt-[1.25rem] md:mt-[1.5rem] text-[clamp(0.95rem,2.6vw,1.1rem)] md:text-[clamp(1.1rem,1.8vw,1.25rem)] lg:text-[clamp(1.22rem,1.35vw,1.35rem)] text-[#C2C7CE] font-normal leading-[1.75] md:leading-[1.82] lg:leading-[1.9] tracking-[-0.01em]">
            No tutorials, no templates. Teams of two to four arrive with an idea, work alongside
            industry mentors, and leave with a functional prototype across one of{' '}
            <AnnotatedText variant="circle" color="text-[#E3C77E]" delay={0.3}>
              four tracks
            </AnnotatedText>
            : AI-Enabled Hardware, Health &amp; Emergency Services, FinTech, and Environmental
            Technologies. Dismantle the standard paradigms and build the thing that{' '}
            <AnnotatedText variant="underline" color="text-[#F3E2B4]" delay={0.7}>
              shouldn&apos;t be possible
            </AnnotatedText>{' '}
            yet.
          </p>
        </div>
      </div>
    </section>
  );
}
