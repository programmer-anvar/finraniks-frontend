export interface FinancialStrengthAnalysis {
    data: {
        annual: {
            [year: string]: {
                currentRatio: number;
                debtToAssets: number;
                debtToEquity: number;
                interestCoverage: number;
                quickRatio: number;
                totalAssets: number;
                currentAssets: number;
                currentLiabilities: number;
                totalDebt: number;
            }
        };
        lastReport: {
            currentRatio: number;
            debtToAssets: number;
            debtToEquity: number;
            interestCoverage: number;
            quickRatio: number;
            currentRatioScore: number;
            debtToAssetsScore: string;
            debtToEquityScore: string;
            weightedAverageScore: string;
            interestCoverageScore: number;
            quickRatioScore: number;
            totalAssets: number;
            currentAssets: number;
            currentLiabilities: number;
            totalDebt: number;
            periodDate: string;
            frequency: string;
            currentRatioScoreColor: string;
            quickRatioScoreColor: string;
            debtToEquityScoreColor: string;
            debtToAssetsScoreColor: string;
            interestCoverageScoreColor: string;
            weightedAverageScoreColor: string;
        };
        industry: {
            currentRatio: number;
            quickRatio: number;
            debtToEquity: number;
            debtToAssets: number;
            interestCoverage: number;
        }
    }
}