"use client"
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { get } from 'lodash';
import { getScoreColor } from '@finranks/design-system/lib/color';
import { memo } from 'react';
import dynamic from 'next/dynamic';

const TrendHoverModalEnhanced = dynamic(() => import("./customs/chart-card"), {
    ssr: false
})

const METRICS = [
    {
        key: "currentRatio",
        label: "Current ratio",
    },
    {
        key: "quickRatio",
        label: "Quick ratio",
    },
    {
        key: "debtToEquity",
        label: "Debt to Equity",
    },
    {
        key: "debtToAssets",
        label: "Debt to Assets",
    },
    {
        key: "interestCoverage",
        label: "Interest coverage",
    },
];


const formatNumber = (value?: number) =>
    value !== null && value !== undefined ? Number(value).toFixed(2) : "N/A";


const FinancialStrength = memo(({ data }: any) => {
    const industry = get(data, "industry");
    const lastReport = get(data, "lastReport");
    const annual = get(data, "annual");

    return (
        <Card className="space-y-4 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between">
                <Typography variant="h4">Financial Strength</Typography>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#353945]">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r w-[220px]! border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
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

                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                        {label}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(lastReport?.[key]) ?? "N/A"}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(industry?.[key]) ?? "N/A"}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] flex items-center justify-center">
                                        <TrendHoverModalEnhanced
                                            data={annual}
                                            metric={key}
                                            lastReport={lastReport}
                                        />
                                    </TableCell>

                                    <TableCell className="text-center text-white font-semibold">
                                        {lastReport?.[`${key}Score`] ?? "N/A"}
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {/* Footer */}
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                colSpan={4}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                Weighted average score
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{
                                    backgroundColor: getScoreColor(
                                        lastReport?.weightedAverageScore
                                    ),
                                }}
                            >
                                {lastReport?.weightedAverageScore ?? "N/A"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
});


export default FinancialStrength