export interface CompanyOverview {
    data: {
        ticker: string;
        previousClose: string;
        dayRange: string;
        volume: number;
        averageVolume: number;
        "52weekRange": string;
        beta: number;
        EPSTTM: number;
        PEratioTTM: number;
        marketCap: number;
        sharesOutstanding: number;
        dividendYield: string;
        nextEarningsDate: string;
        sector: string;
        industry: string;
        investmentStyle: string | null;
    }
}