import { STORAGE } from '@/constants';
import unifiedAuth from '../unified-auth';

/* -------------------------------- */
/* Types */
/* -------------------------------- */

export interface TokenData {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

/* -------------------------------- */
/* Helpers */
/* -------------------------------- */

const cleanToken = (token: string): string =>
    token.trim().replace(/^["']|["']$/g, '');

const isBrowser = (): boolean => typeof window !== 'undefined';

/* -------------------------------- */
/* Token Service */
/* -------------------------------- */

const tokenService = {
    getToken(): string | null {
        if (!isBrowser()) return null;

        // 1️⃣ Prefer unified auth (single source of truth)
        const unifiedToken = unifiedAuth.getAccessToken();
        if (unifiedToken) {
            return cleanToken(unifiedToken);
        }

        // 2️⃣ Backward compatibility: localStorage
        const storedToken = localStorage.getItem(STORAGE.ACCESS_TOKEN);
        if (storedToken) {
            return cleanToken(storedToken);
        }

        // 3️⃣ Fallback: anonymous token
        const anonymousToken = localStorage.getItem(
            STORAGE.ANONYMOUS_ACCESS_TOKEN
        );

        return anonymousToken ? cleanToken(anonymousToken) : null;
    },

    hasToken(): boolean {
        return Boolean(this.getToken());
    },

    getAuthHeader(token?: string | null): string {
        const accessToken = token ?? this.getToken();
        return accessToken ? `Bearer ${accessToken}` : '';
    },

    removeToken(): void {
        if (!isBrowser()) return;

        localStorage.removeItem(STORAGE.ANONYMOUS_ACCESS_TOKEN);
    },

    setTokenData(data: TokenData): void {
        if (!isBrowser()) return;

        // Unified auth (preferred)
        unifiedAuth.setAuthData(data, true);

        // Backward compatibility (localStorage)
        const expiresAt = Date.now() + data.expires_in * 1000;

        localStorage.setItem(STORAGE.ACCESS_TOKEN, data.access_token);
        localStorage.setItem(STORAGE.REFRESH_TOKEN, data.refresh_token);
        localStorage.setItem(STORAGE.EXPIRES_IN, expiresAt.toString());
    },
};

export default tokenService;
