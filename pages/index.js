import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(2); // Default value
  const phonesContainerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  // Phone data for the carousel
  const phoneApps = [
    { id: 1, name: "Social App", alt: "Social App UI" , image: "/AI App.jpg"},
    { id: 2, name: "Shopping App", alt: "E-commerce App UI", image: "/app.jpg" },
    { id: 3, name: "Banking Dashboard", alt: "Finance App UI" , image: "/commerct.jpg"},
    { id: 4, name: "Fitness Tracker", alt: "Fitness App UI" , image: "/food.jpg"},
    { id: 5, name: "Travel Planner", alt: "Travel App UI" , image: "/socal.jpg"},
    { id: 6, name: "Food Delivery", alt: "Food App UI" ,image: "/travel.jpg" },
  ];

  // Function to slide the carousel
  const slideCarousel = (direction) => {
    if (phonesContainerRef.current) {
      const container = phonesContainerRef.current;
      const slideWidth = container.offsetWidth;

      let newSlide = currentSlide + direction;

      // Loop back to start/end if needed
      if (newSlide < 0) newSlide = totalSlides - 1;
      if (newSlide >= totalSlides) newSlide = 0;

      setCurrentSlide(newSlide);
      container.scrollTo({
        left: newSlide * slideWidth,
        behavior: "smooth",
      });
    }
  };

  // Function to toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark-theme');
      localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    }
  };

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    }
    
    // Calculate total slides based on screen width - only runs in browser
    const calculateTotalSlides = () => {
      const itemsPerView = window.innerWidth > 768 ? 3 : 1;
      setTotalSlides(Math.ceil(phoneApps.length / itemsPerView));
    };

    // Calculate initial value
    calculateTotalSlides();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(
        `.${styles.section}, .${styles.projectCard}, .${styles.featureCard}`
      )
      .forEach((el) => observer.observe(el));

    // Add window resize listener for responsive carousel
    const handleResize = () => {
      calculateTotalSlides();
      
      if (phonesContainerRef.current) {
        // Reset position on resize
        phonesContainerRef.current.scrollTo({
          left: currentSlide * phonesContainerRef.current.offsetWidth,
          behavior: "auto",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSlide, phoneApps.length]);

  return (
    <>
      <Head>
        <title>AbSolution — App, Web & AI Design</title>
        <meta
          name="description"
          content="App design, website design, AI agent design, workflow & automation — Joey"
        />
      </Head>

      <div
        className={`${styles.page} ${styles.wrapper} ${
          darkMode ? styles.darkMode : styles.lightMode
        } ${geistSans.variable} ${geistMono.variable}`}
      >
        {/* Theme Toggle Button */}

        {/* Nav */}
        <nav className={styles.nav}>
          <div className={styles.brand}>
            <div className={styles.logo}>AbSolution</div>
            <div className={styles.tag}>Design • AI • Automation</div>
          </div>

          {/* <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            <span className={styles.themeIcon}>{darkMode ? "☀️" : "🌙"}</span>
          </button> */}

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle navigation"
          >
            <span className={menuOpen ? styles.hamOpen : ""} />
          </button>

          <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>
              Portfolio
            </a>
            <a href="#workflow" onClick={() => setMenuOpen(false)}>
              Workflow
            </a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </div>
        </nav>

        {/* Banner / Hero */}
        <header id="home" className={`${styles.section} ${styles.banner}`}>
          <div className={styles.bannerInner}>
            <div className={styles.bannerMedia}>
              <Image
                src="/app.png"
                alt="Banner — App & AI design"
                width={1600}
                height={900}
                className={styles.bannerImage}
                priority
              />
              <div className={styles.bannerOverlay} />
            </div>

            <div className={styles.bannerText}>
              <h1 className={styles.heroTitle}>
                App Idea? Let's Make It Real.
              </h1>
              <p className={styles.lead}>
                Design • Web • AI Agents • Workflow • Automation • AI Mobile App
                App design, website, AI agents, workflow and automation — all in
                one place.
              </p>

              <div className={styles.heroCtas}>
                <a href="#contact" className={styles.ctaPrimary}>
                  Get a Quote
                </a>
                <a href="#portfolio" className={styles.ctaGhost}>
                  See Work
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Services */}
        <section
          id="services"
          className={`${styles.section} ${styles.services}`}
        >
          <h2 className={styles.sectionTitle}>Services</h2>
          <p className={styles.sectionSub}>
            AI Mobile App design, Website UI, AI Agent, Workflow & Automation
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h4>App Design</h4>
              <p>Mobile-first UI/UX, prototypes, and launch-ready screens.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💻</div>
              <h4>Website Design</h4>
              <p>Performance-focused, accessible websites and landing pages.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤖</div>
              <h4>AI Agent Design</h4>
              <p>Conversational AI, agent flows, persona & prompt design.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔁</div>
              <h4>Workflow Design</h4>
              <p>
                End-to-end user journeys, process mapping and optimizations.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚙️</div>
              <h4>Automation</h4>
              <p>Integrations, automations and dashboards for scale.</p>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section
          id="portfolio"
          className={`${styles.section} ${styles.portfolio}`}
        >
          <h2 className={styles.sectionTitle}>Portfolio</h2>
          <p className={styles.sectionSub}>
            Selected projects — app, web and AI design.
          </p>

          {/* App Showcase Section */}
          <div className={styles.appShowcase}>
            <div className={styles.showcaseHeader}>
              <h3 className={styles.showcaseTitle}>
                Explore Our Mobile App Screens
              </h3>
              <p className={styles.showcaseSubtitle}>
                Our designs feature intuitive navigation, elegant UI components,
                and pixel-perfect execution that elevate the user experience
                across iOS and Android platforms.
              </p>
            </div>

            <div className={styles.carouselContainer}>
              <div
                className={styles.carouselArrow}
                onClick={() => slideCarousel(-1)}
              >
                <span>❮</span>
              </div>

              <div className={styles.phonesContainer} ref={phonesContainerRef}>
                <div className={styles.phonesRow}>
                  {phoneApps.map((app) => (
                    <div key={app.id} className={styles.phoneDevice}>
                      <div className={styles.phoneNotch}></div>
                      <div className={styles.phoneScreen}>
                        <Image
                          src={app.image}
                          alt={app.alt}
                          width={280}
                          height={560}
                          className={styles.phoneImage}
                        />
                      </div>
                      <div className={styles.phoneName}>{app.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={styles.carouselArrow}
                onClick={() => slideCarousel(1)}
              >
                <span>❯</span>
              </div>
            </div>

            <div className={styles.carouselDots}>
              {totalSlides > 0 &&
                [...Array(totalSlides)].map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.dot} ${
                      index === currentSlide ? styles.activeDot : ""
                    }`}
                    onClick={() => {
                      if (phonesContainerRef.current) {
                        setCurrentSlide(index);
                        phonesContainerRef.current.scrollTo({
                          left: index * phonesContainerRef.current.offsetWidth,
                          behavior: "smooth",
                        });
                      }
                    }}
                  ></span>
                ))}
            </div>

            <div className={styles.ctaContainer}>
              <a href="#contact" className={styles.ctaButton}>
                Get Your App Designed
              </a>
            </div>
          </div>

          {/* Project Cards */}
          <h2 className={styles.sectionTitle}>AI Agent</h2>
          <div className={styles.projectsGrid}>
            {/* Example card 1 */}
            <article className={styles.projectCard}>
              <div className={styles.projectMedia}>
                <Image
                  src="/n8n .png"
                  alt="Project 1"
                  width={1200}
                  height={700}
                  className={styles.projectImage}
                />
              </div>
              <div className={styles.projectBody}>
                <h3>Merchant App — Inventory & Sales</h3>
                <p>App design + automation for small retailers.</p>
              </div>
            </article>

            {/* Example card 2 */}
            <article className={styles.projectCard}>
              <div className={styles.projectMedia}>
                <Image
                  src="/img.png"
                  alt="Project 2"
                  width={1200}
                  height={700}
                  className={styles.projectImage}
                />
              </div>
              <div className={styles.projectBody}>
                <h3>AI Sales Agent</h3>
                <p>
                  Conversational agent that qualifies leads & schedules demos.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Workflow */}
        <section
          id="workflow"
          className={`${styles.section} ${styles.workflow}`}
        >
          <h2 className={styles.sectionTitle}>Workflow</h2>
          <p className={styles.sectionSub}>
            How we deliver — concept to launch.
          </p>

          <ol className={styles.timeline}>
            <li>
              <strong>Discover</strong>
              <p>Stakeholder interviews, goals, success metrics.</p>
            </li>
            <li>
              <strong>Design</strong>
              <p>Wireframes, prototypes, UI kit and visual system.</p>
            </li>
            <li>
              <strong>Build</strong>
              <p>Development, QA, and automated workflows.</p>
            </li>
            <li>
              <strong>Launch</strong>
              <p>Deploy, analytics, iterate and scale.</p>
            </li>
          </ol>
        </section>

        {/* Case Studies */}
        <section
          id="case-studies"
          className={`${styles.section} ${styles.cases}`}
        >
          <h2 className={styles.sectionTitle}>Case Studies</h2>
          <div className={styles.caseGrid}>
            <div className={styles.caseCard}>
              <h4>Retailer App</h4>
              <p>Reduced checkout time by 40% using flow optimizations.</p>
            </div>
            <div className={styles.caseCard}>
              <h4>AI Chat Agent</h4>
              <p>
                Increased lead qualification by 3x through automated routing.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section id="team" className={`${styles.section} ${styles.team}`}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <div className={styles.teamContent}>
            <div className={styles.teamImageContainer}>
              <div className={styles.teamImage}>
                <Image
                  src="/image.jpg"
                  alt="AbSolution Team"
                  width={500}
                  height={350}
                  className={styles.teamPhoto}
                />
                <div className={styles.teamBadge}>2.5+ Years Experience</div>
              </div>
              <div className={styles.teamStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>14+</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>10</span>
                  <span className={styles.statLabel}>Markets</span>
                </div>
              </div>
            </div>

            <div className={styles.teamInfo}>
              <h3>Who We Are</h3>
              <div className={styles.teamHighlight}>
                Passionate mobile developers delivering high-performance
                applications
              </div>
              <p>
                We are a team of passionate mobile app developers with 2.5+
                years of experience delivering user-friendly, high-performance
                applications for iOS and Android. Having successfully completed
                14+ projects across Arabic and Indian markets, we specialize in
                creating solutions that drive efficiency, engagement, and
                growth.
              </p>
              <p>
                Our expertise spans building feature-rich applications with
                real-time functionality, secure integrations, and smooth user
                journeys. Continuously evolving with new trends and innovations,
                we aim to provide businesses with modern, scalable apps that
                elevate user satisfaction and operational success.
              </p>
              <div className={styles.teamSocials}>
                <a
                  href="https://www.linkedin.com/in/abhishek-kumar-201b91195/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.teamSocialButton}
                >
                  <span className={styles.socialIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className={`${styles.section} ${styles.pricing}`}>
          <h2 className={styles.sectionTitle}>Pricing</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Starter</h3>
              <p className={styles.price}>₹9,999</p>
              <p>Basic app/web design + 2 weeks support.</p>
            </div>

            <div className={styles.priceCard}>
              <h3>Business</h3>
              <p className={styles.price}>₹29,999</p>
              <p>App + Automation setup + 1 month support.</p>
            </div>

            <div className={styles.priceCard}>
              <h3>Enterprise</h3>
              <p className={styles.price}>Custom</p>
              <p>Full product design, AI agent and integrations.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`${styles.section} ${styles.testimonials}`}>
          <h2 className={styles.sectionTitle}>Testimonials</h2>
          <div className={styles.testGrid}>
            <blockquote className={styles.testimonial}>
              <p>
                "Abhishek turned our idea into a product in 6 weeks —
                incredible!"
              </p>
              <cite>— Rahul, Founder</cite>
            </blockquote>
            <blockquote className={styles.testimonial}>
              <p>"The AI agent automations cut our support load in half."</p>
              <cite>— Meera, Ops Lead</cite>
            </blockquote>
          </div>
        </section>

        {/* Contact - with enhanced form inputs */}
        <section id="contact" className={`${styles.section} ${styles.contact}`}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.sectionSub}>Let's discuss your idea</p>

          <div className={styles.contactRow}>
            <form
              className={styles.contactForm}
              action="sonukr24082001@gmail.com"
              method="GET"
              encType="text/plain"
            >
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Tell us about your project..."
                />
              </label>

              <div className={styles.formActions}>
                <button type="submit" className={styles.ctaPrimary}>
                  Send
                </button>
                <a
                  className={styles.whatsappBtn}
                  href="https://wa.me/8709138950?text=Hi%20Joey!%20I%20have%20an%20app%20idea%20I%20want%20to%20discuss."
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </form>

            <div className={styles.contactAside}>
              <h4>Quick Info</h4>
              <p>Available for remote & on-site projects.</p>
              <p>Email: sonukr24082001@gmail.com</p>
              <p>WhatsApp: +91 8709138950</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p>© {new Date().getFullYear()} AbSolution — App & AI Design</p>
            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/in/abhishek-kumar-201b91195/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a href="#" aria-label="Twitter">
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

