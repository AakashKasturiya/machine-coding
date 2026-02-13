// ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';

import Modal from './Modal';
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = ({ title, body, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
    const id = Date.now();
    setModals((prev) => [...prev, { id, title, body, onConfirm, onCancel, confirmText, cancelText }]);
    return id;
  };

  const closeModal = (id) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          {...modal}
          onClose={() => closeModal(modal.id)}
        />
      ))}
    </ModalContext.Provider>
  );
};
