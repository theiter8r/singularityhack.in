# Product Requirements Document: Singularity 2.0 Hackathon

**Document status:** Draft, extracted from repository content only
**Source folder analyzed:** `/Users/raaj/singularity2.0` (Next.js landing site repository), primarily `app/sections/*`, `app/components/*`, `components/FooterMap.tsx`, `public/`, `package.json`
**Date prepared:** 2026-09-15
**Prepared for:** raajthestud@gmail.com

---

## 1. Overview / Executive Summary

Singularity 2.0 is a student hackathon whose official landing website lives in this repository. The site (Next.js 15, React 19, Tailwind, GSAP-driven scroll animations) is the primary public-facing surface for the event: it announces the hackathon, explains its four problem tracks, walks visitors through an eight-stage timeline running from mid-September through late December 2026, showcases results from a prior edition, solicits sponsors, answers common questions, and drives traffic to external registration (Unstop).

This PRD covers two coupled scopes, both derivable from the repository:

1. **The hackathon program itself** — tracks, timeline, venue, registration flow, and past-edition proof points, as encoded in the site's content.
2. **The website that delivers that program to participants and sponsors** — its sections, required content, and current completion state.

Several core content blocks (About, Sponsors intro, Past Edition narrative, all five FAQ answers) are still Lorem Ipsum placeholders in the code, meaning the site is mid-build. This PRD documents what is confirmed, flags what is missing, and proposes the scope needed to take the site and program to a shippable state.

---

## 2. Goals and Success Metrics

**Primary goal:** Drive qualified team registrations for Singularity 2.0 through the Unstop registration flow, culminating in a two-day in-person build event on 19-20 December 2026 at K.C. College of Engineering & Management Studies, Thane.

**Secondary goal:** Convert sponsor interest into signed sponsorships, using the pitch "Gain direct brand exposure to 4,000+ enthusiastic engineering students, scout top developer talent, and mentor next-generation creators" (copy taken from `SponsorsSection.tsx`).

**Success metrics (benchmarks pulled from the "Our Glory" / past-edition stats in `PastEditionSection.tsx`; targets for 2.0 need confirmation):**

| Metric | Prior edition benchmark | Singularity 2.0 target |
|---|---|---|
| Global registrations | 4,100+ | [FILL: confirm 2.0 target] |
| Prize pool | ₹140,000+ | [FILL: confirm 2.0 prize pool] |
| Top finalist teams | 55 | [FILL: confirm 2.0 target] |
| Build duration | 25 hours non-stop | [FILL: confirm 2.0 duration; milestone dates suggest roughly 19-20 December] |
| Sponsor count / tiers | Not stated | [FILL: define target sponsor count and tiers] |
| Site conversion (visit to "Register on Unstop" click) | Not tracked in repo | [FILL: define target conversion rate and analytics tool] |

It is not confirmed in the folder whether "Singularity 2.0" is formally the second edition and whether the past-edition numbers above belong to a "Singularity 1.0." This should be confirmed before the numbers are published as continuity claims.

---

## 3. Scope

### In scope

**Hackathon program:**
- Four themed tracks: AI-Enabled Hardware, Health & Emergency Services, FinTech, Environmental (full descriptions in `ThemeSection.tsx`)
- An eight-stage public timeline (detailed in Section 6) spanning registration, team formation, a community meetup, a PPT-based Round 2, results, and a final in-person build
- A single confirmed venue: K.C. College of Engineering & Management Studies, Mithbunder Rd, Kopri, Thane (E) / Manpada Campus (from `components/FooterMap.tsx`)
- External registration handled via Unstop (linked, not built in-repo)
- Sponsor outreach via a pitch section and a "Request Sponsorship Deck" mailto CTA

**Website deliverable (this repository):**
- Hero section with live countdown timer to the hackathon start and a primary "Register on Unstop" CTA
- About section (currently placeholder copy)
- Hackathon Themes section (4 tracks, content and imagery finalized)
- Timeline section (8 milestones, all dates populated)
- Past Edition / "Our Glory" section with headline stats and a scroll-expand hero image (currently a temp image asset)
- Sponsors section with pitch and CTA (currently placeholder intro copy)
- FAQ section with 5 question stubs (currently placeholder answers)
- Footer with social links (Instagram, LinkedIn, WhatsApp), venue map, and legal/nav links
- Full-screen navigation menu and scroll-driven brand story sequence
- Responsive behavior across mobile, tablet, and desktop breakpoints

### Out of scope

- Actual registration, application intake, and payment processing (delegated to Unstop; no in-repo code handles this)
- Team formation / teammate-matching tooling (no Discord, forum, or matching feature found in this repo; a competitor site referenced in `refrence.html` has this, but it is not part of Singularity's own content)
- Judging platform, scoring rubric, or submission portal for Round 2 PPTs
- Mentor or judge recruitment, roster, and scheduling
- Sponsorship tiering, contract, or invoicing workflow (only the initial outreach pitch is in scope)
- Localization or multi-language support
- Any content, branding, or structure from `refrence.html` — this file is a saved snapshot of a different, unrelated hackathon (HackSpire'26, organized by FIEM ACM Student Chapter, Kolkata, 2-3 October 2026) and appears to be kept purely as a design/structural reference. It must not be treated as source-of-truth data for Singularity 2.0.

---

## 4. Users / Personas

**Participant.** An engineering/CS student (or small team) who lands on the site, checks the countdown and themes, forms or joins a team by 31 October, submits a PPT for Round 2 by 20 November, and — if shortlisted — travels to the Thane venue for the 19-20 December build. Eligibility rules (student-only vs. open, team size limits) are not yet finalized in the FAQ content.

**Sponsor prospect.** A company or organization evaluating brand exposure to "4,000+ enthusiastic engineering students," developer talent scouting, and mentorship opportunities. Enters via the Sponsors section CTA.

**Site visitor / prospect.** Anyone discovering the event through social (Instagram `@singularityhack.in`, LinkedIn `singularity-hack`) or word of mouth, using the site to evaluate whether to register.

**Organizer / admin.** Not described anywhere in the folder — no organizing committee, chapter name, or named contacts appear in the Singularity content itself (only in the unrelated `refrence.html`). [FILL: organizing team/chapter name and primary contact]

---

## 5. Features / Requirements (prioritized)

**P0 — must have, largely implemented, content gaps remain**
- Hero countdown timer targeting the hackathon start date, with primary registration CTA — implemented; timezone of the hardcoded target date is unspecified in code and should be confirmed
- Hackathon Themes section with all 4 tracks and imagery — implemented (local images now used in place of prior Unsplash placeholders, per uncommitted `ThemeSection.tsx` change)
- Timeline section with all 8 milestone dates — implemented
- Sponsors section with pitch and contact CTA — implemented, but sponsor contact email needs verification (see Risks)
- Footer with social links and venue map — implemented
- About section real copy — **not implemented**, currently Lorem Ipsum
- FAQ real answers for all 5 questions — **not implemented**, currently Lorem Ipsum
- Past Edition section real narrative copy and real hero image — **not implemented**, narrative is Lorem Ipsum and hero image is a temp placeholder (`/images/temp.png`)

**P1 — should have**
- Full-screen navigation menu — implemented
- Scroll-driven cinematic brand story section — implemented
- Sponsor logo/wall display once sponsors are signed — not present, only the outreach pitch exists

**P2 — gaps to confirm, not yet present in the folder**
- Judges/mentors section or roster
- Confirmed prize pool and prize breakdown for the 2.0 edition
- Rules/guide page (a "Guide" nav item exists in the unrelated reference site's structure; no equivalent exists in Singularity's own navigation — confirm if one is wanted)
- Team-size and eligibility rules (currently unanswered in the FAQ placeholder content)

---

## 6. Milestones / Timeline

All dates as encoded in `TimelineSection.tsx`. Year is not stated per-milestone in the source but the countdown target and final two milestones point to December 2026; earlier milestones are presumed to fall in the same 2026 calendar cycle.

| # | Milestone | Date | Description (as written on site) |
|---|---|---|---|
| 1 | Hackathon Goes Live | 15 September | Registration opens to innovators, developers, and creators |
| 2 | Build Your Team | 15 September – 31 October | Form a team; submit resumes of all team members; share hackathon participation on social media with a link to the post |
| 3 | Developers Connect | 15 October, Mumbai | In-person community meetup to network with fellow developers ahead of the event |
| 4 | Round 2 Begins | 1 November | Teams begin developing their solution and preparing a PPT covering problem statement, solution, approach, innovation, and impact |
| 5 | Round 2 Ends | 20 November | PPT submission deadline |
| 6 | Results Announcement | 30 November | Round 2 results announced; shortlisted teams advance to the final stage |
| 7 | Hackathon Commences | 19 December | Final in-person build begins at the Thane venue |
| 8 | Hackathon Ends | 20 December | Final in-person build ends; teams showcase their work |

Note: the hero countdown timer's target date (`2026-12-19T00:00:00`) matches Milestone 7, which is internally consistent.

---

## 7. Risks and Mitigations

| Risk | Detail | Suggested mitigation |
|---|---|---|
| Unfinished placeholder copy is close to shippable | About, Sponsors intro, Past Edition narrative, and all 5 FAQ answers are still Lorem Ipsum in committed code | Block launch on real copy sign-off for these five blocks |
| Sponsor contact email may be wrong | `SponsorsSection.tsx` uses `contact@fiem.acm.org`, but the venue (per `FooterMap.tsx`) is K.C. College of Engineering & Management Studies, Thane — an institution unrelated to FIEM (Kolkata), which organizes the different hackathon referenced in `refrence.html` | Confirm the correct sponsorship inbox before launch; this looks like it may be a copied-over default |
| Reference file could bleed into production content | `refrence.html` is a full saved snapshot of a competitor/inspiration site (HackSpire'26) sitting in the repo root, including its own SEO metadata, organizer names, and copy | Keep clearly separated from any copywriting pass; consider moving it out of the repo root once no longer needed as a reference |
| Past-edition stats are uncaptioned | 25H, 4,100+ registrations, ₹140k+ prize pool, and 55 finalists are shown with no label clarifying which edition they belong to | Add an explicit "Singularity 1.0" (or equivalent) caption so visitors don't read these as 2.0 guarantees |
| Placeholder hero image in Past Edition section | `ScrollExpand` component in `PastEditionSection.tsx` currently points to `/images/temp.png` | Replace with real event photography before launch |
| Countdown timezone unspecified | The countdown timer's target date has no timezone in code, relying on the browser's local time | Confirm intended timezone (likely IST given Thane venue) and encode it explicitly |
| Operational process for team-formation deliverables is undocumented | Milestone 2 requires submitting resumes and a social post link, but no intake form, email, or tool is referenced anywhere in the folder | Confirm the submission mechanism and, if needed, surface it on the site |
| Track imagery is heavy | Three of the four track images in `public/images/tracks/` are 2.3-2.8MB PNGs | Compress/convert to a modern format (e.g. WebP) to protect mobile load times and conversion rates |
| Display font license is a trial build | The bundled font file is named `SeasonMix-TRIAL-Regular.ttf`, implying an evaluation license | Confirm a production license has been purchased before public launch |
| No eligibility or team-size rules published | FAQ answers for "who can participate" and "team size" are still placeholders | Finalize and publish before registration opens broadly |

---

## 8. Stakeholders

- **Organizing team/committee:** [FILL: name of the organizing chapter/club and primary contacts — not present anywhere in the Singularity-specific content]
- **Participants:** engineering/developer/designer students, referenced via the sponsor pitch's "4,000+ enthusiastic engineering students"
- **Sponsors:** prospective sponsor organizations, entry point is the Sponsors section CTA
- **Venue:** K.C. College of Engineering & Management Studies, Thane (confirmed via `FooterMap.tsx`)
- **Registration partner:** Unstop (external platform, linked from the hero CTA)
- **Community channels:** Instagram (`@singularityhack.in`), LinkedIn (`singularity-hack`), WhatsApp (link currently a placeholder `#` in `Footer.tsx`)
- **Judges/mentors:** [FILL: not referenced anywhere in the Singularity-specific content]

---

## 9. Assumptions and Constraints

- Assumed the entire `singularity2.0` repository was the intended folder to analyze, since no explicit folder path was given in the request. [FILL: confirm this was the correct target, or specify a different folder]
- No PRD template or output format was specified in the request; this document uses a standard PRD structure in Markdown. [FILL: confirm, or specify Google Docs or another template]
- Assumed "Singularity 2.0" denotes a second edition, and that the "Our Glory" stats describe a prior "Singularity 1.0." [FILL: confirm]
- Assumed the event is primarily in-person/offline given the physical venue, the in-person "Developers Connect" meetup, and the resume-submission requirement — this is not explicitly stated as offline-only anywhere in the content. [FILL: confirm]
- The repository is in a work-in-progress state as of 2026-09-15: an uncommitted change swaps `ThemeSection.tsx` track images from Unsplash stock URLs to local files in a newly added, untracked `public/images/tracks/` folder. This PRD reflects the local-image state as current.
- Registration, application review, and any Round 1 screening are assumed to happen entirely on Unstop, outside this repository's scope.

---

## 10. Appendices

### A. Source files reviewed
`app/sections/HeroSection.tsx`, `AboutSection.tsx`, `ThemeSection.tsx`, `TimelineSection.tsx`, `PastEditionSection.tsx`, `SponsorsSection.tsx`, `FaqSection.tsx`, `Footer.tsx`, `Header.tsx`, `StorySection.tsx`; `app/components/FullScreenMenu.tsx`; `components/FooterMap.tsx`; `package.json`; `README.md`; `public/images/tracks/`; `refrence.html` (reviewed and excluded as unrelated reference material, see Section 3 and Section 7).

### B. Confirmed hackathon tracks
1. AI-Enabled Hardware — wearables, robotics, IoT devices, embedded systems, drones, and smart devices integrating AI
2. Health & Emergency Services — healthcare delivery, patient outcomes, and emergency response systems for hospitals, first responders, rural clinics, and citizens
3. FinTech — payments, lending, personal finance, fraud detection, and blockchain-based solutions
4. Environmental — climate, sustainability, waste management, clean energy, water conservation, and pollution tracking

### C. Brand line
"This is not just a hackathon, it's a place where normal rules don't apply and limits disappear. A space where builders, dreamers, and problem-solvers come together to celebrate the art of creation, share ideas, and turn code into lasting, real-world impact for a cause that matters." (`StorySection.tsx`)

---

## 11. Clarifying Questions

1. Confirm the intended folder scope: this PRD treats the whole `singularity2.0` repository (mainly `app/sections/`) as the source, since no folder path was given. Is that correct, or is there a different folder to analyze?
2. No PRD template or output format was specified. Is Markdown acceptable, or is a different template/format (e.g. Google Docs) preferred?
3. Is "Singularity 2.0" the second edition, with the "Our Glory" stats (25H, 4,100+ registrations, ₹140k+ prize pool, 55 finalists) belonging to a "Singularity 1.0"?
4. The Sponsors section CTA uses `contact@fiem.acm.org`, which does not match the Thane venue. Is this the correct sponsorship contact, or a leftover from another template?
5. What are the confirmed team size limits, eligibility rules (students only, or open to professionals), and any entry fee for Singularity 2.0? The FAQ currently has placeholder answers for all of these.
6. What is the confirmed prize pool, prize breakdown, and judging criteria for Singularity 2.0?
7. Is the event strictly in-person, or is remote/hybrid participation supported at any stage?
8. Who is the organizing committee/chapter and who are the named points of contact for Singularity 2.0?
9. Has a production license been secured for the SeasonMix display font, given the bundled file is named as a trial build?
