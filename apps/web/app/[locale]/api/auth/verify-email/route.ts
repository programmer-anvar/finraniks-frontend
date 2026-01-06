import { NextResponse, type NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import config from '@/lib/config';
import { calculateExpiresAt, getCookieConfig } from '@/utils/cookies';

/* ----------------------------- */
/* Types */
/* ----------------------------- */

interface VerifyEmailResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user_type?: string;
}

/* ----------------------------- */
/* In-memory processed token store */
/* (resets on server restart) */
/* ----------------------------- */

const processedTokens: Set<string> = new Set();

/* ----------------------------- */
/* Handler */
/* ----------------------------- */

export async function GET(
    request: NextRequest
): Promise<NextResponse> {
    const { searchParams, origin } = new URL(request.url);
    const token = searchParams.get('token');

    console.log('[VERIFY-EMAIL-SERVER] Request received:', {
        hasToken: Boolean(token),
        url: request.url,
    });

    const baseUrl = process.env.NEXTAUTH_URL ?? origin;

    /* ---------- NO TOKEN ---------- */
    if (!token) {
        console.log('[VERIFY-EMAIL-SERVER] No token provided');
        return NextResponse.redirect(
            new URL('/account/verify', baseUrl)
        );
    }

    /* ---------- TOKEN ALREADY PROCESSED ---------- */
    if (processedTokens.has(token)) {
        console.log('[VERIFY-EMAIL-SERVER] Token already processed');
        return NextResponse.redirect(
            new URL('/profile/dashboard', baseUrl)
        );
    }

    try {
        /* ---------- MARK TOKEN ---------- */
        processedTokens.add(token);

        // Cleanup token after 5 minutes
        setTimeout(() => {
            processedTokens.delete(token);
        }, 5 * 60 * 1000);

        console.log('[VERIFY-EMAIL-SERVER] Verifying token...');

        /* ---------- BACKEND REQUEST ---------- */
        const response = await axios.post<VerifyEmailResponse>(
            `${config.APP_URL}/auth/verify-email`,
            { token }
        );

        const data = response.data;

        console.log('[VERIFY-EMAIL-SERVER] Backend verification success');

        /* ---------- COOKIE SETUP ---------- */
        const cookieStore = await cookies();
        const cookieConfig = getCookieConfig();

        const expiresAt = calculateExpiresAt(data.expires_in);
        const maxAge = data.expires_in || 172800;

        /* ---------- SET AUTH COOKIES ---------- */
        cookieStore.set(
            cookieConfig.accessToken.name,
            data.access_token,
            { ...cookieConfig.accessToken, maxAge }
        );

        cookieStore.set(
            cookieConfig.refreshToken.name,
            data.refresh_token,
            { ...cookieConfig.refreshToken, maxAge }
        );

        cookieStore.set(
            cookieConfig.userType.name,
            data.user_type ?? 'registered',
            { ...cookieConfig.userType, maxAge }
        );

        cookieStore.set(
            cookieConfig.expiresAt.name,
            String(expiresAt),
            { ...cookieConfig.expiresAt, maxAge }
        );

        console.log('[VERIFY-EMAIL-SERVER] Cookies set successfully');

        /* ---------- REDIRECT ---------- */
        return NextResponse.redirect(
            new URL('/profile/dashboard', baseUrl)
        );
    } catch (error) {
        processedTokens.delete(token);

        const axiosError = error as AxiosError<{
            error?: string;
            message?: string;
        }>;

        console.error(
            '[VERIFY-EMAIL-SERVER] Verification failed:',
            axiosError.response?.data || axiosError.message
        );

        const errorUrl = new URL('/account/verify', baseUrl);
        errorUrl.searchParams.set(
            'error',
            axiosError.response?.data?.error ??
            axiosError.response?.data?.message ??
            'Verification failed'
        );

        return NextResponse.redirect(errorUrl);
    }
}
