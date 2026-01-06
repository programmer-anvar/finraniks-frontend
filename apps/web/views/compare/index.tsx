import React from 'react'
import Header from './customs/header'
import Body from './customs/body';
import { getCompanyStocks, getMetrics, getScores, getStockQuote } from '@/services/compare';
import { get } from 'lodash';

const ComparePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    // --- Parallel data fetching ---
    const [
        { data: metrics },
        { data: scores },
        { data: stocks },
        quoteResponse,
    ] = await Promise.all([
        getMetrics(),
        getScores(id),
        getCompanyStocks(id),
        getStockQuote(id),
    ]);

    // --- Extract base data ---
    const quote = quoteResponse?.data;
    const info = get(stocks, "info.data");
    const market = get(stocks, "market.data");

    const name = get(info, "name");

    // --- Helpers ---
    const getNumber = (value: unknown, fallback = 0) =>
        typeof value === "number" ? value : fallback;

    const fromQuoteOrMarket = (
        quotePath: string,
        marketPath: string,
        fallback = 0
    ) =>
        getNumber(
            quote ? get(quote, quotePath) : undefined,
            getNumber(get(market, marketPath), fallback)
        );

    // --- Derived values ---
    const change = fromQuoteOrMarket(
        "markets.regular.change",
        "change"
    );

    const change_p = fromQuoteOrMarket(
        "markets.regular.changePercent",
        "change_p"
    );

    const previousClose = fromQuoteOrMarket(
        "markets.regular.price",
        "previousClose"
    );

    // --- Final payload ---
    const initialData = {
        metrics,
        scores,
        info,
        market,
        name,
        change,
        change_p,
        previousClose,
    };
    return (
        <div className='app-container space-y-4 py-5'>
            <Header slug={id} />
            <Body initialData={initialData} />
        </div>
    )
}

export default ComparePage