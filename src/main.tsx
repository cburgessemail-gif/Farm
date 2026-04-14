import React from "react";
import ReactDOM from "react-dom/client";

function TestApp() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "yellow",
        fontSize: "40px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      ROOT MAIN.TSX IS LOADING
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
);
