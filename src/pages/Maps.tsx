import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFavorites } from "@/hooks/useFavorites";
import {
  MapPin, Star, Search, Heart, Navigation, Layers, LocateFixed,
  Utensils, Landmark, Hotel, TreePalm, ShoppingBag, Droplets, Mountain,
  Coffee
} from "lucide-react";

const categoryConfig = [
  { key: "All", icon: MapPin, color: "text-foreground" },
  { key: "Restaurants", icon: Utensils, color: "text-primary" },
  { key: "Cafés", icon: Coffee, color: "text-accent" },
  { key: "Museums", icon: Landmark, color: "text-secondary" },
  { key: "Riads", icon: Hotel, color: "text-primary" },
  { key: "Gardens", icon: TreePalm, color: "text-secondary" },
  { key: "Shopping", icon: ShoppingBag, color: "text-accent" },
  { key: "Hammams", icon: Droplets, color: "text-secondary" },
  { key: "Day Trips", icon: Mountain, color: "text-muted-foreground" },
];

interface POI {
  id: string;
  name: string;
  category: string;
  area: string;
  rating: number;
  lat: number;
  lng: number;
  description: string;
}

const pois: POI[] = [
  { id: "bahia", name: "Bahia Palace", category: "Museums", area: "Medina", rating: 4.8, lat: 31.6217, lng: -7.9832, description: "19th-century palace with stunning Moroccan architecture." },
  { id: "majorelle", name: "Jardin Majorelle", category: "Gardens", area: "Gueliz", rating: 4.7, lat: 31.6415, lng: -8.0032, description: "Electric-blue botanical garden created by Jacques Majorelle." },
  { id: "ysl", name: "Musée Yves Saint Laurent", category: "Museums", area: "Gueliz", rating: 4.7, lat: 31.6418, lng: -8.0030, description: "Terracotta museum dedicated to YSL's Marrakech love affair." },
  { id: "nomad", name: "Nomad", category: "Restaurants", area: "Medina", rating: 4.7, lat: 31.6290, lng: -7.9870, description: "Modern Moroccan cuisine with rooftop views over the souks." },
  { id: "cafe-epices", name: "Café des Épices", category: "Cafés", area: "Medina", rating: 4.5, lat: 31.6310, lng: -7.9860, description: "Iconic café perfect for people-watching with fresh juices." },
  { id: "souk-semmarine", name: "Souk Semmarine", category: "Shopping", area: "Medina", rating: 4.4, lat: 31.6320, lng: -7.9880, description: "The main souk artery — textiles, ceramics, leather." },
  { id: "heritage-spa", name: "Heritage Spa", category: "Hammams", area: "Medina", rating: 4.8, lat: 31.6280, lng: -7.9850, description: "Luxurious traditional hammam with marble interiors." },
  { id: "le-jardin", name: "Le Jardin", category: "Restaurants", area: "Medina", rating: 4.6, lat: 31.6305, lng: -7.9855, description: "Hidden garden restaurant serving contemporary Moroccan dishes." },
  { id: "secret", name: "Le Jardin Secret", category: "Gardens", area: "Medina", rating: 4.5, lat: 31.6330, lng: -7.9870, description: "Hidden Islamic garden with a tower offering panoramic views." },
  { id: "ben-youssef", name: "Ben Youssef Madrasa", category: "Museums", area: "Medina", rating: 4.8, lat: 31.6340, lng: -7.9850, description: "Largest Islamic college in Morocco with carved stucco and cedar." },
  { id: "riad-yasmine", name: "Riad Yasmine", category: "Riads", area: "Medina", rating: 4.9, lat: 31.6300, lng: -7.9840, description: "Instagram-famous riad with turquoise plunge pool." },
  { id: "atlas", name: "Atlas Mountains", category: "Day Trips", area: "Outside", rating: 4.8, lat: 31.0600, lng: -7.9100, description: "Berber villages, waterfalls, and breathtaking mountain views." },
  { id: "bacha", name: "BACHA Coffee", category: "Cafés", area: "Medina", rating: 4.7, lat: 31.6318, lng: -7.9845, description: "Luxurious coffee house in a restored palace." },
  { id: "el-fenn", name: "El Fenn", category: "Riads", area: "Medina", rating: 4.8, lat: 31.6295, lng: -7.9862, description: "Boutique luxury riad with rooftop pool and art collection." },
];

const Maps = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [mapStyle, setMapStyle] = useState<"streets" | "satellite">("streets");
  const { toggle, isFavorite } = useFavorites("map-favorites");

  const filtered = useMemo(() => {
    let result = pois;
    if (activeCategory !== "All") result = result.filter(p => p.category === activeCategory);
    if (search) {
      const q = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      result = result.filter(p =>
        p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search]);

  const getCategoryColor = (cat: string) => {
    const cfg = categoryConfig.find(c => c.key === cat);
    return cfg?.color || "text-muted-foreground";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Map placeholder */}
      <div className="relative flex-1 min-h-[45vh] bg-muted overflow-hidden">
        {/* Stylized placeholder map */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            mapStyle === "streets"
              ? "bg-gradient-to-br from-muted via-card to-muted"
              : "bg-gradient-to-br from-secondary/20 via-muted to-secondary/10"
          }`}
        >
          {/* Decorative grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* POI dots */}
          {filtered.map((poi, i) => {
            const x = ((poi.lng + 8.01) / 0.06) * 100;
            const y = ((31.65 - poi.lat) / 0.04) * 100;
            const clampX = Math.max(8, Math.min(92, x));
            const clampY = Math.max(8, Math.min(92, y));
            return (
              <motion.button
                key={poi.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 300 }}
                onClick={() => setSelectedPoi(poi)}
                className={`absolute z-10 flex items-center justify-center w-8 h-8 -ml-4 -mt-4 rounded-full bg-background shadow-card border border-border min-w-[44px] min-h-[44px] ${getCategoryColor(poi.category)}`}
                style={{ left: `${clampX}%`, top: `${clampY}%` }}
                title={poi.name}
              >
                {(() => {
                  const cfg = categoryConfig.find(c => c.key === poi.category);
                  const Icon = cfg?.icon || MapPin;
                  return <Icon className="w-3.5 h-3.5" />;
                })()}
              </motion.button>
            );
          })}

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <p className="text-xs text-muted-foreground/40 font-medium tracking-wider uppercase">
              {mapStyle === "streets" ? "Map · Connect Mapbox to activate" : "Satellite · Connect Mapbox to activate"}
            </p>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <button
            onClick={() => setMapStyle(s => s === "streets" ? "satellite" : "streets")}
            className="w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm shadow-card flex items-center justify-center border border-border min-w-[44px] min-h-[44px]"
            title="Toggle layer"
          >
            <Layers className="w-4 h-4 text-foreground" />
          </button>
          <button
            className="w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm shadow-card flex items-center justify-center border border-border min-w-[44px] min-h-[44px]"
            title="My location"
          >
            <LocateFixed className="w-4 h-4 text-foreground" />
          </button>
          <button
            className="w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm shadow-card flex items-center justify-center border border-border min-w-[44px] min-h-[44px]"
            title="Recenter"
          >
            <Navigation className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Selected POI card */}
        {selectedPoi && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-3 left-3 right-3 z-20 bg-background/95 backdrop-blur-xl rounded-xl p-4 shadow-warm border border-border"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-display text-sm font-semibold text-foreground">{selectedPoi.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />{selectedPoi.area}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Star className="w-3 h-3 fill-primary" />{selectedPoi.rating}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{selectedPoi.description}</p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => toggle(selectedPoi.id)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(selectedPoi.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                </button>
                <button
                  onClick={() => setSelectedPoi(null)}
                  className="p-2 text-xs text-muted-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom panel: search + filters + POI list */}
      <div className="bg-background border-t border-border flex flex-col max-h-[45vh] overflow-hidden">
        {/* Search */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('explore.search')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card text-foreground text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="px-4 pb-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 w-max">
            {categoryConfig.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setActiveCategory(key); setSelectedPoi(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all min-h-[36px] ${
                  activeCategory === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground"
                }`}
              >
                <Icon className="w-3 h-3" />
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable POI list */}
        <div className="flex-1 overflow-y-auto px-4 pb-2">
          <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">{filtered.length} places</p>
          <div className="space-y-2">
            {filtered.map(poi => (
              <button
                key={poi.id}
                onClick={() => setSelectedPoi(poi)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all min-h-[44px] ${
                  selectedPoi?.id === poi.id ? "bg-primary/10 border border-primary/20" : "bg-card"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-muted ${getCategoryColor(poi.category)}`}>
                  {(() => {
                    const cfg = categoryConfig.find(c => c.key === poi.category);
                    const Icon = cfg?.icon || MapPin;
                    return <Icon className="w-4 h-4" />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{poi.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{poi.area}</span>
                    <span className="flex items-center gap-0.5 text-[10px] text-primary">
                      <Star className="w-2.5 h-2.5 fill-primary" />{poi.rating}
                    </span>
                  </div>
                </div>
                <Heart
                  className={`w-4 h-4 shrink-0 ${isFavorite(poi.id) ? "fill-destructive text-destructive" : "text-muted-foreground/30"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
