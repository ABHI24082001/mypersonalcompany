import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Projects from "@/components/Projects";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(2); // Start with middle app (index 2)
  const [totalSlides, setTotalSlides] = useState(6); // Total number of apps
  const phonesContainerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  // Phone showcase animation state
  const [showcaseVisible, setShowcaseVisible] = useState(false);
  const showcaseRef = useRef(null);
  const formRef = useRef(null);

  // Phone data for the modern showcase
  const phoneApps = [
    { 
      id: 1, 
      name: "Banking Dashboard", 
      alt: "Finance App UI", 
      image: "/commerct.jpg",
      position: "leftOuter",
      delay: 1.2,
      rotation: -8
    },
    { 
      id: 2, 
      name: "Social App", 
      alt: "Social Media UI", 
      image: "/AI App.jpg",
      position: "leftInner",
      delay: 0.6,
      rotation: -3
    },
    { 
      id: 3, 
      name: "Shopping App", 
      alt: "E-commerce UI", 
      image: "/app.jpg",
      position: "center",
      delay: 0.2,
      rotation: 0
    },
    { 
      id: 4, 
      name: "Fitness Tracker", 
      alt: "Health App UI", 
      image: "/food.jpg",
      position: "rightInner",
      delay: 0.8,
      rotation: 3
    },
    { 
      id: 5, 
      name: "Travel Planner", 
      alt: "Travel App UI", 
      image: "/socal.jpg",
      position: "rightOuter",
      delay: 1.4,
      rotation: 8
    }
  ];

  // Animation variants for different phone positions - Temple Structure
  const phoneVariants = {
    center: {
      initial: { scale: 0.7, opacity: 0, y: 150, rotateY: 0, z: 0 },
      animate: { scale: 1.2, opacity: 1, y: -60, rotateY: 0, z: 100 },
      transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] }
    },
    leftInner: {
      initial: { scale: 0.6, opacity: 0, x: -150, y: 150, rotateY: 12, z: -20 },
      animate: { scale: 1.0, opacity: 1, x: -240, y: 0, rotateY: 8, z: 50 },
      transition: { duration: 1.3, ease: [0.23, 1, 0.32, 1] }
    },
    rightInner: {
      initial: { scale: 0.6, opacity: 0, x: 150, y: 150, rotateY: -12, z: -20 },
      animate: { scale: 1.0, opacity: 1, x: 240, y: 0, rotateY: -8, z: 50 },
      transition: { duration: 1.3, ease: [0.23, 1, 0.32, 1] }
    },
    leftOuter: {
      initial: { scale: 0.5, opacity: 0, x: -200, y: 180, rotate: -5, rotateY: 15, z: -40 },
      animate: { scale: 0.9, opacity: 1, x: -460, y: 40, rotate: -3, rotateY: 10, z: 20 },
      transition: { duration: 1.5, ease: [0.23, 1, 0.32, 1] }
    },
    rightOuter: {
      initial: { scale: 0.5, opacity: 0, x: 200, y: 180, rotate: 5, rotateY: -15, z: -40 },
      animate: { scale: 0.9, opacity: 1, x: 460, y: 40, rotate: 3, rotateY: -10, z: 20 },
      transition: { duration: 1.5, ease: [0.23, 1, 0.32, 1] }
    }
  };

  // Function to get animation settings for each phone
  const getPhoneAnimation = (phone) => {
    const variant = phoneVariants[phone.position];
    return {
      initial: variant.initial,
      animate: showcaseVisible ? variant.animate : variant.initial,
      transition: { ...variant.transition, delay: showcaseVisible ? phone.delay : 0 }
    };
  };

  // Function to toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark-theme');
      localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "service_b9l70ut",
        "template_1mw1cd9", // ✅ your template ID
        formRef.current,
        "w55sRUF4uK18ck7Eo", // ✅ your public key
      );

      alert("✅ Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message");
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

    const showcaseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowcaseVisible(true);
            showcaseObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document
      .querySelectorAll(
        `.${styles.section}, .${styles.projectCard}, .${styles.featureCard}`
      )
      .forEach((el) => observer.observe(el));

    if (showcaseRef.current) {
      showcaseObserver.observe(showcaseRef.current);
    }

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
      showcaseObserver.disconnect();
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

          {/* Modern Mobile App Showcase */}
          <motion.div 
            ref={showcaseRef}
            className={styles.appShowcase}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div 
              className={styles.showcaseHeader}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <h3 className={styles.showcaseTitle}>
                Premium Mobile App Designs
              </h3>
              <p className={styles.showcaseSubtitle}>
                Experience our cutting-edge mobile applications with intuitive interfaces,
                seamless animations, and pixel-perfect execution across all platforms.
              </p>
            </motion.div>

            {/* Modern Phone Showcase Container */}
            <div className={styles.modernShowcaseContainer}>
              {phoneApps.map((phone, index) => {
                const animation = getPhoneAnimation(phone);
                
                return (
                  <motion.div
                    key={phone.id}
                    className={`${styles.modernPhoneDevice} ${
                      styles[
                        `phone${
                          phone.position.charAt(0).toUpperCase() +
                          phone.position.slice(1)
                        }`
                      ]
                    }`}
                    initial={animation.initial}
                    animate={animation.animate}
                    transition={animation.transition}
                    whileHover={{
                      scale: phone.position === "center" ? 1.25 : phone.position.includes("Inner") ? 1.05 : 0.95,
                      rotateY: phone.position === "center" ? 0 : 0,
                      z: phone.position === "center" ? 120 : phone.position.includes("Inner") ? 60 : 30,
                      y: phone.position === "center" ? -70 : phone.position.includes("Inner") ? -10 : 30,
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                    style={{
                      zIndex:
                        phone.position === "center"
                          ? 150
                          : phone.position.includes("Inner")
                          ? 120
                          : 100,
                    }}
                  >
                    {/* Phone Frame */}
                    <div className={styles.modernPhoneFrame}>
                      {/* Phone Notch */}
                      <div className={styles.modernPhoneNotch}></div>

                      {/* Screen Container */}
                      <motion.div
                        className={styles.modernPhoneScreen}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={phone.image}
                          alt={phone.alt}
                          width={280}
                          height={560}
                          className={styles.modernPhoneImage}
                          priority={phone.position === "center"}
                        />
                      </motion.div>

                      {/* Phone Name Label */}
                      <motion.div
                        className={styles.modernPhoneName}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: showcaseVisible
                            ? phone.position === "center"
                              ? 1
                              : 0.8
                            : 0,
                          y: showcaseVisible ? 0 : 20,
                        }}
                        transition={{ delay: phone.delay + 0.3, duration: 0.4 }}
                      >
                        {phone.name}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Showcase CTA */}
            <motion.div 
              className={styles.ctaContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.a 
                href="#contact"
                className={styles.ctaButton}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Start Your Project
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects & Products Section - NEW */}
        <Projects />

        {/* Projects Section */}
        <section className={`${styles.section}`} id="projects">
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
          <h2 className={styles.sectionTitle}>Our 20-Day SaaS Delivery</h2>
          <p className={styles.sectionSub}>
            From concept to launch — structured process, guaranteed delivery.
          </p>

          <div className={styles.workflowTimeline}>
            {/* Week 1: Days 1-5 */}
            <motion.div 
              className={styles.timelinePhase}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={styles.phaseHeader}>
                <span className={styles.phaseNumber}>Week 1</span>
                <span className={styles.phaseDays}>Days 1-5</span>
              </div>
              
              <div className={styles.phaseCards}>
                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>🎯</div>
                  <h4>Discovery & Planning</h4>
                  <ul className={styles.cardList}>
                    <li>Requirements gathering</li>
                    <li>User research & personas</li>
                    <li>Feature prioritization</li>
                    <li>Technical architecture</li>
                  </ul>
                  <span className={styles.cardDay}>Days 1-2</span>
                </div>

                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>🎨</div>
                  <h4>Design Foundation</h4>
                  <ul className={styles.cardList}>
                    <li>Wireframes & user flows</li>
                    <li>Design system setup</li>
                    <li>Brand integration</li>
                    <li>UI component library</li>
                  </ul>
                  <span className={styles.cardDay}>Days 3-5</span>
                </div>
              </div>
            </motion.div>

            {/* Week 2: Days 6-10 */}
            <motion.div 
              className={styles.timelinePhase}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.phaseHeader}>
                <span className={styles.phaseNumber}>Week 2</span>
                <span className={styles.phaseDays}>Days 6-10</span>
              </div>
              
              <div className={styles.phaseCards}>
                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>⚡</div>
                  <h4>Core Development</h4>
                  <ul className={styles.cardList}>
                    <li>Frontend implementation</li>
                    <li>Backend API development</li>
                    <li>Database architecture</li>
                    <li>Authentication system</li>
                  </ul>
                  <span className={styles.cardDay}>Days 6-8</span>
                </div>

                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>🔗</div>
                  <h4>Integration Layer</h4>
                  <ul className={styles.cardList}>
                    <li>Third-party APIs</li>
                    <li>Payment gateway</li>
                    <li>Email notifications</li>
                    <li>Cloud services setup</li>
                  </ul>
                  <span className={styles.cardDay}>Days 9-10</span>
                </div>
              </div>
            </motion.div>

            {/* Week 3: Days 11-15 */}
            <motion.div 
              className={styles.timelinePhase}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className={styles.phaseHeader}>
                <span className={styles.phaseNumber}>Week 3</span>
                <span className={styles.phaseDays}>Days 11-15</span>
              </div>
              
              <div className={styles.phaseCards}>
                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>🤖</div>
                  <h4>AI & Automation</h4>
                  <ul className={styles.cardList}>
                    <li>AI agent integration</li>
                    <li>Workflow automation</li>
                    <li>Smart notifications</li>
                    <li>Analytics setup</li>
                  </ul>
                  <span className={styles.cardDay}>Days 11-13</span>
                </div>

                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>🧪</div>
                  <h4>Testing & QA</h4>
                  <ul className={styles.cardList}>
                    <li>Functional testing</li>
                    <li>Performance optimization</li>
                    <li>Security audit</li>
                    <li>Cross-browser testing</li>
                  </ul>
                  <span className={styles.cardDay}>Days 14-15</span>
                </div>
              </div>
            </motion.div>

            {/* Week 4: Days 16-20 */}
            <motion.div 
              className={styles.timelinePhase}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={styles.phaseHeader}>
                <span className={styles.phaseNumber}>Week 4</span>
                <span className={styles.phaseDays}>Days 16-20</span>
              </div>
              
              <div className={styles.phaseCards}>
                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>🚀</div>
                  <h4>Deployment & Launch</h4>
                  <ul className={styles.cardList}>
                    <li>Production deployment</li>
                    <li>Domain & SSL setup</li>
                    <li>Monitoring configuration</li>
                    <li>Backup systems</li>
                  </ul>
                  <span className={styles.cardDay}>Days 16-18</span>
                </div>

                <div className={styles.workflowCard}>
                  <div className={styles.cardIcon}>📚</div>
                  <h4>Handoff & Support</h4>
                  <ul className={styles.cardList}>
                    <li>Documentation delivery</li>
                    <li>Team training session</li>
                    <li>Support setup</li>
                    <li>Maintenance plan</li>
                  </ul>
                  <span className={styles.cardDay}>Days 19-20</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <div className={styles.deliveryGuarantee}>
            <div className={styles.guaranteeIcon}>✨</div>
            <h3>20-Day Delivery Guarantee</h3>
            <p>Your complete SaaS product, production-ready in just 20 days</p>
            <div className={styles.guaranteeFeatures}>
              <span>✓ Full-Stack Development</span>
              <span>✓ AI Integration</span>
              <span>✓ Cloud Deployment</span>
              <span>✓ 30-Day Support</span>
            </div>
          </div>
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
              ref={formRef}
              className={styles.contactForm}
              onSubmit={sendEmail}
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


