import React, { useMemo, useState } from "react";

type Screen =
  | "home"
  | "marketplace"
  | "events"
  | "impact"
  | "tour"
  | "youth"
  | "story"
  | "nutrition"
  | "grow"
  | "partner"
  | "guest"
  | "customer"
  | "grower"
  | "supervisor"
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

function TopNav({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => setScreen("home")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md hover:bg-white/15"
      >
        Entrance
      </button>

      <button
        onClick={() => setScreen("marketplace")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md hover:bg-white/15"
      >
        Marketplace
      </button>

      <button
        onClick={() => setScreen("events")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md hover:bg-white/15"
      >
        Events
      </button>

      <button
        onClick={() => setScreen("story")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md hover:bg-white/15"
      >
        Story
      </button>

      <button
        onClick={() => setScreen("impact")}
        className="rounded-full border border-emerald-300/30 bg-emerald-400/20 px-5 py-3 text-sm font-medium backdrop-blur-md hover:bg-emerald-400/30"
      >
        Invest in Impact
      </button>
    </div>
  );
}

function EcosystemContributors() {
  const contributors = [
    {
      title: "Airport Association",
      role: "Foundational Place Partner",
      text: "Without their support and shared vision for land use, this ecosystem would not be unfolding in this way.",
    },
    {
      title: "Bronson Family Farm",
      role: "Land + Vision + Destination",
      text: "Transforms land into opportunity through food, experiences, restoration, and connection.",
    },
    {
      title: "Farm & Family Alliance",
      role: "Programs + Pathways + Impact",
      text: "Creates workforce development, education, food access, and community opportunity.",
    },
    {
      title: "Parker Farms",
      role: "Production + Marketplace + Supply",
      text: "Strengthens practical food systems, grower pathways, and distribution capacity.",
    },
    {
      title: "Jubilee Gardens, Inc.",
      role: "Seeds + Generosity + Growth",
      text: "Provided seeds to the farm and helps fuel new life, abundance, and expansion.",
    },
  ];

  return (
    <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl md:p-8">
      <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
        Who helps power the ecosystem
      </div>

      <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
        A network of contribution
      </h3>

      <p className="mt-4 max-w-4xl text-base leading-8 text-emerald-50/82">
        This is not one effort standing alone. The ecosystem is strengthened by land
        stewards, growers, nonprofit pathways, seed contributors, marketplace partners,
        and community builders working together.
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

            <p className="mt-3 text-sm leading-7 text-emerald-50/80">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
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
    <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl md:p-8">
      <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
        Seed story
      </div>

      <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
        Seeds move through the ecosystem
      </h3>

      <p className="mt-4 max-w-4xl text-base leading-8 text-emerald-50/82">
        Seeds are literal and symbolic. They represent food, ideas, youth potential,
        partnerships, healing land, and future opportunity.
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
    </section>
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
        ctaLabel: "Register",
        ctaType: "external",
        ctaTarget: "PASTE-YOUR-EXACT-EVENTBRITE-LINK-HERE",
        impactText:
          "Events create visibility, trust, and learning while bringing people into the ecosystem.",
        description:
          "Plants, tools, demonstrations, youth activities, food, and community experience.",
        status: "Active event",
      },
      {
        id: "marketplace",
        title: "Marketplace",
        subtitle: "Fresh produce, seedlings, and seasonal offerings.",
        dateText: "Shop online now",
        image: "/GrowArea.jpg",
        ctaLabel: "Shop",
        ctaType: "external",
        ctaTarget: "https://grownby.com/farms/bronson-family-farm/shop",
        impactText:
          "Marketplace activity creates access, repeat engagement, and support for growth.",
        description:
          "A real pathway into current Bronson Family Farm offerings.",
        status: "Open now",
      },
    ],
    []
  );

  return (
    <>
      <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
          Happening now
        </div>

        <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
          Flyers & Opportunities
        </h3>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {flyers.map((flyer) => (
            <div
              key={flyer.id}
              className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20"
            >
              <div className="relative h-64">
                <img
                  src={flyer.image}
                  alt={flyer.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>

              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                  {flyer.dateText}
                </div>

                <h4 className="mt-2 text-2xl font-semibold">{flyer.title}</h4>

                <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                  {flyer.subtitle}
                </p>

                <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
                    Why it matters
                  </div>

                  <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                    {flyer.impactText}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedFlyer(flyer)}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium"
                  >
                    View Flyer
                  </button>

                  {flyer.ctaType === "external" ? (
                    <a
                      href={flyer.ctaTarget}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                    >
                      {flyer.ctaLabel}
                    </a>
                  ) : (
                    <button
                      onClick={() => setScreen(flyer.ctaTarget as Screen)}
                      className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900"
                    >
                      {flyer.ctaLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedFlyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold">{selectedFlyer.title}</h3>

              <button
                onClick={() => setSelectedFlyer(null)}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>

            <img
              src={selectedFlyer.image}
              alt={selectedFlyer.title}
              className="mt-6 w-full rounded-[1.5rem] border border-white/10"
            />
          </div>
        </div>
      )}
    </>
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GrowArea.jpg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-emerald-950/65 to-slate-900/75" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 md:px-8 lg:px-10">
        <header className="mb-8">
          <div className="mb-3 text-xs uppercase tracking-[0.32em] text-emerald-100/75">
            Farm & Family Alliance Ecosystem Demo
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Bronson Family Farm
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-8 text-emerald-50/90 md:text-lg">
                This experience is designed to help visitors see possibility,
                understand connection, and discover where they want to belong.
              </p>
            </div>

            <TopNav setScreen={setScreen} />
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/8 p-7 shadow-2xl backdrop-blur-xl md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/80">
            Ecosystem entrance
          </div>

          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
            What interests you today?
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-emerald-50/85 md:text-lg">
            Bronson Family Farm is more than a farm. It is a connected ecosystem
            of food, learning, youth opportunity, wellness, partnership, and
            community renewal.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <a
              href="https://grownby.com/farms/bronson-family-farm/shop"
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Live now
              </div>

              <h3 className="mt-2 text-2xl font-semibold">Marketplace</h3>

              <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                Fresh produce, seedlings, Bubble Babies™, and seasonal offerings.
              </p>
            </a>

            <button
              onClick={() => setScreen("events")}
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-left"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Current activity
              </div>

              <h3 className="mt-2 text-2xl font-semibold">Events</h3>

              <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                Visibility, trust, learning, demonstrations, and real community gathering.
              </p>
            </button>

            <button
              onClick={() => setScreen("impact")}
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-left"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Support growth
              </div>

              <h3 className="mt-2 text-2xl font-semibold">Invest in Impact</h3>

              <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                Help grow food access, youth opportunity, restoration, and learning.
              </p>
            </button>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
              Choose language
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    language === lang
                      ? "bg-white text-slate-900"
                      : "border border-white/10 bg-white/10"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </section>

        <EcosystemContributors />
        <SeedStory />
        <FlyerWall setScreen={setScreen} />

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
            Continue the journey
          </div>

          <h3 className="mt-2 text-3xl font-semibold">
            You are welcome to enter wherever your interest begins.
          </h3>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setScreen("marketplace")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900"
            >
              Marketplace
            </button>

            <button
              onClick={() => setScreen("events")}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm"
            >
              Events
            </button>

            <button
              onClick={() => setScreen("impact")}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm"
            >
              Invest in Impact
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function PlaceholderScreen({
  title,
  description,
  setScreen,
}: {
  title: string;
  description: string;
  setScreen: (screen: Screen) => void;
}) {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="text-4xl font-semibold">{title}</h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
          {description}
        </p>

        <button
          onClick={() => setScreen("home")}
          className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-slate-900"
        >
          Back to Entrance
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [language, setLanguage] = useState("English");

  if (screen === "home") {
    return (
      <HomeScreen
        setScreen={setScreen}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <PlaceholderScreen
      title={screen}
      description="This destination will be expanded next into a full live experience."
      setScreen={setScreen}
    />
  );
}
