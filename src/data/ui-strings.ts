export interface ArrivalToolLink {
  iconName: "CreditCard" | "Phone" | "BookOpen";
  labelKey: string;
  to: string;
}

export const arrivalToolLinks: ArrivalToolLink[] = [
  { iconName: "CreditCard", labelKey: "arrival.currency", to: "/toolkit" },
  { iconName: "Phone", labelKey: "arrival.prayerTimes", to: "/toolkit" },
  { iconName: "BookOpen", labelKey: "arrival.phrases", to: "/toolkit" },
];

export const uiStrings = {
  familyBadge: "👨‍👩‍👧 Family",
  needsUpdate: "Needs update",
  showLess: "Show less",
  readMore: "Read more",
  placesFound: "places found",
  places: "places",
  emergencyPhrasesTitle: "Emergency Phrases",
  copiedText: "Copied!",
  shareLocationMessage: "I need help! My location:",
  mapPlaceholderStreets: "Map · Connect Mapbox to activate",
  mapPlaceholderSatellite: "Satellite · Connect Mapbox to activate",
  heroAltText: "Marrakech at sunset",
} as const;
