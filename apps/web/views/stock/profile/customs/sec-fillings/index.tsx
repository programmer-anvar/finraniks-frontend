"use client"
import { Button } from '@finranks/design-system/components/Button';
import { Card } from '@finranks/design-system/components/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { Typography } from '@finranks/design-system/components/typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const SecFilings = ({ data }: any) => {
    const router = useRouter()
    return (
        <Card className='p-6 rounded-xl space-y-4'>
            <Typography variant="h2" className="text-[20px]!" weight="semibold">Latest SEC Filings</Typography>
            <div className='rounded-xl border border-[#d9d9d91a]  overflow-hidden'>
                <Table >
                    <TableHeader className='rounded-t-md!'>
                        <TableRow className="border-b border-[#d9d9d91a] hover:bg-(--main-color) rounded-t-md! bg-(--main-color)">
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                Date
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                Type
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                Document
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.items?.map((item: any, index: number) => {
                            return (
                                <TableRow key={index} className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10">
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.date}</TableCell>
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.form_type}</TableCell>
                                    <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">
                                        <Link href={item.link} className='text-blue-500 underline' target={"_blank"}>{item.primary_document}</Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <Button variant='outline' className='w-full text-base! text-[#ffffffcc]!' onClick={() => router.push(data.full_link)}>View All SEC Filings</Button>
        </Card>
    )
}

export default SecFilings