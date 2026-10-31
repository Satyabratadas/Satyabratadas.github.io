import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowDownRight } from 'lucide-react';

export default function NavBar({ isNavOpen, setIsNavOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ['home', 'about', 'education', 'experience', 'skills', 'hackathons', 'projects', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Hackathons', href: '#hackathons', id: 'hackathons' },
    { label: 'Projects', href: '#projects', id: 'projects' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '64px',
        backgroundColor: scrolled ? 'rgba(11, 16, 18, 0.92)' : 'rgba(11, 16, 18, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
      aria-label="Main Navigation"
    >
      <div
        className="sagar-nav-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          paddingLeft: 'clamp(16px, 4vw, 24px)',
          paddingRight: 'clamp(16px, 4vw, 24px)',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Logo mark */}
        <a
          href="#home"
          style={{
            height: '42px',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            color: '#ffffff',
            textDecoration: 'none',
            fontFamily: "var(--font-display, 'Bricolage Grotesque')",
            fontWeight: 700,
            fontSize: '0.95rem',
            transition: 'border-color 0.2s ease, background 0.2s ease',
          }}
          className="sagar-brand-btn"
          aria-label="Go to top"
        >
          <span style={{ color: '#38bdf8', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>&lt;</span>
          <span>Satyabrata</span>
          <span style={{ color: '#38bdf8', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>/&gt;</span>
        </a>

        {/* Desktop Links + Quick Palette + Contact Pill */}
        <div className="sagar-desktop-nav-cluster" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div className="sagar-desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`sagar-nav-link-item ${isActive ? 'is-active' : ''}`}
                  style={{
                    fontFamily: "var(--font-body, 'Inter')",
                    fontSize: '13.5px',
                    fontWeight: 500,
                    color: isActive ? '#ffffff' : '#9ca9b0',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        borderRadius: '1px',
                        background: '#38bdf8',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            className="btn-pill"
            style={{
              fontSize: '13px',
              minHeight: '38px',
              padding: '8px 18px',
              borderRadius: '8px',
              background: '#ffffff',
              color: '#0b1012',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
              transition: 'all 0.2s ease',
            }}
          >
            Contact Me
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="sagar-mobile-menu-btn"
          aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          {isNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown backdrop */}
      {isNavOpen && (
        <div
          onClick={() => setIsNavOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile dropdown */}
      {isNavOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: '#0e1418',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 999,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
            maxHeight: 'calc(100dvh - 72px)',
            overflowY: 'auto',
          }}
        >
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setIsNavOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 6px',
                color: '#f4f6f7',
                textDecoration: 'none',
                fontSize: '15.5px',
                fontWeight: 500,
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <span>{item.label}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#60a5fa' }}>
                {`0${index + 1} /`}
              </span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsNavOpen(false)}
            style={{
              marginTop: '10px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '14.5px',
              textDecoration: 'none',
            }}
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
}

