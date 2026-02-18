import uiStringsData from "./ui-strings.json";

export interface ArrivalToolLink {
  iconName: "CreditCard" | "Phone" | "BookOpen";
  labelKey: string;
  to: string;
}

export const arrivalToolLinks: ArrivalToolLink[] = uiStringsData.arrivalToolLinks as ArrivalToolLink[];
export const uiStrings = uiStringsData.uiStrings;
