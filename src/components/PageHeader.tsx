import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="px-5 pt-14 pb-4"
  >
    <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
    {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
  </motion.div>
);
