import { useState } from "react";

const images = {
  hero: "/hero.jpg",
  grow: "/grow.jpg",
  market: "/market.jpg",
  calendar: "/calendar.jpg",
  community: "/community.jpg",
  education: "/education.jpg",
};

const languages = ["EN", "ES", "TL", "IT", "PATWA", "HE"];

export default function App() {
  const [role, setRole] = useState<null | string>(null);
  const [lang, setLang] = useState("EN");

  if (!role) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-green-900 text-white">
        <h1 className="text-4xl mb-6">Bronson Family Farm</h1>
        <p className="mb-6">Enter the Ecosystem</p>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setRole("guest")} className="btn">Guest</button>
          <button onClick={() => setRole("grower")} className="btn">Grower</button>
          <button onClick={() => setRole("customer")} className="btn">Customer</button>
        </div>

        <div className="flex gap-2">
          {languages.map(l => (
            <button key={l} onClick={() => setLang(l)} className="px-2">
              {l}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900">

      {/* NAV */}
      <nav className="fixed top-0 w-full bg-white shadow p-4 flex justify-between z-50">
        <div className="font-bold">BFF</div>
        <div className="flex gap-4">
          <a href="#grow">Grow</a>
          <a href="#market">Market</a>
          <a href="#calendar">Calendar</a>
          <a href="#community">Community</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{ backgroundImage: `url(${images.hero})` }}
        className="h-screen bg-cover bg-center flex items-center justify-center text-white"
      >
        <div className="bg-black/40 p-10 rounded-xl text-center">
          <h1 className="text-5xl mb-4">Farm & Family Ecosystem</h1>
          <p>Role: {role.toUpperCase()} | Language: {lang}</p>
        </div>
      </section>

      {/* GROW */}
      <section
        id="grow"
        style={{ backgroundImage: `url(${images.grow})` }}
        className="h-screen bg-cover bg-center flex items-center p-10 text-white"
      >
        <div className="bg-black/40 p-6 rounded-xl max-w-xl">
          <h2 className="text-3xl mb-4">Grower Hub</h2>
          <p>Track crops, seedlings, and planting cycles.</p>
        </div>
      </section>

      {/* MARKET */}
      <section
        id="market"
        style={{ backgroundImage: `url(${images.market})` }}
        className="h-screen bg-cover bg-center flex items-center p-10 text-white"
      >
        <div className="bg-black/40 p-6 rounded-xl max-w-xl">
          <h2 className="text-3xl mb-4">Marketplace</h2>
          <p>Buy seedlings, produce, and supplies.</p>
        </div>
      </section>

      {/* CALENDAR */}
      <section
        id="calendar"
        style={{ backgroundImage: `url(${images.calendar})` }}
        className="h-screen bg-cover bg-center flex items-center p-10 text-white"
      >
        <div className="bg-black/40 p-6 rounded-xl max-w-xl">
          <h2 className="text-3xl mb-4">Grower Calendar</h2>
          <ul>
            <li>🌱 Seed Start – April</li>
            <li>🌿 Transplant – May</li>
            <li>🌽 Harvest – Summer</li>
          </ul>
        </div>
      </section>

      {/* COMMUNITY */}
      <section
        id="community"
        style={{ backgroundImage: `url(${images.community})` }}
        className="h-screen bg-cover bg-center flex items-center p-10 text-white"
      >
        <div className="bg-black/40 p-6 rounded-xl max-w-xl">
          <h2 className="text-3xl mb-4">Community</h2>
          <p>Workforce training, youth programs, volunteers.</p>
        </div>
      </section>

    </div>
  );
}
