import heroImage from "@/assets/hero-marrakech.jpg";
import jemaaImage from "@/assets/jemaa-el-fna.jpg";
import riadImage from "@/assets/riad-courtyard.jpg";
import spiceImage from "@/assets/spice-souk.jpg";
import mintTeaImage from "@/assets/mint-tea.jpg";
import bahiaImage from "@/assets/bahia-palace.jpg";

export const images = {
  hero: heroImage,
  jemaa: jemaaImage,
  riad: riadImage,
  spice: spiceImage,
  mintTea: mintTeaImage,
  bahia: bahiaImage,
} as const;

export type ImageKey = keyof typeof images;

export function getImage(key: string): string {
  return images[key as ImageKey] ?? images.hero;
}
