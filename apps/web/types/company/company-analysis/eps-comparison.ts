export interface EpsComparison {
    data: {
        quarterly: {
            eps: Array<{
                period: string;
                reported: number | null;
                estimate: string;
                surprise: number | null;
            }>;
        };
    };
}