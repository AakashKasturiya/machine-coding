import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { Calendar } from "../components/Calendar/Calendar";

export const CalendarPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Month view calendar (date picker). Navigate months and select a date.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <Calendar value={selectedDate} onChange={setSelectedDate} />
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Selected</div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              {selectedDate.toDateString()}
            </div>

            <div className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-100">Uncontrolled</div>
            <div className="mt-2">
              <Calendar defaultValue={new Date()} />
            </div>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Generate the month grid from date math (start day + number of days).</li>
          <li className="text-gray-600 dark:text-gray-300">Render a 7-column grid and pad leading/trailing days.</li>
          <li className="text-gray-600 dark:text-gray-300">State: selected date + current view month (prev/next).</li>
          <li className="text-gray-600 dark:text-gray-300">Highlight today and selected date for better UX.</li>
        </ul>
      </div>
    </div>
  );
};
