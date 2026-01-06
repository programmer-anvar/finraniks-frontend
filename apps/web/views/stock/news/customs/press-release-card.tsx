import React from 'react';
import Link from "next/link";
import { NewsEntity } from "@/services/stocks-news";
import { formatDate } from "@finranks/design-system/lib/utils";
import { Typography } from '@finranks/design-system/components/typography';

const PressReleaseCard = ({ item }: { item: NewsEntity }) => {
    return (
        <Link href={item.news_url} className="mb-6 hover:via-violet-700 group">
            <div className="grid grid-cols-1">
                {/* Image Section */}
                <div className="max:w-[240px] shrink-0">
                    <img src={item.image_url} alt={item.title} className="object-cover rounded-[12px] w-full h-full" />
                </div>

                {/* Content Section */}
                <div className="flex-1 md:p-3 flex flex-col justify-center">
                    <Typography truncate={{ lines: 2 }} as={"time"} variant="small" color='helper' className="leading-relaxed text-xs md:text-sm mb-3 ">{formatDate(item.date)}</Typography>
                    <div className='grid'>
                        <Typography truncate variant="h3" color='primary' className="text-xs md:text-base font-semibold mb-3 leading-snug group-hover:underline group-hover:text-blue-500!">{item.title}</Typography>
                    </div>
                    <div className='grid'>
                        <Typography truncate={{ lines: 2 }} variant="small" color='helper' className="text-xs md:text-sm leading-relaxed">{item.text}</Typography>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PressReleaseCard;
