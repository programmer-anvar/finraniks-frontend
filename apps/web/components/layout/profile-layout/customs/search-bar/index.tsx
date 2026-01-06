"use client"
import config from '@/lib/config';
import { STOCK_BADGES } from '@/mocks/home';
import { Avatar } from '@finranks/design-system/components/avatar';
import { Badge } from '@finranks/design-system/components/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@finranks/design-system/components/popover'
import { SearchInput } from '@finranks/design-system/components/search-input';
import { Typography } from '@finranks/design-system/components/typography';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useState } from 'react';


type Company = {
    code: string;
    name: string;
    logo: string;
    exchange: string;
};
const SearchBar = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [items, setItems] = useState<Company[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const debouncedChange = useDebounce(searchValue, 500);
    // Fetch search results
    useEffect(() => {
        const loadSearchResults = async () => {
            if (!debouncedChange) {
                setItems([]);
                setDropdownOpen(false);
                return;
            }

            try {
                const { data } = await axios.get(`${config.APP_URL}/companies?search=${debouncedChange}`);
                setItems(data?.data || []);
                setDropdownOpen(true);
            } catch (err) {
                console.error('Search error:', err);
                setItems([]);
                setDropdownOpen(false);
            }
        };

        loadSearchResults();
    }, [debouncedChange]);

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isDropdownOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => Math.min(prev + 1, items.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            const selectedItem = items[highlightedIndex];
            if (selectedItem) {
                setSearchValue('');
                setItems([]);
                window.location.href = `/en/stock/${selectedItem.code}/summary`;
            }
        } else if (e.key === 'Escape') {
            setDropdownOpen(false);
        }
    };
    return (
        <div className='w-full space-y-4'>
            <Popover open={true}>
                <PopoverTrigger className='w-full'>
                    <SearchInput
                        placeholder="Search any stock"
                        value={searchValue}
                        size="lg"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-autocomplete="list"
                        onClear={() => { }}
                        classNames={{
                            input: "h-15! pl-9",
                            searchIcon: "h-8! size-6 text-white"
                        }}
                        isClearable
                        aria-expanded={isDropdownOpen}
                        aria-controls="search-autocomplete-list"
                        autoComplete="off"

                    />
                </PopoverTrigger>
                {isDropdownOpen && items.length > 0 && <PopoverContent align='start' className='p-0'>
                    <div
                        id="search-autocomplete-list"
                        role="listbox"
                        className="backdrop-blur-md! glass_background rounded-md shadow-lg max-h-60 overflow-y-auto w-full scrollable"
                    >
                        {items.slice(0, 5).map((item, index) => (
                            <li
                                key={item.code}
                                role="option"
                                aria-selected={highlightedIndex === index}
                                className={`grid grid-cols-[30px_auto] items-center gap-2 p-2 cursor-pointer  ${highlightedIndex === index ? 'bg-purple-600/20' : 'glass_background'
                                    }`}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onClick={() => {
                                    setSearchValue('');
                                    setItems([]);
                                    window.location.href = `/en/stock/${item.code}/summary`;
                                }}
                            >
                                <div >
                                    <Avatar src={item.logo} alt={`${item.name} logo`} fallback={item.name} />
                                </div>
                                <div className="flex flex-col">
                                    <div className='grid'>
                                        <Typography truncate weight='semibold' variant='small' color='primary'>{item.code}</Typography>
                                    </div>
                                    <div className='grid'>
                                        <Typography truncate weight='semibold' variant='small' color='helper'>{item.name} / {item.exchange}</Typography>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </PopoverContent>}
            </Popover>

            <div className="flex items-center gap-2">
                <Typography variant="body" className='font-bold!'>Trending:</Typography>
                <ul className="flex items-center gap-2">
                    {
                        STOCK_BADGES.map((el) => {
                            return (
                                <li key={el.id}>
                                    <Badge size="lg" onClick={() => router.push(`/en/stock/${el.slug}/summary`)} className='cursor-pointer' variant="outline">{el.label}</Badge>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchBar