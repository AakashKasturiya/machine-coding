/* Navbar Data */

 export const navItems = [
  {
    path: '/dropdown',
    label: 'Dropdown',
    icon: 'ri-expand-up-down-line',
    type: 'easy',
  },
  {
    path: "/carousel",
    label: "Carousel",
    icon: "ri-carousel-view",
    type: "easy"
  },
  {
    path: '/toast',
    label: 'Toast',
    icon: 'ri-notification-snooze-line',
    type: 'easy',
  },
  {
    path: '/simple-infinite-scroll',
    label: 'Simple Infinite Scroll',
    icon: 'ri-scroll-to-bottom-line',
    type: 'easy',
  },
  {
    path: '/rating',
    label: 'Rating',
    icon: 'ri-star-line',
    type: 'easy',
  },
  {
    path: '/accordion',
    label: 'Accordion / FAQ',
    icon: 'ri-list-check-2',
    type: 'easy',
  },
  {
    path: '/tabs',
    label: 'Tabs',
    icon: 'ri-folder-3-line',
    type: 'easy',
  },
  {
    path: '/progress-bar',
    label: 'Progress Bar',
    icon: 'ri-loader-4-line',
    type: 'easy',
  },
  {
    path: '/theme-toggle',
    label: 'Theme Toggle',
    icon: 'ri-palette-line',
    type: 'easy',
  },

  {
    path: '/custom-hook',
    label: 'Custom Hook',
    icon: 'ri-webhook-line',
    type: 'medium',
  },
  {
    path: '/reusable-table',
    label: 'Reusable Table',
    icon: 'ri-table-line',
    type: 'medium',
  },
  {
    path: '/undo-redo',
    label: 'Undo / Redo Feature',
    icon: 'ri-arrow-go-back-line',
    type: 'medium',
  },
  {
    path: '/calendar',
    label: 'Date Picker',
    icon: 'ri-calendar-2-line',
    type: 'medium',
  },
  {
    path: '/autocomplete',
    label: 'Autocomplete',
    icon: 'ri-search-eye-line',
    type: 'medium',
  },
  {
    path: '/otp-input',
    label: 'OTP Input',
    icon: 'ri-key-2-line',
    type: 'medium',
  },
  {
    path: '/popover-tooltip',
    label: 'Popover / Tooltip',
    icon: 'ri-chat-3-line',
    type: 'medium',
  },
  {
    path: '/tag-input',
    label: 'Tag Input',
    icon: 'ri-hashtag',
    type: 'medium',
  },
  {
    path: '/todo',
    label: 'Todo App',
    icon: 'ri-todo-line',
    type: 'medium',
  },
  {
    path: '/modal',
    label: 'Modal System',
    icon: 'ri-keyboard-box-line',
    type: 'medium',
  },
  {
    path: '/search',
    label: 'Search Bar',
    icon: 'ri-chat-search-line',
    type: 'medium',
  },
  {
    path: '/dynamic-form',
    label: 'Dynamic Form',
    icon: 'ri-draft-line',
    type: 'medium',
  },
  {
    path: '/pagination',
    label: 'Pagination',
    icon: 'ri-equalizer-2-line',
    type: 'medium',
  },

  {
    path: '/file-explorer',
    label: 'File Explorer Tree',
    icon: 'ri-folder-open-line',
    type: 'advanced',
  },
  {
    path: '/stepper',
    label: 'Multi-step Form',
    icon: 'ri-route-line',
    type: 'advanced',
  },
  {
    path: '/kanban-board',
    label: 'Kanban Board',
    icon: 'ri-layout-grid-line',
    type: 'advanced',
  },
  {
    path: '/virtualized-list',
    label: 'Virtualized List',
    icon: 'ri-list-check-2',
    type: 'advanced',
  },
  {
    path: '/drag-drop-list',
    label: 'Drag Drop List',
    icon: 'ri-drag-drop-line',
    type: 'advanced',
  },
  {
    path: '/cinema-seat-booking',
    label: 'Cinema Seat Booking',
    icon: 'ri-movie-2-line',
    type: 'advanced',
  },
  {
    path: '/file-upload',
    label: 'File Upload',
    icon: 'ri-upload-line',
    type: 'advanced',
  },
  {
    path: '/login',
    label: 'Login',
    icon: 'ri-login-box-line',
    type: 'advanced',
  }
];


/* Tasks Data */
const tasksData = [
  {
    id: 1,
    path: 'dropdown',
    title: "Dropdown Component",
    description: "Build a Dropdown app with the following features:",
    category: 'Fundamentals',
    type: 'easy',
    points: [
      "Open / Close dropdown",
      "Close on click outside",
      "Keyboard navigation(↑ ↓ Enter Esc)",
      "Accessible & clean logic",
      "No external libraries"
    ],
    concepts: "Component Design, State Management(useState), useRef & DOM Interaction, Event Handling, Click Outside Detection, Keyboard Accessibility, Focus Management, Conditional Rendering, Reusable Components, Props & Callback Pattern",
    solution: [
      {
        heading: '1. Create the Dropdown main Component (Dropdown.jsx)',
        code: `import { useEffect, useRef, useState } from "react";

const options = [
  "Profile",
  "Settings",
  "Notifications",
  "Logout",
];

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef(null);

  // 🔹 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          prev === options.length - 1 ? 0 : prev + 1
        );
        break;

      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev === 0 ? options.length - 1 : prev - 1
        );
        break;

      case "Enter":
        alert("Selected: " + options[highlightedIndex]);
        setIsOpen(false);
        break;

      case "Escape":
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  return (
    <div
      className="relative inline-block w-56"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md flex justify-between items-center"
      >
        Select Option
        <span className="ml-2">▾</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border rounded-md shadow-md">
          {options.map((option, index) => (
            <li
              key={option}
              className={"px - 4 py - 2 cursor - pointer " +
    (highlightedIndex === index
    ? "bg-blue-100"
    : "hover:bg-gray-100")}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                alert("Selected: " + option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`},
    ]
  },
  {
    id: 2,
    path: 'accordion',
    title: "Build an Accordion / FAQ Component",
    category: 'Fundamentals',
    type:'easy',
    description: "Build an Accordion / FAQ component with the following features:",
    points: [
      "Expand / collapse",
      "Single open item",
      "Toggle same item",
      "Optional multiple open"
    ],
    concepts: "Conditional rendering, State management, Toggle logic, Data-driven UI via map(), Accessibility (aria-expanded)",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 Accordion.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useCallback, useMemo, useState } from "react";

export function Accordion({ items, multiple = false, defaultOpenIds = [] }) {
  const initialOpen = useMemo(() => {
    if (multiple) return new Set(defaultOpenIds);
    return defaultOpenIds.length ? defaultOpenIds[0] : null;
  }, [multiple, defaultOpenIds]);

  const [openId, setOpenId] = useState(multiple ? null : initialOpen);
  const [openIds, setOpenIds] = useState(multiple ? initialOpen : new Set());

  const isOpen = useCallback(
    (id) => {
      if (multiple) return openIds.has(id);
      return openId === id;
    },
    [multiple, openId, openIds]
  );

  const toggle = useCallback(
    (id) => {
      if (multiple) {
        setOpenIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
        return;
      }

      setOpenId((prev) => (prev === id ? null : id));
    },
    [multiple]
  );

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => {
            const open = isOpen(item.id);

            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                  aria-expanded={open}
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.question}
                    </div>
                    {item.subTitle && (
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                        {item.subTitle}
                      </div>
                    )}
                  </div>

                  <span
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-full border text-gray-700 dark:text-gray-200 " +
                      (open
                        ? "border-blue-300 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/30"
                        : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900")
                    }
                  >
                    <i className={open ? "ri-subtract-line" : "ri-add-line"}></i>
                  </span>
                </button>

                {open && (
                  <div className="px-5 pb-5">
                    <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Mode: <span className="font-medium">{multiple ? "Multiple open" : "Single open"}</span>
      </div>
    </div>
  );
}
`
      }
    ]
  },
  {
    id: 3,
    path: 'tabs',
    title: "Build a Tabs Component",
    category: 'Fundamentals',
    type: 'easy',
    description: "Build a Tabs component with the following features:",
    points: [
      "Click tab to change content",
      "Active tab highlight",
      "Dynamic tab data"
    ],
    concepts: "Data-driven UI, Controlled vs uncontrolled state, Reusable component API, Accessibility (tablist/tab/tabpanel)",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 Tabs.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useId, useMemo, useState } from "react";

export function Tabs({
  tabs,
  activeId,
  defaultActiveId,
  onChange,
  variant = "underline",
}) {
  const isControlled = typeof activeId === "string";

  const firstEnabledId = useMemo(() => {
    const first = tabs?.find((t) => !t.disabled);
    return first ? first.id : null;
  }, [tabs]);

  const initialId = defaultActiveId ?? firstEnabledId;
  const [internalActiveId, setInternalActiveId] = useState(initialId);

  useEffect(() => {
    if (!isControlled) return;
    setInternalActiveId(activeId);
  }, [activeId, isControlled]);

  const currentActiveId = isControlled ? activeId : internalActiveId;

  const setNext = (nextId) => {
    const nextTab = tabs.find((t) => t.id === nextId);
    if (!nextTab || nextTab.disabled) return;

    if (!isControlled) setInternalActiveId(nextId);
    onChange?.(nextId);
  };

  const activeTab = tabs.find((t) => t.id === currentActiveId) ?? tabs[0];

  const baseTabBtn =
    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

  const inactiveTabBtn =
    "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800";

  const activeTabBtn =
    variant === "pill"
      ? "bg-blue-600 text-white"
      : "text-gray-900 dark:text-gray-100";

  const underline =
    variant === "underline"
      ? "after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-blue-600"
      : "";

  const groupId = useId();
  const tabListId = groupId + "-tablist";
  const panelId = groupId + "-panel";

  return (
    <div className="w-full">
      <div
        id={tabListId}
        role="tablist"
        aria-label="Tabs"
        className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 dark:border-gray-700"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab?.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              disabled={tab.disabled}
              onClick={() => setNext(tab.id)}
              className={
                baseTabBtn +
                " " +
                (tab.disabled
                  ? "cursor-not-allowed opacity-50 text-gray-400 dark:text-gray-500"
                  : isActive
                    ? activeTabBtn + " " + underline
                    : inactiveTabBtn)
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabListId}
        className="mt-4 rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        {activeTab?.content}
      </div>
    </div>
  );
}
`
      }
    ]
  },
  {
    id: 4,
    path: 'progress-bar',
    title: "Build a Progress Bar Component",
     category: 'Fundamentals',
    type: 'easy',
    description: "Build a Progress Bar component with the following features:",
    points: [
      "Dynamic progress value",
      "Animated fill",
      "Variants (color, size)",
      "Accessible progressbar semantics"
    ],
    concepts: "Clamping values, Derived state (percentage), Reusable props API, Accessibility (role=progressbar)",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 ProgressBar.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useMemo } from "react";

export function ProgressBar({
  value,
  max = 100,
  label = "Progress",
  showValue = true,
  size = "md",
  variant = "blue",
  animated = true,
}) {
  const pct = useMemo(() => {
    const safeMax = max > 0 ? max : 1;
    const safeValue = typeof value === "number" ? value : 0;
    const raw = (safeValue / safeMax) * 100;
    return Math.min(100, Math.max(0, raw));
  }, [max, value]);

  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variants = {
    blue: "bg-blue-600",
    green: "bg-emerald-600",
    amber: "bg-amber-500",
    red: "bg-red-600",
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</div>
          {showValue && (
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              {Math.round(pct)}%
            </div>
          )}
        </div>

        {showValue && (
          <div className="text-xs text-gray-600 dark:text-gray-300">{value}/{max}</div>
        )}
      </div>

      <div
        className={
          "mt-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 " +
          (sizes[size] || sizes.md)
        }
        role="progressbar"
        aria-label={label}
        aria-valuenow={typeof value === "number" ? value : 0}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={
            "h-full rounded-full " +
            (variants[variant] || variants.blue) +
            (animated ? " transition-[width] duration-300 ease-out" : "")
          }
          style={{ width: pct + "%" }}
        />
      </div>
    </div>
  );
}
`
      }
    ]
  },
  {
    id: 13,
    path: 'calendar',
    title: "Build a Calendar / Date Picker",
    category: 'Fundamentals',
    type:'medium',
    description: "Build a month-view calendar (date picker) with the following features:",
    points: [
      "Render any month dynamically",
      "Prev / next month navigation",
      "Select a date",
      "Highlight today and selected date"
    ],
    concepts: "Date math, Month grid generation, State management, Data-driven rendering, Accessibility-friendly buttons",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 Calendar.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useState } from "react";

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatMonthYear(date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  weekStartsOn = 0,
}) {
  const isControlled = value instanceof Date;
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);

  useEffect(() => {
    if (!isControlled) return;
    setInternalValue(value);
  }, [isControlled, value]);

  const selected = isControlled ? value : internalValue;

  const [viewMonth, setViewMonth] = useState(() => {
    const base = selected ?? new Date();
    return startOfMonth(base);
  });

  useEffect(() => {
    if (!selected) return;
    setViewMonth(startOfMonth(selected));
  }, [selected]);

  const today = useMemo(() => new Date(), []);

  const { days, monthStart } = useMemo(() => {
    const monthStartDate = startOfMonth(viewMonth);
    const monthEndDate = endOfMonth(viewMonth);

    const startDay = (monthStartDate.getDay() - weekStartsOn + 7) % 7;
    const totalDaysInMonth = monthEndDate.getDate();

    const cells = [];

    for (let i = 0; i < startDay; i++) {
      cells.push({
        key: "p-" + i,
        date: new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), i - startDay + 1),
        inMonth: false,
      });
    }

    for (let d = 1; d <= totalDaysInMonth; d++) {
      cells.push({
        key: "m-" + d,
        date: new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), d),
        inMonth: true,
      });
    }

    const remainder = cells.length % 7;
    const add = remainder === 0 ? 0 : 7 - remainder;
    for (let i = 1; i <= add; i++) {
      cells.push({
        key: "n-" + i,
        date: new Date(monthStartDate.getFullYear(), monthStartDate.getMonth() + 1, i),
        inMonth: false,
      });
    }

    return { days: cells, monthStart: monthStartDate };
  }, [viewMonth, weekStartsOn]);

  const weekDays = useMemo(() => {
    const base = new Date(2023, 0, 1);
    const labels = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + ((i + weekStartsOn) % 7));
      labels.push(d.toLocaleDateString(undefined, { weekday: "short" }));
    }
    return labels;
  }, [weekStartsOn]);

  const selectDate = (date) => {
    if (!isControlled) setInternalValue(date);
    onChange?.(date);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label="Previous month"
        >
          Prev
        </button>

        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {formatMonthYear(monthStart)}
        </div>

        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label="Next month"
        >
          Next
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2">
        {weekDays.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-gray-600 dark:text-gray-300"
          >
            {d}
          </div>
        ))}

        {days.map(({ key, date, inMonth }) => {
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selected);

          const base =
            "flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

          const muted = inMonth
            ? "text-gray-900 dark:text-gray-100"
            : "text-gray-400 dark:text-gray-600";

          const todayRing = isToday ? "ring-1 ring-blue-500/50" : "";

          const selectedStyle = isSelected
            ? "bg-blue-600 text-white hover:bg-blue-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800";

          return (
            <button
              key={key}
              type="button"
              onClick={() => selectDate(date)}
              className={base + " " + muted + " " + todayRing + " " + selectedStyle}
              aria-label={formatISODate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
        Selected:{" "}
        <span className="font-medium">{selected ? formatISODate(selected) : "None"}</span>
      </div>
    </div>
  );
}
`
      }
    ]
  },
  {
    id: 14,
    path: 'file-explorer',
    title: "Build a File Explorer Tree",
    category: 'Fundamentals',
    type:'advanced',
    description: "Build a File Explorer Tree with the following features:",
    points: [
      "Recursive folder/file rendering",
      "Expand / collapse folders",
      "Select node",
      "Add / rename / delete"
    ],
    concepts: "Recursion, Immutable tree updates, UI state (expanded/selected/editing), Data-driven rendering",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 FileExplorerTree.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useRef, useState } from "react";

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
`
      }
    ]
  },

  {
    id: 15,
    path: 'autocomplete',
    title: "Build an Autocomplete / Typeahead",
    category: 'Fundamentals',
    type:'medium',  
    description: "Build an Autocomplete / Typeahead with the following features:",
    points: [
      "Debounced input",
      "Keyboard navigation (↑/↓/Enter/Esc)",
      "Active option highlight",
      "Click outside to close"
    ],
    concepts: "Debouncing, Controlled inputs, Accessibility (combobox/listbox), Keyboard UX, Derived filtered results",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 Autocomplete.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useId, useMemo, useRef, useState } from "react";

export function Autocomplete({
  items,
  value,
  defaultValue = "",
  onChange,
  onSelect,
  placeholder = "Search...",
  debounceMs = 200,
  minChars = 0,
  maxResults = 8,
  disabled = false,
}) {
  const isControlled = typeof value === "string";
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputValue = isControlled ? value : internalValue;

  const [query, setQuery] = useState(inputValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const id = useId();
  const listboxId = id + "-listbox";

  useEffect(() => {
    if (!isControlled) return;
    setInternalValue(value);
    setQuery(value);
  }, [isControlled, value]);

  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(inputValue);
    }, debounceMs);

    return () => clearTimeout(t);
  }, [debounceMs, inputValue]);

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const normalizedItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.map((it) => String(it));
  }, [items]);

  const results = useMemo(() => {
    const q = String(query || "").trim().toLowerCase();
    if (q.length < minChars) return [];

    const filtered = q
      ? normalizedItems.filter((x) => x.toLowerCase().includes(q))
      : normalizedItems;

    return filtered.slice(0, maxResults);
  }, [maxResults, minChars, normalizedItems, query]);

  const commitValue = (next) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const selectValue = (val) => {
    commitValue(val);
    onSelect?.(val);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((prev) => {
        const next = prev + 1;
        return next >= results.length ? 0 : next;
      });
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((prev) => {
        const next = prev - 1;
        return next < 0 ? Math.max(0, results.length - 1) : next;
      });
      return;
    }

    if (e.key === "Enter") {
      if (!open) return;
      e.preventDefault();
      const val = results[activeIndex];
      if (typeof val === "string") selectValue(val);
      return;
    }

    if (e.key === "Escape") {
      if (!open) return;
      e.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={rootRef} className="w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => {
            commitValue(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />

        {open && results.length > 0 && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            {results.map((r, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={r}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectValue(r)}
                  className={
                    "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors " +
                    (active
                      ? "bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-200"
                      : "text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800")
                  }
                >
                  <span className="truncate">{r}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Enter</span>
                </button>
              );
            })}
          </div>
        )}

        {open && results.length === 0 && String(query || "").trim().length >= minChars && (
          <div className="absolute z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            No results
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
        Debounce: <span className="font-medium">{debounceMs}ms</span> | Results: {results.length}
      </div>
    </div>
  );
}
`
      }
    ]
  },

  {
    id: 16,
    path: 'otp-input',
    title: "Build an OTP Input Component",
    category: 'Fundamentals',
    type:'medium',
    description: "Build an OTP Input component with the following features:",
    points: [
      "Numeric-only input",
      "Auto focus + auto-advance",
      "Backspace navigation",
      "Paste to fill"
    ],
    concepts: "Controlled vs uncontrolled input, Refs for focus management, Keyboard UX, Paste handling, Derived state",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 OtpInput.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function onlyDigits(str) {
  return String(str || "").replace(/\\D/g, "");
}

function splitToDigits(value, length) {
  const clean = onlyDigits(value);
  const arr = Array.from({ length }, (_, i) => clean[i] || "");
  return arr;
}

export function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  autoFocus = true,
  disabled = false,
  label = "OTP",
}) {
  const isControlled = typeof value === "string";

  const [internal, setInternal] = useState(() => splitToDigits(defaultValue, length));
  const digits = isControlled ? splitToDigits(value, length) : internal;

  const refs = useRef([]);

  useEffect(() => {
    if (!autoFocus) return;
    if (disabled) return;

    const first = refs.current[0];
    first?.focus?.();
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (!isControlled) return;
    setInternal(splitToDigits(value, length));
  }, [isControlled, length, value]);

  const otp = useMemo(() => digits.join(""), [digits]);

  const commit = (nextDigits, focusIndex) => {
    const next = nextDigits.slice(0, length);

    if (!isControlled) setInternal(next);

    const nextOtp = next.join("");
    onChange?.(nextOtp);

    if (next.every((d) => d !== "")) onComplete?.(nextOtp);

    if (typeof focusIndex === "number") {
      const idx = clamp(focusIndex, 0, length - 1);
      refs.current[idx]?.focus?.();
      refs.current[idx]?.select?.();
    }
  };

  const setAt = (index, char) => {
    const nextDigits = [...digits];
    nextDigits[index] = char;
    commit(nextDigits, char ? index + 1 : index);
  };

  const onPasteAt = (index, text) => {
    const clean = onlyDigits(text);
    if (!clean) return;

    const nextDigits = [...digits];
    let i = index;
    for (const c of clean) {
      if (i >= length) break;
      nextDigits[i] = c;
      i += 1;
    }

    commit(nextDigits, Math.min(i, length - 1));
  };

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</div>
      <div className="mt-3 flex items-center gap-2">
        {digits.map((d, idx) => (
          <input
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            value={d}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={1}
            onChange={(e) => {
              const v = onlyDigits(e.target.value);
              const char = v ? v[v.length - 1] : "";
              setAt(idx, char);
            }}
            onKeyDown={(e) => {
              if (disabled) return;

              if (e.key === "Backspace") {
                if (digits[idx]) {
                  e.preventDefault();
                  setAt(idx, "");
                } else {
                  e.preventDefault();
                  commit([...digits], idx - 1);
                }
                return;
              }

              if (e.key === "ArrowLeft") {
                e.preventDefault();
                commit([...digits], idx - 1);
                return;
              }

              if (e.key === "ArrowRight") {
                e.preventDefault();
                commit([...digits], idx + 1);
                return;
              }

              if (e.key === "Home") {
                e.preventDefault();
                commit([...digits], 0);
                return;
              }

              if (e.key === "End") {
                e.preventDefault();
                commit([...digits], length - 1);
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              onPasteAt(idx, e.clipboardData.getData("text"));
            }}
            className="h-12 w-12 rounded-xl border border-gray-300 bg-white text-center text-lg font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            aria-label={"OTP digit " + (idx + 1)}
          />
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Value: <span className="font-medium">{otp || "(empty)"}</span>
      </div>
    </div>
  );
}
`
      }
    ]
  },

  {
    id: 17,
    path: 'stepper',
    title: "Build a Multi-step Form (Stepper)",
    category: 'Fundamentals',
    type:'advanced',
    description: "Build a Multi-step Form (Stepper) with the following features:",
    points: [
      "Step configuration",
      "Per-step validation",
      "Back / Next navigation",
      "Progress indicator",
      "Submit on final step"
    ],
    concepts: "State machine mindset, Validation gating, Persisting form state across steps, Reusable render props",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 StepperForm.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useMemo, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function StepperForm({
  steps,
  initialData,
  onSubmit,
  submitLabel = "Submit",
}) {
  const safeSteps = Array.isArray(steps) ? steps : [];
  const total = safeSteps.length;

  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  const currentStep = safeSteps[current];

  const progressPct = useMemo(() => {
    if (total <= 1) return 100;
    return Math.round((current / (total - 1)) * 100);
  }, [current, total]);

  const goTo = (idx) => setCurrent((prev) => clamp(idx, 0, Math.max(0, total - 1)));

  const validateStep = () => {
    if (!currentStep || typeof currentStep.validate !== "function") {
      setErrors({});
      return true;
    }

    const nextErrors = currentStep.validate(data) || {};
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    goTo(current + 1);
  };

  const back = () => {
    setErrors({});
    goTo(current - 1);
  };

  const submit = () => {
    if (!validateStep()) return;
    onSubmit?.(data);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {currentStep ? currentStep.label : "Stepper"}
            </div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              Step {current + 1} of {total}
            </div>
          </div>

          <div className="min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
              <span>Progress</span>
              <span className="font-medium">{progressPct}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-blue-600 transition-[width] duration-300 ease-out"
                style={{ width: progressPct + "%" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          {currentStep && typeof currentStep.render === "function" ? (
            currentStep.render({ data, setData, errors })
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300">No step content.</div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={current === 0}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Back
          </button>

          <div className="flex items-center gap-2">
            {current < total - 1 ? (
              <button
                type="button"
                onClick={next}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {submitLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
`
      }
    ]
  },

  {
    id: 18,
    path: 'kanban-board',
    title: "Build a Kanban Board",
    category: 'Fundamentals',
    type:'advanced',
    description: "Build a Kanban board with the following features:",
    points: [
      "Columns with ordered cards",
      "Drag & drop reorder",
      "Move cards across columns",
      "Add new card"
    ],
    concepts: "Immutable updates, Drag & Drop with DataTransfer payload, Reordering arrays, State modeling",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 KanbanBoard.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useMemo, useState } from "react";

function createId() {
  return String(Date.now()) + "-" + String(Math.random()).slice(2);
}

function moveItem(arr, from, to) {
  const next = arr.slice();
  const item = next.splice(from, 1)[0];
  next.splice(to, 0, item);
  return next;
}

export function KanbanBoard({ initialColumns }) {
  const initial = useMemo(() => {
    if (Array.isArray(initialColumns) && initialColumns.length) return initialColumns;

    return [
      {
        id: "todo",
        title: "Todo",
        cards: [
          { id: "c1", text: "Build Kanban UI" },
          { id: "c2", text: "Add drag & drop" },
        ],
      },
      {
        id: "doing",
        title: "Doing",
        cards: [{ id: "c3", text: "Write interview notes" }],
      },
      {
        id: "done",
        title: "Done",
        cards: [{ id: "c4", text: "Setup project" }],
      },
    ];
  }, [initialColumns]);

  const [columns, setColumns] = useState(initial);
  const [newCardText, setNewCardText] = useState({});

  const addCard = (columnId) => {
    const text = String(newCardText[columnId] || "").trim();
    if (!text) return;

    const card = { id: createId(), text };

    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, cards: [...col.cards, card] } : col))
    );

    setNewCardText((p) => ({ ...p, [columnId]: "" }));
  };

  const onDragStartCard = (e, payload) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/json", JSON.stringify(payload));
  };

  const onDropCard = (e, toColumnId, toIndex) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;

    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }

    const cardId = payload?.cardId;
    const fromColumnId = payload?.fromColumnId;
    const fromIndex = payload?.fromIndex;
    if (!cardId || !fromColumnId) return;

    setColumns((prev) => {
      const fromCol = prev.find((c) => c.id === fromColumnId);
      const toCol = prev.find((c) => c.id === toColumnId);
      if (!fromCol || !toCol) return prev;

      const moving = fromCol.cards[fromIndex];
      const card = moving && moving.id === cardId ? moving : fromCol.cards.find((c) => c.id === cardId);
      if (!card) return prev;

      const next = prev.map((col) => {
        if (col.id === fromColumnId) {
          const without = col.cards.filter((c) => c.id !== cardId);
          return { ...col, cards: without };
        }
        return col;
      });

      const afterRemovalTo = next.find((c) => c.id === toColumnId);
      if (!afterRemovalTo) return prev;

      let insertIndex = typeof toIndex === "number" ? toIndex : afterRemovalTo.cards.length;
      insertIndex = Math.max(0, Math.min(afterRemovalTo.cards.length, insertIndex));

      return next.map((col) => {
        if (col.id !== toColumnId) return col;
        const cards = col.cards.slice();
        cards.splice(insertIndex, 0, card);
        return { ...col, cards };
      });
    });
  };

  const onReorderWithin = (fromColumnId, fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== fromColumnId) return col;
        return { ...col, cards: moveItem(col.cards, fromIndex, toIndex) };
      })
    );
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropCard(e, col.id)}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{col.title}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{col.cards.length}</div>
            </div>

            <div className="mt-3 space-y-2">
              {col.cards.map((card, idx) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) =>
                    onDragStartCard(e, {
                      cardId: card.id,
                      fromColumnId: col.id,
                      fromIndex: idx,
                    })
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const raw = e.dataTransfer.getData("application/json");
                    if (!raw) return;
                    let payload;
                    try {
                      payload = JSON.parse(raw);
                    } catch {
                      return;
                    }

                    const fromColumnId = payload?.fromColumnId;
                    const fromIndex = payload?.fromIndex;
                    const cardId = payload?.cardId;

                    if (!cardId) return;
                    if (fromColumnId === col.id && typeof fromIndex === "number") {
                      onReorderWithin(col.id, fromIndex, idx);
                      return;
                    }

                    onDropCard(e, col.id, idx);
                  }}
                  className="cursor-move rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {card.text}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                value={newCardText[col.id] || ""}
                onChange={(e) => setNewCardText((p) => ({ ...p, [col.id]: e.target.value }))}
                placeholder="Add a card..."
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => addCard(col.id)}
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
              Drag cards to reorder or move between columns.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`
      }
    ]
  },

  {
    id: 19,
    path: 'popover-tooltip',
    title: "Build Popover / Tooltip Components",
    category: 'Fundamentals',
    type:'medium',
    description: "Build Popover and Tooltip components with the following features:",
    points: [
      "Popover (click) open/close",
      "Tooltip (hover/focus) with delay",
      "Placement support",
      "Click outside + Escape to close"
    ],
    concepts: "Click outside detection, Escape handler, Positioning relative UI, Accessibility roles",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 Popover.jsx + Tooltip.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useRef, useState } from "react";

export function Popover({
  trigger,
  content,
  placement = "bottom",
  open,
  defaultOpen = false,
  onOpenChange,
}) {
  const isControlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const rootRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!isOpen) return;
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setNext(false);
    };

    const onKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") setNext(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const setNext = (next) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const placementCls = useMemo(() => {
    switch (placement) {
      case "top":
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "bottom":
      default:
        return "top-full mt-2 left-1/2 -translate-x-1/2";
    }
  }, [placement]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <span
        onClick={() => setNext(!isOpen)}
        className="inline-flex"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {trigger}
      </span>

      {isOpen && (
        <div
          role="dialog"
          className={
            "absolute z-20 min-w-[220px] rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 " +
            placementCls
          }
        >
          {content}
        </div>
      )}
    </div>
  );
}

export function Tooltip({
  children,
  text,
  placement = "top",
  delayMs = 150,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const placementCls = useMemo(() => {
    switch (placement) {
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      case "top":
      default:
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
    }
  }, [placement]);

  const show = () => {
    if (disabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(true), delayMs);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {open && (
        <span
          role="tooltip"
          className={
            "absolute z-20 max-w-[240px] rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg " +
            placementCls
          }
        >
          {text}
        </span>
      )}
    </span>
  );
}
`
      }
    ]
  },

  {
    id: 20,
    path: 'tag-input',
    title: "Build a Tag Input Component",
     category: 'Fundamentals',
    type:'medium',
    description: "Build a Tag Input with the following features:",
    points: [
      "Add tag on Enter",
      "Add multiple tags with comma",
      "Backspace deletes last tag when input is empty",
      "Prevent duplicates + remove tags",
      "Optional max tags"
    ],
    concepts: "Controlled vs uncontrolled, Normalization, Keyboard UX, Array updates, Reusable chip UI",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 TagInput.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useRef, useState } from "react";

function normalizeTag(tag) {
  return String(tag || "").trim();
}

export function TagInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Type and press Enter…",
  allowDuplicates = false,
  maxTags,
  label = "Tags",
  disabled = false,
}) {
  const isControlled = Array.isArray(value);
  const [internalTags, setInternalTags] = useState(defaultValue);
  const tags = isControlled ? value : internalTags;

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isControlled) return;
    setInternalTags(value);
  }, [isControlled, value]);

  const atLimit = useMemo(() => {
    if (typeof maxTags !== "number") return false;
    return tags.length >= maxTags;
  }, [maxTags, tags.length]);

  const commitTags = (next) => {
    if (!isControlled) setInternalTags(next);
    onChange?.(next);
  };

  const removeAt = (idx) => {
    const next = tags.filter((_, i) => i !== idx);
    commitTags(next);
  };

  const addTag = (raw) => {
    if (disabled) return;
    if (atLimit) return;

    const tag = normalizeTag(raw);
    if (!tag) return;

    if (!allowDuplicates) {
      const exists = tags.some((t) => String(t).toLowerCase() === tag.toLowerCase());
      if (exists) return;
    }

    commitTags([...tags, tag]);
  };

  const addFromInput = () => {
    const raw = input;
    setInput("");
    addTag(raw);
  };

  const addManyFromInput = (text) => {
    const parts = String(text || "")
      .split(",")
      .map((p) => normalizeTag(p))
      .filter(Boolean);

    if (!parts.length) return;

    let next = tags.slice();
    for (const p of parts) {
      if (typeof maxTags === "number" && next.length >= maxTags) break;
      if (!allowDuplicates) {
        const exists = next.some((t) => String(t).toLowerCase() === p.toLowerCase());
        if (exists) continue;
      }
      next.push(p);
    }

    commitTags(next);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</div>
        {typeof maxTags === "number" && (
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {tags.length}/{maxTags}
          </div>
        )}
      </div>

      <div
        className={
          "mt-3 flex flex-wrap items-center gap-2 rounded-2xl border bg-white p-3 dark:bg-gray-900 " +
          (disabled
            ? "border-gray-200 opacity-75 dark:border-gray-800"
            : "border-gray-300 dark:border-gray-700")
        }
        onClick={() => inputRef.current?.focus?.()}
      >
        {tags.map((t, idx) => (
          <span
            key={t + "-" + idx}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-100"
          >
            <span className="max-w-[180px] truncate">{t}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(idx);
                }}
                className="rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label={"Remove tag " + t}
              >
                <i className="ri-close-line" />
              </button>
            )}
          </span>
        ))}

        <input
          ref={inputRef}
          value={input}
          disabled={disabled || atLimit}
          placeholder={atLimit ? "Tag limit reached" : placeholder}
          onChange={(e) => {
            const v = e.target.value;
            if (v.includes(",")) {
              addManyFromInput(v);
              setInput("");
              return;
            }
            setInput(v);
          }}
          onKeyDown={(e) => {
            if (disabled) return;

            if (e.key === "Enter") {
              e.preventDefault();
              addFromInput();
              return;
            }

            if (e.key === "Backspace") {
              if (input.length === 0 && tags.length > 0) {
                e.preventDefault();
                removeAt(tags.length - 1);
              }
            }
          }}
          className="min-w-[140px] flex-1 bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
        />
      </div>

      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
        Tip: Use <span className="font-medium">Enter</span> or <span className="font-medium">comma</span> to add.
      </div>
    </div>
  );
}
`
      }
    ]
  },

  {
    id: 21,
    path: 'virtualized-list',
    title: "Build a Virtualized List",
    category: 'Fundamentals',
    type:'advanced',
    description: "Build a Virtualized List (windowing) with the following features:",
    points: [
      "Render only visible rows",
      "Fixed row height",
      "Overscan for smoother scroll",
      "Fast scroll handling"
    ],
    concepts: "Windowing, Derived visible range, Overscan, requestAnimationFrame throttling, Performance",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 VirtualizedList.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function VirtualizedList({
  items,
  height = 420,
  rowHeight = 44,
  overscan = 6,
  renderRow,
}) {
  const list = Array.isArray(items) ? items : [];
  const total = list.length;

  const viewportRef = useRef(null);
  const rafRef = useRef(null);

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onScroll = (e) => {
    const next = e.currentTarget.scrollTop;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setScrollTop(next);
      rafRef.current = null;
    });
  };

  const totalHeight = total * rowHeight;

  const range = useMemo(() => {
    const startIndex = clamp(Math.floor(scrollTop / rowHeight) - overscan, 0, Math.max(0, total - 1));
    const visibleCount = Math.ceil(height / rowHeight) + overscan * 2;
    const endIndex = clamp(startIndex + visibleCount - 1, 0, Math.max(0, total - 1));

    return { startIndex, endIndex };
  }, [height, overscan, rowHeight, scrollTop, total]);

  const offsetY = range.startIndex * rowHeight;
  const visibleItems = list.slice(range.startIndex, range.endIndex + 1);

  return (
    <div
      ref={viewportRef}
      onScroll={onScroll}
      className="w-full overflow-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
      style={{ height }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: "translateY(" + offsetY + "px)", willChange: "transform" }}>
          {visibleItems.map((item, localIdx) => {
            const index = range.startIndex + localIdx;

            return (
              <div key={index} style={{ height: rowHeight }}>
                {typeof renderRow === "function" ? (
                  renderRow({ item, index })
                ) : (
                  <div className="flex h-full items-center px-4 text-sm text-gray-800 dark:text-gray-100">
                    Row {index}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
`
      }
    ]
  },
  {
    id: 2,
    path: 'carousel',
    title: "Image Carousel / Slider",
    description: "Build a Image Carousel / Slider with the following features:",
     category: 'Fundamentals',
    type: 'easy',
    points: ["Smooth Image Slider", "Next / Previous Navigation", "Auto Slide Support", "Dot Indicators", "Title & Description Overlay", "Fully Reusable Component"],
    concepts: "Component Design, State Management(useState), Side Effects(useEffect), Reusable Components, Auto Slide Logic, Conditional Rendering, Event Handling, UI State Synchronization",
    solution: [{
      heading: 'Carousel Component (Carousel.jsx)',
      code: `import React, { useEffect, useState } from "react";
  const slides = [
       {
        image: "https://picsum.photos/id/1015/800/400",
        title: "Build Fast UI",
        description: "Reusable components with clean architecture"
    },
    {
        image: "https://picsum.photos/id/1016/800/400",
        title: "Modern Design",
        description: "Professional UI patterns used in real apps"
    },
    {
        image: "https://picsum.photos/id/1018/800/400",
        title: "Scalable Code",
        description: "Optimized, readable and interview-ready code"
    }
];

export const Carousel = ({ autoSlide = true, interval = 3000 }) => {
    const [current, setCurrent] = useState(0);

    const total = slides.length;

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % total);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + total) % total);
    };

    useEffect(() => {
        if (!autoSlide) return;

        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer);
    }, [current, autoSlide, interval]);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg">

            {/* Image */}
            <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-[300px] object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold">
                    {slides[current].title}
                </h3>
                <p className="text-sm opacity-90">
                    {slides[current].description}
                </p>
            </div>

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-9 h-9 rounded-full"
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-9 h-9 rounded-full"
            >
                ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={\`w-2.5 h-2.5 rounded-full \${current === index ? "bg-white" : "bg-white/50"
                            }\`}
                    />
                ))}
            </div>
        </div>
    );
}`}],
  },
  {
    id: 3,
    path: 'toast',
    title: "Build a Toast Notification System",
     category: 'Fundamentals',
    type: 'easy',
    description: "Build a Toast Notification System with the following features:",
    points: [
      "Slide / Fade animation",
      "Position control",
      "Dark mode",
      "Pause on hover",
      "Global Toast using Context API"
    ],
    concepts: "Context API (global state), Custom hooks, Timers & cleanup, Animations, UX improvements (hover pause), Reusable & scalable architecture",
    solution: [{
      heading: 'Project Structure',
      code: `ToastProvider (Context)
 ├─ useToast()  ← global hook
 ├─ ToastContainer
 └─ ToastItem (single toast)`
    },
    {
      heading: '1️⃣ Toast Context (GLOBAL STATE) 🌐 ToastContext.jsx',
      code: `import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({
    message,
    type = "success",
    duration = 3000,
    position = "top-right"
  }) => {
    const id = toastId++;

    setToasts((prev) => [
      ...prev,
      { id, message, type, duration, position }
    ]);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
`
    },
    {
      heading: '2️⃣ Toast Container (Position Control 📍) ToastContainer.jsx',
      code: `import { ToastItem } from "./ToastItem";

const positionMap = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <>
      {Object.keys(positionMap).map(position => (
        <div
          key={position}
          className={\`fixed z- 50 space - y - 3 \${ positionMap[position]}\`}
        >
          {toasts
            .filter(t => t.position === position)
            .map(toast => (
              <ToastItem
                key={toast.id}
                toast={toast}
                removeToast={removeToast}
              />
            ))}
        </div>
      ))}
    </>
  );
};`
    }, {
      heading: '3️⃣ Toast Item (Animation + Pause on Hover 🔄⏳) ToastItem.jsx',
      code: `import { useEffect, useRef, useState } from "react";

export const ToastItem = ({ toast, removeToast }) => {
  const timerRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!hover) {
      timerRef.current = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
    }

    return () => clearTimeout(timerRef.current);
  }, [hover]);

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
        clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => setHover(false)}
      className={\`min- w - [260px] px - 4 py - 3 rounded shadow - lg text - sm flex justify - between items - center
        transition - all duration - 300 ease -in -out
        animate - slide - fade
        \${ toast.type === "success" && "bg-green-500 text-white" }
        \${ toast.type === "error" && "bg-red-500 text-white" }
        \${ toast.type === "info" && "bg-blue-500 text-white" }
        dark: bg - gray - 800 dark: text - white
      \`}
    >
      <span>{toast.message}</span>
      <button onClick={() => removeToast(toast.id)}>✕</button>
    </div>
  );
};`

    }, {
      heading: "4️⃣ Animation (Tailwind CSS) 🔄",
      code: `@keyframes slideFade {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-fade {
  animation: slideFade 0.3s ease forwards;
}
`
    }, {
      heading: "6️⃣ Use Toast Anywhere (Global Hook 🔥)",
      code: `import { ToastProvider, useToast } from "./ToastContext";
import { ToastContainer } from "./ToastContainer";

const Demo = () => {
  const { showToast } = useToast();

  return (
    <div className="space-x-3">
      <button
        onClick={() =>
          showToast({
            message: "Order placed successfully 🎉",
            type: "success",
            position: "top-right",
          })
        }
        className="btn"
      >
        Success
      </button>

      <button
        onClick={() =>
          showToast({
            message: "Something went wrong ❌",
            type: "error",
            position: "bottom-left",
          })
        }
        className="btn"
      >
        Error
      </button>
    </div>
  );
};

export default function App() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <Demo />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

`
    }]
  },
  {
    id: 4,
    path: 'simple-infinite-scroll',
    title: "Build a Simple Infinite Scroll",
    category: 'API Integration',
    type: 'easy',
    description: "Build a Simple Infinite Scroll with the following features:",
    points: [
      "Load more on scroll",
      "Loader",
      "Stop when no more data",
      "Uses real API",
      "Easy to explain in interview"
    ],
    concepts: "useEffect, IntersectionObserver(BEST way 🔥), Pagination via API, Loading & end - state handling",
    solution: [{
      heading: 'Final Infinite Scroll Component InfiniteScroll.jsx',
      code: `import React, { useEffect, useRef, useState } from "react";

const LIMIT = 10;

export default function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  /* ---------- Fetch Data ---------- */
  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(
      \`https://dummyjson.com/products?limit=\${LIMIT}&skip=\${page * LIMIT}\`
    );
const data = await res.json();

setItems((prev) => [...prev, ...data.products]);

if (data.products.length < LIMIT) {
  setHasMore(false); // 🚫 No more data
}

setPage((prev) => prev + 1);
setLoading(false);
  };

/* ---------- Initial Load ---------- */
useEffect(() => {
  fetchData();
}, []);

/* ---------- Intersection Observer ---------- */
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    },
    { threshold: 1 }
  );

  if (loaderRef.current) {
    observer.observe(loaderRef.current);
  }

  return () => observer.disconnect();
}, [loading, hasMore]);

return (
  <div className="max-w-4xl mx-auto p-4">
    <h1 className="text-xl font-semibold mb-6">🔥 Infinite Scroll</h1>

    {/* ---------- Items ---------- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-40 w-full object-cover rounded mb-3"
          />
          <h2 className="font-medium text-sm mb-1">{item.title}</h2>
          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
            {item.description}
          </p>
          <span className="text-sm font-semibold">₹{item.price}</span>
        </div>
      ))}
    </div>

    {/* ---------- Loader / End ---------- */}
    <div ref={loaderRef} className="flex justify-center py-6">
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {!hasMore && (
        <p className="text-sm text-gray-400">🚫 No more products</p>
      )}
    </div>
  </div>
);
}
`
    },
    {
      MainHeading: '🧪 What Happens Step-by-Step (Explain in Interview)',
      heading: '1️⃣ Page State',
      code: 'const [page, setPage] = useState(0);',
      description: 'Tracks how many batches are loaded.'
    },
    {

      heading: '2️⃣ IntersectionObserver',
      code: `
      if (entries[0].isIntersecting) {
             fetchData();
      }`,
      description: 'When loader enters viewport → load more data. 👉 <strong>Better than scroll event</strong> (performance)'
    },
    {
      heading: '3️⃣ Stop Condition',
      code: `if (data.products.length < LIMIT) {
  setHasMore(false);
}`,
      description: 'If API returns fewer items → no more data.'
    },
    {
      heading: '4️⃣ Loader UX',
      code: `{loading && "Loading..."}
{!hasMore && "No more products"}
      `,
      description: ''
    },


    ]
  },
  {
    id: 5,
    path: 'custom-hook',
    title: "Build a Custom Hook",
     category: 'Hooks',
    type:'medium',
    description: "Build a Custom Hook with the following features:",
    points: [
      "Fetch products from API",
      "Search with debounce",
      "Persist theme(dark / light) in localStorage",
      "Dropdown filter(click outside close)",
      "Reusable hooks, clean separation"
    ],
    concepts: "Custom Hooks, API Integration, Debouncing, Performance Optimization, Controlled Inputs, Click Outside Detection, LocalStorage Persistence",
    solution: [{
      heading: '🥇 1. useFetch (MOST IMPORTANT)',
      description:
        "👉 Why interviewers love it",
      options: [
        "Separation of concerns",
        "Async logic extraction",
        "Reusability",
        "Error handling"
      ],
      InterviewLine: "",
      code: `import { useEffect, useState } from "react";

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Something went wrong");
        const result = await res.json();

        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};
`
    },
    {
      heading: '🥈 2. useDebounce (VERY COMMON 🔥)',
      description:
        "👉 Why interviewers love it",
      options: [
        "Separation of concerns",
        "Async logic extraction",
        "Reusability",
        "Error handling"
      ],

      InterviewLine: "Debouncing prevents unnecessary re - renders and API calls.",
      code: `import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
`
    },
    {
      heading: '🥉 3. useLocalStorage',
      description: '👉 Shows real-world thinking',
      options: ['Persistence', 'Controlled state'],
      code: `import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
 `,

    },

    {
      heading: '4️⃣ useClickOutside (UI GOLD 🔥)',
      description: '👉 Used in:',
      options: ["Modal", "Dropdown", "Tooltip"],
      code: `import { useEffect } from "react";

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};
`

    },
    {
      heading: '5️⃣ useToggle (Clean + Simple)',
      description: '👉 Great for:',
      options: ["Modal open/close", "Dropdown", "Tooltip", "Accordion"],
      code: `import { useState } from "react";

export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
};

`

    },
    {
      heading: '6️⃣ usePrevious (ADVANCED BUT IMPRESSIVE)',
      description: '👉 Great for:',
      options: ["Modal open/close", "Dropdown", "Tooltip", "Accordion"],
      code: `import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

`

    },
    ]
  },
  {
    id: 6,
    path: 'reusable-table',
    title: "Build a Resuable Table",
     category: 'Filtering',
     type:'medium',
    description: "Build a Resuable Table with the following features:",
    points: [
      "Column sorting(ASC / DESC)",
      "Search filtering(case-insensitive)",
      "Pagination(professional logic)",
      "Reusable via props",
      "Clean state handling"
    ],
    concepts: "Component Design, State Management, Derived State, Sorting Algorithms, Pagination Logic, Controlled Inputs, Reusability",
    solution: [{
      heading: '🧩 Sample Data',
      description:
        "",
      options: [

      ],
      InterviewLine: "",
      code: `const USERS = [
  { id: 1, name: "Aakash", email: "aakash@gmail.com", role: "Admin" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com", role: "User" },
  { id: 3, name: "Sneha", email: "sneha@gmail.com", role: "User" },
  { id: 4, name: "Priya", email: "priya@gmail.com", role: "Manager" },
  { id: 5, name: "Vikas", email: "vikas@gmail.com", role: "Admin" },
  { id: 6, name: "Neha", email: "neha@gmail.com", role: "User" },
];`
    },
    {
      heading: 'FULL COMPONENT CODE',
      description:
        "ReusableTable.jsx",
      options: [

      ],

      InterviewLine: "",
      code: `import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 3;

export default function ReusableTable({ data }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Filtering
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  // 🔃 Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const { key, direction } = sortConfig;

    return [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 📄 Pagination
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  // 🔁 Sort handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reusable Table</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-2 mb-4 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="border px-4 py-2 cursor-pointer bg-gray-100"
              >
                {key.toUpperCase()}
                {sortConfig?.key === key &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length ? (
            paginatedData.map((row) => (
              <tr key={row.id}>
                {Object.values(row).map((val, idx) => (
                  <td key={idx} className="border px-4 py-2">
                    {val}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="100%" className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
`
    },



    ]
  },
  {
    id: 6,
    path: 'undo-redo',
    title: "Build a Undo / Redo Feature",
     category: 'Fundamentals',
     type:'medium',
    description: "Build a Undo / Redo Feature with the following three states:",
    points: [
      "past     → history of previous states",
      "present  → current state",
      "future   → states undone (for redo)"
    ],
    concepts: "State History Management, Immutable State, Stacks (Past / Present / Future), Keyboard Event Handling, Controlled Inputs",
    solution: [
    {
      heading: 'FULL COMPONENT CODE',
      description:
        "🔥 UndoRedo.jsx",
      options: [

      ],

      InterviewLine: "",
      code:`import { useEffect, useState } from "react";

export default function UndoRedo() {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState("");
  const [future, setFuture] = useState([]);

  /* ---------- Handle Change ---------- */
  const handleChange = (e) => {
    const value = e.target.value;

    setPast([...past, present]);
    setPresent(value);
    setFuture([]); // clear redo stack
  };

  /* ---------- Undo ---------- */
  const undo = () => {
    if (!past.length) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  };

  /* ---------- Redo ---------- */
  const redo = () => {
    if (!future.length) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setFuture(newFuture);
    setPresent(next);
  };

  /* ---------- Keyboard Support ---------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      }

      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        🔥 Undo / Redo Editor
      </h2>

      <textarea
        value={present}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
        rows={6}
        placeholder="Start typing..."
      />

      <div className="flex gap-3">
        <button
          onClick={undo}
          disabled={!past.length}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Undo (Ctrl+Z)
        </button>

        <button
          onClick={redo}
          disabled={!future.length}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Redo (Ctrl+Y)
        </button>
      </div>
    </div>
  );
}
`
    },



    ]
  },

  {
    id: 7,
    path: 'file-upload',
    title: "Build a File Upload Component (Drag & Drop)",
     category: 'File Upload',
    type:'advanced',
    description: "Build a File Upload component with the following features:",
    points: [
      "Drag & drop + click to browse",
      "Validate type (PNG/JPEG/PDF)",
      "Validate max size (2MB)",
      "Show file details (name/type/size)",
      "Preview image (PDF placeholder)",
      "Remove / replace file",
      "Mock upload + progress UI"
    ],
    concepts: "Controlled inputs, File validation, Drag & Drop events, Object URL preview + cleanup, UX states (error/loading/success), Conditional rendering",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 FileUpload.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useState, useRef } from "react";

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);

  // Allowed file types and size (2MB)
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  const maxSize = 2 * 1024 * 1024;

  const isImage = file?.type?.startsWith("image/");
  const isPdf = file?.type === "application/pdf";

  const previewUrl = useMemo(() => {
    if (!file || !isImage) return null;
    return URL.createObjectURL(file);
  }, [file, isImage]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Only PNG, JPEG, PDF allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File too large. Max size is 2MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
    setSuccess(false);
    setProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    setSuccess(false);
    setUploading(false);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setSuccess(false);

    setProgress(0);
    const start = Date.now();
    const duration = 2000;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);
      if (nextProgress >= 100) window.clearInterval(interval);
    }, 50);

    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setProgress(100);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">File Upload</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Upload an image (PNG/JPEG) or a PDF. Max size: {(maxSize / (1024 * 1024)).toFixed(0)}MB.
              </p>
            </div>

            {file && (
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Remove
              </button>
            )}
          </div>

          <div
            className={
              "mt-6 rounded-xl border-2 border-dashed p-8 text-center transition-colors " +
              (dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 "
                : "border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ") +
              (uploading ? "pointer-events-none opacity-80" : "cursor-pointer")
            }
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <i className="ri-upload-cloud-2-line text-2xl"></i>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-100">Drag & drop your file here</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">or click to browse</p>

            <input
              type="file"
              ref={inputRef}
              className="hidden"
              accept="image/png,image/jpeg,application/pdf"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
              {error}
            </div>
          )}

          {file && (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <i className={isPdf ? "ri-file-pdf-2-line text-xl" : "ri-image-2-line text-xl"}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      {(file.size / 1024).toFixed(2)} KB • {file.type || "unknown type"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading || success}
                    className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploading ? "Uploading..." : success ? "Uploaded" : "Upload"}
                  </button>

                  {(uploading || progress > 0) && (
                    <div className="mt-3">
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all"
                          style={{ width: progress + "%" }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">{progress}%</p>
                    </div>
                  )}

                  {success && (
                    <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-300">✅ File uploaded successfully!</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Preview</p>
                <div className="mt-3 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
                  {isImage && previewUrl ? (
                    <img src={previewUrl} alt="preview" className="h-56 w-full object-contain" />
                  ) : isPdf ? (
                    <div className="flex h-56 flex-col items-center justify-center p-6 text-center">
                      <i className="ri-file-pdf-2-line text-4xl text-gray-700 dark:text-gray-200" />
                      <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">PDF selected</p>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">Preview not available here</p>
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center p-6 text-sm text-gray-600 dark:text-gray-300">No preview available</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
`
      }
    ]
  },

  {
    id: 8,
    path: 'rating',
    title: "Build a Star Rating Component",
    category: 'Fundamentals',
    type: 'easy',
    description: "Build a Star Rating component with the following features:",
    points: [
      "Hover state preview",
      "Click to select rating",
      "Reset rating",
      "Controlled + uncontrolled support",
      "Keyboard accessible (arrow keys, Home/End)",
      "Optional readOnly mode"
    ],
    concepts: "Controlled components, Derived UI state (hover vs selected), Accessibility (radiogroup/radio), Keyboard handling, Reusable component API",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 Rating.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useId, useMemo, useState } from "react";

export function Rating({
  max = 5,
  value,
  defaultValue = 0,
  onChange,
  readOnly = false,
  size = "md",
  label = "Rating",
  showValue = true,
}) {
  const isControlled = typeof value === "number";
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(null);

  const currentValue = isControlled ? value : internalValue;

  const id = useId();
  const groupLabelId = id + "-label";

  const sizes = useMemo(
    () => ({
      sm: "text-lg gap-1",
      md: "text-2xl gap-1.5",
      lg: "text-3xl gap-2",
    }),
    []
  );

  useEffect(() => {
    if (!isControlled) return;
    setInternalValue(value);
  }, [isControlled, value]);

  const setNextValue = (next) => {
    if (readOnly) return;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const displayValue = hoverValue ?? currentValue;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div id={groupLabelId} className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {label}
          </div>
          {showValue && (
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              {currentValue}/{max}
            </div>
          )}
        </div>

        {!readOnly && (
          <button
            type="button"
            onClick={() => setNextValue(0)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Reset
          </button>
        )}
      </div>

      <div
        className={"mt-4 flex items-center " + (sizes[size] || sizes.md)}
        role="radiogroup"
        aria-labelledby={groupLabelId}
        onMouseLeave={() => setHoverValue(null)}
      >
        {Array.from({ length: max }, (_, idx) => {
          const starValue = idx + 1;
          const active = starValue <= displayValue;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={currentValue === starValue}
              aria-label={starValue + " star"}
              disabled={readOnly}
              onMouseEnter={() => {
                if (!readOnly) setHoverValue(starValue);
              }}
              onClick={() => setNextValue(starValue)}
              onKeyDown={(e) => {
                if (readOnly) return;
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setNextValue(Math.min(max, currentValue + 1));
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  e.preventDefault();
                  setNextValue(Math.max(0, currentValue - 1));
                }
                if (e.key === "Home") {
                  e.preventDefault();
                  setNextValue(0);
                }
                if (e.key === "End") {
                  e.preventDefault();
                  setNextValue(max);
                }
              }}
              className={
                "transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded " +
                (readOnly ? "cursor-default" : "cursor-pointer")
              }
            >
              <i
                className={
                  active
                    ? "ri-star-fill text-yellow-500"
                    : "ri-star-line text-gray-400 dark:text-gray-500"
                }
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
`
      }
    ]
  },

  {
    id: 1,
    path: 'todo',
    title: "Build a Todo App (with Features)",
    category: 'state management',
    type:'medium',
    description: "Build a Todo app with the following features:",
    points: [
      "Add, Edit, Delete todos",
      "Mark todos as completed",
      "Filter by All, Active, Completed",
      "Persist todos in localStorage",
      "Bonus: Drag & drop to reorder todos"
    ],
    concepts: "Component Design, State Management, localStorage, Controlled Inputs, Lifting State Up",
    solution: [{
      heading: '1. Project Structure',
      code: `/ src
├── components
│   ├── TodoApp.jsx
│   ├── TodoForm.jsx
│   ├── TodoFilter.jsx
│   ├── TodoList.jsx
│   └── TodoItem.jsx
├── index.js
├── styles.css`
    },
    {
      heading: '2. Create the TodoApp main Component',
      code: `import React, { useState, useEffect } from 'react'

import "./todo.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';  // We’ll use react-toastify
import TodoList from './TodoList';
import { TodoForm } from './TodoForm'
import { TodoFilter } from "./TodoFilter";

const FILTERS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};


export const TodoApp = () => {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [loading, setLoading] = useState(true);

  /*1. Data Get from the local Storage */
  useEffect(() => {
    try {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /*2. Data Store in the local Storage */
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  }, [todos]);


  /*3. Add Todo */
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  /*4. Update or Edit Todo */
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  /*3. Complete Todo */
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  /*4. Delete Todo */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.info('Todo deleted');
  };

  const reorderTodos = (startIndex, endIndex) => {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTodos(result);
  };


  const filteredTodos = todos.filter(todo => {
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  if (loading) return <div>loading Todos...</div>;  // ✅ OK here after hooks run

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans mb-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Heading of the Application Start*/}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
            <p className="text-gray-600">Stay organized and get things done</p>
          </div>
          {/* Heading of the Application End*/}

          {/* Input Field* Start */}
          <TodoForm addTodo={addTodo} />

          {/* Filter Start*/}
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            todos={todos}
          />

          {/* List */}
          <TodoList todos={filteredTodos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            reorderTodos={reorderTodos} />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              <i className="ri-lightbulb-line mr-1"></i>
              Tip: Click on a task to edit it directly
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}`
    },
    {
      heading: '3. Create the TodoForm File',
      code: `import { useState } from "react";
import { toast } from 'react-toastify'; // We’ll use react-toastify

export const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length === 0) {
      setError('Todo cannot be empty');
      toast.error('Todo cannot be empty');
      return;
    }


    addTodo(input.trim());
    toast.success('Todo added successfully');
    setInput('');
    setError('');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-3 w-full items-start">
        <div className="flex-1">
          <input type="text" id="todoInput" placeholder="Add new task..." value={input} onChange={(e) =>
            setInput(e.target.value)}
            className="add-input w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none
       focus:border-primary" />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button id="addBtn" type="submit"
          className="!rounded-button whitespace-nowrap px-6 py-3 bg-primary text-white hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center w-12 h-12">
          <i className="ri-add-line text-xl"></i>
        </button>
      </form>
    </div>
  )
}`
    }, {
      heading: '4. Create the TodoItem',
      code: `import React, { useState, memo } from 'react';


function TodoItem({ todo, updateTodo, toggleComplete, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className={\`group flex items-center justify-between  rounded-lg p-4 shadow-sm transition-all duration-300 ${'todo.completed' ? 'bg-green-100 opacity-90' : 'bg-gray-100'
        }\`}
     >
       <div className="flex items-center gap-4 flex-1">
         <input
           type="checkbox"
           className="checkbox-custom"
           checked={todo.completed}
           onChange={() => toggleComplete(todo.id)}
         />
 
         {isEditing ? (
           <form onSubmit={handleEditSubmit} className="flex gap-2 flex-1">
             <input
               type="text"
               className="flex-1 px-3 py-2 border rounded focus:outline-none"
               value={editText}
               onChange={(e) => setEditText(e.target.value)}
             />
             <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded">
               Save
             </button>
             <button
               type="button"
               onClick={() => setIsEditing(false)}
               className="px-3 py-2 bg-gray-300 rounded"
             >
               Cancel
             </button>
           </form>
         ) : (
           <span
             className={\`flex-1 text-lg ${'todo.completed' ? 'line-through text-gray-400' : 'text-gray-800'
        } transition-all duration-300\`}
           >
             {todo.text}
           </span>
         )}
       </div>
 
       {!isEditing && (
         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button
             onClick={() => setIsEditing(true)}
             className="edit-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 rounded"
           >
             <i className="ri-edit-line"></i>
           </button>
           <button
             onClick={() => deleteTodo(todo.id)}
             className="delete-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"
           >
             <i className="ri-delete-bin-line"></i>
           </button>
         </div>
       )}
     </div>
   );
 }
 
 export default memo(TodoItem);
 `
    }, {
      heading: '5. Show the TodoList',
      code: `import React, { useState } from 'react';
 import TodoItem from './TodoItem';
 
 export default function TodoList({ todos, updateTodo, toggleComplete, deleteTodo, reorderTodos }) {
   const [draggingIndex, setDraggingIndex] = useState(null);
 
   const handleDragStart = (e, index) => {
     e.dataTransfer.setData('index', index);
     setDraggingIndex(index);
   };
 
   const handleDrop = (e, dropIndex) => {
     e.preventDefault();
     const draggedIndex = e.dataTransfer.getData('index');
     reorderTodos(Number(draggedIndex), dropIndex);
     setDraggingIndex(null);
   };
 
   const handleDragOver = (e) => {
     e.preventDefault();
   };
 
   return (
     <div>
       {todos.length > 0 ? (
         <ul className="todo-list space-y-2">
           {todos.map((todo, index) => (
             <li
               key={todo.id}
               draggable
               onDragStart={(e) => handleDragStart(e, index)}
               onDragOver={handleDragOver}
               onDrop={(e) => handleDrop(e, index)}
               className={\`cursor-move transition-all ${'draggingIndex === index' ? 'opacity-50' : ''
        }\`}
             >
               <TodoItem
                 todo={todo}
                 updateTodo={updateTodo}
                 toggleComplete={toggleComplete}
                 deleteTodo={deleteTodo}
               />
             </li>
           ))}
         </ul>
       ) : (
         <div className="flex flex-col items-center justify-center py-10 text-gray-500">
           <i className="ri-emotion-sad-line text-5xl mb-4"></i>
           <p className="text-lg font-semibold">No tasks yet</p>
           <p className="text-sm text-center">
             Add your first task above to stay organized and productive.
           </p>
         </div>
       )}
     </div>
   );
 }
 `
    }, {
      heading: '6. Apply Filter',
      code: `import React from 'react';
 
 export const TodoFilter = ({ filter, setFilter, todos }) => {
   return (
     <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
       
       <div className="flex gap-2">
         <button
           onClick={() => setFilter('All')}
           className={\`filter-btn !rounded-button whitespace-nowrap px-4 py-2 text-sm font-medium border ${'filter' === 'All' ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-50'
        }\`}
         >
           All
         </button>
 
         <button
           onClick={() => setFilter('Active')}
           className={\`filter-btn !rounded-button whitespace-nowrap px-4 py-2 text-sm font-medium border ${'filter' === 'Active' ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-50'
        }\`}
         >
           Active
         </button>
 
         <button
           onClick={() => setFilter('Completed')}
           className={\`filter-btn !rounded-button whitespace-nowrap px-4 py-2 text-sm font-medium border ${'filter' === 'Completed' ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-50'
        }\`}
         >
           Completed
         </button>
       </div>
 
        <div className="text-sm text-gray-600">
           <span id="itemCount">{todos.filter(todo => !todo.completed).length}</span> items left
        </div>
     </div>
   );
 };
 `
    }]
  },
  {
    id: 2,
    path: 'modal',
    title: "Create a Modal System (Reusable)",
     category: 'Fundamentals',
    type:'medium',
    description: "Implement a reusable modal component system where modals can be opened from anywhere in the app, and multiple types of modals can be shown (confirmation, form, message).",
    points: [
      "Modal should support: title, body content, action buttons (confirm/cancel)",
      "Support stacking multiple modals (optional)"
    ],
    concepts: "Portals, Context API, Props Drilling Avoidance, Reusability",
    solution: [{
      heading: '1. Create Modal Context',
      code: `// ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';
const ModalContext = createConte
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = ({ title, body, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  const id = Date.now();
  setModals((prev) => [...prev, { id, title, body, onConfirm, onCancel, confirmText, cancelText }]);
  return id;
};
             
const closeModal = (id) => {
  setModals((prev) => prev.filter((m) => m.id !== id));
};
   
return (
  <ModalContext.Provider value={{ openModal, closeModal }}>
    {children}
    {modals.map((modal) => (
      <Modal
        key={modal.id}
        {...modal}
        onClose={() => closeModal(modal.id)}
      />
    ))}
  </ModalContext.Provider>
);
};
  `,
    },
    {
      heading: '2. Modal Component (with Portal)',
      code: `// Modal.jsx
import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ title, body, onConfirm, onCancel, confirmText, cancelText, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="text-gray-700">{body}</div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              onClick={() => {
                onCancel();
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
`
    },
    {
      heading: '3. Wrap Your App with ModalProvider',
      code: `// App.jsx or main entry
import React from 'react';
import { ModalProvider } from './ModalContext';
import YourMainComponent from './YourMainComponent';

function App() {
  return (
    <ModalProvider>
      <YourMainComponent />
    </ModalProvider>
  );
}

export default App;`},
    {
      heading: '4. Example Usage in Any Component',
      code: `import React from 'react';
import { useModal } from './ModalContext';

function ExamplePage() {
  const { openModal } = useModal();

  const showConfirm = () => {
    openModal({
      title: 'Delete Item',
      body: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => alert('Item deleted!'),
      onCancel: () => console.log('Cancel clicked'),
    });
  };

  return (
    <div className="p-8">
      <button
        onClick={showConfirm}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Delete Something
      </button>
    </div>
  );
}

export default ExamplePage;
`,
    }
    ]
  },
  {
    id: 3,
    path: 'search',
     category: 'Debounce',
    title: "Implement a Search Bar with Debounce",
     type:'medium',
    description: "Create a search bar component that fetches data from an API (use Dummy API) as the user types. Implement debounce to limit API calls.",
    points: [
      "Display search results in a dropdown",
      "Handle empty results and loading states"
    ],
    concepts: "useState, useEffect, custom hooks, debounce logic, handling API calls, loading and error states",
    solution: [{
      heading: '1. Create a custom useDebounce hook',
      code: `// useDebounce.js
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // Cleanup
  }, [value, delay]);

  return debouncedValue;
};

      `,
    }, {
      heading: '2. SearchBar Component with API Call + Dropdown',
      code: `// SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {

        const res = await fetch("https://dummyjson.com/products/search?q='$'/{debouncedQuery}");
        const data = await res.json();
        setResults(data.products || []);
      } catch (err) {
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border rounded shadow focus:outline-none"
      />

      {loading && (
        <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-2 text-sm text-gray-500">
          Loading...
        </div>
      )}

      {error && (
        <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-2 text-sm text-red-500">
          {error}
        </div>
      )}

      {!loading && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow mt-1 rounded max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item.title}
            </li>
          ))}
        </ul>
      )}

      {!loading && debouncedQuery && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-2 text-sm text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
};`,
    }, {
      heading: '3. Usage in App Component',
      code: `// App.jsx
import React from 'react';
import { SearchBar } from './SearchBar';

function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <SearchBar />
    </div>
  );
}

export default App;
`,
    }],
  },
  {
    id: 4,
    path: 'dynamic-form',
    title: "Build a Dynamic Form Generator",
     category: 'Form manipulation',
     type:'medium',
    description: "Given a JSON schema, generate a form dynamically and display form data in JSON format on submit.",
    points: [
      "Dynamic rendering",
      "Controlled Components",
      "useState",
      "Form Validation (optional)"
    ],
    concepts: "Dynamic rendering, Controlled Components, useState, Form Validation",
    solution: [{
      heading: '1. Example JSON Schema',
      paragraph: '',
      code: `export const formSchema = [
  { label: "Name", type: "text", name: "name" },
  { label: "Age", type: "number", name: "age" },
  { label: "Gender", type: "select", name: "gender", options: ["Male", "Female"] }
];
`},
    {
      heading: '2. DynamicForm Component',
      paragraph: '',
      code: `import React, { useState } from 'react';

export const DynamicForm = ({ schema }) => {
  // Initialize form state dynamically
  const initialState = schema.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">

        {schema.map((field, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{field.label}</label>

            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="px-3 py-2 border rounded"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option, optIdx) => (
                  <option key={optIdx} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="px-3 py-2 border rounded"
                required
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-medium mb-2">Form Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
`}, {
      heading: '3. Example Usage in Page',
      paragraph: '',
      code: `import React from 'react';
import { DynamicForm } from '../components/DynamicForm/DynamicForm';
import { formSchema } from '../data/formSchema'; // make sure path is correct

export const DynamicFormPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Dynamic Form Generator</h1>
      <DynamicForm schema={formSchema} />
    </div>
  );
};
`}, {
      heading: '4. Sample folder structure recommendation',
      paragraph: '',
      code: `src/
├── components/
│   └── DynamicForm/
│       └── DynamicForm.jsx
├── data/
│   └── formSchema.js
├── pages/
│   └── DynamicFormPage.jsx
`},
    ]
  },
  {
    id: 5,
    path: 'pagination',
    title: "Implement Pagination from API Data",
    category: 'Fundamentals',
    type:'medium',
    description: "Fetch a list of items from an API and display them with pagination (previous/next page buttons).",
    points: [
      "Display current page and total pages",
      "Handle loading and error states"
    ],
    concepts: "useEffect, useState, API calls, pagination logic, conditional rendering",
    solution: [{
      heading: '1. Set Up State Variables',
      paragraph: 'Define state variables to manage the current page, total pages, data, and loading/error states.',
      code: `import React, { useState, useEffect } from 'react';
      
      const PaginatedData = () => {
      const [data, setData] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(0);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      
      // Fetch data when currentPage changes
      useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
      const limit = 2; // Number of items per page
      const skip = (currentPage - 1) * limit; // Calculate the skip value
      
      const response = await fetch("https://dummyjson.com/products?limit=limit&skip=skip");
      const result = await response.json();
      
      setData(result.products); // Assuming the API returns products in a 'products' array
      setTotalPages(Math.ceil(result.total / limit)); // Calculate total pages
      } catch (err) {
      setError('Failed to fetch data');
      } finally {
      setLoading(false);
      }
      };
      
      fetchData();
      }, [currentPage]);
      
      // Render loading, error, or data
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;
      
      return (
      <div className='flex gap-4 flex-col'>
          <div className='flex gap-4 '>
              {data.map(item => (
              <div key={item.id}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                      <img className="p-8 rounded-t-lg" src={item.thumbnail} alt="product image" />
                  </a>
                  <div className="px-5 pb-5">
                      <a href="#">
                          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor" viewBox="0 0 22 20">
                                  <path
                                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{item.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.price}</span>
                          <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                              to cart</a>
                      </div>
                  </div>
              </div>
      
              ))}
          </div>
          <div>
              <button className='' onClick={()=> setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}>
                  Previous
              </button>
              <span>
                  Page {currentPage} of {totalPages}
              </span>
              <button onClick={()=> setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}>
                  Next
              </button>
          </div>
      </div>
      );
      };
      
      export default PaginatedData;`}],

  },
  {
    id: 6,
    path: 'theme-toggle',
    title: "Create a Theme Toggle (Light/Dark Mode)",
     category: 'Toggle',
    type: 'easy',
    description: "Implement a light/dark mode toggle using Context API or Redux.",
    points: [
      "Persist theme preference in localStorage",
      "Apply CSS variables or Tailwind theme logic dynamically"
    ],
    concepts: "Context API, localStorage, Theme Design, Provider Pattern",
    solution: [{
      heading: '1. Create the Theme Context',
      paragraph: 'Create a new file ThemeContext.js',
      subPara: 'This context provides the current theme and a function to toggle it. It also persists the theme preference in localStorage.',
      code: `import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
`},
    {
      heading: '2. Wrap Your Application with the Theme Provider',
      paragraph: 'In your index.js or App.js, wrap your application with the ThemeProvider:',
      code: `import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './ThemeContext';
import App from './App';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
`},
    {
      heading: '3. Create the Theme Toggle Component',
      paragraph: 'Create a ThemeToggle.js component:',
      subPara: 'This component displays a sun or moon icon based on the current theme and toggles the theme when clicked.',
      code: `import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
`},
    {
      heading: '4. Use the Theme Toggle in Your Application',
      paragraph: 'In your App.js or any component, include the ThemeToggle:',
      code: `import React from 'react';
import ThemeToggle from './ThemeToggle';

const App = () => {
  return (
    <div className="min-h-screen">
      <header className="p-4">
        <ThemeToggle />
      </header>
      <main className="p-4">
        {/* Your content */}
      </main>
    </div>
  );
};

export default App;
`},]
  },
  {
    id: 7,
    path: 'drag-drop-list',
    title: "Implement Drag and Drop List (Reordering Items)",
    category: 'Drag and Drop',
    type:'medium',
    description: "Implement a list of items that the user can reorder using drag & drop.",
    points: [
      "Use a library (like react-beautiful-dnd) or build your own basic implementation",
      "Store the new order in state"
    ],
    concepts: "DOM Events, State Update, Performance Optimization, Component Design",
    solution: [{
      heading: 'Example Code Implementation:',
      paragraph: '',
      subPara: '',
      code: `import React, { useState } from 'react';

const CustomDragDropList = () => {
  const [items, setItems] = useState([
    { id: '1', content: 'Learn React' },
    { id: '2', content: 'Build Todo App' },
    { id: '3', content: 'Implement Drag & Drop' },
    { id: '4', content: 'Deploy App' }
  ]);

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index === draggedItemIndex) return;

    const updatedItems = [...items];
    const draggedItem = updatedItems[draggedItemIndex];
    updatedItems.splice(draggedItemIndex, 1);
    updatedItems.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setItems(updatedItems);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className="p-4 mb-2 bg-gray-100 rounded shadow cursor-move"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default CustomDragDropList;

`}]
  },
  {
    id: 8,
    path: 'cinema-seat-booking',
    title: "Cinema Hall Seat Booking",
     category: 'useMemo',
    type:'advanced',
    description: "Build a cinema hall seat booking UI with the following features:",
    type: 'advanced',
    points: [
      "Seat grid with rows and columns",
      "Booked seats (disabled)",
      "Select / deselect seats",
      "Show selected seats + total price",
      "Reset selection",
      "Confirm booking (mock API)",
      "Success toast / feedback"
    ],
    concepts: "Immutable Set updates, Derived values (useMemo), Conditional rendering (modal/toast), UI state management, Basic async flow (mock API)",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 CinemaSeatBooking.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useEffect, useMemo, useState } from 'react'

const ROWS = 'ABCDEFGHIJ'.split('')
const COLS = 12
const SEAT_PRICE = 250

export default function CinemaSeatBooking() {
  const [bookedSeats, setBookedSeats] = useState(new Set())
  const [selectedSeats, setSelectedSeats] = useState(new Set())
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const seatId = (r, c) => String(r) + String(c)

  useEffect(() => {
    const s = new Set()
    const seed = 7
    for (let i = 0; i < 12; i++) {
      const r = ROWS[(i * seed) % ROWS.length]
      const c = ((i * 13) % COLS) + 1
      s.add(seatId(r, c))
    }
    setBookedSeats(s)
  }, [])

  const toggleSeat = (id) => {
    if (bookedSeats.has(id)) return
    setSelectedSeats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const total = useMemo(() => selectedSeats.size * SEAT_PRICE, [selectedSeats])

  const confirmBooking = async () => {
    if (selectedSeats.size === 0) return
    if (!name.trim() || !email.trim()) {
      alert('Please enter name and email to continue')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setBookedSeats((prev) => new Set([...prev, ...Array.from(selectedSeats)]))
    setSelectedSeats(new Set())
    setShowModal(false)
    setSuccessMsg('Booking confirmed! Enjoy your show 🎬')
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  const reset = () => {
    setSelectedSeats(new Set())
    setSuccessMsg('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Cinema Hall — Screen 1</h1>
            <p className="text-sm text-gray-600">Tonight · 7:30 PM · Dolby Atmos</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Price per seat</div>
            <div className="text-lg font-semibold">₹{SEAT_PRICE}</div>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="mb-6">
            <div className="mx-auto w-3/4 md:w-1/2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md text-center py-2 text-sm font-medium text-gray-700">
              SCREEN
            </div>
          </div>

          <div className="overflow-auto">
            <div className="flex flex-col gap-3">
              {ROWS.map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <div className="w-6 text-sm text-gray-500">{r}</div>
                  <div className="grid grid-cols-12 gap-3 flex-1">
                    {Array.from({ length: COLS }).map((_, ci) => {
                      const c = ci + 1
                      const id = seatId(r, c)
                      const isBooked = bookedSeats.has(id)
                      const isSelected = selectedSeats.has(id)
                      return (
                        <button
                          key={id}
                          onClick={() => toggleSeat(id)}
                          disabled={isBooked}
                          className={
                            'h-10 rounded-md text-xs font-medium flex items-center justify-center select-none transition-shadow duration-150 ' +
                            (isBooked ? 'bg-red-200 text-red-800 cursor-not-allowed line-through ' : '') +
                            (isSelected ? 'bg-emerald-500 text-white shadow-lg ' : '') +
                            (!isBooked && !isSelected ? 'bg-gray-100 hover:bg-gray-200' : '')
                          }
                        >
                          {c}
                        </button>
                      )
                    })}
                  </div>
                  <div className="w-6 text-sm text-gray-500 text-right">{r}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm">
            <Legend colorClass="bg-gray-100" label="Available" />
            <Legend colorClass="bg-emerald-500 text-white" label="Selected" />
            <Legend colorClass="bg-red-200 text-red-800" label="Booked" />
            <div className="ml-auto text-gray-600">Screen-side seats are best for sound</div>
          </div>
        </div>

        <div className="fixed left-0 right-0 bottom-6 flex justify-center pointer-events-none">
          <div className="max-w-4xl w-full px-4 pointer-events-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-500">Selected</div>
                <div className="font-semibold">{Array.from(selectedSeats).join(', ') || '—'}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-lg font-bold">₹{total}</div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button onClick={reset} className="px-4 py-2 rounded-md border">Reset</button>
                <button
                  onClick={() => setShowModal(true)}
                  disabled={selectedSeats.size === 0}
                  className={
                    'px-4 py-2 rounded-md text-white font-semibold ' +
                    (selectedSeats.size === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700')
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Confirm Booking</h2>
                <p className="text-sm text-gray-600 mb-4">Seats: {Array.from(selectedSeats).join(', ')}</p>

                <div className="grid grid-cols-1 gap-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" placeholder="Your name" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" placeholder="Email" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Total: <span className="font-semibold">₹{total}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">Cancel</button>
                    <button onClick={confirmBooking} disabled={loading} className="px-4 py-2 rounded bg-emerald-600 text-white font-semibold">
                      {loading ? 'Booking...' : 'Confirm'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="fixed right-6 top-6 bg-emerald-600 text-white px-4 py-2 rounded shadow">{successMsg}</div>
        )}
      </div>
    </div>
  )
}

function Legend({ colorClass, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={'w-6 h-6 rounded ' + colorClass + ' border'} />
      <div className="text-sm text-gray-700">{label}</div>
    </div>
  )
}
`
      },
      {
        heading: 'PAGE (ROUTE) CODE',
        description: '🔥 CinemaSeatBookingPage.jsx',
        options: [],
        InterviewLine: '',
        code: `import React from 'react'
import CinemaSeatBooking from '../components/BookingTicket/CinemaSeatBooking'

export const CinemaSeatBookingPage = () => {
  return (
    <>
      <CinemaSeatBooking />
    </>
  )
}
`
      }
    ]
  },

  {
    id: 9,
    path: 'login',
    title: "Login + Protected Dashboard",
     category: 'State Management',
    type:'advanced',
    description: "Build a login flow with protected routes using React Router and Context.",
    points: [
      "Controlled inputs (username/password)",
      "Handle submit + preventDefault",
      "Auth state in Context (login/logout)",
      "Persist token in localStorage",
      "Protected route (redirect to /login)",
      "Redirect to dashboard on success"
    ],
    concepts: "Context API, Route protection, localStorage persistence, Controlled forms, Conditional navigation, Auth flow fundamentals",
    solution: [
      {
        heading: 'FULL COMPONENT CODE',
        description: '🔥 Login.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/LoginAuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials!");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded w-80"
      >
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
`
      },
      {
        heading: 'AUTH CONTEXT',
        description: '🔥 LoginAuthContext.jsx',
        options: [],
        InterviewLine: '',
        code: `import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    if (username === "admin" && password === "1234") {
      const fakeToken = "jwt-token-12345";
      localStorage.setItem("token", fakeToken);
      setUser({ token: fakeToken });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
`
      },
      {
        heading: 'PROTECTED ROUTE',
        description: '🔥 LoginProtectedRoute.jsx',
        options: [],
        InterviewLine: '',
        code: `import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/LoginAuthContext";

const LoginProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default LoginProtectedRoute;
`
      },
      {
        heading: 'DASHBOARD',
        description: '🔥 Dashboard.jsx',
        options: [],
        InterviewLine: '',
        code: `import React from "react";
import { useAuth } from "../../context/LoginAuthContext";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Dashboard 🎉</h1>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
`
      }
    ]
  },
];

export const tasks = tasksData.map((task) => {
  const next = { ...task };


  if (!next?.readTime && !Number.isFinite(next?.readTimeMinutes)) {
    const type = next?.type;
    next.readTimeMinutes =
      type === 'easy' ? 15 :
        type === 'medium' ? 25 :
          type === 'advanced' ? 40 :
            15;
  }

  return next;
});

/* TaskSolution */