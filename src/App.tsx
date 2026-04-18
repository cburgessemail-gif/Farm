import React, { useEffect, useMemo, useRef, useState } from "react";

type LanguageCode = "en" | "es" | "tl" | "it" | "pat" | "he";

type ViewMode =
  | "entrance"
  | "story"
  | "ecosystem"
  | "guest"
  | "customer"
  | "grower"
  | "youth"
  | "parent"
  | "supervisor"
  | "impact"
  | "partnerships";

const copy = {
  en: {
    location: "Bronson Family Farm, Youngstown, Ohio",
    headline: "Bronson Family Farm creates conditions for growth.",
    subtitle:
      "Through food access, learning, family support, wellness, and opportunity.",
    supportLine: "Built with community. Growing for generations.",
    trustBar:
      "Food Access • Youth Opportunity • Family Support • Wellness • Partnerships",
    enter: "Enter the Ecosystem",
    walkthrough: "Take the Guided Walkthrough",
    impact: "See Community Impact",
    story: "Why I Built This",
    ecosystem: "How the Ecosystem Works",
    back: "Back",
    backHome: "Back to Entrance",
    backToEcosystem: "Back to Ecosystem",
    language: "Language",
    stopVoice: "Stop Voice",

    storyIntroTitle: "Why I Built This",
    storyIntroText:
      "Bronson Family Farm is rooted in family, shaped by lived experience, and being implemented to serve real people in real ways.",

    chapter1: "Roots",
    chapter1Title: "My roots taught me how food sustains families.",
    chapter1Text:
      "My grandmother was Filipino and lived on a farm in Santa Rosa. She gardened, raised animals, and worked with the butcher to feed the household. She taught us that food systems begin long before the grocery shelf.",

    chapter2: "Health Reality",
    chapter2Title: "Food access became personal.",
    chapter2Text:
      "After being diagnosed with Type II Diabetes in 2006, I managed my health through food and exercise. After moving to Youngstown, limited access to affordable fresh produce and rising costs changed that reality. I need fresh produce.",

    chapter3: "Youngstown",
    chapter3Title: "My family is here. My work is here.",
    chapter3Text:
      "I am a grandmother of nine. Four of my grandchildren live here in Youngstown, along with their father, my son. This place matters to me because family is here, community is here, and this is where I have planted my life.",

    chapter4: "Land & Legacy",
    chapter4Title: "The land and airport history inspired me.",
    chapter4Text:
      "The history of the airport and surrounding land spoke to movement, possibility, and renewal. I saw land with a story and believed it could serve the community again in a new way.",

    chapter5: "Systems",
    chapter5Title: "I grew up learning how things are built.",
    chapter5Text:
      "Raised in East Palo Alto, part of the Silicon Valley region, I learned to value systems, innovation, and building solutions that solve real problems. When I came here, I saw a need for a system.",

    chapter6: "Training & Action",
    chapter6Title: "Training turned vision into structure.",
    chapter6Text:
      "In Central State University’s Fast Track Farming class, I got the vision for agritourism and wrote a business plan. That learning helped turn inspiration into strategy.",

    chapter7: "Resilience",
    chapter7Title: "I am still building.",
    chapter7Text:
      "I am 68 years old and building this after surviving two traumatic brain injuries. That is why I can get frustrated. I need help. But I have not stopped building.",

    chapter8: "Mission",
    chapter8Title: "A place where a seed starts the journey.",
    chapter8Text:
      "Bronson Family Farm creates conditions for growth—for food, people, families, skills, wellness, and future opportunity.",

    ecosystemTitle: "Platform Access Points",
    ecosystemText:
      "These access points show how Bronson Family Farm works across public engagement, food access, youth workforce development, family connection, grower coordination, wellness education, and partnership-based community change.",

    impactTitle: "Community Impact",
    impactText:
      "This ecosystem responds to real community needs with practical strategies designed to improve food access, opportunity, engagement, and healthier outcomes over time.",

    partnershipsTitle: "Partnerships for Change",
    partnershipsText:
      "This work grows through collaboration with schools, growers, health educators, civic partners, businesses, and community organizations.",

    guidedText:
      "Welcome to Bronson Family Farm in Youngstown, Ohio. Bronson Family Farm creates conditions for growth through food access, learning, family support, wellness, and opportunity. This demo offers a guided view into a real ecosystem now being implemented for the community.",

    roleGuest: "Guest Access",
    roleGuestText:
      "Public information, events, story, and partner-facing access.",
    roleCustomer: "Customer Access",
    roleCustomerText:
      "Marketplace access, food education, nutrition guidance, and customer engagement tools.",
    roleGrower: "Grower Access",
    roleGrowerText:
      "Crop planning, production coordination, seasonal timing, and grower support.",
    roleYouth: "Youth Workforce",
    roleYouthText:
      "Hands-on learning, work readiness, mentoring, and supervised participation.",
    roleParent: "Parent Portal",
    roleParentText:
      "Family connection, progress visibility, updates, support, and trust-building.",
    roleSupervisor: "Supervisor Support",
    roleSupervisorText:
      "Oversight, coordination, progress visibility, and resource support for youth workforce participation.",

    enterAccessPoint: "Enter Access Point",
    viewStory: "View Founder Story",
    viewImpact: "View Community Impact",
    viewPartnerships: "View Partnerships",

    guestTitle: "Guest Access Point",
    guestLead:
      "A welcoming public-facing space for story, events, place, and understanding what Bronson Family Farm is building in Youngstown.",
    customerTitle: "Customer Access Point",
    customerLead:
      "A practical and educational space that connects people to fresh food, healthier choices, recipes, and marketplace participation.",
    growerTitle: "Grower Access Point",
    growerLead:
      "An operational space for crop planning, coordination, timing, and practical support that connects growing to real community need.",
    youthTitle: "Youth Workforce Access Point",
    youthLead:
      "A real learning and participation space where young people can build skills, confidence, work readiness, and future direction.",
    parentTitle: "Parent Portal",
    parentLead:
      "A family-facing view that helps parents stay informed, see progress, receive updates, and support young people as they grow.",
    supervisorTitle: "Supervisor Support",
    supervisorLead:
      "A support layer for youth workforce participation with visibility, coordination, scheduling, and resource awareness.",

    overview: "Overview",
    highlights: "Highlights",
    actions: "Actions",

    dataTitle: "What a healthier community means",
    dataText:
      "A healthier community means more than the absence of illness. It means better access to fresh food, stronger families, more youth opportunity, practical health education, local pride, and better daily conditions for people to live well.",
    dataFood: "Fresh food access shapes health outcomes.",
    dataYouth: "Young people need real opportunities to learn, work, and grow.",
    dataFamily: "Families are stronger when they can see and support progress.",
    dataLand: "Land can become a place of nourishment, learning, and belonging.",
    dataWellness:
      "Health advice means more when healthy food is actually within reach.",

    partnerSchools: "Schools and youth development partners",
    partnerHealth: "Health and wellness educators",
    partnerGrowers: "Growers, producers, and local food partners",
    partnerCivic: "Civic, business, and community organizations",

    actionMarketplace: "Open Marketplace Access",
    actionEvents: "View Events & Public Access",
    actionPlanning: "Open Grower Planning Tools",
    actionYouth: "Open Youth Workforce Hub",
    actionParent: "Open Parent Portal",
    actionSupervisor: "Open Supervisor Support",
    actionImpact: "See Community Impact",
    actionPartnerships: "See Partnerships",
  },
} as const;

function InfoPanel({
  labels,
  title,
  lead,
  bullets,
  actions,
}: {
  labels: { overview: string; highlights: string; actions: string };
  title: string;
  lead: string;
  bullets: string[];
  actions: string[];
}) {
  return (
    <div className="detail-grid">
      <div className="detail-main card-glass">
        <div className="section-label">{labels.overview}</div>
        <h2 className="detail-title">{title}</h2>
        <p className="detail-lead">{lead}</p>
      </div>

      <div className="detail-side">
        <div className="card-glass">
          <div className="section-label">{labels.highlights}</div>
          <div className="bullet-list">
            {bullets.map((item) => (
              <div className="bullet-item" key={item}>
                <span className="bullet-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass">
          <div className="section-label">{labels.actions}</div>
          <div className="action-stack">
            {actions.map((action) => (
              <button className="ghost-action" type="button" key={action}>
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryChapter({
  tag,
  title,
  text,
}: {
  tag: string;
  title: string;
  text: string;
}) {
  return (
    <section className="story-chapter card-glass">
      <div className="chapter-tag">{tag}</div>
      <h2 className="chapter-title">{title}</h2>
      <p className="chapter-text">{text}</p>
    </section>
  );
}

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [view, setView] = useState<ViewMode>("entrance");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = useMemo(() => copy[language], [language]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const heroImage = "/GrowArea.jpg";
  const pathwayImage = "/GrowArea2.jpg";

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const startGuidedWalkthrough = () => {
    const utterance = new SpeechSynthesisUtterance(t.guidedText);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.lang = "en-US";

    speechRef.current = utterance;
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
      setView("story");
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopGuidedWalkthrough = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const labels = {
    overview: t.overview,
    highlights: t.highlights,
    actions: t.actions,
  };

  const renderRoleView = () => {
    if (view === "guest") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(9,13,10,0.90), rgba(15,18,15,0.97)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.guestTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.backToEcosystem}
                </button>
              </div>
            </div>
            <InfoPanel
              labels={labels}
              title={t.guestTitle}
              lead={t.guestLead}
              bullets={[
                "Public welcome and first understanding",
                "Story, identity, and place-based context",
                "Events, updates, and partner-facing information",
              ]}
              actions={[t.actionEvents, t.actionImpact]}
            />
          </div>
        </section>
      );
    }

    if (view === "customer") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(16,11,7,0.88), rgba(14,16,11,0.96)), url("${heroImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.customerTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.backToEcosystem}
                </button>
              </div>
            </div>
            <InfoPanel
              labels={labels}
              title={t.customerTitle}
              lead={t.customerLead}
              bullets={[
                "Fresh food access and marketplace connection",
                "Nutrition guidance and healthier food choices",
                "Recipes, education, and repeat engagement",
              ]}
              actions={[t.actionMarketplace, t.actionImpact]}
            />
          </div>
        </section>
      );
    }

    if (view === "grower") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(8,14,10,0.90), rgba(12,19,12,0.98)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.growerTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.backToEcosystem}
                </button>
              </div>
            </div>
            <InfoPanel
              labels={labels}
              title={t.growerTitle}
              lead={t.growerLead}
              bullets={[
                "Crop planning, seasonal timing, and coordination",
                "Production tools that connect growing to community need",
                "Support for practical decision-making and readiness",
              ]}
              actions={[t.actionPlanning, t.actionPartnerships]}
            />
          </div>
        </section>
      );
    }

    if (view === "youth") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(18,10,6,0.88), rgba(14,18,10,0.98)), url("${heroImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.youthTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.backToEcosystem}
                </button>
              </div>
            </div>

            <InfoPanel
              labels={labels}
              title={t.youthTitle}
              lead={t.youthLead}
              bullets={[
                "Learn real skills and build confidence",
                "Gain hands-on experience and work readiness",
                "Grow with mentoring, structure, and support",
              ]}
              actions={[t.actionYouth, t.actionParent, t.actionSupervisor]}
            />

            <div className="nested-grid">
              <div className="nested-panel card-glass youth-nested">
                <div className="section-label">{t.roleParent}</div>
                <h3 className="nested-title">{t.parentTitle}</h3>
                <p className="nested-copy">{t.parentLead}</p>
                <button className="primary nested-btn" onClick={() => setView("parent")}>
                  {t.actionParent}
                </button>
              </div>

              <div className="nested-panel card-glass youth-nested purple">
                <div className="section-label">{t.roleSupervisor}</div>
                <h3 className="nested-title">{t.supervisorTitle}</h3>
                <p className="nested-copy">{t.supervisorLead}</p>
                <button
                  className="primary nested-btn"
                  onClick={() => setView("supervisor")}
                >
                  {t.actionSupervisor}
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (view === "parent") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(12,10,7,0.90), rgba(14,16,12,0.98)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.parentTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("youth")}>
                  {t.back}
                </button>
              </div>
            </div>
            <InfoPanel
              labels={labels}
              title={t.parentTitle}
              lead={t.parentLead}
              bullets={[
                "See participation and progress more clearly",
                "Stay connected through updates and communication",
                "Support growth through family awareness and trust",
              ]}
              actions={[t.actionYouth, t.actionImpact]}
            />
          </div>
        </section>
      );
    }

    if (view === "supervisor") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(20,10,25,0.90), rgba(12,14,18,1)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.supervisorTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("youth")}>
                  {t.back}
                </button>
              </div>
            </div>
            <InfoPanel
              labels={labels}
              title={t.supervisorTitle}
              lead={t.supervisorLead}
              bullets={[
                "Support youth participation with structure and care",
                "Coordinate schedules, progress, and practical needs",
                "Strengthen consistency through visibility and support",
              ]}
              actions={[t.actionYouth, t.actionParent]}
            />
          </div>
        </section>
      );
    }

    if (view === "impact") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(9,11,10,0.92), rgba(12,15,12,0.98)), url("${heroImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.impactTitle}</h1>
                <p className="ecosystem-copy">{t.impactText}</p>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.backToEcosystem}
                </button>
              </div>
            </div>

            <div className="impact-grid">
              <div className="card-glass stat-card">
                <div className="stat-number">01</div>
                <div className="stat-title">{t.dataFood}</div>
              </div>
              <div className="card-glass stat-card">
                <div className="stat-number">02</div>
                <div className="stat-title">{t.dataYouth}</div>
              </div>
              <div className="card-glass stat-card">
                <div className="stat-number">03</div>
                <div className="stat-title">{t.dataFamily}</div>
              </div>
              <div className="card-glass stat-card">
                <div className="stat-number">04</div>
                <div className="stat-title">{t.dataLand}</div>
              </div>
              <div className="card-glass stat-card wide">
                <div className="section-label">Healthier Community</div>
                <div className="detail-lead">{t.dataText}</div>
              </div>
              <div className="card-glass stat-card wide">
                <div className="section-label">Wellness Connection</div>
                <div className="detail-lead">{t.dataWellness}</div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (view === "partnerships") {
      return (
        <section
          className="role-page"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11,12,17,0.92), rgba(13,14,18,0.98)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.location}</div>
                <h1 className="role-page-title">{t.partnershipsTitle}</h1>
                <p className="ecosystem-copy">{t.partnershipsText}</p>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.backToEcosystem}
                </button>
              </div>
            </div>

            <div className="partner-grid">
              <div className="card-glass partner-card">
                <h3>{t.partnerSchools}</h3>
                <p>
                  Youth access, educational pathways, supervised participation,
                  and stronger future opportunity.
                </p>
              </div>
              <div className="card-glass partner-card">
                <h3>{t.partnerHealth}</h3>
                <p>
                  Nutrition learning, healthier choices, prevention education,
                  and stronger daily habits.
                </p>
              </div>
              <div className="card-glass partner-card">
                <h3>{t.partnerGrowers}</h3>
                <p>
                  Production support, crop coordination, local food systems, and
                  practical growing knowledge.
                </p>
              </div>
              <div className="card-glass partner-card">
                <h3>{t.partnerCivic}</h3>
                <p>
                  Community activation, land use, local investment, and systems
                  that create better outcomes together.
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          min-height: 100%;
          width: 100%;
          background: #0b0d0b;
          font-family: Georgia, "Times New Roman", serif;
        }

        body { color: white; }

        .page {
          min-height: 100vh;
          width: 100%;
          background: #0b0d0b;
        }

        .entrance {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: zoom 22s ease-in-out infinite alternate;
          transform: scale(1.03);
        }

        .bg-path {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.22;
          mix-blend-mode: screen;
          animation: drift 28s ease-in-out infinite alternate;
        }

        .forest-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 18%, rgba(255, 246, 214, 0.16), transparent 24%),
            radial-gradient(circle at 78% 22%, rgba(138, 92, 179, 0.16), transparent 28%),
            radial-gradient(circle at 68% 76%, rgba(185, 73, 61, 0.14), transparent 24%),
            radial-gradient(circle at 22% 80%, rgba(226, 159, 63, 0.14), transparent 22%),
            radial-gradient(circle at 50% 55%, rgba(90, 123, 79, 0.16), transparent 30%);
          animation: hueShift 20s ease-in-out infinite alternate;
        }

        .shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              135deg,
              rgba(16, 31, 19, 0.70) 0%,
              rgba(74, 56, 30, 0.46) 28%,
              rgba(122, 63, 22, 0.34) 52%,
              rgba(78, 42, 97, 0.30) 74%,
              rgba(11, 15, 12, 0.72) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(7, 10, 7, 0.30),
              rgba(7, 10, 7, 0.56),
              rgba(7, 10, 7, 0.88)
            ),
            radial-gradient(
              circle at center,
              rgba(255, 251, 239, 0.07),
              rgba(0, 0, 0, 0.24) 52%,
              rgba(0, 0, 0, 0.48) 100%
            );
        }

        .topbar,
        .story-head,
        .ecosystem-head,
        .role-header {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 24px 28px;
          flex-wrap: wrap;
        }

        .story-head,
        .ecosystem-head,
        .role-header {
          padding: 0 0 26px 0;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          letter-spacing: 0.08em;
          font-size: 12px;
          color: rgba(255,255,255,0.95);
          box-shadow: 0 8px 24px rgba(0,0,0,0.16);
        }

        .controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .select,
        .ghost-btn,
        .ghost-action {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(10,10,10,0.28);
          color: white;
          padding: 10px 16px;
          font-size: 14px;
          backdrop-filter: blur(12px);
        }

        .ghost-btn,
        .ghost-action {
          cursor: pointer;
        }

        .content {
          position: relative;
          z-index: 2;
          min-height: calc(100vh - 86px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
        }

        .inner {
          width: 100%;
          max-width: 980px;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.20);
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.90);
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        }

        h1 {
          margin: 0;
          font-size: clamp(40px, 6.2vw, 82px);
          line-height: 0.98;
          letter-spacing: -0.025em;
          font-weight: 600;
          text-shadow: 0 5px 18px rgba(0,0,0,0.34);
        }

        .copy {
          margin: 22px auto 0;
          max-width: 860px;
          font-size: clamp(19px, 2vw, 28px);
          line-height: 1.7;
          color: rgba(255,255,255,0.90);
          text-shadow: 0 2px 10px rgba(0,0,0,0.24);
        }

        .support-line {
          margin: 16px auto 0;
          max-width: 860px;
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255,255,255,0.83);
        }

        .trust-bar {
          margin: 24px auto 0;
          max-width: 980px;
          font-size: 14px;
          line-height: 1.7;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.75);
        }

        .buttons,
        .story-actions {
          margin-top: 34px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
        }

        button {
          border: none;
          border-radius: 999px;
          padding: 15px 24px;
          font-size: 15px;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease,
            background 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        button:hover {
          transform: translateY(-2px);
        }

        .primary {
          background: linear-gradient(135deg, #fffaf0, #eeddb7);
          color: #201f16;
          font-weight: 700;
          box-shadow: 0 12px 28px rgba(18,10,4,0.24);
        }

        .secondary {
          background: rgba(255,255,255,0.10);
          color: white;
          border: 1px solid rgba(255,255,255,0.24);
          backdrop-filter: blur(10px);
        }

        .story-page,
        .ecosystem,
        .role-page {
          min-height: 100vh;
          padding: 36px 24px 50px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
        }

        .story-page::before,
        .ecosystem::before,
        .role-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 20%, rgba(255, 244, 210, 0.10), transparent 24%),
            radial-gradient(circle at 78% 16%, rgba(132, 85, 176, 0.12), transparent 28%),
            radial-gradient(circle at 70% 78%, rgba(190, 78, 58, 0.10), transparent 22%),
            radial-gradient(circle at 20% 82%, rgba(221, 151, 57, 0.10), transparent 22%);
          pointer-events: none;
        }

        .story-wrap,
        .ecosystem-wrap,
        .role-wrap {
          max-width: 1220px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .story-intro,
        .ecosystem-copy {
          max-width: 900px;
          margin-top: 10px;
          font-size: 19px;
          line-height: 1.7;
          color: rgba(255,255,255,0.84);
        }

        .story-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 22px;
          margin-top: 24px;
          align-items: start;
        }

        .story-nav {
          position: sticky;
          top: 24px;
          display: grid;
          gap: 12px;
        }

        .story-nav-card {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border-radius: 24px;
          padding: 18px;
          box-shadow: 0 16px 42px rgba(0,0,0,0.22);
        }

        .story-nav-title {
          font-size: 18px;
          margin: 0 0 8px;
          color: rgba(255,255,255,0.95);
        }

        .story-nav-copy {
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
          color: rgba(255,255,255,0.76);
        }

        .story-sequence {
          display: grid;
          gap: 18px;
        }

        .story-chapter,
        .role-card,
        .card-glass {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(14px);
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 16px 42px rgba(0,0,0,0.22);
        }

        .chapter-tag {
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.62);
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .chapter-title,
        .ecosystem-title,
        .role-page-title {
          font-size: clamp(30px, 4vw, 56px);
          line-height: 1.04;
          margin: 0 0 12px;
        }

        .chapter-text {
          font-size: 19px;
          line-height: 1.8;
          color: rgba(255,255,255,0.86);
          margin: 0;
        }

        .role-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 18px;
          margin-top: 24px;
        }

        .role-card {
          min-height: 290px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease;
        }

        .role-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.12);
        }

        .role-name {
          font-size: 24px;
          margin: 0 0 12px;
        }

        .role-text {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.80);
          margin: 0;
        }

        .role-link {
          margin-top: 18px;
          display: inline-block;
          color: white;
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.90;
          cursor: pointer;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 18px;
        }

        .detail-side {
          display: grid;
          gap: 18px;
        }

        .section-label {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          color: rgba(255,255,255,0.64);
          margin-bottom: 14px;
        }

        .detail-title {
          font-size: clamp(28px, 4vw, 50px);
          line-height: 1.05;
          margin: 0 0 12px;
        }

        .detail-lead,
        .nested-copy {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.84);
          margin: 0;
        }

        .bullet-list {
          display: grid;
          gap: 14px;
        }

        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(255,255,255,0.84);
          line-height: 1.7;
          font-size: 16px;
        }

        .bullet-dot {
          width: 10px;
          height: 10px;
          margin-top: 9px;
          border-radius: 999px;
          background: linear-gradient(135deg, #fff7d7, #e1983a);
          flex: 0 0 auto;
        }

        .action-stack {
          display: grid;
          gap: 12px;
        }

        .ghost-action {
          text-align: left;
          width: 100%;
        }

        .nested-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
        }

        .nested-title {
          margin: 0 0 10px;
          font-size: 30px;
        }

        .nested-btn {
          margin-top: 18px;
        }

        .youth-nested.purple {
          border-color: rgba(138, 92, 179, 0.22);
        }

        .impact-grid,
        .partner-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 24px;
        }

        .stat-card {
          min-height: 180px;
        }

        .stat-card.wide {
          min-height: 220px;
        }

        .stat-number {
          font-size: 14px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.60);
          margin-bottom: 18px;
        }

        .stat-title {
          font-size: 28px;
          line-height: 1.35;
          color: rgba(255,255,255,0.92);
        }

        .partner-card h3 {
          margin: 0 0 10px;
          font-size: 26px;
        }

        .partner-card p {
          margin: 0;
          font-size: 18px;
          line-height: 1.75;
          color: rgba(255,255,255,0.82);
        }

        @keyframes zoom {
          0% { transform: scale(1.03); }
          100% { transform: scale(1.09); }
        }

        @keyframes drift {
          0% { transform: scale(1.05) translateY(0px); }
          100% { transform: scale(1.11) translateY(-10px); }
        }

        @keyframes hueShift {
          0% { opacity: 0.88; filter: saturate(100%); }
          50% { opacity: 1; filter: saturate(112%); }
          100% { opacity: 0.92; filter: saturate(104%); }
        }

        @media (max-width: 1180px) {
          .role-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .detail-grid,
          .story-layout {
            grid-template-columns: 1fr;
          }

          .story-nav {
            position: static;
          }
        }

        @media (max-width: 900px) {
          .impact-grid,
          .partner-grid,
          .nested-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .topbar,
          .story-head,
          .ecosystem-head,
          .role-header {
            flex-direction: column;
            align-items: stretch;
          }

          .buttons,
          .story-actions {
            flex-direction: column;
          }

          button,
          .select,
          .ghost-btn {
            width: 100%;
          }

          .role-grid {
            grid-template-columns: 1fr;
          }

          .content {
            padding: 18px;
          }
        }
      `}</style>

      <div className="page">
        {view === "entrance" && (
          <section className="entrance">
            <img src={heroImage} alt="Bronson Family Farm" className="bg" />
            <img src={pathwayImage} alt="" className="bg-path" />
            <div className="forest-wash" />
            <div className="shade" />

            <div className="topbar">
              <div className="brand">{t.location}</div>
              <div className="controls">
                <select
                  className="select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  aria-label={t.language}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="tl">Tagalog</option>
                  <option value="it">Italiano</option>
                  <option value="pat">Patwa</option>
                  <option value="he">עברית</option>
                </select>

                {isSpeaking ? (
                  <button className="ghost-btn" onClick={stopGuidedWalkthrough}>
                    {t.stopVoice}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="content">
              <div className="inner">
                <div className="eyebrow">A place where a seed starts the journey.</div>
                <h1>{t.headline}</h1>
                <div className="copy">{t.subtitle}</div>
                <div className="support-line">{t.supportLine}</div>
                <div className="trust-bar">{t.trustBar}</div>

                <div className="buttons">
                  <button className="primary" onClick={() => setView("story")}>
                    {t.enter}
                  </button>
                  <button className="secondary" onClick={startGuidedWalkthrough}>
                    {t.walkthrough}
                  </button>
                  <button className="secondary" onClick={() => setView("impact")}>
                    {t.impact}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === "story" && (
          <section
            className="story-page"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(10,12,9,0.88), rgba(12,15,12,0.96)), url("${pathwayImage}")`,
            }}
          >
            <div className="story-wrap">
              <div className="story-head">
                <div>
                  <div className="eyebrow">{t.location}</div>
                  <h1 className="chapter-title">{t.storyIntroTitle}</h1>
                  <p className="story-intro">{t.storyIntroText}</p>
                </div>
                <div className="controls">
                  <button className="ghost-btn" onClick={() => setView("entrance")}>
                    {t.backHome}
                  </button>
                </div>
              </div>

              <div className="story-layout">
                <aside className="story-nav">
                  <div className="story-nav-card">
                    <h3 className="story-nav-title">{t.story}</h3>
                    <p className="story-nav-copy">
                      Roots. health reality. family. land. systems. training.
                      resilience. mission.
                    </p>
                  </div>
                  <div className="story-nav-card">
                    <h3 className="story-nav-title">{t.ecosystem}</h3>
                    <p className="story-nav-copy">
                      Move from founder story into the actual structure of the
                      ecosystem.
                    </p>
                  </div>
                  <div className="story-nav-card">
                    <h3 className="story-nav-title">{t.impactTitle}</h3>
                    <p className="story-nav-copy">
                      See how the ecosystem responds to community need.
                    </p>
                  </div>
                </aside>

                <div className="story-sequence">
                  <StoryChapter
                    tag={t.chapter1}
                    title={t.chapter1Title}
                    text={t.chapter1Text}
                  />
                  <StoryChapter
                    tag={t.chapter2}
                    title={t.chapter2Title}
                    text={t.chapter2Text}
                  />
                  <StoryChapter
                    tag={t.chapter3}
                    title={t.chapter3Title}
                    text={t.chapter3Text}
                  />
                  <StoryChapter
                    tag={t.chapter4}
                    title={t.chapter4Title}
                    text={t.chapter4Text}
                  />
                  <StoryChapter
                    tag={t.chapter5}
                    title={t.chapter5Title}
                    text={t.chapter5Text}
                  />
                  <StoryChapter
                    tag={t.chapter6}
                    title={t.chapter6Title}
                    text={t.chapter6Text}
                  />
                  <StoryChapter
                    tag={t.chapter7}
                    title={t.chapter7Title}
                    text={t.chapter7Text}
                  />
                  <StoryChapter
                    tag={t.chapter8}
                    title={t.chapter8Title}
                    text={t.chapter8Text}
                  />
                </div>
              </div>

              <div className="story-actions">
                <button className="primary" onClick={() => setView("ecosystem")}>
                  {t.ecosystem}
                </button>
                <button className="secondary" onClick={() => setView("impact")}>
                  {t.viewImpact}
                </button>
                <button className="secondary" onClick={() => setView("partnerships")}>
                  {t.viewPartnerships}
                </button>
                <button className="secondary" onClick={() => setView("entrance")}>
                  {t.backHome}
                </button>
              </div>
            </div>
          </section>
        )}

        {view === "ecosystem" && (
          <section
            className="ecosystem"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.88), rgba(12,18,12,0.96)), url("${pathwayImage}")`,
            }}
          >
            <div className="ecosystem-wrap">
              <div className="ecosystem-head">
                <div>
                  <div className="eyebrow">{t.location}</div>
                  <h2 className="chapter-title">{t.ecosystemTitle}</h2>
                  <div className="ecosystem-copy">{t.ecosystemText}</div>
                </div>

                <div className="controls">
                  <button className="ghost-btn" onClick={() => setView("story")}>
                    {t.viewStory}
                  </button>
                  <button className="ghost-btn" onClick={() => setView("impact")}>
                    {t.viewImpact}
                  </button>
                  <button className="ghost-btn" onClick={() => setView("entrance")}>
                    {t.backHome}
                  </button>
                </div>
              </div>

              <div className="role-grid">
                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.roleGuest}</h3>
                    <p className="role-text">{t.roleGuestText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("guest")}>
                    {t.enterAccessPoint}
                  </a>
                </div>
                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.roleCustomer}</h3>
                    <p className="role-text">{t.roleCustomerText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("customer")}>
                    {t.enterAccessPoint}
                  </a>
                </div>
                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.roleGrower}</h3>
                    <p className="role-text">{t.roleGrowerText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("grower")}>
                    {t.enterAccessPoint}
                  </a>
                </div>
                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.roleYouth}</h3>
                    <p className="role-text">{t.roleYouthText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("youth")}>
                    {t.enterAccessPoint}
                  </a>
                </div>
                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.roleParent}</h3>
                    <p className="role-text">{t.roleParentText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("parent")}>
                    {t.enterAccessPoint}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {!["entrance", "story", "ecosystem"].includes(view) && renderRoleView()}
      </div>
    </>
  );
}
