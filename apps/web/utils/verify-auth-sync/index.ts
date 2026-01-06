'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import unifiedAuth from '@/services/base/unified-auth';
import { useAppContext } from '@/lib/providers/customs/app';

interface AuthCookieData {
    accessToken: string;
    expiresAt: number;
    userType?: string;
}

/**
 * Extracts a cookie value by name
 */
const getCookieValue = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop()!.split(';')[0]);
    }
    return null;
};

/**
 * VerifyAuthSync Component
 * Handles authentication state synchronization after email verification.
 */
const VerifyAuthSync = () => {
    const pathname = usePathname();
    const { setState } = useAppContext();
    const [hasSynced, setHasSynced] = useState(false);

    const syncAuthFromCookies = useCallback(() => {
        const accessToken = getCookieValue('finranks.access-token');
        const expiresAtStr = getCookieValue('finranks.expires-at');
        const userType = getCookieValue('finranks.user-type');

        if (!accessToken || !expiresAtStr) return null;

        const expiresAt = parseInt(expiresAtStr, 10);
        if (isNaN(expiresAt) || expiresAt <= Date.now()) return null;

        return {
            accessToken,
            expiresAt,
            userType: userType || 'registered',
        } as AuthCookieData;
    }, []);

    useEffect(() => {
        if (pathname !== '/profile/dashboard' || hasSynced) return;

        console.log('[VERIFY-AUTH-SYNC] Checking for post-verification auth sync...');
        const authState = unifiedAuth.getAuthState();

        // If already authenticated, mark as synced
        if (authState.isAuthenticated) {
            setHasSynced(true);
            return;
        }

        const cookieData = syncAuthFromCookies();
        if (!cookieData) return;

        const expiresIn = Math.floor((cookieData.expiresAt - Date.now()) / 1000);
        if (expiresIn <= 0) return;

        const authData = {
            access_token: cookieData.accessToken,
            refresh_token: 'secure-token-in-cookie', // Placeholder for httpOnly token
            expires_in: expiresIn,
            user_type: cookieData.userType,
        };

        console.log('[VERIFY-AUTH-SYNC] Setting auth data from verification cookies...');
        unifiedAuth.setAuthData(authData, true);

        // Update AppContext
        setState(prev => ({
            ...prev,
            access_token: cookieData.accessToken,
            profileData: {
                user_type: cookieData.userType,
            },
        }));

        // Mark as synced to prevent re-runs
        setHasSynced(true);

        // Trigger storage event to update other components
        window.dispatchEvent(new Event('storage'));

        // Clean URL (remove query params if any)
        if (window.location.search) {
            window.history.replaceState({}, '', window.location.pathname);
        }

        console.log('[VERIFY-AUTH-SYNC] Auth sync completed successfully');
    }, [pathname, hasSynced, setState, syncAuthFromCookies]);

    return null; // Does not render anything
};

export default VerifyAuthSync;
