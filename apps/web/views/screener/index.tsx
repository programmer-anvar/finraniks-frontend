import ComingSoon from '@/components/coming-soon'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@finranks/design-system/components/breadcrumb'
import { Home } from 'lucide-react'
import React from 'react'

const ScreenerPage = () => {
    return (
        <div className='app-container mt-5 space-y-4'>
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
                            Screener
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ComingSoon />
        </div>
    )
}

export default ScreenerPage