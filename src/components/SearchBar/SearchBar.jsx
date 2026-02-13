// SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';


export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`);
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        setError('Failed to fetch results' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border rounded shadow focus:outline-none"
      />

      {loading && (
        <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-2 text-sm text-gray-500">
          Loading...
        </div>
      )}

      {error && (
        <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-2 text-sm text-red-500">
          {error}
        </div>
      )}

      {!loading && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow mt-1 rounded max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item.title}
            </li>
          ))}
        </ul>
      )}

      {!loading && debouncedQuery && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-2 text-sm text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
};
