"use client"
import { Card } from '@finranks/design-system/components/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { Typography } from '@finranks/design-system/components/typography';
import { get } from 'lodash';

const MutalFundHolders = ({ data }: any) => {
    const funds = get(data, 'funds.data', []);
    return (
        <Card className='p-6 rounded-xl space-y-4'>
            <Typography variant="h2" className="text-[20px]!" weight="semibold">Top Mutual Fund Holders</Typography>
            <div className='rounded-xl border border-[#d9d9d91a]  overflow-hidden'>
                <Table >
                    <TableHeader className='rounded-t-md!'>
                        <TableRow className="border-b border-[#d9d9d91a] hover:bg-(--main-color) rounded-t-md! bg-(--main-color)">
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                Holders
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                Shares
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                Date reported
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                % Out
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                Value
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {funds.map((item: any, index: number) => {
                            return (
                                <TableRow key={index} className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10">
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.name}</TableCell>
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.current_shares}</TableCell>
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.record_date}</TableCell>
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.total_shares}</TableCell>
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.total_assets}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default MutalFundHolders