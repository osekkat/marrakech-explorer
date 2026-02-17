import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Heart, Star } from "lucide-react";
import bahiaImage from "@/assets/bahia-palace.jpg";
import jemaaImage from "@/assets/jemaa-el-fna.jpg";
import riadImage from "@/assets/riad-courtyard.jpg";
import spiceImage from "@/assets/spice-souk.jpg";
import mintTeaImage from "@/assets/mint-tea.jpg";

const picks = [
  {
    category: "Architecture",
    title: "Bahia Palace",
    desc: "A masterpiece of Moroccan craftsmanship — intricate zellige, carved cedar ceilings, and serene courtyards.",
    image: bahiaImage,
    rating: 4.8,
  },
  {
    category: "Experience",
    title: "Sunset at Jemaa el-Fna",
    desc: "Watch the world's greatest open-air show unfold — storytellers, musicians, snake charmers, and the aroma of grilled meats.",
    image: jemaaImage,
    rating: 4.9,
  },
  {
    category: "Stay",
    title: "Riad Experience",
    desc: "Sleep in a traditional courtyard house with zellige fountains, rooftop terraces, and genuine Moroccan hospitality.",
    image: riadImage,
    rating: 4.7,
  },
  {
    category: "Shopping",
    title: "The Spice Souks",
    desc: "Navigate mountains of saffron, cumin, and ras el hanout in the most photogenic market you'll ever visit.",
    image: spiceImage,
    rating: 4.6,
  },
  {
    category: "Cuisine",
    title: "Moroccan Mint Tea",
    desc: "The ritual of 'Berber whiskey' — sweet, fragrant, and poured from a spectacular height. Accept every invitation.",
    image: mintTeaImage,
    rating: 4.9,
  },
];

const Picks = () => {
  return (
    <div>
      <PageHeader title="Our Picks" subtitle="Coup de cœur — the best Marrakech has to offer" />

      <div className="px-5 space-y-5">
        {picks.map(({ category, title, desc, image, rating }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl overflow-hidden shadow-card"
          >
            <div className="relative h-48">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {category}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/60 backdrop-blur-sm">
                <Star className="w-3 h-3 fill-gold text-gold" />
                <span className="text-xs font-medium text-sand-light">{rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Picks;
