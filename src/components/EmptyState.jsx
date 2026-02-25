import { motion } from "framer-motion";

// Showing this when a section has no rows yet - gives the user a nudge
export default function EmptyState({ type }) {
  const config = {
    incomes: {
      emoji: "💸",
      message: "No income sources yet.",
      sub: "Add your salary, freelance work, or any other earnings.",
    },
    expenses: {
      emoji: "🧾",
      message: "No expenses recorded.",
      sub: "Add rent, groceries, subscriptions, or any outgoing costs.",
    },
  };

  const { emoji, message, sub } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-6 flex flex-col items-center gap-2 text-center"
    >
      <span className="text-3xl">{emoji}</span>
      <p className="text-sm text-white/40">{message}</p>
      <p className="text-xs text-white/20 max-w-48">{sub}</p>
    </motion.div>
  );
}