import React, { useEffect, useMemo, useState } from "react";

type Screen =
  | "home"
  | "story"
  | "roles"
  | "events"
  | "nutrition"
  | "marketplace"
  | "supervisor"
  | "training"
  | "daily"
  | "report";

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
  | "parent"
  | "volunteer";

type YouthStatus = "Present" | "Absent" | "Late";
type PPEStatus = "Complete" | "Missing" | "Needs Check";

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

type YouthRecord = {
  id: number;
  name: string;
  team: string;
  attendance: YouthStatus;
  ppe: PPEStatus;
  task: string;
  participation: number;
  teamwork: number;
  safety: number;
  communication: number;
  leadership: number;
  note: string;
  badge: string;
};

type HarvestRecord = {
  crop: string;
  quantity: string;
  destination: string;
  team: string;
};

const backgroundImage = "/GrowArea.jpg";

const initialYouth: YouthRecord[] = [
  {
    id: 1,
    name: "Youth 01",
    team: "Cultivation Team",
    attendance: "Present",
    ppe: "Complete",
    task: "Watering and field check",
    participation: 4,
    teamwork: 4,
    safety: 5,
    communication: 4,
    leadership: 3,
    note: "Ready for morning assignment.",
    badge: "Safety Ready",
  },
  {
    id: 2,
    name: "Youth 02",
    team: "Harvest Team",
    attendance: "Present",
    ppe: "Needs Check",
    task: "Harvest prep",
    participation: 3,
    teamwork: 4,
    safety: 3,
    communication: 3,
    leadership: 3,
    note: "Confirm gloves before field work.",
    badge: "Team Contributor",
  },
  {
    id: 3,
    name: "Youth 03",
    team: "Marketplace Prep",
    attendance: "Late",
    ppe: "Complete",
    task: "Sorting and labeling",
    participation: 3,
    teamwork: 3,
    safety: 4,
    communication: 4,
    leadership: 4,
    note: "Good candidate for customer-facing practice.",
    badge: "Marketplace Explorer",
  },
  {
    id: 4,
    name: "Youth 04",
    team: "Stewardship Team",
    attendance: "Present",
    ppe: "Complete",
    task: "Compost and cleanup",
    participation: 5,
    teamwork: 5,
    safety: 5,
    communication: 4,
    leadership: 4,
    note: "Strong effort and focus.",
    badge: "Field Steward",
  },
];

const initialHarvest: HarvestRecord[] = [
  { crop: "Collard greens", quantity: "8 bunches", destination: "Marketplace", team: "Harvest Team" },
  { crop: "Tomato seedlings", quantity: "24 starts", destination: "Youth demonstration", team: "Cultivation Team" },
  { crop: "Mustard greens", quantity: "6 bunches", destination: "Community distribution", team: "Harvest Team" },
];

function PillButton({
  children,
  onClick,
  active = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-45 ${
        active
          ? "border-emerald-200/30 bg-emerald-400/20 text-white"
          : "border-white/10 bg-white/10 text-white hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

function BigTapButton({
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
      className={`min-h-[54px] rounded-2xl border p-4 text-left text-base font-semibold leading-6 transition ${
        active
          ? "border-emerald-200/50 bg-emerald-300/25"
          : "border-white/10 bg-white/10 hover:bg-white/15"
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs uppercase tracking-[0.26em] text-emerald-100/70">{children}</div>;
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
    rhythm: ["Welcome and orientation", "Ecosystem overview", "Pathway selection", "Feedback and next step"],
    live: ["Seasonal farm status", "Current event readiness", "Marketplace activity", "Community pathway interest"],
    decisions: ["Explore the Marketplace", "Attend an event", "Learn about Youth Workforce", "Become a volunteer", "Share feedback"],
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
    rhythm: ["View seasonal products", "Learn the food story", "Choose purchase or preorder", "Share with family and friends"],
    foodFlow: ["Youth and growers produce food", "Food is harvested and prepared", "Marketplace receives inventory", "Families, schools, and destinations are served"],
    live: ["Available products", "Harvest movement", "Marketplace readiness", "Nutrition education moments"],
    decisions: ["Shop the Marketplace", "Preorder seasonal items", "Join a farm event", "Become a grower", "Share with family and friends"],
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
    foodFlow: ["Youth grow food", "Harvest and wash/prep", "Marketplace inventory", "Schools and youth-serving destinations", "Families and community wellness"],
    live: ["Youth active today", "Attendance and PPE status", "Team assignments", "Harvest readiness", "Supervisor observations"],
    decisions: ["Complete enrollment", "Meet supervisors", "Explore leadership track", "Become a future mentor", "Continue to Grower Pathway"],
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
    rhythm: ["Assess growing needs", "Plan crops and timing", "Use farm knowledge and supplies", "Prepare for market and community destinations"],
    foodFlow: ["Grower production", "Farm support systems", "Marketplace", "Schools and events", "Community food access"],
    live: ["Grower interest", "Crop windows", "Supply needs", "Market readiness"],
    decisions: ["Join the Grower Network", "Attend training", "Sell through Marketplace", "Mentor Youth Workforce", "Become a partner grower"],
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
    rhythm: ["Harvest received", "Inventory prepared", "Products displayed or listed", "Customers and destinations served"],
    foodFlow: ["Field production", "Harvest records", "Marketplace display", "Customer purchase", "Community impact"],
    live: ["Product availability", "Preorder activity", "Vendor participation", "Destination demand"],
    decisions: ["Shop the Marketplace", "Become a vendor", "Learn about SNAP access", "Support youth production", "Return to Ecosystem"],
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
    rhythm: ["Identify shared mission", "Select support area", "Connect resources to pathway needs", "Track outcomes and impact"],
    live: ["Infrastructure needs", "Youth workforce support", "Event opportunities", "Community outcome tracking"],
    decisions: ["Schedule a meeting", "Sponsor Youth Workforce", "Support food distribution", "Invest in infrastructure", "Become an ecosystem partner"],
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
    rhythm: ["Morning roster and PPE check", "Team deployment and field observations", "Task completion and behavior notes", "End-of-day assessment and parent-ready summary"],
    live: ["Attendance count", "PPE completion", "Team locations", "Youth progress notes"],
    decisions: ["Open daily attendance", "Complete PPE check", "Record youth observations", "Submit daily assessment", "Review pathway progress"],
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
    rhythm: ["Daily participation summary", "Weekly progress update", "Achievement and badge review", "Family feedback and next opportunity"],
    live: ["Youth attendance", "Badges earned", "Supervisor update", "Upcoming events"],
    decisions: ["View youth progress", "Read supervisor update", "Submit comment", "Attend farm event", "Support next pathway"],
    next: ["youth", "marketplace", "partner", "guest"],
    reflection: "What growth have you noticed in your youth?",
  },
  volunteer: {
    label: "Volunteer",
    title: "Volunteer Pathway",
    subtitle: "Community members help the ecosystem move without needing to own every piece.",
    need: "Volunteers need clear tasks, a welcoming role, and a visible connection between their help and the food/workforce ecosystem.",
    experience: [
      "Support setup, planting, watering, cleanup, event flow, visitor welcome, or distribution.",
      "Work beside youth and growers while learning how the food system operates.",
      "Help the farm become a welcoming destination people want to return to.",
      "Share feedback and invite others into the ecosystem.",
    ],
    rhythm: ["Check in", "Receive task", "Serve with team", "Reflect and return"],
    foodFlow: ["Volunteer support", "Farm operations", "Harvest movement", "Marketplace and community", "Return and invite others"],
    live: ["Volunteer needs", "Event support", "Field support", "Community welcome"],
    decisions: ["Volunteer again", "Invite others", "Join an event", "Support youth", "Become a partner"],
    next: ["guest", "youth", "partner", "marketplace"],
    reflection: "Where did your volunteer service create the most visible help?",
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
      <PillButton onClick={() => setScreen("home")} active={screen === "home" || screen === "story"}>
        Entrance
      </PillButton>
      <PillButton onClick={() => setScreen("roles")} active={screen === "roles"}>
        Role Pathways
      </PillButton>
      <PillButton onClick={() => setScreen("daily")} active={screen === "daily"}>
        Daily Flow
      </PillButton>
      <PillButton onClick={() => setScreen("supervisor")} active={screen === "supervisor"}>
        Supervisor Phone
      </PillButton>
      <PillButton onClick={() => setScreen("training")} active={screen === "training"}>
        Training Mode
      </PillButton>
      <PillButton onClick={() => setScreen("report")} active={screen === "report"}>
        Daily Report
      </PillButton>
      <PillButton onClick={() => setScreen("events")} active={screen === "events"}>
        Events
      </PillButton>
      <PillButton onClick={() => setScreen("nutrition")} active={screen === "nutrition"}>
        Nutrition
      </PillButton>
      <PillButton onClick={() => setScreen("marketplace")} active={screen === "marketplace"}>
        Marketplace
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
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/86 via-emerald-950/72 to-slate-900/82" />
      <div className="absolute inset-0 bg-black/18" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-6 md:px-10 md:py-8">
        <NavBar screen={screen} setScreen={setScreen} />
        {children}
      </div>
    </div>
  );
}

function LiveEcosystemStrip({ youth }: { youth: YouthRecord[] }) {
  const present = youth.filter((y) => y.attendance === "Present").length;
  const ppeComplete = youth.filter((y) => y.ppe === "Complete").length;
  const items = [
    { label: "Live Weather", value: "Field conditions active" },
    { label: "Youth Present", value: `${present}/${youth.length} sample roster` },
    { label: "PPE Complete", value: `${ppeComplete}/${youth.length} ready` },
    { label: "Food Destinations", value: "Marketplace • Schools • Community" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <GlassCard key={item.label} className="p-5">
          <FieldLabel>{item.label}</FieldLabel>
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
  youth,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  setScreen: (screen: Screen) => void;
  youth: YouthRecord[];
}) {
  const languages: Language[] = ["English", "Español", "Tagalog", "Italiano", "Patwa", "Hebrew"];

  const overviewItems = useMemo(
    () => [
      {
        title: "Launch focus",
        text: "The ecosystem is now organized around the Youth Workforce launch: supervisor phones, daily flow, youth assessments, harvest movement, parent updates, and reporting.",
      },
      {
        title: "Supervisor action",
        text: "Supervisors check attendance, confirm PPE, assign teams, observe youth, log harvest, capture incidents, and submit a daily report.",
      },
      {
        title: "Youth purpose",
        text: "The food youth grow is connected to the marketplace, schools, families, and other community destinations so the work has meaning.",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-emerald-950/56 to-slate-900/72" />
      <div className="absolute inset-0 bg-black/12" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-6 md:px-10 md:py-8">
        <header className="mb-8">
          <div className="mb-3 text-sm uppercase tracking-[0.32em] text-emerald-100/75">
            Farm &amp; Family Alliance Ecosystem Demo
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Bronson Family Farm</h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("story")} active>
              Entrance
            </PillButton>
            <PillButton onClick={() => setScreen("roles")}>Role Pathways</PillButton>
            <PillButton onClick={() => setScreen("daily")}>Daily Workforce Flow</PillButton>
            <PillButton onClick={() => setScreen("supervisor")}>Supervisor Phone</PillButton>
            <PillButton onClick={() => setScreen("training")}>Training Mode</PillButton>
            <PillButton onClick={() => setScreen("report")}>Daily Report</PillButton>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/20 p-7 shadow-2xl backdrop-blur-xl md:p-10">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100/80">
              Launch ready ecosystem
            </div>

            <h2 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              Youth Workforce Operations Center
            </h2>

            <p className="mt-8 max-w-4xl text-xl leading-10 text-emerald-50/86">
              This version turns the ecosystem into a working launch tool for supervisors: daily check-in, PPE, team assignments, assessments, harvest logging, parent-ready updates, and end-of-day reports.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton onClick={() => setScreen("supervisor")} active>
                Open Supervisor Phone
              </PillButton>
              <PillButton onClick={() => setScreen("training")}>Train Supervisors</PillButton>
              <PillButton onClick={() => setScreen("roles")}>Open Role Pathways</PillButton>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <GlassCard className="p-5">
                <FieldLabel>June launch</FieldLabel>
                <h3 className="mt-3 text-3xl font-semibold leading-tight">8:00 AM field start</h3>
                <p className="mt-3 text-base leading-8 text-emerald-50/80">
                  Arrival, check-in, safety, assignments, motivation, field work, reflection, and closing documentation.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <FieldLabel>Supervisor ratio</FieldLabel>
                <h3 className="mt-3 text-3xl font-semibold leading-tight">15 youth per aide</h3>
                <p className="mt-3 text-base leading-8 text-emerald-50/80">
                  Phone-first tools keep supervisors focused on observation, safety, encouragement, and simple documentation.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <FieldLabel>Choose language</FieldLabel>
                <h3 className="mt-3 text-3xl font-semibold">{language}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        language === lang ? "bg-white text-slate-900" : "border border-white/10 bg-white/10 text-white hover:bg-white/15"
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
            <FieldLabel>Action layer</FieldLabel>
            <h3 className="mt-4 text-4xl font-semibold leading-tight">What supervisors do every day</h3>

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
          <LiveEcosystemStrip youth={youth} />
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
          <FieldLabel>Connected ecosystem movement</FieldLabel>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Role Pathways</h1>
          <p className="mt-5 text-lg leading-9 text-emerald-50/85">
            Each role is now a full journey: need, experience, daily rhythm, food movement, live layer, ending decision, feedback, and next pathway.
          </p>

          <div className="mt-8 grid gap-3">
            {(Object.keys(pathwayData) as PathwayKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActivePathway(key)}
                className={`rounded-2xl border p-4 text-left transition ${
                  activePathway === key ? "border-emerald-200/40 bg-emerald-400/20" : "border-white/10 bg-white/10 hover:bg-white/15"
                }`}
              >
                <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/65">Pathway</div>
                <div className="mt-1 text-2xl font-semibold">{pathwayData[key].label}</div>
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6 md:p-8">
            <FieldLabel>Current journey</FieldLabel>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{pathway.title}</h2>
            <p className="mt-4 text-2xl leading-9 text-emerald-100/90">{pathway.subtitle}</p>
            <p className="mt-5 text-lg leading-9 text-emerald-50/85">{pathway.need}</p>
          </GlassCard>

          <div className="grid gap-6 xl:grid-cols-2">
            <GlassCard className="p-6">
              <FieldLabel>Experience this pathway</FieldLabel>
              <div className="mt-5 space-y-3">
                {pathway.experience.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-8 text-emerald-50/85">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <FieldLabel>Daily rhythm</FieldLabel>
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
              <FieldLabel>Where the food goes</FieldLabel>
              <h3 className="mt-3 text-3xl font-semibold">Grow → Harvest → Prepare → Distribute → Nourish</h3>
              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {pathway.foodFlow.map((step) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-sm leading-6 text-emerald-50/90">
                    {step}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-emerald-50/85">
                The food youth and growers help produce is not symbolic. It is connected to the marketplace, schools, families, events, and other community destinations.
              </p>
            </GlassCard>
          )}

          <div className="grid gap-6 xl:grid-cols-3">
            <GlassCard className="p-6">
              <FieldLabel>Live ecosystem layer</FieldLabel>
              <div className="mt-5 space-y-3">
                {pathway.live.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-base leading-7">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <FieldLabel>Ending decision</FieldLabel>
              <div className="mt-5 space-y-3">
                {pathway.decisions.map((decision) => (
                  <button key={decision} className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-base hover:bg-emerald-400/15">
                    {decision}
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <FieldLabel>Continue your journey</FieldLabel>
              <div className="mt-5 flex flex-wrap gap-3">
                {pathway.next.map((nextKey) => (
                  <PillButton key={nextKey} onClick={() => setActivePathway(nextKey)}>
                    {pathwayData[nextKey].label}
                  </PillButton>
                ))}
              </div>
              <FieldLabel>Feedback / comments</FieldLabel>
              <p className="mt-3 text-base leading-8 text-emerald-50/85">{pathway.reflection}</p>
              <textarea className="mt-4 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none placeholder:text-white/45" placeholder="Share feedback, comments, or questions..." />
              <div className="mt-4 flex flex-wrap gap-2">
                <PillButton onClick={() => setScreen("supervisor")}>Supervisor Phone</PillButton>
                <PillButton onClick={() => setScreen("training")}>Training Mode</PillButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </EcosystemShell>
  );
}

function DailyFlowScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const flow = [
    { time: "8:00", title: "Arrival + Check-In", text: "Youth check in, supervisor confirms attendance, PPE, hydration, weather, and readiness." },
    { time: "8:15", title: "Motivational Opener", text: "Short proverb, daily purpose, phone-away focus, and team challenge." },
    { time: "8:30", title: "Team Assignment", text: "Cultivation, harvest, stewardship, irrigation, marketplace prep, or special project teams." },
    { time: "10:15", title: "Hydration + Observation", text: "Supervisor records quick scores for participation, teamwork, safety, and communication." },
    { time: "11:00", title: "Harvest / Inventory Movement", text: "Food is logged and connected to marketplace, schools, youth destinations, or community distribution." },
    { time: "1:30", title: "Reflection + Closing", text: "Youth reflect on what they produced, what they learned, and what pathway they may grow into next." },
  ];

  return (
    <EcosystemShell screen="daily" setScreen={setScreen}>
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
        <GlassCard className="p-6 md:p-8">
          <FieldLabel>Youth workforce day</FieldLabel>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Daily Workforce Flow</h1>
          <p className="mt-5 text-lg leading-9 text-emerald-50/85">
            This is the working rhythm supervisors teach and repeat. It keeps youth safe, focused, motivated, and connected to real ecosystem outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("supervisor")} active>Open Phone Workflow</PillButton>
            <PillButton onClick={() => setScreen("training")}>Practice Training</PillButton>
          </div>
        </GlassCard>

        <div className="grid gap-4">
          {flow.map((item) => (
            <GlassCard key={item.title} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="rounded-2xl border border-emerald-200/20 bg-emerald-300/15 px-5 py-3 text-2xl font-semibold">{item.time}</div>
                <div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-base leading-8 text-emerald-50/82">{item.text}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </EcosystemShell>
  );
}

function ScoreButtons({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          onClick={() => onChange(score)}
          className={`rounded-xl border px-3 py-3 text-center text-sm font-bold ${
            value === score ? "border-emerald-200/60 bg-emerald-300/25" : "border-white/10 bg-white/10 hover:bg-white/15"
          }`}
        >
          {score}
        </button>
      ))}
    </div>
  );
}

function SupervisorPhoneScreen({
  setScreen,
  youth,
  setYouth,
  harvest,
  setHarvest,
}: {
  setScreen: (screen: Screen) => void;
  youth: YouthRecord[];
  setYouth: React.Dispatch<React.SetStateAction<YouthRecord[]>>;
  harvest: HarvestRecord[];
  setHarvest: React.Dispatch<React.SetStateAction<HarvestRecord[]>>;
}) {
  const [selectedId, setSelectedId] = useState(youth[0]?.id ?? 1);
  const [activeTab, setActiveTab] = useState<"roster" | "assessment" | "harvest" | "incident">("roster");
  const selected = youth.find((item) => item.id === selectedId) ?? youth[0];

  const updateYouth = (id: number, patch: Partial<YouthRecord>) => {
    setYouth((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const addHarvest = () => {
    setHarvest((prev) => [
      ...prev,
      { crop: "New crop", quantity: "Enter amount", destination: "Marketplace", team: selected?.team ?? "Team" },
    ]);
  };

  const present = youth.filter((item) => item.attendance === "Present").length;
  const ppeReady = youth.filter((item) => item.ppe === "Complete").length;

  return (
    <EcosystemShell screen="supervisor" setScreen={setScreen}>
      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <GlassCard className="p-5 md:p-6">
          <FieldLabel>Supervisor phone</FieldLabel>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Tap → Observe → Save</h1>
          <p className="mt-5 text-base leading-8 text-emerald-50/84">
            This mobile layer trains supervisors to manage youth without heavy typing. Use large buttons, quick scores, short notes, and end-of-day summaries.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <GlassCard className="p-4">
              <FieldLabel>Present</FieldLabel>
              <div className="mt-2 text-3xl font-semibold">{present}</div>
            </GlassCard>
            <GlassCard className="p-4">
              <FieldLabel>PPE Ready</FieldLabel>
              <div className="mt-2 text-3xl font-semibold">{ppeReady}</div>
            </GlassCard>
          </div>

          <div className="mt-6 grid gap-3">
            <BigTapButton active={activeTab === "roster"} onClick={() => setActiveTab("roster")}>1. Roster / Attendance</BigTapButton>
            <BigTapButton active={activeTab === "assessment"} onClick={() => setActiveTab("assessment")}>2. Youth Assessment</BigTapButton>
            <BigTapButton active={activeTab === "harvest"} onClick={() => setActiveTab("harvest")}>3. Harvest Logging</BigTapButton>
            <BigTapButton active={activeTab === "incident"} onClick={() => setActiveTab("incident")}>4. Incident / Support Note</BigTapButton>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("training")}>Training Mode</PillButton>
            <PillButton onClick={() => setScreen("report")} active>Submit Report</PillButton>
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          {activeTab === "roster" && (
            <div>
              <FieldLabel>Morning check-in</FieldLabel>
              <h2 className="mt-3 text-3xl font-semibold">Roster, PPE, team, and task</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {youth.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => setSelectedId(person.id)}
                    className={`rounded-2xl border p-4 text-left transition ${selectedId === person.id ? "border-emerald-200/50 bg-emerald-300/20" : "border-white/10 bg-white/10 hover:bg-white/15"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xl font-semibold">{person.name}</div>
                        <div className="mt-1 text-sm text-emerald-50/70">{person.team}</div>
                      </div>
                      <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs">{person.attendance}</div>
                    </div>
                    <div className="mt-3 text-sm text-emerald-50/75">PPE: {person.ppe}</div>
                    <div className="mt-1 text-sm text-emerald-50/75">Task: {person.task}</div>
                  </button>
                ))}
              </div>

              {selected && (
                <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                  <h3 className="text-2xl font-semibold">Update {selected.name}</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <FieldLabel>Attendance</FieldLabel>
                      <div className="mt-2 grid gap-2">
                        {(["Present", "Late", "Absent"] as YouthStatus[]).map((status) => (
                          <BigTapButton key={status} active={selected.attendance === status} onClick={() => updateYouth(selected.id, { attendance: status })}>{status}</BigTapButton>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel>PPE</FieldLabel>
                      <div className="mt-2 grid gap-2">
                        {(["Complete", "Needs Check", "Missing"] as PPEStatus[]).map((status) => (
                          <BigTapButton key={status} active={selected.ppe === status} onClick={() => updateYouth(selected.id, { ppe: status })}>{status}</BigTapButton>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Task</FieldLabel>
                      <div className="mt-2 grid gap-2">
                        {["Watering", "Harvest", "Weeding", "Marketplace Prep"].map((task) => (
                          <BigTapButton key={task} active={selected.task.includes(task)} onClick={() => updateYouth(selected.id, { task })}>{task}</BigTapButton>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "assessment" && selected && (
            <div>
              <FieldLabel>Observation scoring</FieldLabel>
              <h2 className="mt-3 text-3xl font-semibold">{selected.name} assessment</h2>
              <p className="mt-3 text-base leading-8 text-emerald-50/78">Use quick 1–5 scores. Keep notes brief. The purpose is progress, not punishment.</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {[
                  ["Participation", "participation"],
                  ["Teamwork", "teamwork"],
                  ["Safety", "safety"],
                  ["Communication", "communication"],
                  ["Leadership", "leadership"],
                ].map(([label, key]) => (
                  <GlassCard key={key} className="p-4">
                    <FieldLabel>{label}</FieldLabel>
                    <div className="mt-3">
                      <ScoreButtons value={selected[key as keyof YouthRecord] as number} onChange={(value) => updateYouth(selected.id, { [key]: value } as Partial<YouthRecord>)} />
                    </div>
                  </GlassCard>
                ))}
              </div>
              <div className="mt-6">
                <FieldLabel>Quick note</FieldLabel>
                <textarea
                  value={selected.note}
                  onChange={(e) => updateYouth(selected.id, { note: e.target.value })}
                  className="mt-3 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none placeholder:text-white/45"
                />
              </div>
            </div>
          )}

          {activeTab === "harvest" && (
            <div>
              <FieldLabel>Harvest to marketplace / schools / community</FieldLabel>
              <h2 className="mt-3 text-3xl font-semibold">Harvest Logging</h2>
              <p className="mt-3 text-base leading-8 text-emerald-50/78">This makes youth work visible. Food grown today moves into real destinations.</p>
              <div className="mt-5 grid gap-3">
                {harvest.map((item, index) => (
                  <div key={`${item.crop}-${index}`} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="grid gap-3 md:grid-cols-4">
                      <input value={item.crop} onChange={(e) => setHarvest((prev) => prev.map((h, i) => i === index ? { ...h, crop: e.target.value } : h))} className="rounded-xl border border-white/10 bg-black/25 p-3 outline-none" />
                      <input value={item.quantity} onChange={(e) => setHarvest((prev) => prev.map((h, i) => i === index ? { ...h, quantity: e.target.value } : h))} className="rounded-xl border border-white/10 bg-black/25 p-3 outline-none" />
                      <input value={item.destination} onChange={(e) => setHarvest((prev) => prev.map((h, i) => i === index ? { ...h, destination: e.target.value } : h))} className="rounded-xl border border-white/10 bg-black/25 p-3 outline-none" />
                      <input value={item.team} onChange={(e) => setHarvest((prev) => prev.map((h, i) => i === index ? { ...h, team: e.target.value } : h))} className="rounded-xl border border-white/10 bg-black/25 p-3 outline-none" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <PillButton onClick={addHarvest} active>Add Harvest Record</PillButton>
              </div>
            </div>
          )}

          {activeTab === "incident" && (
            <div>
              <FieldLabel>Support, safety, or incident note</FieldLabel>
              <h2 className="mt-3 text-3xl font-semibold">Keep it simple and factual</h2>
              <div className="mt-5 grid gap-4">
                <input className="rounded-2xl border border-white/10 bg-black/25 p-4 outline-none" placeholder="Youth / team involved" />
                <textarea className="h-32 resize-none rounded-2xl border border-white/10 bg-black/25 p-4 outline-none" placeholder="What happened? What support was provided?" />
                <div className="grid gap-3 md:grid-cols-3">
                  <BigTapButton>Resolved</BigTapButton>
                  <BigTapButton>Needs Follow-Up</BigTapButton>
                  <BigTapButton>Notify Parent / Admin</BigTapButton>
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </section>
    </EcosystemShell>
  );
}

function TrainingModeScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const modules = [
    {
      title: "1. Open the day",
      steps: ["Log in on phone", "Open roster", "Confirm attendance", "Check PPE", "Review weather and hydration"],
    },
    {
      title: "2. Assign teams",
      steps: ["Cultivation", "Harvest", "Irrigation", "Stewardship", "Marketplace prep"],
    },
    {
      title: "3. Observe youth",
      steps: ["Participation", "Teamwork", "Safety", "Communication", "Leadership"],
    },
    {
      title: "4. Log harvest",
      steps: ["Crop", "Quantity", "Team", "Destination", "Marketplace/school/community movement"],
    },
    {
      title: "5. Close the day",
      steps: ["Review notes", "Submit report", "Prepare parent-ready update", "Identify tomorrow's support"],
    },
  ];

  return (
    <EcosystemShell screen="training" setScreen={setScreen}>
      <section className="grid gap-6 lg:grid-cols-[0.88fr_1.42fr]">
        <GlassCard className="p-6 md:p-8">
          <FieldLabel>Supervisor training mode</FieldLabel>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Practice Before Live Use</h1>
          <p className="mt-5 text-lg leading-9 text-emerald-50/85">
            Train supervisors inside the ecosystem. The goal is confidence: tap, observe, save, and submit. No supervisor should feel lost on launch morning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("supervisor")} active>Open Practice Phone</PillButton>
            <PillButton onClick={() => setScreen("daily")}>Review Daily Flow</PillButton>
            <PillButton onClick={() => setScreen("report")}>View Report</PillButton>
          </div>
        </GlassCard>

        <div className="grid gap-4">
          {modules.map((module) => (
            <GlassCard key={module.title} className="p-5">
              <h3 className="text-2xl font-semibold">{module.title}</h3>
              <div className="mt-4 grid gap-2 md:grid-cols-5">
                {module.steps.map((step) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-emerald-50/86">
                    {step}
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </EcosystemShell>
  );
}

function ReportScreen({
  setScreen,
  youth,
  harvest,
}: {
  setScreen: (screen: Screen) => void;
  youth: YouthRecord[];
  harvest: HarvestRecord[];
}) {
  const present = youth.filter((item) => item.attendance === "Present").length;
  const late = youth.filter((item) => item.attendance === "Late").length;
  const ppeReady = youth.filter((item) => item.ppe === "Complete").length;
  const avg = (key: keyof YouthRecord) => {
    const numbers = youth.map((item) => item[key]).filter((item): item is number => typeof item === "number");
    return numbers.length ? (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1) : "0.0";
  };

  return (
    <EcosystemShell screen="report" setScreen={setScreen}>
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
        <GlassCard className="p-6 md:p-8">
          <FieldLabel>End-of-day report</FieldLabel>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Supervisor Summary</h1>
          <p className="mt-5 text-lg leading-9 text-emerald-50/85">
            This screen converts daily activity into documentation: attendance, PPE, assessment averages, harvest movement, parent-ready notes, and tomorrow’s support needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("supervisor")} active>Edit Phone Records</PillButton>
            <PillButton onClick={() => window.print()}>Print / Save PDF</PillButton>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            {[{ label: "Present", value: present }, { label: "Late", value: late }, { label: "PPE Ready", value: ppeReady }, { label: "Harvest Logs", value: harvest.length }].map((item) => (
              <GlassCard key={item.label} className="p-5">
                <FieldLabel>{item.label}</FieldLabel>
                <div className="mt-3 text-4xl font-semibold">{item.value}</div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-6">
            <FieldLabel>Assessment averages</FieldLabel>
            <div className="mt-5 grid gap-4 md:grid-cols-5">
              {["participation", "teamwork", "safety", "communication", "leadership"].map((key) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                  <div className="text-sm capitalize text-emerald-50/70">{key}</div>
                  <div className="mt-2 text-3xl font-semibold">{avg(key as keyof YouthRecord)}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <FieldLabel>Harvest movement</FieldLabel>
            <div className="mt-4 grid gap-3">
              {harvest.map((item, index) => (
                <div key={`${item.crop}-${index}`} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-xl font-semibold">{item.crop} — {item.quantity}</div>
                  <div className="mt-1 text-sm text-emerald-50/75">{item.team} → {item.destination}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <FieldLabel>Parent-ready update</FieldLabel>
            <p className="mt-4 text-lg leading-8 text-emerald-50/84">
              Today youth participated in farm-based workforce development, safety routines, team assignments, cultivation/harvest activity, and reflection. Their work is connected to marketplace, schools, and community food destinations.
            </p>
          </GlassCard>
        </div>
      </section>
    </EcosystemShell>
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
        <FieldLabel>Bronson Family Farm</FieldLabel>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-emerald-50/85">{description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <PillButton onClick={() => setScreen("home")} active>Return to Entrance</PillButton>
          <PillButton onClick={() => setScreen("roles")}>Open Role Pathways</PillButton>
          <PillButton onClick={() => setScreen("supervisor")}>Supervisor Phone</PillButton>
        </div>
      </GlassCard>

      {children && <div className="mt-6">{children}</div>}
    </EcosystemShell>
  );
}

function EventsScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <PlaceholderDestination title="Events & Experiences" description="Events create visibility, trust, learning, marketplace movement, school/community connections, partner engagement, and community voice." setScreen={setScreen}>
      <div className="grid gap-5 md:grid-cols-3">
        {["Growers Supply Market demonstrations", "Youth workforce showcases", "Nutrition, wellness, and food access education", "Community feedback and partner engagement", "Marketplace previews and seasonal product activity", "School, family, and community destination connections"].map((item) => (
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">{item}</GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

function NutritionScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <PlaceholderDestination title="Health & Nutrition" description="Food grown through the ecosystem becomes wellness for families, schools, youth-serving destinations, marketplace customers, and the wider community." setScreen={setScreen}>
      <div className="grid gap-5 md:grid-cols-3">
        {["Youth-grown food supports real destinations.", "Marketplace access connects families to fresh local produce.", "Schools and youth-serving destinations become part of the food system.", "Recipes, education, and demonstrations help turn produce into healthier choices.", "Growers and partners strengthen regional nutrition access.", "Community wellness grows through food, knowledge, and relationship."].map((item) => (
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">{item}</GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

function MarketplaceScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <PlaceholderDestination title="Marketplace" description="The marketplace connects growing, learning, purchasing, schools, community destinations, and local economic activity." setScreen={setScreen}>
      <div className="grid gap-5 md:grid-cols-4">
        {["Youth-grown produce", "Grower products", "Bubble Babies™", "Seasonal harvest", "School destinations", "Community events", "Nutrition education", "Local purchasing"].map((item) => (
          <GlassCard key={item} className="p-5 text-lg leading-8 text-white">{item}</GlassCard>
        ))}
      </div>
    </PlaceholderDestination>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("story");
  const [language, setLanguage] = useState<Language>("English");
  const [youth, setYouth] = useState<YouthRecord[]>(initialYouth);
  const [harvest, setHarvest] = useState<HarvestRecord[]>(initialHarvest);

  useEffect(() => {
    document.title = "Bronson Family Farm Youth Workforce Ecosystem";
  }, []);

  if (screen === "home" || screen === "story") {
    return <HomeStoryScreen language={language} setLanguage={setLanguage} setScreen={setScreen} youth={youth} />;
  }

  if (screen === "roles") return <RolePathwaysScreen setScreen={setScreen} />;
  if (screen === "daily") return <DailyFlowScreen setScreen={setScreen} />;
  if (screen === "supervisor") return <SupervisorPhoneScreen setScreen={setScreen} youth={youth} setYouth={setYouth} harvest={harvest} setHarvest={setHarvest} />;
  if (screen === "training") return <TrainingModeScreen setScreen={setScreen} />;
  if (screen === "report") return <ReportScreen setScreen={setScreen} youth={youth} harvest={harvest} />;
  if (screen === "events") return <EventsScreen setScreen={setScreen} />;
  if (screen === "nutrition") return <NutritionScreen setScreen={setScreen} />;
  if (screen === "marketplace") return <MarketplaceScreen setScreen={setScreen} />;

  return null;
}
