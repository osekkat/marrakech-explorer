export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export interface ThemeOption {
  id: string;
  iconName: "Monitor" | "Sun" | "Moon";
  labelKey: string;
}

export const themeOptions: ThemeOption[] = [
  { id: "system", iconName: "Monitor", labelKey: "settings.system" },
  { id: "light", iconName: "Sun", labelKey: "settings.light" },
  { id: "dark", iconName: "Moon", labelKey: "settings.dark" },
];

export interface SafetyCenterItem {
  label: string;
  detail: string;
}

export const safetyCenterItems: SafetyCenterItem[] = [
  {
    label: "Emergency Contacts",
    detail: "Police: 19 · Ambulance: 15 · Tourist Police: +212 524 384 601",
  },
  {
    label: "Embassies in Rabat",
    detail: "Most embassies are in the capital. Check your country's website.",
  },
  {
    label: "SOS Message Templates",
    detail: "Pre-written messages for emergencies in Arabic and French",
  },
];
