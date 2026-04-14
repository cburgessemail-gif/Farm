import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Role =
  | "Guest"
  | "Customer"
  | "Grower"
  | "Volunteer"
  | "Youth Worker"
  | "Supervisor"
  | "Admin";

type SectionId =
  | "grow"
  | "shop"
  | "learn"
  | "participate"
  | "impact"
  | "events";

const roles: Role[] = [
  "Guest",
  "Customer",
  "Grower",
  "Volunteer",
  "Youth Worker",
  "Supervisor",
  "Admin",
];

const sections: {
  id: SectionId;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}[] = [
  {
    id: "grow",
    emoji: "🌾",
    title: "Grow",
    subtitle: "Production, planning, and land-based systems",
    description:
      "See how Bronson Family Farm supports crop production, regenerative growing, infrastructure planning, and real-world farm operations.",
    bullets: [
      "Crop planning and seasonal readiness",
      "Soil, irrigation, fencing, and field systems",
      "Grower support and production pathways",
    ],
  },
  {
    id: "shop",
    emoji: "🛒",
    title: "Shop",
    subtitle: "Marketplace, preorders, and community access",
    description:
      "Explore products, preorder pathways, pickup readiness, and SNAP-aware commerce designed to connect growers and customers.",
    bullets: [
      "Bubble Babies, seedlings, produce, and value-added goods",
      "Pickup and preorder experience",
      "Accessible, community-centered buying pathways",
    ],
  },
  {
    id: "learn",
    emoji: "🎓",
    title: "Learn",
    subtitle: "Nutrition, wellness, and practical education",
    description:
      "Discover growing education, food knowledge, wellness learning, and family-friendly content designed to strengthen community capacity.",
    bullets: [
      "Nutrition and natural food education",
      "Growing guides and practical demonstrations",
      "Health, wellness, and food systems learning",
    ],
  },
  {
    id: "participate",
    emoji: "🤝",
    title: "Participate",
    subtitle: "Volunteer, workforce, and youth pathways",
    description:
      "Find ways to engage through volunteer service, youth workforce development, and hands-on participation in the farm ecosystem.",
    bullets: [
      "Volunteer opportunities and orientation",
      "Youth workforce development",
      "Role-based participation and shared ownership",
    ],
  },
  {
    id: "impact",
    emoji: "❤️",
    title: "Impact",
    subtitle: "Community development and regional change",
    description:
      "Understand how the ecosystem advances food access, wellness, youth development, generational legacy, and local resilience.",
    bullets: [
      "Food access and healthy living",
      "Youth and family opportunity",
      "Regional growth and long-term community benefit",
    ],
  },
  {
    id: "events",
    emoji: "📅",
    title: "Events",
    subtitle: "Markets, workshops, demonstrations, and tours",
    description:
      "Explore event-based experiences that bring together growers, families, partners, vendors, and educators around practical action.",
    bullets: [
      "Growers Supply Market",
      "Workshops, site visits, and community tours",
      "Seasonal engagement and public-facing experiences",
    ],
  },
];

function roleDescription(role: Role) {
  switch (role) {
    case "Guest":
      return "Explore the ecosystem, learn the story, and view public experiences.";
    case "Customer":
      return "Explore freely while unlocking shopping, preorder, and order-related actions.";
    case "Grower":
      return "Explore the ecosystem while accessing crop, inventory, and fulfillment tools.";
    case "Volunteer":
      return "Explore the full ecosystem while accessing service opportunities, shifts, and hours.";
    case "Youth Worker":
      return "Explore the ecosystem while accessing training, progress, and assigned work pathways.";
    case "Supervisor":
      return "Explore everything while unlocking oversight, coordination, and evaluation tools.";
    case "Admin":
      return "Explore the ecosystem with full operational visibility and platform control.";
    default:
      return "";
  }
}

function roleActions(role: Role): string[] {
  switch (role) {
    case "Guest":
      return ["Explore the Farm", "View Public Events", "Learn the Mission"];
    case "Customer":
      return ["Shop Now", "View Orders", "Schedule Pickup"];
    case "Grower":
      return ["Manage Crops", "Update Inventory", "View Fulfillment"];
    case "Volunteer":
      return ["Sign Up for Shift", "View Orientation", "Track My Hours"];
    case "Youth Worker":
      return ["Open Training Track", "View My Progress", "See Assigned Tasks"];
    case "Supervisor":
      return ["View Team Dashboard", "Assign Tasks", "Review Progress"];
    case "Admin":
      return ["Open Operations", "View Reports", "Manage Platform"];
    default:
      return [];
  }
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionId | null>(null);

  const currentSection = useMemo(
    () => sections.find((section) => section.id === selectedSection) ?? null,
    [selectedSection]
  );

  if (!entered) {
    return (
      <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f2f8f1_0%,#edf7ec_35%,#ffffff_100%)] text-slate-800">
        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
            <div className="absolute right-[-6rem] top-20 h-80 w-80 rounded-full bg-lime-100/50 blur-3xl" />
            <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full border border-green-200/50 bg-white/30" />
            <div className="absolute left-10 top-20 h-28 w-28 rounded-full border border-green-200/40 bg-white/40" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(20,60,20,0.12)] backdrop-blur md:p-12"
          >
            <div className="mb-5 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
              Bronson Family Farm Ecosystem Demo
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-green-950 md:text-6xl">
              Enter a living ecosystem for growing, learning, commerce, and
              community.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
              This experience is designed to let every visitor explore first,
              then activate a role without losing access to the broader farm
              ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setEntered(true)}
                className="rounded-2xl bg-green-800 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-900"
              >
                Enter the Farm
              </button>

              <button
                onClick={() => setEntered(true)}
                className="rounded-2xl border border-green-200 bg-white px-6 py-4 text-base font-semibold text-green-900 transition hover:bg-green-50"
              >
                Preview the Ecosystem
              </button>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-4">
              {[
                "Explore freely",
                "Activate a role",
                "Unlock actions",
                "Stay inside the ecosystem",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-green-100 bg-white/80 p-4 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbf5_0%,#f1f8ee_34%,#ffffff_100%)] text-slate-800">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10rem] top-[-4rem] h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />
          <div className="absolute right-[-6rem] top-16 h-96 w-96 rounded-full bg-lime-100/60 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-100/50 blur-3xl" />
        </div>

        <header className="relative z-10 border-b border-green-100 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                Bronson Family Farm
              </div>
              <h2 className="mt-1 text-2xl font-bold text-green-950 md:text-3xl">
                Ecosystem Explorer
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 md:text-base">
                Explore first. Then activate a role without losing sight of the
                full system.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                {activeRole ? (
                  <>
                    Active Role:{" "}
                    <span className="font-semibold text-green-900">
                      {activeRole}
                    </span>
                  </>
                ) : (
                  "No active role selected"
                )}
              </div>

              <button
                onClick={() => setShowRoleSelector(true)}
                className="rounded-2xl bg-green-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-900"
              >
                {activeRole ? "Change My Role" : "Activate My Role"}
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
          <section className="mb-8 rounded-[2rem] border border-green-100 bg-white/80 p-6 shadow-[0_16px_60px_rgba(20,60,20,0.08)] backdrop-blur md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <div className="mb-3 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
                  Exploration Layer
                </div>

                <h3 className="text-3xl font-bold leading-tight text-green-950 md:text-4xl">
                  A shared front door for customers, volunteers, youth workers,
                  growers, and partners.
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                  Every person can explore the ecosystem. Roles do not block the
                  experience. They unlock the actions each person needs while
                  preserving access to the wider story, learning, marketplace,
                  and participation pathways.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedSection("shop")}
                    className="rounded-2xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                  >
                    Start with Shop
                  </button>
                  <button
                    onClick={() => setSelectedSection("participate")}
                    className="rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-900 transition hover:bg-green-50"
                  >
                    Explore Participation
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  "Customer can explore and shop",
                  "Volunteer can explore and serve",
                  "Youth worker can explore and train",
                  "Grower can explore and manage production",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-green-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf5_100%)] p-4 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.995 }}
                onClick={() => setSelectedSection(section.id)}
                className="group rounded-[2rem] border border-green-100 bg-white p-6 text-left shadow-[0_14px_40px_rgba(20,60,20,0.08)] transition hover:border-green-200 hover:shadow-[0_18px_50px_rgba(20,60,20,0.12)]"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                    {section.emoji}
                  </div>
                  <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                    Explore
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-green-950">
                  {section.title}
                </h4>
                <p className="mt-2 text-sm font-medium text-green-700">
                  {section.subtitle}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  {section.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <span className="mt-[2px] text-green-700">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-sm font-semibold text-green-800 transition group-hover:translate-x-1">
                  Open section →
                </div>
              </motion.button>
            ))}
          </section>
        </main>
      </div>

      <AnimatePresence>
        {showRoleSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 px-4"
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              className="w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-2xl md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                    Role Activation
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-green-950">
                    Choose a role without losing the exploration experience
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Roles unlock capabilities. They do not close the ecosystem.
                  </p>
                </div>

                <button
                  onClick={() => setShowRoleSelector(false)}
                  className="rounded-xl border border-green-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setActiveRole(role);
                      setShowRoleSelector(false);
                    }}
                    className="rounded-2xl border border-green-100 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf5_100%)] p-4 text-left transition hover:border-green-200 hover:shadow-md"
                  >
                    <div className="text-lg font-semibold text-green-950">
                      {role}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      {roleDescription(role)}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4 py-6"
          >
            <motion.div
              initial={{ y: 26, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.985 }}
              className="w-full max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
                    {currentSection.emoji} {currentSection.title}
                  </div>

                  <h3 className="mt-4 text-3xl font-bold text-green-950">
                    {currentSection.subtitle}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-slate-700">
                    {currentSection.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSection(null)}
                  className="rounded-xl border border-green-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="rounded-[1.5rem] border border-green-100 bg-[linear-gradient(180deg,#f9fcf8_0%,#ffffff_100%)] p-5">
                  <h4 className="text-lg font-semibold text-green-950">
                    What this section demonstrates
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {currentSection.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-700" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.5rem] border border-green-100 bg-white p-5">
                  <h4 className="text-lg font-semibold text-green-950">
                    Suggested next action
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {activeRole
                      ? `You are currently exploring as ${activeRole}. This section remains open to you, while your role unlocks additional actions.`
                      : "You are exploring without an active role. You can continue freely or activate a role to unlock additional actions."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {!activeRole && (
                      <button
                        onClick={() => {
                          setSelectedSection(null);
                          setShowRoleSelector(true);
                        }}
                        className="rounded-2xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
                      >
                        Activate a Role
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedSection(null)}
                      className="rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-900 transition hover:bg-green-50"
                    >
                      Return to Ecosystem
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeRole && (
          <motion.aside
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed right-0 top-0 z-20 h-full w-full max-w-md border-l border-green-100 bg-white/95 p-6 shadow-2xl backdrop-blur"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
                    Active Role
                  </div>
                  <h3 className="mt-1 text-3xl font-bold text-green-950">
                    {activeRole}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveRole(null)}
                  className="rounded-xl border border-green-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Exit Role
                </button>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-700">
                {roleDescription(activeRole)}
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-green-100 bg-[linear-gradient(180deg,#f9fcf8_0%,#ffffff_100%)] p-5">
                <h4 className="text-lg font-semibold text-green-950">
                  Unlocked actions
                </h4>

                <div className="mt-4 space-y-3">
                  {roleActions(activeRole).map((action, index) => (
                    <button
                      key={action}
                      className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        index === 0
                          ? "bg-green-800 text-white hover:bg-green-900"
                          : "border border-green-200 bg-white text-green-900 hover:bg-green-50"
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-green-100 bg-white p-5">
                <h4 className="text-lg font-semibold text-green-950">
                  Important design rule
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This role panel adds capabilities, but it does not remove the
                  user from the shared ecosystem experience.
                </p>
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={() => setShowRoleSelector(true)}
                  className="w-full rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-900 transition hover:bg-green-50"
                >
                  Switch Role
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
