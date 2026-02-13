import React, { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useDebounce } from "./hooks/useDebounce";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FilterDropdown } from "./components/FilterDropdown";
import { ProductCard } from "./components/ProductCard";
import { SkeletonCard } from "./components/SkeletonCard";

export default function CustomHook() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);

    const [theme, setTheme] = useLocalStorage("theme", "light");
    const [filter, setFilter] = useState("All");

    const { data, loading, error } = useFetch("https://dummyjson.com/products");

    // Safe filtering check
    const filtered = (data || []).filter((item) => {
        const matchesSearch = item.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            item.category.toLowerCase().includes(filter.toLowerCase());

        return matchesSearch && matchesFilter;
    });

    return (
        <div
            className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
                } min-h-screen p-6 transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Custom Hooks Demo</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                    <div className="flex-1 w-full md:w-auto relative">
                        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark"
                                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                                : "bg-white border-gray-200 text-gray-900"
                                }`}
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <FilterDropdown filter={filter} setFilter={setFilter} theme={theme} />

                        <button
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${theme === "dark"
                                ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {theme === "light" ? (
                                <><i className="ri-moon-line"></i> Dark Mode</>
                            ) : (
                                <><i className="ri-sun-line"></i> Light Mode</>
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <SkeletonCard key={index} theme={theme} />
                        ))}
                    </div>
                ) : (
                    <>
                        {filtered.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <i className="ri-inbox-line text-5xl mb-4 block"></i>
                                <p className="text-xl">No products found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filtered.map((p) => (
                                    <ProductCard key={p.id} product={p} theme={theme} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
