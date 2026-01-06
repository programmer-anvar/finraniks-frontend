"use client";

import React, { memo } from "react";
import { Card } from "@finranks/design-system/components/card";
import { Typography } from "@finranks/design-system/components/typography";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import get from "lodash/get";
import { formatToMillion } from "@finranks/design-system/lib/utils";

interface AnalystRatingProps {
    data: Record<string, any>;
}

const COLORS = {
    "Strong buy": "#6366F1", // Tailwind indigo-500
    "Buy": "#14B8A6",        // Tailwind teal-500
    "Hold": "#FACC15",       // Tailwind yellow-400
    "Sell": "#F97316",       // Tailwind orange-500
    "Strong sell": "#EF4444" // Tailwind red-500
};

const AnalystRating: React.FC<AnalystRatingProps> = memo(({ data }) => {
    const monthlyData = get(data, "monthly_data", []).slice(0, 4);
    const MIN_BAR_VALUE = 3;

    const chartData = monthlyData.map((item: any) => {
        const strongBuy = item.strong_buy || 0;
        const buy = item.buy || 0;
        const hold = item.hold || 0;
        const sell = item.sell || 0;
        const strongSell = item.strong_sell || 0;

        return {
            name: item.month,
            "Strong buy": strongBuy > 0 ? Math.max(strongBuy, MIN_BAR_VALUE) : strongBuy,
            "Buy": buy > 0 ? Math.max(buy, MIN_BAR_VALUE) : buy,
            "Hold": hold > 0 ? Math.max(hold, MIN_BAR_VALUE) : hold,
            "Sell": sell > 0 ? Math.max(sell, MIN_BAR_VALUE) : sell,
            "Strong sell": strongSell > 0 ? Math.max(strongSell, MIN_BAR_VALUE) : strongSell,
            _StrongBuy: strongBuy,
            _Buy: buy,
            _Hold: hold,
            _Sell: sell,
            _StrongSell: strongSell
        };
    });


    // Determine min/max for bar sizing
    const barCount = chartData.length;
    const barPadding = barCount === 1 ? 0.3 : 0.2; // Less padding if only 1 bar

    return (
        <Card className="space-y-4 rounded-xl p-4 md:p-6">
            <Typography variant="h4">Analyst Rating</Typography>

            <div className="h-[345px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 0, left: -30, bottom: 20 }} barSize={45}>
                        <CartesianGrid strokeDasharray="3 0" horizontal vertical={false} stroke="#292534" />
                        <XAxis dataKey="name" tickLine={false} interval={0} tick={<CustomizedAxisTick customYOffset={16} />} />
                        <YAxis axisLine={false} tickLine={false} tickCount={7} tick={{ fill: "#8D9092", fontSize: 10 }} domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.15)]} />
                        <Tooltip content={<CustomTooltip />} cursor={<BGHighlighter numOfData={chartData.length} />} />
                        <Legend content={CustomLegend} />

                        {["Strong buy", "Buy", "Hold", "Sell", "Strong sell"].map((key, idx) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                stackId="a"

                                radius={idx === 0 ? [5, 5, 0, 0] : idx === 4 ? [0, 0, 3, 3] : 0}
                                fill={COLORS[key as keyof typeof COLORS]}
                                label={(props) => {
                                    const { x, y, width, height, index } = props;
                                    const actualValue = chartData[index]["_" + key.replace(" ", "")];
                                    return (
                                        <text
                                            x={x + width / 2}
                                            y={y + height / 2}
                                            fill="white"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="text-[10px] font-medium"
                                        >
                                            {actualValue}
                                        </text>
                                    );
                                }}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </Card>
    );
});

export default AnalystRating;

// --- helpers ---

function CustomizedAxisTick(props: any) {
    const { x, y, payload, customYOffset, customXOffset, fillBlack } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={customXOffset || 0}
                y={0}
                dy={isFinite(customYOffset) ? customYOffset : 24}
                fill={fillBlack ? "#000" : "#8D9092"}
                textAnchor="middle"
                className="text-[10px] leading-[13px]"
            >
                {payload.value}
            </text>
        </g>
    );
}

const BGHighlighter = (props: any) => {
    const { height, width: graphWidth, points, numOfData = 1, x } = props;
    const width = points ? graphWidth / numOfData : graphWidth;
    const xCoord = points ? points[0].x - width / 2 : x;
    return <rect x={xCoord} y={8} rx={10.5} ry={10.5} width={width} height={height + 13} opacity={0.2} fill="#DCDBFC" />;
};


const keyMap: Record<string, string> = {
    "Strong buy": "_StrongBuy",
    "Buy": "_Buy",
    "Hold": "_Hold",
    "Sell": "_Sell",
    "Strong sell": "_StrongSell"
}
const CustomTooltip = ({ payload }: any) => {
    if (!payload || payload.length === 0) return null;

    const item = payload[0].payload;

    return (
        <div className="bg-[#1D1A2F] border border-[#383838] p-2 rounded-md text-white text-sm max-w-[200px]">
            <h6 className="font-semibold mb-1">{item.name}</h6>
            <div className="flex flex-col gap-1">
                {payload.map((p: any, i: number) => {
                    const key = keyMap[p.dataKey]; // <- use mapping
                    const rawValue = item[key];
                    const value = rawValue !== undefined && rawValue !== null ? formatToMillion(rawValue) : "N/A";

                    return (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                            <span>{p.dataKey}: {value}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const CustomLegend = ({ payload }: any) => {
    return (
        <div className="flex flex-wrap mt-5 ml-13 gap-3">
            {payload?.map((item: any, i: number) => (
                <div key={i} className="flex items-center mr-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="ml-1 text-[10px]">{item.value}</span>
                </div>
            ))}
        </div>
    );
};
