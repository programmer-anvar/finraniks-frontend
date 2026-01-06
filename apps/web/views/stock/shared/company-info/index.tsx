"use client";

import { Card, CardHeader, CardTitle } from "@finranks/design-system/components/card";
import { Avatar } from "@finranks/design-system/components/avatar";
import { Typography } from "@finranks/design-system/components/typography";
import { Button } from "@finranks/design-system/components/Button";
import { Separator } from "@finranks/design-system/components/separator";
import { CirclePlus } from "lucide-react";
import get from "lodash/get";
import { useRouter } from "next/navigation";
import { useStockPrice } from "@/hooks/useStockPrice";
import { useEffect, useMemo, useState } from "react";

export interface CompanyInfoProps {
    slug: string;
    company: {
        name: string;
        symbol: string;
        logoUrl?: string;
        exchange: string;
        currency: string;
    };
    market: any;
    quoteData: any;
}

const CompanyInfo = (props: CompanyInfoProps) => {
    const { slug, quoteData, market } = props;
    const router = useRouter();

    const { priceData: realtimePriceData } = useStockPrice(slug);
    const [currentData, setCurrentData] = useState<any>(quoteData);

    /**
     * Sync server data → state
     */
    useEffect(() => {
        if (quoteData) {
            setCurrentData(quoteData);
        }
    }, [quoteData]);

    /**
     * Apply websocket updates
     */
    useEffect(() => {
        if (!realtimePriceData) return;

        setCurrentData((prev: any) => {
            if (!prev) return prev;

            const state = get(realtimePriceData, "currentMarketState");
            const markets = get(realtimePriceData, "markets");

            const nextMarkets = { ...get(prev, "markets") };

            if (state === "PRE" && get(markets, "preMarket")) {
                nextMarkets.preMarket = get(markets, "preMarket");
            }

            if (state === "REGULAR" && get(markets, "regular")) {
                nextMarkets.regular = get(markets, "regular");
            }

            if (["POST", "CLOSED", "POSTPOST"].includes(state as string) && get(markets, "afterHours")) {
                nextMarkets.afterHours = get(markets, "afterHours");
            }

            return {
                ...prev,
                markets: nextMarkets,
                currentMarketState: state,
            };
        });
    }, [realtimePriceData]);

    /**
     * Derived display data
     */
    const displayData = currentData || quoteData;

    /**
     * Company info
     */
    const company = get(props, "company", {});
    const name = get(company, "name", "");
    const symbol = get(company, "symbol", "");
    const logo = get(company, "logoUrl");
    const exchange = get(company, "exchange", "");
    const currency = get(company, "currency", "");

    /**
     * Market values (safe + fallback)
     */
    const change = useMemo(
        () =>
            get(displayData, "markets.regular.change",
                typeof get(market, "change") === "number" ? get(market, "change") : 0
            ),
        [displayData, market]
    );

    const change_p = useMemo(
        () =>
            get(displayData, "markets.regular.changePercent",
                typeof get(market, "change_p") === "number" ? get(market, "change_p") : 0
            ),
        [displayData, market]
    );

    const prev = Number(get(market, "prev")) ? get(market, "prev") : 0;

    const close = useMemo(
        () =>
            get(displayData, "markets.regular.price",
                Number(get(market, "close")) ? get(market, "close") : 0
            ),
        [displayData, market]
    );

    const previousClose = close || prev;

    /**
     * Utils
     */
    const formatChange = (value: number, percent: number) =>
        `${value > 0 ? "+" : ""}${value.toFixed(2)} (${percent.toFixed(2)}%)`;

    return (
        <Card className="space-y-4 p-4 md:p-6 rounded-[20px]">
            <CardHeader className="flex flex-col md:flex-row justify-between px-0">
                <CardTitle className="flex items-center gap-4">
                    <Avatar
                        src={logo}
                        fallback={name}
                        classNames={{
                            base: "size-12 md:size-18",
                            img: "size-12 md:size-18",
                            fallback: "size-12 md:size-18 text-2xl! font-bold!",
                        }}
                    />

                    <div>
                        <Typography truncate variant="h2" weight="bold" className="text-base md:text-2xl!">
                            {name} {symbol && `(${symbol})`}
                        </Typography>

                        <Typography truncate variant="body" color="helper" className="text-sm md:text-base">
                            {exchange && currency
                                ? `${exchange} – Real Time Price. Currency in ${currency}`
                                : ""}
                        </Typography>
                    </div>
                </CardTitle>

                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push(`/en/compare/${slug}`)}
                    >
                        Compare
                    </Button>
                    <Button prepend={<CirclePlus />} className="w-full">
                        Add to Watchlist
                    </Button>
                </div>
            </CardHeader>

            <Separator />

            <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Close */}
                <div>
                    <div className="flex items-baseline gap-4">
                        <Typography variant="body" className="text-base md:text-2xl! font-bold!">
                            {previousClose.toFixed(2)}
                        </Typography>

                        <Typography
                            variant="body"
                            className={`text-xs md:text-base! font-bold! whitespace-nowrap ${change > 0 ? "text-[#0fedbe]!" : "text-red-500!"
                                }`}
                        >
                            {formatChange(change, change_p)}
                        </Typography>
                    </div>

                    {displayData && (
                        <Typography variant="small" color="helper" className="text-[9px] md:text-[12px]">
                            <strong className="text-white">
                                {get(displayData, "currentMarketState") === "REGULAR"
                                    ? "Market open: "
                                    : "At close: "}
                            </strong>
                            {get(displayData, "markets.regular.displayTime")}
                        </Typography>
                    )}
                </div>

                {/* Pre-market */}
                {get(displayData, "currentMarketState") === "PRE" &&
                    get(displayData, "markets.preMarket.price", 0) > 0 && (
                        <div>
                            <div className="flex items-baseline gap-4">
                                <Typography variant="body" className="text-base md:text-2xl! font-bold!">
                                    {get(displayData, "markets.preMarket.price").toFixed(2)}
                                </Typography>
                                <Typography
                                    variant="body"
                                    className={`text-sm md:text-base! font-bold! ${get(displayData, "markets.preMarket.change") > 0
                                        ? "text-[#0fedbe]!"
                                        : "text-red-500!"
                                        }`}
                                >
                                    {formatChange(
                                        get(displayData, "markets.preMarket.change"),
                                        get(displayData, "markets.preMarket.changePercent")
                                    )}
                                </Typography>
                            </div>
                            <Typography variant="small" color="helper" className="text-[9px] md:text-[12px]">
                                <strong className="text-white">Pre-market:</strong>{" "}
                                {get(displayData, "markets.preMarket.displayTime")}
                            </Typography>
                        </div>
                    )}

                {/* After-hours */}
                {get(displayData, "currentMarketState") !== "PRE" &&
                    get(displayData, "markets.afterHours.price", 0) > 0 && (
                        <div>
                            <div className="flex items-baseline gap-4">
                                <Typography variant="body" className="text-base md:text-2xl! font-bold!">
                                    {get(displayData, "markets.afterHours.price").toFixed(2)}
                                </Typography>
                                <Typography
                                    variant="body"
                                    className={`text-sm md:text-base! font-bold! ${get(displayData, "markets.afterHours.change") > 0
                                        ? "text-[#0fedbe]!"
                                        : "text-red-500!"
                                        }`}
                                >
                                    {formatChange(
                                        get(displayData, "markets.afterHours.change"),
                                        get(displayData, "markets.afterHours.changePercent")
                                    )}
                                </Typography>
                            </div>
                            <Typography variant="small" color="helper" className="text-[9px] md:text-[12px]">
                                <strong className="text-white">
                                    {get(displayData, "currentMarketState") === "REGULAR"
                                        ? "Previous after-hours: "
                                        : "After-hours: "}
                                </strong>
                                {get(displayData, "markets.afterHours.displayTime")}
                            </Typography>
                        </div>
                    )}
            </div>
        </Card>
    );
};

export default CompanyInfo;
