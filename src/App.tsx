import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CloudSun,
  Leaf,
  Mic,
  Play,
  ShoppingBasket,
  Sprout,
  Store,
  Users,
  UserRound,
  Trees,
  HeartPulse,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Tractor,
  BookOpen,
  BadgeCheck,
  CheckCircle2,
  Languages,
  Home,
  Info,
  X,
} from "lucide-react";

const IMAGES = {
  entrance: "/GrowArea.jpg",
  story: "/large (10).jpg",
  guest: "/Samaeera1.jpg",
  customer: "/culinary_edibleflowers.jpeg",
  marketplace: "/culinary_edibleflowers2.jpeg",
  grower: "/Samerra4.jpg",
  valueAdded: "/culinary_mushrooms.jpeg",
  youth: "/large (11).jpg",
  supervisor: "/large (1).jpg",
  community: "/WolfSpider.jpg",
  education: "/Samerra5.jpg",
  wellness: "/Samaeera2.jpg",
  events: "/Samaeera3.jpg",
  planning: "/GrowArea2.jpg",
  weather: "/large (1).jpg",
  family: "/large (10).jpg",
  logistics: "/Samerra4.jpg",
  airport: "/GrowArea.jpg",
  produce: "/culinary_edibleflowers2.jpeg",
  volunteers: "/Samaeera1.jpg",
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
  | "supervisor"
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
  "supervisor",
  "planner",
  "events",
  "wellness",
];

const SCREEN_IMAGES: Record<ScreenKey, string> = {
  home: IMAGES.entrance,
  story: IMAGES.story,
  guest: IMAGES.guest,
  customer: IMAGES.customer,
  marketplace: IMAGES.marketplace,
  grower: IMAGES.grower,
  valueAdded: IMAGES.valueAdded,
  youth: IMAGES.youth,
  supervisor: IMAGES.supervisor,
  planner: IMAGES.planning,
  events: IMAGES.events,
  wellness: IMAGES.wellness,
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
      supervisor: "Supervisor pathway",
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
      youth: "Youth workforce opens a living classroom where agriculture, technology, teamwork, and entrepreneurship prepare young people for future success.",
      supervisor: "Supervisor supports youth development through structure, accountability, logistics, wellness guidance, and leadership.",
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
      supervisor: "Ruta del supervisor",
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
      youth: "La fuerza laboral juvenil abre un aula viva donde la agricultura, la tecnología, el trabajo en equipo y el emprendimiento preparan a los jóvenes para el éxito futuro.",
      supervisor: "El supervisor apoya el desarrollo juvenil mediante estructura, responsabilidad, logística, orientación de bienestar y liderazgo.",
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
      supervisor: "Landas ng supervisor",
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
      youth: "Binubuksan ng youth workforce ang isang buhay na classroom kung saan ang agrikultura, teknolohiya, teamwork, at entrepreneurship ay naghahanda sa kabataan para sa tagumpay.",
      supervisor: "Sinusuportahan ng supervisor ang youth development sa pamamagitan ng istruktura, accountability, logistics, wellness guidance, at leadership.",
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
      supervisor: "Percorso supervisore",
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
      youth: "La forza lavoro giovanile apre una classe viva dove agricoltura, tecnologia, lavoro di squadra e imprenditorialità preparano i giovani al successo futuro.",
      supervisor: "Il supervisore sostiene lo sviluppo dei giovani attraverso struttura, responsabilità, logistica, orientamento al benessere e leadership.",
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
      supervisor: "Supervisor pathway",
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
      youth: "Youth workforce open up a living classroom weh agriculture, technology, teamwork, an entrepreneurship prepare young people fi future success.",
      supervisor: "Supervisor support youth development through structure, accountability, logistics, wellness guidance, an leadership.",
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
      supervisor: "מסלול מפקח",
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
      youth: "כוח העבודה לנוער פותח כיתה חיה שבה חקלאות, טכנולוגיה, עבודת צוות ויזמות מכינות צעירים להצלחה עתידית.",
      supervisor: "המפקח תומך בפיתוח הנוער באמצעות מבנה, אחריות, לוגיסטיקה, הכוונת רווחה ומנהיגות.",
      planner: "מרכז התכנון הזה מסייע להפוך אדמה, עבודה, זרעים, מזג אוויר ותזמון לייצור מזון אמיתי, להזדמנויות הכנסה, להכשרה ולאספקה קהילתית אמינה.",
      events: "אירועים מחזירים אנשים ללמידה, קניות, הדגמות, בניית קשרים וחוויה קהילתית משותפת.",
      wellness: "המסלול הזה עוזר לאנשים לחבר בין מזון טרי לרווחה מעשית, לבחירות טובות יותר, למתכונים, למודעות לסוכרת ולחיי היומיום.",
    },
  },
};

function useSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== "undefined" ? window.speechSynthesis : null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const timeoutRef = useRef<number | null>(null);

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
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
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
      const partial = voices.find((v) => v.lang?.toLowerCase().startsWith(code.slice(0, 2).toLowerCase()));
      if (partial) return partial;
    }
    return voices.find((v) => v.lang?.toLowerCase().startsWith("en")) || voices[0] || null;
  };

  const stop = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speak = (text: string, lang: LanguageKey) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    stop();
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

    timeoutRef.current = window.setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }, 180);
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
    background: "linear-gradient(to top, rgba(0,0,0,0.86), rgba(0,0,0,0.24))",
  },
  roleContent: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
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

function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [voiceOn, setVoiceOn] = useState(true);
  const [tourOn, setTourOn] = useState(false);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const { speak, stop } = useSpeech();
  const copy = T[language] || T.en;

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
    stop();
    if (!voiceOn) return;
    const id = window.setTimeout(() => {
      speak(copy.screenBodies[screen], language);
    }, 180);
    return () => {
      window.clearTimeout(id);
      stop();
    };
  }, [screen, language, voiceOn, copy, stop, speak]);

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
    { key: "guest" as ScreenKey, title: "Guest", text: "Discover the farm, the story, the land, events, and the airport-connected grow areas.", image: IMAGES.guest, next: ["Story", "Events", "Gallery"] },
    { key: "customer" as ScreenKey, title: "Customer", text: "Move quickly to GrownBy, then return for recipes, nutrition, and food guidance.", image: IMAGES.customer, next: ["Marketplace", "Recipes", "Nutrition"] },
    { key: "grower" as ScreenKey, title: "Grower", text: "Access planning, seasonal guidance, training, and ecosystem support.", image: IMAGES.grower, next: ["Planner", "Seasonal Guidance", "Coordination"] },
    { key: "valueAdded" as ScreenKey, title: "Value-Added Producer", text: "Explore branding, packaging, demonstrations, and local market opportunity.", image: IMAGES.valueAdded, next: ["Branding", "Packaging", "Market Access"] },
    { key: "youth" as ScreenKey, title: "Youth Workforce", text: "See the farm as a living classroom for agriculture, STEAM, teamwork, and entrepreneurship.", image: IMAGES.youth, next: ["Learning", "STEAM", "Responsibilities"] },
    { key: "supervisor" as ScreenKey, title: "Supervisor", text: "Support youth workforce through scheduling, oversight, wellness support, and accountability.", image: IMAGES.supervisor, next: ["Scheduling", "Check-In", "Support"] },
  ];

  const detailBlocks: Record<ScreenKey, { title: string; text: string; icon: React.ReactNode }[]> = {
    home: [
      { title: "Families belong here", text: "This ecosystem is designed to feel welcoming, useful, and worth returning to.", icon: <Users size={20} /> },
      { title: "Marketplace through GrownBy", text: "Customers should feel that food access is close by, not hidden.", icon: <Store size={20} /> },
      { title: "Living ecosystem", text: "Growers, youth, supervisors, guests, and producers each have a real pathway.", icon: <Leaf size={20} /> },
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
      { title: "Living classroom", text: "Youth experience agriculture, STEAM, teamwork, and responsibility in real time.", icon: <GraduationCap size={20} /> },
      { title: "Family confidence", text: "Parents and partners should feel that youth are entering a structured, meaningful environment.", icon: <Users size={20} /> },
      { title: "Career-connected", text: "This pathway supports future roles in farming, media, logistics, business, and entrepreneurship.", icon: <BadgeCheck size={20} /> },
    ],
    supervisor: [
      { title: "Inside youth workforce only", text: "Supervisor is not separate from youth workforce. It exists to support it.", icon: <ShieldCheck size={20} /> },
      { title: "Support resources", text: "This can reflect staffing, wellness, and supportive oversight for youth participants.", icon: <HeartPulse size={20} /> },
      { title: "Logistics and accountability", text: "Scheduling, check-ins, responsibilities, and day-of support belong here.", icon: <CheckCircle2 size={20} /> },
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
                This living farm ecosystem is designed to help guests, customers, growers, youth, partners, and families move toward food self-sufficiency, economic opportunity, practical wellness, and stronger community connection.
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
                  <button key={role.title} onClick={() => goto(role.key)} style={styles.roleTile}>
                    <img src={role.image} alt={role.title} style={styles.roleImage} />
                    <div style={styles.roleOverlay} />
                    <div style={styles.roleContent}>
                      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{role.title}</div>
                      <div style={{ lineHeight: 1.7, color: "rgba(255,255,255,0.9)", marginBottom: 12 }}>{role.text}</div>
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
                        <button style={{ ...styles.whiteBtn, justifyContent: "center" }} onClick={() => goto("marketplace")}>Go to Marketplace</button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>Recipes & Nutrition</button>
                        <div style={styles.infoBox}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Customer path priority</div>
                          <div style={{ lineHeight: 1.65, color: "rgba(241,248,241,0.88)", marginBottom: 10 }}>
                            This pathway is designed to move people quickly toward GrownBy, then bring them back for fresh food guidance, healthier choices, and repeat visits.
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
                    {screen === "marketplace" && (
                      <>
                        <a href="https://grownby.com/farms/bronson-family-farm/shop" target="_blank" rel="noreferrer" style={{ ...styles.whiteBtn, justifyContent: "center" }}>
                          Open GrownBy Store
                        </a>
                        <button style={styles.ghostBtn} onClick={() => goto("customer")}>Back to Customer Path</button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>Food Guidance</button>
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
                        <button style={styles.whiteBtn} onClick={() => goto("supervisor")}>Supervisor Support</button>
                        <button style={styles.ghostBtn} onClick={() => goto("planner")}>Learning Schedule</button>
                        <button style={styles.ghostBtn} onClick={() => setImageModal(IMAGES.training)}>STEAM & Training</button>
                      </>
                    )}
                    {screen === "supervisor" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("youth")}>Back to Youth Workforce</button>
                        <button style={styles.ghostBtn} onClick={() => goto("planner")}>Scheduling</button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>Support Resources</button>
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
                  "Youth workforce and supervisor support",
                  "Nutrition, recipes, and wellness education",
                  "Family legacy, agritourism, and community partnerships",
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
          <button style={styles.closeBtn} onClick={() => setImageModal(null)}><X size={20} /></button>
          <img src={imageModal} alt="Expanded farm view" style={styles.modalImage} />
        </div>
      )}
    </div>
  );
}

export default App;
