import { useState, useMemo, useEffect } from "react";

export const ReusableTable = ({ columns, data, itemsPerPageOptions = [5, 10, 20] }) => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    // ⏳ Debounce Search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    // 🔍 Filtering
    const filteredData = useMemo(() => {
        if (!debouncedSearch) return data;

        return data.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(debouncedSearch.toLowerCase())
            )
        );
    }, [data, debouncedSearch]);

    // 🔃 Sorting
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        const { key, direction } = sortConfig;

        return [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // 📄 Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(start, start + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    // 🔁 Sort handler
    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    // If no columns provided, generate from data keys (fallback)
    const tableColumns = columns || (data.length > 0 ? Object.keys(data[0]).map(key => ({ header: key.toUpperCase(), accessor: key, sortable: true })) : []);

    return (
        <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 font-sans">
            {/* Header Controls */}
            <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 border-b border-gray-200">

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Rows Per Page */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 font-medium">Rows per page:</span>
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {itemsPerPageOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            {tableColumns.map((col) => (
                                <th
                                    key={col.accessor}
                                    onClick={() => col.sortable && handleSort(col.accessor)}
                                    className={`px-6 py-4 transition-colors select-none ${col.sortable ? "cursor-pointer hover:bg-gray-200" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.header}
                                        {sortConfig.key === col.accessor && (
                                            <span className="text-blue-500">
                                                {sortConfig.direction === "asc" ? "▲" : "▼"}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                                >
                                    {tableColumns.map((col) => (
                                        <td key={`${row.id || rowIndex}-${col.accessor}`} className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableColumns.length} className="px-6 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <svg className="h-10 w-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-lg font-medium">No results found</p>
                                        <p className="text-sm">Try adjusting your search query.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{Math.min((currentPage - 1) * itemsPerPage + 1, sortedData.length)}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> of <span className="font-semibold text-gray-900">{sortedData.length}</span> results
                </span>

                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-blue-600 transition-all"
                    >
                        Previous
                    </button>

                    {/* Simple Page Numbers */}
                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Logic to show a window of pages could be complex, keeping it reliable:
                            // If total pages <= 7, show all.
                            // Else show window around current.
                            // For this snippet, let's keep it simple or just rely on prev/next if logic is too long for this single file replacement without helper functions.
                            // Let's implement a simple "1 ... 4 5 6 ... 10" logic or similar if needed.
                            // For simplicity and robustness in this iteration:
                            return null;
                        })}
                        {totalPages <= 7 ? (
                            Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))
                        ) : (
                            // Fallback for many pages
                            <span className="px-3 py-1 text-sm bg-white border rounded-lg">Page {currentPage} of {totalPages}</span>
                        )}
                    </div>

                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-blue-600 transition-all"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
