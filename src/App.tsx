import React, { useEffect, useMemo, useState } from "react";

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";

type PageKey =
  | "home"
  | "story"
  | "guest"
  | "customer"
  | "grower"
  | "producer"
  | "youth"
  | "supervisor"
  | "marketplace"
  | "nutrition"
  | "recipes"
  | "calendar"
  | "events"
  | "weather"
  | "about";

type RoleCard = {
  key: PageKey;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  destinations: { label: string; page: PageKey }[];
};

const BRAND = {
  farmName: "Bronson Family Farm",
  alliance: "Farm & Family Alliance",
  developedBy: "Developed by Bronson Family Farm",
  grownByUrl: "https://grownby.com/farms/bronson-family-farm/shop",
  websiteUrl: "https://www.bronsonfamilyfarm.com/",
};

const imageMap: Partial<Record<PageKey | "hero", string>> = {
  hero: "/GrowArea.jpg",
  story: "/GrowArea2.jpg",
  guest: "/Guest.jpg",
  customer: "/Customer.jpg",
  grower: "/Grower.jpg",
  producer: "/ValueAdded.jpg",
  youth: "/Youth.jpg",
  supervisor: "/Supervisor.jpg",
  marketplace: "/Marketplace.jpg",
  nutrition: "/Nutrition.jpg",
  recipes: "/Recipes.jpg",
  events: "/Events.jpg",
  calendar: "/Calendar.jpg",
  weather: "/Weather.jpg",
  about: "/FarmStory.jpg",
};

const translations: Record<
  LanguageKey,
  {
    languageName: string;
    appTagline: string;
    welcome: string;
    guidedDemo: string;
    beginJourney: string;
    enterMarketplace: string;
    backHome: string;
    rolePathways: string;
    destinations: string;
    quickAccess: string;
    recipes: string;
    nutrition: string;
    events: string;
    weather: string;
    calendar: string;
    story: string;
    about: string;
    developedBy: string;
  }
> = {
  en: {
    languageName: "English",
    appTagline: "A welcoming grower ecosystem rooted in land, people, learning, and access.",
    welcome: "Welcome to the Bronson Family Farm ecosystem",
    guidedDemo: "Guided Demo",
    beginJourney: "Begin Journey",
    enterMarketplace: "Enter Marketplace",
    backHome: "Back to Home",
    rolePathways: "Role Pathways",
    destinations: "Destinations",
    quickAccess: "Quick Access",
    recipes: "Recipes",
    nutrition: "Nutrition",
    events: "Events",
    weather: "Weather",
    calendar: "Growing Calendar",
    story: "Our Story",
    about: "About the Ecosystem",
    developedBy: "Developed by Bronson Family Farm",
  },
  es: {
    languageName: "Español",
    appTagline: "Un ecosistema acogedor para productores, basado en la tierra, las personas, el aprendizaje y el acceso.",
    welcome: "Bienvenido al ecosistema de Bronson Family Farm",
    guidedDemo: "Demo Guiado",
    beginJourney: "Comenzar recorrido",
    enterMarketplace: "Entrar al Mercado",
    backHome: "Volver al Inicio",
    rolePathways: "Rutas por Rol",
    destinations: "Destinos",
    quickAccess: "Acceso Rápido",
    recipes: "Recetas",
    nutrition: "Nutrición",
    events: "Eventos",
    weather: "Clima",
    calendar: "Calendario de Cultivo",
    story: "Nuestra Historia",
    about: "Sobre el Ecosistema",
    developedBy: "Desarrollado por Bronson Family Farm",
  },
  tl: {
    languageName: "Tagalog",
    appTagline: "Isang magiliw na ecosystem para sa mga nagtatanim, pamilya, at komunidad.",
    welcome: "Maligayang pagdating sa Bronson Family Farm ecosystem",
    guidedDemo: "Gabay na Demo",
    beginJourney: "Simulan ang Paglalakbay",
    enterMarketplace: "Pumasok sa Marketplace",
    backHome: "Bumalik sa Home",
    rolePathways: "Mga Daan ng Papel",
    destinations: "Mga Destinasyon",
    quickAccess: "Mabilis na Access",
    recipes: "Mga Resipe",
    nutrition: "Nutrisyon",
    events: "Mga Kaganapan",
    weather: "Panahon",
    calendar: "Kalendaryo ng Pagtatanim",
    story: "Aming Kuwento",
    about: "Tungkol sa Ecosystem",
    developedBy: "Binuo ng Bronson Family Farm",
  },
  it: {
    languageName: "Italiano",
    appTagline: "Un ecosistema accogliente per coltivatori, famiglie e comunità.",
    welcome: "Benvenuti nell’ecosistema di Bronson Family Farm",
    guidedDemo: "Demo Guidata",
    beginJourney: "Inizia il Percorso",
    enterMarketplace: "Entra nel Marketplace",
    backHome: "Torna alla Home",
    rolePathways: "Percorsi per Ruolo",
    destinations: "Destinazioni",
    quickAccess: "Accesso Rapido",
    recipes: "Ricette",
    nutrition: "Nutrizione",
    events: "Eventi",
    weather: "Meteo",
    calendar: "Calendario di Coltivazione",
    story: "La Nostra Storia",
    about: "Informazioni sull’Ecosistema",
    developedBy: "Sviluppato da Bronson Family Farm",
  },
  patwa: {
    languageName: "Patwa",
    appTagline: "A one warm an welcoming farm ecosystem fi people, food, learning, an growth.",
    welcome: "Welcome to di Bronson Family Farm ecosystem",
    guidedDemo: "Guided Demo",
    beginJourney: "Start Yuh Journey",
    enterMarketplace: "Go A Di Marketplace",
    backHome: "Back Home",
    rolePathways: "Role Pathways",
    destinations: "Destinations",
    quickAccess: "Quick Access",
    recipes: "Recipes",
    nutrition: "Nutrition",
    events: "Events",
    weather: "Weather",
    calendar: "Growing Calendar",
    story: "Wi Story",
    about: "Bout Di Ecosystem",
    developedBy: "Developed by Bronson Family Farm",
  },
  he: {
    languageName: "עברית",
    appTagline: "מערכת חקלאית קהילתית, נעימה ומזמינה, המבוססת על אדמה, אנשים, למידה ונגישות.",
    welcome: "ברוכים הבאים למערכת של Bronson Family Farm",
    guidedDemo: "הדגמה מודרכת",
    beginJourney: "התחל מסע",
    enterMarketplace: "כניסה לשוק",
    backHome: "חזרה לדף הבית",
    rolePathways: "מסלולי תפקידים",
    destinations: "יעדים",
    quickAccess: "גישה מהירה",
    recipes: "מתכונים",
    nutrition: "תזונה",
    events: "אירועים",
    weather: "מזג אוויר",
    calendar: "לוח גידול",
    story: "הסיפור שלנו",
    about: "על המערכת",
    developedBy: "פותח על ידי Bronson Family Farm",
  },
};

const roleCards: RoleCard[] = [
  {
    key: "guest",
    title: "Guest",
    subtitle: "Explore the farm experience",
    description:
      "A first-time visitor can explore the story, land, public events, learning spaces, and community opportunities that make this ecosystem worth returning to again and again.",
    image: imageMap.guest,
    destinations: [
      { label: "Our Story", page: "story" },
      { label: "Events", page: "events" },
      { label: "About the Ecosystem", page: "about" },
    ],
  },
  {
    key: "customer",
    title: "Customer",
    subtitle: "Food access, shopping, education, and recipes",
    description:
      "Customers can move from inspiration to action: shop the marketplace, discover produce, learn about nutrition, get recipes, and build better food habits over time.",
    image: imageMap.customer,
    destinations: [
      { label: "Marketplace", page: "marketplace" },
      { label: "Nutrition", page: "nutrition" },
      { label: "Recipes", page: "recipes" },
    ],
  },
  {
    key: "grower",
    title: "Grower",
    subtitle: "Production, planning, and participation",
    description:
      "Growers can connect to seasonal planning, events, land-based opportunities, and a shared ecosystem designed to support learning, production, and long-term participation.",
    image: imageMap.grower,
    destinations: [
      { label: "Growing Calendar", page: "calendar" },
      { label: "Weather", page: "weather" },
      { label: "Events", page: "events" },
    ],
  },
  {
    key: "producer",
    title: "Value-Added Producer",
    subtitle: "Products, pathways, and partnership",
    description:
      "Value-added producers can see how raw farm products become community-facing goods, educational opportunities, and income-generating pathways within the ecosystem.",
    image: imageMap.producer,
    destinations: [
      { label: "Marketplace", page: "marketplace" },
      { label: "Events", page: "events" },
      { label: "About the Ecosystem", page: "about" },
    ],
  },
  {
    key: "youth",
    title: "Youth Workforce",
    subtitle: "Learning, work experience, and guided growth",
    description:
      "Youth participants experience a structured pathway that combines agriculture, responsibility, wellness, community, and real-world skill building.",
    image: imageMap.youth,
    destinations: [
      { label: "Growing Calendar", page: "calendar" },
      { label: "Nutrition", page: "nutrition" },
      { label: "Events", page: "events" },
    ],
  },
  {
    key: "supervisor",
    title: "Supervisor",
    subtitle: "Support, oversight, and role-based guidance",
    description:
      "Supervisors support the youth workforce pathway through structure, accountability, logistics, and access to support systems that help participants succeed.",
    image: imageMap.supervisor,
    destinations: [
      { label: "Youth Workforce", page: "youth" },
      { label: "Growing Calendar", page: "calendar" },
      { label: "About the Ecosystem", page: "about" },
    ],
  },
];

const pageContent: Record<
  PageKey,
  {
    title: string;
    subtitle: string;
    body: string;
    bullets?: string[];
    image?: string;
  }
> = {
  home: {
    title: "Bronson Family Farm Ecosystem",
    subtitle: "Land. Learning. Food. Workforce. Community.",
    body:
      "This demo introduces a welcoming, role-based ecosystem where guests, customers, growers, value-added producers, youth workers, and supervisors each have a meaningful pathway through the farm experience.",
    image: imageMap.hero,
  },
  story: {
    title: "Our Story",
    subtitle: "Legacy, land, and purpose",
    body:
      "Bronson Family Farm is rooted in intergenerational agricultural legacy, family memory, community care, and a vision for restoring land while increasing access to fresh food, education, and opportunity.",
    bullets: [
      "Inspired by family farming traditions and the grandmother who lived off the land",
      "Honors agricultural roots, spirituality, education, and service",
      "Built as a regenerative, community-serving ecosystem",
    ],
    image: imageMap.story,
  },
  guest: {
    title: "Guest Pathway",
    subtitle: "A welcoming first experience",
    body:
      "Guests are invited into a living ecosystem where there is always something to discover: the story, the land, events, learning opportunities, and reasons to return.",
    bullets: [
      "Explore the story and mission",
      "Attend seasonal events",
      "Discover the ecosystem and community pathways",
    ],
    image: imageMap.guest,
  },
  customer: {
    title: "Customer Pathway",
    subtitle: "Shop, learn, and return",
    body:
      "Customers are guided toward practical food access, produce discovery, healthier choices, educational resources, and recipes that help them use what they buy.",
    bullets: [
      "Direct path to marketplace",
      "Nutrition education and food guidance",
      "Recipes and practical meal inspiration",
    ],
    image: imageMap.customer,
  },
  grower: {
    title: "Grower Pathway",
    subtitle: "Planning and participation",
    body:
      "Growers can move through the ecosystem with visibility into weather, seasonal planning, events, and production-centered opportunities that support long-term engagement.",
    bullets: [
      "Seasonal crop planning",
      "Weather awareness",
      "Participation in events and ecosystem growth",
    ],
    image: imageMap.grower,
  },
  producer: {
    title: "Value-Added Producer Pathway",
    subtitle: "From produce to products",
    body:
      "This pathway demonstrates how growers and makers can add value, create products, deepen community offerings, and participate in a broader regenerative economy.",
    bullets: [
      "Products connected to farm identity",
      "Market pathways and event visibility",
      "Partnership opportunities",
    ],
    image: imageMap.producer,
  },
  youth: {
    title: "Youth Workforce Pathway",
    subtitle: "Hands-on growth and responsibility",
    body:
      "The youth workforce pathway supports learning through agriculture, teamwork, routine, responsibility, and guided exposure to practical skills and future opportunities.",
    bullets: [
      "Hands-on work experiences",
      "Supportive structure and learning",
      "Connection to wellness, food, and responsibility",
    ],
    image: imageMap.youth,
  },
  supervisor: {
    title: "Supervisor Pathway",
    subtitle: "Support systems for youth workforce success",
    body:
      "Supervisors are part of the youth workforce experience, helping participants stay supported, organized, and connected to the resources they need.",
    bullets: [
      "Oversight and guidance",
      "Role-based support structure",
      "Alignment with participant growth and accountability",
    ],
    image: imageMap.supervisor,
  },
  marketplace: {
    title: "Marketplace",
    subtitle: "Shop the farm through GrownBy",
    body:
      "The marketplace is the practical customer destination: a place to connect with produce, seedlings, farm offerings, and future seasonal availability through the Bronson Family Farm GrownBy presence.",
    bullets: [
      "Direct shopping pathway",
      "Supports produce and farm offerings",
      "Designed to connect customers back into the ecosystem",
    ],
    image: imageMap.marketplace,
  },
  nutrition: {
    title: "Nutrition Education",
    subtitle: "Fresh food compared to processed food",
    body:
      "This section helps visitors understand healthier choices, food quality, and the long-term value of fresh ingredients, movement, and diet awareness in everyday life.",
    bullets: [
      "Why fresh food matters",
      "Nutrition guidance for households",
      "Healthier living through food awareness",
    ],
    image: imageMap.nutrition,
  },
  recipes: {
    title: "Recipes",
    subtitle: "Simple ways to use farm produce",
    body:
      "Recipes help customers and families translate produce into meals. The goal is not just to buy food, but to confidently use it, enjoy it, and come back for more.",
    bullets: [
      "Collards and cabbage ideas",
      "Tomato, pepper, and broccoli meal inspiration",
      "Simple family-friendly produce use",
    ],
    image: imageMap.recipes,
  },
  calendar: {
    title: "Growing Calendar",
    subtitle: "Seasonal planning and rhythm",
    body:
      "This area introduces the idea of a living grower calendar: planting windows, seasonal timing, learning cycles, and a rhythm that supports better coordination across the ecosystem.",
    bullets: [
      "Seasonal planning view",
      "Crop timing awareness",
      "Role-based agricultural visibility",
    ],
    image: imageMap.calendar,
  },
  events: {
    title: "Events",
    subtitle: "Reasons to visit and return",
    body:
      "Events activate the ecosystem through demonstration, education, produce, vendors, partnerships, and public engagement that keeps the farm experience dynamic and memorable.",
    bullets: [
      "Growers Supply Market",
      "Community education and demonstrations",
      "Seasonal public-facing engagement",
    ],
    image: imageMap.events,
  },
  weather: {
    title: "Weather",
    subtitle: "A live-feeling grower feature",
    body:
      "This section gives the demo a live feel by anchoring the ecosystem in real growing conditions. It can later be connected to a live weather feed.",
    bullets: [
      "Today’s growing conditions",
      "Helps growers and event planning",
      "Supports a more dynamic experience",
    ],
    image: imageMap.weather,
  },
  about: {
    title: "About the Ecosystem",
    subtitle: "A role-based, returning experience",
    body:
      "This is not just a website. It is an ecosystem designed so different kinds of people can find a place, see resources, take action, and have reasons to return again and again.",
    bullets: [
      "Role-based pathways",
      "Learning, food access, and engagement",
      "Built to feel welcoming, useful, and alive",
    ],
    image: imageMap.about,
  },
};

const guidedPath: PageKey[] = [
  "home",
  "story",
  "guest",
  "customer",
  "marketplace",
  "nutrition",
  "recipes",
  "grower",
  "calendar",
  "weather",
  "producer",
  "youth",
  "supervisor",
  "events",
  "about",
];

function useSpeech(text: string, enabled: boolean, language: LanguageKey) {
  useEffect(() => {
    if (!enabled || !text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const langMap: Record<LanguageKey, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      patwa: "en-JM",
      he: "he-IL",
    };

    utterance.lang = langMap[language] || "en-US";
    utterance.rate = 0.93;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, enabled, language]);
}

const buttonStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.12)",
  color: "white",
  padding: "12px 16px",
  borderRadius: 14,
  cursor: "pointer",
  fontWeight: 700,
  backdropFilter: "blur(8px)",
};

const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "rgba(0,0,0,0.22)",
};

const chipStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.16)",
  fontSize: 13,
  fontWeight: 600,
  marginRight: 8,
  marginBottom: 8,
};

const sectionCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 24,
  padding: 20,
  boxShadow: "0 16px 40px rgba(0,0,0,0.24)",
  backdropFilter: "blur(10px)",
};

function BackgroundImage({ src }: { src?: string }) {
  return (
    <>
      {src ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(9,20,16,0.42), rgba(9,20,16,0.72)), url("${src}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.03)",
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(82,115,86,0.42), transparent 35%), radial-gradient(circle at bottom right, rgba(128,96,54,0.30), transparent 32%), linear-gradient(180deg, #1a2b24 0%, #102019 45%, #0d1713 100%)",
          }}
        />
      )}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,12,10,0.15) 0%, rgba(8,12,10,0.25) 28%, rgba(8,12,10,0.58) 100%)",
        }}
      />
    </>
  );
}

function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [page, setPage] = useState<PageKey>("home");
  const [guidedDemoOn, setGuidedDemoOn] = useState(false);
  const [guidedIndex, setGuidedIndex] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [mounted, setMounted] = useState(false);

  const t = translations[language];
  const current = pageContent[page];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!guidedDemoOn) return;
    setPage(guidedPath[guidedIndex] || "home");
  }, [guidedDemoOn, guidedIndex]);

  const narrationText = useMemo(() => {
    const base = `${current.title}. ${current.subtitle}. ${current.body}`;
    if (!current.bullets?.length) return base;
    return `${base} Key ideas include: ${current.bullets.join(". ")}.`;
  }, [current]);

  useSpeech(narrationText, voiceOn && mounted, language);

  const canGoNext = guidedIndex < guidedPath.length - 1;
  const canGoPrev = guidedIndex > 0;

  const goTo = (nextPage: PageKey) => {
    setGuidedDemoOn(false);
    setPage(nextPage);
  };

  const openMarketplace = () => {
    window.open(BRAND.grownByUrl, "_blank", "noopener,noreferrer");
  };

  const PageSection = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        gap: 20,
        alignItems: "stretch",
      }}
    >
      <div style={sectionCardStyle}>
        <div style={{ fontSize: 14, letterSpacing: 1.4, textTransform: "uppercase", opacity: 0.8 }}>
          {t.destinations}
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 4rem)",
            lineHeight: 1.02,
            margin: "10px 0 10px",
            fontWeight: 800,
          }}
        >
          {current.title}
        </h1>
        <div style={{ fontSize: 20, opacity: 0.92, marginBottom: 14 }}>{current.subtitle}</div>
        <p style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 820 }}>{current.body}</p>

        {current.bullets && (
          <div style={{ marginTop: 16 }}>
            {current.bullets.map((bullet) => (
              <span key={bullet} style={chipStyle}>
                {bullet}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <button onClick={() => setPage("home")} style={buttonStyle}>
            {t.backHome}
          </button>
          <button onClick={() => setPage("marketplace")} style={secondaryButtonStyle}>
            {t.enterMarketplace}
          </button>
          <button onClick={() => setPage("events")} style={secondaryButtonStyle}>
            {t.events}
          </button>
        </div>
      </div>

      <div style={{ ...sectionCardStyle, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, letterSpacing: 1.4, textTransform: "uppercase", opacity: 0.8 }}>
            {t.quickAccess}
          </div>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            <button onClick={() => setPage("story")} style={secondaryButtonStyle}>
              {t.story}
            </button>
            <button onClick={() => setPage("marketplace")} style={secondaryButtonStyle}>
              {t.enterMarketplace}
            </button>
            <button onClick={() => setPage("nutrition")} style={secondaryButtonStyle}>
              {t.nutrition}
            </button>
            <button onClick={() => setPage("recipes")} style={secondaryButtonStyle}>
              {t.recipes}
            </button>
            <button onClick={() => setPage("calendar")} style={secondaryButtonStyle}>
              {t.calendar}
            </button>
            <button onClick={() => setPage("weather")} style={secondaryButtonStyle}>
              {t.weather}
            </button>
          </div>
        </div>

        {page === "marketplace" ? (
          <div style={{ marginTop: 18 }}>
            <button
              onClick={openMarketplace}
              style={{
                ...buttonStyle,
                width: "100%",
                background: "linear-gradient(135deg, rgba(101,164,110,0.32), rgba(168,118,61,0.28))",
              }}
            >
              Open GrownBy Store
            </button>
          </div>
        ) : page === "recipes" ? (
          <div style={{ marginTop: 18, fontSize: 15, lineHeight: 1.7, opacity: 0.94 }}>
            Featured ideas:
            <div style={{ marginTop: 10 }}>
              <span style={chipStyle}>Collards with garlic</span>
              <span style={chipStyle}>Stuffed cabbage skillet</span>
              <span style={chipStyle}>Tomato pepper sauté</span>
              <span style={chipStyle}>Broccoli rice bowl</span>
            </div>
          </div>
        ) : page === "weather" ? (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 40, fontWeight: 800 }}>68°</div>
            <div style={{ opacity: 0.9 }}>Live-feeling weather placeholder for growers and events</div>
          </div>
        ) : page === "calendar" ? (
          <div style={{ marginTop: 18, fontSize: 15, lineHeight: 1.7 }}>
            <div style={chipStyle}>Seed Starting</div>
            <div style={chipStyle}>Transplant Windows</div>
            <div style={chipStyle}>Market Prep</div>
            <div style={chipStyle}>Seasonal Planning</div>
          </div>
        ) : (
          <div style={{ marginTop: 18, fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
            This destination is part of a larger journey designed so visitors can discover useful resources and come
            back again and again.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#fff",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        position: "relative",
        overflow: "hidden",
        background: "#0d1713",
      }}
    >
      <BackgroundImage src={current.image || imageMap.hero} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "24px 20px 36px",
          maxWidth: 1380,
          margin: "0 auto",
        }}
      >
        <header
          style={{
            ...sectionCardStyle,
            display: "grid",
            gridTemplateColumns: "1.2fr auto",
            gap: 16,
            alignItems: "center",
            marginBottom: 22,
            padding: 18,
          }}
        >
          <div>
            <div style={{ fontSize: 13, letterSpacing: 1.6, textTransform: "uppercase", opacity: 0.82 }}>
              {BRAND.farmName} × {BRAND.alliance}
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{t.welcome}</div>
            <div style={{ fontSize: 15, opacity: 0.9, marginTop: 6 }}>{t.appTagline}</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageKey)}
              style={{
                borderRadius: 12,
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                fontWeight: 700,
              }}
            >
              {Object.entries(translations).map(([key, value]) => (
                <option key={key} value={key} style={{ color: "#111" }}>
                  {value.languageName}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setGuidedDemoOn(true);
                setGuidedIndex(0);
                setPage("home");
              }}
              style={buttonStyle}
            >
              {t.guidedDemo}
            </button>

            <button onClick={() => goTo("marketplace")} style={secondaryButtonStyle}>
              {t.enterMarketplace}
            </button>

            <button onClick={() => setVoiceOn((v) => !v)} style={secondaryButtonStyle}>
              Voice: {voiceOn ? "On" : "Off"}
            </button>
          </div>
        </header>

        {page === "home" ? (
          <>
            <section
              style={{
                ...sectionCardStyle,
                padding: 28,
                marginBottom: 22,
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: 20,
                alignItems: "stretch",
              }}
            >
              <div>
                <div style={{ fontSize: 14, letterSpacing: 1.4, textTransform: "uppercase", opacity: 0.8 }}>
                  Ecosystem Demo
                </div>
                <h1
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 5rem)",
                    lineHeight: 0.98,
                    margin: "10px 0 14px",
                    fontWeight: 900,
                    maxWidth: 850,
                  }}
                >
                  A living ecosystem built for guests, customers, growers, youth workforce participants, and the
                  community.
                </h1>
                <p style={{ fontSize: 18, lineHeight: 1.75, maxWidth: 860, opacity: 0.96 }}>
                  This experience is designed to feel like a destination, not a presentation. Every pathway leads
                  somewhere meaningful: the marketplace, nutrition education, recipes, events, planning, story, and
                  role-based support.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                  <button
                    onClick={() => {
                      setGuidedDemoOn(true);
                      setGuidedIndex(0);
                    }}
                    style={buttonStyle}
                  >
                    {t.beginJourney}
                  </button>
                  <button onClick={() => goTo("story")} style
