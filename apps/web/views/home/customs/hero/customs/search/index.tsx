import { STOCK_BADGES, STOCK_MOBILE_BADGES } from '@/mocks/home'
import { Badge } from '@finranks/design-system/components/badge'
import { Typography } from '@finranks/design-system/components/typography'
import { useRouter } from 'next/navigation'
import SearchInput from './customs/input'

const Search = () => {
    const router = useRouter()
    return (
        <div className="search-form">
            <div className="search-form__bg"></div>
            <SearchInput />
            <div className="search-form__bottom">
                <div className="flex items-center gap-2 overflow-hidden">
                    <Typography variant="body" className="font-bold!">
                        Trending:
                    </Typography>

                    <ul className="items-center gap-2 hidden md:flex">
                        {STOCK_BADGES?.map((el) => (
                            <li key={el.id} className="flex-shrink-0">
                                <Badge
                                    size="lg"
                                    variant="outline"
                                    className="search-form__link cursor-pointer"
                                    onClick={() =>
                                        router.push(`/en/stock/${el.slug}/summary`)
                                    }
                                >
                                    {el.label}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                    <ul className="  flex md:hidden
    items-center gap-2
    overflow-x-auto overflow-y-hidden
    whitespace-nowrap
    flex-nowrap
    scrollbar-hide
    overscroll-x-contain
    touch-pan-x w-[calc(100%-4rem)] no-scrollbar">
                        {STOCK_MOBILE_BADGES?.map((el) => (
                            <li key={el.id} className="shrink-0">
                                <Badge
                                    size="lg"
                                    variant="outline"
                                    className="search-form__link cursor-pointer whitespace-nowrap"
                                    onClick={() =>
                                        router.push(`/en/stock/${el.slug}/summary`)
                                    }
                                >
                                    {el.label}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Search