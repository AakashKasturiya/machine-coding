export const ProductCard = ({ product, theme }) => (
    <div className={`border p-4 rounded-lg shadow-sm transition-colors hover:shadow-md ${theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-100 text-gray-900"
        }`}>
        <img src={product.thumbnail} alt={product.title} className="h-40 w-full object-cover mb-4 rounded-md bg-gray-100" />
        <h3 className="text-sm font-semibold mb-1 line-clamp-1">{product.title}</h3>
        <p className={`text-xs mb-2 capitalize ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            {product.category}
        </p>
        <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-blue-600">${product.price}</span>
            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 flex items-center gap-1">
                <i className="ri-star-fill text-yellow-500"></i> {product.rating}
            </span>
        </div>
    </div>
);
