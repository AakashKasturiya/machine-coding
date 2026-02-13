import React from 'react'
import { useLocation } from 'react-router-dom';
import { ExamplePage } from '../components/Modal/ExamplePage'
import { Introduction } from '../components/Pages/Introduction'

import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';


export const ModalPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <>
      <div className="max-w-6xl mx-auto  bg-white-600 text-black">
        <Introduction TasksData={TasksData} />
        <ExamplePage />
        <CodingPreview TasksData={TasksData} />
        <div className='mb-6'>
          <h3 className="text-lg font-medium mb-4">Summary</h3>
          <ul className="list-none px-6 mb-6">
            <li className="text-gray-600 mb-2">✅ ModalProvider holds modal state globally.</li>
            <li className="text-gray-600 mb-2">✅ Any component can call openModal(`{` title, body, onConfirm,  ...`}).</li>
            <li className="text-gray-600 mb-2">✅ Modals are rendered via React Portal for isolation.</li>
            <li className="text-gray-600 mb-2">✅ Supports reusable Confirm modals, forms, messages, etc.</li>
            <li className="text-gray-600 mb-2">✅ Stacking is handled naturally by mapping over the modals array.</li>
          </ul>
        </div>

      </div>
    </>
  )
}