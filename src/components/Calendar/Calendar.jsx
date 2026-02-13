import React, { useEffect, useMemo, useState } from "react";

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
  return `${y}-${m}-${d}`;
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
        key: `p-${i}`,
        date: new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), i - startDay + 1),
        inMonth: false,
      });
    }

    for (let d = 1; d <= totalDaysInMonth; d++) {
      cells.push({
        key: `m-${d}`,
        date: new Date(monthStartDate.getFullYear(), monthStartDate.getMonth(), d),
        inMonth: true,
      });
    }

    const remainder = cells.length % 7;
    const add = remainder === 0 ? 0 : 7 - remainder;
    for (let i = 1; i <= add; i++) {
      cells.push({
        key: `n-${i}`,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          className="w-full sm:w-auto rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label="Previous month"
        >
          Prev
        </button>

        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center sm:text-left">
          {formatMonthYear(monthStart)}
        </div>

        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="w-full sm:w-auto rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label="Next month"
        >
          Next
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2">
        {weekDays.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] sm:text-xs font-medium text-gray-600 dark:text-gray-300"
          >
            {d}
          </div>
        ))}

        {days.map(({ key, date, inMonth }) => {
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selected);

          const base =
            "flex w-full aspect-square items-center justify-center rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

          const muted = inMonth
            ? "text-gray-900 dark:text-gray-100"
            : "text-gray-400 dark:text-gray-600";

          const todayRing = isToday
            ? "ring-1 ring-blue-500/50"
            : "";

          const selectedStyle = isSelected
            ? "bg-blue-600 text-white hover:bg-blue-600"
            : "hover:bg-gray-100 dark:hover:bg-gray-800";

          return (
            <button
              key={key}
              type="button"
              onClick={() => selectDate(date)}
              className={`${base} ${muted} ${todayRing} ${selectedStyle}`}
              aria-label={formatISODate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
        Selected: <span className="font-medium">{selected ? formatISODate(selected) : "None"}</span>
      </div>
    </div>
  );
}
