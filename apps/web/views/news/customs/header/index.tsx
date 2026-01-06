import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@finranks/design-system/components/breadcrumb'
import { Typography } from '@finranks/design-system/components/typography'
import { Home } from 'lucide-react'

const Header = () => {
    return (
        <div className='space-y-4 mt-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/en" className="inline-flex items-center gap-1.5">
                            <Home size={16} strokeWidth={2} aria-hidden="true" />
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                            News
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Typography variant='h1' weight='semibold'>Search News</Typography>
        </div>
    )
}

export default Header