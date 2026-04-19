import React, { useMemo, useState } from "react";

function HomeScreen({
  setScreen,
  language,
  setLanguage,
  weatherText = "44°F · Cloudy · Youngstown",
}: {
  setScreen: (screen: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  weatherText?: string;
}) {
  const now = new Date();
  const hour = now.getHours();
  const month = now.getMonth() + 1;

  const timeOfDay =
    hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const season =
    month >= 3 && month <= 5
      ? "spring"
      : month >= 6 && month <= 8
      ? "summer"
      : month >= 9 && month <= 11
      ? "fall"
      : "winter";

  const greetingMap = {
    morning: [
      "Good morning. What would you like to explore today?",
      "Good morning. What feels meaningful today?",
      "Welcome. What interests you this morning?",
    ],
    afternoon: [
      "Welcome back. What interests you today?",
      "Good afternoon. Where would you like to wander next?",
      "Good afternoon. What draws you in today?",
    ],
    evening: [
      "Good evening. What would you like to explore tonight?",
      "Welcome back. What feels right this evening?",
      "Good evening. Where does your curiosity lead tonight?",
    ],
  };

  const seasonMap = {
    spring: {
      label: "Spring is a season of new growth.",
      sub: "This is a time for seedlings, planning, learning, and new beginnings across the ecosystem.",
      highlights: [
        "Seedlings and Bubble Babies™ are moving into focus.",
        "Learning, planting, and volunteer energy begin to rise.",
        "Youth pathways and seasonal opportunities start opening up.",
      ],
      featured: ["grow", "marketplace", "youth", "events"],
    },
    summer: {
      label: "Summer brings activity, food, and visibility.",
      sub: "This is when the ecosystem feels most alive through produce, events, learning, and community engagement.",
      highlights: [
        "Fresh food and marketplace activity increase.",
        "Events and demonstrations bring people onsite.",
        "The farm becomes a stronger public experience.",
      ],
      featured: ["marketplace", "events", "nutrition", "partner"],
    },
    fall: {
      label: "Fall is a season of harvest, reflection, and giving.",
      sub: "It is a time to gather what has grown, deepen relationships, and strengthen the ecosystem for what comes next.",
      highlights: [
        "Harvest and seasonal food experiences come into focus.",
        "Recipes, wellness, and community gatherings feel timely.",
        "Support and investment conversations become more meaningful.",
      ],
      featured: ["nutrition", "events", "story", "impact"],
    },
    winter: {
      label: "
