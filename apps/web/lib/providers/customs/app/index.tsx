'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
    ReactNode,
} from 'react';

/* -------------------------------- */
/* Types */
/* -------------------------------- */

export interface WatchlistSetting {
    value: string;
    label: string;
    show: boolean;
}

export interface AppState {
    anonymous_access_token: string;
    access_token: string;

    profileData: Record<string, unknown> | null;

    watchlistCompanies: unknown[];
    watchlistSetting: WatchlistSetting[];
    watchlistCompaniesLoading: boolean;

    forgotPasswordEnteredEmail: string;
}

export interface AppContextValue {
    state: AppState & { isClient: boolean };
    setState: Dispatch<SetStateAction<AppState>>;
}

interface AppProviderProps {
    children: ReactNode;
}

/* -------------------------------- */
/* Defaults */
/* -------------------------------- */

const DEFAULT_WATCHLIST_SETTINGS: WatchlistSetting[] = [
    { value: 'company_name', label: 'Company name', show: true },
    { value: 'industry', label: 'Industry', show: true },
    { value: 'last_price', label: 'Last price', show: true },
    { value: 'change_percentage', label: '1D %', show: true },
    { value: 'change_month_percentage', label: '1M %', show: true },
    { value: 'change_year_percentage', label: '1Y %', show: true },
    { value: 'change_ytd_percentage', label: '1 YTD %', show: true },
    { value: 'volume', label: 'Volume', show: true },
    { value: 'market_cap', label: 'Market cap', show: true },
    { value: 'pe_ratio', label: 'P/E', show: true },
    { value: '52_week_range_low', label: '52-week Low', show: true },
    { value: '52_week_range_high', label: '52-week High', show: true },
];

const INITIAL_STATE: AppState = {
    anonymous_access_token: '',
    access_token: '',

    profileData: null,

    watchlistCompanies: [],
    watchlistSetting: DEFAULT_WATCHLIST_SETTINGS,
    watchlistCompaniesLoading: true,

    forgotPasswordEnteredEmail: '',
};

/* -------------------------------- */
/* Context */
/* -------------------------------- */

const AppContext = createContext<AppContextValue | null>(null);

/* -------------------------------- */
/* Provider */
/* -------------------------------- */

export const AppProvider = ({ children }: AppProviderProps) => {
    const [state, setState] = useState<AppState>(INITIAL_STATE);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        setIsClient(true);

        /* -------- Load watchlist settings -------- */

        const savedSettings = localStorage.getItem('watchlistSettings');
        let parsedSettings = DEFAULT_WATCHLIST_SETTINGS;

        try {
            if (savedSettings) {
                parsedSettings = JSON.parse(savedSettings);
            }
        } catch {
            parsedSettings = DEFAULT_WATCHLIST_SETTINGS;
        }

        /* -------- Load access token -------- */

        let accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            const cookieMatch = document.cookie.match(
                /finranks\.access-token=([^;]+)/
            );

            if (cookieMatch?.[1]) {
                accessToken = cookieMatch[1];
                localStorage.setItem('access_token', accessToken);
            }
        }

        /* -------- Load profile data -------- */

        let profileData: Record<string, unknown> | null = null;

        try {
            const storedProfile = localStorage.getItem('profile_data');
            profileData = storedProfile ? JSON.parse(storedProfile) : null;
        } catch {
            profileData = null;
        }

        setState(prev => ({
            ...prev,
            watchlistSetting: parsedSettings,
            access_token: accessToken ?? '',
            profileData,
        }));

        /* -------- Storage sync -------- */

        const handleStorageChange = () => {
            const newAccessToken = localStorage.getItem('access_token');
            const newProfileData = localStorage.getItem('profile_data');

            setState(prev => ({
                ...prev,
                access_token: newAccessToken ?? '',
                profileData: newProfileData
                    ? JSON.parse(newProfileData)
                    : null,
            }));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <AppContext.Provider
            value={{
                state: { ...state, isClient },
                setState,
            }
            }
        >
            {children}
        </AppContext.Provider>
    );
};

/* -------------------------------- */
/* Hook */
/* -------------------------------- */

export const useAppContext = (): AppContextValue => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};
