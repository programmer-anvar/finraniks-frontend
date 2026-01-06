'use client';

import React, { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea,
} from 'recharts';
import get from 'lodash/get';
import { cn, formatToMillion } from '@finranks/design-system/lib/utils';
import { Typography } from '@finranks/design-system/components/typography';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';

/* --------------------------------------------
 * Types
 * ------------------------------------------ */

type PricePoint = {
    date: string;
    price: number | null;
    lastPrice?: number;
    maxPrice?: number;
    minPrice?: number;
};

type MainChartProps = {
    data: Record<string, unknown>;
    prices: PricePoint[];
};

/* --------------------------------------------
 * Component
 * ------------------------------------------ */

const MainChart: React.FC<MainChartProps> = ({ data, prices }) => {
    const currentPrice = prices.at(-1)?.price ?? 0;

    const maxPrice = get(data, 'highest_target', 0);
    const minPrice = get(data, 'lowest_target', 0);
    const consensusPrice = get(data, 'consensus_target', 0);

    /* --------------------------------------------
     * Forecast extension
     * ------------------------------------------ */
    const chartData = useMemo<any[]>(() => {
        const forecast = Array.from({ length: 60 }, (_, i) => ({
            date: `forecast-${i}`,
            price: null,
            lastPrice: currentPrice,
            maxPrice,
            minPrice,
        }));

        return [...prices, ...forecast];
    }, [prices, currentPrice, maxPrice, minPrice]);

    /* --------------------------------------------
     * Percent calculations
     * ------------------------------------------ */
    const calcPercent = (target: any) =>
        currentPrice ? ((target - currentPrice) / currentPrice) * 100 : 0;

    const minPercent = calcPercent(minPrice);
    const consensusPercent = calcPercent(consensusPrice);
    const maxPercent = calcPercent(maxPrice);

    /* --------------------------------------------
     * Layout
     * ------------------------------------------ */

    return (
        <div className='space-y-4'>
            <Typography variant="h2" className="text-[20px]!" align='center' weight="semibold">Past 12 months + 12 Month forecast</Typography>

            <div className="custom-forecast-chart">
                <ResponsiveContainer width="100%" className="h-[320px]!">
                    <LineChart data={chartData} margin={{ left: -10 }}>
                        <CartesianGrid strokeDasharray="3 0" strokeWidth={0.1} />

                        <YAxis
                            tickFormatter={(val) => formatToMillion(val)}
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            domain={['dataMin - 2', 'dataMax + 2']}
                        />

                        <XAxis hide dataKey="date" />

                        <Tooltip content={<CustomTooltip />} />

                        {/* Forecast zones */}
                        <ReferenceArea
                            y1={Number(currentPrice)}
                            y2={Number(maxPrice)}
                            fill="#10b981"
                            fillOpacity={0.08}
                        />

                        <ReferenceArea
                            y1={Number(minPrice)}
                            y2={Number(currentPrice)}
                            fill="#ef4444"
                            fillOpacity={0.08}
                        />

                        {/* Lines */}
                        <Line
                            type="linear"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={1}
                            dot={false}
                        />

                        <Line
                            type="linear"
                            dataKey="lastPrice"
                            stroke="#3b82f6"
                            strokeDasharray="5 5"
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="maxPrice"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="minPrice"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className='rounded-xl  overflow-hidden mt-10'>
                <Table >
                    <TableHeader className='rounded-t-md!'>
                        <TableRow className="border-b border-[#353945] hover:bg-purple-900/10 rounded-t-md!">
                            <TableHead className="text-white font-bold  text-sm text-center  border-[#353945] p-4" >Target</TableHead>
                            <TableHead className="text-white font-bold  text-sm  border-[#353945]   p-4">
                                Lowest Price Target
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm  border-[#353945]   p-4">
                                Consensus Price Target
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-[#353945]   p-4">
                                Highest Price Target
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-b border-[#353945]  hover:bg-purple-900/10">
                            <TableCell className="font-medium text-white  border-[#353945] p-3">
                                Price
                            </TableCell>
                            <TableCell className="font-medium text-white  border-[#353945] p-3">
                                $ {Number(minPrice)}
                            </TableCell>
                            <TableCell className="font-medium text-white  border-[#353945] p-3">
                                $ {Number(consensusPrice)}
                            </TableCell>
                            <TableCell className="font-medium text-white  border-[#353945] p-3">
                                $ {Number(maxPrice)}
                            </TableCell>

                        </TableRow>
                        <TableRow className="border-b border-[#353945]  hover:bg-purple-900/10">
                            <TableCell className="font-medium text-white  border-[#353945] p-3">
                                Change
                            </TableCell>
                            <TableCell className={cn("font-medium text-white  border-[#353945] p-3", {
                                'text-[#ef4444]': minPercent < 0,
                                'text-[#10b981]': minPercent > 0,
                            })}>
                                {minPercent.toFixed(2)}%
                            </TableCell>
                            <TableCell className={cn("font-medium text-white  border-[#353945] p-3", {
                                'text-[#ef4444]': consensusPercent < 0,
                                'text-[#10b981]': consensusPercent > 0,
                            })}>
                                {consensusPercent.toFixed(2)}%
                            </TableCell>
                            <TableCell className={cn("font-medium text-white  border-[#353945] p-3", {
                                'text-[#ef4444]': maxPercent < 0,
                                'text-[#10b981]': maxPercent > 0,
                            })}>
                                {maxPercent.toFixed(2)}%
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

/* --------------------------------------------
 * Tooltip
 * ------------------------------------------ */

const CustomTooltip: React.FC<any> = ({ payload }) => {
    if (!payload?.length) return null;

    const { date, price } = payload[0].payload;
    if (!price || !date?.includes('-')) return null;

    return (
        <div className='bg-white p-2 rounded-[10px]'>
            <h6 className='text-[12px] text-muted-foreground'>{date}</h6>
            <div className='text-[14px]  text-black'>
                <span>$ {price}</span>
            </div>
        </div>
    );
};

export default MainChart;
