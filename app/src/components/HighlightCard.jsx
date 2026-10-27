import React, { useState } from 'react';

export default function HighlightCard({ icon: Icon, color, title, body, isMobile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        gap: isMobile ? 12 : 16,
        alignItems: 'flex-start',
        padding: isMobile ? '14px 16px' : '16px 18px',
        borderRadius: '12px',
        background: hovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
        border: hovered ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hovered ? '0 10px 25px rgba(0, 0, 0, 0.4)' : 'none',
      }}
    >
      {/* Accent Hairline */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: hovered ? 8 : 12,
          bottom: hovered ? 8 : 12,
          width: '2.5px',
          borderRadius: '2px',
          background: color,
          opacity: hovered ? 1 : 0.45,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0.7)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Icon Tile */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: `${color}18`,
          border: `1px solid ${color}35`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
          transform: hovered ? 'scale(1.12) rotate(6deg)' : 'scale(1) rotate(0deg)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <Icon size={18} style={{ color }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <h4
            style={{
              fontFamily: "var(--font-display, 'Bricolage Grotesque')",
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#f4f6f7',
              margin: '0 0 4px',
            }}
          >
            {title}
          </h4>
        )}
        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.55,
            color: '#9ca9b0',
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
