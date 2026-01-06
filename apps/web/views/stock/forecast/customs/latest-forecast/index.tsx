"use client"
import { Card } from '@finranks/design-system/components/card';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { cn } from '@finranks/design-system/lib/utils';
import { Typography } from '@finranks/design-system/components/typography';
import { Button } from '@finranks/design-system/components/Button';


const LatestForecast = ({ data }: any) => {
    const [showAll, setShowAll] = useState(false);
    return (
        <Card className='p-6 space-y-4 rounded-xl'>
            <Typography variant="h2" className="text-[20px]!" weight="semibold">Latest Forecasts</Typography>
            <div className='rounded-xl  overflow-hidden'>
                <Table >
                    <TableHeader className='rounded-t-md!'>
                        <TableRow className="border-b border-[#FFFFFF08] bg-[#FFFFFF05] hover:bg-purple-900/10 rounded-t-md!">
                            <TableHead className="text-white font-bold  text-sm   border-[#353945] p-4" >Date</TableHead>
                            <TableHead className="text-white font-bold  text-sm  border-[#353945]   p-4">
                                Upside/Downside
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm  border-[#353945]   p-4">
                                Analyst Firm
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm  border-[#353945]   p-4">
                                Price Target
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-[#353945]   p-4">
                                Rating Change
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-[#353945]   p-4">
                                Rating
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {showAll ? (
                            data.map((item: any, index: any) => {
                                const ratingDisplay = item.rating_previous && item.rating_previous !== item.rating_current
                                    ? `${item.rating_previous} → ${item.rating_current}`
                                    : item.rating_current;

                                const priceTargetChange = item.price_target_previous && item.price_target_current
                                    ? `$${item.price_target_previous} → $${item.price_target_current}`
                                    : item.price_target_current > 0 ? `$${item.price_target_current}` : '—';

                                const upsideColor = item.upside_downside > 0 ? 'text-green-500!' : 'text-red-500!';
                                const upsideValue = item.upside_downside !== null && item.upside_downside !== undefined
                                    ? `${item.upside_downside}%`
                                    : '—';

                                return (
                                    <TableRow key={index} className=" hover:bg-purple-900/10">
                                        <TableCell className="font-medium text-white   p-4">
                                            {item.announcement_date}
                                        </TableCell>
                                        <TableCell className={cn("font-medium text-white   p-4", {
                                            [upsideColor]: true,
                                        })}>
                                            {upsideValue}
                                        </TableCell>
                                        <TableCell className="font-medium text-white   p-4">
                                            {item.analyst_firm}
                                        </TableCell>
                                        <TableCell className="font-medium text-white   p-4">
                                            {priceTargetChange}
                                        </TableCell>
                                        <TableCell className="font-medium text-white   p-4">
                                            {item.analyst_action}
                                        </TableCell>
                                        <TableCell className="font-medium text-white   p-4">
                                            {ratingDisplay}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            data.slice(0, 5).map((item: any, index: any) => {
                                const ratingDisplay = item.rating_previous && item.rating_previous !== item.rating_current
                                    ? `${item.rating_previous} → ${item.rating_current}`
                                    : item.rating_current;

                                const priceTargetChange = item.price_target_previous && item.price_target_current
                                    ? `$${item.price_target_previous} → $${item.price_target_current}`
                                    : item.price_target_current > 0 ? `$${item.price_target_current}` : '—';

                                const upsideColor = item.upside_downside > 0 ? 'text-green-500' : 'text-red-500';
                                const upsideValue = item.upside_downside !== null && item.upside_downside !== undefined
                                    ? `${item.upside_downside}%`
                                    : '—';


                                return (
                                    <TableRow key={index} className=" border-b-0  hover:bg-purple-900/10">
                                        <TableCell className="font-medium text-white  border-[#353945] p-4">{item.announcement_date}</TableCell>
                                        <TableCell className={upsideValue === '—' ? '' : upsideColor}>{upsideValue}</TableCell>
                                        <TableCell className='text-left'>{item.analyst_firm}</TableCell>
                                        <TableCell className="font-medium text-white  border-[#353945] p-4">{priceTargetChange}</TableCell>
                                        <TableCell className="font-medium text-white  border-[#353945] p-4">{item.analyst_action}</TableCell>
                                        <TableCell className="font-medium text-white  border-[#353945] p-4">{ratingDisplay}</TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
            <Button variant="outline" className='w-full text-[16px]! text-[#ffffffcc]!' onClick={() => setShowAll(!showAll)}>{showAll ? 'More analyst rating' : 'Hide analyst rating'}</Button>
        </Card>
    )
}

export default LatestForecast