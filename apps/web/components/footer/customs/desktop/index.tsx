"use client"
import { useModals } from "@/stores/modal";
import { Button } from "@finranks/design-system/components/Button";
import { Typography } from "@finranks/design-system/components/typography";
import React from "react";

interface Footer7Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    sections?: Array<{
        title: string;
        links: Array<{ name: string; href: string }>;
    }>;
    description?: string;
    socialLinks?: Array<{
        icon: React.ReactElement;
        href: string;
        label: string;
    }>;
    copyright?: string;
    legalLinks?: Array<{
        name: string;
        href: string;
    }>;
}

const defaultSections = [
    {
        title: "Company",
        links: [
            { name: "About us", href: "#" },
        ],
    },
    {
        title: "Contact us",
        links: [
            { name: "info@finranks.com", href: "#" },
        ],
    },
    {
        title: "Follow us",
        links: [
            { name: "Instagram", href: "https://www.instagram.com/finranks" },
            { name: "Telegram", href: "https://t.me/finranks" },
            { name: "LinkedIn", href: "https://www.linkedin.com/company/finranks" },
        ],
    },
];


const defaultLegalLinks = [
    { name: "Terms and Conditions", href: "#" },
    { name: "Privacy Policy", href: "/en/privacy-policy" },
];

export const DesktopFooter = ({
    logo = {
        url: "/images/logos/footer-logo.svg",
        src: "/images/logos/footer-logo.svg",
        alt: "Finranks",
        title: "Finranks",
    },
    sections = defaultSections,
    description = "A collection of components for your startup business or side project.",
    copyright = "© 2024 finranks.com. All rights reserved.",
    legalLinks = defaultLegalLinks,
}: Footer7Props) => {
    const { setModal } = useModals()
    return (
        <div>
            <section className="relative h-60 mt-20">
                <img className="absolute top-0 left-1/2 transform -translate-x-1/2" src="/images/footer-grid.png" alt="" />

                <div className="relative z-10 pt-27">
                    <div className='flex flex-col items-center justify-center w-full gap-4'>
                        <Typography variant="h1" align="center" className="text-center text-[32px] leading-[76px] font-bold!">Get all premium features to the best stock analysis tool</Typography>
                        <Button onClick={() => setModal({ register: true })}>Get started for free</Button>
                    </div>
                </div>
            </section>
            <section className="pt-10  bg-[#08011F]/50 backdrop-blur-md border-t border-[#08011F]/50 relative z-10 mt-auto">
                <div className="app-container mx-auto">
                    <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
                        <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
                            {/* Logo */}
                            <div className="flex items-center gap-2 lg:justify-start">
                                <a href={logo.url}>
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        title={logo.title}
                                        className="h-8"
                                    />
                                </a>
                                <h2 className="text-xl font-semibold text-white">{logo.title}</h2>
                            </div>
                        </div>
                        <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
                            {sections.map((section, sectionIdx) => (
                                <div key={sectionIdx}>
                                    <h3 className="mb-4 font-bold">{section.title}</h3>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        {section.links.map((link, linkIdx) => (
                                            <li
                                                key={linkIdx}
                                                className="font-medium hover:text-primary"
                                            >
                                                <a href={link.href} className="text-white">{link.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
                        <p className="order-2 lg:order-1">{copyright}</p>
                        <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
                            {legalLinks.map((link, idx) => (
                                <li key={idx} className="hover:text-primary text-white">
                                    <a href={link.href}> {link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

