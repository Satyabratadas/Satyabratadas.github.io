import React, { useEffect, useState } from 'react';

const TAGLINES = [
  'Computer Vision & Machine Learning Engineer',
  'Building Real-Time Systems & Scalable Platforms',
  'Production AI, Deep Learning & MLOps Pipelines',
];

export default function HeroTagline() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % TAGLINES.length);
        setAnimating(false);
      }, 350);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const currentWords = TAGLINES[index].split(' ');

  return (
    <div
      className="hero-tagline"
      style={{
        width: '100%',
        minWidth: 0,
        fontWeight: 600,
        lineHeight: 1.5,
        color: 'var(--color-accent-cyan, #60a5fa)',
        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
        minHeight: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: '0.3em',
          transform: animating ? 'translateY(-16px) scale(0.96)' : 'translateY(0) scale(1)',
          opacity: animating ? 0 : 1,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {currentWords.map((word, i) => (
          <span
            key={`${index}-${i}`}
            style={{
              display: 'inline-block',
              animation: !animating ? `sagarWordEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s both` : 'none',
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
