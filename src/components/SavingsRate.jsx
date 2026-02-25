import { motion } from "framer-motion";

// Savings rate = what percentage of income is left after expenses
// This is one of the most useful personal finance metrics
export default function SavingsRate({ totalIncome, totalExpenses }) {
  if (totalIncome === 0) return null;

  const rate = ((totalIncome - totalExpenses) / totalIncome) * 100;
  const isNegative = rate < 0;

  // Picking a label based on the savings rate tier
  const tier =
    rate >= 20  ? { label: "Strong saver",    color: "#4ade80" } :
    rate >= 10  ? { label: "Moderate saver",  color: "#86efac" } :
    rate >= 0   ? { label: "Minimal savings", color: "#fbbf24" } :
                  { label: "Overspending",    color: "#f87171" };

  // Clamping the bar fill between 0 and 100 for display purposes
  const barFill = Math.min(Math.max(rate, 0), 100);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
          Savings Rate
        </h3>
        <span
          className="text-xs font-mono-num font-bold"
          style={{ color: tier.color }}
        >
          {tier.label}
        </span>
      </div>

      {/* Big rate number */}
      <div className="flex items-end gap-2 mb-4">
        <span
          className="text-4xl font-bold font-mono-num tabular-nums"
          style={{ color: tier.color }}
        >
          {isNegative ? "-" : ""}{Math.abs(rate).toFixed(1)}
        </span>
        <span className="text-white/30 text-lg mb-1">%</span>
      </div>

      {/* Progress bar - only fills when rate is positive */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: tier.color }}
          initial={{ width: 0 }}
          animate={{ width: `${barFill}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Context label under the bar */}
      <p className="text-xs text-white/25 mt-2">
        {rate >= 20
          ? "Saving ₱" + (totalIncome - totalExpenses).toLocaleString("fil-PH", { minimumFractionDigits: 2 }) + " of every paycheck."
          : rate >= 0
          ? "Aim for 20%+ savings rate for long-term stability."
          : "Reduce expenses or increase income to get back on track."}
      </p>
    </div>
  );
}