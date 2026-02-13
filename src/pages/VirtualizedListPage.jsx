import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { VirtualizedList } from "../components/VirtualizedList/VirtualizedList";

export const VirtualizedListPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const items = useMemo(() => Array.from({ length: 10000 }, (_, i) => ({ id: i, title: "Item #" + i })), []);

  const [rowHeight, setRowHeight] = useState(44);
  const [overscan, setOverscan] = useState(6);

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Virtualized list (windowing) renders only visible rows for smooth performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Row height
              <input
                type="number"
                value={rowHeight}
                min={28}
                max={80}
                onChange={(e) => setRowHeight(Number(e.target.value))}
                className="ml-2 w-20 rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
              />
            </label>

            <label className="text-sm text-gray-700 dark:text-gray-200">
              Overscan
              <input
                type="number"
                value={overscan}
                min={0}
                max={30}
                onChange={(e) => setOverscan(Number(e.target.value))}
                className="ml-2 w-20 rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
              />
            </label>
          </div>
        </div>

        <div className="mt-6">
          <VirtualizedList
            items={items}
            height={440}
            rowHeight={rowHeight}
            overscan={overscan}
            renderRow={({ item, index }) => (
              <div className="flex h-full items-center justify-between px-4 text-sm text-gray-800 dark:text-gray-100">
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Index: {index}</span>
              </div>
            )}
          />
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Total height = <code>items.length * rowHeight</code>.</li>
          <li className="text-gray-600 dark:text-gray-300">Render only the visible range + overscan rows.</li>
          <li className="text-gray-600 dark:text-gray-300">Translate inner container by <code>startIndex * rowHeight</code>.</li>
          <li className="text-gray-600 dark:text-gray-300">Use <code>requestAnimationFrame</code> to throttle scroll state updates.</li>
        </ul>
      </div>
    </div>
  );
};
