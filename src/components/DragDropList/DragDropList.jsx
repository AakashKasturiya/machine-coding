import React, { useState } from 'react';

const CustomDragDropList = () => {
  const [items, setItems] = useState([
    { id: '1', content: 'Learn React' },
    { id: '2', content: 'Build Todo App' },
    { id: '3', content: 'Implement Drag & Drop' },
    { id: '4', content: 'Deploy App' }
  ]);

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index === draggedItemIndex) return;

    const updatedItems = [...items];
    const draggedItem = updatedItems[draggedItemIndex];
    updatedItems.splice(draggedItemIndex, 1);
    updatedItems.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setItems(updatedItems);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-600 p-2 rounded">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className="p-4 mb-2 bg-gray-100 rounded shadow cursor-move"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default CustomDragDropList;
