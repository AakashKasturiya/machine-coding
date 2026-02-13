import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { Autocomplete } from "../components/Autocomplete/Autocomplete";

export const AutocompletePage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const suggestions = useMemo(
    () => [
      "React",
      "React Router",
      "Redux",
      "TailwindCSS",
      "TypeScript",
      "Vite",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "Jest",
      "Cypress",
    ],
    []
  );

  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Type to filter results. Keyboard: ↑ ↓, Enter to select, Esc to close.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <Autocomplete
              items={suggestions}
              value={value}
              onChange={setValue}
              onSelect={(v) => setSelected(v)}
              placeholder="Search skills..."
              debounceMs={200}
              minChars={0}
            />
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Selected</div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              {selected || "None"}
            </div>

            <div className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-100">Current input</div>
            <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-200">
              {value || "(empty)"}
            </div>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Debounce input so filtering/fetching doesn’t run on every keystroke.</li>
          <li className="text-gray-600 dark:text-gray-300">Keyboard navigation for better accessibility and interview completeness.</li>
          <li className="text-gray-600 dark:text-gray-300">Click outside handler to close dropdown.</li>
          <li className="text-gray-600 dark:text-gray-300">ARIA combobox/listbox roles for screen readers.</li>
        </ul>
      </div>
    </div>
  );
};
