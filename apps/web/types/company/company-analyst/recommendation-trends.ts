export interface RecommendationTrend {
    month: string;
    strong_buy: number;
    buy: number;
    hold: number;
    sell: number;
    strong_sell: number;
    total: number;
}

export interface RecommendationTrends {
   data: {
       trends: RecommendationTrend[];
       monthly_data: RecommendationTrend[];
   }
}