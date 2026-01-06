"use client"
import { Typography } from '@finranks/design-system/components/typography'
import OctagonView from './customs/octagon-view';
import OverallScore from './customs/overall-score';


const RankingSystem = () => {
    return (
        <section className='pb-35 relative'>
            <img src="/images/home-center-lines.svg" alt="" className='absolute top-0 left-0  opacity-30 z-0' />
            <div className="relative space-y-4 z-10 app-container">
                <div>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <Typography variant="h1" align="center" className="text-white! text-center md:text-[32px] text-[24px] leading-[76px] font-bold!">Powerful 8-dimension ranking system</Typography>
                        <Typography
                            variant='body'
                            align="center"
                            color='secondary'
                            className="text-center  leading-[24px] md:text-[16px] text-[12px] font-normal! max-w-2xl">
                            Finranks breaks down complex financials into simple scores across 8 critical categories
                            helping you evaluate companies with confidence, even if you're not a finance expert.
                        </Typography>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[48%_58%] gap-4 md:max-w-[75%] mx-auto'>
                    <OctagonView />
                    <OverallScore />
                </div>
            </div>
        </section>
    )
}

export default RankingSystem