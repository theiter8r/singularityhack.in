import React from 'react';
import { EVENT, UNSTOP_URL } from '@/lib/event';

/**
 * Formats the sprint window as "19–20 December 2026" from the single source of
 * truth in `lib/event`. Pinned to IST so the server and the browser agree.
 */
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', ...opts }).format(new Date(iso));

const SPRINT_DATES = `${fmt(EVENT.startsAt, { day: 'numeric' })}–${fmt(EVENT.endsAt, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})}`;

/** Every fact below mirrors the official Unstop listing. Edit `lib/event`, not this file. */
const DETAILS = [
  { label: 'Prize pool', value: EVENT.prizePool, note: 'Across all four tracks' },
  { label: 'Dates', value: SPRINT_DATES, note: `${EVENT.sprintHours}-hour offline sprint` },
  { label: 'Team size', value: `${EVENT.minTeamSize}–${EVENT.maxTeamSize}`, note: 'Members per team' },
  { label: 'Tracks', value: '4', note: 'Pick one, ship one prototype' },
  {
    label: 'Entry fee',
    value: EVENT.participationFee,
    note: 'Per team, only if shortlisted for the offline round',
  },
  { label: 'Registrations close', value: EVENT.registrationCloses, note: 'Apply on Unstop' },
];

const TRACKS = [
  'AI-Enabled Hardware',
  'Health & Emergency Services',
  'FinTech',
  'Environmental Technologies',
];

export default function EditionDetailsSection() {
  return (
    <section
      id="edition-details"
      className="relative w-full py-[8vh] px-[4vw] md:py-[10vh] md:px-[5vw] lg:py-[12vh] lg:px-[6vw] bg-[#0B0D10] border-t border-[#F2F4F7]/8"
    >
      <div className="mx-auto w-full max-w-[92vw] md:max-w-[86vw] lg:max-w-[72rem]">
        {/* Eyebrow + heading */}
        <p className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-semibold uppercase tracking-[0.32em] text-[#F2F4F7]/45">
          This Edition
        </p>
        <h2 className="mt-[0.9rem] font-seasonmix text-[clamp(2.1rem,5.5vw,2.75rem)] md:text-[clamp(2.75rem,4.2vw,3.6rem)] lg:text-[clamp(3.6rem,3.8vw,4.25rem)] font-normal leading-[1.1] tracking-[-0.01em]">
          <span className="gold-lustre">{EVENT.prizePool}</span> on the table
        </h2>

        <p className="mt-[1.25rem] max-w-[46rem] text-[clamp(0.95rem,2.4vw,1.1rem)] md:text-[clamp(1.05rem,1.6vw,1.2rem)] text-[#C2C7CE] font-light leading-[1.8] tracking-[-0.01em]">
          Singularity 2.0 puts a <span className="gold-ink">{EVENT.prizePool}</span> prize pool
          behind an {EVENT.sprintHours}-hour offline build at {EVENT.venue}. Teams of{' '}
          {EVENT.minTeamSize} to {EVENT.maxTeamSize} pick one of four tracks, work through the night
          alongside industry mentors, and demo a functional prototype at the end. No tutorials, no
          templates, no partial credit for a deck.
        </p>

        {/* Fact grid */}
        <dl className="mt-[3rem] md:mt-[4rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F2F4F7]/8 border border-[#F2F4F7]/8 rounded-2xl overflow-hidden">
          {DETAILS.map((item) => (
            <div key={item.label} className="bg-[#0B0D10] p-[1.5rem] md:p-[2rem]">
              <dt className="text-[clamp(0.6rem,0.75vw,0.7rem)] font-semibold uppercase tracking-[0.22em] text-[#8A9099]">
                {item.label}
              </dt>
              <dd className="mt-[0.75rem] text-[clamp(1.5rem,4vw,1.9rem)] md:text-[clamp(1.75rem,2.2vw,2.15rem)] text-[#F2F4F7] font-normal leading-[1.15] tracking-tight">
                {item.value}
              </dd>
              <dd className="mt-[0.5rem] text-[clamp(0.8rem,1vw,0.9rem)] text-[#C2C7CE]/70 font-light leading-[1.5]">
                {item.note}
              </dd>
            </div>
          ))}
        </dl>

        {/* Tracks */}
        <div className="mt-[3rem] md:mt-[4rem]">
          <p className="text-[clamp(0.6rem,0.75vw,0.7rem)] font-semibold uppercase tracking-[0.22em] text-[#8A9099]">
            The four tracks
          </p>
          <ul className="mt-[1.25rem] flex flex-wrap gap-[0.6rem] md:gap-[0.75rem]">
            {TRACKS.map((track) => (
              <li
                key={track}
                className="rounded-full border border-[#E3C77E]/25 bg-[#E3C77E]/5 px-[1rem] py-[0.55rem] text-[clamp(0.8rem,1vw,0.92rem)] text-[#F2F4F7]/85"
              >
                {track}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-[3rem] md:mt-[4rem] flex flex-wrap items-center gap-[1rem]">
          <a
            href={UNSTOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-[0.75rem] rounded-full bg-[#F2F4F7] px-[1.5rem] py-[0.85rem] text-[clamp(0.9rem,1.1vw,1rem)] font-medium text-[#0B0D10] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Register on Unstop
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[0.9em] w-[0.9em] transition-transform duration-300 group-hover:rotate-45"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <span className="text-[clamp(0.78rem,0.95vw,0.88rem)] text-[#F2F4F7]/45">
            Registrations close {EVENT.registrationCloses}
          </span>
        </div>
      </div>
    </section>
  );
}
