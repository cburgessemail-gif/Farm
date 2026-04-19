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
  const interests = [
    {
      title: "Fresh Food & Marketplace",
      subtitle: "Shop produce, seedlings, Bubble Babies™, and preorder pickup.",
      action: () => setScreen("marketplace"),
      badge: "Shop now",
      icon: "🛒",
    },
    {
      title: "Learn to Grow",
      subtitle: "Explore seasonal growing tips, crop planning, and farm learning tools.",
      action: () => setScreen("grow"),
      badge: "Start learning",
      icon: "🌱",
    },
    {
      title: "Youth Opportunities",
      subtitle: "See youth workforce pathways, leadership, and hands-on learning.",
      action: () => setScreen("youth"),
      badge: "Explore youth",
      icon: "🎓",
    },
    {
      title: "Health & Nutrition",
      subtitle: "Discover recipes, food guidance, and practical wellness resources.",
      action: () => setScreen("nutrition"),
      badge: "Open wellness",
      icon: "❤️",
    },
    {
      title: "Events & Experiences",
      subtitle: "Find markets, workshops, demonstrations, and farm experiences.",
      action: () => setScreen("events"),
      badge: "View events",
      icon: "🎪",
    },
    {
      title: "Story Behind the Farm",
      subtitle: "Learn about legacy, land restoration, and the vision for Youngstown.",
      action: () => setScreen("story"),
      badge: "Read the story",
      icon: "📖",
    },
    {
      title: "Volunteer / Partner",
      subtitle: "Support the ecosystem through collaboration, sponsorship, or service.",
      action: () => setScreen("partner"),
      badge: "Get involved",
      icon: "🤝",
    },
    {
      title: "Just Exploring",
      subtitle: "Take a guided tour and discover what the ecosystem offers.",
      action: () => setScreen("tour"),
      badge: "Start guided tour",
      icon: "👀",
    },
  ];

  const roles = [
    { label: "Guest", screen: "guest" },
    { label: "Customer", screen: "customer" },
    { label: "Grower", screen: "grower" },
    { label: "Youth Workforce", screen: "youth" },
    { label: "Supervisor", screen: "supervisor" },
    { label: "Partner", screen: "partner" },
  ];

  const languages = ["English", "Español", "Tagalog", "Italiano", "Patwa", "Hebrew"];

  const liveTiles = [
    {
      title: "Today's Weather",
      body: weatherText,
      screen: "weather",
    },
    {
      title: "What's Available This Week",
      body: "Seedlings, Bubble Babies™, greens, herbs, and seasonal produce.",
      screen: "marketplace",
    },
    {
      title: "Next Event",
      body: "Growers Supply Market and community learning experiences are active.",
      screen: "events",
    },
    {
      title: "Recipe of the Week",
      body: "Fresh, practical ideas built around natural foods and simple preparation.",
      screen: "nutrition",
    },
    {
      title: "Volunteer Openings",
      body: "Support setup, learning stations, grow spaces, and family experiences.",
      screen: "partner",
    },
    {
      title: "Youth Pathways",
      body: "Explore work-based learning, support resources, and future opportunities.",
      screen: "youth",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/GrowArea.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-emerald-950/60 to-slate-900/70" />
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
                onClick={() => setScreen("grow")}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
              >
                Learn
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
              Curiosity-first entrance
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              What interests you today?
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-emerald-50/85 md:text-lg">
              Start with curiosity. Explore food, learning, wellness, youth opportunities,
              events, or the story behind the farm. Every path opens into a real part of
              the ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setScreen("tour")}
                className="rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-900 transition hover:scale-[1.01]"
              >
                Start Guided Tour
              </button>
              <button
                onClick={() => setScreen("marketplace")}
                className="rounded-full border border-white/15 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Shop Fresh Food
              </button>
              <button
                onClick={() => setScreen("events")}
                className="rounded-full border border-white/15 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Explore Opportunities
              </button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {interests.map((item) => (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="group rounded-[1.6rem] border border-white/10 bg-black/20 p-5 text-left backdrop-blur-md transition hover:-translate-y-0.5 hover:border-emerald-200/25 hover:bg-white/10"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100/75">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-50/80">{item.subtitle}</p>
                </button>
              ))}
            </div>

            <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
                Choose your role
              </div>
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
              A place people want to return to
            </h3>

            <p className="mt-4 text-base leading-8 text-emerald-50/80">
              Give visitors movement, relevance, and reasons to come back. These live-feeling
              pathways make the entrance more than a presentation.
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
    </div>
  );
}
