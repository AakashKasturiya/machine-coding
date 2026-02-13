import React, { useEffect, useId, useMemo, useState } from "react";

export function Tabs({
  tabs,
  activeId,
  defaultActiveId,
  onChange,
  variant = "underline",
}) {
  const isControlled = typeof activeId === "string";

  const firstEnabledId = useMemo(() => {
    const first = tabs?.find((t) => !t.disabled);
    return first ? first.id : null;
  }, [tabs]);

  const initialId = defaultActiveId ?? firstEnabledId;
  const [internalActiveId, setInternalActiveId] = useState(initialId);

  useEffect(() => {
    if (!isControlled) return;
    setInternalActiveId(activeId);
  }, [activeId, isControlled]);

  const currentActiveId = isControlled ? activeId : internalActiveId;

  const setNext = (nextId) => {
    const nextTab = tabs.find((t) => t.id === nextId);
    if (!nextTab || nextTab.disabled) return;

    if (!isControlled) setInternalActiveId(nextId);
    onChange?.(nextId);
  };

  const activeTab = tabs.find((t) => t.id === currentActiveId) ?? tabs[0];

  const baseTabBtn =
    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

  const inactiveTabBtn =
    "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800";

  const activeTabBtn =
    variant === "pill"
      ? "bg-blue-600 text-white"
      : "text-gray-900 dark:text-gray-100";

  const underline =
    variant === "underline"
      ? "after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-blue-600"
      : "";

  const groupId = useId();
  const tabListId = groupId + "-tablist";
  const panelId = groupId + "-panel";

  return (
    <div className="w-full">
      <div
        id={tabListId}
        role="tablist"
        aria-label="Tabs"
        className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 dark:border-gray-700"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab?.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              disabled={tab.disabled}
              onClick={() => setNext(tab.id)}
              className={
                baseTabBtn +
                " " +
                (tab.disabled
                  ? "cursor-not-allowed opacity-50 text-gray-400 dark:text-gray-500"
                  : isActive
                    ? activeTabBtn + " " + underline
                    : inactiveTabBtn)
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabListId}
        className="mt-4 rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        {activeTab?.content}
      </div>
    </div>
  );
}
