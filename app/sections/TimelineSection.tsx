'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_PATH_D =
  'M9.001 4C9.001 4 -15.155 65.5 50.5 133.5C116.155 201.5 229.557 204.076 294.5 296.5C352.121 378.5 348.348 441.21 440.5 512C550.5 596.5 710.501 479.853 862.001 535C955 568.5 1010 720 1040 820C1080 955 1120 1100 1184.5 1180C1240 1250 1280 1380 1220 1500C1150 1640 980 1680 880 1780C780 1880 720 1980 780 2100C850 2240 980 2320 1100 2420C1180 2490 1240 2580 1184.5 2680';

// Activation progress thresholds for the 8 milestones along the path
const STAGE_THRESHOLDS = [0.01, 0.20, 0.34, 0.39, 0.58, 0.72, 0.82, 0.95];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement | null>(null);
  const desktopDotRef = useRef<SVGGElement | null>(null);
  const mobilePathRef = useRef<SVGPathElement | null>(null);
  const mobileDotRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stage-card');
      const cachedCards = cards.map((card, idx) => ({
        card,
        threshold: STAGE_THRESHOLDS[idx] ?? 1,
        numEl: card.querySelector<HTMLElement>('.stage-number'),
        titleEl: card.querySelector<HTMLElement>('.stage-title'),
        lineEl: card.querySelector<HTMLElement>('.stage-line'),
        dotMarker: card.querySelector<HTMLElement>('.stage-marker-dot'),
      }));

      const desktopPath = desktopPathRef.current;
      const desktopDot = desktopDotRef.current;
      const mobilePath = mobilePathRef.current;
      const mobileDot = mobileDotRef.current;

      const desktopTotalLength = desktopPath ? desktopPath.getTotalLength() : 0;
      const mobileTotalLength = mobilePath ? mobilePath.getTotalLength() : 0;

      if (desktopPath) {
        gsap.set(desktopPath, {
          strokeDasharray: desktopTotalLength,
          strokeDashoffset: desktopTotalLength,
        });
      }
      if (mobilePath) {
        gsap.set(mobilePath, {
          strokeDasharray: mobileTotalLength,
          strokeDashoffset: mobileTotalLength,
        });
      }

      let cachedCorr = 1;
      let cachedMobileCorr = 1;
      const updateAspectCorrection = () => {
        if (desktopPath) {
          const svgEl = desktopPath.ownerSVGElement;
          if (svgEl) {
            const rect = svgEl.getBoundingClientRect();
            const vb = svgEl.viewBox?.baseVal;
            const vbW = vb?.width || 1320;
            const vbH = vb?.height || 2800;
            if (rect.width > 0 && rect.height > 0) {
              cachedCorr = (rect.height / vbH) / (rect.width / vbW);
            }
          }
        }

        if (mobilePath) {
          const svgEl = mobilePath.ownerSVGElement;
          if (svgEl) {
            const rect = svgEl.getBoundingClientRect();
            const vb = svgEl.viewBox?.baseVal;
            const vbW = vb?.width || 24;
            const vbH = vb?.height || 1000;
            if (rect.width > 0 && rect.height > 0) {
              cachedMobileCorr = (rect.height / vbH) / (rect.width / vbW);
            }
          }
        }
      };
      updateAspectCorrection();

      if (desktopDot && desktopPath) {
        const startPt = desktopPath.getPointAtLength(0);
        desktopDot.setAttribute('transform', `translate(${startPt.x}, ${startPt.y}) scale(${cachedCorr}, 1)`);
        desktopDot.style.opacity = '0';
      }
      if (mobileDot && mobilePath) {
        const startPt = mobilePath.getPointAtLength(0);
        mobileDot.setAttribute('transform', `translate(${startPt.x}, ${startPt.y}) scale(${cachedMobileCorr}, 1)`);
        mobileDot.style.opacity = '0';
      }

      // Synchronized ScrollTrigger for trail drawing and milestone accentuation
      ScrollTrigger.create({
        trigger: railRef.current ?? container,
        start: 'top 20%',
        end: 'bottom 75%',
        scrub: 0.35,
        onRefresh: updateAspectCorrection,
        onUpdate: (self) => {
          const p = self.progress;

          // Animate desktop trail
          if (desktopPath) {
            const drawnLength = p * desktopTotalLength;
            gsap.set(desktopPath, { strokeDashoffset: desktopTotalLength - drawnLength });

            if (desktopDot) {
              const point = desktopPath.getPointAtLength(drawnLength);
              desktopDot.setAttribute('transform', `translate(${point.x}, ${point.y}) scale(${cachedCorr}, 1)`);
              desktopDot.style.opacity = p > 0.002 ? '1' : '0';
            }
          }

          // Animate mobile trail
          if (mobilePath) {
            const drawnLength = p * mobileTotalLength;
            gsap.set(mobilePath, { strokeDashoffset: mobileTotalLength - drawnLength });

            if (mobileDot) {
              const point = mobilePath.getPointAtLength(drawnLength);
              mobileDot.setAttribute('transform', `translate(${point.x}, ${point.y}) scale(${cachedMobileCorr}, 1)`);
              mobileDot.style.opacity = p > 0.002 ? '1' : '0';
            }
          }

          // Dynamic milestone illumination without paragraph fading
          cachedCards.forEach(({ card, threshold, numEl, titleEl, lineEl, dotMarker }) => {
            const isPassed = p >= threshold;

            if (isPassed && card.dataset.active !== 'true') {
              card.dataset.active = 'true';
              if (numEl) {
                gsap.to(numEl, {
                  color: '#F2F4F7',
                  scale: 1.05,
                  duration: 0.45,
                  ease: 'back.out(2)',
                  overwrite: 'auto',
                });
              }
              if (titleEl) {
                gsap.to(titleEl, {
                  color: '#E3C77E',
                  textShadow: 'none',
                  duration: 0.35,
                  overwrite: 'auto',
                });
              }
              if (lineEl) {
                gsap.to(lineEl, {
                  scaleX: 1,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power2.out',
                  overwrite: 'auto',
                });
              }
              if (dotMarker) {
                gsap.to(dotMarker, {
                  backgroundColor: '#E3C77E',
                  borderColor: '#E3C77E',
                  boxShadow: 'none',
                  scale: 1.25,
                  duration: 0.35,
                  overwrite: 'auto',
                });
              }
            } else if (!isPassed && card.dataset.active === 'true') {
              card.dataset.active = 'false';
              if (numEl) {
                gsap.to(numEl, {
                  color: '#4A5058',
                  scale: 1,
                  duration: 0.4,
                  ease: 'power2.out',
                  overwrite: 'auto',
                });
              }
              if (titleEl) {
                gsap.to(titleEl, {
                  color: '#E3C77E',
                  textShadow: 'none',
                  duration: 0.3,
                  overwrite: 'auto',
                });
              }
              if (lineEl) {
                gsap.to(lineEl, {
                  scaleX: 0.75,
                  opacity: 0.7,
                  duration: 0.4,
                  overwrite: 'auto',
                });
              }
              if (dotMarker) {
                gsap.to(dotMarker, {
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E3C77E',
                  boxShadow: 'none',
                  scale: 1,
                  duration: 0.3,
                  overwrite: 'auto',
                });
              }
            }
          });
        },
      });

      const handleLoad = () => {
        updateAspectCorrection();
        ScrollTrigger.refresh();
      };
      window.addEventListener('load', handleLoad);
      window.addEventListener('resize', handleLoad);

      return () => {
        window.removeEventListener('load', handleLoad);
        window.removeEventListener('resize', handleLoad);
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative z-10 flex w-full flex-col items-center overflow-x-clip bg-[#0B0D10] px-[4vw] pt-[10vh] pb-[8rem] md:px-[5vw] md:pt-[12vh] md:pb-[12rem] lg:px-[6vw] lg:pt-[14vh] lg:pb-[18rem] xl:pb-[20rem] border-t border-[#F2F4F7]/8"
    >
      {/* Header */}
      <div className="flex w-full max-w-[88rem] flex-col items-center">
        <h2 className="text-center font-seasonmix text-[clamp(2.4rem,6vw,4rem)] font-normal text-[#F2F4F7]" aria-label="Timeline">
          Timeline
        </h2>
      </div>

      {/* Rail Container */}
      <div
        ref={railRef}
        className="relative mt-[4vh] w-full max-w-[85rem] lg:-mt-[4vh] lg:h-[155vw] xl:-mt-[6vh] xl:h-[145vw] 2xl:-mt-[8vh] 2xl:h-[135vw]"
      >
        {/* Desktop Animated Winding Path */}
        <div className="pointer-events-none absolute top-[8%] left-[0%] right-[24%] xl:right-[26%] 2xl:right-[28%] hidden h-[90%] lg:block" aria-hidden="true">
          <svg viewBox="-40 -40 1320 2800" preserveAspectRatio="none" className="h-full w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="timelinePaint" x1="200" y1="0" x2="1000" y2="2600" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F3E2B4" />
                <stop offset="0.45" stopColor="#E3C77E" />
                <stop offset="1" stopColor="#F3E2B4" />
              </linearGradient>
            </defs>
            {/* Guide track */}
            <path
              d={DESKTOP_PATH_D}
              stroke="#EAEAEA"
              strokeWidth={6.5}
              strokeLinecap="round"
              strokeDasharray="14 16"
              fill="none"
            />
            {/* Active drawing stroke */}
            <path
              ref={desktopPathRef}
              d={DESKTOP_PATH_D}
              stroke="url(#timelinePaint)"
              strokeWidth={6.5}
              strokeLinecap="round"
              fill="none"
            />
            {/* Traveling indicator dot */}
            <g ref={desktopDotRef} style={{ opacity: 0 }}>
              <circle
                r="10"
                fill="white"
                stroke="#E3C77E"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0 0 12px #F3E2B4)' }}
              />
              <circle r="3.5" fill="#E3C77E" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </div>

        {/* Mobile Straight Vertical Path */}
        <div className="pointer-events-none absolute top-2 bottom-2 left-[0.5rem] sm:left-[0.75rem] w-[1.5rem] lg:hidden" aria-hidden="true">
          <svg viewBox="0 0 24 1000" preserveAspectRatio="none" className="h-full w-full overflow-visible" fill="none">
            <path d="M12 0 L12 1000" stroke="#EAEAEA" strokeWidth={3} strokeLinecap="round" strokeDasharray="6 8" fill="none" />
            <path ref={mobilePathRef} d="M12 0 L12 1000" stroke="#E3C77E" strokeWidth={3} strokeLinecap="round" fill="none" />
            <g ref={mobileDotRef} style={{ opacity: 0 }}>
              <circle
                r="4.5"
                fill="white"
                stroke="#E3C77E"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                style={{ filter: 'drop-shadow(0 0 6px rgba(227, 199, 126, 0.45))' }}
              />
              <circle r="1.8" fill="#E3C77E" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </div>

        {/* Milestone Cards 1-8 */}
        <div className="relative z-20 mt-[2.5rem] flex w-full flex-col items-start gap-[2.75rem] md:gap-[3.25rem] lg:mt-0 lg:block lg:h-full lg:gap-0">
          {/* Milestone 1 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[5%] lg:left-[4%] xl:left-[8%] 2xl:left-[6%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">1</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Hackathon Goes Live</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">15 September</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">The journey officially begins! The hackathon goes live, opening the challenge to innovators, developers, and creators ready to collaborate, solve meaningful problems, and turn their ideas into impact.</p>
              </div>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[17%] lg:left-auto lg:right-[-2vw] xl:right-[-1vw] 2xl:right-[1%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">2</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Build Your Team</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">15 September – 31 October</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">Find the right people to build with and form your team. Bring together different skills, experiences, and perspectives to create a strong team ready to take on the challenge. Submit the resumes of all team members, share your hackathon participation on social media, and provide the link to your post.</p>
              </div>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[30%] lg:left-[3%] xl:left-[6%] 2xl:left-[5%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">3</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Developers Connect</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">15 October · Mumbai</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">Meet the community in person at <strong className="font-semibold text-[#F2F4F7]/90">Developers Connect</strong> in Mumbai. Connect with fellow developers and innovators, exchange ideas, build new connections, and get a glimpse of the exciting journey ahead.</p>
              </div>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[26rem] lg:pl-0 xl:max-w-[29rem] 2xl:max-w-[32rem] lg:top-[39%] lg:left-auto lg:right-[-2vw] xl:right-[-3.5vw] 2xl:right-[-5vw] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">4</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Round 2 Begins</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">1 November</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">Round 2 is here! Take your team&apos;s idea forward and start developing your solution. Prepare a <strong className="font-semibold text-[#F2F4F7]/90">PPT presentation</strong> that clearly communicates your problem statement, proposed solution, approach, innovation, and the impact your idea aims to create.</p>
              </div>
            </div>
          </div>

          {/* Milestone 5 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[57%] lg:left-[6%] xl:left-[10%] 2xl:left-[8%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">5</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Round 2 Ends</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">20 November</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">Bring your solution together and submit your <strong className="font-semibold text-[#F2F4F7]/90">PPT</strong> before the Round 2 deadline. Make sure your presentation effectively showcases your idea, solution, implementation approach, and the value it can deliver.</p>
              </div>
            </div>
          </div>

          {/* Milestone 6 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[26rem] lg:pl-0 xl:max-w-[29rem] 2xl:max-w-[32rem] lg:top-[70%] lg:left-auto lg:right-[-1vw] xl:right-[-2vw] 2xl:right-[-3.5vw] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">6</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Results Announcement</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">30 November</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">The wait is finally over! The Round 2 results will be announced, revealing the teams that have successfully made it through to the final stage. Get ready to take your ideas from presentation to execution.</p>
              </div>
            </div>
          </div>

          {/* Milestone 7 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[82%] lg:left-[4%] xl:left-[7%] 2xl:left-[6%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">7</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Hackathon Commences</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">19 December</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">The final journey begins! Selected teams come together to build, collaborate, experiment, and turn their ideas into working solutions during the final hackathon experience.</p>
              </div>
            </div>
          </div>

          {/* Milestone 8 */}
          <div className="stage-card group relative z-20 flex w-full max-w-full items-start pl-[3.25rem] sm:pl-[3.75rem] md:max-w-[34rem] md:pl-[4rem] lg:absolute lg:max-w-[28rem] lg:pl-0 xl:max-w-[34rem] 2xl:max-w-[38rem] lg:top-[95.5%] lg:left-auto lg:right-[6%] xl:right-[10%] 2xl:right-[8%] transition-transform duration-300 hover:-translate-y-1">
            <span className="absolute top-3 sm:top-4 left-[1.25rem] sm:left-[1.5rem] z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:hidden" aria-hidden="true">
              <span className="stage-marker-dot shrink-0 h-[0.75rem] w-[0.75rem] rounded-full border-2 bg-[#0B0D10] transition-all duration-300" style={{ borderColor: '#E3C77E' }}></span>
            </span>
            <div className="shrink-0 self-start">
              <h3 className="stage-number font-sans select-none transition-colors duration-400 text-[clamp(3.2rem,8vw,4.5rem)] leading-[1] tracking-[0.04em] text-[#4A5058] md:text-[clamp(4.5rem,6.5vw,6rem)] lg:text-[clamp(5.5rem,6.8vw,9rem)]">8</h3>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-2 pt-0.5 sm:pr-4 md:px-4 lg:py-2">
              <h4 className="stage-title pt-1 font-seasonmix font-normal leading-tight text-[#E3C77E] text-[clamp(1.1rem,2.8vw,1.35rem)] md:text-[clamp(1.35rem,2vw,1.75rem)] lg:text-[clamp(1.6rem,1.8vw,2.25rem)] transition-all duration-300">Hackathon Ends</h4>
              <div className="stage-line mt-2 h-[0.125rem] w-[clamp(10rem,45vw,16rem)] origin-left bg-gradient-to-r from-[#E3C77E] via-[#F3E2B4] to-transparent md:w-[clamp(14rem,35vw,20rem)] opacity-70 transition-all duration-500" aria-hidden="true"></div>
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="font-secondary text-[clamp(0.95rem,2vw,1.1rem)] md:text-[clamp(1.1rem,1.5vw,1.25rem)] font-bold tracking-wide text-[#F2F4F7]/85">20 December</p>
                <p className="font-sans text-[clamp(0.85rem,1.8vw,0.95rem)] md:text-[clamp(0.95rem,1.3vw,1.05rem)] font-normal leading-relaxed text-[#F2F4F7]/75">After an exciting journey of innovation, collaboration, and intense building, the hackathon comes to an end. Teams showcase what they have created and celebrate the culmination of their hard work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
