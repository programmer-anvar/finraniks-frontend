'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs';
import { STORAGE } from '@/constants';
import { useAppContext } from '@/lib/providers/customs/app';
import parseUserAgent from '@/utils/helpers/parse-user-agent';

interface AuthState {
    isAuthenticated: boolean;
    userType: string | null;
    hasAccessToken?: boolean
}

interface ProfileData {
    full_name?: string;
    email?: string;
    [key: string]: string | number | undefined;
}

interface FingerprintData {
    visitorId: string;
    components: Record<string, unknown>;
    confidence: { score: number };
}

interface AnonymousTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expire_timestamp: number;
}

export function useAuth(serverAuthState?: AuthState) {
    const { setState } = useAppContext();

    // Auth state
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: serverAuthState?.isAuthenticated || false,
        userType: serverAuthState?.userType || null,
    });

    const isAuthenticated = authState.isAuthenticated;

    // Profile data
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    // Fingerprint & UA
    const [fpData, setFpData] = useState<FingerprintData | null>(null);
    const [uaData, setUaData] = useState<any | null>(null);

    /** Check auth from cookies */
    const checkAuthFromCookies = useCallback(() => {
        const accessToken = document.cookie.match(/finranks\.access-token=([^;]+)/)?.[1] ?? null;
        const userTypeCookie = document.cookie.match(/finranks\.user-type=([^;]+)/)?.[1] ?? null;

        const hasValidAuth = !!accessToken && !!userTypeCookie && userTypeCookie !== 'anonym';

        setAuthState({
            isAuthenticated: hasValidAuth,
            userType: hasValidAuth ? userTypeCookie : null,
        });

        if (hasValidAuth) {
            const storedProfileData = localStorage.getItem(STORAGE.PROFILE_DATA);
            if (storedProfileData) {
                try {
                    setProfileData(JSON.parse(storedProfileData) as ProfileData);
                } catch { }
            }
        } else {
            setProfileData(null);
        }
    }, []);

    /** Initialize Fingerprint & UA */
    useEffect(() => {
        async function initFP() {
            const fp: Agent = await FingerprintJS.load();
            const visitorData = await fp.get();
            setFpData(visitorData as FingerprintData);
            setUaData(parseUserAgent(navigator.userAgent));
        }
        void initFP();
    }, []);

    /** Auth cookie sync + storage events */
    useEffect(() => {
        checkAuthFromCookies();

        const handleStorageChange = () => checkAuthFromCookies();
        const handleCookieSync = (event: CustomEvent<{ accessToken?: string }>) => {
            setTimeout(checkAuthFromCookies, 50);
            if (event.detail?.accessToken) {
                setTimeout(() => window.dispatchEvent(new Event('storage')), 100);
            }
        };
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') checkAuthFromCookies();
        };

        window.addEventListener('storage', handleStorageChange);
        // @ts-expect-error
        window.addEventListener('cookie-sync', handleCookieSync);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            // @ts-expect-error
            window.removeEventListener('cookie-sync', handleCookieSync);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [checkAuthFromCookies]);

    /** Handle anonymous token registration/refresh */
    useEffect(() => {
        if (!fpData || isAuthenticated) return;

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const refreshToken = localStorage.getItem(STORAGE.ANONYMOUS_REFRESH_TOKEN);
        const expire = localStorage.getItem(STORAGE.ANONYMOUS_EXPIRE);
        const expireTs = localStorage.getItem(STORAGE.ANONYMOUS_EXPIRE_TIMESTAMP);

        const isExpired = refreshToken
            ? Number(expireTs) + Number(expire) < currentTimestamp
            : true;

        const action: 'register' | 'refresh' | null = refreshToken && isExpired ? 'refresh' : !refreshToken ? 'register' : null;
        if (!action) {
            const accessToken = localStorage.getItem(STORAGE.ANONYMOUS_ACCESS_TOKEN);
            if (accessToken) setState(prev => ({ ...prev, anonymous_access_token: accessToken }));
            return;
        }

        const payload: Record<string, unknown> = {
            action,
            device_id: fpData.visitorId,
            device_info: uaData ? { os: uaData.os, browser: uaData.browser } : undefined,
        };

        if (action === 'refresh') payload.refresh_token = refreshToken;

        axios.post<{ success: boolean; data?: AnonymousTokens }>('/en/api/auth/anonymous', payload)
            .then(({ data: response }) => {
                if (response.success && response.data) {
                    const { access_token, refresh_token, expires_in } = response.data;
                    localStorage.setItem(STORAGE.ANONYMOUS_ACCESS_TOKEN, access_token);
                    localStorage.setItem(STORAGE.ANONYMOUS_REFRESH_TOKEN, refresh_token);
                    localStorage.setItem(STORAGE.ANONYMOUS_EXPIRE, expires_in.toString());
                    localStorage.setItem(STORAGE.ANONYMOUS_EXPIRE_TIMESTAMP, currentTimestamp.toString());

                    setState(prev => ({ ...prev, anonymous_access_token: access_token }));
                }
            })
            .catch(() => {
                localStorage.removeItem(STORAGE.ANONYMOUS_ACCESS_TOKEN);
                localStorage.removeItem(STORAGE.ANONYMOUS_REFRESH_TOKEN);
                localStorage.removeItem(STORAGE.ANONYMOUS_EXPIRE);
                localStorage.removeItem(STORAGE.ANONYMOUS_EXPIRE_TIMESTAMP);
            });
    }, [fpData, uaData, isAuthenticated, setState]);

    return {
        authState,
        isAuthenticated,
        profileData,
        fpData,
        uaData,
        checkAuthFromCookies,
    };
}
