import weatherData from "./weather.json";

export const weatherDescriptions: Record<number, string> = Object.fromEntries(
  Object.entries(weatherData.weatherDescriptions).map(([k, v]) => [Number(k), v])
);

export const weatherIcons: Record<number, string> = Object.fromEntries(
  Object.entries(weatherData.weatherIcons).map(([k, v]) => [Number(k), v])
);

export const marrakechCoordinates = weatherData.marrakechCoordinates;
