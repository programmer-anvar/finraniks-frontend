"use client"
import { useTabStore } from '@/stores/shared';
import IncomeStatementChart from './income-statement-chart';
import CashFlowChart from './cashflow-chart';
import BalanceSheetChart from './balance-sheet-chart';

const Charts = ({ incomeStatement, balanceSheet, cashFlow, financialsNew }: any) => {
    const activeTab = useTabStore((state) => state.activeTab);
    return (
        <div>
            {activeTab === 'income-statement' && <IncomeStatementChart chart_data={incomeStatement} financialsNew={financialsNew} />}
            {activeTab === 'balance-sheet' && <BalanceSheetChart chart_data={balanceSheet} financialsNew={financialsNew} />}
            {activeTab === 'cash-flow' && <CashFlowChart chart_data={cashFlow} financialsNew={financialsNew} />}
        </div>
    )
}

export default Charts