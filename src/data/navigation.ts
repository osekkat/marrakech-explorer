import navigationData from "./navigation.json";

export interface NavItem {
  path: string;
  iconName: "Compass" | "Heart" | "Map" | "MapPin" | "Lightbulb";
  labelKey: string;
}

export const navItems: NavItem[] = navigationData.navItems as NavItem[];
