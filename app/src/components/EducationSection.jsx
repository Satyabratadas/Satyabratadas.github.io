import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { BookOpen, MapPin, Trophy, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

const EDUCATION_ITEMS = [
  {
    id: 1,
    startDate: 'August 2025',
    endDate: 'May 2027',
    location: 'Gainesville, FL, USA',
    institution: 'University of Florida',
    degree: 'M.S. in Artificial Intelligence Systems',
    department: 'Herbert Wertheim College of Engineering · CISE',
    cgpa: 'M.S.',
    cgpaLabel: 'Graduate Degree',
    skills: [
      'AI Safety & Robustness',
      'Computer Vision',
      'Applied Deep Learning',
      'AI Systems',
      'ML for AI',
      'Image Processing',
      'Deep Learning',
    ],
    achievements: [
      "Conducting ML research on video-based kinematic analysis for Parkinson's disease assessment using 3D pose estimation across 1,000+ clinical recordings.",
      '1st Place Overall & Best Open Source (MLH) at Gator Hack V (Albie: Meta Quest XR voice-driven AI agent boosting model accuracy to 82%).',
      'Winner, Solana Track at Gator Quant Hacks 2026 (Backfill: on-chain cryptographic auditability for quant backtests).',
      'Winner, NASA GeoEMERGE Data Hackathon (Intermediate Track – Data Analysis Recognition on GLOBE Observer mosquito habitat observations at Marston Science Library, UF).',
      'Graduate curriculum centered on robust computer vision, sub-1.4s model serving, and resilient distributed AI pipelines.',
    ],
    accentColor: '#38bdf8',
    logoBg: 'rgba(56, 189, 248, 0.12)',
    logoBorder: 'rgba(56, 189, 248, 0.28)',
  },
  {
    id: 2,
    startDate: 'August 2018',
    endDate: 'June 2022',
    location: 'Kolkata, WB, India',
    institution: 'Guru Nanak Institute of Technology (MAKAUT)',
    degree: 'B.Tech in Computer Science & Engineering',
    department: 'Department of Computer Science & Engineering',
    cgpa: '8.64',
    cgpaLabel: 'CGPA: 8.64 / 10',
    skills: [
      'Data Structures',
      'Algorithms',
      'OOP',
      'Database Systems (SQL)',
      'Operating Systems',
      'Computer Networks',
      'Git',
    ],
    achievements: [
      'Graduated with 8.64 / 10 CGPA (First Class with Distinction).',
      'Comprehensive computer science foundations in Data Structures, Algorithm Design, OOP, and Database Architectures.',
      'Active competitive programmer: 183+ problems solved on LeetCode across trees, graphs, dynamic programming, and binary search.',
    ],
    accentColor: '#34d399',
    logoBg: 'rgba(52, 211, 153, 0.12)',
    logoBorder: 'rgba(52, 211, 153, 0.28)',
  },
];

export default function EducationSection({ educationRef }) {
  const [expandedId, setExpandedId] = useState(1); // Keep first open by default like Sagar's site

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="education" ref={educationRef} className="sagar-education-section" style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '96px 24px' }}>
      {/* Sagar Gupta Section Header with Sitting Mascot on the Rule Line */}
      <SectionHeader
        number="02"
        eyebrow="University of Florida (M.S.), MAKAUT (B.Tech)"
        title="Education"
        accentWord=""
        sectionId="education"
        showMascot={true}
      />

      {/* Timeline & Cards Layout */}
      <div className="sagar-edu-timeline" style={{ marginTop: '48px', position: 'relative' }}>
        {EDUCATION_ITEMS.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const isLast = idx === EDUCATION_ITEMS.length - 1;

          return (
            <div
              key={item.id}
              className="sagar-edu-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(140px, 180px) 1fr',
                gap: '32px',
                position: 'relative',
                marginBottom: isLast ? '0' : '48px',
              }}
            >
              {/* Left Column: Timeline Rail with Date & Location */}
              <div
                className="sagar-edu-rail"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  textAlign: 'right',
                  paddingRight: '20px',
                  position: 'relative',
                }}
              >
                {/* Connecting Vertical Timeline Line */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      right: '-1px',
                      top: '26px',
                      bottom: '-52px',
                      width: '2px',
                      background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.5) 0%, rgba(56, 189, 248, 0.1) 80%, transparent 100%)',
                    }}
                  />
                )}

                {/* Timeline Circle Node */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    right: '-7px',
                    top: '12px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#0b1012',
                    border: '2px solid #38bdf8',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.6)',
                    zIndex: 2,
                  }}
                />

                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono')",
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#38bdf8',
                    lineHeight: 1.3,
                  }}
                >
                  {item.startDate}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono')",
                    fontSize: '0.8rem',
                    color: '#64748b',
                    marginTop: '2px',
                  }}
                >
                  {item.endDate}
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#64748b',
                    fontSize: '0.78rem',
                    marginTop: '12px',
                  }}
                >
                  <MapPin size={12} color="#94a3b8" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Right Column: Sagar Gupta Style Education Card */}
              <div
                className="sagar-edu-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '24px 28px',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Top Row: Institution + Degree + CGPA Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Left: Logo Tile & Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: item.logoBg,
                        border: `1px solid ${item.logoBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: item.accentColor,
                        boxShadow: `0 4px 12px ${item.logoBg}`,
                      }}
                    >
                      <GraduationCap size={24} />
                    </div>

                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                          lineHeight: 1.25,
                        }}
                      >
                        {item.institution}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.96rem',
                          fontWeight: 600,
                          color: '#38bdf8',
                          margin: '4px 0 0',
                        }}
                      >
                        {item.degree}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#64748b',
                          fontSize: '0.82rem',
                          marginTop: '4px',
                        }}
                      >
                        <BookOpen size={13} color="#64748b" />
                        <span>{item.department}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Sagar Style CGPA / Grade Badge */}
                  {item.cgpa && (
                    <div
                      style={{
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.22)',
                        borderRadius: '12px',
                        padding: '6px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                      title={item.cgpaLabel}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono, 'JetBrains Mono')",
                          fontSize: '1.45rem',
                          fontWeight: 800,
                          color: '#38bdf8',
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {item.cgpa}
                      </span>
                      {item.cgpa !== 'M.S.' && (
                        <span style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          CGPA
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Coursework & Skills Chips */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '20px',
                  }}
                >
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: 'rgba(56, 189, 248, 0.06)',
                        border: '1px solid rgba(56, 189, 248, 0.18)',
                        color: '#bae6fd',
                        fontFamily: "var(--font-mono, 'JetBrains Mono')",
                        lineHeight: 1.3,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Collapsible Key Achievements Accordion */}
                {item.achievements && item.achievements.length > 0 && (
                  <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: isExpanded ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '8px 14px',
                        color: '#f8fafc',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'background 0.2s ease',
                      }}
                      aria-expanded={isExpanded}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trophy size={16} color="#f59e0b" />
                        <span>{item.achievements.length} key achievements</span>
                      </div>
                      {isExpanded ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
                    </button>

                    {isExpanded && (
                      <ul
                        style={{
                          margin: '12px 0 0',
                          paddingLeft: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        {item.achievements.map((ach, aIdx) => (
                          <li
                            key={aIdx}
                            style={{
                              fontSize: '0.86rem',
                              lineHeight: 1.6,
                              color: '#cbd5e1',
                            }}
                          >
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
