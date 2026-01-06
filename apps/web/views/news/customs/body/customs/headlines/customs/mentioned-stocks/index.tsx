"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { Typography } from '@finranks/design-system/components/typography';

type Stock = {
    ticker: string
    positive_mentions: number
    negative_mentions: number
    neutral_mentions: number
}

interface TopMentionedStocksProps {
    topMentionedStocks: Stock[]
}

const MentionedStocks = ({ topMentionedStocks }: TopMentionedStocksProps) => {
    return (
        <div>
            <Typography variant="h3" color="primary" weight="bold">Top mentioned stocks</Typography>
            <div className='border border-[#353945] rounded-md overflow-hidden'>
                <Table className="min-w-full">
                    <TableHeader className="bg-[#854eca]">
                        <TableRow>
                            <TableHead className="text-center border-r text-white px-4 py-3">Symbol</TableHead>
                            <TableHead className=" text-white px-4 py-3 text-center">Sentiment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topMentionedStocks.map((stock) => (
                            <TableRow key={stock.ticker} className="border-b border-[#3B3B6E] hover:bg-[#2E2E60] transition-colors">
                                <TableCell className="text-center text-white font-medium px-4 py-3 border-r">{stock.ticker}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <p className="text-sm text-center">
                                        <span className="text-green-400">{stock.positive_mentions} Positive | </span>
                                        <span className="text-red-400">{stock.negative_mentions} Negative</span>
                                    </p>
                                    <p className="text-gray-300 text-sm text-center">{stock.neutral_mentions} Neutral</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default MentionedStocks