'use client'

import React, { useMemo } from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import get from 'lodash/get'
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'

/* -------------------------------------------------------------------------- */
/* Utils */
/* -------------------------------------------------------------------------- */

const roundToNiceNumber = (value: number, roundUp = true) => {
    const abs = Math.abs(value)
    if (abs < 10) return roundUp ? Math.ceil(value / 5) * 5 : Math.floor(value / 5) * 5
    if (abs < 50) return roundUp ? Math.ceil(value / 10) * 10 : Math.floor(value / 10) * 10
    return roundUp ? Math.ceil(value / 20) * 20 : Math.floor(value / 20) * 20
}

const calculateYDomain = (data: any[]) => {
    const values = data
        .flatMap(d => [d.Company, d.Industry])
        .filter(v => typeof v === 'number')

    if (!values.length) return [0, 10]

    const max = Math.max(...values, 0)
    const min = Math.min(...values, 0)
    const paddedMax = roundToNiceNumber(max * 1.1, true)

    if (min < 0) {
        const paddedMin = roundToNiceNumber(min * 1.1, false)
        return paddedMin > -10 ? [-10, paddedMax] : [paddedMin, paddedMax]
    }

    return [0, paddedMax]
}

/* -------------------------------------------------------------------------- */
/* Component */
/* -------------------------------------------------------------------------- */

const GrowthRate = ({ data }: { data: any }) => {
    const chartData = useMemo(() => {
        return get(data, 'annual', [])
            .slice()
            .sort((a: any, b: any) => a.year - b.year)
            .map((item: any) => ({
                year: item.year,
                Company: get(item, 'company.revenue_growth', 0),
                Industry: get(item, 'industry.revenue_growth', 0),
                industryCompanyCount: get(item, 'industry.companies', 0),
            }))
    }, [data])

    const yDomain = useMemo(() => calculateYDomain(chartData), [chartData])

    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            <div className="flex items-center justify-between">
                <Typography variant="h4">Revenue Growth Rate vs. Industry</Typography>
            </div>

            <ResponsiveContainer width="100%" height={338}>
                <BarChart
                    data={chartData}
                    margin={{ top: 0, right: 8, left: -24, bottom: 20 }}
                >
                    <CartesianGrid vertical={false} stroke="#292534" strokeDasharray="3 0" />

                    <XAxis
                        dataKey="year"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#8D9092", fontSize: 10 }}

                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickCount={8}
                        domain={yDomain}
                        tickFormatter={v => `${v}`}
                        stroke="#FFFFFF"
                        tick={{ fill: "#8D9092", fontSize: 10 }}
                    />

                    <ReferenceLine y={0} stroke="#4D4AAA" strokeWidth={1.5} />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={<BGHighlighter numOfData={chartData.length} />}
                    />

                    <Legend content={<CustomLegend chartData={chartData} />} />

                    <Bar
                        dataKey="Company"
                        fill="#6366F1" // Tailwind Indigo 500
                        barSize={18}
                        radius={[4, 4, 0, 0]}
                        minPointSize={6}
                        isAnimationActive={false}
                    />

                    <Bar
                        dataKey="Industry"
                        fill="#14B8A6" // Tailwind Teal 500
                        barSize={18}
                        radius={[4, 4, 0, 0]}
                        minPointSize={6}
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default GrowthRate

/* -------------------------------------------------------------------------- */
/* Subcomponents */
/* -------------------------------------------------------------------------- */

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    const industryCompanyCount = payload[0]?.payload?.industryCompanyCount ?? 0

    return (
        <div className="bg-[#1D1A2F] border border-[#383838] p-3 rounded-md text-white text-sm max-w-[220px] space-y-1">
            <div className="font-semibold">{`Year: ${label}`}</div>
            {payload.map((entry: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm">
                        {entry.dataKey === 'Industry'
                            ? `Industry (${industryCompanyCount} companies)`
                            : entry.dataKey}
                        : <b>{entry.value.toFixed(2)}%</b>
                    </span>
                </div>
            ))}
        </div>
    )
}



const BGHighlighter = ({ height, width, points, numOfData = 1, x }: any) => {
    const barWidth = points ? width / numOfData : width
    const xCoord = points ? points[0].x - barWidth / 2 : x

    return (
        <rect
            x={xCoord}
            y={-10}
            width={barWidth}
            height={height + 13}
            rx={10}
            ry={10}
            className="fill-[#DCDBFC] opacity-20"
        />
    )
}

const CustomLegend = ({ payload, chartData }: any) => {
    if (!payload?.length) return null
    const latest = chartData?.[chartData.length - 1]
    const industryCompanyCount = latest?.industryCompanyCount ?? 0

    return (
        <div className="flex flex-wrap mt-4 ml-8 gap-4">
            {payload.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-white">
                        {item.value === 'Industry'
                            ? `Industry (${industryCompanyCount} companies)`
                            : item.value}
                    </span>
                </div>
            ))}
        </div>
    )
}
