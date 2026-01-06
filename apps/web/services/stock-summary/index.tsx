import { fetchWithAuth } from "@/utils/helpers/fetch-with-auth";
import config from "@/lib/config";

async function getCompanyAnalysis(slug: string) {
    const res = await fetchWithAuth(
        `${config.APP_URL}/company/analysis/${slug}?include=strength_weakness,score,financialstrength,summary,profitability,effectiveness,growth,forecast,eps_comparison,valuation,dcfmodel,dividends,economicmoat`,
        {
            cache: 'no-store'
        }
    );

    return res
}

async function getCompanyAnalyst(slug: string) {
    const res = await fetchWithAuth(
        `${config.APP_URL}/company/analyst/${slug}?include=recommendation_trends`,
        {
            cache: 'no-store'
        }
    );

    return res
}


async function getCompanyStocks(slug: string) {
    const res = await fetchWithAuth(
        `${config.APP_URL}/company/stocks/${slug}?include=info,revenue,overview`,
        {
            cache: 'no-store'
        }
    );

    return res
}

export { getCompanyAnalysis, getCompanyAnalyst, getCompanyStocks }