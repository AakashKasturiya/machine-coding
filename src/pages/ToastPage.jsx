import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { ToastPreview } from '../components/Toast/ToastPreview';
import { CodingPreview } from '../components/Pages/CodingPreview';


export const ToastPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);

  return (
    <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>

      <Introduction TasksData={TasksData} />
      <ToastPreview />
      <CodingPreview TasksData={TasksData} />

      <div className='mb-6'>
        <h3 className="text-lg font-medium mb-4">🔍 Concepts Covered:</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className="text-gray-600 mb-2">Context API (global state)</li>
          <li className="text-gray-600 mb-2">Custom hooks</li>
          <li className="text-gray-600 mb-2">Timers & cleanup</li>
          <li className="text-gray-600 mb-2">Animations</li>
          <li className="text-gray-600 mb-2">UX improvements (hover pause)</li>
          <li className="text-gray-600 mb-2">Reusable & scalable architecture</li>
        </ul>
      </div>
    </div>
  );
};



