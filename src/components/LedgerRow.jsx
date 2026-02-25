import { motion } from "framer-motion";

// A single income or expense row with a label field and an amount field
export default function LedgerRow({ row, listKey, dispatch, hideButtons, safeEval }) {
  // Checking if the current amount string evaluates to something useful
  const evaluated = safeEval(row.amount);
  const hasValidAmount = row.amount.trim() !== "" && evaluated !== 0;
  // Showing the evaluated result only if it differs from what the user typed
  const showEval = hasValidAmount && String(evaluated) !== row.amount.trim();

  return (
    // Animating rows in and out so adding and removing feels smooth
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.18 }}
      className="flex items-center gap-2 group"
    >
      {/* Label input - what this income or expense is called */}
      <input
        type="text"
        placeholder="Label"
        value={row.label}
        onChange={e =>
          dispatch({
            type: "UPDATE_ROW",
            list: listKey,
            id: row.id,
            field: "label",
            value: e.target.value,
          })
        }
        // Tab from label goes straight to the amount field
        className="
          flex-1 min-w-0
          bg-white/5 border border-white/10
          rounded-lg px-3 py-2.5
          text-sm text-white placeholder-white/20
          focus:outline-none focus:border-white/30
          transition-colors duration-150
        "
      />

      {/* Amount input - accepts plain numbers or math expressions like (100*5)+20 */}
      <div className="relative flex-shrink-0 w-36">
        <input
          type="text"
          placeholder="0 or 5*20"
          value={row.amount}
          onChange={e =>
            dispatch({
              type: "UPDATE_ROW",
              list: listKey,
              id: row.id,
              field: "amount",
              value: e.target.value,
            })
          }
          // Pressing Enter adds a new row below - faster than tapping the button
          onKeyDown={e => {
            if (e.key === "Enter") {
              dispatch({ type: "ADD_ROW", list: listKey });
            }
          }}
          className="
            w-full
            bg-white/5 border border-white/10
            rounded-lg px-3 py-2.5 pr-16
            text-sm font-mono-num text-white placeholder-white/20
            focus:outline-none focus:border-white/30
            transition-colors duration-150
          "
        />

        {/* Inline evaluated result - shows in green when the input is a math expression */}
        {showEval && (
          <span
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              text-xs font-mono-num text-green-400/70
              pointer-events-none select-none
            "
          >
            ={evaluated.toLocaleString("fil-PH")}
          </span>
        )}
      </div>

      {/*
        Remove button - hidden when hideButtons is on.
        min-w and min-h set to meet the 44px touch target requirement on mobile.
        Opacity trick so it's subtle at rest but obvious on hover.
      */}
      {!hideButtons && (
        <button
          onClick={() =>
            dispatch({ type: "REMOVE_ROW", list: listKey, id: row.id })
          }
          className="
            min-w-[36px] min-h-[44px]
            flex items-center justify-center
            text-white/20 hover:text-red-400
            rounded-lg hover:bg-red-400/10
            transition-all duration-150
            flex-shrink-0
            opacity-0 group-hover:opacity-100
            focus:opacity-100
          "
          aria-label="Remove row"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}