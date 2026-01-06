"use client"

import React from "react"
import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

interface EstimatedProps {
    data: {
        quarterly?: {
            eps?: {
                period: string
                estimate?: number | null
                reported?: number | null
            }[]
        }
    }
}

const formatNumber = (value?: number | null) =>
    value !== null && value !== undefined ? Number(value).toFixed(2) : "N/A"

const Estimated: React.FC<EstimatedProps> = ({ data }) => {
    const chartData =
        data?.quarterly?.eps?.map((item) => {
            const estimate = item.estimate ?? null
            const actual = item.reported ?? null
            return {
                name: item.period,
                Estimate: estimate,
                Actual: actual,
            }
        }) || []

    // Reverse to show oldest first
    const reversedData = [...chartData].reverse()

    const allValues: any = reversedData
        .flatMap((item) => [item.Estimate, item.Actual])
        .filter((val) => val !== null && !isNaN(val))
    const sorted = [...allValues].sort((a, b) => a - b);

    // 95th percentile
    const p95 = sorted[Math.floor(sorted.length * 0.95)] || 1;

    const minValue = Math.min(...allValues, 0) * 1.1;
    const maxValue = p95 * 1.2;

    return (
        <Card className="p-4 md:p-6 rounded-xl">
            <Typography variant="h4" className="mb-4">
                Estimated EPS vs Actual EPS
            </Typography>

            <div className="h-[338px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={reversedData}
                        margin={{ top: 0, right: 3, left: -27, bottom: 20 }}
                        barGap={6}
                    >
                        <CartesianGrid
                            strokeDasharray="3 0"
                            vertical={false}
                            stroke="#292534"
                        />
                        <XAxis
                            dataKey="name"
                            fontSize={10}
                            interval={0}
                            tickLine={false}
                            tick={<CustomizedAxisTick customYOffset={16} />}
                        />
                        <YAxis
                            fontSize={10}
                            tickLine={false}
                            tickCount={8}
                            axisLine={false}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            domain={[minValue, maxValue]}
                            allowDecimals={true}
                            tickFormatter={(value) => value.toFixed(2)}
                        />
                        <ReferenceLine y={0} stroke="#ccc" strokeWidth={1} />
                        <Tooltip content={<CustomEstimatedTooltip />} />
                        <Legend content={CustomLegend} />
                        <Bar
                            dataKey="Estimate"
                            fill="var(--primary-graph-color)"
                            barSize={12}
                            radius={3}
                        />
                        <Bar
                            dataKey="Actual"
                            fill="var(--secondary-graph-color)"
                            barSize={12}
                            radius={3}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}

export default Estimated

// ---------------- Custom Ticks & Tooltip ----------------

function CustomizedAxisTick(props: any) {
    const { x, y, payload, customYOffset, customXOffset, fillBlack } = props
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={customXOffset || 0}
                y={0}
                dy={isFinite(customYOffset) ? customYOffset : 24}
                fill={fillBlack ? "#000" : "#8D9092"}
                textAnchor="middle"
                style={{ fontSize: "10px", lineHeight: "13px" }}
            >
                {payload.value}
            </text>
        </g>
    )
}

const CustomEstimatedTooltip = (props: any) => {
    const { active, payload, label } = props
    if (!active || !payload || payload.length === 0) return null
    const dataPoint = payload[0].payload

    return (
        <div className="rounded-lg bg-[#1D1A2F] p-3 border border-[#383838] text-white text-xs max-w-xs">
            <div className="font-bold border-b border-[#383838] pb-1 mb-1">
                {label}
            </div>
            {payload.map((entry: any, i: number) => {
                const value =
                    entry.dataKey === "Estimate"
                        ? formatNumber(dataPoint.Estimate)
                        : formatNumber(dataPoint.Actual)
                return (
                    <div key={i} className="flex items-center gap-2 my-1">
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span>{entry.name}: {value}</span>
                    </div>
                )
            })}
        </div>
    )
}

const CustomLegend = ({ payload }: any) => (
    <div className="flex justify-center gap-4 mt-4 text-xs text-zinc-400 flex-wrap">
        {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
                <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                />
                <span>{item.value}</span>
            </div>
        ))}
    </div>
)
