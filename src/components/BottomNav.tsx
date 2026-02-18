import { Link, useLocation } from "react-router-dom";
import { Compass, Heart, Map, Lightbulb, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { EmergencySheet } from "./EmergencySheet";

const navItems = [
  { path: "/", icon: Compass, labelKey: "nav.home" },
  { path: "/picks", icon: Heart, labelKey: "nav.picks" },
  { path: "/explore", icon: Map, labelKey: "nav.explore" },
  { path: "/toolkit", icon: Lightbulb, labelKey: "nav.tips" },
];

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-background/90 backdrop-blur-xl border-t border-border z-50">
        <div className="flex items-center justify-around py-2 px-1">
          {navItems.map(({ path, icon: Icon, labelKey }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] justify-center ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] font-medium">{t(labelKey)}</span>
              </Link>
            );
          })}
          {/* Emergency button */}
          <button
            onClick={() => setEmergencyOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-destructive min-w-[44px] min-h-[44px] justify-center"
          >
            <AlertTriangle className="w-5 h-5" strokeWidth={1.8} />
            <span className="text-[10px] font-medium">SOS</span>
          </button>
        </div>
      </nav>
      <EmergencySheet open={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </>
  );
};
