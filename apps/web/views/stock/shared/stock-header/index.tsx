'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

type MarketState = 'REGULAR' | 'PRE' | 'POST' | 'CLOSED' | string;

interface StockHeaderProps {
    ticker: string;
    name: string;
    price: number | string;
    change: number;
    changePercent: number;
    exchange?: string;
    displayTime?: string;
    currentMarketState?: MarketState;
}

interface TabItem {
    label: string;
    link: string;
}

const tabsArray: TabItem[] = [
    { label: 'Summary', link: 'summary' },
    { label: 'News', link: 'news' },
    { label: 'Chart', link: 'chart' },
    { label: 'Financial', link: 'financial' },
    { label: 'Dividends', link: 'dividends' },
    { label: 'Forecast', link: 'forecast' },
    { label: 'Ownership', link: 'ownership' },
    { label: 'Profile', link: 'profile' },
];

const StockHeader: React.FC<StockHeaderProps> = ({
    ticker,
    name,
    price,
    change,
    changePercent,
    exchange = '',
    displayTime,
    currentMarketState = 'REGULAR',
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('');

    const { slug } = useParams<{ slug: string }>();
    const pathname = usePathname();

    // Active tab detection
    useEffect(() => {
        const segments = pathname.split('/');
        setActiveTab(segments[segments.length - 1]);
    }, [pathname]);

    // Scroll visibility logic
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`mobile-sticky-stock-header z-40 ${isVisible ? 'visible' : ''}`}>
            {/* TOP INFO */}
            <div className="mobile-sticky-stock-header__top">
                <div className="mobile-sticky-stock-header__info">
                    <div className="mobile-sticky-stock-header__ticker">{ticker}</div>
                    <div className="mobile-sticky-stock-header__subtitle">
                        {name} {exchange}
                    </div>
                </div>

                <div className="mobile-sticky-stock-header__price-section">
                    <div className="mobile-sticky-stock-header__price-row">
                        <div className="mobile-sticky-stock-header__price">{price}</div>
                        <div
                            className={`mobile-sticky-stock-header__change ${change >= 0 ? 'positive' : 'negative'
                                }`}
                        >
                            {change >= 0 ? '+' : ''}
                            {change} ({change >= 0 ? '+' : ''}
                            {changePercent}%)
                        </div>
                    </div>

                    {displayTime && (
                        <div className="mobile-sticky-stock-header__time">
                            {currentMarketState === 'REGULAR'
                                ? 'Market open: '
                                : 'At close: '}
                            {displayTime}
                        </div>
                    )}
                </div>
            </div>

            {/* TABS */}
            <div className="mobile-sticky-stock-header__tabs">
                <div className="mobile-sticky-stock-header__tabs-scroll">
                    {tabsArray.map((item) => (
                        <Link
                            key={item.link}
                            href={`/stock/${slug}/${item.link}`}
                            className={`mobile-sticky-stock-header__tab ${activeTab === item.link ? 'active' : ''
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StockHeader;
