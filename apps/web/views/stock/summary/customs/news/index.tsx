"use client"
import React, { useEffect, useState } from 'react'
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import NewsCard from './customs/card'
import { Button } from '@finranks/design-system/components/Button'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import config from '@/lib/config'
import { get } from 'lodash'

const News = () => {
    const { slug } = useParams();
    const [items, setItems] = useState([]);
    const router = useRouter()

    const loadItems = () => {
        axios.get(`${config.APP_URL}/news?tickers-only=${slug}&items=4&page=1`) // Replace with your API endpoint
            .then(({ data }) => {
                setItems(get(data, 'data', []))
            })
            .catch(error => {
                console.error(error)
            })
    }
    useEffect(() => {
        loadItems()
    }, []);


    if (!Boolean(items?.length)) {
        return (
            <Card className='space-y-4 rounded-[20px] p-4 md:p-6 flex flex-col'>
                <Typography variant="h4">News</Typography>
                <div className='space-y-4 flex-1 flex flex-col items-center justify-center'>
                    <Typography variant="body" color='helper' className='pb-0'>No Data</Typography>
                    <Typography variant="small" as="p" color='helper' className='pb-0'>There are no news for this stock.</Typography>
                </div>
            </Card>
        )
    }


    return (
        <Card className='space-y-4 rounded-[20px] p-4 md:p-6 flex flex-col'>
            <Typography variant="h4">News</Typography>
            <div className='space-y-4 flex-1'>
                {
                    items.map((item: any, index: number) => (
                        <NewsCard key={index} {...item} />
                    ))
                }
            </div>
            <Button className='w-full mt-auto' onClick={() => router.push(`/en/stock/${slug}/news`)}>Show More</Button>
        </Card>
    )
}

export default News