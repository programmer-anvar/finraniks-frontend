"use client"
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';
import { ResponsiveRadar } from '@nivo/radar';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useMemo, useState } from 'react';

const CATEGORIES = [
    "Financial Strength",
    "Profitability",
    "Effectiveness",
    "Growth",
    "Forecast",
    "Valuation",
    "Dividend",
    "Economic Moat",
];

const generateData = () => [
    {
        id: "Score",
        data: CATEGORIES.map((key) => ({
            category: key,
            value: Math.floor(Math.random() * 80) + 20, // 20–100
        })),
    },
];
const OctagonView = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [data, setData] = useState(generateData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(generateData());
        }, 5000); // animate every 2s

        return () => clearInterval(interval);
    }, []);

    const getChartMargins = useMemo(() => {
        return isMobile
            ? { top: 20, right: 87, bottom: 20, left: 65 }
            : { top: 30, right: 86, bottom: 30, left: 72 };
    }, [isMobile]);


    return (
        <div className='space-y-6 home-card --mini'>
            <Typography variant="h3" className='text-[18px] md:text-inherit'>Octagon View</Typography>
            <div className='h-[380px]'>
                <ResponsiveRadar
                    data={data[0].data}
                    keys={["value"]}
                    indexBy="category"
                    maxValue={100}
                    margin={getChartMargins}

                    curve="linearClosed"

                    /* 🎯 Grid */
                    gridLevels={5}
                    gridShape="circular"
                    gridLabelOffset={16}

                    /* 🟣 Radar shape */
                    colors={["#a855f7"]}
                    fillOpacity={0.35}
                    borderWidth={2}
                    borderColor="#c084fc"
                    dotSize={6}
                    dotColor="#e9d5ff"
                    dotBorderWidth={0}
                    enableDotLabel={false}

                    /* 🧊 Labels */

                    /* ❌ Tooltips */
                    isInteractive={false}

                    /* ✨ Animation */
                    animate={true}
                    motionConfig="wobbly"

                    /* 🧹 Legends off */
                    legends={[]}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: "rgba(168, 85, 247, 0.45)", // purple bones
                                    strokeWidth: 1,
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: "rgba(168, 85, 247, 0.35)",
                                },
                                text: {
                                    fill: "rgba(255, 255, 255, 0.8)", // ⬅️ soft white labels
                                    fontSize: 12,
                                    fontWeight: 500,
                                },
                            },
                        },
                        grid: {
                            line: {
                                stroke: "rgba(168, 85, 247, 0.35)",
                                strokeWidth: 1,
                            },
                        },
                        labels: {
                            text: {
                                fill: "rgba(255, 255, 255, 0.85)", // category labels
                                fontSize: 13,
                                fontWeight: 500,
                            },
                        },
                    }}


                />
            </div>
        </div>
    )
}

export default OctagonView