"use client"
import { SearchInput } from "@finranks/design-system/components/search-input"
import { useMemo, useState } from "react"
import NewsCard, { NewsCardProps } from "./customs/card";
import axios from "axios";
import config from "@/lib/config";
import { Button } from "@finranks/design-system/components/Button";
import { ScrollArea } from "@finranks/design-system/components/scroll-area";

type Props = {
    initialNews: NewsCardProps[];
    lastPage: number;
};


const NewsList = ({ initialNews, lastPage }: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [news, setNews] = useState<NewsCardProps[]>(initialNews);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async () => {
        if (page >= lastPage || isLoading) return;

        setIsLoading(true);

        try {
            const res = await axios.get(
                `${config.APP_URL}/news?section=alltickers&items=6&page=${page + 1}`
            );

            setNews(prev => [...prev, ...res.data.data]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredNews = useMemo(() => {
        if (!searchValue) return news;

        return news.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [news, searchValue]);


    return (
        <div>
            <SearchInput
                placeholder="Search any stock"
                value={searchValue}
                size="lg"
                onChange={e => setSearchValue(e.target.value)}
                isClearable
                aria-autocomplete="list"
                autoComplete="off"
                onClear={() => setSearchValue("")}
            />
            <div className="mt-5 space-y-4 text-center ">
                <ScrollArea className="max-h-[calc(1100vh-400px)] space-y-4 overflow-y-auto">
                    {
                        filteredNews.map((item, index) => (
                            <NewsCard key={index} {...item} />
                        ))
                    }
                </ScrollArea>

                <Button onClick={loadMore} isLoading={isLoading} variant="outline">Load More</Button>
            </div>
        </div>
    )
}

export default NewsList