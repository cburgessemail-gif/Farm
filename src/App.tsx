import React, { useMemo, useState } from "react";

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

function FlyerWall({
  setScreen,
}: {
  setScreen: (screen: string) => void;
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
        ctaTarget: "https://www.eventbrite.com/",
        impactText:
          "Events create visibility, trust, and learning. This event brings the ecosystem to life through plants, tools, demonstrations, local food, and family experiences.",
        description:
          "A live farm experience featuring grower supplies, healthy plants and seedlings, demonstrations, local food vendors, and youth activities.",
        status: "Active event",
      },
      {
        id: "youngstown-market",
        title: "Youngstown Farmers Market",
        subtitle: "Fresh seedlings, Bubble Babies™, and seasonal offerings.",
        dateText: "Current seasonal market presence",
        image: "/GrowArea.jpg",
        ctaLabel: "Go to Marketplace",
        ctaType: "screen",
        ctaTarget: "marketplace",
        impactText:
          "Marketplace activity creates food access, repeat engagement, and direct support for the larger ecosystem.",
        description:
          "A public-facing market pathway where visitors can shop seasonal items and connect with fresh food from Bronson Family Farm.",
        status: "Available now",
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
        subtitle: "Support what is growing across food, youth, wellness, and opportunity.",
        dateText: "Ongoing support opportunity",
        image: "/GrowArea.jpg",
        ctaLabel: "Invest in Impact",
        ctaType: "screen",
        ctaTarget: "impact",
        impactText:
          "Support expands capacity across multiple parts of the ecosystem, including food access, youth opportunity, land restoration, and community experiences.",
        description:
          "A giving and support pathway that helps visitors, sponsors, and funders align their support with what matters most to them.",
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
              These flyers make the ecosystem feel real because they show movement,
              participation, and opportunities people can act on now.
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
                      onClick={() => setScreen(flyer.ctaTarget)}
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
                    setScreen(selectedFlyer.ctaTarget);
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
