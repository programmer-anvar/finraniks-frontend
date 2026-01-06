import { useEffect, useState } from 'react';
import { useWebSocket } from '../useWebSocket';

/* ---------- Types ---------- */

export interface StockPriceData {
    price?: number;
    symbol?: string;
    [key: string]: unknown;
}

/* ---------- Hook ---------- */

export function useStockPrice<T = StockPriceData>(symbol?: string) {
    const [priceData, setPriceData] = useState<T | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const { subscribe, isConnected } = useWebSocket();

    useEffect(() => {
        if (!symbol) return;

        const unsubscribe = subscribe<T>(symbol, (data) => {
            setPriceData(data);
            setLastUpdate(new Date());
        });

        return unsubscribe;
    }, [symbol, subscribe]);

    return {
        priceData,
        lastUpdate,
        isConnected,
    };
}
