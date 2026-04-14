import React, { useMemo, useState } from "react";

type Language = "EN" | "ES" | "TL" | "IT" | "PATWA" | "HE";

const copy = {
  EN: {
    topBar:
      "🌱 Live Demo: Building a community-centered future through food, land, youth, and family.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Bronson Family Farm Ecosystem Demo",
    navExperience: "Experience",
    navWhy: "Why This Exists",
    navImpact: "Impact",
    navPartner: "Partner",
    navConnect: "Connect Now",
    eyebrow: "Community Agriculture. Workforce Pathways. Generational Vision.",
    heroTitle: "Growing food, purpose, and possibility from the ground up.",
    heroText:
      "This live platform introduces a land-based ecosystem designed to strengthen food access, train youth, support growers, activate community participation, and create a regenerative future rooted in Youngstown.",
    ctaPrimary: "Start the Farm Experience",
    ctaSecondary: "Partner With the Mission",
    chips: [
      "Food Access",
      "Youth Workforce",
      "Regenerative Farming",
      "Community Resilience",
      "Live Demonstration Site",
    ],
  },
  ES: {
    topBar:
      "🌱 Demo en vivo: Construyendo un futuro centrado en la comunidad a través de la alimentación, la tierra, la juventud y la familia.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Demostración del Ecosistema Bronson Family Farm",
    navExperience: "Experiencia",
    navWhy: "Por qué existe",
    navImpact: "Impacto",
    navPartner: "Asociarse",
    navConnect: "Conectar ahora",
    eyebrow: "Agricultura comunitaria. Caminos laborales. Visión generacional.",
    heroTitle: "Cultivando alimentos, propósito y posibilidad desde la tierra.",
    heroText:
      "Esta plataforma en vivo presenta un ecosistema basado en la tierra diseñado para fortalecer el acceso a los alimentos, capacitar a los jóvenes, apoyar a los productores, activar la participación comunitaria y crear un futuro regenerativo arraigado en Youngstown.",
    ctaPrimary: "Comenzar la experiencia",
    ctaSecondary: "Apoyar la misión",
    chips: [
      "Acceso a alimentos",
      "Fuerza laboral juvenil",
      "Agricultura regenerativa",
      "Resiliencia comunitaria",
      "Sitio de demostración en vivo",
    ],
  },
  TL: {
    topBar:
      "🌱 Live demo: Pagbuo ng kinabukasang nakasentro sa komunidad sa pamamagitan ng pagkain, lupa, kabataan, at pamilya.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Bronson Family Farm Ecosystem Demo",
    navExperience: "Karanasan",
    navWhy: "Bakit ito umiiral",
    navImpact: "Epekto",
    navPartner: "Makipagtulungan",
    navConnect: "Makipag-ugnayan",
    eyebrow: "Agrikulturang pangkomunidad. Mga landas sa trabaho. Panghenerasyong bisyon.",
    heroTitle: "Nagpapalago ng pagkain, layunin, at posibilidad mula sa lupa.",
    heroText:
      "Ipinapakilala ng live platform na ito ang isang ecosystem na nakabatay sa lupa na dinisenyo upang palakasin ang access sa pagkain, sanayin ang kabataan, suportahan ang mga grower, buhayin ang pakikilahok ng komunidad, at lumikha ng regenerative na kinabukasang nakaugat sa Youngstown.",
    ctaPrimary: "Simulan ang karanasan",
    ctaSecondary: "Suportahan ang misyon",
    chips: [
      "Access sa pagkain",
      "Kabataang lakas-paggawa",
      "Regenerative farming",
      "Katatagan ng komunidad",
      "Live demonstration site",
    ],
  },
  IT: {
    topBar:
      "🌱 Demo dal vivo: costruire un futuro centrato sulla comunità attraverso cibo, terra, giovani e famiglia.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Demo Ecosistema Bronson Family Farm",
    navExperience: "Esperienza",
    navWhy: "Perché esiste",
    navImpact: "Impatto",
    navPartner: "Partnership",
    navConnect: "Contattaci",
    eyebrow: "Agricoltura comunitaria. Percorsi di lavoro. Visione generazionale.",
    heroTitle: "Coltivare cibo, scopo e possibilità partendo dalla terra.",
    heroText:
      "Questa piattaforma dal vivo presenta un ecosistema basato sulla terra progettato per rafforzare l’accesso al cibo, formare i giovani, sostenere i coltivatori, attivare la partecipazione della comunità e creare un futuro rigenerativo radicato a Youngstown.",
    ctaPrimary: "Inizia l’esperienza",
    ctaSecondary: "Sostieni la missione",
    chips: [
      "Accesso al cibo",
      "Forza lavoro giovanile",
      "Agricoltura rigenerativa",
      "Resilienza comunitaria",
      "Sito dimostrativo dal vivo",
    ],
  },
  PATWA: {
    topBar:
      "🌱 Live demo: A build one community-centered future through food, land, youth, an family.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "Bronson Family Farm Ecosystem Demo",
    navExperience: "Experience",
    navWhy: "Why dis deh yah",
    navImpact: "Impact",
    navPartner: "Partner",
    navConnect: "Link wid wi",
    eyebrow: "Community farming. Work pathway. Generational vision.",
    heroTitle: "A grow food, purpose, an possibility fram di ground up.",
    heroText:
      "Dis live platform show one land-based ecosystem weh design fi strengthen food access, train youth, support grower dem, activate community participation, an create one regenerative future root up ina Youngstown.",
    ctaPrimary: "Start di experience",
    ctaSecondary: "Support di mission",
    chips: [
      "Food access",
      "Youth workforce",
      "Regenerative farming",
      "Community resilience",
      "Live demonstration site",
    ],
  },
  HE: {
    topBar:
      "🌱 הדגמה חיה: בניית עתיד ממוקד קהילה דרך מזון, אדמה, נוער ומשפחה.",
    brandTitle: "Farm & Family Alliance",
    brandSub: "הדגמת המערכת האקולוגית של Bronson Family Farm",
    navExperience: "חוויה",
    navWhy: "למה זה קיים",
    navImpact: "השפעה",
    navPartner: "שותפות",
    navConnect: "צרו קשר",
    eyebrow: "חקלאות קהילתית. מסלולי עבודה. חזון בין-דורי.",
    heroTitle: "מגדלים מזון, ייעוד ואפשרות מן האדמה כלפי מעלה.",
    heroText:
      "הפלטפורמה החיה הזו מציגה מערכת אקולוגית מבוססת אדמה שנועדה לחזק נגישות למזון, להכשיר צעירים, לתמוך במגדלים, להפעיל השתתפות קהילתית וליצור עתיד מתחדש שמושרש ביונגסטאון.",
    ctaPrimary: "התחילו את החוויה",
    ctaSecondary: "תמכו במשימה",
    chips: [
      "נגישות למזון",
      "כוח עבודה צעיר",
      "חקלאות מתחדשת",
      "חוסן קהילתי",
      "אתר הדגמה חי",
    ],
  },
} as const;

export default function App() {
  const [language, setLanguage] = useState<Language>("EN");
  const t = useMemo(() => copy[language], [language]);
  const isHebrew = language === "HE";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7faf6 0%, #edf4ee 100%)",
        color: "#163a22",
        direction: isHebrew ? "rtl" : "ltr",
      }}
    >
      <div
        style={{
          background: "#0f3a1f",
          color: "white",
          textAlign: "center",
          padding: "12px 16px",
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        {t.topBar}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          padding: "18px 32px",
          borderBottom: "1px solid rgba(22,58,34,0.08)",
          background: "rgba(248,250,247,0.92)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontSize: "24px", fontWeight: 800 }}>
            {t.brandTitle}
          </div>
          <div style={{ fontSize: "14px", color: "#5f7564" }}>
            {t.brandSub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 600 }}>{t.navExperience}</span>
          <span style={{ fontWeight: 600 }}>{t.navWhy}</span>
          <span style={{ fontWeight: 600 }}>{t.navImpact}</span>
          <span style={{ fontWeight: 600 }}>{t.navPartner}</span>

          <button
            style={{
              padding: "12px 22px",
              borderRadius: "999px",
              backgroundColor: "#2d6a4f",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              boxShadow: "0 10px 24px rgba(45,106,79,0.22)",
            }}
          >
            {t.navConnect}
          </button>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #cfd8cf",
              fontWeight: 700,
              background: "white",
              color: "#1f4f2c",
              minWidth: "150px",
            }}
            aria-label="Select language"
          >
            <option value="EN">English</option>
            <option value="ES">Spanish</option>
            <option value="TL">Tagalog</option>
            <option value="IT">Italian</option>
            <option value="PATWA">Jamaican Patwa</option>
            <option value="HE">Hebrew</option>
          </select>
        </div>
      </div>

      <div
        style={{
          maxWidth: "860px",
          margin: "74px auto 0",
          background: "rgba(255,255,255,0.78)",
          borderRadius: "28px",
          boxShadow: "0 16px 42px rgba(0,0,0,0.08)",
          padding: "34px 32px",
          border: "1px solid rgba(22,58,34,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: isHebrew ? "auto" : "-40px",
            left: isHebrew ? "-40px" : "auto",
            top: "50px",
            width: "360px",
            height: "360px",
            opacity: 0.08,
            backgroundImage: "url('/GrowArea.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            filter: "blur(2px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: "999px",
              background: "#e4eee4",
              color: "#1d4a28",
              fontWeight: 700,
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {t.eyebrow}
          </div>

          <h1
            style={{
              fontSize: "clamp(52px, 7vw, 82px)",
              lineHeight: 1.02,
              margin: "0 0 24px",
              fontWeight: 800,
              maxWidth: "780px",
            }}
          >
            {t.heroTitle}
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.55,
              maxWidth: "860px",
              color: "#234230",
              marginBottom: "30px",
            }}
          >
            {t.heroText}
          </p>

          <div style={{ marginBottom: "16px" }}>
            <button
              style={{
                padding: "14px 22px",
                borderRadius: "999px",
                backgroundColor: "#2d6a4f",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "16px",
                marginRight: isHebrew ? 0 : "12px",
                marginLeft: isHebrew ? "12px" : 0,
                marginBottom: "12px",
                boxShadow: "0 10px 24px rgba(45,106,79,0.22)",
              }}
            >
              {t.ctaPrimary}
            </button>

            <button
              style={{
                padding: "14px 22px",
                borderRadius: "999px",
                backgroundColor: "white",
                color: "#1f4f2c",
                border: "2px solid #d7e2d7",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "16px",
                marginRight: isHebrew ? 0 : "12px",
                marginLeft: isHebrew ? "12px" : 0,
                marginBottom: "12px",
              }}
            >
              {t.ctaSecondary}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "22px",
            }}
          >
            {t.chips.map((chip) => (
              <div
                key={chip}
                style={{
                  background: "white",
                  border: "1px solid #e2e9e2",
                  borderRadius: "999px",
                  padding: "10px 14px",
                  fontWeight: 600,
                  color: "#294b34",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: "80px" }} />
    </div>
  );
}
