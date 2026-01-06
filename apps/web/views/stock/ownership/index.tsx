import { Typography } from '@finranks/design-system/components/typography'
import MajorHolders from './customs/major-holders'
import { getHolders } from '@/services/stock-holders';
import TopHolders from './customs/top-holders';
import MutalFundHolders from './customs/mutal-fund-holders';

const OwnerShipPage = async ({ params }: { params: any }) => {
    const { slug } = await params;
    const { data } = await getHolders(slug);
    return (
        <div className='space-y-4'>
            <Typography variant="h2" className="text-[24px]!" weight="semibold">Ownership</Typography>
            <MajorHolders data={data} />
            <TopHolders data={data} />
            <MutalFundHolders data={data} />
        </div>
    )
}

export default OwnerShipPage