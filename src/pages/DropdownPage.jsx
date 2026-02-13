import React from 'react'
import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { Dropdown } from '../components/DropDown/Dropdown'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';


export const DropdownPage = () => {

  const location = useLocation();
  const path = location.pathname.slice(1);
  // Filter tasks that belong to "search" path
  const TasksData = tasks.filter(task => task.path === path);
  return (
    <>
      <div className="max-w-6xl mx-auto bg-white-600 text-black">
        <Introduction TasksData={TasksData} />
        <Dropdown />
        <CodingPreview TasksData={TasksData} />
        <div className='mb-6'>
          <h3 className="text-lg font-medium mb-4">🧠 Interview Explanation (Say This 💯)</h3>
          <ul className="list-none px-6 mb-6">
            <li className="text-gray-600 mb-2">I used <strong>useRef</strong> to detect outside clicks,<br></br>
              <strong>useEffect</strong> to attach event listeners,<br></br>
              keyboard events for accessibility,<br></br>
              and controlled state for open/close and highlighted index.”</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">
            ⚡ Common Follow-ups Interviewers Ask
          </h3>

          <ul className="list-none px-6 space-y-4">
            <li>
              <p className="text-gray-600 mb-1">
                1. How do you handle accessibility?
              </p>
              <ul className="list-disc ml-5 text-gray-500">
                <li>tabIndex for focus</li>
                <li>Keyboard navigation (↑ ↓ Enter Esc)</li>
                <li>Proper focus handling</li>
              </ul>
            </li>

            <li>
              <p className="text-gray-600 mb-1">
                2. Why use useRef?
              </p>
              <ul className="list-disc ml-5 text-gray-500">
                <li>Detect click outside the dropdown</li>
                <li>Avoid unnecessary re-renders</li>
              </ul>
            </li>

            <li>
              <p className="text-gray-600 mb-1">
                3. How to reuse this dropdown?
              </p>
              <ul className="list-disc ml-5 text-gray-500">
                <li>Pass options as props</li>
                <li>Expose onSelect callback</li>
              </ul>
            </li>
          </ul>
        </div>


      </div>
    </>
  )
}