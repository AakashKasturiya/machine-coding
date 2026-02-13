import React, { useEffect, useId, useMemo, useState } from "react";

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
  const groupLabelId = `${id}-label`;

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
      <div className="flex items-center justify-between gap-4 flex-wrap">
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
        className={`mt-4 flex items-center ${sizes[size] || sizes.md}`}
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
              aria-label={`${starValue} star`}
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
