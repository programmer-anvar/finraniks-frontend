"use client";
import config from "@/lib/config";
import { useAppContext } from "@/lib/providers/customs/app";
import { useModals } from "@/stores/modal";
import { Card } from "@finranks/design-system/components/card";
import { Separator } from "@finranks/design-system/components/separator";
import { Typography } from "@finranks/design-system/components/typography";
import axios from "axios";
import { get } from "lodash";
import { X } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';


const fetchScores = async (slug: string) => {
    const { data } = await axios.get(
        `${config.APP_URL}/companies/${slug}/compare/scores/`
    );
    return get(data, "data", {});
};


const fetchStockInfo = async (slug: string) => {
    try {
        const [stockRes, quoteRes] = await Promise.all([
            axios.get(`${config.APP_URL}/company/stocks/${slug}?include=info,market`),
            axios.get(`${config.APP_URL}/quotes/${slug}?t=${Date.now()}`),
        ]);

        const stockData = get(stockRes, "data.data", {});
        const quoteData = get(quoteRes, "data.data");

        return {
            ...stockData,
            market: {
                ...get(stockData, "market.data", {}),
                ...(quoteData && {
                    previousClose:
                        get(quoteData, "markets.regular.price") ??
                        get(stockData, "market.data.previousClose"),
                    change:
                        get(quoteData, "markets.regular.change") ??
                        get(stockData, "market.data.change"),
                    change_p:
                        get(quoteData, "markets.regular.changePercent") ??
                        get(stockData, "market.data.change_p"),
                }),
            },
        };
    } catch {
        const { data } = await axios.get(
            `${config.APP_URL}/company/stocks/${slug}?include=info,market`
        );
        return get(data, "data", {});
    }
};

const Body = ({ initialData }: { initialData: any }) => {
    const { id } = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const { setState } = useAppContext();
    const { setModal } = useModals()

    const compareItems = useMemo(() => {
        const value = searchParams.get("compare");
        return value ? value.split(",") : [];
    }, [searchParams]);

    const [compareScores, setCompareScores] = useState<Record<string, any>>({});
    const [compareInfo, setCompareInfo] = useState<Record<string, any>>({});

    const {
        metrics,
        scores,
        name,
        change,
        change_p,
        previousClose,
    } = initialData;



    useEffect(() => {
        if (!compareItems.length) return;

        compareItems.forEach(async (item) => {
            if (!compareScores[item]) {
                const data = await fetchScores(item);
                setCompareScores((prev) => ({ ...prev, [item]: data }));
            }

            if (!compareInfo[item]) {
                const data = await fetchStockInfo(item);
                setCompareInfo((prev) => ({ ...prev, [item]: data }));
            }
        });
    }, [compareItems]);


    return (
        <div>
            <Card className="rounded-xl p-6">
                <Typography variant="h2" className="text-[18px]" weight="semibold">Compare stocks</Typography>
                <Typography variant="body" className="capitalize text-2xl!" weight="bold">{id}</Typography>

                <Separator className="bg-[#ffffff1f] my-4" />

                <div className="border border-[#ffffff1f] rounded-[14px] grid grid-cols-5 mt-5">
                    <div className='flex items-center justify-center p-[20px] border-r'>
                        <Typography className="text-[12px]" color="primary" variant="small">Compare up to three stocks to ({id}) by adding the symbol or company name.</Typography>
                    </div>

                    {/* Base Stock Card */}
                    <div className="flex items-center justify-center border-r px-[24px]">
                        <div className="statistic-section__info">
                            <div className="text-white">{id}</div>
                            <div className="flex items-center justify-between gap-[20px]">
                                <div className="text-white text-2xl font-bold">
                                    {previousClose.toFixed(2)}
                                </div>
                                <div className={`statistic-section__incr ${change < 0 ? '--decr' : '--incr'}`}>
                                    <img className='statistic-section__red' src="/icons/arrowRed.svg" alt="" />
                                    <img className='statistic-section__green' src="/icons/arrowGreen.svg" alt="" />
                                    <span>{change_p.toFixed(2)} %</span>
                                </div>
                            </div>
                            <div className="statistic-section__subname">
                                {name}
                            </div>
                        </div>
                    </div>

                    {/* Comparison Stock Cards */}
                    {compareItems.length > 0 && (
                        compareItems.map(compSlug => {
                            const compInfo = get(compareInfo[compSlug], 'info.data');
                            const compMarket = get(compareInfo[compSlug], 'market');

                            const compName = get(compInfo, 'name')
                            const compChange = get(compMarket, 'change') ? get(compMarket, 'change') : 0
                            const compChangeP = get(compMarket, 'change_p') ? get(compMarket, 'change_p') : 0
                            const compPreviousClose = get(compMarket, 'previousClose') ? get(compMarket, 'previousClose') : 0

                            return (
                                <div key={compSlug} className="flex items-center justify-center border-r px-[24px] relative">
                                    <div className="statistic-section__info cursor-pointer" onClick={() => {
                                        setState(prev => ({
                                            ...prev,
                                            addStockModal: true,
                                            selected: compSlug
                                        }))
                                    }}>
                                        <div className="text-white">{compSlug}</div>
                                        <div className="flex items-center justify-between gap-[20px]">
                                            <div className="statistic-section__num">
                                                {compPreviousClose.toFixed(2)}
                                            </div>
                                            <div className={`statistic-section__incr ${compChange < 0 ? '--decr' : '--incr'}`}>
                                                <img className='statistic-section__red' src="/icons/arrowRed.svg" alt="" />
                                                <img className='statistic-section__green' src="/icons/arrowGreen.svg" alt="" />
                                                <span>{compChangeP.toFixed(2)} %</span>
                                            </div>
                                        </div>
                                        <div className="statistic-section__subname">
                                            {compName}
                                        </div>
                                    </div>
                                    <div
                                        className="statistic-section__remove"
                                        onClick={() => {
                                            const newCompareItems = compareItems.filter(item => item !== compSlug);
                                            const searchParams = new URLSearchParams(window.location.search);
                                            if (newCompareItems.length > 0) {
                                                searchParams.set('compare', newCompareItems.join(','));
                                            } else {
                                                searchParams.delete('compare');
                                            }
                                            window.location.search = searchParams.toString();
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            cursor: 'pointer',
                                            zIndex: 2
                                        }}
                                    >
                                        <X />
                                    </div>
                                </div>
                            )
                        })
                    )}

                    {/* Add Stock Buttons */}
                    {compareItems.length < 3 && (
                        <div className="statistic-section__add border-r" onClick={() => {
                            setModal({ addStock: true })
                        }}>
                            <img src="/icons/add.svg" alt="" />
                            <span>Add Stock</span>
                        </div>
                    )}
                    {compareItems.length < 1 && (
                        <div className="statistic-section__add border-r --disabled">
                            <img src="/icons/add.svg" alt="" />
                            <span>Add Stock</span>
                        </div>
                    )}

                    {compareItems.length < 2 && (
                        <div className="statistic-section__add --disabled">
                            <img src="/icons/add.svg" alt="" />
                            <span>Add Stock</span>
                        </div>
                    )}
                </div>


                {/* Table */}
                {/* Comparison Table */}
                <div className='mt-5'>
                    <div className='rounded-xl border border-[#353945]  overflow-hidden'>
                        <Table >
                            <TableHeader className='rounded-t-md!'>
                                <TableRow className="border-b border-[#353945] hover:bg-(--main-color) rounded-t-md! bg-(--main-color)">
                                    <TableHead className="text-white font-bold uppercase text-sm border-r border-[#353945]   p-4">
                                        Metrics
                                    </TableHead>
                                    <TableHead className="text-white font-bold uppercase text-sm text-center border-r border-[#353945] p-4">
                                        {id}
                                    </TableHead>
                                    {compareItems.length > 0 && (
                                        compareItems.map(item => (
                                            <TableHead className="text-white font-bold uppercase text-sm text-center border-r border-[#353945] p-4" key={item}>{item}</TableHead>
                                        ))
                                    )}
                                    {[...Array(3 - compareItems.length)].map((_, index) => (
                                        <TableHead className="text-white font-bold uppercase text-sm text-center border-r border-[#353945] p-4" />
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {metrics.map((metric: any) => (
                                    <TableRow key={metric.label} className="border-b border-[#353945]  hover:bg-purple-900/10">
                                        <TableCell className="font-medium text-white border-r border-[#353945] p-3">{metric.label}</TableCell>
                                        <TableCell className="text-white text-center border-r border-[#353945] ">{get(scores, `${metric.value}`)}</TableCell>
                                        {compareItems.length > 0 && (
                                            compareItems.map(item => (
                                                <TableCell className="text-white text-center border-r border-[#353945]">{get(compareScores, `${item}.${metric.value}`)}</TableCell>
                                            ))
                                        )}
                                        {[...Array(3 - compareItems.length)].map((_, index) => (
                                            <TableCell key={`empty-cell-${metric.value}-${index} text-white text-center border-r border-[#353945]`} style={{ width: '20%' }}></TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Body