// SummaryPane placeholder - totals and status message come in Phase 3
export default function SummaryPane({ isMobileFooter = false }) {
  // Different styling for the sticky mobile footer vs the desktop sidebar card
  const wrapperClass = isMobileFooter
    ? "bg-[#0a0c14]/90 backdrop-blur-glass border-t border-white/10 px-4 py-3"
    : "glass-card p-6";

  return (
    <div className={wrapperClass}>
      <h2 className={`font-semibold text-white/80 ${isMobileFooter ? "text-sm" : "text-lg mb-4"}`}>
        Summary &amp; Insights
      </h2>
      {!isMobileFooter && (
        <p className="text-white/30 text-sm font-mono-num">
          Phase 3: Balance totals and status will live here.
        </p>
      )}
      {isMobileFooter && (
        // Compact footer row showing placeholder totals
        <div className="flex justify-between font-mono-num text-sm text-white/40 mt-1">
          <span>Income: —</span>
          <span>Expenses: —</span>
          <span>Balance: —</span>
        </div>
      )}
    </div>
  );
}
