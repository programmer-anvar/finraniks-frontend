export interface CompanyRevenue {
    data: CompanyRevenueData
}

export interface CompanyRevenueData {
    revenues: Array<{
        name: string;
        value: number;
        percent: number;
    }>;
    totalRevenue: number;
}