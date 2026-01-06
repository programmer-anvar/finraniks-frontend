import { create } from "zustand";

interface TModal {
    register?: boolean;
    signIn?: boolean;
    forgotPassword?: boolean;
    verifyModal?: boolean;
    addWatchList?: boolean;
    manageWatchList?: boolean
    addStock?: boolean
    setModal: (payload: Partial<TModal>) => void;
}

export const useModals = create<TModal>()((set) => ({
    register: false,
    signIn: false,
    forgotPassword: false,
    verifyModal: false,
    addWatchList: false,
    manageWatchList: false,
    addStock: false,
    setModal: (payload: Partial<TModal>) => {
        set((state) => ({ ...state, ...payload }));
    },
}));

