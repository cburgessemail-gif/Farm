function GuidedTourScreen({
  setScreen,
}: {
  setScreen: (screen: Screen) => void;
}) {
  const steps = [
    {
      id: "intro",
      title: "Welcome to the Ecosystem",
      narration:
        "This is more than a farm. Bronson Family Farm is a living ecosystem where food, learning, wellness, events, youth opportunity, and partnership strengthen one another.",
      ecosystemWhy:
        "The ecosystem works because each area supports another. It is not a list of pages. It is a connected system of participation and growth.",
      nextLabel: "Begin Exploring",
      visitScreen: "events" as Screen,
      visitLabel: "See Events",
    },
    {
      id: "marketplace",
      title: "Fresh Food & Marketplace",
      narration:
        "This area connects people to produce, seedlings, Bubble Babies™, and seasonal offerings. It is one of the most direct ways to enter the ecosystem.",
      ecosystemWhy:
        "Marketplace activity creates food access, supports farm activity, encourages repeat engagement, and helps people experience healthier options in practical ways.",
      nextLabel: "Next: Youth Opportunities",
      visitScreen: "marketplace" as Screen,
      visitLabel: "Visit Marketplace",
    },
    {
      id: "youth",
      title: "Youth Opportunities",
      narration:
        "The youth pathway is about more than tasks. It is about leadership, responsibility, confidence, mentorship, and meaningful hands-on participation.",
      ecosystemWhy:
        "Youth opportunities strengthen the future of the ecosystem by building skills, leadership, and ownership pathways that can grow over time.",
      nextLabel: "Next: Wellness",
      visitScreen: "youth" as Screen,
      visitLabel: "Visit Youth Pathway",
    },
    {
      id: "wellness",
      title: "Health & Nutrition",
      narration:
        "This area helps people connect food to everyday life through recipes, practical nutrition, and healthier ways to think about what they eat.",
      ecosystemWhy:
        "Wellness turns food into understanding. It builds healthier demand, helps families make better choices, and expands the impact of the ecosystem beyond the land itself.",
      nextLabel: "Next: Story",
      visitScreen: "nutrition" as Screen,
      visitLabel: "Visit Wellness",
    },
    {
      id: "story",
      title: "Story Behind the Farm",
      narration:
        "The story explains the heart behind the work: family legacy, restoration, vision, and why this place matters to the community.",
      ecosystemWhy:
        "Story creates meaning, trust, identity, and long-term connection. It helps people understand not only what the ecosystem does, but why it exists.",
      nextLabel: "Next: Invest in Impact",
      visitScreen: "story" as Screen,
      visitLabel: "Visit Story",
    },
    {
      id: "impact",
      title: "Invest in Impact",
      narration:
        "Support helps expand food access, youth opportunities, wellness, events, and the infrastructure needed to grow the vision.",
      ecosystemWhy:
        "Investment strengthens the whole ecosystem. It increases capacity, deepens participation, and helps turn possibility into visible results.",
      nextLabel: "Finish Tour",
      visitScreen: "impact" as Screen,
      visitLabel: "Visit Impact",
    },
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">
            Guided tour
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
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
                What next
              </div>
              <h2 className="mt-3 text-2xl font-semibold">
                Now that you’ve explored, where would you like to return or visit next?
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
        </div>
      </div>
    </div>
  );
}
