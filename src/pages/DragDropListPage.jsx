import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import DragDropList from '../components/DragDropList/DragDropList';


export const DragDropListPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>

      <Introduction TasksData={TasksData} />
      <DragDropList />
      <CodingPreview TasksData={TasksData} />
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2">Uses native <strong>draggable</strong> HTML attribute</li>
          <li className="text-gray-600 mb-2">Simple state management with <strong>useState</strong></li>
          <li className="text-gray-600 mb-2">Allows items to be reordered by dragging</li>
          <li className="text-gray-600 mb-2">No external dependencies</li>
          <li className="text-gray-600 mb-2">Updates state immediately to reflect new order</li>
        </ul>
      </div>
      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">✅ Why This Is a Good Approach:</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2">Uses native <strong>draggable</strong> HTML attribute</li>
          <li className="text-gray-600 mb-2">Simple state management with <strong>useState</strong></li>
          <li className="text-gray-600 mb-2">Allows items to be reordered by dragging</li>
          <li className="text-gray-600 mb-2">No external dependencies</li>
          <li className="text-gray-600 mb-2">Updates state immediately to reflect new order</li>
        </ul>
      </div>
    </div>
  );
};



