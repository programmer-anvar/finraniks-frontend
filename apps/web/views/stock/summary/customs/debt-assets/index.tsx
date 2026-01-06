"use client"

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
import { memo } from "react"

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

interface ChartRow {
    year: string
    "Total Assets": number
    "Total Debt": number
    "Debt to Assets": number
}

interface DebtsAssetsProps {
    data: any
}

/* -------------------------------------------------------------------------- */
/*                               Utils                                        */
/* -------------------------------------------------------------------------- */

const formatBigNumber = (value: number): string => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
    return value.toFixed(0)
}

/* -------------------------------------------------------------------------- */
/*                              Tooltip                                       */
/* -------------------------------------------------------------------------- */

const CustomTooltip = ({
    active,
    payload,
    label,
}: any) => {
    if (!active || !payload?.length) return null

    return (
        <div className="rounded-lg bg-white px-3 py-2 shadow-lg border border-gray-200 text-xs space-y-1">
            <div className="font-semibold text-gray-900">{label}</div>

            {payload.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                    <span
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700">
                        {item.name}:{" "}
                        {item.name === "Debt to Assets"
                            ? item.value.toFixed(2)
                            : formatBigNumber(item.value)}
                    </span>
                </div>
            ))}
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*                                Legend                                      */
/* -------------------------------------------------------------------------- */

const CustomLegend = ({ payload }: any) => (
    <div className="flex justify-center gap-6 text-xs text-zinc-400 mt-3">
        {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
                <span
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                />
                <span>{item.value}</span>
            </div>
        ))}
    </div>
)

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

const DebtsAssets = memo(({ data }: DebtsAssetsProps) => {
    /* -------------------------- Normalize Data -------------------------- */

    const formattedData: ChartRow[] = Object.entries(
        data?.balanceSheet?.annual || {}
    )
        .map(([year, values]: any) => {
            const assets = Number(values?.totalAssets ?? 0)
            const debt = Number(values?.totalDebt ?? 0)

            return {
                year,
                "Total Assets": assets,
                "Total Debt": debt,
                "Debt to Assets": assets ? +(debt / assets).toFixed(2) : 0,
            }
        })
        .sort((a, b) => Number(a.year) - Number(b.year))

    /* ---------------------------- Scales -------------------------------- */

    const maxAssets = Math.max(...formattedData.map(d => d["Total Assets"]))
    const maxRatio = Math.max(...formattedData.map(d => d["Debt to Assets"]))

    const assetsDomain: [number, number] = [0, maxAssets * 1.1]
    const ratioDomain: [number, number] = [
        Math.max(0, maxRatio - 0.1),
        maxRatio + 0.1,
    ]

    /* ---------------------------- Render -------------------------------- */

    return (
        <Card className="rounded-xl p-4 md:p-6">
            <Typography variant="h4" className="mb-4">
                Debt to Assets
            </Typography>

            <div className="h-[370px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={formattedData}
                        margin={{ top: 20, right: -20, bottom: 40, left: -20 }}
                        barGap={4}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#292534"
                        />

                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#8D9092", fontSize: 11 }}
                        />

                        <YAxis
                            yAxisId="left"
                            domain={assetsDomain}
                            tickFormatter={formatBigNumber}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={ratioDomain}
                            tickFormatter={v => v.toFixed(2)}
                            tick={{ fill: "#8D9092", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />

                        <Bar
                            yAxisId="left"
                            dataKey="Total Assets"
                            fill="var(--primary-graph-color)"
                            radius={[4, 4, 0, 0]}
                            barSize={18}
                        />

                        <Bar
                            yAxisId="left"
                            dataKey="Total Debt"
                            fill="var(--secondary-graph-color)"
                            radius={[4, 4, 0, 0]}
                            barSize={18}
                        />

                        <Line
                            yAxisId="right"
                            dataKey="Debt to Assets"
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
})

export default DebtsAssets
