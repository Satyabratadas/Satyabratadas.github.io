import { useEffect, useRef } from 'react'
import anime from 'animejs'
import './App.css'

function App() {
  const heroRef = useRef(null)
  const headerRef = useRef(null)
  const aboutRef = useRef(null)
  const educationRef = useRef(null)
  const presentationRef = useRef(null)
  const skillsRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    // Check if anime is available
    if (typeof anime === 'undefined') {
      console.warn('animejs is not installed. Please run: npm install animejs')
      return
    }

    // Header animation
    anime({
      targets: '.logo',
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.nav a',
      opacity: [0, 1],
      translateY: [-15, 0],
      delay: anime.stagger(100, { start: 200 }),
      duration: 600,
      easing: 'easeOutExpo'
    })

    // Hero section animations
    anime({
      targets: '.hero-eyebrow',
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 800,
      delay: 300,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.accent-dot',
      scale: [0, 1.5, 1],
      opacity: [0, 1],
      duration: 600,
      delay: 800,
      easing: 'easeOutElastic(1, .8)'
    })

    anime({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 800,
      delay: 500,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.hero-title-inline',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 900,
      delay: 700,
      easing: 'easeOutElastic(1, .6)'
    })

    anime({
      targets: '.hero-description',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 900,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.btn',
      opacity: [0, 1],
      scale: [0.9, 1],
      delay: anime.stagger(150, { start: 1100 }),
      duration: 600,
      easing: 'easeOutElastic(1, .8)'
    })

    anime({
      targets: '.hero-tech-strip span',
      opacity: [0, 1],
      scale: [0, 1],
      delay: anime.stagger(80, { start: 1400 }),
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    })

    // Hero portrait animation
    anime({
      targets: '.hero-portrait-ring',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1200,
      delay: 600,
      easing: 'easeOutExpo'
    })

    anime({
      targets: '.hero-portrait',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: 800,
      easing: 'easeOutElastic(1, .6)'
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
              opacity: [0, 1],
              translateX: [-50, 0],
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.about-content h2',
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 700,
              delay: 200,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.about-content p',
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(100, { start: 400 }),
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.stat',
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: anime.stagger(100, { start: 700 }),
              duration: 600,
              easing: 'easeOutElastic(1, .8)'
            })
          }

          // Education section
          if (target.classList.contains('section') && target.id === 'education') {
            anime({
              targets: '.section-header',
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#education .info-card',
              opacity: [0, 1],
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
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#presentation .info-card',
              opacity: [0, 1],
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
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '#skills .info-card',
              opacity: [0, 1],
              scale: [0.8, 1],
              rotateY: [15, 0],
              delay: anime.stagger(100, { start: 300 }),
              duration: 700,
              easing: 'easeOutElastic(1, .7)'
            })

            anime({
              targets: '#skills .chip',
              opacity: [0, 1],
              scale: [0, 1],
              delay: anime.stagger(30, { start: 800 }),
              duration: 400,
              easing: 'easeOutElastic(1, .5)'
            })
          }

          // Experience section
          if (target.id === 'experience') {
            anime({
              targets: '#experience .section-header',
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.timeline-marker',
              scale: [0, 1],
              opacity: [0, 1],
              delay: anime.stagger(200, { start: 300 }),
              duration: 600,
              easing: 'easeOutElastic(1, .8)'
            })

            anime({
              targets: '.timeline-card',
              opacity: [0, 1],
              translateX: [-50, 0],
              delay: anime.stagger(200, { start: 400 }),
              duration: 800,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.timeline-card li',
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: anime.stagger(50, { start: 800 }),
              duration: 500,
              easing: 'easeOutExpo'
            })
          }

          // Projects section
          if (target.classList.contains('projects')) {
            anime({
              targets: '.projects h2',
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.project-card',
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              delay: anime.stagger(150, { start: 300 }),
              duration: 800,
              easing: 'easeOutElastic(1, .6)'
            })

            anime({
              targets: '.project-tags li',
              opacity: [0, 1],
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
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 700,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.contact-subtitle',
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 700,
              delay: 200,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.contact-highlight',
              opacity: [0, 1],
              scale: [0.95, 1],
              translateY: [30, 0],
              duration: 900,
              delay: 400,
              easing: 'easeOutElastic(1, .7)'
            })

            anime({
              targets: '.contact-info h3',
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 600,
              delay: 600,
              easing: 'easeOutExpo'
            })

            anime({
              targets: '.contact-link-primary, .contact-link',
              opacity: [0, 1],
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
              opacity: [0, 1],
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

  return (
    <div className="portfolio">
      <header className="portfolio-header" ref={headerRef}>
        <div className="logo">Satyabrata</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="nav-menu" aria-label="Open navigation menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero" ref={heroRef}>
          <div className="hero-text">
            <p className="hero-eyebrow">Hello<span className="accent-dot">.</span></p>
            <p className="hero-subtitle">I&apos;m Satyabrata</p>
            <h1 className="hero-title-inline">Software Developer</h1>
            <p className="hero-description">
              I build reliable, high‑impact software systems — from intelligent AI backends
              to polished iOS experiences and performant data pipelines.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="mailto:satyabratadas996@gmail.com?subject=Project%20Inquiry"
              >
                Got a project?
              </a>
              <a
                className="btn btn-outline"
                href="/Satyabrata_Software_engineer_resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                My resume
              </a>
            </div>
            <div className="hero-tech-strip">
              <span>Python</span>
              <span>Swift</span>
              <span>PyTorch</span>
              <span>FastAPI</span>
              <span>SwiftUI</span>
              <span>Docker</span>
              <span>NLP</span>
            </div>
          </div>

          <div className="hero-portrait-wrapper">
            <div className="hero-portrait-ring" />
            <img
              src="/profile_pic.jpeg"
              alt="Portrait of Satyabrata Das"
              className="hero-portrait"
            />
          </div>
        </section>

        {/* About / Services Section */}
        <section id="about" className="about" ref={aboutRef}>
          <div className="about-grid">
            <div className="about-services">
              <div className="service">
                <div className="service-icon">🧠</div>
                <div className="service-content">
                  <h3>AI / ML Projects</h3>
                  <p>Transformers, NLP, and robust AI systems — from research ideas to working demos.</p>
                </div>
              </div>
                <div className="service">
                <div className="service-icon">📱</div>
                <div className="service-content">
                  <h3>iOS Development</h3>
                  <p>SwiftUI apps with strong UX, performance, and secure data handling.</p>
                </div>
              </div>
              <div className="service">
                <div className="service-icon">⚙️</div>
                <div className="service-content">
                  <h3>Backend & Systems</h3>
                  <p>FastAPI microservices, Docker, and observability (Prometheus/Grafana).</p>
                </div>
              </div>
            </div>

            <div className="about-content">
              <h2>About me</h2>
              <p>
                I&apos;m an iOS‑focused Software Engineer (Swift/SwiftUI) currently pursuing an M.S. in
                Artificial Intelligence Systems at the University of Florida. I enjoy building
                secure, performant mobile experiences and working on AI/ML projects that turn
                research ideas into usable tools.
              </p>
              <p>
                Previously, I worked on real‑time collaboration features, Wi‑Fi security analysis,
                and payment/checkout reliability in production iOS apps. In grad school, my focus is
                on AI systems, robustness, and applied deep learning.
              </p>

              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">1,000+</span>
                  <span className="stat-label">Daily active users impacted</span>
                </div>
                <div className="stat">
                  <span className="stat-number">30%</span>
                  <span className="stat-label">Defect reduction delivered</span>
                </div>
                <div className="stat">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years of experience</span>
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
              <li>Explained methodology, metrics, and experimental results in a formal poster session.</li>
              <li>Discussed findings and trade‑offs with faculty, researchers, and fellow students.</li>
            </ul>
          </article>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section" ref={skillsRef}>
          <div className="section-header">
            <h2>Skills</h2>
            <p className="section-subtitle">A quick snapshot based on my resume.</p>
          </div>

          <div className="skills-grid">
            <article className="info-card">
              <h3>Languages</h3>
              <div className="chips">
                <span className="chip">Python</span>
                <span className="chip">Swift</span>
                <span className="chip">C++</span>
                <span className="chip">SQL</span>
              </div>
            </article>

            <article className="info-card">
              <h3>Machine Learning</h3>
              <div className="chips">
                <span className="chip">PyTorch</span>
                <span className="chip">scikit-learn</span>
                <span className="chip">Transformers</span>
                <span className="chip">NLP</span>
                <span className="chip">NumPy</span>
                <span className="chip">Pandas</span>
              </div>
            </article>

            <article className="info-card">
              <h3>Computer Vision</h3>
              <div className="chips">
                <span className="chip">Image Processing</span>
                <span className="chip">Filtering</span>
                <span className="chip">Edge Detection</span>
                <span className="chip">Segmentation</span>
                <span className="chip">Object Recognition</span>
              </div>
            </article>

            <article className="info-card">
              <h3>Backend &amp; Systems</h3>
              <div className="chips">
                <span className="chip">FastAPI</span>
                <span className="chip">Microservices</span>
                <span className="chip">Docker</span>
                <span className="chip">REST APIs</span>
                <span className="chip">Prometheus</span>
                <span className="chip">Grafana</span>
              </div>
            </article>

            <article className="info-card">
              <h3>iOS Development</h3>
              <div className="chips">
                <span className="chip">SwiftUI</span>
                <span className="chip">Xcode</span>
                <span className="chip">Core Data</span>
                <span className="chip">NetworkExtension</span>
              </div>
            </article>

            <article className="info-card">
              <h3>Core CS</h3>
              <div className="chips">
                <span className="chip">Data Structures</span>
                <span className="chip">Algorithms</span>
                <span className="chip">OOP</span>
                <span className="chip">Git</span>
              </div>
            </article>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section" ref={experienceRef}>
          <div className="section-header">
            <h2>Work experience</h2>
            <p className="section-subtitle">
              Production iOS + systems work, with measurable impact.
            </p>
          </div>

          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card">
                <div className="timeline-top">
                  <h3>ARC Document Solutions</h3>
                  <span className="pill">Jan 2022 – Sep 2024, India</span>
                </div>
                <p className="muted">Software Engineer</p>
                <ul className="bullets">
                  <li>
                    Built and scaled real‑time collaboration systems (WebSocket changesets, QR scanning,
                    REST APIs), reducing sync latency by <strong>25%</strong> for <strong>1,000+</strong> daily active users.
                  </li>
                  <li>
                    Developed an iOS Wi‑Fi security analyzer using Swift and NetworkExtension to detect
                    WPA/WPA2/WPA3 vulnerabilities across <strong>20+</strong> enterprise devices.
                  </li>
                  <li>
                    Improved ARC Print checkout reliability by integrating Paytm, Cashfree, Razorpay,
                    Braintree, Elavon, plus Google reCAPTCHA — reducing failed transactions by <strong>15%</strong>.
                  </li>
                  <li>
                    Shipped a SwiftUI filtering system, improving product discovery and boosting order conversion by
                    <strong>10%</strong> for <strong>5K+</strong> monthly users.
                  </li>
                  <li>
                    Collaborated with QA, backend, DevOps, and design teams to deliver secure apps, contributing to a
                    <strong>30%</strong> drop in customer‑reported defects.
                  </li>
                </ul>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-card">
                <div className="timeline-top">
                  <h3>SCI-BI Software Pvt Ltd</h3>
                  <span className="pill">Jul 2021 – Dec 2021, India</span>
                </div>
                <p className="muted">Software Trainee</p>
                <ul className="bullets">
                  <li>
                    Engineered high‑volume ETL pipelines (SSIS, SSMS, Python) processing millions of records daily with
                    <strong>99%+</strong> accuracy.
                  </li>
                  <li>
                    Automated workflows with Python, cutting manual effort by <strong>40%</strong> and saving <strong>20+</strong> hours/week.
                  </li>
                  <li>
                    Optimized SQL queries and ETL transformations, improving execution speed by <strong>30%</strong>.
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects" ref={projectsRef}>
          <h2>Projects</h2>
          <div className="projects-grid">
            <article className="project-card">
              <h3>SummarIQ</h3>
              <p className="project-meta">NLP · LLMs · LaTeX Parsing</p>
              <p>
                Math‑aware research paper summarizer that parses LaTeX equations, ranks importance,
                and generates section‑wise summaries with transformer models and a FastAPI backend.
              </p>
              <ul className="project-tags">
                <li>Python</li>
                <li>FastAPI</li>
                <li>Docker</li>
                <li>Transformers</li>
              </ul>
            </article>

            <article className="project-card">
              <h3>WiProtect</h3>
              <p className="project-meta">Swift · iOS Security</p>
              <p>
                Real‑time iOS application that evaluates Wi‑Fi security for WPA/WPA2/WPA3 networks,
                flags insecure configurations, and surfaces clear remediation guidance.
              </p>
              <ul className="project-tags">
                <li>Swift</li>
                <li>SwiftUI</li>
                <li>Core Data</li>
              </ul>
            </article>

            <article className="project-card">
              <h3>Clippy 2.0</h3>
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
            </article>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact" ref={contactRef}>
          <div className="contact-container">
            <div className="contact-header-wrapper">
              <h2>Let&apos;s build something</h2>
              <p className="contact-subtitle">
                I&apos;m open to software engineering roles, AI/ML research collaborations, and NLP‑focused
                projects. If you&apos;re working on something interesting in iOS, AI systems, or language
                technologies, I&apos;d love to chat.
              </p>
            </div>
            <div className="contact-highlight">
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <p className="contact-cta">Ready to collaborate? Reach out via:</p>
                <div className="contact-links">
                  <a href="mailto:satyabratadas996@gmail.com" className="contact-link-primary">
                    <span className="contact-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    satyabratadas996@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/satyabrata-lm10/" target="_blank" rel="noreferrer" className="contact-link">
                    <span className="contact-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </span>
                    LinkedIn
                  </a>
                  <a href="https://github.com/Satyabratadas" target="_blank" rel="noreferrer" className="contact-link">
                    <span className="contact-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </span>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer" ref={footerRef}>
        <span>© {new Date().getFullYear()} Satyabrata Das</span>
      </footer>
    </div>
  )
}

export default App
