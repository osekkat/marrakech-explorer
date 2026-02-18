import type { Phrase, Locale } from "./types";
import phrasesData from "./phrases.json";

export const allPhrases: Phrase[] = phrasesData.phrases as Phrase[];

/**
 * Get phrases for a specific locale
 */
export function getPhrases(locale: Locale = "en"): Phrase[] {
  return allPhrases.filter((phrase) => phrase.locale === locale);
}

/**
 * Get phrases by category
 */
export function getPhrasesByCategory(
  category: "greeting" | "shopping" | "directions" | "food" | "emergency" | "transport" | "courtesy",
  locale: Locale = "en"
): Phrase[] {
  return allPhrases.filter(
    (phrase) => phrase.category === category && phrase.locale === locale
  );
}

/**
 * Get a single phrase by ID
 */
export function getPhraseById(id: string): Phrase | undefined {
  return allPhrases.find((phrase) => phrase.id === id);
}

// Legacy export for backward compatibility
export const phrases: Phrase[] = getPhrases("en");
