import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EmergencySheet } from "@/components/EmergencySheet";
import {
  Bus,
  Languages,
  Thermometer,
  HandCoins,
  Smartphone,
  Shield,
  ChevronDown,
  Utensils,
  Droplets,
  Hotel,
  Stethoscope,
  Wallet,
  Baby,
  Heart,
  Accessibility,
  Leaf,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import { tips } from "@/data";

const iconMap = {
  Bus,
  Languages,
  Thermometer,
  HandCoins,
  Smartphone,
  Shield,
  Utensils,
  Droplets,
  Hotel,
  Stethoscope,
  Wallet,
  Baby,
  Heart,
  Accessibility,
  Leaf,
  Wrench,
} as const;

const Toolkit = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div>
      <PageHeader title={t("tips.title")} subtitle={t("tips.subtitle")} />

      <div className="px-5 space-y-3">
        {tips.map(({ iconName, title, content }, i) => {
          const isOpen = openIndex === i;
          const Icon = iconMap[iconName as keyof typeof iconMap] || Bus;
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
                  <span className="font-display text-base font-semibold text-foreground flex-1">
                    {title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 space-y-2 pl-[52px]"
                  >
                    {content.map((line, j) => (
                      <p key={j} className="text-sm text-foreground/80 leading-relaxed">
                        {line}
                      </p>
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
            <h3 className="font-display text-base font-semibold text-foreground">
              Scams & Incident Response
            </h3>
          </div>
          <div className="space-y-2 text-sm text-foreground/80">
            <p>
              🚨 <strong>Lost passport:</strong> Contact your embassy immediately. Tourist Police
              can help with paperwork.
            </p>
            <p>
              🔒 <strong>Theft:</strong> File a report at the nearest police station (commissariat).
              Get a copy for insurance.
            </p>
            <p>
              ⚠️ <strong>Common scams:</strong> Fake guides, "closed today" redirections, henna
              ambushes, carpet shop detours.
            </p>
            <p>
              🛡️ <strong>Prevention:</strong> Keep valuables hidden, use inside pockets, be wary of
              unsolicited help.
            </p>
            <p>
              📞 <strong>Tourist Police:</strong> +212 524 384 601
            </p>
          </div>
        </div>
      </div>

      {/* Emergency SOS Button */}
      <div className="px-5 mt-4">
        <button
          onClick={() => setEmergencyOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground rounded-xl p-4 font-semibold text-sm min-h-[44px]"
        >
          <AlertTriangle className="w-5 h-5" />
          SOS — Emergency Mode
        </button>
      </div>

      <EmergencySheet open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

      <div className="h-8" />
    </div>
  );
};

export default Toolkit;
