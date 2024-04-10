import { useEffect, useState } from "react";
import useSWR from "swr";

const MAX_RETRY = 10;
export const DataFetching_sem_swr = () => {
    const [data, setData] = useState<any[]>();
    const [error, setError] = useState<boolean>(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then((res) => res.json())
            .then((json: any) => {
                setData(json);
                setError(false);
            })
            .catch(() => setError(true));
    }, [retryCount]);

    useEffect(() => {
        if (error && retryCount < MAX_RETRY) {
            setTimeout(() => {
                setRetryCount((curr) => curr + 1);
            }, 2000);
        }
    }, [error, retryCount]);

    if (error) {
        return <div>Um erro foi encontrado</div>;
    }
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <li>
                <ul>
                    {data.map((coin) => (
                        <li key={coin.id}>{coin.name}</li>
                    ))}
                </ul>
            </li>
        </div>
    );
};

export const DataFetching = () => {
    const { data, error } = useSWR(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        (...arg) => fetch(...arg).then((res) => res.json())
    );
    if (error) {
        return <div>Um erro foi encontrado</div>;
    }
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <li>
                <ul>
                    {data.map((coin: any) => (
                        <li key={coin.id}>{coin.name}</li>
                    ))}
                </ul>
            </li>
        </div>
    );
};
