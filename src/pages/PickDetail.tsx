import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Navigation, Heart, Share2, Clock, Coffee, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "@/hooks/useFavorites";
import { getPickById, getPlaceById } from "@/data";
import { images, type ImageKey } from "@/data/images";
import type { Pick } from "@/data";

const PickDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toggle, isFavorite } = useFavorites("picks-favorites");

  const pick = id ? getPickById(id) : undefined;
  const place = pick ? getPlaceById(pick.placeId) : undefined;

  if (!pick) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-muted-foreground">Pick not found</p>
        <button
          onClick={() => navigate("/picks")}
          className="mt-4 text-primary font-medium"
        >
          Back to Picks
        </button>
      </div>
    );
  }

  const getImageSrc = (pick: Pick): string => {
    if (pick.imageKey && pick.imageKey in images) {
      return images[pick.imageKey as ImageKey];
    }
    return pick.imageUrl ?? "";
  };

  const handleNavigate = () => {
    if (place?.coordinates) {
      const { lat, lng } = place.coordinates;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, "_blank");
    }
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: pick.title,
        text: `${pick.title} — ${pick.tagline}`,
        url: `https://marrakechcompass.app/picks/${pick.id}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-72">
        <img
          src={getImageSrc(pick)}
          alt={pick.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 p-2.5 rounded-full bg-background/90 backdrop-blur-sm shadow-md z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-12 right-4 flex gap-2 z-10">
          <button
            onClick={() => toggle(pick.id)}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite(pick.id)
                  ? "fill-destructive text-destructive"
                  : "text-foreground"
              }`}
            />
          </button>
          <button
            onClick={share}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-primary text-xs uppercase tracking-wider font-medium mb-1">
            {pick.tagline}
          </p>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {pick.title}
          </h1>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 mt-4 flex gap-3">
        {place?.coordinates && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNavigate}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg"
          >
            <Navigation className="w-5 h-5" />
            Get Directions
          </motion.button>
        )}
        {pick.websiteUrl && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            onClick={() => window.open(pick.websiteUrl, "_blank")}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-card border border-border text-foreground rounded-xl font-medium shadow-md"
          >
            <ExternalLink className="w-5 h-5" />
            Visit Website
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="px-5 mt-6 space-y-6">
        {/* Introduction */}
        {pick.introduction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-foreground/90 leading-relaxed text-[15px] italic">
              {pick.introduction}
            </p>
          </motion.div>
        )}

        {/* Why We Love It (fallback if no introduction) */}
        {!pick.introduction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-foreground/90 leading-relaxed">
              {pick.whyWeLoveIt}
            </p>
          </motion.div>
        )}

        {/* Details */}
        {pick.details && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">
              Details
            </h2>
            <div className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
              {pick.details}
            </div>
          </motion.div>
        )}

        {/* Planning Tip */}
        {pick.planningTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary/10 rounded-xl p-5 border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Planning Tip</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {pick.planningTip}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Break */}
        {pick.quickBreak && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary/30 rounded-xl p-5 border border-secondary/40"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary/50 rounded-lg">
                <Coffee className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Quick Break</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {pick.quickBreak}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Why We Love It (if we have introduction, show this separately) */}
        {pick.introduction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Heart className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Why We Love It</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {pick.whyWeLoveIt}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PickDetail;
