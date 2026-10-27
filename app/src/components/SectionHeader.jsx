import React from 'react';
import Mascot from './Mascot';

/**
 * Sagar Gupta style SectionHeader:
 * - Monospaced index number + eyebrow: "02 / University of Florida (M.S.), MAKAUT (B.Tech)"
 * - Display heading with one italic accent word in Instrument Serif: "Education"
 * - Horizontal rule spanning to the right edge with a playful perched mascot avatar sitting on the line!
 */
export default function SectionHeader({ number, eyebrow, title, accentWord, sectionId, showMascot }) {
  // Show mascot on Education by default (or if explicitly requested)
  const hasMascot = showMascot ?? (sectionId === 'education');

  return (
    <div className="sagar-section-header">
      {eyebrow && (
        <div className="sagar-section-eyebrow">
          {number && <span className="sagar-section-number">{number} /</span>}
          <span>{eyebrow}</span>
        </div>
      )}
      <div className="sagar-section-title-row" style={{ position: 'relative' }}>
        <h2 className="sagar-display-heading">
          {title}{' '}
          {accentWord && <span className="accent-serif">{accentWord}</span>}
        </h2>
        <div className="sagar-section-rule" aria-hidden="true" />
        {hasMascot ? (
          <Mascot sectionId={sectionId} />
        ) : (
          <div className="sagar-section-mascot" aria-hidden="true">
            <span className="sagar-mascot-dot" />
          </div>
        )}
      </div>
    </div>
  );
}


