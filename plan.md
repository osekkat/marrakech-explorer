# Marrakech Compass Mobile App

## Executive Summary

Marrakech Compass is a travel companion app for visitors to Marrakech. The project exists in two forms:

1. **Current State**: A working Vite + React web prototype with Capacitor iOS wrapper
2. **Target State**: A progressive evolution toward a fully offline-capable mobile app

This plan describes the **progressive enhancement roadmap** — not a rewrite, but a deliberate evolution that preserves working code while adding native capabilities.

---

## Design Philosophy

This app is designed as a **true offline-first travel companion** - like having Lonely Planet in your pocket. The architecture prioritizes:

1. **Instant usability**: Works fully offline from first launch (bundled content)
2. **Editorial quality**: Curated "best of" picks, not just a database dump
3. **Practical utility**: Quick tools, emergency info, and walking directions
4. **Beautiful UX**: Moroccan-inspired design with smooth animations
5. **Progressive enhancement**: Start with what works, add capabilities incrementally
6. **Platform flexibility**: Web-first with native capabilities added via Capacitor

---

## Current Implementation Status

### What Already Works (Preserve & Enhance)
- ✅ 7 screens: Home, Picks, Explore, Maps, Toolkit, Settings, 404
- ✅ Beautiful Moroccan design system (terracotta, teal, sand, gold)
- ✅ 48 shadcn/ui components (Radix primitives + Tailwind)
- ✅ Framer Motion page transitions and animations
- ✅ i18n with EN/FR for UI strings (extensible structure; places/picks content currently EN-only)
- ✅ Favorites persistence (localStorage, migrate to SQLite)
- ✅ Weather widget with Open-Meteo API
- ✅ Emergency SOS bottom sheet
- ✅ Place search with diacritic folding
- ✅ Category and neighborhood filtering
- ✅ iOS app via Capacitor wrapper

### MVP Definition (Phase 1 Exit Criteria)

**MVP includes**: 7 existing screens + PlaceDetail + ItineraryDetail + Leaflet.js map + PWA (service worker + web manifest).

**MVP excludes**: SQLite/FTS5 search, "Near Me" geolocation, Mapbox, Android, OTA content updates, Phrasebook audio.

**Phase 1 complete when**:
- All MVP screens implemented and wired
- Lighthouse PWA score >85
- Basic offline verified (service worker caches shell + content)
- No critical bugs in core flows

---

## Architecture Overview

```mermaid
graph TB
    subgraph UI [UI Layer - React + Tailwind]
        Router[React Router]
        Home[Home + Plan]
        Picks[Our Picks]
        Explore[Explore]
        Maps[Maps]
        Toolkit[Toolkit/Tips]
        Detail[Detail Screens]
    end

    subgraph State [State Layer]
        ReactState[React useState/useReducer]
        Zustand[Zustand - when needed]
        i18n[i18n Context]
        Query[TanStack Query]
    end

    subgraph Data [Data Layer - Progressive Offline]
        JSON[Bundled JSON Content]
        SQLite[SQLite + FTS5 Search]
        LocalStorage[localStorage/Capacitor Preferences]
        ServiceWorker[Service Worker Cache - PWA]
    end

    subgraph Native [Native Layer - Capacitor]
        Preferences[Capacitor Preferences]
        Filesystem[Capacitor Filesystem]
        Share[Capacitor Share]
        Geolocation[Capacitor Geolocation]
        StatusBar[Capacitor Status Bar]
    end

    subgraph Maps [Maps Layer]
        Leaflet[Leaflet.js - Phase 1]
        Mapbox[Mapbox GL - Phase 2]
        OfflineTiles[Offline Tiles - Phase 3]
    end

    Router --> Home
    Router --> Picks
    Router --> Explore
    Router --> Maps
    Router --> Toolkit
    Router --> Detail

    Home --> ReactState
    Home --> Query
    Explore --> ReactState
    Explore --> JSON
    Maps --> Leaflet

    ReactState --> LocalStorage
    SQLite --> JSON

**Note**: Phase 1: Explore uses JSON (bundled). Phase 2: Explore migrates to SQLite + FTS5.
```

**State Management Guidelines**:
- Use React hooks (useState, useReducer) for component-local state.
- Use Zustand when: state is shared across routes, persists across navigation, or has complex multi-action logic.
- Use TanStack Query for server/cache state when adding async APIs.
- Zustand is planned but not yet installed.

---

## Tech Stack

### Current Stack (Working)
- **Framework**: Vite + React 18 + TypeScript
- **Mobile Wrapper**: Capacitor 8 (iOS working; Android: run `npx cap add android` when ready — not yet generated)
- **Navigation**: React Router DOM v6
- **Styling**: Tailwind CSS + shadcn/ui (Radix primitives)
- **State Management**: React hooks (useState, useReducer) + TanStack Query (provider in place; expand for async/cache when adding APIs)
- **Animations**: Framer Motion
- **i18n**: i18next + react-i18next
- **Content**: Static JSON bundled at build time
- **Storage**: localStorage (browser; Capacitor Preferences not yet used; add for native Phase 2)
- **Data Validation**: Zod (installed, expand usage)
- **Icons**: Lucide React

### Phase 2 Additions (Offline Enhancement)
- **Maps**: Leaflet.js → Mapbox GL JS (web-compatible, offline capable)
- **Storage**: @capacitor-community/sqlite for offline content + FTS5 search
- **PWA**: Vite PWA plugin for service worker + installability
- **Background Sync**: Capacitor Background Task (iOS/Android)

### Phase 3 Additions (Native Features)
- **Deep Linking**: Capacitor App plugin + universal links
- **Share**: Capacitor Share plugin (Phase 3; Web Share API already used in Explore/Picks)
- **Geolocation**: Capacitor Geolocation
- **Haptics**: Capacitor Haptics

### Why Not React Native/Expo?
The current Vite + Capacitor approach offers:
1. **Faster iteration**: Hot reload, web debugging tools
2. **Code reuse**: Same codebase for web, iOS, Android
3. **Working prototype**: Don't rewrite what works
4. **PWA support**: Installable web app as bonus
5. **Simpler maps**: Web map libraries are more mature
6. **Smaller team**: One codebase, not two skill sets

Consider Expo rewrite only if: native animations are inadequate, background tasks fail, or app store performance requires it.

---

## Project Structure

```
marrakech-explorer/
├── index.html                    # Vite entry point
├── vite.config.ts                # Vite configuration
├── capacitor.config.ts           # Capacitor native config
├── tailwind.config.ts            # Tailwind + design tokens
├── tsconfig.json                 # TypeScript config
├── src/
│   ├── App.tsx                   # Root with providers (Router, Query, i18n)
│   ├── main.tsx                  # React DOM entry
│   ├── index.css                 # Global styles + CSS variables
│   ├── pages/                    # Route components
│   │   ├── Index.tsx             # Home + Plan Your Trip ✅
│   │   ├── Picks.tsx             # Our Picks / Coup de Coeur ✅
│   │   ├── Explore.tsx           # Explore categories ✅
│   │   ├── Maps.tsx              # Maps (placeholder → Leaflet) ✅
│   │   ├── Toolkit.tsx           # Travel tips + Emergency ✅
│   │   ├── Settings.tsx          # Language & preferences ✅
│   │   ├── NotFound.tsx          # 404 fallback ✅
│   │   ├── PlaceDetail.tsx       # Place detail screen ⏳
│   │   ├── ItineraryDetail.tsx   # Itinerary detail screen ⏳
│   │   ├── CategoryList.tsx      # Category listing screen ⏳
│   │   ├── Phrasebook.tsx        # Offline phrase book ⏳
│   │   └── MyTrip.tsx            # Saved places + notes ⏳
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn/ui base components (48 components) ✅
│   │   ├── BottomNav.tsx         # Fixed bottom navigation ✅
│   │   ├── MobileLayout.tsx      # Page wrapper with transitions ✅
│   │   ├── PageHeader.tsx        # Page title component ✅
│   │   ├── SectionCard.tsx       # Hero section cards ✅
│   │   ├── WeatherWidget.tsx     # Weather display ✅
│   │   ├── EmergencySheet.tsx    # Emergency SOS sheet ✅
│   │   ├── PlaceCard.tsx         # Place card component ⏳
│   │   ├── PickCard.tsx          # Pick card component ⏳
│   │   └── MapView.tsx           # Map component (enhance) ⏳
│   ├── hooks/                    # Custom hooks
│   │   ├── useFavorites.ts       # Favorites management ✅
│   │   ├── useWeather.ts         # Weather API + cache ✅
│   │   ├── useOfflineStatus.ts   # Network detection ⏳
│   │   ├── useLocale.ts          # Locale + fallback chain ⏳
│   │   └── useOpenStatus.ts      # Open/closed computation ⏳
│   ├── data/                     # Content data layer
│   │   ├── index.ts              # Unified exports ✅
│   │   ├── types.ts              # TypeScript interfaces ✅
│   │   ├── places.ts             # Place data + helpers ✅
│   │   ├── places.json           # Place content ✅
│   │   ├── picks.ts              # Picks data + helpers ✅
│   │   ├── picks.json            # Picks content ✅
│   │   ├── itineraries.ts        # Itinerary helpers ✅
│   │   ├── itineraries.json      # Itinerary content ✅
│   │   ├── tips.ts               # Tips helpers ✅
│   │   ├── tips.json             # Tips content ✅
│   │   ├── phrases.ts            # Phrase helpers ✅
│   │   ├── phrases.json          # Phrasebook content ✅
│   │   ├── emergency.ts          # Emergency data ✅
│   │   ├── emergency.json        # Emergency contacts ✅
│   │   └── ... (other data)      # Additional content
│   ├── db/                       # SQLite + FTS5 layer (Phase 2)
│   │   ├── schema.ts             # SQLite schema and migrations
│   │   ├── repository.ts         # Typed read/write data access
│   │   ├── fts.ts                # FTS5 queries (BM25 ranking)
│   │   ├── indexer.ts            # Build/refresh indexes per locale
│   │   └── useContentQuery.ts    # Reactive hook for DB queries
│   ├── i18n/                     # Internationalization
│   │   ├── index.ts              # i18n configuration ✅
│   │   ├── en.json               # English ✅
│   │   └── fr.json               # French ✅
│   │   ├── es.json               # Spanish ⏳
│   │   ├── de.json               # German ⏳
│   │   ├── it.json               # Italian ⏳
│   │   ├── nl.json               # Dutch ⏳
│   │   └── ar.json               # Arabic (RTL) ⏳
│   ├── lib/                      # Utility functions
│   │   └── utils.ts              # cn() helper ✅
│   └── assets/                   # Static assets
│       └── *.jpg                 # Hero images ✅
├── assets/                       # Images, fonts, icons
├── ios/                          # Capacitor iOS project ✅
├── android/                      # Capacitor Android project ⏳
└── public/                       # Static public assets

Legend: ✅ Implemented | ⏳ Planned
```

---

## Content Data Models

Type-safe interfaces for all content:

```typescript
type Locale = "en" | "fr" | "es" | "de" | "it" | "nl" | "ar";
type ISODateTime = string; // ISO 8601

// Editorial content is stored per-locale in SQLite (Phase 2); Phase 1 uses bundled JSON.
// Locale fallback chain: user-selected → device locale (if supported) → "fr" → "en".
// If content missing for locale, show English with "[Content in English]" indicator.

interface OpeningHours {
  timezone: string; // e.g. "Africa/Casablanca"
  weekly: Partial<Record<
    "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
    { start: string; end: string }[] // "HH:mm" 24h
  >>;
  notes?: string;
  exceptions?: { 
    date: string; 
    closed?: boolean; 
    ranges?: { start: string; end: string }[]; 
    note?: string 
  }[];
}

interface PlaceImage {
  /** Relative path within the content pack (e.g. "images/places/bahia-1") */
  basePath: string;
  /** Available widths; app selects best match for device pixel density */
  widths: number[];          // e.g. [400, 800, 1200]
  /** ThumbHash string for instant placeholder rendering */
  thumbhash: string;
  /** Aspect ratio (width/height) to reserve layout space and prevent CLS */
  aspectRatio: number;
  alt?: string;
}

interface PlaceBase {
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

interface PlaceI18n {
  placeId: string;
  locale: Locale;
  name: string;
  description: string;
  tips?: string[];
  // Optional synonyms/transliterations to improve offline search quality
  searchKeywords?: string[];
}

// Convenience shape used by UI (base + active locale row)
type Place = PlaceBase & PlaceI18n;

type PlaceCategory =
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

interface DayTrip {
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

interface Phrase {
  id: string;
  category: "greeting" | "shopping" | "directions" | "food" | "emergency" | "transport" | "courtesy";
  locale: Locale;
  english: string;
  darija: string;
  darijaLatin: string;           // Transliteration for pronunciation
  french: string;
  /** Relative path to bundled audio clip (compressed Opus, ~2-5 KB each) */
  audioPath?: string;
}

interface Itinerary {
  id: string;
  durationType: "1day" | "weekend" | "long-weekend" | "1week";
  locale: Locale;
  title: string;
  description: string;
  days: ItineraryDay[];
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  stops: ItineraryStop[];
}

interface ItineraryStop {
  placeId: string;
  timeSlot: string; // "9:00 AM - 11:00 AM"
  notes: string;
}

interface Pick {
  id: string;
  category: PickCategory;
  placeId: string;
  locale: Locale;
  title: string;
  tagline: string;
  whyWeLoveIt: string;
  images: string[];
}

type PickCategory =
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

interface TipSection {
  id: string;
  icon: string;
  locale: Locale;
  title: string;
  content: string[];
  lastReviewedAt: ISODateTime;
  sourceRefs?: string[];
  safetyLevel?: "general" | "important" | "critical";
}

// Emergency data (currently implemented; matches emergency.json)
interface EmergencyContact {
  key: string;
  number: string;
  icon: string;
}

interface EmergencyPhrase {
  en: string;
  ar: string;
  fr: string;
}

// Content manifest for future OTA updates (Phase 3)
// Minimal schema here; types.ts may extend with sequence, signature, packChecksums for signed updates
interface ContentManifest {
  version: string;
  publishedAt: ISODateTime;
  checksum: string;
  locales: Locale[];
}
```

### Content Pack Structure

- **Images**: `src/assets/` for hero/highlights; `public/images/places/` or equivalent for place images referenced by `basePath`.
- **Resolution**: `PlaceImage.basePath` maps to asset paths; app uses `getImage()` or `/images/places/{id}-1.jpg`.
- **JSON**: `src/data/*.json` bundled at build; no separate pack download in Phase 1.
- **Build**: Images optimized at build (WebP, responsive sizes) as Phase 2 improvement.

---

## Feature Implementation

### Tab 1: Home + Plan Your Trip

**Hero Section:** ✅ Implemented

- Live weather widget (Open-Meteo API) with temperature, conditions, humidity
- **Offline behavior**: Weather caches last response in sessionStorage; when offline or API fails, show cached data with "Last updated" or placeholder "Weather unavailable offline". Phase 1 PWA: cache weather with stale-while-revalidate.
- Language switcher button in header
- Beautiful hero image with gradient overlay
- Settings access via header icon

**Plan Your Trip Section:** ✅ Implemented

- Duration selector chips: 1 Day, Weekend, Long Weekend, 1 Week
- Interactive itinerary cards with expand/collapse animation
- Day-by-day breakdown with timing and place links
- Bookmark/favorite itineraries

**Arrival Mode (Quick Tools):** ✅ Implemented

- Airport info and transfer options
- First steps checklist
- Emergency contacts quick access
- Currency converter widget
- Prayer times (for context)
- Quick link to Phrase Book (most-used greetings + bargaining phrases)

**Quick Links:** ✅ Implemented

- Grid of icons linking to other tabs and key categories (Plan Trip → /itineraries; add route or redirect to home Plan section)

**Don't Miss Carousel:** ✅ Implemented

- Horizontal scroll of featured highlights with images

---

### Tab 2: Our Picks (Coup de Coeur)

Editorial-style curated recommendations: ✅ Implemented (12 categories)

- **Best Architectural Experience** - Bahia Palace, Medersa Ben Youssef
- **Best Djemaa El Fna Experience** - timing, stalls, atmosphere tips
- **Best Shopping / Souks** - navigation, what to buy, where
- **Best Dining Experience** - from street food to fine dining
- **Best Place to Stay** - riads with character
- **Best Hidden Gem** - off-the-beaten-path discoveries
- **Best Rooftop View** - sunset spots, cafe terraces
- **Best Art & Design** - galleries, concept stores, artisan workshops
- **Best Cultural Experiences** - cooking classes, calligraphy, music
- **Best Museum Experiences** - Yves Saint Laurent, Dar Si Said, Photography Museum
- **Best Experience in New Town (Gueliz)** - modern cafes, boutiques, nightlife
- **Best Hammam Experience** - traditional vs luxury, what to expect

Each pick features:

- Rich hero imagery
- "Why We Love It" editorial description
- Practical tips
- Tap to view full place detail with map
- Content freshness indicator (Phase 2: based on `lastVerifiedAt`)
- Tap freshness badge to submit a data correction report (Phase 3)

---

### Tab 3: Explore

**Category Grid:** ✅ Implemented

- Restaurants & Cafes
- Museums & Galleries
- Riads & Hotels
- Gardens & Courtyards
- Shopping & Souks
- Hammams & Spas
- Day Trips (Atlas Mountains, Essaouira, Ouzoud) ⏳

**Neighborhood Quick Filters:** ✅ Implemented

- Horizontal scrollable chips above category grid: Medina, Gueliz, Hivernage, Mellah, Palmeraie, All
- Selecting a neighborhood scopes all category results and search to that area
- "Near Me" chip: Phase 1 — disabled or grayed with tooltip "Coming in Phase 2 (requires location permission)"; Phase 2 — enabled with Capacitor Geolocation

**Search Features:** ✅ Partially Implemented (Phase 2: SQLite FTS5)

Current (JavaScript-based):
- ✅ Text search with diacritic folding (café ≈ cafe)
- ✅ Search by name, description, category, neighborhood
- ✅ searchKeywords field support

Phase 2 (SQLite FTS5 upgrade):
- Offline full-text search with FTS5 + BM25 ranking
- Locale-aware tokenization (including Arabic)
- Curated synonyms/transliterations via `searchKeywords`
- "Did you mean" suggestions (top candidates)
- Open-now filter (requires OpeningHours computation)
- Distance sorting (requires geolocation)
- Recent searches persistence
- Hybrid sort: BM25 relevance + editorial score + distance + open-now

**Place Cards:** ✅ Implemented
- Name, category, neighborhood, price range
- Rating badge
- Heart icon to save to favorites
- Share button (uses Web Share API; Phase 3: Capacitor Share for native)
- ✅ Family-friendly badge (accessibilityTags)
- ⏳ Tap to view detail screen (needs PlaceDetail.tsx)
- ⏳ Open/closed status badge

**My Trip (Saved + Notes):**

- ⏳ Accessible via header icon (needs implementation)
- Saved places + saved itineraries + personal notes/checklists
- Persisted offline (localStorage now, SQLite Phase 2)
- Optional export/share as text for a day plan

---

### Tab 4: Maps

**Current State:** ✅ Placeholder implemented

**Phase 1 Enhancement (Leaflet.js):**
- Interactive map centered on Marrakech Medina
- POI markers from places data
- Marker clustering at low zoom
- Tap marker to show place preview card
- Current location indicator (Capacitor Geolocation)
- Recenter button

**Phase 2 Enhancement (Mapbox GL JS):**
- Vector tiles for better performance
- Offline tile caching via service worker
- Style switching (streets vs satellite)
- "Navigate" button launches external maps app (Apple Maps / Google Maps)

**Phase 3 (Optional - Offline Packs):**
- Download progress indicator and status
- Granular pack manager with pause/resume
- Size indicator before download

**Note:** Skip custom A* routing. External map apps (Apple Maps, Google Maps, Waze) handle walking directions better. Focus on POI discovery, not navigation.

---

### Tab 5: Toolkit (Tips)

**Accordion Sections:** ✅ Implemented (16 sections)

1. Getting Around
2. Language
3. Etiquette & Customs
4. Climate & Packing
5. Bargaining Guide
6. SIM Cards & WiFi
7. Food, Drink & Nightlife
8. Accommodation
9. Health & Safe Travels
10. Money & Tipping
11. Family Travel
12. LGBTIQ+ Travellers
13. Accessible Travel
14. Responsible Travel
15. Nuts & Bolts
16. Scams & Incident Response

**Emergency Mode:** ✅ Implemented

- SOS button always visible
- Bottom sheet with emergency contacts
- One-tap call shortcuts
- Emergency phrases (Darija/French)
- ✅ Copy-to-clipboard for numbers
- ✅ "Share my location" message templates

---

### Settings Screen

**Implemented:** ✅
- Language Selection: EN / FR (with flag icons)
- Theme: System / Light / Dark
- Safety Center: Emergency contacts

**Phase 2 Additions:**
- Additional languages: ES / DE / IT / NL / AR
- RTL support for Arabic
- Accessibility: Text size, reduce motion, high contrast
- Offline Maps: Download status, manage storage
- My Trip: Export data, clear notes
- Data Usage Mode: Wi-Fi-only downloads
- Clear Cache
- About: App version, credits, feedback link

**Accessibility Requirements:**
- All interactive elements: `aria-label` and `role` attributes
- Minimum touch target: 44×44 pt (currently implemented)
- Dynamic type: all text uses relative sizing
- Reduce motion: disable Framer Motion animations

---

### Missing Screens (Priority Implementation)

**1. PlaceDetail.tsx** (High Priority)
- Full place information with images
- Map preview with "Open in Maps" button
- Opening hours with open/closed status
- Contact info (address, phone, website)
- Tips from editorial content
- Save to favorites
- Share button
- "Report issue" button

**2. ItineraryDetail.tsx** (High Priority)
- Day-by-day breakdown with map
- Each stop links to PlaceDetail
- Save/bookmark functionality
- Share as text

**3. Phrasebook.tsx** (Medium Priority)
- Categories: greeting, shopping, directions, food, emergency, transport, courtesy
- English, Darija, Darija (Latin), French
- Search/filter by category
- Audio playback (Phase 2)

**4. MyTrip.tsx** (Medium Priority)
- Saved places list
- Saved itineraries
- Personal notes
- Checklist items
- Export as text

### Sharing & Deep Links

**Current:** ✅ Uses Web Share API with external URLs

**Phase 2:**
- Internal routes: `/place/:id`, `/itinerary/:id`
- Universal links via Capacitor App plugin
- Web fallback pages (static site on CDN)

---

## Design System (from marrakech-compass)

### Colors (Moroccan-inspired)

```css
/* CSS Variables in src/index.css */
:root {
  --primary: 15 65% 52%;        /* Terracotta #C65D3B */
  --secondary: 172 35% 32%;     /* Teal #356B66 */
  --accent: 38 70% 60%;         /* Gold #D9A441 */
  --background: 35 30% 96%;     /* Warm sand #F7F4F0 */
  --foreground: 20 20% 15%;     /* Dark brown #2D2622 */
  --card: 35 25% 93%;           /* Light sand #EFE9E2 */
  --muted: 35 20% 88%;
  --border: 35 20% 85%;
  
  /* Custom tokens */
  --terracotta: 15 65% 52%;
  --terracotta-light: 15 55% 70%;
  --teal: 172 35% 32%;
  --teal-light: 172 30% 45%;
  --sand: 38 40% 82%;
  --gold: 38 70% 60%;
  --ochre: 28 60% 45%;
}

/* Dark mode overrides in .dark class */
.dark {
  --background: 20 20% 10%;     /* Very dark brown */
  --foreground: 35 20% 90%;     /* Light sand */
  --card: 20 15% 12%;
}
```

### Typography

- **Display**: Playfair Display (headings, hero text)
- **Body**: DM Sans (content, UI text)
- Sizes: xs (10) to 4xl (30)

### Tailwind Integration

Design tokens configured in `tailwind.config.ts`:

```javascript
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // All colors via CSS variables (see index.css)
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
};
```

---

## Dependencies

### Current (package.json)
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@capacitor/core": "^8.1.0",
  "@capacitor/cli": "^8.1.0",
  "@capacitor/ios": "^8.1.0",
  "@tanstack/react-query": "^5.83.0",
  "i18next": "^25.8.10",
  "react-i18next": "^16.5.4",
  "framer-motion": "^12.34.0",
  "tailwindcss": "^3.4.17",
  "zod": "^3.25.76",
  "lucide-react": "^0.462.0"
}
```

### Phase 2 Additions
```json
{
  "@capacitor/preferences": "^6.0.0",
  "@capacitor/geolocation": "^6.0.0",
  "@capacitor/share": "^6.0.0",
  "@capacitor-community/sqlite": "^6.0.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "vite-plugin-pwa": "^0.20.0"
}
```

### Phase 3 Additions
```json
{
  "mapbox-gl": "^3.0.0",
  "@capacitor/app": "^6.0.0",
  "@capacitor/haptics": "^6.0.0"
}
```

---

## Offline Strategy

### Phase 1: PWA + Service Worker (Web)

1. Install `vite-plugin-pwa` for service worker generation
2. Cache static assets (JS, CSS, images) for offline use
3. Cache API responses (weather) with stale-while-revalidate
4. Content JSON bundled at build time (always available)
5. Add web app manifest for "Add to Home Screen"

**Service Worker Updates**: Use skipWaiting for web; on native, SW updates with app. Version check on launch; show "Update available" banner. Keep previous SW for 2 app versions for rollback.

### Phase 2: SQLite + FTS5 + Capacitor (Native)

1. Migrate content from JSON to SQLite via @capacitor-community/sqlite
2. Build FTS5 indexes per locale for fast offline search:
   - BM25 ranking for relevance scoring
   - Diacritic folding (café ≈ cafe)
   - Locale-aware tokenization (including Arabic)
   - searchKeywords for synonyms/transliterations
3. User data (favorites, notes) persisted in SQLite
4. Settings via Capacitor Preferences (key-value)
5. Map tiles cached via service worker or Mapbox SDK

**SQLite Schema (Phase 2):**
```sql
-- Content tables
CREATE TABLE places_base (
  id TEXT PRIMARY KEY,
  slug TEXT,
  category TEXT,
  lat REAL,
  lng REAL,
  neighborhood TEXT,
  price_range INTEGER,
  rating REAL,
  featured INTEGER,
  status TEXT,
  last_verified_at TEXT
);

CREATE TABLE places_i18n (
  place_id TEXT,
  locale TEXT,
  name TEXT,
  description TEXT,
  tips TEXT, -- JSON array
  search_keywords TEXT, -- JSON array
  PRIMARY KEY (place_id, locale)
);

-- FTS5 virtual table for search
CREATE VIRTUAL TABLE places_fts USING fts5(
  name,
  description,
  search_keywords,
  content='places_i18n',
  content_rowid='rowid',
  tokenize='unicode61 remove_diacritics 2'
);

-- User data tables
CREATE TABLE favorites (
  id TEXT PRIMARY KEY,
  type TEXT, -- 'place' | 'itinerary' | 'pick'
  item_id TEXT,
  created_at TEXT
);

CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  place_id TEXT,
  content TEXT,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE search_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT,
  searched_at TEXT
);
```

**SQLite Initialization & Migrations**: On first launch, create DB and populate from bundled JSON. Use versioned schema files; on app update, run migrations sequentially. On migration failure: log error, offer "Reset database" (user data preserved separately in favorites/notes).

### Phase 3: Content Updates (Optional)

1. Simple manifest check on app launch (version number)
2. If new version available, download updated JSON bundle
3. Hot-swap content without app store update
4. No complex delta/signing unless content grows significantly

### Favorites & Settings

- Phase 1: localStorage (web) / Capacitor Preferences (native)
- Phase 2: SQLite for complex user data (notes, checklists)
- No network required

---

## Reliability & Performance Budgets

- Cold start P75: <1.5s on web, <2.0s on native
- Scroll performance: 55+ FPS in list/map interactions
- Initial bundle size (gzip): <200KB JS, <50KB CSS
- Lighthouse PWA score: >90
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- SQLite query P95: <50ms for FTS5 search queries

### Cold Start Critical Path

1. Load minimal JS bundle (code-split by route via React.lazy + Suspense)
2. Render Home screen shell immediately
3. Hydrate content from bundled JSON (sync, fast)
4. Fetch weather in background (non-blocking)
5. Lazy-load other routes on navigation

**Code Splitting Strategy**: Route-based splitting via React.lazy(). Shared deps (React, Router, i18n) in main bundle. Map libraries loaded only on Maps route. Target: main <150KB gzip, route chunks <50KB each.

### Lazy Locale Hydration (Phase 2)

- First launch: insert only the device's detected locale (+ English fallback) into SQLite
- On language switch: hydrate the new locale from bundled pack, show loading indicator
- FTS indexes: build only for active locale; rebuild on switch (takes <500ms for typical content size)

### Image Loading Strategy

- Use native `loading="lazy"` for images below fold
- Optimize images at build time (WebP, multiple sizes)
- Consider ThumbHash placeholders for Phase 2

---

## Error Handling & Degradation

### Error Boundaries

- Each page wrapped in React error boundary
- Fallback UI: "Something went wrong — tap to retry"
- Log errors to console (Phase 2: crash reporting service)

### Degradation Tiers

- **Tier 0 (healthy)**: All systems nominal
- **Tier 1 (no network)**: Weather fails gracefully, show cached or placeholder
- **Tier 2 (search degraded)**: FTS5 index corrupt → fall back to JavaScript search; auto-rebuild in background
- **Tier 3 (map failure)**: Show "Open in Maps" button for external app
- **Tier 4 (emergency only)**: Emergency contacts always work (static data)

---

## Security & Privacy

- **API keys**: Use environment variables; never commit keys. Open-Meteo is free and keyless; future paid APIs via `VITE_*` env vars.
- **Deep links**: Validate and sanitize URL parameters; reject malformed paths.
- **SQLite**: Use parameterized queries; no raw string interpolation.
- **Content signing**: If OTA updates use signatures (see types.ts ContentManifest), document key rotation.
- **User data**: Favorites and notes stored locally only; no server sync without explicit consent.
- **Privacy policy**: Required for app stores; document data handling and retention.

---

## Testing Strategy

### Unit Tests (Vitest)
- Data helpers (getPlaces, getPicksByCategory)
- Hooks (useFavorites, useWeather)
- Utility functions
- SQLite repository functions

### Component Tests (Testing Library)
- Key components render correctly
- User interactions work
- Accessibility requirements met

### E2E Tests (Playwright - Phase 2)
- Core user flows (browse, search, favorite, navigate)
- Offline mode (service worker)
- Mobile viewport testing

### Content Validation (CI)
- Zod schema validation for all JSON files
- Referential integrity (placeId links exist)
- Translation completeness check
- Image existence check

### Offline & Device Testing
- Offline: service worker install, cache behavior, SQLite queries without network
- Device matrix: iPhone 12 (iOS 15+), Pixel 6 (Android 12+), iPad Air
- Network conditions: 3G, 4G, WiFi, airplane mode
- Accessibility: WCAG 2.1 AA target; axe-core; VoiceOver/TalkBack; keyboard nav

---

## Build & Deployment

- **Build**: `npm run build`; `npm run build:dev` for development mode
- **Env vars**: `VITE_*` for API keys and feature flags
- **Capacitor**: `npx cap sync` after build; `npx cap open ios` / `npx cap add android`
- **Web**: Static hosting (Vercel/Netlify); update index.html meta/SEO before deploy
- **CI/CD**: Lint, typecheck, test, build on PR/push (e.g. GitHub Actions)

---

## App Store Preparation

**iOS**: App Store Connect, screenshots (6.5", 6.7", iPad), description, keywords, privacy policy URL, support URL, age rating
**Google Play**: Play Console, screenshots, feature graphic, description, privacy policy, content rating
**PWA**: Web manifest complete, service worker registered, offline verified

---

## Implementation Roadmap

### Phase 1: Complete Core Features (Current → MVP)

**Completion criteria**: All MVP screens done, PWA score >85, offline verified, no critical bugs.

**Priority 1: Missing Screens**
- [ ] Create `/place/:id` route and PlaceDetail.tsx
- [ ] Create `/itinerary/:id` route and ItineraryDetail.tsx
- [ ] Wire up "tap to view detail" from all cards
- [ ] Implement back navigation from detail screens

**Priority 2: Enhanced Maps**
- [ ] Replace placeholder with Leaflet.js
- [ ] Add POI markers from places data
- [ ] Implement marker tap → place preview card
- [ ] Add "Open in Maps" button for navigation

**Priority 3: Polish**
- [ ] Add Phrasebook.tsx standalone screen
- [ ] Add MyTrip.tsx for saved items management
- [ ] Implement open/closed status computation
- [ ] Add more locales (ES, DE, IT)

**Priority 4: PWA**
- [ ] Install vite-plugin-pwa
- [ ] Configure service worker caching
- [ ] Add web app manifest
- [ ] Test offline functionality

### Phase 2: Native Enhancement + SQLite FTS5

**Completion criteria**: SQLite + FTS5 search, geolocation "Near Me," native share, Android added, app stores ready.

- [ ] Add @capacitor-community/sqlite for offline database
- [ ] Create SQLite schema with FTS5 virtual tables
- [ ] Implement repository layer for typed data access
- [ ] Build FTS5 search with BM25 ranking
- [ ] Migrate favorites from localStorage to SQLite
- [ ] Add @capacitor/geolocation for "Near Me"
- [ ] Add @capacitor/share for native sharing
- [ ] Implement search history persistence
- [ ] Add RTL support for Arabic
- [ ] Upgrade to Mapbox GL JS with offline tiles
- [ ] Add Capacitor Android support
- [ ] Publish to App Store and Play Store

### Phase 3: Advanced Features (Post-Launch)

- [ ] Content OTA updates (simple manifest check)
- [ ] Crash reporting service integration
- [ ] Analytics (privacy-first)
- [ ] Audio for phrasebook
- [ ] User-submitted corrections
- [ ] Trip sharing between users

---

## Todos

### Immediate (This Sprint)
- [ ] Create PlaceDetail.tsx with full place information
- [ ] Create ItineraryDetail.tsx with day-by-day view
- [ ] Add routes: `/place/:id`, `/itinerary/:id`
- [ ] Wire up card taps to navigate to detail screens
- [ ] Integrate Leaflet.js for interactive map

### Short Term
- [ ] Wire content helpers (getPlaces, getPicks) to i18n.language for locale-aware content; add useLocale hook if needed
- [ ] Create Phrasebook.tsx standalone screen
- [ ] Create MyTrip.tsx for saved items
- [ ] Add useOpenStatus hook for open/closed computation
- [ ] Add ES, DE, IT locale files
- [ ] Set up PWA with vite-plugin-pwa
- [ ] Add Capacitor Android platform

### Medium Term
- [ ] Add @capacitor-community/sqlite for SQLite + FTS5
- [ ] Create db/schema.ts with FTS5 virtual tables
- [ ] Implement db/repository.ts for typed data access
- [ ] Implement db/fts.ts for BM25 search queries
- [ ] Add @capacitor/geolocation for "Near Me" feature
- [ ] Add @capacitor/share for native sharing
- [ ] Implement search history in SQLite
- [ ] Add RTL support for Arabic locale
- [ ] Upgrade maps to Mapbox GL JS
- [ ] Add Zod validation for all content imports

### Pre-Launch
- [ ] Add error boundaries to all pages
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (axe-core)
- [ ] Content review and proofreading
- [ ] Test on real devices (iOS + Android)
- [ ] App Store / Play Store submission preparation

### Post-Launch
- [ ] Crash reporting integration (Sentry)
- [ ] Simple analytics (privacy-first)
- [ ] User feedback mechanism
- [ ] Content update mechanism
- [ ] Audio for phrasebook phrases
