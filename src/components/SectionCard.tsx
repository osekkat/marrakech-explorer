import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionCardProps {
  title: string;
  subtitle: string;
  image: string;
  to: string;
  index?: number;
}

export const SectionCard = ({ title, subtitle, image, to, index = 0 }: SectionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <Link to={to} className="block group">
      <div className="relative rounded-xl overflow-hidden shadow-card aspect-[16/9]">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-lg font-semibold text-primary-foreground">{title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-primary-foreground/80 text-sm">{subtitle}</p>
            <ChevronRight className="w-4 h-4 text-primary-foreground/80 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);
