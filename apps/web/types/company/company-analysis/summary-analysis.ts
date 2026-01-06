export interface FinancialStatement {
    ebit: number;
    ebitda: number;
    grossProfit: number;
    netIncome: number;
    operatingIncome: number;
    pretaxIncome: number;
    totalRevenue: number;
}

export interface BalanceSheetStatement {
    totalAssets: number;
    currentLiabilities: number;
    totalDebt: number;
    totalEquity: number;
    totalLiabilities: number;
}

export interface CashFlowStatement {
    financingCashFlow: number;
    investingCashFlow: number;
    operatingCashFlow: number;
    freeCashFlow: number;
}

export interface TTMFinancials {
    totalRevenueTTM: number;
    grossProfitTTM: number;
    operatingIncomeTTM: number;
    netIncomeTTM: number;
    ebitdaTTM: number;
    ebitTTM: number;
    interestExpenseTTM: number;
    taxProvisionTTM: number;
    pretaxIncomeTTM: number;
}

export interface TTMBalanceSheet {
    totalAssetsTTM: number;
    totalLiabilitiesTTM: number;
    totalEquityTTM: number;
    totalDebtTTM: number;
    currentAssetsTTM: number | null;
    currentLiabilitiesTTM: number;
    stockholdersEquityTTM: number | null;
}

export interface TTMCashFlow {
    operatingCashFlowTTM: number;
    financingCashFlowTTM: number;
    investingCashFlowTTM: number;
    freeCashFlowTTM: number;
}

export interface SummaryAnalysis {
    data: {
        incomeStatement: {
            annual: Record<string, FinancialStatement>;
            quarterly: Record<string, FinancialStatement>;
            ttm: TTMFinancials;
        };
        balanceSheet: {
            annual: Record<string, BalanceSheetStatement>;
            quarterly: Record<string, BalanceSheetStatement>;
            ttm: TTMBalanceSheet;
        };
        cashFlow: {
            annual: Record<string, CashFlowStatement>;
            quarterly: Record<string, CashFlowStatement>;
            ttm: TTMCashFlow;
        };
    };
}