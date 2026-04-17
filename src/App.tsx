import { useEffect, useMemo, useRef, useState } from "react"

type Role = "guest" | "customer" | "grower" | "youth" | "supervisor"
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"

const roles: Role[] = ["guest", "customer", "grower", "youth", "supervisor"]

const imageMap: Record<Role, string> = {
  guest: "/GrowArea.jpg",
  customer: "/GrowArea2.jpg",
  grower: "/SAM_0220.JPG",
  youth: "/SAM_0221.JPG",
  supervisor: "/SAM_0222.JPG",
}

const languageOptions: { key: LangKey; label: string }[] = [
  { key: "en", label: "English" },
  { key: "es", label: "Español" },
 
