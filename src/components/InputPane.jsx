import { useLedger } from "../hooks/useLedger";
import LedgerSection from "./LedgerSection";

// InputPane now holds the actual ledger sections and passes down the shared state
export default function InputPane({ hideButtons, ledger }) {
  const { incomes, expenses, dispatch, safeEval } = ledger;

  return (
    <div className="flex flex-col gap-4">
      <LedgerSection
        title="Income"
        accentColor="#4ade80"
        listKey="incomes"
        rows={incomes}
        dispatch={dispatch}
        hideButtons={hideButtons}
        safeEval={safeEval}
      />
      <LedgerSection
        title="Expenses"
        accentColor="#f87171"
        listKey="expenses"
        rows={expenses}
        dispatch={dispatch}
        hideButtons={hideButtons}
        safeEval={safeEval}
      />

      {/* Clear All button - nuclear option, only visible when buttons are shown */}
      {!hideButtons && (
        <button
          onClick={() => {
            // Confirming before wiping everything - this is destructive
            if (window.confirm("Clear all rows and start fresh?")) {
              dispatch({ type: "CLEAR_ALL" });
            }
          }}
          className="
            min-h-[44px]
            text-sm text-white/20 hover:text-red-400
            border border-white/5 hover:border-red-400/20
            rounded-xl
            transition-all duration-150
          "
        >
          🗑 Clear All
        </button>
      )}
    </div>
  );
}