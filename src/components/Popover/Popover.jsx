import React, { useEffect, useMemo, useRef, useState } from "react";

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
