import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// iOS ignores transparency and applies its own mask, so this variant is a
// full-bleed tile with no rounding of its own.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Bitsy-p7dr.ttf');

export default async function AppleIcon() {
  const font = await readFile(fontPath);

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
          fontSize: 118,
          lineHeight: 1,
        }}
      >
        s
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Bitsy', data: font, style: 'normal', weight: 400 }],
    }
  );
}
