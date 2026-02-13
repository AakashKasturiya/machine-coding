import React, { useState, useEffect } from 'react';

const PaginatedData = () => {
const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Fetch data when currentPage changes
useEffect(() => {
const fetchData = async () => {
setLoading(true);
setError(null);
try {
const limit = 2; // Number of items per page
const skip = (currentPage - 1) * limit; // Calculate the skip value

const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
const result = await response.json();

setData(result.products); // Assuming the API returns products in a 'products' array
setTotalPages(Math.ceil(result.total / limit)); // Calculate total pages
} catch (err) {
setError('Failed to fetch data');
} finally {
setLoading(false);
}
};

fetchData();
}, [currentPage]);

// Render loading, error, or data
if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;

return (
<div className='flex flex-col gap-6'>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.map(item => (
        <div key={item.id}
            className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <a href="#" className="block">
                <img className="w-full h-44 sm:h-52 object-cover" src={item.thumbnail} alt="product image" />
            </a>
            <div className="p-4 sm:p-5">
                <a href="#" className="block">
                    <h5 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">{item.title}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-4">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 22 20">
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{item.rating}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                    <a href="#" className="w-full sm:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                        to cart</a>
                </div>
            </div>
        </div>

        ))}
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={()=> setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
        >
            Previous
        </button>

        <span className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Page <span className="font-medium text-gray-900 dark:text-gray-100">{currentPage}</span> of{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">{totalPages}</span>
        </span>

        <button
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={()=> setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
</div>
);
};

export default PaginatedData;