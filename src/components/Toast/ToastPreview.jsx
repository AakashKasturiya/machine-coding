import { useToast } from "../../context/ToastContext";
import { ToastContainer } from "./ToastContainer";

const Demo = () => {
    const { showToast } = useToast();

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            <button
                onClick={() =>
                    showToast({
                        message: "Order placed successfully 🎉",
                        type: "success",
                        position: "top-right",
                    })
                }
                className="btn px-8 py-2 bg-green-500 text-white rounded-md"
            >
                Success
            </button>
            <button
                onClick={() =>
                    showToast({
                        message: "Warning !!",
                        type: "warning",
                        position: "top-right",
                    })
                }
                className="btn px-8 py-2 bg-yellow-500 text-white rounded-md"
            >
                Warning
            </button>
            <button
                onClick={() =>
                    showToast({
                        message: "Something went wrong ",
                        type: "error",
                        position: "top-right",
                    })
                }
                className="btn px-8 py-2 bg-red-500 text-white rounded-md"
            >
                Error
            </button>
        </div>
    );
};

export const ToastPreview = () => {
    const { toasts, removeToast } = useToast();

    return (
        <>
            <Demo />
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </>
    );
}
