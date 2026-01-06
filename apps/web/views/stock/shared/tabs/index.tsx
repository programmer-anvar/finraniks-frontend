"use client"
import { cn } from "@finranks/design-system/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
    { label: 'Summary', link: 'summary' },
    { label: 'News', link: 'news' },
    { label: 'Chart', link: 'chart' },
    { label: 'Financial', link: 'financial' },
    { label: 'Dividends', link: 'dividends' },
    { label: 'Forecast', link: 'forecast' },
    { label: 'Ownership', link: 'ownership' },
    { label: 'Profile', link: 'profile' },
]

const StockTabs = () => {
    const { slug } = useParams();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(pathname.split('/').pop());

    useEffect(() => {
        const arr = pathname.split("/");
        setActiveTab(arr[arr.length - 1])
    }, [pathname])


    return (
        <ul className="flex items-center justify-between overflow-x-auto no-scrollbar bg-[linear-gradient(0deg,#12092C,#12092C),linear-gradient(331.86deg,rgba(35,18,51,0)_48.86%,rgba(35,18,51,0.1)_96.18%)]
                    shadow-[inset_0_4px_40px_0_#ffffff1a] rounded-lg">
            {tabs.map((item) => {
                return (
                    <li key={item.link} className="w-full min-w-[120px] h-11">
                        <Link
                            href={`/en/stock/${slug}/${item.link}`}
                            className={cn("px-5 py-[11px] flex items-center justify-center border-b-2 border-transparent w-full cursor-pointer text-sm hover:bg-[#0958DA1A] text-white hover:border-[var(--main-color)] transition-all duration-300 font-medium", {
                                "bg-[#0958DA1A] border-b-2 border-[var(--main-color)]": activeTab === item.link
                            })}
                        >
                            {item.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default StockTabs