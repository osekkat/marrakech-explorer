import settingsData from "./settings.json";

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface ThemeOption {
  id: string;
  iconName: "Monitor" | "Sun" | "Moon";
  labelKey: string;
}

export interface SafetyCenterItem {
  label: string;
  detail: string;
}

export const languages: Language[] = settingsData.languages as Language[];
export const themeOptions: ThemeOption[] = settingsData.themeOptions as ThemeOption[];
export const safetyCenterItems: SafetyCenterItem[] = settingsData.safetyCenterItems as SafetyCenterItem[];
