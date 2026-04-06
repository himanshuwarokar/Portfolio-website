import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getProfile } from "./api/portfolioApi";
import ContactForm from "./components/ContactForm";

const defaultSkills = [
  "Java",
  "DSA",
  "HTML",
  "CSS",
  "Tailwind",
  "Bootstrap",
  "SQL",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "REST API Design",
  "UI Engineering"
];

const skillRatings = [
  { name: "HTML", value: 95 },
  { name: "CSS", value: 90 },
  { name: "JavaScript", value: 90 },
  { name: "React", value: 75 },
  { name: "Node", value: 70 },
  { name: "Express", value: 70 },
  { name: "Bootstrap", value: 60 },
  { name: "MongoDB", value: 85 },
  { name: "Java", value: 82 },
  { name: "SQL", value: 90 }
];

const educationTimeline = [
  {
    title: "10th Standard",
    summary: "Sati Anusaya Mata Vidyalaya, Paradsinga",
    period: "2021 | Maharashtra State Board",
    marks: "85.80/100"
  },
  {
    title: "12th Standard",
    summary: "Nabira Mahavidyalaya, Katol",
    period: "2021 - 2023 | Maharashtra State Board",
    marks: "59/100"
  },
  {
    title: "B.Tech in Information Technology",
    summary: "Nagpur Institute of Technology, Nagpur",
    period: "2023 - 2027 | Rashtrasant Tukadoji Maharaj Nagpur University",
    marks: "7.30/10 [ till 2nd year ]"
  }
];

const createTopicCards = (technology, titles) =>
  titles.map((title, index) => ({
    title,
    imageUrl: `https://picsum.photos/seed/${encodeURIComponent(
      `${technology}-${index + 1}`
    )}/640/400`
  }));

const withEmptyUrl = (cards) =>
  cards.map((card) => ({
    ...card,
    url: ""
  }));

const technologyProjectMap = {
  "MERN Stack": [
  {
    title: "ShopEasy E-Commerce Platform",
    imageUrl: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://shopeasy-eight-silk.vercel.app/"
  },
  {
    title: "Personal Portfolio",
    imageUrl: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://github.com/yourname/portfolio"
  },
  {
    title: "Youth Skill Gap Analyzer",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://youth-skill-gap-analyzer.vercel.app"
  }
],
"HTML": [
  {
    title: "Admission Form",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681487870238-4a2dfddc6bcb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/Admission%20form/"
  },
  {
    title: "All HTML Tags",
    imageUrl: "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/all%20html%20tag/"
  },
  {
    title: "Sample Layout",
    imageUrl: "https://plus.unsplash.com/premium_vector-1682310595106-ecf4ee316a54?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/sample%20layout/"
  },
  {
    title: "HTML Table",
    imageUrl: "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/table%20in%20html/"
  }
],
  "CSS": [
  {
    title: "User Login",
    imageUrl: "https://images.unsplash.com/photo-1762330472502-83efbe1d4478?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/login%20page/"
  },
  {
    title: "Restaurant page",
    imageUrl: "https://plus.unsplash.com/premium_photo-1726704070076-bbdbb3efe29b?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/restaurant%20page/"
  },
  {
    title: "Dashboard UI",
    imageUrl: "https://images.unsplash.com/photo-1771923082503-0a3381c46cef?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/dashboard%20page/"
  },
  {
    title: "Photographer Home Page",
    imageUrl: "https://images.unsplash.com/photo-1611682158949-ccd7db9ce721?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/photographer%20page/"
  },
  {
    title: "Shopping Cart UI",
    imageUrl: "https://images.unsplash.com/photo-1657256031812-4702fe316f1b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/shopping%20page/"
  }
],
  JavaScript: [
  {
    title: "Number Gussing Game",
    imageUrl: "https://images.unsplash.com/photo-1608370617993-a5c9ee904646?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshu-guess-game.netlify.app/"
  },
  {
    title: "Digital calculator",
    imageUrl: "https://images.unsplash.com/photo-1711344397160-b23d5deaa012?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/digital-calculator/"
  },
  {
    title: "To-do app",
    imageUrl: "https://images.unsplash.com/photo-1598791318878-10e76d178023?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshu-todo-app-123.netlify.app/"
  },
  {
    title: "BMI Calculator",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681400641919-d5d03f6c0720?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/bmi%20calculator/"
  },
  {
    title: "Real Time Digital Clock",
    imageUrl: "https://images.unsplash.com/photo-1591436123200-5ccc6511c0e9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/Real-Time-digital-clock/"
  },
  {
    title: "Bank Transcation System",
    imageUrl: "https://images.unsplash.com/photo-1684679674829-fc7b436ec8e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/bank%20system/"
  }

],
  "React": [
  {
    title: "Weather app",
    imageUrl: "https://images.unsplash.com/photo-1705077296278-d82dd5c8662f?q=80&w=1109&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://weather-app-pi-rouge-58.vercel.app/"
  },
  {
    title: "background changer",
    imageUrl: "https://images.unsplash.com/photo-1727786464880-c660f017c727?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://dulcet-tiramisu-0c4158.netlify.app/"
  }
  ],
  Bootstrap: [
    {
    title: "To-do app",
    imageUrl: "https://images.unsplash.com/photo-1598791318878-10e76d178023?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshu-todo-app-123.netlify.app/"
    },
    {
    title: "Student Management System",
    imageUrl: "https://images.unsplash.com/photo-1763718432504-7716caff6e99?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://himanshuwarokar.github.io/All-files/student%20management%20system/"
}]
};

const technologyButtons = ["MERN Stack", "React", "JavaScript", "HTML", "CSS", "Bootstrap"];

function App() {
  const [profile, setProfile] = useState(null);
  const [pageState, setPageState] = useState({ loading: true, error: "" });
  const [photoMissing, setPhotoMissing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState(technologyButtons[0]);
  const [typingWidthPx, setTypingWidthPx] = useState(0);
  const typingMeasureRef = useRef(null);
  const heroTitle = "Full Stack Web Developer";

  useEffect(() => {
    const loadData = async () => {
      setPageState({ loading: true, error: "" });
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        setPageState({
          loading: false,
          error:
            error.response?.data?.message ||
            "Backend is not reachable. Showing profile demo data until backend starts."
        });
        return;
      }

      setPageState({ loading: false, error: "" });
    };

    loadData();
  }, []);

  useLayoutEffect(() => {
    const updateTypingWidth = () => {
      if (typingMeasureRef.current) {
        setTypingWidthPx(Math.ceil(typingMeasureRef.current.getBoundingClientRect().width));
      }
    };

    updateTypingWidth();
    window.addEventListener("resize", updateTypingWidth);
    document.fonts?.ready?.then(updateTypingWidth);

    return () => {
      window.removeEventListener("resize", updateTypingWidth);
    };
  }, [heroTitle]);

  const skills = useMemo(() => {
    if (profile?.skills?.length) {
      return profile.skills;
    }

    return defaultSkills;
  }, [profile]);

  const activeTechnologyCards = technologyProjectMap[selectedTechnology] || [];
  const skillSplitIndex = Math.ceil(skillRatings.length / 2);
  const leftSkillRatings = skillRatings.slice(0, skillSplitIndex);
  const rightSkillRatings = skillRatings.slice(skillSplitIndex);

  if (pageState.loading) {
    return (
      <main className="loading-screen">
        <section className="loader-card">
          <p className="eyebrow">Preparing Portfolio</p>
          <h2>Loading your content...</h2>
        </section>
      </main>
    );
  }

  const displayName =
    profile?.fullName?.trim() && profile.fullName.trim().toLowerCase() !== "your name"
      ? profile.fullName
      : "Himanshu Warokar";
  const heroInitials = displayName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const defaultHeroDescription =
    "I am Himanshu Warokar, Bachelor's student majoring in Information Technology at Nagpur Institute of Technology. With a robust academic background and a passion for technology, I am proficient in HTML, CSS, JavaScript and fullstack web development using MongoDB, Express, React, and Node.js and DSA in Java. Thank you for visiting my profile, and I look forward to connecting with you!";
  const heroDescription =
    profile?.heroDescription?.trim() &&
    profile.heroDescription.trim().toLowerCase() !==
      "i build clean, scalable web apps using mongodb, express, react, and node.js."
      ? profile.heroDescription
      : defaultHeroDescription;
  const resumeUrl = profile?.resumeUrl?.trim() || "/Himanshu_Warokar_Resume.txt";
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="page-bg">
      <header className="top-nav reveal">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            HW
          </span>
          <div>
            <p>Developer Portfolio</p>
            <strong>{displayName}</strong>
          </div>
        </div>

        <button
          className={`menu-toggle${isMobileMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={toggleMobileMenu}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links${isMobileMenuOpen ? " is-open" : ""}`}
          aria-label="Primary"
        >
          <a className="nav-link" href="#home" onClick={handleNavLinkClick}>
            Home
          </a>
          <a className="nav-link" href="#about" onClick={handleNavLinkClick}>
            About
          </a>
          <a className="nav-link" href="#projects" onClick={handleNavLinkClick}>
            Projects
          </a>
          <a className="nav-link" href={resumeUrl} download onClick={handleNavLinkClick}>
            Resume
          </a>
          <a className="nav-link" href="#contact" onClick={handleNavLinkClick}>
            Contact
          </a>
        </nav>
      </header>

      <main className="app-shell">
        <section className="hero-card reveal" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Full Stack Web Developer</p>
            <h1>{displayName}</h1>
            <h2
              className="typing-text"
              style={{
                "--typing-width": `${typingWidthPx ? typingWidthPx + 10 : heroTitle.length * 16}px`,
                "--typing-steps": heroTitle.length
              }}
            >
              <span className="typing-text-content">{heroTitle}</span>
            </h2>
            <span ref={typingMeasureRef} className="typing-text-measure" aria-hidden="true">
              {heroTitle}
            </span>
            <p>{heroDescription}</p>
            <div className="hero-actions">
              {profile?.github ? (
                <a className="btn btn-secondary" href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
              {profile?.linkedin ? (
                <a className="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              ) : null}
              {profile?.email ? (
                <a className="btn btn-outline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              ) : null}
              <a className="btn btn-secondary btn-with-icon" href={resumeUrl} download>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M12 3v11m0 0l4-4m-4 4l-4-4M5 17v2h14v-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Resume
              </a>
            </div>
            {pageState.error ? <p className="status error">{pageState.error}</p> : null}
          </div>

          <aside className="hero-panel" aria-label="Portfolio highlights">
            {!photoMissing ? (
              <img
                className="profile-photo"
                src="/mypic.jpeg"
                alt={`${displayName} profile`}
                onError={() => setPhotoMissing(true)}
              />
            ) : (
              <div className="photo-fallback" aria-hidden="true">
                {heroInitials}
              </div>
            )}
            <ul className="quick-facts">
              <li>
                <span>{skills.length}</span>
                Skills
              </li>
              <li>
                <span>24h</span>
                Typical reply time
              </li>
            </ul>
          </aside>
        </section>

        <section className="insight-grid">
          <article className="surface-card reveal" id="about">
            <div className="section-head">
              <h3>About</h3>
            </div>
            <p>
              {profile?.about ||
                "Write a focused summary of your impact, your strengths, and the kind of products you enjoy building."}
            </p>
          </article>

          <article className="surface-card reveal" id="skills">
            <div className="section-head">
              <h3>Core Skills</h3>
            </div>
            <div className="skill-cloud">
              {skills.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="surface-card reveal" id="projects">
          <div className="section-head">
            <h3>Projects</h3>
            <p>Click a technology to preview projects.</p>
          </div>
          <div className="project-showcase">
            <aside className="project-tech-buttons" aria-label="Project technologies">
              {technologyButtons.map((technology) => (
                <button
                  key={technology}
                  type="button"
                  className={`project-tech-btn${selectedTechnology === technology ? " active" : ""}`}
                  aria-pressed={selectedTechnology === technology}
                  onClick={() => setSelectedTechnology(technology)}
                >
                  {technology}
                </button>
              ))}
            </aside>

            <div className="project-topic-grid">
              {activeTechnologyCards.map((card) => {
                const directUrl = card.url?.trim() || "";
                const fallbackUrl = `https://www.google.com/search?q=${encodeURIComponent(
                  `${card.title} ${selectedTechnology} project`
                )}`;
                const cardUrl = directUrl || fallbackUrl;
                const hasUrl = Boolean(cardUrl);
                const cardContent = (
                  <>
                    <div className="project-topic-image-wrap">
                      <img src={card.imageUrl} alt={card.title} loading="lazy" />
                    </div>
                    <h4>
                      {card.title} <span className="project-title-arrow" aria-hidden="true">&#8599;</span>
                    </h4>
                  </>
                );

                return (
                  <a
                    key={`${selectedTechnology}-${card.title}`}
                    className={`project-topic-card project-topic-link reveal${hasUrl ? "" : " disabled"}`}
                    href={hasUrl ? cardUrl : "#"}
                    target={hasUrl ? "_blank" : undefined}
                    rel={hasUrl ? "noreferrer" : undefined}
                    aria-disabled={!hasUrl}
                    onClick={(event) => {
                      if (!hasUrl) {
                        event.preventDefault();
                      }
                    }}
                  >
                    {cardContent}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="surface-card reveal" id="education">
          <div className="section-head">
            <h3>Education</h3>
          </div>
          <div className="education-timeline">
            {educationTimeline.map((education) => (
              <article key={education.title} className="education-box">
                <div className="education-box-head">
                  <h4>{education.title}</h4>
                  {education.marks ? <span className="education-marks">{education.marks}</span> : null}
                </div>
                <p>{education.summary}</p>
                <span className="education-meta">{education.period}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card reveal" id="skill-ratings">
          <div className="section-head">
            <h3>Skills</h3>
            <p>Range: 0% to 100%</p>
          </div>
          <div className="skill-range-grid">
            <div className="skill-range-column">
              {leftSkillRatings.map((skill) => (
                <article key={skill.name} className="skill-range-item">
                  <div className="skill-range-head">
                    <h4>{skill.name}</h4>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="skill-range-track" aria-hidden="true">
                    <div className="skill-range-fill" style={{ "--level": `${skill.value}%` }} />
                  </div>
                </article>
              ))}
            </div>

            <div className="skill-range-column">
              {rightSkillRatings.map((skill) => (
                <article key={skill.name} className="skill-range-item">
                  <div className="skill-range-head">
                    <h4>{skill.name}</h4>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="skill-range-track" aria-hidden="true">
                    <div className="skill-range-fill" style={{ "--level": `${skill.value}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card reveal" id="contact">
          <div className="section-head">
            <h3>Contact</h3>
          </div>
          <div className="manager-grid">
            <article className="contact-info-card" aria-label="Contact information">
              <h4>Himanshu Warokar</h4>
              <p className="contact-role">Full-stack Developer</p>
              <p className="contact-text">Connect with me via and call in to my account.</p>

              <p className="contact-detail">
                <strong>Phone:</strong>{" "}
                <a href="tel:+918999786906">+91 8999786906</a>
              </p>
              <p className="contact-detail">
                <strong>Email:</strong>{" "}
                <a href="mailto:warokarhimanshu12@gmail.com">warokarhimanshu12@gmail.com</a>
              </p>
            </article>

            <div className="form-shell">
              <ContactForm />
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>© 2026. All rights reserved by Himanshu Warokar</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
