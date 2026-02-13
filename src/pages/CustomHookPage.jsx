import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import CustomHook from '../components/CustomHook/CustomHook';


export const CustomHookPage = () => {
    const location = useLocation();
    const path = location.pathname.slice(1);
    // Filter tasks that belong to "search" path
    const TasksData = tasks.filter(task => task.path === path);
    return (
        <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>

            <Introduction TasksData={TasksData} />
            <CustomHook />
            <CodingPreview TasksData={TasksData} />
            <div className='mb-6'>
                <h3 className="text-lg font-medium mb-4">🧠 How to Answer in Interview (MEMORIZE)</h3>
                <p className='border-l-4 border-blue-500 pl-4 mb-4'>"I create custom hooks when logic needs to be reused across components, like fetching data, debouncing inputs, or handling outside clicks. This improves maintainability and readability."</p>
            </div>
            <div className='mb-6'>
                <h3 className="text-lg font-medium mb-4">🔥 Top 5 Hooks to Master Before Interview</h3>

                <table className='w-full border border-gray-300'>
                    <thead>
                        <tr className='border-b border-gray-300'>
                            <th className='px-4 py-2 border border-gray-300'> Priority</th>
                            <th className='px-4 py-2 border border-gray-300'> Hook</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b border-gray-300'>
                            <td className='px-4 py-2 border border-gray-300'> ⭐⭐⭐⭐⭐ </td>
                            <td className='px-4 py-2 border border-gray-300'> useFetch</td>
                        </tr>
                        <tr className='border-b border-gray-300'>
                            <td className='px-4 py-2 border border-gray-300'> ⭐⭐⭐⭐ </td>
                            <td className='px-4 py-2 border border-gray-300'> useDebounce </td>
                        </tr>
                        <tr className='border-b border-gray-300'>
                            <td className='px-4 py-2 border border-gray-300'> ⭐⭐⭐⭐</td>
                            <td className='px-4 py-2 border border-gray-300'> useLocalStorage</td>
                        </tr>
                        <tr className='border-b border-gray-300'>
                            <td className='px-4 py-2 border border-gray-300'> ⭐⭐⭐</td>
                            <td className='px-4 py-2 border border-gray-300'> useClickOutside </td>
                        </tr>
                        <tr className='border-b border-gray-300'>
                            <td className='px-4 py-2 border border-gray-300'> ⭐⭐⭐</td>
                            <td className='px-4 py-2 border border-gray-300'> useToggle </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='mb-6'>
                <h3 className="text-lg font-medium mb-4">📌 If You Want</h3>
                <ul className="list-disc  px-6 mb-6">
                    <li className="text-gray-600 mb-2">Combine hooks into <strong>one machine-coding question</strong></li>
                    <li className="text-gray-600 mb-2">Provide <strong>interview Q&A for each hook</strong></li>
                    <li className="text-gray-600 mb-2">Build <strong>mini projects using only hooks</strong></li>
                </ul>
            </div>
        </div >
    );
};



