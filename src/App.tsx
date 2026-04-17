import { useEffect, useMemo, useState } from "react"

const roles = ["guest", "customer", "grower", "youth", "supervisor"] as const
type Role = (typeof roles)[number]
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"
type ViewKey = "overview" | "marketplace" | "recipes" | "nutrition" | "history"

const images: Record<Role, string> = {
  guest: "/guest.jpg",
  customer: "/market.jpg",
  grower: "/grow.jpg",
  youth: "/youth.jpg",
  supervisor: "/supervisor.jpg",
}

const languages = {
  en: {
    name: "English",
    voice: "en-US",
    roleTitle: {
      guest: "Guest",
      customer: "Customer",
      grower: "Grower",
      youth: "Youth Workforce",
      supervisor: "Supervisor",
    },
    narration: {
      guest:
        "Welcome to Bronson Family Farm. This ecosystem connects food, learning, workforce development, and community access.",
      customer:
        "As a customer, you can enter the marketplace, explore recipes, learn about nutrition, and make healthier food choices for yourself and your family.",
      grower:
        "Growers manage crops, seasons, inventory, and shared production opportunities across the ecosystem.",
      youth:
        "Youth workforce participants learn responsibility, agriculture, teamwork, safety, and pathways to future careers.",
      supervisor:
        "Supervisors support growth, guide learning, monitor progress, and help the workforce succeed.",
    },
    labels: {
      startTour: "Start Guided Tour",
      stopTour: "Stop Tour",
      guidedDemo: "Guided Demo",
      chooseLanguage: "Language",
      weather: "Current Weather",
      enterMarketplace: "Enter Marketplace",
      overview: "Overview",
      marketplace: "Marketplace",
      recipes: "Recipes",
      nutrition: "Nutrition",
      history: "Buying History",
      nutritionCard: "Food & Nutrition Education",
      recipeCard: "Recipe Ideas",
      historyCard: "Smart Buying Habits",
      marketCard: "Fresh Marketplace Access",
      freshVsProcessed: "Fresh vs. Processed Food",
      diabetesTips: "Diabetes-Friendly Guidance",
      familyNutrition: "Family Nutrition Support",
    },
    customerIntro:
      "Customers should be able to shop, learn, and return with confidence. The system should support healthy habits, practical meals, and stronger food choices over time.",
    marketplaceItems: [
      { name: "Collards", benefit: "Fiber-rich and supportive of heart health." },
      { name: "Tomatoes", benefit: "Rich in vitamin C and protective antioxidants." },
      { name: "Spinach", benefit: "Supports iron intake and brain health." },
      { name: "Peppers", benefit: "Boosts immune support and adds flavor without excess salt." },
      { name: "Cabbage", benefit: "Versatile, affordable, and nutrient-dense." },
      { name: "Cilantro", benefit: "Fresh herb flavor that supports lighter meals." },
    ],
    recipes: [
      {
        title: "Fresh Greens Bowl",
        desc: "Collards, cabbage, peppers, and light seasoning for a hearty vegetable bowl.",
      },
      {
        title: "Simple Tomato Herb Salad",
        desc: "Tomatoes, cilantro, olive oil, and a light splash of vinegar.",
      },
      {
        title: "Sautéed Greens Plate",
        desc: "Spinach and collards with onions and peppers for a quick family side dish.",
      },
    ],
    nutrition: [
      "Fresh foods usually contain more natural nutrients and less added sugar, sodium, and preservatives than heavily processed foods.",
      "Balanced meals with vegetables, herbs, and whole ingredients can support better energy, focus, and long-term health.",
      "Customers can use the platform to learn practical ways to shop, cook, and eat in support of everyday wellness.",
    ],
    history: [
      "Track favorite items and repeat purchases.",
      "Notice which fresh foods your household buys most often.",
      "Connect past purchases to recipe suggestions and healthier meal planning.",
    ],
  },
  es: {
    name: "Español",
    voice: "es-ES",
    roleTitle: {
      guest: "Invitado",
      customer: "Cliente",
      grower: "Productor",
      youth: "Juventud",
      supervisor: "Supervisor",
    },
    narration: {
      guest:
        "Bienvenido a Bronson Family Farm. Este ecosistema conecta alimentos, aprendizaje, desarrollo laboral y acceso comunitario.",
      customer:
        "Como cliente, puede entrar al mercado, explorar recetas, aprender sobre nutrición y tomar decisiones más saludables para usted y su familia.",
      grower:
        "Los productores gestionan cultivos, temporadas, inventario y oportunidades compartidas de producción.",
      youth:
        "Los jóvenes aprenden responsabilidad, agricultura, trabajo en equipo, seguridad y caminos hacia futuras carreras.",
      supervisor:
        "Los supervisores apoyan el crecimiento, guían el aprendizaje y ayudan al equipo a tener éxito.",
    },
    labels: {
      startTour: "Iniciar Recorrido",
      stopTour: "Detener Recorrido",
      guidedDemo: "Demostración Guiada",
      chooseLanguage: "Idioma",
      weather: "Clima Actual",
      enterMarketplace: "Entrar al Mercado",
      overview: "Resumen",
      marketplace: "Mercado",
      recipes: "Recetas",
      nutrition: "Nutrición",
      history: "Historial",
      nutritionCard: "Educación de Alimentos y Nutrición",
      recipeCard: "Ideas de Recetas",
      historyCard: "Hábitos Inteligentes de Compra",
      marketCard: "Acceso a Productos Frescos",
      freshVsProcessed: "Fresco vs. Procesado",
      diabetesTips: "Guía para Diabetes",
      familyNutrition: "Apoyo Nutricional Familiar",
    },
    customerIntro:
      "Los clientes deben poder comprar, aprender y regresar con confianza. El sistema debe apoyar hábitos saludables y mejores decisiones alimentarias.",
    marketplaceItems: [
      { name: "Berza", benefit: "Rica en fibra y buena para la salud del corazón." },
      { name: "Tomates", benefit: "Ricos en vitamina C y antioxidantes." },
      { name: "Espinaca", benefit: "Apoya el hierro y la salud cerebral." },
      { name: "Pimientos", benefit: "Apoya el sistema inmunológico." },
      { name: "Repollo", benefit: "Versátil, económico y nutritivo." },
      { name: "Cilantro", benefit: "Aporta sabor fresco a comidas ligeras." },
    ],
    recipes: [
      {
        title: "Tazón de Verduras Frescas",
        desc: "Berza, repollo, pimientos y condimento ligero.",
      },
      {
        title: "Ensalada de Tomate y Hierbas",
        desc: "Tomates, cilantro, aceite de oliva y un toque de vinagre.",
      },
      {
        title: "Verduras Salteadas",
        desc: "Espinaca y berza con cebolla y pimientos.",
      },
    ],
    nutrition: [
      "Los alimentos frescos suelen tener más nutrientes naturales y menos azúcar, sodio y conservantes añadidos.",
      "Las comidas balanceadas con vegetales y alimentos integrales apoyan mejor energía y salud a largo plazo.",
      "La plataforma ayuda a aprender formas prácticas de comprar, cocinar y comer mejor.",
    ],
    history: [
      "Haga seguimiento de sus artículos favoritos y compras repetidas.",
      "Observe qué alimentos frescos compra su hogar con más frecuencia.",
      "Conecte compras anteriores con recetas y planificación saludable.",
    ],
  },
  tl: {
    name: "Tagalog",
    voice: "tl-PH",
    roleTitle: {
      guest: "Panauhin",
      customer: "Customer",
      grower: "Grower",
      youth: "Kabataan",
      supervisor: "Supervisor",
    },
    narration: {
      guest:
        "Maligayang pagdating sa Bronson Family Farm. Pinagdurugtong ng ecosystem na ito ang pagkain, pagkatuto, trabaho, at komunidad.",
      customer:
        "Bilang customer, maaari kang pumasok sa marketplace, tumingin ng recipes, matuto tungkol sa nutrition, at pumili ng mas masustansiyang pagkain.",
      grower:
        "Pinamamahalaan ng growers ang mga pananim, panahon, imbentaryo, at shared production.",
      youth:
        "Natututo ang kabataan ng responsibilidad, agrikultura, teamwork, safety, at career pathways.",
      supervisor:
        "Gumagabay ang supervisors sa pagkatuto at tagumpay ng workforce.",
    },
    labels: {
      startTour: "Simulan ang Tour",
      stopTour: "Itigil ang Tour",
      guidedDemo: "Guided Demo",
      chooseLanguage: "Wika",
      weather: "Kasalukuyang Panahon",
      enterMarketplace: "Pumasok sa Marketplace",
      overview: "Pangkalahatan",
      marketplace: "Marketplace",
      recipes: "Mga Recipe",
      nutrition: "Nutrisyon",
      history: "Kasaysayan",
      nutritionCard: "Edukasyon sa Pagkain at Nutrisyon",
      recipeCard: "Mga Ideya sa Recipe",
      historyCard: "Matalinong Gawi sa Pagbili",
      marketCard: "Access sa Sariwang Pagkain",
      freshVsProcessed: "Fresh vs. Processed",
      diabetesTips: "Gabay para sa Diabetes",
      familyNutrition: "Suporta sa Nutrisyon ng Pamilya",
    },
    customerIntro:
      "Dapat makabili, matuto, at makabalik ang customer nang may kumpiyansa. Dapat suportahan ng system ang mas mabuting gawi sa pagkain.",
    marketplaceItems: [
      { name: "Collards", benefit: "Mayaman sa fiber at mabuti sa puso." },
      { name: "Tomatoes", benefit: "May vitamin C at antioxidants." },
      { name: "Spinach", benefit: "Tumutulong sa iron at brain health." },
      { name: "Peppers", benefit: "Suporta sa immune system." },
      { name: "Cabbage", benefit: "Abot-kaya at masustansiya." },
      { name: "Cilantro", benefit: "Nagbibigay ng sariwang lasa." },
    ],
    recipes: [
      {
        title: "Fresh Greens Bowl",
        desc: "Collards, cabbage, peppers, at magaang timpla.",
      },
      {
        title: "Tomato Herb Salad",
        desc: "Tomatoes, cilantro, olive oil, at kaunting suka.",
      },
      {
        title: "Sautéed Greens",
        desc: "Spinach at collards na may sibuyas at peppers.",
      },
    ],
    nutrition: [
      "Mas maraming natural nutrients at mas kaunting added sugar, sodium, at preservatives ang fresh foods.",
      "Ang balanced meals na may gulay ay nakatutulong sa energy at long-term health.",
      "Tinutulungan ng platform ang customer na mamili at magluto nang mas maayos.",
    ],
    history: [
      "Subaybayan ang mga paboritong binibili.",
      "Alamin kung aling sariwang pagkain ang madalas bilhin ng pamilya.",
      "Iugnay ang dating binili sa recipe suggestions at meal planning.",
    ],
  },
  it: {
    name: "Italiano",
    voice: "it-IT",
    roleTitle: {
      guest: "Ospite",
      customer: "Cliente",
      grower: "Coltivatore",
      youth: "Giovani",
      supervisor: "Supervisore",
    },
    narration: {
      guest:
        "Benvenuti a Bronson Family Farm. Questo ecosistema collega cibo, apprendimento, lavoro e accesso comunitario.",
      customer:
        "Come cliente, puoi entrare nel mercato, esplorare ricette, imparare la nutrizione e fare scelte alimentari più sane.",
      grower:
        "I coltivatori gestiscono colture, stagioni, inventario e opportunità condivise.",
      youth:
        "I giovani imparano responsabilità, agricoltura, lavoro di squadra, sicurezza e percorsi futuri.",
      supervisor:
        "I supervisori guidano la crescita e sostengono il successo del team.",
    },
    labels: {
      startTour: "Avvia Tour",
      stopTour: "Ferma Tour",
      guidedDemo: "Demo Guidata",
      chooseLanguage: "Lingua",
      weather: "Meteo Attuale",
      enterMarketplace: "Entra nel Mercato",
      overview: "Panoramica",
      marketplace: "Mercato",
      recipes: "Ricette",
      nutrition: "Nutrizione",
      history: "Storico",
      nutritionCard: "Educazione Alimentare e Nutrizionale",
      recipeCard: "Idee Ricette",
      historyCard: "Abitudini di Acquisto Intelligenti",
      marketCard: "Accesso al Mercato Fresco",
      freshVsProcessed: "Fresco vs. Processato",
      diabetesTips: "Guida per il Diabete",
      familyNutrition: "Supporto Nutrizionale Familiare",
    },
    customerIntro:
      "I clienti devono poter acquistare, imparare e tornare con fiducia. Il sistema deve sostenere abitudini alimentari migliori.",
    marketplaceItems: [
      { name: "Cavolo verde", benefit: "Ricco di fibre e utile per il cuore." },
      { name: "Pomodori", benefit: "Ricchi di vitamina C e antiossidanti." },
      { name: "Spinaci", benefit: "Supportano ferro e salute del cervello." },
      { name: "Peperoni", benefit: "Aiutano il sistema immunitario." },
      { name: "Cavolo", benefit: "Versatile, economico e nutriente." },
      { name: "Coriandolo", benefit: "Dà freschezza ai pasti leggeri." },
    ],
    recipes: [
      {
        title: "Ciotola di Verdure Fresche",
        desc: "Cavolo verde, cavolo, peperoni e condimento leggero.",
      },
      {
        title: "Insalata di Pomodoro ed Erbe",
        desc: "Pomodori, coriandolo, olio d'oliva e un po' di aceto.",
      },
      {
        title: "Verdure Saltate",
        desc: "Spinaci e cavolo verde con cipolle e peperoni.",
      },
    ],
    nutrition: [
      "I cibi freschi hanno spesso più nutrienti naturali e meno zuccheri, sodio e conservanti aggiunti.",
      "Pasti equilibrati con verdure e ingredienti interi sostengono energia e salute a lungo termine.",
      "La piattaforma aiuta i clienti a fare scelte pratiche per acquistare e cucinare meglio.",
    ],
    history: [
      "Tieni traccia degli articoli preferiti e degli acquisti ripetuti.",
      "Osserva quali cibi freschi la famiglia compra più spesso.",
      "Collega gli acquisti passati alle ricette e alla pianificazione dei pasti.",
    ],
  },
  he: {
    name: "Hebrew",
    voice: "he-IL",
    roleTitle: {
      guest: "אורח",
      customer: "לקוח",
      grower: "מגדל",
      youth: "נוער",
      supervisor: "מפקח",
    },
    narration: {
      guest:
        "ברוכים הבאים לחוות ברונסון. המערכת הזו מחברת בין מזון, למידה, פיתוח עבודה וגישה קהילתית.",
      customer:
        "כלקוח, אפשר להיכנס לשוק, לחקור מתכונים, ללמוד על תזונה ולקבל החלטות בריאות יותר.",
      grower:
        "המגדלים מנהלים יבולים, עונות, מלאי והזדמנויות משותפות.",
      youth:
        "הנוער לומד אחריות, חקלאות, עבודת צוות, בטיחות ונתיבי קריירה עתידיים.",
      supervisor:
        "המפקחים תומכים בצמיחה, בלמידה ובהצלחת הצוות.",
    },
    labels: {
      startTour: "התחל סיור",
      stopTour: "עצור סיור",
      guidedDemo: "הדגמה מודרכת",
      chooseLanguage: "שפה",
      weather: "מזג אוויר נוכחי",
      enterMarketplace: "כניסה לשוק",
      overview: "סקירה",
      marketplace: "שוק",
      recipes: "מתכונים",
      nutrition: "תזונה",
      history: "היסטוריה",
      nutritionCard: "חינוך למזון ותזונה",
      recipeCard: "רעיונות למתכונים",
      historyCard: "הרגלי קנייה חכמים",
      marketCard: "גישה לשוק הטרי",
      freshVsProcessed: "טרי מול מעובד",
      diabetesTips: "הכוונה לסוכרת",
      familyNutrition: "תמיכה תזונתית למשפחה",
    },
    customerIntro:
      "הלקוחות צריכים להיות מסוגלים לקנות, ללמוד ולחזור בביטחון. המערכת צריכה לתמוך בהרגלי אכילה טובים יותר.",
    marketplaceItems: [
      { name: "קולארד", benefit: "עשיר בסיבים ותומך בבריאות הלב." },
      { name: "עגבניות", benefit: "עשירות בוויטמין C ונוגדי חמצון." },
      { name: "תרד", benefit: "תומך בברזל ובבריאות המוח." },
      { name: "פלפלים", benefit: "תומכים במערכת החיסון." },
      { name: "כרוב", benefit: "מזין, נגיש ורב-שימושי." },
      { name: "כוסברה", benefit: "מוסיפה טעם רענן לארוחות קלות." },
    ],
    recipes: [
      {
        title: "קערת ירקות טריים",
        desc: "קולארד, כרוב, פלפלים ותיבול קל.",
      },
      {
        title: "סלט עגבניות ועשבי תיבול",
        desc: "עגבניות, כוסברה, שמן זית וקצת חומץ.",
      },
      {
        title: "עלי ירק מוקפצים",
        desc: "תרד וקולארד עם בצל ופלפלים.",
      },
    ],
    nutrition: [
      "מזון טרי מכיל בדרך כלל יותר רכיבים טבעיים ופחות סוכר, נתרן וחומרים משמרים.",
      "ארוחות מאוזנות עם ירקות ורכיבים מלאים תומכות באנרגיה ובבריאות לטווח ארוך.",
      "הפלטפורמה עוזרת ללקוחות ללמוד איך לקנות, לבשל ולאכול טוב יותר.",
    ],
    history: [
      "מעקב אחרי מוצרים אהובים ורכישות חוזרות.",
      "לזהות אילו מזונות טריים הבית קונה בתדירות גבוהה.",
      "לחבר רכישות קודמות להצעות למתכונים ולתכנון ארוחות.",
    ],
  },
  patwa: {
    name: "Patwa",
    voice: "en-JM",
    roleTitle: {
      guest: "Guest",
      customer: "Customer",
      grower: "Grower",
      youth: "Youth",
      supervisor: "Supervisor",
    },
    narration: {
      guest:
        "Welcome to Bronson Family Farm. Dis ecosystem tie food, learning, work development, and community access together.",
      customer:
        "As a customer, yuh can go a di marketplace, check recipe ideas, learn bout nutrition, and make better food choice fi yuhself and yuh family.",
      grower:
        "Grower dem manage crop, season, inventory, and shared production opportunity.",
      youth:
        "Di youth learn responsibility, farming, teamwork, safety, and future career pathway.",
      supervisor:
        "Supervisor guide growth, support learning, and help di workforce do well.",
    },
    labels: {
      startTour: "Start Guided Tour",
      stopTour: "Stop Tour",
      guidedDemo: "Guided Demo",
      chooseLanguage: "Language",
      weather: "Weather Right Now",
      enterMarketplace: "Go A Di Marketplace",
      overview: "Overview",
      marketplace: "Marketplace",
      recipes: "Recipe Dem",
      nutrition: "Nutrition",
      history: "Wah Yuh Buy",
      nutritionCard: "Food An Nutrition Learning",
      recipeCard: "Recipe Idea Dem",
      historyCard: "Smart Buying Habit",
      marketCard: "Fresh Food Access",
      freshVsProcessed: "Fresh vs Processed",
      diabetesTips: "Diabetes-Friendly Guidance",
      familyNutrition: "Family Nutrition Support",
    },
    customerIntro:
      "Customer fi be able fi shop, learn, and come back wid confidence. Di system fi support better eating habit over time.",
    marketplaceItems: [
      { name: "Collards", benefit: "Full a fiber and good fi heart health." },
      { name: "Tomatoes", benefit: "Rich in vitamin C and antioxidant support." },
      { name: "Spinach", benefit: "Help wid iron and brain health." },
      { name: "Peppers", benefit: "Support di immune system." },
      { name: "Cabbage", benefit: "Affordable, flexible, and nutritious." },
      { name: "Cilantro", benefit: "Fresh flavor fi lighter meal." },
    ],
    recipes: [
      {
        title: "Fresh Greens Bowl",
        desc: "Collards, cabbage, peppers, and light seasoning.",
      },
      {
        title: "Tomato Herb Salad",
        desc: "Tomatoes, cilantro, olive oil, and likkle vinegar.",
      },
      {
        title: "Sautéed Greens Plate",
        desc: "Spinach and collards wid onion and peppers.",
      },
    ],
    nutrition: [
      "Fresh food usually have more natural nutrient and less added sugar, sodium, and preservative than heavy processed food.",
      "Balanced meal wid vegetable and whole ingredient can help energy and long-term health.",
      "Di platform help customer learn practical way fi shop, cook, and eat better.",
    ],
    history: [
      "Track favorite item and repeat purchase.",
      "See which fresh food yuh household buy most often.",
      "Link past purchase to recipe suggestion and healthier meal planning.",
    ],
  },
} as const

function App() {
  const [role, setRole] = useState<Role>("guest")
  const [lang, setLang] = useState<LangKey>("en")
  const [view, setView] = useState<ViewKey>("overview")
  const [autoTour, setAutoTour] = useState(false)
  const [weather, setWeather] = useState("Loading weather...")

  const current = useMemo(() => languages[lang], [lang])

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeather("Weather unavailable")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`
          )
          const data = await res.json()
          if (data?.current_weather?.temperature !== undefined) {
            setWeather(`${data.current_weather.temperature}°`)
          } else {
            setWeather("Weather unavailable")
          }
        } catch {
          setWeather("Weather unavailable")
        }
      },
      () => setWeather("Weather unavailable")
    )
  }, [])

  useEffect(() => {
    const synth = window.speechSynthesis
    const text = current.narration[role]
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = current.voice

    const voices = synth.getVoices()
    const matchedVoice = voices.find((v) => v.lang.toLowerCase() === current.voice.toLowerCase())
    if (matchedVoice) utterance.voice = matchedVoice

    synth.cancel()
    synth.speak(utterance)

    return () => synth.cancel()
  }, [current, role])

  useEffect(() => {
    if (role !== "customer") {
      setView("overview")
    }
  }, [role])

  useEffect(() => {
    if (!autoTour) return

    const flow: Role[] = ["guest", "customer", "grower", "youth", "supervisor"]
    let index = flow.indexOf(role)

    const timer = setInterval(() => {
      index = (index + 1) % flow.length
      setRole(flow[index])
    }, 6000)

    return () => clearInterval(timer)
  }, [autoTour, role])

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <img
        src={images[role]}
        alt={role}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/75" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide md:text-3xl">
              Bronson Family Farm
            </h1>
            <p className="mt-1 text-sm text-white/85">
              {current.labels.guidedDemo}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm text-white/90">{current.labels.chooseLanguage}</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LangKey)}
              className="rounded-md bg-white px-3 py-2 text-sm text-black"
            >
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setAutoTour((prev) => !prev)}
              className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium transition hover:bg-green-500"
            >
              {autoTour ? current.labels.stopTour : current.labels.startTour}
            </button>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-between px-4 pb-8 pt-2 md:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <section className="max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/85">
                    {current.roleTitle[role]}
                  </div>
                  <h2 className="text-3xl font-light md:text-5xl">
                    {current.roleTitle[role]}
                  </h2>
                </div>

                <div className="text-sm text-white/85">
                  🌤 {current.labels.weather}: {weather}
                </div>
              </div>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/95 md:text-lg">
                {current.narration[role]}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      role === r
                        ? "bg-green-600 text-white"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {current.roleTitle[r]}
                  </button>
                ))}
              </div>
            </section>

            {role === "customer" && (
              <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setView("overview")}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        view === "overview" ? "bg-yellow-400 text-black" : "bg-white/15 hover:bg-white/25"
                      }`}
                    >
                      {current.labels.overview}
                    </button>
                    <button
                      onClick={() => setView("marketplace")}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        view === "marketplace" ? "bg-yellow-400 text-black" : "bg-white/15 hover:bg-white/25"
                      }`}
                    >
                      {current.labels.marketplace}
                    </button>
                    <button
                      onClick={() => setView("recipes")}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        view === "recipes" ? "bg-yellow-400 text-black" : "bg-white/15 hover:bg-white/25"
                      }`}
                    >
                      {current.labels.recipes}
                    </button>
                    <button
                      onClick={() => setView("nutrition")}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        view === "nutrition" ? "bg-yellow-400 text-black" : "bg-white/15 hover:bg-white/25"
                      }`}
                    >
                      {current.labels.nutrition}
                    </button>
                    <button
                      onClick={() => setView("history")}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        view === "history" ? "bg-yellow-400 text-black" : "bg-white/15 hover:bg-white/25"
                      }`}
                    >
                      {current.labels.history}
                    </button>
                  </div>

                  <div className="mt-6">
                    {view === "overview" && (
                      <div>
                        <button className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:scale-[1.01]">
                          {current.labels.enterMarketplace}
                        </button>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-white/95">
                          {current.customerIntro}
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                          <div className="rounded-2xl bg-white/12 p-5">
                            <h3 className="text-lg font-medium">{current.labels.marketCard}</h3>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                              Direct access to fresh produce, herbs, and seasonal foods in a customer-friendly marketplace experience.
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white/12 p-5">
                            <h3 className="text-lg font-medium">{current.labels.recipeCard}</h3>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                              Recipes connected to real produce help customers know what to do with what they buy.
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white/12 p-5">
                            <h3 className="text-lg font-medium">{current.labels.nutritionCard}</h3>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                              Food and nutrition education helps users understand fresh foods, meal balance, and practical healthy choices.
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white/12 p-5">
                            <h3 className="text-lg font-medium">{current.labels.historyCard}</h3>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                              Buying history can support better habits, repeat ordering, and personalized recommendations over time.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {view === "marketplace" && (
                      <div>
                        <h3 className="text-2xl font-light">{current.labels.marketplace}</h3>
                        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          {current.marketplaceItems.map((item) => (
                            <div key={item.name} className="rounded-2xl bg-white/12 p-5">
                              <h4 className="text-lg font-medium">{item.name}</h4>
                              <p className="mt-2 text-sm leading-6 text-white/90">{item.benefit}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {view === "recipes" && (
                      <div>
                        <h3 className="text-2xl font-light">{current.labels.recipes}</h3>
                        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          {current.recipes.map((recipe) => (
                            <div key={recipe.title} className="rounded-2xl bg-white/12 p-5">
                              <h4 className="text-lg font-medium">{recipe.title}</h4>
                              <p className="mt-2 text-sm leading-6 text-white/90">{recipe.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {view === "nutrition" && (
                      <div>
                        <h3 className="text-2xl font-light">{current.labels.nutrition}</h3>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                          <div className="rounded-2xl bg-white/12 p-5">
                            <h4 className="text-lg font-medium">{current.labels.freshVsProcessed}</h4>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                              {current.nutrition[0]}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white/12 p-5">
                            <h4 className="text-lg font-medium">{current.labels.familyNutrition}</h4>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                              {current.nutrition[1]}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-white/12 p-5">
                            <h4 className="text-lg font-medium">{current.labels.diabetesTips}</h4>
                            <p className="mt-2 text-sm leading-6 text-white/90">
                              {current.nutrition[2]}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {view === "history" && (
                      <div>
                        <h3 className="text-2xl font-light">{current.labels.history}</h3>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                          {current.history.map((point, i) => (
                            <div key={i} className="rounded-2xl bg-white/12 p-5">
                              <p className="text-sm leading-6 text-white/90">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                  <h3 className="text-2xl font-light">{current.labels.nutritionCard}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/95">
                    Customers should not only be able to buy food. They should be able to understand it, use it, and improve their health through it.
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl bg-white/12 p-4">
                      <p className="text-sm leading-6 text-white/90">
                        Fresh vegetables support fiber, hydration, micronutrients, and better meal balance.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/12 p-4">
                      <p className="text-sm leading-6 text-white/90">
                        Recipe support helps reduce waste and gives customers practical next steps after purchase.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/12 p-4">
                      <p className="text-sm leading-6 text-white/90">
                        Buying history can later connect to reminders, favorite items, and healthy meal suggestions.
                      </p>
                    </div>
                  </div>
                </aside>
              </section>
            )}

            {role !== "customer" && (
              <section className="max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                <p className="text-base leading-7 text-white/95">
                  {current.narration[role]}
                </p>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
