export interface ProfitabilityAnnualData {
    cashFlowMarginRatio: number;
    ebitdaMarginRatio: number;
    grossMarginRatio: number;
    netMarginRatio: number;
    operatingMarginRatio: number;
}

export interface ProfitabilityTTMData extends ProfitabilityAnnualData {
    cashFlowMarginRatioScore: number;
    ebitdaMarginRatioScore: number;
    weightedAverageScore: number;
    grossMarginRatioScore: number;
    netMarginRatioScore: number;
    operatingMarginRatioScore: number;
    grossMarginRatioScoreColor: string;
    operatingMarginRatioScoreColor: string;
    netMarginRatioScoreColor: string;
    ebitdaMarginRatioScoreColor: string;
    cashFlowMarginRatioScoreColor: string;
    weightedAverageScoreColor: string;
}

export interface ProfitabilityData {
    data: {
        annual: {
            [year: string]: ProfitabilityAnnualData;
        };
        TTM: ProfitabilityTTMData;
        industry: ProfitabilityAnnualData;
    };
}