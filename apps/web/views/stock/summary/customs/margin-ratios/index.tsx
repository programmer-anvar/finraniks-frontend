"use client"

import React, { memo } from "react"
import {
    LineChart,
    Line,
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

interface MarginRatiosProps {
    data: any
}

interface ChartRow {
    date: string
    "Gross margin": number
    "Operating margin": number
    "Net margin": number
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
            className="text-[10px] leading-[13px]"
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
                        {item.dataKey}: {item.value}%
                    </span>
                </div>
            ))}
        </div>
    )
}

// Custom legend
const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-wrap gap-3 mt-5 ml-10 text-xs text-zinc-400">
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
)

const MarginRatios = memo(({ data }: MarginRatiosProps) => {
    const formatData: ChartRow[] = Object.entries(data?.annual || {})
        .slice(-4)
        .map(([date, val]: any) => ({
            date,
            "Gross margin": Number(val?.grossMarginRatio?.toFixed(2)),
            "Operating margin": Number(val?.operatingMarginRatio?.toFixed(2)),
            "Net margin": Number(val?.netMarginRatio?.toFixed(2)),
        }))

    return (
        <Card className="rounded-xl p-4 md:p-6">
            <Typography variant="h4" className="mb-4">
                Margin Ratios
            </Typography>

            <div className="h-[345px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatData} margin={{ top: 0, right: 3, bottom: 20, left: -30 }}>
                        <CartesianGrid strokeDasharray="3 0" vertical={false} stroke="#292534" />

                        <XAxis
                            dataKey="date"
                            tick={<CustomizedAxisTick />}
                            interval={0}
                            padding={{ left: 30, right: 30 }}
                            axisLine={false}
                        />

                        <YAxis
                            type="number"
                            tickFormatter={(val) => `${val}%`}
                            tickLine={false}
                            axisLine={false}
                            tickCount={6}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                        />

                        <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />

                        <Line
                            type="monotone"
                            dataKey="Gross margin"
                            stroke="var(--primary-graph-color)"
                            dot={false}
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="Operating margin"
                            stroke="var(--secondary-graph-color)"
                            dot={false}
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="Net margin"
                            stroke="var(--tertiary-graph-color)"
                            dot={false}
                            strokeWidth={2}
                        />
                        <ReferenceLine y={0} stroke="#ccc" strokeWidth={1} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
})

export default MarginRatios
