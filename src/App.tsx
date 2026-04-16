import React, { useMemo, useState } from "react";

type View = "home" | "role";
type Role = "guest" | "customer" | "grower" | "youth" | "volunteer" | "supervisor";

const IMAGES = {
  hero: "/GrowArea.jpg",
  history: "/GrowArea2.jpg",
  quote: "/GrowArea.jpg",
  growing: "/GrowArea2.jpg",
  market: "/GrowArea.jpg",
  youth: "/GrowArea2.jpg",
  events: "/GrowArea.jpg",
  community: "/GrowArea2.jpg",
  future: "/GrowArea.jpg",
  guest: "/GrowArea2.jpg",
  customer: "/GrowArea.jpg",
  grower: "/GrowArea2.jpg",
  volunteer: "/GrowArea.jpg",
  supervisor: "/GrowArea2.jpg",
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
          image: IMAGES.guest,
          position: "center 22%",
          overlay: "linear-gradient(rgba(10,16,12,0.18), rgba(10,16,12,0.52))",
          intro:
            "A welcoming path into the farm, its purpose, its visible activity, and the ways people can participate.",
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
          position: "center 82%",
          overlay: "linear-gradient(rgba(10,16,12,0.12), rgba(10,16,12,0.48))",
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
          position: "left center",
          overlay: "linear-gradient(rgba(10,16,12,0.14), rgba(10,16,12,0.50))",
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
          position: "right center",
          overlay: "linear-gradient(rgba(10,16,12,0.12), rgba(10,16,12,0.46))",
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
          position: "center 14%",
          overlay: "linear-gradient(rgba(10,16,12,0.18), rgba(10,16,12,0.54))",
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
          position: "center 88%",
          overlay: "linear-gradient(rgba(10,16,12,0.14), rgba(10,16,12,0.50))",
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

        <section
          style={{
            ...styles.roleHero,
            backgroundImage: `${roleData.overlay}, url(${roleData.image})`,
            backgroundPosition: roleData.position,
          }}
        >
          <div style={styles.roleHeroTextBlock}>
            <button style={styles.backButton} onClick={() => setView("home")}>
              ← Back to farm
            </button>
            <div style={styles.eyebrowLight}>Role-based live view</div>
            <h1 style={styles.roleTitle}>{roleData.title}</h1>
            <p style={styles.roleIntro}>{roleData.intro}</p>
          </div>
        </section>

        <section style={styles.roleInfoBand}>
          <div style={styles.roleInfoInner}>
            <div style={styles.eyebrowDark}>What this path shows</div>
            <div style={styles.roleBulletGrid}>
              {roleData.bullets.map((bullet) => (
                <div key={bullet} style={styles.roleBulletItem}>
                  {bullet}
                </div>
              ))}
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
          <button style={styles.navButton} onClick={() => setView("role")}>
            Enter by role
          </button>
        }
      />

      <HeroSection
        image={IMAGES.hero}
        imagePosition="center 62%"
        overlay="linear-gradient(rgba(9,14,10,0.10), rgba(9,14,10,0.44))"
        title="Bronson Family Farm"
        subtitle="A living ecosystem."
        description="Land, food, work, learning, and community moving together."
        onEnter={() => {
          const target = document.getElementById("history");
          target?.scrollIntoView({ behavior: "smooth" });
        }}
        onRole={() => setView("role")}
      />

      <SideImageSection
        id="history"
        image={IMAGES.history}
        imagePosition="center 18%"
        imageSide="left"
        dark
        kicker="Our Roots"
        title="A farm built from legacy, land, and lived experience"
        paragraphs={[
          "Bronson Family Farm grows from family history, resilience, and a belief that land can restore connection, dignity, and opportunity.",
          "What grows here is more than food — it is access, work, learning, community renewal, and a future rooted in shared possibility.",
        ]}
      />

      <QuoteSection
        image={IMAGES.quote}
        imagePosition="center 78%"
        overlay="linear-gradient(rgba(15,24,18,0.62), rgba(15,24,18,0.62))"
        quote="What grows here is more than food."
        subquote="It is a place where people enter the land and find connection, work, learning, healing, and opportunity."
      />

      <TextBand
        kicker="What is live"
        title="Visible parts of the farm, shown inside the farm"
        text="No calendar block. No fake modules. Just the real system pieces expressed through the land, the work, and the people they serve."
      />

      <ImmersivePanelSection
        image={IMAGES.growing}
        imagePosition="left center"
        overlay="linear-gradient(rgba(10,16,12,0.08), rgba(10,16,12,0.42))"
        align="left"
        kicker="Growing"
        title="What’s growing is part of the story"
        text="Crop production, land use, momentum, and the visible proof that the farm is active."
        buttonLabel="See grower path"
        onButton={() => {
          setSelectedRole("grower");
          setView("role");
        }}
      />

      <ImmersivePanelSection
        image={IMAGES.market}
        imagePosition="center 84%"
        overlay="linear-gradient(rgba(10,16,12,0.10), rgba(10,16,12,0.42))"
        align="right"
        kicker="Food access"
        title="Fresh food should feel close, simple, and real"
        text="Shopping, pickup, SNAP-friendly access, and the customer experience belong inside the farm story, not outside it."
        buttonLabel="See customer path"
        onButton={() => {
          setSelectedRole("customer");
          setView("role");
        }}
      />

      <ImmersivePanelSection
        image={IMAGES.youth}
        imagePosition="right center"
        overlay="linear-gradient(rgba(10,16,12,0.08), rgba(10,16,12,0.38))"
        align="left"
        kicker="Youth workforce"
        title="Learning happens through real work"
        text="Responsibility, structure, and growth are made visible through participation on the land."
        buttonLabel="See youth path"
        onButton={() => {
          setSelectedRole("youth");
          setView("role");
        }}
      />

      <ImmersivePanelSection
        image={IMAGES.events}
        imagePosition="center 12%"
        overlay="linear-gradient(rgba(10,16,12,0.12), rgba(10,16,12,0.48))"
        align="right"
        kicker="Community"
        title="Events and participation make the ecosystem visible"
        text="Volunteers, visitors, partners, and community activity should feel like part of one living place."
        buttonLabel="See volunteer path"
        onButton={() => {
          setSelectedRole("volunteer");
          setView("role");
        }}
      />

      <SideImageSection
        image={IMAGES.community}
        imagePosition="center 68%"
        imageSide="right"
        kicker="Why it matters"
        title="The farm connects food, family, workforce, and community renewal"
        paragraphs={[
          "This ecosystem is meant to serve more than one purpose. It creates visibility for growing, strengthens access to fresh food, makes room for learning and work, and gives partners and community members a place to belong.",
        ]}
      />

      <SideImageSection
        image={IMAGES.future}
        imagePosition="center 88%"
        imageSide="left"
        dark
        kicker="What comes next"
        title="Enter the living system through the path that belongs to you"
        paragraphs={[
          "After the farm, the roots, the live movement, and the community are made visible, each person can step into the part of the ecosystem that fits their role.",
        ]}
        buttonLabel="Enter by role"
        onButton={() => setView("role")}
      />

      <section style={styles.roleEntrySection}>
        <div style={styles.roleEntryInner}>
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
  imagePosition,
  overlay,
  title,
  subtitle,
  description,
  onEnter,
  onRole,
}: {
  image: string;
  imagePosition?: string;
  overlay: string;
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
        backgroundImage: `${overlay}, url(${image})`,
        backgroundPosition: imagePosition || "center center",
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

function SideImageSection({
  id,
  image,
  imagePosition,
  imageSide,
  kicker,
  title,
  paragraphs,
  dark = false,
  buttonLabel,
  onButton,
}: {
  id?: string;
  image: string;
  imagePosition?: string;
  imageSide: "left" | "right";
  kicker: string;
  title: string;
  paragraphs: string[];
  dark?: boolean;
  buttonLabel?: string;
  onButton?: () => void;
}) {
  const imageNode = (
    <div
      style={{
        ...styles.sideImage,
        backgroundImage: `url(${image})`,
        backgroundPosition: imagePosition || "center center",
      }}
    />
  );

  const textNode = (
    <div style={dark ? styles.sideTextDark : styles.sideTextLight}>
      <div style={dark ? styles.eyebrowLight : styles.eyebrowDark}>{kicker}</div>
      <h2 style={dark ? styles.sideTitleLight : styles.sideTitleDark}>{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} style={dark ? styles.sideParagraphLight : styles.sideParagraphDark}>
          {paragraph}
        </p>
      ))}
      {buttonLabel && onButton && (
        <button style={dark ? styles.primaryButton : styles.darkButton} onClick={onButton}>
          {buttonLabel}
        </button>
      )}
    </div>
  );

  return (
    <section id={id} style={dark ? styles.sideSectionDark : styles.sideSectionLight}>
      <div style={styles.sideWrap}>
        {imageSide === "left" ? (
          <>
            {imageNode}
            {textNode}
          </>
        ) : (
          <>
            {textNode}
            {imageNode}
          </>
        )}
      </div>
    </section>
  );
}

function QuoteSection({
  image,
  imagePosition,
  overlay,
  quote,
  subquote,
}: {
  image: string;
  imagePosition?: string;
  overlay: string;
  quote: string;
  subquote: string;
}) {
  return (
    <section
      style={{
        ...styles.quoteSection,
        backgroundImage: `${overlay}, url(${image})`,
        backgroundPosition: imagePosition || "center center",
      }}
    >
      <div style={styles.quoteInner}>
        <p style={styles.quoteText}>{quote}</p>
        <p style={styles.quoteSubtext}>{subquote}</p>
      </div>
    </section>
  );
}

function TextBand({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <section style={styles.textBand}>
      <div style={styles.textBandInner}>
        <div style={styles.eyebrowDark}>{kicker}</div>
        <h2 style={styles.textBandTitle}>{title}</h2>
        <p style={styles.textBandCopy}>{text}</p>
      </div>
    </section>
  );
}

function ImmersivePanelSection({
  image,
  imagePosition,
  overlay,
  align,
  kicker,
  title,
  text,
  buttonLabel,
  onButton,
}: {
  image: string;
  imagePosition?: string;
  overlay: string;
  align: "left" | "right";
  kicker: string;
  title: string;
  text: string;
  buttonLabel: string;
  onButton: () => void;
}) {
  return (
    <section
      style={{
        ...styles.immersiveSection,
        backgroundImage: `${overlay}, url(${image})`,
        backgroundPosition: imagePosition || "center center",
      }}
    >
      <div
        style={{
          ...styles.immersiveInner,
          justifyContent: align === "left" ? "flex-start" : "flex-end",
        }}
      >
        <div style={styles.immersiveTextCard}>
          <div style={styles.eyebrowLight}>{kicker}</div>
          <h2 style={styles.immersiveTitle}>{title}</h2>
          <p style={styles.immersiveCopy}>{text}</p>
          <button style={styles.primaryButton} onClick={onButton}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#f6f8f3",
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
    background: "rgba(10,18,12,0.14)",
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
    background: "rgba(255,255,255,0.06)",
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
    padding: "6px 0",
  },

  heroTitle: {
    margin: 0,
    fontSize: "clamp(3rem, 7vw, 5.7rem)",
    lineHeight: 0.96,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
    textShadow: "0 2px 18px rgba(0,0,0,0.18)",
  },

  heroSubtitle: {
    marginTop: 12,
    fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)",
    fontWeight: 400,
    color: "#eef8e7",
    textShadow: "0 2px 12px rgba(0,0,0,0.16)",
  },

  heroDescription: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 650,
    fontSize: 18,
    lineHeight: 1.72,
    color: "rgba(255,255,255,0.92)",
    textShadow: "0 2px 10px rgba(0,0,0,0.16)",
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

  sideSectionDark: {
    background: "#16241b",
  },

  sideSectionLight: {
    background: "#f8fbf6",
  },

  sideWrap: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    minHeight: "76vh",
  },

  sideImage: {
    minHeight: 420,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  sideTextDark: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "54px 36px",
  },

  sideTextLight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "54px 36px",
  },

  sideTitleLight: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3.15rem)",
    lineHeight: 1.08,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
  },

  sideTitleDark: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3.15rem)",
    lineHeight: 1.08,
    fontWeight: 500,
    color: "#183220",
    textWrap: "balance",
  },

  sideParagraphLight: {
    marginTop: 16,
    marginBottom: 0,
    color: "rgba(255,255,255,0.88)",
    fontSize: 18,
    lineHeight: 1.78,
    maxWidth: 620,
  },

  sideParagraphDark: {
    marginTop: 16,
    marginBottom: 0,
    color: "#566d5b",
    fontSize: 18,
    lineHeight: 1.78,
    maxWidth: 620,
  },

  quoteSection: {
    minHeight: "46vh",
    display: "flex",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "44px 24px",
  },

  quoteInner: {
    maxWidth: 940,
    margin: "0 auto",
    width: "100%",
  },

  quoteText: {
    margin: 0,
    color: "#f3f7ef",
    fontSize: "clamp(1.9rem, 4vw, 3rem)",
    lineHeight: 1.18,
    fontWeight: 400,
    textWrap: "balance",
  },

  quoteSubtext: {
    marginTop: 12,
    marginBottom: 0,
    color: "rgba(243,247,239,0.84)",
    fontSize: 17,
    lineHeight: 1.72,
    maxWidth: 760,
  },

  textBand: {
    background: "linear-gradient(180deg, #eef4e8 0%, #f8fbf6 100%)",
    padding: "64px 24px",
  },

  textBandInner: {
    maxWidth: 980,
    margin: "0 auto",
  },

  textBandTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    lineHeight: 1.08,
    color: "#17311f",
    fontWeight: 500,
    textWrap: "balance",
  },

  textBandCopy: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 760,
    color: "#546b5a",
    fontSize: 18,
    lineHeight: 1.76,
  },

  immersiveSection: {
    minHeight: "86vh",
    display: "flex",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  immersiveInner: {
    width: "100%",
    display: "flex",
    padding: "0 24px",
  },

  immersiveTextCard: {
    width: "min(520px, 100%)",
    background: "rgba(250,255,248,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
    borderRadius: 24,
    padding: "24px 20px",
  },

  immersiveTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 5vw, 3.05rem)",
    lineHeight: 1.06,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
  },

  immersiveCopy: {
    marginTop: 16,
    marginBottom: 22,
    color: "rgba(255,255,255,0.92)",
    fontSize: 18,
    lineHeight: 1.72,
  },

  roleEntrySection: {
    background: "linear-gradient(180deg, #f8fbf6 0%, #edf4e8 100%)",
    padding: "72px 24px 84px",
  },

  roleEntryInner: {
    maxWidth: 1120,
    margin: "0 auto",
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
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
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
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "112px 24px 38px",
  },

  roleHeroTextBlock: {
    maxWidth: 760,
    padding: "6px 0",
  },

  backButton: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    padding: "11px 15px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    marginBottom: 18,
  },

  roleTitle: {
    margin: 0,
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    lineHeight: 1,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
    textShadow: "0 2px 18px rgba(0,0,0,0.16)",
  },

  roleIntro: {
    marginTop: 16,
    marginBottom: 0,
    maxWidth: 660,
    fontSize: 18,
    lineHeight: 1.72,
    color: "rgba(255,255,255,0.92)",
    textShadow: "0 2px 10px rgba(0,0,0,0.14)",
  },

  roleInfoBand: {
    background: "#f7faf5",
    padding: "40px 24px 60px",
  },

  roleInfoInner: {
    maxWidth: 1120,
    margin: "0 auto",
  },

  roleBulletGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },

  roleBulletItem: {
    background: "#ffffff",
    borderRadius: 20,
    border: "1px solid rgba(23,49,31,0.08)",
    padding: "18px 16px",
    color: "#2c4736",
    fontSize: 15,
    lineHeight: 1.65,
    boxShadow: "0 12px 26px rgba(19,45,28,0.06)",
  },
};
