import {CompanyInfo} from "@/types/company/company-stocks/info";
import {CompanyRevenue} from "@/types/company/company-stocks/revenue";
import {CompanyOverview} from "@/types/company/company-stocks/overview";

export interface CompanyStocks {
    info: CompanyInfo;
    revenue: CompanyRevenue;
    overview: CompanyOverview;
}