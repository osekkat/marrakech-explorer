import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useState, useMemo } from "react";
import { MapPin, Star, Clock, DollarSign, Heart, Search, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "@/hooks/useFavorites";

const categories = ["All", "Restaurants", "Cafés", "Museums", "Riads", "Gardens", "Shopping", "Hammams", "Day Trips"];
const neighborhoods = ["All", "Medina", "Gueliz", "Hivernage", "Mellah", "Palmeraie", "Kasbah"];

interface Place {
  id: string;
  name: string;
  category: string;
  area: string;
  price: string;
  rating: number;
  hours?: string;
  description: string;
  familyFriendly?: boolean;
}

const places: Place[] = [
  { id: "nomad", name: "Nomad", category: "Restaurants", area: "Medina", price: "$$", rating: 4.7, description: "Modern Moroccan cuisine with stunning rooftop views over the souks." },
  { id: "le-jardin", name: "Le Jardin", category: "Restaurants", area: "Medina", price: "$$", rating: 4.6, description: "Hidden garden restaurant serving fresh, contemporary Moroccan dishes." },
  { id: "al-fassia", name: "Al Fassia", category: "Restaurants", area: "Gueliz", price: "$$$", rating: 4.8, description: "Women-run institution serving the best traditional Moroccan cuisine in town." },
  { id: "la-mamounia", name: "La Mamounia Restaurant", category: "Restaurants", area: "Hivernage", price: "$$$$", rating: 4.9, description: "Legendary palace hotel restaurant — fine Moroccan dining at its most opulent." },
  { id: "cafe-epices", name: "Café des Épices", category: "Cafés", area: "Medina", price: "$", rating: 4.5, description: "Iconic square-side café perfect for people-watching with fresh juices.", familyFriendly: true },
  { id: "cafe-clock", name: "Café Clock", category: "Cafés", area: "Kasbah", price: "$", rating: 4.6, description: "Cultural hub famous for its camel burger and storytelling nights." },
  { id: "bacha", name: "BACHA Coffee", category: "Cafés", area: "Medina", price: "$$", rating: 4.7, description: "Luxurious coffee house in a restored palace — over 200 coffees to choose from." },
  { id: "grand-cafe", name: "Grand Café de la Poste", category: "Cafés", area: "Gueliz", price: "$$", rating: 4.5, description: "Colonial-era café with art deco interiors and a lovely garden terrace." },
  { id: "bahia", name: "Bahia Palace", category: "Museums", area: "Medina", price: "$", rating: 4.8, hours: "9:00–17:00", description: "19th-century palace showcasing the finest Moroccan architectural artistry.", familyFriendly: true },
  { id: "ysl", name: "Musée Yves Saint Laurent", category: "Museums", area: "Gueliz", price: "$$", rating: 4.7, hours: "10:00–18:00", description: "Striking terracotta museum dedicated to YSL's love affair with Marrakech." },
  { id: "photo", name: "Maison de la Photographie", category: "Museums", area: "Medina", price: "$", rating: 4.5, hours: "9:30–19:00", description: "Fascinating collection of vintage Moroccan photography with rooftop café." },
  { id: "dar-si-said", name: "Dar Si Said Museum", category: "Museums", area: "Medina", price: "$", rating: 4.4, hours: "9:00–17:00", description: "National museum of weaving with stunning woodwork and textile collections." },
  { id: "ben-youssef", name: "Ben Youssef Madrasa", category: "Museums", area: "Medina", price: "$", rating: 4.8, hours: "9:00–18:00", description: "Largest Islamic college in Morocco with breathtaking carved stucco and cedar." },
  { id: "riad-yasmine", name: "Riad Yasmine", category: "Riads", area: "Medina", price: "$$$", rating: 4.9, description: "Instagram-famous riad with a stunning turquoise plunge pool and zellige tiles." },
  { id: "el-fenn", name: "El Fenn", category: "Riads", area: "Medina", price: "$$$$", rating: 4.8, description: "Boutique luxury riad with rooftop pool, art collection, and impeccable design." },
  { id: "la-sultana", name: "La Sultana", category: "Riads", area: "Kasbah", price: "$$$$", rating: 4.9, description: "Five-star riad-hotel with award-winning spa and incredible rooftop views." },
  { id: "majorelle", name: "Jardin Majorelle", category: "Gardens", area: "Gueliz", price: "$$", rating: 4.7, hours: "8:00–18:00", description: "Electric-blue botanical garden created by Jacques Majorelle, restored by YSL.", familyFriendly: true },
  { id: "secret", name: "Le Jardin Secret", category: "Gardens", area: "Medina", price: "$", rating: 4.5, hours: "9:30–18:30", description: "Hidden Islamic garden in the medina with a tower offering panoramic views.", familyFriendly: true },
  { id: "agdal", name: "Agdal Gardens", category: "Gardens", area: "Hivernage", price: "Free", rating: 4.2, description: "Vast royal gardens with olive, orange, and pomegranate orchards. Open Fri & Sun." },
  { id: "souk-semmarine", name: "Souk Semmarine", category: "Shopping", area: "Medina", price: "$–$$$", rating: 4.4, description: "The main souk artery — textiles, ceramics, leather, and everything in between." },
  { id: "33-rue", name: "33 Rue Majorelle", category: "Shopping", area: "Gueliz", price: "$$", rating: 4.6, description: "Curated concept store with contemporary Moroccan design and fashion." },
  { id: "tanneries", name: "Chouara Tanneries", category: "Shopping", area: "Medina", price: "Free", rating: 4.3, description: "Ancient leather tanneries — bring mint to hold under your nose!" },
  { id: "heritage-spa", name: "Heritage Spa", category: "Hammams", area: "Medina", price: "$$$", rating: 4.8, description: "Luxurious traditional hammam with marble interiors and expert therapists." },
  { id: "hammam-mouassine", name: "Hammam Mouassine", category: "Hammams", area: "Medina", price: "$", rating: 4.3, description: "Authentic public hammam — the real local experience." },
  { id: "atlas", name: "Atlas Mountains Day Trip", category: "Day Trips", area: "Outside", price: "$$", rating: 4.8, description: "Visit Berber villages, Ourika Valley waterfalls, and breathtaking mountain views." },
  { id: "essaouira", name: "Essaouira Day Trip", category: "Day Trips", area: "Outside", price: "$$", rating: 4.7, description: "Charming coastal town 3hrs away — art, seafood, Portuguese ramparts, and surf." },
  { id: "ouzoud", name: "Ouzoud Waterfalls", category: "Day Trips", area: "Outside", price: "$$", rating: 4.6, description: "Morocco's most spectacular waterfalls with Barbary macaques and hiking trails.", familyFriendly: true },
];

const Explore = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeNeighborhood, setActiveNeighborhood] = useState("All");
  const [search, setSearch] = useState("");
  const { toggle, isFavorite } = useFavorites('explore-favorites');

  const filtered = useMemo(() => {
    let result = places;
    if (activeCategory !== "All") result = result.filter(p => p.category === activeCategory);
    if (activeNeighborhood !== "All") result = result.filter(p => p.area === activeNeighborhood);
    if (search) {
      const q = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      result = result.filter(p =>
        p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, activeNeighborhood, search]);

  return (
    <div>
      <PageHeader title={t('explore.title')} subtitle={t('explore.subtitle')} />

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('explore.search')}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card text-foreground text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
          />
        </div>
      </div>

      {/* Neighborhood pills */}
      <div className="px-5 mb-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {neighborhoods.map(n => (
            <button
              key={n}
              onClick={() => setActiveNeighborhood(n)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all min-h-[36px] ${
                activeNeighborhood === n
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {n === "All" ? t('explore.allNeighborhoods') : n}
            </button>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div className="px-5 mb-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-5 mb-3">
        <p className="text-xs text-muted-foreground">{filtered.length} places found</p>
      </div>

      {/* Places list */}
      <div className="px-5 space-y-3">
        {filtered.map((place, i) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-card rounded-xl p-4 shadow-card"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground">{place.name}</h3>
                  {place.familyFriendly && <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal/10 text-teal font-medium">👨‍👩‍👧 Family</span>}
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />{place.area}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DollarSign className="w-3 h-3" />{place.price}
                  </span>
                  {place.hours && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />{place.hours}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-xs font-semibold text-primary">{place.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{place.category}</span>
              <div className="flex gap-1">
                <button onClick={() => toggle(place.id)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Heart className={`w-4 h-4 ${isFavorite(place.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                </button>
                <button
                  onClick={() => navigator.share?.({ title: place.name, text: place.description, url: `https://marrakechcompass.app/place/${place.id}` })}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Explore;
