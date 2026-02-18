import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Heart, Star, ChevronRight, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import bahiaImage from "@/assets/bahia-palace.jpg";
import jemaaImage from "@/assets/jemaa-el-fna.jpg";
import riadImage from "@/assets/riad-courtyard.jpg";
import spiceImage from "@/assets/spice-souk.jpg";
import mintTeaImage from "@/assets/mint-tea.jpg";

interface Pick {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  whyWeLove: string;
  tips: string[];
  image: string;
  rating: number;
  lastVerifiedAt: string;
}

const picks: Pick[] = [
  {
    id: "architecture", category: "🏛️ Architecture", title: "Bahia Palace", subtitle: "Best Architectural Experience",
    whyWeLove: "A breathtaking testament to Moroccan craftsmanship — intricate zellige tile work, carved cedar ceilings, and tranquil courtyards create an atmosphere of timeless beauty. Don't miss the harem quarters with painted wooden ceilings.",
    tips: ["Visit early morning to avoid crowds", "Entry: 70 MAD", "Allow 1–2 hours", "Photography is allowed"],
    image: bahiaImage, rating: 4.8, lastVerifiedAt: "2025-12-01",
  },
  {
    id: "jemaa", category: "🎭 Experience", title: "Sunset at Jemaa el-Fna", subtitle: "Best Djemaa El Fna Experience",
    whyWeLove: "The world's greatest open-air show — as the sun sets, the square transforms into a carnival of storytellers, musicians, snake charmers, henna artists, and the intoxicating aroma of grilled meats from dozens of food stalls.",
    tips: ["Arrive at 5pm for the best sunset spot", "Café de France rooftop for aerial views", "Negotiate prices before photos", "Best on weekend evenings"],
    image: jemaaImage, rating: 4.9, lastVerifiedAt: "2026-01-15",
  },
  {
    id: "shopping", category: "🛍️ Shopping", title: "The Spice Souks", subtitle: "Best Shopping / Souks",
    whyWeLove: "Navigate mountains of saffron, cumin, and ras el hanout in the most photogenic market you'll ever visit. The sensory overload is the experience — let yourself get wonderfully lost in the labyrinth.",
    tips: ["Start at Souk Semmarine (main artery)", "Start at 30-40% of asking price", "Walk away to get the best price", "Visit Ensemble Artisanal first for fair price reference"],
    image: spiceImage, rating: 4.7, lastVerifiedAt: "2026-01-10",
  },
  {
    id: "dining", category: "🍽️ Dining", title: "Nomad Restaurant", subtitle: "Best Dining Experience",
    whyWeLove: "Modern Moroccan cuisine elevated to an art form, served on a stunning rooftop terrace overlooking the medina. The lamb tagine with prunes and almonds is legendary, and their fresh juices are perfection.",
    tips: ["Book ahead for sunset tables", "Try the camel burger at nearby Café Clock too", "Budget $$-$$$ per person", "Open for lunch and dinner"],
    image: riadImage, rating: 4.8, lastVerifiedAt: "2025-11-20",
  },
  {
    id: "stay", category: "🏨 Stay", title: "Traditional Riad Experience", subtitle: "Best Place to Stay",
    whyWeLove: "Sleeping in a riad is quintessential Marrakech — zellige-tiled courtyards, plunge pools, rooftop terraces for breakfast, and intimate hospitality that makes you feel like a treasured guest.",
    tips: ["Book a riad in the Medina for authenticity", "Riad Yasmine and El Fenn are standouts", "Share your riad's GPS pin with taxi drivers", "Most include breakfast"],
    image: riadImage, rating: 4.9, lastVerifiedAt: "2025-12-15",
  },
  {
    id: "hidden", category: "💎 Hidden Gem", title: "Le Jardin Secret", subtitle: "Best Hidden Gem",
    whyWeLove: "Tucked away in the medina, this restored Islamic garden is a pocket of serenity — geometric water channels, exotic plants, and a tower with some of the best panoramic views in the city. Most tourists walk right past it.",
    tips: ["Climb the tower for 360° views", "Combined ticket: 70 MAD", "Visit after lunch when it's quieter", "Beautiful photography spot"],
    image: bahiaImage, rating: 4.6, lastVerifiedAt: "2025-10-01",
  },
  {
    id: "rooftop", category: "🌅 Rooftop", title: "Café des Épices Terrace", subtitle: "Best Rooftop View",
    whyWeLove: "Perched above the spice market, this no-frills rooftop offers the most authentic panoramic view of the medina — minarets, satellite dishes, and Atlas Mountain peaks on clear days. Perfect for a long, lazy juice break.",
    tips: ["Best views from the top terrace", "Fresh orange juice: 20 MAD", "Great for people-watching", "Also try Nomad's rooftop nearby"],
    image: jemaaImage, rating: 4.5, lastVerifiedAt: "2026-02-01",
  },
  {
    id: "art", category: "🎨 Art & Design", title: "Musée Yves Saint Laurent", subtitle: "Best Art & Design",
    whyWeLove: "A stunning terracotta building housing YSL's love letter to Marrakech — rotating fashion exhibitions, a gorgeous garden, and a research library. The architecture alone is worth the visit.",
    tips: ["Combined ticket with Jardin Majorelle", "Allow 2 hours for both", "Small but excellent boutique", "Café in the garden is lovely"],
    image: bahiaImage, rating: 4.7, lastVerifiedAt: "2026-01-20",
  },
  {
    id: "culture", category: "📚 Culture", title: "Moroccan Cooking Class", subtitle: "Best Cultural Experience",
    whyWeLove: "Learn to prepare a proper tagine, couscous, and Moroccan salads from a local chef — shopping for ingredients in the souk is part of the adventure. You'll eat better for the rest of your trip.",
    tips: ["Maison Arabe and Amal Center are top picks", "Half-day classes ~400-600 MAD", "Includes souk shopping tour", "Book at least 2 days ahead"],
    image: mintTeaImage, rating: 4.8, lastVerifiedAt: "2025-11-01",
  },
  {
    id: "museum", category: "🏛️ Museum", title: "Maison de la Photographie", subtitle: "Best Museum Experience",
    whyWeLove: "A treasure trove of vintage Moroccan photography spanning 1870–1960. Intimate and uncrowded, with a wonderful rooftop café serving mint tea with views over the medina rooftops.",
    tips: ["Entry: 50 MAD", "Rooftop café is a hidden gem itself", "Allow 1 hour", "Great rainy day activity"],
    image: riadImage, rating: 4.5, lastVerifiedAt: "2025-09-15",
  },
  {
    id: "gueliz", category: "🏙️ New Town", title: "Gueliz & Hivernage", subtitle: "Best Experience in Gueliz",
    whyWeLove: "Marrakech's modern side — tree-lined boulevards, concept stores, contemporary art galleries, and some of the city's best restaurants. A refreshing counterpoint to the medina's intensity.",
    tips: ["33 Rue Majorelle for curated Moroccan design", "Grand Café de la Poste for colonial-era atmosphere", "Walk Mohammed V avenue for boutiques", "Best nightlife options here"],
    image: spiceImage, rating: 4.4, lastVerifiedAt: "2025-12-20",
  },
  {
    id: "hammam", category: "🛁 Hammam", title: "Traditional Hammam Experience", subtitle: "Best Hammam Experience",
    whyWeLove: "Nothing says Morocco like a proper hammam scrub — the ritual of black soap, eucalyptus steam, and vigorous kessa-glove exfoliation leaves you feeling reborn. An essential cultural experience.",
    tips: ["Public hammam: 10-20 MAD (authentic experience)", "Tourist hammam: 150-500 MAD (more comfortable)", "Heritage Spa and Hammam Mouassine are excellent", "Go in the morning for a quieter visit"],
    image: mintTeaImage, rating: 4.8, lastVerifiedAt: "2026-01-05",
  },
];

const Picks = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toggle, isFavorite } = useFavorites('picks-favorites');

  const isStale = (date: string) => {
    const months = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 30);
    return months > 6;
  };

  const share = (pick: Pick) => {
    if (navigator.share) {
      navigator.share({ title: pick.title, text: `${pick.title} — ${pick.subtitle}`, url: `https://marrakechcompass.app/place/${pick.id}` });
    }
  };

  return (
    <div>
      <PageHeader title={t('picks.title')} subtitle={t('picks.subtitle')} />

      <div className="px-5 space-y-5">
        {picks.map((pick, i) => (
          <motion.div
            key={pick.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-xl overflow-hidden shadow-card"
          >
            <button onClick={() => setExpanded(expanded === pick.id ? null : pick.id)} className="w-full text-left">
              <div className="relative h-48">
                <img src={pick.image} alt={pick.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {pick.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {isStale(pick.lastVerifiedAt) && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/80 text-[10px] font-medium text-accent-foreground">Needs update</span>
                  )}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/40 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span className="text-xs font-medium text-sand-light">{pick.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sand/80 text-[10px] uppercase tracking-wider font-medium">{pick.subtitle}</p>
                  <h3 className="font-display text-lg font-bold text-sand-light">{pick.title}</h3>
                </div>
              </div>
            </button>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2">{pick.whyWeLove}</p>
                <div className="flex gap-1 ml-2">
                  <button onClick={() => toggle(pick.id)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <Heart className={`w-4 h-4 ${isFavorite(pick.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                  </button>
                  <button onClick={() => share(pick)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {expanded === pick.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-border">
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{t('picks.whyWeLove')}</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">{pick.whyWeLove}</p>
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{t('picks.tips')}</h4>
                  <div className="space-y-1.5">
                    {pick.tips.map((tip, j) => (
                      <div key={j} className="flex gap-2 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-foreground/70">{tip}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <button onClick={() => setExpanded(expanded === pick.id ? null : pick.id)} className="flex items-center gap-1 mt-2 text-xs text-primary font-medium min-h-[44px]">
                {expanded === pick.id ? "Show less" : "Read more"}
                <ChevronRight className={`w-3 h-3 transition-transform ${expanded === pick.id ? "rotate-90" : ""}`} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Picks;
