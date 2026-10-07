import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import AsciiRipple from './components/AsciiRipple'
import AuroraBackground from './components/AuroraBackground'
import { SKILL_LIST, TECH_STACK_CATEGORIES, SKILLS_DICT } from './data/skillsData'
import './App.css'

const DEFAULT_LEET_STATS = {
  totalSolved: 183,
  easySolved: 102,
  mediumSolved: 72,
  hardSolved: 9,
  ranking: 952407,
  totalQuestions: 4073,
  totalEasy: 969,
  totalMedium: 2124,
  totalHard: 980,
  loading: false,
}

const getInitialLeetStats = () => {
  try {
    const cached = localStorage.getItem('satyabrata_leetcode_stats')
    if (cached) {
      const parsed = JSON.parse(cached)
      if (parsed && typeof parsed.totalSolved === 'number') {
        return { ...DEFAULT_LEET_STATS, ...parsed, loading: false }
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_LEET_STATS
}

const formatRankShort = (ranking) => {
  if (!ranking) return '#952K'
  if (ranking >= 1000000) return `#${(ranking / 1000000).toFixed(1)}M`
  if (ranking >= 1000) return `#${Math.round(ranking / 1000)}K`
  return `#${ranking}`
}

const formatRankFull = (ranking) => {
  if (!ranking) return '#952,407'
  return `#${ranking.toLocaleString()}`
}

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [leetStats, setLeetStats] = useState(getInitialLeetStats)
  const [leetCodeImgError, setLeetCodeImgError] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)
  const [activeSkillName, setActiveSkillName] = useState('python')

  useEffect(() => {
    let isMounted = true

    const fetchLeetCodeData = async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 7000)

      try {
        const res = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/Satyabratadas10', {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (data && typeof data.totalSolved === 'number' && isMounted) {
          const updated = {
            totalSolved: data.totalSolved,
            easySolved: data.easySolved ?? 102,
            mediumSolved: data.mediumSolved ?? 72,
            hardSolved: data.hardSolved ?? 9,
            ranking: data.ranking ?? 952407,
            totalQuestions: data.totalQuestions ?? 4073,
            totalEasy: data.totalEasy ?? 969,
            totalMedium: data.totalMedium ?? 2124,
            totalHard: data.totalHard ?? 980,
            loading: false,
          }
          setLeetStats(updated)
          try {
            localStorage.setItem('satyabrata_leetcode_stats', JSON.stringify(updated))
          } catch {
            // ignore
          }
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          try {
            const fbRes = await fetch('https://alfa-leetcode-api.onrender.com/Satyabratadas10/solved')
            if (fbRes.ok) {
              const fbData = await fbRes.json()
              if (fbData && typeof fbData.solvedProblem === 'number' && isMounted) {
                setLeetStats((prev) => {
                  const updated = {
                    ...prev,
                    totalSolved: fbData.solvedProblem,
                    easySolved: fbData.easySolved ?? prev.easySolved,
                    mediumSolved: fbData.mediumSolved ?? prev.mediumSolved,
                    hardSolved: fbData.hardSolved ?? prev.hardSolved,
                  }
                  try {
                    localStorage.setItem('satyabrata_leetcode_stats', JSON.stringify(updated))
                  } catch {
                    // ignore
                  }
                  return updated
                })
              }
            }
          } catch {
            // retain fallback/cached stats
          }
        }
      } finally {
        clearTimeout(timeoutId)
      }
    }

    fetchLeetCodeData()

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLeetCodeData()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const intervalId = setInterval(fetchLeetCodeData, 5 * 60 * 1000)

    return () => {
      isMounted = false
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(intervalId)
    }
  }, [])

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleChipClick = (skillName) => {
    setActiveSkillName(skillName)
  }

  const handleChipHover = (skillName) => {
    if (activeSkillName !== skillName) {
      setActiveSkillName(skillName)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formState.email || !formState.message) return
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`)
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)
    window.open(`mailto:satyabratadas996@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setFormSent(true)
  }

  useEffect(() => {
    document.documentElement.classList.add('dark')
    try {
      localStorage.removeItem('portfolio_theme')
    } catch {
      // ignore
    }
  }, [])

  const heroRef = useRef(null)
  const headerRef = useRef(null)
  const aboutRef = useRef(null)
  const educationRef = useRef(null)
  const presentationRef = useRef(null)
  const skillsRef = useRef(null)
  const experienceRef = useRef(null)
  const hackathonsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const footerRef = useRef(null)

  const handleProjectImageError = (event) => {
    const frame = event.currentTarget.closest('.project-card-frame')
    event.currentTarget.style.display = 'none'
    frame?.querySelector('.project-card-placeholder')?.classList.add('visible')
  }

  useEffect(() => {
    // Check if anime is available
    if (typeof anime === 'undefined') {
      console.warn('animejs is not installed. Please run: npm install animejs')
      return
    }

    // Header animation
    anime({
      targets: '.logo',
      opacity: [0.8, 1],
      translateY: [-20, 0],
      duration: 800,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.nav a',
      opacity: [0.8, 1],
      translateY: [-15, 0],
      delay: anime.stagger(100, { start: 200 }),
      duration: 600,
      easing: 'easeOutExpo'
    })

    // Hero section animations
    anime({
      targets: '.hero-eyebrow',
      opacity: [0.8, 1],
      translateX: [-30, 0],
      duration: 800,
      delay: 300,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.accent-dot',
      scale: [0, 1.5, 1],
      opacity: [0.8, 1],
      duration: 600,
      delay: 800,
      easing: 'easeOutElastic(1, .8)'
    })

    anime({
      targets: '.hero-subtitle',
      opacity: [0.8, 1],
      translateX: [-30, 0],
      duration: 800,
      delay: 500,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.hero-title-inline',
      opacity: [0.8, 1],
      scale: [0.8, 1],
      duration: 900,
      delay: 700,
      easing: 'easeOutElastic(1, .6)'
    })

    anime({
      targets: '.hero-description',
      opacity: [0.8, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 900,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.btn',
      opacity: [0.8, 1],
      scale: [0.9, 1],
      delay: anime.stagger(150, { start: 1100 }),
      duration: 600,
      easing: 'easeOutElastic(1, .8)'
    })

    anime({
      targets: '.hero-tech-strip span',
      opacity: [0.8, 1],
      scale: [0, 1],
      delay: anime.stagger(80, { start: 1400 }),
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    })

    const handlePointerMove = (event) => {
      const x = `${(event.clientX / window.innerWidth) * 100}%`
      const y = `${(event.clientY / window.innerHeight) * 100}%`
      document.documentElement.style.setProperty('--pointer-x', x)
      document.documentElement.style.setProperty('--pointer-y', y)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    anime({
      targets: '.hero-metric',
      opacity: [0.8, 1],
      translateY: [18, 0],
      delay: anime.stagger(120, { start: 1250 }),
      duration: 700,
      easing: 'easeOutExpo'
    })

    // Hero portrait animation rising from the bottom
    anime({
      targets: '.hero-portrait-wrapper',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 900,
      delay: 500,
      easing: 'easeOutExpo'
    })

    // Scroll-triggered animations using Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    // Track which sections have been animated to prevent re-animation
    const animatedSections = new Set()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedSections.has(entry.target)) {
          animatedSections.add(entry.target)
          const target = entry.target

          // About section
          if (target.classList.contains('about')) {
            anime({
              targets: '.service',
              opacity: [0.8, 1],
              translateX: [-50, 0],
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.about-content h2, .about-lead-quote',
              opacity: [0.8, 1],
              translateY: [-20, 0],
              duration: 700,
              delay: 200,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.about-content > p',
              opacity: [0.8, 1],
              translateY: [20, 0],
              delay: anime.stagger(100, { start: 350 }),
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.about-skill-chip',
              opacity: [0.8, 1],
              scale: [0.85, 1],
              delay: anime.stagger(30, { start: 500 }),
              duration: 500,
              easing: 'easeOutBack'
            })

            anime({
              targets: '.stat',
              opacity: [0.8, 1],
              scale: [0.8, 1],
              delay: anime.stagger(100, { start: 650 }),
              duration: 600,
              easing: 'easeOutElastic(1, .8)'
            })
          }

          // Education section
          if (target.classList.contains('section') && target.id === 'education') {
            anime({
              targets: '.section-header',
              opacity: [0.8, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#education .info-card',
              opacity: [0.8, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              delay: anime.stagger(150, { start: 300 }),
              duration: 800,
              easing: 'easeOutElastic(1, .6)'
            })
          }

          // Presentation section
          if (target.id === 'presentation') {
            anime({
              targets: '#presentation .section-header',
              opacity: [0.8, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#presentation .info-card',
              opacity: [0.8, 1],
              translateX: [-50, 0],
              scale: [0.95, 1],
              duration: 800,
              delay: 300,
              easing: 'easeOutElastic(1, .6)'
            })
          }

          // Skills section
          if (target.id === 'skills') {
            anime({
              targets: '#skills .section-header',
              opacity: [0.8, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#skills .active-skill-spotlight',
              opacity: [0.8, 1],
              translateY: [-15, 0],
              duration: 600,
              delay: 150,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#skills .skills-grid .info-card',
              opacity: [0.8, 1],
              translateY: [25, 0],
              delay: anime.stagger(80, { start: 200 }),
              duration: 600,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#skills .leetcode-showcase-card',
              opacity: [0.8, 1],
              translateY: [25, 0],
              duration: 700,
              delay: 450,
              easing: 'easeOutExpo'
            })
          }

          // Experience section
          if (target.id === 'experience') {
            anime({
              targets: '#experience .section-header',
              opacity: [0.7, 1],
              translateY: [-24, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.timeline-marker',
              scale: [0, 1.25, 1],
              opacity: [0.5, 1],
              delay: anime.stagger(130, { start: 250 }),
              duration: 650,
              easing: 'easeOutElastic(1, .75)'
            })

            anime({
              targets: '.timeline-card',
              opacity: [0.7, 1],
              translateX: [-32, 0],
              scale: [0.97, 1],
              delay: anime.stagger(140, { start: 300 }),
              duration: 750,
              easing: 'easeOutCubic'
            })

            anime({
              targets: '.timeline-card li',
              opacity: [0.6, 1],
              translateX: [-14, 0],
              delay: anime.stagger(30, { start: 600 }),
              duration: 450,
              easing: 'easeOutQuad'
            })
          }

          // Hackathons section
          if (target.id === 'hackathons') {
            anime({
              targets: '#hackathons .section-header',
              opacity: [0.8, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#hackathons .info-card',
              opacity: [0.8, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              delay: anime.stagger(150, { start: 300 }),
              duration: 800,
              easing: 'easeOutElastic(1, .6)'
            })
          }

          // Projects section
          if (target.classList.contains('projects')) {
            anime({
              targets: '.projects h2',
              opacity: [0.8, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.project-card',
              opacity: [0.8, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              delay: anime.stagger(150, { start: 300 }),
              duration: 800,
              easing: 'easeOutElastic(1, .6)'
            })

            anime({
              targets: '.project-tags li',
              opacity: [0.8, 1],
              scale: [0, 1],
              delay: anime.stagger(40, { start: 800 }),
              duration: 400,
              easing: 'easeOutElastic(1, .5)'
            })
          }

          // Contact section
          if (target.classList.contains('contact')) {
            anime({
              targets: '.contact-header-wrapper h2',
              opacity: [0.8, 1],
              translateX: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.contact-subtitle',
              opacity: [0.8, 1],
              translateY: [20, 0],
              duration: 700,
              delay: 200,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.contact-highlight',
              opacity: [0.8, 1],
              scale: [0.95, 1],
              translateY: [30, 0],
              duration: 900,
              delay: 400,
              easing: 'easeOutElastic(1, .7)'
            })

            anime({
              targets: '.contact-info h3',
              opacity: [0.8, 1],
              translateX: [-20, 0],
              duration: 600,
              delay: 600,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.contact-location',
              opacity: [0.8, 1],
              translateX: [-20, 0],
              duration: 600,
              delay: 680,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.contact-link-primary, .contact-link',
              opacity: [0.8, 1],
              translateX: [-30, 0],
              scale: [0.95, 1],
              delay: anime.stagger(100, { start: 800 }),
              duration: 600,
              easing: 'easeOutElastic(1, .8)'
            })
          }

          // Footer
          if (target.classList.contains('portfolio-footer')) {
            anime({
              targets: '.portfolio-footer span',
              opacity: [0.8, 1],
              translateY: [20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            })
          }
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = [
      aboutRef.current,
      educationRef.current,
      presentationRef.current,
      skillsRef.current,
      experienceRef.current,
      hackathonsRef.current,
      projectsRef.current,
      contactRef.current,
      footerRef.current
    ]

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    // Button hover animations
    const buttonHandlers = []
    const buttons = document.querySelectorAll('.btn, .contact-link-primary, .contact-link')
    buttons.forEach((button) => {
      const handleEnter = () => {
        anime({
          targets: button,
          scale: 1.05,
          duration: 200,
          easing: 'easeOutQuad'
        })
      }
      const handleLeave = () => {
        anime({
          targets: button,
          scale: 1,
          duration: 200,
          easing: 'easeOutQuad'
        })
      }
      button.addEventListener('mouseenter', handleEnter)
      button.addEventListener('mouseleave', handleLeave)
      buttonHandlers.push({ element: button, enter: handleEnter, leave: handleLeave })
    })

    // Nav link hover animations
    const navHandlers = []
    const navLinks = document.querySelectorAll('.nav a')
    navLinks.forEach((link) => {
      const handleEnter = () => {
        anime({
          targets: link,
          translateY: -2,
          duration: 200,
          easing: 'easeOutQuad'
        })
      }
      const handleLeave = () => {
        anime({
          targets: link,
          translateY: 0,
          duration: 200,
          easing: 'easeOutQuad'
        })
      }
      link.addEventListener('mouseenter', handleEnter)
      link.addEventListener('mouseleave', handleLeave)
      navHandlers.push({ element: link, enter: handleEnter, leave: handleLeave })
    })

    // Card hover animations
    const cardHandlers = []
    const cards = document.querySelectorAll('.info-card, .project-card')
    cards.forEach((card) => {
      const handleEnter = () => {
        anime({
          targets: card,
          translateY: -5,
          scale: 1.02,
          duration: 300,
          easing: 'easeOutQuad'
        })
      }
      const handleLeave = () => {
        anime({
          targets: card,
          translateY: 0,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        })
      }
      card.addEventListener('mouseenter', handleEnter)
      card.addEventListener('mouseleave', handleLeave)
      cardHandlers.push({ element: card, enter: handleEnter, leave: handleLeave })
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      // Clean up button event listeners
      buttonHandlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter)
        element.removeEventListener('mouseleave', leave)
      })
      // Clean up nav event listeners
      navHandlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter)
        element.removeEventListener('mouseleave', leave)
      })
      // Clean up card event listeners
      cardHandlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter)
        element.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      const scrollToHash = () => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          window.scrollTo(0, el.offsetTop);
        }
      };
      scrollToHash();
      const timer = setTimeout(scrollToHash, 400);
      return () => clearTimeout(timer);
    }
  }, [])

  return (
    <>
      {/* Aurora Ambient Mesh & Perspective Grid */}
      <AuroraBackground />

      <div className="portfolio">
        <header className="portfolio-header" ref={headerRef}>
          <div className="logo">Satyabrata</div>
          <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
            <a href="#home" onClick={() => setIsNavOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsNavOpen(false)}>About</a>
            <a href="#education" onClick={() => setIsNavOpen(false)}>Education</a>
            <a href="#skills" onClick={() => setIsNavOpen(false)}>Skills</a>
            <a href="#experience" onClick={() => setIsNavOpen(false)}>Experience</a>
            <a href="#hackathons" onClick={() => setIsNavOpen(false)}>Hackathons</a>
            <a href="#projects" onClick={() => setIsNavOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setIsNavOpen(false)}>Contact</a>
          </nav>
          <div className="header-actions">
            <button
              className={`nav-menu ${isNavOpen ? 'nav-menu-open' : ''}`}
              aria-label="Toggle navigation menu"
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section id="home" className="hero" ref={heroRef}>
            <div className="hero-text">
              <p className="hero-eyebrow">Hi, I am</p>
              <h1 className="hero-name-heading">Satyabrata Das</h1>
              <p className="hero-subtitle-tagline">
                Computer Vision &amp; Machine Learning Engineer building AI systems that hold up outside the notebook — in real time, on real users, in messy real-world conditions.
              </p>
              
              <ul className="hero-credentials-list">
                <li>
                  <span className="hero-cred-role">Computer Vision Engineer</span>
                  <span className="hero-cred-sep">/</span>
                  <span className="hero-cred-org">evy.io</span>
                </li>
                <li>
                  <span className="hero-cred-role">Machine Learning Research Assistant</span>
                  <span className="hero-cred-sep">/</span>
                  <span className="hero-cred-org">University of Florida</span>
                </li>
                <li>
                  <span className="hero-cred-role">Software Engineer</span>
                  <span className="hero-cred-sep">/</span>
                  <span className="hero-cred-org">ARC Document Solutions</span>
                </li>
              </ul>

              <div className="hero-announcement-pill">
                <span className="pill-emoji">👋</span>
                <span>Available for Machine Learning &amp; Systems roles — <a href="mailto:satyabratadas996@gmail.com" className="pill-link">satyabratadas996@gmail.com</a></span>
              </div>

              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href="/Satyabrata_Software_engineer_resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="btn-icon">📄</span>
                  <span>Résumé</span>
                </a>
                <a
                  className="btn btn-outline"
                  href="mailto:satyabratadas996@gmail.com?subject=Project%20or%20Opportunity%20Inquiry"
                >
                  <span className="btn-icon">✉️</span>
                  <span>Get in touch</span>
                </a>
              </div>

              <div className="hero-social-row">
                <a
                  href="https://github.com/Satyabratadas"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-btn"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/satyabrata-lm10/"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-btn"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a
                  href="mailto:satyabratadas996@gmail.com"
                  className="hero-social-btn"
                  aria-label="Email Satyabrata"
                  title="Email"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>

            {/* Right side: Profile picture anchored from the bottom */}
            <div className="hero-portrait-wrapper" role="region" aria-label="Satyabrata Das profile photo">
              <div className="hero-portrait-ambient-glow" aria-hidden="true" />
              <div className="hero-portrait-frame">
                <img
                  src="/profile_pic.jpeg"
                  alt="Portrait of Satyabrata Das"
                  className="hero-portrait-img"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>

            <a className="scroll-cue" href="#about" aria-label="Scroll to About">
              <span />
            </a>
          </section>

          {/* About / Services Section */}
          <section id="about" className="about" ref={aboutRef}>
            <div className="about-grid">
              <div className="about-services">
                <div className="service">
                  <div className="service-icon">👁️</div>
                  <div className="service-content">
                    <h3>Computer Vision &amp; Gaze</h3>
                    <p>Real-time iris/pupil tracking, gaze estimation, and blink anomaly detection across edge webcam hardware.</p>
                  </div>
                </div>
                <div className="service">
                  <div className="service-icon">⚡</div>
                  <div className="service-content">
                    <h3>Production ML &amp; MLOps</h3>
                    <p>PyTorch pipelines, sub-1.4s model serving, Dockerized FastAPI backends, and Prometheus/Grafana telemetry.</p>
                  </div>
                </div>
                <div className="service">
                  <div className="service-icon">🌐</div>
                  <div className="service-content">
                    <h3>Scalable Real-Time Systems</h3>
                    <p>WebSocket sync for 20,000+ active users, 10M+ records/day ETL pipelines, and resilient distributed architecture.</p>
                  </div>
                </div>

                <div className="about-skills-block">
                  <span className="about-skills-title">Core Skills</span>
                  <div className="about-skills-chips">
                    {[
                      'Python',
                      'PyTorch',
                      'TensorFlow',
                      'OpenCV',
                      'MediaPipe',
                      'YOLO',
                      'Deep Learning',
                      'Convolutional Neural Networks',
                      'Transformers',
                      'NLP',
                      'Large Language Models',
                      'Gaze Estimation',
                      'Pose Estimation',
                      'Model Deployment',
                      'Production Deployment',
                      'MLOps',
                      'Problem Solving',
                      'Data Structures & Algorithms',
                      'FastAPI',
                      'Docker',
                      'SQL',
                      'Git'
                    ].map((skill) => (
                      <span key={skill} className="about-skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="about-content">
                <h2>About me</h2>
                <div className="about-lead-quote">
                  <p className="about-lead-text">
                    Computer Vision &amp; Machine Learning Engineer building AI systems that hold up outside the notebook — in real time, on real users, in messy real-world conditions.
                  </p>
                </div>

                <p>
                  I&apos;m completing my M.S. in AI Systems at the University of Florida while working as a Computer Vision Engineer at Evy, where I build real-time eye tracking and behavioral analysis for AI-powered interview monitoring. My work covers MediaPipe Iris-based iris and pupil tracking, gaze estimation, blink detection, and behavioral anomaly detection — running in real time across varied lighting conditions, webcam hardware, and user environments.
                </p>
                <p>
                  Before moving into AI, I spent 2+ years as a Software Engineer at ARC Document Solutions. There I engineered a real-time WebSocket sync layer for a product with 20,000+ monthly active users, reduced collaboration latency by 25%, integrated five payment gateways to cut failed transactions by 15%, and shipped iOS features that lifted order conversion by 10%. Earlier, I built Python and SSIS ETL pipelines processing 10M+ records per day at 99%+ accuracy, eliminating 20 hours of manual operations per week.
                </p>
                {/* <p>
                  That production background shapes how I build ML: I care as much about latency, monitoring, and deployment as about model accuracy. Two recent projects reflect that — <a href="#hackathons" className="about-inline-link">JuggleIQ</a>, a YOLO and MediaPipe soccer analytics pipeline generating 1,000+ frame-level inferences per session, and <a href="#projects" className="about-inline-link">SummarIQ</a>, a T5/BART research-paper summarizer serving predictions at under 1.4s average latency with Prometheus and Grafana instrumentation.
                </p> */}

                <div className="about-stats">
                  <div className="stat">
                    <span className="stat-number">20,000+</span>
                    <span className="stat-label">Monthly active users supported</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">10M+</span>
                    <span className="stat-label">Daily records processed (ETL)</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">25%</span>
                    <span className="stat-label">Collaboration latency reduced</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">2+</span>
                    <span className="stat-label">Years production engineering</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Education Section */}
        <section id="education" className="section" ref={educationRef}>
          <div className="section-header">
            <h2>Education</h2>
            <p className="section-subtitle">
              Currently focused on AI systems, robustness, and applied deep learning.
            </p>
          </div>

          <div className="cards-grid">
            <article className="info-card">
              <div className="info-card-top">
                <h3>University of Florida</h3>
                <span className="pill">Aug 2025 – May 2027 </span>
              </div>
              <p className="muted">M.S. in Artificial Intelligence Systems · Gainesville, FL</p>
              <ul className="bullets">
                <li>AI Safety &amp; Robustness, AI Systems, Machine Learning for AI</li>
                <li>Image Processing &amp; Computer Vision, Applied Deep Learning</li>
              </ul>
            </article>

            <article className="info-card">
              <div className="info-card-top">
                <h3>Guru Nanak Institute of Technology (MAKUT)</h3>
                <span className="pill">Aug 2018 – Jun 2022</span>
              </div>
              <p className="muted">B.Tech in Computer Science · India · CGPA: 8.64 / 10</p>
              <ul className="bullets">
                <li>Core CS foundations: Data Structures, Algorithms, OOP, Git</li>
              </ul>
            </article>
          </div>
        </section>

        {/* Academic Presentation Section */}
        <section id="presentation" className="section" ref={presentationRef}>
          <div className="section-header">
            <h2>Academic presentation</h2>
            <p className="section-subtitle">
              Sharing applied AI/ML work with faculty and peers at UF.
            </p>
          </div>

          <article className="info-card">
            <div className="info-card-top">
              <h3>Poster Presentation — AI/ML Course Project</h3>
              <span className="pill">University of Florida</span>
            </div>
            <p className="muted">
              Presented an AI/ML coursework project, covering end‑to‑end problem formulation,
              model design, and evaluation.
            </p>
            <ul className="bullets">
              <li>Delivered a formal poster presentation of an AI/ML project, articulating the problem formulation, model design, evaluation metrics, and results to faculty and peers.</li>
            </ul>
          </article>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section" ref={skillsRef}>
          <div className="section-header">
            <h2>Tech Stack</h2>
            <p className="section-subtitle">Core languages, backend architectures, cloud databases &amp; machine learning</p>
          </div>

          {/* Interactive Skill Spotlight */}
          {SKILLS_DICT[activeSkillName] && (
            <div className="active-skill-spotlight" role="region" aria-label="Selected skill details">
              <div className="active-skill-spotlight-content">
                {SKILLS_DICT[activeSkillName].icon && (
                  <div
                    className="active-skill-icon-wrapper"
                    style={{ borderColor: SKILLS_DICT[activeSkillName].color || 'var(--primary)' }}
                  >
                    <img
                      src={SKILLS_DICT[activeSkillName].icon}
                      alt=""
                      className="active-skill-spotlight-icon"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="active-skill-info">
                  <div className="active-skill-title-row">
                    <h3>{SKILLS_DICT[activeSkillName].label}</h3>
                    <span className="active-skill-category-badge">{SKILLS_DICT[activeSkillName].category}</span>
                  </div>
                  <p className="active-skill-description">{SKILLS_DICT[activeSkillName].shortDescription}</p>
                </div>
              </div>
            </div>
          )}

          <div className="skills-grid skills-five-grid">
            {TECH_STACK_CATEGORIES.map((cat) => (
              <article key={cat.title} className="info-card skill-category-card">
                <h3>{cat.title}</h3>
                <div className="chips">
                  {cat.skills.map((skill) => {
                    const isActive = activeSkillName === skill.name
                    const skillData = SKILLS_DICT[skill.name]
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        className={`chip interactive-chip ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleChipClick(skill.name)}
                        onMouseEnter={() => handleChipHover(skill.name)}
                        title={skillData?.shortDescription || skill.label}
                        aria-label={`Select skill ${skill.label}`}
                      >
                        {skillData?.icon && (
                          <img
                            src={skillData.icon}
                            alt=""
                            className="chip-icon"
                            aria-hidden="true"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        <span>{skill.label}</span>
                      </button>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>

          {/* LeetCode & Problem Solving Activity Showcase */}
          <div className="leetcode-showcase-container">
            <article className="leetcode-showcase-card">
              <div className="leetcode-card-header">
                <div className="leetcode-header-left">
                  <span className="leetcode-icon-badge" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                    </svg>
                  </span>
                  <div>
                    <div className="leetcode-title-row">
                      <h3>Problem Solving &amp; Algorithmic Puzzles</h3>
                      <span className="pill leetcode-sync-pill" title="Live synchronized with LeetCode">
                        <span className="sync-dot"></span>
                        LeetCode Live
                      </span>
                    </div>
                    <p className="muted">Data structures &middot; Algorithmic patterns &middot; 52-week consistency</p>
                  </div>
                </div>
                <a
                  href="https://leetcode.com/u/Satyabratadas10/"
                  target="_blank"
                  rel="noreferrer"
                  className="leetcode-view-btn"
                  aria-label="View Satyabratadas10 on LeetCode"
                >
                  <span>View LeetCode Profile</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>

              <div className="leetcode-card-body">
                <div className="leetcode-metrics-grid">
                  <div className="leetcode-metric-box">
                    <span className="metric-num total">{leetStats.totalSolved}</span>
                    <span className="metric-label">Problems Solved</span>
                  </div>
                  <div className="leetcode-metric-box">
                    <span className="metric-num easy">{leetStats.easySolved}</span>
                    <span className="metric-label">Easy</span>
                  </div>
                  <div className="leetcode-metric-box">
                    <span className="metric-num medium">{leetStats.mediumSolved}</span>
                    <span className="metric-label">Medium</span>
                  </div>
                  <div className="leetcode-metric-box">
                    <span className="metric-num hard">{leetStats.hardSolved}</span>
                    <span className="metric-label">Hard</span>
                  </div>
                  <div className="leetcode-metric-box ranking" title={`LeetCode Global Rank: ${formatRankFull(leetStats.ranking)}`}>
                    <span className="metric-num rank">{formatRankShort(leetStats.ranking)}</span>
                    <span className="metric-label">Global Rank</span>
                  </div>
                </div>

                <div className="leetcode-heatmap-preview">
                  <a
                    href="https://leetcode.com/u/Satyabratadas10/"
                    target="_blank"
                    rel="noreferrer"
                    className="leetcode-svg-link"
                    title="Open Satyabrata Das on LeetCode"
                  >
                    {!leetCodeImgError ? (
                      <img
                        src="https://leetcard.jacoblin.cool/Satyabratadas10?theme=dark&font=source_code_pro&ext=heatmap"
                        alt="Satyabrata Das LeetCode Stats and 52-Week Activity Heatmap"
                        className="leetcode-stats-svg"
                        loading="lazy"
                        onError={() => setLeetCodeImgError(true)}
                      />
                    ) : (
                      <div className="leetcode-fallback-card">
                        <div className="leetcode-fallback-header">
                          <div className="leetcode-fallback-user">
                            <span className="leetcode-fallback-icon">⚡</span>
                            <strong>Satyabratadas10</strong>
                          </div>
                          <span className="leetcode-fallback-rank">{formatRankFull(leetStats.ranking)}</span>
                        </div>
                        <div className="leetcode-fallback-circle-row">
                          <div className="leetcode-circle-stat">
                            <span className="circle-num">{leetStats.totalSolved}</span>
                            <span className="circle-sub">Solved</span>
                          </div>
                          <div className="leetcode-breakdown-bars">
                            <div className="bar-row">
                              <span className="bar-label easy">Easy</span>
                              <div className="bar-track">
                                <div
                                  className="bar-fill easy"
                                  style={{ width: `${Math.min(100, (leetStats.easySolved / (leetStats.totalEasy || 969)) * 100).toFixed(1)}%` }}
                                ></div>
                              </div>
                              <span className="bar-val">{leetStats.easySolved} / {leetStats.totalEasy || 969}</span>
                            </div>
                            <div className="bar-row">
                              <span className="bar-label medium">Medium</span>
                              <div className="bar-track">
                                <div
                                  className="bar-fill medium"
                                  style={{ width: `${Math.min(100, (leetStats.mediumSolved / (leetStats.totalMedium || 2124)) * 100).toFixed(1)}%` }}
                                ></div>
                              </div>
                              <span className="bar-val">{leetStats.mediumSolved} / {leetStats.totalMedium || 2124}</span>
                            </div>
                            <div className="bar-row">
                              <span className="bar-label hard">Hard</span>
                              <div className="bar-track">
                                <div
                                  className="bar-fill hard"
                                  style={{ width: `${Math.min(100, (leetStats.hardSolved / (leetStats.totalHard || 980)) * 100).toFixed(1)}%` }}
                                ></div>
                              </div>
                              <span className="bar-val">{leetStats.hardSolved} / {leetStats.totalHard || 980}</span>
                            </div>
                          </div>
                        </div>
                        <p className="leetcode-fallback-note">52-week streak &middot; Click to view profile on LeetCode &rarr;</p>
                      </div>
                    )}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section" ref={experienceRef}>
          <div className="section-header">
            <h2>Work experience</h2>
            <p className="section-subtitle">
              Computer vision, ML research, full-stack engineering, and production systems experience.
            </p>
          </div>

          <div className="timeline">
            <article className="timeline-item is-current">
              <div className="timeline-marker" />
              <div className="timeline-card" onMouseMove={handleCardMouseMove}>
                <div className="timeline-top">
                  <div className="timeline-title-wrap">
                    <a
                      href="https://evy.io/"
                      target="_blank"
                      rel="noreferrer"
                      className="timeline-company-title-link"
                      title="Visit evy.io"
                    >
                      <h3>evy.io</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="timeline-external-icon">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                    <span className="live-status-badge">
                      <span className="live-status-ping"></span>
                      Current Role
                    </span>
                  </div>
                  <span className="pill">May 2026 – Present · Part-time · Florida, USA · Remote</span>
                </div>
                <p className="muted">Computer Vision Engineer · Machine Learning</p>
                <ul className="bullets">
                  <li>
                    Build real-time eye tracking, iris detection, and blink detection for AI interview monitoring
                    using Python, OpenCV, and MediaPipe, sustaining <strong>40 FPS</strong> real-time inference on standard
                    consumer webcams.
                  </li>
                  <li>
                    Improve gaze estimation accuracy and model robustness under glasses glare, off-axis head pose,
                    and low-light conditions through calibration validation and adaptive thresholding, validated
                    across <strong>50+</strong> test configurations.
                  </li>
                  <li>
                    Develop deep learning anomaly detection models in PyTorch and TensorFlow that classify behavioral
                    patterns from three signal streams: gaze direction, iris movement, and blink cadence.
                  </li>
                  <li>
                    Engineer browser-based model inference and deployment pipelines for real-time gaze tracking,
                    holding frame-rate performance on lower-end consumer hardware without degrading accuracy.
                  </li>
                  <li>
                    Own the eye-tracking system end to end alongside the founding team, from prototype through
                    evaluation to the first production release.
                  </li>
                </ul>
                <div className="timeline-actions">
                  <a
                    href="https://evy.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="timeline-link-pill"
                    aria-label="Visit evy.io website"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Visit evy.io
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', opacity: 0.8 }}>
                      <path d="M7 17l9.2-9.2M17 17V8H8" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card" onMouseMove={handleCardMouseMove}>
                <div className="timeline-top">
                  <h3>University of Florida</h3>
                  <span className="pill">Mar 2026 – May 2026 · Part-time · Florida, USA · On-site</span>
                </div>
                <p className="muted">Machine Learning Research Assistant</p>
                <ul className="bullets">
                  <li>
                    Developed video-based kinematic analysis pipelines for Parkinson&apos;s disease assessment using
                    MediaPipe 3D pose estimation, processing <strong>1,000+</strong> clinical movement recordings.
                  </li>
                  <li>
                    Engineered biomechanical feature extraction from clinical movement recordings, computing joint
                    angles, angular velocity, movement timing, and left-right symmetry metrics for downstream modeling.
                  </li>
                  <li>
                    Trained regression models mapping extracted movement features to clinician-rated severity scores,
                    automating a step previously done by manual video review.
                  </li>
                  <li>
                    Delivered a documented, reproducible codebase to the research group, enabling continued analysis
                    after the assignment ended.
                  </li>
                </ul>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card" onMouseMove={handleCardMouseMove}>
                <div className="timeline-top">
                  <h3>SouthEnd Psychiatry</h3>
                  <span className="pill">Sep 2024 – Aug 2025 · Contract · Bronx, NY · Remote</span>
                </div>
                <p className="muted">IT &amp; Operations Contractor</p>
                <ul className="bullets">
                  <li>
                    Administered EHR and practice-management systems for a telehealth psychiatry group, supporting
                    <strong>20</strong> clinicians and <strong>10,000+</strong> patient records under strict HIPAA
                    confidentiality requirements.
                  </li>
                  <li>
                    Processed patient intake, scheduling, and insurance workflows for <strong>5,000+</strong> appointments
                    per month, reducing scheduling conflicts by <strong>25%</strong>.
                  </li>
                  <li>
                    Resolved <strong>2,000+</strong> IT support requests per month across telehealth and EHR platforms,
                    cutting average resolution time by <strong>20%</strong>.
                  </li>
                  <li>
                    Automated intake data reconciliation with Python scripting, eliminating <strong>30 hours</strong> of
                    manual entry per week.
                  </li>
                </ul>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card" onMouseMove={handleCardMouseMove}>
                <div className="timeline-top">
                  <h3>ARC Document Solutions</h3>
                  <span className="pill">Jul 2022 – Sep 2024 · Full-time · Kolkata, India · On-site</span>
                </div>
                <p className="muted">Software Engineer</p>
                <ul className="bullets">
                  <li>
                    Engineered a real-time WebSocket sync layer for ARC Facilities (<strong>20K+</strong> monthly active
                    users), cutting collaboration latency by <strong>25%</strong> and reducing support tickets
                    ~<strong>30%</strong> quarter over quarter.
                  </li>
                  <li>
                    Integrated <strong>5</strong> payment gateways (Razorpay, Paytm, Cashfree, Braintree, Elavon) plus
                    reCAPTCHA into ARC Print, reducing failed transactions by <strong>15%</strong>.
                  </li>
                  <li>
                    Redesigned the Managed Print Services UI and built a SwiftUI filter interface, increasing order
                    conversion by <strong>10%</strong>.
                  </li>
                  <li>
                    Rebuilt the data and concurrency layer with Core Data and GCD multithreading, cutting app load time
                    by <strong>30%</strong> and eliminating UI freezes flagged in QA.
                  </li>
                  <li>
                    Conducted R&amp;D on WPA, WPA2, and WPA3 Wi-Fi security protocols, evaluating authentication and
                    encryption trade-offs to strengthen device protection across enterprise deployments.
                  </li>
                </ul>
                <div className="timeline-actions">
                  <a
                    href="https://apps.apple.com/in/app/arc-facilities-premier/id6739283887"
                    target="_blank"
                    rel="noreferrer"
                    className="timeline-link-pill"
                    aria-label="View ARC Facilities on Apple App Store"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.09.65-2.73 1.4-.56.65-.99 1.7-1.02 2.76 1.07.08 2.14-.54 2.74-1.29z"/>
                    </svg>
                    ARC Facilities on App Store
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/arc-print/id1452827125"
                    target="_blank"
                    rel="noreferrer"
                    className="timeline-link-pill"
                    aria-label="View ARC Print on Apple App Store"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.09.65-2.73 1.4-.56.65-.99 1.7-1.02 2.76 1.07.08 2.14-.54 2.74-1.29z"/>
                    </svg>
                    ARC Print on App Store
                  </a>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card" onMouseMove={handleCardMouseMove}>
                <div className="timeline-top">
                  <h3>ARC Document Solutions</h3>
                  <span className="pill">Jan 2022 – Jun 2022 · Internship · Kolkata, India · On-site</span>
                </div>
                <p className="muted">Intern</p>
                <ul className="bullets">
                  <li>
                    Contributed to iOS application development and software engineering under senior engineers,
                    utilizing Object-Oriented Programming (OOP), Swift, and GitHub version control.
                  </li>
                </ul>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card" onMouseMove={handleCardMouseMove}>
                <div className="timeline-top">
                  <h3>SCI-BI</h3>
                  <span className="pill">Jul 2021 – Dec 2021 · Internship · Chennai, India · Remote</span>
                </div>
                <p className="muted">Software Trainee</p>
                <ul className="bullets">
                  <li>
                    Built Python and SSIS ETL pipelines for the Mahindra Finance project, processing
                    <strong>10M+</strong> records daily at <strong>99%+</strong> accuracy.
                  </li>
                  <li>
                    Automated ingestion workflows that eliminated <strong>20 hours</strong> of manual operations per week,
                    freeing the analyst team to focus on insights over data entry.
                  </li>
                  <li>
                    Optimized SQL queries and data transformations, reducing report generation time by
                    <strong>40%</strong> for BI stakeholders.
                  </li>
                  <li>
                    Partnered with the BI team to validate reliability across financial datasets, reducing pipeline
                    failures by <strong>25%</strong>.
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Hackathons Section */}
        <section id="hackathons" className="section" ref={hackathonsRef}>
          <div className="section-header">
            <h2>Hackathons</h2>
            <p className="section-subtitle">
              Recent ML/CV and data-focused hackathons where I shipped under tight deadlines.
            </p>
          </div>

          <div className="cards-grid">
            <article className="info-card">
              <div className="info-card-top">
                <div className="project-card-title-row">
                  <h3>ShellHacks 2026 — Bend With Us</h3>
                  <div className="project-card-actions">
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://devpost.com/software/bend-with-us"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View Bend With Us on Devpost"
                        onClick={(e) => e.currentTarget.blur()}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View on Devpost</span>
                    </div>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://github.com/AIForge10/RehabBuddy"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View RehabBuddy on GitHub"
                        onClick={(e) => e.currentTarget.blur()}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View on GitHub</span>
                    </div>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://bendwith.us/welcome"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View Bend With Us Live App"
                        onClick={(e) => e.currentTarget.blur()}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View Live App</span>
                    </div>
                  </div>
                </div>
                <span className="pill">36h ML/HealthTech · Participant</span>
              </div>
              <p className="muted">Florida International University · Miami, FL</p>
              <ul className="bullets">
                <li>
                  Built an AI physical therapy platform tracking real-time joint angles and rep counts using on-device MediaPipe Pose, with bilingual audio coaching via ElevenLabs.
                </li>
                <li>
                  Architected the FastAPI backend with WebSockets/SSE for live therapist telemetry, TimescaleDB hypertables (11:1 compression), and Gemini-driven plan suggestions.
                </li>
              </ul>
            </article>

            <article className="info-card">
              <div className="info-card-top">
                <div className="project-card-title-row">
                  <h3>Hacklytics 2026 — JuggleIQ</h3>
                  <div className="project-card-actions">
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://devpost.com/software/juggleiq"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View JuggleIQ on Devpost"
                        onClick={(e) => e.currentTarget.blur()}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View on Devpost</span>
                    </div>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://github.com/SportsAnalytics10/JuggleIQ"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View JuggleIQ on GitHub"
                        onClick={(e) => e.currentTarget.blur()}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View on GitHub</span>
                    </div>
                  </div>
                </div>
                <span className="pill">48-hour ML/CV hackathon · Participant</span>
              </div>
              <p className="muted">Data Science @ Georgia Tech · Atlanta, GA</p>
              <ul className="bullets">
                <li>
                  Built JuggleIQ, a computer vision tool that analyzes soccer juggling technique using YOLO,
                  MediaPipe, and Kalman filtering for real-time ball tracking and feedback.
                </li>
                <li>
                  Led backend ML/CV pipeline development and collaborated in a 4-person team to deliver a working
                  prototype within 48 hours.
                </li>
              </ul>
            </article>

            <article className="info-card">
              <div className="info-card-top">
                <div className="project-card-title-row">
                  <h3>NASA GeoEMERGE Data Hackathon</h3>
                  <div className="project-card-actions">
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://devpost.com/software/placeholder-gzdnxm"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View NASA GeoEMERGE project on Devpost"
                        onClick={(e) => e.currentTarget.blur()}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View on Devpost</span>
                    </div>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://github.com/Satyabratadas/GeoEmerge_hackathon"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View GeoEMERGE on GitHub"
                        onClick={(e) => e.currentTarget.blur()}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View on GitHub</span>
                    </div>
                  </div>
                </div>
                <span className="pill">Intermediate Track – Data Analysis Recognition · Winner</span>
              </div>
              <p className="muted">Marston Science Library @ University of Florida · Gainesville, FL</p>
              <ul className="bullets">
                <li>
                  Analyzed bias, missing data, and contributor behavior in mosquito habitat observations from the
                  GLOBE Observer platform to understand impacts on downstream ML.
                </li>
                <li>
                  Highlighted how spatial imbalance and incomplete environmental context affect public-health
                  insights, and proposed improvements to data collection workflows.
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects" ref={projectsRef}>
          <h2>Projects</h2>
            <div className="projects-grid">
              {/* <article className="project-card">
                <div className="project-card-image">
                  <div className="project-card-frame">
                    <img src="/Project_images/arc_facilities.png" alt="ARC Facilities" />
                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">🏢</span>
                      <span>iOS · Realtime</span>
                    </div>
                  </div>
                </div>

                  <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>ARC Facilities</h3>
                    <a
                      href="https://apps.apple.com/in/app/arc-facilities-premier/id6739283887"
                      target="_blank"
                      rel="noreferrer"
                      className="project-info-icon"
                      aria-label="More about ARC Facilities"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </a>
                  </div>

                  <p className="project-meta">
                  iOS · WebSockets · QR · APIs
                  </p>

                  <p>
                    Enterprise iOS app enabling real-time collaboration through WebSocket-based changesets,
                    QR code workflows, and API integrations to streamline facility document access.
                  </p>

                  <ul className="project-tags">
                    <li>Swift</li>
                    <li>UIKit / SwiftUI</li>
                    <li>WebSockets</li>
                    <li>REST APIs</li>
                    <li>QR Code</li>
                    <li>Core Data</li>
                    <li>Multithreading</li>
                    <li>Secure App Development</li>
                  </ul>
                </div>
              </article> */}
              <article className="project-card arc-affiliated">
                <div className="project-card-image">
                  <div className="project-card-frame project-card-frame--logo">
                    {/* <img
                      src="/Project_images/arc_facilities.png"
                      alt="ARC Facilities"
                      className="project-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.add("visible");
                      }}
                    /> */}
                     {/* check this one  */}
                    {/* <img
                      src="/Project_images/arc_facilities.png"
                      alt="ARC Facilities"
                      className="project-card-img project-card-img--logo"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.add("visible");
                      }}
                    /> */}

                    <img
                      src="/Project_images/arc_facilities.png"
                      alt="ARC Facilities"
                      className="project-card-img project-card-img--logo"
                      loading="lazy"
                      onError={handleProjectImageError}
                    />

                    {/* ✅ Hover Pill (shows only on hover) */}
                    <span className="affiliation-pill">Affiliated to ARC Document Solutions</span>

                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">🏢</span>
                      <span>iOS · Realtime</span>
                    </div>
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>ARC Facilities</h3>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://apps.apple.com/in/app/arc-facilities-premier/id6739283887"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View ARC Facilities on the App Store"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View project on App Store</span>
                    </div>
                  </div>

                  <p className="project-meta">ARC Document Solutions · iOS · WebSockets · QR · APIs</p>

                  <p>
                    Enterprise iOS app enabling real-time collaboration through WebSocket-based changesets,
                    QR code workflows, and API integrations to streamline facility document access.
                  </p>

                  <ul className="project-tags">
                    <li>Swift</li>
                    <li>UIKit / SwiftUI</li>
                    <li>WebSockets</li>
                    <li>REST APIs</li>
                    <li>QR Code</li>
                    <li>Core Data</li>
                    <li>Multithreading</li>
                    <li>Secure App Development</li>
                  </ul>
                </div>
              </article>

              {/* <article className="project-card">
                <div className="project-card-image">
                  <div className="project-card-frame">
                    <img src="/Project_images/arc_print.png" alt="ARC Print" />
                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">🛒</span>
                      <span>Payments · iOS</span>
                    </div>
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>ARC Print</h3>
                    <a
                      href="https://apps.apple.com/in/app/arc-print/id1452827125"
                      target="_blank"
                      rel="noreferrer"
                      className="project-info-icon"
                      aria-label="More about ARC Print"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </a>
                  </div>

                  <p className="project-meta">
                    E-commerce · Payments · reCAPTCHA · SwiftUI
                  </p>

                  <p>
                    Production iOS e-commerce experience with payment gateway integrations and bot protection,
                    plus MPS UI improvements and SwiftUI filters to boost checkout reliability and conversions.
                  </p>

                  <ul className="project-tags">
                    <li>Swift</li>
                    <li>SwiftUI</li>
                    <li>Payment Gateways</li>
                    <li>Razorpay</li>
                    <li>Paytm</li>
                    <li>Cashfree</li>
                    <li>Braintree</li>
                    <li>reCAPTCHA</li>
                  </ul>
                </div>
              </article> */}

              <article className="project-card arc-affiliated">
                <div className="project-card-image">
                  <div className="project-card-frame project-card-frame--logo">
                    <img
                      src="/Project_images/arc_print.png"
                      alt="ARC Print"
                      className="project-card-img project-card-img--logo"
                      loading="lazy"
                      onError={handleProjectImageError}
                    />

                    {/* Hover pill */}
                    <span className="affiliation-pill">Affiliated to ARC Document Solutions</span>

                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">🛒</span>
                      <span>Payments · iOS</span>
                    </div>
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>ARC Print</h3>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://apps.apple.com/in/app/arc-print/id1452827125"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View ARC Print on the App Store"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View project on App Store</span>
                    </div>
                  </div>

                  <p className="project-meta">
                    ARC Document Solutions · iOS · Payments · reCAPTCHA · SwiftUI
                  </p>

                  <p>
                    Production iOS e-commerce experience with payment gateway integrations and bot protection,
                    plus MPS UI improvements and SwiftUI filters to boost checkout reliability and conversions.
                  </p>

                  <ul className="project-tags">
                    <li>Swift</li>
                    <li>SwiftUI</li>
                    <li>Payment Gateways</li>
                    <li>Razorpay</li>
                    <li>Paytm</li>
                    <li>Cashfree</li>
                    <li>Braintree</li>
                    <li>reCAPTCHA</li>
                  </ul>
                </div>
              </article>




              <article className="project-card">
                <div className="project-card-image">
                  <div className="project-card-frame">
                    <img
                      src="/Project_images/intelligent-bistro.png"
                      alt="Intelligent Bistro"
                      className="project-card-img"
                      loading="lazy"
                      onError={handleProjectImageError}
                    />
                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">🍽️</span>
                      <span>React Native · Gemini AI</span>
                    </div>
                  </div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>Intelligent Bistro</h3>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://github.com/Satyabratadas/intelligent-bistro"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View Intelligent Bistro on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View project on GitHub</span>
                    </div>
                  </div>
                  <p className="project-meta">AI-Powered Restaurant Ordering · React Native (Expo) · Node.js</p>
                  <p>
                    Full-stack mobile restaurant app where users browse categorized menus, manage a shopping cart, and place orders
                    through natural-language AI chat. Expo React Native frontend with Zustand state management; Node.js/Express backend
                    uses Google Gemini to parse requests like &quot;Add two spicy chicken sandwiches and one lemonade&quot; into structured
                    JSON cart actions (add, remove, clear) with rule-based fallback for reliability.
                  </p>
                  <ul className="project-tags">
                    <li>React Native</li>
                    <li>Expo</li>
                    <li>TypeScript</li>
                    <li>Zustand</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>Google Gemini API</li>
                    <li>Conversational Commerce</li>
                    <li>REST APIs</li>
                  </ul>
                </div>
              </article>

              <article className="project-card">
                <div className="project-card-image">
                  <div className="project-card-frame">
                    <img
                      src="/Project_images/SummarIQ.png"
                      alt="SummarIQ"
                      className="project-card-img"
                      loading="lazy"
                      onError={handleProjectImageError}
                    />
                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">Σ</span>
                      <span>NLP · Summarization</span>
                    </div>
                  </div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>SummarIQ</h3>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://github.com/Satyabratadas/SummarIQ"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View project on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View project on GitHub</span>
                    </div>
                  </div>
                  <p className="project-meta">Math-Aware Research Paper Summarizer</p>
                  <p>
                    LaTeX-aware scientific paper summarization system using T5/BART to generate section-wise summaries and equation
                    explanations. FastAPI backend with Dockerized services achieving sub-1.4s response latency, with Prometheus/Grafana
                    for monitoring. Custom LaTeX extraction pipeline over 200+ research papers with over 92% accuracy on equations,
                    figures, and tables.
                  </p>
                  <ul className="project-tags">
                    <li>NLP</li>
                    <li>Transformers</li>
                    <li>T5/BART</li>
                    <li>Scientific Document Processing</li>
                    <li>FastAPI</li>
                    <li>Docker</li>
                    <li>Prometheus/Grafana</li>
                    <li>Model Monitoring</li>
                  </ul>
                </div>
              </article>

              <article className="project-card">
                <div className="project-card-image">
                  <div className="project-card-frame project-card-frame--logo">
                    <img
                      src="/Project_images/Ship_detection.png"
                      alt="ShipSight AI"
                      className="project-card-img project-card-img--logo"
                      loading="lazy"
                      onError={handleProjectImageError}
                    />
                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">🛰️</span>
                      <span>ML · Satellite CV</span>
                    </div>
                  </div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>ShipSight AI</h3>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://github.com/Satyabratadas/Ship_Detection_Using_Satellite_Images"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View ship detection project on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View project on GitHub</span>
                    </div>
                  </div>
                  <p className="project-meta">Ship Detection using Satellite Images</p>
                  <p>
                    Ship detection pipeline on satellite imagery using Logistic Regression, Random Forest, and Linear SVM, comparing
                    performance with and without dimensionality reduction (PCA, Isomap, LLE). The best model (Random Forest + Isomap)
                    is used for scene-level ship localization and visual analysis.
                  </p>
                  <ul className="project-tags">
                    <li>Satellite Images</li>
                    <li>Ship Detection</li>
                    <li>Random Forest</li>
                    <li>Logistic Regression</li>
                    <li>Linear SVM</li>
                    <li>PCA</li>
                    <li>Isomap</li>
                    <li>LLE</li>
                  </ul>
                </div>
              </article>

              <article className="project-card">
                <div className="project-card-image">
                  <div className="project-card-frame">
                    <img
                      src="/Project_images/Wi_protect.png"
                      alt="WiProtect"
                      className="project-card-img"
                      loading="lazy"
                      onError={handleProjectImageError}
                    />
                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">📶</span>
                      <span>iOS · Security</span>
                    </div>
                  </div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>WiProtect</h3>
                    <div className="project-info-with-tooltip">
                      <a
                        href="https://github.com/Satyabratadas/WiProtect"
                        target="_blank"
                        rel="noreferrer"
                        className="project-info-icon"
                        aria-label="View WiProtect project on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </a>
                      <span className="project-tooltip">View project on GitHub</span>
                    </div>
                  </div>
                  <p className="project-meta">Swift · iOS Security</p>
                  <p>
                    Real‑time iOS application that evaluates Wi‑Fi security for WPA/WPA2/WPA3 networks,
                    flags insecure configurations, and surfaces clear remediation guidance.
                  </p>
                  <ul className="project-tags">
                    <li>Swift</li>
                    <li>UiKit</li>
                    <li>Mobile Security</li>
                    <li>Network Protocols</li>
                    <li>Wi-Fi Security</li>
                  </ul>
                </div>
              </article>

              {/* <article className="project-card">
                <div className="project-card-image">
                  <div className="project-card-frame">
                    <img src="/Project_images/Clippy_2.0.png" alt="Clippy 2.0"/>
                    <div className="project-card-placeholder">
                      <span className="project-placeholder-icon">🎙️</span>
                      <span>Voice · Assistant</span>
                    </div>
                  </div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-title-row">
                    <h3>Clippy 2.0</h3>
                    <a href="https://github.com/Satyabratadas" target="_blank" rel="noreferrer" className="project-info-icon" aria-label="More about Clippy 2.0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                    </a>
                  </div>
                  <p className="project-meta">Python · Voice Assistant</p>
                  <p>
                    Modular desktop voice assistant with real‑time speech recognition, text‑to‑speech,
                    and an extendable command framework for automating everyday tasks.
                  </p>
                  <ul className="project-tags">
                    <li>Python</li>
                    <li>SpeechRecognition</li>
                    <li>pyttsx3</li>
                  </ul>
                </div>
              </article> */}
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact" ref={contactRef}>
          <div className="contact-container">
            <div className="contact-main-col">
              <div className="contact-header-wrapper">
                <span className="contact-kicker">LET&apos;S BUILD SOMETHING</span>
                <h2>Contact Form</h2>
                <p className="contact-subtitle">
                  Email me directly at <a href="mailto:satyabratadas996@gmail.com" className="contact-email-inline">satyabratadas996@gmail.com</a> — or drop your info here and I&apos;ll come back to you.
                </p>
              </div>

              <div className="contact-card info-card">
                {formSent ? (
                  <div className="form-success-message">
                    <span className="success-icon">🎉</span>
                    <h3>Thank you for reaching out!</h3>
                    <p>Your default email client opened to send the message. You can also connect with me directly on LinkedIn or email.</p>
                    <button type="button" className="btn btn-primary" onClick={() => setFormSent(false)}>
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="contact-name">Full name</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Ada Lovelace"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="ada@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-message">Your Message</label>
                      <textarea
                        id="contact-message"
                        rows="4"
                        placeholder="Hi Satyabrata, I'd love to discuss an AI/ML opportunity or project..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                      />
                    </div>
                    <p className="form-disclaimer">
                      I&apos;ll never share your data with anyone else. Pinky promise!
                    </p>
                    <button type="submit" className="btn btn-primary contact-submit-btn">
                      Send Message
                    </button>
                  </form>
                )}

                <div className="contact-direct-channels">
                  <span className="channels-title">Or reach out directly:</span>
                  <div className="channels-list">
                    <a href="mailto:satyabratadas996@gmail.com" className="channel-pill" title="Email Satyabrata">
                      <span className="channel-icon">✉️</span> satyabratadas996@gmail.com
                    </a>
                    <a href="https://www.linkedin.com/in/satyabrata-lm10/" target="_blank" rel="noreferrer" className="channel-pill" title="LinkedIn">
                      <span className="channel-icon">💼</span> LinkedIn
                    </a>
                    <a href="https://github.com/Satyabratadas" target="_blank" rel="noreferrer" className="channel-pill" title="GitHub">
                      <span className="channel-icon">🐙</span> GitHub
                    </a>
                    <a href="https://leetcode.com/u/Satyabratadas10/" target="_blank" rel="noreferrer" className="channel-pill" title="LeetCode">
                      <span className="channel-icon">⚡</span> LeetCode
                    </a>
                    <a href="https://www.kaggle.com/satyabratadas10" target="_blank" rel="noreferrer" className="channel-pill" title="Kaggle">
                      <span className="channel-icon">📊</span> Kaggle
                    </a>
                    <a href="https://devpost.com/satyabratadas996?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav" target="_blank" rel="noreferrer" className="channel-pill" title="Devpost">
                      <span className="channel-icon">🏆</span> Devpost
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: 3D interactive stage spacer so keyboard is fully visible without overlap */}
            <div className="contact-3d-stage" aria-hidden="true" />
          </div>
        </section>
      </main>

      <footer className="portfolio-footer" ref={footerRef}>
        <span>© {new Date().getFullYear()} Satyabrata Das</span>
      </footer>
    </div>
    </>
  )
}

export default App
