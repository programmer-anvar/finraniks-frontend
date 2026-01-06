import SearchPage from "@/views/search-page";
import { headers } from "next/headers";
import { fetchHotStocks } from "@/services/hot-stocks";
import { getDeviceType } from "@/utils/get-device-type";

export default async function Page() {
    const deviceInfo = getDeviceType(await headers());
    let hotStocks = null;
    try {
        const response = await fetchHotStocks();
        hotStocks = response.data || null;
    } catch (error) {
        console.error('Failed to fetch hot stocks:', error);
        hotStocks = null;
    }

    if (deviceInfo.isMobile) {
        return <SearchPage hotStocks={hotStocks} />;
    }
    return null;
}
