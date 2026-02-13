import React, { useEffect, useMemo, useRef, useState } from "react";

function createId() {
  return String(Date.now()) + "-" + String(Math.random()).slice(2);
}

function findNodeById(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.type === "folder" && Array.isArray(n.children)) {
      const found = findNodeById(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

function updateTree(nodes, fn) {
  return nodes.map((n) => {
    const updated = fn(n);
    if (updated) return updated;

    if (n.type === "folder" && Array.isArray(n.children)) {
      const nextChildren = updateTree(n.children, fn);
      if (nextChildren !== n.children) return { ...n, children: nextChildren };
    }

    return n;
  });
}

function removeFromTree(nodes, id) {
  const next = [];
  for (const n of nodes) {
    if (n.id === id) continue;
    if (n.type === "folder" && Array.isArray(n.children)) {
      const nextChildren = removeFromTree(n.children, id);
      next.push(nextChildren !== n.children ? { ...n, children: nextChildren } : n);
    } else {
      next.push(n);
    }
  }
  return next;
}

function insertIntoTree(nodes, parentId, nodeToInsert) {
  if (!parentId) return [...nodes, nodeToInsert];

  return updateTree(nodes, (n) => {
    if (n.id !== parentId) return null;
    if (n.type !== "folder") return null;

    const children = Array.isArray(n.children) ? n.children : [];
    return { ...n, children: [...children, nodeToInsert] };
  });
}

function countNodes(nodes) {
  let total = 0;
  for (const n of nodes) {
    total += 1;
    if (n.type === "folder" && Array.isArray(n.children)) total += countNodes(n.children);
  }
  return total;
}

function TreeNode({
  node,
  depth,
  expandedIds,
  toggleExpand,
  selectedId,
  onSelect,
  editingId,
  draftName,
  setDraftName,
  saveRename,
  cancelRename,
}) {
  const isFolder = node.type === "folder";
  const expanded = isFolder && expandedIds.has(node.id);
  const selected = selectedId === node.id;
  const isEditing = editingId === node.id;

  const rowBase =
    "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors";
  const rowSelected =
    "bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-200";
  const rowNormal = "hover:bg-gray-50 dark:hover:bg-gray-800";

  return (
    <div>
      <div
        className={rowBase + " " + (selected ? rowSelected : rowNormal)}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        {isFolder ? (
          <button
            type="button"
            onClick={() => toggleExpand(node.id)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label={expanded ? "Collapse folder" : "Expand folder"}
          >
            <i className={expanded ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line"} />
          </button>
        ) : (
          <span className="flex h-6 w-6 items-center justify-center text-gray-400 dark:text-gray-500">
            <i className="ri-file-3-line" />
          </span>
        )}

        <button
          type="button"
          onClick={() => onSelect(node.id)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="text-gray-600 dark:text-gray-300">
            <i className={isFolder ? "ri-folder-3-line" : "ri-file-3-line"} />
          </span>

          {isEditing ? (
            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveRename();
                if (e.key === "Escape") cancelRename();
              }}
            />
          ) : (
            <span className="truncate text-gray-900 dark:text-gray-100">{node.name}</span>
          )}
        </button>

        {isEditing ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={saveRename}
              className="rounded-md px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelRename}
              className="rounded-md px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>

      {isFolder && expanded && Array.isArray(node.children) && node.children.length ? (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              toggleExpand={toggleExpand}
              selectedId={selectedId}
              onSelect={onSelect}
              editingId={editingId}
              draftName={draftName}
              setDraftName={setDraftName}
              saveRename={saveRename}
              cancelRename={cancelRename}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FileExplorerTree({
  data,
  defaultData,
  onChange,
  selectedId,
  defaultSelectedId,
  onSelect,
}) {
  const isDataControlled = Array.isArray(data);
  const [internalData, setInternalData] = useState(defaultData || []);

  const isSelectedControlled = typeof selectedId === "string";
  const [internalSelectedId, setInternalSelectedId] = useState(defaultSelectedId || null);

  const currentData = isDataControlled ? data : internalData;
  const currentSelectedId = isSelectedControlled ? selectedId : internalSelectedId;

  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [editingId, setEditingId] = useState(null);
  const [draftName, setDraftName] = useState("");

  const latestSelectedRef = useRef(currentSelectedId);
  useEffect(() => {
    latestSelectedRef.current = currentSelectedId;
  }, [currentSelectedId]);

  const commitData = (next) => {
    if (!isDataControlled) setInternalData(next);
    onChange?.(next);
  };

  const commitSelected = (id) => {
    if (!isSelectedControlled) setInternalSelectedId(id);
    onSelect?.(id);
  };

  const selectedNode = useMemo(() => {
    if (!currentSelectedId) return null;
    return findNodeById(currentData, currentSelectedId);
  }, [currentData, currentSelectedId]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startRename = () => {
    if (!selectedNode) return;
    setEditingId(selectedNode.id);
    setDraftName(selectedNode.name);
  };

  const cancelRename = () => {
    setEditingId(null);
    setDraftName("");
  };

  const saveRename = () => {
    if (!editingId) return;
    const name = draftName.trim();
    if (!name) return;

    const next = updateTree(currentData, (n) => {
      if (n.id !== editingId) return null;
      return { ...n, name };
    });

    commitData(next);
    cancelRename();
  };

  const deleteSelected = () => {
    if (!currentSelectedId) return;

    const next = removeFromTree(currentData, currentSelectedId);
    commitData(next);
    commitSelected(null);
    cancelRename();
  };

  const addChild = (type) => {
    const baseName = type === "folder" ? "New Folder" : "New File";
    const newNode = {
      id: createId(),
      type,
      name: baseName,
      ...(type === "folder" ? { children: [] } : {}),
    };

    let parentId = null;
    if (selectedNode && selectedNode.type === "folder") parentId = selectedNode.id;

    const next = insertIntoTree(currentData, parentId, newNode);
    commitData(next);

    if (parentId) setExpandedIds((prev) => new Set(prev).add(parentId));
    commitSelected(newNode.id);
    setEditingId(newNode.id);
    setDraftName(baseName);
  };

  const stats = useMemo(() => {
    const total = countNodes(currentData);
    const folders = (function countFolders(nodes) {
      let t = 0;
      for (const n of nodes) {
        if (n.type === "folder") t += 1;
        if (n.type === "folder" && Array.isArray(n.children)) t += countFolders(n.children);
      }
      return t;
    })(currentData);

    return { total, folders, files: total - folders };
  }, [currentData]);

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">File Explorer</div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              {stats.folders} folders, {stats.files} files
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => addChild("folder")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              + Folder
            </button>
            <button
              type="button"
              onClick={() => addChild("file")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              + File
            </button>
            <button
              type="button"
              onClick={startRename}
              disabled={!selectedNode}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Rename
            </button>
            <button
              type="button"
              onClick={deleteSelected}
              disabled={!selectedNode}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="p-3">
          {currentData.length ? (
            currentData.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                depth={0}
                expandedIds={expandedIds}
                toggleExpand={toggleExpand}
                selectedId={currentSelectedId}
                onSelect={commitSelected}
                editingId={editingId}
                draftName={draftName}
                setDraftName={setDraftName}
                saveRename={saveRename}
                cancelRename={cancelRename}
              />
            ))
          ) : (
            <div className="p-4 text-sm text-gray-600 dark:text-gray-300">Empty. Add a folder or file.</div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
          Selected: <span className="font-medium">{selectedNode ? selectedNode.name : "None"}</span>
        </div>
      </div>
    </div>
  );
}
