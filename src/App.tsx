import React from "react";
import { ArrowRight, Volume2, Trees, Sprout, Users } from "lucide-react";

type EntranceSectionProps = {
  onEnter?: () => void;
  onOpenStory?: () => void;
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
};

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "tl", label: "Tagalog" },
  { code: "it", label: "Italiano" },
  { code: "pat", label: "Patwa" },
  { code: "he", label: "עברית" },
];

export default function EntranceSection({
  onEnter,
  onOpenStory,
  selectedLanguage = "en",
  onLanguageChange,
}: EntranceSectionProps) {
  const heroImage = "/farm-entrance.jpg";
  // You can swap this to one of your real uploaded farm photos later.
  // Good options:
  // "/GrowArea.jpg"
  // "/GrowArea2.jpg"
  // "/GrowArea3.jpg"
  // "/farm-path.jpg"

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0d120d] text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bronson Family Farm entrance pathway"
          className="h-full w-full object-cover scale-[1.04] animate-[slowZoom_18s_ease-in-out_infinite_alternate]"
        />
      </div>

      {/* Deep cinematic overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,10,7,0.30),rgba(5,10,7,0.45),rgba(5,10,7,0.72))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,110,65,0.10),rgba(3,8,5,0.45)_55%,rgba(2,6,3,0.72)_100%)]" />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/85 backdrop-blur-sm">
            Bronson Family Farm
          </div>
          <div className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/65 backdrop-blur-sm md:block">
            Living Demo
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-md">
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange?.(e.target.value)}
              className="bg-transparent text-sm text-white outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-black">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex min-h-screen items-center px-6 pb-16 pt-10 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left side */}
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-white/10 px-4 py-2 text-xs tracking-[0.22em] text-white/80 backdrop-blur-md">
              <Trees className="h-4 w-4" />
              STEP INTO THE ECOSYSTEM
            </div>

            <h1 className="max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
              Experience something different.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 md:text-lg md:leading-8">
              Enter a living farm ecosystem shaped by regenerative growing,
              workforce development, family wellness, community learning, and
              a future-facing local food system.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62 md:text-base">
              This is not just a website. It is an immersive pathway into the
              Bronson Family Farm vision.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={onEnter}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#162117] transition hover:scale-[1.01] hover:bg-[#f3f7f1]"
              >
                Enter the Ecosystem
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenStory}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/14"
              >
                <Volume2 className="h-4 w-4" />
                Start Guided Tour
              </button>
            </div>

            {/* Bottom features */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/12 bg-black/20 p-4 backdrop-blur-md">
                <Sprout className="mb-3 h-5 w-5 text-emerald-200/90" />
                <div className="text-sm font-medium text-white">Grow</div>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Explore regenerative farming, crop pathways, seasonal planning,
                  and produce systems.
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-black/20 p-4 backdrop-blur-md">
                <Users className="mb-3 h-5 w-5 text-emerald-200/90" />
                <div className="text-sm font-medium text-white">Belong</div>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Discover role-based experiences for guests, customers,
                  growers, youth, and partners.
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-black/20 p-4 backdrop-blur-md">
                <Trees className="mb-3 h-5 w-5 text-emerald-200/90" />
                <div className="text-sm font-medium text-white">Enter</div>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Move from story into live interaction with the farm ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Right side glass panel */}
          <div className="lg:justify-self-end">
            <div className="w-full max-w-md rounded-[2rem] border border-white/12 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                <div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Entrance Preview
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="text-sm font-medium text-white">
                      Guided access
                    </div>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      Let visitors choose a language and enter through a narrated
                      introduction instead of static slides.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="text-sm font-medium text-white">
                      Natural movement
                    </div>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      Use gentle zoom and layered shadows so the entrance feels
                      alive, immersive, and welcoming.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                    <div className="text-sm font-medium text-white">
                      Clear next step
                    </div>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      The first action should lead people directly into the
                      ecosystem, not into a presentation layout.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-emerald-100/10 bg-emerald-200/8 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/55">
                    Recommended headline
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">
                    Step Into the Farm
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Or keep your current line:
                    <span className="ml-1 italic text-white/82">
                      “Experience something different.”
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation */}
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1.04); }
          100% { transform: scale(1.10); }
        }
      `}</style>
    </section>
  );
}
