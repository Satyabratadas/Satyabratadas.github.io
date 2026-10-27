import React from 'react';
import { MapPin, Briefcase, GraduationCap, Eye } from 'lucide-react';

const FACTS = [
  {
    icon: MapPin,
    label: 'BASED IN',
    value: 'Gainesville, FL (Open to Relocate)',
  },
  {
    icon: Briefcase,
    label: 'CURRENT ROLE',
    value: 'Computer Vision Engineer @ evy.io',
  },
  {
    icon: GraduationCap,
    label: 'EDUCATION',
    value: 'M.S. AI Systems @ University of Florida',
  },
  {
    icon: Eye,
    label: 'PRIMARY FOCUS',
    value: 'Real-Time Vision & High-Throughput APIs',
  },
];

export default function QuickFacts() {
  return (
    <div
      className="sagar-quick-facts"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginTop: '48px',
        paddingTop: '28px',
        borderTop: '1px dashed rgba(255, 255, 255, 0.12)',
        width: '100%',
      }}
    >
      {FACTS.map((fact) => {
        const IconComponent = fact.icon;
        return (
          <div
            key={fact.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '6px',
            }}
          >
            <IconComponent size={19} style={{ color: '#60a5fa' }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8a97a0',
              }}
            >
              {fact.label}
            </span>
            <span
              style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#f4f6f7',
                lineHeight: 1.4,
              }}
            >
              {fact.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

