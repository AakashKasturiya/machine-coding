import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import {UndoRedo} from '../components/UndoRedo/UndoRedo';

export const UndoRedoPage = () => {

    const location = useLocation();
    const path = location.pathname.slice(1);

    // Filter tasks that belong to "search" path
    const TasksData = tasks.filter(task => task.path === path);


    return (
        <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>
            <Introduction TasksData={TasksData} />

          
             <UndoRedo/>
            <CodingPreview TasksData={TasksData} />
            <div className='mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200'>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <span>🔁</span>  Flow
                </h3>
                <ul className="list-disc px-6 space-y-2">
                    <li className="text-gray-600">On change → move present → past</li>
                    <li className="text-gray-600">Undo → move present → future</li>
                    <li className="text-gray-600">Redo → move from future → present</li>
                </ul>
            </div>
            <div className='mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200'>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <span>🧠</span> Optional Enhancement (Mention, Don’t Overcode)
                </h3>
                <ul className="list-disc px-6 space-y-2">
                    <li className='text-gray-600'>Limit history size</li>
                    <li className='text-gray-600'>useReducer instead of useState</li>
                    <li className='text-gray-600'>Persist history in localStorage</li>
                    <li className='text-gray-600'>Undo for forms / drawings</li>
                </ul>
            </div>

        </div>
    );
};



