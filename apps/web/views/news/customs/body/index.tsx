import Headlines from "./customs/headlines"
import NewsList from "./customs/news";
import config from "@/lib/config";
import { NewsCardProps } from "./customs/news/customs/card";


type NewsResponse = {
    data: NewsCardProps[];
    meta: {
        page: number;
        last_page: number;
    }
};
export async function getNewsList(): Promise<NewsResponse> {
    const res = await fetch(
        `${config.APP_URL}/news?section=alltickers&items=8&page=1`,
        {
            cache: "no-store", // always fresh data
        }
    );

    if (!res.ok) {
        console.error("News fetch failed", res.status);
        throw new Error("Failed to fetch news list");
    }

    return res.json();
}

const Body = async () => {
    const news = await getNewsList();
    return (
        <div className="grid grid-cols-[60%_40%] gap-4 items-baseline">
            <NewsList initialNews={news.data} lastPage={news.meta.last_page} />
            <Headlines />
        </div>
    )
}

export default Body