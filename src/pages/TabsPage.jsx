import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { Tabs } from "../components/Tabs/Tabs";

export const TabsPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [activeId, setActiveId] = useState("overview");
  const [variant, setVariant] = useState("underline");

  const tabs = useMemo(
    () => [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div>
            <div className="text-sm font-semibold">Overview</div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              Tabs are a UI pattern to switch between related views without navigating to a new page.
            </p>
          </div>
        ),
      },
      {
        id: "features",
        label: "Features",
        content: (
          <ul className="list-disc px-6 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <li>Click tab to change content</li>
            <li>Active tab highlight</li>
            <li>Dynamic tab data (map)</li>
            <li>Optional disabled tabs</li>
          </ul>
        ),
      },
      {
        id: "disabled",
        label: "Disabled",
        disabled: true,
        content: <div className="text-sm">You should not be able to open this.</div>,
      },
    ],
    []
  );

  return (
    <div className="max-w-6xl mx-auto  bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Dynamic tabs + active highlight. Variant supports underline or pill.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVariant("underline")}
              className={
                "rounded-lg border px-3 py-2 text-sm transition-colors dark:border-gray-700 " +
                (variant === "underline"
                  ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800")
              }
            >
              Underline
            </button>
            <button
              type="button"
              onClick={() => setVariant("pill")}
              className={
                "rounded-lg border px-3 py-2 text-sm transition-colors dark:border-gray-700 " +
                (variant === "pill"
                  ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800")
              }
            >
              Pill
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} variant={variant} />
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Data-driven UI: render tabs from an array and map.</li>
          <li className="text-gray-600 dark:text-gray-300">Controlled component: parent owns the active tab id.</li>
          <li className="text-gray-600 dark:text-gray-300">Accessibility: use <code>tablist</code>/<code>tab</code>/<code>tabpanel</code> roles and <code>aria-selected</code>.</li>
          <li className="text-gray-600 dark:text-gray-300">Styling: active state highlight (underline/pill variants).</li>
        </ul>
      </div>
    </div>
  );
};
