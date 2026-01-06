'use client'

import { useEffect, useState } from "react"
import get from "lodash/get"
import { Button } from "@finranks/design-system/components/Button"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@finranks/design-system/components/modal"
import { Checkbox } from "@finranks/design-system/components/checkbox"
import { Label } from "@finranks/design-system/components/label"
import { X } from "lucide-react"
import { useAppContext } from "@/lib/providers/customs/app"
import { useModals } from "@/stores/modal"

interface IWatchlistSetting {
    value: string
    label: string
    show: boolean
}

const ManageWatchListModal = () => {
    const { state, setState } = useAppContext()
    const { manageWatchList, setModal } = useModals()
    const [items, setItems] = useState<IWatchlistSetting[]>([])

    const closeModal = () => setModal({ manageWatchList: false })

    // Load initial settings from state
    useEffect(() => {
        const watchlistSetting: IWatchlistSetting[] = get(state, 'watchlistSetting', [])
        setItems(watchlistSetting)
    }, [state.watchlistSetting])

    // Handle checkbox change
    const handleChange = (key: string, val: boolean) => {
        const newArr = items.map(item =>
            item.value === key ? { ...item, show: val } : item
        )
        setItems(newArr)
    }

    // Save settings
    const handleSave = () => {
        window.localStorage.setItem("watchlistSettings", JSON.stringify(items))
        setState(prev => ({
            ...prev,
            watchlistSetting: items
        }))
        closeModal()
        setTimeout(() => {
            window.location.reload()
        }, 500)
    }

    return (
        <Modal open={manageWatchList} onOpenChange={closeModal}>
            <ModalContent classNames={{ closeButton: "hidden" }}>
                <ModalHeader>
                    <ModalTitle className="flex items-center justify-between">
                        <span className="text-white text-lg font-semibold">Watchlist Table Settings</span>
                        <Button onClick={closeModal} hasIconOnly iconDescription="Close" variant="outline">
                            <X />
                        </Button>
                    </ModalTitle>
                </ModalHeader>

                <div className="px-4 py-4 grid grid-cols-3 gap-4">
                    {items.map(item => (
                        <Label key={item.value} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                                checked={item.show}
                                onCheckedChange={(checked) => handleChange(item.value, !!checked)}
                            />
                            <span>{item.label}</span>
                        </Label>
                    ))}
                </div>

                <div className="px-4 py-3 flex justify-end">
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default ManageWatchListModal
