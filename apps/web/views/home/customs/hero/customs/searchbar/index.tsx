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

const SearchBar: React.FC = () => {
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

    /* ---------------------------------- */
    /* Render */
    /* ---------------------------------- */
    return (
        <div className="relative top-[300px] md:top-[500px]  max-w-[960px] mx-auto">
            <div className="relative   left-0 right-0 mx-auto z-10 search_form">
                <div className="search_form__bg" />
                <Card
                    variant="secondary"
                    className="border-none shadow-none bg-transparent! w-full p-1 md:p-6 h-full relative"
                >
                    {/* Search Input */}
                    <div className="gap-3 border rounded-2xl px-2 md:px-6 py-4 flex items-center hover:border-purple-500/70 transition-colors overflow-hidden w-[75%] md:w-full relative animated-border">
                        <img src="/icons/search-big.svg" alt="Search" className="hidden md:block" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search any stock for a free analysis"
                            className="w-full  text-foreground placeholder-slate-500 outline-none text-lg"
                        />

                        <Button className="absolute -right-2 top-[19px] -translate-y-1/2 hidden! md:block!">Search</Button>


                    </div>
                    <Button className="size-15! absolute top-[35px] rounded-2xl! -translate-y-1/2 right-2 block!    md:hidden!"><img src="/icons/search-big.svg" alt="Search" /></Button>
                    {/* Trending */}
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Typography variant="body" className="font-bold!">
                            Trending:
                        </Typography>

                        <ul className="items-center gap-2 hidden md:flex">
                            {STOCK_BADGES?.map((el) => (
                                <li key={el.id} className="flex-shrink-0">
                                    <Badge
                                        size="lg"
                                        variant="outline"
                                        className="search-form__link cursor-pointer"
                                        onClick={() =>
                                            router.push(`/en/stock/${el.slug}/summary`)
                                        }
                                    >
                                        {el.label}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                        <ul className="  flex md:hidden
    items-center gap-2
    overflow-x-auto overflow-y-hidden
    whitespace-nowrap
    flex-nowrap
    scrollbar-hide
    overscroll-x-contain
    touch-pan-x w-[calc(100%-4rem)] no-scrollbar">
                            {STOCK_MOBILE_BADGES?.map((el) => (
                                <li key={el.id} className="shrink-0">
                                    <Badge
                                        size="lg"
                                        variant="outline"
                                        className="search-form__link cursor-pointer whitespace-nowrap"
                                        onClick={() =>
                                            router.push(`/en/stock/${el.slug}/summary`)
                                        }
                                    >
                                        {el.label}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
            {/* Dropdown */}
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
    );
};

export default SearchBar;
