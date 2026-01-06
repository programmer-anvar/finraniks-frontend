'use client';

import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    ReferenceLine,
    Tooltip,
} from "recharts";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@finranks/design-system/components/hover-card";
import { Typography } from '@finranks/design-system/components/typography';


const formatTitle = (text: string) => {
    // Special case for metrics with special characters like P/E, P/S, P/FCF
    if (text.includes('/')) {
        return text; // Return as is since it's already formatted
    }

    return text.charAt(0).toUpperCase() +
        text.slice(1).replace(/([A-Z])/g, ' $1').trim();
};

interface TrendHoverModalEnhancedProps {
    data: Record<string, Record<string, number | undefined>>; // e.g., { "2024": { grossMarginRatio: 25 } }
    metric: string;
    lastReport?: Record<string, number>;
}

interface ChartDataItem {
    year: string;
    value: number;
    index: number;
    originalDate?: string;
    isLatest?: boolean;
}

const VALUATION_METRICS = ['P/E', 'PEG', 'P/S', 'P/B', 'P/FCF'];

const TrendHoverModalEnhanced: React.FC<TrendHoverModalEnhancedProps> = ({ data, metric, lastReport }) => {
    if (!data || !metric) return null;

    // Process chart data
    const chartData: ChartDataItem[] = Object.keys(data)
        .filter((dateKey) => /^\d{4}(-\d{2}-\d{2})?$/.test(dateKey))
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .slice(-5)
        .map((dateKey, index) => ({
            year: dateKey,
            originalDate: dateKey,
            value: data[dateKey][metric] ?? 0,
            index,
        }));

    const isValuationMetric = VALUATION_METRICS.includes(metric);

    if (lastReport && !isValuationMetric) {
        const value = lastReport[metric];
        if (value !== undefined) {
            chartData.push({
                year: lastReport.hasOwnProperty('currentRatio') ? 'Current' : 'TTM',
                value,
                index: chartData.length,
                isLatest: true,
            });
        }
    }

    if (!chartData.length) return null;

    const values = chartData.map(d => d.value);
    const maxValue = Math.max(...values, 0);
    const minValue = Math.min(...values, 0);
    const range = maxValue - minValue;

    // Mini bar chart
    const MiniBarChart: React.FC = () => (
        <div className="flex items-end gap-1 h-8">
            {chartData.slice(0, 5).map((item, i) => {
                const normalized = (item.value - minValue) / (range || 1);
                const height = Math.max(4, Math.floor(normalized * 24)); // 4px min height
                return <div key={i} className="w-2 bg-purple-500 rounded-sm" style={{ height }} />;
            })}
        </div>
    );

    return (
        <HoverCard openDelay={100}>
            <HoverCardTrigger className="cursor-pointer text-center">
                <MiniBarChart />
            </HoverCardTrigger>
            <HoverCardContent side="left" align="start" className="w-[280px] p-2 bg-[linear-gradient(0deg,#12092C,#12092C),linear-gradient(331.86deg,rgba(35,18,51,0)_48.86%,rgba(35,18,51,0.1)_96.18%)] 
                    shadow-[inset_0_4px_40px_0_#ffffff1a]">
                <Typography variant="body" align='center'>{formatTitle(metric)}({isValuationMetric ? '5Q' : '5-Year'} Trend)</Typography>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 0" horizontal vertical={false} stroke="#292534" />
                        <XAxis
                            dataKey="year"
                            tick={{ fill: '#f8f8f8', fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis tick={{ fill: '#f8f8f8', fontSize: 10 }} tickLine={false} axisLine={false} />
                        {minValue < 0 && <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />}
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} wrapperStyle={{ zIndex: 10000 }} />
                        <Bar
                            dataKey="value"
                            barSize={24}
                            fill="#854ECA"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </HoverCardContent>
        </HoverCard>
    );
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { value, payload: dataPayload } = payload[0];
        const isLatest = dataPayload.isLatest;
        const displayLabel = dataPayload.originalDate ?? label;
        return (
            <div className="custom-tooltip-enhanced">
                <p className="tooltip-year-enhanced" style={{ fontWeight: isLatest ? 700 : 600 }}>
                    {displayLabel} {isLatest && (label === 'Current' ? '(Latest)' : label === 'TTM' ? '(Trailing 12 Months)' : '')}
                </p>
                <p className="tooltip-value-enhanced" style={{ color: '#0958D9' }}>
                    {value.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

export default TrendHoverModalEnhanced;
