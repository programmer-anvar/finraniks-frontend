'use client';

import { cn } from '@finranks/design-system/lib/utils';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@finranks/design-system/components/navigation-menu';

import { Button } from '@finranks/design-system/components/Button';
import { Dictionary } from '@finranks/internationalization';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useModals } from '@/stores/modal';
import { User } from 'lucide-react';
import SearchBar from '../../search';

// Simple logo component for the navbar
const Logo = () => {
    return (
        <Link href="/en" className="header-logo">
            <Image loading="eager" src="/images/logos/logo.svg" width={110} height={32} alt="Finranks Logo" />
        </Link>
    )
}

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
    <svg
        className={cn('pointer-events-none', className)}
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        {...(props as any)}
    >
        <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
    </svg>
);

// Types
export interface NavbarNavItem {
    href?: string;
    label: string;
    active?: boolean;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    logoHref?: string;
    navigationLinks?: NavbarNavItem[];
    signInText?: string;
    signInHref?: string;
    ctaText?: string;
    ctaHref?: string;
    onSignInClick?: () => void;
    onCtaClick?: () => void;
    dictionary?: Dictionary;
    authState: any
}

// Default navigation links
const defaultNavigationLinks: NavbarNavItem[] = [
    { href: '/en', label: 'Home', active: true },
    { href: '/en/screener', label: 'Screener' },
    { href: '/en/news', label: 'News' },
    { href: '/en/about', label: 'About' },
];



export const HeaderContent = React.forwardRef<HTMLElement, HeaderProps>(
    (
        {
            className,
            logo = <Logo />,
            logoHref = '#',
            navigationLinks = defaultNavigationLinks,
            signInText = 'Sign In',
            signInHref = '#signin',
            ctaText = 'Get Started',
            ctaHref = '#get-started',
            onSignInClick,
            onCtaClick,
            authState,
            ...props
        },
        ref
    ) => {
        const pathname = usePathname();
        const isActiveLink = (href?: string): boolean => {
            console.log(href, pathname)
            if (!href) return false;

            if (href === '/en') {
                return pathname === '/en';
            }

            return pathname.startsWith(href);
        };
        const { isAuthenticated } = useAuth(authState);
        const { setModal } = useModals()

        const router = useRouter()

        const [isMobile, setIsMobile] = useState(false);
        const containerRef = useRef<HTMLElement>(null);

        useEffect(() => {
            const checkWidth = () => {
                if (containerRef.current) {
                    const width = containerRef.current.offsetWidth;
                    setIsMobile(width < 768); // 768px is md breakpoint
                }
            };

            checkWidth();

            const resizeObserver = new ResizeObserver(checkWidth);
            if (containerRef.current) {
                resizeObserver.observe(containerRef.current);
            }

            return () => {
                resizeObserver.disconnect();
            };
        }, []);

        // Combine refs
        const combinedRef = React.useCallback((node: HTMLElement | null) => {
            containerRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        }, [ref]);



        return (
            <header
                ref={combinedRef}
                className={cn(
                    'sticky top-0 z-50 w-full border-b   bg-(--color-bg)  [&_*]:no-underline',
                    className
                )}
                {...(props as any)}
            >
                <div className="app-container grid grid-cols-2 h-16  items-center  gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                        {/* Main nav */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                            >
                                <div className="text-2xl">
                                    {logo}
                                </div>
                            </button>
                            {/* Navigation menu */}
                            {!isMobile && (
                                <NavigationMenu className="flex">
                                    <NavigationMenuList className="gap-1">
                                        {navigationLinks.map((link, index) => {
                                            const isActive = isActiveLink(link.href);
                                            return (
                                                <NavigationMenuItem key={index}>
                                                    <NavigationMenuLink
                                                        href={link.href}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.push(String(link.href))
                                                        }}
                                                        className={cn(
                                                            'group inline-flex h-16 w-max items-center justify-center rounded-md  px-3 py-2 text-[16px]! font-semibold transition-colors hover:text-accent-foreground  focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50  cursor-pointer relative',
                                                            'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:scale-x-0 before:transition-transform before:duration-300 before:content-[""] before:w-full hover:before:scale-x-100 before:bg-[linear-gradient(89.98deg,rgba(255,255,255,0)_-0.08%,#FFFFFF_52.75%,rgba(255,255,255,0)_100.34%)]',
                                                            isActive && 'before:scale-x-100 text-primary'
                                                        )}
                                                        data-active={isActive}
                                                    >
                                                        {link.label}
                                                    </NavigationMenuLink>
                                                </NavigationMenuItem>
                                            )
                                        })}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center gap-4 ml-auto'>
                        <SearchBar />
                        {/* Right side */}
                        {!isAuthenticated ? <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="text-sm  hover:bg-accent/50 hover:text-accent-foreground"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setModal({ signIn: true })
                                    if (onSignInClick) onSignInClick();
                                }}
                            >
                                {signInText}
                            </Button>
                            <Button
                                className="text-sm  px-4 h-9 rounded-md shadow-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setModal({ register: true })
                                    if (onCtaClick) onCtaClick();
                                }}

                            >
                                {ctaText}
                            </Button>
                        </div> :
                            <Button
                                className="text-sm  px-4 h-9 rounded-md shadow-sm"
                                prepend={<User />}
                                variant='outline'
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/profile/dashboard')
                                }}

                            >
                                Profile
                            </Button>}
                    </div>
                </div>
            </header>
        );
    }
);


export { Logo, HamburgerIcon };