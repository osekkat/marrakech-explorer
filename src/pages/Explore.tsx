import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { MapPin, Star, Clock, DollarSign } from "lucide-react";

const categories = ["All", "Restaurants", "Cafés", "Museums", "Riads", "Gardens", "Shopping"];

interface Place {
  name: string;
  category: string;
  area: string;
  price: string;
  rating: number;
  hours?: string;
  description: string;
}

const places: Place[] = [
  { name: "Nomad", category: "Restaurants", area: "Medina", price: "$$", rating: 4.7, description: "Modern Moroccan cuisine with stunning rooftop views over the souks." },
  { name: "Le Jardin", category: "Restaurants", area: "Medina", price: "$$", rating: 4.6, description: "Hidden garden restaurant serving fresh, contemporary Moroccan dishes." },
  { name: "Al Fassia", category: "Restaurants", area: "Gueliz", price: "$$$", rating: 4.8, description: "Women-run institution serving the best traditional Moroccan cuisine in town." },
  { name: "Café des Épices", category: "Cafés", area: "Medina", price: "$", rating: 4.5, description: "Iconic square-side café perfect for people-watching with fresh juices." },
  { name: "Café Clock", category: "Cafés", area: "Kasbah", price: "$", rating: 4.6, description: "Cultural hub famous for its camel burger and storytelling nights." },
  { name: "BACHA Coffee", category: "Cafés", area: "Medina", price: "$$", rating: 4.7, description: "Luxurious coffee house in a restored palace — over 200 coffees to choose from." },
  { name: "Bahia Palace", category: "Museums", area: "Medina", price: "$", rating: 4.8, hours: "9:00–17:00", description: "19th-century palace showcasing the finest Moroccan architectural artistry." },
  { name: "Musée Yves Saint Laurent", category: "Museums", area: "Gueliz", price: "$$", rating: 4.7, hours: "10:00–18:00", description: "Striking terracotta museum dedicated to YSL's love affair with Marrakech." },
  { name: "Maison de la Photographie", category: "Museums", area: "Medina", price: "$", rating: 4.5, hours: "9:30–19:00", description: "Fascinating collection of vintage Moroccan photography with rooftop café." },
  { name: "Riad Yasmine", category: "Riads", area: "Medina", price: "$$$", rating: 4.9, description: "Instagram-famous riad with a stunning turquoise plunge pool and zellige tiles." },
  { name: "El Fenn", category: "Riads", area: "Medina", price: "$$$$", rating: 4.8, description: "Boutique luxury riad with rooftop pool, art collection, and impeccable design." },
  { name: "Jardin Majorelle", category: "Gardens", area: "Gueliz", price: "$$", rating: 4.7, hours: "8:00–18:00", description: "Electric-blue botanical garden created by Jacques Majorelle, restored by YSL." },
  { name: "Le Jardin Secret", category: "Gardens", area: "Medina", price: "$", rating: 4.5, hours: "9:30–18:30", description: "Hidden Islamic garden in the medina with a tower offering panoramic views." },
  { name: "Souk Semmarine", category: "Shopping", area: "Medina", price: "$–$$$", rating: 4.4, description: "The main souk artery — textiles, ceramics, leather, and everything in between." },
  { name: "33 Rue Majorelle", category: "Shopping", area: "Gueliz", price: "$$", rating: 4.6, description: "Curated concept store with contemporary Moroccan design and fashion." },
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? places : places.filter(p => p.category === activeCategory);

  return (
    <div>
      <PageHeader title="Explore" subtitle="Discover the best of Marrakech" />

      {/* Category pills */}
      <div className="px-5 mb-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Places list */}
      <div className="px-5 space-y-3">
        {filtered.map((place, i) => (
          <motion.div
            key={place.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl p-4 shadow-card"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{place.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {place.area}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    {place.price}
                  </span>
                  {place.hours && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {place.hours}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span className="text-xs font-semibold text-primary">{place.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
            <div className="mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
                {place.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Explore;
