import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { Accordion } from "../components/Accordion/Accordion";

export const AccordionPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [multiple, setMultiple] = useState(false);

  const FAQS = [
    {
      id: "a1",
      question: "What is an Accordion?",
      answer:
        "An accordion is a UI pattern where content is shown/hidden by expanding and collapsing sections.",
    },
    {
      id: "a2",
      question: "Single open item - how does it work?",
      answer:
        "In single-open mode, opening one item closes the previously opened item (like a radio group).",
    },
    {
      id: "a3",
      question: "Can we support multiple open items?",
      answer:
        "Yes. Track open items using a Set of ids. Toggle adds/removes ids from the Set.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Toggle items. Switch between single-open and multiple-open modes.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={multiple}
              onChange={(e) => setMultiple(e.target.checked)}
            />
            Multiple open
          </label>
        </div>

        <div className="mt-6">
          <Accordion items={FAQS} multiple={multiple} defaultOpenIds={["a1"]} />
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Single-open: store one open id (or null) in state.</li>
          <li className="text-gray-600 dark:text-gray-300">Multiple-open: store open ids in a Set for O(1) checks.</li>
          <li className="text-gray-600 dark:text-gray-300">Toggle same item: if the same id is clicked again, close it.</li>
          <li className="text-gray-600 dark:text-gray-300">Conditional rendering to show/hide answer content.</li>
        </ul>
      </div>
    </div>
  );
};
