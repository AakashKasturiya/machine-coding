import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { Rating } from "../components/Rating/Rating";

export const RatingPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [rating, setRating] = useState(3);

  return (
    <div className="max-w-6xl mx-auto  bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Hover to preview, click to set. Keyboard: Arrow keys, Home/End.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <Rating label="Rate this" value={rating} onChange={setRating} />
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Read only</div>
            <div className="mt-4">
              <Rating label="Average" value={4} readOnly showValue={false} />
            </div>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Controlled vs uncontrolled component design.</li>
          <li className="text-gray-600 dark:text-gray-300">Hover preview without committing state.</li>
          <li className="text-gray-600 dark:text-gray-300">Accessibility: buttons with <code>radiogroup</code>/<code>radio</code> semantics.</li>
          <li className="text-gray-600 dark:text-gray-300">Keyboard support: arrows, Home/End.</li>
        </ul>
      </div>
    </div>
  );
};
