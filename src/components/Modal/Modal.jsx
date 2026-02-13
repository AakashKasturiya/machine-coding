// Modal.jsx
import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ title, body, onConfirm, onCancel, confirmText, cancelText, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="text-gray-700">{body}</div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              onClick={() => {
                onCancel();
                onClose();
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
