'use client';
import { GenericGaugeChart } from '@finranks/design-system/components/charts';
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';

const calcFairPercent = ({ fairValue, stockPrice }: { fairValue: number; stockPrice: number }) => {
    const diffPercent = (stockPrice - fairValue) / fairValue;

    const percGroup =
        diffPercent < -0.3
            ? 'dark-green'
            : diffPercent >= -0.3 && diffPercent < -0.1
                ? 'green'
                : diffPercent >= -0.1 && diffPercent <= 0.1
                    ? 'yellow'
                    : diffPercent > 0.1 && diffPercent <= 0.3
                        ? 'orange'
                        : diffPercent > 0.3
                            ? 'red'
                            : '';

    let chartPerc = 1;

    switch (percGroup) {
        case 'dark-green':
            chartPerc += (diffPercent + 0.3) * (4 / 7) - 0.6;
            break;
        case 'green':
            chartPerc += (diffPercent + 0.1) * 2 - 0.2;
            break;
        case 'yellow':
            chartPerc += diffPercent * 2;
            break;
        case 'orange':
            chartPerc += (diffPercent - 0.1) * 2 + 0.2;
            break;
        case 'red':
            chartPerc += (diffPercent - 0.3) * (4 / 7) + 0.6;
            break;
    }

    const truePerc = chartPerc / 2;
    return truePerc < 0 ? 0 : truePerc > 1 ? 1 : truePerc;
};

const FairValue = ({ data }: { data: any }) => {
    const fairValue = parseFloat(data?.fairValue || '') || 1;
    const stockPrice = parseFloat(data?.stockPrice || '');

    const percent = calcFairPercent({ fairValue, stockPrice });

    if (!data || !fairValue || !stockPrice) {
        return (
            <Card className="rounded-[20px] p-4 md:p-6 space-y-4">
                <Typography variant="h4">Fair Value</Typography>
                <div className='w-full h-100 flex items-center justify-center flex-col'>
                    <Typography variant="body" as="h2" color='helper' className='pb-0'>Data not available.</Typography>
                    <Typography variant="small" as="p" color='helper' className='pb-0'>Fair Value data has not been calculated yet.</Typography>
                </div>
            </Card>
        )
    }

    return (
        <Card className="rounded-[20px] p-4 md:p-6 space-y-4">
            <Typography variant="h4">Fair Value</Typography>

            {/* Fair Value */}
            <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500">Fair value</span>
                <h3 className="mt-1 text-xl font-semibold text-white">
                    ${fairValue}
                </h3>

                {/* Arrow */}
                <div className="my-2">
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.13397 0.5C7.51887 -0.166666 8.48112 -0.166667 8.86602 0.5L15.7942 12.5C16.1791 13.1667 15.698 14 14.9282 14L1.0718 14C0.301996 14 -0.179129 13.1667 0.205771 12.5L7.13397 0.5Z"
                            fill="#746FF2"
                        />
                    </svg>
                </div>
            </div>

            {/* Gauge */}
            <div className="mb-2">
                <GenericGaugeChart
                    marginInPercent={0}
                    percent={percent}
                    cornerRadius={10}
                    nrOfLevels={5}
                    arcPadding={0.01}
                    arcWidth={0.35}
                    needleColor="#746FF2"
                    needleBaseColor="#746FF2"
                    hideText
                    colors={['#006B3D', '#3CDA73', '#FFCA2D', '#FF7A49', '#D3212C']}
                />
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs text-gray-500">
                <span>Undervalued</span>
                <span>Stock price</span>
                <span>Overvalued</span>
            </div>

            {/* Stock Price */}
            <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold text-white">
                    ${stockPrice}
                </h3>
            </div>
        </Card>
    );
};

export default FairValue;
