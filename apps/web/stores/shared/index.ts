// lib/stores/tabStore.ts
"use client";

import { create } from "zustand";

interface TabStore {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
    activeTab: "income-statement",
    setActiveTab: (tab) => set({ activeTab: tab }),
}));
