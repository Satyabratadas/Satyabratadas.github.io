import React, { useEffect, useRef, useState } from 'react';

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;

const solanaSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 311" fill="none"><path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1L333.1 73.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8zm267.8 117c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-63-62.7z" fill="%2314F195"/></svg>`;

const ORBIT_ITEMS = [
  { name: 'Python', icon: devicon('python/python-original'), angle: 0 },
  { name: 'PyTorch', icon: devicon('pytorch/pytorch-original'), angle: 45 },
  { name: 'OpenCV', icon: devicon('opencv/opencv-original'), angle: 90 },
  { name: 'MediaPipe', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', angle: 135 },
  { name: 'Docker', icon: devicon('docker/docker-original'), angle: 180 },
  { name: 'FastAPI', icon: devicon('fastapi/fastapi-original'), angle: 225 },
  { name: 'Solana', icon: solanaSvg, angle: 270 },
  { name: 'C++', icon: devicon('cplusplus/cplusplus-original'), angle: 315 },
];

export default function DevAvatar() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotate: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const radius = 135; // px from center

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Subtle tilt max 6px / 4deg
      setTilt({
        x: Math.max(-6, Math.min(6, deltaX * 8)),
        y: Math.max(-6, Math.min(6, deltaY * 8)),
        rotate: Math.max(-4, Math.min(4, deltaX * 5)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="sagar-avatar-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dashed circular orbit track */}
      <svg
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        width={300}
        height={300}
        viewBox="0 0 300 300"
      >
        <circle
          cx={150}
          cy={150}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx={150}
          cy={150}
          r={radius - 35}
          fill="none"
          stroke="rgba(56, 189, 248, 0.08)"
          strokeWidth="1"
        />
      </svg>

      {/* Center Developer Portrait with Pointer Look tracking & Glint */}
      <div
        className="sagar-center-avatar-wrapper"
        style={{
          transform: `translate(${tilt.x}px, ${tilt.y}px) rotate(${tilt.rotate}deg) ${isHovered ? 'scale(1.04)' : 'scale(1)'}`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
          boxShadow: isHovered
            ? '0 0 40px rgba(56, 189, 248, 0.4), 0 0 80px rgba(37, 99, 235, 0.2)'
            : '0 0 25px rgba(37, 99, 235, 0.25)',
        }}
      >
        <div className="sagar-avatar-glow" />
        <img
          src="/profile_pic.jpeg"
          alt="Satyabrata Das"
          className="sagar-center-avatar sagar-face"
          width={150}
          height={150}
          loading="eager"
        />

        {/* Sweep glint on hover */}
        <span
          className={`avatar-glint-sweep ${isHovered ? 'is-active' : ''}`}
          aria-hidden="true"
        />
      </div>

      {/* Orbiting Stack Ring: Clockwise rotation */}
      <div className="sagar-orbit-ring-rotator">
        {ORBIT_ITEMS.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = Math.round(Math.cos(rad) * radius);
          const y = Math.round(Math.sin(rad) * radius);

          return (
            <div
              key={item.name}
              className="sagar-orbit-node-pos"
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Counter-rotation so glyph stays upright */}
              <div
                className="sagar-orbit-node-counter"
                title={item.name}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  width={18}
                  height={18}
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
