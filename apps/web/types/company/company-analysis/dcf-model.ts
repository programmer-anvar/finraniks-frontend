export interface DcfModelCagr {
    revenue_cagr_year: number;
    revenue_cagr: string;
    free_cash_flow_cagr_year: number;
    free_cash_flow_cagr: string;
}

export interface DcfModel {
    data: {
        period: string;
        possibility: number;
        comment: string | null;
        fairValue: string;
        discountRate: string;
        perpetualGrowthRate: string;
        tradeDate: string;
        stockPrice: string;
        upside: string;
        cagr: DcfModelCagr;
        updatedAt: string;
    }
}