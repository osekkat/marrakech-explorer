import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Clock, Sun, Calendar, Plane, ChevronRight } from "lucide-react";
import { useState } from "react";

const durations = [
  { id: "1day", icon: Sun, label: "1 Day", subtitle: "Quick highlights" },
  { id: "weekend", icon: Clock, label: "Weekend", subtitle: "2–3 days" },
  { id: "long", icon: Calendar, label: "Long Weekend", subtitle: "4–5 days" },
  { id: "week", icon: Plane, label: "1 Week", subtitle: "Full experience" },
];

const itineraryData: Record<string, { title: string; items: string[] }> = {
  "1day": {
    title: "Essential Marrakech in 1 Day",
    items: [
      "🕘 Morning: Jardin Majorelle & YSL Museum",
      "☕ Coffee at Café des Épices",
      "🕐 Afternoon: Bahia Palace & the Souks",
      "🍽️ Lunch at Nomad (rooftop terrace)",
      "🌅 Evening: Jemaa el-Fna at sunset",
      "🍴 Dinner at a local food stall",
    ],
  },
  weekend: {
    title: "Weekend in the Red City",
    items: [
      "Day 1: Medina exploration — Bahia Palace, Ben Youssef Madrasa, Souks",
      "Day 1 evening: Jemaa el-Fna & rooftop dinner",
      "Day 2: Jardin Majorelle, Gueliz modern quarter",
      "Day 2: Hammam experience in the afternoon",
      "Day 2 evening: Fine dining in a riad restaurant",
    ],
  },
  long: {
    title: "Long Weekend Deep Dive",
    items: [
      "Day 1: Medina highlights — palaces, museums, souks",
      "Day 2: Day trip to Atlas Mountains or Ourika Valley",
      "Day 3: Gueliz, Jardin Majorelle, contemporary galleries",
      "Day 4: Hammam, cooking class, and farewell dinner",
      "Day 4 evening: Last sunset at a rooftop café",
    ],
  },
  week: {
    title: "The Complete Marrakech Experience",
    items: [
      "Day 1–2: Medina immersion — all major sights & hidden gems",
      "Day 3: Cooking class + hammam experience",
      "Day 4: Day trip to Essaouira (coastal town)",
      "Day 5: Atlas Mountains & Berber villages",
      "Day 6: Gueliz, art galleries, vintage shopping",
      "Day 7: Revisit favorites & relaxation at your riad",
    ],
  },
};

const Itineraries = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <PageHeader title="Plan Your Trip" subtitle="Choose your travel style and duration" />

      <div className="px-5 space-y-3">
        {durations.map(({ id, icon: Icon, label, subtitle }, i) => (
          <motion.button
            key={id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelected(selected === id ? null : id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
              selected === id
                ? "bg-primary text-primary-foreground shadow-warm"
                : "bg-card shadow-card hover:shadow-warm"
            }`}
          >
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
              selected === id ? "bg-primary-foreground/20" : "bg-primary/10"
            }`}>
              <Icon className={`w-5 h-5 ${selected === id ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-sm">{label}</p>
              <p className={`text-xs ${selected === id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{subtitle}</p>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${selected === id ? "rotate-90" : ""}`} />
          </motion.button>
        ))}
      </div>

      {/* Itinerary detail */}
      {selected && itineraryData[selected] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-5 mt-6"
        >
          <div className="bg-card rounded-xl p-5 shadow-card">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              {itineraryData[selected].title}
            </h3>
            <div className="space-y-3">
              {itineraryData[selected].items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 items-start"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-foreground/90">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="h-8" />
    </div>
  );
};

export default Itineraries;
