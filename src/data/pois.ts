import type { POI, CategoryConfig, Locale } from "./types";
import { placesBase, placesI18n } from "./places";
import poisData from "./pois.json";

export const categoryConfig: CategoryConfig[] = poisData.categoryConfig as CategoryConfig[];

/**
 * Get POIs for map display, derived from places data
 */
export function getPois(locale: Locale = "en"): POI[] {
  return placesBase.map((place) => {
    const i18n = placesI18n.find(
      (t) => t.placeId === place.id && t.locale === locale
    ) ?? placesI18n.find(
      (t) => t.placeId === place.id && t.locale === "en"
    );

    return {
      id: place.id,
      name: i18n?.name ?? place.id,
      category: place.category,
      area: place.neighborhood,
      rating: place.rating ?? 0,
      lat: place.coordinates.lat,
      lng: place.coordinates.lng,
      description: i18n?.description ?? "",
    };
  });
}

// Legacy export for backward compatibility
export const pois: POI[] = getPois("en");
