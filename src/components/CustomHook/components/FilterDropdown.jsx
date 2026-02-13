import React, { useRef } from "react";
import { useToggle } from "../hooks/useToggle";
import { useClickOutside } from "../hooks/useClickOutside";

export const FilterDropdown = ({ filter, setFilter, theme }) => {
    const [open, toggle] = useToggle(false);
    const ref = useRef(null);

    useClickOutside(ref, () => open && toggle());

    return (
        <div ref={ref} className="relative z-10">
            <button
                onClick={toggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
            >
                <i className="ri-filter-3-line"></i>
                {filter}
                <i className={`ri-arrow-down-s-line transition-transform ${open ? 'rotate-180' : ''}`}></i>
            </button>

            {open && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border overflow-hidden ${theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-100"
                    }`}>
                    {["All", "Beauty", "Fragrances", "Skincare", "Groceries", "Furniture"].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setFilter(item);
                                toggle();
                            }}
                            className={`w-full text-left px-4 py-2 transition-colors ${filter === item
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "hover:bg-gray-50"
                                } ${theme === "dark" && filter !== item ? "text-gray-300 hover:bg-gray-700" : ""}
                              ${theme === "dark" && filter === item ? "bg-blue-900/30 text-blue-400" : ""}
                            `}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
