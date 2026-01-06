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
import TrendHoverModalEnhanced from "./customs/chart-card"

interface EffectivenessProps {
    data: {
        TTM?: Record<string, any>
        industry?: Record<string, any>
        annual?: Record<string, Record<string, number>>
    }
}

const METRICS = [
    { key: "ROA", label: "ROA" },
    { key: "ROE", label: "ROE" },
    { key: "ROIC", label: "ROIC" },
    { key: "ROCE", label: "ROCE" },
]

const formatNumber = (value?: number | null) =>
    value !== null && value !== undefined ? Number(value).toFixed(2) : "N/A"

const Effectiveness: React.FC<EffectivenessProps> = memo(({ data }) => {
    const TTM = data?.TTM || {}
    const industry = data?.industry || {}
    const annual = data?.annual || {}

    // Find latest year data for fallback
    const years = Object.keys(annual || {})
        .filter((y) => /^\d{4}$/.test(y))
        .sort()
    const latestYear = years.length ? years[years.length - 1] : null
    const latestYearData = latestYear ? annual[latestYear] : {}

    return (
        <Card className="space-y-4 p-4 md:p-6 rounded-xl">
            <Typography variant="h4">Effectiveness</Typography>

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
                        {METRICS.map(({ key, label }) => {
                            const ratioValue =
                                TTM?.[key] ?? latestYearData?.[key] ?? null
                            const industryValue =
                                industry?.[key] !== undefined ? industry[key] : null
                            const scoreValue = TTM?.[`${key}Score`] ?? "N/A"

                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                        {label}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(ratioValue)}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(industryValue)}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center flex items-center justify-center font-semibold">
                                        <TrendHoverModalEnhanced
                                            data={annual}
                                            metric={key}
                                            lastReport={TTM}
                                        />
                                    </TableCell>

                                    <TableCell className="text-center text-white font-semibold">
                                        {scoreValue}
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                        {/* Weighted average row */}
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                Weighted average score
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{
                                    backgroundColor:
                                        TTM?.weightedAverageScoreColor || "#000",
                                }}
                            >
                                {TTM?.weightedAverageScore !== undefined
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

export default Effectiveness
