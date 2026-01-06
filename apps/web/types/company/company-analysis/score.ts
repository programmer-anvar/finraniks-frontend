export interface ScoreAnalysis {
    data: {
        average: ScoreItem;
        financialStrength: ScoreItem;
        profitability: ScoreItem;
        effectiveness: ScoreItem;
        growth: ScoreItem;
        forecast: ScoreItem;
        valuation: ScoreItem;
        dividend: ScoreItem;
        economicMoat: ScoreItem;
    }
}

interface ScoreItem {
    weightedAverageScore: number | string;
    weightedAverageScoreColor: string;
}
