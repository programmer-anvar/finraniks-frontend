'use client';

import { STORAGE } from '@/constants';
import unifiedAuth from '@/services/base/unified-auth';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';


/* -------------------------------- */
/* Types */
/* -------------------------------- */

export interface AuthContextState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    isLoading: boolean;
}

export interface AuthContextValue extends AuthContextState {
    refreshTokenFn: () => Promise<void>;
    clearTokens: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

/* -------------------------------- */
/* Context */
/* -------------------------------- */

const AuthContext = createContext<AuthContextValue | null>(null);

/* -------------------------------- */
/* Provider */
/* -------------------------------- */

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthContextState>({
        accessToken: null,
        refreshToken: null,
        expiresIn: null,
        isLoading: true,
    });

    /* ------------------------------ */
    /* Initial sync + storage sync */
    /* ------------------------------ */

    useEffect(() => {
        const syncAuth = () => {
            const authState = unifiedAuth.getAuthState();

            if (authState.isAuthenticated) {
                setAuth({
                    accessToken: authState.accessToken,
                    refreshToken: authState.refreshToken,
                    expiresIn: authState.expiresAt,
                    isLoading: false,
                });
            } else {
                setAuth(prev => ({ ...prev, isLoading: false }));
            }
        };

        syncAuth();

        const handleStorage = () => {
            unifiedAuth.syncWithAuthContext(setAuth);
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    /* ------------------------------ */
    /* Auto refresh before expiry */
    /* ------------------------------ */

    useEffect(() => {
        if (!auth.expiresIn || !auth.accessToken) return;

        const timeToRefresh = auth.expiresIn - Date.now() - 30_000;

        if (timeToRefresh <= 0) {
            refreshTokenFn();
            return;
        }

        const timer = setTimeout(refreshTokenFn, timeToRefresh);
        return () => clearTimeout(timer);
    }, [auth.expiresIn, auth.accessToken]);

    /* ------------------------------ */
    /* Refresh token */
    /* ------------------------------ */

    const refreshTokenFn = async (): Promise<void> => {
        try {
            const response = await fetch('/en/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Refresh failed');

            const data: {
                access_token: string;
                expires_at: number;
            } = await response.json();

            localStorage.setItem(STORAGE.ACCESS_TOKEN, data.access_token); 
            localStorage.setItem(STORAGE.REFRESH_TOKEN, 'secure-token-in-cookie');
            localStorage.setItem(STORAGE.EXPIRES_IN, data.expires_at.toString());

            setAuth({
                accessToken: data.access_token,
                refreshToken: 'secure-token-in-cookie',
                expiresIn: data.expires_at,
                isLoading: false,
            });

            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error('[AUTH-CONTEXT] Refresh failed', error);

            unifiedAuth.clearAuth();

            setAuth({
                accessToken: null,
                refreshToken: null,
                expiresIn: null,
                isLoading: false,
            });
        }
    };

    /* ------------------------------ */
    /* Clear auth */
    /* ------------------------------ */

    const clearTokens = (): void => {
        unifiedAuth.clearAuth();

        setAuth({
            accessToken: null,
            refreshToken: null,
            expiresIn: null,
            isLoading: false,
        });
    };

    /* ------------------------------ */
    /* Provider */
    /* ------------------------------ */

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                refreshTokenFn,
                clearTokens,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/* -------------------------------- */
/* Hook */
/* -------------------------------- */

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
