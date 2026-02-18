import type { EmergencyContact, EmergencyPhrase } from "./types";
import emergencyData from "./emergency.json";

export const emergencyContacts: EmergencyContact[] = emergencyData.emergencyContacts as EmergencyContact[];
export const emergencyPhrases: EmergencyPhrase[] = emergencyData.emergencyPhrases as EmergencyPhrase[];
