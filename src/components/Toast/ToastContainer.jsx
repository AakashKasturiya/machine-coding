import { ToastItem } from "./ToastItem";

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
          className={`fixed z-50 space-y-3 ${positionMap[position]}`}
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
};
