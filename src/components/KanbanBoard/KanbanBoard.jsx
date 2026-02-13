import React, { useMemo, useState } from "react";

function createId() {
  return String(Date.now()) + "-" + String(Math.random()).slice(2);
}

function moveItem(arr, from, to) {
  const next = arr.slice();
  const item = next.splice(from, 1)[0];
  next.splice(to, 0, item);
  return next;
}

export function KanbanBoard({ initialColumns }) {
  const initial = useMemo(() => {
    if (Array.isArray(initialColumns) && initialColumns.length) return initialColumns;

    return [
      {
        id: "todo",
        title: "Todo",
        cards: [
          { id: "c1", text: "Build Kanban UI" },
          { id: "c2", text: "Add drag & drop" },
        ],
      },
      {
        id: "doing",
        title: "Doing",
        cards: [{ id: "c3", text: "Write interview notes" }],
      },
      {
        id: "done",
        title: "Done",
        cards: [{ id: "c4", text: "Setup project" }],
      },
    ];
  }, [initialColumns]);

  const [columns, setColumns] = useState(initial);
  const [newCardText, setNewCardText] = useState({});

  const addCard = (columnId) => {
    const text = String(newCardText[columnId] || "").trim();
    if (!text) return;

    const card = { id: createId(), text };

    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, cards: [...col.cards, card] } : col))
    );

    setNewCardText((p) => ({ ...p, [columnId]: "" }));
  };

  const onDragStartCard = (e, payload) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/json", JSON.stringify(payload));
  };

  const onDropCard = (e, toColumnId, toIndex) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }

    const { cardId, fromColumnId, fromIndex } = payload || {};
    if (!cardId || !fromColumnId) return;

    setColumns((prev) => {
      const fromCol = prev.find((c) => c.id === fromColumnId);
      const toCol = prev.find((c) => c.id === toColumnId);
      if (!fromCol || !toCol) return prev;

      const moving = fromCol.cards[fromIndex];
      if (!moving || moving.id !== cardId) {
        const fallback = fromCol.cards.find((c) => c.id === cardId);
        if (!fallback) return prev;
      }

      const card = moving && moving.id === cardId ? moving : fromCol.cards.find((c) => c.id === cardId);

      const next = prev.map((col) => {
        if (col.id === fromColumnId) {
          const without = col.cards.filter((c) => c.id !== cardId);
          return { ...col, cards: without };
        }
        return col;
      });

      const afterRemovalFrom = next.find((c) => c.id === fromColumnId);
      const afterRemovalTo = next.find((c) => c.id === toColumnId);
      if (!afterRemovalFrom || !afterRemovalTo) return prev;

      let insertIndex = typeof toIndex === "number" ? toIndex : afterRemovalTo.cards.length;
      insertIndex = Math.max(0, Math.min(afterRemovalTo.cards.length, insertIndex));

      const next2 = next.map((col) => {
        if (col.id !== toColumnId) return col;
        const cards = col.cards.slice();
        cards.splice(insertIndex, 0, card);
        return { ...col, cards };
      });

      return next2;
    });
  };

  const onReorderWithin = (fromColumnId, fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== fromColumnId) return col;
        return { ...col, cards: moveItem(col.cards, fromIndex, toIndex) };
      })
    );
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropCard(e, col.id)}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{col.title}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{col.cards.length}</div>
            </div>

            <div className="mt-3 space-y-2">
              {col.cards.map((card, idx) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) =>
                    onDragStartCard(e, {
                      cardId: card.id,
                      fromColumnId: col.id,
                      fromIndex: idx,
                    })
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const raw = e.dataTransfer.getData("application/json");
                    if (!raw) return;
                    let payload;
                    try {
                      payload = JSON.parse(raw);
                    } catch {
                      return;
                    }

                    const fromColumnId = payload?.fromColumnId;
                    const fromIndex = payload?.fromIndex;
                    const cardId = payload?.cardId;

                    if (!cardId) return;
                    if (fromColumnId === col.id && typeof fromIndex === "number") {
                      onReorderWithin(col.id, fromIndex, idx);
                      return;
                    }

                    onDropCard(e, col.id, idx);
                  }}
                  className="cursor-move rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {card.text}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                value={newCardText[col.id] || ""}
                onChange={(e) => setNewCardText((p) => ({ ...p, [col.id]: e.target.value }))}
                placeholder="Add a card..."
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => addCard(col.id)}
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
              Drag cards to reorder or move between columns.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
