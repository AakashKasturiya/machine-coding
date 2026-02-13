import React, { useCallback, useMemo, useState } from "react";

export function Accordion({ items, multiple = false, defaultOpenIds = [] }) {
  const initialOpen = useMemo(() => {
    if (multiple) return new Set(defaultOpenIds);
    return defaultOpenIds.length ? defaultOpenIds[0] : null;
  }, [multiple, defaultOpenIds]);

  const [openId, setOpenId] = useState(multiple ? null : initialOpen);
  const [openIds, setOpenIds] = useState(multiple ? initialOpen : new Set());

  const isOpen = useCallback(
    (id) => {
      if (multiple) return openIds.has(id);
      return openId === id;
    },
    [multiple, openId, openIds]
  );

  const toggle = useCallback(
    (id) => {
      if (multiple) {
        setOpenIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
        return;
      }

      setOpenId((prev) => (prev === id ? null : id));
    },
    [multiple]
  );

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => {
            const open = isOpen(item.id);

            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                  aria-expanded={open}
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.question}
                    </div>
                    {item.subTitle && (
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                        {item.subTitle}
                      </div>
                    )}
                  </div>

                  <span
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-full border text-gray-700 dark:text-gray-200 " +
                      (open
                        ? "border-blue-300 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/30"
                        : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900")
                    }
                  >
                    <i className={open ? "ri-subtract-line" : "ri-add-line"}></i>
                  </span>
                </button>

                {open && (
                  <div className="px-5 pb-5">
                    <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Mode: <span className="font-medium">{multiple ? "Multiple open" : "Single open"}</span>
      </div>
    </div>
  );
}
