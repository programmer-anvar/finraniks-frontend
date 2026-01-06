'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type CategoryId = 'most-active' | 'trending';

interface StockPrice {
    current?: number | null;
    change_percent?: number | null;
    is_price_up?: boolean | null;
}

interface Stock {
    symbol: string;
    name?: string | null;
    price?: StockPrice | null;
}

interface HotStockCategory {
    data: Stock[];
}

interface HotStocks {
    'most-active'?: HotStockCategory;
    trending?: HotStockCategory;
}

interface PopularStocksProps {
    hotStocks?: HotStocks;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
    { id: 'most-active', label: 'Most Active' },
    { id: 'trending', label: 'Trending Now' },
];

const PopularStocks: React.FC<PopularStocksProps> = ({ hotStocks }) => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<CategoryId>('most-active');

    const stocks = useMemo(() => {
        return hotStocks?.[activeCategory]?.data ?? [];
    }, [hotStocks, activeCategory]);

    const handleRowClick = useCallback(
        (symbol: string) => {
            router.push(`/stock/${symbol}/summary`);
        },
        [router]
    );

    return (
        <>
            <h2 className="mobile-search-page__title">Popular</h2>

            <div className="mobile-search-page__tabs">
                {CATEGORIES.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        className={`mobile-search-page__tab ${activeCategory === id
                            ? 'mobile-search-page__tab--active'
                            : ''
                            }`}
                        onClick={() => setActiveCategory(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="mobile-search-page__table-container">
                <table className="mobile-search-page__table">
                    <thead>
                        <tr>
                            <th scope="col" className="mobile-search-page__th">
                                Symbol
                            </th>
                            <th scope="col" className="mobile-search-page__th">
                                Name
                            </th>
                            <th scope="col" className="mobile-search-page__th">
                                Price
                            </th>
                            <th
                                scope="col"
                                className="mobile-search-page__th mobile-search-page__th--right"
                            >
                                Change %
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {stocks.length > 0 ? (
                            stocks.map((stock) => {
                                const price = stock.price;
                                const current = price?.current ?? 0;
                                const changePercent = price?.change_percent ?? 0;

                                const isPositive =
                                    price?.is_price_up ??
                                    changePercent >= 0;

                                return (
                                    <tr
                                        key={stock.symbol}
                                        className="mobile-search-page__row"
                                        onClick={() => handleRowClick(stock.symbol)}
                                    >
                                        <td className="mobile-search-page__td mobile-search-page__td--symbol">
                                            {stock.symbol}
                                        </td>

                                        <td className="mobile-search-page__td mobile-search-page__td--name">
                                            {stock.name || stock.symbol}
                                        </td>

                                        <td className="mobile-search-page__td mobile-search-page__td--price">
                                            ${current.toFixed(2)}
                                        </td>

                                        <td className="mobile-search-page__td mobile-search-page__td--change">
                                            <div
                                                className={`mobile-search-page__change ${isPositive
                                                    ? 'mobile-search-page__change--positive'
                                                    : 'mobile-search-page__change--negative'
                                                    }`}
                                            >
                                                <img
                                                    src={
                                                        isPositive
                                                            ? '/icons/arrowGreen.svg'
                                                            : '/icons/arrowRed.svg'
                                                    }
                                                    alt={isPositive ? 'Up' : 'Down'}
                                                    className="mobile-search-page__change-arrow"
                                                />
                                                <span>
                                                    {Math.abs(changePercent).toFixed(2)}%
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="mobile-search-page__empty"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PopularStocks;
