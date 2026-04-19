import React, { useMemo, useState } from "react";

function HomeScreen({
  setScreen,
  language,
  setLanguage,
  weatherText = "44°F · Cloudy · Youngstown",
}: {
  setScreen: (screen: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  weatherText?: string;
}) {
  const areas = useMemo(
    () => [
      {
        id: "marketplace-info",
        title: "Fresh Food & Marketplace",
        summary:
          "Buy fresh produce, seedlings, and farm-grown items connected to the Bronson ecosystem.",
        why:
          "This matters if you want healthier food choices, seasonal products, and a direct connection to local growing.",
        enterLabel: "Enter Marketplace",
        screen: "marketplace",
        icon: "🛒",
        details: {
          whatItIs:
            "This is the shopping and food access part of the ecosystem. It connects people to produce, seedlings, Bubble Babies™, and other farm-based offerings.",
          whoItsFor:
            "Customers, families, community members, schools, and anyone looking for fresh food or seasonal growing items.",
          howItConnects:
            "Marketplace activity supports the broader ecosystem by connecting the farm, growers, customers, and community learning around healthy food.",
          whatYouCanDo:
            "Shop available items, learn what is in season, explore food options, and return for new offerings over time.",
        },
      },
      {
        id: "grow-info",
        title: "Learn to Grow",
        summary:
          "Find seasonal growing guidance, crop planning help, and practical growing knowledge.",
        why:
          "This matters if you want to garden, farm, teach, improve food access, or understand how growing works in real life.",
        enterLabel: "Open Grower Tools",
        screen: "grow",
        icon: "🌱",
        details: {
          whatItIs:
            "This is the learning and growing part of the ecosystem. It helps people understand what to plant, when to plant, and how to improve success.",
          whoItsFor:
            "Beginning growers, families, students, teachers, community partners, and growers who want practical help.",
          howItConnects:
            "Growing knowledge supports food access, youth learning, seasonal planning, and stronger community participation.",
          whatYouCanDo:
            "Explore crop planning, seasonal tips, planting guidance, and farm-based learning pathways.",
        },
      },
      {
        id: "youth-info",
        title: "Youth Opportunities",
        summary:
          "See how young people can learn, work, and build leadership through the ecosystem.",
        why:
          "This matters if you care about workforce development, real experience, responsibility, and future pathways for youth.",
        enterLabel: "Open Youth Pathway",
        screen: "youth",
        icon: "🎓",
        details: {
          whatItIs:
            "This is the youth workforce and learning pathway within the ecosystem. It connects hands-on experience with support, growth, and opportunity.",
          whoItsFor:
            "Young people, families, mentors, schools, and supervisors who want meaningful learning and work-based experiences.",
          howItConnects:
            "Youth are not separate from the ecosystem. They help animate it through learning, work, leadership, events, and practical responsibilities.",
          whatYouCanDo:
            "Explore youth roles, support structures, opportunities, and how workforce development fits into the larger farm vision.",
        },
      },
      {
        id: "nutrition-info",
        title: "Health & Nutrition",
        summary:
          "Explore recipes, practical food education, and healthier ways to eat.",
        why:
          "This matters if you want better food choices, simpler guidance, and support around wellness and concerns such as Type II diabetes.",
        enterLabel: "Open Wellness Center",
        screen: "nutrition",
        icon: "❤️",
        details: {
          whatItIs:
            "This is the wellness and food education part of the ecosystem. It focuses on practical nutrition, natural foods, and healthier habits.",
          whoItsFor:
            "Individuals, families, growers, and community members who want to understand food, recipes, and everyday wellness choices.",
          howItConnects:
            "Food is not only something to buy. It is part of learning, healing, prevention, and stronger family and community life.",
          whatYouCanDo:
            "View recipes, learn about food choices, understand the value of natural foods, and explore practical wellness guidance.",
        },
      },
      {
        id: "events-info",
        title: "Events & Experiences",
        summary:
          "Discover markets, workshops, tours, demonstrations, and community gatherings.",
        why:
          "This matters if you want to experience the ecosystem in real life, meet people, learn, shop, or participate.",
        enterLabel: "View Events",
        screen: "events",
        icon: "🎪",
        details: {
          whatItIs:
            "This is the live public experience part of the ecosystem. It includes gatherings, educational events, markets, and interactive moments.",
          whoItsFor:
            "Visitors, families, customers, partners, growers, and anyone curious about what is happening at the farm.",
          howItConnects:
            "Events bring together food, learning, youth, community health, partnerships, and local participation in one place.",
          whatYouCanDo:
            "Browse upcoming events, learn what happens there, and see how experiences connect people to the ecosystem.",
        },
      },
      {
        id: "story-info",
        title: "Story Behind the Farm",
        summary:
          "Learn how family legacy, restoration, and community vision shaped Bronson Family Farm.",
        why:
          "This matters if you want to understand the heart, purpose, and deeper meaning behind the ecosystem.",
        enterLabel: "Read the Story",
        screen: "story",
        icon: "📖",
        details: {
          whatItIs:
            "This is the legacy and vision part of the ecosystem. It explains where the farm came from, what it stands for, and why it matters.",
          whoItsFor:
            "Anyone who wants context, meaning, history, and a fuller understanding of the vision behind the work.",
          howItConnects:
            "Story gives the ecosystem coherence. It connects the land, the family legacy, the restoration work, and the community purpose.",
          whatYouCanDo:
            "Read the background, understand the vision, and see how this work connects past legacy to present action.",
        },
      },
      {
        id: "partner-info",
        title: "Volunteer / Partner",
        summary:
          "Find ways to support, collaborate, sponsor, teach, or serve.",
        why:
          "This matters if you want to become part of the ecosystem through contribution, support, resources, or shared effort.",
        enterLabel: "Open Partner Path",
        screen: "partner",
        icon: "🤝",
        details: {
          whatItIs:
            "This is the collaboration and support part of the ecosystem. It opens the door for individuals and organizations to participate.",
          whoItsFor:
            "Volunteers, sponsors, funders, community organizations, educators, businesses, and service-minded partners.",
          howItConnects:
            "Partnerships help strengthen the ecosystem’s reach, capacity, learning opportunities, and community impact.",
          whatYouCanDo:
            "Explore ways to volunteer, sponsor, collaborate, contribute expertise, or support specific ecosystem needs.",
        },
      },
      {
        id: "explore-info",
        title: "Just Exploring",
        summary:
          "Take a guided introduction to the full ecosystem before choosing a path.",
        why:
          "This matters if you are curious, invited, or interested but do not yet know where to begin.",
        enterLabel: "Start Guided Tour",
        screen: "tour",
        icon: "👀",
        details: {
          whatItIs:
            "This is the guided entry point for curious visitors. It helps people understand the ecosystem before making choices.",
          whoItsFor:
            "First-time visitors, funders, invited guests, community members, and anyone who wants a simple starting point.",
          howItConnects:
            "It introduces all major parts of the ecosystem and helps people move from curiosity to understanding to action.",
          whatYouCanDo:
            "Take a guided tour, learn what each area means, and then enter the part of the ecosystem that interests you most.",
        },
      },
    ],
    [setScreen]
  );

  const [selectedInfo, setSelectedInfo] = useState<(typeof areas)[number] | null>(null);

  const roles = [
    { label: "Guest", screen: "guest" },
    { label: "Customer", screen: "customer" },
    { label: "Grower", screen: "grower" },
    { label: "Youth Workforce", screen: "youth" },
    { label: "Supervisor", screen: "supervisor" },
    { label: "Partner", screen: "partner" },
  ];

  const liveTiles = [
    { title: "Today's Weather", body: weatherText, screen: "weather" },
    {
      title: "What's Available This Week",
      body: "Fresh produce, seedlings, Bubble Babies™, and seasonal farm offerings.",
      screen: "marketplace",
    },
    {
      title: "Next Event",
      body: "Markets, demonstrations, workshops, and community experiences.",
      screen: "events",
    },
    {
      title: "Recipe of the Week",
      body: "Practical ideas for fresh food, simple preparation, and healthier choices.",
      screen: "nutrition",
    },
  ];

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
                A living ecosystem of food, learning, opportunity, and restoration.
              </p>
            </div>

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
                onClick={() => setScreen("nutrition")}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
              >
                Wellness
              </button>
              <button
                onClick={() => setScreen("story")}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
              >
                Story
              </button>
              <button
                onClick={() => setScreen("tour")}
                className="rounded-full border border-emerald-300/30 bg-emerald-400/20 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-emerald-400/30"
              >
                Guided Tour
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-7 shadow-2xl backdrop-blur-xl md:p-10">
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-emerald-100/80">
              Ecosystem entrance
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              What interests you today?
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-emerald-50/85 md:text-lg">
              The Bronson Family Farm ecosystem is more than a farm. It is a connected
              pathway for fresh food, learning, wellness, youth opportunity, events,
              and community partnership.
            </p>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <div className="text-sm uppercase tracking-[0.24em] text-emerald-100/75">
                What does that mean for me?
              </div>
              <p className="mt-3 text-base leading-8 text-emerald-50/85">
                It means you can begin wherever your interest starts. Click any area to
                learn what it is, why it matters, and how it connects to the larger vision.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setScreen("tour")}
                className="rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-900 transition hover:scale-[1.01]"
              >
                Start Guided Tour
              </button>
              <button
                onClick={() => setSelectedInfo(areas.find((a) => a.id === "explore-info") ?? null)}
                className="rounded-full border border-white/15 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                What is the Ecosystem?
              </button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5 text-left backdrop-blur-md"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-2xl">{area.icon}</span>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100/75">
                      Ecosystem area
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold leading-snug">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-50/82">{area.summary}</p>

                  <div className="mt-4 rounded-[1rem] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
                      Why it matters to me
                    </div>
                    <p className="mt-2 text-sm leading-7 text-emerald-50/82">{area.why}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedInfo(area)}
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/15"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => setScreen(area.screen)}
                      className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
                    >
                      {area.enterLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
                Choose your role
              </div>
              <p className="mt-3 text-sm leading-7 text-emerald-50/80">
                Roles help personalize the experience after you understand what each area
                of the ecosystem means.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {roles.map((role) => (
                  <button
                    key={role.label}
                    onClick={() => setScreen(role.screen)}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/15"
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl md:p-7">
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
              Happening now at the farm
            </div>

            <h3 className="mt-3 text-3xl font-semibold leading-tight">
              Why people come back
            </h3>

            <p className="mt-4 text-base leading-8 text-emerald-50/80">
              This side of the screen gives people live-feeling reasons to keep returning
              to the ecosystem.
            </p>

            <div className="mt-6 space-y-4">
              {liveTiles.map((tile) => (
                <button
                  key={tile.title}
                  onClick={() => setScreen(tile.screen)}
                  className="block w-full rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-left backdrop-blur-md transition hover:bg-white/10"
                >
                  <div className="text-lg font-semibold">{tile.title}</div>
                  <div className="mt-2 text-sm leading-7 text-emerald-50/78">{tile.body}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.24em] text-emerald-100/70">
                Choose language
              </div>
              <div className="mt-3 text-2xl font-semibold">{language}</div>
              <div className="mt-4 flex flex-wrap gap-3">
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
          </aside>
        </section>
      </div>

      {selectedInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-emerald-100/70">
                  Ecosystem area
                </div>
                <h3 className="mt-2 text-3xl font-semibold">{selectedInfo.title}</h3>
              </div>
              <button
                onClick={() => setSelectedInfo(null)}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
                  What it is
                </div>
                <p className="mt-2 text-base leading-8 text-emerald-50/85">
                  {selectedInfo.details.whatItIs}
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
                  Who it serves
                </div>
                <p className="mt-2 text-base leading-8 text-emerald-50/85">
                  {selectedInfo.details.whoItsFor}
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
                  How it connects to the ecosystem
                </div>
                <p className="mt-2 text-base leading-8 text-emerald-50/85">
                  {selectedInfo.details.howItConnects}
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
                  What you can do here
                </div>
                <p className="mt-2 text-base leading-8 text-emerald-50/85">
                  {selectedInfo.details.whatYouCanDo}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedInfo(null);
                  setScreen(selectedInfo.screen);
                }}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01]"
              >
                {selectedInfo.enterLabel}
              </button>
              <button
                onClick={() => setSelectedInfo(null)}
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/15"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
