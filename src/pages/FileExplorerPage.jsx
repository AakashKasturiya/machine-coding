import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { FileExplorerTree } from "../components/FileExplorerTree/FileExplorerTree";

export const FileExplorerPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const initialData = useMemo(
    () => [
      {
        id: "root-1",
        type: "folder",
        name: "src",
        children: [
          {
            id: "f-1",
            type: "folder",
            name: "components",
            children: [
              { id: "file-1", type: "file", name: "Button.jsx" },
              { id: "file-2", type: "file", name: "Modal.jsx" },
            ],
          },
          { id: "file-3", type: "file", name: "App.jsx" },
        ],
      },
      {
        id: "root-2",
        type: "folder",
        name: "public",
        children: [{ id: "file-4", type: "file", name: "index.html" }],
      },
    ],
    []
  );

  const [treeData, setTreeData] = useState(initialData);
  const [selectedId, setSelectedId] = useState("root-1");

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Recursive file explorer tree with expand/collapse, selection, add/rename/delete.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="dark:border-gray-700">
            <FileExplorerTree
              data={treeData}
              onChange={setTreeData}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Selected Node ID</div>
            <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-200">
              {selectedId || "None"}
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
              Tips:
              <div className="mt-2 space-y-1">
                <div>- Select a folder then click <span className="font-medium">+ Folder</span> / <span className="font-medium">+ File</span> to add inside it.</div>
                <div>- Select any node and click <span className="font-medium">Rename</span> or <span className="font-medium">Delete</span>.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Recursive rendering for nested folders/files.</li>
          <li className="text-gray-600 dark:text-gray-300">Immutable tree updates (insert, rename, delete) by cloning only the changed branches.</li>
          <li className="text-gray-600 dark:text-gray-300">Separate UI state: expanded ids + selected id + rename draft.</li>
          <li className="text-gray-600 dark:text-gray-300">Reusable API via <code>data</code>/<code>onChange</code> and selection callbacks.</li>
        </ul>
      </div>
    </div>
  );
};
