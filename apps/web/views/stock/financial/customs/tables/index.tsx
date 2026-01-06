"use client"
import { Card } from '@finranks/design-system/components/card'
import { Tabs, TabsList, TabsTrigger } from '@finranks/design-system/components/tabs'
import { Typography } from '@finranks/design-system/components/typography'
import React, { useState } from 'react'
import IncomeStatementTable from './income-statement-table'
import { useTabStore } from '@/stores/shared'
import BalanceSheetTable from './balance-sheet-table'
import CashFlowTable from './cashflow-table'

const Tables = ({ financialsNew, incomeStatement, balanceSheet, cashFlow }: any) => {
    const [view, setView] = useState("annual");
    const activeTab = useTabStore((state) => state.activeTab);
    return (
        <Card className="p-4 md:p-6 rounded-xl space-y-4">
            <div className='flex flex-col md:flex-row md:items-center justify-between'>
                <div >
                    <Typography variant='h2' className='text-sm md:text-[20px]! font-bold!'>Income Statement <span className='capitalize'>({view})</span></Typography>
                    <Typography variant='small' className='text-xs!'>Financials in millions USD. Fiscal year is January - December.</Typography>
                </div>
                <Tabs value={view} onValueChange={setView}>
                    <TabsList className='w-fit'>
                        <TabsTrigger className='text-xs' value='annual'>Annual</TabsTrigger>
                        <TabsTrigger className='text-xs' value='quarterly'>Quarterly</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {activeTab === "income-statement" && <IncomeStatementTable newData={financialsNew} data={incomeStatement?.incomeStatement} view={view} />}
            {(activeTab === 'balance-sheet' && balanceSheet?.balanceSheet) && (
                <BalanceSheetTable data={balanceSheet.balanceSheet} newData={financialsNew} view={view} />
            )}
            {(activeTab === 'cash-flow' && cashFlow?.cashFlow) && (
                <CashFlowTable data={cashFlow.cashFlow} newData={financialsNew} view={view} />
            )}
        </Card>
    )
}

export default Tables