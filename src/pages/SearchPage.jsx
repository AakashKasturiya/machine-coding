import React from 'react'
import { useLocation } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar/SearchBar'
import { Introduction } from '../components/Pages/Introduction'

import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';


export const SearchPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <>
      <div className="max-w-6xl mx-auto bg-white-600 text-black">
        <Introduction TasksData={TasksData} />
        <SearchBar />
        <CodingPreview TasksData={TasksData} />
        <div className='mb-6'>
          <h3 className="text-lg font-medium mb-4">4. Practice Questions</h3>
          <ul className="list-none px-6 mb-6">
            <li className="text-gray-600 mb-2">✔️ Debounce logic via useDebounce custom hook</li>
            <li className="text-gray-600 mb-2">✔️ Loading state indication</li>
            <li className="text-gray-600 mb-2">✔️ API call to DummyJSON endpoint</li>
            <li className="text-gray-600 mb-2">✔️ Error handling</li>
            <li className="text-gray-600 mb-2">✔️ Results dropdown with hover styling</li>
            <li className="text-gray-600 mb-2">✔️ No results message when empty</li>
          </ul>
        </div>
        <div className='mb-6'>
          <h3 className="text-lg font-medium mb-4">5. Example Dummy API Endpoint Used</h3>
          <p className="text-gray-600">👉 https://dummyjson.com/products/search?q=phone</p>

        </div>
        <div className='mb-6'>
          <h3 className="text-lg font-medium mb-4">6. Pro Tip for Interview</h3>
          <ul className="list-disc px-6 mb-6">
            <li className="text-gray-600 mb-2">Why debounce prevents excessive API calls.</li>
            <li className="text-gray-600 mb-2">Separation of concerns: useDebounce as reusable logic.</li>
            <li className="text-gray-600 mb-2">Handling edge cases (empty query, no results, loading, errors).</li>
            <li className="text-gray-600 mb-2">Clean, readable component structure.</li>
          </ul>
        </div>
      </div>
    </>
  )
}