import React from 'react';

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'var(--color-bg-primary, #0b1012)',
      }}
    >
      {/* Dot lattice pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)',
        }}
      />

      {/* Top Aurora Glow */}
      <div
        className="sagar-aurora-glow sagar-aurora-top"
        style={{
          position: 'absolute',
          top: '-25%',
          left: '50%',
          width: '1100px',
          height: '750px',
          marginLeft: '-550px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15), rgba(56, 189, 248, 0.06) 40%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Bottom Right Aurora Glow */}
      <div
        className="sagar-aurora-glow sagar-aurora-bottom-right"
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-15%',
          width: '900px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.08), rgba(37, 99, 235, 0.06) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Bottom Left Aurora Glow */}
      <div
        className="sagar-aurora-glow sagar-aurora-bottom-left"
        style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-15%',
          width: '750px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.08), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Sweeping diagonal laser light beam 1 */}
      <div
        className="sagar-laser-beam sagar-laser-beam-1"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '1.5px',
          height: '140%',
          background: 'linear-gradient(180deg, transparent, rgba(96, 165, 250, 0.4) 30%, rgba(96, 165, 250, 0.4) 70%, transparent)',
          transform: 'rotate(24deg)',
          transformOrigin: 'top center',
        }}
      />

      {/* Sweeping diagonal laser light beam 2 */}
      <div
        className="sagar-laser-beam sagar-laser-beam-2"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '1px',
          height: '140%',
          background: 'linear-gradient(180deg, transparent, rgba(56, 189, 248, 0.25) 30%, rgba(56, 189, 248, 0.25) 70%, transparent)',
          transform: 'rotate(24deg)',
          transformOrigin: 'top center',
        }}
      />

      {/* Edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 120% 90% at 50% 40%, transparent 50%, rgba(11, 16, 18, 0.85) 100%)',
        }}
      />
    </div>
  );
}
