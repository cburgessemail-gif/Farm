import React, { useMemo, useState } from "react";

type View = "home" | "role";
type Role = "guest" | "customer" | "grower" | "youth" | "volunteer" | "supervisor";

const IMAGES = {
  hero: "/GrowArea.jpg",
  growing: "/GrowArea2.jpg",
  market: "/GrowArea.jpg",
  youth: "/GrowArea2.jpg",
  events: "/GrowArea.jpg",
  guest: "/GrowArea2.jpg",
  customer: "/GrowArea.jpg",
  grower: "/GrowArea2.jpg",
  volunteer: "/GrowArea.jpg",
  supervisor: "/GrowArea2.jpg",
};

const roles: {
  id: Role;
  label: string;
  subtitle: string;
}[] = [
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
          image: IMAGES.guest,
          position: "center 42%",
          intro:
            "A welcoming path into the farm, its purpose, its activity, and the ways people can participate.",
          bullets: [
            "See the farm as a living place",
            "Understand what is active now",
            "Explore food, events, and pathways",
            "Move into deeper participation when ready",
          ],
        };
      case "customer":
        return {
          title: "Customer Experience",
          image: IMAGES.customer,
          position: "center 58%",
          intro:
            "A direct path to fresh food, access, ordering, pickup, and the visible connection between food and place.",
          bullets: [
            "See what is available now",
            "Move toward shopping and pickup",
            "Connect food with the farm story",
            "Support the ecosystem through purchase",
          ],
        };
      case "grower":
        return {
          title: "Grower Experience",
          image: IMAGES.grower,
          position: "center 40%",
          intro:
            "A view into crops, production rhythm, practical workflow, and the systems that support successful growing.",
          bullets: [
            "Visible growing activity",
            "Crop priorities and workflow",
            "Tools, timing, and support",
            "Connection to the broader ecosystem",
          ],
        };
      case "youth":
        return {
          title: "Youth Experience",
          image: IMAGES.youth,
          position: "center 48%",
          intro:
            "A structured pathway for work, learning, responsibility, growth, and belonging through real farm activity.",
          bullets: [
            "Learn by doing",
            "Build skills through participation",
            "Experience responsibility and progress",
            "Connect work with future opportunity",
          ],
        };
      case "volunteer":
        return {
          title: "Volunteer Experience",
          image: IMAGES.volunteer,
          position: "center 63%",
          intro:
            "A clear path into contribution, visible needs, meaningful service, and community-powered support.",
          bullets: [
            "See where help is needed",
            "Join events and farm tasks",
            "Support visible momentum",
            "Belong through service and contribution",
          ],
        };
      case "supervisor":
        return {
          title: "Supervisor Experience",
          image: IMAGES.supervisor,
          position: "center 52%",
          intro:
            "A view into coordination, oversight, support, and the practical flow behind daily movement on the farm.",
          bullets: [
            "See who is active",
            "Support daily movement",
            "Guide youth and teams",
            "Hold the visible system together",
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
            <div style={styles.roleTopPills}>
              {roles.map((role) => (
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

        <section
          style={{
            ...styles.roleHero,
            backgroundImage: `linear-gradient(rgba(11,22,15,0.26), rgba(11,22,15,0.60)), url(${roleData.image})`,
            backgroundPosition: roleData.position,
          }}
        >
          <div style={styles.roleHeroContent}>
            <button style={styles.backButton} onClick={() => setView("home")}>
              ← Back to farm
            </button>

            <div style={styles.kicker}>Role-based live view</div>
            <h1 style={styles.roleTitle}>{roleData.title}</h1>
            <p style={styles.roleIntro}>{roleData.intro}</p>

            <div style={styles.roleGlassPanel}>
              <div style={styles.roleGlassHeader}>What this path shows</div>
              <ul style={styles.bulletList}>
                {roleData.bullets.map((bullet) => (
                  <li key={bullet} style={styles.bulletItem}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section style={styles.roleLowerSection}>
          <div style={styles.roleLowerGrid}>
            <div style={styles.deepPanel}>
              <div style={styles.panelKicker}>Live feel</div>
              <h3 style={styles.panelTitle}>Built to feel like a place, not a dashboard</h3>
              <p style={styles.panelText}>
                This role view is meant to stay grounded in the land, the work, and the real movement of the
                farm. It should feel connected to the same ecosystem rather than detached from it.
              </p>
            </div>

            <div style={styles.deepPanel}>
              <div style={styles.panelKicker}>What is visible</div>
              <h3 style={styles.panelTitle}>Only what belongs here</h3>
              <p style={styles.panelText}>
                Each role should reveal the parts of the ecosystem that matter most to that person while
                staying visually connected to the larger farm experience.
              </p>
            </div>
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
          <button style={styles.navCta} onClick={() => setView("role")}>
            Enter by role
          </button>
        }
      />

      <Hero
        image={IMAGES.hero}
        imagePosition="center 52%"
        title="Bronson Family Farm"
        subtitle="A living ecosystem."
        description="Land, food, work, learning, and community moving together."
        primaryLabel="Enter the farm"
        onPrimary={() => {
          const target = document.getElementById("live-now");
          target?.scrollIntoView({ behavior: "smooth" });
        }}
        secondaryLabel="Enter by role"
        onSecondary={() => setView("role")}
      />

      <section id="live-now" style={styles.introBand}>
        <div style={styles.introBandInner}>
          <div style={styles.kickerDark}>What is live</div>
          <h2 style={styles.bandTitle}>Visible parts of the farm, shown inside the farm</h2>
          <p style={styles.bandText}>
            No dashboard grid. No calendar block. No fake modules. Just the real system pieces expressed
            through the land, the work, and the people they serve.
          </p>
        </div>
      </section>

      <ImmersiveSection
        image={IMAGES.growing}
        imagePosition="center 38%"
        align="left"
        kicker="Growing"
        title="What’s growing is part of the story"
        text="Crop production, land use, momentum, and the visible proof that the farm is active."
        primaryLabel="See grower path"
        onPrimary={() => {
          setSelectedRole("grower");
          setView("role");
        }}
      />

      <ImmersiveSection
        image={IMAGES.market}
        imagePosition="center 64%"
        align="right"
        kicker="Food access"
        title="Fresh food should feel close, simple, and real"
        text="Shopping, pickup, SNAP-friendly access, and the customer experience belong inside the farm story, not outside it."
        primaryLabel="See customer path"
        onPrimary={() => {
          setSelectedRole("customer");
          setView("role");
        }}
      />

      <ImmersiveSection
        image={IMAGES.youth}
        imagePosition="center 46%"
        align="left"
        kicker="Youth workforce"
        title="Learning happens through real work"
        text="Responsibility, structure, and growth are made visible through participation on the land."
        primaryLabel="See youth path"
        onPrimary={() => {
          setSelectedRole("youth");
          setView("role");
        }}
      />

      <ImmersiveSection
        image={IMAGES.events}
        imagePosition="center 57%"
        align="right"
        kicker="Community"
        title="Events and participation make the ecosystem visible"
        text="Volunteers, visitors, partners, and community activity should feel like part of one living place."
        primaryLabel="See volunteer path"
        onPrimary={() => {
          setSelectedRole("volunteer");
          setView("role");
        }}
      />

      <section style={styles.rolesEntrySection}>
        <div style={styles.rolesEntryInner}>
          <div style={styles.kickerDark}>Enter the system</div>
          <h2 style={styles.rolesHeading}>Choose how you are entering the farm today</h2>
          <div style={styles.roleChooserGrid}>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setView("role");
                }}
                style={styles.roleChooserCard}
              >
                <div style={styles.roleChooserTitle}>{role.label}</div>
                <div style={styles.roleChooserSubtitle}>{role.subtitle}</div>
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
      <button onClick={onHome} style={styles.logoButton}>
        <div style={styles.logoDot} />
        <div>
          <div style={styles.logoTitle}>Bronson Family Farm</div>
          <div style={styles.logoSub}>Immersive live demo</div>
        </div>
      </button>
      <div>{rightContent}</div>
    </header>
  );
}

function Hero({
  image,
  imagePosition,
  title,
  subtitle,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: {
  image: string;
  imagePosition?: string;
  title: string;
  subtitle: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel: string;
  onSecondary: () => void;
}) {
  return (
    <section
      style={{
        ...styles.hero,
        backgroundImage: `linear-gradient(rgba(8,16,11,0.22), rgba(8,16,11,0.58)), url(${image})`,
        backgroundPosition: imagePosition || "center center",
      }}
    >
      <div style={styles.heroContent}>
        <div style={styles.kicker}>Living ecosystem</div>
        <h1 style={styles.heroTitle}>{title}</h1>
        <div style={styles.heroSubtitle}>{subtitle}</div>
        <p style={styles.heroText}>{description}</p>

        <div style={styles.heroButtons}>
          <button style={styles.primaryBtn} onClick={onPrimary}>
            {primaryLabel}
          </button>
          <button style={styles.secondaryBtn} onClick={onSecondary}>
            {secondaryLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function ImmersiveSection({
  image,
  imagePosition,
  align,
  kicker,
  title,
  text,
  primaryLabel,
  onPrimary,
}: {
  image: string;
  imagePosition?: string;
  align: "left" | "right";
  kicker: string;
  title: string;
  text: string;
  primaryLabel: string;
  onPrimary: () => void;
}) {
  const contentPosition =
    align === "left"
      ? { justifyContent: "flex-start", paddingLeft: 24, paddingRight: 24 }
      : { justifyContent: "flex-end", paddingLeft: 24, paddingRight: 24 };

  return (
    <section
      style={{
        ...styles.immersiveSection,
        backgroundImage: `linear-gradient(rgba(9,18,12,0.18), rgba(9,18,12,0.56)), url(${image})`,
        backgroundPosition: imagePosition || "center center",
      }}
    >
      <div style={{ ...styles.immersiveContentWrap, ...contentPosition }}>
        <div style={styles.storyPanel}>
          <div style={styles.kicker}>{kicker}</div>
          <h2 style={styles.storyTitle}>{title}</h2>
          <p style={styles.storyText}>{text}</p>
          <button style={styles.primaryBtn} onClick={onPrimary}>
            {primaryLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#f5f8f2",
    color: "#17311f",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
    background: "rgba(10,18,12,0.22)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
  },

  logoButton: {
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

  logoDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    background: "#9fc96e",
    boxShadow: "0 0 0 8px rgba(159,201,110,0.12)",
    flexShrink: 0,
  },

  logoTitle: {
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.01em",
  },

  logoSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.78)",
    marginTop: 2,
  },

  navCta: {
    border: "1px solid rgba(255,255,255,0.20)",
    background: "rgba(255,255,255,0.12)",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },

  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "110px 24px 44px",
  },

  heroContent: {
    maxWidth: 720,
    background: "rgba(250,255,248,0.16)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 28,
    padding: "28px 24px",
    boxShadow: "0 24px 60px rgba(7,15,10,0.18)",
  },

  kicker: {
    display: "inline-block",
    color: "#dcebd4",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 14,
  },

  kickerDark: {
    display: "inline-block",
    color: "#4f6a57",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 14,
  },

  heroTitle: {
    margin: 0,
    fontSize: "clamp(2.8rem, 7vw, 5.6rem)",
    lineHeight: 0.92,
    fontWeight: 800,
    color: "#ffffff",
    textWrap: "balance",
  },

  heroSubtitle: {
    marginTop: 12,
    fontSize: "clamp(1.15rem, 2.5vw, 1.65rem)",
    fontWeight: 600,
    color: "#eef8e7",
  },

  heroText: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 640,
    fontSize: 18,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.92)",
  },

  heroButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 22,
  },

  primaryBtn: {
    border: "none",
    background: "#e7f2dc",
    color: "#16301d",
    padding: "14px 18px",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },

  secondaryBtn: {
    border: "1px solid rgba(255,255,255,0.24)",
    background: "rgba(255,255,255,0.10)",
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },

  introBand: {
    background: "linear-gradient(180deg, #eef4e8 0%, #f7faf4 100%)",
    padding: "70px 24px",
  },

  introBandInner: {
    maxWidth: 980,
    margin: "0 auto",
  },

  bandTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3.3rem)",
    lineHeight: 1.03,
    color: "#17311f",
    fontWeight: 800,
    textWrap: "balance",
  },

  bandText: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 760,
    color: "#4c6753",
    fontSize: 18,
    lineHeight: 1.75,
  },

  immersiveSection: {
    minHeight: "88vh",
    display: "flex",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  immersiveContentWrap: {
    width: "100%",
    display: "flex",
  },

  storyPanel: {
    width: "min(560px, 100%)",
    background: "rgba(250,255,248,0.14)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 28,
    padding: "28px 24px",
    boxShadow: "0 22px 54px rgba(7,15,10,0.18)",
  },

  storyTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 5vw, 3.4rem)",
    lineHeight: 1.02,
    fontWeight: 800,
    color: "#ffffff",
    textWrap: "balance",
  },

  storyText: {
    marginTop: 16,
    marginBottom: 22,
    fontSize: 18,
    lineHeight: 1.72,
    color: "rgba(255,255,255,0.93)",
  },

  rolesEntrySection: {
    background: "linear-gradient(180deg, #f8fbf6 0%, #edf4e8 100%)",
    padding: "72px 24px 84px",
  },

  rolesEntryInner: {
    maxWidth: 1120,
    margin: "0 auto",
  },

  rolesHeading: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3.3rem)",
    lineHeight: 1.03,
    color: "#17311f",
    fontWeight: 800,
    textWrap: "balance",
  },

  roleChooserGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 28,
  },

  roleChooserCard: {
    background: "#ffffff",
    border: "1px solid rgba(23,49,31,0.08)",
    borderRadius: 22,
    padding: "22px 18px",
    cursor: "pointer",
    textAlign: "left",
    boxShadow: "0 14px 32px rgba(19,45,28,0.08)",
  },

  roleChooserTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#183220",
  },

  roleChooserSubtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 1.55,
    color: "#56725c",
  },

  roleTopPills: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 10,
  },

  rolePill: {
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.10)",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },

  rolePillActive: {
    background: "#e7f2dc",
    color: "#17311f",
    border: "1px solid transparent",
  },

  roleHero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "110px 24px 36px",
  },

  roleHeroContent: {
    maxWidth: 760,
    background: "rgba(250,255,248,0.14)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 28,
    padding: "28px 24px",
    boxShadow: "0 24px 60px rgba(7,15,10,0.18)",
  },

  backButton: {
    border: "1px solid rgba(255,255,255,0.24)",
    background: "rgba(255,255,255,0.10)",
    color: "#ffffff",
    padding: "11px 15px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 18,
  },

  roleTitle: {
    margin: 0,
    fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
    lineHeight: 0.96,
    fontWeight: 800,
    color: "#ffffff",
    textWrap: "balance",
  },

  roleIntro: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 660,
    fontSize: 18,
    lineHeight: 1.72,
    color: "rgba(255,255,255,0.93)",
  },

  roleGlassPanel: {
    marginTop: 22,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 22,
    padding: 18,
  },

  roleGlassHeader: {
    fontSize: 14,
    fontWeight: 800,
    color: "#ebf6e4",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },

  bulletList: {
    margin: "14px 0 0 18px",
    padding: 0,
  },

  bulletItem: {
    marginBottom: 10,
    color: "rgba(255,255,255,0.92)",
    fontSize: 16,
    lineHeight: 1.65,
  },

  roleLowerSection: {
    background: "linear-gradient(180deg, #f8fbf6 0%, #edf4e8 100%)",
    padding: "48px 24px 72px",
  },

  roleLowerGrid: {
    maxWidth: 1120,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 18,
  },

  deepPanel: {
    background: "#ffffff",
    border: "1px solid rgba(23,49,31,0.08)",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 14px 34px rgba(19,45,28,0.08)",
  },

  panelKicker: {
    color: "#59725e",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 12,
  },

  panelTitle: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.08,
    fontWeight: 800,
    color: "#183220",
    textWrap: "balance",
  },

  panelText: {
    marginTop: 14,
    marginBottom: 0,
    fontSize: 16,
    lineHeight: 1.72,
    color: "#4f6755",
  },
};
