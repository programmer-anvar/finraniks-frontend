export interface EffectivenessAnalysis {
    data: {
        annual: Record<string, {
            ROA: number;
            ROCE: number;
            ROE: number;
            ROIC: number;
        }>;
        TTM: {
            ROA: number;
            ROCE: number;
            ROE: number;
            ROIC: number;
            weightedAverageScore: string;
            ROAScore: number;
            ROCEScore: string;
            ROEScore: number;
            ROICScore: number;
            ROAScoreColor: string;
            ROEScoreColor: string;
            ROICScoreColor: string;
            ROCEScoreColor: string;
            weightedAverageScoreColor: string;
        };
        industry: {
            ROA: number;
            ROE: number;
            ROIC: number;
            ROCE: number;
        };
    };
}