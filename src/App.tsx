import { useEffect, useMemo, useState } from "react";
import {
  CloudSun,
  Users,
  Tractor,
  ShoppingBasket,
  Sprout,
  HeartHandshake,
  GraduationCap,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Home,
  Play,
  Pause,
  Trees,
  Map,
  Sun,
  Trophy,
} from "lucide-react";

type LangKey =
  | "English"
  | "Español"
  | "Tagalog"
  | "Italiano"
  | "עברית"
  | "Français";

const LANGS: LangKey[] = [
  "English",
  "Español",
  "Tagalog",
  "Italiano",
  "עברית",
  "Français",
];

const ui = {
  English: {
    start: "Enter Ecosystem",
    next: "Next",
    back: "Back",
    home: "Home",
    guided: "Begin Guided Tour",
    pause: "Pause Tour",
    pathways: "Explore Pathways",
    continue: "Continue Your Journey",
    feedback: "Feedback & Reflection",
    ending: "Ending Decision",
  },
};

type Pathway = {
  id: string;
  title: string;
  icon: any;
  image: string;
  intro: string;
  experience: string[];
  decisions: string[];
  nextPathways: string[];
  reflection: string;
};

const PATHWAYS: Pathway[] = [
  {
    id: "guest",
    title: "Guest Experience",
    icon: Trees,
    image: "/images/airport-road.jpg",
    intro:
      "Welcome to Bronson Family Farm — a place-based connected ecosystem located at the Historic Lansdowne Airport in Youngstown, Ohio.",
    experience: [
      "Experience the outdoor growing areas and ecosystem pathways.",
      "Learn how agriculture, workforce development, and community connect together.",
      "Explore how food systems can transform communities.",
      "Understand the vision for an off-grid, educational, community-centered ecosystem.",
    ],
    decisions: [
      "Explore Marketplace",
      "Attend an Event",
      "Become a Volunteer",
      "Learn About Youth Workforce",
      "Return to Ecosystem Map",
    ],
    nextPathways: ["Marketplace", "Youth Workforce", "Grower"],
    reflection:
      "What part of the ecosystem connected with you most today?",
  },

  {
    id: "youth",
    title: "Youth Workforce Pathway",
    icon: GraduationCap,
    image: "/images/youth-team.jpg",
    intro:
      "The Youth Workforce Program develops leadership, responsibility, teamwork, and real-world agricultural experience.",
    experience: [
      "Daily check-in and supervisor guidance.",
      "Hands-on cultivation and ecosystem participation.",
      "Marketplace preparation and inventory exposure.",
      "Leadership, communication, and teamwork development.",
      "Motivational activity blocks and wellness engagement.",
      "Pathway advancement opportunities.",
    ],
    decisions: [
      "Complete Enrollment",
      "Meet Supervisors",
      "Explore Leadership Track",
      "Become Future Mentor",
      "Continue to Grower Pathway",
    ],
    nextPathways: ["Grower", "Marketplace", "Leadership"],
    reflection:
      "How did today’s work help build confidence, teamwork, or leadership?",
  },

  {
    id: "grower",
    title: "Grower Pathway",
    icon: Sprout,
    image: "/images/grower-field.jpg",
    intro:
      "The Grower Pathway supports community growers with tools, education, production systems, and market access.",
    experience: [
      "Learn companion planting and ecosystem growing methods.",
      "Explore Bubble Babies™ seed-starting systems.",
      "Participate in irrigation, harvesting, and crop planning.",
      "Connect to community market opportunities.",
      "Learn sustainable and regenerative growing practices.",
    ],
    decisions: [
      "Join Grower Network",
      "Attend Grower Training",
      "Sell Through Marketplace",
      "Mentor Youth Workforce",
      "Become Ecosystem Partner",
    ],
    nextPathways: ["Marketplace", "Partner", "Youth Workforce"],
    reflection:
      "What role could you play in strengthening local food systems?",
  },

  {
    id: "marketplace",
    title: "Marketplace Pathway",
    icon: ShoppingBasket,
    image: "/images/marketplace.jpg",
    intro:
      "The Marketplace connects growers, customers, nutrition, and local economic activity.",
    experience: [
      "Explore fresh produce and value-added products.",
      "Learn about SNAP-accessible food systems.",
      "Experience QR-based ecosystem engagement.",
      "See how growers connect to community purchasing.",
      "Participate in seasonal and event-based marketplace activity.",
    ],
    decisions: [
      "Shop Marketplace",
      "Become Vendor",
      "Learn About SNAP Access",
      "Join Grower Pathway",
      "Return to Ecosystem",
    ],
    nextPathways: ["Grower", "Partner", "Customer"],
    reflection:
      "How can local marketplaces improve community health and food access?",
  },

  {
    id: "partner",
    title: "Partner Pathway",
    icon: HeartHandshake,
    image: "/images/community-partners.jpg",
    intro:
      "Partners help strengthen infrastructure, workforce development, food systems, education, and community revitalization.",
    experience: [
      "Support youth workforce development.",
      "Collaborate on community food access initiatives.",
      "Help build sustainable infrastructure.",
      "Connect education, workforce, and agriculture together.",
      "Participate in ecosystem growth and long-term impact.",
    ],
    decisions: [
      "Schedule Partnership Meeting",
      "Support Youth Workforce",
      "Sponsor Ecosystem Activity",
      "Invest in Community Growth",
      "Return to Ecosystem",
    ],
    nextPathways: ["Youth Workforce", "Marketplace", "Grower"],
    reflection:
      "How can collaboration strengthen long-term community systems?",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [tour, setTour] = useState(false);
  const [lang, setLang] = useState<LangKey>("English");
  const [time, setTime] = useState(new Date());

  const currentPathway = PATHWAYS[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!tour) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev < PATHWAYS.length - 1 ? prev + 1 : 0
      );
    }, 14000);

    return () => clearInterval(interval);
  }, [tour]);

  const hour = time.getHours();

  const backgroundClass = useMemo(() => {
    if (hour < 11)
      return "from-emerald-950 via-green-900 to-lime-800";
    if (hour < 17)
      return "from-green-900 via-emerald-700 to-yellow-700";
    return "from-slate-950 via-emerald-950 to-orange-900";
  }, [hour]);

  const Icon = currentPathway.icon;

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${backgroundClass} text-white transition-all duration-1000 overflow-hidden`}
    >
      {/* HEADER */}

      <div className="w-full px-6 py-4 border-b border-white/10 backdrop-blur-lg bg-black/20 flex items-center justify-between">
        <div>
          <div className="text-3xl font-black tracking-wide">
            BRONSON FAMILY FARM
          </div>

          <div className="text-sm text-green-200 mt-1">
            Connected Food Ecosystem Experience
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CloudSun className="w-6 h-6 text-yellow-300" />

          <div className="text-sm">
            Youngstown, Ohio
            <div className="text-xs opacity-80">
              {time.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}

      <div className="grid lg:grid-cols-2 gap-8 p-6 h-[calc(100vh-110px)] overflow-auto">
        {/* IMAGE */}

        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/30">
          <img
            src={currentPathway.image}
            alt={currentPathway.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-10 h-10 text-lime-300" />

              <div className="text-4xl font-black">
                {currentPathway.title}
              </div>
            </div>

            <div className="max-w-2xl text-lg text-white/90 leading-relaxed">
              {currentPathway.intro}
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="flex flex-col gap-5 overflow-auto pr-2">
          {/* LIVE ECOSYSTEM */}

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-5">
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <Sun className="w-6 h-6 text-yellow-300" />
              Live Ecosystem
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="opacity-70">Weather</div>
                <div className="text-2xl font-bold">72°F</div>
              </div>

              <div className="bg-black/20 rounded-2xl p-4">
                <div className="opacity-70">Youth Active</div>
                <div className="text-2xl font-bold">50</div>
              </div>

              <div className="bg-black/20 rounded-2xl p-4">
                <div className="opacity-70">Growers Engaged</div>
                <div className="text-2xl font-bold">40+</div>
              </div>

              <div className="bg-black/20 rounded-2xl p-4">
                <div className="opacity-70">Community Partners</div>
                <div className="text-2xl font-bold">10+</div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <div className="text-2xl font-black mb-4">
              Experience This Pathway
            </div>

            <div className="space-y-3">
              {currentPathway.experience.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-black/20 rounded-2xl p-4"
                >
                  <Map className="w-5 h-5 mt-1 text-lime-300" />

                  <div className="leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ENDING DECISION */}

          <div className="rounded-3xl border border-lime-400/40 bg-lime-500/10 backdrop-blur-xl p-6">
            <div className="text-2xl font-black mb-4 text-lime-300">
              Ending Decision
            </div>

            <div className="grid gap-3">
              {currentPathway.decisions.map((item, idx) => (
                <button
                  key={idx}
                  className="text-left bg-black/20 hover:bg-lime-500/20 transition-all rounded-2xl p-4 border border-white/10"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CONTINUE JOURNEY */}

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <div className="text-2xl font-black mb-4">
              Continue Your Journey
            </div>

            <div className="flex flex-wrap gap-3">
              {currentPathway.nextPathways.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-full bg-emerald-600/40 border border-white/10"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* FEEDBACK */}

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-2 text-2xl font-black mb-4">
              <MessageSquare className="w-6 h-6 text-sky-300" />
              Feedback & Reflection
            </div>

            <div className="text-lg mb-5 text-white/90">
              {currentPathway.reflection}
            </div>

            <textarea
              placeholder="Share your thoughts about the ecosystem..."
              className="w-full h-32 rounded-2xl bg-black/30 border border-white/10 p-4 text-white resize-none outline-none"
            />

            <button className="mt-4 px-6 py-3 rounded-2xl bg-lime-500 hover:bg-lime-400 transition-all text-black font-bold">
              Submit Reflection
            </button>
          </div>

          {/* MOTIVATION */}

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-500/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
              <Trophy className="w-6 h-6 text-yellow-300" />
              Daily Ecosystem Motivation
            </div>

            <div className="text-lg leading-relaxed text-yellow-100">
              “We’re building our future together. Every role strengthens the ecosystem.”
            </div>
          </div>

          {/* NAVIGATION */}

          <div className="flex flex-wrap gap-3 pt-3 pb-10">
            <button
              onClick={() =>
                setCurrent((prev) =>
                  prev > 0 ? prev - 1 : PATHWAYS.length - 1
                )
              }
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/30 hover:bg-black/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <button
              onClick={() =>
                setCurrent((prev) =>
                  prev < PATHWAYS.length - 1 ? prev + 1 : 0
                )
              }
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-lime-500 hover:bg-lime-400 transition-all text-black font-bold"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrent(0)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/30 hover:bg-black/50 transition-all"
            >
              <Home className="w-5 h-5" />
              Home
            </button>

            <button
              onClick={() => setTour(!tour)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-all"
            >
              {tour ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause Tour
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Begin Guided Tour
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
