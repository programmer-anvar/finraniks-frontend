import config from "@/lib/config";

export interface NewsStockResponse<T> {
    data: T[];
    meta: Object
    success: boolean
}

export interface NewsEntity {
    date: string;            // ISO date string
    image_url: string;
    news_url: string;
    sentiment: string;
    source_name: string;
    text: string;
    tickers: string[];
    title: string;
    topics: string[];
    type: 'Article' | "Video";
}

export interface UpgradeDowngrade {
    analystFirm: string;
    date: Record<string, any>;
    priceTarget: Record<string, any>;
    rating: Record<string, any>;
    type: "Downgrade";
    ticker: string;
}

async function getNewsList(slug: string): Promise<NewsStockResponse<NewsEntity>> {
    const res = await fetch(
        `${config.APP_URL}/news?tickers=${slug}&items=7&page=1`,
        { next: { revalidate: 10 } }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getVideoNewsList(slug: string): Promise<NewsStockResponse<NewsEntity>> {
    const res = await fetch(
        `${config.APP_URL}/news?tickers=${slug}&type=Video&items=4&page=1`,
        { next: { revalidate: 10 } }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getUpgradesDowngrades(slug: string): Promise<NewsStockResponse<UpgradeDowngrade>> {
    const res = await fetch(
        `${config.APP_URL}/news/ratings?tickers=${slug}&items=8&page=1`,
        { next: { revalidate: 10 } }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

async function getPressRelease(slug: string): Promise<NewsStockResponse<NewsEntity>> {
    const res = await fetch(
        `${config.APP_URL}/news?tickers=${slug}&topic=PressRelease&items=4`,
        { next: { revalidate: 10 } }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export { getNewsList, getVideoNewsList, getUpgradesDowngrades, getPressRelease };