import type { Place, PlaceBase, PlaceI18n, PlaceCategory, Locale } from "./types";
import placesData from "./places.json";

export const categories: PlaceCategory[] = placesData.categories as PlaceCategory[];
export const neighborhoods: string[] = placesData.neighborhoods;
export const placesBase: PlaceBase[] = placesData.placesBase as PlaceBase[];
export const placesI18n: PlaceI18n[] = placesData.placesI18n as PlaceI18n[];

/**
 * Get places for a specific locale by merging base data with i18n data
 */
export function getPlaces(locale: Locale = "en"): Place[] {
  return placesBase.map((base) => {
    const i18n = placesI18n.find(
      (t) => t.placeId === base.id && t.locale === locale
    );
    if (!i18n) {
      const fallback = placesI18n.find(
        (t) => t.placeId === base.id && t.locale === "en"
      );
      return { ...base, ...(fallback ?? { placeId: base.id, locale: "en", name: base.id, description: "" }) };
    }
    return { ...base, ...i18n };
  });
}

/**
 * Get a single place by ID for a specific locale
 */
export function getPlaceById(id: string, locale: Locale = "en"): Place | undefined {
  const base = placesBase.find((p) => p.id === id);
  if (!base) return undefined;

  const i18n = placesI18n.find(
    (t) => t.placeId === id && t.locale === locale
  ) ?? placesI18n.find(
    (t) => t.placeId === id && t.locale === "en"
  );

  if (!i18n) {
    return { ...base, placeId: base.id, locale: "en", name: base.id, description: "" };
  }

  return { ...base, ...i18n };
}

// Legacy export for backward compatibility
export const places: Place[] = getPlaces("en");
