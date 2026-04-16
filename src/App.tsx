import React, { useMemo, useState } from "react";

type Screen = "landing" | "live" | "roles";
type Role = "guest" | "customer" | "grower" | "youth" | "volunteer" | "supervisor";

type LiveModule = {
  id: string;
  title: string;
  status: "LIVE" | "ACTIVE" | "VISIBLE";
  description: string;
  image: string;
  imagePosition?: string;
};

type RoleCard = {
  id: Role;
  title: string;
  subtitle: string;
  description: string;
};

const IMAGES = {
  hero: "/GrowArea.jpg",
  liveA: "/GrowArea2.jpg",
  liveB: "/GrowArea.jpg",
  customer: "/GrowArea2.jpg",
  grower: "/GrowArea.jpg",
  youth: "/GrowArea2.jpg",
  volunteer: "/GrowArea.jpg",
  supervisor: "/GrowArea2.jpg",
  guest: "/GrowArea.jpg",
};

const LIVE_MODULES: LiveModule[] = [
  {
    id: "shop",
    title: "Shop",
    status: "LIVE",
    description:
      "Fresh produce and farm offerings connected to the real customer experience.",
    image: IMAGES.liveA,
    imagePosition: "center 35%",
  },
  {
    id: "growing",
    title: "What’s Growing",
    status: "ACTIVE",
    description:
      "Current crops, growing activity, and the visible production side of the farm.",
    image: IMAGES.liveB,
    imagePosition: "center 55%",
  },
  {
    id: "events",
    title: "Events",
    status: "ACTIVE",
    description:
      "Public-facing events, farm participation, and community gathering points.",
    image: IMAGES.liveA,
    imagePosition: "center 60%",
  },
  {
    id: "youth",
    title: "Youth Program",
    status: "ACTIVE",
    description:
      "Workforce development, learning, responsibility, and pathway-building.",
    image: IMAGES.liveB,
    imagePosition: "center 30%",
  },
  {
    id: "volunteers",
    title: "Volunteers",
    status: "ACTIVE",
    description:
      "Hands-on support, participation, and community-powered momentum.",
    image: IMAGES.liveA,
    imagePosition: "center 45%",
  },
  {
    id: "operations",
    title: "Operations",
    status: "VISIBLE",
    description:
      "The practical structure behind coordination, oversight, and the day-to-day system.",
    image: IMAGES.liveB,
    imagePosition: "center 70%",
  },
];

const ROLE_CARDS: RoleCard[] = [
  {
    id: "guest",
    title: "Guest",
    subtitle: "Explore the farm",
    description: "See the farm, the modules, and the pathways without going deep into operations.",
  },
  {
    id: "customer",
    title: "Customer",
    subtitle: "Find food and shop",
    description: "Move toward ordering, pickup, SNAP-friendly access, and what is available now.",
  },
  {
    id: "grower",
    title: "Grower",
    subtitle: "See crops and workflow",
    description: "View growing activity, practical needs, production rhythm, and connected support.",
  },
  {
    id: "youth",
    title: "Youth",
    subtitle: "Learn and work",
    description: "See a pathway built around responsibility, growth, scheduling, and progress.",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    subtitle: "Help where needed",
    description: "See where service, support, and hands-on contribution fit into the ecosystem.",
  },
  {
    id: "supervisor",
    title: "Supervisor",
    subtitle: "Guide and support",
    description: "View people, movement, oversight, and the support structure around daily work.",
  },
];

function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const roleContent = useMemo(() => {
    switch (selectedRole) {
      case "guest":
        return {
          title: "Guest View",
          image: IMAGES.guest,
          imagePosition: "center 52%",
          intro:
            "This path gives a clean look at the farm as a living place people can enter, understand, and return to.",
          bullets: [
            "Farm welcome and identity",
            "What is live right now",
            "Events and public-facing activity",
            "Featured areas of the ecosystem",
            "Simple pathways into deeper participation",
          ],
          panels: [
            {
              title: "What You See First",
              text: "The farm as a place — land, activity, access, and visible momentum.",
            },
            {
              title: "Public Entry",
              text: "A calm entry point for funders, visitors, families, and curious guests.",
            },
            {
              title: "Next Step",
              text: "Move into shopping, volunteering, events, or a deeper role-based experience.",
            },
          ],
        };
      case "customer":
        return {
          title: "Customer View",
          image: IMAGES.customer,
          imagePosition: "center 35%",
          intro:
            "This path focuses on food access, current offerings, and a simple customer journey connected to real farm activity.",
          bullets: [
            "What is available now",
            "Fresh food and farm offerings",
            "Pickup and access logic",
            "SNAP-friendly pathway",
            "Connection between food and farm story",
          ],
          panels: [
            {
              title: "Shop",
              text: "Customers should be able to move from interest to action quickly.",
            },
            {
              title: "Availability",
              text: "What is live should feel current, real, and tied to the farm’s actual rhythm.",
            },
            {
              title: "Confidence",
              text: "The customer experience should feel welcoming, easy, and grounded in trust.",
            },
          ],
        };
      case "grower":
        return {
          title: "Grower View",
          image: IMAGES.grower,
          imagePosition: "center 58%",
          intro:
            "This path shows the farm from the production side — crops, workflow, and what supports successful growing.",
          bullets: [
            "Crop activity and season rhythm",
            "Visible production and farm work",
            "Tools, inputs, and support needs",
            "Growing priorities and practical coordination",
            "Connection to market and ecosystem",
          ],
          panels: [
            {
              title: "Production",
              text: "The grower view should reflect that real work is happening on the land.",
            },
            {
              title: "Coordination",
              text: "Growing is not separate from the rest of the ecosystem — it feeds the whole system.",
            },
            {
              title: "Support",
              text: "Supplies, timing, people, and planning all belong here.",
            },
          ],
        };
      case "youth":
        return {
          title: "Youth View",
          image: IMAGES.youth,
          imagePosition: "center 42%",
          intro:
            "This path shows a living workforce development experience rooted in responsibility, skill-building, and belonging.",
          bullets: [
            "Daily participation and structure",
            "Work and learning on the farm",
            "Progress and responsibility",
            "Supportive pathway-building",
            "A clearer future through real experience",
          ],
          panels: [
            {
              title: "Work",
              text: "The farm becomes a place where young people learn by doing.",
            },
            {
              title: "Growth",
              text: "This is about life skills, not just tasks.",
            },
            {
              title: "Belonging",
              text: "The youth experience should feel structured, encouraging, and meaningful.",
            },
          ],
        };
      case "volunteer":
        return {
          title: "Volunteer View",
          image: IMAGES.volunteer,
          imagePosition: "center 63%",
          intro:
            "This path shows where help is needed and how people can contribute to the farm’s visible momentum.",
          bullets: [
            "Immediate ways to help",
            "Community participation",
            "Support for events and farm tasks",
            "Belonging through service",
            "Simple entry into meaningful contribution",
          ],
          panels: [
            {
              title: "Participation",
              text: "Volunteers should quickly understand where they fit.",
            },
            {
              title: "Usefulness",
              text: "The experience should feel practical, not symbolic.",
            },
            {
              title: "Connection",
              text: "Helping on the farm should strengthen community, not just fill a task list.",
            },
          ],
        };
      case "supervisor":
        return {
          title: "Supervisor View",
          image: IMAGES.supervisor,
          imagePosition: "center 48%",
          intro:
            "This path shows the structure behind oversight, coordination, support, and the practical care of people and workflow.",
          bullets: [
            "Who is active on the farm",
            "Oversight and guidance",
            "Operational visibility",
            "Support for youth and teams",
            "Coordination across the ecosystem",
          ],
          panels: [
            {
              title: "Oversight",
              text: "Supervisors need a clear sense of who is doing what and what needs attention.",
            },
            {
              title: "Support",
              text: "This role is about strengthening people and flow, not only monitoring tasks.",
            },
            {
              title: "System",
              text: "The supervisor view reveals how the visible farm experience is held together.",
            },
          ],
        };
      default:
        return null;
    }
  }, [selectedRole]);

  return (
    <div style={styles.appShell}>
      <TopBar
        onGoHome={() => {
          setSelectedRole(null);
          setScreen("landing");
        }}
        onGoLive={() => {
          setSelectedRole(null);
          setScreen("live");
        }}
        onGoRoles={() => {
          setSelectedRole(null);
          setScreen("roles");
        }}
      />

      {screen === "landing" && (
        <HeroSection
          image={IMAGES.hero}
          imagePosition="center 54%"
          eyebrow="Living ecosystem"
          title="Bronson Family Farm"
          subtitle="Enter the farm."
          description="A place where land, food, work, learning, and community move together."
          primaryLabel="Enter"
          primaryAction={() => setScreen("live")}
          secondaryLabel="See what is live"
          secondaryAction={() => setScreen("live")}
        />
      )}

      {screen === "live" && (
        <main>
          <SectionIntro
            title="What is live"
            text="This view shows the visible parts of the farm ecosystem without moving into future-only concepts."
          />

          <div style={styles.moduleGrid}>
            {LIVE_MODULES.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                status={module.status}
                description={module.description}
                image={module.image}
                imagePosition={module.imagePosition}
              />
            ))}
          </div>

          <div style={styles.centerWrap}>
            <button style={styles.primaryButton} onClick={() => setScreen("roles")}>
              Enter the system by role
            </button>
          </div>
        </main>
      )}

      {screen === "roles" && !selectedRole && (
        <main>
          <SectionIntro
            title="Enter the farm as"
            text="Choose the path that matches how you are entering the ecosystem."
          />

          <div style={styles.roleGrid}>
            {ROLE_CARDS.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                style={styles.roleCardButton}
              >
                <div style={styles.roleCardInner}>
                  <div style={styles.roleTitle}>{role.title}</div>
                  <div style={styles.roleSubtitle}>{role.subtitle}</div>
                  <div style={styles.roleDescription}>{role.description}</div>
                </div>
              </button>
            ))}
          </div>
        </main>
      )}

      {screen === "roles" && selectedRole && roleContent && (
        <main>
          <RoleHero
            title={roleContent.title}
            intro={roleContent.intro}
            image={roleContent.image}
            imagePosition={roleContent.imagePosition}
            onBack={() => setSelectedRole(null)}
          />

          <div style={styles.roleBody}>
            <div style={styles.leftColumn}>
              <InfoBox title="What this path shows">
                <ul style={styles.bulletList}>
                  {roleContent.bullets.map((item) => (
                    <li key={item} style={styles.bulletItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </InfoBox>
            </div>

            <div style={styles.rightColumn}>
              {roleContent.panels.map((panel) => (
                <InfoBox key={panel.title} title={panel.title}>
                  <p style={styles.infoText}>{panel.text}</p>
                </InfoBox>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

function TopBar({
  onGoHome,
  onGoLive,
  onGoRoles,
}: {
  onGoHome: () => void;
  onGoLive: () => void;
  onGoRoles: () => void;
}) {
  return (
    <header style={styles.topBar}>
      <div style={styles.brandWrap}>
        <div style={styles.brandDot} />
        <div>
          <div style={styles.brandTitle}>Bronson Family Farm</div>
          <div style={styles.brandSub}>Living ecosystem demo</div>
        </div>
      </div>

      <nav style={styles.navWrap}>
        <button style={styles.navButton} onClick={onGoHome}>
          Farm
        </button>
        <button style={styles.navButton} onClick={onGoLive}>
          Live System
        </button>
        <button style={styles.navButton} onClick={onGoRoles}>
          Roles
        </button>
      </nav>
    </header>
  );
}

function HeroSection({
  image,
  imagePosition,
  eyebrow,
  title,
  subtitle,
  description,
  primaryLabel,
  primaryAction,
  secondaryLabel,
  secondaryAction,
}: {
  image: string;
  imagePosition?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryLabel: string;
  primaryAction: () => void;
  secondaryLabel: string;
  secondaryAction: () => void;
}) {
  return (
    <section
      style={{
        ...styles.heroSection,
        backgroundImage: `linear-gradient(rgba(15,25,18,0.30), rgba(15,25,18,0.48)), url(${image})`,
        backgroundPosition: imagePosition || "center center",
      }}
    >
      <div style={styles.heroCard}>
        <div style={styles.eyebrow}>{eyebrow}</div>
        <h1 style={styles.heroTitle}>{title}</h1>
        <div style={styles.heroSubtitle}>{subtitle}</div>
        <p style={styles.heroDescription}>{description}</p>

        <div style={styles.heroButtonRow}>
          <button style={styles.primaryButton} onClick={primaryAction}>
            {primaryLabel}
          </button>
          <button style={styles.secondaryButton} onClick={secondaryAction}>
            {secondaryLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ title, text }: { title: string; text: string }) {
  return (
    <section style={styles.sectionIntro}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <p style={styles.sectionText}>{text}</p>
    </section>
  );
}

function ModuleCard({
  title,
  status,
  description,
  image,
  imagePosition,
}: {
  title: string;
  status: "LIVE" | "ACTIVE" | "VISIBLE";
  description: string;
  image: string;
  imagePosition?: string;
}) {
  return (
    <div style={styles.moduleCard}>
      <div
        style={{
          ...styles.moduleImage,
          backgroundImage: `linear-gradient(rgba(20,30,20,0.10), rgba(20,30,20,0.45)), url(${image})`,
          backgroundPosition: imagePosition || "center center",
        }}
      />
      <div style={styles.moduleContent}>
        <div style={styles.statusRow}>
          <span style={styles.statusPill}>{status}</span>
        </div>
        <div style={styles.moduleTitle}>{title}</div>
        <div style={styles.moduleDescription}>{description}</div>
      </div>
    </div>
  );
}

function RoleHero({
  title,
  intro,
  image,
  imagePosition,
  onBack,
}: {
  title: string;
  intro: string;
  image: string;
  imagePosition?: string;
  onBack: () => void;
}) {
  return (
    <section
      style={{
        ...styles.roleHero,
        backgroundImage: `linear-gradient(rgba(16,24,19,0.28), rgba(16,24,19,0.58)), url(${image})`,
        backgroundPosition: imagePosition || "center center",
      }}
    >
      <div style={styles.roleHeroOverlay}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back to roles
        </button>
        <h2 style={styles.roleHeroTitle}>{title}</h2>
        <p style={styles.roleHeroText}>{intro}</p>
      </div>
    </section>
  );
}

function InfoBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.infoBox}>
      <h3 style={styles.infoTitle}>{title}</h3>
      {children}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appShell: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #f7fbf4 0%, #eef5ea 30%, #f8faf6 100%)",
    color: "#17311f",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },

  topBar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "14px 20px",
    background: "rgba(248, 251, 246, 0.88)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(23,49,31,0.10)",
  },

  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  brandDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    background: "#6b8f47",
    boxShadow: "0 0 0 6px rgba(107,143,71,0.12)",
  },

  brandTitle: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.1,
  },

  brandSub: {
    fontSize: 12,
    color: "#4f6656",
    marginTop: 2,
  },

  navWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },

  navButton: {
    border: "1px solid rgba(23,49,31,0.12)",
    background: "#ffffff",
    color: "#17311f",
    padding: "10px 14px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  heroSection: {
    minHeight: "calc(100vh - 72px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  heroCard: {
    width: "min(820px, 100%)",
    background: "rgba(252,255,250,0.76)",
    border: "1px solid rgba(255,255,255,0.55)",
    borderRadius: 28,
    padding: "34px 28px",
    boxShadow: "0 16px 50px rgba(18,38,24,0.16)",
  },

  eyebrow: {
    display: "inline-block",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#4f6d42",
    marginBottom: 14,
  },

  heroTitle: {
    margin: 0,
    fontSize: "clamp(2.2rem, 5vw, 4.6rem)",
    lineHeight: 0.95,
    fontWeight: 800,
    color: "#152d1c",
  },

  heroSubtitle: {
    marginTop: 14,
    fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)",
    fontWeight: 600,
    color: "#284733",
  },

  heroDescription: {
    marginTop: 16,
    fontSize: 18,
    lineHeight: 1.6,
    maxWidth: 720,
    color: "#31513d",
  },

  heroButtonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 24,
  },

  primaryButton: {
    border: "none",
    background: "#274f36",
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 26px rgba(39,79,54,0.20)",
  },

  secondaryButton: {
    border: "1px solid rgba(39,79,54,0.18)",
    background: "rgba(255,255,255,0.85)",
    color: "#234730",
    padding: "14px 18px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },

  sectionIntro: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 22px 18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
    lineHeight: 1.1,
    fontWeight: 800,
    color: "#17311f",
  },

  sectionText: {
    marginTop: 12,
    marginBottom: 0,
    maxWidth: 760,
    fontSize: 17,
    lineHeight: 1.65,
    color: "#496251",
  },

  moduleGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "10px 22px 12px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },

  moduleCard: {
    overflow: "hidden",
    borderRadius: 24,
    background: "#ffffff",
    border: "1px solid rgba(23,49,31,0.08)",
    boxShadow: "0 12px 30px rgba(19,45,28,0.08)",
  },

  moduleImage: {
    height: 190,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  moduleContent: {
    padding: 18,
  },

  statusRow: {
    display: "flex",
    marginBottom: 10,
  },

  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "#eef5e8",
    color: "#33593f",
    fontSize: 12,
    fontWeight: 800,
    padding: "7px 10px",
    letterSpacing: "0.04em",
  },

  moduleTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#17311f",
    marginBottom: 10,
  },

  moduleDescription: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "#4d6654",
  },

  centerWrap: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "18px 22px 48px",
    display: "flex",
    justifyContent: "center",
  },

  roleGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "12px 22px 44px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 18,
  },

  roleCardButton: {
    border: "none",
    padding: 0,
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
  },

  roleCardInner: {
    height: "100%",
    background: "#ffffff",
    border: "1px solid rgba(23,49,31,0.08)",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 12px 28px rgba(19,45,28,0.08)",
  },

  roleTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#183220",
  },

  roleSubtitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#53714f",
    marginTop: 6,
  },

  roleDescription: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 1.65,
    color: "#4b6653",
  },

  roleHero: {
    minHeight: 360,
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginBottom: 20,
  },

  roleHeroOverlay: {
    width: "100%",
    padding: "26px 22px 28px",
    background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(241,247,238,0.88) 100%)",
  },

  backButton: {
    border: "1px solid rgba(23,49,31,0.12)",
    background: "rgba(255,255,255,0.90)",
    color: "#17311f",
    padding: "10px 14px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 14,
  },

  roleHeroTitle: {
    margin: 0,
    fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
    lineHeight: 1,
    fontWeight: 800,
    color: "#16301e",
  },

  roleHeroText: {
    marginTop: 12,
    marginBottom: 0,
    maxWidth: 820,
    fontSize: 17,
    lineHeight: 1.7,
    color: "#34503d",
  },

  roleBody: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 22px 48px",
    display: "grid",
    gridTemplateColumns: "minmax(280px, 0.9fr) minmax(320px, 1.1fr)",
    gap: 22,
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  infoBox: {
    background: "#ffffff",
    borderRadius: 22,
    border: "1px solid rgba(23,49,31,0.08)",
    boxShadow: "0 12px 28px rgba(19,45,28,0.08)",
    padding: 22,
  },

  infoTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: "#183220",
  },

  infoText: {
    marginTop: 12,
    marginBottom: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: "#4c6654",
  },

  bulletList: {
    margin: "14px 0 0 18px",
    padding: 0,
  },

  bulletItem: {
    marginBottom: 10,
    color: "#496252",
    lineHeight: 1.65,
    fontSize: 15,
  },
};

export default App;
