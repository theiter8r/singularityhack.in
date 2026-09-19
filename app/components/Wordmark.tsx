import React from 'react';

interface WordmarkProps {
  /** Tailwind sizing for the mark itself. Keep the 6.1627:1 aspect intact. */
  className?: string;
  /** Wrapper classes — put filters like drop-shadow here, not on the mark. */
  wrapperClassName?: string;
  onClick?: () => void;
}

/**
 * The SINGULARITY wordmark in champagne gold.
 *
 * The artwork is poured through a CSS mask rather than tinted, so the same
 * `--gold-ramp` sweep runs over the logo and the name in copy. A drop-shadow
 * belongs on the wrapper: CSS applies filters before masking, so a filter on
 * the mark itself gets clipped to the glyphs and the glow disappears.
 */
export default function Wordmark({
  className = '',
  wrapperClassName = '',
  onClick,
}: WordmarkProps) {
  return (
    <span className={`inline-flex ${wrapperClassName}`} onClick={onClick}>
      <span
        role="img"
        aria-label="SINGULARITY"
        className={`gold-mark block select-none ${className}`}
      />
    </span>
  );
}
