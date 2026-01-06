"use client"

import React from "react"
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import { formatToMillion } from "@finranks/design-system/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */
interface CurrentRatioRow {
    year: string
    currentAssets: number
    currentLiabilities: number
    currentRatio: number
}

interface CurrentRatioProps {
    data: any
}

/* -------------------------------------------------------------------------- */
/*                              Custom Tooltip                                 */
/* -------------------------------------------------------------------------- */
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
                        {item.name}:{" "}
                        {item.name === "Current Ratio"
                            ? item.value.toFixed(2)
                            : formatToMillion(item.value)}
                    </span>
                </div>
            ))}
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*                               Custom Legend                                 */
/* -------------------------------------------------------------------------- */
const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-wrap justify-center gap-3 md:gap-5 text-xs text-zinc-400 mt-3">
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

/* -------------------------------------------------------------------------- */
/*                               Component                                     */
/* -------------------------------------------------------------------------- */
const CurrentRatio = ({ data }: CurrentRatioProps) => {
    // Format data
    const formattedData: CurrentRatioRow[] = Object.entries(data?.annual || {})
        .slice(0, 4)
        .map(([year, values]: any) => ({
            year,
            currentAssets: values?.currentAssets ?? 0,
            currentLiabilities: values?.currentLiabilities ?? 0,
            currentRatio: values?.currentRatio ?? 0,
        }))

    return (
        <Card className="rounded-xl p-4 md:p-6">
            <Typography variant="h4" className="mb-4">
                Current Ratio
            </Typography>

            <div className="h-[380px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={formattedData}
                        margin={{ top: 0, right: -20, bottom: 25, left: -28 }}
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
                            tickFormatter={(val) => formatToMillion(val)}
                            orientation="left"
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={(val) => val.toFixed(2)}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />

                        <Bar
                            yAxisId="left"
                            dataKey="currentAssets"
                            name="Current Assets"
                            fill="var(--primary-graph-color)"
                            radius={3.6}
                            barSize={18}
                        />

                        <Bar
                            yAxisId="left"
                            dataKey="currentLiabilities"
                            name="Current Liabilities"
                            fill="var(--secondary-graph-color)"
                            radius={3.6}
                            barSize={18}
                        />

                        <Line
                            yAxisId="right"
                            dataKey="currentRatio"
                            name="Current Ratio"
                            stroke="var(--tertiary-graph-color)"
                            strokeWidth={2}
                            dot={false}
                            type="monotone"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}

export default CurrentRatio
