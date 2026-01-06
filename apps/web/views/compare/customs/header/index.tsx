import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@finranks/design-system/components/breadcrumb";
import { Home } from "lucide-react";

const Header = ({ slug }: { slug: string }) => {
    return (
        <div>
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
                        <BreadcrumbLink href={`/en/stock/${slug}/summary`} className="inline-flex items-center gap-1.5">
                            {slug}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5 ">
                            Compare
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Header