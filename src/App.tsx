import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  GraduationCap,
  HeartPulse,
  Home,
  Info,
  Languages,
  Leaf,
  Mic,
  Play,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Store,
  Tractor,
  Trees,
  UserRound,
  Users,
  X,
} from "lucide-react";

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";
type ScreenKey =
  | "home"
  | "story"
  | "guest"
  | "customer"
  | "marketplace"
  | "grower"
  | "valueAdded"
  | "youth"
  | "volunteers"
  | "planner"
  | "events"
  | "wellness"
  | "closing";

type YouthViewKey = "overview" | "parent" | "supervisor";

type RecipeCard = {
  title: string;
  text: string;
  details: string;
};

type Destination =
  | { type: "screen"; value: ScreenKey }
  | { type: "url"; value: string }
  | { type: "image"; value: string }
  | { type: "recipe"; value: string }
  | { type: "youth"; value: YouthViewKey };

type JourneyNode = {
  title: string;
  description: string;
  destinationLabel: string;
};

const IMAGES = {
  entrance: "/GrowArea.jpg",
  story: "/large (10).jpg",
  guest: "/Samaeera1.jpg",
  customer: "/Samerra4.jpg",
  marketplace: "/SAM_0223.JPG",
  grower: "/SAM_0313.JPG",
  valueAdded: "/culinary_mushrooms.jpeg",
  youth: "/large (11).jpg",
  volunteers: "/SAM_0290.JPG",
  community: "/WolfSpider.jpg",
  education: "/SAM_0275.JPG",
  wellness: "/culinary_edibleflowers.jpeg",
  events: "/SAM_0282.JPG",
  planning: "/GrowArea2.jpg",
  family: "/large (1).jpg",
  logistics: "/SAM_0309.JPG",
  airport: "/SAM_0311.JPG",
  produce: "/SAM_0223.JPG",
  training: "/SAM_0249.JPG",
  recipes: "/culinary_mushrooms.jpeg",
  nutrition: "/culinary_edibleflowers.jpeg",
  future: "/SAM_0310.JPG",
  legacy: "/SAM_0311.JPG",
  growArea: "/GrowArea.jpg",
  closing: "/SAM_0311.JPG",
};

const SCREEN_ORDER: ScreenKey[] = [
  "home",
  "story",
  "guest",
  "customer",
  "marketplace",
  "grower",
  "valueAdded",
  "youth",
  "volunteers",
  "planner",
  "events",
  "wellness",
  "closing",
];

const TOUR_ROUTE: ScreenKey[] = [
  "home",
  "story",
  "guest",
  "customer",
  "marketplace",
  "wellness",
  "grower",
  "planner",
  "youth",
  "volunteers",
  "events",
  "closing",
  "home",
];

const SCREEN_IMAGES: Record<ScreenKey, string> = {
  home: IMAGES.entrance,
  story: IMAGES.story,
  guest: IMAGES.entrance,
  customer: IMAGES.entrance,
  marketplace: IMAGES.entrance,
  grower: IMAGES.growArea,
  valueAdded: IMAGES.growArea,
  youth: IMAGES.growArea,
  volunteers: IMAGES.growArea,
  planner: IMAGES.planning,
  events: IMAGES.entrance,
  wellness: IMAGES.entrance,
  closing: IMAGES.closing,
};

const SCREEN_LABELS: Record<ScreenKey, string> = {
  home: "Entrance",
  story: "Our Story",
  guest: "Guest",
  customer: "Customer",
  marketplace: "Marketplace",
  grower: "Grower",
  valueAdded: "Value-Added Producer",
  youth: "Youth Workforce",
  volunteers: "Volunteers",
  planner: "Planner",
  events: "Events",
  wellness: "Wellness",
  closing: "Next Steps",
};

const RECIPES: RecipeCard[] = [
  {
    title: "Collard Greens Bowl",
    text: "A simple bowl using collards, onions, peppers, and beans with a light seasoning approach.",
    details:
      "Use collards as the anchor, add onions and peppers for flavor, then pair with beans or another simple protein. This supports a low-cost, fiber-rich meal that connects fresh greens with everyday cooking.",
  },
  {
    title: "Fresh Tomato & Cucumber Salad",
    text: "A quick fresh-food option that helps people compare natural ingredients with processed alternatives.",
    details:
      "Slice tomatoes and cucumbers, add a light vinaigrette or lemon, and season gently. This recipe makes fresh food feel easy, visible, and approachable.",
  },
  {
    title: "Broccoli & Cabbage Stir-Fry",
    text: "A practical meal idea built around vegetables, color, fiber, and low-cost family cooking.",
    details:
      "Use broccoli, cabbage, garlic, and a small amount of oil with basic seasonings. This supports the idea that healthy meals can be made with simple ingredients and flexible portions.",
  },
  {
    title: "Pepper and Greens Skillet",
    text: "A flexible stove-top recipe using greens, peppers, garlic, and simple pantry ingredients.",
    details:
      "This is a practical everyday recipe that works with what the farm grows. It supports the message that fresh produce can fit work, play, and everyday home life.",
  },
  {
    title: "Lettuce Wrap Meal Prep",
    text: "A lighter meal-prep option that connects fresh produce with healthier everyday habits.",
    details:
      "Use lettuce as the wrap and fill with chopped vegetables, beans, or lean protein. This is good for portion awareness, freshness, and lighter meal choices.",
  },
  {
    title: "Diabetes-Friendly Produce Plate",
    text: "A visual way to connect vegetables, portion awareness, and practical food choices for everyday wellness.",
    details:
      "Arrange non-starchy vegetables, fresh greens, and a balanced protein portion in a simple plate model. This supports diabetes awareness without making the experience feel clinical.",
  },
];

const DESTINATIONS: Record<string, Destination> = {
  Entrance: { type: "screen", value: "home" },
  "Our Story": { type: "screen", value: "story" },
  "Role Pathways": { type: "screen", value: "guest" },
  "View Events": { type: "screen", value: "events" },
  "Health & Nutrition": { type: "screen", value: "wellness" },
  "Go to Marketplace": { type: "screen", value: "marketplace" },
  "Open Crop Planner": { type: "screen", value: "planner" },
  "Next Steps": { type: "screen", value: "closing" },

  Story: { type: "screen", value: "story" },
  Events: { type: "screen", value: "events" },
  Gallery: { type: "image", value: IMAGES.community },
  Guest: { type: "screen", value: "guest" },
  Customer: { type: "screen", value: "customer" },
  Planner: { type: "screen", value: "planner" },
  Wellness: { type: "screen", value: "wellness" },
  Marketplace: { type: "screen", value: "marketplace" },

  Recipes: { type: "screen", value: "wellness" },
  Nutrition: { type: "screen", value: "wellness" },
  "Fresh Food": { type: "screen", value: "marketplace" },
  Seedlings: { type: "screen", value: "marketplace" },
  "Bubble Babies": { type: "screen", value: "marketplace" },

  "Seasonal Guidance": { type: "screen", value: "planner" },
  Coordination: { type: "image", value: IMAGES.training },
  "Grower Path": { type: "screen", value: "grower" },
  "Inventory to Market": { type: "screen", value: "marketplace" },
  "Event Readiness": { type: "screen", value: "events" },
  "Seasonal Events": { type: "screen", value: "events" },

  Branding: { type: "screen", value: "valueAdded" },
  Packaging: { type: "screen", value: "valueAdded" },
  "Market Access": { type: "screen", value: "marketplace" },
  Demonstrations: { type: "screen", value: "events" },
  "Product Presentation": { type: "image", value: IMAGES.produce },

  Learning: { type: "screen", value: "youth" },
  "Parent Portal": { type: "youth", value: "parent" },
  Support: { type: "youth", value: "supervisor" },
  "Program Overview": { type: "youth", value: "overview" },
  "Supervisor Support": { type: "youth", value: "supervisor" },
  "STEAM & Training": { type: "image", value: IMAGES.training },
  "Learning Schedule": { type: "screen", value: "planner" },
  "Youth Workforce": { type: "screen", value: "youth" },

  Service: { type: "screen", value: "volunteers" },
  Community: { type: "screen", value: "wellness" },
  "Event Support": { type: "screen", value: "events" },
  "Youth Connection": { type: "screen", value: "youth" },
  "Community Care": { type: "screen", value: "wellness" },
  "Volunteer Path": { type: "screen", value: "volunteers" },
  Volunteers: { type: "screen", value: "volunteers" },

  GrownBy: {
    type: "url",
    value: "https://grownby.com/farms/bronson-family-farm/shop",
  },
  "Shop Now": {
    type: "url",
    value: "https://grownby.com/farms/bronson-family-farm/shop",
  },
  "Open Full GrownBy Store": {
    type: "url",
    value: "https://grownby.com/farms/bronson-family-farm/shop",
  },
  "Shop Fresh Food": { type: "screen", value: "marketplace" },
  Preorders: { type: "screen", value: "marketplace" },
  "Return Visits": { type: "screen", value: "customer" },
  "Back to Customer Path": { type: "screen", value: "customer" },
  "Recipes & Nutrition": { type: "screen", value: "wellness" },
  "Food Guidance": { type: "screen", value: "wellness" },
  "Open Marketplace": {
    type: "url",
    value: "https://grownby.com/farms/bronson-family-farm/shop",
  },

  "Nutrition View": { type: "image", value: IMAGES.nutrition },
  "Fresh Choices": { type: "screen", value: "customer" },
  "Diabetes Awareness": { type: "screen", value: "wellness" },
  "Healthier at Home": { type: "screen", value: "wellness" },

  "Collard Greens Bowl": { type: "recipe", value: "Collard Greens Bowl" },
  "Fresh Tomato & Cucumber Salad": {
    type: "recipe",
    value: "Fresh Tomato & Cucumber Salad",
  },
  "Broccoli & Cabbage Stir-Fry": {
    type: "recipe",
    value: "Broccoli & Cabbage Stir-Fry",
  },
  "Pepper and Greens Skillet": {
    type: "recipe",
    value: "Pepper and Greens Skillet",
  },
  "Lettuce Wrap Meal Prep": {
    type: "recipe",
    value: "Lettuce Wrap Meal Prep",
  },
  "Diabetes-Friendly Produce Plate": {
    type: "recipe",
    value: "Diabetes-Friendly Produce Plate",
  },

  "Guest Experiences": { type: "screen", value: "guest" },
  "Health Education": { type: "screen", value: "wellness" },
  "Enter as Guest": { type: "screen", value: "guest" },
  "Community Experiences": { type: "screen", value: "events" },
  "Legacy View": { type: "image", value: IMAGES.legacy },
  "Coordination View": { type: "image", value: IMAGES.training },
};

const PATHWAY_STEPS: Record<ScreenKey, { title: string; text: string; goTo: ScreenKey }[]> = {
  home: [
    {
      title: "Start here",
      text: "Enter the ecosystem and choose a pathway.",
      goTo: "guest",
    },
    {
      title: "Explore food access",
      text: "Move toward customer and marketplace experiences.",
      goTo: "customer",
    },
    {
      title: "See the working farm",
      text: "Open planning, events, and grower pathways.",
      goTo: "planner",
    },
  ],
  story: [
    {
      title: "See the vision",
      text: "Understand the farm’s legacy and purpose.",
      goTo: "guest",
    },
    {
      title: "Experience the land",
      text: "Move into the guest pathway.",
      goTo: "guest",
    },
    {
      title: "Join a live experience",
      text: "Continue into events.",
      goTo: "events",
    },
  ],
  guest: [
    {
      title: "Understand the place",
      text: "Start with the farm story.",
      goTo: "story",
    },
    {
      title: "See events",
      text: "Discover what brings people back.",
      goTo: "events",
    },
    {
      title: "Move toward participation",
      text: "Continue into customer, volunteer, or youth pathways.",
      goTo: "customer",
    },
  ],
  customer: [
    {
      title: "See food access",
      text: "Start with fresh food, seedlings, and guidance.",
      goTo: "marketplace",
    },
    {
      title: "Get recipes",
      text: "Move into wellness and practical food use.",
      goTo: "wellness",
    },
    {
      title: "Return to shop",
      text: "Come back to marketplace action.",
      goTo: "marketplace",
    },
  ],
  marketplace: [
    {
      title: "Shop through GrownBy",
      text: "Move directly into the store.",
      goTo: "marketplace",
    },
    {
      title: "Connect food to guidance",
      text: "Continue into wellness
