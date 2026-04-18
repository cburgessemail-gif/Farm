import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  GraduationCap,
  HeartPulse,
  Home,
  Info,
  Languages,
  Leaf,
  Mic,
  Play,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Store,
  Tractor,
  Trees,
  UserRound,
  Users,
  X,
} from "lucide-react";

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";
type ScreenKey =
  | "home"
  | "story"
  | "guest"
  | "customer"
  | "marketplace"
  | "grower"
  | "valueAdded"
  | "youth"
  | "supervisor"
  | "planner"
  | "events"
  | "wellness";

const SCREEN_ORDER: ScreenKey[] = [
  "home",
  "story",
  "guest",
  "customer",
  "marketplace",
  "grower",
  "valueAdded",
  "youth",
  "supervisor",
  "planner",
  "events",
  "wellness",
];

const CANDIDATES = {
  entrance: ["SAM_0220.JPG", "GrowArea.jpg", "large (1).jpg"],
  story: ["SAM_0221.JPG", "GrowArea2.jpg", "large (10).jpg"],
  guest: ["SAM_0222.JPG", "Samaeera1.jpg", "large (11).jpg"],
  customer: ["SAM_0223.JPG", "Samaeera2.jpg", "culinary_edibleflowers.jpeg"],
  marketplace: ["SAM_0225.JPG", "Samaeera3.jpg", "culinary_edibleflowers2.jpeg"],
  grower: ["SAM_0237.JPG", "Samerra4.jpg", "GrowArea.jpg"],
  valueAdded: ["SAM_0238.JPG", "Samerra5.jpg", "culinary_mushrooms.jpeg"],
  youth: ["SAM_0249.JPG", "WolfSpider.jpg", "GrowArea2.jpg"],
  supervisor: ["SAM_0266.JPG", "large (1).jpg", "GrowArea.jpg"],
  planner: ["SAM_0286.JPG", "large (10).jpg", "GrowArea2.jpg"],
  events: ["SAM_0282.JPG", "large (11).jpg", "Samaeera1.jpg"],
  wellness: ["SAM_0281.JPG", "culinary_edibleflowers.jpeg", "Samaeera2.jpg"],
  community: ["SAM_0274.JPG", "Samaeera1.jpg", "GrowArea.jpg"],
  education: ["SAM_0275.JPG", "Samaeera3.jpg", "GrowArea2.jpg"],
  weather: ["SAM_0288.JPG", "large (1).jpg", "GrowArea.jpg"],
  family: ["SAM_0289.JPG", "large (10).jpg", "GrowArea2.jpg"],
  logistics: ["SAM_0290.JPG", "large (11).jpg", "Samerra4.jpg"],
  airport: ["SAM_0291.JPG", "GrowArea.jpg", "WolfSpider.jpg"],
  produce: ["SAM_0293.JPG", "culinary_edibleflowers2.jpeg", "Samaeera2.jpg"],
  volunteers: ["SAM_0305.JPG", "Samaeera1.jpg", "large (1).jpg"],
  training: ["SAM_0307.JPG", "Samerra5.jpg", "large (10).jpg"],
  recipes: ["SAM_0309.JPG", "culinary_mushrooms.jpeg", "Samaeera3.jpg"],
  nutrition: ["SAM_0310.JPG", "culinary_edibleflowers.jpeg", "Samaeera2.jpg"],
  future: ["SAM_0311.JPG", "GrowArea2.jpg", "large (11).jpg"],
  legacy: ["SAM_0313.JPG", "GrowArea.jpg", "Samerra4.jpg"],
};

const tryPaths = (filename: string) => [`/${filename}`, `/public/${filename}`];

const TEXT = {
  brand: "Bronson Family Farm",
  subbrand: "Farm & Family Alliance Ecosystem Demo",
  title: {
    home: "Welcome to the ecosystem",
    story: "The story behind the farm",
    guest: "Guest pathway",
    customer: "Customer pathway",
    marketplace: "Marketplace pathway",
    grower: "Grower pathway",
    valueAdded: "Value-Added Producer pathway",
    youth: "Youth Workforce pathway",
    supervisor: "Supervisor pathway",
    planner: "Crop Planning Center",
    events: "Events and community experiences",
    wellness: "Health, nutrition, and food education",
  } as Record<ScreenKey, string>,
  body: {
    home: "A regenerative farm, agritourism destination, and community platform rooted in land, family legacy, and practical access to resources.",
    story: "Inspired by family farming traditions and shaped for Youngstown’s future, this farm joins legacy, food access, agritourism, and community infrastructure.",
    guest: "Guests discover the farm story, the land, the airport relationship, events, and the resources that make this place worth returning to.",
    customer: "Customers move quickly toward fresh food, seedlings, Bubble Babies, recipes, nutrition guidance, and better understanding of natural food compared with processed food.",
    marketplace: "The marketplace centers GrownBy so people can move from learning to purchasing without losing connection to the farm ecosystem.",
    grower: "Growers return for planning, timing, seasonal support, collaboration, and the structure needed to keep growing.",
    valueAdded: "Value-added producers can explore branding, packaging, demonstrations, and local market opportunities.",
    youth: "Youth workforce connects agriculture, STEAM, entrepreneurship, teamwork, and responsibility in one living environment.",
    supervisor: "Supervisor exists inside youth workforce, supporting scheduling, accountability, logistics, wellness support, and staffing resources.",
    planner: "This planning hub connects seasons, inventory, readiness, grower coordination, and event timing across the ecosystem.",
    events: "Events create reasons for people to return again and again for learning, shopping, demonstrations, wellness, and community.",
    wellness: "Health and nutrition are part of the mission. The platform helps people understand food quality, healthier choices, and practical wellness support.",
  } as Record<ScreenKey, string>,
};

function useSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );

  const speak = (text: string, lang: LanguageKey) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    const map: Record<LanguageKey, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      patwa: "en-JM",
      he: "he-IL",
    };
    utter.lang = map[lang];
    utter.rate = 0.95;
    utter.pitch = 1;
    synthRef.current?.cancel();
    synthRef.current?.speak(utter);
  };

  const stop = () => synthRef.current?.cancel();

  return { speak, stop };
}

function ResilientImage({
  candidates,
  alt,
  style,
}: {
  candidates: string[];
  alt: string;
  style?: React.CSSProperties;
}) {
  const allPaths = useMemo(
    () => candidates.flatMap((f) => tryPaths(f)),
    [candidates]
  );
  const [index, setIndex] = useState(0);

  return (
    <img
      src={allPaths[index]}
      alt={alt}
      style={style}
      onError={() => {
        if (index < allPaths.length - 1) setIndex(index + 1);
      }}
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#08110d",
    color: "#fff",
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
  },
  hero: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },
  bgImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.78), rgba(3,28,18,0.40), rgba(0,0,0,0.84))",
  },
  shell: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1320,
    margin: "0 auto",
    padding: "24px 24px 60px",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 30,
  },
  subbrand: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "rgba(255,255,255,0.68)",
  },
  brand: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.1,
  },
  nav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.28)",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 14,
    backdropFilter: "blur(8px)",
  },
  activePill: {
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.38)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1.25fr 0.75fr",
    gap: 26,
    alignItems: "start",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    marginBottom: 16,
  },
  title: {
    fontSize: 62,
    fontWeight: 800,
    lineHeight: 1.04,
    margin: 0,
    maxWidth: 840,
    textShadow: "0 3px 18px rgba(0,0,0,0.25)",
  },
  body: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.9)",
    maxWidth: 860,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 26,
  },
  whiteBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    color: "#0b1712",
    border: "none",
    padding: "14px 18px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
  },
  ghostBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "14px 18px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
    marginTop: 28,
  },
  card: {
    borderRadius: 28,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.13)",
    padding: 22,
    backdropFilter: "blur(12px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  },
  sideCard: {
    borderRadius: 32,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.13)",
    padding: 20,
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  },
  miniLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "rgba(255,255,255,0.62)",
    marginBottom: 10,
  },
  section: {
    marginTop: 34,
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 18,
    marginTop: 20,
  },
  roleTile: {
    position: "relative",
    minHeight: 280,
    borderRadius: 30,
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
    background: "#0f1714",
  },
  roleImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  roleOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.86), rgba(0,0,0,0.24))",
  },
  roleContent: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "0.95fr 1.05fr",
    gap: 18,
    marginTop: 20,
  },
  infoBox: {
    borderRadius: 22,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.09)",
    padding: 18,
  },
  detailGrid: {
    display: "grid",
    gap: 14,
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  galleryItem: {
    borderRadius: 22,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    background: "#101815",
  },
  galleryImage: {
    width: "100%",
    height: 155,
    objectFit: "cover",
    display: "block",
  },
  footerModuleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginTop: 16,
  },
  moduleBox: {
    borderRadius: 18,
    background: "rgba(0,0,0,0.22)",
    border: "1px solid rgba(255,255,255,0.09)",
    padding: 16,
    lineHeight: 1.55,
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.88)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 24,
  },
  modalImage: {
    maxWidth: "95vw",
    maxHeight: "90vh",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "fixed",
    top: 18,
    right: 18,
    width: 44,
    height: 44,
    borderRadius: 999,
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

export default function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [voiceOn, setVoiceOn] = useState(true);
  const [tourOn, setTourOn] = useState(false);
  const [imageModal, setImageModal] = useState<string[] | null>(null);
  const { speak, stop } = useSpeech();

  const screenCandidates: Record<ScreenKey, string[]> = {
    home: CANDIDATES.entrance,
    story: CANDIDATES.story,
    guest: CANDIDATES.guest,
    customer: CANDIDATES.customer,
    marketplace: CANDIDATES.marketplace,
    grower: CANDIDATES.grower,
    valueAdded: CANDIDATES.valueAdded,
    youth: CANDIDATES.youth,
    supervisor: CANDIDATES.supervisor,
    planner: CANDIDATES.planner,
    events: CANDIDATES.events,
    wellness: CANDIDATES.wellness,
  };

  const currentIndex = SCREEN_ORDER.indexOf(screen);

  const gallery = useMemo(
    () => [
      CANDIDATES.community,
      CANDIDATES.education,
      CANDIDATES.nutrition,
      CANDIDATES.recipes,
      CANDIDATES.volunteers,
      CANDIDATES.training,
      CANDIDATES.produce,
      CANDIDATES.family,
      CANDIDATES.airport,
      CANDIDATES.future,
      CANDIDATES.legacy,
      CANDIDATES.logistics,
    ],
    []
  );

  useEffect(() => {
    if (!voiceOn) {
      stop();
      return;
    }
    speak(TEXT.body[screen], language);
    return () => stop();
  }, [screen, language, voiceOn]);

  useEffect(() => {
    if (!tourOn) return;
    const id = setInterval(() => {
      setScreen((prev) => {
        const i = SCREEN_ORDER.indexOf(prev);
        return SCREEN_ORDER[(i + 1) % SCREEN_ORDER.length];
      });
    }, 9000);
    return () => clearInterval(id);
  }, [tourOn]);

  const goto = (next: ScreenKey) => {
    setTourOn(false);
    setScreen(next);
  };

  const nextScreen = () =>
    goto(SCREEN_ORDER[(currentIndex + 1) % SCREEN_ORDER.length]);
  const prevScreen = () =>
    goto(SCREEN_ORDER[(currentIndex - 1 + SCREEN_ORDER.length) % SCREEN_ORDER.length]);

  const roleTiles = [
    {
      key: "guest" as ScreenKey,
      title: "Guest",
      text: "Discover the farm, the story, the land, events, and the airport-connected grow areas.",
      image: CANDIDATES.guest,
      next: ["Story", "Events", "Gallery"],
    },
    {
      key: "customer" as ScreenKey,
      title: "Customer",
      text: "Move quickly to GrownBy, then return for recipes, nutrition, and food guidance.",
      image: CANDIDATES.customer,
      next: ["Marketplace", "Recipes", "Nutrition"],
    },
    {
      key: "grower" as ScreenKey,
      title: "Grower",
      text: "Access planning, seasonal guidance, training, and ecosystem support.",
      image: CANDIDATES.grower,
      next: ["Planner", "Seasonal Guidance", "Coordination"],
    },
    {
      key: "valueAdded" as ScreenKey,
      title: "Value-Added Producer",
      text: "Explore branding, packaging, demonstrations, and local market opportunity.",
      image: CANDIDATES.valueAdded,
      next: ["Branding", "Packaging", "Market Access"],
    },
    {
      key: "youth" as ScreenKey,
      title: "Youth Workforce",
      text: "See the farm as a living classroom for agriculture, STEAM, teamwork, and entrepreneurship.",
      image: CANDIDATES.youth,
      next: ["Learning", "STEAM", "Responsibilities"],
    },
    {
      key: "supervisor" as ScreenKey,
      title: "Supervisor",
      text: "Support youth workforce through scheduling, oversight, wellness support, and accountability.",
      image: CANDIDATES.supervisor,
      next: ["Scheduling", "Check-In", "Support"],
    },
  ];

  const detailBlocks: Record<
    ScreenKey,
    { title: string; text: string; icon: React.ReactNode }[]
  > = {
    home: [
      {
        title: "Families belong here",
        text: "This platform is designed to feel welcoming, useful, and worth returning to.",
        icon: <Users size={20} />,
      },
      {
        title: "Marketplace through GrownBy",
        text: "Customers should feel that food access is close by, not hidden.",
        icon: <Store size={20} />,
      },
      {
        title: "Living ecosystem",
        text: "Growers, youth, supervisors, guests, and producers each have a real pathway.",
        icon: <Leaf size={20} />,
      },
    ],
    story: [
      {
        title: "Family legacy",
        text: "The farm carries Bronson and Lorenzana legacy into a future-focused Youngstown vision.",
        icon: <Trees size={20} />,
      },
      {
        title: "Land restoration",
        text: "The project restores land while creating food, education, and agritourism opportunity.",
        icon: <Tractor size={20} />,
      },
      {
        title: "Community future",
        text: "This is about more than a site. It is an ecosystem for long-term return and growth.",
        icon: <CheckCircle2 size={20} />,
      },
    ],
    guest: [
      {
        title: "Clear welcome",
        text: "Guests learn what this place is, why it matters, and where they can go next.",
        icon: <UserRound size={20} />,
      },
      {
        title: "Airport relationship",
        text: "Visitors should understand the story of the FAA-approved grow areas and support for the vision.",
        icon: <Info size={20} />,
      },
      {
        title: "Return value",
        text: "Events, demonstrations, and seasonal change keep people coming back.",
        icon: <CheckCircle2 size={20} />,
      },
    ],
    customer: [
      {
        title: "Food access",
        text: "Customers should see produce, seedlings, and Bubble Babies with clarity and purpose.",
        icon: <ShoppingBasket size={20} />,
      },
      {
        title: "Recipes and nutrition",
        text: "Food guidance and healthy living support help customers return for more than shopping.",
        icon: <BookOpen size={20} />,
      },
      {
        title: "Fast route to GrownBy",
        text: "Many users will want a direct move from interest to marketplace.",
        icon: <Store size={20} />,
      },
    ],
    marketplace: [
      {
        title: "GrownBy centered",
        text: "The marketplace is a core part of the ecosystem and should feel close at hand.",
        icon: <Store size={20} />,
      },
      {
        title: "Product pathways",
        text: "Seedlings, produce, and future offerings can be surfaced with strong visual clarity.",
        icon: <Leaf size={20} />,
      },
      {
        title: "Return behavior",
        text: "This area can grow into reminders, favorites, and preorder patterns over time.",
        icon: <HeartPulse size={20} />,
      },
    ],
    grower: [
      {
        title: "Planning tools",
        text: "Growers need seasonal timing, inventory awareness, and readiness support.",
        icon: <CalendarDays size={20} />,
      },
      {
        title: "Collaboration",
        text: "The grower pathway should feel connected to a broader ecosystem, not isolated.",
        icon: <Sprout size={20} />,
      },
      {
        title: "Practical value",
        text: "This platform should be useful enough that growers want to revisit it regularly.",
        icon: <CheckCircle2 size={20} />,
      },
    ],
    valueAdded: [
      {
        title: "From product to presentation",
        text: "This pathway supports stronger local product visibility through branding and experience.",
        icon: <Briefcase size={20} />,
      },
      {
        title: "Demonstrations",
        text: "Events and market experiences can increase value and customer connection.",
        icon: <Store size={20} />,
      },
      {
        title: "Shared network",
        text: "The goal is participation in a broader ecosystem of visibility and opportunity.",
        icon: <Users size={20} />,
      },
    ],
    youth: [
      {
        title: "Living classroom",
        text: "Youth experience agriculture, STEAM, teamwork, and responsibility in real time.",
        icon: <GraduationCap size={20} />,
      },
      {
        title: "Family confidence",
        text: "Parents and partners should feel that youth are entering a structured, meaningful environment.",
        icon: <Users size={20} />,
      },
      {
        title: "Career-connected",
        text: "This pathway supports future roles in farming, media, logistics, business, and entrepreneurship.",
        icon: <CheckCircle2 size={20} />,
      },
    ],
    supervisor: [
      {
        title: "Inside youth workforce only",
        text: "Supervisor is not separate from youth workforce. It exists to support it.",
        icon: <ShieldCheck size={20} />,
      },
      {
        title: "Support resources",
        text: "This can reflect staffing, wellness, and supportive oversight for youth participants.",
        icon: <HeartPulse size={20} />,
      },
      {
        title: "Logistics and accountability",
        text: "Scheduling, check-ins, responsibilities, and day-of support belong here.",
        icon: <CheckCircle2 size={20} />,
      },
    ],
    planner: [
      {
        title: "Season status",
        text: "Warm season planning is active, with field prep, seedling movement, and event readiness underway.",
        icon: <CalendarDays size={20} />,
      },
      {
        title: "Next planting window",
        text: "Upcoming planting windows help align production timing, volunteer coordination, and grower activity.",
        icon: <Sprout size={20} />,
      },
      {
        title: "Harvest and event readiness",
        text: "The planner should help connect crops, staffing, weather, and community-facing events.",
        icon: <CloudSun size={20} />,
      },
    ],
    events: [
      {
        title: "Return engine",
        text: "Events create repeated entry into the ecosystem for learning, shopping, and connection.",
        icon: <Users size={20} />,
      },
      {
        title: "Reservations and check-in",
        text: "This space can preview RSVP and role-based arrival experiences.",
        icon: <CalendarDays size={20} />,
      },
      {
        title: "Partners and demos",
        text: "Educational and sponsor-led activities help make the farm feel alive.",
        icon: <CheckCircle2 size={20} />,
      },
    ],
    wellness: [
      {
        title: "Food and health connection",
        text: "Fresh food connects to energy, family habits, diabetes awareness, and quality of life.",
        icon: <HeartPulse size={20} />,
      },
      {
        title: "Natural vs processed",
        text: "The platform helps explain why food choices matter, especially when rising costs push families toward harmful substitutes.",
        icon: <Leaf size={20} />,
      },
      {
        title: "Practical support",
        text: "Nutrition education, recipe ideas, and healthier-at-home guidance belong here.",
        icon: <BookOpen size={20} />,
      },
    ],
  };

  return (
    <div style={styles.app}>
      <div style={styles.hero}>
        <ResilientImage
          candidates={screenCandidates[screen]}
          alt={TEXT.title[screen]}
          style={styles.bgImage}
        />
        <div style={styles.bgOverlay} />

        <div style={styles.shell}>
          <div style={styles.topbar}>
            <div>
              <div style={styles.subbrand}>{TEXT.subbrand}</div>
              <div style={styles.brand}>{TEXT.brand}</div>
            </div>

            <div style={styles.nav}>
              {[
                ["home", <Home size={16} />, "Entrance"],
                ["story", <Info size={16} />, "Our Story"],
                ["guest", <Users size={16} />, "Role pathways"],
                ["events", <CalendarDays size={16} />, "View Events"],
                ["wellness", <HeartPulse size={16} />, "Health & Nutrition"],
                ["marketplace", <Store size={16} />, "Go to Marketplace"],
              ].map(([key, icon, label]) => (
                <button
                  key={String(key)}
                  onClick={() => goto(key as ScreenKey)}
                  style={{
                    ...styles.pill,
                    ...(screen === key ? styles.activePill : {}),
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}

              <button
                onClick={() => setVoiceOn((v) => !v)}
                style={styles.pill}
              >
                <Mic size={16} />
                {voiceOn ? "Voice narration on" : "Voice narration off"}
              </button>
            </div>
          </div>

          <div style={styles.layout}>
            <div>
              <div style={styles.badge}>
                <Leaf size={16} /> {TEXT.title[screen]}
              </div>

              <h1 style={styles.title}>{TEXT.title[screen]}</h1>
              <div style={styles.body}>{TEXT.body[screen]}</div>

              <div style={styles.actions}>
                <button
                  style={styles.whiteBtn}
                  onClick={() => setTourOn((v) => !v)}
                >
                  <Play size={16} />
                  {tourOn ? "Stop Guided Tour" : "Start Guided Tour"}
                </button>

                <button
                  style={styles.ghostBtn}
                  onClick={() => goto("marketplace")}
                >
                  <Store size={16} />
                  Go to Marketplace
                </button>

                <button style={styles.ghostBtn} onClick={() => goto("planner")}>
                  <CalendarDays size={16} />
                  Open Crop Planner
                </button>
              </div>

              <div style={styles.statGrid}>
                <div style={styles.card}>
                  <div style={styles.miniLabel}>Seasonal conditions</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    <CloudSun size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    Warm season planning active
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                    Field prep, seedling movement, event readiness, and seasonal coordination are active.
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.miniLabel}>Farm calendar</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    <CalendarDays size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    Living schedule
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                    Seedlings, events, education, youth activities, and harvest pathways connect here.
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.miniLabel}>Choose language</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                    <Languages size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    {language === "en"
                      ? "English"
                      : language === "es"
                      ? "Español"
                      : language === "tl"
                      ? "Tagalog"
                      : language === "it"
                      ? "Italiano"
                      : language === "patwa"
                      ? "Patwa"
                      : "Hebrew"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(["en", "es", "tl", "it", "patwa", "he"] as LanguageKey[]).map(
                      (lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          style={{
                            ...styles.pill,
                            padding: "8px 12px",
                            fontSize: 13,
                            ...(language === lang ? styles.activePill : {}),
                          }}
                        >
                          {lang === "en"
                            ? "English"
                            : lang === "es"
                            ? "Español"
                            : lang === "tl"
                            ? "Tagalog"
                            : lang === "it"
                            ? "Italiano"
                            : lang === "patwa"
                            ? "Patwa"
                            : "Hebrew"}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sideCard}>
              <div style={styles.miniLabel}>A place people want to return to</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                Living ecosystem overview
              </div>
              <div
                style={{
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 18,
                }}
              >
                This is more than a website. It is a farm-centered experience designed
                to help guests, customers, growers, youth, partners, and families find
                resources, food, learning, and a clear path forward.
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {detailBlocks[screen].map((item) => (
                  <div key={item.title} style={styles.infoBox}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {item.icon}
                      {item.title}
                    </div>
                    <div style={{ lineHeight: 1.65, color: "rgba(255,255,255,0.84)" }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {screen === "home" && (
            <div style={styles.section}>
              <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>
                Role pathways
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.7,
                  maxWidth: 900,
                  marginBottom: 18,
                }}
              >
                Each role should feel welcomed, informed, and able to move forward.
                These pathways are built to create return visits, not one-time clicks.
              </div>

              <div style={styles.roleGrid}>
                {roleTiles.map((role) => (
                  <button
                    key={role.title}
                    onClick={() => goto(role.key)}
                    style={styles.roleTile}
                  >
                    <ResilientImage
                      candidates={role.image}
                      alt={role.title}
                      style={styles.roleImage}
                    />
                    <div style={styles.roleOverlay} />
                    <div style={styles.roleContent}>
                      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                        {role.title}
                      </div>
                      <div
                        style={{
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.9)",
                          marginBottom: 12,
                        }}
                      >
                        {role.text}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {role.next.map((item) => (
                          <span
                            key={item}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "7px 11px",
                              borderRadius: 999,
                              background: "rgba(255,255,255,0.14)",
                              border: "1px solid rgba(255,255,255,0.16)",
                              fontSize: 12,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen !== "home" && (
            <div style={styles.section}>
              <div style={styles.twoCol}>
                <div style={styles.sideCard}>
                  <div style={styles.miniLabel}>Pathway details</div>
                  <div style={styles.detailGrid}>
                    {detailBlocks[screen].map((item) => (
                      <div key={item.title} style={styles.infoBox}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: 8,
                          }}
                        >
                          {item.icon}
                          {item.title}
                        </div>
                        <div style={{ lineHeight: 1.65, color: "rgba(255,255,255,0.84)" }}>
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.sideCard}>
                  <div style={styles.miniLabel}>Next strongest moves</div>
                  <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                    {screen === "guest" && (
                      <>
                        <button style={styles.ghostBtn} onClick={() => goto("story")}>Story</button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>Events</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(CANDIDATES.community)}>
                          Open Gallery
                        </button>
                      </>
                    )}

                    {screen === "customer" && (
                      <>
                        <button
                          style={{ ...styles.whiteBtn, justifyContent: "center" }}
                          onClick={() => goto("marketplace")}
                        >
                          Go to Marketplace
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          Recipes & Nutrition
                        </button>
                        <div style={styles.infoBox}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            Customer path priority
                          </div>
                          <div style={{ lineHeight: 1.65, color: "rgba(255,255,255,0.84)" }}>
                            This pathway is designed to move people quickly toward GrownBy,
                            then bring them back for food education, healthier choices, and return visits.
                          </div>
                        </div>
                      </>
                    )}

                    {screen === "marketplace" && (
                      <>
                        <a
                          href="https://grownby.com/farms/bronson-family-farm/shop"
                          target="_blank"
                          rel="noreferrer"
                          style={{ ...styles.whiteBtn, justifyContent: "center" }}
                        >
                          Open GrownBy Store
                        </a>
                        <button style={styles.ghostBtn} onClick={() => goto("customer")}>
                          Back to Customer Path
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          Food Guidance
                        </button>
                      </>
                    )}

                    {screen === "grower" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("planner")}>
                          Open Crop Planner
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>
                          Seasonal Events
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.training)}
                        >
                          Coordination View
                        </button>
                      </>
                    )}

                    {screen === "valueAdded" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("events")}>
                          Demonstrations
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          Market Access
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.produce)}
                        >
                          Product Presentation
                        </button>
                      </>
                    )}

                    {screen === "youth" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("supervisor")}>
                          Supervisor Support
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("planner")}>
                          Learning Schedule
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.training)}
                        >
                          STEAM & Training
                        </button>
                      </>
                    )}

                    {screen === "supervisor" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("youth")}>
                          Back to Youth Workforce
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("planner")}>
                          Scheduling
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          Support Resources
                        </button>
                      </>
                    )}

                    {screen === "story" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("guest")}>
                          Enter as Guest
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>
                          Community Experiences
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.legacy)}
                        >
                          Legacy View
                        </button>
                      </>
                    )}

                    {screen === "planner" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("grower")}>
                          Grower Path
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>
                          Event Readiness
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          Inventory to Market
                        </button>
                      </>
                    )}

                    {screen === "events" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("guest")}>
                          Guest Experiences
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          Vendor & Market Flow
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          Health Education
                        </button>
                      </>
                    )}

                    {screen === "wellness" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("customer")}>
                          Customer Food Path
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          Shop Fresh Food
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.nutrition)}
                        >
                          Nutrition View
                        </button>
                      </>
                    )}
                  </div>

                  <div style={styles.miniLabel}>Image gallery</div>
                  <div style={{ marginBottom: 14, color: "rgba(255,255,255,0.82)" }}>
                    Using the available farm photos and fallbacks.
                  </div>
                  <div style={styles.galleryGrid}>
                    {gallery.map((item, idx) => (
                      <button
                        key={idx}
                        style={styles.galleryItem}
                        onClick={() => setImageModal(item)}
                      >
                        <ResilientImage
                          candidates={item}
                          alt={`Farm ${idx + 1}`}
                          style={styles.galleryImage}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={styles.section}>
            <div style={styles.sideCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={styles.miniLabel}>Explore modules</div>
                  <div style={{ fontSize: 28, fontWeight: 800 }}>
                    Designed to feel like a living destination
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={styles.ghostBtn} onClick={prevScreen}>
                    <ArrowLeft size={16} />
                    Previous
                  </button>
                  <button style={styles.ghostBtn} onClick={() => goto("home")}>
                    <Home size={16} />
                    Back to entrance
                  </button>
                  <button style={styles.whiteBtn} onClick={nextScreen}>
                    <ArrowRight size={16} />
                    Next
                  </button>
                </div>
              </div>

              <div style={styles.footerModuleGrid}>
                {[
                  "Marketplace through GrownBy",
                  "Events and reservation pathways",
                  "Crop planning and seasonal guidance",
                  "Youth workforce and supervisor support",
                  "Nutrition, recipes, and wellness education",
                  "Family legacy, agritourism, and community partnerships",
                ].map((item) => (
                  <div key={item} style={styles.moduleBox}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageModal && (
        <div style={styles.modal}>
          <button style={styles.closeBtn} onClick={() => setImageModal(null)}>
            <X size={20} />
          </button>
          <ResilientImage
            candidates={imageModal}
            alt="Expanded farm view"
            style={styles.modalImage}
          />
        </div>
      )}
    </div>
  );
}
