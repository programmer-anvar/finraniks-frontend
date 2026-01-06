'use client';

import { useLogout } from '@/hooks/useLogout';
import { useConfirm } from '@finranks/design-system/components/confirm-dialog';
import { TooltipWrapper } from '@finranks/design-system/components/tooltip';
import { cn } from '@finranks/design-system/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
    {
        label: 'Dashboard',
        href: '/profile/dashboard',
        slug: 'dashboard',
        icon: '/icons/icon5.svg',
    },
    {
        label: 'Personal information',
        href: '/profile/personal-information',
        slug: 'personal-information',
        icon: '/icons/icon1.svg',
    },
    {
        label: 'Subscription & Billing',
        href: '/profile/subscription',
        slug: 'subscription',
        icon: '/icons/icon2.svg',
    },
    {
        label: 'Transcriptions',
        href: '/profile/transactions',
        slug: 'transactions',
        icon: '/icons/icon3.svg',
    },
    {
        label: 'Settings',
        href: '/profile/settings',
        slug: 'settings',
        icon: '/icons/icon4.svg',
    },
    {
        label: 'Help & Support',
        href: '/profile/help',
        slug: 'help',
        icon: '/icons/icon6.svg',
    },
];

const SideNav = () => {
    const pathname = usePathname();
    const currentSlug = pathname.split('/')[3];
    const confirm = useConfirm();
    const { performLogout } = useLogout()

    const handleSignout = async () => {
        const result = await confirm({
            title: "Are you sure?",
            description: "Are you sure you want to logout?",
            confirmText: "Logout",
            confirmButton: {
                variant: "destructive",
            },
        });

        if (result.confirmed) {
            confirm.setLoading(true);
            await performLogout();
            confirm.setLoading(false);
        }
    };

    return (
        <nav className="flex flex-col border-r pr-4 py-4">
            {NAV_ITEMS.map(({ label, href, slug, icon }) => {
                const isActive = currentSlug === slug;

                return (
                    <TooltipWrapper content={label} classNames={{
                        content: "md:hidden"
                    }}>
                        <Link
                            key={slug}
                            href={href}
                            prefetch
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                'flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out',
                                'hover:bg-[#1668dc1f]',
                                isActive && 'bg-[#1668dc1f] text-white'
                            )}
                        >
                            <div className="w-8 h-8  flex items-center justify-center bg-[#1668dc] rounded-md mr-2.5 shrink-0">
                                <img src={icon} alt="" />
                            </div>

                            <span className="text-sm hidden md:block font-medium">{label}</span>
                        </Link>
                    </TooltipWrapper>
                );
            })}

            {/* Logout */}
            <TooltipWrapper content={"Logout"} classNames={{
                content: "md:hidden"
            }}>
                <Link
                    href="#"
                    className="flex items-center p-3 mt-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#1668dc1f]"
                    onClick={handleSignout}
                >
                    <div className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-md mr-2.5 shrink-0">
                        <img src="/icons/logout.svg" alt="" width={18} />
                    </div>
                    <span className="text-sm font-medium hidden md:block">Logout</span>
                </Link>
            </TooltipWrapper>
        </nav>
    );
};

export default SideNav;
