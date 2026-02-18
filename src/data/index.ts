// Types
export type {
  Place,
  POI,
  Pick,
  Itinerary,
  ItineraryItem,
  Duration,
  Highlight,
  QuickLink,
  ArrivalChecklistItem,
  EssentialPhrase,
  TipSection,
  EmergencyContact,
  EmergencyPhrase,
  CategoryConfig,
} from "./types";

// Places data
export { places, categories, neighborhoods } from "./places";

// POIs for map
export { pois, categoryConfig } from "./pois";

// Curated picks
export { picks } from "./picks";

// Itineraries & home page data
export {
  quickLinks,
  highlights,
  durations,
  itineraryData,
  arrivalChecklist,
  essentialPhrases,
} from "./itineraries";

// Tips
export { tips } from "./tips";

// Emergency
export { emergencyContacts, emergencyPhrases } from "./emergency";

// Scams & Safety
export { scamsTips, scamsSectionTitle, sosButtOnText } from "./scams";
export type { ScamTip } from "./scams";

// Navigation
export { navItems } from "./navigation";
export type { NavItem } from "./navigation";

// Settings
export { languages, themeOptions, safetyCenterItems } from "./settings";
export type { Language, ThemeOption, SafetyCenterItem } from "./settings";

// Weather
export { weatherDescriptions, weatherIcons, marrakechCoordinates } from "./weather";

// UI Strings
export { uiStrings, arrivalToolLinks } from "./ui-strings";
export type { ArrivalToolLink } from "./ui-strings";

// Images
export { images, getImage } from "./images";
export type { ImageKey } from "./images";
