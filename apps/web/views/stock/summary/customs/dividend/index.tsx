'use client'

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
import { get } from "lodash"

interface DividendProps {
    data?: any
}

const METRICS = [
    { key: "dividendYieldForward", label: "Dividend yield" },
    { key: "payoutRatio", label: "Payout ratio" },
    { key: "fiveYearDividendGrowthRate", label: "5-year dividend growth rate" },
    { key: "yearsOfDividendIncrease", label: "Years of dividend increase" },
]

const formatNumber = (value?: number | null) =>
    value !== undefined && value !== null ? Number(value).toFixed(2) : "N/A"

const Dividend = ({ data }: DividendProps) => {
    const overview = get(data, "overview", {})
    const industry = get(overview, "industry", {})

    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            <Typography variant="h4">Dividend</Typography>

            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                Name
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                Current
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                Industry
                            </TableHead>
                            <TableHead className="p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[100px]!">
                                Score
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {METRICS.map(({ key, label }) => (
                            <TableRow
                                key={key}
                                className="border-b border-[#353945] hover:bg-purple-900/10"
                            >
                                <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                    {label}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                    {formatNumber(get(overview, `${key}.current`))}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                    {formatNumber(get(industry, key))}
                                </TableCell>

                                <TableCell className="text-center text-white font-semibold">
                                    {get(overview, `${key}.score`) ?? "N/A"}
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                Weighted average score
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{
                                    backgroundColor:
                                        get(overview, "weightedAverage.scoreColor") || "#000",
                                }}
                            >
                                {get(overview, "weightedAverage.score") ?? "N/A"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default Dividend
