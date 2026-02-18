import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Heart, Star, ChevronRight, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { picks, getImage, uiStrings } from "@/data";
import type { Pick } from "@/data";

const Picks = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toggle, isFavorite } = useFavorites("picks-favorites");

  const isStale = (date: string) => {
    const months = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 30);
    return months > 6;
  };

  const share = (pick: Pick) => {
    if (navigator.share) {
      navigator.share({
        title: pick.title,
        text: `${pick.title} — ${pick.subtitle}`,
        url: `https://marrakechcompass.app/place/${pick.id}`,
      });
    }
  };

  return (
    <div>
      <PageHeader title={t("picks.title")} subtitle={t("picks.subtitle")} />

      <div className="px-5 space-y-5">
        {picks.map((pick, i) => (
          <motion.div
            key={pick.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-xl overflow-hidden shadow-card"
          >
            <button
              onClick={() => setExpanded(expanded === pick.id ? null : pick.id)}
              className="w-full text-left"
            >
              <div className="relative h-48">
                <img
                  src={getImage(pick.imageKey)}
                  alt={pick.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {pick.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {isStale(pick.lastVerifiedAt) && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/80 text-[10px] font-medium text-accent-foreground">
                      {uiStrings.needsUpdate}
                    </span>
                  )}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/40 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span className="text-xs font-medium text-sand-light">{pick.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sand/80 text-[10px] uppercase tracking-wider font-medium">
                    {pick.subtitle}
                  </p>
                  <h3 className="font-display text-lg font-bold text-sand-light">{pick.title}</h3>
                </div>
              </div>
            </button>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2">
                  {pick.whyWeLove}
                </p>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => toggle(pick.id)}
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
                    onClick={() => share(pick)}
                    className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {expanded === pick.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-border"
                >
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {t("picks.whyWeLove")}
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                    {pick.whyWeLove}
                  </p>
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {t("picks.tips")}
                  </h4>
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

              <button
                onClick={() => setExpanded(expanded === pick.id ? null : pick.id)}
                className="flex items-center gap-1 mt-2 text-xs text-primary font-medium min-h-[44px]"
              >
                {expanded === pick.id ? uiStrings.showLess : uiStrings.readMore}
                <ChevronRight
                  className={`w-3 h-3 transition-transform ${
                    expanded === pick.id ? "rotate-90" : ""
                  }`}
                />
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
