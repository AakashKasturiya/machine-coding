import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { Introduction } from '../components/Pages/Introduction'
import { useTheme } from '../context/ThemeContext';
import { tasks } from "../data/content"; // adjust the path according to your project structure
import { CodingPreview } from '../components/Pages/CodingPreview';
import { ReusableTable } from '../components/ReusableTable/ReusableTable';

export const ReusableTablePage = () => {

    const USERS = [
        { id: 1, name: "Aakash", email: "aakash@gmail.com", role: "Admin" },
        { id: 2, name: "Rahul", email: "rahul@gmail.com", role: "User" },
        { id: 3, name: "Sneha", email: "sneha@gmail.com", role: "User" },
        { id: 4, name: "Priya", email: "priya@gmail.com", role: "Manager" },
        { id: 5, name: "Vikas", email: "vikas@gmail.com", role: "Admin" },
        { id: 6, name: "Neha", email: "neha@gmail.com", role: "User" },
        { id: 7, name: "Rohan", email: "rohan@gmail.com", role: "Manager" },
        { id: 8, name: "Anjali", email: "anjali@gmail.com", role: "User" },
        { id: 9, name: "Amit", email: "amit@gmail.com", role: "User" },
        { id: 10, name: "Kavita", email: "kavita@gmail.com", role: "User" },
    ];

    const columns = [
        { header: "ID", accessor: "id", sortable: true },
        { header: "Name", accessor: "name", sortable: true },
        { header: "Email", accessor: "email", sortable: true },
        {
            header: "Role",
            accessor: "role",
            sortable: true,
            render: (row) => {
                const colors = {
                    Admin: "bg-red-100 text-red-800 border-red-200",
                    Manager: "bg-blue-100 text-blue-800 border-blue-200",
                    User: "bg-green-100 text-green-800 border-green-200",
                };
                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[row.role] || "bg-gray-100 text-gray-800"}`}>
                        {row.role}
                    </span>
                );
            }
        },
    ];

    const location = useLocation();
    const path = location.pathname.slice(1);
    // Filter tasks that belong to "search" path
    const TasksData = tasks.filter(task => task.path === path);


    return (
        <div className={`max-w-6xl mx-auto bg-white-600 text-black`}>
            <Introduction TasksData={TasksData} />

            <div className="my-10">
                <ReusableTable columns={columns} data={USERS} itemsPerPageOptions={[5, 10]} />
            </div>

            <CodingPreview TasksData={TasksData} />
            <div className='mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200'>
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <span>🔍</span> How to Explain This in Interview (Reusable Table)
                </h3>
                <ul className="list-disc px-6 space-y-2">
                    <li className="text-gray-600">I’m using derived state with useMemo to avoid unnecessary recalculations.</li>
                    <li className='text-gray-600'>Filtering happens first, then sorting, then pagination.</li>
                    <li className='text-gray-600'>The table is reusable because it dynamically reads object keys.</li>
                    <li className='text-gray-600'>Sorting toggles between asc and desc, and pagination is calculated based on total rows.</li>
                </ul>
            </div>

        </div>
    );
};



