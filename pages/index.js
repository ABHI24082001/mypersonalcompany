import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/Portfolio.module.css";

export default function Home() {
  const [phoneScreen, setPhoneScreen] = useState("off"); // off, lockscreen, home
  const [password, setPassword] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [tapCount, setTapCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const tapTimeoutRef = useRef(null);
  const phoneScrollRef = useRef(null);

  const correctPassword = "1234";

  // Apps data with all categories
  const apps = [
    // My Apps Row 1
    {
      id: 1,
      name: "HookLens AI",
      icon: "📱",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      link: "https://hooklens.space",
      category: "app",
      description:
        "AI-powered Hook Analysis tool that helps content creators craft viral hooks using advanced language models.",
      tech: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
      details:
        "HookLens AI analyzes and generates high-converting hooks for social media content using GPT-4.",
    },
    {
      id: 2,
      name: "Japsutra",
      icon: "🏢",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      link: "https://play.google.com/store/apps/details?id=com.japsutra.abhi",
      category: "app",
      description:
        "Employee Self Service HRMS mobile application for workforce management.",
      tech: ["React Native", "Node.js", "MongoDB", "AWS"],
      details:
        "Complete HRMS solution with attendance, leave management, payroll, and employee portal.",
    },
    {
      id: 3,
      name: "StyleQ",
      icon: "✂️",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      link: "https://play.google.com/store/apps/details?id=com.styleq.app",
      category: "app",
      description:
        "Salon booking and management platform connecting customers with beauty professionals.",
      tech: ["React Native", "Firebase", "Stripe", "Maps API"],
      details:
        "Book appointments, manage salon operations, and grow your beauty business online.",
    },
    {
      id: 4,
      name: "CareZen",
      icon: "🏥",
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      link: "https://www.carezen.space",
      category: "app",
      description:
        "Healthcare management system for clinics and hospitals with patient records and appointments.",
      tech: ["React Native", "PostgreSQL", "AWS", "WebRTC"],
      details:
        "Manage patient records, appointments, prescriptions, and telemedicine consultations.",
    },
    // My Apps Row 2
    {
      id: 5,
      name: "Marwadi Katha",
      icon: "📚",
      color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      link: "https://www.marwadikathabook.space",
      category: "app",
      description:
        "Digital library of Marwadi stories and cultural literature.",
      tech: ["Next.js", "PostgreSQL", "Redis", "Vercel"],
      details:
        "Preserve and share Marwadi cultural stories with audio narration and text.",
    },
    {
      id: 6,
      name: "Diagnostic Alam",
      icon: "🔬",
      color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      link: "https://www.diagnostic-alam.space",
      category: "app",
      description:
        "Lab management system for diagnostic centers with report generation and billing.",
      tech: ["Next.js", "Node.js", "MySQL", "PDF Generation"],
      details:
        "Complete lab management with patient tests, reports, billing, and inventory.",
    },
    {
      id: 7,
      name: "Johar Yatri",
      icon: "🚗",
      color: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
      link: "https://www.joharyatri.space",
      category: "app",
      description:
        "Travel booking platform for tours, hotels, and transportation services.",
      tech: ["React Native", "Firebase", "Payment Gateway"],
      details:
        "Book travel packages, hotels, and transportation with real-time availability.",
    },
    // System Apps Row 3
    {
      id: 8,
      name: "About Me",
      icon: "👨‍💻",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      category: "system",
      description: "Learn about Abhishek Kumar",
      content: {
        name: "Abhishek Kumar",
        title: "React Native Developer • SaaS Builder • AI Engineer",

        bio: "Passionate React Native Developer with 3+ years of experience building high-performance mobile applications, SaaS products, AI tools, and startup MVPs. I help founders launch products quickly and turn ideas into scalable businesses.",

        location: "India 🇮🇳",

        experience: "3+ Years",

        roles: [
          "React Native Developer",
          "SaaS Builder",
          "AI Engineer",
          "Startup Founder",
          "MVP Expert",
        ],

        achievements: [
          "10+ Features Delivered",
          "3+ Years Mobile Development",
          "Cross Platform Specialist",
          "SaaS Founder",
          "AI Automation Builder",
          "20-Day Startup Builder",
        ],

        skills: [
          "React Native",
          "TypeScript",
          "Next.js",
          "Node.js",
          "Supabase",
          "Firebase",
          "OpenAI",
          "n8n",
          "AI Agents",
          "Redux",
          "GraphQL",
          "AWS",
        ],

        projects: [
          "HookLens AI",
          "HRMS Mobile App",
          "Japasutra",
          "Healthcare App",
          "E-commerce Platform",
        ],

        stats: {
          experience: "3+ Years",
          projects: "15+",
          startups: "5+",
          platforms: "iOS & Android",
        },

        resumeLink:
          "https://drive.google.com/file/d/1I25b90Fxi8zcM-DEF2JiHUR78MDqeLsg/view?usp=sharing",
      },
    },

    {
      id: 9,
      name: "Services",
      icon: "🚀",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      category: "system",
      description: "What I Build",
      content: {
        services: [
          {
            title: "Mobile App Development",
            desc: "iOS & Android apps with React Native",
            icon: "📱",
          },
          {
            title: "SaaS Development",
            desc: "Full-stack web applications",
            icon: "💻",
          },
          {
            title: "AI Integrations",
            desc: "ChatGPT, Claude, Gemini APIs",
            icon: "🤖",
          },
          { title: "AI Agents", desc: "Autonomous AI workflows", icon: "🧠" },
          {
            title: "Workflow Automation",
            desc: "n8n, Zapier, Make automations",
            icon: "⚙️",
          },
          {
            title: "Admin Panels",
            desc: "Custom dashboards & CMS",
            icon: "📊",
          },
          {
            title: "Website Development",
            desc: "Next.js, React websites",
            icon: "🌐",
          },
          { title: "MVP Launches", desc: "20-day startup builds", icon: "🚀" },
        ],
      },
    },
    {
      id: 10,
      name: "Workflow",
      icon: "⚙️",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      category: "system",
      description: "How I Work",
      content: {
        steps: [
          { phase: "Idea", desc: "Understanding your vision", icon: "💡" },
          { phase: "Design", desc: "UI/UX & wireframes", icon: "🎨" },
          {
            phase: "Development",
            desc: "Building with best practices",
            icon: "⚡",
          },
          { phase: "Testing", desc: "QA & bug fixes", icon: "🧪" },
          { phase: "Launch", desc: "Deployment & go-live", icon: "🚀" },
          { phase: "Growth", desc: "Support & scaling", icon: "📈" },
        ],
      },
    },
    {
      id: 11,
      name: "Contact",
      icon: "📞",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      category: "system",
      description: "Get In Touch",
      content: {
        contacts: [
          {
            platform: "LinkedIn",
            icon: "💼",
            link: "https://linkedin.com/in/abhishek-kumar-201b91195",
          },
          {
            platform: "GitHub",
            icon: "💻",
            link: "https://github.com/ABHI24082001",
          },
          {
            platform: "WhatsApp",
            icon: "💬",
            link: "https://wa.me/8709138950",
          },
          {
            platform: "Email",
            icon: "📧",
            link: "mailto:sonukr24082001@gmail.com",
          },
          {
            platform: "Twitter",
            icon: "🐦",
            link: "https://x.com/Abhishe35257568",
          },
        ],
      },
    },
    {
      id: 12,
      name: "Apps",
      icon: "📱",
      color: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      category: "apps",
      description: "Published Apps",
      content: {
        apps: [
          {
            name: "CloudTree HRMS",
            icon: "📱",
            description: "HRMS Mobile App",
            link: "https://apps.apple.com/in/app/hrms-cloudtree/id6755762738",
          },
        ],
      },
    },
  ];

  // Handle phone double tap
  const handlePhoneTap = () => {
    if (phoneScreen === "off") {
      setTapCount(prev => prev + 1);
      
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      
      if (tapCount + 1 === 2) {
        setPhoneScreen("lockscreen");
        setTapCount(0);
      } else {
        tapTimeoutRef.current = setTimeout(() => {
          setTapCount(0);
        }, 300);
      }
    }
  };

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setPhoneScreen("home");
      setPassword("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      alert("Wrong password! Try: " + correctPassword);
      setPassword("");
    }
  };

  // Get current time
  const getCurrentTime = () => {
    return "9:41";
  };

  // Handle app click
  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  // Handle phone scroll
  const handlePhoneScroll = () => {
    if (phoneScrollRef.current) {
      const scrollTop = phoneScrollRef.current.scrollTop;
      const scrollHeight = phoneScrollRef.current.scrollHeight;
      const clientHeight = phoneScrollRef.current.clientHeight;
      
      setScrollPosition(scrollTop);
      
      // Check if at bottom
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        // Near bottom
      }
    }
  };

  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  // Render app drawer modal
  const renderAppDrawer = () => {
    if (!selectedApp) return null;

    // About Me App
    if (selectedApp.category === "system" && selectedApp.name === "About Me") {
      return (
        <motion.div
          className={styles.appDrawer}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className={styles.drawerHandle}></div>
          <button
            className={styles.drawerClose}
            onClick={() => setSelectedApp(null)}
          >
            ✕
          </button>

          <div className={styles.drawerContent}>
            <div
              className={styles.drawerHeader}
              style={{ background: selectedApp.color }}
            >
              <div className={styles.drawerIcon}>{selectedApp.icon}</div>
              <h2>{selectedApp.content.name}</h2>
            </div>

            <div className={styles.drawerBody}>
              <div className={styles.roles}>
                {selectedApp.content.roles.map((role, i) => (
                  <span key={i} className={styles.roleTag}>
                    {role}
                  </span>
                ))}
              </div>

              <p className={styles.bio}>{selectedApp.content.bio}</p>

              <div className={styles.achievements}>
                <h3>Achievements</h3>
                <ul>
                  {selectedApp.content.achievements.map((achievement, i) => (
                    <li key={i}>✓ {achievement}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.skills}>
                <h3>Skills</h3>
                <div className={styles.skillTags}>
                  {selectedApp.content.skills.map((skill, i) => (
                    <span key={i} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.drawerBody}>
                <h3 className={styles.profileTitle}>
                  {selectedApp.content.title}
                </h3>

                <div className={styles.infoRow}>
                  <span>📍 {selectedApp.content.location}</span>
                  <span>💼 {selectedApp.content.experience}</span>
                </div>

                <div className={styles.roles}>
                  {selectedApp.content.roles.map((role, i) => (
                    <span key={i} className={styles.roleTag}>
                      {role}
                    </span>
                  ))}
                </div>

                <p className={styles.bio}>{selectedApp.content.bio}</p>

                {/* Stats */}
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <h2>{selectedApp.content.stats.experience}</h2>
                    <p>Experience</p>
                  </div>

                  <div className={styles.statCard}>
                    <h2>{selectedApp.content.stats.projects}</h2>
                    <p>Projects</p>
                  </div>

                  <div className={styles.statCard}>
                    <h2>{selectedApp.content.stats.startups}</h2>
                    <p>Startups</p>
                  </div>

                  <div className={styles.statCard}>
                    <h2>{selectedApp.content.stats.platforms}</h2>
                    <p>Platforms</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className={styles.achievements}>
                  <h3>🏆 Achievements</h3>
                  <ul>
                    {selectedApp.content.achievements.map((achievement, i) => (
                      <li key={i}>✓ {achievement}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className={styles.skills}>
                  <h3>⚡ Skills</h3>
                  <div className={styles.skillTags}>
                    {selectedApp.content.skills.map((skill, i) => (
                      <span key={i} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className={styles.projects}>
                  <h3>🚀 Featured Projects</h3>

                  <div className={styles.skillTags}>
                    {selectedApp.content.projects.map((project, i) => (
                      <span key={i} className={styles.skillTag}>
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.resumeActions}>
                  <a
                    href={selectedApp.content.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resumeButton}
                  >
                    👀 View Resume
                  </a>

                  <a
                    href={selectedApp.content.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resumeButton}
                  >
                    ⬇️ Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Services App
    if (selectedApp.category === "system" && selectedApp.name === "Services") {
      return (
        <motion.div
          className={styles.appDrawer}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className={styles.drawerHandle}></div>
          <button className={styles.drawerClose} onClick={() => setSelectedApp(null)}>✕</button>
          
          <div className={styles.drawerContent}>
            <div className={styles.drawerHeader} style={{ background: selectedApp.color }}>
              <div className={styles.drawerIcon}>{selectedApp.icon}</div>
              <h2>{selectedApp.description}</h2>
            </div>
            
            <div className={styles.drawerBody}>
              <div className={styles.servicesList}>
                {selectedApp.content.services.map((service, i) => (
                  <div key={i} className={styles.serviceItem}>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <div className={styles.serviceText}>
                      <h4>{service.title}</h4>
                      <p>{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Workflow App
    if (selectedApp.category === "system" && selectedApp.name === "Workflow") {
      return (
        <motion.div
          className={styles.appDrawer}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className={styles.drawerHandle}></div>
          <button className={styles.drawerClose} onClick={() => setSelectedApp(null)}>✕</button>
          
          <div className={styles.drawerContent}>
            <div className={styles.drawerHeader} style={{ background: selectedApp.color }}>
              <div className={styles.drawerIcon}>{selectedApp.icon}</div>
              <h2>{selectedApp.description}</h2>
            </div>
            
            <div className={styles.drawerBody}>
              <div className={styles.workflowTimeline}>
                {selectedApp.content.steps.map((step, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineIcon}>{step.icon}</div>
                    <div className={styles.timelineContent}>
                      <h4>{step.phase}</h4>
                      <p>{step.desc}</p>
                    </div>
                    {i < selectedApp.content.steps.length - 1 && (
                      <div className={styles.timelineConnector}>↓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Contact App
    if (selectedApp.category === "system" && selectedApp.name === "Contact") {
      return (
        <motion.div
          className={styles.appDrawer}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className={styles.drawerHandle}></div>
          <button className={styles.drawerClose} onClick={() => setSelectedApp(null)}>✕</button>
          
          <div className={styles.drawerContent}>
            <div className={styles.drawerHeader} style={{ background: selectedApp.color }}>
              <div className={styles.drawerIcon}>{selectedApp.icon}</div>
              <h2>{selectedApp.description}</h2>
            </div>
            
            <div className={styles.drawerBody}>
              <div className={styles.contactsList}>
                {selectedApp.content.contacts.map((contact, i) => (
                  <a key={i} href={contact.link} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                    <div className={styles.contactIcon}>{contact.icon}</div>
                    <div className={styles.contactText}>{contact.platform}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Regular App
    return (
      <motion.div
        className={styles.appDrawer}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className={styles.drawerHandle}></div>
        <button className={styles.drawerClose} onClick={() => setSelectedApp(null)}>✕</button>
        
        <div className={styles.drawerContent}>
          <div className={styles.drawerHeader} style={{ background: selectedApp.color }}>
            <div className={styles.drawerIcon}>{selectedApp.icon}</div>
            <h2>{selectedApp.name}</h2>
          </div>
          
          <div className={styles.drawerBody}>
            <p className={styles.appDescription}>{selectedApp.description}</p>
            
            {selectedApp.details && (
              <p className={styles.appDetails}>{selectedApp.details}</p>
            )}
            
            {selectedApp.tech && (
              <div className={styles.techStack}>
                <h3>Tech Stack</h3>
                <div className={styles.techTags}>
                  {selectedApp.tech.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            )}
            
            {selectedApp.link && (
              <a href={selectedApp.link} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
                Visit App
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Head>
        <title>
          Abhishek Kumar - Mobile App Developer | SaaS Builder | AI Engineer
        </title>
        <meta
          name="description"
          content="I build Mobile Apps, SaaS Products, AI Tools, Automations, and MVPs that launch fast. React Native, Next.js, Supabase, OpenAI specialist."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>
        {/* Hero Section Above Phone */}
        <div className={styles.heroAbove}>
          <h1 className={styles.mainHeadline}>App Idea? Let's Make It Real.</h1>
          <p className={styles.mainSubheadline}>
            I build <strong>Mobile Apps</strong>, <strong>SaaS Products</strong>
            , <strong>AI Tools</strong>, <strong>Automations</strong>, and{" "}
            <strong>MVPs</strong> that launch fast.
          </p>

          <div className={styles.skillsBadge}>
            React Native • Next.js • TypeScript • Supabase • Firebase • OpenAI •
            Claude • Gemini • n8n • AI Agents • Multi-Agent Systems • RAG • Text
            Embeddings • Vector Search • Voice Assistants • Speech-to-Text •
            Text-to-Speech • Face Recognition • Computer Vision • OCR • AI
            Automation • API Integrations • SaaS MVPs • Startup Launches
          </div>

          <div className={styles.Badge}>
            Double-tap the phone below to wake it up, then unlock it with{" "}
            <strong>1234</strong> to explore my apps, learn more about me, and
            start your project.
          </div>

          <div className={styles.ctaButtons}>
            <button
              className={styles.ctaPrimary}
              onClick={() => {
                if (phoneScreen === "home") {
                  const myAppsApp = apps.find((a) => a.id === 1);
                  if (myAppsApp) setSelectedApp(myAppsApp);
                } else {
                  alert("Unlock the phone first to view apps!");
                }
              }}
            >
              View My Apps
            </button>
            <a
              href="#contact"
              className={styles.ctaSecondary}
              onClick={(e) => {
                e.preventDefault();
                if (phoneScreen === "home") {
                  const contactApp = apps.find((a) => a.name === "Contact");
                  if (contactApp) setSelectedApp(contactApp);
                } else {
                  alert("Unlock the phone first!");
                }
              }}
            >
              Start Your Project
            </a>
          </div>
        </div>

        {/* Android Phone Mockup */}
        <div className={styles.phoneWrapper}>
          <div className={styles.androidPhone} onClick={handlePhoneTap}>
            <div className={styles.phoneFrame}>
              {/* Phone Screen Off */}
              {phoneScreen === "off" && (
                <div className={styles.phoneScreenOff}>
                  <div className={styles.tapHint}>Double tap to wake</div>
                </div>
              )}

              {/* Phone Lock Screen */}
              {phoneScreen === "lockscreen" && (
                <div className={styles.phoneLockScreen}>
                  <div className={styles.statusBar}>
                    <span>{getCurrentTime()}</span>
                    <div className={styles.statusIcons}>
                      <span>📶</span>
                      <span>📡</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  <div className={styles.lockContent}>
                    <div className={styles.lockTime}>{getCurrentTime()}</div>
                    <div className={styles.lockDate}>
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <div className={styles.lockForm}>
                      <div className={styles.lockIcon}>🔒</div>
                      <h3>Token Required</h3>
                      <p>Enter Password</p>

                      <form
                        onSubmit={handlePasswordSubmit}
                        className={styles.passwordForm}
                      >
                        <input
                          type="password"
                          className={styles.passwordInput}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className={styles.unlockBtn}>
                          Unlock
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Phone Home Screen */}
              {phoneScreen === "home" && (
                <div
                  className={styles.phoneHomeScreen}
                  ref={phoneScrollRef}
                  onScroll={handlePhoneScroll}
                >
                  <div className={styles.statusBar}>
                    <span>{getCurrentTime()}</span>
                    <div className={styles.statusIcons}>
                      <span>📶</span>
                      <span>📡</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* Top Widget */}
                  <div className={styles.homeWidget}>
                    <h2>
                      App Idea?
                      <br />
                      Let's Make It Real.
                    </h2>
                    <p>Building products faster than ever.</p>
                  </div>

                  {/* Apps Grid */}
                  <div className={styles.appsGrid}>
                    {apps.map((app) => (
                      <div
                        key={app.id}
                        className={styles.appIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAppClick(app);
                        }}
                      >
                        <div
                          className={styles.appIconBox}
                          style={{ background: app.color }}
                        >
                          <span className={styles.appEmoji}>{app.icon}</span>
                        </div>
                        <span className={styles.appName}>{app.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Section at Bottom */}
                  <div className={styles.phoneCta}>
                    <h3>Got an Idea?</h3>
                    <p>Let's turn your startup idea into a real product.</p>
                    <div className={styles.phoneCtaButtons}>
                      <a
                        href="https://wa.me/8709138950"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.phoneCtaBtn}
                      >
                        💬 WhatsApp Me
                      </a>
                      <a
                        href="mailto:sonukr24082001@gmail.com"
                        className={styles.phoneCtaBtn}
                      >
                        📧 Email Me
                      </a>
                    </div>
                  </div>

                  {/* Bottom Dock */}
                  <div className={styles.androidDock}>
                    <button
                      className={styles.dockBtn}
                      onClick={() =>
                        phoneScrollRef.current?.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        })
                      }
                    >
                      🏠 Home
                    </button>
                    <button
                      className={styles.dockBtn}
                      onClick={() => setSelectedApp(apps[0])}
                    >
                      📱 Apps
                    </button>
                    <button
                      className={styles.dockBtn}
                      onClick={() => {
                        const contactApp = apps.find(
                          (a) => a.name === "Contact",
                        );
                        if (contactApp) setSelectedApp(contactApp);
                      }}
                    >
                      📞 Contact
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className={styles.toast}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <div>Don't waste your token.</div>
              <div>Let's Make LLM Apps 🚀</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Drawer Modal */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div
              className={styles.drawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                {renderAppDrawer()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
