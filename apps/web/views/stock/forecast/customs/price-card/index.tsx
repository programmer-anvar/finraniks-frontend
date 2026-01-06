"use client"
import { GenericGaugeChart } from "@finranks/design-system/components/charts"
import { Typography } from "@finranks/design-system/components/typography";
import { get } from "lodash";



const arr = [
    { "key": "sell", "label": "Sell", "value": 1 },
    { "key": "underweight", "label": "Underweight", "value": 3 },
    { "key": "underperform", "label": "Underperform", "value": 4 },
    { "key": "hold", "label": "Hold", "value": 5 },
    { "key": "neutral", "label": "Neutral", "value": 5 },
    { "key": "equal_weight", "label": "Equal-Weight", "value": 5 },
    { "key": "market_perform", "label": "Market Perform", "value": 5 },
    { "key": "buy", "label": "Buy", "value": 7 },
    { "key": "accumulate", "label": "Accumulate", "value": 8 },
    { "key": "overweight", "label": "Overweight", "value": 8 },
    { "key": "outperform", "label": "Outperform", "value": 9 },
    { "key": "market_outperform", "label": "Market Outperform", "value": 9 },
    { "key": "strong_buy", "label": "Strong Buy", "value": 10 }
]

const PriceCard = ({ data }: { data: any }) => {
    const consensus_rating = get(data, 'consensus_rating', '');
    const percent = consensus_rating ? arr.find(a => a.label === consensus_rating) : null;

    return (
        <div className="space-y-4 border-r pr-4">
            <Typography variant="h2" className="text-[20px]!" weight="semibold">Stock Price Forecast</Typography>
            <Typography variant="body" className="text-[14px]!">NVIDIA Corporation has a consensus price target of $254.92 based on the ratings of 36 analysts. The high is $352.00 issued by Evercore ISI Group on November 20, 2025. The low is $165.00 issued by Raymond James on May 29, 2025. The 3 most-recent analyst ratings were released by Morgan Stanley, Citigroup, and Barclays on December 1, 2025, respectively. The average target predicts a increase of 39.45% from the current stock price of $182.80.t</Typography>

            <div>
                <GenericGaugeChart marginInPercent={0}
                    textColor='#000'
                    percent={percent ? percent.value / 10 : 0}
                    cornerRadius={10}
                    nrOfLevels={5}
                    hideText
                    arcPadding={0.01}
                    needleBaseColor='#746FF2' colors={["#006B3D", "#3CDA73", "#FFCA2D", "#FF7A49", "#D3212C"]} />
                <div className='flex items-center justify-center mt-10 text-white'>
                    Analyst Consensus: {consensus_rating}
                </div>
            </div>
        </div>
    )
}

export default PriceCard