"use client"

import React, { memo } from "react"
import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@finranks/design-system/components/table"
import { get } from "lodash";
import ChartCard from "./customs/chart-card";;
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@finranks/design-system/components/hover-card"
import TrendHoverModalEnhanced from "./customs/chart-card"
const getTrendData = (annual: Record<string, any>, key: string): number[] => {
    if (!annual || typeof annual !== "object") return []
    return Object.values(annual)
        .map((item: any) => item?.[key])
        .filter((v) => typeof v === "number")
}
interface ProfitabilityProps {
    data: {
        TTM: Record<string, any>
        industry: Record<string, any>
        annual: Record<string, any>
    }
}

interface Metric {
    key: string
    label: string
}

const METRICS: Metric[] = [
    { key: "grossMarginRatio", label: "Gross margin %" },
    { key: "operatingMarginRatio", label: "Operating margin %" },
    { key: "netMarginRatio", label: "Net margin %" },
    { key: "ebitdaMarginRatio", label: "EBITDA margin %" },
    { key: "cashFlowMarginRatio", label: "Cash flow margin %" },
]

function MiniBarChart({ data }: { data: number[] }) {
    const maxValue = Math.max(...data);

    return (
        <div className="flex items-end gap-1 justify-center h-8">
            {data?.map((value, index) => (
                <div
                    key={index}
                    className="w-2 bg-purple-500 rounded-sm"
                    style={{
                        height: `${(value / maxValue) * 100}%`,
                    }}
                />
            ))}
        </div>
    )
}

const formatNumber = (value?: number) =>
    value !== null && value !== undefined ? Number(value).toFixed(2) : "N/A"

const Profitability = memo(({ data }: ProfitabilityProps) => {
    const TTM = get(data, "TTM")
    const industry = get(data, "industry")
    const annual = get(data, "annual")

    return (
        <Card className="space-y-4 p-4 md:p-6 rounded-xl">
            <Typography variant="h4">Profitability</Typography>

            <div className="overflow-x-auto rounded-lg border border-[#353945]">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                Name
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                Ratio
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                Industry
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                5Y Trend
                            </TableHead>
                            <TableHead className="text-center text-xs font-semibold uppercase text-[#777e90] w-[100px]!">
                                Score
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {METRICS.map(({ key, label }) => (
                            <TableRow key={key} className="border-b border-[#353945] hover:bg-purple-900/10">
                                <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                    {label}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                    {formatNumber(TTM?.[key])}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                    {formatNumber(industry?.[key])}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center flex items-center justify-center">
                                    <TrendHoverModalEnhanced
                                        data={annual}
                                        metric={key}
                                        lastReport={TTM}
                                    />
                                </TableCell>

                                <TableCell className="text-center text-white font-semibold">
                                    {TTM?.[`${key}Score`] ?? "N/A"}
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Footer row: weighted average score */}
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                Weighted average score
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{ backgroundColor: TTM?.weightedAverageScoreColor }}
                            >
                                {TTM?.weightedAverageScore
                                    ? Number(TTM.weightedAverageScore).toFixed(1)
                                    : "N/A"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
})

export default Profitability
