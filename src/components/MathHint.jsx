// Small tooltip hint reminding users they can type math expressions
// Only shows once, then dismisses and remembers via localStorage
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MathHint() {
  // Checking if the user already dismissed this hint before
  const [visible, setVisible] = useState(
    () => localStorage.getItem("equilibrium-hint-dismissed") !== "true"
  );

  function dismiss() {
    localStorage.setItem("equilibrium-hint-dismissed", "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="
            flex items-start justify-between gap-3
            bg-blue-500/10 border border-blue-500/20
            rounded-xl px-4 py-3
            text-xs text-blue-300/70
          "
        >
          <div className="flex items-start gap-2">
            <span className="mt-0.5">💡</span>
            <div>
              <span className="font-semibold text-blue-300/90">Math expressions work in amount fields. </span>
              Try typing <code className="font-mono-num bg-white/10 px-1 rounded">
                (120 * 5) + 300
              </code> and it evaluates instantly.
            </div>
          </div>
          {/* Dismiss button - small but still tappable */}
          <button
            onClick={dismiss}
            className="text-white/20 hover:text-white/60 flex-shrink-0 transition-colors mt-0.5"
            aria-label="Dismiss hint"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}