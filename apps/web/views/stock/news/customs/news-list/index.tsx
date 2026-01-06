"use client"
import config from '@/lib/config';
import React, { useState } from 'react'
import NewsCard from '../card';
import { Button } from '@finranks/design-system/components/Button';

const NewsList = ({ initialNews, slug }: any) => {
    const [newsList, setNewsList] = useState(initialNews);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialNews.length >= 7);

    const loadMore = async () => {
        setIsLoading(true);
        try {
            const nextPage = currentPage + 1;
            const response = await fetch(
                `${config.APP_URL}/news?tickers=${slug}&items=7&page=${nextPage}`
            );
            const { data } = await response.json();

            if (data && data.length > 0) {
                // @ts-expect-error
                setNewsList(prev => [...prev, ...data]);
                setCurrentPage(nextPage);
                setHasMore(data.length >= 7);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {newsList?.length > 0 && newsList?.map((item: any, index: number) => (
                <NewsCard {...item} key={`${item.id || index}-${currentPage}`} classNames={{ wrapper: "mt-0 mb-4" }} />
            ))}

            {hasMore && (
                <div className="load-more-wrapper text-center mt-10">
                    <Button
                        className=""
                        variant='outline'
                        onClick={loadMore}
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </div>
    )
}

export default NewsList