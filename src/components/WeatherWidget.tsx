import { useWeather } from "@/hooks/useWeather";
import { useTranslation } from "react-i18next";
import { Droplets, Wind } from "lucide-react";

export const WeatherWidget = () => {
  const { weather, loading, description, icon } = useWeather();
  const { t } = useTranslation();

  if (loading || !weather) return null;

  return (
    <div className="flex items-center gap-3 bg-foreground/20 backdrop-blur-md rounded-xl px-3 py-2">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-sand-light">{weather.temperature}°C</span>
          <span className="text-[10px] text-sand/70">{description}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-sand/60">
          <span className="flex items-center gap-0.5"><Droplets className="w-2.5 h-2.5" />{weather.humidity}%</span>
          <span className="flex items-center gap-0.5"><Wind className="w-2.5 h-2.5" />{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};
