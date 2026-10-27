import React, { useEffect, useState } from 'react';

/**
 * Sagar Gupta style opening curtain:
 * Satyabrata Das is signed on in the Yellowtail cursive script face (stroke draw, then fill),
 * then the curtain slides up smoothly out of view.
 */
export default function IntroSplash({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isLifting, setIsLifting] = useState(false);

  useEffect(() => {
    // Check if session already saw splash
    const seen = sessionStorage.getItem('portfolio_intro_seen');
    if (seen || window.location.hash) {
      setVisible(false);
      onFinish?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 150);

    const liftTimer = setTimeout(() => {
      handleLeave();
    }, 2200);

    const handleSkip = () => {
      handleLeave();
    };

    window.addEventListener('pointerdown', handleSkip, { once: true, passive: true });
    window.addEventListener('keydown', handleSkip, { once: true, passive: true });
    window.addEventListener('wheel', handleSkip, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(liftTimer);
      window.removeEventListener('pointerdown', handleSkip);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('wheel', handleSkip);
    };
  }, []);

  const handleLeave = () => {
    setIsLifting(true);
    sessionStorage.setItem('portfolio_intro_seen', 'true');
    setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 850);
  };

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-splash ${isReady ? 'intro-splash--ready' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        background: '#0b1012',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isLifting ? 'translateY(-100%)' : 'translateY(0)',
        pointerEvents: isLifting ? 'none' : 'auto',
      }}
    >
      <svg
        className="intro-splash-name"
        viewBox="0 0 1000 240"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: 'min(88vw, 840px)',
          height: 'auto',
          overflow: 'visible',
        }}
      >
        <text
          x="500"
          y="160"
          textAnchor="middle"
          style={{
            fontFamily: "'Yellowtail', cursive",
            fontSize: '136px',
            fontWeight: 400,
            fill: '#f4f6f7',
            fillOpacity: 0,
            stroke: '#f4f6f7',
            strokeWidth: '1.6px',
            strokeLinecap: 'round',
          }}
        >
          Satyabrata Das
        </text>
      </svg>
      <p
        style={{
          fontFamily: "var(--font-mono, 'Geist Mono', monospace)",
          fontSize: '12px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8a97a0',
          marginTop: '6px',
          opacity: isReady ? 1 : 0,
          transform: isReady ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.1s',
        }}
      >
        Machine Learning Engineer
      </p>
    </div>
  );
}
