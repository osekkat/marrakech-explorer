import heroImage from "@/assets/hero-marrakech3.jpg";
import jemaaImage from "@/assets/jemaa-el-fna.jpg";
import riadImage from "@/assets/riad-courtyard.jpg";
import spiceImage from "@/assets/spice-souk.jpg";
import mintTeaImage from "@/assets/mint-tea.jpg";
import bahiaImage from "@/assets/bahia-palace.jpg";
import benYoussefImage from "@/assets/BenYoussefMedersa.jpg";
import koutoubiaImage from "@/assets/koutoubia.jpeg";
import badiPalaceImage from "@/assets/el-badi-palace.jpg";
import almoravidKoubbaImage from "@/assets/almoravid-koubba.jpg";
import saadianTombsImage from "@/assets/saadian-tombs.webp";
import femmeArtisaneImage from "@/assets/femme-artisane.png";
import blaouiImage from "@/assets/blaoui.webp";
import nomadesImage from "@/assets/nomades-marrakech.webp";
import majorelleImage from "@/assets/le-jardin-majorelle.jpg";
import naturomImage from "@/assets/naturom.png";
import rahbaKedimaImage from "@/assets/Rahba-Kedima.jpg";

export const images = {
  hero: heroImage,
  jemaa: jemaaImage,
  riad: riadImage,
  spice: spiceImage,
  mintTea: mintTeaImage,
  bahia: bahiaImage,
  benYoussef: benYoussefImage,
  koutoubia: koutoubiaImage,
  badiPalace: badiPalaceImage,
  almoravidKoubba: almoravidKoubbaImage,
  saadianTombs: saadianTombsImage,
  femmeArtisane: femmeArtisaneImage,
  blaoui: blaouiImage,
  nomades: nomadesImage,
  majorelle: majorelleImage,
  naturom: naturomImage,
  rahbaKedima: rahbaKedimaImage,
} as const;

export type ImageKey = keyof typeof images;

export function getImage(key: string): string {
  return images[key as ImageKey] ?? images.hero;
}
