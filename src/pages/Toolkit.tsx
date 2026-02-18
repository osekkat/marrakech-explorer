import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bus, Languages, Thermometer, HandCoins, Smartphone, Shield,
  ChevronDown, Utensils, Droplets, Hotel, Stethoscope, Wallet,
  Baby, Heart, Accessibility, Leaf, Wrench, AlertTriangle
} from "lucide-react";

interface TipSection {
  icon: React.ElementType;
  title: string;
  content: string[];
}

const tips: TipSection[] = [
  {
    icon: Bus, title: "Getting Around",
    content: [
      "🚕 Petit taxis (beige): Metered rides within the city. Insist on the meter or agree a price before.",
      "🐴 Calèche (horse carriage): Fun for sightseeing. Agree on price and route beforehand (~150 MAD for 1hr).",
      "🚌 Bus 19: Connects the airport to Jemaa el-Fna (30 MAD).",
      "🚶 Walking: The medina is best explored on foot. Wear comfortable shoes.",
      "🏍️ Avoid motorcycles in the souks — they won't avoid you!",
      "📱 Use InDrive or Careem apps for fair-priced rides.",
      "🅿️ GPS doesn't work well in the medina — use landmarks and ask locals.",
    ],
  },
  {
    icon: Languages, title: "Language & Phrases",
    content: [
      "🇲🇦 Official languages: Arabic (Darija) & French",
      "👋 Salam alaikum — Hello (peace be upon you)",
      "🙏 Shukran — Thank you",
      "🙅 La, shukran — No, thank you (essential in souks!)",
      "💰 B'shhal? — How much?",
      "😄 Labas — How are you? / I'm fine",
      "🤝 Insha'Allah — God willing (used constantly)",
      "👍 Mezian — Good / Beautiful",
      "🇫🇷 French is widely spoken in tourist areas and Gueliz",
      "🇬🇧 English is common in hotels and tourist restaurants",
    ],
  },
  {
    icon: Shield, title: "Etiquette & Customs",
    content: [
      "👗 Dress modestly, especially in the medina — cover shoulders and knees.",
      "📸 Always ask before photographing people. Some may ask for tips.",
      "🕌 Non-Muslims cannot enter mosques (except Hassan II in Casablanca).",
      "🤲 Use your right hand for greetings and eating.",
      "🍵 Never refuse tea — it's a sign of hospitality.",
      "👟 Remove shoes when entering riads and homes.",
      "🌙 During Ramadan: Don't eat, drink, or smoke in public during daylight hours.",
      "🤝 Greetings are important — take time for pleasantries before business.",
    ],
  },
  {
    icon: Thermometer, title: "Climate & Packing",
    content: [
      "☀️ Best time to visit: March–May or September–November.",
      "🌡️ Summer (Jun–Aug): Very hot, 38–45°C. Avoid midday sun.",
      "❄️ Winter (Dec–Feb): Mild days (18°C), cold nights. Bring layers.",
      "🌧️ Rain is rare but possible Nov–March.",
      "💡 Spring is magical — roses bloom, perfect temperatures.",
      "🧴 Pack: Sunscreen, hat, comfortable walking shoes, modest clothing.",
      "🧣 Bring a scarf — useful for sun protection and mosque visits.",
    ],
  },
  {
    icon: HandCoins, title: "Bargaining Guide",
    content: [
      "💡 Rule of thumb: Start at 30–40% of the asking price.",
      "😊 Keep it friendly — bargaining is a social ritual, not a fight.",
      "🚶 Walking away is your most powerful tool.",
      "🏪 Visit government-run 'Ensemble Artisanal' first to learn fair prices.",
      "💰 Carry small bills — sellers may claim they have no change.",
      "🎯 Don't bargain if you're not interested in buying.",
      "📱 Fair prices: Leather bag 200-400 MAD, babouche slippers 80-150 MAD, scarf 50-100 MAD.",
    ],
  },
  {
    icon: Smartphone, title: "SIM Cards & WiFi",
    content: [
      "📱 Buy a SIM at the airport (Maroc Telecom, Inwi, or Orange).",
      "💰 ~30–50 MAD for a SIM with data (5–10GB).",
      "🆔 You'll need your passport to register the SIM.",
      "📶 WiFi is available in most riads, cafés, and restaurants.",
      "💡 Maroc Telecom has the best coverage overall.",
      "🔄 Top up at any tabac/newspaper kiosk.",
    ],
  },
  {
    icon: Utensils, title: "Food, Drink & Nightlife",
    content: [
      "🥘 Must-try: Tagine, couscous (Friday tradition), pastilla, tanjia.",
      "🧃 Fresh orange juice in Jemaa el-Fna — 4 MAD per glass!",
      "💧 Don't drink tap water — stick to bottled.",
      "🍵 Mint tea is served sweet. Ask for 'bla sukkar' (no sugar).",
      "🌮 Street food is safe at busy stalls — follow the locals.",
      "🍷 Alcohol is available in licensed restaurants, hotels, and some bars in Gueliz.",
      "🎵 Nightlife centers around Gueliz and Hivernage — Theatro, Comptoir Darna, 555.",
      "☕ Café culture is huge — men's cafés and modern mixed cafés coexist.",
    ],
  },
  {
    icon: Droplets, title: "Hammam Guide",
    content: [
      "🛁 Public hammams: 10–20 MAD. Bring your own soap and towel.",
      "💆 Tourist hammams: 150–500 MAD. Everything provided, more comfortable.",
      "👙 Public: Men wear shorts, women wear underwear.",
      "🧴 'Savon beldi' (black soap) and 'kessa' (exfoliating glove) are essentials.",
      "⏰ Go in the morning for a quieter experience.",
      "🌟 Top picks: Heritage Spa, Hammam Mouassine, Les Bains de Marrakech.",
    ],
  },
  {
    icon: Hotel, title: "Accommodation",
    content: [
      "🏡 Riads: Traditional courtyard houses — the quintessential Marrakech stay.",
      "🏨 Hotels: International chains in Gueliz/Hivernage, boutique in Medina.",
      "📍 Stay in the Medina for atmosphere, Gueliz for modern comforts.",
      "🔑 Book directly with riads for better rates and personal touches.",
      "📌 Get your riad's GPS pin — taxis need exact locations in the medina.",
      "💰 Budget: 300-600 MAD/night. Mid-range: 800-1500 MAD. Luxury: 2000+ MAD.",
    ],
  },
  {
    icon: Stethoscope, title: "Health & Safe Travels",
    content: [
      "💉 No mandatory vaccinations, but Hep A and Typhoid recommended.",
      "💊 Pharmacies are plentiful and well-stocked (look for green cross).",
      "🏥 Clinique Internationale: Best private hospital for tourists.",
      "🚨 Tourist Police: +212 524 384 601",
      "⚠️ Be alert in crowded areas — pickpocketing occurs.",
      "🐒 Don't touch animals (monkeys, snakes) offered for photos.",
      "🌡️ Carry hand sanitizer and sunscreen.",
    ],
  },
  {
    icon: Wallet, title: "Money & Tipping",
    content: [
      "💱 Currency: Moroccan Dirham (MAD). ~1 EUR = 10-11 MAD.",
      "🏧 ATMs widely available. Use ones attached to banks.",
      "💳 Cards accepted in upscale restaurants and hotels. Cash is king in medina.",
      "💵 Bring some EUR/USD for emergency exchange.",
      "🍽️ Restaurant tip: 10-15% or round up.",
      "🧳 Porter/guide tip: 20-50 MAD.",
      "🚕 Taxi: Round up to nearest 5-10 MAD.",
    ],
  },
  {
    icon: Baby, title: "Family Travel",
    content: [
      "👨‍👩‍👧 Moroccans love children — expect lots of friendly attention.",
      "🏊 Riads with pools are a hit with kids. El Fenn and Royal Mansour have great family options.",
      "🎠 Jemaa el-Fna can be overwhelming — visit in the morning for a calmer experience.",
      "🍦 Kids love fresh juices and Moroccan pancakes (msemen).",
      "👶 Strollers are impractical in the medina — bring a baby carrier instead.",
      "🎨 Cooking classes often welcome children 6+.",
    ],
  },
  {
    icon: Heart, title: "LGBTIQ+ Travellers",
    content: [
      "⚖️ Same-sex relations are technically illegal in Morocco (up to 3 years).",
      "🤝 Discretion is advised — avoid public displays of affection.",
      "🏨 Most riads and hotels are welcoming without questions.",
      "🌍 Marrakech is relatively cosmopolitan compared to rural areas.",
      "📱 Exercise caution on dating apps — scams and entrapment have occurred.",
      "🏳️‍🌈 Connect with local LGBTIQ+ networks online before traveling for current advice.",
    ],
  },
  {
    icon: Accessibility, title: "Accessible Travel",
    content: [
      "♿ The medina has narrow, uneven lanes — challenging for wheelchairs.",
      "🏨 Some luxury riads offer ground-floor accessible rooms (Royal Mansour, La Mamounia).",
      "🚕 Petit taxis can accommodate folding wheelchairs.",
      "🏛️ Jardin Majorelle and YSL Museum have some accessibility features.",
      "👁️ Guided tours can be arranged for visually impaired visitors.",
      "📞 Contact your riad in advance to discuss specific needs.",
    ],
  },
  {
    icon: Leaf, title: "Responsible Travel",
    content: [
      "💧 Water is precious — take short showers, reuse towels.",
      "🛍️ Buy directly from artisans when possible, not intermediaries.",
      "🐎 Avoid animal attractions that show signs of cruelty.",
      "🗑️ Carry a reusable water bottle — some riads offer filtered water.",
      "🤝 Choose locally-owned businesses over international chains.",
      "📸 Consider the impact of your photography on local communities.",
    ],
  },
  {
    icon: Wrench, title: "Nuts & Bolts",
    content: [
      "🛂 Visa-free for 90 days for EU, US, UK, Canada, Australia citizens.",
      "🔌 Electricity: 220V, European-style round 2-pin plugs (Type C/E).",
      "⏰ Time zone: UTC+1 (no daylight saving since 2018).",
      "📅 Public holidays: Eid al-Fitr, Eid al-Adha (dates vary), January 1, July 30 (Throne Day).",
      "🕐 Friday is the holy day — some shops close for midday prayers.",
      "📫 Post office (La Poste) on Jemaa el-Fna for stamps and parcels.",
    ],
  },
];

const Toolkit = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHeader title={t('tips.title')} subtitle={t('tips.subtitle')} />

      <div className="px-5 space-y-3">
        {tips.map(({ icon: Icon, title, content }, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full bg-card rounded-xl p-4 shadow-card text-left min-h-[44px]"
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

      {/* Scams section - special styling */}
      <div className="px-5 mt-4">
        <div className="bg-destructive/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-display text-base font-semibold text-foreground">Scams & Incident Response</h3>
          </div>
          <div className="space-y-2 text-sm text-foreground/80">
            <p>🚨 <strong>Lost passport:</strong> Contact your embassy immediately. Tourist Police can help with paperwork.</p>
            <p>🔒 <strong>Theft:</strong> File a report at the nearest police station (commissariat). Get a copy for insurance.</p>
            <p>⚠️ <strong>Common scams:</strong> Fake guides, "closed today" redirections, henna ambushes, carpet shop detours.</p>
            <p>🛡️ <strong>Prevention:</strong> Keep valuables hidden, use inside pockets, be wary of unsolicited help.</p>
            <p>📞 <strong>Tourist Police:</strong> +212 524 384 601</p>
          </div>
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Toolkit;
