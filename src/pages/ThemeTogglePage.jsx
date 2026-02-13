import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { useTheme } from '../context/ThemeContext';
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';


export const ThemeTogglePage = () => {

  const { theme } = useTheme();

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);


  return (
    <div className={`max-w-6xl mx-auto py-8 px-6 ${theme === 'light' ? ' text-black' : 'bg-gray-900 text-white'}`}>
      <Introduction TasksData={TasksData} theme={theme} />
      <ThemeToggle />
      <CodingPreview TasksData={TasksData} />
      <div className='mb-6'>
        <h3 className={`text-lg font-medium mb-4 ${theme === 'light'? 'text-black' : 'text-white'}`}>🔍 Key Concepts Explained</h3>
        <ul className="list-disc  px-6 mb-6">
          <li className={`${theme === 'light'? 'text-black' : 'text-white'} text-gray-600 dark:text-gray-300 mb-2`}><strong>Context API:</strong> Shares theme state (light/dark) across the app without prop drilling.</li>
          <li className={`${theme === 'light'? 'text-black' : 'text-white'} text-gray-600 dark:text-gray-300 mb-2`}><strong>localStorage:</strong> Persists user theme choice across page reloads.</li>
          <li className={`${theme === 'light'? 'text-black' : 'text-white'} text-gray-600 dark:text-gray-300 mb-2`}><strong>useEffect:</strong> Applies/removes .dark class on `html` when theme changes.</li>
          <li className={`${theme === 'light'? 'text-black' : 'text-white'} text-gray-600 dark:text-gray-300 mb-2`}><strong>Tailwind CSS:</strong> Uses darkMode: 'class' to apply dark mode styles based on the .dark class.</li>
          <li className={`${theme === 'light'? 'text-black' : 'text-white'} text-gray-600 dark:text-gray-300 mb-2`}><strong>Toggle Function:</strong> Switches theme state and triggers re-render.</li>
        </ul>
      </div>

    </div>
  );
};



