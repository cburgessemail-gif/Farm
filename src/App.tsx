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
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
      >
        Entrance
      </button>
      <button
        onClick={() => setScreen("marketplace")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
      >
        Marketplace
      </button>
      <button
        onClick={() => setScreen("events")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
      >
        Events
      </button>
      <button
        onClick={() => setScreen("story")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
      >
        Story
      </button>
      <button
        onClick={() => setScreen("nutrition")}
        className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
      >
        Wellness
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
          "Events create visibility, trust, and learning. This event brings the ecosystem to life through plants, tools, demonstrations, local food, and family experiences.",
        description:
          "A live farm experience featuring grower supplies, healthy plants and seedlings, demonstrations, local food vendors, and youth activities.",
        status: "Active event",
      },
      {
        id: "marketplace",
        title: "Marketplace",
        subtitle: "Fresh food, seedlings, and seasonal offerings.",
        dateText: "Shop Bronson Family Farm online",
        image: "/GrowArea.jpg",
        ctaLabel: "Open GrownBy Store",
        ctaType: "external",
        ctaTarget: "https://grownby.com/farms/bronson-family-farm/shop",
        impactText:
          "Marketplace activity creates food access, repeat engagement, and direct support for the larger ecosystem.",
        description:
          "This is a real pathway into Bronson Family Farm offerings, including produce, seedlings, and seasonal availability.",
        status: "Open now",
      },
      {
        id: "youth-pathway",
        title: "Youth Workforce Pathway",
        subtitle: "Learning, responsibility, leadership, and opportunity.",
        dateText: "Pathways open for exploration",
        image: "/GrowArea2.jpg",
        ctaLabel: "Explore Youth",
        ctaType: "screen",
        ctaTarget: "youth",
        impactText:
          "Youth pathways build future leadership, practical workforce experience, and stronger long-term community participation.",
        description:
          "This pathway helps visitors understand how youth engage in work-based learning, support, and real ecosystem participation.",
        status: "Open pathway",
      },
      {
        id: "invest-in-impact",
        title: "Invest in Impact",
        subtitle: "Support food, youth, wellness, restoration, and opportunity.",
        dateText: "Ongoing support opportunity",
        image: "/GrowArea.jpg",
        ctaLabel: "View Impact Options",
        ctaType: "screen",
        ctaTarget: "impact",
        impactText:
          "Support expands capacity across food access, youth opportunity, events, learning, and land restoration.",
        description:
          "This pathway helps visitors, sponsors, and funders support what matters most to them within the ecosystem.",
        status: "Open opportunity",
      },
    ],
    []
  );

  return (
    <>
      <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
              Happening now
            </div>
            <h3 className="mt-2 text-3xl font-semibold md:text-4xl">
              Flyers & Opportunities
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-8 text-emerald-50/80">
              These flyers bring the ecosystem to life by showing real activity,
              real invitations, and real opportunities people can act on now.
            </p>
          </div>

          <button
            onClick={() => setScreen("events")}
            className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15"
          >
            View All Activity
          </button>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {flyers.map((flyer) => (
            <div
              key={flyer.id}
              className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20 backdrop-blur-md"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={flyer.image}
                  alt={flyer.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/15 to-transparent" />
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
      </section>

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
    <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl">
      <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
        Available this week
      </div>
      <h3 className="mt-2 text-3xl font-semibold">What’s Available Now</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}

function HomeScreen({
  setScreen,
  language,
  setLanguage,
  weatherText = "44°F · Cloudy · Youngstown",
}: {
  setScreen: (screen: Screen) => void;
  language: string;
  setLanguage: (language: string) => void;
  weatherText?: string;
}) {
  const languages = ["English", "Español", "Tagalog", "Italiano", "Patwa", "Hebrew"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GrowArea.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-emerald-950/65 to-slate-900/75" />
      <div className="absolute inset-0 bg-black/20" />

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
              <p className="mt-3 max-w-3xl text-base leading-7 text-emerald-50/90 md:text-lg">
                This experience is designed to help you see possibility,
                understand connection, and discover where you want to belong
                within the ecosystem.
              </p>
            </div>

            <TopNav setScreen={setScreen} />
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/8 p-7 shadow-2xl backdrop-blur-xl md:p-10">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-emerald-100/80">
            Ecosystem entrance
          </div>

          <h2 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            What interests you today?
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-emerald-50/85 md:text-lg">
            Bronson Family Farm is more than a farm. It is a connected ecosystem
            of food, learning, wellness, events, youth opportunity, and community support.
          </p>

          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
            <div className="text-sm uppercase tracking-[0.24em] text-emerald-100/75">
              What does that mean?
            </div>
            <p className="mt-3 text-base leading-8 text-emerald-50/85">
              It means each part of the farm strengthens another part. Events create visibility,
              trust, and learning. Marketplace activity creates access and repeat engagement.
              Youth opportunities build future leadership. Support expands what becomes possible.
            </p>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <a
              href="https://grownby.com/farms/bronson-family-farm/shop"
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-left backdrop-blur-md transition hover:bg-white/15"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Live now
              </div>
              <h3 className="mt-2 text-2xl font-semibold">Shop Fresh Food</h3>
              <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                Enter the Bronson Family Farm GrownBy marketplace and view current offerings.
              </p>
            </a>

            <a
              href="PASTE-YOUR-EXACT-EVENTBRITE-LINK-HERE"
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-left backdrop-blur-md transition hover:bg-white/15"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Register
              </div>
              <h3 className="mt-2 text-2xl font-semibold">Growers Supply Market</h3>
              <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                Reserve your place for the May 16 experience at Bronson Family Farm.
              </p>
            </a>

            <button
              onClick={() => setScreen("impact")}
              className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-left backdrop-blur-md transition hover:bg-white/15"
            >
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Support
              </div>
              <h3 className="mt-2 text-2xl font-semibold">Invest in Impact</h3>
              <p className="mt-2 text-sm leading-7 text-emerald-50/80">
                Support youth opportunity, food access, events, restoration, and ecosystem growth.
              </p>
            </button>
          </section>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Guided experience
              </div>
              <h3 className="mt-2 text-3xl font-semibold">
                See possibility. Understand connection.
              </h3>
              <p className="mt-3 text-base leading-8 text-emerald-50/82">
                The goal of this experience is not just to inform. It is to help people
                see possibility, understand connection, and discover where they want to belong
                within the ecosystem.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setScreen("tour")}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
                >
                  Start Guided Tour
                </button>
                <button
                  onClick={() => setScreen("events")}
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/15"
                >
                  See What’s Happening
                </button>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                Live today
              </div>
              <div className="mt-3 space-y-3">
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Youngstown Weather</div>
                  <div className="mt-1 text-sm text-emerald-50/80">{weatherText}</div>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Next Event</div>
                  <div className="mt-1 text-sm text-emerald-50/80">
                    Growers Supply Market • May 16, 2026
                  </div>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Recipe of the Week</div>
                  <div className="mt-1 text-sm text-emerald-50/80">
                    Fresh greens, herbs, and simple healthy meal ideas.
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                  Choose language
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
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
              </div>
            </div>
          </div>
        </section>

        <AvailableNow />
        <FlyerWall setScreen={setScreen} />

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl md:p-8">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
            Continue the journey
          </div>
          <h3 className="mt-2 text-3xl font-semibold">
            Now that you’ve explored, where would you like to return or visit next?
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
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
            >
              Events
            </button>
            <button
              onClick={() => setScreen("youth")}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
            >
              Youth Opportunities
            </button>
            <button
              onClick={() => setScreen("nutrition")}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
            >
              Wellness
            </button>
            <button
              onClick={() => setScreen("impact")}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
            >
              Invest in Impact
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ImpactScreen({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  const options = [
    {
      title: "Youth Opportunities",
      text: "Support workforce development, leadership, mentoring, and hands-on learning.",
    },
    {
      title: "Food Access",
      text: "Help expand healthier local food pathways for families and community members.",
    },
    {
      title: "Land Restoration",
      text: "Support regenerative growing, infrastructure, equipment, irrigation, and restoration.",
    },
    {
      title: "Events & Experiences",
      text: "Help bring the ecosystem to life through markets, demonstrations, tours, and gatherings.",
    },
    {
      title: "Wellness & Nutrition",
      text: "Support healthier food education, recipes, and practical community wellness learning.",
    },
    {
      title: "General Ecosystem Growth",
      text: "Strengthen the full connected system of food, learning, youth, wellness, and opportunity.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
            Invest in impact
          </div>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
            Help grow what matters most
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
            This ecosystem is designed to help people see possibility, understand connection,
            and discover where they want to belong. Your support helps turn that possibility
            into real access, learning, visibility, and opportunity.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {options.map((option) => (
              <div
                key={option.title}
                className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5"
              >
                <h3 className="text-2xl font-semibold">{option.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/80">{option.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:cburgess@bronsonfamilyfarm.com?subject=Invest%20in%20Impact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Contact to Support
            </a>
            <a
              href="https://www.bronsonfamilyfarm.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium"
            >
              Visit Website
            </a>
            <button
              onClick={() => setScreen("home")}
              className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium"
            >
              Back to Entrance
            </button>
          </div>
        </div>
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
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{description}</p>
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
        weatherText="44°F · Cloudy · Youngstown"
      />
    );
  }

  if (screen === "impact") {
    return <ImpactScreen setScreen={setScreen} />;
  }

  if (screen === "events") {
    return (
      <PlaceholderScreen
        title="Events & Experiences"
        description="This area will show current events, registrations, demonstrations, community gatherings, and ecosystem experiences."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "marketplace") {
    return (
      <PlaceholderScreen
        title="Marketplace"
        description="This area connects visitors to fresh food, seedlings, Bubble Babies™, and Bronson Family Farm offerings."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "tour") {
    return (
      <PlaceholderScreen
        title="Guided Tour"
        description="This area will guide visitors through the ecosystem and help them understand where they want to visit next."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "youth") {
    return (
      <PlaceholderScreen
        title="Youth Workforce Pathway"
        description="This area explains youth workforce opportunities, support structures, leadership development, and ecosystem participation."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "story") {
    return (
      <PlaceholderScreen
        title="Story Behind the Farm"
        description="This area shares the family legacy, restoration vision, and deeper purpose behind Bronson Family Farm."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "nutrition") {
    return (
      <PlaceholderScreen
        title="Health & Nutrition"
        description="This area will feature recipes, practical wellness learning, healthier food choices, and nutrition guidance."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "grow") {
    return (
      <PlaceholderScreen
        title="Learn to Grow"
        description="This area will include growing guidance, crop planning, and seasonal learning tools."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "partner") {
    return (
      <PlaceholderScreen
        title="Volunteer / Partner"
        description="This area will show collaboration, sponsorship, service, and ecosystem partnership pathways."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "guest") {
    return (
      <PlaceholderScreen
        title="Guest Pathway"
        description="This pathway will help curious visitors understand the ecosystem and explore meaningful next steps."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "customer") {
    return (
      <PlaceholderScreen
        title="Customer Pathway"
        description="This pathway will help customers shop, learn about offerings, and connect food choices to the larger ecosystem."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "grower") {
    return (
      <PlaceholderScreen
        title="Grower Pathway"
        description="This pathway will support growers with planning, learning, and ecosystem participation."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "supervisor") {
    return (
      <PlaceholderScreen
        title="Supervisor Pathway"
        description="This pathway will support youth workforce supervision, structure, and connected support roles."
        setScreen={setScreen}
      />
    );
  }

  if (screen === "weather") {
    return (
      <PlaceholderScreen
        title="Weather & Conditions"
        description="This area will show local weather, seasonal context, and farm-related conditions."
        setScreen={setScreen}
      />
    );
  }

  return (
    <PlaceholderScreen
      title="Bronson Family Farm"
      description="Return to the home experience to continue exploring the ecosystem."
      setScreen={setScreen}
    />
  );
}
