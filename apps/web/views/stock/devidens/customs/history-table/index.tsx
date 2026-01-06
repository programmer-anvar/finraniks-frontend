"use client"
import { Card } from '@finranks/design-system/components/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { Typography } from '@finranks/design-system/components/typography';
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    data: any
}

const HistoryTable = ({ data }: Props) => {
    const [openedYears, setOpenedYears] = useState<Set<number>>(new Set())

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-3">Dividend History</h2>
                <p className="text-sm text-muted-foreground">
                    No dividend data available
                </p>
            </div>
        )
    }

    const toggleYear = (year: number) => {
        setOpenedYears(prev => {
            const next = new Set(prev)
            next.has(year) ? next.delete(year) : next.add(year)
            return next
        })
    }
    return (
        <Card className='p-6 space-y-4 rounded-xl'>
            <Typography variant="h2" className="text-[18px]" weight="semibold">Dividend History</Typography>
            <div className='rounded-xl border border-[#d9d9d91a]  overflow-hidden'>
                <Table>
                    <TableHeader className='rounded-t-md!'>
                        <TableRow className="border-b border-[#d9d9d91a] hover:bg-(--main-color) rounded-t-md! bg-(--main-color)">
                            <TableHead className="text-white font-bold  text-base border-r border-[#d9d9d91a]   p-4">Ex-dividend date</TableHead>
                            <TableHead className="text-white font-bold  text-base border-r border-[#d9d9d91a]   p-4">Declaration date</TableHead>
                            <TableHead className="text-white font-bold  text-base border-r border-[#d9d9d91a]   p-4">Record date</TableHead>
                            <TableHead className="text-white font-bold  text-base border-r border-[#d9d9d91a]   p-4">Payable date</TableHead>
                            <TableHead className="text-white font-bold  text-base border-r border-[#d9d9d91a]   p-4 ">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map(({ year, dividends }) => {
                            const isOpen = openedYears.has(year)
                            const visibleRows = isOpen ? dividends : dividends.slice(0, 1)

                            return (
                                <React.Fragment key={year}>
                                    {/* Year row */}
                                    <TableRow className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10 p-4">
                                        <TableCell colSpan={5} className='p-4'>
                                            <button
                                                onClick={() => toggleYear(year)}
                                                className="flex items-center gap-2 text-sm font-medium hover:underline text-white"
                                                aria-expanded={isOpen}
                                            >
                                                <ChevronRight
                                                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''
                                                        }`}
                                                />
                                                {year}
                                            </button>
                                        </TableCell>
                                    </TableRow>

                                    {/* Dividend rows */}
                                    {visibleRows.map((item: any, index: number) => (
                                        <TableRow key={`${year}-${index}`} className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10">
                                            <TableCell className="font-medium text-white border-r border-[#d9d9d91a] p-4">{item.ex_date.formatted}</TableCell>
                                            <TableCell className="font-medium text-white border-r border-[#d9d9d91a] p-4">{item.declaration_date.formatted}</TableCell>
                                            <TableCell className="font-medium text-white border-r border-[#d9d9d91a] p-4">{item.record_date.formatted}</TableCell>
                                            <TableCell className="font-medium text-white border-r border-[#d9d9d91a] p-4">{item.payment_date.formatted}</TableCell>
                                            <TableCell>
                                                {item.amount.formatted}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default HistoryTable