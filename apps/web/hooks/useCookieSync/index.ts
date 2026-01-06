'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { STORAGE } from '@/constants';
import { isTokenExpiring } from '@/utils/cookies';

type CookieName =
    | 'finranks.access-token'
    | 'finranks.refresh-token'
    | 'finranks.user-type'
    | 'finranks.expires-at';

export function useCookieSync(): void {
    const router = useRouter();

    const getCookie = useCallback((name: CookieName): string | null => {
        const match = document.cookie.match(
            new RegExp(`(?:^|; )${name}=([^;]*)`)
        );
        return match ? decodeURIComponent(match[1]) : null;
    }, []);

    const clearAuthAndRedirect = useCallback((): void => {
        localStorage.removeItem(STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE.EXPIRES_IN);
        localStorage.removeItem(STORAGE.PROFILE_DATA);

        document.cookie =
            'finranks.access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie =
            'finranks.user-type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie =
            'finranks.expires-at=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

        router.push('/?signin=true');
    }, [router]);

    const syncAuthFromCookies = useCallback((): void => {
        const accessToken = getCookie('finranks.access-token');
        const expiresAt = getCookie('finranks.expires-at');

        if (!accessToken || !expiresAt) return;

        if (isTokenExpiring(expiresAt, 60)) {
            clearAuthAndRedirect();
            return;
        }

        const currentAccessToken = localStorage.getItem(STORAGE.ACCESS_TOKEN);

        if (currentAccessToken !== accessToken) {
            localStorage.setItem(STORAGE.ACCESS_TOKEN, accessToken);

            const refreshToken =
                getCookie('finranks.refresh-token') ?? 'secure-token-in-cookie';

            localStorage.setItem(STORAGE.REFRESH_TOKEN, refreshToken);
            localStorage.setItem(STORAGE.EXPIRES_IN, expiresAt);

            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(
                new CustomEvent('cookie-sync', {
                    detail: { accessToken },
                })
            );
        }
    }, [getCookie, clearAuthAndRedirect]);

    useEffect(() => {
        syncAuthFromCookies();

        const timeouts = [
            setTimeout(syncAuthFromCookies, 50),
            setTimeout(syncAuthFromCookies, 200),
            setTimeout(syncAuthFromCookies, 500),
            setTimeout(syncAuthFromCookies, 1000),
            setTimeout(syncAuthFromCookies, 2000),
        ];

        const interval = setInterval(() => {
            const expiresAt = getCookie('finranks.expires-at');
            if (expiresAt && isTokenExpiring(expiresAt, 60)) {
                clearAuthAndRedirect();
            }
        }, 30_000);

        return () => {
            timeouts.forEach(clearTimeout);
            clearInterval(interval);
        };
    }, [syncAuthFromCookies, clearAuthAndRedirect, getCookie]);
}
