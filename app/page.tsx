'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Header, HeroSection, AboutSection, PartnersSection } from './sections';
import FullScreenMenu from './components/FullScreenMenu';
import { BackgroundMusicProvider } from './components/BackgroundMusic';

// Lazy load off-screen sections to drastically reduce initial JS payload and maximize Core Web Vitals
const PastEditionSection = dynamic(() => import('./sections/PastEditionSection'), {
  loading: () => <div className="min-h-[50vh] w-full bg-[#0B0D10] animate-pulse" />,
});

const ThemeSection = dynamic(() => import('./sections/ThemeSection'), {
  loading: () => <div className="min-h-[35vh] w-full bg-[#0B0D10] animate-pulse" />,
});

const TimelineSection = dynamic(() => import('./sections/TimelineSection'), {
  loading: () => <div className="min-h-[50vh] w-full bg-[#0B0D10] animate-pulse" />,
});

const FaqSection = dynamic(() => import('./sections/FaqSection'), {
  loading: () => <div className="min-h-[35vh] w-full bg-[#0B0D10] animate-pulse" />,
});

const StorySection = dynamic(() => import('./sections/StorySection'), {
  loading: () => <div className="min-h-[60vh] w-full bg-[#0B0D10] animate-pulse" />,
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<string>('');

  const handleOpenMenu = (e?: React.MouseEvent<HTMLElement>) => {
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.top + rect.height / 2);
      setMenuOrigin(`${x}px ${y}px`);
    } else {
      const exploreBtns = Array.from(
        document.querySelectorAll<HTMLElement>('button[aria-label="Explore Menu"]')
      );
      for (const btn of exploreBtns) {
        const r = btn.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.top >= -20 && r.bottom <= window.innerHeight + 20) {
          const x = Math.round(r.left + r.width / 2);
          const y = Math.round(r.top + r.height / 2);
          setMenuOrigin(`${x}px ${y}px`);
          break;
        }
      }
    }
    setIsMenuOpen(true);
  };

  return (
    <BackgroundMusicProvider>
      <main className="min-h-screen bg-[#0B0D10] text-[#F2F4F7] overflow-x-clip">
        {/* Floating Sticky Header with logo and full-screen menu trigger */}
        <Header onMenuClick={handleOpenMenu} />

        {/* 1. Critical Above-the-fold Hero Section */}
        <div id="hero">
          <HeroSection onOpenMenu={handleOpenMenu} />
        </div>

        {/* 2. Immediate Next Section */}
        <div id="about-section" className="mx-auto w-full max-w-[94vw] px-[3vw] pt-[2vw] sm:px-[4vw] lg:px-[5vw]">
          <AboutSection />
        </div>

        {/* 3. Partners — near the fold now, so it ships with the first chunk rather than flashing a skeleton */}
        <div id="partners-section" className="w-full bg-[#0B0D10]">
          <PartnersSection />
        </div>

        {/* 4. Lazy-loaded ScrollExpand Past Edition Section */}
        <PastEditionSection />

        {/* 5. Lazy-loaded Themes Grid */}
        <div id="theme-section" className="mx-auto w-full max-w-[94vw] px-[3vw] pb-[2vw] pt-[1.5vw] sm:px-[4vw] lg:px-[5vw]">
          <ThemeSection />
        </div>

        {/* 6. Lazy-loaded Timeline Section */}
        <div id="timeline-section" className="w-full bg-[#0B0D10]">
          <TimelineSection />
        </div>

        {/* 7. Lazy-loaded FAQ Section with Accordion Gallery */}
        <div id="faq-section" className="w-full bg-[#0B0D10]">
          <div className="mx-auto w-full max-w-[94vw] px-[3vw] sm:px-[4vw] lg:px-[5vw]">
            <FaqSection />
          </div>
        </div>

        {/* 8. Lazy-loaded Cinematic Story Section with Integrated Footer Finale */}
        <div id="story-section" className="w-full bg-[#0B0D10]">
          <StorySection />
        </div>

        {/* Full-Screen Menu Modal (White BG, Black Typography) */}
        <FullScreenMenu
          isOpen={isMenuOpen}
          origin={menuOrigin}
          onClose={() => setIsMenuOpen(false)}
        />
      </main>
    </BackgroundMusicProvider>
  );
}
