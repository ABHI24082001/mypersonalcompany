import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/styles/Projects.module.css';

export default function Projects() {
  const [activeTab, setActiveTab] = useState('all');
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'saas', label: 'SaaS Products' },
    { id: 'client', label: 'Client Projects' }
  ];

  const mobileApps = [
    {
      id: 1,
      title: 'Food Delivery App',
      subtitle: 'Multi-vendor food ordering platform',
      image: '/food.jpg',
      tech: ['React Native', 'Node.js', 'Firebase'],
      link: '#',
      category: 'mobile'
    },
    {
      id: 2,
      title: 'Event Management',
      subtitle: 'Arabic event booking & ticketing',
      image: '/app.jpg',
      tech: ['Flutter', 'AWS', 'Redux'],
      link: '#',
      category: 'mobile'
    },
    {
      id: 3,
      title: 'B2B E-commerce',
      subtitle: 'Wholesale marketplace solution',
      image: '/commerct.jpg',
      tech: ['React Native', 'Supabase', 'TypeScript'],
      link: '#',
      category: 'mobile'
    },
    {
      id: 4,
      title: 'HR Management',
      subtitle: 'Employee tracking & payroll',
      image: '/AI App.jpg',
      tech: ['Flutter', 'Firebase', 'GCP'],
      link: '#',
      category: 'mobile'
    },
    {
      id: 5,
      title: 'Logistics & Travel',
      subtitle: 'Fleet management system',
      image: '/socal.jpg',
      tech: ['Kotlin', 'Node.js', 'AWS'],
      link: '#',
      category: 'mobile'
    },
    {
      id: 6,
      title: 'Plant Care App',
      subtitle: 'Smart gardening assistant',
      image: '/app.jpg',
      tech: ['Swift', 'Firebase', 'AI'],
      link: '#',
      category: 'mobile'
    },
    {
      id: 7,
      title: 'Diabetic Alarm',
      subtitle: 'Health monitoring & reminders',
      image: '/food.jpg',
      tech: ['React Native', 'Appwrite', 'Redux'],
      link: '#',
      category: 'mobile'
    },
    {
      id: 8,
      title: 'AI Meeting Summary',
      subtitle: 'Auto transcribe & summarize',
      image: '/AI App.jpg',
      tech: ['Flutter', 'OpenAI', 'Firebase'],
      link: '#',
      category: 'mobile'
    }
  ];

  const saasProducts = [
    {
      id: 9,
      title: 'AI WayToBill',
      subtitle: 'Smart invoicing automation',
      image: '/n8n .png',
      tech: ['React Native', 'AI', 'Stripe'],
      link: '#',
      category: 'saas'
    },
    {
      id: 10,
      title: 'AI TharPay',
      subtitle: 'Payment processing platform',
      image: '/img.png',
      tech: ['React Native', 'Node.js', 'AI'],
      link: '#',
      category: 'saas'
    },
    {
      id: 11,
      title: 'AI Explain Screenshot',
      subtitle: 'Visual content analyzer',
      image: '/app.jpg',
      tech: ['React Native', 'OpenAI', 'AWS'],
      link: '#',
      category: 'saas'
    }
  ];

  const allProjects = [...mobileApps, ...saasProducts];

  const getFilteredProjects = () => {
    if (activeTab === 'all') return allProjects;
    if (activeTab === 'mobile') return mobileApps;
    if (activeTab === 'saas') return saasProducts;
    return [];
  };

  const techStack = [
    'React Native', 'Flutter', 'Kotlin', 'Swift', 'Java',
    'Node.js', 'Firebase', 'Supabase', 'Appwrite', 'AWS',
    'GCP', 'Redux', 'TypeScript', 'CI/CD', 'Docker'
  ];

  const tools = [
    'VS Code', 'Xcode', 'Android Studio', 'Figma',
    'Git', 'Postman', 'MongoDB', 'PostgreSQL'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsSection}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 50 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Projects & Products
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Innovative solutions crafted with cutting-edge technology
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className={styles.projectsGrid}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {getFilteredProjects().map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 50 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={styles.cardImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={500}
                  className={styles.projectImg}
                />
                <div className={styles.cardOverlay}>
                  <a href={project.link} className={styles.viewBtn}>
                    View Project
                  </a>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardSubtitle}>{project.subtitle}</p>

                <div className={styles.techStack}>
                  {project.tech.map((tech, i) => (
                    <span key={i} className={styles.techChip}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Cloud */}
        <motion.div
          className={styles.techSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className={styles.techTitle}>Our Tech Stack</h3>
          <div className={styles.techCloud}>
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                className={styles.techBadge}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <h3 className={styles.techTitle}>Tools We Use</h3>
          <div className={styles.techCloud}>
            {tools.map((tool, i) => (
              <motion.span
                key={i}
                className={styles.toolBadge}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className={styles.ctaTitle}>Have an idea? Let's build it.</h3>
          <a href="#contact" className={styles.ctaButton}>
            Start Your Project
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
