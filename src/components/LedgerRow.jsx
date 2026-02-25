import { motion } from "framer-motion";

// A single income or expense row with a label field and an amount field
export default function LedgerRow({ row, listKey, dispatch, hideButtons, safeEval }) {
  // Checking if the current amount string is a valid evaluated number
  const evaluated = safeEval(row.amount);
  const hasValidAmount = row.amount.trim() !== "" && evaluated !== 0;

  return (
    // Animating rows in/out so adding and removing feels smooth
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.18 }}
      className="flex items-center gap-2 group"
    >
      {/* Label input - what this income/expense is called */}
      <input
        type="text"
        placeholder="Label"
        value={row.label}
        onChange={e => dispatch({
          type: "UPDATE_ROW",
          list: listKey,
          id: row.id,
          field: "label",
          value: e.target.value,
        })}
        className="
          flex-1 min-w-0
          bg-white/5 border border-white/10
          rounded-lg px-3 py-2.5
          text-sm text-white placeholder-white/20
          focus:outline-none focus:border-white/30
          transition-colors duration-150
        "
      />

      {/* Amount input - accepts plain numbers or math expressions */}
      <div className="relative flex-shrink-0 w-36">
        <input
          type="text"
          placeholder="0 or 5*20"
          value={row.amount}
          onChange={e => dispatch({
            type: "UPDATE_ROW",
            list: listKey,
            id: row.id,
            field: "amount",
            value: e.target.value,
          })}
          className="
            w-full
            bg-white/5 border border-white/10
            rounded-lg px-3 py-2.5 pr-16
            text-sm font-mono-num text-white placeholder-white/20
            focus:outline-none focus:border-white/30
            transition-colors duration-150
          "
        />
        {/* Showing the evaluated result inline if it's different from the raw input */}
        {hasValidAmount && String(evaluated) !== row.amount.trim() && (
          <span className="
            absolute right-2 top-1/2 -translate-y-1/2
            text-xs font-mono-num text-green-400/70
            pointer-events-none
          ">
            ={evaluated.toLocaleString()}
          </span>
        )}
      </div>

      {/* Remove button - hidden when hideButtons is on or when there's only one row left */}
      {!hideButtons && (
        <button
          onClick={() => dispatch({ type: "REMOVE_ROW", list: listKey, id: row.id })}
          // min-w and min-h to hit the 44px touch target requirement
          className="
            min-w-[36px] min-h-[36px]
            flex items-center justify-center
            text-white/20 hover:text-red-400
            rounded-lg hover:bg-red-400/10
            transition-all duration-150
            flex-shrink-0
          "
          aria-label="Remove row"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}