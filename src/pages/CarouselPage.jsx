import React from 'react'
import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { Carousel } from '../components/Carousel/Carousel'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';


export const CarouselPage = () => {

    const location = useLocation();
    const path = location.pathname.slice(1);
    // Filter tasks that belong to "search" path
    const TasksData = tasks.filter(task => task.path === path);
    return (
        <>
            <div className="max-w-6xl mx-auto bg-white-600 text-black">
                <Introduction TasksData={TasksData} />
                <Carousel />
                <CodingPreview TasksData={TasksData} />
                <div className='mb-6'>
                    <h3 className="text-lg font-medium mb-4">🧠 Real carousel example</h3>
                    <ul className="list-none px-6 mb-6">
                        <li className="text-gray-600 mb-2">Assume: <strong>total = 3   // total slides</strong></li>
                    </ul>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">
                        Step-by-step working
                    </h3>

                    <table className='w-full border border-gray-300'>
                        <thead>
                            <tr className='border-b border-gray-300'>
                                <th className='px-4 py-2 border border-gray-300'> prev </th>
                                <th className='px-4 py-2 border border-gray-300'> prev + 1 </th>
                                <th className='px-4 py-2 border border-gray-300'> (prev + 1) % 3 </th>
                                <th className='px-4 py-2 border border-gray-300'> result </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b border-gray-300'>
                                <td className='px-4 py-2 border border-gray-300'> 0 </td>
                                <td className='px-4 py-2 border border-gray-300'> 1 </td>
                                <td className='px-4 py-2 border border-gray-300'> 1 % 3 = 1 </td>
                                <td className='px-4 py-2 border border-gray-300'> next slide </td>
                            </tr>
                            <tr className='border-b border-gray-300'>
                                <td className='px-4 py-2 border border-gray-300'> 1 </td>
                                <td className='px-4 py-2 border border-gray-300'> 2 </td>
                                <td className='px-4 py-2 border border-gray-300'> 2 % 3 = 2 </td>
                                <td className='px-4 py-2 border border-gray-300'> next </td>
                            </tr>
                            <tr className='border-b border-gray-300'>
                                <td className='px-4 py-2 border border-gray-300'> 2 </td>
                                <td className='px-4 py-2 border border-gray-300'> 3 </td>
                                <td className='px-4 py-2 border border-gray-300'> 3 % 3 = 0 </td>
                                <td className='px-4 py-2 border border-gray-300'> 🔁 back to first </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}