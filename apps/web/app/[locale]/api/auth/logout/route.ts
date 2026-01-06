import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import axios, { AxiosError } from 'axios';
import config from '@/lib/config';

/* ----------------------------- */
/* Constants */
/* ----------------------------- */

const AUTH_COOKIES = [
    'finranks.access-token',
    'finranks.refresh-token',
    'finranks.user-type',
    'finranks.expires-at',
    'finranks.user-id',
    'finranks.user-email',
    'finranks.user-name',
    'finranks.subscription-status',
] as const;

/* ----------------------------- */
/* Handler */
/* ----------------------------- */

export async function POST(
    _request: NextRequest
): Promise<NextResponse> {
    try {
        const cookieStore = await cookies();

        const accessToken = cookieStore.get('finranks.access-token')?.value;

        /* ---------- BACKEND LOGOUT ---------- */
        if (accessToken) {
            try {
                await axios.post(
                    `${config.APP_URL}/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error(
                    '[LOGOUT] Backend logout failed:',
                    axiosError.response?.data || axiosError.message
                );
                // continue logout anyway
            }
        }

        /* ---------- CLEAR COOKIES ---------- */
        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });

        const isProduction = process.env.NODE_ENV === 'production';

        for (const name of AUTH_COOKIES) {
            const isHttpOnly = name.includes('refresh-token') || name.includes('user-id') || name.includes('user-email');

            // Clear for localhost / dev
            response.cookies.set(name, '', {
                path: '/',
                expires: new Date(0),
                httpOnly: isHttpOnly,
            });

            // Clear for production domain
            if (isProduction) {
                response.cookies.set(name, '', {
                    path: '/',
                    domain: '.finranks.com',
                    expires: new Date(0),
                    httpOnly: isHttpOnly,
                });
            }
        }

        return response;
    } catch (error) {
        console.error('[LOGOUT] Fatal error:', error);

        return NextResponse.json(
            { success: false, error: 'Logout failed' },
            { status: 500 }
        );
    }
}
