import React from 'react'
import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'

import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import PaginatedData from '../components/Pagination/PaginatedData';


export const PaginationPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);

  return (
    <>
      <div className="max-w-6xl mx-auto bg-white-600 text-black">
        <Introduction TasksData={TasksData} />
        <PaginatedData />
        <CodingPreview TasksData={TasksData} />
        <div className='mb-6'>
          <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
          <ul className="list-disc  px-6 mb-6">
            <li className="text-gray-600 mb-2"><strong>State Management:</strong> useState is used to manage the current page, total pages, data, and loading/error states.</li>
            <li className="text-gray-600 mb-2"><strong>Side Effects:</strong> useEffect fetches data from the API whenever the currentPage changes.</li>
            <li className="text-gray-600 mb-2"><strong>Conditional Rendering: </strong>Displays loading indicators, error messages, or the data list based on the state.</li>
            <li className="text-gray-600 mb-2"><strong>Pagination Controls:</strong> Provides "Previous" and "Next" buttons to navigate through pages, ensuring they are disabled when on the first or last page.</li>
          </ul>
        </div>

      </div>
    </>
  )
}