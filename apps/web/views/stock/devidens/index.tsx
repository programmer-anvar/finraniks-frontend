import React from 'react'
import DividendYearChart from './customs/chart'
import DividendYieldCard from './customs/card'
import { getDividends } from '@/services/stock-devidens';
import { get } from 'lodash';
import HistoryTable from './customs/history-table';

const DevidensPage = async ({ params }: { params: any }) => {
    const { slug } = await params
    const { data } = await getDividends(slug);
    const info = get(data, 'info.data')
    const yield_history = get(data, 'yield_history.data')
    const dividend_history = get(data, 'dividend_history.data');

    return (
        <div className='space-y-4'>
            <div className='grid grid-cols-[1fr_2fr] gap-4'>
                <DividendYieldCard data={info} />
                <DividendYearChart data={yield_history} />
            </div>
            <HistoryTable data={dividend_history} />
        </div>
    )
}

export default DevidensPage