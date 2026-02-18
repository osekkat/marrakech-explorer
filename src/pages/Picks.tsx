import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Heart, Star, ChevronRight, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "@/hooks/useFavorites";
import { picks, getPlaceById } from "@/data";
import { images, type ImageKey } from "@/data/images";
import type { Pick } from "@/data";

const categoryEmoji: Record<string, string> = {
  architecture: "🏛️",
  "djemaa-el-fna": "🎭",
  shopping: "🛍️",
  cuisine: "🍽️",
  stay: "🏨",
  "hidden-gem": "💎",
  "rooftop-view": "🌅",
  "art-design": "🎨",
  cultural: "📚",
  museum: "🏛️",
  "new-town": "🏙️",
  hammam: "🛁",
};

const Picks = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toggle, isFavorite } = useFavorites("picks-favorites");

  const share = (pick: Pick) => {
    if (navigator.share) {
      navigator.share({
        title: pick.title,
        text: `${pick.title} — ${pick.tagline}`,
        url: `https://marrakechcompass.app/place/${pick.id}`,
      });
    }
  };

  const getPlaceInfo = (pick: Pick) => {
    const place = getPlaceById(pick.placeId);
    return {
      rating: place?.rating ?? 0,
      tips: place?.tips ?? [],
    };
  };

  const getImageSrc = (pick: Pick): string => {
    if (pick.imageKey && pick.imageKey in images) {
      return images[pick.imageKey as ImageKey];
    }
    return pick.imageUrl ?? "";
  };

  return (
    <div>
      <PageHeader title={t("picks.title")} subtitle={t("picks.subtitle")} />

      <div className="px-5 space-y-5">
        {picks.map((pick, i) => {
          const placeInfo = getPlaceInfo(pick);
          return (
            <motion.div
              key={pick.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/50"
            >
              <button
                onClick={() => navigate(`/picks/${pick.id}`)}
                className="w-full text-left"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={getImageSrc(pick)}
                    alt={pick.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {categoryEmoji[pick.category] ?? "📍"} {pick.category.replace("-", " ")}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {placeInfo.rating > 0 && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/40 backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span className="text-xs font-medium text-sand-light">{placeInfo.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sand/80 text-[10px] uppercase tracking-wider font-medium">
                      {pick.tagline}
                    </p>
                    <h3 className="font-display text-lg font-bold text-sand-light">{pick.title}</h3>
                  </div>
                </div>
              </button>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2">
                    {pick.whyWeLoveIt}
                  </p>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(pick.id);
                      }}
                      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite(pick.id)
                            ? "fill-destructive text-destructive"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        share(pick);
                      }}
                      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/picks/${pick.id}`)}
                  className="flex items-center gap-1 mt-2 text-xs text-primary font-medium min-h-[44px]"
                >
                  {t("picks.readMore", "Read more")}
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Picks;
