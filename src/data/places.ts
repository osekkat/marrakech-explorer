import type { Place } from "./types";
import placesData from "./places.json";

export const categories = placesData.categories;
export const neighborhoods = placesData.neighborhoods;
export const places: Place[] = placesData.places as Place[];
