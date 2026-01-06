"use client"
import { Card } from '@finranks/design-system/components/card'
import { get } from 'lodash'

const DividendYieldCard = (data: any) => {
    return (
        <Card className='p-6 rounded-xl'>
            <div className='main-box space-y-4'>
                <div className='flex flex-col'>
                    <div className='text-sm'>Years of dividend increase</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.years_of_growth.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>Ex-dividend date</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.ex_dividend_date.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>Dividend yield</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.yield.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>Payout ratio</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.payout_ratio.formatted')}</div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm'>Dividend frequency</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.frequency.formatted')}</div>
                </div>
                <div className=''>
                    <div className='text-sm'>Annual dividend</div>
                    <div className='text-xl text-white font-semibold'>{get(data, 'data.annual_rate.formatted')}</div>
                </div>
            </div>
        </Card>
    )
}

export default DividendYieldCard