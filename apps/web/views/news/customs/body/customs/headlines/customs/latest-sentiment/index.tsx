'use client'
import { Typography } from '@finranks/design-system/components/typography';
import { ResponsiveBar } from '@nivo/bar';




const SentimentTooltip = ({ indexValue, data }: any) => {
    return (
        <div className="min-w-[180px] rounded-lg bg-white px-3 py-2 text-sm shadow-xl">
            <div className="mb-2 font-semibold text-gray-900">
                {indexValue}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span>Positive count:</span>
                <span className="ml-auto font-semibold">{data.positive}</span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-gray-700">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span>Negative count:</span>
                <span className="ml-auto font-semibold">{data.negative}</span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-gray-700">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span>Neutral count:</span>
                <span className="ml-auto font-semibold">{data.neutral}</span>
            </div>
        </div>
    );
};

const LatestSentiment = ({ sentiments }: { sentiments: any }) => {
    return (
        <div className='h-[440px] pb-8'>
            <Typography variant="h3" color="primary" weight="bold">Latest news sentiment</Typography>
            <ResponsiveBar
                data={sentiments}
                keys={["positive_count", "negative_count", "neutral_count"]}
                indexBy="date"
                margin={{ top: 40, right: 40, bottom: 60, left: 60 }}
                padding={0.3}
                groupMode="stacked"
                colors={["#52C41A", "#FF4D4F", "#FADB14"]}
                borderRadius={4}
                enableLabel={true}
                tooltip={SentimentTooltip}
                labelSkipHeight={12}
                labelTextColor="#ffffff"
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 12,
                    tickRotation: 0,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 10,
                }}
                gridYValues={5}
                theme={{
                    background: "transparent",
                    axis: {
                        ticks: {
                            text: {
                                fill: "#9CA3AF",
                                fontSize: 12,
                            },
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#1F2937",
                            strokeWidth: 1,
                        },
                    },
                    legends: {
                        text: {
                            fill: "#E5E7EB",
                        },
                    },
                    labels: {
                        text: {
                            fontWeight: 600,
                        },
                    },
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom",
                        direction: "row",
                        translateY: 60,
                        itemWidth: 140,
                        itemHeight: 20,
                        symbolSize: 14,
                        itemTextColor: "#E5E7EB",
                    },
                ]}
            />
        </div>
    )
}

export default LatestSentiment