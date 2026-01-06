import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'

const Widgets = ({ data }: any) => {
    return (
        <div className='space-y-4'>
            <Card className='p-6 rounded-xl space-y-4'>
                <Typography variant="h2" className="text-[20px]!" weight="semibold">{data?.name}</Typography>

                <div className='space-y-4'>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Country</span>
                        <span className='text-white text-sm font-semibold'>{data.country}</span>
                    </div>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Industry</span>
                        <span className='text-white text-sm font-semibold'>{data.industry}</span>
                    </div>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Sector</span>
                        <span className='text-white text-sm font-semibold'>{data.sector}</span>
                    </div>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>IPO Date</span>
                        <span className='text-white text-sm font-semibold'>{data.ipoDate}</span>
                    </div>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>CEO</span>
                        <span className='text-white text-sm font-semibold'>{data.ceo}</span>
                    </div>
                </div>
            </Card>
            <Card className='p-6 rounded-xl space-y-4'>
                <Typography variant="h2" className="text-[20px]!" weight="semibold">Contact Details</Typography>

                <div className='space-y-4'>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Address</span>
                        <span className='text-white text-sm font-semibold max-w-[180px]'>{data.address}</span>
                    </div>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Phone:</span>
                        <span className='text-white text-sm font-semibold'>{data.phone}</span>
                    </div>
                    <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Website:</span>
                        <a href={data.website} className='text-white text-sm font-semibold'>{data.website}</a>
                    </div>
                </div>
            </Card>
            <Card className='p-6 rounded-xl space-y-4'>
                <Typography variant="h2" className="text-[20px]!" weight="semibold">Stock Details</Typography>

                <div className='space-y-4'>
                    {data.symbol && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Ticker Symbol:</span>
                        <span className='text-white text-sm font-semibold max-w-[180px]'>{data.symbol}</span>
                    </div>}
                    {data.exchange && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Exchange:</span>
                        <span className='text-white text-sm font-semibold'>{data.exchange}</span>
                    </div>}
                    {data.fiscal_year && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Fiscal Year:</span>
                        <span className='text-white text-sm font-semibold'>{data.fiscal_year}</span>
                    </div>}
                    {data.reporting_currency && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Reporting Currency:</span>
                        <span className='text-white text-sm font-semibold'>{data.reporting_currency}</span>
                    </div>}
                    {data.cik_code && < div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>CIK Code:</span>
                        <span className='text-white text-sm font-semibold'>{data.cik_code}</span>
                    </div>}
                    {data.cusip_number && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>CUSIP Number:</span>
                        <span className='text-white text-sm font-semibold'>{data.cusip_number}</span>
                    </div>}
                    {data.isin_number && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>ISIN Number:</span>
                        <span className='text-white text-sm font-semibold'>{data.isin_number}</span>
                    </div>}
                    {data.employer_id && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>Employer ID:</span>
                        <span className='text-white text-sm font-semibold'>{data.employer_id}</span>
                    </div>}
                    {data.sic_code && <div className='flex items-center justify-between border-b pb-2'>
                        <span className='text-white text-sm'>SIC Code:</span>
                        <span className='text-white text-sm font-semibold'>{data.sic_code}</span>
                    </div>}
                </div>
            </Card >
        </div >
    )
}

export default Widgets