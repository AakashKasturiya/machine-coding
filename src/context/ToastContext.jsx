import { createContext, useContext, useState, useCallback } from "react";

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
