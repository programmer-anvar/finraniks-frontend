"use client";
import { Typography } from '@finranks/design-system/components/typography'
import FairValue from './customs/fair-value';
import Model from './customs/model';

const RealValuation = () => {
    return (
        <section id='real-valuation' className='app-container'>
            <div className="relative space-y-4">
                <div>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <Typography variant="h1" align="center" className="text-center md:text-[32px] text-[24px] leading-[76px] font-bold!">Real valuation. Tailored for each stock</Typography>
                        <Typography
                            variant='body'
                            align="center"
                            color='secondary'
                            className="text-center md:text-[16px] text-[14px] leading-[24px] font-normal! max-w-lg">
                            Finranks calculates fair value using a custom DCF model for each company
                            — reflecting its unique financials, risk profile, and future potential.
                        </Typography>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[58%_48%] gap-4 md:max-w-[75%] mx-auto'>
                    <Model /> 
                    <FairValue />
                </div>
            </div>
        </section>
    )
}

export default RealValuation