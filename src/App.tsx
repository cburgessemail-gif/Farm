import { useState, useEffect } from "react"

type Role = "guest" | "customer" | "grower" | "youth" | "supervisor"

const images: Record<Role, string> = {
  guest: "/GrowArea.jpg",
  customer: "/GrowArea2.jpg",
  grower: "/SAM_0220.JPG",
  youth: "/SAM_0221.JPG",
  supervisor: "/SAM_0222.JPG",
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
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f1ea",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "20px",
          color: "#2f2f2f",
        }}
      >
        Bronson Family Farm
      </h1>

      {/* ROLE BUTTONS */}
      <div style={{ marginBottom: "25px" }}>
        {["guest", "customer", "grower", "youth", "supervisor"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r as Role)}
            style={{
              marginRight: "10px",
              padding: "10px 18px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: role === r ? "#2f6b49" : "#d3d3d3",
              color: role === r ? "#fff" : "#000",
              fontWeight: "bold",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* IMAGE */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={images[role]}
          alt="Farm"
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* ROLE TITLE */}
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "10px",
          textTransform: "capitalize",
        }}
      >
        {role}
      </h2>

      {/* ROLE DESCRIPTION */}
      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        {role === "guest" && "Introduction to the ecosystem and community."}
        {role === "customer" &&
          "Access the marketplace, explore nutrition, and discover recipes."}
        {role === "grower" &&
          "Plan crops, manage harvests, and coordinate growing operations."}
        {role === "youth" &&
          "Engage in workforce development, learning, and hands-on growth."}
        {role === "supervisor" &&
          "Oversee operations, track progress, and guide the ecosystem."}
      </p>

      {/* WEATHER */}
      <p style={{ fontSize: "16px", color: "#444" }}>
        Temperature: {temp === null ? "Loading..." : `${temp}°`}
      </p>
    </div>
  )
}
