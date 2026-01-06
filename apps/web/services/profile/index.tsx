import config from "@/lib/config";
import { fetchJson } from "../base/fetch-json";

async function getProfileData(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/company/stocks/${slug}?include=overview,info,stock,officers`, {
        next: { revalidate: 10 },
    });
}
async function getFillings(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/companies/${slug}/filings/`, {
        next: { revalidate: 10 },
    });
}

export { getProfileData, getFillings }