import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { Popover } from "../components/Popover/Popover";
import { Tooltip } from "../components/Tooltip/Tooltip";

export const PopoverTooltipPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [placement, setPlacement] = useState("bottom");

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Popover (click) + Tooltip (hover/focus). Supports placement + click outside + Escape close.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { k: "top", t: "Top" },
              { k: "right", t: "Right" },
              { k: "bottom", t: "Bottom" },
              { k: "left", t: "Left" },
            ].map((p) => (
              <button
                key={p.k}
                type="button"
                onClick={() => setPlacement(p.k)}
                className={
                  "rounded-lg border px-3 py-2 text-sm transition-colors dark:border-gray-700 " +
                  (placement === p.k
                    ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800")
                }
              >
                {p.t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Popover
            placement={placement}
            trigger={
              <button
                type="button"
                className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                Open Popover
              </button>
            }
            content={
              <div>
                <div className="text-sm font-semibold">Popover content</div>
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  Click outside or press Esc to close.
                </div>
              </div>
            }
          />

          <Tooltip placement={placement} text="This is a tooltip. Hover or focus the icon." delayMs={150}>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Info"
            >
              i
            </button>
          </Tooltip>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Positioning: place the floating panel relative to the trigger.</li>
          <li className="text-gray-600 dark:text-gray-300">Close interactions: click outside + Escape key.</li>
          <li className="text-gray-600 dark:text-gray-300">Tooltip: open on hover/focus with optional delay.</li>
          <li className="text-gray-600 dark:text-gray-300">Accessibility: <code>role=tooltip</code> and <code>aria-expanded</code>.</li>
        </ul>
      </div>
    </div>
  );
};
