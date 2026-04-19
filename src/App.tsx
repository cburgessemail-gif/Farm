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

function PlaceholderDestination({
  title,
  description,
  setScreen,
}: {
  title: string;
  description: string;
  setScreen: (screen: Screen) => void;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GrowArea.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-emerald-950/70 to-slate-900/80" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-10">
        <div className="mb-8 flex flex-wrap gap-3">
          <PillButton onClick={() => setScreen("home")}>Entrance</PillButton>
          <PillButton onClick={() => setScreen("story")}>Our Story</PillButton>
          <PillButton onClick={() => setScreen("roles")}>Role Pathways</PillButton>
          <PillButton onClick={() => setScreen("events")}>View Events</PillButton>
          <PillButton onClick={() => setScreen("nutrition")}>Health & Nutrition</PillButton>
          <PillButton onClick={() => setScreen("marketplace")}>Go to Marketplace</PillButton>
        </div>

        <GlassCard className="p-8 md:p-10">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
            Bronson Family Farm
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/85">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton onClick={() => setScreen("home")} active>
              Return to Entrance
            </PillButton>
            <PillButton onClick={() => setScreen("marketplace")}>
              Go to Marketplace
            </PillButton>
          </div>
        </GlassCard>
      </div>
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
            <PillButton onClick={() => setScreen("nutrition")}>Health &amp; Nutrition</PillButton>
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
              agritourism, and practical community opportunity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton active>Start Guided Tour</PillButton>
              <PillButton onClick={() => setScreen("marketplace")}>
                Go to Marketplace
              </PillButton>
              <PillButton onClick={() => setScreen("roles")}>
                Open Crop Planner
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
                  Field prep, seedling movement, event readiness, and seasonal coordination are active.
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
                  Seedlings, events, education, youth activities, and harvest pathways connect here.
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
              growers, youth, volunteers, partners, and families move toward
              food self-sufficiency, economic opportunity, practical wellness,
              and stronger community connection.
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
    return (
      <PlaceholderDestination
        title="Role Pathways"
        description="This area will help visitors understand how guests, customers, growers, youth, supervisors, and partners move through the ecosystem."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "events") {
    return (
      <PlaceholderDestination
        title="Events & Experiences"
        description="This area will show live events, demonstrations, gatherings, and the ways events create visibility, trust, and learning."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "nutrition") {
    return (
      <PlaceholderDestination
        title="Health & Nutrition"
        description="This area will connect natural food, recipes, healthier choices, and practical community wellness."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "marketplace") {
    return (
      <PlaceholderDestination
        title="Marketplace"
        description="This area will connect visitors to produce, seedlings, Bubble Babies™, and seasonal Bronson Family Farm offerings."
        setScreen={setScreen}
      />
    );
  }

  return null;
}
