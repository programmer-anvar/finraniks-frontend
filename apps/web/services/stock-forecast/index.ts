import config from "@/lib/config";
import { fetchJson } from "../base/fetch-json";

async function getForecast(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/company/analyst/${slug}?include=ratings,performance,earnings`, {
        next: { revalidate: 10 },
    });
}

export { getForecast }