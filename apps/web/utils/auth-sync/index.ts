'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import unifiedAuth, { AuthData } from '@/services/base/unified-auth';
import { STORAGE } from '@/constants';

interface GoogleAuthCookieData {
    accessToken: string;
    expiresAt: number;
    userType?: string;
    fullName?: string;
    subscriptionStatus?: string;
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
 * AuthSync Component
 * Ensures authentication state consistency between
 * Google OAuth (NextAuth) and Email authentication.
 */
const AuthSync = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== 'authenticated' || !session) return;

        console.log('[AUTH-SYNC] Google OAuth session detected, checking auth state...');
        const authState = unifiedAuth.getAuthState();

        if (authState.isAuthenticated) {
            console.log('[AUTH-SYNC] Already synced, no action needed.');
            return;
        }

        // Read cookie data
        const cookieData: GoogleAuthCookieData | null = (() => {
            const accessToken = getCookieValue('finranks.access-token');
            const expiresAtStr = getCookieValue('finranks.expires-at');

            if (!accessToken || !expiresAtStr) return null;

            const expiresAt = parseInt(expiresAtStr, 10);
            if (isNaN(expiresAt) || expiresAt <= Date.now()) return null;

            return {
                accessToken,
                expiresAt,
                userType: getCookieValue('finranks.user-type') || 'registered',
                fullName: getCookieValue('finranks.user-name') || undefined,
                subscriptionStatus: getCookieValue('finranks.subscription-status') || undefined,
            };
        })();

        if (!cookieData) return;

        // Calculate expires_in in seconds
        const expiresIn = Math.floor((cookieData.expiresAt - Date.now()) / 1000);

        const authData: AuthData = {
            access_token: cookieData.accessToken,
            refresh_token: 'secure-token-in-cookie', // httpOnly refresh token placeholder
            expires_in: expiresIn,
            user_type: cookieData.userType,
            full_name: cookieData.fullName,
            subscription_status: cookieData.subscriptionStatus,
            email: session?.user?.email!,
            id: session.user?.id,
        };

        console.log('[AUTH-SYNC] Setting Google OAuth auth data...');
        unifiedAuth.setAuthData(authData);

        // Redirect after login if URL is stored
        const redirectUrl = localStorage.getItem(STORAGE.REDIRECT_AFTER_LOGIN);
        if (redirectUrl) {
            console.log('[AUTH-SYNC] Redirecting to stored URL:', redirectUrl);
            localStorage.removeItem(STORAGE.REDIRECT_AFTER_LOGIN);
            router.push(redirectUrl);
        }
    }, [session, status, router]);

    return null; // Does not render anything
};

export default AuthSync;
