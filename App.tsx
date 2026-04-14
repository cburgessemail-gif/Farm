import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);

  const screens = [
    {
      title: "Why This Matters",
      text: "Across our communities, families face rising food costs, limited access to fresh produce, and disconnection from the land. We are rebuilding that connection.",
    },
    {
      title: "What We’re Building",
      text: "Farm & Family Alliance connects land, people, and purpose — growing food, training youth, and building a local, sustainable economy.",
    },
    {
      title: "The Ecosystem",
      text: "Growers. Families. Youth. Volunteers. A complete system where everyone plays a role in producing, learning, and thriving together.",
    },
    {
      title: "Live System",
      text: "From seedlings to harvest, from orders to community engagement — this is a living, working ecosystem happening in real time.",
    },
    {
      title: "The Impact",
      text: "1,000 individuals served. Youth workforce development. Local food access. A regenerative model for communities everywhere.",
    },
    {
      title: "Help Us Build This",
      text: "This is more than a farm. It’s infrastructure for the future. Join us in building something that will outlast us.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundImage: "url('/GrowArea.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#1b4332",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(6px)",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        {/* HEADER */}
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          Farm & Family Alliance
        </h1>

        {/* HERO */}
        {step === 0 && (
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "2rem" }}>
              Building a self-sustaining food, workforce, and family ecosystem —
              from the ground up.
            </h2>

            <p style={{ marginTop: "20px", maxWidth: "600px" }}>
              Connecting land, people, and purpose to grow food, train youth, and
              rebuild communities in Youngstown and beyond.
            </p>

            <div style={{ marginTop: "30px" }}>
              <button onClick={() => setStep(1)} style={btn}>
                Enter the Farm Experience
              </button>
              <button onClick={() => setStep(3)} style={btnOutline}>
                Explore the Ecosystem
              </button>
              <button onClick={() => setStep(5)} style={btnOutline}>
                Support the Mission
              </button>
            </div>
          </div>
        )}

        {/* FLOW SCREENS */}
        {step > 0 && step < 6 && (
          <div style={{ marginTop: "60px" }}>
            <h2 style={{ fontSize: "2rem" }}>
              {screens[step - 1].title}
            </h2>

            <p style={{ marginTop: "20px", maxWidth: "600px" }}>
              {screens[step - 1].text}
            </p>

            <div style={{ marginTop: "30px" }}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} style={btnOutline}>
                  Back
                </button>
              )}
              <button onClick={() => setStep(step + 1)} style={btn}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* FINAL SCREEN */}
        {step === 6 && (
          <div style={{ marginTop: "60px" }}>
            <h2 style={{ fontSize: "2rem" }}>
              This is not just a farm.
            </h2>

            <p style={{ marginTop: "20px", maxWidth: "600px" }}>
              This is infrastructure for the future of food, family, and
              community.
              <br />
              And it starts here.
            </p>

            <div style={{ marginTop: "30px" }}>
              <button style={btn}>Invest in the Farm</button>
              <button style={btnOutline}>Partner With Us</button>
              <button style={btnOutline}>Visit the Farm</button>
            </div>

            <div style={{ marginTop: "40px" }}>
              <button onClick={() => setStep(0)} style={btnOutline}>
                Restart Experience
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const btn = {
  padding: "12px 20px",
  marginRight: "10px",
  backgroundColor: "#2d6a4f",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnOutline = {
  padding: "12px 20px",
  marginRight: "10px",
  backgroundColor: "transparent",
  color: "#2d6a4f",
  border: "2px solid #2d6a4f",
  borderRadius: "8px",
  cursor: "pointer",
};
