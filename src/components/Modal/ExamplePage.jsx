import React from 'react';
import { useModal } from './ModalContext';

export function ExamplePage() {
  const { openModal } = useModal();

  const showConfirm = () => {
    openModal({
      title: 'Delete Item',
      body: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => alert('Item deleted!'),
      onCancel: () => console.log('Cancel clicked'),
    });
  };

  const showModal = () =>{
      openModal({
         title: "Open Modal",
         body: "This is modal !!",
         confirmText: 'Save',
         cancelText: 'Cancel',
         onConfirm: () => alert('Save Items!'),
         onCancel: () => console.log('Cancel clicked'),
      });
  }

  return (
    <div className="p-8 flex gap-4">
      <button onClick={showConfirm}
        className="px-4 py-2 bg-red-500 text-white rounded">
        Delete Something
      </button>

      <button onClick={showModal}
        className="px-4 py-2 bg-primary text-white rounded">Open Modal
      </button>
    </div>
  );
}
