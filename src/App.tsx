import React, { useMemo, useState } from "react";

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

const pathwayData: Record<
  PathwayKey,
  {
    label: string;
    title: string;
    purpose: string;
    experience: string[];
    foodFlow?: string[];
    decisions: string[];
    next: PathwayKey[];
    reflection: string;
  }
> = {
  guest: {
    label: "Guest",
    title: "Guest Experience",
    purpose:
      "Guests enter the farm to understand the land, the airport setting, the family legacy, and the community ecosystem being built.",
    experience: [
      "Arrive through an immersive farm entrance connected to the Historic Lansdowne Airport setting.",
      "Learn how land, food, education, workforce, wellness, and marketplace activity connect.",
      "See how Bronson Family Farm is more than a farm site — it is a living community destination.",
    ],
    decisions: [
      "Explore the Marketplace",
      "Attend an event",
      "Learn about Youth Workforce",
      "Become a volunteer",
      "Share feedback",
    ],
    next: ["marketplace", "youth", "grower"],
    reflection: "What part of the ecosystem made you want to learn more?",
  },
  customer: {
    label: "Customer",
    title: "Customer Experience",
    purpose:
      "Customers connect fresh food, nutrition, local purchasing, family wellness, and community-based food access.",
    experience: [
      "Explore seasonal produce, seedlings, Bubble Babies™, and value-added items.",
      "Understand how local purchasing supports youth, growers, and the wider ecosystem.",
      "Connect food choices to health, nutrition, schools, families, and community wellness.",
    ],
    foodFlow: [
      "Farm-grown food",
      "Marketplace access",
      "Families",
      "Schools",
      "Community destinations",
    ],
    decisions: [
      "Shop the Marketplace",
      "Preorder seasonal items",
      "Join a farm event",
      "Become a grower",
      "Share with family and friends",
    ],
    next: ["marketplace", "grower", "nutrition" as any],
    reflection: "How can fresh local food improve your family or community?",
  },
  youth: {
    label: "Youth Workforce",
    title: "Youth Workforce Journey",
    purpose:
      "Youth participate in a real food system. What they grow moves to the marketplace, schools, and community destinations.",
    experience: [
      "Check in with supervisors and begin the day with weather, safety, hydration, and motivation.",
      "Join cultivation teams for planting, weeding, watering, harvesting, composting, and site stewardship.",
      "Move through motivational activity blocks that replace passive screen time with teamwork, leadership, and hands-on challenges.",
      "Learn how harvests are prepared for the marketplace, schools, events, and community destinations.",
      "Build confidence through badges, reflection, daily feedback, and pathway advancement.",
    ],
    foodFlow: [
      "Youth grow food",
      "Harvest and wash/prep",
      "Marketplace inventory",
      "Schools and youth-serving destinations",
      "Families and community wellness",
    ],
    decisions: [
      "Complete enrollment",
      "Meet supervisors",
      "Explore leadership track",
      "Become a future mentor",
      "Continue to Grower Pathway",
    ],
    next: ["supervisor", "marketplace", "grower"],
    reflection:
      "How did today’s work help feed families, schools, marketplaces, or the community?",
  },
  grower: {
    label: "Grower",
    title: "Grower Pathway",
    purpose:
      "Growers receive knowledge, tools, market connection, and ecosystem support so local food production can expand.",
    experience: [
      "Learn companion planting, crop planning, seed starting, irrigation, harvest timing, and production basics.",
      "Connect to Bubble Babies™, grower education, demonstrations, and shared infrastructure.",
      "Move produce and products toward marketplace channels, schools, events, and community food access.",
    ],
    foodFlow: [
      "Grower production",
      "Farm support systems",
      "Marketplace",
      "Schools",
      "Community food access",
    ],
    decisions: [
      "Join the Grower Network",
      "Attend training",
      "Sell through Marketplace",
      "Mentor Youth Workforce",
      "Become a partner grower",
    ],
    next: ["marketplace", "partner", "youth"],
    reflection: "What would help you grow more successfully?",
  },
  marketplace: {
    label: "Marketplace",
    title: "Marketplace Pathway",
    purpose:
      "The marketplace is the economic engine that connects youth production, growers, customers, schools, and community destinations.",
    experience: [
      "View seasonal products, produce, seedlings, and value-added items.",
      "Understand how youth-grown and grower-produced food becomes inventory.",
      "Connect purchasing to nutrition, education, food access, and local economic activity.",
    ],
    foodFlow: [
      "Field production",
      "Harvest records",
      "Marketplace display",
      "Customer purchase",
      "Community impact",
    ],
    decisions: [
      "Shop the Marketplace",
      "Become a vendor",
      "Learn about SNAP access",
      "Support youth production",
      "Return to Ecosystem",
    ],
    next: ["customer", "grower", "partner"],
    reflection: "What products or services should the marketplace offer next?",
  },
  partner: {
    label: "Partner",
    title: "Partner Pathway",
    purpose:
      "Partners help strengthen infrastructure, youth workforce, school connections, food access, wellness, and community revitalization.",
    experience: [
      "Support youth workforce development and supervisor capacity.",
      "Help connect food production to schools, families, events, and community destinations.",
      "Invest in irrigation, storage, transportation, training, marketplace systems, and long-term growth.",
    ],
    decisions: [
      "Schedule a meeting",
      "Sponsor Youth Workforce",
      "Support food distribution",
      "Invest in infrastructure",
      "Become an ecosystem partner",
    ],
    next: ["youth", "marketplace", "grower"],
    reflection: "Where could your organization strengthen this ecosystem?",
  },
  supervisor: {
    label: "Supervisor",
    title: "Supervisor Mobile Tracking",
    purpose:
      "Supervisors guide youth teams, track attendance, confirm PPE, document growth, and help youth move through the ecosystem.",
    experience: [
      "Check attendance and assign youth to teams.",
      "Confirm PPE, hydration, safety, and readiness before work begins.",
      "Track task completion, teamwork, communication, leadership, and participation.",
      "Record observations from a phone while youth work in the field.",
      "Submit daily notes that support badges, parent updates, and final assessments.",
    ],
    decisions: [
      "Open daily attendance",
      "Complete PPE check",
      "Record youth observations",
      "Submit daily assessment",
      "Review pathway progress",
    ],
    next: ["youth", "parent", "partner"],
    reflection: "What support does this youth need to succeed tomorrow?",
  },
  parent: {
    label: "Parent / Guardian",
    title: "Parent & Guardian Connection",
    purpose:
      "Parents and guardians see progress, attendance, achievements, communication updates, and how youth are contributing to the community.",
    experience: [
      "View attendance and participation summaries.",
      "See badges, growth moments, leadership progress, and supervisor notes.",
      "Understand how youth work connects to food for the marketplace, schools, and community destinations.",
      "Receive communication about events, milestones, and next opportunities.",
    ],
    decisions: [
      "View youth progress",
      "Read supervisor update",
      "Submit comment",
      "Attend farm event",
      "Support next pathway",
    ],
    next: ["youth", "marketplace", "partner"],
    reflection: "What growth have you noticed in your youth?",
  },
};

function Navigation({
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
      <PillButton
        onClick={() => setScreen("nutrition")}
        active={screen === "nutrition"}
      >
        Health &amp; Nutrition
      </PillButton>
      <PillButton
        onClick={() => setScreen("marketplace")}
        active={screen === "marketplace"}
      >
        Go to Marketplace
      </PillButton>
    </div>
  );
}

function EcosystemShell({
  children,
  setScreen,
  screen,
}: {
  children: React.ReactNode;
  setScreen: (screen: Screen) => void;
  screen: Screen;
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
        <Navigation screen={screen} setScreen={setScreen} />
        {children}
      </div>
    </div>
  );
}

function RolePathwaysScreen({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
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
            Each pathway is a real journey through the Bronson Family Farm
            ecosystem. Viewers do not just read information — they understand
            where they fit, what they experience, where food moves, and what
            decision comes next.
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
                <div className="text-sm uppercase tracking-[0.22em] text-emerald-100/70">
                  Pathway
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  {pathwayData[key].label}
                </div>
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

            <p className="mt-5 text-lg leading-9 text-emerald-50/85">
              {pathway.purpose}
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {pathway.experience.map((item) => (
                <GlassCard key={item} className="p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/65">
                    Experience
                  </div>
                  <p className="mt-3 text-base leading-8 text-emerald-50/82">
                    {item}
                  </p>
                </GlassCard>
              ))}
            </div>
          </GlassCard>

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
                  <div
                    key={step}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-sm leading-6"
                  >
                    {step}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-emerald-50/85">
                What youth and growers produce strengthens the marketplace,
                schools, families, community events, and other food destinations.
              </p>
            </GlassCard>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Ending decision
              </div>
              <div className="mt-4 grid gap-3">
                {pathway.decisions.map((decision) => (
                  <button
                    key={decision}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-base hover:bg-emerald-400/15"
                  >
                    {decision}
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Continue your journey
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {pathway.next.map((nextKey) => (
                  <PillButton
                    key={nextKey}
                    onClick={() => setActivePathway(nextKey)}
                  >
                    {pathwayData[nextKey].label}
                  </PillButton>
                ))}
              </div>

              <div className="mt-7 text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                Feedback / reflection
              </div>
              <p className="mt-3 text-lg leading-8 text-emerald-50/85">
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
        text: "The project restores land while creating food, education, and agritourism opportunity.",
      },
      {
        title: "Community future",
        text: "This is about more than a site. It is an ecosystem for long-term return and growth.",
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
            <PillButton onClick={() => setScreen("marketplace")}>
              Go to Marketplace
            </PillButton>
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
              Inspired by family farming traditions and shaped for Youngstown’s
              future, this farm brings together legacy, land restoration, food
              access, agritourism, workforce development, marketplace systems,
              schools, and practical community opportunity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton active>Start Guided Tour</PillButton>
              <PillButton onClick={() => setScreen("marketplace")}>
                Go to Marketplace
              </PillButton>
              <PillButton onClick={() => setScreen("roles")}>
                Open Role Pathways
              </PillButton>
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
                  Field prep, youth activity, harvest movement, school
                  destinations, event readiness, and marketplace coordination
                  are active.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">
                  Daily rhythm
                </div>
                <h3 className="mt-3 text-3xl font-semibold leading-tight">
                  Living schedule
                </h3>
                <p className="mt-3 text-base leading-8 text-emerald-50/80">
                  Arrival, motivation, team deployment, cultivation, harvest,
                  reflection, and marketplace exposure connect each day.
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
      </div>
    </div>
  );
}

function EventsScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <EcosystemShell screen="events" setScreen={setScreen}>
      <GlassCard className="p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
          Events & Experiences
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Events create visibility, trust, learning, and participation.
        </h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            "Growers Supply Market demonstrations",
            "Youth workforce showcases",
            "Nutrition, wellness, and food access education",
            "Community feedback and partner engagement",
            "Marketplace previews and seasonal product activity",
            "School, family, and community destination connections",
          ].map((item) => (
            <GlassCard key={item} className="p-5 text-lg leading-8">
              {item}
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </EcosystemShell>
  );
}

function NutritionScreen({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  return (
    <EcosystemShell screen="nutrition" setScreen={setScreen}>
      <GlassCard className="p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
          Health & Nutrition
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Food grown here becomes wellness for families, schools, and community.
        </h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            "Youth-grown food supports real destinations.",
            "Marketplace access connects families to fresh local produce.",
            "Schools and youth-serving destinations become part of the food system.",
            "Recipes, education, and demonstrations help turn produce into healthier choices.",
            "Growers and partners strengthen regional nutrition access.",
            "Community wellness grows through food, knowledge, and relationship.",
          ].map((item) => (
            <GlassCard key={item} className="p-5 text-lg leading-8">
              {item}
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </EcosystemShell>
  );
}

function MarketplaceScreen({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  return (
    <EcosystemShell screen="marketplace" setScreen={setScreen}>
      <GlassCard className="p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
          Marketplace
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          The marketplace connects growing, learning, purchasing, and community impact.
        </h1>

        <p className="mt-6 max-w-4xl text-lg leading-9 text-emerald-50/85">
          The marketplace receives produce and products from Bronson Family
          Farm, youth workforce activities, growers, value-added production, and
          seasonal ecosystem events. It connects customers to fresh food while
          helping support schools, families, community destinations, and future
          growers.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
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
            <GlassCard key={item} className="p-5 text-lg leading-8">
              {item}
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </EcosystemShell>
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
