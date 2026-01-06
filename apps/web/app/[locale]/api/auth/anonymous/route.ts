import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';
import config from '@/lib/config';

/* ----------------------------- */
/* Types */
/* ----------------------------- */

type ActionType = 'register' | 'refresh';

interface DeviceInfo {
    [key: string]: unknown;
}

interface RequestBody {
    action: ActionType;
    device_id?: string;
    device_info?: DeviceInfo;
    refresh_token?: string;
}

interface ApiSuccessResponse<T = unknown> {
    success: true;
    data: T;
    fallback?: boolean;
}

interface ApiErrorResponse {
    success: false;
    error: string;
}

/* ----------------------------- */
/* Handler */
/* ----------------------------- */

export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
    try {
        const body = (await request.json()) as RequestBody;
        const { action, device_id, device_info, refresh_token } = body;

        /* ---------- REGISTER ---------- */
        if (action === 'register') {
            if (!device_id || !device_info) {
                return NextResponse.json(
                    { success: false, error: 'Missing device_id or device_info' },
                    { status: 400 }
                );
            }

            try {
                const response = await axios.post(
                    `${config.APP_URL}/device/register/`,
                    { device_id, device_info }
                );

                return NextResponse.json({
                    success: true,
                    data: response.data
                });
            } catch (error) {
                return NextResponse.json(
                    { success: false, error: 'Device registration failed' },
                    { status: 500 }
                );
            }
        }

        /* ---------- REFRESH ---------- */
        if (action === 'refresh') {
            if (!refresh_token) {
                return NextResponse.json(
                    { success: false, error: 'Missing refresh_token' },
                    { status: 400 }
                );
            }

            try {
                const response = await axios.post(
                    `${config.APP_URL}/auth/refresh/`,
                    { refresh_token }
                );

                return NextResponse.json({
                    success: true,
                    data: response.data
                });
            } catch (error) {
                // Refresh failed → fallback to device registration
                if (device_id && device_info) {
                    try {
                        const response = await axios.post(
                            `${config.APP_URL}/device/register/`,
                            { device_id, device_info }
                        );

                        return NextResponse.json({
                            success: true,
                            data: response.data,
                            fallback: true
                        });
                    } catch {
                        return NextResponse.json(
                            {
                                success: false,
                                error: 'Both refresh and re-registration failed'
                            },
                            { status: 500 }
                        );
                    }
                }

                return NextResponse.json(
                    {
                        success: false,
                        error: 'Refresh failed and no device info for fallback'
                    },
                    { status: 400 }
                );
            }
        }

        /* ---------- INVALID ACTION ---------- */
        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}
