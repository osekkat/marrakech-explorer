import type {
  Duration,
  Itinerary,
  Highlight,
  QuickLink,
  ArrivalChecklistItem,
  EssentialPhrase,
} from "./types";
import itinerariesData from "./itineraries.json";

export const quickLinks: QuickLink[] = itinerariesData.quickLinks as QuickLink[];
export const highlights: Highlight[] = itinerariesData.highlights as Highlight[];
export const durations: Duration[] = itinerariesData.durations as Duration[];
export const itineraryData: Record<string, Itinerary> = itinerariesData.itineraryData as Record<string, Itinerary>;
export const arrivalChecklist: ArrivalChecklistItem[] = itinerariesData.arrivalChecklist as ArrivalChecklistItem[];
export const essentialPhrases: EssentialPhrase[] = itinerariesData.essentialPhrases as EssentialPhrase[];
