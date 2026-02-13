import React, { useMemo } from "react";

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
