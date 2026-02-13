import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import { SimpleInfiniteScroll } from '../components/InstagramScroll/SimpleInfiniteScroll';


export const SimpleInfiniteScrollPage = () => {



    const location = useLocation();
    const path = location.pathname.slice(1);
    // Filter tasks that belong to "search" path
    const TasksData = tasks.filter(task => task.path === path);


    return (
        <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>
            <Introduction TasksData={TasksData} />
            <SimpleInfiniteScroll />
            <div className='mt-4'>
                <p className='text-gray-600 mb-2 font-bold'>🔗 Youtube Link: for reference</p>
                <Link className='text-gray-600 mb-2 underline text-blue-600' to="https://www.youtube.com/watch?v=XeVDlrGhGgY">https://www.youtube.com/watch?v=XeVDlrGhGgY</Link>
            </div>
            <CodingPreview TasksData={TasksData} />

        </div>
    );
};



