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
            { label: "Total Assets", key: "Total Assets", color: "#5CC8FF" },
            { label: "Total Liabilities", key: "Total Liabilities", color: "#FFC857" },
            { label: "Stockholders Equity", key: "Stockholders Equity", color: "#FF6FAE" },
            { label: "Total Debt", key: "Total Debt", color: "#6EE7B7" },
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
        <span style={{ fontSize: 13 }} className="whitespace-nowrap">
            {label}: {formatNumber(value)}B
        </span>
    </div>
);



const formatCashFlowData = (data: any, financialsNew: any) => {
    const useNewAPI = financialsNew?.financial_data?.annual && financialsNew?.periods?.annual?.fiscal_periods;

    if (useNewAPI) {
        const periods = financialsNew.periods.annual.fiscal_periods || [];
        const financialData = financialsNew.financial_data.annual || {};

        return periods.slice(0, 5).map((year: string, index: number) => ({
            year,
            "Operating Cash Flow": formatNumber(financialData.cash_f_operating_activities?.[index]),
            "Investing Cash Flow": formatNumber(financialData.cash_f_investing_activities?.[index]),
            "Financing Cash Flow": formatNumber(financialData.cash_f_financing_activities?.[index]),
            "Free Cash Flow": formatNumber(financialData.free_cash_flow?.[index]),
        }));
    } else {
        const oldData = data?.cashFlow?.annual || {};

        return Object.entries(oldData)
            .slice(-5)
            .map(([year, val]: [string, any]) => ({
                year,
                "Operating Cash Flow": formatNumber(val.cash_f_operating_activities ?? val.operatingCashFlow),
                "Investing Cash Flow": formatNumber(val.cash_f_investing_activities ?? val.investingCashFlow),
                "Financing Cash Flow": formatNumber(val.cash_f_financing_activities ?? val.financingCashFlow),
                "Free Cash Flow": formatNumber(val.free_cash_flow ?? val.freeCashFlow),
            }));
    }
};


const CashFlowChart = ({ chart_data, financialsNew }: { chart_data: any, financialsNew: any }) => {
    const balanceSheetData = formatCashFlowData(chart_data, financialsNew);
    const allValues = balanceSheetData.flatMap((d: any) => [
        d["Operating Cash Flow"],
        d["Investing Cash Flow"],
        d["Financing Cash Flow"],
        d["Free Cash Flow"]
    ]);
    const maxValue = Math.max(...allValues.map(Math.abs), 0);
    const symmetricalMax = maxValue * 1.1
    return (
        <Card className='h-[400px] p-4 rounded-xl'>
            <ResponsiveBar
                data={balanceSheetData}
                keys={["Operating Cash Flow", "Investing Cash Flow", "Financing Cash Flow", "Free Cash Flow"]}
                indexBy="year"
                margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
                padding={0.6}
                innerPadding={6}
                groupMode="grouped"
                colors={["#5CC8FF", "#FFC857", "#FF6FAE", "#6EE7B7"]}
                borderRadius={6}
                enableLabel={false}
                tooltip={CustomTooltip}
                valueScale={{
                    type: 'linear',
                    min: -symmetricalMax,
                    max: symmetricalMax
                }}
                markers={[
                    {
                        axis: 'y',
                        value: 0,
                        lineStyle: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 },
                    },
                ]}
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

export default CashFlowChart