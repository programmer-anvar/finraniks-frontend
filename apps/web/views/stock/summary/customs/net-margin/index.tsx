'use client';

import React from "react";
import {
    Bar,
    ComposedChart,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    ReferenceLine
} from "recharts";
import { Card } from "@finranks/design-system/components/card";
import { Typography } from "@finranks/design-system/components/typography";
import { formatToMillion } from "@finranks/design-system/lib/utils";

interface NetMarginProps {
    data: Record<string, any>; // annual data
}

/* -------------------------------------------------------------------------- */
/*                               Custom Tooltip                               */
/* -------------------------------------------------------------------------- */
const CustomTooltip: React.FC<any> = ({ payload, label }) => {
    if (!payload || !payload.length) return null;

    return (
        <div className="rounded-lg bg-white p-3 shadow-lg border border-gray-200 text-xs space-y-1">
            <div className="font-semibold text-gray-900">{label}</div>
            {payload.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                    <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700">
                        {item.name}:{" "}
                        {item.name === "Current Ratio"
                            ? item.value.toFixed(2)
                            : formatToMillion(item.value)}
                    </span>
                </div>
            ))}
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/*                               Custom Legend                                */
/* -------------------------------------------------------------------------- */
const CustomLegend: React.FC<any> = ({ payload }) => (
    <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-400 mt-3">
        {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
                <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                />
                <span>{item.value}</span>
            </div>
        ))}
    </div>
);

/* -------------------------------------------------------------------------- */
/*                               Component                                     */
/* -------------------------------------------------------------------------- */
const NetMargin: React.FC<NetMarginProps> = ({ data }) => {
    const formatData = Object.entries(data?.incomeStatement?.annual || {})
        .map((item: any) => {
            const totRevenue = parseFloat(item[1].totalRevenue || '') || 1;
            const netIncome = parseFloat(item[1].netIncome || '');
            const netMargin = ((netIncome / totRevenue) * 100).toFixed(2);
            return {
                year: item[0],
                Revenue: totRevenue,
                'Net Income': netIncome,
                'Net Margin': parseFloat(netMargin),
            };
        });

    const netMarginValues = formatData.map(item => item['Net Margin']);
    const minMargin = Math.min(...netMarginValues);
    const maxMargin = Math.max(...netMarginValues);

    const padding = Math.abs(maxMargin - minMargin) * 0.1 || 5;
    const marginDomain = [
        Math.min(minMargin - padding, 0),
        maxMargin + padding
    ];

    const revenueValues = formatData.map(item => item.Revenue);
    const netIncomeValues = formatData.map(item => item['Net Income']);
    const allBarValues = [...revenueValues, ...netIncomeValues];
    const minBarValue = Math.min(...allBarValues);
    const maxBarValue = Math.max(...allBarValues);

    const barPadding = Math.abs(maxBarValue - minBarValue) * 0.1 || 1000000; // 10% padding
    const barDomain = [
        Math.min(minBarValue - barPadding, 0), // Ensure we include 0 if needed
        maxBarValue + barPadding
    ];

    return (
        <Card className="rounded-xl p-4 md:p-6">
            <Typography variant="h4" className="mb-4">
                Net Margin
            </Typography>

            <div className="h-[380px] w-full">
                <ResponsiveContainer width="100%" height="100%">

                    <ComposedChart
                        data={formatData}
                        margin={{ top: 0, right: -20, bottom: 25, left: -17 }}
                        barGap={4}
                    >
                        <CartesianGrid
                            strokeDasharray="3 0"
                            horizontal={true}
                            vertical={false}
                            fill="transparent"
                            stroke="#292534"
                        />

                        <XAxis
                            dataKey="year"
                            orientation="bottom"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                        />

                        <YAxis
                            yAxisId="left"
                            tickFormatter={formatToMillion}
                            orientation="left"
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            domain={barDomain}
                        />

                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={(val) => val.toFixed(2)}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            axisLine={false}
                            domain={marginDomain}
                            tickLine={false}
                        />
                        <ReferenceLine y={0} yAxisId="left" stroke="#ccc" strokeWidth={1} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />
                        <Bar
                            yAxisId="left"
                            dataKey="Revenue"
                            name="Revenue"
                            fill="var(--primary-graph-color)"
                            radius={3.6}
                            barSize={18}
                        />

                        <Bar
                            yAxisId="left"
                            dataKey="Net Income"
                            name="Net Income"
                            fill="var(--secondary-graph-color)"
                            radius={3.6}
                            barSize={18}
                        />

                        <Line
                            yAxisId="right"
                            dataKey="Net Margin"
                            name="Net Margin"
                            stroke="var(--tertiary-graph-color)"
                            strokeWidth={2}
                            dot={false}
                            type="monotone"
                        />

                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default NetMargin;
