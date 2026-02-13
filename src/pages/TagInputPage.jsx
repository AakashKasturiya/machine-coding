import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { TagInput } from "../components/TagInput/TagInput";

export const TagInputPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [tags, setTags] = useState(["React", "Tailwind"]);

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Add tags using Enter/comma. Backspace deletes the last tag when input is empty.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <TagInput
              label="Skills"
              value={tags}
              onChange={setTags}
              placeholder="Type a skill..."
              maxTags={8}
            />

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setTags([])}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setTags(["React", "Vite", "Redux"])}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Fill sample
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Current tags</div>
            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-200">
              {JSON.stringify(tags, null, 2)}
            </div>

            <div className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-100">Uncontrolled</div>
            <div className="mt-3">
              <TagInput label="Topics" defaultValue={["Frontend"]} />
            </div>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Render tags as chips and keep the input inside the same container.</li>
          <li className="text-gray-600 dark:text-gray-300">Add tags on Enter or comma and normalize by trimming.</li>
          <li className="text-gray-600 dark:text-gray-300">Backspace removes the last tag when the input is empty.</li>
          <li className="text-gray-600 dark:text-gray-300">Controlled vs uncontrolled API for flexibility.</li>
        </ul>
      </div>
    </div>
  );
};
