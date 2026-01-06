'use client';

import { STORAGE } from '@/constants';
import { calculateExpiresAt } from '@/utils/cookies';

/* -------------------------------- */
/* Types */
/* -------------------------------- */

export interface AuthProfile {
    id?: number | string;
    email?: string;
    full_name?: string;
    user_type?: string;
    subscription_status?: string;
}

export interface AuthData extends AuthProfile {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
    profileData: AuthProfile | null;
    isExpired: boolean;
}

export interface AuthContextState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    isLoading: boolean;
}

type SetAuthState = (state: AuthContextState) => void;

/* -------------------------------- */
/* Helpers */
/* -------------------------------- */

const isBrowser = (): boolean => typeof window !== 'undefined';

const safeJSONParse = <T>(value: string | null): T | null => {
    if (!value) return null;
    try {
        return JSON.parse(value) as T;
    } catch {
        return null;
    }
};

/* -------------------------------- */
/* Unified Auth Service */
/* -------------------------------- */

class UnifiedAuthService {
    /* ------------------------------ */
    /* Set auth data */
    /* ------------------------------ */

    setAuthData(authData: AuthData, skipCookies = false): boolean {
        if (!isBrowser()) return false;

        if (!authData?.access_token || !authData?.refresh_token) {
            console.error('[UNIFIED-AUTH] Invalid auth data received');
            return false;
        }

        const expiresAt = calculateExpiresAt(authData.expires_in || 172800);

        // localStorage (backward compatibility)
        localStorage.setItem(STORAGE.ACCESS_TOKEN, authData.access_token);
        localStorage.setItem(STORAGE.REFRESH_TOKEN, authData.refresh_token);
        localStorage.setItem(STORAGE.EXPIRES_IN, expiresAt.toString());

        // Profile data
        const profileData: AuthProfile = {
            id: authData.id,
            email: authData.email,
            full_name: authData.full_name,
            user_type: authData.user_type,
            subscription_status: authData.subscription_status,
        };

        if (Object.values(profileData).some(Boolean)) {
            localStorage.setItem(STORAGE.PROFILE_DATA, JSON.stringify(profileData));
        }

        // Cookies (only when client sets them)
        if (!skipCookies) {
            this.setCookiesFromAuthData(authData, expiresAt);
        }

        window.dispatchEvent(new Event('storage'));
        return true;
    }

    /* ------------------------------ */
    /* Cookies */
    /* ------------------------------ */

    private setCookiesFromAuthData(
        authData: AuthData,
        expiresAt: number
    ): void {
        if (!isBrowser()) return;

        const maxAge = Math.floor((expiresAt - Date.now()) / 1000);
        if (maxAge <= 0) return;

        this.setCookie('finranks.access-token', authData.access_token, maxAge);
        this.setCookie(
            'finranks.user-type',
            authData.user_type ?? 'registered',
            maxAge
        );
        this.setCookie('finranks.expires-at', expiresAt.toString(), maxAge);

        if (authData.full_name) {
            this.setCookie('finranks.user-name', authData.full_name, maxAge);
        }

        if (authData.subscription_status) {
            this.setCookie(
                'finranks.subscription-status',
                authData.subscription_status,
                maxAge
            );
        }
    }

    private setCookie(name: string, value: string, maxAge: number): void {
        if (!isBrowser()) return;

        const isProduction = process.env.NODE_ENV === 'production';
        const safeMaxAge = maxAge > 0 ? maxAge : 172800;

        let cookie = `${name}=${encodeURIComponent(
            value
        )}; Path=/; SameSite=Lax; Max-Age=${safeMaxAge}`;

        if (isProduction) {
            cookie += '; Secure; Domain=.finranks.com';
        }

        document.cookie = cookie;
    }

    private getCookieValue(name: string): string | null {
        if (!isBrowser()) return null;

        const cookies = `; ${document.cookie}`;
        const parts = cookies.split(`; ${name}=`);

        if (parts.length === 2) {
            return decodeURIComponent(parts.pop()!.split(';')[0]);
        }

        return null;
    }

    /* ------------------------------ */
    /* State */
    /* ------------------------------ */

    getAuthState(): AuthState {
        if (!isBrowser()) {
            return {
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                expiresAt: null,
                profileData: null,
                isExpired: true,
            };
        }

        const accessToken = localStorage.getItem(STORAGE.ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(STORAGE.REFRESH_TOKEN);
        const expiresAtRaw = localStorage.getItem(STORAGE.EXPIRES_IN);

        const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : null;
        const isExpired = !expiresAt || Date.now() >= expiresAt;

        const profileData = safeJSONParse<AuthProfile>(
            localStorage.getItem(STORAGE.PROFILE_DATA)
        );

        return {
            isAuthenticated: Boolean(accessToken && refreshToken && !isExpired),
            accessToken,
            refreshToken,
            expiresAt,
            profileData,
            isExpired,
        };
    }

    /* ------------------------------ */
    /* Utilities */
    /* ------------------------------ */

    clearAuth(): void {
        if (!isBrowser()) return;

        localStorage.removeItem(STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE.EXPIRES_IN);
        localStorage.removeItem(STORAGE.PROFILE_DATA);

        const cookiesToClear = [
            'finranks.access-token',
            'finranks.user-type',
            'finranks.expires-at',
            'finranks.user-name',
            'finranks.subscription-status',
        ];

        const isProduction = process.env.NODE_ENV === 'production';

        cookiesToClear.forEach(name => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${isProduction ? ' Domain=.finranks.com;' : ''
                }`;
        });

        window.dispatchEvent(new Event('storage'));
    }

    isAuthenticated(): boolean {
        return this.getAuthState().isAuthenticated;
    }

    getAccessToken(): string | null {
        const { isAuthenticated, accessToken } = this.getAuthState();
        return isAuthenticated ? accessToken : null;
    }

    getAuthHeader(): string {
        const token = this.getAccessToken();
        return token ? `Bearer ${token}` : '';
    }

    syncWithAuthContext(setAuthState: SetAuthState): void {
        const authState = this.getAuthState();

        setAuthState({
            accessToken: authState.isAuthenticated
                ? authState.accessToken
                : null,
            refreshToken: authState.isAuthenticated
                ? authState.refreshToken
                : null,
            expiresIn: authState.expiresAt,
            isLoading: false,
        });
    }
}

/* -------------------------------- */
/* Singleton */
/* -------------------------------- */

const unifiedAuth = new UnifiedAuthService();
export default unifiedAuth;
