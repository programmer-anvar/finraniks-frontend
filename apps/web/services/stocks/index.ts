import config from "@/lib/config";
import { CompanyInfo } from "@/types/company/company-stocks/info";
import { fetchJson } from "../base/fetch-json";

interface MarketData {
    change: number;
    changePercent: number;
    displayTime: string;
    price: number;
    state: "OPEN" | "CLOSED" | "HALTED";
    time: string;
}

interface Markets {
    afterHours: MarketData;
    preMarket: MarketData;
    regular: MarketData;
};

interface COMPANY_STOCKS_RESPONSE {
    info: CompanyInfo;
    market: MarketData;
}

interface STOCK_QUOTE_RESPONSE {
    data: {
        currency: string;
        currentMarketState: string;
        currentPrice: number;
        exchange: string;
        lastUpdate: string;
        markets: Markets;
    }
}



async function getCompanyStocks({ slug }: { slug: string }) {
    return fetchJson<COMPANY_STOCKS_RESPONSE>(`${config.APP_URL}/company/stocks/${slug}?include=info,market`, {
        next: { revalidate: 10 },
    });
}

async function getStockQuote({ slug }: { slug: string }) {
    const timestamp = Date.now();
    return fetchJson<STOCK_QUOTE_RESPONSE>(`${config.APP_URL}/quotes/${slug}?t=${timestamp}`, {
        next: { revalidate: 0 },
        cache: "no-store",
    });
}

export { getCompanyStocks, getStockQuote };