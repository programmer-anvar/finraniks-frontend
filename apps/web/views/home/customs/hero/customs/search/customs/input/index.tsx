"use client";

import { Card } from "@finranks/design-system/components/card";
import { Button } from "@finranks/design-system/components/Button";
import { Badge } from "@finranks/design-system/components/badge";
import { Typography } from "@finranks/design-system/components/typography";
import { getStockBadges, STOCK_BADGES, STOCK_MOBILE_BADGES } from "@/mocks/home";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import config from "@/lib/config";
import Link from "next/link";
import { Avatar } from "@finranks/design-system/components/avatar";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */
type Company = {
    code: string;
    name: string;
    exchange: string;
    logo: string;
};

type CompaniesResponse = {
    data: Company[];
};

const SearchInput = () => {
    const router = useRouter();

    const [searchValue, setSearchValue] = useState<string>("");
    const [items, setItems] = useState<Company[]>([]);

    const debouncedSearchValue = useDebounce(searchValue.trim(), 500);

    /* ---------------------------------- */
    /* Fetch logic */
    /* ---------------------------------- */
    const loadSearchResults = useCallback(
        async (query: string) => {
            if (!query) return;

            try {
                const { data } = await axios.get<CompaniesResponse>(
                    `${config.APP_URL}/companies`,
                    { params: { search: query } }
                );

                setItems(data?.data ?? []);
            } catch {
                setItems([]);
            }
        },
        []
    );

    /* ---------------------------------- */
    /* Effects */
    /* ---------------------------------- */
    useEffect(() => {
        if (debouncedSearchValue) {
            loadSearchResults(debouncedSearchValue);
        } else {
            setItems([]);
        }
    }, [debouncedSearchValue, loadSearchResults]);
    return (
        <div className="relative overflow-hidden">
            <div className="search-form__box">
                <img src="/icons/searchBig.svg" alt="" />
                <input
                    value={searchValue}
                    onChange={e => {
                        setSearchValue(e.target.value)
                    }}
                    className="search-form__input"
                    type="text"
                    placeholder="Serach any stock for a free analysis"
                />
                <button className="search-form__btn">
                    <span>Search</span>
                </button>
            </div>
            {items.length > 0 && (
                <div className="absolute mt-3 top-22  md:top-28 w-[93%] left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0b0324] shadow-xl z-50 overflow-hidden">
                    <ul className="divide-y divide-border/40">
                        {items.slice(0, 5).map((item) => (
                            <li key={item.code}>
                                <Link
                                    href={`/en/stock/${item.code}/summary`}
                                    onClick={() => {
                                        setSearchValue("");
                                        setItems([]);
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-purple-500/10 focus:bg-purple-500/10"
                                >
                                    {/* Logo */}
                                    <Avatar
                                        src={item.logo}
                                        alt={item.name}
                                        fallback={item.name}
                                    />

                                    {/* Text */}
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm text-foreground">
                                            {item.code}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {item.name} · {item.exchange}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchInput