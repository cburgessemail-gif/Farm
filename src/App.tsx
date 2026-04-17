import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CloudSun,
  ShoppingBasket,
  Sprout,
  Users,
  ShieldCheck,
  CalendarDays,
  MapPin,
  ArrowRight,
  PlayCircle,
  PauseCircle,
  Volume2,
  BookOpen,
  HeartPulse,
  Trees,
  Leaf,
  GraduationCap,
  ClipboardList,
  ScanLine,
  Bell,
  Star,
  Package,
  ChevronRight,
  Home,
  Sun,
  Cloud,
  Wind,
  CloudRain,
} from "lucide-react";

const images = {
  hero: "/GrowArea.jpg",
  guest: "/GrowArea2.jpg",
  customer: "/ProduceDisplay.jpg",
  grower: "/FarmerHands.jpg",
  youth: "/YouthWorkforce.jpg",
  supervisor: "/SupervisorField.jpg",
  volunteer: "/CommunityGrow.jpg",
  market: "/MarketTable.jpg",
  education: "/NutritionLearning.jpg",
};

type RoleKey = "guest" | "customer" | "grower" | "youth" | "supervisor" | "volunteer";

const roleContent: Record<RoleKey, any> = {
  guest: {
    title: "Guest",
    intro: "Step into something different.",
    image: images.guest,
  },
  customer: {
    title: "Customer",
    intro: "Move directly into fresh food, recipes, and nutrition support.",
    image: images.customer,
  },
  grower: {
    title: "Grower",
    intro: "Plan crops, track weather, and manage production.",
    image: images.grower,
  },
  youth: {
    title: "Youth Workforce",
    intro: "Build real skills through meaningful work.",
    image: images.youth,
  },
  supervisor: {
    title: "Supervisor",
    intro: "Support youth, track progress, and coordinate operations.",
    image: images.supervisor,
  },
  volunteer: {
    title: "Volunteer",
    intro: "Join a welcoming community restoring land and connection.",
    image: images.volunteer,
  },
};

function useSpeech(text: string, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }, [text, enabled]);
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [role, setRole] = useState<RoleKey>("customer");
  const [tour, setTour] = useState(false);

  const current = roleContent[role];

  const narration = useMemo(() => {
    return `${current.title}. ${current.intro}`;
  }, [role]);

  useSpeech(narration, tour);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* HEADER */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 text-emerald-600" />
            <div className="font-semibold">Bronson Family Farm</div>
          </div>

          <div className="flex gap-2">
            {Object.keys(roleContent).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r as RoleKey)}
                className="text-sm px-3 py-1 rounded bg-gray-100"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ENTRY SCREEN */}
      {!entered ? (
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Step into something different</h1>
          <p className="mb-6">A regenerative farm ecosystem for food, learning, and community.</p>

          <button
            onClick={() => setEntered(true)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full"
          >
            Enter Demo
          </button>

          <button
            onClick={() => {
              setEntered(true);
              setTour(true);
            }}
            className="ml-4 bg-black text-white px-6 py-3 rounded-full"
          >
            Guided Tour
          </button>
        </div>
      ) : (
        <main className="p-6">

          {/* HERO */}
          <div className="rounded-xl overflow-hidden mb-6">
            <img src={current.image} className="w-full h-80 object-cover" />
          </div>

          {/* ROLE */}
          <h2 className="text-3xl font-semibold mb-2">{current.title}</h2>
          <p className="mb-6">{current.intro}</p>

          {/* ACTIONS */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setTour(!tour)}
              className="bg-emerald-600 text-white px-4 py-2 rounded"
            >
              {tour ? "Pause Tour" : "Start Tour"}
            </button>
          </div>

          {/* MODULES */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <ShoppingBasket /> Marketplace
            </div>
            <div className="p-4 border rounded">
              <BookOpen /> Education
            </div>
            <div className="p-4 border rounded">
              <CalendarDays /> Crop Planning
            </div>
          </div>

        </main>
      )}
    </div>
  );
}
