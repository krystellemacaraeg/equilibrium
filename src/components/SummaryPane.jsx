import { motion, AnimatePresence } from "framer-motion";
import StatCard from "./StatCard";
import BalanceBar from "./BalanceBar";
import { getStatus } from "../utils/getStatus";
import { formatCurrency, formatCompact } from "../utils/formatCurrency";

export default function SummaryPane({ ledger, isMobileFooter = false }) {
  // Pulling the calculated totals out of the ledger object passed down from App
  const { totalIncome, totalExpenses, balance } = ledger;
  const status = getStatus(balance, totalIncome, totalExpenses);

  // ---- MOBILE FOOTER VERSION ----
  // Compact single-row layout for the sticky bottom bar on small screens
  if (isMobileFooter) {
    return (
      <div className="bg-[#0a0c14]/95 backdrop-blur-glass border-t border-white/10 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Status dot + label */}
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: status.color }}
            />
            <span className="text-xs text-white/50 truncate">{status.label}</span>
          </div>

          {/* Three compact numbers */}
          <div className="flex items-center gap-4 font-mono-num">
            <div className="text-center">
              <div className="text-[10px] text-white/25 uppercase tracking-wider">In</div>
              <div className="text-xs text-green-400">{formatCompact(totalIncome)}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-white/25 uppercase tracking-wider">Out</div>
              <div className="text-xs text-red-400">{formatCompact(totalExpenses)}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-white/25 uppercase tracking-wider">Net</div>
              <div
                className="text-xs font-bold"
                style={{ color: status.color }}
              >
                {formatCompact(balance)}
              </div>
            </div>
          </div>
        </div>

        {/* Mini progress bar even in footer */}
        <BalanceBar totalIncome={totalIncome} totalExpenses={totalExpenses} />
      </div>
    );
  }

  // ---- DESKTOP SIDEBAR VERSION ----
  return (
    <div className="flex flex-col gap-4">
      {/* Status card - changes color and message based on financial health */}
      <AnimatePresence mode="wait">
        <motion.div
          key={status.tier}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="glass-card p-5"
          style={{ borderColor: `${status.color}30` }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none mt-0.5">{status.emoji}</span>
            <div>
              <p
                className="text-base font-bold"
                style={{ color: status.color }}
              >
                {status.label}
              </p>
              <p className="text-sm text-white/40 mt-1 leading-relaxed">
                {status.message}
              </p>
            </div>
          </div>

          {/* The bar lives inside the status card for visual grouping */}
          <div className="mt-4">
            <BalanceBar totalIncome={totalIncome} totalExpenses={totalExpenses} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Three stat cards stacked - income, expenses, balance */}
      <StatCard
        label="Total Income"
        value={totalIncome}
        color="#4ade80"
        delay={0.05}
      />
      <StatCard
        label="Total Expenses"
        value={totalExpenses}
        color="#f87171"
        delay={0.1}
      />

      {/* Balance card has extra emphasis since it's the most important number */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="glass-card p-5"
        style={{ borderColor: `${status.color}25` }}
      >
        <span className="text-xs text-white/30 uppercase tracking-widest block mb-2">
          Net Balance
        </span>
        <span
          className="text-4xl font-bold font-mono-num tabular-nums block"
          style={{ color: status.color }}
        >
          {formatCurrency(balance)}
        </span>
        {/* Showing the surplus/deficit as a percentage of income for context */}
        {totalIncome > 0 && (
          <span className="text-xs text-white/25 font-mono-num mt-1 block">
            {Math.abs((balance / totalIncome) * 100).toFixed(1)}%{" "}
            {balance >= 0 ? "surplus" : "deficit"} of income
          </span>
        )}
      </motion.div>
    </div>
  );
}
