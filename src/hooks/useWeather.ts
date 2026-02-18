import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

const weatherDescriptions: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
  55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 80: 'Slight showers',
  81: 'Moderate showers', 82: 'Violent showers', 95: 'Thunderstorm',
};

const weatherIcons: Record<number, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌧️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️', 80: '🌦️', 81: '🌧️', 82: '⛈️', 95: '⛈️',
};

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem('weather-data');
    if (cached) {
      setWeather(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch('https://api.open-meteo.com/v1/forecast?latitude=31.6295&longitude=-7.9811&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m')
      .then(r => r.json())
      .then(data => {
        const w: WeatherData = {
          temperature: Math.round(data.current.temperature_2m),
          apparentTemperature: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
        };
        sessionStorage.setItem('weather-data', JSON.stringify(w));
        setWeather(w);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const description = weather ? (weatherDescriptions[weather.weatherCode] || 'Unknown') : '';
  const icon = weather ? (weatherIcons[weather.weatherCode] || '🌡️') : '';

  return { weather, loading, description, icon };
}
