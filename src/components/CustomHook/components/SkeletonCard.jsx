
export const SkeletonCard = ({ theme }) => {
    return (
        <div className={`border p-4 rounded-lg shadow-sm animate-pulse ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
            }`}>
            {/* Image placeholder */}
            <div className={`h-40 w-full rounded-md mb-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}></div>

            {/* Title placeholder */}
            <div className={`h-4 w-3/4 rounded mb-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}></div>

            {/* Category placeholder */}
            <div className={`h-3 w-1/2 rounded mb-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}></div>

            {/* Price & Rating placeholder */}
            <div className="flex justify-between items-center mt-2">
                <div className={`h-5 w-1/4 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}></div>
                <div className={`h-5 w-1/4 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}></div>
            </div>
        </div>
    );
};
