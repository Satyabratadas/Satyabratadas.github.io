import './App.css'

function App() {
  return (
    <div className="portfolio">
      <header className="portfolio-header">
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
        <section id="home" className="hero">
          <div className="hero-text">
            <p className="hero-eyebrow">Hello<span className="accent-dot">.</span></p>
            <p className="hero-subtitle">I&apos;m Satyabrata</p>
            <h1 className="hero-title">Software Developer</h1>
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
              <span>HTML5</span>
              <span>CSS</span>
              <span>Javascript</span>
              <span>Node.js</span>
              <span>React</span>
              <span>Git</span>
              <span>Github</span>
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
        <section id="about" className="about">
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
        <section id="education" className="section">
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
                <span className="pill">Aug 2025 – May 2027 (Expected)</span>
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
        <section id="presentation" className="section">
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
        <section id="skills" className="section">
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
        <section id="experience" className="section">
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
        <section id="projects" className="projects">
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
        <section id="contact" className="contact">
          <h2>Let&apos;s build something</h2>
          <p>
            I&apos;m open to software engineering roles, AI/ML research collaborations, and NLP‑focused
            projects. If you&apos;re working on something interesting in iOS, AI systems, or language
            technologies, I&apos;d love to chat.
          </p>
          <div className="contact-links">
            <a href="mailto:satyabratadas996@gmail.com">satyabratadas996@gmail.com</a>
            <a href="https://www.linkedin.com/in/satyabrata-lm10/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/Satyabratadas" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <span>© {new Date().getFullYear()} Satyabrata Das</span>
      </footer>
    </div>
  )
}

export default App
