import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// Colors for each expense slice - cycling through these for up to 10 items
const SLICE_COLORS = [
  "#f87171", "#fb923c", "#fbbf24", "#a78bfa",
  "#60a5fa", "#34d399", "#f472b6", "#94a3b8",
  "#c084fc", "#38bdf8",
];

// Custom tooltip so it matches the dark glass theme
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs font-mono-num">
      <p className="text-white/60">{payload[0].name}</p>
      <p className="text-white font-bold">
        ₱{payload[0].value.toLocaleString("fil-PH", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

export default function SpendingChart({ expenses, safeEval }) {
  // Building the chart data from expense rows that have a valid amount
  const data = expenses
    .filter(row => safeEval(row.amount) > 0)
    .map(row => ({
      name:  row.label?.trim() || "Unlabeled",
      value: safeEval(row.amount),
    }));

  // Not enough data to show a chart yet
  if (data.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-3">
          Spending Breakdown
        </h3>
        <p className="text-xs text-white/25 text-center py-6">
          Add expenses with amounts to see the breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest mb-4">
        Spending Breakdown
      </h3>

      {/* ResponsiveContainer so the chart scales on any screen width */}
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={SLICE_COLORS[index % SLICE_COLORS.length]}
                opacity={0.85}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={6}
            formatter={value => (
              <span className="text-xs text-white/50">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}