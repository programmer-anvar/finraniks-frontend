"use client";
import { Card } from '@finranks/design-system/components/card';
import { ResponsiveBar } from '@nivo/bar';

const formatNumber = (value: number | null | undefined) => {
    if (value == null || isNaN(value)) return null;
    if (Math.abs(value) >= 1_000_000_000) return +(value / 1_000_000_000).toFixed(2); // B
    if (Math.abs(value) >= 1_000_000) return +(value / 1_000_000).toFixed(2); // M
    if (Math.abs(value) >= 1_000) return +(value / 1_000).toFixed(2); // K
    return +value.toFixed(2);
};


const CustomTooltip = ({ indexValue, data }: any) => (
    <div
        style={{
            background: "#fff",
            color: "#000",
            padding: "12px 14px",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            minWidth: 200,
        }}
    >
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{indexValue}</div>
        {[
            { label: "Revenue", key: "revenue", color: "#5CC8FF" },
            { label: "Gross profit", key: "grossProfit", color: "#FFC857" },
            { label: "Operating income", key: "operatingIncome", color: "#FF6FAE" },
            { label: "Net income", key: "netIncome", color: "#6EE7B7" },
        ].map(({ label, key, color }) => (
            <TooltipRow key={key} color={color} label={label} value={data[key]} />
        ))}
    </div>
);

const TooltipRow = ({ color, label, value }: { color: string; label: string; value: number }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span
            style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
            }}
        />
        <span style={{ fontSize: 13 }} className='whitespace-nowrap'>
            {label}: {formatNumber(value) ?? 0}B
        </span>
    </div>
);



const formatFinancialData = (data: any, financialsNew: any) => {
    const useNewAPI = financialsNew?.financial_data?.annual && financialsNew?.periods?.annual?.fiscal_periods;

    if (useNewAPI) {
        const periods = financialsNew.periods.annual.fiscal_periods || [];
        const financialData = financialsNew.financial_data.annual || {};
        return periods.slice(0, 5).map((year: string, idx: number) => ({
            year,
            Revenue: financialData.total_revenue?.[idx] ?? null,
            "Gross Profit": financialData.gross_profit?.[idx] ?? null,
            "Operating Income": financialData.oper_income?.[idx] ?? null,
            "Net Income": financialData.net_income?.[idx] ?? null,
        }));
    } else {
        const oldData = data?.incomeStatement?.annual || {};
        return Object.entries(oldData)
            .slice(-5)
            .map(([year, val]: [string, any]) => ({
                year,
                Revenue: formatNumber(val.total_revenue ?? val.totalRevenue),
                "Gross Profit": formatNumber(val.gross_profit ?? val.grossProfit),
                "Operating Income": formatNumber(val.oper_income ?? val.operatingIncome),
                "Net Income": formatNumber(val.net_income ?? val.netIncome),
            }));
    }
};


const IncomeStatementChart = ({ chart_data, financialsNew }: { chart_data: any, financialsNew: any }) => {
    const chartData = formatFinancialData(chart_data, financialsNew);
    return (
        <Card className='h-[400px] p-4 rounded-xl'>
            <ResponsiveBar
                data={chartData}
                keys={["Revenue", "Gross Profit", "Operating Income", "Net Income"]}
                indexBy="year"
                margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
                padding={0.6}
                innerPadding={6}
                groupMode="grouped"
                colors={["#5CC8FF", "#FFC857", "#FF6FAE", "#6EE7B7"]}
                borderRadius={3}
                enableLabel={false}
                tooltip={CustomTooltip}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 10,
                    tickRotation: 0,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 10,
                    format: (v) => `${formatNumber(v)}B`,
                }}
                theme={{
                    axis: {
                        ticks: {
                            line: { stroke: "transparent" },
                            text: { fill: "#9CA3AF" },
                        },
                    },
                    grid: {
                        line: {
                            stroke: "rgba(255,255,255,0.08)",
                            strokeDasharray: "4 4",
                        },
                    },
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-left",
                        direction: "row",
                        translateY: 50,
                        itemWidth: 110,
                        itemHeight: 20,
                        symbolSize: 10,
                        itemTextColor: "#E5E7EB",

                    },
                ]}
            />
        </Card>
    )
}

export default IncomeStatementChart