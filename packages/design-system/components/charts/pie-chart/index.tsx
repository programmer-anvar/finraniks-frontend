'use client';

import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    TooltipProps,
    LegendProps
} from 'recharts';

/** Shape of a single pie slice item */
interface PieChartItem {
    /** Name label */
    name: string;
    /** Numeric value for the slice */
    value: number;
    /** Optional custom color */
    color?: string;
}

/** Props for the generic Pie Chart component */
interface PieChartGenericProps {
    /** Input dataset (array of slices) */
    data: PieChartItem[];

    /** Key name of the value field in `data` */
    dataKey: keyof PieChartItem;

    /** Key name for label field in `data` (default: "name") */
    nameKey?: keyof PieChartItem;

    /** Custom slice colors (fallback used if not provided) */
    colors?: string[];

    /** Inner radius (for donut shape) */
    innerRadius?: number;

    /** Outer radius */
    outerRadius?: number;

    /** Padding angle between slices */
    paddingAngle?: number;

    /** Slice corner radius */
    cornerRadius?: number;

    /** Custom tooltip renderer */
    customTooltip?: React.FC<TooltipProps<number, string>>;

    /** Custom legend renderer */
    customLegend?: React.FC<LegendProps>;

    /** Show percentage labels on slices */
    showLabel?: boolean;

    /** Wrapper container styles */
    containerStyle?: React.CSSProperties;
}

/**
 * Generic reusable Pie Chart component
 *
 * Fully typed and customizable for all pie/donut chart use cases.
 */
const PieChartGeneric: React.FC<PieChartGenericProps> = ({
    data,
    dataKey,
    nameKey = 'name',
    colors = [],
    innerRadius = 60,
    outerRadius = 90,
    paddingAngle = 2,
    cornerRadius = 3,
    customTooltip,
    customLegend,
    showLabel = false,
    containerStyle = { width: '100%', height: 280 }
}) => {
    const fallbackColors = [
        '#52C41A',
        '#FAAD14',
        '#00FFF0',
        '#FF00D6',
        '#1677FF',
        '#AB84E1',
        '#F5222D',
        '#FF6F61',
        '#7A57D1',
        '#20C997'
    ];

    const getColor = (index: number): string =>
        colors[index] || data[index]?.color || fallbackColors[index % fallbackColors.length];

    return (
        <div style={containerStyle}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey as string}
                        nameKey={nameKey as string}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        paddingAngle={paddingAngle}
                        cornerRadius={cornerRadius}
                        label={
                            showLabel
                                ? ({ percent }) =>
                                    percent && percent * 100 >= 1
                                        ? `${(percent * 100).toFixed(1)}%`
                                        : ''
                                : undefined
                        }
                        labelLine={false}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getColor(index)}
                                stroke="transparent"
                            />
                        ))}
                    </Pie>

                    {/* Tooltip */}
                    {customTooltip ? (
                        <Tooltip content={customTooltip as any} />
                    ) : (
                        <Tooltip />
                    )}

                    {/* Legend */}
                    {customLegend ? (
                        <Legend content={customLegend as any} />
                    ) : (
                        <Legend />
                    )}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};


export {PieChartGeneric}
/** Export all useful types for reuse */
export type {
    PieChartItem as TPieChartItem,
    PieChartGenericProps as TPieChartGenericProps
};
