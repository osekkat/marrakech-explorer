import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Heart, Map, Lightbulb, Star, Plane, ChevronRight, Settings, Globe, Clock, Sun, ChevronDown, Bookmark, Phone, CreditCard, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import heroImage from "@/assets/hero-marrakech.jpg";
import jemaaImage from "@/assets/jemaa-el-fna.jpg";
import riadImage from "@/assets/riad-courtyard.jpg";
import spiceImage from "@/assets/spice-souk.jpg";
import mintTeaImage from "@/assets/mint-tea.jpg";
import bahiaImage from "@/assets/bahia-palace.jpg";
import { WeatherWidget } from "@/components/WeatherWidget";
import { useFavorites } from "@/hooks/useFavorites";

const quickLinks = [
  { icon: Calendar, label: "Plan Trip", to: "/itineraries", color: "bg-primary/10 text-primary" },
  { icon: Heart, label: "Our Picks", to: "/picks", color: "bg-secondary/10 text-secondary" },
  { icon: Map, label: "Explore", to: "/explore", color: "bg-accent/20 text-accent-foreground" },
  { icon: Lightbulb, label: "Tips", to: "/toolkit", color: "bg-teal/10 text-teal" },
];

const highlights = [
  { id: "jemaa", title: "Jemaa el-Fna", desc: "The beating heart of the Medina", image: jemaaImage, to: "/picks" },
  { id: "riad", title: "Stay in a Riad", desc: "Authentic courtyard guesthouses", image: riadImage, to: "/explore" },
  { id: "souks", title: "The Souks", desc: "Spices, leather, and treasures", image: spiceImage, to: "/explore" },
  { id: "bahia", title: "Bahia Palace", desc: "Masterpiece of Moroccan architecture", image: bahiaImage, to: "/picks" },
  { id: "tea", title: "Mint Tea Ritual", desc: "The Berber whiskey experience", image: mintTeaImage, to: "/picks" },
];

const durations = [
  { id: "1day", icon: Sun, label: "1 Day", subtitle: "Quick highlights" },
  { id: "weekend", icon: Clock, label: "Weekend", subtitle: "2–3 days" },
  { id: "long", icon: Calendar, label: "Long Weekend", subtitle: "4–5 days" },
  { id: "week", icon: Plane, label: "1 Week", subtitle: "Full experience" },
];

const itineraryData: Record<string, { title: string; items: { time: string; place: string; detail: string }[] }> = {
  "1day": {
    title: "Essential Marrakech in 1 Day",
    items: [
      { time: "9:00", place: "Jardin Majorelle", detail: "Start with the iconic blue garden & YSL Museum" },
      { time: "11:00", place: "Café des Épices", detail: "Recharge with fresh juice and rooftop views" },
      { time: "13:00", place: "Bahia Palace", detail: "Marvel at intricate zellige and carved ceilings" },
      { time: "14:30", place: "The Souks", detail: "Navigate the spice, leather, and textile markets" },
      { time: "16:00", place: "Nomad Restaurant", detail: "Modern Moroccan lunch on the rooftop terrace" },
      { time: "18:00", place: "Jemaa el-Fna", detail: "Watch the sunset and evening spectacle unfold" },
    ],
  },
  weekend: {
    title: "Weekend in the Red City",
    items: [
      { time: "Day 1 AM", place: "Medina Exploration", detail: "Bahia Palace, Ben Youssef Madrasa, Souks" },
      { time: "Day 1 PM", place: "Jemaa el-Fna", detail: "Sunset views and rooftop dinner" },
      { time: "Day 2 AM", place: "Jardin Majorelle", detail: "Gardens, YSL Museum, Gueliz modern quarter" },
      { time: "Day 2 PM", place: "Hammam Experience", detail: "Traditional spa and relaxation" },
      { time: "Day 2 Eve", place: "Fine Dining", detail: "Riad restaurant experience" },
    ],
  },
  long: {
    title: "Long Weekend Deep Dive",
    items: [
      { time: "Day 1", place: "Medina Highlights", detail: "Palaces, museums, and souk exploration" },
      { time: "Day 2", place: "Atlas Mountains", detail: "Day trip to Ourika Valley or Imlil" },
      { time: "Day 3", place: "Gueliz & Gardens", detail: "Majorelle, contemporary galleries, boutiques" },
      { time: "Day 4 AM", place: "Cooking Class", detail: "Learn tagine and pastilla preparation" },
      { time: "Day 4 PM", place: "Hammam & Farewell", detail: "Spa, then sunset at a rooftop café" },
    ],
  },
  week: {
    title: "The Complete Experience",
    items: [
      { time: "Day 1–2", place: "Medina Immersion", detail: "All major sights, hidden gems, and street food" },
      { time: "Day 3", place: "Cooking & Culture", detail: "Cooking class + traditional hammam" },
      { time: "Day 4", place: "Essaouira Day Trip", detail: "Coastal town with art, seafood, and surf" },
      { time: "Day 5", place: "Atlas Mountains", detail: "Berber villages and mountain landscapes" },
      { time: "Day 6", place: "Gueliz & Shopping", detail: "Art galleries, vintage stores, nightlife" },
      { time: "Day 7", place: "Relax & Revisit", detail: "Return to favorites, riad pool time" },
    ],
  },
};

const arrivalChecklist = [
  { icon: "💱", text: "Get Moroccan Dirhams (MAD) at airport ATM" },
  { icon: "📱", text: "Buy a local SIM card (Maroc Telecom recommended)" },
  { icon: "🚕", text: "Take a petit taxi — agree on price or use meter" },
  { icon: "💧", text: "Buy bottled water — don't drink tap water" },
  { icon: "🗺️", text: "Download offline maps of Marrakech" },
  { icon: "🏨", text: "Share your riad's location pin with your driver" },
];

const essentialPhrases = [
  { phrase: "Salam alaikum", meaning: "Hello (peace be upon you)" },
  { phrase: "Shukran", meaning: "Thank you" },
  { phrase: "La, shukran", meaning: "No, thank you" },
  { phrase: "B'shhal?", meaning: "How much?" },
  { phrase: "Labas", meaning: "How are you? / I'm fine" },
  { phrase: "Insha'Allah", meaning: "God willing" },
];

const Index = () => {
  const { t, i18n } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showArrival, setShowArrival] = useState(false);
  const { toggle, isFavorite } = useFavorites('itinerary-favorites');

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('app-language', next);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={heroImage} alt="Marrakech at sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
          <WeatherWidget />
          <div className="flex gap-2">
            <button onClick={toggleLang} className="p-2 rounded-full bg-foreground/20 backdrop-blur-md min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Globe className="w-4 h-4 text-sand-light" />
            </button>
            <Link to="/settings" className="p-2 rounded-full bg-foreground/20 backdrop-blur-md min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Settings className="w-4 h-4 text-sand-light" />
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sand text-xs font-medium tracking-wide uppercase">{t('home.tagline')}</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-sand-light leading-tight">{t('home.title')}</h1>
          <p className="text-sand/90 mt-2 text-sm max-w-xs">{t('home.subtitle')}</p>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl p-4 shadow-warm">
          <div className="grid grid-cols-4 gap-3">
            {quickLinks.map(({ icon: Icon, label, to, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}>
                <Link to={to} className="flex flex-col items-center gap-1.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Your Trip */}
      <div className="px-5 mt-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t('home.planTrip')}</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
          {durations.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setSelectedDuration(selectedDuration === id ? null : id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all min-h-[44px] ${
                selectedDuration === id
                  ? "bg-primary text-primary-foreground shadow-warm"
                  : "bg-card text-muted-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {selectedDuration && itineraryData[selectedDuration] && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-base font-semibold text-foreground">{itineraryData[selectedDuration].title}</h3>
                <button onClick={() => toggle(selectedDuration)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Bookmark className={`w-4 h-4 ${isFavorite(selectedDuration) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
              </div>
              <div className="space-y-3">
                {itineraryData[selectedDuration].items.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      {i < itineraryData[selectedDuration].items.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                    </div>
                    <div className="pb-3">
                      <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">{item.time}</p>
                      <p className="text-sm font-semibold text-foreground">{item.place}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Arrival Mode */}
      <div className="px-5 mt-8">
        <button
          onClick={() => setShowArrival(!showArrival)}
          className="w-full flex items-center justify-between bg-secondary/10 rounded-xl p-4 min-h-[44px]"
        >
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 text-secondary" />
            <span className="font-display text-base font-semibold text-foreground">{t('home.arrivalMode')}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showArrival ? "rotate-180" : ""}`} />
        </button>

        {showArrival && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-4">
            {/* Airport info */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <h4 className="font-semibold text-sm text-foreground mb-2">✈️ {t('arrival.airport')}</h4>
              <p className="text-xs text-muted-foreground mb-3">{t('arrival.airportDesc')}</p>
              <div className="space-y-1.5">
                <p className="text-xs text-foreground/80">🚕 {t('arrival.taxi')}</p>
                <p className="text-xs text-foreground/80">🚌 {t('arrival.bus')}</p>
                <p className="text-xs text-foreground/80">🚗 {t('arrival.private')}</p>
              </div>
            </div>

            {/* First steps checklist */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <h4 className="font-semibold text-sm text-foreground mb-3">✅ {t('arrival.firstSteps')}</h4>
              <div className="space-y-2">
                {arrivalChecklist.map((item, i) => (
                  <label key={i} className="flex items-start gap-3 min-h-[44px] items-center">
                    <input type="checkbox" className="mt-0.5 accent-primary w-4 h-4" />
                    <span className="text-xs text-foreground/80">{item.icon} {item.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Essential phrases */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <h4 className="font-semibold text-sm text-foreground mb-3">🗣️ {t('arrival.phrases')}</h4>
              <div className="grid grid-cols-2 gap-2">
                {essentialPhrases.map((p, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-2">
                    <p className="text-xs font-semibold text-primary">{p.phrase}</p>
                    <p className="text-[10px] text-muted-foreground">{p.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick tool links */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: CreditCard, label: t('arrival.currency'), to: "/toolkit" },
                { icon: Phone, label: t('arrival.prayerTimes'), to: "/toolkit" },
                { icon: BookOpen, label: t('arrival.phrases'), to: "/toolkit" },
              ].map(({ icon: Icon, label, to }) => (
                <Link key={label} to={to} className="bg-card rounded-xl p-3 shadow-card flex flex-col items-center gap-2 min-h-[44px]">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-medium text-foreground text-center">{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Don't Miss - Horizontal Carousel */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4 px-5">{t('home.dontMiss')}</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-5 w-max">
            {highlights.map(({ id, title, desc, image, to }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Link to={to} className="block w-40 group">
                  <div className="w-40 h-48 rounded-xl overflow-hidden mb-2">
                    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Index;
