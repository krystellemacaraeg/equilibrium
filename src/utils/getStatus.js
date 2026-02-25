// Returning the right status message and color based on how the balance looks
// Adding thresholds so it feels nuanced rather than just "good/bad"
export function getStatus(balance, totalIncome, totalExpenses) {
  // Edge case - nothing entered yet
  if (totalIncome === 0 && totalExpenses === 0) {
    return {
      label:   "Waiting for data",
      message: "Add your income and expenses to get started.",
      color:   "#94a3b8",
      emoji:   "📊",
      tier:    "neutral",
    };
  }

  // No income but expenses exist
  if (totalIncome === 0 && totalExpenses > 0) {
    return {
      label:   "No income recorded",
      message: "You have expenses but no income sources listed.",
      color:   "#f87171",
      emoji:   "⚠️",
      tier:    "danger",
    };
  }

  const ratio = totalExpenses / totalIncome;

  if (balance > 0 && ratio <= 0.5) {
    return {
      label:   "Excellent",
      message: "Expenses are under 50% of income. Strong position.",
      color:   "#4ade80",
      emoji:   "✦",
      tier:    "excellent",
    };
  }

  if (balance > 0 && ratio <= 0.75) {
    return {
      label:   "Good",
      message: "Healthy surplus. Some room to save or invest.",
      color:   "#86efac",
      emoji:   "◎",
      tier:    "good",
    };
  }

  if (balance > 0 && ratio <= 0.9) {
    return {
      label:   "Tight",
      message: "Positive balance but margins are slim. Watch closely.",
      color:   "#fbbf24",
      emoji:   "◑",
      tier:    "caution",
    };
  }

  if (balance >= 0) {
    return {
      label:   "Breaking Even",
      message: "Income barely covers expenses. Little room for error.",
      color:   "#fb923c",
      emoji:   "◐",
      tier:    "warning",
    };
  }

  // balance is negative
  return {
    label:   "In Deficit",
    message: "Expenses exceed income. Review and reduce where possible.",
    color:   "#f87171",
    emoji:   "▼",
    tier:    "danger",
  };
}