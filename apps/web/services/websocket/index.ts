
/* -------------------- Types -------------------- */

import notificationService from "../notification";

export type ConnectionState =
    | 'disconnected'
    | 'connecting'
    | 'connected'
    | 'error';

export interface PriceData {
    symbol: string;
    price?: number;
    change?: number;
    percentChange?: number;
    [key: string]: unknown;
}

interface PriceUpdateMessage {
    type: 'price_update';
    data: PriceData;
}

interface SubscribeMessage {
    type: 'subscribe' | 'unsubscribe';
    symbols: string[];
}

type IncomingMessage = PriceUpdateMessage | Record<string, unknown>;
type SubscriberCallback = (data: PriceData) => void;

/* -------------------- Service -------------------- */

class WebSocketService {
    private ws: WebSocket | null = null;
    private subscribers: Map<string, Set<SubscriberCallback>> = new Map();

    private connectionState: ConnectionState = 'disconnected';
    private reconnectAttempts = 0;
    private readonly maxReconnectAttempts = 5;
    private readonly reconnectDelay = 1000;

    private subscribedSymbols: Set<string> = new Set();
    private pendingSubscriptions: Set<string> = new Set();

    /* -------------------- Connection -------------------- */

    connect(): Promise<void> {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            try {
                this.connectionState = 'connecting';
                this.ws = new WebSocket('wss://ws.finranks.com/ws');

                this.ws.onopen = () => {
                    this.connectionState = 'connected';
                    this.reconnectAttempts = 0;

                    const allSymbols = new Set([
                        ...this.subscribedSymbols,
                        ...this.pendingSubscriptions,
                    ]);

                    if (allSymbols.size > 0) {
                        this.subscribeToSymbols(Array.from(allSymbols));
                    }

                    this.pendingSubscriptions.clear();
                    resolve();
                };

                this.ws.onmessage = (event: MessageEvent<string>) => {
                    try {
                        const message: IncomingMessage = JSON.parse(event.data);
                        this.handleMessage(message);
                    } catch {
                        // ignore malformed messages
                    }
                };

                this.ws.onclose = () => {
                    this.connectionState = 'disconnected';
                    this.attemptReconnect();
                };

                this.ws.onerror = (error) => {
                    this.connectionState = 'error';
                    reject(error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }

        this.connectionState = 'disconnected';
        this.subscribedSymbols.clear();
    }

    private attemptReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) return;

        this.reconnectAttempts++;

        setTimeout(() => {
            this.connect().catch(() => {
                // onclose will retry
            });
        }, this.reconnectDelay * this.reconnectAttempts);
    }

    /* -------------------- Subscriptions -------------------- */

    subscribeToSymbols(symbols: string[]): void {
        if (!Array.isArray(symbols) || symbols.length === 0) return;

        symbols.forEach(symbol => this.subscribedSymbols.add(symbol));

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const message: SubscribeMessage = {
                type: 'subscribe',
                symbols,
            };

            this.ws.send(JSON.stringify(message));
        } else {
            symbols.forEach(symbol => this.pendingSubscriptions.add(symbol));
        }
    }

    unsubscribeFromSymbols(symbols: string[]): void {
        if (!Array.isArray(symbols) || symbols.length === 0) return;

        symbols.forEach(symbol => this.subscribedSymbols.delete(symbol));

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const message: SubscribeMessage = {
                type: 'unsubscribe',
                symbols,
            };

            this.ws.send(JSON.stringify(message));
        }
    }

    subscribe(symbol: string, callback: SubscriberCallback): () => void {
        if (!this.subscribers.has(symbol)) {
            this.subscribers.set(symbol, new Set());
        }

        this.subscribers.get(symbol)!.add(callback);

        if (!this.subscribedSymbols.has(symbol)) {
            this.subscribeToSymbols([symbol]);
        }

        return () => {
            const symbolSubscribers = this.subscribers.get(symbol);

            if (!symbolSubscribers) return;

            symbolSubscribers.delete(callback);

            if (symbolSubscribers.size === 0) {
                this.subscribers.delete(symbol);
                this.unsubscribeFromSymbols([symbol]);
            }
        };
    }

    /* -------------------- Message Handling -------------------- */

    private handleMessage(message: IncomingMessage): void {
        if (
            typeof message === 'object' &&
            message !== null &&
            (message as PriceUpdateMessage).type === 'price_update' &&
            (message as PriceUpdateMessage).data
        ) {
            const priceData = (message as PriceUpdateMessage).data;
            const { symbol } = priceData;

            const symbolSubscribers = this.subscribers.get(symbol);
            if (!symbolSubscribers) return;

            notificationService.showPriceUpdateNotification(priceData as any);

            symbolSubscribers.forEach(callback => {
                try {
                    callback(priceData);
                } catch {
                    // ignore callback errors
                }
            });
        }
    }

    /* -------------------- State -------------------- */

    getConnectionState(): ConnectionState {
        return this.connectionState;
    }

    isConnected(): boolean {
        return this.connectionState === 'connected';
    }
}

/* -------------------- Singleton -------------------- */

const webSocketService = new WebSocketService();
export default webSocketService;
