import React from 'react';

export const TodoFilter = ({ filter, setFilter, todos }) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
      
      <div className="w-full sm:w-auto flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('All')}
          className={`filter-btn !rounded-button whitespace-nowrap px-4 py-2 text-sm font-medium border ${
            filter === 'All' ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter('Active')}
          className={`filter-btn !rounded-button whitespace-nowrap px-4 py-2 text-sm font-medium border ${
            filter === 'Active' ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter('Completed')}
          className={`filter-btn !rounded-button whitespace-nowrap px-4 py-2 text-sm font-medium border ${
            filter === 'Completed' ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          Completed
        </button>
      </div>

       <div className="w-full sm:w-auto text-sm text-gray-600">
          <span id="itemCount">{todos.filter(todo => !todo.completed).length}</span> items left
       </div>
    </div>
  );
};
