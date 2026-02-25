// Visual bar showing the ratio of expenses to income
// Gives an at-a-glance sense of how close to the edge the budget is
export default function BalanceBar({ totalIncome, totalExpenses }) {
  // Capping at 100 so the bar doesn't overflow when in deficit
  const fillPercent = totalIncome > 0
    ? Math.min((totalExpenses / totalIncome) * 100, 100)
    : 0;

  // Color shifts from green to red as expenses approach income
  const barColor =
    fillPercent <= 50  ? "#4ade80" :
    fillPercent <= 75  ? "#86efac" :
    fillPercent <= 90  ? "#fbbf24" :
    fillPercent <= 100 ? "#fb923c" :
                         "#f87171";

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-white/25 font-mono-num mb-1.5">
        <span>Expenses vs Income</span>
        <span>{fillPercent.toFixed(1)}%</span>
      </div>
      {/* Track */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        {/* Fill - using inline style for the dynamic width and color */}
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${fillPercent}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}