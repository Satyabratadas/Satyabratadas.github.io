import React, { useEffect, useRef } from 'react';

/**
 * ProximityText: Each character's variable font weight swells
 * smoothly when the mouse pointer is near it (Bricolage Grotesque's wght axis).
 */
export default function ProximityText({ text, accentWord }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.prox-char');
    const radius = 130;

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      chars.forEach((charEl) => {
        const rect = charEl.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(mouseX - charCenterX, mouseY - charCenterY);

        if (dist < radius) {
          const intensity = 1 - dist / radius;
          // Scale weight from 680 to 860
          const weight = Math.round(680 + intensity * intensity * 200);
          charEl.style.fontVariationSettings = `'wght' ${weight}`;
          charEl.style.color = '#ffffff';
        } else {
          charEl.style.fontVariationSettings = `'wght' 680`;
          charEl.style.color = '';
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((charEl) => {
        charEl.style.fontVariationSettings = `'wght' 680`;
        charEl.style.color = '';
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <span ref={containerRef} className="proximity-text-wrapper">
      {text.split(' ').map((word, wordIdx) => {
        const isAccent = accentWord && word.toLowerCase().includes(accentWord.toLowerCase());
        if (isAccent) {
          return (
            <span key={wordIdx} className="accent-serif" style={{ marginRight: '0.28em' }}>
              {word}{' '}
            </span>
          );
        }

        return (
          <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}>
            {word.split('').map((char, charIdx) => (
              <span
                key={charIdx}
                className="prox-char"
                style={{
                  display: 'inline-block',
                  transition: 'color 0.15s ease',
                  fontVariationSettings: "'wght' 680",
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

