import webSocketService from '@/services/websocket';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ---------- Types ---------- */

type ConnectionState = 'connected' | 'connecting' | 'disconnected' | 'error';

type StockSymbol = string;

type StockUpdateCallback<T = unknown> = (data: T) => void;

type UnsubscribeFn = () => void;

/* ---------- Hook ---------- */

export function useWebSocket() {
    const [connectionState, setConnectionState] =
        useState<ConnectionState>('disconnected');
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // Connect on mount
        webSocketService
            .connect()
            .then(() => {
                setConnectionState('connected');
                setIsConnected(true);
            })
            .catch(() => {
                setConnectionState('error');
                setIsConnected(false);
            });

        // Poll connection state
        intervalRef.current = setInterval(() => {
            const currentState = webSocketService.getConnectionState() as ConnectionState;
            const connected = webSocketService.isConnected();

            setConnectionState(currentState);
            setIsConnected(connected);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const subscribe = useCallback(
        <T,>(symbol: StockSymbol, callback: StockUpdateCallback<T>): UnsubscribeFn => {
            return webSocketService.subscribe(symbol, callback as any);
        },
        []
    );

    const subscribeToSymbols = useCallback((symbols: StockSymbol[]) => {
        webSocketService.subscribeToSymbols(symbols);
    }, []);

    const unsubscribeFromSymbols = useCallback((symbols: StockSymbol[]) => {
        webSocketService.unsubscribeFromSymbols(symbols);
    }, []);

    return {
        connectionState,
        isConnected,
        subscribe,
        subscribeToSymbols,
        unsubscribeFromSymbols,
    };
}
