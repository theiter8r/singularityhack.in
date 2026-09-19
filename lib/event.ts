/**
 * Single source of truth for Singularity 2.0 event facts.
 * Values mirror the official Unstop listing. Update here, not in sections.
 */

export const UNSTOP_URL =
  'https://unstop.com/hackathons/singularity-20-kc-college-of-engineering-and-management-studies-and-research-1755564';

/** Inbox for partnership and sponsorship enquiries. */
export const PARTNER_EMAIL = 'hello@singularityhack.in';

export const EVENT = {
  name: 'Singularity 2.0',
  organizer: 'KC College of Engineering & Management Studies and Research',
  venue: 'K.C. College of Engineering & Management Studies, Thane',
  /** Final offline build, IST */
  startsAt: '2026-12-19T09:00:00+05:30',
  endsAt: '2026-12-20T12:00:00+05:30',
  registrationOpens: '15 September 2026',
  registrationCloses: '20 November 2026',
  sprintHours: 18,
  minTeamSize: 2,
  maxTeamSize: 4,
  prizePool: '₹40,000',
  /** Charged only to teams shortlisted for the offline round, per team */
  participationFee: '₹1,000',
} as const;

/** Verified results from the previous edition. Never present these as 2.0 promises. */
export const PAST_EDITION = {
  label: 'Singularity 1.0',
  prizePool: '₹15,000+',
  participants: '400+',
  teams: '120+',
  projects: '120+',
} as const;

/**
 * Partners backing Singularity 2.0, in billing order.
 *
 * `role` is the public label under the mark; `href` opens the partner's own
 * page so the logo doubles as attribution. Add new partners here, not in the
 * section, so the row and any future press kit stay in sync.
 */
export const PARTNERS = [
  {
    id: 'unstop',
    name: 'Unstop',
    role: 'Platform Partner',
    href: 'https://unstop.com',
  },
] as const;
