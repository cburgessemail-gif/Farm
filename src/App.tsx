import React, { useEffect, useMemo, useRef, useState } from "react";

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";
type ScreenKey =
  | "entrance"
  | "guest"
  | "customer"
  | "grower"
  | "producer"
  | "youth"
  | "marketplace"
  | "admin";

type YouthView = "overview" | "parent" | "supervisor";

type LangPack = {
  languageName: string;
  dir: "ltr" | "rtl";
  appTitle: string;
  appSubtitle: string;
  enterDemo: string;
  guidedDemo: string;
  stopGuidedDemo: string;
  backHome: string;
  toMarketplace: string;
  pathways: string;
  weather: string;
  cropPlanner: string;
  youthTitle: string;
  youthParent: string;
  youthSupervisor: string;
  startHere: string;
  welcomeHeadline: string;
  welcomeBody: string;
  discoverHeadline: string;
  discoverBody: string;
  customerHeadline: string;
  customerBody: string;
  growerHeadline: string;
  growerBody: string;
  producerHeadline: string;
  producerBody: string;
  youthHeadline: string;
  youthBody: string;
  adminHeadline: string;
  adminBody: string;
  marketHeadline: string;
  marketBody: string;
  footer: string;
  cards: {
    guest: string;
    customer: string;
    grower: string;
    producer: string;
    youth: string;
    admin: string;
  };
  guidedSteps: string[];
};

const translations: Record<LanguageKey, LangPack> = {
  en: {
    languageName: "English",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "A place-based ecosystem for food, family, wellness, youth, and opportunity",
    enterDemo: "Enter Demo",
    guidedDemo: "Start Guided Tour",
    stopGuidedDemo: "Stop Guided Tour",
    backHome: "Back Home",
    toMarketplace: "Go to Marketplace",
    pathways: "Pathways",
    weather: "Weather",
    cropPlanner: "Crop Planner",
    youthTitle: "Youth Workforce",
    youthParent: "Parent Portal",
    youthSupervisor: "Supervisor View",
    startHere: "Start Here",
    welcomeHeadline: "A living ecosystem, not just a farm.",
    welcomeBody:
      "Bronson Family Farm is a place-based system that connects land, family, food, learning, health, growers, markets, and future opportunity.",
    discoverHeadline: "Guest Experience",
    discoverBody:
      "Guests discover the story, mission, environment, and larger purpose of the farm as the front door into the ecosystem.",
    customerHeadline: "Customer Experience",
    customerBody:
      "Customers move from interest to action through food access, recipes, nutrition learning, produce visibility, and marketplace connection.",
    growerHeadline: "Grower Experience",
    growerBody:
      "Growers engage planning, production flow, weather awareness, crop timing, and ecosystem-based opportunity.",
    producerHeadline: "Value-Added Producer Experience",
    producerBody:
      "Producers connect products, storytelling, events, visibility, and pathways into broader community value.",
    youthHeadline: "Youth Workforce Experience",
    youthBody:
      "Young people gain real-world learning, responsibility, support, and family-connected pathways inside a structured farm environment.",
    adminHeadline: "Leadership Experience",
    adminBody:
      "Leadership sees the ecosystem as a whole: engagement, operations, visibility, planning, learning, and long-term community impact.",
    marketHeadline: "Marketplace Experience",
    marketBody:
      "The marketplace is where produce, education, visibility, and community participation meet.",
    footer: "Bronson Family Farm is growing food, people, and future.",
    cards: {
      guest: "Guest",
      customer: "Customer",
      grower: "Grower",
      producer: "Value-Added Producer",
      youth: "Youth Workforce",
      admin: "Leadership",
    },
    guidedSteps: [
      "Welcome to Bronson Family Farm. This is a living ecosystem rooted in place.",
      "Guests begin with story, atmosphere, and mission.",
      "Customers discover food, recipes, nutrition, and marketplace pathways.",
      "Growers use weather, planning, and crop timing to guide decisions.",
      "Youth workforce participants experience learning, responsibility, and support.",
      "The marketplace brings the entire experience together."
    ]
  },
  es: {
    languageName: "Español",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "Un ecosistema basado en lugar para alimentos, familia, bienestar, juventud y oportunidad",
    enterDemo: "Entrar al Demo",
    guidedDemo: "Iniciar Recorrido",
    stopGuidedDemo: "Detener Recorrido",
    backHome: "Volver al Inicio",
    toMarketplace: "Ir al Mercado",
    pathways: "Rutas",
    weather: "Clima",
    cropPlanner: "Planificador de Cultivos",
    youthTitle: "Fuerza Laboral Juvenil",
    youthParent: "Portal para Padres",
    youthSupervisor: "Vista del Supervisor",
    startHere: "Comenzar Aquí",
    welcomeHeadline: "Un ecosistema vivo, no solo una finca.",
    welcomeBody:
      "Bronson Family Farm es un sistema basado en lugar que conecta tierra, familia, alimentos, aprendizaje, salud, productores, mercados y oportunidad futura.",
    discoverHeadline: "Experiencia del Visitante",
    discoverBody:
      "Los visitantes descubren la historia, la misión, el entorno y el propósito más amplio de la finca como puerta de entrada al ecosistema.",
    customerHeadline: "Experiencia del Cliente",
    customerBody:
      "Los clientes pasan del interés a la acción mediante acceso a alimentos, recetas, nutrición, visibilidad de productos y conexión con el mercado.",
    growerHeadline: "Experiencia del Productor",
    growerBody:
      "Los productores trabajan con planificación, flujo de producción, conciencia del clima, tiempos de cultivo y oportunidades del ecosistema.",
    producerHeadline: "Experiencia de Valor Agregado",
    producerBody:
      "Los productores conectan productos, narrativa, eventos, visibilidad y rutas hacia un valor comunitario más amplio.",
    youthHeadline: "Experiencia Juvenil",
    youthBody:
      "Los jóvenes adquieren aprendizaje real, responsabilidad, apoyo y rutas conectadas con la familia dentro de un entorno agrícola estructurado.",
    adminHeadline: "Experiencia de Liderazgo",
    adminBody:
      "El liderazgo ve el ecosistema completo: participación, operaciones, visibilidad, planificación, aprendizaje e impacto comunitario a largo plazo.",
    marketHeadline: "Experiencia del Mercado",
    marketBody:
      "El mercado es donde se unen productos, educación, visibilidad y participación comunitaria.",
    footer: "Bronson Family Farm cultiva alimentos, personas y futuro.",
    cards: {
      guest: "Visitante",
      customer: "Cliente",
      grower: "Productor",
      producer: "Valor Agregado",
      youth: "Juventud",
      admin: "Liderazgo",
    },
    guidedSteps: [
      "Bienvenido a Bronson Family Farm. Este es un ecosistema vivo basado en lugar.",
      "Los visitantes comienzan con historia, ambiente y misión.",
      "Los clientes descubren alimentos, recetas, nutrición y rutas al mercado.",
      "Los productores usan clima, planificación y tiempos de cultivo para orientar decisiones.",
      "La fuerza laboral juvenil vive aprendizaje, responsabilidad y apoyo.",
      "El mercado reúne toda la experiencia."
    ]
  },
  tl: {
    languageName: "Filipino",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "Isang place-based ecosystem para sa pagkain, pamilya, kabataan, wellness, at oportunidad",
    enterDemo: "Pumasok sa Demo",
    guidedDemo: "Simulan ang Tour",
    stopGuidedDemo: "Ihinto ang Tour",
    backHome: "Bumalik sa Home",
    toMarketplace: "Pumunta sa Marketplace",
    pathways: "Mga Pathway",
    weather: "Panahon",
    cropPlanner: "Tagaplano ng Pananim",
    youthTitle: "Youth Workforce",
    youthParent: "Portal ng Magulang",
    youthSupervisor: "View ng Supervisor",
    startHere: "Magsimula Dito",
    welcomeHeadline: "Isang buhay na ecosystem, hindi lang farm.",
    welcomeBody:
      "Ang Bronson Family Farm ay isang place-based system na nagdurugtong sa lupa, pamilya, pagkain, pagkatuto, kalusugan, growers, markets, at kinabukasan.",
    discoverHeadline: "Karanasan ng Bisita",
    discoverBody:
      "Dito nadidiskubre ng mga bisita ang kuwento, misyon, kapaligiran, at mas malawak na layunin ng farm.",
    customerHeadline: "Karanasan ng Customer",
    customerBody:
      "Ang customer ay lumilipat mula interes tungo sa pagkilos sa pamamagitan ng access sa pagkain, recipes, nutrition, at marketplace.",
    growerHeadline: "Karanasan ng Grower",
    growerBody:
      "Ginagamit ng grower ang weather, planning, crop timing, at ecosystem opportunity para sa desisyon.",
    producerHeadline: "Karanasan ng Value-Added Producer",
    producerBody:
      "Ikinokonekta ng producer ang produkto, kuwento, event, at visibility sa mas malawak na halaga sa komunidad.",
    youthHeadline: "Karanasan ng Youth Workforce",
    youthBody:
      "Ang kabataan ay nakakakuha ng real-world learning, responsibility, support, at family-connected pathways.",
    adminHeadline: "Karanasan ng Leadership",
    adminBody:
      "Nakikita ng leadership ang buong ecosystem: operations, participation, visibility, planning, at long-term impact.",
    marketHeadline: "Karanasan sa Marketplace",
    marketBody:
      "Dito nagtatagpo ang produce, education, visibility, at community participation.",
    footer: "Ang Bronson Family Farm ay nagpapalago ng pagkain, tao, at kinabukasan.",
    cards: {
      guest: "Bisita",
      customer: "Customer",
      grower: "Grower",
      producer: "Producer",
      youth: "Kabataan",
      admin: "Leadership",
    },
    guidedSteps: [
      "Maligayang pagdating sa Bronson Family Farm. Isa itong buhay na ecosystem.",
      "Nagsisimula ang bisita sa kuwento, kapaligiran, at misyon.",
      "Natutuklasan ng customer ang pagkain, recipe, nutrition, at marketplace.",
      "Ginagamit ng grower ang weather, planning, at crop timing.",
      "Nararanasan ng youth workforce ang learning, responsibility, at support.",
      "Pinagsasama ng marketplace ang buong karanasan."
    ]
  },
  it: {
    languageName: "Italiano",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "Un ecosistema territoriale per cibo, famiglia, giovani, benessere e opportunità",
    enterDemo: "Entra nel Demo",
    guidedDemo: "Avvia Tour",
    stopGuidedDemo: "Ferma Tour",
    backHome: "Torna alla Home",
    toMarketplace: "Vai al Marketplace",
    pathways: "Percorsi",
    weather: "Meteo",
    cropPlanner: "Pianificatore Colture",
    youthTitle: "Forza Lavoro Giovanile",
    youthParent: "Portale Genitori",
    youthSupervisor: "Vista Supervisore",
    startHere: "Inizia Qui",
    welcomeHeadline: "Un ecosistema vivo, non solo una fattoria.",
    welcomeBody:
      "Bronson Family Farm è un sistema territoriale che collega terra, famiglia, cibo, apprendimento, salute, coltivatori, mercati e opportunità future.",
    discoverHeadline: "Esperienza Ospite",
    discoverBody:
      "Gli ospiti scoprono la storia, la missione, l’ambiente e il significato più ampio della fattoria.",
    customerHeadline: "Esperienza Cliente",
    customerBody:
      "I clienti passano dall’interesse all’azione tramite accesso al cibo, ricette, nutrizione, visibilità dei prodotti e collegamento al marketplace.",
    growerHeadline: "Esperienza Coltivatore",
    growerBody:
      "I coltivatori utilizzano meteo, pianificazione, tempi delle colture e opportunità dell’ecosistema per guidare le decisioni.",
    producerHeadline: "Esperienza Produttore a Valore Aggiunto",
    producerBody:
      "I produttori collegano prodotti, narrazione, eventi, visibilità e percorsi verso un valore comunitario più ampio.",
    youthHeadline: "Esperienza Giovani",
    youthBody:
      "I giovani ottengono apprendimento reale, responsabilità, supporto e percorsi collegati alla famiglia.",
    adminHeadline: "Esperienza Leadership",
    adminBody:
      "La leadership vede l’intero ecosistema: partecipazione, operazioni, visibilità, pianificazione, apprendimento e impatto a lungo termine.",
    marketHeadline: "Esperienza Marketplace",
    marketBody:
      "Il marketplace è il luogo in cui si incontrano prodotti, educazione, visibilità e partecipazione della comunità.",
    footer: "Bronson Family Farm coltiva cibo, persone e futuro.",
    cards: {
      guest: "Ospite",
      customer: "Cliente",
      grower: "Coltivatore",
      producer: "Valore Aggiunto",
      youth: "Giovani",
      admin: "Leadership",
    },
    guidedSteps: [
      "Benvenuti a Bronson Family Farm. Questo è un ecosistema vivo.",
      "Gli ospiti iniziano con storia, atmosfera e missione.",
      "I clienti scoprono cibo, ricette, nutrizione e marketplace.",
      "I coltivatori usano meteo, pianificazione e tempi delle colture.",
      "I giovani vivono apprendimento, responsabilità e supporto.",
      "Il marketplace unisce l’intera esperienza."
    ]
  },
  patwa: {
    languageName: "Patwa",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "A one place ecosystem fi food, family, youth, wellness, an opportunity",
    enterDemo: "Go Ina Di Demo",
    guidedDemo: "Start Tour",
    stopGuidedDemo: "Stop Tour",
    backHome: "Back Home",
    toMarketplace: "Go Marketplace",
    pathways: "Pathways",
    weather: "Weather",
    cropPlanner: "Crop Planner",
    youthTitle: "Youth Workforce",
    youthParent: "Parent Portal",
    youthSupervisor: "Supervisor View",
    startHere: "Start Yah",
    welcomeHeadline: "A living ecosystem, not jus a farm.",
    welcomeBody:
      "Bronson Family Farm a one place system weh link land, family, food, learning, health, growers, markets, an future opportunity.",
    discoverHeadline: "Guest Experience",
    discoverBody:
      "Guest discover di story, di mission, di environment, an di bigger purpose a di farm.",
    customerHeadline: "Customer Experience",
    customerBody:
      "Customer move from interest to action through food access, recipe, nutrition, an marketplace connection.",
    growerHeadline: "Grower Experience",
    growerBody:
      "Grower use weather, planning, crop timing, an ecosystem opportunity fi guide decision.",
    producerHeadline: "Value-Added Producer Experience",
    producerBody:
      "Producer connect product, storytelling, event, visibility, an pathway to wider community value.",
    youthHeadline: "Youth Workforce Experience",
    youthBody:
      "Young people get real-world learning, responsibility, support, an family-connected pathway.",
    adminHeadline: "Leadership Experience",
    adminBody:
      "Leadership see di whole ecosystem: operations, participation, planning, visibility, an long-term impact.",
    marketHeadline: "Marketplace Experience",
    marketBody:
      "Marketplace a weh produce, education, visibility, an community participation meet.",
    footer: "Bronson Family Farm a grow food, people, an future.",
    cards: {
      guest: "Guest",
      customer: "Customer",
      grower: "Grower",
      producer: "Producer",
      youth: "Youth",
      admin: "Leadership",
    },
    guidedSteps: [
      "Welcome to Bronson Family Farm. Dis a living ecosystem.",
      "Guest start wid story, atmosphere, an mission.",
      "Customer discover food, recipe, nutrition, an marketplace.",
      "Grower use weather, planning, an crop timing.",
      "Youth workforce get learning, responsibility, an support.",
      "Marketplace bring di full experience together."
    ]
  },
  he: {
    languageName: "עברית",
    dir: "rtl",
    appTitle: "Bronson Family Farm",
    appSubtitle: "מערכת חיה מבוססת מקום למזון, משפחה, נוער, רווחה והזדמנות",
    enterDemo: "כניסה לדמו",
    guidedDemo: "התחל סיור",
    stopGuidedDemo: "עצור סיור",
    backHome: "חזרה לבית",
    toMarketplace: "לשוק",
    pathways: "מסלולים",
    weather: "מזג אוויר",
    cropPlanner: "מתכנן גידולים",
    youthTitle: "כוח עבודה לנוער",
    youthParent: "פורטל הורים",
    youthSupervisor: "תצוגת מפקח",
    startHere: "התחל כאן",
    welcomeHeadline: "מערכת חיה, לא רק חווה.",
    welcomeBody:
      "Bronson Family Farm היא מערכת מבוססת מקום המחברת אדמה, משפחה, מזון, למידה, בריאות, מגדלים, שווקים והזדמנות עתידית.",
    discoverHeadline: "חוויית אורח",
    discoverBody:
      "האורחים מגלים את הסיפור, המשימה, הסביבה והמטרה הרחבה של החווה.",
    customerHeadline: "חוויית לקוח",
    customerBody:
      "לקוחות עוברים מעניין לפעולה דרך גישה למזון, מתכונים, תזונה וחיבור לשוק.",
    growerHeadline: "חוויית מגדל",
    growerBody:
      "מגדלים משתמשים במזג האוויר, תכנון, תזמון גידולים והזדמנויות המערכת כדי להנחות החלטות.",
    producerHeadline: "חוויית יצרן בעל ערך מוסף",
    producerBody:
      "יצרנים מחברים מוצרים, סיפור, אירועים, נראות ונתיבים לערך קהילתי רחב יותר.",
    youthHeadline: "חוויית נוער",
    youthBody:
      "צעירים מקבלים למידה מעשית, אחריות, תמיכה ונתיבים המחוברים למשפחה.",
    adminHeadline: "חוויית הנהגה",
    adminBody:
      "ההנהגה רואה את כל המערכת: השתתפות, תפעול, נראות, תכנון, למידה והשפעה ארוכת טווח.",
    marketHeadline: "חוויית שוק",
    marketBody:
      "השוק הוא המקום שבו נפגשים תוצרת, חינוך, נראות והשתתפות קהילתית.",
    footer: "Bronson Family Farm מגדלת מזון, אנשים ועתיד.",
    cards: {
      guest: "אורח",
      customer: "לקוח",
      grower: "מגדל",
      producer: "ערך מוסף",
      youth: "נוער",
      admin: "הנהגה",
    },
    guidedSteps: [
      "ברוכים הבאים ל Bronson Family Farm. זוהי מערכת חיה.",
      "אורחים מתחילים בסיפור, אווירה ומשימה.",
      "לקוחות מגלים מזון, מתכונים, תזונה ושוק.",
      "מגדלים משתמשים במזג אוויר, תכנון ותזמון גידולים.",
      "כוח העבודה לנוער מקבל למידה, אחריות ותמיכה.",
      "השוק מאחד את כל החוויה."
    ]
  }
};

type WeatherData = {
  condition: string;
  temp: string;
  high: string;
  low: string;
  advisory: string;
};

const weatherByScreen: Record<ScreenKey, WeatherData> = {
  entrance: {
    condition: "Partly Cloudy",
    temp: "62°F",
    high: "68°F",
    low: "49°F",
    advisory: "Good day for tours, site visits, and light field activity.",
  },
  guest: {
    condition: "Bright Intervals",
    temp: "63°F",
    high: "69°F",
    low: "50°F",
    advisory: "Strong visibility for guest experiences and storytelling.",
  },
  customer: {
    condition: "Mild Breeze",
    temp: "64°F",
    high: "70°F",
    low: "51°F",
    advisory: "Comfortable for market browsing and food demonstrations.",
  },
  grower: {
    condition: "Field Conditions Favorable",
    temp: "61°F",
    high: "67°F",
    low: "48°F",
    advisory: "Suitable for transplant checks, irrigation review, and planning.",
  },
  producer: {
    condition: "Clear Windows",
    temp: "65°F",
    high: "71°F",
    low: "52°F",
    advisory: "Good for product setup, vendor staging, and storytelling visuals.",
  },
  youth: {
    condition: "Comfortable Outdoor Session",
    temp: "62°F",
    high: "68°F",
    low: "49°F",
    advisory: "Strong conditions for youth learning, movement, and guided tasks.",
  },
  marketplace: {
    condition: "Visitor-Friendly",
    temp: "66°F",
    high: "72°F",
    low: "53°F",
    advisory: "Good foot-traffic conditions for market activity and community engagement.",
  },
  admin: {
    condition: "Stable Outlook",
    temp: "63°F",
    high: "69°F",
    low: "50°F",
    advisory: "Good day for operations review, coordination, and planning.",
  },
};

const cropPlan = [
  { crop: "Tomatoes", stage: "Transplant / monitor vigor", timing: "Now", note: "Watch moisture and wind exposure." },
  { crop: "Collards", stage: "Strong growth window", timing: "Current cycle", note: "High community demand." },
  { crop: "Cabbage", stage: "Field observation", timing: "This week", note: "Check uniformity and pest pressure." },
  { crop: "Peppers", stage: "Warmth-sensitive growth", timing: "Upcoming days", note: "Protect if temperatures dip." },
  { crop: "Lettuce / Greens", stage: "Succession planning", timing: "Next planting wave", note: "Keep market continuity visible." },
  { crop: "Watermelon / Cantaloupe", stage: "Season prep", timing: "Next phase", note: "Align with heat and space planning." },
];

function useLocalClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function useSpeech() {
  const [enabled, setEnabled] = useState(false);

  const stop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setEnabled(false);
  };

  const speakSequence = (text: string, lang: string, onComplete?: () => void) => {
    if (!("speechSynthesis" in window)) {
      onComplete?.();
      return;
    }

    window.speechSynthesis.cancel();

    const parts = text
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (!parts.length) {
      onComplete?.();
      return;
    }

    let i = 0;
    const speakNext = () => {
      if (i >= parts.length) {
        onComplete?.();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(parts[i]);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onend = () => {
        i += 1;
        speakNext();
      };
      utterance.onerror = () => {
        i += 1;
        speakNext();
      };
      window.speechSynthesis.speak(utterance);
    };
    speakNext();
  };

  return { enabled, setEnabled, speakSequence, stop };
}

const speechCodes: Record<LanguageKey, string> = {
  en: "en-US",
  es: "es-US",
  tl: "fil-PH",
  it: "it-IT",
  patwa: "en-JM",
  he: "he-IL",
};

function formatLocalTime(date: Date, language: LanguageKey) {
  try {
    return new Intl.DateTimeFormat(language === "he" ? "he-IL" : "en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

function getSeasonPulse(date: Date) {
  const month = date.getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "Planning and protected growth";
  if ([3, 4, 5].includes(month)) return "Seedtime and expansion";
  if ([6, 7, 8].includes(month)) return "Peak growth and market activity";
  return "Harvest, storage, and next-cycle planning";
}

function screenImage(screen: ScreenKey) {
  switch (screen) {
    case "entrance":
      return "/GrowArea.jpg";
    case "guest":
      return "/GrowArea.jpg";
    case "customer":
      return "/GrowArea2.jpg";
    case "grower":
      return "/GrowArea.jpg";
    case "producer":
      return "/GrowArea2.jpg";
    case "youth":
      return "/GrowArea.jpg";
    case "marketplace":
      return "/GrowArea2.jpg";
    case "admin":
      return "/GrowArea2.jpg";
  }
}

function screenGradient(screen: ScreenKey) {
  switch (screen) {
    case "entrance":
      return "linear-gradient(135deg, #0b1f16 0%, #224d37 45%, #8e7d42 100%)";
    case "guest":
      return "linear-gradient(135deg, #173124 0%, #355b46 50%, #977f4e 100%)";
    case "customer":
      return "linear-gradient(135deg, #113229 0%, #1d6b55 50%, #c29b41 100%)";
    case "grower":
      return "linear-gradient(135deg, #112715 0%, #2d6c3c 55%, #86b058 100%)";
    case "producer":
      return "linear-gradient(135deg, #2b1e14 0%, #715338 55%, #c29566 100%)";
    case "youth":
      return "linear-gradient(135deg, #152236 0%, #2b677f 50%, #7aaa68 100%)";
    case "marketplace":
      return "linear-gradient(135deg, #20170e 0%, #694a24 55%, #c38f2d 100%)";
    case "admin":
      return "linear-gradient(135deg, #201624 0%, #47446e 55%, #8778b7 100%)";
  }
}

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(8, 12, 10, 0.52)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 28,
        backdropFilter: "blur(14px)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
        overflow: "hidden",
      }}
    >
      {title ? (
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.8)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  primary = false,
  active = false,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 18px",
        borderRadius: 16,
        border: primary
          ? "1px solid rgba(255,255,255,0)"
          : active
          ? "1px solid rgba(199,255,190,0.82)"
          : "1px solid rgba(255,255,255,0.14)",
        background: primary
          ? "#dff3c7"
          : active
          ? "rgba(171,239,146,0.18)"
          : "rgba(255,255,255,0.10)",
        color: primary ? "#102012" : "#fff",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.92)",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );
}

function PathCard({
  title,
  subtitle,
  image,
  onClick,
}: {
  title: string;
  subtitle: string;
  image: string;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 26,
        overflow: "hidden",
        background: "rgba(255,255,255,0.05)",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", height: 170 }}>
        {!imgError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 0.92,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #19341f 0%, #3c6f4e 55%, #9e8c58 100%)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.84), rgba(0,0,0,0.28), rgba(0,0,0,0.06))",
          }}
        />
        <div style={{ position: "absolute", left: 18, right: 18, bottom: 14 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>{title}</div>
          <div style={{ marginTop: 6, color: "rgba(255,255,255,0.88)", fontSize: 13, lineHeight: 1.45 }}>
            {subtitle}
          </div>
        </div>
      </div>
    </button>
  );
}

function WeatherPanel({
  title,
  data,
}: {
  title: string;
  data: WeatherData;
}) {
  return (
    <Card title={title}>
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontSize: 28, fontWeight: 900 }}>{data.temp}</div>
        <div style={{ color: "rgba(255,255,255,0.88)", fontSize: 18 }}>{data.condition}</div>
        <div style={{ color: "rgba(255,255,255,0.72)" }}>
          High {data.high} · Low {data.low}
        </div>
        <div
          style={{
            marginTop: 4,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 18,
            padding: 14,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {data.advisory}
        </div>
      </div>
    </Card>
  );
}

function CropPlannerPanel({ title }: { title: string }) {
  return (
    <Card title={title}>
      <div style={{ display: "grid", gap: 12 }}>
        {cropPlan.map((item) => (
          <div
            key={item.crop}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: 14,
              lineHeight: 1.55,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 17 }}>{item.crop}</div>
            <div style={{ color: "rgba(255,255,255,0.86)" }}>{item.stage}</div>
            <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 14 }}>{item.timing}</div>
            <div style={{ color: "rgba(255,255,255,0.82)", marginTop: 4 }}>{item.note}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ScreenShell({
  screen,
  title,
  body,
  topActions,
  children,
}: {
  screen: ScreenKey;
  title: string;
  body: string;
  topActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: screenGradient(screen),
        color: "#fff",
      }}
    >
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        {!imgError ? (
          <img
            src={screenImage(screen)}
            alt={screen}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.34,
              transform: "scale(1.03)",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(3,8,6,0.36), rgba(3,8,6,0.62), rgba(3,8,6,0.88))",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1380,
          margin: "0 auto",
          padding: "22px 18px 40px",
        }}
      >
        <div
          style={{
            background: "rgba(6,10,8,0.40)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 28,
            padding: 22,
            backdropFilter: "blur(16px)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ minWidth: 280, flex: "1 1 640px" }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <Pill text={screen.toUpperCase()} />
              </div>
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  lineHeight: 1.04,
                  letterSpacing: "-0.03em",
                  maxWidth: 900,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 19,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.84)",
                  maxWidth: 860,
                }}
              >
                {body}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{topActions}</div>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [screen, setScreen] = useState<ScreenKey>("entrance");
  const [youthView, setYouthView] = useState<YouthView>("overview");
  const [tourIndex, setTourIndex] = useState(0);

  const t = translations[language];
  const clock = useLocalClock();
  const speech = useSpeech();
  const tourTimeoutRef = useRef<number | null>(null);

  const timeText = useMemo(() => formatLocalTime(clock, language), [clock, language]);
  const seasonText = getSeasonPulse(clock);

  const navigateTo = (next: ScreenKey) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!speech.enabled) return;

    if (tourTimeoutRef.current) window.clearTimeout(tourTimeoutRef.current);

    speech.speakSequence(t.guidedSteps[tourIndex], speechCodes[language], () => {
      tourTimeoutRef.current = window.setTimeout(() => {
        setTourIndex((prev) => (prev + 1) % t.guidedSteps.length);
      }, 900);
    });

    return () => {
      if (tourTimeoutRef.current) window.clearTimeout(tourTimeoutRef.current);
    };
  }, [speech.enabled, tourIndex, language, t.guidedSteps]);

  useEffect(() => {
    if (!speech.enabled) return;
    const mapping: ScreenKey[] = [
      "entrance",
      "guest",
      "customer",
      "grower",
      "youth",
      "marketplace",
    ];
    navigateTo(mapping[tourIndex] ?? "entrance");
  }, [tourIndex, speech.enabled]);

  useEffect(() => {
    return () => {
      speech.stop();
      if (tourTimeoutRef.current) window.clearTimeout(tourTimeoutRef.current);
    };
  }, []);

  const startTour = () => {
    if (tourTimeoutRef.current) window.clearTimeout(tourTimeoutRef.current);
    setTourIndex(0);
    speech.setEnabled(true);
    navigateTo("entrance");
  };

  const stopTour = () => {
    if (tourTimeoutRef.current) window.clearTimeout(tourTimeoutRef.current);
    speech.stop();
  };

  const topNav = (
    <>
      <ActionButton label={t.backHome} onClick={() => navigateTo("entrance")} />
      <ActionButton label={t.toMarketplace} onClick={() => navigateTo("marketplace")} />
      {!speech.enabled ? (
        <ActionButton label={t.guidedDemo} onClick={startTour} primary />
      ) : (
        <ActionButton label={t.stopGuidedDemo} onClick={stopTour} primary />
      )}
    </>
  );

  if (screen === "entrance") {
    return (
      <ScreenShell
        screen="entrance"
        title={t.welcomeHeadline}
        body={t.welcomeBody}
        topActions={
          <>
            <ActionButton label={t.enterDemo} onClick={() => navigateTo("guest")} primary />
            {!speech.enabled ? (
              <ActionButton label={t.guidedDemo} onClick={startTour} />
            ) : (
              <ActionButton label={t.stopGuidedDemo} onClick={stopTour} />
            )}
          </>
        }
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
            gap: 22,
          }}
        >
          <div style={{ display: "grid", gap: 22 }}>
            <Card title={t.startHere}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                <Pill text={timeText} />
                <Pill text={seasonText} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                {(Object.keys(translations) as LanguageKey[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    style={{
                      padding: "14px 14px",
                      borderRadius: 18,
                      border:
                        language === lang
                          ? "1px solid rgba(219,255,201,0.9)"
                          : "1px solid rgba(255,255,255,0.14)",
                      background:
                        language === lang
                          ? "#dff3c7"
                          : "rgba(255,255,255,0.10)",
                      color: language === lang ? "#112114" : "#ffffff",
                      cursor: "pointer",
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    {translations[lang].languageName}
                  </button>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                <PathCard
                  title={t.cards.guest}
                  subtitle={t.discoverBody}
                  image="/GrowArea.jpg"
                  onClick={() => navigateTo("guest")}
                />
                <PathCard
                  title={t.cards.customer}
                  subtitle={t.customerBody}
                  image="/GrowArea2.jpg"
                  onClick={() => navigateTo("customer")}
                />
                <PathCard
                  title={t.cards.grower}
                  subtitle={t.growerBody}
                  image="/GrowArea.jpg"
                  onClick={() => navigateTo("grower")}
                />
                <PathCard
                  title={t.cards.producer}
                  subtitle={t.producerBody}
                  image="/GrowArea2.jpg"
                  onClick={() => navigateTo("producer")}
                />
                <PathCard
                  title={t.cards.youth}
                  subtitle={t.youthBody}
                  image="/GrowArea.jpg"
                  onClick={() => navigateTo("youth")}
                />
                <PathCard
                  title={t.cards.admin}
                  subtitle={t.adminBody}
                  image="/GrowArea2.jpg"
                  onClick={() => navigateTo("admin")}
                />
              </div>
            </Card>
          </div>

          <div style={{ display: "grid", gap: 22 }}>
            <WeatherPanel title={t.weather} data={weatherByScreen.entrance} />
            <CropPlannerPanel title={t.cropPlanner} />
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "guest") {
    return (
      <ScreenShell
        screen="guest"
        title={t.discoverHeadline}
        body={t.discoverBody}
        topActions={topNav}
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(320px,0.9fr)", gap: 22 }}>
          <Card title={t.pathways}>
            <div style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.9)" }}>
              Bronson Family Farm welcomes guests into a story of land, family, resilience, nourishment, and future possibility.
              This is where people first understand that the farm is a living ecosystem.
            </div>
            <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
              {[
                "Mission and place-based identity",
                "Legacy, land restoration, and community meaning",
                "Events, tours, and ecosystem entry points",
                "A pathway into customer, grower, youth, or partner engagement",
              ].map((item) => (
                <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 14 }}>
                  {item}
                </div>
              ))}
            </div>
          </Card>
          <WeatherPanel title={t.weather} data={weatherByScreen.guest} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "customer") {
    return (
      <ScreenShell
        screen="customer"
        title={t.customerHeadline}
        body={t.customerBody}
        topActions={
          <>
            {topNav}
            <ActionButton label={t.toMarketplace} onClick={() => navigateTo("marketplace")} primary />
          </>
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(320px,0.9fr)", gap: 22 }}>
          <Card title={t.cards.customer}>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                "Browse produce, seedlings, and seasonal offerings",
                "Access nutrition guidance and healthier food choices",
                "Explore recipes and food education",
                "Move directly into the marketplace experience",
              ].map((item) => (
                <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 14 }}>
                  {item}
                </div>
              ))}
            </div>
          </Card>
          <WeatherPanel title={t.weather} data={weatherByScreen.customer} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "grower") {
    return (
      <ScreenShell
        screen="grower"
        title={t.growerHeadline}
        body={t.growerBody}
        topActions={topNav}
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.35fr) minmax(320px,0.95fr)", gap: 22 }}>
          <CropPlannerPanel title={t.cropPlanner} />
          <WeatherPanel title={t.weather} data={weatherByScreen.grower} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "producer") {
    return (
      <ScreenShell
        screen="producer"
        title={t.producerHeadline}
        body={t.producerBody}
        topActions={topNav}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Card title={t.cards.producer}>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                "Connect products to storytelling",
                "Build event-ready visibility",
                "Create stronger market presence",
                "Expand community-facing value",
              ].map((item) => (
                <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 14 }}>
                  {item}
                </div>
              ))}
            </div>
          </Card>
          <WeatherPanel title={t.weather} data={weatherByScreen.producer} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "youth") {
    const youthTitle =
      youthView === "overview"
        ? t.youthTitle
        : youthView === "parent"
        ? t.youthParent
        : t.youthSupervisor;

    return (
      <ScreenShell
        screen="youth"
        title={t.youthHeadline}
        body={t.youthBody}
        topActions={topNav}
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(320px,0.9fr)", gap: 22 }}>
          <Card title={youthTitle}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
              <ActionButton
                label={t.youthTitle}
                onClick={() => setYouthView("overview")}
                active={youthView === "overview"}
              />
              <ActionButton
                label={t.youthParent}
                onClick={() => setYouthView("parent")}
                active={youthView === "parent"}
              />
              <ActionButton
                label={t.youthSupervisor}
                onClick={() => setYouthView("supervisor")}
                active={youthView === "supervisor"}
              />
            </div>

            {youthView === "overview" && (
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  "Hands-on farm learning and visible contribution",
                  "Work readiness, responsibility, and discipline",
                  "Exposure to teamwork, market systems, and opportunity",
                  "Support structures connected to real-world growth",
                ].map((item) => (
                  <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 14 }}>
                    {item}
                  </div>
                ))}
              </div>
            )}

            {youthView === "parent" && (
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  "Clear communication about expectations and participation",
                  "Family awareness of progress, growth, and opportunity",
                  "Connection between home support and program outcomes",
                  "Visibility into the structure and purpose of the youth pathway",
                ].map((item) => (
                  <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 14 }}>
                    {item}
                  </div>
                ))}
              </div>
            )}

            {youthView === "supervisor" && (
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  "Role-based oversight and accountability",
                  "Progress awareness and intervention planning",
                  "Support coordination when needed",
                  "Structured visibility into youth development and program continuity",
                ].map((item) => (
                  <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 14 }}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div style={{ display: "grid", gap: 22 }}>
            <WeatherPanel title={t.weather} data={weatherByScreen.youth} />
            <CropPlannerPanel title={t.cropPlanner} />
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "marketplace") {
    return (
      <ScreenShell
        screen="marketplace"
        title={t.marketHeadline}
        body={t.marketBody}
        topActions={topNav}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
          {[
            "Produce and seedling visibility",
            "Food education and recipes",
            "Community participation and event connection",
            "A bridge back into the larger ecosystem",
          ].map((item) => (
            <Card key={item} title={item}>
              <div style={{ lineHeight: 1.75, color: "rgba(255,255,255,0.88)" }}>
                {item}
              </div>
            </Card>
          ))}
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      screen="admin"
      title={t.adminHeadline}
      body={t.adminBody}
      topActions={topNav}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <Card title={t.cards.admin}>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              "Whole-system visibility",
              "Pathway oversight",
              "Engagement and planning continuity",
              "Operational and strategic alignment",
            ].map((item) => (
              <div key={item} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: 14 }}>
                {item}
              </div>
            ))}
          </div>
        </Card>
        <WeatherPanel title={t.weather} data={weatherByScreen.admin} />
      </div>
    </ScreenShell>
  );
}
