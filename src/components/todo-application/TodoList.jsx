import React, { useState } from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, updateTodo, toggleComplete, deleteTodo, reorderTodos }) {
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
    setDraggingIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('index');
    reorderTodos(Number(draggedIndex), dropIndex);
    setDraggingIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {todos.length > 0 ? (
        <ul className="todo-list space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`cursor-move transition-all ${
                draggingIndex === index ? 'opacity-50' : ''
              }`}
            >
              <TodoItem
                todo={todo}
                updateTodo={updateTodo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <i className="ri-emotion-sad-line text-5xl mb-4"></i>
          <p className="text-lg font-semibold">No tasks yet</p>
          <p className="text-sm text-center">
            Add your first task above to stay organized and productive.
          </p>
        </div>
      )}
    </div>
  );
}
