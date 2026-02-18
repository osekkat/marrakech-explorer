import { Link, useLocation } from "react-router-dom";
import { Compass, Heart, Map, Lightbulb, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navItems } from "@/data";

const iconMap = {
  Compass,
  Heart,
  Map,
  MapPin,
  Lightbulb,
} as const;

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-background/90 backdrop-blur-xl border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map(({ path, iconName, labelKey }) => {
          const isActive = location.pathname === path;
          const Icon = iconMap[iconName];
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
      </div>
    </nav>
  );
};
