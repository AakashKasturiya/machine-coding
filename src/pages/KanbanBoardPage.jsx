import React from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { KanbanBoard } from "../components/KanbanBoard/KanbanBoard";

export const KanbanBoardPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  return (
    <div className="max-w-6xl mx-auto  bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Simple Kanban board with drag & drop (reorder and move across columns) + add card.
        </p>

        <div className="mt-6">
          <KanbanBoard />
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Model: columns contain ordered arrays of cards.</li>
          <li className="text-gray-600 dark:text-gray-300">Drag payload: card id + source column + source index.</li>
          <li className="text-gray-600 dark:text-gray-300">On drop: remove from source then insert into target at index.</li>
          <li className="text-gray-600 dark:text-gray-300">Reordering: move item inside the same array.</li>
        </ul>
      </div>
    </div>
  );
};
