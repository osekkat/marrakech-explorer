import scamsData from "./scams.json";

export interface ScamTip {
  icon: string;
  label: string;
  content: string;
}

export const scamsTips: ScamTip[] = scamsData.scamsTips as ScamTip[];
export const scamsSectionTitle: string = scamsData.scamsSectionTitle;
export const sosButtonText: string = scamsData.sosButtonText;
// Backwards compatibility alias (fixing typo)
export const sosButtOnText: string = scamsData.sosButtonText;
