// StrengthWeakness
export interface StrengthWeaknessAnalysis {
    data: {
        financialStrength: StrengthWeaknessFinancial[]
        profitability: StrengthWeaknessProfitability[]
        effectiveness: StrengthWeaknessEffectiveness[]
        growth: StrengthWeaknessGrowth[]
        forecast: StrengthWeaknessForecast[]
        valuation: StrengthWeaknessValuation[]
        dividend: StrengthWeaknessDividend[]
        economicMoat: StrengthWeaknessEconomicMoat[]
    }
}

export interface StrengthWeaknessFinancial {
    type: string;
    description: string;
    params: {
        cashToDebt?: number;
        cashAndEquivalents?: string;
        totalDebt?:  string;
        totalEquity?: string;
        industryAverage?: number;
        interestCoverage?: string;
        hasNoDebt?: boolean;
        freeCashFlow?: number;
    }
}

export interface StrengthWeaknessProfitability {
    type: string;
    description: string;
    params: {
        netMargin?: string;
        ebitdaMargin?: string;
        cashFlowMargin?: string;
        industryAverage: number;
    }
}

export interface StrengthWeaknessEffectiveness {
    type: string;
    description: string;
    params: {
        roe?: string;
        roa?: string;
        roce?: string;
        roic?: string;
        industryAverage?: number;
    }
}

export interface StrengthWeaknessGrowth {
    type: string;
    description: string;
    params: {
        threeYRevenueGrowth?: number;
        quarterlyEpsGrowth?: number;
        fcfGrowthYoy?: number;
        revenueGrowth?: number;
        netIncomeGrowth?: number;
        epsGrowth?: number;
    }
}

export interface StrengthWeaknessForecast {
    type: string;
    description: string;
    params: {
        currentQuarterEpsGrowth?: number;
        nextQuarterEpsGrowth?: number;
        analystRating?: "Buy" | "Sell" | "Hold";
        analystCount?: number;
        guidanceChange?: number;
    }
}

export interface StrengthWeaknessValuation {
    type: "positive" | "neutral" | "negative";
    description: string;
    params: {
        stockPE?: number;
        industryPE?: number;
        ratio?: number;
        peg?: number;
        stockPB?: number;
        industryPB?: number;
        fairValue?: number;
        stockPrice?: number;
        upside?: number;
    }
}

export interface StrengthWeaknessDividend {
    type: "positive" | "neutral" | "negative";
    description: string;
    params: {
        dividendYield?: number;
        yearsOfGrowth?: number;
        payoutRatio?: number;
        fiveYearGrowthRate?: number;
    }
}

export interface StrengthWeaknessEconomicMoat {
    type: "positive" | "neutral" | "negative";
    description: string;
    params: {
        marketShareScore?: number;
        intangibleAssetsScore?: number;
        switchingCostsScore?: number;
        networkEffectScore?: number;
        economiesOfScaleScore?: number;
    }
}