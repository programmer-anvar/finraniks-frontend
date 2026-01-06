export interface QuarterlyMetrics {
    "P/E": number | null;
    "PEG": number | null;
    "P/S": number | null;
    "P/B": number | null;
    "P/FCF": number | null;
}

export interface CurrentMetrics {
    "P/E": number;
    "P/EScore": string;
    "P/EScoreColor": string;
    "PEG": number;
    "PEGScore": string;
    "PEGScoreColor": string;
    "P/S": number;
    "P/SScore": string;
    "P/SScoreColor": string;
    "P/B": number;
    "P/BScore": string;
    "P/BScoreColor": string;
    "P/FCF": number | null;
    "P/FCFScore": string;
    "P/FCFScoreColor": string;
    "weightedAverageScore": string;
    "weightedAverageScoreColor": string;
}

export interface IndustryMetrics {
    "P/E": number;
    "PEG": number;
    "P/S": number;
    "P/B": number;
    "P/FCF": number;
}

export interface ValuationData {
    quarterly: Record<string, QuarterlyMetrics>;
    current: CurrentMetrics;
    industry: IndustryMetrics;
}

export interface ValuationAnalysis {
    data: ValuationData;
}