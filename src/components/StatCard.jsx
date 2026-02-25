import { motion } from "framer-motion";
import { formatCurrency } from "../utils/formatCurrency";

// A single stat block showing a label and an animated number
export default function StatCard({ label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="glass-card p-4 flex flex-col gap-1"
    >
      <span className="text-xs text-white/30 uppercase tracking-widest">
        {label}
      </span>
      <span
        className="text-2xl font-bold font-mono-num tabular-nums"
        style={{ color }}
      >
        {formatCurrency(value)}
      </span>
    </motion.div>
  );
}