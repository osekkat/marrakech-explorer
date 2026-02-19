# Expo Migration - Baseline & Parity Checklist

This document tracks the migration from React + Vite + Capacitor to Expo (React Native).

## Phase 0: Baseline Established

### Route Parity Checklist

| Route | Path | Key Features | Parity Status |
|-------|------|--------------|---------------|
| Index (Home) | `/` | Hero image, weather widget, quick links, itinerary selector, arrival mode, highlights carousel | ✅ Complete |
| Picks | `/picks` | List of curated picks, favorites, share | ✅ Complete |
| Pick Detail | `/picks/:id` | Dynamic params, hero image, directions link, share, favorite | ✅ Complete |
| Explore | `/explore` | Search, category/neighborhood filters, favorites, share | ✅ Complete |
| Maps | `/maps` | Placeholder map, POI markers, category filters, search | ✅ Complete |
| Toolkit | `/toolkit` | Accordion tips, scams section, emergency SOS button | ✅ Complete |
| Settings | `/settings` | Language toggle, theme toggle, reduce motion, clear cache | ✅ Complete |
| Not Found | `*` | 404 page with link home | ✅ Complete |

### Persistence Keys Inventory

All keys that must be migrated from localStorage/sessionStorage to AsyncStorage:

| Key | Storage | Used By | Data Type | Migration Priority |
|-----|---------|---------|-----------|-------------------|
| `picks-favorites` | localStorage | Picks.tsx, PickDetail.tsx | `string[]` (JSON) | High |
| `explore-favorites` | localStorage | Explore.tsx | `string[]` (JSON) | High |
| `map-favorites` | localStorage | Maps.tsx | `string[]` (JSON) | High |
| `itinerary-favorites` | localStorage | Index.tsx | `string[]` (JSON) | High |
| `theme` | localStorage | Settings.tsx | `"light" \| "dark" \| "system"` | High |
| `reduce-motion` | localStorage | Settings.tsx | `"true" \| "false"` | Medium |
| `app-language` | localStorage | Settings.tsx | `"en" \| "fr"` | High |
| `weather-data` | sessionStorage | useWeather.ts | `WeatherData` (JSON) | Low (ephemeral) |

### Critical User Journeys

1. **Browse and Favorite a Pick**
   - Home -> Picks -> Pick Detail -> Tap favorite -> Verify persisted -> Restart app -> Verify still favorited

2. **Explore and Filter Places**
   - Home -> Explore -> Search for "riad" -> Filter by neighborhood -> Filter by category -> Share place

3. **Emergency Assistance**
   - Home -> Toolkit -> Open Emergency Sheet -> Copy phone number -> Share location -> Make phone call

4. **Settings Persistence**
   - Settings -> Change language to French -> Verify UI updates -> Change theme to dark -> Restart app -> Verify both persist

5. **Navigation Flow**
   - Home -> Picks -> Pick Detail -> Back -> Explore -> Maps -> Toolkit -> Settings -> Home (via bottom nav)

### Components to Port (Active Usage Only)

#### Layout & Navigation
- [x] `MobileLayout.tsx` - Root layout with outlet and bottom nav
- [x] `BottomNav.tsx` - Tab bar navigation

#### Shared Components
- [x] `PageHeader.tsx` - Page title component
- [x] `WeatherWidget.tsx` - Weather display
- [x] `EmergencySheet.tsx` - Emergency contacts modal
- [x] `SectionCard.tsx` - Card with image and link

#### Hooks
- [x] `useFavorites.ts` - Favorites persistence
- [x] `useWeather.ts` - Weather data fetching

#### Pages (8 total)
- [x] `Index.tsx` - Home page
- [x] `Picks.tsx` - Picks list
- [x] `PickDetail.tsx` - Pick detail
- [x] `Explore.tsx` - Places explorer
- [x] `Maps.tsx` - Map view
- [x] `Toolkit.tsx` - Travel tips
- [x] `Settings.tsx` - App settings
- [x] `NotFound.tsx` - 404 page

### Files NOT to Port

- All 32 `src/components/ui/*.tsx` files (unused shadcn scaffold)
- `src/hooks/use-mobile.tsx` (only used by unused sidebar)
- `src/hooks/use-toast.ts` (no active toast calls)
- `src/components/NavLink.tsx` (not imported)

---

## CI Quality Gates

GitHub Actions workflow to be created at `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit
      
      - name: Test
        run: npm test
      
      - name: Build
        run: npm run build
```

---

## Migration Progress

- [x] Phase 0: Baseline & Guardrails (this document + CI)
- [x] Phase 1: Expo Foundation
- [x] Phase 2: Data + Platform Adapters (storage.ts, platform.ts, useFavorites.ts)
- [x] Phase 3: Screen Migration (all 8 screens ported)
- [x] Phase 4: Styling + Motion Parity (image assets, EmergencySheet, WeatherWidget)
- [x] Phase 5: Release Safety & Cutover (tested on iOS simulator)

## Phase 3 Screen Migration Status

| Screen | File | Status | Notes |
|--------|------|--------|-------|
| Home | `app/(tabs)/index.tsx` | ✅ Complete | Hero, quick links, itinerary selector, arrival mode |
| Picks | `app/(tabs)/picks.tsx` | ✅ Complete | List with favorites, animations |
| Pick Detail | `app/picks/[id].tsx` | ✅ Complete | Dynamic route, directions, share |
| Explore | `app/(tabs)/explore.tsx` | ✅ Complete | Search, category/neighborhood filters |
| Maps | `app/(tabs)/maps.tsx` | ✅ Complete | Placeholder with POI markers |
| Toolkit | `app/(tabs)/toolkit.tsx` | ✅ Complete | Accordion tips, scams section |
| Settings | `app/settings.tsx` | ✅ Complete | Language, theme, clear cache |
| Not Found | `app/+not-found.tsx` | ✅ Complete | 404 with home link |

## Phase 1 Deliverables (Complete)

**New Expo Project**: `/Users/osekkat/marrakechCompass4/marrakech-expo`

### Dependencies Installed
- `expo@54`, `expo-router@6`
- `nativewind@4`, `tailwindcss@3`
- `@tanstack/react-query@5`
- `i18next`, `react-i18next`, `expo-localization`
- `@react-native-async-storage/async-storage`
- `expo-font`, `expo-linking`, `expo-sharing`, `expo-clipboard`, `expo-location`
- `react-native-reanimated@4`, `moti`
- `lucide-react-native`

### Custom Fonts Bundled
- Playfair Display (Regular, SemiBold, Bold)
- DM Sans (Regular, Medium, SemiBold, Bold)

### Route Structure
```
app/
├── _layout.tsx         # Root layout with providers
├── (tabs)/
│   ├── _layout.tsx     # Tab bar with 5 tabs
│   ├── index.tsx       # Home
│   ├── picks.tsx       # Picks list
│   ├── explore.tsx     # Explore places
│   ├── maps.tsx        # Map view
│   └── toolkit.tsx     # Travel tips
├── picks/
│   └── [id].tsx        # Pick detail
├── settings.tsx        # Settings modal
└── +not-found.tsx      # 404 page
```

### Platform Adapters Created
- `lib/platform.ts` - clipboard, share, location, phone, openUrl
- `lib/storage.ts` - AsyncStorage wrapper with typed keys
- `hooks/useFavorites.ts` - React hook for favorites persistence
- `hooks/useWeather.ts` - Weather data from Open-Meteo API
- `lib/images.ts` - Local image mapping for bundled assets

### Components Created
- `components/EmergencySheet.tsx` - Modal with emergency contacts, share location, phrases
- `components/WeatherWidget.tsx` - Live weather display

## Phase 4 & 5 Completion

### Image Assets Copied
All images from `src/assets/` copied to `assets/images/`:
- Hero: `hero-marrakech3.jpg`
- Places: `BenYoussefMedersa.jpg`, `bahia-palace.jpg`, `el-badi-palace.jpg`, `le-jardin-majorelle.jpg`, etc.
- Food: `mint-tea.jpg`, `blaoui.webp`, `nomades-marrakech.webp`

### iOS Simulator Testing
- ✅ App launches successfully on iPhone 16 Pro simulator
- ✅ Weather widget displays live data from Open-Meteo API
- ✅ Hero image and carousel images load correctly
- ✅ Tab navigation works between all 5 tabs
- ✅ Custom fonts (Playfair Display, DM Sans) render properly
- ✅ Production build (`expo export`) succeeds with all assets bundled

## Next Steps for Production

1. **Configure EAS Build**
   ```bash
   eas build:configure
   eas build --platform ios
   eas build --platform android
   ```

2. **Set up EAS Submit** for App Store / Play Store submission

3. **Add app icons and splash screen** using `expo-image` and `app.json`

4. **Enable OTA updates** with `expo-updates`

5. **Remove Capacitor from original project** once Expo is validated in production
