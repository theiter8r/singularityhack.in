'use client';

import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import FullScreenMenu from './FullScreenMenu';
import { BackgroundMusicProvider } from './BackgroundMusic';

/**
 * Chrome shared by every page that isn't the landing page: background music,
 * the pinned top bar, and the full-screen menu it opens.
 *
 * The menu's circular reveal grows from wherever it was triggered, so the
 * Explore button's centre is measured at click time and handed over as the
 * clip-path origin.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState('');

  const handleOpenMenu = (e?: React.MouseEvent<HTMLElement>) => {
    if (e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuOrigin(
        `${Math.round(rect.left + rect.width / 2)}px ${Math.round(rect.top + rect.height / 2)}px`
      );
    }
    setIsMenuOpen(true);
  };

  return (
    <BackgroundMusicProvider>
      <main className="min-h-screen bg-[#0B0D10] text-[#F2F4F7] overflow-x-clip">
        <SiteHeader onMenuClick={handleOpenMenu} />

        {children}

        <FullScreenMenu
          isOpen={isMenuOpen}
          origin={menuOrigin}
          onClose={() => setIsMenuOpen(false)}
        />
      </main>
    </BackgroundMusicProvider>
  );
}
