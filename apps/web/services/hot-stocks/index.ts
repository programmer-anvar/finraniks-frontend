import config from "@/lib/config";
import { fetchJson } from "../base/fetch-json";




async function fetchHotStocks() {
    return fetchJson<any>(`${config.APP_URL}/market/hot-stocks?include=most-active%2Ctrending&limit=8`, {
        next: { revalidate: 60 },
    });
}

export { fetchHotStocks }