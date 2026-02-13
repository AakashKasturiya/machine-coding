import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import { TodoApp } from '../components/todo-application/TodoApp';


export const TodoPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>

      <Introduction TasksData={TasksData} />
      <TodoApp />
      <CodingPreview TasksData={TasksData} />
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2">Add/Edit/Delete Todo</li>
          <li className="text-gray-600 mb-2">Mark as Completed</li>
          <li className="text-gray-600 mb-2">Filter (All, Active, Completed)</li>
          <li className="text-gray-600 mb-2">LocalStorage persistence</li>
          <li className="text-gray-600 mb-2">Simple drag & drop using native events (for reorder)</li>
        </ul>
      </div>
    </div>
  );
};



