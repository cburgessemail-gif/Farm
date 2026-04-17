import { useEffect, useState } from "react"

const roles = ["guest", "customer", "grower", "youth", "supervisor"] as const
type Role = (typeof roles)[number]

const imageMap: Record<Role, string> = {
  guest: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea.jpg",
  customer: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea2.jpg",
  grower: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0221.JPG",
  youth: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0223.JPG",
  supervisor: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0225.JPG",
}

const roleDescriptions: Record<Role, string> = {
  guest: "Introduction to the ecosystem and community.",
  customer: "Explore the marketplace, nutrition, and recipes.",
  grower: "Manage crops, weather, and harvest planning.",
  youth: "Learn teamwork, safety, and growth.",
  supervisor: "Track progress and oversee operations.",
}

export default function App() {
  const [role, setRole] = useState<Role>("guest")
  const [temp, setTemp] = useState<number | null>(null)

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.0998&longitude=-80.6495&current=temperature_2m"
    )
      .then((res) => res.json())
      .then((data) => {
        setTemp(data.current.temperature_2m)
      })
  }, [])

  return (
    <div style={{ fontFamily: "Arial", padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
      
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Bronson Family Farm
      </h1>

      {/* ROLE BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              background: role === r ? "#2d6a4f" : "#ccc",
              color: role === r ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* IMAGE */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={imageMap[role]}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* CONTENT */}
      <h2 style={{ textTransform: "capitalize" }}>{role}</h2>
      <p>{roleDescriptions[role]}</p>

      {/* WEATHER */}
      <div style={{ marginTop: "20px" }}>
        {temp === null ? "Loading weather..." : `Temperature: ${temp}°`}
      </div>

    </div>
  )
}
