import React, { useState, memo } from 'react';


function TodoItem({ todo, updateTodo, toggleComplete, deleteTodo}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className={`group flex flex-wrap items-center justify-between gap-3 rounded-lg p-4 shadow-sm transition-all duration-300 ${
        todo.completed ? 'bg-green-100 opacity-90' : 'bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <input
          type="checkbox"
          className="checkbox-custom"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex flex-col sm:flex-row gap-2 flex-1 min-w-0">
            <input
              type="text"
              className="flex-1 min-w-0 px-3 py-2 border rounded focus:outline-none"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded w-full sm:w-auto">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 bg-gray-300 rounded w-full sm:w-auto"
            >
              Cancel
            </button>
          </form>
        ) : (
          <span
            className={`flex-1 min-w-0 text-base sm:text-lg break-words ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            } transition-all duration-300`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="edit-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-blue-50 rounded"
          >
            <i className="ri-edit-line"></i>
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="delete-btn w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(TodoItem);
