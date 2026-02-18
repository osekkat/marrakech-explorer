import type { TipSection, Locale } from "./types";
import tipsData from "./tips.json";

export const allTips: TipSection[] = tipsData.tips as TipSection[];

/**
 * Get tips for a specific locale
 */
export function getTips(locale: Locale = "en"): TipSection[] {
  return allTips.filter((tip) => tip.locale === locale);
}

/**
 * Get tips by safety level
 */
export function getTipsBySafetyLevel(
  safetyLevel: "general" | "important" | "critical",
  locale: Locale = "en"
): TipSection[] {
  return allTips.filter(
    (tip) => tip.safetyLevel === safetyLevel && tip.locale === locale
  );
}

/**
 * Get a single tip by ID
 */
export function getTipById(id: string): TipSection | undefined {
  return allTips.find((tip) => tip.id === id);
}

// Legacy export for backward compatibility
export const tips: TipSection[] = getTips("en");
