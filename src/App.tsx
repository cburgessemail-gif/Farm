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

const IMAGES = {
  entrance: "/GrowArea.jpg",
  story: "/large (10).jpg",
  guest: "/Samaeera1.jpg",
  customer: "/Samaeera2.jpg",
  marketplace: "/culinary_edibleflowers2.jpeg",
  grower: "/Samerra4.jpg",
  valueAdded: "/Samerra5.jpg",
  youth: "/large (11).jpg",
  volunteers: "/Samaeera1.jpg",
  community: "/WolfSpider.jpg",
  education: "/Samerra5.jpg",
  wellness: "/Samaeera2.jpg",
  events: "/Samaeera3.jpg",
  planning: "/GrowArea2.jpg",
  family: "/large (10).jpg",
  logistics: "/Samerra4.jpg",
  airport: "/GrowArea.jpg",
  produce: "/culinary_edibleflowers2.jpeg",
  training: "/Samerra5.jpg",
  recipes: "/culinary_mushrooms.jpeg",
  nutrition: "/culinary_edibleflowers.jpeg",
  future: "/GrowArea2.jpg",
  legacy: "/Samerra4.jpg",
  growArea: "/GrowArea.jpg",
};

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
  | "wellness";

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
};

const T: Record<
  LanguageKey,
  {
    brand: string;
    subbrand: string;
    screenTitles: Record<ScreenKey, string>;
    screenBodies: Record<ScreenKey, string>;
  }
> = {
  en: {
    brand: "Bronson Family Farm",
    subbrand: "Farm & Family Alliance Ecosystem Demo",
    screenTitles: {
      home: "Welcome to the ecosystem",
      story: "The story behind the farm",
      guest: "Guest pathway",
      customer: "Customer pathway",
      marketplace: "Marketplace pathway",
      grower: "Grower pathway",
      valueAdded: "Value-Added Producer pathway",
      youth: "Youth Workforce pathway",
      volunteers: "Volunteer pathway",
      planner: "Crop Planning Center",
      events: "Events and community experiences",
      wellness: "Health, nutrition, and food education",
    },
    screenBodies: {
      home: "You are entering a regenerative farm and community ecosystem where land becomes opportunity, food becomes wellness, learning becomes workforce development, and visitors become participants in something larger.",
      story: "Inspired by family farming traditions and shaped for Youngstown's future, this farm brings together legacy, land restoration, food access, agritourism, and practical community opportunity.",
      guest: "Guests explore the vision, experience the land, attend events, and discover how this farm is restoring place, purpose, and possibility.",
      customer: "Customers access fresh food, seedlings, wellness education, and practical tools that help families move toward healthier and more self-sufficient living.",
      marketplace: "The marketplace helps people move from interest to action by connecting food access, local purchasing, and the larger journey toward self-sufficiency and community resilience.",
      grower: "Growers use planning, timing, collaboration, and market access tools that support real production, stronger operations, and income generation.",
      valueAdded: "Value-added producers can turn raw products into stronger brands, packaged goods, demonstrations, and expanded local market opportunities.",
      youth: "Enter a structured living classroom where agriculture, teamwork, responsibility, and entrepreneurship prepare young people for future success, with Parent Portal access and supervisor support built into the program.",
      volunteers: "Volunteers enter a welcoming service pathway where community members can support food growing, events, hospitality, setup, and shared learning while contributing to something larger than themselves.",
      planner: "This planning center helps transform land, labor, seeds, weather, and timing into real food production, income opportunities, training experiences, and reliable community supply.",
      events: "Events bring people back for learning, shopping, demonstrations, relationship-building, and shared community experience.",
      wellness: "This pathway helps people connect fresh food with practical wellness, healthier choices, recipes, diabetes awareness, and everyday life.",
    },
  },
  es: {
    brand: "Bronson Family Farm",
    subbrand: "Demostración del Ecosistema de Farm & Family Alliance",
    screenTitles: {
      home: "Bienvenido al ecosistema",
      story: "La historia detrás de la granja",
      guest: "Ruta del visitante",
      customer: "Ruta del cliente",
      marketplace: "Ruta del mercado",
      grower: "Ruta del productor",
      valueAdded: "Ruta del productor con valor agregado",
      youth: "Ruta de la fuerza laboral juvenil",
      volunteers: "Ruta de voluntariado",
      planner: "Centro de planificación de cultivos",
      events: "Eventos y experiencias comunitarias",
      wellness: "Salud, nutrición y educación alimentaria",
    },
    screenBodies: {
      home: "Está entrando en un ecosistema agrícola y comunitario regenerativo donde la tierra se convierte en oportunidad, la comida en bienestar y el aprendizaje en desarrollo de la fuerza laboral.",
      story: "Inspirada en tradiciones familiares de cultivo y diseñada para el futuro de Youngstown, esta granja une legado, restauración de la tierra, acceso a los alimentos y oportunidad comunitaria.",
      guest: "Los visitantes exploran la visión, experimentan la tierra, asisten a eventos y descubren cómo esta granja está restaurando lugar, propósito y posibilidad.",
      customer: "Los clientes acceden a alimentos frescos, plántulas, educación para el bienestar y herramientas prácticas que ayudan a las familias a vivir de manera más saludable y autosuficiente.",
      marketplace: "El mercado ayuda a las personas a pasar del interés a la acción conectando acceso a alimentos, compras locales y el camino hacia la autosuficiencia.",
      grower: "Los productores utilizan planificación, tiempos, colaboración y acceso al mercado para apoyar producción real, operaciones más fuertes e ingresos.",
      valueAdded: "Los productores con valor agregado pueden transformar productos crudos en marcas más fuertes, productos empacados, demostraciones y mayores oportunidades locales.",
      youth: "Entre en un aula viva y estructurada donde la agricultura, el trabajo en equipo, la responsabilidad y el emprendimiento preparan a los jóvenes para el futuro, con Portal para Padres y apoyo de supervisión integrados.",
      volunteers: "Los voluntarios entran en una ruta acogedora de servicio donde pueden apoyar el cultivo, los eventos, la hospitalidad y el aprendizaje compartido.",
      planner: "Este centro de planificación ayuda a transformar tierra, trabajo, semillas, clima y tiempo en producción real de alimentos, oportunidades de ingresos y suministro comunitario confiable.",
      events: "Los eventos hacen que las personas regresen para aprender, comprar, ver demostraciones y vivir experiencias comunitarias compartidas.",
      wellness: "Esta ruta ayuda a las personas a conectar alimentos frescos con bienestar práctico, mejores decisiones, recetas, conciencia sobre la diabetes y la vida cotidiana.",
    },
  },
  tl: {
    brand: "Bronson Family Farm",
    subbrand: "Farm & Family Alliance Ecosystem Demo",
    screenTitles: {
      home: "Maligayang pagdating sa ecosystem",
      story: "Ang kuwento ng bukid",
      guest: "Landas ng bisita",
      customer: "Landas ng customer",
      marketplace: "Landas ng marketplace",
      grower: "Landas ng grower",
      valueAdded: "Landas ng value-added producer",
      youth: "Landas ng youth workforce",
      volunteers: "Landas ng volunteer",
      planner: "Sentro ng crop planning",
      events: "Mga event at karanasang pangkomunidad",
      wellness: "Kalusugan, nutrisyon, at edukasyon sa pagkain",
    },
    screenBodies: {
      home: "Pumapasok ka sa isang regenerative farm at community ecosystem kung saan ang lupa ay nagiging oportunidad, ang pagkain ay nagiging wellness, at ang pagkatuto ay nagiging workforce development.",
      story: "Hinubog ng tradisyon ng pagsasaka ng pamilya at ng hinaharap ng Youngstown, pinagsasama ng bukid na ito ang pamana, pagpapanumbalik ng lupa, access sa pagkain, at oportunidad sa komunidad.",
      guest: "Tinutuklas ng mga bisita ang bisyon, nararanasan ang lupa, dumadalo sa mga event, at nakikita kung paano ibinabalik ng bukid na ito ang lugar, layunin, at posibilidad.",
      customer: "Nakakakuha ang mga customer ng sariwang pagkain, seedlings, wellness education, at praktikal na gabay tungo sa mas malusog at mas self-sufficient na pamumuhay.",
      marketplace: "Tinutulungan ng marketplace ang mga tao na kumilos mula sa interes tungo sa pagbili habang nakakabit pa rin sa mas malaking ecosystem.",
      grower: "Ginagamit ng mga grower ang planning, timing, collaboration, at market access para sa totoong production, mas matatag na operasyon, at income generation.",
      valueAdded: "Maaaring gawing mas malalakas na brand, packaged goods, demonstrations, at mas malaking local market opportunity ang mga raw product.",
      youth: "Pumasok sa isang organisadong buhay na classroom kung saan ang agrikultura, teamwork, responsibilidad, at entrepreneurship ay naghahanda sa kabataan para sa kinabukasan, kasama ang Parent Portal at supervisor support.",
      volunteers: "Ang mga volunteer ay pumapasok sa isang magiliw na service pathway kung saan makatutulong sila sa pagtatanim, events, hospitality, at shared learning.",
      planner: "Tinutulungan ng planning center na ito na gawing totoong food production, income opportunity, training experience, at maaasahang community supply ang lupa, paggawa, buto, panahon, at timing.",
      events: "Nagbabalik ang mga tao dahil sa mga event para sa pagkatuto, pamimili, demonstrations, relationship-building, at shared community experience.",
      wellness: "Tinutulungan ng pathway na ito ang mga tao na ikonekta ang sariwang pagkain sa praktikal na wellness, mas mabubuting pagpili, recipes, diabetes awareness, at araw-araw na buhay.",
    },
  },
  it: {
    brand: "Bronson Family Farm",
    subbrand: "Demo Ecosistema Farm & Family Alliance",
    screenTitles: {
      home: "Benvenuto nell'ecosistema",
      story: "La storia della fattoria",
      guest: "Percorso ospite",
      customer: "Percorso cliente",
      marketplace: "Percorso marketplace",
      grower: "Percorso coltivatore",
      valueAdded: "Percorso produttore a valore aggiunto",
      youth: "Percorso forza lavoro giovanile",
      volunteers: "Percorso volontari",
      planner: "Centro di pianificazione delle colture",
      events: "Eventi ed esperienze della comunità",
      wellness: "Salute, nutrizione ed educazione alimentare",
    },
    screenBodies: {
      home: "Stai entrando in un ecosistema agricolo e comunitario rigenerativo dove la terra diventa opportunità, il cibo diventa benessere e l'apprendimento diventa sviluppo della forza lavoro.",
      story: "Ispirata dalle tradizioni agricole familiari e plasmata per il futuro di Youngstown, questa fattoria unisce eredità, ripristino della terra, accesso al cibo e opportunità comunitarie.",
      guest: "Gli ospiti esplorano la visione, vivono la terra, partecipano agli eventi e scoprono come questa fattoria stia restaurando luogo, scopo e possibilità.",
      customer: "I clienti accedono a cibo fresco, piantine, educazione al benessere e strumenti pratici che aiutano le famiglie a vivere in modo più sano e autosufficiente.",
      marketplace: "Il marketplace aiuta le persone a passare dall'interesse all'azione collegando accesso al cibo, acquisti locali e il percorso verso l'autosufficienza.",
      grower: "I coltivatori usano pianificazione, tempi, collaborazione e accesso al mercato per sostenere produzione reale, operazioni più forti e generazione di reddito.",
      valueAdded: "I produttori a valore aggiunto possono trasformare prodotti grezzi in marchi più forti, prodotti confezionati, dimostrazioni e maggiori opportunità locali.",
      youth: "Entra in una classe viva e strutturata dove agricoltura, lavoro di squadra, responsabilità e imprenditorialità preparano i giovani al futuro, con Portale Genitori e supporto del supervisore integrati.",
      volunteers: "I volontari entrano in un percorso accogliente di servizio dove possono sostenere coltivazione, eventi, ospitalità e apprendimento condiviso.",
      planner: "Questo centro di pianificazione aiuta a trasformare terra, lavoro, semi, meteo e tempi in vera produzione alimentare, opportunità di reddito, esperienze formative e fornitura affidabile alla comunità.",
      events: "Gli eventi riportano le persone per imparare, acquistare, vedere dimostrazioni, costruire relazioni e condividere esperienze comunitarie.",
      wellness: "Questo percorso aiuta le persone a collegare il cibo fresco al benessere pratico, a scelte migliori, ricette, consapevolezza del diabete e vita quotidiana.",
    },
  },
  patwa: {
    brand: "Bronson Family Farm",
    subbrand: "Farm & Family Alliance Ecosystem Demo",
    screenTitles: {
      home: "Welcome to di ecosystem",
      story: "Di story behind di farm",
      guest: "Guest pathway",
      customer: "Customer pathway",
      marketplace: "Marketplace pathway",
      grower: "Grower pathway",
      valueAdded: "Value-added producer pathway",
      youth: "Youth workforce pathway",
      volunteers: "Volunteer pathway",
      planner: "Crop planning center",
      events: "Events an community experiences",
      wellness: "Health, nutrition, an food education",
    },
    screenBodies: {
      home: "Yuh a step into a regenerative farm an community ecosystem weh turn land into opportunity, food into wellness, an learning into workforce development.",
      story: "Inspired by family farming tradition an shaped fi Youngstown future, dis farm bring together legacy, land restoration, food access, an community opportunity.",
      guest: "Guests explore di vision, experience di land, join events, an see how dis farm a restore place, purpose, an possibility.",
      customer: "Customers get fresh food, seedlings, wellness education, an practical tools fi help families move toward healthier an more self-sufficient living.",
      marketplace: "Di marketplace help people move from interest to action by connecting food access, local buying, an di bigger journey toward self-sufficiency.",
      grower: "Growers use planning, timing, collaboration, an market access fi support real production, stronger operation, an income generation.",
      valueAdded: "Value-added producers can turn raw product into stronger brand, packaged goods, demonstrations, an bigger local market opportunity.",
      youth: "Step into a structured living classroom weh agriculture, teamwork, responsibility, an entrepreneurship prepare young people fi future success, wid Parent Portal access an supervisor support built in.",
      volunteers: "Volunteers step into a welcoming service pathway fi support growing, events, hospitality, setup, an shared learning.",
      planner: "Dis planning center help turn land, labor, seeds, weather, an timing into real food production, income opportunity, training experience, an reliable community supply.",
      events: "Events bring people back fi learning, shopping, demonstrations, relationship-building, an shared community experience.",
      wellness: "Dis pathway help people connect fresh food wid practical wellness, better choices, recipes, diabetes awareness, an everyday life.",
    },
  },
  he: {
    brand: "Bronson Family Farm",
    subbrand: "הדגמת מערכת Farm & Family Alliance",
    screenTitles: {
      home: "ברוכים הבאים למערכת",
      story: "הסיפור מאחורי החווה",
      guest: "מסלול אורח",
      customer: "מסלול לקוח",
      marketplace: "מסלול שוק",
      grower: "מסלול מגדל",
      valueAdded: "מסלול יצרן בעל ערך מוסף",
      youth: "מסלול כוח עבודה לנוער",
      volunteers: "מסלול מתנדבים",
      planner: "מרכז תכנון גידולים",
      events: "אירועים וחוויות קהילתיות",
      wellness: "בריאות, תזונה וחינוך למזון",
    },
    screenBodies: {
      home: "אתם נכנסים למערכת חקלאית וקהילתית רגנרטיבית שבה האדמה הופכת להזדמנות, המזון הופך לרווחה והלמידה הופכת לפיתוח כוח עבודה.",
      story: "בהשראת מסורות חקלאיות משפחתיות ובעיצוב לעתידה של יאנגסטאון, החווה הזאת מחברת בין מורשת, שיקום הקרקע, גישה למזון והזדמנות קהילתית.",
      guest: "אורחים חוקרים את החזון, חווים את האדמה, משתתפים באירועים ומגלים כיצד החווה הזו מחזירה מקום, מטרה ואפשרות.",
      customer: "לקוחות מקבלים מזון טרי, שתילים, חינוך לרווחה וכלים מעשיים שעוזרים למשפחות לחיות בצורה בריאה ועצמאית יותר.",
      marketplace: "השוק עוזר לאנשים לעבור מעניין לפעולה על ידי חיבור בין גישה למזון, רכישה מקומית והדרך לעצמאות.",
      grower: "מגדלים משתמשים בתכנון, תזמון, שיתוף פעולה וגישה לשוק כדי לתמוך בייצור אמיתי, בפעילות חזקה יותר ובהכנסה.",
      valueAdded: "יצרנים בעלי ערך מוסף יכולים להפוך מוצרים גולמיים למותגים חזקים יותר, מוצרים ארוזים, הדגמות והזדמנויות מקומיות רחבות יותר.",
      youth: "היכנסו לכיתה חיה ומובנית שבה חקלאות, עבודת צוות, אחריות ויזמות מכינות צעירים לעתיד, עם גישת פורטל הורים ותמיכת מפקח מובנות בתוכנית.",
      volunteers: "מתנדבים נכנסים למסלול שירות מזמין שבו הם יכולים לתמוך בגידול, באירועים, באירוח ובלמידה משותפת.",
      planner: "מרכז התכנון הזה מסייע להפוך אדמה, עבודה, זרעים, מזג אוויר ותזמון לייצור מזון אמיתי, להזדמנויות הכנסה, להכשרה ולאספקה קהילתית אמינה.",
      events: "אירועים מחזירים אנשים ללמידה, קניות, הדגמות, בניית קשרים וחוויה קהילתית משותפת.",
      wellness: "המסלול הזה עוזר לאנשים לחבר בין מזון טרי לרווחה מעשית, לבחירות טובות יותר, למתכונים, למודעות לסוכרת ולחיי היומיום.",
    },
  },
};

function useSpeech() {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const loadVoices = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
    const voices = window.speechSynthesis.getVoices();
    voicesRef.current = voices;
    return voices;
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    loadVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const pickVoice = (lang: LanguageKey) => {
    const voices = voicesRef.current.length ? voicesRef.current : loadVoices();
    const preferred: Record<LanguageKey, string[]> = {
      en: ["en-US", "en"],
      es: ["es-ES", "es-US", "es"],
      tl: ["fil-PH", "tl-PH", "fil", "tl", "en-US"],
      it: ["it-IT", "it"],
      patwa: ["en-JM", "en-US", "en-GB", "en"],
      he: ["he-IL", "he"],
    };
    const wanted = preferred[lang];
    for (const code of wanted) {
      const exact = voices.find((v) => v.lang?.toLowerCase() === code.toLowerCase());
      if (exact) return exact;
    }
    for (const code of wanted) {
      const partial = voices.find((v) =>
        v.lang?.toLowerCase().startsWith(code.slice(0, 2).toLowerCase())
      );
      if (partial) return partial;
    }
    return voices.find((v) => v.lang?.toLowerCase().startsWith("en")) || voices[0] || null;
  };

  const stop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speak = (text: string, lang: LanguageKey) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const utter = new SpeechSynthesisUtterance(text);
    const map: Record<LanguageKey, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      patwa: "en-JM",
      he: "he-IL",
    };

    utter.lang = map[lang];
    utter.rate = 0.95;
    utter.pitch = 1;

    const voice = pickVoice(lang);
    if (voice) utter.voice = voice;

    window.speechSynthesis.cancel();
    window.setTimeout(() => {
      window.speechSynthesis.speak(utter);
    }, 120);
  };

  return { speak, stop };
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#08110d",
    color: "#fff",
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
  },
  hero: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },
  bgImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(4,12,9,0.84), rgba(18,58,36,0.34), rgba(6,20,12,0.88))",
  },
  shell: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1320,
    margin: "0 auto",
    padding: "24px 24px 60px",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 30,
  },
  brandBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  subbrand: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "rgba(255,255,255,0.68)",
  },
  brand: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.1,
  },
  nav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(221,238,221,0.18)",
    background: "rgba(19,43,31,0.46)",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 14,
    backdropFilter: "blur(8px)",
  },
  activePill: {
    background: "rgba(138,177,131,0.18)",
    border: "1px solid rgba(221,238,221,0.34)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1.25fr 0.75fr",
    gap: 26,
    alignItems: "start",
  },
  left: {
    minWidth: 0,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    marginBottom: 16,
  },
  title: {
    fontSize: 62,
    fontWeight: 800,
    lineHeight: 1.04,
    margin: 0,
    maxWidth: 840,
    textShadow: "0 3px 18px rgba(0,0,0,0.25)",
  },
  body: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.9)",
    maxWidth: 860,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 26,
  },
  whiteBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(180deg, rgba(242,248,239,0.98), rgba(219,233,214,0.96))",
    color: "#102016",
    border: "none",
    padding: "14px 18px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
  },
  ghostBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(18,42,30,0.44)",
    color: "#fff",
    border: "1px solid rgba(221,238,221,0.18)",
    padding: "14px 18px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
    marginTop: 28,
  },
  card: {
    borderRadius: 28,
    background: "linear-gradient(180deg, rgba(39,66,49,0.32), rgba(19,31,24,0.44))",
    border: "1px solid rgba(214,233,214,0.12)",
    padding: 22,
    backdropFilter: "blur(12px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  },
  sideCard: {
    borderRadius: 32,
    background: "linear-gradient(180deg, rgba(57,88,65,0.26), rgba(19,31,24,0.48))",
    border: "1px solid rgba(214,233,214,0.12)",
    padding: 20,
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  },
  miniLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "rgba(255,255,255,0.62)",
    marginBottom: 10,
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 18,
    marginTop: 20,
  },
  roleTile: {
    position: "relative",
    minHeight: 260,
    borderRadius: 30,
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
    background: "#102018",
  },
  roleImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  roleOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.72), rgba(8,32,18,0.24), rgba(0,0,0,0.08))",
  },
  roleContent: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 22,
  },
  section: {
    marginTop: 34,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "0.95fr 1.05fr",
    gap: 18,
    marginTop: 20,
  },
  detailGrid: {
    display: "grid",
    gap: 14,
  },
  infoBox: {
    borderRadius: 22,
    background: "linear-gradient(180deg, rgba(72,106,78,0.22), rgba(23,35,27,0.36))",
    border: "1px solid rgba(214,233,214,0.10)",
    padding: 18,
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  galleryItem: {
    borderRadius: 22,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    background: "#112018",
  },
  galleryImage: {
    width: "100%",
    height: 155,
    objectFit: "cover",
    display: "block",
  },
  footerModuleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginTop: 18,
  },
  moduleBox: {
    borderRadius: 18,
    background: "linear-gradient(180deg, rgba(32,58,42,0.34), rgba(13,22,16,0.46))",
    border: "1px solid rgba(214,233,214,0.10)",
    padding: 16,
    lineHeight: 1.55,
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.88)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 24,
  },
  modalImage: {
    maxWidth: "95vw",
    maxHeight: "90vh",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "fixed",
    top: 18,
    right: 18,
    width: 44,
    height: 44,
    borderRadius: 999,
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

const youthAccent = {
  background: "linear-gradient(180deg, rgba(34,74,60,0.34), rgba(18,30,24,0.48))",
  border: "1px solid rgba(182,226,196,0.16)",
};

const volunteerAccent = {
  background: "linear-gradient(180deg, rgba(82,78,42,0.30), rgba(28,30,18,0.46))",
  border: "1px solid rgba(220,214,168,0.14)",
};

const customerAccent = {
  background: "linear-gradient(180deg, rgba(82,86,42,0.30), rgba(28,30,18,0.46))",
  border: "1px solid rgba(220,220,168,0.14)",
};

const marketplaceAccent = {
  background: "linear-gradient(180deg, rgba(86,72,38,0.30), rgba(30,24,16,0.46))",
  border: "1px solid rgba(224,206,168,0.14)",
};

function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const copy = T[language] || T.en;
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [voiceOn, setVoiceOn] = useState(true);
  const [tourOn, setTourOn] = useState(false);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const { speak, stop } = useSpeech();

  const currentIndex = SCREEN_ORDER.indexOf(screen);

  const gallery = useMemo(
    () => [
      IMAGES.community,
      IMAGES.education,
      IMAGES.nutrition,
      IMAGES.recipes,
      IMAGES.produce,
      IMAGES.family,
      IMAGES.training,
      IMAGES.events,
      IMAGES.wellness,
      IMAGES.logistics,
      IMAGES.airport,
      IMAGES.future,
    ],
    []
  );

  useEffect(() => {
    if (!voiceOn) {
      stop();
      return;
    }

    const text = copy.screenBodies[screen];
    const id = window.setTimeout(() => {
      speak(text, language);
    }, 250);

    return () => {
      window.clearTimeout(id);
    };
  }, [screen, language, voiceOn]);

  useEffect(() => {
    if (!tourOn) return;
    const id = setInterval(() => {
      setScreen((prev) => {
        const i = SCREEN_ORDER.indexOf(prev);
        return SCREEN_ORDER[(i + 1) % SCREEN_ORDER.length];
      });
    }, 9000);
    return () => clearInterval(id);
  }, [tourOn]);

  const goto = (next: ScreenKey) => {
    setTourOn(false);
    setScreen(next);
  };

  const nextScreen = () => goto(SCREEN_ORDER[(currentIndex + 1) % SCREEN_ORDER.length]);
  const prevScreen = () => goto(SCREEN_ORDER[(currentIndex - 1 + SCREEN_ORDER.length) % SCREEN_ORDER.length]);

  const roleTiles = [
    {
      key: "guest" as ScreenKey,
      title: "Guest",
      text: "Discover the farm, the story, the land, events, and the airport-connected grow areas.",
      image: IMAGES.guest,
      next: ["Story", "Events", "Gallery"],
    },
    {
      key: "customer" as ScreenKey,
      title: "Customer",
      text: "Move quickly to GrownBy, then return for recipes, nutrition, and food guidance.",
      image: IMAGES.customer,
      next: ["Marketplace", "Recipes", "Nutrition"],
    },
    {
      key: "grower" as ScreenKey,
      title: "Grower",
      text: "Access planning, seasonal guidance, training, and ecosystem support.",
      image: IMAGES.grower,
      next: ["Planner", "Seasonal Guidance", "Coordination"],
    },
    {
      key: "valueAdded" as ScreenKey,
      title: "Value-Added Producer",
      text: "Explore branding, packaging, demonstrations, and local market opportunity.",
      image: IMAGES.valueAdded,
      next: ["Branding", "Packaging", "Market Access"],
    },
    {
      key: "youth" as ScreenKey,
      title: "Youth Workforce",
      text: "Enter a structured living classroom where agriculture, teamwork, responsibility, and entrepreneurship prepare young people for future success, with Parent Portal access and supervisor support built into the program.",
      image: IMAGES.youth,
      next: ["Learning", "Parent Portal", "Support"],
    },
    {
      key: "volunteers" as ScreenKey,
      title: "Volunteers",
      text: "Join the farm through service, support, events, hospitality, and meaningful community contribution.",
      image: IMAGES.volunteers,
      next: ["Service", "Events", "Community"],
    },
  ];

  const detailBlocks: Record<ScreenKey, { title: string; text: string; icon: React.ReactNode }[]> = {
    home: [
      { title: "Families belong here", text: "This ecosystem is designed to feel welcoming, useful, and worth returning to.", icon: <Users size={20} /> },
      { title: "Marketplace through GrownBy", text: "Customers should feel that food access is close by, not hidden.", icon: <Store size={20} /> },
      { title: "Living ecosystem", text: "Growers, youth, volunteers, guests, and producers each have a real pathway.", icon: <Leaf size={20} /> },
    ],
    story: [
      { title: "Family legacy", text: "The farm carries Bronson and Lorenzana legacy into a future-focused Youngstown vision.", icon: <Trees size={20} /> },
      { title: "Land restoration", text: "The project restores land while creating food, education, and agritourism opportunity.", icon: <Tractor size={20} /> },
      { title: "Community future", text: "This is about more than a site. It is an ecosystem for long-term return and growth.", icon: <BadgeCheck size={20} /> },
    ],
    guest: [
      { title: "Clear welcome", text: "Guests learn what this place is, why it matters, and where they can go next.", icon: <UserRound size={20} /> },
      { title: "Airport relationship", text: "Visitors should understand the story of the FAA-approved grow areas and support for the vision.", icon: <Info size={20} /> },
      { title: "Return value", text: "Events, demonstrations, and seasonal change keep people coming back.", icon: <CheckCircle2 size={20} /> },
    ],
    customer: [
      { title: "Fresh food first", text: "Customers should see produce, seedlings, and Bubble Babies with clarity, warmth, and a direct path to purchase.", icon: <ShoppingBasket size={20} /> },
      { title: "Recipes and nutrition", text: "Food guidance, recipe ideas, and healthier living support help customers return for more than shopping.", icon: <BookOpen size={20} /> },
      { title: "Fast route to GrownBy", text: "Many users will want a direct move from interest to marketplace, so this pathway should feel simple and immediate.", icon: <Store size={20} /> },
    ],
    marketplace: [
      { title: "GrownBy centered", text: "The marketplace is a core part of the ecosystem and should feel close at hand.", icon: <Store size={20} /> },
      { title: "Product pathways", text: "Seedlings, produce, and future offerings can be surfaced with strong visual clarity.", icon: <Leaf size={20} /> },
      { title: "Return behavior", text: "This area can grow into reminders, favorites, and preorder patterns over time.", icon: <HeartPulse size={20} /> },
    ],
    grower: [
      { title: "Planning tools", text: "Growers need seasonal timing, inventory awareness, and readiness support.", icon: <CalendarDays size={20} /> },
      { title: "Collaboration", text: "The grower pathway should feel connected to a broader ecosystem, not isolated.", icon: <Sprout size={20} /> },
      { title: "Practical value", text: "This platform should be useful enough that growers want to revisit it regularly.", icon: <BadgeCheck size={20} /> },
    ],
    valueAdded: [
      { title: "From product to presentation", text: "This pathway supports stronger local product visibility through branding and experience.", icon: <Briefcase size={20} /> },
      { title: "Demonstrations", text: "Events and market experiences can increase value and customer connection.", icon: <Store size={20} /> },
      { title: "Shared network", text: "The goal is participation in a broader ecosystem of visibility and opportunity.", icon: <Users size={20} /> },
    ],
    youth: [
      { title: "Living classroom", text: "Youth experience agriculture, STEAM, teamwork, responsibility, and entrepreneurship in a real-world setting.", icon: <GraduationCap size={20} /> },
      { title: "Parent Portal included", text: "Families can stay connected to program structure, communication, participation, and progress through a parent-facing view inside Youth Workforce.", icon: <Users size={20} /> },
      { title: "Built-in support", text: "Supervisor guidance, structure, logistics, accountability, and wellness support are part of the Youth Workforce pathway.", icon: <ShieldCheck size={20} /> },
    ],
    volunteers: [
      { title: "Service pathway", text: "Volunteers help make the ecosystem visible, welcoming, and functional through shared work and presence.", icon: <Users size={20} /> },
      { title: "Event and farm support", text: "This includes setup, hospitality, planting help, educational activities, and community participation.", icon: <CalendarDays size={20} /> },
      { title: "Belonging and return", text: "The volunteer pathway should help people feel needed, appreciated, and connected enough to come back.", icon: <HeartPulse size={20} /> },
    ],
    planner: [
      { title: "Season status", text: "Warm season planning is active, with field prep, seedling movement, irrigation thinking, and event readiness underway.", icon: <CalendarDays size={20} /> },
      { title: "Next planting window", text: "Upcoming planting windows help align production timing, volunteer coordination, grower activity, and community-facing supply.", icon: <Sprout size={20} /> },
      { title: "Harvest and event readiness", text: "The planner helps connect crops, staffing, weather, inventory, and event preparation so the ecosystem feels alive and practical.", icon: <CloudSun size={20} /> },
    ],
    events: [
      { title: "Return engine", text: "Events create repeated entry into the ecosystem for learning, shopping, demonstrations, and community connection.", icon: <Users size={20} /> },
      { title: "Reservations and check-in", text: "This space can preview RSVP, organized arrival, and role-based guest flow for future event experiences.", icon: <CalendarDays size={20} /> },
      { title: "Partners and demos", text: "Educational partners, sponsor-led demonstrations, and guided experiences help make the farm feel active and worth revisiting.", icon: <BadgeCheck size={20} /> },
    ],
    wellness: [
      { title: "Food and health connection", text: "Fresh food connects to energy, family habits, diabetes awareness, movement, and overall quality of life.", icon: <HeartPulse size={20} /> },
      { title: "Natural vs processed", text: "The platform helps explain why food choices matter, especially when rising costs push families toward harmful substitutes.", icon: <Leaf size={20} /> },
      { title: "Practical support", text: "Nutrition education, recipe ideas, and healthier-at-home guidance should feel useful, simple, and close at hand.", icon: <BookOpen size={20} /> },
    ],
  };

  return (
    <div style={styles.app} dir={language === "he" ? "rtl" : "ltr"}>
      <div style={styles.hero}>
        <img src={SCREEN_IMAGES[screen]} alt={copy.screenTitles[screen]} style={styles.bgImage} />
        <div style={styles.bgOverlay} />

        <div style={styles.shell}>
          <div style={styles.topbar}>
            <div style={styles.brandBlock}>
              <div style={styles.subbrand}>{copy.subbrand}</div>
              <div style={styles.brand}>{copy.brand}</div>
            </div>

            <div style={styles.nav}>
              {[
                ["home", <Home size={16} />, "Entrance"],
                ["story", <Info size={16} />, "Our Story"],
                ["guest", <Users size={16} />, "Role Pathways"],
                ["events", <CalendarDays size={16} />, "View Events"],
                ["wellness", <HeartPulse size={16} />, "Health & Nutrition"],
                ["marketplace", <Store size={16} />, "Go to Marketplace"],
              ].map(([key, icon, label]) => (
                <button
                  key={String(key)}
                  onClick={() => goto(key as ScreenKey)}
                  style={{ ...styles.pill, ...(screen === key ? styles.activePill : {}) }}
                >
                  {icon}
                  {label}
                </button>
              ))}

              <button
                onClick={() => {
                  stop();
                  setVoiceOn((v) => !v);
                }}
                style={styles.pill}
              >
                <Mic size={16} /> {voiceOn ? "Voice narration on" : "Voice narration off"}
              </button>
            </div>
          </div>

          <div style={styles.layout}>
            <div style={styles.left}>
              <div style={styles.badge}>
                <Leaf size={16} /> {copy.screenTitles[screen]}
              </div>
              <h1 style={styles.title}>{copy.screenTitles[screen]}</h1>
              <div style={styles.body}>{copy.screenBodies[screen]}</div>

              <div style={styles.actions}>
                <button
                  style={styles.whiteBtn}
                  onClick={() => {
                    stop();
                    setTourOn((v) => !v);
                  }}
                >
                  <Play size={16} /> {tourOn ? "Stop Guided Tour" : "Start Guided Tour"}
                </button>
                <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                  <Store size={16} /> Go to Marketplace
                </button>
                <button style={styles.ghostBtn} onClick={() => goto("planner")}>
                  <CalendarDays size={16} /> Open Crop Planner
                </button>
              </div>

              <div style={styles.statGrid}>
                <div style={styles.card}>
                  <div style={styles.miniLabel}>Seasonal conditions</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    <CloudSun size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    Warm season planning active
                  </div>
                  <div style={{ color: "rgba(239,247,239,0.88)", lineHeight: 1.6 }}>
                    Field prep, seedling movement, event readiness, and seasonal coordination are active.
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.miniLabel}>Farm calendar</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    <CalendarDays size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    Living schedule
                  </div>
                  <div style={{ color: "rgba(239,247,239,0.88)", lineHeight: 1.6 }}>
                    Seedlings, events, education, youth activities, and harvest pathways connect here.
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.miniLabel}>Choose language</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                    <Languages size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    {language === "en"
                      ? "English"
                      : language === "es"
                      ? "Español"
                      : language === "tl"
                      ? "Tagalog"
                      : language === "it"
                      ? "Italiano"
                      : language === "patwa"
                      ? "Patwa"
                      : "Hebrew"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(["en", "es", "tl", "it", "patwa", "he"] as LanguageKey[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          stop();
                          setLanguage(lang);
                        }}
                        style={{
                          ...styles.pill,
                          padding: "8px 12px",
                          fontSize: 13,
                          ...(language === lang ? styles.activePill : {}),
                        }}
                      >
                        {lang === "en"
                          ? "English"
                          : lang === "es"
                          ? "Español"
                          : lang === "tl"
                          ? "Tagalog"
                          : lang === "it"
                          ? "Italiano"
                          : lang === "patwa"
                          ? "Patwa"
                          : "Hebrew"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sideCard}>
              <div style={styles.miniLabel}>A place people want to return to</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                Living ecosystem overview
              </div>
              <div style={{ lineHeight: 1.7, color: "rgba(245,250,245,0.9)", marginBottom: 18 }}>
                This living farm ecosystem is designed to help guests, customers, growers, youth, volunteers, partners, and families move toward food self-sufficiency, economic opportunity, practical wellness, and stronger community connection.
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {detailBlocks[screen].map((item) => (
                  <div key={item.title} style={styles.infoBox}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                      {item.icon}
                      {item.title}
                    </div>
                    <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {screen === "home" && (
            <div style={styles.section}>
              <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Role pathways</div>
              <div style={{ color: "rgba(239,247,239,0.88)", lineHeight: 1.7, maxWidth: 900, marginBottom: 18 }}>
                Each role should feel welcomed, informed, and able to move forward. These pathways are built to create return visits, not one-time clicks.
              </div>
              <div style={styles.roleGrid}>
                {roleTiles.map((role) => (
                  <button
                    key={role.title}
                    onClick={() => goto(role.key)}
                    style={{
                      ...styles.roleTile,
                      ...(role.key === "youth"
                        ? {
                            boxShadow: "0 24px 70px rgba(10,40,24,0.34)",
                            border: "1px solid rgba(182,226,196,0.22)",
                          }
                        : role.key === "volunteers"
                        ? {
                            boxShadow: "0 24px 70px rgba(48,42,12,0.28)",
                            border: "1px solid rgba(220,214,168,0.20)",
                          }
                        : {}),
                      transform: "translateY(0)",
                      transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 28px 70px rgba(0,0,0,0.28)";
                      e.currentTarget.style.borderColor = "rgba(214,233,214,0.28)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        role.key === "youth"
                          ? "0 24px 70px rgba(10,40,24,0.34)"
                          : role.key === "volunteers"
                          ? "0 24px 70px rgba(48,42,12,0.28)"
                          : "0 20px 60px rgba(0,0,0,0.18)";
                      e.currentTarget.style.borderColor =
                        role.key === "youth"
                          ? "rgba(182,226,196,0.22)"
                          : role.key === "volunteers"
                          ? "rgba(220,214,168,0.20)"
                          : "rgba(255,255,255,0.16)";
                    }}
                  >
                    <img
                      src={role.image}
                      alt={role.title}
                      style={{
                        ...styles.roleImage,
                        transition: "transform 700ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <div style={styles.roleOverlay} />
                    <div style={styles.roleContent}>
                      <div
                        style={{
                          fontSize: 26,
                          fontWeight: 800,
                          marginBottom: 8,
                          color: "#ffffff",
                          textShadow: "0 2px 10px rgba(0,0,0,0.65)",
                        }}
                      >
                        {role.title}
                      </div>
                      <div
                        style={{
                          lineHeight: 1.65,
                          color: "rgba(255,255,255,0.96)",
                          marginBottom: 12,
                          fontSize: 17,
                          textShadow: "0 2px 8px rgba(0,0,0,0.60)",
                        }}
                      >
                        {role.text}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {role.next.map((item: string) => (
                          <span
                            key={item}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "7px 11px",
                              borderRadius: 999,
                              background: "rgba(141,185,137,0.18)",
                              border: "1px solid rgba(255,255,255,0.16)",
                              fontSize: 12,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen !== "home" && (
            <div style={styles.section}>
              <div style={styles.twoCol}>
                <div style={styles.sideCard}>
                  <div style={styles.miniLabel}>Pathway details</div>
                  <div style={styles.detailGrid}>
                    {detailBlocks[screen].map((item) => (
                      <div key={item.title} style={styles.infoBox}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                          {item.icon}
                          {item.title}
                        </div>
                        <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>{item.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.sideCard}>
                  <div
                    style={{
                      borderRadius: 22,
                      overflow: "hidden",
                      marginBottom: 16,
                      border: "1px solid rgba(214,233,214,0.10)",
                    }}
                  >
                    <img
                      src={SCREEN_IMAGES[screen]}
                      alt={copy.screenTitles[screen]}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  <div style={styles.miniLabel}>Next strongest moves</div>
                  <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                    {screen === "guest" && (
                      <>
                        <button style={styles.ghostBtn} onClick={() => goto("story")}>Story</button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>Events</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(IMAGES.community)}>Open Gallery</button>
                      </>
                    )}

                    {screen === "customer" && (
                      <>
                        <div
                          style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            marginBottom: 6,
                            border: "1px solid rgba(214,233,190,0.18)",
                            background: "linear-gradient(180deg, rgba(58,74,36,0.34), rgba(20,28,18,0.48))",
                            boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
                          }}
                        >
                          <img
                            src={IMAGES.customer}
                            alt="Customer pathway"
                            style={{
                              width: "100%",
                              height: 210,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          <div style={{ padding: 18 }}>
                            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#ffffff" }}>
                              Customer Food Path
                            </div>
                            <div style={{ lineHeight: 1.7, color: "rgba(241,248,241,0.90)", marginBottom: 14 }}>
                              This pathway helps families move from interest to access by connecting fresh food, seedlings, recipes, nutrition guidance, and a direct route into the marketplace.
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              {["Fresh Food", "Seedlings", "Bubble Babies", "Recipes", "Nutrition"].map((item) => (
                                <span
                                  key={item}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "7px 11px",
                                    borderRadius: 999,
                                    background: "rgba(190,196,120,0.16)",
                                    border: "1px solid rgba(233,238,221,0.16)",
                                    fontSize: 12,
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button style={styles.whiteBtn} onClick={() => goto("marketplace")}>
                          Go to Marketplace
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          Recipes & Nutrition
                        </button>

                        <div style={{ ...styles.infoBox, ...customerAccent }}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Customer path priority</div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>
                            This pathway is designed to move people quickly toward GrownBy, then bring them back for fresh food guidance, healthier choices, and repeat visits.
                          </div>
                        </div>

                        <div style={{ ...styles.infoBox, ...customerAccent }}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Food access with meaning</div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>
                            The goal is not only to shop, but to help families build healthier habits, understand natural food, and return to the ecosystem for ongoing support.
                          </div>
                        </div>
                      </>
                    )}

                    {screen === "marketplace" && (
                      <>
                        <div
                          style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            marginBottom: 6,
                            border: "1px solid rgba(214,233,190,0.18)",
                            background: "linear-gradient(180deg, rgba(72,66,34,0.34), rgba(24,22,16,0.48))",
                            boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
                          }}
                        >
                          <img
                            src={IMAGES.marketplace}
                            alt="Marketplace"
                            style={{
                              width: "100%",
                              height: 210,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          <div style={{ padding: 18 }}>
                            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#ffffff" }}>
                              Marketplace Through GrownBy
                            </div>
                            <div style={{ lineHeight: 1.7, color: "rgba(241,248,241,0.90)", marginBottom: 14 }}>
                              This is where interest becomes action through fresh food, seedlings, and future offerings connected to the farm’s wider ecosystem.
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              {["GrownBy", "Fresh Food", "Seedlings", "Preorders", "Return Visits"].map((item) => (
                                <span
                                  key={item}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "7px 11px",
                                    borderRadius: 999,
                                    background: "rgba(196,170,120,0.16)",
                                    border: "1px solid rgba(233,238,221,0.16)",
                                    fontSize: 12,
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <a
                          href="https://grownby.com/farms/bronson-family-farm/shop"
                          target="_blank"
                          rel="noreferrer"
                          style={{ ...styles.whiteBtn, justifyContent: "center" }}
                        >
                          Open GrownBy Store
                        </a>
                        <button style={styles.ghostBtn} onClick={() => goto("customer")}>
                          Back to Customer Path
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          Food Guidance
                        </button>

                        <div style={{ ...styles.infoBox, ...marketplaceAccent }}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            Marketplace destination
                          </div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>
                            The marketplace should feel direct, trustworthy, and easy to use while still staying connected to the larger story of fresh food, health, and self-sufficiency.
                          </div>
                        </div>
                      </>
                    )}

                    {screen === "grower" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("planner")}>Open Crop Planner</button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>Seasonal Events</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(IMAGES.training)}>Coordination View</button>
                      </>
                    )}

                    {screen === "valueAdded" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("events")}>Demonstrations</button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>Market Access</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(IMAGES.produce)}>Product Presentation</button>
                      </>
                    )}

                    {screen === "youth" && (
                      <>
                        <div
                          style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            marginBottom: 6,
                            border: "1px solid rgba(180,220,190,0.18)",
                            background: "linear-gradient(180deg, rgba(32,58,52,0.42), rgba(16,26,22,0.52))",
                            boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
                          }}
                        >
                          <img
                            src={IMAGES.youth}
                            alt="Youth Workforce"
                            style={{
                              width: "100%",
                              height: 210,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          <div style={{ padding: 18 }}>
                            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#ffffff" }}>
                              Youth Workforce Program
                            </div>
                            <div style={{ lineHeight: 1.7, color: "rgba(241,248,241,0.90)", marginBottom: 14 }}>
                              A structured living classroom where youth gain hands-on experience in agriculture, teamwork, responsibility, entrepreneurship, and future readiness with family visibility and supervisor support built into the program.
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              {["Learning", "Parent Portal", "Supervisor Support", "STEAM", "Future Readiness"].map((item) => (
                                <span
                                  key={item}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "7px 11px",
                                    borderRadius: 999,
                                    background: "rgba(148,196,160,0.18)",
                                    border: "1px solid rgba(221,238,221,0.16)",
                                    fontSize: 12,
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button style={styles.whiteBtn} onClick={() => goto("planner")}>Learning Schedule</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(IMAGES.training)}>STEAM & Training</button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>Parent Portal & Support</button>

                        <div style={{ ...styles.infoBox, ...youthAccent }}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            Parent Portal included
                          </div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>
                            Families can stay connected to structure, communication, participation, progress, and support through a parent-facing layer within Youth Workforce.
                          </div>
                        </div>

                        <div style={{ ...styles.infoBox, ...youthAccent }}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            Supervisor support built in
                          </div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>
                            Supervisor guidance is part of the program through structure, logistics, accountability, encouragement, and wellness support.
                          </div>
                        </div>
                      </>
                    )}

                    {screen === "volunteers" && (
                      <>
                        <div
                          style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            marginBottom: 6,
                            border: "1px solid rgba(214,233,190,0.18)",
                            background: "linear-gradient(180deg, rgba(68,74,44,0.34), rgba(24,28,18,0.48))",
                            boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
                          }}
                        >
                          <img
                            src={IMAGES.volunteers}
                            alt="Volunteers"
                            style={{
                              width: "100%",
                              height: 210,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          <div style={{ padding: 18 }}>
                            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "#ffffff" }}>
                              Volunteer Pathway
                            </div>
                            <div style={{ lineHeight: 1.7, color: "rgba(241,248,241,0.90)", marginBottom: 14 }}>
                              A welcoming community service pathway where people can support growing, events, hospitality, setup, and shared learning while becoming part of the larger mission of the farm.
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              {["Service", "Hospitality", "Events", "Community", "Shared Work"].map((item) => (
                                <span
                                  key={item}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "7px 11px",
                                    borderRadius: 999,
                                    background: "rgba(196,186,120,0.16)",
                                    border: "1px solid rgba(233,238,221,0.16)",
                                    fontSize: 12,
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button style={styles.whiteBtn} onClick={() => goto("events")}>Event Support</button>
                        <button style={styles.ghostBtn} onClick={() => goto("youth")}>Youth Connection</button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>Community Care</button>

                        <div style={{ ...styles.infoBox, ...volunteerAccent }}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            Service and belonging
                          </div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>
                            Volunteers help make the ecosystem visible, welcoming, and functional through shared work, presence, and community support.
                          </div>
                        </div>

                        <div style={{ ...styles.infoBox, ...volunteerAccent }}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            Event and farm support
                          </div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)" }}>
                            This can include setup, hospitality, planting help, educational activities, and participation in farm events and visitor experiences.
                          </div>
                        </div>
                      </>
                    )}

                    {screen === "story" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("guest")}>Enter as Guest</button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>Community Experiences</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(IMAGES.legacy)}>Legacy View</button>
                      </>
                    )}

                    {screen === "planner" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("grower")}>Grower Path</button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>Event Readiness</button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>Inventory to Market</button>
                      </>
                    )}

                    {screen === "events" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("guest")}>Guest Experiences</button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>Vendor & Market Flow</button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>Health Education</button>
                      </>
                    )}

                    {screen === "wellness" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("customer")}>Customer Food Path</button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>Shop Fresh Food</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(IMAGES.nutrition)}>Nutrition View</button>
                        <div style={styles.infoBox}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Wellness cluster</div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)", marginBottom: 10 }}>
                            This area should help people connect food access with simple recipes, diabetes awareness, better choices, and everyday wellness.
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {["Fresh Choices", "Recipes", "Nutrition", "Diabetes Awareness", "Healthier at Home"].map((item) => (
                              <span
                                key={item}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  padding: "7px 11px",
                                  borderRadius: 999,
                                  background: "rgba(141,185,137,0.18)",
                                  border: "1px solid rgba(255,255,255,0.16)",
                                  fontSize: 12,
                                  letterSpacing: "0.04em",
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div style={styles.miniLabel}>Image gallery</div>
                  <div style={{ marginBottom: 14, color: "rgba(239,247,239,0.88)" }}>
                    Using the other farm photos instead of repeating the same two images.
                  </div>
                  <div style={styles.galleryGrid}>
                    {gallery.map((img, idx) => (
                      <button key={`${img}-${idx}`} style={styles.galleryItem} onClick={() => setImageModal(img)}>
                        <img src={img} alt={`Farm ${idx + 1}`} style={styles.galleryImage} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={styles.section}>
            <div style={styles.sideCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={styles.miniLabel}>Explore modules</div>
                  <div style={{ fontSize: 28, fontWeight: 800 }}>Designed to feel like a living destination</div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={styles.ghostBtn} onClick={prevScreen}><ArrowLeft size={16} /> Previous</button>
                  <button style={styles.ghostBtn} onClick={() => goto("home")}><Home size={16} /> Back to entrance</button>
                  <button style={styles.whiteBtn} onClick={nextScreen}><ArrowRight size={16} /> Next</button>
                </div>
              </div>
              <div style={styles.footerModuleGrid}>
                {[
                  "Marketplace through GrownBy",
                  "Events and reservation pathways",
                  "Crop planning and seasonal guidance",
                  "Youth workforce, family, and supervisor support",
                  "Volunteer service and community participation",
                  "Nutrition, recipes, wellness, and community partnerships",
                ].map((item) => (
                  <div key={item} style={styles.moduleBox}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageModal && (
        <div style={styles.modal}>
          <button style={styles.closeBtn} onClick={() => setImageModal(null)}>
            <X size={20} />
          </button>
          <img src={imageModal} alt="Expanded farm view" style={styles.modalImage} />
        </div>
      )}
    </div>
  );
}

export default App;
