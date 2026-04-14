import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Guest",
  "Customer",
  "Grower",
  "Volunteer",
  "Youth Worker",
  "Supervisor",
  "Admin",
];

const sections = [
  {
    title: "🌾 Grow",
    desc: "Production, crops, soil, irrigation, and farm systems.",
  },
  {
    title: "🛒 Shop",
    desc: "Marketplace, preorders, SNAP access, and pickup.",
  },
  {
    title: "🎓 Learn",
    desc: "Nutrition, growing education, and wellness.",
  },
  {
    title: "🤝 Participate",
    desc: "Volunteer, workforce, and youth pathways.",
  },
  {
    title: "❤️ Community Impact",
    desc: "Food access, health, and regional impact.",
  },
  {
    title: "📅 Events",
    desc: "Growers Market, workshops, and tours.",
  },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [showRoles, setShowRoles] = useState(false);

  // ENTRY SCREEN
  if (!entered) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-5xl font-bold text-green-800 mb-4">
            Bronson Family Farm
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            A Living Ecosystem for Growing, Learning, and Community
          </p>
          <button
            onClick={() => setEntered(true)}
            className="px-6 py-3 bg-green-700 text-white rounded-xl"
          >
            Enter the Farm
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          🌲 Ecosystem Explorer
        </h2>

        <button
          onClick={() => setShowRoles(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          {activeRole ? activeRole : "Activate My Role"}
        </button>
      </div>

      {/* ECOSYSTEM */}
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
            <p className="text-gray-600">{section.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ROLE SELECTOR */}
      <AnimatePresence>
        {showRoles && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-xl w-96">
              <h3 className="text-xl font-bold mb-4">Select Role</h3>

              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setActiveRole(role);
                      setShowRoles(false);
                    }}
                    className="bg-green-100 p-2 rounded-lg"
                  >
                    {role}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowRoles(false)}
                className="mt-4 text-gray-500"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROLE PANEL */}
      <AnimatePresence>
        {activeRole && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="fixed right-0 top-0 w-72 h-full bg-white shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-2">{activeRole}</h3>
            <p className="text-gray-600 mb-4">
              Role activated. You can still explore the full ecosystem.
            </p>

            <button
              onClick={() => setActiveRole(null)}
              className="text-red-500"
            >
              Exit Role
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
