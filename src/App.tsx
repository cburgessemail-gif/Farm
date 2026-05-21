import React, { useEffect, useMemo, useState } from "react";

type Screen =
  | "home"
  | "story"
  | "roles"
  | "events"
  | "nutrition"
  | "marketplace";

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

type Pathway = {
  label: string;
  title: string;
  subtitle: string;
  need: string;
  experience: string[];
  rhythm: string[];
  foodFlow?: string[];
  live: string[];
  decisions: string[];
  next: PathwayKey[];
  reflection: string;
};

function PillButton({
  children,
  onClick,
  active = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
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
    rhythm: [
      "Welcome and orientation",
      "Ecosystem overview",
      "Pathway selection",
      "Feedback and next step",
    ],
    live: [
      "Seasonal farm status",
      "Current event readiness",
      "Marketplace activity",
      "Community pathway interest",
    ],
    decisions: [
      "Explore the Marketplace",
      "Attend an event",
      "Learn about Youth Workforce",
      "Become a volunteer",
      "Share feedback",
    ],
    next: ["marketplace", "youth", "grower", "partner"],
    reflection: "What part of the ecosystem made you want to learn more?",
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
    rhythm: [
      "View seasonal products",
      "Learn the food story",
      "Choose purchase or preorder",
      "Share with family and friends",
    ],
    foodFlow: [
      "Youth and growers produce food",
      "Food is harvested and prepared",
      "Marketplace receives inventory",
      "Families, schools, and destinations are served",
    ],
    live: [
      "Available products",
      "Harvest movement",
      "Marketplace readiness",
      "Nutrition education moments",
    ],
    decisions: [
      "Shop the Marketplace",
      "Preorder seasonal items",
      "Join a farm event",
      "Become a grower",
      "Share with family and friends",
    ],
    next: ["marketplace", "grower", "guest", "partner"],
    reflection: "How can fresh local food improve your family or community?",
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
    foodFlow: [
      "Youth grow food",
      "Harvest and wash/prep",
      "Marketplace inventory",
      "Schools and youth-serving destinations",
      "Families and community wellness",
    ],
    live: [
      "Youth active today",
      "Attendance and PPE status",
      "Team assignments",
      "Harvest readiness",
      "Supervisor observations",
    ],
    decisions: [
      "Complete enrollment",
      "Meet supervisors",
      "Explore leadership track",
      "Become a future mentor",
      "Continue to Grower Pathway",
    ],
    next: ["supervisor", "marketplace", "grower", "parent"],
    reflection: "How did today’s work help feed families, schools, marketplaces, or the community?",
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
    rhythm: [
      "Assess growing needs",
      "Plan crops and timing",
      "Use farm knowledge and supplies",
      "Prepare for market and community destinations",
    ],
    foodFlow: [
      "Grower production",
      "Farm support systems",
      "Marketplace",
      "Schools and events",
      "Community food access",
    ],
    live: [
      "Grower interest",
      "Crop windows",
      "Supply needs",
      "Market readiness",
    ],
    decisions: [
      "Join the Grower Network",
      "Attend training",
      "Sell through Marketplace",
      "Mentor Youth Workforce",
      "Become a partner grower",
    ],
    next: ["marketplace", "partner", "youth", "customer"],
    reflection: "What would help you grow more successfully?",
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
    rhythm: [
      "Harvest received",
      "Inventory prepared",
      "Products displayed or listed",
      "Customers and destinations served",
    ],
    foodFlow: [
      "Field production",
      "Harvest records",
      "Marketplace display",
      "Customer purchase",
      "Community impact",
    ],
    live: [
      "Product availability",
      "Preorder activity",
      "Vendor participation",
      "Destination demand",
    ],
    decisions: [
      "Shop the Marketplace",
      "Become a vendor",
      "Learn about SNAP access",
      "Support youth production",
      "Return to Ecosystem",
    ],
    next: ["customer", "grower", "partner", "youth"],
    reflection: "What products or services should the marketplace offer next?",
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
    rhythm: [
      "Identify shared mission",
      "Select support area",
      "Connect resources to pathway needs",
      "Track outcomes and impact",
    ],
    live: [
      "Infrastructure needs",
      "Youth workforce support",
      "Event opportunities",
      "Community outcome tracking",
    ],
    decisions: [
      "Schedule a meeting",
      "Sponsor Youth Workforce",
      "Support food distribution",
      "Invest in infrastructure",
      "Become an ecosystem partner",
    ],
    next: ["youth", "marketplace", "grower", "supervisor"],
    reflection: "Where could your organization strengthen this ecosystem?",
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
    rhythm: [
      "Morning roster and PPE check",
      "Team deployment and field observations",
      "Task completion and behavior notes",
      "End-of-day assessment and parent-ready summary",
    ],
    live: [
      "Attendance count",
      "PPE completion",
      "Team locations",
      "Youth progress notes",
    ],
    decisions: [
      "Open daily attendance",
      "Complete PPE check",
      "Record youth observations",
      "Submit daily assessment",
      "Review pathway progress",
    ],
    next: ["youth", "parent", "partner", "marketplace"],
    reflection: "What support does this youth need to succeed tomorrow?",
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
    rhythm: [
      "Daily participation summary",
      "Weekly progress update",
      "Achievement and badge review",
      "Family feedback and next opportunity",
    ],
    live: [
      "Youth attendance",
      "Badges earned",
      "Supervisor update",
      "Upcoming events",
    ],
    decisions: [
      "View youth progress",
      "Read supervisor update",
      "Submit comment",
      "Attend farm event",
      "Support next pathway",
    ],
    next: ["youth", "marketplace", "partner", "guest"],
    reflection: "What growth have you noticed in your youth?",
  },
};

function NavBar({
  screen,
  setScreen,
}: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <PillButton onClick={() => setScreen("home")} active={screen === "home"}>
        Entrance
      </PillButton>
      <PillButton onClick={() => setScreen("story")} active={screen === "story"}>
        Our Story
      </PillButton>
      <PillButton onClick={() => setScreen("roles")} active={screen === "roles"}>
        Role Pathways
      </PillButton>
      <PillButton onClick={() => setScreen("events")} active={screen === "events"}>
        View Events
      </PillButton>
      <PillButton onClick={() => setScreen("nutrition")} active={screen === "nutrition"}>
        Health &amp; Nutrition
      </PillButton>
      <PillButton onClick={() => setScreen("marketplace")} active={screen === "marketplace"}>
        Go to Marketplace
      </PillButton>
    </div>
  );
}

function EcosystemShell({
  children,
  screen,
  setScreen,
}: {
  children: React.ReactNode;
  screen: Screen;
  setScreen: (screen: Screen) => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GrowArea.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-emerald-950/70 to-slate-900/80" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-8 md:px-10">
        <NavBar screen={screen} setScreen={setScreen} />
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

function PlaceholderDestination({
  title,
  description,
  setScreen,
  children,
}: {
  title: string;
  description: string;
  setScreen: (screen: Screen) => void;
  children?: React.ReactNode;
}) {
  return (
    <EcosystemShell screen="home" setScreen={setScreen}>
      <GlassCard className="p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
          Bronson Family Farm
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-emerald-50/85">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton onClick={() => setScreen("home")} active>
            Return to Entrance
          </PillButton>
          <PillButton onClick={() => setScreen("marketplace")}>
            Go to Marketplace
          </PillButton>
          <PillButton onClick={() => setScreen("roles")}>Open Role Pathways</PillButton>
        </div>
      </GlassCard>

      {children && <div className="mt-6">{children}</div>}
    </EcosystemShell>
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
  const languages: Language[] = [
    "English",
    "Español",
    "Tagalog",
    "Italiano",
    "Patwa",
    "Hebrew",
  ];

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
        text: "This is about more than a site. It is an ecosystem for long-term return, growth, school connection, and community wellness.",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GrowArea.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-emerald-950/55 to-slate-900/70" />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-8 md:px-10">
        <header className="mb-8">
          <div className="mb-3 text-sm uppercase tracking-[0.32em] text-emerald-100/75">
            Farm &amp; Family Alliance Ecosystem Demo
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Bronson Family Farm
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("home")}>Entrance</PillButton>
            <PillButton onClick={() => setScreen("story")} active>
              Our Story
            </PillButton>
            <PillButton onClick={() => setScreen("roles")}>Role Pathways</PillButton>
            <PillButton onClick={() => setScreen("events")}>View Events</PillButton>
            <PillButton onClick={() => setScreen("nutrition")}>
              Health &amp; Nutrition
            </PillButton>
            <PillButton onClick={() => setScreen("marketplace")}>Go to Marketplace</PillButton>
            <PillButton active>Voice narration on</PillButton>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/20 p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100/80">
              The story behind the farm
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              The story behind the farm
            </h2>

            <p className="mt-8 max-w-4xl text-xl leading-10 text-emerald-50/85">
              Inspired by family farming traditions and shaped for Youngstown’s future,
              this farm brings together legacy, land restoration, food access,
              agritourism, workforce development, marketplace systems, schools,
              and practical community opportunity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton active>Start Guided Tour</PillButton>
              <PillButton onClick={() => setScreen("marketplace")}>Go to Marketplace</PillButton>
              <PillButton onClick={() => setScreen("roles")}>Open Role Pathways</PillButton>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <GlassCard className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">
                  Seasonal conditions
                </div>
                <h3 className="mt-3 text-3xl font-semibold leading-tight">
                  Warm season planning active
                </h3>
                <p className="mt-3 text-base leading-8 text-emerald-50/80">
                  Field prep, youth activity, harvest movement, school destinations,
                  event readiness, and marketplace coordination are active.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">
                  Farm calendar
                </div>
                <h3 className="mt-3 text-3xl font-semibold leading-tight">
                  Living schedule
                </h3>
                <p className="mt-3 text-base leading-8 text-emerald-50/80">
                  Arrival, motivation, team deployment, cultivation, harvest,
                  reflection, marketplace exposure, and closing circle connect here.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">
                  Choose language
                </div>
                <h3 className="mt-3 text-3xl font-semibold">{language}</h3>
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

            <h3 className="mt-4 text-4xl font-semibold leading-tight">
              Living ecosystem overview
            </h3>

            <p className="mt-5 text-lg leading-9 text-emerald-50/82">
              This living farm ecosystem is designed to help guests, customers,
              growers, youth, supervisors, parents, volunteers, partners, and
              families move toward food self-sufficiency, economic opportunity,
              practical wellness, and stronger community connection.
            </p>

            <div className="mt-6 space-y-4">
              {overviewItems.map((item) => (
                <GlassCard key={item.title} className="p-5">
                  <h4 className="text-2xl font-semibold">{item.title}</h4>
                  <p className="mt-3 text-base leading-8 text-emerald-50/80">
                    {item.text}
                  </p>
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

function RolePathwaysScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [activePathway, setActivePathway] = useState<PathwayKey>("youth");
  const pathway = pathwayData[activePathway];

  return (
    <EcosystemShell screen="roles" setScreen={setScreen}>
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.45fr]">
        <GlassCard className="p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
            Connected ecosystem movement
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Role Pathways
          </h1>
          <p className="mt-5 text-lg leading-9 text-emerald-50/85">
            Each role is a living journey. The viewer enters a pathway,
            understands the need being met, sees the daily experience, follows
            where food and activity move, makes an ending decision, and continues
            through the ecosystem.
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
                <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/65">
                  Pathway
                </div>
                <div className="mt-1 text-2xl font-semibold">{pathwayData[key].label}</div>
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
              Current journey
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {pathway.title}
            </h2>
            <p className="mt-4 text-2xl leading-9 text-emerald-100/90">
              {pathway.subtitle}
            </p>
            <p className="mt-5 text-lg leading-9 text-emerald-50/85">
              {pathway.need}
            </p>
          </GlassCard>

          <div className="grid gap-6 xl:grid-cols-2">
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Experience this pathway
              </div>
              <div className="mt-5 space-y-3">
                {pathway.experience.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-8 text-emerald-50/85">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Daily rhythm
              </div>
              <div className="mt-5 space-y-3">
                {pathway.rhythm.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-base leading-8 text-emerald-50/85">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {pathway.foodFlow && (
            <GlassCard className="p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Where the food goes
              </div>
              <h3 className="mt-3 text-3xl font-semibold">
                Grow → Harvest → Prepare → Distribute → Nourish
              </h3>
              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {pathway.foodFlow.map((step) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-sm leading-6 text-emerald-50/90">
                    {step}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-emerald-50/85">
                The food youth and growers help produce is not symbolic. It is
                connected to the marketplace, schools, families, events, and
                other community destinations.
              </p>
            </GlassCard>
          )}

          <div className="grid gap-6 xl:grid-cols-3">
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Live ecosystem layer
              </div>
              <div className="mt-5 space-y-3">
                {pathway.live.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-7">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Ending decision
              </div>
              <div className="mt-5 space-y-3">
                {pathway.decisions.map((decision) => (
                  <button key={decision} className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-base hover:bg-emerald-400/15">
                    {decision}
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Continue your journey
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {pathway.next.map((nextKey) => (
                  <PillButton key={nextKey} onClick={() => setActivePathway(nextKey)}>
                    {pathwayData[nextKey].label}
                  </PillButton>
                ))}
              </div>
              <div className="mt-7 text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Feedback / comments
              </div>
              <p className="mt-3 text-base leading-8 text-emerald-50/85">
                {pathway.reflection}
              </p>
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

function EventsScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <PlaceholderDestination
      title="Events & Experiences"
      description="Events create visibility, trust, learning, marketplace movement, school/community connections, partner engagement, and community voice."
      setScreen={setScreen}
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
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">
            {item}
          </GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

function NutritionScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <PlaceholderDestination
      title="Health & Nutrition"
      description="Food grown through the ecosystem becomes wellness for families, schools, youth-serving destinations, marketplace customers, and the wider community."
      setScreen={setScreen}
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
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">
            {item}
          </GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

function MarketplaceScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <PlaceholderDestination
      title="Marketplace"
      description="The marketplace connects growing, learning, purchasing, schools, community destinations, and local economic activity."
      setScreen={setScreen}
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
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">
            {item}
          </GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("story");
  const [language, setLanguage] = useState<Language>("English");

  if (screen === "home" || screen === "story") {
    return (
      <HomeStoryScreen
        language={language}
        setLanguage={setLanguage}
        setScreen={setScreen}
      />
    );
  }

  if (screen === "roles") {
    return <RolePathwaysScreen setScreen={setScreen} />;
  }

  if (screen === "events") {
    return <EventsScreen setScreen={setScreen} />;
  }

  if (screen === "nutrition") {
    return <NutritionScreen setScreen={setScreen} />;
  }

  if (screen === "marketplace") {
    return <MarketplaceScreen setScreen={setScreen} />;
  }

  return null;
}
