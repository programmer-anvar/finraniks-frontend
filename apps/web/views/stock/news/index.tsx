import { getNewsList, getPressRelease, getUpgradesDowngrades, getVideoNewsList } from "@/services/stocks-news";
import VideoNewsCard from "@/views/stock/news/customs/video-news.card";
import { Card } from "@finranks/design-system/components/card";
import { Typography } from "@finranks/design-system/components/typography";
import React from "react";
import UpgradeDowngradeTable from "@/views/stock/news/customs/upgrade-downgrade-table";
import PressReleaseCard from "@/views/stock/news/customs/press-release-card";
import NewsList from "./customs/news-list";

const StockNewsPage = async ({ params }: any) => {
    const { slug } = await params;
    const { data: newsList } = await getNewsList(slug);
    const { data: videoNewsList } = await getVideoNewsList(slug);
    const { data: upgradeDowngradesList } = await getUpgradesDowngrades(slug);
    const { data: pressReleaseList } = await getPressRelease(slug);

    return (
        <div className="container space-y-4">
            <div className="grid gap-4 md:grid-cols-[2fr_1fr] items-baseline">
                <NewsList initialNews={newsList} slug={slug} />
                <Card className='space-y-4 p-4 rounded-xl sticky top-18 mb-auto'>
                    <Typography variant="h4">Videos</Typography>
                    {videoNewsList.length > 0 && videoNewsList.map((item, i: number) => {
                        return (
                            <VideoNewsCard item={item} key={i} />
                        )
                    })}
                </Card>
            </div>

            {
                upgradeDowngradesList.length > 0 && (
                    <Card className="rounded-xl p-4 md:p-6">
                        <Typography variant="h4">Upgrades / Downgrades</Typography>
                        <div className='mt-5'>
                            <UpgradeDowngradeTable list={upgradeDowngradesList} />
                        </div>
                    </Card>
                )
            }

            {
                pressReleaseList.length > 0 && (
                    <Card className="rounded-xl p-4 md:p-6">
                        <Typography variant="h4">Press releases</Typography>
                        <div className='grid grid-cols-2 gap-4 mt-5'>
                            {pressReleaseList.length > 0 && pressReleaseList.map((item, i) => {
                                return (
                                    <div key={i} className='px-2'>
                                        <PressReleaseCard item={item} key={i} />
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                )
            }
        </div>
    )
}

export default StockNewsPage