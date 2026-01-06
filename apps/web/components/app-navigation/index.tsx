
"use client"
import styles from "./customs/navigation-link/app-navigation.module.css";
import AppNavigationLink from "./customs/navigation-link";

const links = [
    {
        href: '/en/search',
        label: "Search",
        src: 'search2.svg'
    },
    {
        href: '/en/news',
        label: "News",
        src: 'news.svg'
    },
    {
        href: '/en/profile',
        label: "Profile",
        src: 'user.svg'
    },
    {
        href: '/en/screener',
        label: "Screener",
        src: 'screener.svg'
    },
]
const AppNavigation = () => {
    return (
        <div>
            <ul className={"fixed bottom-0 left-0 z-50 w-full grid grid-cols-4 bg-[#0b0324]"}>
                {
                    links.map((link) => (
                        <li
                            className="flex flex-col items-center"
                            key={link.href}>
                            <AppNavigationLink href={link.href}>
                                <img src={`/footer-icons/${link.src}`} alt="" />
                                <span className="text-xs">{link.label}</span>
                            </AppNavigationLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AppNavigation