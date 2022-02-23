import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  function transition(view, replace = false) {
    setHistory((prev) => (replace ? [...prev] : [...prev, mode]));
    setMode(view);
  }

  function back() {
    if (history.length === 0) return;
    setMode(history.pop());
    setHistory((prev) => prev.slice(-1));
  }

  return { mode, transition, back };
}
