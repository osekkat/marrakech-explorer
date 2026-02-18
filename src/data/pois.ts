import type { POI, CategoryConfig } from "./types";
import poisData from "./pois.json";

export const categoryConfig: CategoryConfig[] = poisData.categoryConfig as CategoryConfig[];
export const pois: POI[] = poisData.pois as POI[];
