"use client"

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

interface GrowthProps {
    data: Record<string, any>
}

const ROWS = ["q/q", "y/y", "3yAverage", "5yAverage"]
const KEY_LABELS: Record<string, string> = {
    "q/q": "Q/Q",
    "y/y": "Y/Y",
    "3yAverage": "3y average",
    "5yAverage": "5y average",
}

const Growth = ({ data }: GrowthProps) => {
    const growth = get(data, "growth", {})

    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Typography variant="h4">Growth</Typography>
            </div>

            {/* TABLE */}
            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                NAME
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                REVENUE
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                NET INCOME
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                EPS
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                FCF
                            </TableHead>
                            <TableHead className="p-4 text-xs font-semibold uppercase text-[#777e90] w-[100px]!">
                                SCORE
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {ROWS.map((key) => {
                            const rowData = get(growth, key, {})
                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="text-white border-r border-[#353945] p-4 font-semibold text-center">
                                        {KEY_LABELS[key]}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.revenueGrowth ?? "N/A"}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.netIncomeGrowth ?? "N/A"}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.EPSGrowth ?? "N/A"}
                                    </TableCell>

                                    <TableCell className="text-white text-center border-r border-[#353945] font-semibold">
                                        {rowData.FCFGrowth ?? "N/A"}
                                    </TableCell>

                                    <TableCell
                                        className="text-white text-center font-semibold"
                                    >
                                        {rowData.avgGrowthScore ?? "N/A"}
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                        {/* FOOTER */}
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                Weighted average score
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{ backgroundColor: get(growth, "weightedAverage.scoreColor") }}
                            >
                                {get(growth, "weightedAverage.score") ?? "N/A"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default Growth
