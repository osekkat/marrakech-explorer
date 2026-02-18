# Marrakech Compass Plan Revisions

This document captures the baseline deltas (plan vs. implementation), architecture upgrades with acceptance criteria, and rationale for each change applied to [plan.md](plan.md).

---

## Part 1: Baseline Deltas (Plan Claims vs. Actual Implementation)

### Contradictions and Inaccuracies

| Plan Claim | Actual State | Resolution |
|------------|--------------|------------|
| "Android ready" (Tech Stack) | `android/` folder does not exist; only `ios/` present | Clarify: "Android: Capacitor can generate; run `npx cap add android` when ready" |
| "Near Me chip uses device location (Phase 2)" | "Near Me" chip not present in Explore neighborhood filters; Explore uses neighborhoods: All, Medina, Gueliz, etc. | Add: "Phase 1: 'Near Me' chip disabled or grayed; Phase 2: enabled with Geolocation" |
| Share "Phase 3" | Explore and Picks already use `navigator.share` (Web Share API) | Clarify: "Phase 3 adds Capacitor Share for native integration; Web Share API already in use" |
| ContentManifest simple (version, checksum, locales) | [types.ts](src/data/types.ts) has richer schema: sequence, signature, minAppVersion, packChecksums, signingKeyIndex | Align plan ContentManifest with types.ts or document extended schema for Phase 3 |
| "Copy-to-clipboard for numbers" ⏳ | [EmergencySheet.tsx](src/components/EmergencySheet.tsx) implements Copy button for numbers | Mark as implemented |
| "Family-friendly badge" ⏳ | [Explore.tsx](src/pages/Explore.tsx) shows family-friendly badge via `accessibilityTags` | Mark as implemented |
| "locales/en.json" structure | Actual: `src/i18n/en.json`, `src/i18n/fr.json` (no `locales/` subfolder) | Align Project Structure with actual paths |
| Explore uses SQLite | Explore uses `places` from [places.ts](src/data/places.ts) (JSON); no SQLite | Architecture diagram: Explore → ReactState + JSON; SQLite only in Phase 2 |
| TanStack Query used for server state | Only QueryClientProvider in [App.tsx](src/App.tsx); no `useQuery`/`useMutation` usage | Clarify: "TanStack Query available; currently used for provider only; expand when adding async data" |
| Zustand "when needed" | Not installed; no Zustand in package.json | Keep as planned; add decision criteria for when to introduce |
| Zod "expand usage" | Zod installed but not used in data layer (no validation on JSON imports) | Retain as Phase 1/Medium Term task |

### Content and Data Gaps

- **Places/Picks locale**: `places.json` and `picks.json` contain only `locale: "en"`; no French content rows. Plan says "i18n with EN/FR" for UI; content is EN-only.
- **Explore/Picks data source**: Explore uses `places` (legacy export `getPlaces("en")`); Picks uses `picks`; Maps uses `pois` (derived from places). Plan should document migration from POI/places duplication to unified Place model.
- **Quick Links "Plan Trip"**: Links to `/itineraries` but no `/itineraries` route exists; plan should add route or change link to home Plan section.
- **Share URLs**: Use `https://marrakechcompass.app/place/${id}` but `/place/:id` route does not exist yet.

### Missing or Incomplete Areas

- **No `useOfflineStatus`**: Plan mentions it as ⏳; not implemented.
- **No `useLocale`**: Pages hardcode `getPlaces("en")` or use `places`/`picks`; language switch changes UI strings but not content locale.
- **No code splitting**: All routes imported synchronously in App.tsx; no React.lazy.
- **No error boundaries**: Plan mentions them as Pre-Launch; none implemented.
- **No PWA**: vite-plugin-pwa not installed; no service worker.
- **No CI/CD**: No GitHub Actions or deployment pipeline.
- **SEO**: index.html has placeholder "Lovable App" title and description.
- **TypeScript**: strict mode disabled; noImplicitAny, strictNullChecks off.

---

## Part 2: Architecture Upgrades and Acceptance Criteria

### Upgrade 1: MVP Definition

**Rationale**: Unclear boundary between "Current State," "Phase 1," and "MVP" leads to scope creep and ambiguous completion criteria.

**Acceptance criteria**:
- MVP includes: 7 existing screens + PlaceDetail + ItineraryDetail + Leaflet map + PWA (service worker + manifest)
- MVP excludes: SQLite/FTS5, geolocation "Near Me," Mapbox, Android, OTA updates
- Phase 1 complete when: All MVP items done, Lighthouse PWA >85, basic offline verified

### Upgrade 2: Weather Offline Behavior

**Rationale**: Weather widget uses Open-Meteo API; app is "fully offline" from content perspective. Users need explicit offline behavior.

**Acceptance criteria**:
- Cache last successful response in sessionStorage (or Capacitor Preferences on native) with 1h TTL
- When offline or API fails: show cached data with "Last updated: [time]" or placeholder "Weather unavailable offline"
- Service worker (Phase 1) can cache weather response with stale-while-revalidate

### Upgrade 3: Content Pack Structure

**Rationale**: Plan references "content pack" and `basePath` but no layout or build process is defined.

**Acceptance criteria**:
- Define directory layout: `public/images/places/`, `src/data/*.json`
- Image resolution: `basePath` → `/images/places/{id}-1.jpg` or similar
- Build: no separate pack; images in public/ or assets; JSON bundled at build

### Upgrade 4: Locale Fallback Chain

**Rationale**: Plan mentions fallback chain but implementation uses simple `fallbackLng: 'en'` and content helpers default to "en"; no device locale detection for content.

**Acceptance criteria**:
- Chain: user-selected → device locale (if supported) → "fr" → "en"
- On missing content for locale: show English with "[Content in English]" indicator
- Implement in `useLocale` or i18n + content helpers

### Upgrade 5: State Management Guidelines

**Rationale**: "Zustand when needed" is vague; leads to inconsistent state patterns.

**Acceptance criteria**:
- Use React hooks for component-local state
- Use Zustand when: state shared across routes, persists across navigation, complex actions
- Use TanStack Query for server/cache state when adding async APIs

### Upgrade 6: Code Splitting Strategy

**Rationale**: All routes loaded upfront; cold start and bundle size suffer.

**Acceptance criteria**:
- Route-based splitting via React.lazy + Suspense
- Main bundle: React, Router, i18n, shared UI
- Map libraries loaded only on Maps route
- Target: main <150KB gzip, route chunks <50KB each

### Upgrade 7: SQLite Initialization and Migrations

**Rationale**: Phase 2 introduces SQLite; no migration or recovery strategy.

**Acceptance criteria**:
- Versioned schema; migrations run on app update
- On migration failure: log, offer "Reset database" (preserve user data separately)
- First run: create DB, seed from bundled JSON

### Upgrade 8: Service Worker Update Strategy

**Rationale**: PWA plan does not specify how updates are applied or rolled back.

**Acceptance criteria**:
- Use skipWaiting for web; on native, SW updates with app
- Version check on launch; "Update available" banner
- Keep previous SW for 2 app versions for rollback

### Upgrade 9: Security and Privacy Section

**Rationale**: No plan section for API keys, deep links, content signing, or privacy.

**Acceptance criteria**:
- API keys via env vars; never committed
- Deep link validation: sanitize URL params
- Parameterized SQLite queries
- Privacy: favorites/notes local only; document in policy
- Content signing: document if OTA uses signatures (types.ts schema)

### Upgrade 10: Build and Deployment

**Rationale**: No build pipeline, env config, or deployment steps.

**Acceptance criteria**:
- Build: `npm run build`; env vars for API keys
- Capacitor: `npx cap sync` after build
- CI: lint, typecheck, test, build on PR/push
- Web: static hosting (Vercel/Netlify) with env

### Upgrade 11: App Store Preparation

**Rationale**: Phase 2 includes "Publish to App Store and Play Store" but no checklist.

**Acceptance criteria**:
- Checklist: screenshots, descriptions, privacy policy URL, age rating, support URL
- PWA: manifest completeness, offline verification

### Upgrade 12: Testing Matrix and Content Validation

**Rationale**: Testing strategy lacks offline, device, and content validation detail.

**Acceptance criteria**:
- Offline: service worker, cache, SQLite without network
- Device matrix: iPhone 12 (iOS 15+), Pixel 6 (Android 12+), iPad
- Content validation CI: Zod schema, referential integrity, image existence, translation completeness

### Upgrade 13: Align Emergency/EmergencyContact Types

**Rationale**: Plan shows EmergencyContact with id, name, number, description, icon; [types.ts](src/data/types.ts) uses key, number, icon; [emergency.json](src/data/emergency.json) matches types.ts.

**Acceptance criteria**: Update plan EmergencyContact to match implementation (key, number, icon).

### Upgrade 14: Fix Architecture Diagram

**Rationale**: Explore currently uses JSON via places.ts, not SQLite.

**Acceptance criteria**: Diagram: Explore → ReactState + JSON (Phase 1); Explore → SQLite (Phase 2).

---

## Part 3: Summary of Applied Edits (Git-Diff Style)

All edits have been applied to [plan.md](plan.md). Key changes:

```
+ MVP Definition section (Phase 1 exit criteria)
+ Architecture: Explore → JSON (Phase 1); note on Phase 2 SQLite
+ State Management Guidelines
+ Tech Stack: Android clarification; TanStack Query; Storage note
+ Project Structure: i18n paths (en.json, fr.json at root of i18n/)
+ Content Data Models: locale fallback chain; EmergencyContact/EmergencyPhrase aligned with implementation; ContentManifest note
+ Content Pack Structure section
+ Feature: weather offline behavior; Near Me chip Phase 1/2; Place Cards family-friendly/copy implemented; Emergency copy & share implemented
+ Offline: Service Worker update strategy; SQLite init & migrations
+ Performance: Code splitting strategy detail
+ Security & Privacy section
+ Testing: Offline & device testing matrix
+ Build & Deployment section
+ App Store Preparation section
+ Roadmap: Phase completion criteria; useLocale / content-locale wiring in Short Term
+ Quick Links note on /itineraries route
+ i18n: places/picks content EN-only note
```
