import { useEffect, useState } from "react";

const useFetch = <T,>(url: string) => {

    const [data, setData] = useState<T | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const controller = new AbortController();

        async function fetchData() {

            try {

                setLoading(true);
                setError(null);

                const response = await fetch(url, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result: T = await response.json();

                setData(result);

            } catch (error) {

                if (
                    error instanceof Error &&
                    error.name !== "AbortError"
                ) {
                    setError(error.message);
                }

            } finally {

                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            controller.abort();
        };

    }, [url]);

    return {
        data,
        loading,
        error
    };
};

export default useFetch;