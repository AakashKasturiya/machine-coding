import { useEffect, useRef, useState } from "react";

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
      className={`min-w-[260px] px-4 py-3 rounded shadow-lg text-sm flex justify-between items-center
        transition-all duration-300 ease-in-out
        animate-slide-fade
        ${toast.type === "success" && "bg-green-500 text-white"}
        ${toast.type === "error" && "bg-red-500 text-white"}
        ${toast.type === "info" && "bg-blue-500 text-white"}
        ${toast.type === "warning" && "bg-yellow-500 text-white"}
        dark:bg-gray-800 dark:text-white
      `}
    >
      <span>{toast.message}</span>
      <button onClick={() => removeToast(toast.id)}>✕</button>
    </div>
  );
};
