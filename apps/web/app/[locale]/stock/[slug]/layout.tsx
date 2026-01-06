import { getCompanyStocks, getStockQuote } from "@/services/stocks";
import { getDeviceType } from "@/utils/get-device-type";
import StockBreadCumb from "@/views/stock/shared/breadcumb";
import CompanyInfo from "@/views/stock/shared/company-info";
import Tabs from "@/views/stock/shared/tabs";
import { get } from "lodash";
import { ReactNode } from "react";
import { headers } from 'next/headers';
import StockHeader from "@/views/stock/shared/stock-header";

type TLayoutProperties = {
    readonly children: ReactNode;
    readonly params: Promise<{
        locale: string;
        slug: string;
    }>;
};


export default async function Layout({ children, params }: TLayoutProperties) {
    const param = await params;
    const deviceInfo = getDeviceType(await headers());
    const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;
    const [company, quote] = await Promise.all([
        getCompanyStocks({ slug: param.slug }),
        getStockQuote({ slug: param.slug }),
    ]);

    const ticker = get(company, 'info.data.ticker') || param.slug;
    const name = get(company, 'info.data.name') || '';
    const exchange = quote?.data.exchange || '';
    const price = quote?.data.markets?.regular?.price?.toFixed(2) || Number(get(company, 'market.data.close'))?.toFixed(2) || '0.00';
    const change = quote?.data.markets?.regular?.change?.toFixed(2) || Number(get(company, 'market.data.change'))?.toFixed(2) || '0.00';
    const changePercent = quote?.data.markets?.regular?.changePercent?.toFixed(2) || Number(get(company, 'market.data.change_p'))?.toFixed(2) || '0.00';
    const displayTime = quote?.data.markets?.regular?.displayTime || '';
    const currentMarketState = quote?.data.currentMarketState || '';

    return (
        <>
            {isMobile && (
                <StockHeader
                    ticker={ticker}
                    name={name}
                    exchange={exchange}
                    price={price}
                    change={parseFloat(change)}
                    changePercent={parseFloat(changePercent)}
                    displayTime={displayTime}
                    currentMarketState={currentMarketState}
                />
            )}
            <main className="space-y-5 app-container">
                <div className=" mt-5! space-y-4">
                    <StockBreadCumb slug={param.slug} />
                    <CompanyInfo
                        slug={param?.slug}
                        company={{
                            name: get(company, "data.info.data.name", ""),
                            symbol: get(company, "data.info.data.ticker", param.slug),
                            logoUrl: get(company, "data.info.data.logo", ""),
                            exchange: Boolean(quote?.data) ? `${get(quote, "data.exchange", "")}` : "",
                            currency: Boolean(quote?.data) ? `${get(quote, "data.currency", "")}` : "",
                        }}
                        market={get(company, 'market.data')}
                        quoteData={quote?.data}
                    />
                    <Tabs />
                </div>
                {children}
            </main>
        </>
    );
}