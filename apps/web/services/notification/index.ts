/* -------------------- Types -------------------- */

export type NotificationPermissionState =
    | 'default'
    | 'granted'
    | 'denied';

export interface MarketData {
    price: number;
    change: number;
    changePercent: number;
}

export interface Markets {
    preMarket?: MarketData;
    regular?: MarketData;
    afterHours?: MarketData;
}

export interface PriceUpdateData {
    symbol: string;
    name?: string;
    currentMarketState: 'PRE' | 'REGULAR' | 'POST' | 'CLOSED' | 'POSTPOST';
    currentPrice?: number;
    markets: Markets;
}

export interface NotificationStatus {
    permission: NotificationPermissionState;
    isEnabled: boolean;
    supported: boolean;
}

/* -------------------- Service -------------------- */

class NotificationService {
    private permission: NotificationPermissionState = 'default';
    private isEnabled = false;

    private lastNotifications: Map<string, number> = new Map();
    private readonly notificationCooldown = 60_000; // 1 minute

    /* -------------------- Permissions -------------------- */

    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            return false;
        }

        if (this.permission === 'granted') {
            this.isEnabled = true;
            return true;
        }

        try {
            this.permission = await Notification.requestPermission();
            this.isEnabled = this.permission === 'granted';

            if (this.isEnabled) {
                this.showNotification('FinRanks', {
                    body: 'You will now receive real-time stock price alerts',
                    icon: '/images/logo.svg',
                    tag: 'welcome',
                });
            }

            return this.isEnabled;
        } catch {
            return false;
        }
    }

    /* -------------------- Core -------------------- */

    showNotification(
        title: string,
        options: NotificationOptions = {}
    ): Notification | null {
        if (!this.isEnabled || this.permission !== 'granted') {
            return null;
        }

        try {
            const notification = new Notification(title, {
                icon: '/images/logo.svg',
                badge: '/images/logo.svg',
                ...options,
            });

            setTimeout(() => {
                notification.close();
            }, 5000);

            return notification;
        } catch {
            return null;
        }
    }

    private shouldShowNotification(symbol: string): boolean {
        const now = Date.now();
        const lastNotification = this.lastNotifications.get(symbol);

        if (!lastNotification) return true;

        return now - lastNotification >= this.notificationCooldown;
    }

    /* -------------------- Price Updates -------------------- */

    showPriceUpdateNotification(priceData: PriceUpdateData): void {
        if (!this.isEnabled || !this.shouldShowNotification(priceData.symbol)) {
            return;
        }

        const {
            symbol,
            name,
            currentMarketState,
            markets,
        } = priceData;

        let marketData: MarketData | undefined;
        let marketSession = '';

        if (currentMarketState === 'PRE' && markets.preMarket) {
            marketData = markets.preMarket;
            marketSession = 'Pre-market';
        } else if (currentMarketState === 'REGULAR' && markets.regular) {
            marketData = markets.regular;
            marketSession = 'Regular';
        } else if (
            ['POST', 'CLOSED', 'POSTPOST'].includes(currentMarketState) &&
            markets.afterHours
        ) {
            marketData = markets.afterHours;
            marketSession = 'After-hours';
        }

        if (!marketData) return;

        const { price, change, changePercent } = marketData;

        const changeText =
            change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);

        const changePercentText =
            changePercent >= 0
                ? `+${changePercent.toFixed(2)}%`
                : `${changePercent.toFixed(2)}%`;

        const direction = change >= 0 ? '📈' : '📉';

        const title = `${symbol} ${direction} ${price.toFixed(2)}`;
        const body = `${name ?? symbol}\n${marketSession}: ${changeText} (${changePercentText})`;

        this.showNotification(title, {
            body,
            tag: symbol,
            data: {
                symbol,
                price,
                change,
                changePercent,
                marketSession,
            },
        });

        this.lastNotifications.set(symbol, Date.now());
    }

    /* -------------------- Optional / Future -------------------- */

    showSubscriptionConfirmation(symbols: string[]): void {
        if (!this.isEnabled) return;

        const symbolText =
            symbols.length === 1 ? symbols[0] : `${symbols.length} stocks`;

        this.showNotification('Subscription Active', {
            body: `Now monitoring ${symbolText} for real-time updates`,
            tag: 'subscription',
        });
    }

    /* -------------------- Controls -------------------- */

    disable(): void {
        this.isEnabled = false;
    }

    enable(): boolean | Promise<boolean> {
        if (this.permission === 'granted') {
            this.isEnabled = true;
            return true;
        }
        return this.requestPermission();
    }

    getStatus(): NotificationStatus {
        return {
            permission: this.permission,
            isEnabled: this.isEnabled,
            supported: 'Notification' in window,
        };
    }
}

/* -------------------- Singleton -------------------- */

const notificationService = new NotificationService();
export default notificationService;
