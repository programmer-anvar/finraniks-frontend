export interface ForecastPeriod {
    revenueGrowth: number;
    EPSGrowth: number;
    weightedAverageScore: number;
    weightedAverageScoreColor: string;
}

export interface ForecastAverage {
    weightedAverageScore: number;
    weightedAverageScoreColor: string;
}

export interface ForecastData {
    currentQuarter: ForecastPeriod;
    nextQuarter: ForecastPeriod;
    currentYear: ForecastPeriod;
    nextYear: ForecastPeriod;
    avg: ForecastAverage;
}

export interface ForecastAnalysis {
    data: ForecastData;
}