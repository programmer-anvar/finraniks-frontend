import { Card } from '@finranks/design-system/components/card'
import { TradeChart } from '@finranks/design-system/components/charts';
import { memo } from 'react';

const TradeChartComponent = memo(({ slug }: { slug: string }) => {
    return (
        <Card className='space-y-4 rounded-[20px] p-4 md:p-6'>
            <TradeChart slug={slug} height={600} />
        </Card>
    )
})

export default TradeChartComponent