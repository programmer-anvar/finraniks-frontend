import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';
import { formatDate } from '@finranks/design-system/lib/utils';
import { useRouter } from 'next/navigation';

export interface NewsCardProps {
    date: string
    title: string
    text: string
    image_url: string
    news_url: string
}

const NewsCard = ({ date, title, text, image_url, news_url }: NewsCardProps) => {
    const router = useRouter();
    return (
        <Card className='p-3 rounded-[12px] mt-4 group cursor-pointer' onClick={() => router.push(news_url)}>
            <div className="grid grid-cols-[240px_1fr]">
                {/* Image Section */}
                <div className="max:w-[240px] shrink-0">
                    <img src={image_url} alt={title} className="object-cover rounded-[12px] w-full h-full" />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-3 flex flex-col justify-center">
                    <Typography truncate={{ lines: 2 }} as={"time"} variant="body" color='helper' className="leading-relaxed text-sm mb-3 ">{formatDate(date)}</Typography>
                    <div className='grid'>
                        <Typography truncate variant="h3" color='primary' className="text-base font-semibold mb-3 leading-snug group-hover:underline">{title}</Typography>
                    </div>
                    <div className='grid0'>
                        <Typography truncate={{ lines: 2 }} variant="small" color='helper' className=" text-sm leading-relaxed">{text}</Typography>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default NewsCard