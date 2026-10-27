import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      setProgress(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '2.5px',
        background: 'linear-gradient(90deg, #2563eb, #38bdf8)',
        zIndex: 9990,
        pointerEvents: 'none',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
      }}
    />
  );
}

