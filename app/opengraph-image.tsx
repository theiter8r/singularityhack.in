import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { EVENT, PAST_EDITION } from '@/lib/event';

export const alt =
  'Singularity 2.0 — national-level hackathon, 19–20 December 2026, K.C. College of Engineering & Management Studies, Thane';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Satori ships no default font, so the display face is loaded from disk.
// Local file, not a network fetch, so the build stays offline-safe.
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'SeasonMix-TRIAL-Regular.ttf');
// The .svg wordmark is a base64 PNG behind a mask + feColorMatrix, which
// resvg (Satori's rasteriser) renders as a grey block. logo-white.png is that
// artwork flattened to a real transparent PNG, so it renders correctly here.
const logoPath = path.join(process.cwd(), 'public', 'logo', 'logo-white.png');

const BG = '#0B0D10';
const FG = '#F2F4F7';
const MUTED = '#8A9099';
const GOLD = '#E3C77E';

export default async function OpengraphImage() {
  const [font, logoPng] = await Promise.all([readFile(fontPath), readFile(logoPath)]);
  const logo = `data:image/png;base64,${logoPng.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `linear-gradient(135deg, #15171d 0%, ${BG} 42%, #0d1014 100%)`,
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 46, height: 3, background: GOLD, display: 'flex' }} />
          <div
            style={{
              marginLeft: 18,
              color: GOLD,
              fontSize: 23,
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            National-Level Hackathon
          </div>
        </div>

        {/* Wordmark + headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" width={812} height={125} />
          <div
            style={{
              marginTop: 26,
              color: FG,
              fontSize: 40,
              letterSpacing: -0.5,
            }}
          >
            {`An ${EVENT.sprintHours}-hour offline sprint. Build the impossible.`}
          </div>
        </div>

        {/* Facts */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderTop: `1px solid rgba(242,244,247,0.14)`,
            paddingTop: 26,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: GOLD, fontSize: 31, letterSpacing: 0.4 }}>
              19–20 December 2026
            </div>
            <div style={{ color: MUTED, fontSize: 23, marginTop: 8 }}>
              {EVENT.venue}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ color: FG, fontSize: 31 }}>{`${EVENT.prizePool} prize pool`}</div>
            <div style={{ color: MUTED, fontSize: 23, marginTop: 8 }}>
              {`Teams of ${EVENT.minTeamSize}–${EVENT.maxTeamSize} · ${PAST_EDITION.participants} in 1.0`}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'SeasonMix', data: font, style: 'normal', weight: 400 }],
    }
  );
}
