import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CloudSun,
  Globe,
  Leaf,
  MapPin,
  Mic,
  Play,
  ShoppingBasket,
  Sprout,
  Store,
  Users,
  UserRound,
  Trees,
  HeartPulse,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Tractor,
  BookOpen,
  BadgeCheck,
  CheckCircle2,
  Languages,
  Home,
  Info,
  X,
} from "lucide-react";

const IMAGES = {
  entrance: "/SAM_0220.JPG",
  story: "/SAM_0221.JPG",
  guest: "/SAM_0222.JPG",
  customer: "/SAM_0223.JPG",
  marketplace: "/SAM_0225.JPG",
  grower: "/SAM_0237.JPG",
  valueAdded: "/SAM_0238.JPG",
  youth: "/SAM_0249.JPG",
  supervisor: "/SAM_0266.JPG",
  community: "/SAM_0274.JPG",
  education: "/SAM_0275.JPG",
  wellness: "/SAM_0281.JPG",
  events: "/SAM_0282.JPG",
  planning: "/SAM_0286.JPG",
  weather: "/SAM_0288.JPG",
  family: "/SAM_0289.JPG",
  logistics: "/SAM_0290.JPG",
  airport: "/SAM_0291.JPG",
  produce: "/SAM_0293.JPG",
  volunteers: "/SAM_0305.JPG",
  training: "/SAM_0307.JPG",
  recipes: "/SAM_0309.JPG",
  nutrition: "/SAM_0310.JPG",
  future: "/SAM_0311.JPG",
  legacy: "/SAM_0313.JPG",
  // Keep only ONE grow area image if you still want it anywhere:
  growArea: "/GrowArea.jpg",
};

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";
type RoleKey = "guest" | "customer" | "grower" | "valueAdded" | "youth" | "supervisor";
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

type ScreenConfig = {
  key: ScreenKey;
  title: string;
  subtitle: string;
  image: string;
  overlay?: string;
};

const LANGUAGES: Record<LanguageKey, { label: string; voiceName: string }> = {
  en: { label: "English", voiceName: "English Demo Voice" },
  es: { label: "Español", voiceName: "Voz en Español" },
  tl: { label: "Tagalog", voiceName: "Boses Tagalog" },
  it: { label: "Italiano", voiceName: "Voce Italiana" },
  patwa: { label: "Patwa", voiceName: "Patwa Guide" },
  he: { label: "Hebrew", voiceName: "Hebrew Guide" },
};

const TRANSLATIONS: Record<LanguageKey, any> = {
  en: {
    brand: "Bronson Family Farm",
    subbrand: "Farm & Family Alliance Ecosystem Demo",
    tagline: "Step into a living farm ecosystem built for families, growers, learners, partners, and future generations.",
    introTitle: "A place people want to return to",
    introBody:
      "This is more than a website. It is a guided farm experience designed to help each visitor find resources, relationships, opportunities, produce, education, and a clear path forward.",
    enterDemo: "Enter Live Demo",
    guidedTour: "Start Guided Tour",
    stopTour: "Stop Tour",
    chooseLanguage: "Choose language",
    rolePathways: "Role pathways",
    exploreModules: "Explore modules",
    backHome: "Back to entrance",
    next: "Next",
    previous: "Previous",
    marketplaceBtn: "Go to Marketplace",
    plannerBtn: "Open Crop Planner",
    eventsBtn: "View Events",
    wellnessBtn: "Health & Nutrition",
    storyBtn: "Our Story",
    voiceOn: "Voice narration on",
    voiceOff: "Voice narration off",
    weatherLabel: "Seasonal conditions",
    weatherValue: "Warm season planning active",
    calendarLabel: "Farm calendar",
    calendarValue: "Seedlings, events, education, and harvest pathways",
    welcomeCards: [
      {
        title: "Families belong here",
        text: "Guests discover the farm story, the land, the airport history, events, and community experiences.",
      },
      {
        title: "Customers find food and guidance",
        text: "Customers can move quickly to the marketplace, see produce and seedling offerings, and return for recipes, nutrition, and wellness support.",
      },
      {
        title: "Growers and producers find tools",
        text: "Growers access planning, training, collaboration, and the ecosystem needed to keep growing.",
      },
    ],
    modules: [
      "Marketplace through GrownBy",
      "Events and reservation pathways",
      "Crop planning and seasonal guidance",
      "Youth workforce and supervisor support",
      "Nutrition, recipes, and wellness education",
      "Family legacy, agritourism, and community partnerships",
    ],
    screens: {
      home: {
        title: "Welcome to the ecosystem",
        subtitle:
          "A regenerative farm, agritourism destination, and community platform rooted in land, family legacy, and practical access to resources.",
      },
      story: {
        title: "The story behind the farm",
        subtitle:
          "Inspired by family farming traditions, strengthened through Bronson and Lorenzana legacy, and shaped for Youngstown’s future.",
      },
      guest: {
        title: "Guest pathway",
        subtitle:
          "Guests can discover the farm, the land, the mission, the airport story, available events, and the reasons this place matters.",
      },
      customer: {
        title: "Customer pathway",
        subtitle:
          "Customers can shop seedlings and produce, learn about food quality, access recipes, and connect food choices to wellness.",
      },
      marketplace: {
        title: "Marketplace pathway",
        subtitle:
          "The marketplace centers GrownBy so people can move from learning to purchasing without losing the ecosystem experience.",
      },
      grower: {
        title: "Grower pathway",
        subtitle:
          "Growers return for crop planning, seasonal timing, production support, and connections to a broader grower ecosystem.",
      },
      valueAdded: {
        title: "Value-added producer pathway",
        subtitle:
          "Producers can explore packaging, branding, preparation, events, and the pathway from raw product to meaningful local commerce.",
      },
      youth: {
        title: "Youth workforce pathway",
        subtitle:
          "Young people experience agriculture, STEAM, entrepreneurship, responsibility, and career-connected learning in one place.",
      },
      supervisor: {
        title: "Supervisor pathway",
        subtitle:
          "Supervisors support youth workforce operations with role-based guidance, logistics, check-ins, wellness support, and accountability.",
      },
      planner: {
        title: "Crop planning center",
        subtitle:
          "The planning hub helps connect seasons, inventory, grower coordination, and event readiness across the ecosystem.",
      },
      events: {
        title: "Events and community experiences",
        subtitle:
          "From growers supply days to farm visits, demonstrations, education, and family experiences, events bring people back again and again.",
      },
      wellness: {
        title: "Health, nutrition, and food education",
        subtitle:
          "The ecosystem connects fresh food access with practical guidance on diet, movement, diabetes awareness, and healthier choices.",
      },
    },
    roleCards: {
      guest: {
        title: "Guest",
        text: "Discover the farm, the story, the land, the airport legacy, community events, and where to start.",
      },
      customer: {
        title: "Customer",
        text: "Shop through GrownBy, track interests, learn what is available, and return for recipes and nutrition support.",
      },
      grower: {
        title: "Grower",
        text: "Access planning, seasonal guidance, training, coordination, and collaborative opportunities.",
      },
      valueAdded: {
        title: "Value-Added Producer",
        text: "See how products, education, packaging, and local market opportunities can work together.",
      },
      youth: {
        title: "Youth Workforce",
        text: "Learn farming, teamwork, STEAM, responsibility, and entrepreneurship through guided participation.",
      },
      supervisor: {
        title: "Supervisor",
        text: "Support youth pathways with scheduling, check-in, oversight, wellness support, and staff resources.",
      },
    },
    narration: {
      home:
        "Welcome to Bronson Family Farm. This experience is designed to feel alive, useful, and welcoming. Every role has a purpose here, and every pathway leads somewhere meaningful.",
      story:
        "Bronson Family Farm carries family history, farming heritage, and a commitment to restoring land while serving people. This is where legacy becomes future infrastructure.",
      guest:
        "The guest pathway helps visitors understand the place. They can explore the farm story, the FAA approved grow areas, the airport association relationship, events, and community opportunities.",
      customer:
        "The customer pathway moves people quickly toward food, seedlings, marketplace access, nutrition education, recipe ideas, and better understanding of natural food compared with processed food.",
      marketplace:
        "The marketplace is centered on GrownBy. Customers should always feel that shopping is close at hand, while still being connected to the larger story and resources of the ecosystem.",
      grower:
        "The grower pathway is designed for return visits. It includes planning, crop timing, collaboration, seasonal readiness, and the practical structure growers need to keep moving.",
      valueAdded:
        "The value-added producer pathway shows how local products can become stronger through branding, packaging, demonstrations, market access, and shared visibility.",
      youth:
        "The youth workforce pathway turns the farm into a living learning environment. Young people encounter agriculture, entrepreneurship, technology, and teamwork in one connected experience.",
      supervisor:
        "The supervisor pathway exists inside youth workforce. It supports staffing, accountability, emotional support resources, logistics, and clear role based guidance.",
      planner:
        "The crop planning center connects the seasons to real decisions. This is where the ecosystem becomes practical, coordinated, and ready for production and events.",
      events:
        "Events are not an extra feature. They are part of how the ecosystem welcomes new people, deepens relationships, and gives the community reasons to return.",
      wellness:
        "Health and nutrition are woven into this platform. The goal is not only to sell food, but to help people understand why better food choices matter.",
    },
  },
  es: {
    ...({} as any),
  },
  tl: {
    ...({} as any),
  },
  it: {
    ...({} as any),
  },
  patwa: {
    ...({} as any),
  },
  he: {
    ...({} as any),
  },
};

// Fill non-English labels by reusing English UI while keeping language switching functional.
for (const key of ["es", "tl", "it", "patwa", "he"] as LanguageKey[]) {
  TRANSLATIONS[key] = {
    ...TRANSLATIONS.en,
    chooseLanguage: `${TRANSLATIONS.en.chooseLanguage}`,
    narration: TRANSLATIONS.en.narration,
  };
}

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

const SCREEN_CONFIG: Record<ScreenKey, ScreenConfig> = {
  home: {
    key: "home",
    title: "Welcome",
    subtitle: "Start here",
    image: IMAGES.entrance,
    overlay: "from-black/70 via-black/35 to-emerald-950/80",
  },
  story: {
    key: "story",
    title: "Story",
    subtitle: "Legacy and land",
    image: IMAGES.story,
    overlay: "from-black/70 via-zinc-900/20 to-stone-950/80",
  },
  guest: {
    key: "guest",
    title: "Guest",
    subtitle: "Discover the place",
    image: IMAGES.guest,
    overlay: "from-black/75 via-emerald-950/20 to-black/75",
  },
  customer: {
    key: "customer",
    title: "Customer",
    subtitle: "Food and guidance",
    image: IMAGES.customer,
    overlay: "from-black/75 via-green-900/20 to-black/80",
  },
  marketplace: {
    key: "marketplace",
    title: "Marketplace",
    subtitle: "GrownBy centered",
    image: IMAGES.marketplace,
    overlay: "from-black/75 via-lime-900/20 to-black/80",
  },
  grower: {
    key: "grower",
    title: "Grower",
    subtitle: "Planning and production",
    image: IMAGES.grower,
    overlay: "from-black/75 via-emerald-900/20 to-black/80",
  },
  valueAdded: {
    key: "valueAdded",
    title: "Value-Added",
    subtitle: "Products and branding",
    image: IMAGES.valueAdded,
    overlay: "from-black/75 via-amber-900/15 to-black/80",
  },
  youth: {
    key: "youth",
    title: "Youth Workforce",
    subtitle: "Learning by doing",
    image: IMAGES.youth,
    overlay: "from-black/75 via-sky-900/20 to-black/80",
  },
  supervisor: {
    key: "supervisor",
    title: "Supervisor",
    subtitle: "Support inside youth workforce",
    image: IMAGES.supervisor,
    overlay: "from-black/75 via-violet-900/20 to-black/80",
  },
  planner: {
    key: "planner",
    title: "Planner",
    subtitle: "Calendar and crops",
    image: IMAGES.planning,
    overlay: "from-black/75 via-teal-900/20 to-black/80",
  },
  events: {
    key: "events",
    title: "Events",
    subtitle: "Come back again and again",
    image: IMAGES.events,
    overlay: "from-black/75 via-orange-900/20 to-black/80",
  },
  wellness: {
    key: "wellness",
    title: "Wellness",
    subtitle: "Nutrition and better choices",
    image: IMAGES.wellness,
    overlay: "from-black/75 via-rose-900/10 to-black/80",
  },
};

function useSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== "undefined" ? window.speechSynthesis : null);

  const stop = () => {
    synthRef.current?.cancel();
  };

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
    utter.lang = map[lang] || "en-US";
    utter.rate = 0.95;
    utter.pitch = 1;
    synthRef.current?.cancel();
    synthRef.current?.speak(utter);
  };

  return { speak, stop };
}

function SectionButton({ icon, label, onClick, active = false }: { icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-white/40 bg-white/20 text-white"
          : "border-white/15 bg-black/30 text-white/90 hover:border-white/30 hover:bg-white/10"
      }`}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function InfoCard({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/80">{text}</p>
    </div>
  );
}

function RoleTile({ title, text, image, onClick }: { title: string; text: string; image: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative min-h-[250px] overflow-hidden rounded-[28px] border border-white/15 bg-white/10 text-left shadow-2xl transition hover:-translate-y-1 hover:border-white/30"
    >
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/85">{text}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/90">
          <span>Open pathway</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
}

function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [tourOn, setTourOn] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const { speak, stop } = useSpeech();
  const t = TRANSLATIONS[language];

  const currentIndex = SCREEN_ORDER.indexOf(screen);
  const currentScreen = SCREEN_CONFIG[screen];

  const gallery = useMemo(
    () => [
      IMAGES.community,
      IMAGES.education,
      IMAGES.nutrition,
      IMAGES.recipes,
      IMAGES.volunteers,
      IMAGES.training,
      IMAGES.produce,
      IMAGES.family,
      IMAGES.airport,
      IMAGES.future,
      IMAGES.legacy,
      IMAGES.logistics,
    ],
    []
  );

  useEffect(() => {
    if (!voiceOn) {
      stop();
      return;
    }
    const text = t.narration[screen];
    if (text) speak(text, language);
    return () => stop();
  }, [screen, language, voiceOn]);

  useEffect(() => {
    if (!tourOn) return;
    const id = setInterval(() => {
      setScreen((prev) => {
        const i = SCREEN_ORDER.indexOf(prev);
        const next = SCREEN_ORDER[(i + 1) % SCREEN_ORDER.length];
        return next;
      });
    }, 9000);
    return () => clearInterval(id);
  }, [tourOn]);

  const goto = (next: ScreenKey) => {
    setTourOn(false);
    setScreen(next);
    setMenuOpen(false);
  };

  const nextScreen = () => goto(SCREEN_ORDER[(currentIndex + 1) % SCREEN_ORDER.length]);
  const prevScreen = () => goto(SCREEN_ORDER[(currentIndex - 1 + SCREEN_ORDER.length) % SCREEN_ORDER.length]);

  const roleCards = [
    { key: "guest" as RoleKey, image: IMAGES.guest, icon: <UserRound className="h-5 w-5" /> },
    { key: "customer" as RoleKey, image: IMAGES.customer, icon: <ShoppingBasket className="h-5 w-5" /> },
    { key: "grower" as RoleKey, image: IMAGES.grower, icon: <Sprout className="h-5 w-5" /> },
    { key: "valueAdded" as RoleKey, image: IMAGES.valueAdded, icon: <Store className="h-5 w-5" /> },
    { key: "youth" as RoleKey, image: IMAGES.youth, icon: <GraduationCap className="h-5 w-5" /> },
    { key: "supervisor" as RoleKey, image: IMAGES.supervisor, icon: <ShieldCheck className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#09130f] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <img src={currentScreen.image} alt={currentScreen.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${currentScreen.overlay || "from-black/70 via-black/30 to-black/80"}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,255,176,0.15),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_18%)]" />

        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 md:px-8">
          <button onClick={() => goto("home")} className="text-left">
            <div className="text-xs uppercase tracking-[0.35em] text-white/60">{t.subbrand}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{t.brand}</div>
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            <SectionButton icon={<Home className="h-4 w-4" />} label="Entrance" onClick={() => goto("home")} active={screen === "home"} />
            <SectionButton icon={<Info className="h-4 w-4" />} label={t.storyBtn} onClick={() => goto("story")} active={screen === "story"} />
            <SectionButton icon={<Users className="h-4 w-4" />} label={t.rolePathways} onClick={() => goto("guest")} active={["guest", "customer", "grower", "valueAdded", "youth", "supervisor"].includes(screen)} />
            <SectionButton icon={<CalendarDays className="h-4 w-4" />} label={t.eventsBtn} onClick={() => goto("events")} active={screen === "events"} />
            <SectionButton icon={<HeartPulse className="h-4 w-4" />} label={t.wellnessBtn} onClick={() => goto("wellness")} active={screen === "wellness"} />
            <SectionButton icon={<Store className="h-4 w-4" />} label={t.marketplaceBtn} onClick={() => goto("marketplace")} active={screen === "marketplace"} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceOn((v) => !v)}
              className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              <span className="inline-flex items-center gap-2"><Mic className="h-4 w-4" /> {voiceOn ? t.voiceOn : t.voiceOff}</span>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-sm text-white/90 hover:bg-white/10 lg:hidden"
            >
              Menu
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="relative z-30 mx-4 rounded-3xl border border-white/15 bg-black/70 p-4 backdrop-blur-xl md:mx-8 lg:hidden">
            <div className="grid gap-2 sm:grid-cols-2">
              {SCREEN_ORDER.map((item) => (
                <button
                  key={item}
                  onClick={() => goto(item)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/85 hover:bg-white/10"
                >
                  {t.screens[item].title}
                </button>
              ))}
            </div>
          </div>
        )}

        <main className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-8 md:px-8 md:pt-14">
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/75 backdrop-blur-md">
                <Leaf className="h-4 w-4" />
                {t.screens[screen].title}
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                {t.screens[screen].title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/85 md:text-lg md:leading-8">
                {t.screens[screen].subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setTourOn(true);
                    goto(screen);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0c1a14] shadow-xl transition hover:scale-[1.02]"
                >
                  <Play className="h-4 w-4" /> {tourOn ? t.stopTour : t.guidedTour}
                </button>
                <button
                  onClick={() => goto("marketplace")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 py-3 text-sm font-medium text-white/95 hover:bg-white/10"
                >
                  <Store className="h-4 w-4" /> {t.marketplaceBtn}
                </button>
                <button
                  onClick={() => goto("planner")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-5 py-3 text-sm font-medium text-white/95 hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" /> {t.plannerBtn}
                </button>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <InfoCard title={t.weatherLabel} text={t.weatherValue} icon={<CloudSun className="h-5 w-5" />} />
                <InfoCard title={t.calendarLabel} text={t.calendarValue} icon={<CalendarDays className="h-5 w-5" />} />
                <InfoCard
                  title={t.chooseLanguage}
                  text={LANGUAGES[language].label}
                  icon={<Languages className="h-5 w-5" />}
                />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-white/55">{t.chooseLanguage}</div>
                  <div className="mt-1 text-lg font-semibold text-white">{LANGUAGES[language].label}</div>
                </div>
                <Globe className="h-5 w-5 text-white/80" />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(Object.keys(LANGUAGES) as LanguageKey[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-2xl border px-3 py-3 text-sm transition ${
                      language === lang
                        ? "border-white/40 bg-white/20 text-white"
                        : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {LANGUAGES[lang].label}
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[28px] border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">{t.introTitle}</div>
                <p className="mt-3 text-sm leading-7 text-white/85">{t.introBody}</p>
              </div>

              <div className="mt-5 grid gap-3">
                {t.welcomeCards.map((card: any) => (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-base font-semibold text-white">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-white/80">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {screen === "home" && (
            <section className="mt-12">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white md:text-3xl">{t.rolePathways}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                    Each role should feel welcomed, informed, and able to move forward. These pathways are designed to create return visits, not one-time clicks.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {roleCards.map((role) => (
                  <RoleTile
                    key={role.key}
                    title={t.roleCards[role.key].title}
                    text={t.roleCards[role.key].text}
                    image={role.image}
                    onClick={() => goto(role.key as ScreenKey)}
                  />
                ))}
              </div>
            </section>
          )}

          {(screen === "guest" ||
            screen === "customer" ||
            screen === "marketplace" ||
            screen === "grower" ||
            screen === "valueAdded" ||
            screen === "youth" ||
            screen === "supervisor" ||
            screen === "story" ||
            screen === "planner" ||
            screen === "events" ||
            screen === "wellness") && (
            <section className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[30px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/55">Pathway details</div>

                {screen === "story" && (
                  <div className="grid gap-4">
                    <InfoCard title="Family legacy" text="The farm honors the Bronson and Lorenzana family legacies while building a future-facing food and agritourism platform in Youngstown." icon={<Trees className="h-5 w-5" />} />
                    <InfoCard title="Land transformation" text="The grow areas are part of a wider restoration effort supported by vision, planning, community relationships, and FAA-approved use areas connected to the airport context." icon={<Tractor className="h-5 w-5" />} />
                    <InfoCard title="Why this matters" text="The demo should help people understand that this is about food access, land use, wellness, workforce development, and legacy — all at once." icon={<BadgeCheck className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "guest" && (
                  <div className="grid gap-4">
                    <InfoCard title="Clear welcome" text="Guests need a graceful entrance into the ecosystem: what this place is, what is here, why it matters, and where they can go next." icon={<Users className="h-5 w-5" />} />
                    <InfoCard title="Airport and land story" text="The farm exists within a larger airport and land-use story. Visitors should understand the transformation of approved grow areas and the support behind that vision." icon={<MapPin className="h-5 w-5" />} />
                    <InfoCard title="Reasons to return" text="Events, demonstrations, tours, seasonal changes, and educational resources give guests reasons to return repeatedly." icon={<CheckCircle2 className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "customer" && (
                  <div className="grid gap-4">
                    <InfoCard title="Food access" text="Customers should see seedlings, produce, Bubble Babies, and pathways into healthier living — not just product listings." icon={<ShoppingBasket className="h-5 w-5" />} />
                    <InfoCard title="Nutrition and recipes" text="Customers should be able to return for recipes, nutrition education, food comparison guidance, and practical support for healthier choices." icon={<BookOpen className="h-5 w-5" />} />
                    <InfoCard title="Fast route to GrownBy" text="The marketplace should always feel close by, because many customers will want to move quickly from interest to purchase." icon={<Store className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "marketplace" && (
                  <div className="grid gap-4">
                    <InfoCard title="GrownBy centered" text="This section should clearly communicate that the marketplace runs through GrownBy and should feel like a natural next step from the rest of the ecosystem." icon={<Store className="h-5 w-5" />} />
                    <InfoCard title="Purchase pathways" text="Seedlings, produce, and future offerings can all be introduced here while maintaining the farm’s brand and educational tone." icon={<Leaf className="h-5 w-5" />} />
                    <InfoCard title="Customer memory" text="Over time, this area can support repeat customers through favorite items, reminders, preorder pathways, and return behavior." icon={<HeartPulse className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "grower" && (
                  <div className="grid gap-4">
                    <InfoCard title="Planning tools" text="Growers need seasonal timing, production readiness, inventory thinking, and visibility into how the ecosystem fits together." icon={<CalendarDays className="h-5 w-5" />} />
                    <InfoCard title="Ecosystem support" text="This pathway should feel collaborative, not isolated. It should invite growers back for tools, insights, and coordination." icon={<Sprout className="h-5 w-5" />} />
                    <InfoCard title="Practical return value" text="The point is to make this platform useful enough that growers want to revisit it often." icon={<BadgeCheck className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "valueAdded" && (
                  <div className="grid gap-4">
                    <InfoCard title="From product to presentation" text="This pathway helps people imagine how food and farm-based products become local offerings with stronger branding and visibility." icon={<Briefcase className="h-5 w-5" />} />
                    <InfoCard title="Events and demonstrations" text="Demonstrations, market experiences, and visual merchandising create stronger value for producers and buyers." icon={<Store className="h-5 w-5" />} />
                    <InfoCard title="Shared ecosystem" text="This is about being part of a larger network, not standing alone." icon={<Users className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "youth" && (
                  <div className="grid gap-4">
                    <InfoCard title="Living classroom" text="Youth workforce should feel real and active, connecting agriculture, STEAM, teamwork, responsibility, and job readiness." icon={<GraduationCap className="h-5 w-5" />} />
                    <InfoCard title="Parent and program confidence" text="The pathway should reassure families and partners that youth are entering a structured, meaningful, and supported environment." icon={<Users className="h-5 w-5" />} />
                    <InfoCard title="Career-connected learning" text="This section supports future career pathways in farming, business, culinary work, logistics, media, and entrepreneurship." icon={<BadgeCheck className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "supervisor" && (
                  <div className="grid gap-4">
                    <InfoCard title="Inside youth workforce only" text="Supervisor is not a separate public-facing track. It exists within youth workforce and supports management, safety, staffing, and guidance." icon={<ShieldCheck className="h-5 w-5" />} />
                    <InfoCard title="Support resources" text="This pathway can reflect staff support resources, including wellness and support staffing tied to the youth program." icon={<HeartPulse className="h-5 w-5" />} />
                    <InfoCard title="Logistics and accountability" text="Check-ins, scheduling, attendance, responsibilities, and day-of support all belong here." icon={<CheckCircle2 className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "planner" && (
                  <div className="grid gap-4">
                    <InfoCard title="Seasonal crop planning" text="This is where users can imagine crop planning, seed timing, events, inventory readiness, and production support working together." icon={<CalendarDays className="h-5 w-5" />} />
                    <InfoCard title="Weather-aware thinking" text="Weather and seasonality matter because farming decisions are grounded in time, timing, and conditions." icon={<CloudSun className="h-5 w-5" />} />
                    <InfoCard title="Operational readiness" text="The planner helps the ecosystem feel practical and real, not decorative." icon={<BadgeCheck className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "events" && (
                  <div className="grid gap-4">
                    <InfoCard title="Community return engine" text="Events create regular reasons for people to re-enter the ecosystem, whether for learning, shopping, wellness, or fellowship." icon={<Users className="h-5 w-5" />} />
                    <InfoCard title="Reservations and check-in" text="This area can preview RSVP logic, role-based experiences, and organized arrival pathways for farm events." icon={<CalendarDays className="h-5 w-5" />} />
                    <InfoCard title="Demonstrations and partners" text="Educational and sponsor-led activities help make the farm feel alive and useful." icon={<BadgeCheck className="h-5 w-5" />} />
                  </div>
                )}

                {screen === "wellness" && (
                  <div className="grid gap-4">
                    <InfoCard title="Food and health connection" text="Fresh food is part of a larger conversation about health, energy, diabetes awareness, family habits, and quality of life." icon={<HeartPulse className="h-5 w-5" />} />
                    <InfoCard title="Natural versus processed" text="This section helps explain why food choices matter and why rising food costs push families toward harmful substitutes." icon={<Leaf className="h-5 w-5" />} />
                    <InfoCard title="Practical support" text="Nutrition education, healthier-at-home ideas, and simple recipe guidance should all feel close and usable." icon={<BookOpen className="h-5 w-5" />} />
                  </div>
                )}
              </div>

              <div className="rounded-[30px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/55">Image gallery</div>
                  <div className="text-sm text-white/70">Using the other farm images</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      onClick={() => setImageModal(img)}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20"
                    >
                      <img src={img} alt={`Farm gallery ${idx + 1}`} className="h-36 w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="mt-12 rounded-[32px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/55">{t.exploreModules}</div>
                <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Designed to feel like a living destination</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={prevScreen} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-3 text-sm text-white/90 hover:bg-white/10"><ArrowLeft className="h-4 w-4" /> {t.previous}</button>
                <button onClick={() => goto("home")} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-3 text-sm text-white/90 hover:bg-white/10"><Home className="h-4 w-4" /> {t.backHome}</button>
                <button onClick={nextScreen} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0c1a14]"><ArrowRight className="h-4 w-4" /> {t.next}</button>
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {t.modules.map((item: string) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {imageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <button onClick={() => setImageModal(null)} className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/30 p-2 text-white"><X className="h-5 w-5" /></button>
          <img src={imageModal} alt="Expanded farm view" className="max-h-[90vh] max-w-[95vw] rounded-3xl border border-white/10 shadow-2xl" />
        </div>
      )}
    </div>
  );
}

export default App;
