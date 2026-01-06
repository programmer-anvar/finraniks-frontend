"use client"
import { useModals } from '@/stores/modal'
import { Button } from '@finranks/design-system/components/Button'
import { Typography } from '@finranks/design-system/components/typography'
import { List, PlusIcon } from 'lucide-react'

const Header = () => {
    const { setModal } = useModals()
    return (
        <div className='flex items-center justify-between'>
            <Typography variant='h4'>Watchlist</Typography>
            <div className='flex items-center gap-4'>
                <Button prepend={<PlusIcon />} onClick={() => setModal({ addWatchList: true })}>Add watchlist</Button>
                <Button variant='outline' prepend={<List />} onClick={() => setModal({ manageWatchList: true })}>Manage watchlist</Button>
            </div>
        </div>
    )
}

export default Header