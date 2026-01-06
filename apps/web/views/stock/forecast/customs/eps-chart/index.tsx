'use client';
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    TooltipProps
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@finranks/design-system/components/select';
import { formatToMillion } from '@finranks/design-system/lib/utils';
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';

// Assuming helpers is typed or has a declaration file


interface EpsDataPoint {
    period: string;
    year?: string;
    estimate: number;
    reported: number;
    [key: string]: any;
}

interface EpsChartProps {
    data: {
        annual: { eps: EpsDataPoint[] };
        quarterly: { eps: EpsDataPoint[] };
    };
}

type SelectOption = { value: 'annual' | 'quarterly'; label: string };

const EpsChart: React.FC<EpsChartProps> = ({ data }) => {
    const [selectValue, setSelectValue] = useState<SelectOption>({ value: 'annual', label: "Annual" });
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const chartData = data[selectValue.value].eps;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const chartHeight = isMobile ? 280 : 345;
    const chartMargin = isMobile
        ? { top: 0, right: 0, left: -30, bottom: 10 }
        : { top: 0, right: 0, left: -30, bottom: 20 };

    return (
        <Card className='rounded-xl'>
            <div className='flex justify-between items-center mb-6'>
                <Typography variant="h2" className="text-[20px]!" weight="semibold">EPS</Typography>
                <div>
                    <Select onValueChange={(e: any) => setSelectValue({ value: e, label: e })}>
                        <SelectTrigger className="w-[180px]" defaultValue="Annual">
                            <SelectValue placeholder="Select" className='text-white' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="annual">Annual</SelectItem>
                            <SelectItem value="quarterly">Quarteryl</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ResponsiveContainer width='100%' height={chartHeight}>
                <BarChart
                    data={chartData.slice().reverse()}
                    margin={chartMargin}
                >
                    <CartesianGrid
                        strokeDasharray='3 0'
                        horizontal={true}
                        vertical={false}
                        fill='transparent'
                        stroke={'#292534'}
                    />
                    <XAxis
                        dataKey='period'
                        orientation='bottom'
                        tickLine={false}
                        tick={<CustomizedAxisTick />}
                        interval={0}
                        axisLine={false}
                    />
                    <YAxis
                        fontSize={8}
                        tickLine={false}
                        tickCount={8}
                        tickFormatter={(val: number) => formatToMillion(val)}
                        axisLine={false}
                    />
                    <Tooltip
                        content={<CustomTooltip titleKey='year' />}
                        cursor={<BGHighlighter numOfData={chartData.length} />}
                    />
                    <Legend content={<CustomLegend />} />
                    <Bar dataKey='estimate' fill='var(--primary-graph-color, #6366f1)' radius={3.6} barSize={18} />
                    <Bar
                        dataKey='reported'
                        fill='var(--secondary-graph-color, #a5b4fc)'
                        radius={3.6}
                        barSize={18}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default EpsChart;

/** --- SUB-COMPONENTS --- **/

interface TickProps {
    x?: number;
    y?: number;
    payload?: any;
    customYOffset?: number;
    customXOffset?: number;
    suffix?: string;
    prefix?: string;
    fillBlack?: boolean;
}

const CustomizedAxisTick: React.FC<TickProps> = (props) => {
    const { x, y, payload, customYOffset, customXOffset, suffix, prefix, fillBlack } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={customXOffset || 0}
                y={0}
                dy={Number.isFinite(customYOffset) ? customYOffset : 24}
                fill={fillBlack ? '#000000' : '#8D9092'}
                textAnchor='middle'
                style={{ fontSize: '10px', lineHeight: '13px' }}
            >
                {prefix || ''}{payload.value}{suffix || ''}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload, }: TooltipProps<number, string> & { titleKey?: string }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex flex-col gap-1">
                {payload.map((item, i) => {
                    const formatValue = item.value ? formatToMillion(item.value) : '0';
                    return (
                        <div key={i} className="flex items-center gap-2 text-[13px]">
                            <div style={{ background: item.color }} className="w-2 h-2 rounded-full" />
                            <span className='text-black'>{item.dataKey === 'reported' ? "Reported" : "Estimate"}: {formatValue}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface BGHighlighterProps {
    height?: number;
    width?: number;
    points?: any[];
    numOfData?: number;
    x?: number;
}

const BGHighlighter: React.FC<BGHighlighterProps> = (props) => {
    const { height = 0, width: graphWidth = 0, points, numOfData = 1, x } = props;
    const width = points ? graphWidth / numOfData : graphWidth;
    const xCoord = points ? points[0].x - width / 2 : x;
    return (
        <rect
            x={xCoord}
            y={0}
            rx='10.5'
            ry='10.5'
            width={width}
            height={height + 13}
            opacity='0.2'
            fill='#DCDBFC'
        />
    );
};

const CustomLegend = ({ payload }: any) => {
    if (!payload) return null;
    return (
        <div className='flex flex-wrap gap-4 mt-5 ml-8'>
            {payload.map((item: any, i: number) => (
                <div className='flex items-center gap-2' key={i}>
                    <span className='w-3 h-3 rounded-xs' style={{ backgroundColor: item.color }}></span>
                    <span className='text-xs text-white capitalize'>
                        {item.value === 'estimate' ? "Estimate" : 'Reported'}
                    </span>
                </div>
            ))}
        </div>
    );
};