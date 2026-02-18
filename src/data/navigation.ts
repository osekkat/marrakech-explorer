export interface NavItem {
  path: string;
  iconName: "Compass" | "Heart" | "Map" | "MapPin" | "Lightbulb";
  labelKey: string;
}

export const navItems: NavItem[] = [
  { path: "/", iconName: "Compass", labelKey: "nav.home" },
  { path: "/picks", iconName: "Heart", labelKey: "nav.picks" },
  { path: "/explore", iconName: "Map", labelKey: "nav.explore" },
  { path: "/maps", iconName: "MapPin", labelKey: "nav.maps" },
  { path: "/toolkit", iconName: "Lightbulb", labelKey: "nav.tips" },
];
