import { NextResponse, type NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import config from '@/lib/config';
import { calculateExpiresAt, getCookieConfig } from '@/utils/cookies';

/* ----------------------------- */
/* Backend response shape */
/* ----------------------------- */

interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

/* ----------------------------- */
/* Handler */
/* ----------------------------- */

export async function POST(
    _request: NextRequest
): Promise<NextResponse> {
    const cookieStore = await cookies();
    const cookieConfig = getCookieConfig();

    try {
        const refreshTokenCookie = cookieStore.get(
            cookieConfig.refreshToken.name
        );

        if (!refreshTokenCookie?.value) {
            console.log('[REFRESH-TOKEN] No refresh token found');
            return NextResponse.json(
                { error: 'No refresh token found' },
                { status: 401 }
            );
        }

        console.log('[REFRESH-TOKEN] Attempting to refresh token...');

        /* ---------- BACKEND REQUEST ---------- */
        const response = await axios.post<RefreshTokenResponse>(
            `${config.APP_URL}/auth/refresh-token`,
            {
                refresh_token: refreshTokenCookie.value,
            }
        );

        const data = response.data;

        const expiresAt = calculateExpiresAt(data.expires_in);
        const maxAge = data.expires_in || 172800;

        /* ---------- UPDATE COOKIES ---------- */
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
            cookieConfig.expiresAt.name,
            String(expiresAt),
            { ...cookieConfig.expiresAt, maxAge }
        );

        console.log('[REFRESH-TOKEN] Token refreshed successfully');

        return NextResponse.json({
            success: true,
            access_token: data.access_token,
            expires_at: expiresAt,
        });
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        console.error(
            '[REFRESH-TOKEN] Error:',
            axiosError.response?.data || axiosError.message
        );

        /* ---------- CLEAR COOKIES ON FAILURE ---------- */
        cookieStore.delete(cookieConfig.accessToken.name);
        cookieStore.delete(cookieConfig.refreshToken.name);
        cookieStore.delete(cookieConfig.userType.name);
        cookieStore.delete(cookieConfig.expiresAt.name);

        return NextResponse.json(
            { error: 'Failed to refresh token' },
            { status: 401 }
        );
    }
}
