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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@finranks/design-system/components/select"
import { Tabs, TabsTrigger, TabsList } from "@finranks/design-system/components/tabs"
import { memo, useMemo, useState } from "react"
import { get } from "lodash"
import { formatToMillion } from "@finranks/design-system/lib/utils"

type PeriodType = "annual" | "quarterly"
type TabType = "income" | "balance" | "cash"

const TAB_KEY_MAP: Record<TabType, string> = {
    income: "incomeStatement",
    balance: "balanceSheet",
    cash: "cashFlow",
}

const MAIN_KEYS = {
    incomeStatement: ["totalRevenue", "grossProfit", "operatingIncome", "netIncome", "ebitda"],
    balanceSheet: ["totalAssets", "totalLiabilities", "totalEquity", "totalDebt"],
    cashFlow: ["operatingCashFlow", "financingCashFlow", "investingCashFlow", "freeCashFlow"],
}

const KEY_LABELS: Record<string, string> = {
    totalRevenue: "Total Revenue",
    grossProfit: "Gross Profit",
    operatingIncome: "Operating Income",
    netIncome: "Net Income",
    ebitda: "EBITDA",
    totalAssets: "Total Assets",
    totalLiabilities: "Total Liabilities",
    totalEquity: "Total Equity",
    totalDebt: "Total Debt",
    operatingCashFlow: "Operating Cash Flow",
    financingCashFlow: "Financing Cash Flow",
    investingCashFlow: "Investing Cash Flow",
    freeCashFlow: "Free Cash Flow",
}

const Financials = memo(({ data }: any) => {
    const [activeTab, setActiveTab] = useState<TabType>("income")
    const [period, setPeriod] = useState<PeriodType>("annual")

    const sectionKey = TAB_KEY_MAP[activeTab]

    const selectedData = useMemo(
        () => data?.[sectionKey]?.[period] ?? {},
        [data, sectionKey, period]
    )

    const selectedTTM = useMemo(
        () => data?.[sectionKey]?.ttm ?? {},
        [data, sectionKey]
    )

    const dateValues = useMemo(
        () => Object.keys(selectedData),
        [selectedData]
    )

    const rows = MAIN_KEYS?.[sectionKey as keyof typeof MAIN_KEYS] ?? []

    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Typography variant="h4">Financial</Typography>

                <div className="flex items-center gap-2">
                    <small className="text-white hidden md:block" style={{ fontSize: 11, marginRight: 16 }}>Values in USD <br /> (B=Billions, M=Millions, K=Thousands)</small>
                    <Select value={period} onValueChange={(v) => setPeriod(v as PeriodType)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue className="text-white" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="annual">Annual</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <small className="text-white block md:hidden" style={{ fontSize: 11, marginRight: 16 }}>Values in USD <br /> (B=Billions, M=Millions, K=Thousands)</small>

            {/* TABS */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)}>
                <TabsList variant="line">
                    <TabsTrigger value="income">Income Statement</TabsTrigger>
                    <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
                    <TabsTrigger value="cash">Cash Flow</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* TABLE */}
            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">

                            <TableHead className=" text-[#777e90] uppercase border-r border-[#353945] p-4 text-center w-[220px]!">
                                Metric
                            </TableHead>

                            {dateValues.map((date) => (
                                <TableHead
                                    key={date}
                                    className="text-[#777e90] uppercase text-center border-r border-[#353945]"
                                >
                                    {date}
                                </TableHead>
                            ))}

                            <TableHead className=" text-[#777e90] uppercase text-center w-[100px]!">
                                TTM
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.map((key) => {
                            const ttm = get(selectedTTM, `${key}TTM`)

                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="text-white border-r border-[#353945] p-4 font-semibold text-center">
                                        {KEY_LABELS[key] ?? key}
                                    </TableCell>

                                    {dateValues.map((date) => {
                                        const val = selectedData?.[date]?.[key]
                                        return (
                                            <TableCell
                                                key={date}
                                                className="text-white text-center border-r border-[#353945] font-semibold"
                                            >
                                                {val ? formatToMillion(val) : "N/A"}
                                            </TableCell>
                                        )
                                    })}

                                    <TableCell className="text-white text-center font-semibold">
                                        {ttm ? formatToMillion(ttm) : "N/A"}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
})

export default Financials
