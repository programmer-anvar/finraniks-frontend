import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { convertToReadable } from '@finranks/design-system/lib/utils';
import { get } from 'lodash';
import { memo } from 'react';




const StockDetails = memo(({ overview }: any) => {
    const OVERVIEW_FACTS = [
        {
            label: "Previous close",
            value: get(overview, 'previousClose', "N/A") ?? "N/A",
        },
        {
            label: "Day's range",
            value: get(overview, 'dayRange', "N/A") ?? "N/A",
        },
        {
            label: "52-week range",
            value: get(overview, '52weekRange', "N/A") ?? "N/A",
        },
        {
            label: "Volume",
            value: convertToReadable({ number: get(overview, 'volume', 0) ?? 0 }) ?? "N/A",
        },
        {
            label: "Average volume",
            value: convertToReadable({ number: get(overview, 'averageVolume', 0) }) ?? "N/A",
        },
        {
            label: "Beta",
            value: get(overview, 'beta', "N/A") ?? "N/A",
        },
        {
            label: "EPS (TTM)",
            value: get(overview, 'EPSTTM', "N/A") ?? "N/A",
        },
        {
            label: "PE ratio (TTM)",
            value: get(overview, 'PEratioTTM', "N/A") ?? "N/A",
        },
        {
            label: "Market cap",
            value: convertToReadable({ number: get(overview, 'marketCap', 0) }) ?? "N/A",
        },
        {
            label: "Shares outstanding",
            value: convertToReadable({ number: get(overview, 'sharesOutstanding', 0) }) ?? "N/A",
        },
        {
            label: "Dividend yield",
            value: get(overview, 'dividendYield', 'N/A') ?? "N/A",
        },
        {
            label: "Next earnings date",
            value: get(overview, 'nextEarningsDate', 'N/A') ?? "N/A",
        },
        {
            label: "Sector",
            value: get(overview, 'sector', 'N/A') ?? "N/A",
        },
        {
            label: "Industry",
            value: get(overview, 'industry', 'N/A') ?? "N/A",
        },
    ];
    return (
        <Card className='space-y-4 rounded-[20px] p-4 md:p-6'>
            <Typography variant='h4'>Stock details</Typography>
            <dl className="space-y-2">
                {OVERVIEW_FACTS.map(({ label, value }) => (
                    <div
                        key={label}
                        className="flex items-center justify-between border-b  border-[#ffffff33]"
                    >
                        <dt className="text-[14px] text-white">{label}</dt>
                        <dd className="font-semibold text-white text-right text-[14px]">{value}</dd>
                    </div>
                ))}
            </dl>
        </Card>
    )
})

export default StockDetails