import config from "@/lib/config";
import { fetchJson } from "../base/fetch-json";

async function getIncomestatement(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/companies/${slug}/financials/incomestatement`, {
        next: { revalidate: 10 },
    });
}

async function getBalancesheet(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/companies/${slug}/financials/balancesheet`, {
        next: { revalidate: 10 },
    });
}

async function getCashflow(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/companies/${slug}/financials/cashflow`, { 
        next: { revalidate: 10 },
    });
}

async function companyFinancials(slug: string) {
    return fetchJson<any>(`${config.APP_URL}/company/financials/${slug}`, {
        next: { revalidate: 10 },
    });
}

export { getIncomestatement, getBalancesheet, getCashflow, companyFinancials };