"use client"
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { formatDate } from '@finranks/design-system/lib/utils';

const NewsCard = ({ title, date, image_url, news_url }: { title: string; date: string; image_url: string; news_url: string }) => {
    const handleNewsClick = () => {
        window.open(news_url, '_blank');
    };
    return (
        <Card className='p-2 grid grid-cols-[100px_1fr] gap-2 rounded-md cursor-pointer group' onClick={handleNewsClick}>
            <div className='size-24 rounded-md overflow-hidden'>
                <img src={image_url} className='w-full h-full object-cover' alt='news' />
            </div>
            <div>
                <div className='grid'>
                    <Typography variant="body" truncate={{ lines: 3 }} weight='semibold' className='group-hover:underline text-[16px]'>{title}</Typography>
                </div>
                <Typography variant="small" color='helper'>{formatDate(date)}</Typography>
            </div>
        </Card>
    )
}

export default NewsCard