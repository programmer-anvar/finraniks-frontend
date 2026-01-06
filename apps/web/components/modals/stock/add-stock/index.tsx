'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import get from "lodash/get"
import { Button } from "@finranks/design-system/components/Button"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@finranks/design-system/components/modal"
import { SearchInput } from "@finranks/design-system/components/search-input"
import { X } from "lucide-react"
import { useAppContext } from "@/lib/providers/customs/app"
import { useModals } from "@/stores/modal"
import config from "@/lib/config"
import { useDebounce } from "@uidotdev/usehooks"
import { ScrollArea } from "@finranks/design-system/components/scroll-area"
import { Avatar } from "@finranks/design-system/components/avatar"
import { useParams, useRouter, useSearchParams } from "next/navigation"

interface ICompany {
    code: string
    name: string
    type: string
    logo: string,
    exchange: string
}

const AddStockModal = () => {
    const { state, setState } = useAppContext()
    const { addStock, setModal } = useModals()
    const access_token = state.access_token;
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const compareValue = searchParams.get('compare');
    const compareValueArr = compareValue ? compareValue.split(",") : [];
    const [searchValue, setSearchValue] = useState<string>("")
    const [debouncedSearchValue] = useDebounce(searchValue, 500)

    const [items, setItems] = useState<ICompany[]>([])
    const [similarItems, setSimilarItems] = useState<ICompany[]>([])

    const closeModal = () => setModal({ addStock: false })

    const getSimilarCompanies = async () => {
        if (!id) return
        try {
            const { data } = await axios.get(`${config.APP_URL}/companies/${id}/similar`)
            setSimilarItems(get(data, "data.items", []))
        } catch (error) {
            console.error("Error fetching similar companies:", error)
        }
    }

    const loadSearchValue = async () => {
        if (!debouncedSearchValue) return setItems([])
        try {
            const { data } = await axios.get(`${config.APP_URL}/companies?search=${debouncedSearchValue}`)
            setItems(get(data, "data", []))
        } catch (error) {
            console.error("Error searching companies:", error)
        }
    }

    const getWatchlist = async () => {
        setState(prev => ({ ...prev, watchlistCompaniesLoading: true }))
        try {
            const { data } = await axios.get(`${config.APP_URL}/watchlist/my-watchlist/companies`, {
                headers: { Authorization: `Bearer ${access_token}` }
            })
            setState(prev => ({
                ...prev,
                watchlistCompanies: data.data,
                watchlistCompaniesLoading: false
            }))
        } catch (error) {
            setState(prev => ({ ...prev, watchlistCompaniesLoading: false }))
            console.error("Error fetching watchlist:", error)
        }
    }

    const addHandler = async (companyCode: string) => {
        try {
            await axios.post(`${config.APP_URL}/watchlist/companies`, {
                id: companyCode,
                watchlistId: "my-watchlist"
            }, {
                headers: { Authorization: `Bearer ${access_token}` }
            })
            await getWatchlist()
            closeModal()
        } catch (error) {
            console.error("Error adding company to watchlist:", error)
        }
    }

    const updateSearchParams = (key: string, value: string) => {
        const selected = get(state, 'selected');
        const arr = compareValue ? compareValue.split(",") : [];
        let newArr: any = [];
        if (selected) {
            // @ts-expect-error
            newArr = arr.reduce((prev, curr) => [...prev, curr === selected ? value : curr], [])
        } else {
            newArr = [...arr, value];
        }

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, newArr.join(",")); // Add or update the key-value pair
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname); // Use `router.replace` to avoid adding to the history stack
        closeModal()
    };

    useEffect(() => {
        if (addStock && id) {
            getSimilarCompanies()
        }
    }, [addStock, id])

    useEffect(() => {
        loadSearchValue()
    }, [debouncedSearchValue])


    const renderCompanies = (companies: ICompany[]) => (
        companies.map(company => {
            const isSelected = compareValueArr.includes(company.code);
            if (isSelected) return;
            return (
                <div
                    key={company.code}
                    className="cursor-pointer hover:bg-gray-800  flex justify-between items-center  mb-2 px-4 py-2"
                    onClick={() => updateSearchParams('compare', company.code)}
                >
                    <div className="flex items-center gap-2">
                        <Avatar src={company?.logo} alt={company.code} fallback={company.code} />
                        <div className="flex items-center gap-2">
                            <div className="text-sm">{company.name}</div>
                            <div className="font-medium">{company.code}</div>
                        </div>

                    </div>
                </div>
            )
        })
    )

    return (
        <Modal open={addStock} onOpenChange={closeModal}>
            <ModalContent classNames={{ closeButton: "hidden" }}>
                <ModalHeader>
                    <ModalTitle className="flex items-center justify-between">
                        <span className="text-white">Add stock to compare</span>
                        <Button onClick={closeModal} hasIconOnly iconDescription="Close" variant="outline">
                            <X />
                        </Button>
                    </ModalTitle>
                </ModalHeader>

                <div className="px-4 py-2 h-10">
                    <SearchInput
                        placeholder="Search any stock"
                        value={searchValue}
                        size="md"
                        onChange={e => setSearchValue(e.target.value)}
                        isClearable
                        aria-autocomplete="list"
                        autoComplete="off"
                        onClear={() => setSearchValue("")}
                    />
                </div>
                {searchValue ? <div className="text-gray-300 my-2 pl-4">Search result</div> :
                    <div className="text-gray-300 my-2 pl-4">Similar companies</div>}
                <div className="m-4  border rounded-md overflow-hidden">
                    <ScrollArea className="min-h-[240px] max-h-[400px] overflow-y-auto scrollable">
                        {searchValue
                            ? (
                                <>

                                    {renderCompanies(items)}
                                </>
                            )
                            : (
                                <>

                                    {renderCompanies(similarItems)}
                                </>
                            )
                        }
                    </ScrollArea>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default AddStockModal
