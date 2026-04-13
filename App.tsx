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
        {roles.map((
