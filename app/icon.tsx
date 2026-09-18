import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * BITSY maps a blocky pixel alphabet onto the lowercase ASCII slots, so the
 * character 's' is a solid geometric S rather than a normal letterform.
 * A gold tile keeps the mark legible against both light and dark tab strips,
 * where a near-black tile would disappear into the chrome.
 */
const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Bitsy-p7dr.ttf');

// Two sizes rather than one: tabs render at 16-20px, and downscaling a single
// 64px source 4:1 muddies the pixel strokes. The 32px variant halves that.
const VARIANTS = {
  '32': { size: 32, fontSize: 24, radius: 6 },
  '64': { size: 64, fontSize: 48, radius: 12 },
} as const;

export function generateImageMetadata() {
  return Object.entries(VARIANTS).map(([id, v]) => ({
    id,
    size: { width: v.size, height: v.size },
    contentType: 'image/png',
  }));
}

export default async function Icon({ id }: { id: keyof typeof VARIANTS }) {
  const font = await readFile(fontPath);
  const { size, fontSize, radius } = VARIANTS[id];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#E3C77E',
          color: '#0B0D10',
          fontSize,
          lineHeight: 1,
          borderRadius: radius,
        }}
      >
        s
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: 'Bitsy', data: font, style: 'normal', weight: 400 }],
    }
  );
}
