import { useState } from "react";

// View manager
// Use transition to change view
// Back to go back to most previous view
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  // Sets mode to provided one
  // Will replace latest history elm if replace is set to true
  function transition(view, replace = false) {
    setHistory((prev) => (replace ? [...prev] : [...prev, mode]));
    setMode(view);
  }

  // Sets mode to latest history elm
  function back() {
    if (history.length === 0) return;
    const latestHitsory = history[history.length - 1];
    setMode(latestHitsory);
    setHistory((prev) => {
      prev.pop();
      return [...prev];
    });
  }

  return { mode, transition, back };
}
