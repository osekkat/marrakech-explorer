// ============================================================================
// Types
// ============================================================================
export type {
  // Core types
  Locale,
  ISODateTime,
  
  // Places
  Place,
  PlaceBase,
  PlaceI18n,
  PlaceCategory,
  PlaceImage,
  OpeningHours,
  
  // Day Trips
  DayTrip,
  
  // Phrases
  Phrase,
  
  // Itineraries
  Itinerary,
  ItineraryDay,
  ItineraryStop,
  
  // Picks
  Pick,
  PickCategory,
  
  // Tips
  TipSection,
  
  // Content Manifest
  ContentManifest,
  
  // UI Components
  Duration,
  Highlight,
  QuickLink,
  ArrivalChecklistItem,
  EssentialPhrase,
  
  // Emergency
  EmergencyContact,
  EmergencyPhrase,
  
  // Map & POI
  CategoryConfig,
  POI,
} from "./types";

// ============================================================================
// Places data
// ============================================================================
export { 
  places, 
  placesBase,
  placesI18n,
  categories, 
  neighborhoods,
  getPlaces,
  getPlaceById,
} from "./places";

// ============================================================================
// POIs for map
// ============================================================================
export { 
  pois, 
  categoryConfig,
  getPois,
} from "./pois";

// ============================================================================
// Curated picks
// ============================================================================
export { 
  picks,
  allPicks,
  getPicks,
  getPicksByCategory,
  getPickById,
} from "./picks";

// ============================================================================
// Itineraries & home page data
// ============================================================================
export {
  quickLinks,
  highlights,
  durations,
  itineraryData,
  itineraries,
  arrivalChecklist,
  essentialPhrases,
  getItineraries,
  getItinerariesByDuration,
  getItineraryById,
} from "./itineraries";

// ============================================================================
// Phrases
// ============================================================================
export {
  phrases,
  allPhrases,
  getPhrases,
  getPhrasesByCategory,
  getPhraseById,
} from "./phrases";

// ============================================================================
// Tips
// ============================================================================
export { 
  tips,
  allTips,
  getTips,
  getTipsBySafetyLevel,
  getTipById,
} from "./tips";

// ============================================================================
// Emergency
// ============================================================================
export { emergencyContacts, emergencyPhrases } from "./emergency";

// ============================================================================
// Scams & Safety
// ============================================================================
export { scamsTips, scamsSectionTitle, sosButtonText, sosButtOnText } from "./scams";
export type { ScamTip } from "./scams";

// ============================================================================
// Navigation
// ============================================================================
export { navItems } from "./navigation";
export type { NavItem } from "./navigation";

// ============================================================================
// Settings
// ============================================================================
export { languages, themeOptions, safetyCenterItems } from "./settings";
export type { Language, ThemeOption, SafetyCenterItem } from "./settings";

// ============================================================================
// Weather
// ============================================================================
export { weatherDescriptions, weatherIcons, marrakechCoordinates } from "./weather";

// ============================================================================
// UI Strings
// ============================================================================
export { uiStrings, arrivalToolLinks } from "./ui-strings";
export type { ArrivalToolLink } from "./ui-strings";

// ============================================================================
// Images
// ============================================================================
export { images, getImage } from "./images";
export type { ImageKey } from "./images";
