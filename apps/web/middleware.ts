import { NextResponse, type NextRequest } from 'next/server';
import { DeviceDetect } from './utils/device-detect';

const SUPPORTED_LOCALES = ['en', 'uz', 'ru'];
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip internal / static / api routes early
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/.well-known') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const pathnameParts = pathname.split('/');
    const pathnameLocale = pathnameParts[1];

    if (!SUPPORTED_LOCALES.includes(pathnameLocale)) {
        const redirectUrl = new URL(
            `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`,
            request.url
        );

        return NextResponse.redirect(redirectUrl);
    }
    /* ------------------ Device Detection ------------------ */

    const userAgent = request.headers.get('user-agent') ?? '';
    const deviceDetector = new DeviceDetect(userAgent);
    const deviceInfo = deviceDetector.getDeviceInfo();

    /* ------------------ Auth Cookies ------------------ */

    const accessToken = request.cookies.get('finranks.access-token')?.value;
    const userType = request.cookies.get('finranks.user-type')?.value;
    const expiresAtRaw = request.cookies.get('finranks.expires-at')?.value;

    const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : null;
    const isTokenExpired = expiresAt ? Date.now() >= expiresAt : false;

    const isAuthenticated =
        Boolean(accessToken) &&
        Boolean(userType) &&
        userType !== 'anonym' &&
        !isTokenExpired;

    /* ------------------ Route Protection ------------------ */

    const isProtectedRoute = pathname.startsWith('/profile');

    if (isProtectedRoute && !isAuthenticated) {
        const signInUrl = new URL('/account/sign-in', request.url);
        signInUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(signInUrl);
    }

    /* ------------------ Response Enrichment ------------------ */

    const response = NextResponse.next();

    // Device cookie (non-httpOnly for client access)
    response.cookies.set('finranks.device-type', deviceInfo.deviceType, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    // Device headers
    response.headers.set('x-device-type', deviceInfo.deviceType);
    response.headers.set(
        'x-device-data',
        JSON.stringify({
            isMobile: deviceInfo.isMobile,
            isTablet: deviceInfo.isTablet,
            isDesktop: deviceInfo.isDesktop,
            browser: deviceInfo.browser.name,
            os: deviceInfo.os.name,
        })
    );

    // Auth metadata header
    response.headers.set(
        'x-auth-data',
        JSON.stringify(
            isAuthenticated
                ? {
                    isAuthenticated: true,
                    userType,
                    hasAccessToken: true,
                }
                : {
                    isAuthenticated: false,
                    userType: null,
                    hasAccessToken: false,
                }
        )
    );

    return response;
}

/* ------------------ Matcher ------------------ */

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
