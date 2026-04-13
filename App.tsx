import { useState } from "react";

export default function App() {
  const [role, setRole] = useState("guest");

  const roles = [
    "guest",
    "customer",
    "grower",
    "volunteer",
    "youth",
    "supervisor",
    "admin",
  ];

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Bronson Family Farm Demo</h1>

      <h2>Select Role</h2>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            style={{
              padding: "10px 16px",
              border: "1px solid #ccc",
              background: role === r ? "#dff0d8" : "white",
              cursor: "pointer",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Current Role: {role}</h3>

        <button
          onClick={() => alert(role + " demo opened")}
          style={{
            padding: "12px 18px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Open Demo
        </button>
      </div>
    </div>
  );
}
