import React, { useEffect, useMemo, useRef, useState } from "react";

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
