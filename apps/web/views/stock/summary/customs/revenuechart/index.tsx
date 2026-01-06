"use client"
import { Card } from '@finranks/design-system/components/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@finranks/design-system/components/hover-card';
import { Typography } from '@finranks/design-system/components/typography';
import { cn } from '@finranks/design-system/lib/utils';
import { ResponsivePie } from '@nivo/pie';
import { get } from 'lodash';
import { memo } from 'react';

interface RevenueData {
    id: string;
    label: string;
    value: number;
    color: string;
}

// --- Start: Your Data ---
interface BackendRevenueItem {
    name: string;
    value: number;   // absolute value
    percent: number; // percentage for pie
}

interface PieDataItem {
    id: string;
    label: string;
    value: number;
    color?: string;
}


interface LegendItem {
    id: string;
    label: string;
    value: number;
    color?: string;
}

interface RevenueLegendProps {
    data: LegendItem[];
}

const pieColors = [
    '#36A2EB', // Blue
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FFCE56', // Soft Yellow
    '#FF9F40', // Orange (no red)
    '#2ECC71', // Green
    '#1ABC9C', // Aqua
    '#5DADE2', // Light Blue
];

const RevenueLegend = ({ data }: RevenueLegendProps) => {
    const visible = data.slice(0, 3);
    const hidden = data.slice(3);

    return (
        <div className={cn("absolute -bottom-8 z-20", {
            "bottom-1": visible.length <= 3
        })}>
            {/* Visible legends */}
            <div className="space-y-2">
                {visible.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-2 text-[12px] text-white"
                    >
                        <span
                            className="size-3 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate">
                            {item.label} / {item.value.toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>

            {/* See more */}
            {hidden.length > 0 && (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <button className="mt-2 text-sm text-primary underline">
                            See more
                        </button>
                    </HoverCardTrigger>

                    <HoverCardContent className="w-84 bg-(--color-bg)">
                        <div className="space-y-2">
                            {hidden.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <span
                                        className="size-3 rounded-full shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="truncate">
                                        {item.label} / {item.value.toFixed(2)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )}
        </div>
    );
};



const CustomRevenueTooltip = ({ datum }: { datum: RevenueData }) => {
    return (
        <div className='p-2 rounded-md bg-white'>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                {/* Color swatch */}
                <span
                    style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: datum.color,
                        marginRight: '8px',
                    }}
                />
                {/* Segment Name (Label) */}
                <strong style={{ fontWeight: '600' }} className='whitespace-nowrap text-black text-sm'>{datum.label}</strong>
            </div>
            {/* Value (Percentage) */}
            <div style={{ marginLeft: '18px', opacity: 0.9 }} className='text-black text-xs whitespace-nowrap'>
                Value: {datum?.value?.toFixed(1)}%
            </div>
        </div>
    );
};

const RevenueChart = memo(({ revenue }: any) => {
    const rawData: BackendRevenueItem[] = get(revenue, 'revenues', []).filter((rev: { name: string }) => rev.name !== 'Total');

    const chartData: PieDataItem[] = rawData?.map((item, i) => ({
        id: item?.name,
        label: item?.name,
        value: item?.percent,
        color: pieColors[i % pieColors.length],
    }));



    if (!chartData.length) {
        return (
            <Card className='w-full rounded-[20px] p-4 md:p-6'>
                <Typography variant="h4" as="h2" className='pb-0'>Revenue Breakdown</Typography>
                <div className='w-full h-100 flex items-center justify-center flex-col'>
                    <Typography variant="body" as="h2" color='helper' className='pb-0'>No Data</Typography>
                    <Typography variant="small" as="p" color='helper' className='pb-0' align='center'>Revenue breakdown data has not been calculated yet.</Typography>
                </div>
            </Card>
        )
    };


    return (
        <Card className='w-full rounded-[20px] p-4 md:p-6'>
            <Typography variant="h4" as="h2" className='pb-0'>Revenue Breakdown</Typography>
            <div className='w-full h-100 relative'>
                <ResponsivePie
                    data={chartData}
                    margin={{ top: 40, right: 55, bottom: 80, left: 75 }}
                    startAngle={-180}
                    innerRadius={0.65}
                    padAngle={1}
                    tooltip={CustomRevenueTooltip as any}
                    cornerRadius={7}
                    defaultHeight={600}
                    activeOuterRadiusOffset={8}
                    arcLinkLabelsSkipAngle={999}
                    arcLinkLabelsTextColor="#ffffff"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={0}
                    arcLabel={(e) => (e.value >= 4 ? `${e.value.toFixed(2)}%` : "")}
                    colors={(datum) => datum.data.color ?? '#000000'}
                    arcLabelsTextColor="#ffffff"
                    enableArcLabels={true}
                    enableArcLinkLabels={false}
                    layers={[
                        "arcs",
                        "arcLabels",
                        "arcLinkLabels"
                    ]}
                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'column',
                            translateY: 50,
                            translateX: -100,
                            itemWidth: 100,
                            itemHeight: 20,
                            symbolShape: 'square',
                            itemTextColor: '#ffffff',

                        }
                    ]}
                />
                <RevenueLegend data={chartData} />
            </div>
        </Card>
    )
})

export default RevenueChart