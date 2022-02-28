import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  function transition(view, replace = false) {
    setHistory((prev) => (replace ? [...prev] : [...prev, mode]));
    setMode(view);
  }

  function back() {
    console.log(history);
    if (history.length === 0) return;
    setMode(history.pop());
    setHistory((prev) => [...prev]);
  }

  return { mode, transition, back };
}
