import { useReducer, useEffect, useMemo } from "react";
import { evaluate } from "mathjs";

// The starting row shape - every new row looks like this
const createRow = (id) => ({
  id,
  label: "",
  amount: "",
});

// Default state if nothing is in localStorage yet
const initialState = {
  incomes:  [createRow(Date.now())],
  expenses: [createRow(Date.now() + 1)],
};

// Trying to load saved data from localStorage on startup
function loadFromStorage() {
  try {
    const saved = localStorage.getItem("equilibrium-data");
    // If nothing saved yet, fall back to the default state
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    // If the JSON is corrupted for some reason, just start fresh
    return initialState;
  }
}

// All the ways the ledger state can change - keeping this in one place
function ledgerReducer(state, action) {
  switch (action.type) {

    // Adding a new blank row to either incomes or expenses
    case "ADD_ROW":
      return {
        ...state,
        [action.list]: [...state[action.list], createRow(Date.now())],
      };

    // Removing a row by its id from the given list
    case "REMOVE_ROW":
      return {
        ...state,
        [action.list]: state[action.list].filter(row => row.id !== action.id),
      };

    // Updating a single field (label or amount) on a specific row
    case "UPDATE_ROW":
      return {
        ...state,
        [action.list]: state[action.list].map(row =>
          row.id === action.id
            ? { ...row, [action.field]: action.value }
            : row
        ),
      };

    // Wiping everything and going back to a single empty row per list
    case "CLEAR_ALL":
      return {
        incomes:  [createRow(Date.now())],
        expenses: [createRow(Date.now() + 1)],
      };

    default:
      return state;
  }
}

// Safely evaluating a math string like "(100 * 5) + 20"
// Returns 0 if the string is empty or invalid so the totals don't break
function safeEval(str) {
  if (!str || str.trim() === "") return 0;
  try {
    const result = evaluate(String(str));
    // Making sure the result is actually a finite number before using it
    return typeof result === "number" && isFinite(result) ? result : 0;
  } catch {
    return 0;
  }
}

// The main hook - this is what components import to get everything they need
export function useLedger() {
  const [state, dispatch] = useReducer(ledgerReducer, undefined, loadFromStorage);

  // Saving to localStorage every time state changes
  useEffect(() => {
    localStorage.setItem("equilibrium-data", JSON.stringify(state));
  }, [state]);

  // useMemo so these don't recalculate on every render - important on mobile
  const totalIncome = useMemo(
    () => state.incomes.reduce((sum, row) => sum + safeEval(row.amount), 0),
    [state.incomes]
  );

  const totalExpenses = useMemo(
    () => state.expenses.reduce((sum, row) => sum + safeEval(row.amount), 0),
    [state.expenses]
  );

  const balance = totalIncome - totalExpenses;

  return {
    incomes:      state.incomes,
    expenses:     state.expenses,
    totalIncome,
    totalExpenses,
    balance,
    dispatch,
    safeEval,
  };
}