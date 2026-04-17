import { useState, useEffect } from "react"

type Role = "guest" | "customer" | "grower" | "youth" | "supervisor"

const images: Record<Role, string> = {
  guest: "/GrowArea.jpg",
  customer: "/GrowArea2.jpg",
  grower: "/SAM_0221.JPG",
  youth: "/SAM_0223.JPG",
  supervisor: "/SAM_0225.JPG",
}

export default function App() {
  const [role, setRole] = useState<Role>("guest")
  const [temp, setTemp] = useState<number | null>(null)

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.0998&longitude=-80.6495&current=temperature_2m"
    )
      .then((res) => res.json())
      .then((data) => setTemp(data.current.temperature_2m))
      .catch(() => setTemp(null))
  }, [])

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f4f1ea",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
        Bronson Family Farm
      </h1>

      <div style={{ marginBottom: "20px" }}>
        {["guest", "customer", "grower", "youth", "supervisor"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r as Role)}
            style={{
              marginRight: "10px",
              padding: "10px 16px",
              background: role === r ? "#2f6b49" : "#ccc",
              color: role === r ? "#fff" : "#000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <img
        src={images[role]}
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <h2 style={{ marginTop: "20px" }}>{role}</h2>

      <p>
        {role === "guest" && "Introduction to the ecosystem and community."}
        {role === "customer" && "Marketplace, nutrition, and recipes."}
        {role === "grower" && "Crop planning and harvest coordination."}
        {role === "youth" && "Workforce development and growth."}
        {role === "supervisor" && "Oversight, tracking, and guidance."}
      </p>

      <p>
        Temperature: {temp === null ? "Loading..." : `${temp}°`}
      </p>
    </div>
  )
}
