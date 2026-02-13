import React, { useEffect, useId, useMemo, useRef, useState } from "react";

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
