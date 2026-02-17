import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import {
  Bus, Languages, Thermometer, HandCoins, Smartphone, Heart,
  Shield, ChevronDown, Utensils, Droplets
} from "lucide-react";

interface TipSection {
  icon: React.ElementType;
  title: string;
  content: string[];
}

const tips: TipSection[] = [
  {
    icon: Bus,
    title: "Getting Around",
    content: [
      "🚕 Petit taxis (beige): Metered rides within the city. Insist on the meter or agree a price before.",
      "🚌 Bus 19: Connects the airport to Jemaa el-Fna (30 MAD).",
      "🚶 Walking: The medina is best explored on foot. Wear comfortable shoes.",
      "🏍️ Avoid motorcycles in the souks — they won't avoid you!",
      "📱 Use InDrive or Careem apps for fair-priced rides.",
    ],
  },
  {
    icon: Languages,
    title: "Language",
    content: [
      "🇲🇦 Official languages: Arabic (Darija) & French",
      "👋 Salam alaikum — Hello (formal)",
      "🙏 Shukran — Thank you",
      "🙅 La, shukran — No, thank you (very useful in souks!)",
      "💰 B'shhal? — How much?",
      "😄 Labas — How are you? / I'm fine",
      "English is spoken in tourist areas but learning a few words goes far!",
    ],
  },
  {
    icon: Shield,
    title: "Etiquette",
    content: [
      "👗 Dress modestly, especially in the medina — cover shoulders and knees.",
      "📸 Always ask before photographing people.",
      "🕌 Non-Muslims cannot enter mosques (except Hassan II in Casablanca).",
      "🤲 Use your right hand for greetings and eating.",
      "🍵 Never refuse tea — it's a sign of hospitality.",
      "👟 Remove shoes when entering riads and homes.",
    ],
  },
  {
    icon: Thermometer,
    title: "Climate",
    content: [
      "☀️ Best time to visit: March–May or September–November.",
      "🌡️ Summer (Jun–Aug): Very hot, 38–45°C. Avoid midday sun.",
      "❄️ Winter (Dec–Feb): Mild days (18°C), cold nights. Bring layers.",
      "🌧️ Rain is rare but possible Nov–March.",
      "💡 Spring is magical — roses bloom, perfect temperatures.",
    ],
  },
  {
    icon: HandCoins,
    title: "Bargaining",
    content: [
      "💡 Rule of thumb: Start at 30–40% of the asking price.",
      "😊 Keep it friendly — bargaining is a social ritual, not a fight.",
      "🚶 Walking away is your most powerful tool.",
      "🏪 Visit a government-run 'Ensemble Artisanal' first to learn fair prices.",
      "💰 Carry small bills — sellers may claim they have no change.",
      "🎯 Don't bargain if you're not interested in buying.",
    ],
  },
  {
    icon: Smartphone,
    title: "SIM Cards & WiFi",
    content: [
      "📱 Buy a SIM at the airport (Maroc Telecom, Inwi, or Orange).",
      "💰 ~30–50 MAD for a SIM with data (5–10GB).",
      "🆔 You'll need your passport to register the SIM.",
      "📶 WiFi is available in most riads, cafés, and restaurants.",
      "💡 Maroc Telecom has the best coverage overall.",
    ],
  },
  {
    icon: Utensils,
    title: "Food & Drink",
    content: [
      "🥘 Must-try: Tagine, couscous (Friday tradition), pastilla, tanjia.",
      "🧃 Fresh orange juice in Jemaa el-Fna — 4 MAD per glass!",
      "💧 Don't drink tap water — stick to bottled.",
      "🍵 Mint tea is served sweet. Ask for 'bla sukkar' (no sugar) if you prefer.",
      "🌮 Street food is safe at busy stalls — follow the locals.",
    ],
  },
  {
    icon: Droplets,
    title: "Hammam Guide",
    content: [
      "🛁 Public hammams: 10–20 MAD. Bring your own soap and towel.",
      "💆 Tourist hammams: 150–500 MAD. Everything provided, more comfortable.",
      "👙 Public: Men wear shorts, women wear underwear.",
      "🧴 'Savon beldi' (black soap) and 'kessa' (exfoliating glove) are essentials.",
      "⏰ Go in the morning for a quieter experience.",
    ],
  },
];

const Toolkit = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHeader title="Travel Toolkit" subtitle="Essential tips for your Marrakech adventure" />

      <div className="px-5 space-y-3">
        {tips.map(({ icon: Icon, title, content }, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full bg-card rounded-xl p-4 shadow-card text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-display text-base font-semibold text-foreground flex-1">{title}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 space-y-2 pl-[52px]"
                  >
                    {content.map((line, j) => (
                      <p key={j} className="text-sm text-foreground/80 leading-relaxed">{line}</p>
                    ))}
                  </motion.div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Toolkit;
