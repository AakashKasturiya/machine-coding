import { useEffect, useState } from "react";

export const UndoRedo = () => {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState("");
  const [future, setFuture] = useState([]);

  /* ---------- Handle Change ---------- */
  const handleChange = (e) => {
    const value = e.target.value;

    setPast([...past, present]);
    setPresent(value);
    setFuture([]); // clear redo stack
  };

  /* ---------- Undo ---------- */
  const undo = () => {
    if (!past.length) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  };

  /* ---------- Redo ---------- */
  const redo = () => {
    if (!future.length) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setFuture(newFuture);
    setPresent(next);
  };

  /* ---------- Keyboard Support ---------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      }

      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        🔥 Undo / Redo Editor
      </h2>

      <textarea
        value={present}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
        rows={6}
        placeholder="Start typing..."
      />

      <div className="flex gap-3">
        <button
          onClick={undo}
          disabled={!past.length}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Undo (Ctrl+Z)
        </button>

        <button
          onClick={redo}
          disabled={!future.length}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Redo (Ctrl+Y)
        </button>
      </div>
    </div>
  );
}
