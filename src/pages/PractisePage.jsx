import React, { useEffect, useState } from 'react'


export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // Cleanup
  }, [value, delay]);

  return debouncedValue;
};


export const PractisePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

useEffect(() => {
  if (!debouncedQuery.trim()) {
    setResults([]);
    setLoading(false);
    return;
  }

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`);
      const data = await res.json();
      setResults(data.products || []);
    } catch (err) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [debouncedQuery]);


  return (
     <section className='max-w-5xl mx-auto py-8 px-6'>
        <div className='relative w-full max-w-md mx-auto'>

        <h1 className='text-base mb-2'>Search Products</h1>
          <input className='w-full px-4 py-2 border rounded shadow focus:outline-none'
          value={query} onChange={(e)=>setQuery(e.target.value)}/>
                 
         
         {loading && (
          <div className="absolute top-full left-0 right-0   mt-1 p-2 text-sm text-gray-500">
            Loading...
           </div>
          )}

          {error && (
            <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-2 text-sm text-red-500">
              {error}
            </div>
          )}

          {!loading && results.length > 0 && (
           <ul className="absolute top-full left-0 right-0 z-50 bg-white shadow mt-1 rounded max-h-60 overflow-y-auto">
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

  
             {!loading && results.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4'>
                {results.map((item)=>(
                  <div className="group bg-white rounded-[12px] shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square relative overflow-hidden rounded-t-[6px]">
                    <img src="images/product1.png" alt="HP Elite Dragonfly" className="w-full h-full object-contain p-6" />
                    </div>
                    <div className="p-6 border-t">
                    <span className="text-xs text-[000000] font-medium">Next Gen AI</span>
                    <h3 className="text-lg font-medium text-gray-900 mt-2 mb-1">HP Elite Dragonfly G4</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">Windows 11 Home, 14" Touch screen, Intel® Core™ i7, 32GB RAM, 1TB SSD</p>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-gray-900">$1,999.00</span>
                    </div>
                    <button className="rounded-[6px] bg-black text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">Add to Cart</button>
                    </div>
                    </div>
                   </div>
                ))}
              </div>
             )}
      
     </section>
  )
}
