# Marrakech Explorer

An offline-first travel companion app for visitors to Marrakech, Morocco. Discover curated recommendations, explore neighborhoods, navigate with offline maps, and access essential travel tools—all without requiring an internet connection.

## Features

- **Our Picks** — Curated recommendations for architecture, cuisine, shopping, and hidden gems
- **Explore** — Browse places by category and neighborhood with smart search (diacritic-aware)
- **Maps** — Interactive map with points of interest markers
- **Toolkit** — Travel tips, safety information, scam warnings, and emergency SOS
- **Weather** — Real-time weather for Marrakech with caching
- **Multi-language** — English and French support with extensible i18n structure
- **Dark Mode** — Theme switching with system preference detection
- **Favorites** — Save places locally for quick access
- **Mobile-First** — Designed for smartphones with smooth page transitions

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui (Radix UI primitives) |
| **Routing** | React Router DOM 6 |
| **Animations** | Framer Motion |
| **Mobile** | Capacitor (iOS & Android) |
| **i18n** | i18next, react-i18next |
| **State** | React Hooks, TanStack Query |
| **Forms** | React Hook Form, Zod |
| **Testing** | Vitest, Testing Library |

## Getting Started

### Prerequisites

- Node.js 18+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/marrakech-explorer.git
cd marrakech-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── pages/              # Route components
│   ├── Index.tsx       # Home with hero, weather, quick links
│   ├── Picks.tsx       # Curated recommendations list
│   ├── PickDetail.tsx  # Individual pick details
│   ├── Explore.tsx     # Places browser with search/filter
│   ├── Maps.tsx        # Interactive map view
│   ├── Toolkit.tsx     # Tips, safety, emergency SOS
│   └── Settings.tsx    # Language, theme, accessibility
│
├── components/         # Reusable UI components
│   ├── MobileLayout.tsx    # Main layout wrapper
│   ├── BottomNav.tsx       # Navigation bar
│   ├── WeatherWidget.tsx   # Weather display
│   ├── EmergencySheet.tsx  # Emergency contacts sheet
│   └── ui/                 # shadcn/ui components
│
├── data/              # Static content & type definitions
│   ├── types.ts       # TypeScript interfaces
│   ├── places.json    # Places data with i18n
│   ├── picks.json     # Curated picks
│   ├── pois.json      # Map points of interest
│   ├── itineraries.json   # Trip itineraries
│   ├── phrases.json   # Essential Arabic phrases
│   └── tips.json      # Travel advice
│
├── hooks/             # Custom React hooks
│   ├── useFavorites.ts    # Favorites with localStorage
│   └── useWeather.ts      # Weather API integration
│
├── i18n/              # Internationalization
│   ├── en.json        # English translations
│   └── fr.json        # French translations
│
├── assets/            # Images and static assets
└── lib/               # Utility functions
```

## Mobile Development

The app uses [Capacitor](https://capacitorjs.com/) for native mobile deployment.

### iOS

```bash
# Build web assets
npm run build

# Sync with iOS project
npx cap sync ios

# Open in Xcode
npx cap open ios
```

### Android

```bash
# Generate Android project (first time only)
npx cap add android

# Build and sync
npm run build
npx cap sync android

# Open in Android Studio
npx cap open android
```

## Data Architecture

The app uses a dual-structure approach for internationalization:

**Base Data** — Language-independent fields:
- ID, slug, category, coordinates, neighborhood
- Price range, rating, images, hours, contacts

**I18n Data** — Language-specific content:
- Name, description, tips, search keywords
- Per locale (en, fr, etc.)

This separation allows efficient content translation without duplicating structural data.

## API Integrations

| Service | Purpose | Auth |
|---------|---------|------|
| [Open-Meteo](https://open-meteo.com/) | Weather forecasts | None (free) |

Weather data is cached in sessionStorage to minimize API calls.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Place detail pages (`/place/:id`)
- [ ] Itinerary detail pages (`/itinerary/:id`)
- [ ] Leaflet.js map integration
- [ ] PWA support with service worker
- [ ] SQLite + FTS5 for offline search
- [ ] Geolocation "Near Me" feature
- [ ] Android app publication

## License

This project is private and proprietary.

---

Built with care for travelers exploring the magic of Marrakech.
