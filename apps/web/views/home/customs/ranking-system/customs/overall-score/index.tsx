import { Typography } from '@finranks/design-system/components/typography'
import React from 'react';

const metricData = [
    {
        iconPath: "/images/homeIcon1.svg",
        subtitle: "Financial Strength",
        text: "Measures how stable and debt-resilient a company is",
    },
    {
        iconPath: "/images/homeIcon2.svg",
        subtitle: "Profitability",
        text: "Shows how efficiently a company turns revenue into profit and cash",
    },
    {
        iconPath: "/images/homeIcon3.svg",
        subtitle: "Effectiveness",
        text: "Evaluates how well a company uses its assets, capital, and equity to generate returns",
    },
    {
        iconPath: "/images/homeIcon4.svg",
        subtitle: "Growth",
        text: "Tracks how consistently the company is increasing its revenue, profits, and cash flow",
    },
    {
        iconPath: "/images/homeIcon1.svg",
        subtitle: "Forecast",
        text: "Summarizes analyst expectations, earnings estimates, and future outlook",
    },
    {
        iconPath: "/images/homeIcon2.svg",
        subtitle: "Valuation",
        text: "Compares the stock's price to its actual worth using ratios and DCF models",
    },
    {
        iconPath: "/images/homeIcon3.svg",
        subtitle: "Dividend",
        text: "Assesses dividend yield, payout safety, and consistency for income-focused investors",
    },
    {
        iconPath: "/images/homeIcon4.svg",
        subtitle: "Economic Moat",
        text: "Measures how strong and sustainable the company's competitive advantage",
    },
];

const OverallScore = () => {
    return (
        <div className='space-y-6 home-card --mini'>
            <Typography variant="h3" className='text-[18px] md:text-inherit'>8 categories</Typography>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-6 pb-3 md:pb-0'>
                {
                    metricData?.map((e) => {
                        return (
                            <div key={e.text} className="grid grid-cols-[35px_auto] gap-4 items-start relative">
                                <div className="size-10! bg_gradient rounded-md flex items-center justify-center mt-1">
                                    <img src={e.iconPath} alt="" className='size-5' />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Typography variant="body" className='text-base' color="primary">{e.subtitle}</Typography>
                                    <Typography variant="small" className='text-sm' color="secondary" truncate={{ lines: 2 }}>{e.text}</Typography>
                                </div>
                                <span className="absolute w-full h-px bg-muted-foreground/15 -bottom-3"></span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OverallScore