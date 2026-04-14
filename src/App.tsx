import { useState } from "react";

type Language = "English" | "Spanish" | "Italian" | "Patwa" | "Hebrew";

const copy: Record<
  Language,
  {
    topBar: string;
    brandTitle: string;
    brandSub: string;
    navExperience: string;
    navWhy: string;
    navImpact: string;
    navPartner: string;
    connect: string;
    eyebrow: string;
    headline: string;
    description: string;
    start: string;
    partner: string;
    chips: string[];
  }
> = {
  English: {
    topBar:
      "🌱 Live Demo: Building a community-centered future through food, land, youth, and family.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Bronson Family Farm Ecosystem Demo",
    navExperience: "Experience",
    navWhy: "Why This Exists",
    navImpact: "Impact",
    navPartner: "Partner",
    connect: "Connect Now",
    eyebrow: "Community Agriculture. Workforce Pathways. Generational Vision.",
    headline: "Growing food, purpose, and possibility from the ground up.",
    description:
      "This live platform introduces a land-based ecosystem designed to strengthen food access, train youth, support growers, activate community participation, and create a regenerative future rooted in Youngstown.",
    start: "Start the Farm Experience",
    partner: "Partner With the Mission",
    chips: [
      "Food Access",
      "Youth Workforce",
      "Regenerative Farming",
      "Community Resilience",
      "Live Demonstration Site",
    ],
  },
  Spanish: {
    topBar:
      "🌱 Demostración en vivo: construyendo un futuro centrado en la comunidad a través de la alimentación, la tierra, la juventud y la familia.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Demostración del ecosistema de Bronson Family Farm",
    navExperience: "Experiencia",
    navWhy: "Por qué existe",
    navImpact: "Impacto",
    navPartner: "Aliarse",
    connect: "Conectar ahora",
    eyebrow: "Agricultura comunitaria. Caminos laborales. Visión generacional.",
    headline:
      "Cultivando alimentos, propósito y posibilidades desde la tierra.",
    description:
      "Esta plataforma en vivo presenta un ecosistema basado en la tierra diseñado para fortalecer el acceso a los alimentos, capacitar a los jóvenes, apoyar a los productores, activar la participación comunitaria y crear un futuro regenerativo arraigado en Youngstown.",
    start: "Comenzar la experiencia",
    partner: "Apoyar la misión",
    chips: [
      "Acceso a alimentos",
      "Fuerza laboral juvenil",
      "Agricultura regenerativa",
      "Resiliencia comunitaria",
      "Sitio de demostración en vivo",
    ],
  },
  Italian: {
    topBar:
      "🌱 Demo dal vivo: costruire un futuro centrato sulla comunità attraverso cibo, terra, giovani e famiglia.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Demo dell'ecosistema Bronson Family Farm",
    navExperience: "Esperienza",
    navWhy: "Perché esiste",
    navImpact: "Impatto",
    navPartner: "Partnership",
    connect: "Contattaci",
    eyebrow: "Agricoltura comunitaria. Percorsi di lavoro. Visione generazionale.",
    headline: "Coltivare cibo, scopo e possibilità partendo dalla terra.",
    description:
      "Questa piattaforma dal vivo presenta un ecosistema basato sulla terra progettato per rafforzare l’accesso al cibo, formare i giovani, sostenere i coltivatori, attivare la partecipazione della comunità e creare un futuro rigenerativo radicato a Youngstown.",
    start: "Inizia l’esperienza",
    partner: "Sostieni la missione",
    chips: [
      "Accesso al cibo",
      "Forza lavoro giovanile",
      "Agricoltura rigenerativa",
      "Resilienza comunitaria",
      "Sito dimostrativo dal vivo",
    ],
  },
  Patwa: {
    topBar:
      "🌱 Live demo: a build one community-centered future through food, land, youth, an family.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Bronson Family Farm Ecosystem Demo",
    navExperience: "Experience",
    navWhy: "Why dis deh yah",
    navImpact: "Impact",
    navPartner: "Partner",
    connect: "Link Wid Wi",
    eyebrow: "Community farming. Work pathway. Generational vision.",
    headline: "Wi a grow food, purpose, an possibility fram di ground up.",
    description:
      "Dis live platform show one land-based ecosystem weh design fi strengthen food access, train youth, support grower dem, activate community participation, an create one regenerative future root up ina Youngstown.",
    start: "Start di farm experience",
    partner: "Partner wid di mission",
    chips: [
      "Food access",
      "Youth workforce",
      "Regenerative farming",
      "Community resilience",
      "Live demonstration site",
    ],
  },
  Hebrew: {
    topBar:
      "🌱 הדגמה חיה: בניית עתיד ממוקד קהילה דרך מזון, אדמה, נוער ומשפחה.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "הדגמת המערכת האקולוגית של Bronson Family Farm",
    navExperience: "חוויה",
    navWhy: "למה זה קיים",
    navImpact: "השפעה",
    navPartner: "שותפות",
    connect: "צרו קשר",
    eyebrow: "חקלאות קהילתית. מסלולי עבודה. חזון בין-דורי.",
    headline: "מגדלים מזון, מטרה ואפשרויות מהיסוד.",
    description:
      "הפלטפורמה החיה הזו מציגה מערכת אקולוגית מבוססת אדמה שנועדה לחזק נגישות למזון, להכשיר צעירים, לתמוך במגדלים, להפעיל השתתפות קהילתית וליצור עתיד מתחדש שמושרש ביונגסטאון.",
    start: "התחילו את חוויית החווה",
    partner: "שתפו פעולה עם המשימה",
    chips: [
      "נגישות למזון",
      "כוח עבודה צעיר",
      "חקלאות מתחדשת",
      "חוסן קהילתי",
      "אתר הדגמה חי",
    ],
  },
};

export default function App() {
  const [language, setLanguage] = useState<Language>("English");
  const t = copy[language];
  const isHebrew = language === "Hebrew";

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background:
          "linear-gradient(180deg, #f4f7f1 0%, #eef3ea 42%, #edf3ef 100%)",
        color: "#173a22",
        direction: isHebrew ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          background: "#0d351c",
          color: "#ffffff",
          textAlign: "center",
          padding: "12px 18px",
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        {t.topBar}
      </div>

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          padding: "16px 32px",
          background: "rgba(246, 248, 242, 0.95)",
          borderBottom: "1px solid #dde6da",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {t.brandTitle}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#687b6d",
              marginTop: "4px",
            }}
          >
            {t.brandSub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
            justifyContent: isHebrew ? "flex-start" : "flex-end",
          }}
        >
          <span style={{ fontWeight: 700, color: "#48604d" }}>
            {t.navExperience}
          </span>
          <span style={{ fontWeight: 700, color: "#48604d" }}>{t.navWhy}</span>
          <span style={{ fontWeight: 700, color: "#48604d" }}>
            {t.navImpact}
          </span>
          <span style={{ fontWeight: 700, color: "#48604d" }}>
            {t.navPartner}
          </span>

          <button
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              border: "none",
              background: "#2f6a4d",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 22px rgba(47,106,77,0.18)",
            }}
          >
            {t.connect}
          </button>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #cfd8cf",
              background: "#ffffff",
              color: "#1f4f2c",
              fontSize: "15px",
              fontWeight: 700,
              minWidth: "150px",
            }}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Italian">Italian</option>
            <option value="Patwa">Patwa</option>
            <option value="Hebrew">Hebrew</option>
          </select>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1160px",
          margin: "74px auto 0",
          padding: "0 22px 80px",
        }}
      >
        <section
          style={{
            maxWidth: "860px",
            background: "rgba(255,255,255,0.72)",
            borderRadius: "30px",
            padding: "34px 32px 32px",
            boxShadow: "0 16px 42px rgba(0,0,0,0.06)",
            border: "1px solid rgba(22,58,34,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: isHebrew ? "auto" : "40px",
              left: isHebrew ? "40px" : "auto",
              top: "38px",
              width: "360px",
              height: "520px",
              opacity: 0.12,
              background:
                "radial-gradient(circle at 40% 30%, #b7cfb7 0%, #dfeadf 34%, transparent 70%)",
              transform: "rotate(10deg)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "inline-block",
              padding: "10px 16px",
              borderRadius: "999px",
              background: "#e6eee3",
              color: "#214b2d",
              fontWeight: 700,
              fontSize: "14px",
              marginBottom: "18px",
            }}
          >
            {t.eyebrow}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(56px, 7vw, 84px)",
              lineHeight: 0.98,
              fontWeight: 800,
              letterSpacing: "-1.8px",
              maxWidth: "740px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {t.headline}
          </h1>

          <p
            style={{
              marginTop: "24px",
              fontSize: "18px",
              lineHeight: 1.7,
              maxWidth: "760px",
              color: "#274231",
              position: "relative",
              zIndex: 1,
            }}
          >
            {t.description}
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            <button
              style={{
                padding: "16px 24px",
                borderRadius: "999px",
                border: "none",
                background: "#2f6a4d",
                color: "#fff",
                fontWeight: 800,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {t.start}
            </button>

            <button
              style={{
                padding: "16px 24px",
                borderRadius: "999px",
                border: "1px solid #d7e2d7",
                background: "#ffffff",
                color: "#29503a",
                fontWeight: 800,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {t.partner}
            </button>
          </div>

          <div
            style={{
              marginTop: "26px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            {t.chips.map((chip) => (
              <div
                key={chip}
                style={{
                  padding: "11px 15px",
                  borderRadius: "999px",
                  background: "#fbfcfb",
                  border: "1px solid #e3e8e1",
                  color: "#294b34",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
