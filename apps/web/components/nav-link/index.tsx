"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@finranks/design-system/lib/utils";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
    exact?: boolean;
}

export default function NavLink({
    href,
    children,
    className,
    activeClassName = "active",
    exact = false,
}: NavLinkProps) {
    const pathname = usePathname();

    const isActive = useMemo(() => {
        if (exact) return pathname === href;
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    }, [pathname, href, exact]);

    return (
        <Link
            href={href}
            className={cn(className, isActive && activeClassName)}
        >
            {children}
        </Link>
    );
}
