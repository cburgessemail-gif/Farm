import React from "react";
import heroImage from "./GrowArea.jpg";

export default function App() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          min-height: 100%;
          width: 100%;
          font-family: Georgia, "Times New Roman", serif;
          background: #0e120d;
        }

        .entrance-shell {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          color: #ffffff;
          background: #0e120d;
        }

        .hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.04);
          animation: slowZoom 18s ease-in-out infinite alternate;
        }

        .overlay-dark {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom,
              rgba(8, 13, 8, 0.20),
              rgba(8, 13, 8, 0.40),
              rgba(8, 13, 8, 0.70));
        }

        .overlay-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center,
              rgba(95, 120, 80, 0.10) 0%,
              rgba(10, 14, 10, 0.30) 45%,
              rgba(4, 7, 4, 0.68) 100%);
        }

        .topbar {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 34px;
        }

        .brand-group {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .pill {
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.92);
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .pill.subtle {
          color: rgba(255,255,255,0.75);
          background: rgba(0,0,0,0.18);
        }

        .lang-select {
          position: relative;
          z-index: 2;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.22);
          color: white;
          padding: 10px 16px;
          font-size: 14px;
          outline: none;
          backdrop-filter: blur(10px);
        }

        .main-wrap {
          position: relative;
          z-index: 2;
          min-height: calc(100vh - 96px);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: end;
          padding: 30px 34px 60px;
          max-width: 1360px;
          margin: 0 auto;
        }

        .left-col {
          max-width: 820px;
          align-self: center;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(10px);
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.86);
        }

        .headline {
          margin: 0;
          font-size: clamp(48px, 7vw, 96px);
          line-height: 0.98;
          letter-spacing: -0.04em;
          font-weight: 500;
          text-shadow: 0 4px 18px rgba(0,0,0,0.28);
        }

        .subtext {
          margin-top: 24px;
          max-width: 760px;
          font-size: clamp(18px, 2.1vw, 24px);
          line-height: 1.7;
          color: rgba(255,255,255,0.88);
          text-shadow: 0 2px 10px rgba(0,0,0,0.26);
        }

        .subtext.small {
          font-size: 18px;
          max-width: 690px;
          color: rgba(255,255,255,0.72);
          margin-top: 14px;
        }

        .button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 34px;
        }

        .btn {
          border: none;
          border-radius: 999px;
          padding: 15px 24px;
          font-size: 15px;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn.primary {
          background: #f4f4eb;
          color: #182018;
          font-weight: 600;
        }

        .btn.secondary {
          background: rgba(255,255,255,0.10);
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(10px);
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 36px;
        }

        .feature-card {
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.20);
          backdrop-filter: blur(10px);
          padding: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.16);
        }

        .feature-title {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 600;
        }

        .feature-copy {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255,255,255,0.76);
        }

        .right-col {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }

        .glass-panel {
          width: 100%;
          max-width: 430px;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(to bottom, rgba(255,255,255,0.14), rgba(255,255,255,0.06));
          backdrop-filter: blur(16px);
          padding: 18px;
          box-shadow: 0 22px 60px rgba(0,0,0,0.28);
        }

        .glass-inner {
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(0,0,0,0.22);
          padding: 22px;
        }

        .panel-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.20em;
          color: rgba(255,255,255,0.60);
          margin-bottom: 16px;
        }

        .panel-box {
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.05);
          padding: 16px;
          margin-bottom: 14px;
        }

        .panel-box h3 {
          margin: 0 0 8px;
          font-size: 17px;
          font-weight: 600;
        }

        .panel-box p {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255,255,255,0.74);
        }

        .panel-highlight {
          margin-top: 18px;
          border-radius: 22px;
          border: 1px solid rgba(210, 240, 210, 0.10);
          background: rgba(180, 220, 180, 0.08);
          padding: 16px;
        }

        .panel-highlight .small-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.58);
        }

        .panel-highlight .headline-mini {
          margin-top: 10px;
          font-size: 28px;
          line-height: 1.15;
          color: white;
        }

        .panel-highlight p {
          margin: 10px 0 0;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.72);
        }

        @keyframes slowZoom {
          0% { transform: scale(1.04); }
          100% { transform: scale(1.10); }
        }

        @media (max-width: 1080px) {
          .main-wrap {
            grid-template-columns: 1fr;
            gap: 28px;
            align-items: center;
          }

          .right-col {
            justify-content: flex-start;
          }

          .glass-panel {
            max-width: 100%;
          }
        }

        @media (max-width: 720px) {
          .topbar {
            padding: 22px 18px;
            gap: 14px;
            align-items: flex-start;
            flex-direction: column;
          }

          .main-wrap {
            padding: 10px 18px 38px;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .headline {
            font-size: 44px;
          }

          .subtext {
            font-size: 18px;
          }

          .subtext.small {
            font-size: 16px;
          }

          .button-row {
            flex-direction: column;
            align-items: stretch;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="entrance-shell">
        <img
          src={heroImage}
          alt="Bronson Family Farm entrance pathway"
          className="hero-image"
        />

        <div className="overlay-dark" />
        <div className="overlay-vignette" />

        <div className="topbar">
          <div className="brand-group">
            <div className="pill">Bronson Family Farm</div>
            <div className="pill subtle">Living Demo</div>
          </div>

          <select className="lang-select" defaultValue="English">
            <option>English</option>
            <option>Español</option>
            <option>Tagalog</option>
            <option>Italiano</option>
            <option>Patwa</option>
            <option>עברית</option>
          </select>
        </div>

        <div className="main-wrap">
          <div className="left-col">
            <div className="eyebrow">Step Into the Ecosystem</div>

            <h1 className="headline">Experience something different.</h1>

            <div className="subtext">
              Enter a living farm ecosystem shaped by regenerative growing,
              workforce development, family wellness, community learning, and a
              future-facing local food system.
            </div>

            <div className="subtext small">
              This is not just a website. It is an immersive pathway into the
              Bronson Family Farm vision.
            </div>

            <div className="button-row">
              <button className="btn primary">Enter the Ecosystem</button>
              <button className="btn secondary">Start Guided Tour</button>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <h3 className="feature-title">Grow</h3>
                <p className="feature-copy">
                  Explore regenerative farming, crop pathways, seasonal
                  planning, and produce systems.
                </p>
              </div>

              <div className="feature-card">
                <h3 className="feature-title">Belong</h3>
                <p className="feature-copy">
                  Discover role-based experiences for guests, customers,
                  growers, youth, and partners.
                </p>
              </div>

              <div className="feature-card">
                <h3 className="feature-title">Enter</h3>
                <p className="feature-copy">
                  Move from story into live interaction with the farm ecosystem.
                </p>
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="glass-panel">
              <div className="glass-inner">
                <div className="panel-label">Entrance Preview</div>

                <div className="panel-box">
                  <h3>Guided access</h3>
                  <p>
                    Let visitors choose a language and enter through a narrated
                    introduction instead of static slides.
                  </p>
                </div>

                <div className="panel-box">
                  <h3>Natural movement</h3>
                  <p>
                    Use gentle motion and layered shadows so the entrance feels
                    alive, immersive, and welcoming.
                  </p>
                </div>

                <div className="panel-box">
                  <h3>Clear next step</h3>
                  <p>
                    The first action should lead people directly into the
                    ecosystem, not into a presentation layout.
                  </p>
                </div>

                <div className="panel-highlight">
                  <div className="small-label">Recommended headline</div>
                  <div className="headline-mini">Step Into the Farm</div>
                  <p>
                    Or keep your current line:
                    <em> “Experience something different.”</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
