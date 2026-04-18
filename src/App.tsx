import React from "react";

export default function App() {
  const heroImage = "/GrowArea.jpg";

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

        .entrance {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          color: white;
        }

        .bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.04);
          animation: zoom 20s ease-in-out infinite alternate;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,15,10,0.2),
            rgba(10,15,10,0.5),
            rgba(5,8,5,0.8)
          );
        }

        .content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          text-align: center;
          padding: 20px;
        }

        .title {
          font-size: clamp(40px, 6vw, 80px);
          line-height: 1;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .subtitle {
          margin-top: 20px;
          max-width: 700px;
          font-size: 20px;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
        }

        .buttons {
          margin-top: 30px;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn {
          padding: 14px 22px;
          border-radius: 999px;
          font-size: 14px;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: #f3f3ea;
          color: #1a241a;
          font-weight: 600;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
        }

        @keyframes zoom {
          0% { transform: scale(1.04); }
          100% { transform: scale(1.1); }
        }
      `}</style>

      <div className="entrance">
        <img
          src={heroImage}
          alt="Farm entrance"
          className="bg-image"
        />

        <div className="overlay" />

        <div className="content">
          <h1 className="title">
            Experience something different.
          </h1>

          <p className="subtitle">
            Step into a living ecosystem of regenerative farming,
            community wellness, workforce development, and local food access.
          </p>

          <div className="buttons">
            <button className="btn btn-primary">
              Enter the Ecosystem
            </button>

            <button className="btn btn-secondary">
              Start Guided Tour
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
