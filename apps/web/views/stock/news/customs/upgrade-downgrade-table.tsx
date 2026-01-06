"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { get } from 'lodash';
import { UpgradeDowngrade } from "@/services/stocks-news";



const UpgradeDowngradeTable = ({ list }: { list: UpgradeDowngrade[] }) => {

    return (
        <div className='rounded-xl border border-[#d9d9d91a]  overflow-hidden'>
            <Table>
                <TableHeader className='rounded-t-md!'>
                    <TableRow className="border-b border-[#d9d9d91a] hover:bg-(--main-color) rounded-t-md! bg-(--main-color)">
                        <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                            Ticker
                        </TableHead>
                        <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                            Brokerage Firm
                        </TableHead>
                        <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                            Ratings Change
                        </TableHead>
                        <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                            Price Target
                        </TableHead>
                        <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                            Date
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list.map((item, index) => {
                        const previousPrice = get(item, 'priceTarget.previous.formatted');
                        const currentPrice = get(item, 'priceTarget.current.formatted');

                        return (
                            <TableRow key={index} className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10">
                                <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.ticker}</TableCell>
                                <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.analystFirm}</TableCell>
                                <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.rating.current}</TableCell>
                                <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{previousPrice + ' >> ' + currentPrice}</TableCell>
                                <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{get(item, 'date.formatted')}</TableCell>
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </div>
    )
}

export default UpgradeDowngradeTable