import { AnimatePresence } from "framer-motion";
import LedgerRow from "./LedgerRow";
import EmptyState from "./EmptyState";

export default function LedgerSection({ title, accentColor, listKey, rows, dispatch, hideButtons, safeEval }) {
  return (
    <div className="glass-card p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
            {title}
          </h3>
        </div>
        <span className="text-xs text-white/25 font-mono-num">
          {rows.length} {rows.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {rows.map(row => (
            <LedgerRow
              key={row.id}
              row={row}
              listKey={listKey}
              dispatch={dispatch}
              hideButtons={hideButtons}
              safeEval={safeEval}
            />
          ))}
        </AnimatePresence>

        {/* Showing the empty state only when there are truly no rows */}
        {rows.length === 0 && <EmptyState type={listKey} />}
      </div>

      {!hideButtons && (
        <button
          onClick={() => dispatch({ type: "ADD_ROW", list: listKey })}
          className="
            mt-4 w-full min-h-[44px]
            flex items-center justify-center gap-1.5
            text-sm text-white/30 hover:text-white/70
            border border-dashed border-white/10 hover:border-white/25
            rounded-lg transition-all duration-150
          "
        >
          <span className="text-base leading-none">+</span>
          Add {title} Row
        </button>
      )}
    </div>
  );
}