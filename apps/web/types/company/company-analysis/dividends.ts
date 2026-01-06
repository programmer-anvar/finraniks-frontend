export interface DividendYield {
    current: number;
    EOD: number;
    score: string;
    scoreColor: string;
}

export interface DividendIndustry {
    dividendYieldForward: number;
    payoutRatio: number;
    fiveYearDividendGrowthRate: number;
    tenYearDividendGrowthRate: number | null;
    yearsOfDividendIncrease: number;
}

export interface DividendOverview {
    dividendYieldForward: DividendYield;
    payoutRatio: DividendYield;
    fiveYearDividendGrowthRate: {
        current: number;
        EOD: null;
        score: number;
        scoreColor: string;
    };
    tenYearDividendGrowthRate: {
        current: null;
        EOD: null;
        score: string;
        scoreColor: string;
    };
    yearsOfDividendIncrease: {
        current: number;
        score: string;
        scoreColor: string;
    };
    weightedAverage: {
        score: string;
        scoreColor: string;
    };
    industry: DividendIndustry;
}

export interface DividendPayout {
    exDivDate: string;
    amount: string;
    unadjustedAmount: string;
    period: string;
    declarationDate: string | null;
    recordDate: string;
    paymentDate: string;
}

export interface Dividends {
    data: {
        overview: DividendOverview;
        payouts: DividendPayout[];
    };
}