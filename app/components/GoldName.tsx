import React from 'react';

/**
 * Every way the event name appears in copy: "Singularity", "Singularity 2.0",
 * and the lower-case common noun the About copy plays on ("a singularity is
 * the point where...").
 */
const NAME = /(singularity(?:\s+\d(?:\.\d)?)?)/gi;

/**
 * Paints each mention of the name champagne gold, leaving the rest of the
 * string untouched. Use for prose; for headings and display type reach for
 * `.gold-lustre` directly so the mention gets the moving highlight.
 */
export function goldName(text: string, className = 'gold-ink'): React.ReactNode[] {
  return text.split(NAME).map((part, i) =>
    // split() with one capture group puts the matches at the odd indices.
    i % 2 === 1 ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export default function GoldName({
  children,
  className = 'gold-ink',
}: {
  children: string;
  className?: string;
}) {
  return <>{goldName(children, className)}</>;
}
