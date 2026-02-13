import { useEffect, useRef, useState } from "react";

const options = [
    "Profile",
    "Settings",
    "Notifications",
    "Logout",
];

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const dropdownRef = useRef(null);

    // 🔹 Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 🔹 Keyboard navigation
    const handleKeyDown = (e) => {
        if (!isOpen) return;

        switch (e.key) {
            case "ArrowDown":
                setHighlightedIndex((prev) =>
                    prev === options.length - 1 ? 0 : prev + 1
                );
                break;

            case "ArrowUp":
                setHighlightedIndex((prev) =>
                    prev === 0 ? options.length - 1 : prev - 1
                );
                break;

            case "Enter":
                alert(`Selected: ${options[highlightedIndex]}`);
                setIsOpen(false);
                break;

            case "Escape":
                setIsOpen(false);
                break;

            default:
                break;
        }
    };

    return (
        <div
            className="relative inline-block w-56"
            ref={dropdownRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md flex justify-between items-center"
            >
                Select Option
                <span className="ml-2">▾</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul className="absolute mt-2 w-full bg-white border rounded-md shadow-md z-10">
                    {options.map((option, index) => (
                        <li
                            key={option}
                            className={`px-4 py-2 cursor-pointer ${highlightedIndex === index
                                ? "bg-blue-100"
                                : "hover:bg-gray-100"
                                }`}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onClick={() => {
                                alert(`Selected: ${option}`);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
