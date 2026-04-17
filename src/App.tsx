import React, { useMemo, useState } from "react";

type View = "home" | "role";
type Role =
  | "guest"
  | "customer"
  | "grower"
  | "youth"
  | "volunteer"
  | "supervisor";

type Language = "en" | "es" | "tl";

const IMAGES = {
  hero: "/GrowArea.jpg",
  history: "/GrowArea2.jpg",

  guest: "/Sameera1.jpg",
  customer: "/culinary_edibleflowers.jpeg",
  grower: "/Sameera3.jpg",
  youth: "/Samaeera2.jpg",
  volunteer: "/Samerra4.jpg",
  supervisor: "/Samerra5.jpg",
};

const ROLES: { id: Role; label: string; subtitle: string }[] = [
  { id: "guest", label: "Guest", subtitle: "Explore the farm" },
  { id: "customer", label: "Customer", subtitle: "Find food and shop" },
  { id: "grower", label: "Grower", subtitle: "See crops and workflow" },
  { id: "youth", label: "Youth", subtitle: "Learn and work" },
  { id: "volunteer", label: "Volunteer", subtitle: "Help where needed" },
  { id: "supervisor", label: "Supervisor", subtitle: "Guide and support" },
];

const copy = {
  en: {
    brandSub: "Immersive live demo",
    weather: "Youngstown, OH • 62°F • Good growing day",
    heroKicker: "Living ecosystem",
    heroTitle: "Bronson Family Farm",
    heroSubtitle: "A living ecosystem.",
    heroDescription:
      "Land, food, work, learning, and community moving together.",
    enterFarm: "Enter the farm",
    enterRole: "Enter by role",
    historyKicker: "Our Roots",
    historyTitle: "A farm built from legacy, land, and lived experience",
    historyP1:
      "Bronson Family Farm grows from family history, resilience, and a belief that land can restore connection, dignity, and opportunity.",
    historyP2:
      "What grows here is more than food — it is access, work, learning, community renewal, and a future rooted in shared possibility.",
    growsKicker: "What grows here",
    growsTitle: "What grows here is more than food.",
    growsText:
      "It is a place where people enter the land and find connection, work, learning, healing, and opportunity.",
    liveKicker: "What is live",
    liveTitle: "Step into the active parts of the farm",
    whyKicker: "Why it matters",
    whyTitle:
      "The farm connects food, family, workforce, and community renewal",
    whyText:
      "This ecosystem is meant to serve more than one purpose. It creates visibility for growing, strengthens access to fresh food, makes room for learning and work, and gives partners, volunteers, youth, customers, and families a place to belong.",
    nextKicker: "What comes next",
    nextTitle: "Enter the living system through the path that belongs to you",
    nextText:
      "After the farm, the roots, the live movement, and the community are made visible, each person can step into the part of the ecosystem that fits their role.",
    systemKicker: "Enter the system",
    systemTitle: "Choose how you are entering the farm today",
    cropTitle: "Crop Planning Calendar",
    cropSubtitle:
      "A visible rhythm for planting, tending, harvesting, and upcoming activity.",
    dashboardTitle: "Live Farm Dashboard",
    dashboardSubtitle:
      "A clearer view of what is happening now across growing, events, and people.",
    back: "← Back to farm",
    roleView: "Role-based live view",
    pathShows: "What this path shows",
    modulesTitle: "Live modules",
    guestBtn: "Enter as guest",
  },
  es: {
    brandSub: "Demostración inmersiva",
    weather: "Youngstown, OH • 62°F • Buen día para cultivar",
    heroKicker: "Ecosistema vivo",
    heroTitle: "Bronson Family Farm",
    heroSubtitle: "Un ecosistema vivo.",
    heroDescription:
      "Tierra, alimentos, trabajo, aprendizaje y comunidad avanzando juntos.",
    enterFarm: "Entrar a la granja",
    enterRole: "Entrar por rol",
    historyKicker: "Nuestras raíces",
    historyTitle: "Una granja construida con legado, tierra y experiencia vivida",
    historyP1:
      "Bronson Family Farm surge de la historia familiar, la resiliencia y la creencia de que la tierra puede restaurar conexión, dignidad y oportunidad.",
    historyP2:
      "Lo que crece aquí es más que comida: es acceso, trabajo, aprendizaje, renovación comunitaria y un futuro arraigado en la posibilidad compartida.",
    growsKicker: "Lo que crece aquí",
    growsTitle: "Lo que crece aquí es más que comida.",
    growsText:
      "Es un lugar donde las personas entran a la tierra y encuentran conexión, trabajo, aprendizaje, sanación y oportunidad.",
    liveKicker: "Lo que está activo",
    liveTitle: "Entra en las partes activas de la granja",
    whyKicker: "Por qué importa",
    whyTitle:
      "La granja conecta alimentos, familia, fuerza laboral y renovación comunitaria",
    whyText:
      "Este ecosistema está diseñado para servir a más de un propósito. Da visibilidad al cultivo, fortalece el acceso a alimentos frescos, abre espacio para el aprendizaje y el trabajo, y ofrece a socios, voluntarios, jóvenes, clientes y familias un lugar de pertenencia.",
    nextKicker: "Lo que sigue",
    nextTitle: "Entra al sistema vivo por el camino que te corresponde",
    nextText:
      "Después de hacer visible la granja, las raíces, el movimiento y la comunidad, cada persona puede entrar en la parte del ecosistema que se ajusta a su rol.",
    systemKicker: "Entrar al sistema",
    systemTitle: "Elige cómo entras hoy a la granja",
    cropTitle: "Calendario de Cultivo",
    cropSubtitle:
      "Un ritmo visible para sembrar, cuidar, cosechar y ver la actividad próxima.",
    dashboardTitle: "Panel en Vivo de la Granja",
    dashboardSubtitle:
      "Una vista más clara de lo que está ocurriendo ahora en cultivo, eventos y personas.",
    back: "← Volver a la granja",
    roleView: "Vista en vivo por rol",
    pathShows: "Lo que muestra este camino",
    modulesTitle: "Módulos en vivo",
    guestBtn: "Entrar como invitado",
  },
  tl: {
    brandSub: "Immersive live demo",
    weather: "Youngstown, OH • 62°F • Magandang araw para magtanim",
    heroKicker: "Buhay na ecosystem",
    heroTitle: "Bronson Family Farm",
    heroSubtitle: "Isang buhay na ecosystem.",
    heroDescription:
      "Lupa, pagkain, trabaho, pagkatuto, at komunidad na magkakasamang umuunlad.",
    enterFarm: "Pumasok sa bukid",
    enterRole: "Pumasok ayon sa papel",
    historyKicker: "Aming Ugat",
    historyTitle:
      "Isang bukid na binuo mula sa pamana, lupa, at tunay na karanasan",
    historyP1:
      "Ang Bronson Family Farm ay lumalago mula sa kasaysayan ng pamilya, katatagan, at paniniwalang ang lupa ay maaaring magbalik ng koneksyon, dignidad, at oportunidad.",
    historyP2:
      "Ang tumutubo rito ay higit pa sa pagkain — ito ay access, trabaho, pagkatuto, pagbangon ng komunidad, at kinabukasang nakaugat sa sama-samang posibilidad.",
    growsKicker: "Ano ang tumutubo rito",
    growsTitle: "Ang tumutubo rito ay higit pa sa pagkain.",
    growsText:
      "Ito ay lugar kung saan pumapasok ang mga tao sa lupa at nakakahanap ng koneksyon, trabaho, pagkatuto, paggaling, at oportunidad.",
    liveKicker: "Ano ang aktibo",
    liveTitle: "Pumasok sa mga aktibong bahagi ng bukid",
    whyKicker: "Bakit mahalaga",
    whyTitle:
      "Pinagdurugtong ng bukid ang pagkain, pamilya, trabaho, at pagbangon ng komunidad",
    whyText:
      "Ang ecosystem na ito ay para sa higit sa isang layunin. Pinapakita nito ang aktibong pagtatanim, pinapalakas ang access sa sariwang pagkain, nagbibigay ng puwang para sa pagkatuto at trabaho, at lumilikha ng lugar ng pag-aari para sa mga kasosyo, boluntaryo, kabataan, mamimili, at pamilya.",
    nextKicker: "Susunod",
    nextTitle:
      "Pumasok sa buhay na sistemang ito sa paraang nababagay sa iyong papel",
    nextText:
      "Pagkatapos makita ang bukid, mga ugat, galaw, at komunidad, maaaring pumasok ang bawat tao sa bahagi ng ecosystem na para sa kanila.",
    systemKicker: "Pumasok sa sistema",
    systemTitle: "Piliin kung paano ka papasok sa bukid ngayon",
    cropTitle: "Kalendaryo ng Pananim",
    cropSubtitle:
      "Isang nakikitang ritmo para sa pagtatanim, pag-aalaga, pag-aani, at mga susunod na gawain.",
    dashboardTitle: "Live Farm Dashboard",
    dashboardSubtitle:
      "Mas malinaw na tanaw sa nangyayari ngayon sa pagtatanim, mga event, at mga tao.",
    back: "← Bumalik sa bukid",
    roleView: "Live view ayon sa papel",
    pathShows: "Ano ang ipinapakita ng landas na ito",
    modulesTitle: "Live modules",
    guestBtn: "Pumasok bilang guest",
  },
};

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedRole, setSelectedRole] = useState<Role>("guest");
  const [language, setLanguage] = useState<Language>("en");

  const t = copy[language];

  const roleData = useMemo(() => {
    switch (selectedRole) {
      case "guest":
        return {
          title: "Guest Experience",
          image: IMAGES.guest,
          position: "center 20%",
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
              title: "Why it matters",
              text: "The experience should feel welcoming, grounded, and easy to understand without losing the depth of the vision.",
            },
          ],
          modules: [
            "Welcome map",
            "Upcoming events",
            "Farm story",
            "Seasonal highlights",
          ],
        };
      case "customer":
        return {
          title: "Customer Experience",
          image: IMAGES.customer,
          position: "center center",
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
          modules: [
            "Available produce",
            "Pickup flow",
            "SNAP-friendly access",
            "Market updates",
          ],
        };
      case "grower":
        return {
          title: "Grower Experience",
          image: IMAGES.grower,
          position: "center 78%",
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
          modules: [
            "Crop plan",
            "Watering status",
            "Field tasks",
            "Harvest targets",
          ],
        };
      case "youth":
        return {
          title: "Youth Experience",
          image: IMAGES.youth,
          position: "left center",
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
          modules: [
            "Daily assignments",
            "Skills progress",
            "Safety reminders",
            "Mentor support",
          ],
        };
      case "volunteer":
        return {
          title: "Volunteer Experience",
          image: IMAGES.volunteer,
          position: "right center",
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
          modules: [
            "Open shifts",
            "Event help",
            "Service opportunities",
            "Welcome guide",
          ],
        };
      case "supervisor":
        return {
          title: "Supervisor Experience",
          image: IMAGES.supervisor,
          position: "center bottom",
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
          modules: [
            "Team activity",
            "Task assignment",
            "Schedule visibility",
            "Supervisor notes",
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
          language={language}
          setLanguage={setLanguage}
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
          brandSub={t.brandSub}
        />

        <WeatherBar text={t.weather} />

        <section
          style={{
            ...styles.roleHero,
            backgroundImage: `linear-gradient(rgba(10,16,11,0.18), rgba(10,16,11,0.55)), url(${roleData.image})`,
            backgroundPosition: roleData.position,
          }}
        >
          <div style={styles.roleHeroTextBlock}>
            <button style={styles.backButton} onClick={() => setView("home")}>
              {t.back}
            </button>
            <div style={styles.eyebrowLight}>{t.roleView}</div>
            <h1 style={styles.roleTitle}>{roleData.title}</h1>
            <p style={styles.roleIntro}>{roleData.intro}</p>
          </div>
        </section>

        <section style={styles.roleInfoBand}>
          <div style={styles.roleInfoInner}>
            <div style={styles.eyebrowDark}>{t.pathShows}</div>
            <div style={styles.roleBulletGrid}>
              {roleData.bullets.map((bullet) => (
                <div key={bullet} style={styles.roleBulletItem}>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.moduleSection}>
          <div style={styles.container}>
            <div style={styles.eyebrowDark}>{t.modulesTitle}</div>
            <div style={styles.moduleGrid}>
              {roleData.modules.map((module) => (
                <div key={module} style={styles.moduleCard}>
                  <div style={styles.moduleCardTitle}>{module}</div>
                  <div style={styles.moduleCardText}>
                    This area is designed to feel active, visible, and useful in
                    the live ecosystem.
                  </div>
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
        language={language}
        setLanguage={setLanguage}
        onHome={() => setView("home")}
        rightContent={
          <button style={styles.navButton} onClick={() => setView("role")}>
            {t.enterRole}
          </button>
        }
        brandSub={t.brandSub}
      />

      <WeatherBar text={t.weather} />

      <HeroSection
        image={IMAGES.hero}
        kicker={t.heroKicker}
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDescription}
        enterLabel={t.enterFarm}
        roleLabel={t.enterRole}
        onEnter={() => {
          const target = document.getElementById("history");
          target?.scrollIntoView({ behavior: "smooth" });
        }}
        onRole={() => setView("role")}
      />

      <HistorySection
        image={IMAGES.history}
        kicker={t.historyKicker}
        title={t.historyTitle}
        p1={t.historyP1}
        p2={t.historyP2}
      />

      <TextBand
        dark
        kicker={t.growsKicker}
        title={t.growsTitle}
        text={t.growsText}
      />

      <LiveDashboard title={t.dashboardTitle} subtitle={t.dashboardSubtitle} />

      <LivePathways
        kicker={t.liveKicker}
        title={t.liveTitle}
        onNavigate={(role) => {
          setSelectedRole(role);
          setView("role");
        }}
      />

      <CropCalendar title={t.cropTitle} subtitle={t.cropSubtitle} />

      <PathSection
        kicker={t.whyKicker}
        title={t.whyTitle}
        text={t.whyText}
        buttonLabel={t.guestBtn}
        onButton={() => {
          setSelectedRole("guest");
          setView("role");
        }}
        tone="light"
      />

      <TextBand
        dark
        kicker={t.nextKicker}
        title={t.nextTitle}
        text={t.nextText}
        buttonLabel={t.enterRole}
        onButton={() => setView("role")}
      />

      <section style={styles.roleEntrySection}>
        <div style={styles.container}>
          <div style={styles.eyebrowDark}>{t.systemKicker}</div>
          <h2 style={styles.roleEntryTitle}>{t.systemTitle}</h2>
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
  language,
  setLanguage,
  brandSub,
}: {
  onHome: () => void;
  rightContent: React.ReactNode;
  language: Language;
  setLanguage: (value: Language) => void;
  brandSub: string;
}) {
  return (
    <header style={styles.nav}>
      <button onClick={onHome} style={styles.brandButton}>
        <div style={styles.brandDot} />
        <div>
          <div style={styles.brandTitle}>Bronson Family Farm</div>
          <div style={styles.brandSub}>{brandSub}</div>
        </div>
      </button>

      <div style={styles.navRight}>
        <div style={styles.langWrap}>
          <button
            onClick={() => setLanguage("en")}
            style={{
              ...styles.langButton,
              ...(language === "en" ? styles.langButtonActive : {}),
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("es")}
            style={{
              ...styles.langButton,
              ...(language === "es" ? styles.langButtonActive : {}),
            }}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage("tl")}
            style={{
              ...styles.langButton,
              ...(language === "tl" ? styles.langButtonActive : {}),
            }}
          >
            TL
          </button>
        </div>
        <div>{rightContent}</div>
      </div>
    </header>
  );
}

function WeatherBar({ text }: { text: string }) {
  return (
    <div style={styles.weatherBar}>
      <div style={styles.weatherInner}>
        <div>Live Conditions</div>
        <div>{text}</div>
      </div>
    </div>
  );
}

function HeroSection({
  image,
  kicker,
  title,
  subtitle,
  description,
  enterLabel,
  roleLabel,
  onEnter,
  onRole,
}: {
  image: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  enterLabel: string;
  roleLabel: string;
  onEnter: () => void;
  onRole: () => void;
}) {
  return (
    <section
      style={{
        ...styles.hero,
        backgroundImage: `linear-gradient(rgba(8,13,10,0.14), rgba(8,13,10,0.48)), url(${image})`,
        backgroundPosition: "center 58%",
      }}
    >
      <div style={styles.heroTextBlock}>
        <div style={styles.eyebrowLight}>{kicker}</div>
        <h1 style={styles.heroTitle}>{title}</h1>
        <div style={styles.heroSubtitle}>{subtitle}</div>
        <p style={styles.heroDescription}>{description}</p>
        <div style={styles.heroButtonRow}>
          <button style={styles.primaryButton} onClick={onEnter}>
            {enterLabel}
          </button>
          <button style={styles.secondaryButton} onClick={onRole}>
            {roleLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function HistorySection({
  image,
  kicker,
  title,
  p1,
  p2,
}: {
  image: string;
  kicker: string;
  title: string;
  p1: string;
  p2: string;
}) {
  return (
    <section
      id="history"
      style={{
        ...styles.historySection,
        backgroundImage: `linear-gradient(rgba(12,20,14,0.22), rgba(12,20,14,0.56)), url(${image})`,
        backgroundPosition: "center 24%",
      }}
    >
      <div style={styles.historyTextBlock}>
        <div style={styles.eyebrowLight}>{kicker}</div>
        <h2 style={styles.historyTitle}>{title}</h2>
        <p style={styles.historyText}>{p1}</p>
        <p style={styles.historyText}>{p2}</p>
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
        <div style={dark ? styles.eyebrowLight : styles.eyebrowDark}>
          {kicker}
        </div>
        <h2 style={dark ? styles.bandTitleLight : styles.bandTitleDark}>
          {title}
        </h2>
        <p style={dark ? styles.bandTextLight : styles.bandTextDark}>{text}</p>
        {buttonLabel && onButton && (
          <button
            style={dark ? styles.primaryButton : styles.darkButton}
            onClick={onButton}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </section>
  );
}

function LiveDashboard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const items = [
    { label: "Growing Areas", value: "12 Active" },
    { label: "Next Event", value: "Community Market" },
    { label: "Youth Team", value: "On Path" },
    { label: "Volunteer Needs", value: "4 Open" },
  ];

  return (
    <section style={styles.dashboardSection}>
      <div style={styles.container}>
        <div style={styles.eyebrowDark}>Dashboard</div>
        <h2 style={styles.liveTitle}>{title}</h2>
        <p style={styles.dashboardText}>{subtitle}</p>

        <div style={styles.dashboardGrid}>
          {items.map((item) => (
            <div key={item.label} style={styles.dashboardCard}>
              <div style={styles.dashboardValue}>{item.value}</div>
              <div style={styles.dashboardLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LivePathways({
  kicker,
  title,
  onNavigate,
}: {
  kicker: string;
  title: string;
  onNavigate: (role: Role) => void;
}) {
  const pathways = [
    {
      title: "Growing",
      text: "See what is actively growing and how the land is being used.",
      role: "grower" as Role,
    },
    {
      title: "Food Access",
      text: "Explore fresh food, availability, and how people connect to it.",
      role: "customer" as Role,
    },
    {
      title: "Youth Workforce",
      text: "Understand how young people learn through real work.",
      role: "youth" as Role,
    },
    {
      title: "Community",
      text: "See events, volunteers, and how people gather here.",
      role: "volunteer" as Role,
    },
  ];

  return (
    <section style={styles.liveSection}>
      <div style={styles.container}>
        <div style={styles.eyebrowDark}>{kicker}</div>
        <h2 style={styles.liveTitle}>{title}</h2>

        <div style={styles.liveGrid}>
          {pathways.map((item) => (
            <button
              key={item.title}
              style={styles.liveCard}
              onClick={() => onNavigate(item.role)}
            >
              <div style={styles.liveCardTitle}>{item.title}</div>
              <div style={styles.liveCardText}>{item.text}</div>
              <div style={styles.liveCardAction}>Enter →</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CropCalendar({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const months = [
    { month: "April", task: "Seed starting" },
    { month: "May", task: "Transplanting" },
    { month: "June", task: "Tending + watering" },
    { month: "July", task: "Harvest begins" },
  ];

  return (
    <section style={styles.cropSection}>
      <div style={styles.container}>
        <div style={styles.eyebrowDark}>Planning</div>
        <h2 style={styles.liveTitle}>{title}</h2>
        <p style={styles.dashboardText}>{subtitle}</p>

        <div style={styles.cropGrid}>
          {months.map((item) => (
            <div key={item.month} style={styles.cropCard}>
              <div style={styles.cropMonth}>{item.month}</div>
              <div style={styles.cropTask}>{item.task}</div>
            </div>
          ))}
        </div>
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
          <div style={isDark ? styles.eyebrowLight : styles.eyebrowDark}>
            {kicker}
          </div>
          <h2 style={isDark ? styles.pathTitleLight : styles.pathTitleDark}>
            {title}
          </h2>
        </div>

        <div style={styles.pathRight}>
          <p style={isDark ? styles.pathTextLight : styles.pathTextDark}>
            {text}
          </p>
          <button
            style={isDark ? styles.primaryButton : styles.darkButton}
            onClick={onButton}
          >
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
    zIndex: 60,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    padding: "14px 18px",
    background: "rgba(10,18,12,0.14)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "flex-end",
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

  langWrap: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: 4,
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  langButton: {
    border: "none",
    background: "transparent",
    color: "#ffffff",
    padding: "8px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },

  langButtonActive: {
    background: "#e9f1df",
    color: "#17311f",
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

  weatherBar: {
    position: "fixed",
    top: 72,
    left: 0,
    right: 0,
    zIndex: 40,
    background: "#e8f1de",
    borderBottom: "1px solid rgba(23,49,31,0.08)",
  },

  weatherInner: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "10px 24px",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    fontSize: 14,
    color: "#294132",
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
    padding: "152px 24px 42px",
    transition: "all 0.6s ease",
  },

  heroTextBlock: {
    maxWidth: 760,
    padding: "8px 0",
  },

  heroTitle: {
    margin: 0,
    fontSize: "clamp(3rem, 7vw, 5.5rem)",
    lineHeight: 0.98,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
    textShadow: "0 2px 14px rgba(0,0,0,0.16)",
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
    transition: "all 0.6s ease",
  },

  historyTextBlock: {
    maxWidth: 760,
    padding: "8px 0",
  },

  historyTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3.1rem)",
    lineHeight: 1.08,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
    textShadow: "0 2px 14px rgba(0,0,0,0.14)",
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

  dashboardSection: {
    background: "#ffffff",
    padding: "72px 0 48px",
  },

  dashboardText: {
    marginTop: 14,
    marginBottom: 0,
    maxWidth: 760,
    fontSize: 17,
    lineHeight: 1.72,
    color: "#5a705f",
  },

  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 28,
  },

  dashboardCard: {
    background: "#f7faf5",
    borderRadius: 22,
    border: "1px solid rgba(23,49,31,0.08)",
    padding: "24px 20px",
    boxShadow: "0 12px 24px rgba(19,45,28,0.05)",
  },

  dashboardValue: {
    fontSize: 28,
    fontWeight: 500,
    color: "#17311f",
  },

  dashboardLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#59705f",
    lineHeight: 1.55,
  },

  liveSection: {
    background: "#f7faf5",
    padding: "72px 0",
  },

  liveTitle: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3rem)",
    color: "#17311f",
    fontWeight: 500,
    maxWidth: 760,
    lineHeight: 1.08,
  },

  liveGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
    marginTop: 32,
  },

  liveCard: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "22px 20px",
    textAlign: "left",
    border: "1px solid rgba(23,49,31,0.08)",
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(19,45,28,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  liveCardTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "#183220",
  },

  liveCardText: {
    fontSize: 15,
    color: "#5a705f",
    lineHeight: 1.6,
  },

  liveCardAction: {
    marginTop: 8,
    fontSize: 14,
    color: "#7aa95c",
    fontWeight: 500,
  },

  cropSection: {
    background: "#ffffff",
    padding: "64px 0 74px",
  },

  cropGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginTop: 28,
  },

  cropCard: {
    background: "#eef4e8",
    borderRadius: 20,
    padding: "22px 18px",
    border: "1px solid rgba(23,49,31,0.08)",
  },

  cropMonth: {
    fontSize: 20,
    fontWeight: 500,
    color: "#183220",
  },

  cropTask: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 1.6,
    color: "#556c5b",
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
    minHeight: "52vh",
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "156px 24px 24px",
    transition: "all 0.6s ease",
  },

  roleHeroTextBlock: {
    maxWidth: 760,
    padding: "0",
  },

  backButton: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.10)",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    marginBottom: 16,
  },

  roleTitle: {
    margin: 0,
    fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)",
    lineHeight: 1.02,
    fontWeight: 500,
    color: "#ffffff",
    textWrap: "balance",
    textShadow: "0 2px 12px rgba(0,0,0,0.14)",
  },

  roleIntro: {
    marginTop: 14,
    marginBottom: 0,
    maxWidth: 700,
    fontSize: 17,
    lineHeight: 1.68,
    color: "rgba(255,255,255,0.92)",
    textShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },

  roleInfoBand: {
    background: "#f7faf5",
    padding: "28px 24px 56px",
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
    borderRadius: 18,
    border: "1px solid rgba(23,49,31,0.08)",
    padding: "18px 16px",
    color: "#2c4736",
    fontSize: 15,
    lineHeight: 1.62,
    boxShadow: "0 10px 22px rgba(19,45,28,0.05)",
  },

  moduleSection: {
    background: "#ffffff",
    padding: "22px 0 52px",
  },

  moduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 12,
  },

  moduleCard: {
    background: "#f7faf5",
    border: "1px solid rgba(23,49,31,0.08)",
    borderRadius: 20,
    padding: "20px 18px",
  },

  moduleCardTitle: {
    fontSize: 19,
    fontWeight: 500,
    color: "#183220",
  },

  moduleCardText: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 1.65,
    color: "#5a705f",
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
