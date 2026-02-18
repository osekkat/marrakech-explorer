import { useState, useEffect } from "react";
import { weatherDescriptions, weatherIcons, marrakechCoordinates } from "@/data";

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem("weather-data");
    if (cached) {
      setWeather(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const { latitude, longitude } = marrakechCoordinates;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
    )
      .then((r) => r.json())
      .then((data) => {
        const w: WeatherData = {
          temperature: Math.round(data.current.temperature_2m),
          apparentTemperature: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
        };
        sessionStorage.setItem("weather-data", JSON.stringify(w));
        setWeather(w);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const description = weather ? weatherDescriptions[weather.weatherCode] || "Unknown" : "";
  const icon = weather ? weatherIcons[weather.weatherCode] || "🌡️" : "";

  return { weather, loading, description, icon };
}
