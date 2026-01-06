"use client"
import { useTabStore } from "@/stores/shared";
import { cn } from "@finranks/design-system/lib/utils";
import { parseAsString, useQueryState } from "nuqs";

const tabs = [
    { label: 'Income Statement', value: 'income-statement' },
    { label: 'Balance Sheet', value: 'balance-sheet' },
    { label: 'Cash Flow', value: 'cash-flow' },
]

const TabsComponent = () => {
    const activeTab = useTabStore((state) => state.activeTab);
    const setActiveTab = useTabStore((state) => state.setActiveTab);

    return (
        <ul className="flex items-center w-[375px] md:w-[400px] overflow-x-auto no-scrollbar bg-[linear-gradient(0deg,#12092C,#12092C),linear-gradient(331.86deg,rgba(35,18,51,0)_48.86%,rgba(35,18,51,0.1)_96.18%)]
                    shadow-[inset_0_4px_40px_0_#ffffff1a] rounded-lg">
            {tabs.map((item) => {
                return (
                    <li key={item.value} className="min-w-[120px] h-11">
                        <span
                            onClick={() => setActiveTab(item.value)}
                            className={cn("px-5 py-[11px] flex items-center justify-center border-b-2 border-transparent w-full cursor-pointer text-sm hover:bg-[#0958DA1A] text-white hover:border-[var(--main-color)] transition-all whitespace-nowrap duration-300 font-medium", {
                                "bg-[#0958DA1A] border-b-2 border-[var(--main-color)]": activeTab === item.value
                            })}
                        >
                            {item.label}
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}

export default TabsComponent