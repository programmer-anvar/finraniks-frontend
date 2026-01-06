import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@finranks/design-system/components/breadcrumb";
import { Home } from "lucide-react";

export type StockBreadCrumbProps = {
    readonly locale?: string;
    slug?: string;
    items?: {
        readonly title: string;
        readonly href: string;
    }[];
}


const StockBreadCrumb = ({ locale, items, slug }: StockBreadCrumbProps) => {
    return (
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
                        {slug}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default StockBreadCrumb