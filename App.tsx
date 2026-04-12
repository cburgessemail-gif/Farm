import { useState } from "react";

const images = [
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea.jpg",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea2.jpg",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0220.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0221.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0222.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0223.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0225.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0237.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0238.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0249.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0266.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0274.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0275.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0281.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0282.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0286.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0288.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0289.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0290.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0291.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0293.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0305.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0307.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0309.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0310.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0311.JPG",
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0313.JPG"
];

const slides = [
  {
    kicker: "Bronson Family Farm",
    title: "A Living Workforce + Food System",
    text: "A living system. A growing future. A place where community, food, and purpose come together."
  },
  {
    kicker: "How It Works",
    title: "One Coordinated Ecosystem",
    text: "Bronson Family Farm is the site and production engine. Farm & Family Alliance drives workforce and community programming. Parker Farms strengthens marketplace and distribution capacity."
  },
  {
    kicker: "Youth Workforce",
    title: "Real Work. Real Responsibility.",
    text: "Young people are stepping into opportunity through real participation, teamwork, and visible contribution."
  },
  {
    kicker: "The Land",
    title: "This Is Where It Happens",
    text: "The farm is becoming a place of production, gathering, training, and possibility."
  },
  {
    kicker: "Marketplace",
    title: "Already Live",
    text: "Customers can preorder now through the marketplace, connecting production, pickup, and public access.",
    link: "https://grownby.com/farms/bronson-family-farm/shop"
  },
  {
    kicker: "Roles",
    title: "People Move Through This System",
    text: "Customers, growers, youth workforce, supervisors, partners, and event guests each move through a clear pathway."
  },
  {
    kicker: "Capabilities",
    title: "What This Ecosystem Can Hold",
    text: "Marketplace access, youth development, weather-aware planning, QR check-in, event coordination, and grower participation all fit inside this model."
  },
  {
    kicker: "May 16, 2026",
    title: "Growers Supply Market",
    text: "A public-facing marketplace experience connecting growers, customers, education, and community energy in one place."
  },
  {
    kicker: "Now Scaling",
    title: "What Is Needed Now",
    text: "This is already working. The next stage is irrigation, fencing, infrastructure, and site planning."
  }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const currentImage = images[index % images.length];
  const currentSlide = slides[index % slides.length];

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div
          style={{
            ...styles.heroImage,
            backgroundImage: `url("${currentImage}")`,
          }}
        />
        <div style={styles.imageTint} />
        <div style={styles.overlay} />

        <div style={styles.content}>
          <div style={styles.kicker}>{currentSlide.kicker}</div>
          <h1 style={styles.title}>{currentSlide.title}</h1>
          <p style={styles.text}>{currentSlide.text}</p>

          {currentSlide.link && (
            <a
              href={currentSlide.link}
              target="_blank"
              rel="noreferrer"
              style={styles.cta}
            >
              Open Marketplace
            </a>
          )}

          <div style={styles.nav}>
            <button
              style={styles.secondary}
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            >
              Back
            </button>

            <button
              style={styles.primary}
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
            >
              {index === slides.length - 1 ? "Restart" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#edf5ea",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  hero: {
    minHeight: "calc(100vh - 40px)",
    borderRadius: 28,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
  },
  heroImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  imageTint: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.18)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.55))",
  },
  content: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 40,
    color: "white",
    maxWidth: 900,
  },
  kicker: {
    fontSize: 14,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 700,
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: 52,
    lineHeight: 1.05,
    maxWidth: 840,
    textShadow: "0 2px 14px rgba(0,0,0,0.35)",
  },
  text: {
    marginTop: 16,
    marginBottom: 0,
    fontSize: 24,
    lineHeight: 1.5,
    maxWidth: 820,
    textShadow: "0 2px 12px rgba(0,0,0,0.30)",
  },
  cta: {
    display: "inline-block",
    marginTop: 20,
    padding: "14px 20px",
    borderRadius: 12,
    background: "#1f5f2b",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
  },
  nav: {
    marginTop: 28,
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  primary: {
    padding: "14px 18px",
    borderRadius: 12,
    border: "none",
    background: "#ffffff",
    color: "#1f5f2b",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondary: {
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
};
