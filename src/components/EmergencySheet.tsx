import { Phone, Copy, MapPin, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const emergencyContacts = [
  { key: "police", number: "19", icon: "🚔" },
  { key: "ambulance", number: "15", icon: "🚑" },
  { key: "fire", number: "15", icon: "🚒" },
  { key: "tourist", number: "+212 524 384 601", icon: "🛡️" },
];

const emergencyPhrases = [
  { en: "I need help!", ar: "عاونوني!", fr: "Aidez-moi !" },
  { en: "Call the police", ar: "عيطو للبوليس", fr: "Appelez la police" },
  { en: "I need a doctor", ar: "بغيت طبيب", fr: "J'ai besoin d'un médecin" },
  { en: "Where is the hospital?", ar: "فين سبيطار?", fr: "Où est l'hôpital ?" },
  { en: "I lost my passport", ar: "ضاع ليا الباسبور", fr: "J'ai perdu mon passeport" },
  { en: "I've been robbed", ar: "سرقوني", fr: "J'ai été volé(e)" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export const EmergencySheet = ({ open, onClose }: Props) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const msg = `I need help! My location: https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        if (navigator.share) {
          navigator.share({ text: msg });
        } else {
          copy(msg);
        }
      });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[70] max-w-lg mx-auto bg-background rounded-t-3xl max-h-[85vh] overflow-y-auto"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h2 className="font-display text-xl font-bold text-foreground">{t('emergency.title')}</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Emergency contacts */}
              <div className="space-y-2 mb-6">
                {emergencyContacts.map(({ key, number, icon }) => (
                  <div key={key} className="flex items-center gap-3 bg-card rounded-xl p-3">
                    <span className="text-xl">{icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{t(`emergency.${key}`)}</p>
                      <p className="text-xs text-muted-foreground">{number}</p>
                    </div>
                    <a href={`tel:${number}`} className="p-2 rounded-full bg-destructive/10 min-w-[44px] min-h-[44px] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-destructive" />
                    </a>
                    <button onClick={() => copy(number)} className="p-2 rounded-full bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center">
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Share location */}
              <button
                onClick={shareLocation}
                className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground rounded-xl p-4 font-semibold text-sm min-h-[44px] mb-6"
              >
                <MapPin className="w-4 h-4" />
                {t('emergency.shareLocation')}
              </button>

              {/* Emergency phrases */}
              <h3 className="font-display text-base font-semibold mb-3 text-foreground">Emergency Phrases</h3>
              <div className="space-y-2">
                {emergencyPhrases.map((phrase, i) => (
                  <button
                    key={i}
                    onClick={() => copy(`${phrase.en} / ${phrase.ar} / ${phrase.fr}`)}
                    className="w-full text-left bg-card rounded-lg p-3 min-h-[44px]"
                  >
                    <p className="text-sm font-medium text-foreground">{phrase.en}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{phrase.ar} · {phrase.fr}</p>
                    {copied === `${phrase.en} / ${phrase.ar} / ${phrase.fr}` && (
                      <span className="text-xs text-secondary">Copied!</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
