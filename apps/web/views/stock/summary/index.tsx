import { getCompanyAnalysis, getCompanyAnalyst, getCompanyStocks } from "@/services/stock-summary"
import About from "./customs/about"
import Financials from "./customs/financial"
import FinancialStrength from "./customs/financial-strength"
import News from "./customs/news"
import StockDetails from "./customs/stock-details"
import StrengthWeekness from "./customs/strength-weekness"
import { get } from "lodash"
import Profitability from "./customs/profitability"
import Effectiveness from "./customs/effectiveness"
import Forecast from "./customs/forecast"
import Growth from "./customs/growth"
import GrowthRate from "./customs/growth-rate"
import Valuation from "./customs/valuation"
import Dividend from "./customs/dividend"
import EconomicMoat from "./customs/economic-moat"
import DcfModel from "./customs/dcf-model"
import FairValue from "./customs/fair-value"
import RevealOnScroll from "@finranks/design-system/components/reveal-onscroll"
import React from "react"
import dynamic from "next/dynamic"

const RevenueChart = dynamic(() => import("./customs/revenuechart"), {
    ssr: true
})
const TradeChartComponent = dynamic(() => import("./customs/trade-chart"), {
    ssr: true
})

const OverAllScore = dynamic(() => import("./customs/overall-score"), {
    ssr: true
})
const OctagonView = dynamic(() => import("./customs/octagon-view"), {
    ssr: true
})

const DebtsAssets = dynamic(() => import("./customs/debt-assets"), {
    ssr: true
})

const CurrentRatio = dynamic(() => import("./customs/current-ratio"), {
    ssr: true
})

const RevenueIncome = dynamic(() => import("./customs/revenue-income"), {
    ssr: true
})

const CashFlow = dynamic(() => import("./customs/cash-flow"), {
    ssr: true
})

const MarginRatios = dynamic(() => import("./customs/margin-ratios"), {
    ssr: true
})

const NetMargin = dynamic(() => import("./customs/net-margin"), {
    ssr: true
})


const Estimated = dynamic(() => import("./customs/estimated-eps-eps"), {
    ssr: true
})

const AnalystRating = dynamic(() => import("./customs/analyst-rating"), {
    ssr: true
})


const SummaryPage = async ({ params }: any) => {
    const { slug } = await params

    const [{ data: analysis }, { data: stocks }, { data: analyst }] =
        await Promise.all([
            getCompanyAnalysis(slug),
            getCompanyStocks(slug),
            getCompanyAnalyst(slug),
        ])

    /** 3-column row rendered after Financials + Current Ratio */
    const RevenueCashflowRow = (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {[RevenueIncome, CashFlow, MarginRatios].map((Comp, idx) => (
                <RevealOnScroll key={idx} delay={idx * 0.05}>
                    <Comp
                        data={get(
                            analysis,
                            Comp === MarginRatios
                                ? "profitability.data"
                                : "summary.data"
                        )}
                    />
                </RevealOnScroll>
            ))}
        </div>
    )

    return (
        <div className="space-y-4">
            {/* Top overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                <RevealOnScroll>
                    <StockDetails overview={get(stocks, "overview.data")} />
                </RevealOnScroll>
                <RevealOnScroll delay={0.05}>
                    <About info={get(stocks, "info.data")} />
                </RevealOnScroll>
                <RevealOnScroll delay={0.1}>
                    <RevenueChart revenue={get(stocks, "revenue.data")} />
                </RevealOnScroll>
            </div>

            {/* News + Chart */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2">
                <RevealOnScroll delay={0.15}>
                    <News />
                </RevealOnScroll>
                <RevealOnScroll delay={0.2}>
                    <TradeChartComponent slug={slug} />
                </RevealOnScroll>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                <RevealOnScroll delay={0.3}>
                    <OverAllScore data={get(analysis, "score.data")} />
                </RevealOnScroll>
                <RevealOnScroll delay={0.35}>
                    <OctagonView data={get(analysis, "score.data")} />
                </RevealOnScroll>
                <RevealOnScroll delay={0.4}>
                    <StrengthWeekness
                        data={get(analysis, "strength_weakness.data")}
                    />
                </RevealOnScroll>
            </div>

            {/* 2fr / 1fr sections */}
            {[
                [
                    <FinancialStrength
                        data={get(analysis, "financialstrength.data")}
                    />,
                    <DebtsAssets data={get(analysis, "summary.data")} />,
                ],
                [
                    <Financials data={get(analysis, "summary.data")} />,
                    <CurrentRatio
                        data={get(analysis, "financialstrength.data")}
                    />,
                ],
                [
                    <Profitability
                        data={get(analysis, "profitability.data")}
                    />,
                    <NetMargin data={get(analysis, "summary.data")} />,
                ],
                [
                    <Effectiveness
                        data={get(analysis, "effectiveness.data")}
                    />,
                    <Estimated
                        data={get(analysis, "eps_comparison.data")}
                    />,
                ],
                [
                    <Forecast data={get(analysis, "forecast.data")} />,
                    <AnalystRating
                        data={get(analyst, "recommendation_trends.data")}
                    />,
                ],
                [
                    <Growth data={get(analysis, "growth.data")} />,
                    <GrowthRate data={get(analysis, "growth.data")} />,
                ],
                [
                    <Valuation data={get(analysis, "valuation.data")} />,
                    <DcfModel data={get(analysis, "dcfmodel.data")} />,
                ],
                [
                    <Dividend data={get(analysis, "dividends.data")} />,
                    <FairValue data={get(analysis, "dcfmodel.data")} />,
                ],
            ].map((pair, idx) => {
                const baseDelay = idx * 0.03

                return (
                    <React.Fragment key={idx}>
                        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-2">
                            <RevealOnScroll delay={baseDelay}>
                                {pair[0]}
                            </RevealOnScroll>
                            <RevealOnScroll delay={baseDelay + 0.05}>
                                {pair[1]}
                            </RevealOnScroll>
                        </div>

                        {/* ✅ Render 3-column row AFTER Financials + CurrentRatio */}
                        {idx === 1 && RevenueCashflowRow}
                    </React.Fragment>
                )
            })}

            {/* Economic moat */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-2">
                <RevealOnScroll>
                    <EconomicMoat
                        data={get(analysis, "economicmoat.data")}
                    />
                </RevealOnScroll>
            </div>
        </div>
    )
}

export default SummaryPage
