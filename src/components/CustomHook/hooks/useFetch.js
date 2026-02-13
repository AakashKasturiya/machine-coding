import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch data");
                const json = await res.json();

                if (mounted) {
                    // Ensure products exists, otherwise use empty array
                    setData(json.products || []);
                }
            } catch (err) {
                if (mounted) {
                    setError(err.message);
                    setData([]); // Fallback to empty array on error
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchData();
        return () => (mounted = false);
    }, [url]);

    return { data, loading, error };
};
