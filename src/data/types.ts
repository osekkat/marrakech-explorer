// ============================================================================
// Core Types
// ============================================================================

export type Locale = "en" | "fr" | "es" | "de" | "it" | "nl" | "ar";
export type ISODateTime = string; // ISO 8601

// Editorial content is stored per-locale in SQLite and only the active locale is read into memory.
// Fallback chain example: device locale → user-selected locale → "fr" → "en".

// ============================================================================
// Opening Hours
// ============================================================================

export interface OpeningHours {
  timezone: string; // e.g. "Africa/Casablanca"
  weekly: Partial<
    Record<
      "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
      { start: string; end: string }[] // "HH:mm" 24h
    >
  >;
  notes?: string;
  exceptions?: {
    date: string;
    closed?: boolean;
    ranges?: { start: string; end: string }[];
    note?: string;
  }[];
}

// ============================================================================
// Place Images
// ============================================================================

export interface PlaceImage {
  /** Relative path within the content pack (e.g. "images/places/bahia-1") */
  basePath: string;
  /** Available widths; app selects best match for device pixel density */
  widths: number[]; // e.g. [400, 800, 1200]
  /** ThumbHash string for instant placeholder rendering */
  thumbhash: string;
  /** Aspect ratio (width/height) to reserve layout space and prevent CLS */
  aspectRatio: number;
  alt?: string;
}

// ============================================================================
// Place Categories
// ============================================================================

export type PlaceCategory =
  | "restaurant"
  | "cafe"
  | "museum"
  | "gallery"
  | "riad"
  | "hotel"
  | "garden"
  | "courtyard"
  | "shopping"
  | "souk"
  | "hammam"
  | "spa"
  | "monument";

// ============================================================================
// Places (Base + I18n)
// ============================================================================

export interface PlaceBase {
  id: string;
  slug: string;
  category: PlaceCategory;
  coordinates: { lat: number; lng: number };
  neighborhood: string;
  priceRange?: 1 | 2 | 3 | 4;
  rating?: number;
  images: PlaceImage[];
  openingHours?: OpeningHours;
  contacts?: { address?: string; phone?: string; website?: string };
  featured?: boolean;
  status?: "open" | "temporarily-closed" | "seasonal";
  lastVerifiedAt?: ISODateTime;
  accessibilityTags?: ("wheelchair" | "step-free" | "family-friendly")[];
}

export interface PlaceI18n {
  placeId: string;
  locale: Locale;
  name: string;
  description: string;
  tips?: string[];
  searchKeywords?: string[];
}

// Convenience shape used by UI (base + active locale row)
export type Place = PlaceBase & PlaceI18n;

// ============================================================================
// Day Trips
// ============================================================================

export interface DayTrip {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  heroImage: PlaceImage;
  /** Approximate one-way travel time from Marrakech center */
  travelTimeMinutes: number;
  /** How to get there */
  transportOptions: {
    mode: "private-car" | "shared-minibus" | "bus" | "organized-tour";
    description: string;
    estimatedCostDH?: { min: number; max: number };
  }[];
  /** Best months to visit (1-12) */
  bestMonths: number[];
  /** What to bring */
  packingTips: string[];
  highlights: { placeId?: string; name: string; description: string }[];
  warnings?: string[];
  lastVerifiedAt: ISODateTime;
}

// ============================================================================
// Phrases
// ============================================================================

export interface Phrase {
  id: string;
  category:
    | "greeting"
    | "shopping"
    | "directions"
    | "food"
    | "emergency"
    | "transport"
    | "courtesy";
  locale: Locale;
  english: string;
  darija: string;
  darijaLatin: string; // Transliteration for pronunciation
  french: string;
  /** Relative path to bundled audio clip (compressed Opus, ~2-5 KB each) */
  audioPath?: string;
}

// ============================================================================
// Itineraries
// ============================================================================

export interface Itinerary {
  id: string;
  durationType: "1day" | "weekend" | "long-weekend" | "1week";
  locale: Locale;
  title: string;
  description: string;
  days: ItineraryDay[];
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  stops: ItineraryStop[];
}

export interface ItineraryStop {
  placeId: string;
  timeSlot: string; // "9:00 AM - 11:00 AM"
  notes: string;
}

// ============================================================================
// Picks (Curated Recommendations)
// ============================================================================

export type PickCategory =
  | "architecture"
  | "djemaa-el-fna"
  | "shopping"
  | "cuisine"
  | "stay"
  | "hidden-gem"
  | "rooftop-view"
  | "art-design"
  | "cultural"
  | "museum"
  | "new-town"
  | "hammam";

export interface Pick {
  id: string;
  category: PickCategory;
  placeId: string;
  locale: Locale;
  title: string;
  tagline: string;
  whyWeLoveIt: string;
  images: string[];
}

// ============================================================================
// Tips & Safety
// ============================================================================

export interface TipSection {
  id: string;
  icon: string;
  locale: Locale;
  title: string;
  content: string[];
  lastReviewedAt: ISODateTime;
  sourceRefs?: string[];
  safetyLevel?: "general" | "important" | "critical";
}

// ============================================================================
// Content Manifest (for offline sync)
// ============================================================================

export interface ContentManifest {
  version: string;
  /** Monotonic integer that must strictly increase; reject manifests with lower or equal sequence */
  sequence: number;
  publishedAt: ISODateTime;
  minAppVersion: string;
  checksum: string; // SHA-256 of manifest payload
  signature: string; // Ed25519 signature of manifest payload
  deltaFrom?: string[];
  /** Per-pack checksums: key = pack filename, value = SHA-256 hex digest */
  packChecksums: Record<string, string>;
  /** Index of the signing key used (supports rotation with backup keys) */
  signingKeyIndex: number;
}

// ============================================================================
// UI Components (Home Page, Navigation)
// ============================================================================

export interface Duration {
  id: string;
  iconName: "Sun" | "Clock" | "Calendar" | "Plane";
  label: string;
  subtitle: string;
}

export interface Highlight {
  id: string;
  title: string;
  desc: string;
  imageKey: string;
  to: string;
}

export interface QuickLink {
  iconName: "Calendar" | "Heart" | "Map" | "Lightbulb";
  label: string;
  to: string;
  color: string;
}

export interface ArrivalChecklistItem {
  icon: string;
  text: string;
}

export interface EssentialPhrase {
  phrase: string;
  meaning: string;
}

// ============================================================================
// Emergency
// ============================================================================

export interface EmergencyContact {
  key: string;
  number: string;
  icon: string;
}

export interface EmergencyPhrase {
  en: string;
  ar: string;
  fr: string;
}

// ============================================================================
// Map & POI Configuration
// ============================================================================

export interface CategoryConfig {
  key: string;
  iconName: string;
  color: string;
}

// ============================================================================
// Legacy Types (deprecated, for backward compatibility)
// ============================================================================

/** @deprecated Use PlaceBase & PlaceI18n instead */
export interface POI {
  id: string;
  name: string;
  category: string;
  area: string;
  rating: number;
  lat: number;
  lng: number;
  description: string;
}
