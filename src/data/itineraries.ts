import type {
  Duration,
  Itinerary,
  Highlight,
  QuickLink,
  ArrivalChecklistItem,
  EssentialPhrase,
} from "./types";

export const quickLinks: QuickLink[] = [
  {
    iconName: "Calendar",
    label: "Plan Trip",
    to: "/itineraries",
    color: "bg-primary/10 text-primary",
  },
  {
    iconName: "Heart",
    label: "Our Picks",
    to: "/picks",
    color: "bg-secondary/10 text-secondary",
  },
  {
    iconName: "Map",
    label: "Explore",
    to: "/explore",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    iconName: "Lightbulb",
    label: "Tips",
    to: "/toolkit",
    color: "bg-teal/10 text-teal",
  },
];

export const highlights: Highlight[] = [
  {
    id: "jemaa",
    title: "Jemaa el-Fna",
    desc: "The beating heart of the Medina",
    imageKey: "jemaa",
    to: "/picks",
  },
  {
    id: "riad",
    title: "Stay in a Riad",
    desc: "Authentic courtyard guesthouses",
    imageKey: "riad",
    to: "/explore",
  },
  {
    id: "souks",
    title: "The Souks",
    desc: "Spices, leather, and treasures",
    imageKey: "spice",
    to: "/explore",
  },
  {
    id: "bahia",
    title: "Bahia Palace",
    desc: "Masterpiece of Moroccan architecture",
    imageKey: "bahia",
    to: "/picks",
  },
  {
    id: "tea",
    title: "Mint Tea Ritual",
    desc: "The Berber whiskey experience",
    imageKey: "mintTea",
    to: "/picks",
  },
];

export const durations: Duration[] = [
  { id: "1day", iconName: "Sun", label: "1 Day", subtitle: "Quick highlights" },
  { id: "weekend", iconName: "Clock", label: "Weekend", subtitle: "2–3 days" },
  { id: "long", iconName: "Calendar", label: "Long Weekend", subtitle: "4–5 days" },
  { id: "week", iconName: "Plane", label: "1 Week", subtitle: "Full experience" },
];

export const itineraryData: Record<string, Itinerary> = {
  "1day": {
    title: "Essential Marrakech in 1 Day",
    items: [
      {
        time: "9:00",
        place: "Jardin Majorelle",
        detail: "Start with the iconic blue garden & YSL Museum",
      },
      {
        time: "11:00",
        place: "Café des Épices",
        detail: "Recharge with fresh juice and rooftop views",
      },
      {
        time: "13:00",
        place: "Bahia Palace",
        detail: "Marvel at intricate zellige and carved ceilings",
      },
      {
        time: "14:30",
        place: "The Souks",
        detail: "Navigate the spice, leather, and textile markets",
      },
      {
        time: "16:00",
        place: "Nomad Restaurant",
        detail: "Modern Moroccan lunch on the rooftop terrace",
      },
      {
        time: "18:00",
        place: "Jemaa el-Fna",
        detail: "Watch the sunset and evening spectacle unfold",
      },
    ],
  },
  weekend: {
    title: "Weekend in the Red City",
    items: [
      {
        time: "Day 1 AM",
        place: "Medina Exploration",
        detail: "Bahia Palace, Ben Youssef Madrasa, Souks",
      },
      {
        time: "Day 1 PM",
        place: "Jemaa el-Fna",
        detail: "Sunset views and rooftop dinner",
      },
      {
        time: "Day 2 AM",
        place: "Jardin Majorelle",
        detail: "Gardens, YSL Museum, Gueliz modern quarter",
      },
      {
        time: "Day 2 PM",
        place: "Hammam Experience",
        detail: "Traditional spa and relaxation",
      },
      {
        time: "Day 2 Eve",
        place: "Fine Dining",
        detail: "Riad restaurant experience",
      },
    ],
  },
  long: {
    title: "Long Weekend Deep Dive",
    items: [
      {
        time: "Day 1",
        place: "Medina Highlights",
        detail: "Palaces, museums, and souk exploration",
      },
      {
        time: "Day 2",
        place: "Atlas Mountains",
        detail: "Day trip to Ourika Valley or Imlil",
      },
      {
        time: "Day 3",
        place: "Gueliz & Gardens",
        detail: "Majorelle, contemporary galleries, boutiques",
      },
      {
        time: "Day 4 AM",
        place: "Cooking Class",
        detail: "Learn tagine and pastilla preparation",
      },
      {
        time: "Day 4 PM",
        place: "Hammam & Farewell",
        detail: "Spa, then sunset at a rooftop café",
      },
    ],
  },
  week: {
    title: "The Complete Experience",
    items: [
      {
        time: "Day 1–2",
        place: "Medina Immersion",
        detail: "All major sights, hidden gems, and street food",
      },
      {
        time: "Day 3",
        place: "Cooking & Culture",
        detail: "Cooking class + traditional hammam",
      },
      {
        time: "Day 4",
        place: "Essaouira Day Trip",
        detail: "Coastal town with art, seafood, and surf",
      },
      {
        time: "Day 5",
        place: "Atlas Mountains",
        detail: "Berber villages and mountain landscapes",
      },
      {
        time: "Day 6",
        place: "Gueliz & Shopping",
        detail: "Art galleries, vintage stores, nightlife",
      },
      {
        time: "Day 7",
        place: "Relax & Revisit",
        detail: "Return to favorites, riad pool time",
      },
    ],
  },
};

export const arrivalChecklist: ArrivalChecklistItem[] = [
  { icon: "💱", text: "Get Moroccan Dirhams (MAD) at airport ATM" },
  { icon: "📱", text: "Buy a local SIM card (Maroc Telecom recommended)" },
  { icon: "🚕", text: "Take a petit taxi — agree on price or use meter" },
  { icon: "💧", text: "Buy bottled water — don't drink tap water" },
  { icon: "🗺️", text: "Download offline maps of Marrakech" },
  { icon: "🏨", text: "Share your riad's location pin with your driver" },
];

export const essentialPhrases: EssentialPhrase[] = [
  { phrase: "Salam alaikum", meaning: "Hello (peace be upon you)" },
  { phrase: "Shukran", meaning: "Thank you" },
  { phrase: "La, shukran", meaning: "No, thank you" },
  { phrase: "B'shhal?", meaning: "How much?" },
  { phrase: "Labas", meaning: "How are you? / I'm fine" },
  { phrase: "Insha'Allah", meaning: "God willing" },
];
