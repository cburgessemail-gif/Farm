import React, { useMemo, useState } from "react";

type Screen =
  | "home"
  | "story"
  | "roles"
  | "events"
  | "nutrition"
  | "marketplace"
  | "supervisor"
  | "parent"
  | "launch";

type Language =
  | "English"
  | "Español"
  | "Tagalog"
  | "Italiano"
  | "Patwa"
  | "Hebrew";

type PathwayKey =
  | "guest"
  | "customer"
  | "youth"
  | "grower"
  | "marketplace"
  | "partner"
  | "supervisor"
  | "parent";

type JourneyStage = {
  stage: string;
  purpose: string;
  action: string;
  outcome: string;
};

type Pathway = {
  label: string;
  title: string;
  subtitle: string;
  need: string;
  experience: string[];
  rhythm: string[];
  journey: JourneyStage[];
  foodFlow?: string[];
  live: string[];
  decisions: string[];
  next: PathwayKey[];
  reflection: string;
  image: string;
  imageAlt: string;
};

type SupervisorMetric = {
  label: string;
  value: string;
  note: string;
};

const translations: Record<Language, Record<string, string>> = {
  English: {
    demo: "Farm & Family Alliance Ecosystem Demo",
    farm: "Bronson Family Farm",
    tagline: "Connected Food Ecosystem Experience",
    start: "Start Guided Tour",
    marketplace: "Go to Marketplace",
    pathways: "Open Role Pathways",
    narration: "Voice narration on",
    story: "The story behind the farm",
    overview: "Living ecosystem overview",
    chooseLanguage: "Choose language",
    rolePathways: "Role Pathways",
    entrance: "Entrance",
    ourStory: "Our Story",
    events: "View Events",
    nutrition: "Health & Nutrition",
    supervisor: "Supervisor Tools",
    parent: "Parent Portal",
    launch: "Launch Readiness",
  },
  Español: {
    demo: "Demostración del Ecosistema Farm & Family Alliance",
    farm: "Bronson Family Farm",
    tagline: "Experiencia de ecosistema alimentario conectado",
    start: "Iniciar recorrido guiado",
    marketplace: "Ir al mercado",
    pathways: "Abrir caminos de roles",
    narration: "Narración de voz activada",
    story: "La historia detrás de la granja",
    overview: "Resumen del ecosistema vivo",
    chooseLanguage: "Elegir idioma",
    rolePathways: "Caminos de roles",
    entrance: "Entrada",
    ourStory: "Nuestra historia",
    events: "Ver eventos",
    nutrition: "Salud y nutrición",
    supervisor: "Herramientas de supervisor",
    parent: "Portal familiar",
    launch: "Preparación de lanzamiento",
  },
  Tagalog: {
    demo: "Farm & Family Alliance Ecosystem Demo",
    farm: "Bronson Family Farm",
    tagline: "Konektadong karanasan sa sistema ng pagkain",
    start: "Simulan ang gabay na paglilibot",
    marketplace: "Pumunta sa pamilihan",
    pathways: "Buksan ang mga landas ng papel",
    narration: "Naka-on ang boses na gabay",
    story: "Ang kuwento sa likod ng bukid",
    overview: "Buhay na kabuuang sistema",
    chooseLanguage: "Pumili ng wika",
    rolePathways: "Mga landas ng papel",
    entrance: "Pasukan",
    ourStory: "Aming Kuwento",
    events: "Tingnan ang mga kaganapan",
    nutrition: "Kalusugan at Nutrisyon",
    supervisor: "Mga gamit ng superbisor",
    parent: "Portal ng magulang",
    launch: "Handa sa paglulunsad",
  },
  Italiano: {
    demo: "Demo dell'ecosistema Farm & Family Alliance",
    farm: "Bronson Family Farm",
    tagline: "Esperienza di ecosistema alimentare connesso",
    start: "Avvia tour guidato",
    marketplace: "Vai al mercato",
    pathways: "Apri i percorsi dei ruoli",
    narration: "Narrazione vocale attiva",
    story: "La storia dietro la fattoria",
    overview: "Panoramica dell'ecosistema vivo",
    chooseLanguage: "Scegli lingua",
    rolePathways: "Percorsi dei ruoli",
    entrance: "Ingresso",
    ourStory: "La nostra storia",
    events: "Vedi eventi",
    nutrition: "Salute e nutrizione",
    supervisor: "Strumenti supervisore",
    parent: "Portale famiglia",
    launch: "Prontezza al lancio",
  },
  Patwa: {
    demo: "Farm & Family Alliance Ecosystem Demo",
    farm: "Bronson Family Farm",
    tagline: "Connected food ecosystem experience",
    start: "Start di guided tour",
    marketplace: "Go a marketplace",
    pathways: "Open role pathways",
    narration: "Voice narration deh on",
    story: "Di story behind di farm",
    overview: "Living ecosystem overview",
    chooseLanguage: "Choose language",
    rolePathways: "Role Pathways",
    entrance: "Entrance",
    ourStory: "Our Story",
    events: "View Events",
    nutrition: "Health & Nutrition",
    supervisor: "Supervisor Tools",
    parent: "Parent Portal",
    launch: "Launch Readiness",
  },
  Hebrew: {
    demo: "הדגמת המערכת של Farm & Family Alliance",
    farm: "Bronson Family Farm",
    tagline: "חוויית מערכת מזון מחוברת",
    start: "התחל סיור מודרך",
    marketplace: "עבור לשוק",
    pathways: "פתח מסלולי תפקידים",
    narration: "קריינות פעילה",
    story: "הסיפור מאחורי החווה",
    overview: "סקירת מערכת חיה",
    chooseLanguage: "בחר שפה",
    rolePathways: "מסלולי תפקידים",
    entrance: "כניסה",
    ourStory: "הסיפור שלנו",
    events: "אירועים",
    nutrition: "בריאות ותזונה",
    supervisor: "כלי מפקח",
    parent: "פורטל משפחה",
    launch: "מוכנות להשקה",
  },
};

const languages: Language[] = [
  "English",
  "Español",
  "Tagalog",
  "Italiano",
  "Patwa",
  "Hebrew",
];

function t(language: Language, key: string) {
  return translations[language][key] || translations.English[key] || key;
}

function PillButton({
  children,
  onClick,
  active = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full border px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:scale-[1.01] ${
        active
          ? "border-emerald-200/30 bg-emerald-400/20 text-white"
          : "border-white/10 bg-white/10 text-white hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

const pathwayData: Record<PathwayKey, Pathway> = {
  guest: {
    label: "Guest",
    title: "Guest Experience",
    subtitle: "Enter the farm, understand the place, and discover where you fit.",
    need: "Guests need a clear first experience that explains why Bronson Family Farm is more than a farm. It is a place-based food, education, workforce, wellness, and marketplace ecosystem.",
    experience: [
      "Arrive through the farm entrance and experience the Historic Lansdowne Airport setting.",
      "Learn how land, legacy, food access, workforce development, wellness, and marketplace activity connect.",
      "See how the farm becomes a destination for families, growers, schools, youth, partners, and community members.",
      "Choose whether to explore the marketplace, youth workforce, grower pathway, events, or partnership opportunities.",
    ],
    rhythm: ["Welcome", "Orientation", "Pathway selection", "Feedback", "Next step"],
    journey: [
      {
        stage: "Arrival",
        purpose: "Reduce confusion and help visitors feel welcomed.",
        action: "Show the entrance, land, airport context, and why this place matters.",
        outcome: "The guest understands they are entering a working food ecosystem.",
      },
      {
        stage: "Orientation",
        purpose: "Explain the model before asking for participation.",
        action: "Connect food, youth, growers, marketplace, schools, partners, and wellness.",
        outcome: "The guest can identify which pathway fits their interest.",
      },
      {
        stage: "Decision",
        purpose: "Move from curiosity to action.",
        action: "Offer marketplace, volunteer, grower, youth, event, and partner choices.",
        outcome: "The guest takes a next step instead of leaving with only information.",
      },
    ],
    live: ["Seasonal farm status", "Current event readiness", "Marketplace activity", "Community pathway interest"],
    decisions: ["Explore the Marketplace", "Attend an event", "Learn about Youth Workforce", "Become a volunteer", "Share feedback"],
    next: ["marketplace", "youth", "grower", "partner"],
    reflection: "What part of the ecosystem made you want to learn more?",
    image: "/GrowArea.jpg",
    imageAlt: "Bronson Family Farm growing area",
  },
  customer: {
    label: "Customer",
    title: "Customer Experience",
    subtitle: "Connect fresh food, family wellness, local purchasing, and community impact.",
    need: "Customers need access to fresh local food, simple nutrition education, seasonal products, and a clear reason to support local growers and youth production.",
    experience: [
      "Explore seasonal produce, seedlings, Bubble Babies™, and value-added items.",
      "Understand how purchasing supports youth, growers, schools, families, and community destinations.",
      "Connect food choices to recipes, nutrition, wellness, and practical household health.",
      "Move from customer interest into marketplace participation, events, or grower learning.",
    ],
    rhythm: ["View seasonal products", "Learn the food story", "Choose purchase or preorder", "Share with family and friends"],
    journey: [
      {
        stage: "Discover",
        purpose: "Help customers see food as health, learning, and local impact.",
        action: "Show products, recipes, seedlings, Bubble Babies™, and food destinations.",
        outcome: "The customer understands what is available and why it matters.",
      },
      {
        stage: "Choose",
        purpose: "Turn interest into local purchasing power.",
        action: "Offer marketplace, preorder, event, and nutrition pathways.",
        outcome: "The customer supports the local food system directly.",
      },
      {
        stage: "Return",
        purpose: "Build repeat healthy choices.",
        action: "Invite sharing, recurring marketplace visits, and grower learning.",
        outcome: "The customer becomes part of community sustainability.",
      },
    ],
    foodFlow: ["Youth and growers produce food", "Food is harvested and prepared", "Marketplace receives inventory", "Families, schools, and destinations are served"],
    live: ["Available products", "Harvest movement", "Marketplace readiness", "Nutrition education moments"],
    decisions: ["Shop the Marketplace", "Preorder seasonal items", "Join a farm event", "Become a grower", "Share with family and friends"],
    next: ["marketplace", "grower", "guest", "partner"],
    reflection: "How can fresh local food improve your family or community?",
    image: "/GrowArea2.jpg",
    imageAlt: "Fresh farm production area",
  },
  youth: {
    label: "Youth Workforce",
    title: "Youth Workforce Journey",
    subtitle: "Youth grow food with real destinations: marketplace, schools, and community.",
    need: "Youth need purposeful work, structure, motivation, leadership development, and a reason to stay engaged beyond social media. Their work must visibly matter.",
    experience: [
      "Check in with supervisors and begin with weather, safety, hydration, PPE, and motivation.",
      "Join cultivation teams for planting, weeding, watering, harvesting, composting, and site stewardship.",
      "Participate in motivational activity blocks, team challenges, RC demonstrations, leadership moments, and reflection circles.",
      "Learn how harvested food moves to the marketplace, schools, events, families, and other community destinations.",
      "Build badges in responsibility, teamwork, communication, safety, cultivation, marketplace exposure, and leadership.",
    ],
    rhythm: [
      "8:00 arrival, check-in, weather, PPE, and hydration",
      "Morning activation, proverb, goal, and team assignment",
      "Cultivation, infrastructure, harvest, and stewardship work",
      "Motivational activity block to refresh attention",
      "Marketplace exposure, reflection, documentation, and closing circle",
    ],
    journey: [
      {
        stage: "Check In",
        purpose: "Create safety, structure, and belonging at the start of the day.",
        action: "Supervisor confirms attendance, PPE, hydration, weather, and team placement.",
        outcome: "Youth know where they belong and what they are responsible for.",
      },
      {
        stage: "Work With Purpose",
        purpose: "Connect physical work to food, marketplace, schools, and community.",
        action: "Youth cultivate, harvest, compost, steward land, and document progress.",
        outcome: "Youth see that their work feeds real people and supports real destinations.",
      },
      {
        stage: "Motivation & Reflection",
        purpose: "Reduce social media distraction and build self-awareness.",
        action: "Use proverbs, challenges, RC demonstrations, leadership prompts, and closing circles.",
        outcome: "Youth leave with a skill, a story, and a reason to return.",
      },
    ],
    foodFlow: ["Youth grow food", "Harvest and wash/prep", "Marketplace inventory", "Schools and youth-serving destinations", "Families and community wellness"],
    live: ["Youth active today", "Attendance and PPE status", "Team assignments", "Harvest readiness", "Supervisor observations"],
    decisions: ["Complete enrollment", "Meet supervisors", "Explore leadership track", "Become a future mentor", "Continue to Grower Pathway"],
    next: ["supervisor", "marketplace", "grower", "parent"],
    reflection: "How did today’s work help feed families, schools, marketplaces, or the community?",
    image: "/GrowArea.jpg",
    imageAlt: "Youth workforce growing space",
  },
  grower: {
    label: "Grower",
    title: "Grower Pathway",
    subtitle: "Grow more successfully with tools, training, market access, and ecosystem support.",
    need: "Growers need practical knowledge, shared infrastructure, education, market access, and a community system that helps production reach people.",
    experience: [
      "Learn companion planting, crop planning, seed starting, irrigation, harvest timing, and production basics.",
      "Connect to Bubble Babies™, demonstrations, grower education, and shared supply systems.",
      "Move produce and products toward marketplace channels, schools, events, and community destinations.",
      "Support youth learning by showing how growing connects to business, wellness, and community food systems.",
    ],
    rhythm: ["Assess growing needs", "Plan crops and timing", "Use farm knowledge and supplies", "Prepare for market and community destinations"],
    journey: [
      {
        stage: "Assess",
        purpose: "Identify what the grower needs to produce successfully.",
        action: "Review crop goals, space, supplies, timing, irrigation, and training needs.",
        outcome: "The grower knows the next practical step.",
      },
      {
        stage: "Prepare",
        purpose: "Turn interest into productive growing activity.",
        action: "Use education, Bubble Babies™, demonstrations, and shared market planning.",
        outcome: "The grower is ready to produce for household, market, or community use.",
      },
      {
        stage: "Connect",
        purpose: "Move production into the ecosystem.",
        action: "Link produce to marketplace, schools, events, youth mentorship, or partner channels.",
        outcome: "The grower participates in a larger regional food system.",
      },
    ],
    foodFlow: ["Grower production", "Farm support systems", "Marketplace", "Schools and events", "Community food access"],
    live: ["Grower interest", "Crop windows", "Supply needs", "Market readiness"],
    decisions: ["Join the Grower Network", "Attend training", "Sell through Marketplace", "Mentor Youth Workforce", "Become a partner grower"],
    next: ["marketplace", "partner", "youth", "customer"],
    reflection: "What would help you grow more successfully?",
    image: "/GrowArea2.jpg",
    imageAlt: "Grower support and production area",
  },
  marketplace: {
    label: "Marketplace",
    title: "Marketplace Pathway",
    subtitle: "The economic engine connecting growers, youth, customers, schools, and community.",
    need: "The marketplace needs to show how production becomes purchasing power, food access, education, and community sustainability.",
    experience: [
      "View seasonal produce, seedlings, Bubble Babies™, value-added products, and farm offerings.",
      "Understand how youth-grown and grower-produced food becomes real inventory.",
      "Connect purchasing to nutrition, schools, events, families, and community destinations.",
      "Move from shopping into customer loyalty, grower participation, vendor activity, or partnership support.",
    ],
    rhythm: ["Harvest received", "Inventory prepared", "Products displayed or listed", "Customers and destinations served"],
    journey: [
      {
        stage: "Receive",
        purpose: "Show that the marketplace begins with production.",
        action: "Receive harvest, seedlings, Bubble Babies™, vendor items, and value-added products.",
        outcome: "Inventory has a source, story, and destination.",
      },
      {
        stage: "Sell & Educate",
        purpose: "Connect purchasing with nutrition and community impact.",
        action: "Display items, explain use, share recipes, and route customers to preorders.",
        outcome: "Customers buy with understanding, not just interest.",
      },
      {
        stage: "Sustain",
        purpose: "Keep the ecosystem economically active.",
        action: "Track demand, vendor participation, destination orders, and repeat customers.",
        outcome: "Marketplace activity supports youth, growers, and community food access.",
      },
    ],
    foodFlow: ["Field production", "Harvest records", "Marketplace display", "Customer purchase", "Community impact"],
    live: ["Product availability", "Preorder activity", "Vendor participation", "Destination demand"],
    decisions: ["Shop the Marketplace", "Become a vendor", "Learn about SNAP access", "Support youth production", "Return to Ecosystem"],
    next: ["customer", "grower", "partner", "youth"],
    reflection: "What products or services should the marketplace offer next?",
    image: "/ConnectFoodEcosystem_withimages.jpeg",
    imageAlt: "Connected food ecosystem marketplace image",
  },
  partner: {
    label: "Partner",
    title: "Partner Pathway",
    subtitle: "Partners expand capacity, infrastructure, workforce, food access, and community trust.",
    need: "Partners need to see where their support fits and how investment strengthens youth workforce, schools, marketplace activity, food access, and long-term revitalization.",
    experience: [
      "Support youth workforce development, supervisor capacity, training, and safety systems.",
      "Help connect food production to schools, families, events, and community destinations.",
      "Invest in irrigation, storage, transportation, marketplace systems, technology, and long-term operations.",
      "Collaborate through education, wellness, workforce, food access, and community development.",
    ],
    rhythm: ["Identify shared mission", "Select support area", "Connect resources to pathway needs", "Track outcomes and impact"],
    journey: [
      {
        stage: "Align",
        purpose: "Help partners understand where they fit.",
        action: "Match their mission to youth, food access, infrastructure, events, health, or marketplace needs.",
        outcome: "Partner support is targeted instead of general.",
      },
      {
        stage: "Contribute",
        purpose: "Turn support into operating capacity.",
        action: "Sponsor, donate, train, provide supplies, support distribution, or fund systems.",
        outcome: "The ecosystem becomes more stable and measurable.",
      },
      {
        stage: "Track Impact",
        purpose: "Make partnership visible and accountable.",
        action: "Report youth participation, food destinations, market movement, and community outcomes.",
        outcome: "Partners can see the value of continued investment.",
      },
    ],
    live: ["Infrastructure needs", "Youth workforce support", "Event opportunities", "Community outcome tracking"],
    decisions: ["Schedule a meeting", "Sponsor Youth Workforce", "Support food distribution", "Invest in infrastructure", "Become an ecosystem partner"],
    next: ["youth", "marketplace", "grower", "supervisor"],
    reflection: "Where could your organization strengthen this ecosystem?",
    image: "/GrowArea.jpg",
    imageAlt: "Partner support at the farm",
  },
  supervisor: {
    label: "Supervisor",
    title: "Supervisor Mobile Tracking",
    subtitle: "Phone-based oversight for attendance, PPE, daily tasks, youth progress, and pathway advancement.",
    need: "Supervisors need a simple mobile-first operating layer to manage 15 youth per aide, support safety, document progress, and keep the program measurable.",
    experience: [
      "Check attendance and assign youth to daily teams.",
      "Confirm PPE, hydration, safety readiness, and role assignments before work begins.",
      "Track task completion, teamwork, communication, leadership, participation, and safety awareness.",
      "Record observations from a phone while youth work in the field.",
      "Submit daily notes that support badges, parent updates, and final assessments.",
    ],
    rhythm: ["Morning roster and PPE check", "Team deployment and field observations", "Task completion and behavior notes", "End-of-day assessment and parent-ready summary"],
    journey: [
      {
        stage: "Roster",
        purpose: "Know who is present and ready before work starts.",
        action: "Mark attendance, confirm PPE, hydration, and assign teams.",
        outcome: "The day begins with safety and accountability.",
      },
      {
        stage: "Observe",
        purpose: "Capture progress without pulling youth out of the work experience.",
        action: "Use phone-based checklists for teamwork, communication, safety, and task completion.",
        outcome: "Supervisor notes become real-time evidence of growth.",
      },
      {
        stage: "Report",
        purpose: "Turn daily work into measurable development.",
        action: "Submit daily assessment, badge notes, parent-ready comments, and support needs.",
        outcome: "Youth progress is visible to supervisors, families, and program leadership.",
      },
    ],
    live: ["Attendance count", "PPE completion", "Team locations", "Youth progress notes"],
    decisions: ["Open daily attendance", "Complete PPE check", "Record youth observations", "Submit daily assessment", "Review pathway progress"],
    next: ["youth", "parent", "partner", "marketplace"],
    reflection: "What support does this youth need to succeed tomorrow?",
    image: "/GrowArea2.jpg",
    imageAlt: "Supervisor mobile tracking in the field",
  },
  parent: {
    label: "Parent / Guardian",
    title: "Parent & Guardian Connection",
    subtitle: "Families see progress, participation, achievements, communication, and community contribution.",
    need: "Parents and guardians need confidence that youth are safe, growing, learning, contributing, and connected to meaningful opportunity.",
    experience: [
      "View attendance and participation summaries.",
      "See badges, growth moments, leadership progress, and supervisor notes.",
      "Understand how youth work connects to food for the marketplace, schools, and community destinations.",
      "Receive communication about events, milestones, and next opportunities.",
    ],
    rhythm: ["Daily participation summary", "Weekly progress update", "Achievement and badge review", "Family feedback and next opportunity"],
    journey: [
      {
        stage: "Inform",
        purpose: "Give families confidence and reduce uncertainty.",
        action: "Show attendance, safety, participation, and daily activity summaries.",
        outcome: "Families know youth are safe and engaged.",
      },
      {
        stage: "Celebrate",
        purpose: "Make growth visible beyond the workday.",
        action: "Share badges, leadership moments, supervisor notes, and reflection prompts.",
        outcome: "Youth can talk about progress at home.",
      },
      {
        stage: "Connect",
        purpose: "Invite families into the larger ecosystem.",
        action: "Offer events, marketplace, volunteer, feedback, and next-step opportunities.",
        outcome: "Families become part of the farm community.",
      },
    ],
    live: ["Youth attendance", "Badges earned", "Supervisor update", "Upcoming events"],
    decisions: ["View youth progress", "Read supervisor update", "Submit comment", "Attend farm event", "Support next pathway"],
    next: ["youth", "marketplace", "partner", "guest"],
    reflection: "What growth have you noticed in your youth?",
    image: "/GrowArea.jpg",
    imageAlt: "Parent and guardian connection to the farm",
  },
};

function NavBar({
  screen,
  setScreen,
  language,
}: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  language: Language;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <PillButton onClick={() => setScreen("home")} active={screen === "home"}>
        {t(language, "entrance")}
      </PillButton>
      <PillButton onClick={() => setScreen("story")} active={screen === "story"}>
        {t(language, "ourStory")}
      </PillButton>
      <PillButton onClick={() => setScreen("roles")} active={screen === "roles"}>
        {t(language, "rolePathways")}
      </PillButton>
      <PillButton onClick={() => setScreen("supervisor")} active={screen === "supervisor"}>
        {t(language, "supervisor")}
      </PillButton>
      <PillButton onClick={() => setScreen("parent")} active={screen === "parent"}>
        {t(language, "parent")}
      </PillButton>
      <PillButton onClick={() => setScreen("events")} active={screen === "events"}>
        {t(language, "events")}
      </PillButton>
      <PillButton onClick={() => setScreen("nutrition")} active={screen === "nutrition"}>
        {t(language, "nutrition")}
      </PillButton>
      <PillButton onClick={() => setScreen("marketplace")} active={screen === "marketplace"}>
        {t(language, "marketplace")}
      </PillButton>
      <PillButton onClick={() => setScreen("launch")} active={screen === "launch"}>
        {t(language, "launch")}
      </PillButton>
    </div>
  );
}

function EcosystemShell({
  children,
  screen,
  setScreen,
  language,
  image = "/GrowArea.jpg",
}: {
  children: React.ReactNode;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  language: Language;
  image?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-emerald-950/70 to-slate-900/80" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-7 md:px-10">
        <NavBar screen={screen} setScreen={setScreen} language={language} />
        {children}
      </div>
    </div>
  );
}

function LiveEcosystemStrip() {
  const items = [
    { label: "Live Weather", value: "Field conditions active" },
    { label: "Youth Workforce", value: "50 expected first round" },
    { label: "Food Destinations", value: "Marketplace • Schools • Community" },
    { label: "Daily Rhythm", value: "Arrival • Work • Reflection" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <GlassCard key={item.label} className="p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">
            {item.label}
          </div>
          <div className="mt-3 text-xl font-semibold leading-tight">{item.value}</div>
        </GlassCard>
      ))}
    </div>
  );
}

function HomeStoryScreen({
  language,
  setLanguage,
  setScreen,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  setScreen: (screen: Screen) => void;
}) {
  const overviewItems = useMemo(
    () => [
      {
        title: "Family legacy",
        text: "The farm carries Bronson and Lorenzana legacy into a future-focused Youngstown vision.",
      },
      {
        title: "Land restoration",
        text: "The project restores land while creating food, education, workforce, marketplace, and agritourism opportunity.",
      },
      {
        title: "Community future",
        text: "This is an ecosystem for long-term return, growth, school connection, nutrition, and community wellness.",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GrowArea.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-emerald-950/55 to-slate-900/70" />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-7 md:px-10">
        <header className="mb-8">
          <div className="mb-3 text-sm uppercase tracking-[0.32em] text-emerald-100/75">
            {t(language, "demo")}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {t(language, "farm")}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("home")}>{t(language, "entrance")}</PillButton>
            <PillButton onClick={() => setScreen("story")} active>
              {t(language, "ourStory")}
            </PillButton>
            <PillButton onClick={() => setScreen("roles")}>{t(language, "rolePathways")}</PillButton>
            <PillButton onClick={() => setScreen("events")}>{t(language, "events")}</PillButton>
            <PillButton onClick={() => setScreen("nutrition")}>{t(language, "nutrition")}</PillButton>
            <PillButton onClick={() => setScreen("marketplace")}>{t(language, "marketplace")}</PillButton>
            <PillButton active>{t(language, "narration")}</PillButton>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/20 p-6 shadow-2xl backdrop-blur-xl md:p-10">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100/80">
              {t(language, "story")}
            </div>

            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
              {t(language, "tagline")}
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-9 text-emerald-50/85 md:text-xl md:leading-10">
              Inspired by family farming traditions and shaped for Youngstown’s future,
              this farm brings together legacy, land restoration, food access,
              agritourism, workforce development, marketplace systems, schools,
              and practical community opportunity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton active>{t(language, "start")}</PillButton>
              <PillButton onClick={() => setScreen("marketplace")}>{t(language, "marketplace")}</PillButton>
              <PillButton onClick={() => setScreen("roles")}>{t(language, "pathways")}</PillButton>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <GlassCard className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">Seasonal conditions</div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">Warm season planning active</h3>
                <p className="mt-3 text-base leading-8 text-emerald-50/80">
                  Field prep, youth activity, harvest movement, school destinations,
                  event readiness, and marketplace coordination are active.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">Farm calendar</div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">Living schedule</h3>
                <p className="mt-3 text-base leading-8 text-emerald-50/80">
                  Arrival, motivation, team deployment, cultivation, harvest,
                  reflection, marketplace exposure, and closing circle connect here.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">{t(language, "chooseLanguage")}</div>
                <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{language}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        language === lang
                          ? "bg-white text-slate-900"
                          : "border border-white/10 bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>

          <GlassCard className="p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
              A place people want to return to
            </div>
            <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              {t(language, "overview")}
            </h3>
            <p className="mt-5 text-lg leading-9 text-emerald-50/82">
              This living farm ecosystem helps guests, customers, growers, youth,
              supervisors, parents, volunteers, partners, and families move toward
              food self-sufficiency, economic opportunity, practical wellness, and
              stronger community connection.
            </p>
            <div className="mt-6 space-y-4">
              {overviewItems.map((item) => (
                <GlassCard key={item.title} className="p-5">
                  <h4 className="text-2xl font-semibold">{item.title}</h4>
                  <p className="mt-3 text-base leading-8 text-emerald-50/80">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-6">
          <LiveEcosystemStrip />
        </section>
      </div>
    </div>
  );
}

function RolePathwaysScreen({
  setScreen,
  language,
}: {
  setScreen: (screen: Screen) => void;
  language: Language;
}) {
  const [activePathway, setActivePathway] = useState<PathwayKey>("youth");
  const pathway = pathwayData[activePathway];

  return (
    <EcosystemShell screen="roles" setScreen={setScreen} language={language} image={pathway.image}>
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.45fr]">
        <GlassCard className="p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Connected ecosystem movement</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{t(language, "rolePathways")}</h1>
          <p className="mt-5 text-lg leading-9 text-emerald-50/85">
            Each role is a living journey. The viewer enters a pathway, understands
            the need being met, sees the daily experience, follows where food and
            activity move, makes an ending decision, and continues through the ecosystem.
          </p>
          <div className="mt-8 grid gap-3">
            {(Object.keys(pathwayData) as PathwayKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActivePathway(key)}
                className={`rounded-2xl border p-4 text-left transition ${
                  activePathway === key
                    ? "border-emerald-200/40 bg-emerald-400/20"
                    : "border-white/10 bg-white/10 hover:bg-white/15"
                }`}
              >
                <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/65">Pathway</div>
                <div className="mt-1 text-2xl font-semibold">{pathwayData[key].label}</div>
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="overflow-hidden p-0">
            <div className="grid gap-0 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Current journey</div>
                <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{pathway.title}</h2>
                <p className="mt-4 text-2xl leading-9 text-emerald-100/90">{pathway.subtitle}</p>
                <p className="mt-5 text-lg leading-9 text-emerald-50/85">{pathway.need}</p>
              </div>
              <div className="min-h-[280px] bg-black/20 p-4">
                <div
                  className="h-full min-h-[260px] rounded-[1.5rem] border border-white/10 bg-cover bg-center shadow-xl"
                  style={{ backgroundImage: `url('${pathway.image}')` }}
                  aria-label={pathway.imageAlt}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Vertical journey: purpose → action → outcome</div>
            <div className="mt-5 grid gap-4 xl:grid-cols-3">
              {pathway.journey.map((step) => (
                <div key={step.stage} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <h3 className="text-2xl font-semibold">{step.stage}</h3>
                  <div className="mt-4 text-xs uppercase tracking-[0.24em] text-emerald-100/65">Purpose</div>
                  <p className="mt-2 text-base leading-7 text-emerald-50/85">{step.purpose}</p>
                  <div className="mt-4 text-xs uppercase tracking-[0.24em] text-emerald-100/65">Action</div>
                  <p className="mt-2 text-base leading-7 text-emerald-50/85">{step.action}</p>
                  <div className="mt-4 text-xs uppercase tracking-[0.24em] text-emerald-100/65">Outcome</div>
                  <p className="mt-2 text-base leading-7 text-emerald-50/85">{step.outcome}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="grid gap-6 xl:grid-cols-2">
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Experience this pathway</div>
              <div className="mt-5 space-y-3">
                {pathway.experience.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-8 text-emerald-50/85">{item}</div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Daily rhythm</div>
              <div className="mt-5 space-y-3">
                {pathway.rhythm.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-base leading-8 text-emerald-50/85">{item}</div>
                ))}
              </div>
            </GlassCard>
          </div>

          {pathway.foodFlow && (
            <GlassCard className="p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Where the food goes</div>
              <h3 className="mt-3 text-3xl font-semibold">Grow → Harvest → Prepare → Distribute → Nourish</h3>
              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {pathway.foodFlow.map((step) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-sm leading-6 text-emerald-50/90">{step}</div>
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-emerald-50/85">
                The food youth and growers help produce is not symbolic. It is connected
                to the marketplace, schools, families, events, and other community destinations.
              </p>
            </GlassCard>
          )}

          <div className="grid gap-6 xl:grid-cols-3">
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Live ecosystem layer</div>
              <div className="mt-5 space-y-3">
                {pathway.live.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-7">{item}</div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Ending decision</div>
              <div className="mt-5 space-y-3">
                {pathway.decisions.map((decision) => (
                  <button key={decision} className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-base hover:bg-emerald-400/15">
                    {decision}
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">Continue your journey</div>
              <div className="mt-5 flex flex-wrap gap-3">
                {pathway.next.map((nextKey) => (
                  <PillButton key={nextKey} onClick={() => setActivePathway(nextKey)}>{pathwayData[nextKey].label}</PillButton>
                ))}
              </div>
              <div className="mt-7 text-xs uppercase tracking-[0.3em] text-emerald-100/70">Feedback / comments</div>
              <p className="mt-3 text-base leading-8 text-emerald-50/85">{pathway.reflection}</p>
              <textarea
                className="mt-4 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none placeholder:text-white/45"
                placeholder="Share feedback, comments, or questions..."
              />
            </GlassCard>
          </div>
        </div>
      </section>
    </EcosystemShell>
  );
}

function PlaceholderDestination({
  title,
  description,
  setScreen,
  language,
  children,
  image = "/GrowArea.jpg",
}: {
  title: string;
  description: string;
  setScreen: (screen: Screen) => void;
  language: Language;
  children?: React.ReactNode;
  image?: string;
}) {
  return (
    <EcosystemShell screen="home" setScreen={setScreen} language={language} image={image}>
      <GlassCard className="p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">Bronson Family Farm</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-emerald-50/85">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton onClick={() => setScreen("home")} active>Return to Entrance</PillButton>
          <PillButton onClick={() => setScreen("marketplace")}>Go to Marketplace</PillButton>
          <PillButton onClick={() => setScreen("roles")}>Open Role Pathways</PillButton>
        </div>
      </GlassCard>
      {children && <div className="mt-6">{children}</div>}
    </EcosystemShell>
  );
}

function EventsScreen({ setScreen, language }: { setScreen: (screen: Screen) => void; language: Language }) {
  return (
    <PlaceholderDestination
      title="Events & Experiences"
      description="Events create visibility, trust, learning, marketplace movement, school/community connections, partner engagement, and community voice."
      setScreen={setScreen}
      language={language}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          "Growers Supply Market demonstrations",
          "Youth workforce showcases",
          "Nutrition, wellness, and food access education",
          "Community feedback and partner engagement",
          "Marketplace previews and seasonal product activity",
          "School, family, and community destination connections",
        ].map((item) => (
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">{item}</GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

function NutritionScreen({ setScreen, language }: { setScreen: (screen: Screen) => void; language: Language }) {
  return (
    <PlaceholderDestination
      title="Health & Nutrition"
      description="Food grown through the ecosystem becomes wellness for families, schools, youth-serving destinations, marketplace customers, and the wider community."
      setScreen={setScreen}
      language={language}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          "Youth-grown food supports real destinations.",
          "Marketplace access connects families to fresh local produce.",
          "Schools and youth-serving destinations become part of the food system.",
          "Recipes, education, and demonstrations help turn produce into healthier choices.",
          "Growers and partners strengthen regional nutrition access.",
          "Community wellness grows through food, knowledge, and relationship.",
        ].map((item) => (
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">{item}</GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

function MarketplaceScreen({ setScreen, language }: { setScreen: (screen: Screen) => void; language: Language }) {
  return (
    <PlaceholderDestination
      title="Marketplace"
      description="The marketplace connects growing, learning, purchasing, schools, community destinations, and local economic activity."
      setScreen={setScreen}
      language={language}
      image="/ConnectFoodEcosystem_withimages.jpeg"
    >
      <div className="grid gap-5 md:grid-cols-4">
        {[
          "Youth-grown produce",
          "Grower products",
          "Bubble Babies™",
          "Seasonal harvest",
          "School destinations",
          "Community events",
          "Nutrition education",
          "Local purchasing",
        ].map((item) => (
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">{item}</GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

function SupervisorScreen({ setScreen, language }: { setScreen: (screen: Screen) => void; language: Language }) {
  const metrics: SupervisorMetric[] = [
    { label: "Roster", value: "15 youth per aide", note: "Designed for mobile check-in and field accountability." },
    { label: "Safety", value: "PPE + hydration", note: "No PPE, no work. Safety begins before assignment." },
    { label: "Assessment", value: "Daily notes", note: "Tracks teamwork, communication, leadership, participation, and task completion." },
    { label: "Progress", value: "Badges + reports", note: "Converts daily work into parent-ready and program-ready progress." },
  ];

  const checklist = [
    "Mark youth present or absent",
    "Confirm PPE, hydration, and weather readiness",
    "Assign youth to field, harvest, compost, marketplace, or stewardship team",
    "Record task completion and growth observations",
    "Flag support needs before the next workday",
    "Submit end-of-day summary for parent and program reporting",
  ];

  return (
    <EcosystemShell screen="supervisor" setScreen={setScreen} language={language} image="/GrowArea2.jpg">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">Youth Workforce Operating Layer</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Supervisor Mobile Tools</h1>
          <p className="mt-6 text-lg leading-9 text-emerald-50/85">
            This layer prepares aides and supervisors to manage youth in the field from a phone:
            attendance, PPE, weather readiness, team assignment, daily observation, task completion,
            badges, parent-ready notes, and final progress reporting.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {metrics.map((metric) => (
              <GlassCard key={metric.label} className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">{metric.label}</div>
                <h3 className="mt-3 text-3xl font-semibold">{metric.value}</h3>
                <p className="mt-3 text-base leading-7 text-emerald-50/80">{metric.note}</p>
              </GlassCard>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">Daily phone checklist</div>
          <div className="mt-6 space-y-3">
            {checklist.map((item, index) => (
              <label key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                <input type="checkbox" className="mt-1 h-5 w-5 accent-emerald-400" />
                <span className="text-base leading-7 text-emerald-50/90">
                  <strong>{index + 1}.</strong> {item}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">Supervisor reflection</div>
            <p className="mt-3 text-base leading-8 text-emerald-50/85">What support does this youth need to succeed tomorrow?</p>
            <textarea className="mt-4 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none placeholder:text-white/45" placeholder="Add daily observation notes..." />
          </div>
        </GlassCard>
      </section>
    </EcosystemShell>
  );
}

function ParentPortalScreen({ setScreen, language }: { setScreen: (screen: Screen) => void; language: Language }) {
  const cards = [
    { title: "Attendance", text: "Families see whether youth participated and completed the day." },
    { title: "Badges", text: "Progress is shown through responsibility, teamwork, safety, cultivation, leadership, and marketplace exposure." },
    { title: "Supervisor Notes", text: "Short updates help families understand growth, needs, and next opportunities." },
    { title: "Community Connection", text: "Parents can attend events, support marketplace activity, and submit feedback." },
  ];

  return (
    <EcosystemShell screen="parent" setScreen={setScreen} language={language} image="/GrowArea.jpg">
      <GlassCard className="p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">Family confidence layer</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Parent & Guardian Portal</h1>
        <p className="mt-6 max-w-5xl text-lg leading-9 text-emerald-50/85">
          Families need to see that youth are safe, learning, contributing, and growing. This portal connects youth work to attendance,
          badges, supervisor notes, food destinations, events, and feedback.
        </p>
      </GlassCard>
      <div className="mt-6 grid gap-5 md:grid-cols-4">
        {cards.map((card) => (
          <GlassCard key={card.title} className="p-6">
            <h3 className="text-2xl font-semibold">{card.title}</h3>
            <p className="mt-3 text-base leading-8 text-emerald-50/82">{card.text}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="mt-6 p-6 md:p-8">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">Family feedback</div>
        <p className="mt-3 text-lg leading-8 text-emerald-50/85">What growth have you noticed in your youth?</p>
        <textarea className="mt-4 h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none placeholder:text-white/45" placeholder="Parent / guardian comment..." />
      </GlassCard>
    </EcosystemShell>
  );
}

function LaunchReadinessScreen({ setScreen, language }: { setScreen: (screen: Screen) => void; language: Language }) {
  const rows = [
    ["Protected master App.tsx", "Use this file as the replacement foundation. Do not redesign."],
    ["Role pathways", "Guest, Customer, Youth, Grower, Marketplace, Partner, Supervisor, Parent."],
    ["Youth Workforce", "Daily rhythm, motivation, food destinations, supervisor tracking, parent connection."],
    ["Supervisor training", "Phone-first attendance, PPE, observations, daily assessment, notes."],
    ["Parent connection", "Attendance, badges, supervisor updates, event and feedback connection."],
    ["Marketplace", "Youth-grown food, grower products, Bubble Babies™, schools, events, community destinations."],
    ["Next implementation", "Connect form fields to database, auth, reports, and real marketplace links."],
  ];

  return (
    <EcosystemShell screen="launch" setScreen={setScreen} language={language} image="/GrowArea.jpg">
      <GlassCard className="p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">Launch control</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Launch Readiness</h1>
        <p className="mt-6 max-w-5xl text-lg leading-9 text-emerald-50/85">
          This screen protects the launch goal: preserve the design, complete the pathways, prepare supervisors, connect parents,
          and keep the youth workforce program tied to food production, marketplace activity, schools, and community destinations.
        </p>
      </GlassCard>
      <div className="mt-6 space-y-4">
        {rows.map(([title, description]) => (
          <GlassCard key={title} className="grid gap-3 p-5 md:grid-cols-[0.35fr_0.65fr]">
            <div className="text-2xl font-semibold">{title}</div>
            <div className="text-base leading-8 text-emerald-50/85">{description}</div>
          </GlassCard>
        ))}
      </div>
    </EcosystemShell>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("story");
  const [language, setLanguage] = useState<Language>("English");

  if (screen === "home" || screen === "story") {
    return <HomeStoryScreen language={language} setLanguage={setLanguage} setScreen={setScreen} />;
  }

  if (screen === "roles") return <RolePathwaysScreen setScreen={setScreen} language={language} />;
  if (screen === "events") return <EventsScreen setScreen={setScreen} language={language} />;
  if (screen === "nutrition") return <NutritionScreen setScreen={setScreen} language={language} />;
  if (screen === "marketplace") return <MarketplaceScreen setScreen={setScreen} language={language} />;
  if (screen === "supervisor") return <SupervisorScreen setScreen={setScreen} language={language} />;
  if (screen === "parent") return <ParentPortalScreen setScreen={setScreen} language={language} />;
  if (screen === "launch") return <LaunchReadinessScreen setScreen={setScreen} language={language} />;

  return null;
}
