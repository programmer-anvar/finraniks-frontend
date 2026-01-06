
import config from "@/lib/config";
import { fetchJson } from "../base/fetch-json";

async function getHolders(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/companies/${slug}/holders`, {
        next: { revalidate: 10 },
    });
}

export { getHolders }