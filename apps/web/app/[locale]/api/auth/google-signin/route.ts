import { NextResponse, type NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import config from '@/lib/config';
import { calculateExpiresAt, getCookieConfig } from '@/utils/cookies';

/* ----------------------------- */
/* Types */
/* ----------------------------- */

interface GoogleSignInRequest {
    token: string;
}

interface BackendAuthResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user_type?: string;
    id?: number | string;
    email?: string;
    full_name?: string;
    subscription_status?: string;
}

/* ----------------------------- */
/* Handler */
/* ----------------------------- */

export async function POST(
    request: NextRequest
): Promise<NextResponse> {
    try {
        const body = (await request.json()) as Partial<GoogleSignInRequest>;
        const { token } = body;

        if (!token) {
            return NextResponse.json(
                { error: 'Google token is required' },
                { status: 400 }
            );
        }

        console.log('[Google Sign-In] Received token from client');

        const backendUrl = `${config.APP_URL}/auth/google-signin`;

        const response = await axios.post<BackendAuthResponse>(
            backendUrl,
            { token }
        );

        const data = response.data;

        const expiresAt = calculateExpiresAt(data.expires_in);
        const maxAge = data.expires_in;

        const cookieStore = await cookies();
        const cookieConfig = getCookieConfig();

        /* ---------- AUTH TOKENS ---------- */
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
            data.user_type ?? 'user',
            { ...cookieConfig.userType, maxAge }
        );

        cookieStore.set(
            cookieConfig.expiresAt.name,
            String(expiresAt),
            { ...cookieConfig.expiresAt, maxAge }
        );

        /* ---------- OPTIONAL USER DATA ---------- */
        if (data.id !== undefined) {
            cookieStore.set(
                cookieConfig.userId.name,
                String(data.id),
                { ...cookieConfig.userId, maxAge }
            );
        }

        if (data.email) {
            cookieStore.set(
                cookieConfig.userEmail.name,
                data.email,
                { ...cookieConfig.userEmail, maxAge }
            );
        }

        if (data.full_name) {
            cookieStore.set(
                cookieConfig.userName.name,
                data.full_name,
                { ...cookieConfig.userName, maxAge }
            );
        }

        if (data.subscription_status) {
            cookieStore.set(
                cookieConfig.subscriptionStatus.name,
                data.subscription_status,
                { ...cookieConfig.subscriptionStatus, maxAge }
            );
        }

        return NextResponse.json({
            success: true,
            data
        });
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        console.error(
            '[Google Sign-In] Error:',
            axiosError.response?.data || axiosError.message
        );

        return NextResponse.json(
            {
                error: 'Google sign-in failed',
                message:
                    axiosError.response?.data?.message ??
                    'Invalid Google token'
            },
            { status: axiosError.response?.status ?? 401 }
        );
    }
}
