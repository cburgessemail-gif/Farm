import React, { useMemo, useState } from "react";

type View = "home" | "role";
type Role = "guest" | "customer" | "grower" | "youth" | "volunteer" | "supervisor";

const IMAGES = {
  hero: "/GrowArea.jpg",
  history: "/GrowArea2.jpg",
};

const ROLES: { id: Role; label: string; subtitle: string }[] = [
  { id: "guest", label: "Guest", subtitle: "Explore the farm" },
  { id: "customer", label: "Customer", subtitle: "Find food and shop" },
  { id: "grower", label: "Grower", subtitle: "See crops and workflow" },
  { id: "youth", label: "Youth", subtitle: "Learn and work" },
  { id: "volunteer", label: "Volunteer", subtitle: "Help where needed" },
  { id: "supervisor", label: "Supervisor", subtitle: "Guide and support" },
];

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedRole, setSelectedRole] = useState<Role>("guest");

  const roleData = useMemo(() => {
    switch (selectedRole) {
      case "guest":
        return {
          title: "Guest Experience",
          intro:
            "A welcoming path into the farm, its purpose, its visible activity, and the ways people can participate.",
          bullets: [
            "See the farm as a living place",
            "Understand what is active now",
            "Explore food, events, and pathways",
            "Move into deeper participation when ready",
          ],
          sections: [
            {
              title: "What a guest sees",
              text: "A clear introduction to the farm, the purpose behind it, and the ways the ecosystem is already moving.",
            },
            {
              title: "What matters here",
              text: "The experience should feel welcoming, grounded, and easy to understand without losing the depth of the vision.",
            },
          ],
        };
      case "customer":
        return {
          title: "Customer Experience",
          intro:
            "A direct path to fresh food, access, ordering, pickup, and the visible connection between food and place.",
          bullets: [
            "See what is available now",
            "Move toward shopping and pickup",
            "Connect food with the farm story",
            "Support the ecosystem through purchase",
          ],
          sections: [
            {
              title: "Food access",
              text: "The customer path should feel simple, real, and directly connected to the farm rather than detached from it.",
            },
            {
              title: "What makes it different",
              text: "Customers are not just buying food. They are entering a local ecosystem built around access, learning, and community.",
            },
          ],
        };
      case "grower":
        return {
          title: "Grower Experience",
          intro:
            "A view into crops, production rhythm, practical workflow, and the systems that support successful growing.",
          bullets: [
            "Visible growing activity",
            "Crop priorities and workflow",
            "Tools, timing, and support",
            "Connection to the broader ecosystem",
          ],
          sections: [
            {
              title: "Production",
              text: "This path reflects active growing, practical needs, and the work of supporting healthy crops and visible output.",
            },
            {
              title: "Connected work",
              text: "Growing is not separate from the rest of the system. It supports food access, learning, events, and long-term development.",
            },
          ],
        };
      case "youth":
        return {
          title: "Youth Experience",
          intro:
            "A structured pathway for work, learning, responsibility, growth, and belonging through real farm activity.",
          bullets: [
            "Learn by doing",
            "Build skills through participation",
            "Experience responsibility and progress",
            "Connect work with future opportunity",
          ],
          sections: [
            {
              title: "Learning through work",
              text: "The youth path should show real structure, participation, and growth rather than a generic training screen.",
            },
            {
              title: "Future pathway",
              text: "This role makes visible how the farm can support confidence, responsibility, and broader opportunity.",
            },
          ],
        };
      case "volunteer":
        return {
          title: "Volunteer Experience",
          intro:
            "A clear path into contribution, visible needs, meaningful service, and community-powered support.",
          bullets: [
            "See where help is needed",
            "Join events and farm tasks",
            "Support visible momentum",
            "Belong through service and contribution",
          ],
          sections: [
            {
              title: "Where volunteers fit",
              text: "Volunteers should quickly understand how their time and effort support the movement of the farm.",
            },
            {
              title: "Community in motion",
              text: "This path should feel active, useful, and connected to the larger purpose of the ecosystem.",
            },
          ],
        };
      case "supervisor":
        return {
          title: "Supervisor Experience",
          intro:
            "A view into coordination, oversight, support, and the practical flow behind daily movement on the farm.",
          bullets: [
            "See who is active",
            "Support daily movement",
            "Guide youth and teams",
            "Hold the visible system together",
          ],
          sections: [
            {
              title: "Oversight",
              text: "This path reflects the practical side of coordination, support, visibility, and keeping the system coherent.",
            },
            {
              title: "Stewardship",
              text: "A supervisor is not just managing tasks. This role helps hold people, timing, and movement together.",
            },
          ],
        };
      default:
        return null;
    }
  }, [selectedRole]);

  if (view === "role" && roleData) {
    return (
      <div style={styles.app}>
        <TopNav
          onHome={() => setView("home")}
          rightContent={
            <div style={styles.rolePillRow}>
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  style={{
                    ...styles.rolePill,
                    ...(selectedRole === role.id ? styles.rolePillActive : {}),
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>
          }
        />

        <section style={styles.roleHero}>
          <div style={styles.roleHeroInner}>
            <button style={styles.backButton} onClick={() => setView("home")}>
              ← Back to farm
            </button>
            <div style={styles.eyebrowDark}>Role-based live view</div>
            <h1 style={styles.roleTitle}>{roleData.title}</h1>
            <p style={styles.roleIntro}>{roleData.intro}</p>
          </div>
        </section>

        <section style={styles.roleBulletSection}>
          <div style={styles.container}>
            <div style={styles.eyebrowDark}>What this path shows</div>
            <div style={styles.bulletGrid}>
              {roleData.bullets.map((bullet) => (
                <div key={bullet} style={styles.bulletCard}>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.detailSection}>
          <div style={styles.detailGrid}>
            {roleData.sections.map((section) => (
              <div key={section.title} style={styles.detailCard}>
                <h3 style={styles.detailTitle}>{section.title}</h3>
                <p style={styles.detailText}>{section.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <TopNav
        onHome={() => setView("home")}
        rightContent={
          <button style={styles.navButton} onClick={() => setView("role")}>
            Enter by role
          </button>
        }
      />

      <HeroSection
        image={IMAGES.hero}
        title="Bronson Family Farm"
        subtitle="A living ecosystem."
        description="Land, food, work, learning, and community moving together."
        onEnter={() => {
          const target = document.getElementById("history");
          target?.scrollIntoView({ behavior: "smooth" });
        }}
        onRole={() => setView("role")}
      />

      <HistorySection image={IMAGES.history} />

      <TextBand
        dark
        kicker="What grows here"
        title="What grows here is more than food."
        text="It is a place where people enter the land and find connection, work, learning, healing, and opportunity."
      />

      <TextBand
        kicker="What is live"
        title="Visible parts of the farm, shown clearly"
        text="No fake modules. No repeated photo trick. Just the real system pieces expressed through clean structure and clear pathways."
      />

      <PathSection
        kicker="Growing"
        title="What’s growing is part of the story"
        text="Crop production, land use, momentum, and the visible proof that the farm is active."
        buttonLabel="See grower path"
        onButton={() => {
          setSelectedRole("grower");
          setView("role");
        }}
        tone="light"
      />

      <PathSection
        kicker="Food access"
        title="Fresh food should feel close, simple, and real"
        text="Shopping, pickup, SNAP-friendly access, and the customer experience belong inside the farm story, not outside it."
        buttonLabel="See customer path"
        onButton={() => {
          setSelectedRole("customer");
          setView("role");
        }}
        tone="dark"
      />

      <PathSection
        kicker="Youth workforce"
        title="Learning happens through real work"
        text="Responsibility, structure, and growth are made visible through participation on the land."
        buttonLabel="See youth path"
        onButton={() => {
          setSelectedRole("youth");
          setView("role");
        }}
        tone="light"
      />

      <PathSection
        kicker="Community"
        title="Events and participation make the ecosystem visible"
        text="Volunteers, visitors, partners, and community activity should feel like part of one living place."
        buttonLabel="See volunteer path"
        onButton={() => {
          setSelectedRole("volunteer");
          setView("role");
        }}
        tone="dark"
      />

      <TwoColumnTextSection
        kicker="Why it matters"
        title="The farm connects food, family, workforce, and community renewal"
        left="This ecosystem is meant to serve more than one purpose. It creates visibility for growing, strengthens access to fresh food, and makes room for learning and work."
        right="It also gives partners, volunteers, youth, customers, and families a place to belong inside one connected environment."
      />

      <TextBand
        dark
        kicker="What comes next"
        title="Enter the living system through the path that belongs to you"
        text="After the farm, the roots, the live movement, and the community are made visible, each person can step into the part of the ecosystem that fits their role."
        buttonLabel="Enter by role"
        onButton={() => setView("role")}
      />

      <section style={styles.roleEntrySection}>
        <div style={styles.container}>
          <div style={styles.eyebrowDark}>Enter the system</div>
          <h2 style={styles.roleEntryTitle}>Choose how you are entering the farm today</h2>
          <div style={styles.roleGrid}>
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setView("role");
                }}
                style={styles.roleCard}
              >
                <div style={styles.roleCardTitle}>{role.label}</div>
                <div style={styles.roleCardSubtitle}>{role.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TopNav({
  onHome,
  rightContent,
}: {
  onHome: () => void;
  rightContent: React.ReactNode;
}) {
  return (
    <header style={styles.nav}>
      <button onClick={onHome} style={styles.brandButton}>
        <div style={styles.brandDot} />
        <div>
          <div style={styles.brandTitle}>Bronson Family Farm</div>
          <div style={styles.brandSub}>Immersive live demo</div>
        </div>
      </button>
      <div>{rightContent}</div>
    </header>
  );
}

function HeroSection({
  image,
  title,
  subtitle,
  description,
  onEnter,
  onRole,
}: {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  onEnter: () => void;
  onRole: () => void;
}) {
  return (
    <section
      style={{
        ...styles.hero,
        backgroundImage: `linear-gradient(rgba(8,13,10,0.14), rgba(8,13,10,0.46)), url(${image})`,
        backgroundPosition: "center 58%",
      }}
    >
      <div style={styles.heroTextBlock}>
        <div style={styles.eyebrowLight}>Living ecosystem</div>
        <h1 style={styles.heroTitle}>{title}</h1>
        <div style={styles.heroSubtitle}>{subtitle}</div>
        <p style={styles.heroDescription}>{description}</p>
        <div style={styles.heroButtonRow}>
          <button style={styles.primaryButton} onClick={onEnter}>
            Enter the farm
          </button>
          <button style={styles.secondaryButton} onClick={onRole}>
            Enter by role
          </button>
        </div>
      </div>
    </section>
  );
}

function HistorySection({ image }: { image: string }) {
  return (
    <section
      id="history"
      style={{
        ...styles.historySection,
        backgroundImage: `linear-gradient(rgba(12,20,14,0.22), rgba(12,20,14,0.54)), url(${image})`,
        backgroundPosition: "center 24%",
      }}
    >
      <div style={styles.historyTextBlock}>
        <div style={styles.eyebrowLight}>Our Roots</div>
        <h2 style={styles.historyTitle}>
          A farm built from legacy, land, and lived experience
        </h2>
        <p style={styles.historyText}>
          Bronson Family Farm grows from family history, resilience, and a belief
          that land can restore connection, dignity, and opportunity.
        </p>
        <p style={styles.historyText}>
          What grows here is more than food — it is access, work, learning,
          community renewal, and a future rooted in shared possibility.
        </p>
      </div>
    </section>
  );
}

function TextBand({
  dark = false,
  kicker,
  title,
  text,
  buttonLabel,
  onButton,
}: {
  dark?: boolean;
  kicker: string;
  title: string;
  text: string;
  buttonLabel?: string;
  onButton?: () => void;
}) {
  return (
    <section style={dark ? styles.textBandDark : styles.textBandLight}>
      <div style={styles.container}>
        <div style={dark ? styles.eyebrowLight : styles.eyebrowDark}>{kicker}</div>
        <h2 style={dark ? styles.bandTitleLight : styles.bandTitleDark}>{title}</h2>
        <p style={dark ? styles.bandTextLight : styles.bandTextDark}>{text}</p>
        {buttonLabel && onButton && (
          <button style={dark ? styles.primaryButton : styles.darkButton} onClick={onButton}>
            {buttonLabel}
          </button>
        )}
      </div>
    </section>
  );
}

function PathSection({
  kicker,
  title,
  text,
  buttonLabel,
  onButton,
  tone,
}: {
  kicker: string;
  title: string;
  text: string;
  buttonLabel: string;
  onButton: () => void;
  tone: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <section style={isDark ? styles.pathSectionDark : styles.pathSectionLight}>
      <div style={styles.pathInner}>
        <div>
          <div style={isDark ? styles.eyebrowLight : styles.eyebrowDark}>{kicker}</div>
          <h2 style={isDark ? styles.pathTitleLight : styles.pathTitleDark}>{title}</h2>
        </div>

        <div style={styles.pathRight}>
          <p style={isDark ? styles.pathTextLight : styles.pathTextDark}>{text}</p>
          <button style={isDark ? styles.primaryButton : styles.darkButton} onClick={onButton}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function TwoColumnTextSection({
  kicker,
  title,
  left,
  right,
}: {
  kicker: string;
  title: string;
  left: string;
  right: string;
}) {
  return (
    <section style={styles.twoColumnSection}>
      <div style={styles.container}>
        <div style={styles.eyebrowDark}>{kicker}</div>
        <h2 style={styles.twoColumnTitle}>{title}</h2>
        <div style={styles.twoColumnGrid}>
          <p style={styles.twoColumnText}>{left}</p>
          <p style={styles.twoColumnText}>{right}</p>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#f7faf5",
    color: "#17311f",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  container: {
    maxWidth: 1080,
    margin: "0 auto",
    paddingLeft: 24,
    paddingRight: 24,
  },

  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    padding: "14px 18px",
    background: "rgba(10,18,12,0.12)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  brandButton: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    border: "none",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    padding: 0,
    textAlign: "left",
  },

  brandDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    background: "#9fc96e",
    boxShadow: "0 0 0 8px rgba(159,201,110,0.12)",
    flexShrink: 0,
  },

  brandTitle: {
    fontSize: 15,
    fontWeight: 500,
  },

  brandSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.76)",
    marginTop: 2,
  },

  navButton: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },

  eyebrowLight: {
    display: "inline-block",
    color: "#e0edd9",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 14,
  },

  eyebrowDark: {
    display: "inline-block",
    color: "#566d5b",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 14,
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "112px 24px 42px",
  },

  heroTextBlock: {
    maxWidth: 760,
    padding: "8px 0",
  },

  heroTitle: {
    margin: 0,
    fontSize: "clamp(3rem, 7vw, 5.7rem)",
    lineHeight: 0.96,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
    textShadow: "0 2px 18px rgba(0,0,0,0.16)",
  },

  heroSubtitle: {
    marginTop: 12,
    fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)",
    fontWeight: 400,
    color: "#eef8e7",
    textShadow: "0 2px 10px rgba(0,0,0,0.14)",
  },

  heroDescription: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 650,
    fontSize: 18,
    lineHeight: 1.72,
    color: "rgba(255,255,255,0.92)",
    textShadow: "0 2px 10px rgba(0,0,0,0.14)",
  },

  heroButtonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 22,
  },

  primaryButton: {
    border: "none",
    background: "#e9f1df",
    color: "#17311f",
    padding: "14px 18px",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  },

  secondaryButton: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  },

  darkButton: {
    border: "none",
    background: "#183220",
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 8,
  },

  historySection: {
    minHeight: "78vh",
    display: "flex",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "56px 24px",
  },

  historyTextBlock: {
    maxWidth: 760,
    padding: "8px 0",
  },

  historyTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3.15rem)",
    lineHeight: 1.08,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
    textShadow: "0 2px 16px rgba(0,0,0,0.14)",
  },

  historyText: {
    marginTop: 16,
    marginBottom: 0,
    fontSize: 18,
    lineHeight: 1.78,
    color: "rgba(255,255,255,0.90)",
    maxWidth: 640,
    textShadow: "0 2px 10px rgba(0,0,0,0.14)",
  },

  textBandLight: {
    background: "#f7faf5",
    padding: "68px 0",
  },

  textBandDark: {
    background: "#16241b",
    padding: "68px 0",
  },

  bandTitleDark: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1.08,
    color: "#17311f",
    fontWeight: 500,
    textWrap: "balance",
    maxWidth: 760,
  },

  bandTitleLight: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1.08,
    color: "#ffffff",
    fontWeight: 500,
    textWrap: "balance",
    maxWidth: 760,
  },

  bandTextDark: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 760,
    color: "#546b5a",
    fontSize: 18,
    lineHeight: 1.78,
  },

  bandTextLight: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 760,
    color: "rgba(255,255,255,0.88)",
    fontSize: 18,
    lineHeight: 1.78,
  },

  pathSectionLight: {
    background: "#eef4e8",
    padding: "54px 0",
    borderTop: "1px solid rgba(23,49,31,0.06)",
  },

  pathSectionDark: {
    background: "#1c2d22",
    padding: "54px 0",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },

  pathInner: {
    maxWidth: 1080,
    margin: "0 auto",
    paddingLeft: 24,
    paddingRight: 24,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 28,
    alignItems: "start",
  },

  pathRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  pathTitleDark: {
    margin: 0,
    fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)",
    lineHeight: 1.08,
    color: "#17311f",
    fontWeight: 500,
    textWrap: "balance",
  },

  pathTitleLight: {
    margin: 0,
    fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)",
    lineHeight: 1.08,
    color: "#ffffff",
    fontWeight: 500,
    textWrap: "balance",
  },

  pathTextDark: {
    marginTop: 0,
    marginBottom: 18,
    fontSize: 18,
    lineHeight: 1.76,
    color: "#556c5b",
  },

  pathTextLight: {
    marginTop: 0,
    marginBottom: 18,
    fontSize: 18,
    lineHeight: 1.76,
    color: "rgba(255,255,255,0.88)",
  },

  twoColumnSection: {
    background: "#f8fbf6",
    padding: "72px 0",
  },

  twoColumnTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1.08,
    color: "#17311f",
    fontWeight: 500,
    textWrap: "balance",
    maxWidth: 760,
  },

  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    marginTop: 24,
  },

  twoColumnText: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.78,
    color: "#556c5b",
  },

  roleEntrySection: {
    background: "linear-gradient(180deg, #f8fbf6 0%, #edf4e8 100%)",
    padding: "72px 0 84px",
  },

  roleEntryTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1.08,
    color: "#17311f",
    fontWeight: 500,
    textWrap: "balance",
  },

  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 28,
  },

  roleCard: {
    background: "#ffffff",
    border: "1px solid rgba(23,49,31,0.08)",
    borderRadius: 22,
    padding: "22px 18px",
    cursor: "pointer",
    textAlign: "left",
    boxShadow: "0 14px 32px rgba(19,45,28,0.08)",
  },

  roleCardTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: "#183220",
  },

  roleCardSubtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 1.55,
    color: "#59705f",
  },

  rolePillRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 10,
  },

  rolePill: {
    border: "1px solid rgba(23,49,31,0.10)",
    background: "#ffffff",
    color: "#17311f",
    padding: "10px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },

  rolePillActive: {
    background: "#e8f1de",
    color: "#17311f",
    border: "1px solid transparent",
  },

  roleHero: {
    background: "#f8fbf6",
    padding: "120px 24px 36px",
    borderBottom: "1px solid rgba(23,49,31,0.06)",
  },

  roleHeroInner: {
    maxWidth: 980,
    margin: "0 auto",
  },

  backButton: {
    border: "1px solid rgba(23,49,31,0.10)",
    background: "#ffffff",
    color: "#17311f",
    padding: "11px 15px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    marginBottom: 18,
  },

  roleTitle: {
    margin: 0,
    fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
    lineHeight: 1,
    fontWeight: 500,
    color: "#183220",
    textWrap: "balance",
  },

  roleIntro: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 760,
    fontSize: 18,
    lineHeight: 1.76,
    color: "#556c5b",
  },

  roleBulletSection: {
    background: "#eef4e8",
    padding: "40px 0 54px",
  },

  bulletGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },

  bulletCard: {
    background: "#ffffff",
    borderRadius: 20,
    border: "1px solid rgba(23,49,31,0.08)",
    padding: "18px 16px",
    color: "#2c4736",
    fontSize: 15,
    lineHeight: 1.65,
    boxShadow: "0 12px 26px rgba(19,45,28,0.06)",
  },

  detailSection: {
    background: "#f8fbf6",
    padding: "34px 24px 64px",
  },

  detailGrid: {
    maxWidth: 1080,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
  },

  detailCard: {
    background: "#ffffff",
    border: "1px solid rgba(23,49,31,0.08)",
    borderRadius: 22,
    padding: "22px 20px",
    boxShadow: "0 12px 26px rgba(19,45,28,0.06)",
  },

  detailTitle: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.15,
    fontWeight: 500,
    color: "#183220",
  },

  detailText: {
    marginTop: 12,
    marginBottom: 0,
    fontSize: 16,
    lineHeight: 1.74,
    color: "#556c5b",
  },
};
