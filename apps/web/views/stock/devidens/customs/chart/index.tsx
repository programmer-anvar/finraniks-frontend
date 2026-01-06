"use client"
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';
import { ResponsiveLine } from '@nivo/line'
type RawItem = {
    period: string
    value: number
}

type RawYear = {
    year: number
    data: RawItem[]
}

export const formatDividendYieldData = (raw: RawYear[]) => {
    return [
        {
            id: "Dividend Yield",
            data: raw
                .flatMap(yearItem =>
                    yearItem.data.map(item => ({
                        x: `${item.period} ${yearItem.year}`,
                        y: item.value,
                    }))
                )
                // Optional: ensure correct order
                .sort((a, b) => {
                    const [qA, yA] = a.x.split(" ")
                    const [qB, yB] = b.x.split(" ")
                    return Number(yA) - Number(yB) || qA.localeCompare(qB)
                }),
        },
    ]
}
const DividendYearChart = ({ data }: { data: any }) => {
    const nivoData = formatDividendYieldData(data)
    return (
        <Card className='p-6 h-[440px] rounded-xl'>
            <Typography variant="h2" className="text-[18px]" weight="semibold">Dividend yield over time</Typography>
            <ResponsiveLine
                data={nivoData}
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}

                /* Line & curve */
                curve="monotoneX"
                lineWidth={2}
                colors={['#5ec2ff']}

                /* Area */

                enableArea
                areaOpacity={0.25}
                areaBaselineValue={0}
                defs={[
                    {
                        id: 'areaGradient',
                        type: 'linearGradient',
                        colors: [
                            { offset: 0, color: '#5ec2ff', opacity: 0.4 },
                            { offset: 100, color: '#5ec2ff', opacity: 0 },
                        ],
                    },
                ]}
                fill={[{ match: '*', id: 'areaGradient' }]}

                /* Points */
                pointSize={8}
                pointColor="#0b0620"
                pointBorderWidth={2}
                pointBorderColor="#5ec2ff"

                /* Axes */
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 12,
                    tickRotation: 0,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 10,
                    format: value => `${(value * 100).toFixed(2)}%`,
                }}

                /* Grid */
                enableGridX
                enableGridY
                gridYValues={4}
                theme={{
                    text: {
                        fill: '#9ca3af',
                        fontSize: 12,
                    },
                    grid: {
                        line: {
                            stroke: '#ffffff14',
                            strokeWidth: 1,
                        },
                    },
                    tooltip: {
                        container: {
                            background: '#ffffff',
                            color: '#111',
                            borderRadius: 8,
                            fontSize: 12,
                        },
                    },
                }}

                /* Tooltip */
                tooltip={({ point }) => (
                    <div className="rounded-md bg-white px-3 py-2 shadow">
                        <div className="text-xs text-gray-500">
                            {point.data.xFormatted}
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-black">
                            <span className="h-2 w-2 rounded-full bg-[#5ec2ff]" />
                            {(Number(point.data.y) * 100).toFixed(2)}%
                        </div>
                    </div>
                )}

                /* Interaction */
                useMesh
                enableSlices={false}

                /* Misc */
                enablePoints
                enableCrosshair={false}
                legends={[]}
            />
        </Card>
    )
}

export default DividendYearChart