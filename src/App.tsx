import React, { useMemo, useState } from "react";

type Screen =
  | "home"
  | "tour"
  | "events"
  | "marketplace"
  | "impact"
  | "story"
  | "youth"
  | "nutrition"
  | "grow"
  | "partner"
  | "weather";

type FlyerItem = {
  id: string;
  title: string;
  subtitle: string;
  dateText: string;
  image: string;
  ctaLabel: string;
  ctaType: "screen" | "external";
  ctaTarget: string;
  impactText: string;
  description: string;
  status: string;
};

function AppShell({
  children,
  backgroundImage = "/GrowArea.jpg",
}: {
  children: React.ReactNode;
  backgroundImage?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.04]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/88 via-emerald-950/62 to-slate-900/82" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_35%)]" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function TopNav({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  const itemClass =
    "rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15";

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => setScreen("home")} className={itemClass}>
        Entrance
      </button>
      <button onClick={() => setScreen("tour")} className={itemClass}>
        Guided Tour
      </button>
      <button onClick={() => setScreen("events")} className={itemClass}>
        Events
      </button>
      <button onClick={() => setScreen("marketplace")} className={itemClass}>
        Marketplace
      </button>
      <button onClick={() => setScreen("story")} className={itemClass}>
        Story
      </button>
      <button
        onClick={() => setScreen("impact")}
        className="rounded-full border border-emerald-300/30 bg-emerald-400/20 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-emerald-400/30"
      >
        Invest in Impact
      </button>
    </div>
  );
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[2rem] border border-white/10 bg-white/8 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function EcosystemContributors() {
  const contributors = [
    {
      title: "Airport Association",
      role: "Foundational Place Partner",
      text: "Without the Airport Association, this conversation would not be happening in this way. Their support, stewardship, and openness to the vision helped make place possible.",
    },
    {
      title: "Bronson Family Farm",
      role: "Land + Vision + Destination",
      text: "Bronson Family Farm brings the visible destination to life through regenerative growing, farm experiences, storytelling, agritourism vision, and connection to the land.",
    },
    {
      title: "Farm & Family Alliance",
      role: "Programs + Pathways + Impact",
      text: "Farm & Family Alliance strengthens the ecosystem through workforce development, food access, community education, partnerships, and mission-driven impact.",
    },
    {
      title: "Parker Farms",
      role: "Production + Marketplace + Supply",
      text: "Parker Farms adds practical food system strength through growing capacity, supply, marketplace thinking, and real-world distribution pathways.",
    },
    {
      title: "Jubilee Gardens, Inc.",
      role: "Seeds + Generosity + Growth",
      text: "Jubilee Gardens has provided seeds to the farm, helping fuel new life, propagation, abundance, and the flow of growth through the ecosystem.",
    },
  ];

  return (
    <SectionCard className="mt-10 p-6 md:p-8">
      <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
        Who helps power the ecosystem
      </div>
      <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
        A network of contribution
      </h3>
      <p className="mt-4 max-w-4xl text-base leading-8 text-emerald-50/82">
        This ecosystem is not one effort standing alone. It is strengthened by land
        stewards, growers, nonprofit pathways, seed contributors, community
        builders, and marketplace partners working together.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contributors.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
              {item.role}
            </div>
            <h4 className="mt-2 text-2xl font-semibold">{item.title}</h4>
            <p className="mt-3 text-sm leading-7 text-emerald-50/80">{item.text}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SeedStory() {
  const steps = [
    "We give away seeds.",
    "We germinate seeds.",
    "We plant seeds.",
    "We grow seeds.",
    "We feed the ecosystem.",
  ];

  return (
    <SectionCard className="mt-10 p-6 md:p-8">
      <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
        Seed story
      </div>
      <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
        Seeds move through the ecosystem
      </h3>
      <p className="mt-4 max-w-4xl text-base leading-8 text-emerald-50/82">
        Seeds are literal and symbolic here. They represent food, generosity,
        future opportunity, youth potential, partnership, and growth moving through
        the system.
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {steps.map((step) => (
          <div
            key={step}
            className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-5 text-center text-sm font-medium backdrop-blur-md"
          >
            {step}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
        <p className="text-base leading-8 text-emerald-50/82">
          We grow more than food. We grow seeds of opportunity, learning, wellness,
          connection, and legacy.
        </p>
      </div>
    </SectionCard>
  );
}

function FlyerWall({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);

  const flyers = useMemo<FlyerItem[]>(
    () => [
      {
        id: "growers-supply-market",
        title: "Growers Supply Market",
        subtitle: "Step into the Farm. Experience Something Different.",
        dateText: "Saturday, May 16, 2026 • 9:00 AM – 2:00 PM",
        image: "/GrowersSupplyMarketUpdate.png",
        ctaLabel: "Register on Eventbrite",
        ctaType: "external",
        ctaTarget: "PASTE-YOUR-EXACT-EVENTBRITE-LINK-HERE",
        impactText:
          "Events create visibility, trust, and learning while bringing people into the ecosystem through real experience.",
        description:
          "Plants, tools, demonstrations, youth activities, food, partnership visibility, and community energy come together here.",
        status: "Active event",
      },
      {
        id: "marketplace",
        title: "Marketplace",
        subtitle: "Fresh produce, seedlings, Bubble Babies™, and seasonal offerings.",
        dateText: "Shop online now",
        image: "/GrowArea2.jpg",
        ctaLabel: "Open GrownBy Store",
        ctaType: "external",
        ctaTarget: "https://grownby.com/farms/bronson-family-farm/shop",
        impactText:
          "Marketplace activity creates access, repeat engagement, healthier choices, and practical support for the ecosystem.",
        description:
          "A real pathway into current Bronson Family Farm offerings and a direct connection between growing and community participation.",
        status: "Open now",
      },
      {
        id: "impact",
        title: "Invest in Impact",
        subtitle: "Support what is growing across food, youth, wellness, and opportunity.",
        dateText: "Ongoing support pathway",
        image: "/GrowArea.jpg",
        ctaLabel: "View Impact Options",
        ctaType: "screen",
        ctaTarget: "impact",
        impactText:
          "Support expands the ecosystem by strengthening food access, youth opportunity, land restoration, events, and learning.",
        description:
          "This is the place for funders, sponsors, and supporters to align with what matters most to them.",
        status: "Open opportunity",
      },
    ],
    []
  );

  return (
    <>
      <SectionCard className="mt-10 p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
              Happening now
            </div>
            <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
              Flyers & Opportunities
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-8 text-emerald-50/80">
              These flyers help the ecosystem feel real because they show movement,
              invitation, timing, and opportunities people can act on now.
            </p>
          </div>

          <button
            onClick={() => setScreen("events")}
            className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15"
          >
            View Activity
          </button>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {flyers.map((flyer) => (
            <div
              key={flyer.id}
              className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20 backdrop-blur-md"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={flyer.image}
                  alt={flyer.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-emerald-400/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-50">
                  {flyer.status}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                  {flyer.dateText}
                </div>
                <h4 className="mt-2 text-2xl font-semibold leading-tight">
                  {flyer.title}
                </h4>
                <p className="mt-2 text-base leading-7 text-emerald-50/82">
                  {flyer.subtitle}
                </p>

                <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
                    Why it matters to the ecosystem
                  </div>
                  <p className="mt-2 text-sm leading-7 text-emerald-50/82">
                    {flyer.impactText}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-7 text-emerald-50/76">
                  {flyer.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedFlyer(flyer)}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
                  >
                    View Flyer
                  </button>

                  {flyer.ctaType === "screen" ? (
                    <button
                      onClick={() => setScreen(flyer.ctaTarget as Screen)}
                      className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
                    >
                      {flyer.ctaLabel}
                    </button>
                  ) : (
                    <a
                      href={flyer.ctaTarget}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
                    >
                      {flyer.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {selectedFlyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 text-white shadow-2xl md:p-7">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                  Flyer preview
                </div>
                <h3 className="mt-2 text-3xl font-semibold">
                  {selectedFlyer.title}
                </h3>
                <p className="mt-2 max-w-3xl text-base leading-8 text-emerald-50/80">
                  {selectedFlyer.impactText}
                </p>
              </div>

              <button
                onClick={() => setSelectedFlyer(null)}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/15"
              >
                Close
              </button>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
              <img
                src={selectedFlyer.image}
                alt={selectedFlyer.title}
                className="w-full object-contain"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {selectedFlyer.ctaType === "screen" ? (
                <button
                  onClick={() => {
                    setSelectedFlyer(null);
                    setScreen(selectedFlyer.ctaTarget as Screen);
                  }}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
                >
                  {selectedFlyer.ctaLabel}
                </button>
              ) : (
                <a
                  href={selectedFlyer.ctaTarget}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
                >
                  {selectedFlyer.ctaLabel}
                </a>
              )}

              <button
                onClick={() => setSelectedFlyer(null)}
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/15"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AvailableNow() {
  const items = [
    "Spinach",
    "Collards",
    "Tomatoes",
    "Peppers",
    "Cabbage",
    "Bubble Babies™",
  ];

  return (
    <SectionCard className="mt-10 p-6 md:p-8">
      <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
        Available this week
      </div>
      <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
        What’s Available Now
      </h3>
      <p className="mt-3 max-w-3xl text-base leading-8 text-emerald-50/80">
        These offerings make the ecosystem tangible. They connect growing, food
        access, healthier choices, and repeat engagement.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-base font-medium"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <a
          href="https://grownby.com/farms/bronson-family-farm/shop"
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900"
        >
          Shop Current Offerings
        </a>
      </div>
    </SectionCard>
  );
}

function GuidedTourScreen({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  const steps = [
    {
      id: "welcome",
      title: "About the Farm",
      narration:
        "Bronson Family Farm is more than a farm. It is being developed as a regenerative place where food, learning, wellness, opportunity, and community connection grow together.",
      ecosystemWhy:
        "This matters because the farm is designed to respond to real needs: food access, healthier living, economic opportunity, youth pathways, land restoration, and renewed community connection.",
      visitScreen: "story" as Screen,
      visitLabel: "Visit Story",
      nextLabel: "Continue",
    },
    {
      id: "ecosystem",
      title: "About the Ecosystem",
      narration:
        "The ecosystem includes Bronson Family Farm, Farm & Family Alliance, Parker Farms, the Airport Association, and contributors such as Jubilee Gardens. Each brings a different strength.",
      ecosystemWhy:
        "The ecosystem works because it is collaborative. Land, programs, production, partnerships, seeds, and support move together instead of standing alone.",
      visitScreen: "impact" as Screen,
      visitLabel: "View Impact",
      nextLabel: "Continue",
    },
    {
      id: "events",
      title: "Events & Experiences",
      narration:
        "Events bring people onto the land and into the vision. They create visibility, trust, and learning through real participation.",
      ecosystemWhy:
        "Events matter because they turn curiosity into experience and help people feel what the ecosystem stands for.",
      visitScreen: "events" as Screen,
      visitLabel: "Visit Events",
      nextLabel: "Continue",
    },
    {
      id: "marketplace",
      title: "Food & Marketplace",
      narration:
        "Fresh produce, seedlings, Bubble Babies™, and seasonal offerings help people connect directly to what is being grown and shared.",
      ecosystemWhy:
        "Marketplace activity creates access, healthier choices, and repeat engagement while helping the ecosystem stay active and visible.",
      visitScreen: "marketplace" as Screen,
      visitLabel: "Visit Marketplace",
      nextLabel: "Continue",
    },
    {
      id: "youth",
      title: "Youth Opportunities",
      narration:
        "Youth pathways are about more than tasks. They are about confidence, leadership, responsibility, practical learning, and future possibility.",
      ecosystemWhy:
        "Youth matter to the ecosystem because they carry forward its future strength, energy, and leadership.",
      visitScreen: "youth" as Screen,
      visitLabel: "Visit Youth",
      nextLabel: "Continue",
    },
    {
      id: "summary",
      title: "Bringing It Together",
      narration:
        "Bronson Family Farm is being built to grow more than food. It is being built to grow access, learning, opportunity, wellness, connection, and legacy.",
      ecosystemWhy:
        "You do not have to enter one way. Visitors can connect through food, events, wellness, youth pathways, story, partnership, or support. Each part strengthens the larger whole.",
      visitScreen: "home" as Screen,
      visitLabel: "Return to Entrance",
      nextLabel: "Finish",
    },
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  return (
    <AppShell backgroundImage="/GrowArea2.jpg">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 lg:px-10">
        <SectionCard className="p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
            Guided tour
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {steps.map((item, index) => (
              <div
                key={item.id}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] ${
                  index === stepIndex
                    ? "bg-white text-slate-900"
                    : "border border-white/10 bg-white/10 text-white"
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>

          <h1 className="mt-6 text-4xl font-semibold md:text-5xl">
            {step.title}
          </h1>

          <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
              Narration
            </div>
            <p className="mt-3 text-lg leading-8 text-white/85">
              {step.narration}
            </p>
          </div>

          <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
              Why it matters to the ecosystem
            </div>
            <p className="mt-3 text-base leading-8 text-white/80">
              {step.ecosystemWhy}
            </p>
          </div>

          {!isLast ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setScreen(step.visitScreen)}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                {step.visitLabel}
              </button>
              <button
                onClick={() => setStepIndex((prev) => prev + 1)}
                className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium"
              >
                {step.nextLabel}
              </button>
              <button
                onClick={() => setScreen("home")}
                className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium"
              >
                Return to Entrance
              </button>
            </div>
          ) : (
            <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-black/20 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Where next
              </div>
              <h2 className="mt-3 text-2xl font-semibold">
                You are welcome to enter wherever your interest begins.
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setScreen("marketplace")}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900"
                >
                  Marketplace
                </button>
                <button
                  onClick={() => setScreen("events")}
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
                >
                  Events
                </button>
                <button
                  onClick={() => setScreen("youth")}
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
                >
                  Youth
                </button>
                <button
                  onClick={() => setScreen("impact")}
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
                >
                  Invest in Impact
                </button>
                <button
                  onClick={() => setScreen("home")}
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
                >
                  Return to Entrance
                </button>
              </div>
            </div>
          )}

          {stepIndex > 0 && !isLast && (
            <div className="mt-4">
              <button
                onClick={() => setStepIndex((prev) => prev - 1)}
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
              >
                Previous Step
              </button>
            </div>
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}

function HomeScreen({
  setScreen,
  language,
  setLanguage,
}: {
  setScreen: (screen: Screen) => void;
  language: string;
  setLanguage: (language: string) => void;
}) {
  const languages = ["English", "Español", "Tagalog", "Italiano", "Patwa", "Hebrew"];

  return (
    <AppShell backgroundImage="/GrowArea.jpg">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8 lg:px-10">
        <header className="mb-8">
          <div className="mb-3 text-xs uppercase tracking-[0.32em] text-emerald-100/75">
            Farm & Family Alliance Ecosystem Demo
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Bronson Family Farm
              </h1>
              <p className="mt-3 max-w-4xl text-base leading-8 text-emerald-50/90 md:text-lg">
                This experience is designed to help visitors see possibility,
                understand connection, and discover where they want to belong
                within the ecosystem.
              </p>
            </div>

            <TopNav setScreen={setScreen} />
          </div>
        </header>

        <SectionCard className="p-7 md:p-10">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-emerald-100/80">
            Ecosystem entrance
          </div>

          <h2 className="max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            What interests you today?
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-emerald-50/85 md:text-lg">
            Bronson Family Farm is more than a farm. It is a connected ecosystem of
            food, learning, youth opportunity, wellness, partnership, and community
            renewal.
          </p>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
            <div className="text-sm uppercase tracking-[0.24em] text-emerald-100/75">
              What does that mean?
            </div>
            <p className="mt-3 text-base leading-8 text-emerald-50/85">
              It means the farm is being built to grow more than food. Through land,
              seeds, partnerships, programs, production, and experience, the ecosystem
              creates pathways for access, learning, healthier choices, opportunity,
              and connection.
            </p>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <a
              href="https://grownby.com/farms/bronson-family-farm/shop"
              target="_blank"
              rel="noreferrer"
              className="rounded-[
