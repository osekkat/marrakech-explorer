import type { LucideIcon } from "lucide-react";

export interface Place {
  id: string;
  name: string;
  category: string;
  area: string;
  price: string;
  rating: number;
  hours?: string;
  description: string;
  familyFriendly?: boolean;
}

export interface POI {
  id: string;
  name: string;
  category: string;
  area: string;
  rating: number;
  lat: number;
  lng: number;
  description: string;
}

export interface Pick {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  whyWeLove: string;
  tips: string[];
  imageKey: string;
  rating: number;
  lastVerifiedAt: string;
}

export interface ItineraryItem {
  time: string;
  place: string;
  detail: string;
}

export interface Itinerary {
  title: string;
  items: ItineraryItem[];
}

export interface Duration {
  id: string;
  iconName: "Sun" | "Clock" | "Calendar" | "Plane";
  label: string;
  subtitle: string;
}

export interface Highlight {
  id: string;
  title: string;
  desc: string;
  imageKey: string;
  to: string;
}

export interface QuickLink {
  iconName: "Calendar" | "Heart" | "Map" | "Lightbulb";
  label: string;
  to: string;
  color: string;
}

export interface ArrivalChecklistItem {
  icon: string;
  text: string;
}

export interface EssentialPhrase {
  phrase: string;
  meaning: string;
}

export interface TipSection {
  iconName: string;
  title: string;
  content: string[];
}

export interface EmergencyContact {
  key: string;
  number: string;
  icon: string;
}

export interface EmergencyPhrase {
  en: string;
  ar: string;
  fr: string;
}

export interface CategoryConfig {
  key: string;
  iconName: string;
  color: string;
}
