'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import config from '@/lib/config';
import { useDebounce } from '@uidotdev/usehooks';
import PopularStocks from './customs/popular-stocks';

interface Company {
    code: string;
    name: string;
    logo?: string | null;
}

interface SearchPageProps {
    hotStocks: Company[];
}

const SearchPage: React.FC<SearchPageProps> = ({ hotStocks }) => {
    const router = useRouter();

    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearch] = useDebounce(searchValue, 500);
    const [items, setItems] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!debouncedSearch) {
            setItems([]);
            return;
        }

        const controller = new AbortController();

        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${config.APP_URL}/companies`,
                    {
                        params: { search: debouncedSearch },
                        signal: controller.signal,
                    }
                );

                setItems(data?.data ?? []);
            } catch (error: any) {
                if (error.name !== 'CanceledError') {
                    console.error('Search error:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();

        return () => controller.abort();
    }, [debouncedSearch]);

    const handleSelect = useCallback(
        (code: string) => {
            router.push(`/stock/${code}/summary`);
            setSearchValue('');
            setItems([]);
        },
        [router]
    );

    return (
        <div className="mobile-search-page">
            <div className="mobile-search-page__search-container">
                <div className="relative">
                    <div className="mobile-search-page__search-wrapper">
                        <img
                            src="/icons/search.svg"
                            alt="Search"
                            className="mobile-search-page__search-icon"
                        />
                        <input
                            className="mobile-search-page__search-input"
                            placeholder="Search 223 data points..."
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    {items.length > 0 && searchValue && (
                        <div className="mobile-search-dropdown z-30!">
                            {items.slice(0, 5).map((item) => (
                                <button
                                    key={item.code}
                                    onClick={() => handleSelect(item.code)}
                                    className="mobile-search-dropdown__item w-full flex items-center  gap-3"
                                    type="button"
                                >
                                    <div className="mobile-search-dropdown__image flex items-center gap-2 text-start">
                                        {item.logo ? (
                                            <img src={item.logo} alt={item.code} />
                                        ) : (
                                            <div className="mobile-search-dropdown__placeholder">
                                                {item.code[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="start">
                                        <div className="mobile-search-dropdown__code text-start">
                                            {item.code}
                                        </div>
                                        <div className="mobile-search-dropdown__name">
                                            {item.name}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <div className="mobile-search-dropdown__loading">
                            Searching...
                        </div>
                    )}
                </div>
            </div>

            <PopularStocks hotStocks={hotStocks as any} />
        </div>
    );
};

export default SearchPage;
