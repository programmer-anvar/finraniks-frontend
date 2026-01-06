import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import React from 'react';
import PriceCard from './customs/price-card';
import { getForecast } from '@/services/stock-forecast';
import { get } from 'lodash';
import MainChart from './customs/chart';
import LatestForecast from './customs/latest-forecast';
import EpsChart from './customs/eps-chart';
import RevenueChart from './customs/revenue-chart';

const ForecastPage = async ({ params }: { params: any }) => {
    const { slug } = await params;
    const { data } = await getForecast(slug);
    return (
        <div className='space-y-4'>
            <Typography variant="h2" className="text-[24px]!" weight="semibold">Stock Forecast</Typography>

            <Card className='p-6 grid grid-cols-[1fr_2fr] gap-6 rounded-xl'>
                <PriceCard data={get(data, 'ratings.data')} />
                <MainChart data={get(data, 'ratings.data')} prices={get(data, 'ratings.prices', [])} />
            </Card>
            <LatestForecast data={get(data, 'performance.data')} />
            <EpsChart data={get(data, 'earnings.data')} />
            <RevenueChart data={get(data, 'earnings.data')} />
        </div>
    )
}

export default ForecastPage