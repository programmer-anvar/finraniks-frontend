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

interface EconomicMoatProps {
    data?: any
}

const METRICS = [
    { key: "marketShare", label: "Market share" },
    { key: "intangibleAsset", label: "Intangible assets" },
    { key: "switchingCost", label: "Switching cost" },
    { key: "networkEffect", label: "Network effect" },
    { key: "economyScale", label: "Economy of scale" },
]

const EconomicMoat = ({ data }: EconomicMoatProps) => {
    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            <Typography variant="h4">Economic Moat</Typography>

            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                Name
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                Scale
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
                                    {get(data, `${key}.scale`) ?? "N/A"}
                                </TableCell>

                                <TableCell className="text-center text-white font-semibold">
                                    {get(data, `${key}.score`) ?? "1.0"}
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell
                                colSpan={2}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                Weighted average score
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{
                                    backgroundColor:
                                        get(data, "weightedAverage.scoreColor") || "#000",
                                }}
                            >
                                {get(data, "weightedAverage.score") ?? "1.0"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default EconomicMoat
