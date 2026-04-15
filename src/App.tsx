import React, { useState } from "react";

export default function App() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#eef8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #2f6b3c",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "720px",
            width: "100%",
            boxSizing: "border-box",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              margin: "0 0 16px 0",
              color: "#16351f",
              fontSize: "48px",
              lineHeight: 1.1,
            }}
          >
            Bronson Family Farm
          </h1>

          <p
            style={{
              margin: "0 0 24px 0",
              color: "#35533c",
              fontSize: "22px",
              lineHeight: 1.4,
            }}
          >
            A Living Ecosystem for Growing, Learning, and Community
          </p>

          <button
            onClick={() => setEntered(true)}
            style={{
              backgroundColor: "#2f6b3c",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "14px 22px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Enter the Farm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef8f0",
        fontFamily: "Arial, sans-serif",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #2f6b3c",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px 0",
              color: "#16351f",
              fontSize: "36px",
            }}
          >
            Farm Ecosystem Explorer
          </h2>

          <p
            style={{
              margin: 0,
              color: "#35533c",
              fontSize: "18px",
              lineHeight: 1.5,
            }}
          >
            The app is working. This is the visible reset version.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {[
            "Grow",
            "Shop",
            "Learn",
            "Participate",
            "Community Impact",
            "Events",
          ].map((item) => (
            <div
              key={item}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #cfe0d2",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#16351f",
                  fontSize: "24px",
                }}
              >
                {item}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#4b6652",
                  fontSize: "16px",
                  lineHeight: 1.5,
                }}
              >
                Visible test card for the ecosystem layout.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
