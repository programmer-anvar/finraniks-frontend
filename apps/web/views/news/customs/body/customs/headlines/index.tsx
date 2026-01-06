import config from "@/lib/config";
import { Card } from "@finranks/design-system/components/card";
import LatestSentiment from "./customs/latest-sentiment";
import MentionedStocks from "./customs/mentioned-stocks";
import HeadlineList from "./customs/headlines";

type TData = {
    headline: string;
}

type TRendingHeadlines = {
    data: TData[]
}

export async function getTrendingHeadlines(): Promise<TRendingHeadlines> {
    const res = await fetch(
        `${config.APP_URL}/news/trending?items=5`,
        {
            next: { revalidate: 10 },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch trending headlines");
    }

    return res.json();
}



async function getTopMentionedStocks(): Promise<any> {
    const res = await fetch(
        `${config.APP_URL}/news/top-mention?date=last1year`,
        { next: { revalidate: 10 } }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}


async function getNewsSentiment(): Promise<any> {
    const res = await fetch(
        `${config.APP_URL}/news/sentiment?section=alltickers&date=last1year`,
        { next: { revalidate: 10 } }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const Headlines = async () => {
    const { data: headLines } = await getTrendingHeadlines();
    const { data: topMentionedStocks } = await getTopMentionedStocks();
    const { data: newsSentiment } = await getNewsSentiment();
    return (
        <Card className="p-4 rounded-md sticky top-18 space-y-5">
            <HeadlineList data={headLines} />
            <MentionedStocks topMentionedStocks={topMentionedStocks?.all} />
            <LatestSentiment sentiments={newsSentiment.sentiments} />
        </Card>
    )
}

export default Headlines;