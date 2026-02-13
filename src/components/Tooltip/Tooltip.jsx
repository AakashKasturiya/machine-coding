import React, { useEffect, useMemo, useRef, useState } from "react";

export function Tooltip({
  children,
  text,
  placement = "top",
  delayMs = 150,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const rootRef = useRef(null);

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
      ref={rootRef}
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
