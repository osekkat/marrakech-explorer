import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Heart, Map, Lightbulb, Star } from "lucide-react";
import heroImage from "@/assets/hero-marrakech.jpg";
import jemaaImage from "@/assets/jemaa-el-fna.jpg";
import riadImage from "@/assets/riad-courtyard.jpg";
import spiceImage from "@/assets/spice-souk.jpg";

const quickLinks = [
  { icon: Calendar, label: "Plan Trip", to: "/itineraries", color: "bg-primary/10 text-primary" },
  { icon: Heart, label: "Our Picks", to: "/picks", color: "bg-secondary/10 text-secondary" },
  { icon: Map, label: "Explore", to: "/explore", color: "bg-accent/20 text-accent-foreground" },
  { icon: Lightbulb, label: "Tips", to: "/toolkit", color: "bg-teal/10 text-teal" },
];

const highlights = [
  { title: "Jemaa el-Fna", desc: "The beating heart of the Medina", image: jemaaImage, to: "/picks" },
  { title: "Stay in a Riad", desc: "Authentic courtyard guesthouses", image: riadImage, to: "/explore" },
  { title: "The Souks", desc: "Spices, leather, and treasures", image: spiceImage, to: "/explore" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={heroImage} alt="Marrakech at sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sand text-xs font-medium tracking-wide uppercase">Your guide to the Red City</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-sand-light leading-tight">
            Marrakech
          </h1>
          <p className="text-sand/90 mt-2 text-sm max-w-xs">
            Discover the magic of Morocco's most enchanting city — from ancient medinas to vibrant souks.
          </p>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-card rounded-2xl p-4 shadow-warm">
          <div className="grid grid-cols-4 gap-3">
            {quickLinks.map(({ icon: Icon, label, to, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <Link to={to} className="flex flex-col items-center gap-1.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="px-5 mt-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Don't Miss</h2>
        <div className="space-y-4">
          {highlights.map(({ title, desc, image, to }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
            >
              <Link to={to} className="flex gap-4 group">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
};

export default Index;
