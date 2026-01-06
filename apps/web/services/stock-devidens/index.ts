import config from "@/lib/config";
import { fetchJson } from "../base/fetch-json";


async function getDividends(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/companies/${slug}/dividends`, {
        next: { revalidate: 10 },
    });
}

export { getDividends }