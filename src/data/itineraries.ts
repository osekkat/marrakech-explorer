import type {
  Duration,
  Itinerary,
  Highlight,
  QuickLink,
  ArrivalChecklistItem,
  EssentialPhrase,
  Locale,
} from "./types";
import itinerariesData from "./itineraries.json";
import { placesI18n } from "./places";

export const quickLinks: QuickLink[] = itinerariesData.quickLinks as QuickLink[];
export const highlights: Highlight[] = itinerariesData.highlights as Highlight[];
export const durations: Duration[] = itinerariesData.durations as Duration[];
export const arrivalChecklist: ArrivalChecklistItem[] = itinerariesData.arrivalChecklist as ArrivalChecklistItem[];
export const essentialPhrases: EssentialPhrase[] = itinerariesData.essentialPhrases as EssentialPhrase[];

// New itinerary data structure
export const itineraries: Itinerary[] = itinerariesData.itineraries as Itinerary[];

/**
 * Get itineraries for a specific locale
 */
export function getItineraries(locale: Locale = "en"): Itinerary[] {
  return itineraries.filter((i) => i.locale === locale);
}

/**
 * Get itineraries by duration type
 */
export function getItinerariesByDuration(
  durationType: "1day" | "weekend" | "long-weekend" | "1week",
  locale: Locale = "en"
): Itinerary[] {
  return itineraries.filter(
    (i) => i.durationType === durationType && i.locale === locale
  );
}

/**
 * Get a single itinerary by ID
 */
export function getItineraryById(id: string): Itinerary | undefined {
  return itineraries.find((i) => i.id === id);
}

/**
 * Helper to get place name from placeId
 */
function getPlaceName(placeId: string): string {
  if (!placeId) return "Day Trip";
  const i18n = placesI18n.find((p) => p.placeId === placeId && p.locale === "en");
  return i18n?.name ?? placeId;
}

// Legacy export for backward compatibility (converts new format to old format)
export const itineraryData: Record<string, { title: string; items: { time: string; place: string; detail: string }[] }> = 
  itineraries.reduce((acc, itinerary) => {
    const legacyKey = itinerary.durationType === "long-weekend" ? "long" : 
                       itinerary.durationType === "1week" ? "week" : itinerary.durationType;
    acc[legacyKey] = {
      title: itinerary.title,
      items: itinerary.days.flatMap((day) =>
        day.stops.map((stop) => ({
          time: itinerary.days.length > 1 ? `Day ${day.dayNumber}` : stop.timeSlot.split(" - ")[0],
          place: getPlaceName(stop.placeId),
          detail: stop.notes,
        }))
      ),
    };
    return acc;
  }, {} as Record<string, { title: string; items: { time: string; place: string; detail: string }[] }>);
