"use client"

import React, { memo } from "react"
import {
    Bar,
    ComposedChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    ReferenceLine,
} from "recharts"
import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import { formatToMillion } from "@finranks/design-system/lib/utils"

interface RevenueIncomeProps {
    data: any
}

// Custom axis tick
const CustomizedAxisTick = ({ x, y, payload }: any) => (
    <g transform={`translate(${x},${y})`}>
        <text
            x={0}
            y={0}
            dy={24}
            fill="#8D9092"
            textAnchor="middle"
            className="text-[10px]! leading-[13px]"
        >
            {payload.value}
        </text>
    </g>
)

// Custom tooltip
const CustomTooltip = ({ payload, label }: any) => {
    if (!payload || !payload.length) return null

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
                        {item.dataKey}: {formatToMillion(item.value)}
                    </span>
                </div>
            ))}
        </div>
    )
}

// Optional hover highlight
const BGHighlighter = ({ width, x, points, numOfData = 1, height }: any) => {
    const w = points ? width / numOfData : width
    const xCoord = points ? points[0].x - w / 2 : x
    return (
        <rect
            x={xCoord}
            y={0}
            rx={10}
            ry={10}
            width={w}
            height={height + 13}
            opacity={0.2}
            fill="#DCDBFC"
        />
    )
}

// Custom legend
const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-wrap gap-4 mt-3 ml-8 text-xs text-zinc-400">
        {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.value}</span>
            </div>
        ))}
    </div>
)

const RevenueIncome = memo(({ data }: RevenueIncomeProps) => {
    const formatData = Object.entries(data?.incomeStatement?.annual || {}).map(([year, val]: any) => ({
        year,
        Revenue: val.totalRevenue,
        "Net Income": val.netIncome,
    }))

    return (
        <Card className="rounded-xl p-4 md:p-6">
            <Typography variant="h4" className="mb-4">
                Revenue & Net Income
            </Typography>

            <div className="h-[345px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={formatData}
                        margin={{ top: 0, right: 0, bottom: 20, left: -25 }}
                        barGap={4}
                    >
                        <CartesianGrid strokeDasharray="3 0" vertical={false} stroke="#292534" />
                        <XAxis
                            dataKey="year"
                            tick={<CustomizedAxisTick />}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                        />
                        <YAxis
                            tickLine={false}
                            tickCount={8}
                            tickFormatter={(val) => formatToMillion(val)}
                            axisLine={false}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                        />
                        <ReferenceLine y={0} stroke="#ccc" strokeWidth={1} />
                        <Tooltip content={<CustomTooltip />} cursor={<BGHighlighter numOfData={formatData.length} />} />
                        <Legend content={CustomLegend} />
                        <Bar dataKey="Revenue" fill="var(--primary-graph-color)" radius={3.6} barSize={18} />
                        <Bar dataKey="Net Income" fill="var(--secondary-graph-color)" radius={3.6} barSize={18} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
})

export default RevenueIncome
