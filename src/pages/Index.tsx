import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Heart,
  Map,
  Lightbulb,
  Star,
  Plane,
  Settings,
  Clock,
  Sun,
  ChevronDown,
  Bookmark,
  Phone,
  CreditCard,
  BookOpen,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { WeatherWidget } from "@/components/WeatherWidget";
import { useFavorites } from "@/hooks/useFavorites";
import {
  quickLinks,
  highlights,
  durations,
  itineraryData,
  arrivalChecklist,
  essentialPhrases,
  arrivalToolLinks,
  uiStrings,
  getImage,
} from "@/data";

const iconMap = {
  Calendar,
  Heart,
  Map,
  Lightbulb,
  Sun,
  Clock,
  Plane,
} as const;

const arrivalIconMap = {
  CreditCard,
  Phone,
  BookOpen,
} as const;

const Index = () => {
  const { t } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showArrival, setShowArrival] = useState(false);
  const { toggle, isFavorite } = useFavorites("itinerary-favorites");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={getImage("hero")}
          alt={uiStrings.heroAltText}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 px-4 pt-14 flex justify-between items-start z-10">
          <WeatherWidget />
          <Link
            to="/settings"
            className="p-2 rounded-full bg-foreground/20 backdrop-blur-md min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Settings className="w-4 h-4 text-sand-light" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-6 pb-12"
        >
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-white text-xs font-semibold tracking-wide uppercase">
              {t("home.tagline")}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white leading-tight">
            {t("home.title")}
          </h1>
          <p className="text-white mt-2 text-sm max-w-xs font-medium">{t("home.subtitle")}</p>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl p-4 shadow-warm">
          <div className="grid grid-cols-4 gap-3">
            {quickLinks.map(({ iconName, label, to, color }, i) => {
              const Icon = iconMap[iconName as keyof typeof iconMap];
              const iconColor = iconName === "Map" 
                ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300" 
                : color;
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <Link to={to} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Plan Your Trip */}
      <div className="px-5 mt-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          {t("home.planTrip")}
        </h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
          {durations.map(({ id, iconName, label }) => {
            const Icon = iconMap[iconName as keyof typeof iconMap];
            return (
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
            );
          })}
        </div>

        {selectedDuration && itineraryData[selectedDuration] && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <div className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {itineraryData[selectedDuration].title}
                </h3>
                <button
                  onClick={() => toggle(selectedDuration)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isFavorite(selectedDuration)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>
              <div className="space-y-3">
                {itineraryData[selectedDuration].items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      {i < itineraryData[selectedDuration].items.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-1" />
                      )}
                    </div>
                    <div className="pb-3">
                      <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                        {item.time}
                      </p>
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
            <span className="font-display text-base font-semibold text-foreground">
              {t("home.arrivalMode")}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              showArrival ? "rotate-180" : ""
            }`}
          />
        </button>

        {showArrival && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 space-y-4"
          >
            {/* Airport info */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <h4 className="font-semibold text-sm text-foreground mb-2">
                ✈️ {t("arrival.airport")}
              </h4>
              <p className="text-xs text-muted-foreground mb-3">{t("arrival.airportDesc")}</p>
              <div className="space-y-1.5">
                <p className="text-xs text-foreground/80">🚕 {t("arrival.taxi")}</p>
                <p className="text-xs text-foreground/80">🚌 {t("arrival.bus")}</p>
                <p className="text-xs text-foreground/80">🚗 {t("arrival.private")}</p>
              </div>
            </div>

            {/* First steps checklist */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <h4 className="font-semibold text-sm text-foreground mb-3">
                ✅ {t("arrival.firstSteps")}
              </h4>
              <div className="space-y-2">
                {arrivalChecklist.map((item, i) => (
                  <label key={i} className="flex items-start gap-3 min-h-[44px] items-center">
                    <input type="checkbox" className="mt-0.5 accent-primary w-4 h-4" />
                    <span className="text-xs text-foreground/80">
                      {item.icon} {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Essential phrases */}
            <div className="bg-card rounded-xl p-4 shadow-card">
              <h4 className="font-semibold text-sm text-foreground mb-3">
                🗣️ {t("arrival.phrases")}
              </h4>
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
              {arrivalToolLinks.map(({ iconName, labelKey, to }) => {
                const Icon = arrivalIconMap[iconName];
                return (
                  <Link
                    key={labelKey}
                    to={to}
                    className="bg-card rounded-xl p-3 shadow-card flex flex-col items-center gap-2 min-h-[44px]"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-medium text-foreground text-center">
                      {t(labelKey)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Don't Miss - Horizontal Carousel */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4 px-5">
          {t("home.dontMiss")}
        </h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-5 w-max">
            {highlights.map(({ id, title, desc, imageKey, to }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Link to={to} className="block w-40 group">
                  <div className="w-40 h-48 rounded-xl overflow-hidden mb-2">
                    <img
                      src={getImage(imageKey)}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
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
