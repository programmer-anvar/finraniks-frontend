"use client"

import React, { memo } from "react"
import {
    Bar,
    ComposedChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import { formatToMillion } from "@finranks/design-system/lib/utils"

interface CashflowProps {
    data: any
}

interface ChartRow {
    year: string
    "Operating Cash Flow": number
    "Free Cash Flow": number
    "Financing Cash Flow": number
    "Investing Cash Flow": number
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
    <div className="flex flex-wrap justify-between gap-2 mt-5 ml-5 text-xs text-zinc-400">
        {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2 w-[40%]">
                <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                />
                <span className="whitespace-nowrap">{item.value}</span>
            </div>
        ))}
    </div>
)

const Cashflow = memo(({ data }: CashflowProps) => {
    const formatData: ChartRow[] = Object.entries(data?.cashFlow?.annual || {}).map(
        ([year, val]: any) => ({
            year,
            "Operating Cash Flow": val.operatingCashFlow,
            "Free Cash Flow": val.freeCashFlow,
            "Financing Cash Flow": val.financingCashFlow,
            "Investing Cash Flow": val.investingCashFlow,
        })
    )


    const chartValues = formatData.flatMap(d =>
        [
            d["Operating Cash Flow"],
            d["Free Cash Flow"],
            d["Financing Cash Flow"],
            d["Investing Cash Flow"],
        ]
    )

    const maxAbsValue = Math.max(...chartValues.map(v => Math.abs(v)), 0)

    const yAxisDomain: [number, number] = [
        -maxAbsValue * 1.1, // 10% padding
        maxAbsValue * 1.1,
    ]
    return (
        <Card className="rounded-xl p-4 md:p-6">
            <Typography variant="h4" className="mb-4">
                Cashflow
            </Typography>

            <div className="h-[345px] w-full" >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={formatData} margin={{ top: 0, right: 3, bottom: 20, left: -16 }}>
                        <CartesianGrid strokeDasharray="3 0" vertical={false} stroke="#292534" />

                        <XAxis
                            dataKey="year"
                            tick={<CustomizedAxisTick />}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                        />

                        <YAxis
                            type="number"
                            tickLine={false}
                            tickCount={7}
                            tickFormatter={(val) => formatToMillion(val)}
                            axisLine={false}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            domain={yAxisDomain}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={<BGHighlighter numOfData={formatData.length} />} />

                        <Legend content={<CustomLegend />} verticalAlign="bottom" />

                        <ReferenceLine y={0} stroke="#ccc" strokeWidth={1} />

                        <Bar dataKey="Operating Cash Flow" fill="var(--primary-graph-color)" radius={2.6} />
                        <Bar dataKey="Free Cash Flow" fill="var(--secondary-graph-color)" radius={2.6} />
                        <Bar dataKey="Financing Cash Flow" fill="var(--tertiary-graph-color)" radius={2.6} />
                        <Bar dataKey="Investing Cash Flow" fill="var(--quaternary-graph-color)" radius={2.6} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
})

export default Cashflow
