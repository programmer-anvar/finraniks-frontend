export interface GrowthPeriod {
    name: string;
    revenueGrowth: number;
    netIncomeGrowth: number;
    EPSGrowth: number;
    FCFGrowth: number;
    avgGrowth: null;
    avgGrowthScore: number;
    avgGrowthScoreColor: string;
}

export interface WeightedAverage {
    score: number;
    scoreColor: string;
}

export interface AnnualData {
    year: number;
    date: string;
    company: {
        revenue_growth: number;
    };
    industry: {
        companies: number;
        revenue_growth: number;
    };
}

export interface GrowthAnalysis {
    data: {
        growth: {
            'q/q': GrowthPeriod;
            'y/y': GrowthPeriod;
            '3yAverage': GrowthPeriod;
            '5yAverage': GrowthPeriod;
            weightedAverage: WeightedAverage;
        };
        annual: AnnualData[];
    };
}