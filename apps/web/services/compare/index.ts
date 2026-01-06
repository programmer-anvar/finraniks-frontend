import config from "@/lib/config";
import { fetchJson } from "../base/fetch-json";

async function getMetrics() {
    return fetchJson<any>(`${config.APP_URL}/companies/compare/metrics/`, {
        next: { revalidate: 10 },
    });
}
async function getScores
    (slug: string) {
    return fetchJson<any>(`${config.APP_URL}/companies/${slug}/compare/scores/`, {
        next: { revalidate: 10 },
    });
}

async function getCompanyStocks(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/company/stocks/${slug}?include=info,market`, {
        next: { revalidate: 10 },
    });
}

async function getStockQuote(slug: string) {
    const timestamp = Date.now();
    return fetchJson<any>(`${config.APP_URL}/quotes/${slug}?t=${timestamp}`, {
        next: { revalidate: 10 },
    });
}

export { getMetrics, getScores, getCompanyStocks, getStockQuote };