import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useState, useMemo } from "react";
import { MapPin, Star, Clock, DollarSign, Heart, Search, Share2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "@/hooks/useFavorites";
import { places, categories, neighborhoods, uiStrings } from "@/data";
import type { Place, PlaceCategory } from "@/data";

const priceRangeDisplay = (priceRange?: 1 | 2 | 3 | 4): string => {
  if (!priceRange) return "";
  return "$".repeat(priceRange);
};

const categoryLabels: Record<PlaceCategory, string> = {
  restaurant: "Restaurants",
  cafe: "Cafés",
  museum: "Museums",
  gallery: "Galleries",
  riad: "Riads",
  hotel: "Hotels",
  garden: "Gardens",
  courtyard: "Courtyards",
  shopping: "Shopping",
  souk: "Souks",
  hammam: "Hammams",
  spa: "Spas",
  monument: "Monuments",
};

const Explore = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | "all">("all");
  const [activeNeighborhood, setActiveNeighborhood] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const { toggle, isFavorite } = useFavorites("explore-favorites");

  const allNeighborhoods = ["all", ...neighborhoods] as const;
  const allCategories = ["all", ...categories] as const;

  const filtered = useMemo(() => {
    let result = places;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (activeNeighborhood !== "all") {
      result = result.filter((p) => p.neighborhood === activeNeighborhood);
    }
    if (search) {
      const q = search
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      result = result.filter(
        (p) =>
          p.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          (p.searchKeywords?.some((kw) => kw.toLowerCase().includes(q)) ?? false)
      );
    }
    return result;
  }, [activeCategory, activeNeighborhood, search]);

  const isFamilyFriendly = (place: Place) => 
    place.accessibilityTags?.includes("family-friendly") ?? false;

  return (
    <div>
      <PageHeader title={t("explore.title")} subtitle={t("explore.subtitle")} />

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("explore.search")}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card text-foreground text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px]"
          />
        </div>
      </div>

      {/* Neighborhood pills */}
      <div className="px-5 mb-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {allNeighborhoods.map((n) => (
            <button
              key={n}
              onClick={() => setActiveNeighborhood(n)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all min-h-[36px] ${
                activeNeighborhood === n
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {n === "all" ? t("explore.allNeighborhoods") : n}
            </button>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div className="px-5 mb-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as PlaceCategory | "all")}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all min-h-[36px] ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? t("explore.allCategories") : categoryLabels[cat as PlaceCategory] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-5 mb-3">
        <p className="text-xs text-muted-foreground">
          {filtered.length} {uiStrings.placesFound}
        </p>
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
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {place.name}
                  </h3>
                  {isFamilyFriendly(place) && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal/10 text-teal font-medium flex items-center gap-0.5">
                      <Users className="w-2.5 h-2.5" />
                      {uiStrings.familyBadge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {place.neighborhood}
                  </span>
                  {place.priceRange && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="w-3 h-3" />
                      {priceRangeDisplay(place.priceRange)}
                    </span>
                  )}
                  {place.openingHours && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {place.status === "open" ? "Open" : 
                       place.status === "temporarily-closed" ? "Temporarily Closed" :
                       place.status === "seasonal" ? "Seasonal" : "See Hours"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {place.rating && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs font-semibold text-primary">{place.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                {categoryLabels[place.category] ?? place.category}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => toggle(place.id)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(place.id)
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
                <button
                  onClick={() =>
                    navigator.share?.({
                      title: place.name,
                      text: place.description,
                      url: `https://marrakechcompass.app/place/${place.id}`,
                    })
                  }
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
