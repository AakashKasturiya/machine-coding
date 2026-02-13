import React, { useEffect, useRef, useState } from "react";

const LIMIT = 10;

export const SimpleInfiniteScroll = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(0);

    const loaderRef = useRef(null);

    /* ---------- Fetch Data ---------- */
    const fetchData = async () => {
        if (loadingRef.current || !hasMoreRef.current) return;

        loadingRef.current = true;

        setLoading(true);

        const res = await fetch(
            `https://dummyjson.com/products?limit=${LIMIT}&skip=${pageRef.current * LIMIT}`
        );
        const data = await res.json();

        setItems((prev) => {
            const merged = [...prev, ...(data.products || [])];
            const byId = new Map();
            for (const p of merged) {
                if (!p) continue;
                byId.set(p.id, p);
            }
            return Array.from(byId.values());
        });

        if (data.products.length < LIMIT) {
            setHasMore(false); // 🚫 No more data
            hasMoreRef.current = false;
        }

        setPage((prev) => {
            const next = prev + 1;
            pageRef.current = next;
            return next;
        });
        setLoading(false);
        loadingRef.current = false;
    };

    /* ---------- Initial Load ---------- */
    useEffect(() => {
        fetchData();
    }, []);

    /* ---------- Intersection Observer ---------- */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchData();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [loading, hasMore]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-xl font-semibold mb-6">🔥 Infinite Scroll</h1>

            {/* ---------- Items ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-40 w-full object-cover rounded mb-3"
                        />
                        <h2 className="font-medium text-sm mb-1">{item.title}</h2>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {item.description}
                        </p>
                        <span className="text-sm font-semibold">₹{item.price}</span>
                    </div>
                ))}
            </div>

            {/* ---------- Loader / End ---------- */}
            <div ref={loaderRef} className="flex justify-center py-6">
                {loading && <p className="text-sm text-gray-500">Loading...</p>}
                {!hasMore && (
                    <p className="text-sm text-gray-400">🚫 No more products</p>
                )}
            </div>
        </div>
    );
}
