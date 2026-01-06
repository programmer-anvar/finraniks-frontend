import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography';


const mockStatistics = [
    {
        label: 'DCF Model Period',
        value: '5 years',
        iconPath: '/icons/arrow-circle-right.svg',
    },
    {
        label: 'Discount Rate (WACC)',
        value: '12.79%',
        iconPath: '/icons/arrow-circle-right.svg',
    },
    {
        label: 'Perpetual Growth Rate',
        value: '3.00%',
        iconPath: '/icons/arrow-circle-right.svg',
    },
    {
        label: 'Revenue 5 Year CAGR',
        value: '14.00%',
        iconPath: '/icons/arrow-circle-right.svg',
    },
    {
        label: 'FCF 5 Year CAGR',
        value: '5%',
        iconPath: '/icons/arrow-circle-right.svg',
    },
    {
        label: 'Calculated Fair Value',
        value: '353.69$',
        iconPath: '/icons/arrow-circle-right.svg',
        link: '/valuation/fair-value'
    },
    {
        label: 'Current Stock Price',
        value: '412.23$',
        iconPath: '/icons/arrow-circle-right.svg',
    },
];

const Model = () => {
    return (
        <div className=' home-card --mini'>
            <Typography variant="h3" className='text-[18px] md:text-inherit'>DCF model</Typography>
            <Typography variant="small" color='secondary' className='text-[14px] md:text-inherit'>The DCF (Discounted Cash Flow) model estimates a company's true value
                based on its future cash flows, adjusted for risk and time</Typography>

            <ul className="flex flex-col gap-2 mt-7">
                {
                    mockStatistics.map((el) => {
                        return (<li className="home-card__statistic" key={el.value}>
                            <div className="flex items-center gap-2">
                                <div className="home-card__arrow">
                                    <img src="/icons/arrow-circle-right.svg" alt="" />
                                </div>
                                <span className='whitespace-nowrap'>{el.label}</span>
                            </div>
                            <div className="text-white font-bold ml-auto">{el.value}</div>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default Model