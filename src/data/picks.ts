import type { Pick, Locale, PickCategory } from "./types";
import picksData from "./picks.json";

export const allPicks: Pick[] = picksData.picks as Pick[];

/**
 * Get picks for a specific locale
 */
export function getPicks(locale: Locale = "en"): Pick[] {
  return allPicks.filter((pick) => pick.locale === locale);
}

/**
 * Get picks by category
 */
export function getPicksByCategory(
  category: PickCategory,
  locale: Locale = "en"
): Pick[] {
  return allPicks.filter(
    (pick) => pick.category === category && pick.locale === locale
  );
}

/**
 * Get a single pick by ID
 */
export function getPickById(id: string): Pick | undefined {
  return allPicks.find((pick) => pick.id === id);
}

// Legacy export for backward compatibility
export const picks: Pick[] = getPicks("en");
