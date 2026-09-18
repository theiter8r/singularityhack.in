'use client';

import React from 'react';
import AccordionGallery, { AccordionGalleryItem } from '../components/AccordionGallery';

const THEME_ITEMS: AccordionGalleryItem[] = [
  {
    image: '/images/tracks/1.jpeg',
    tag: 'Track 1',
    label: 'AI-Enabled Hardware',
    description:
      'The home for every hardware-based project, from wearables, robotics, and IoT devices to embedded systems, drones, and smart devices, that integrates artificial intelligence to make hardware smarter, more autonomous, or more responsive.',
    alt: 'AI-Enabled Hardware',
  },
  {
    image: '/images/tracks/2.png',
    tag: 'Track 2',
    label: 'Health & Emergency Services',
    description:
      'Solutions that improve healthcare delivery, patient outcomes, and emergency response systems, spanning software, apps, and connected devices aimed at hospitals, first responders, rural clinics, and everyday citizens.',
    alt: 'Health & Emergency Services',
  },
  {
    image: '/images/tracks/3.png',
    tag: 'Track 3',
    label: 'FinTech',
    description:
      'Projects that make financial services more accessible, secure, and efficient, including payments, lending, personal finance, fraud detection, and blockchain-based solutions.',
    alt: 'FinTech',
  },
  {
    image: '/images/tracks/4.png',
    tag: 'Track 4',
    label: 'Environmental',
    description:
      'Projects tackling climate, sustainability, and environmental-monitoring challenges, spanning waste management, clean energy, water conservation, and pollution tracking.',
    alt: 'Environmental',
  },
];

export default function ThemeSection() {
  return (
    <section
      id="theme"
      className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-[#0B0D10] overflow-hidden border-t border-[#F2F4F7]/8"
    >
      <div className="relative z-10 mx-auto w-full max-w-[92vw] md:max-w-[88vw] lg:max-w-[82rem]">

        {/* Heading */}
        <div className="text-center mb-[2.5rem] md:mb-[3.5rem]">
          <h2 className="font-seasonmix text-[clamp(2.2rem,5.5vw,2.85rem)] md:text-[clamp(2.85rem,4.5vw,3.75rem)] lg:text-[clamp(3.75rem,4vw,4.5rem)] text-[#F2F4F7] font-normal leading-[1.1]">
            Hackathon Themes
          </h2>
        </div>

        {/* Accordion Gallery */}
        <AccordionGallery
          items={THEME_ITEMS}
          defaultIndex={0}
          accentColor="#E3C77E"
          overlayColor="#05070A"
          textColor="#ffffff"
          gap={8}
          radius={18}
          expandRatio={0.52}
          orientation="horizontal"
          duration={0.55}
          ease="power3.out"
          parallax={0.4}
          tilt={5}
          stagger={0.07}
          trigger="hover"
          showLabels={true}
          grayscale={true}
          className="w-full"
        />
      </div>
    </section>
  );
}
