/* ----------------------------------------
 * Cookie Types
 * ------------------------------------- */

export type CookieName =
    | 'finranks.access-token'
    | 'finranks.refresh-token'
    | 'finranks.user-type'
    | 'finranks.expires-at'
    | 'finranks.user-id'
    | 'finranks.user-email'
    | 'finranks.user-name'
    | 'finranks.subscription-status';

export interface CookieConfig {
    name: CookieName;
    path: string;
    sameSite: 'lax' | 'strict' | 'none';
    secure: boolean;
    httpOnly: boolean;
    domain?: string;
}

/* ----------------------------------------
 * Environment helpers
 * ------------------------------------- */

const isProduction = process.env.NODE_ENV === 'production';

/* ----------------------------------------
 * Base cookie config
 * ------------------------------------- */

const baseConfig: Omit<CookieConfig, 'name' | 'httpOnly'> = {
    path: '/',
    sameSite: 'lax',
    secure: isProduction,
    ...(isProduction && { domain: '.finranks.com' }),
};

/* ----------------------------------------
 * Cookie Config Factory
 * ------------------------------------- */

export const getCookieConfig = () => {
    return {
        accessToken: {
            ...baseConfig,
            name: 'finranks.access-token',
            httpOnly: false,
        },

        refreshToken: {
            ...baseConfig,
            name: 'finranks.refresh-token',
            httpOnly: true,
        },

        userType: {
            ...baseConfig,
            name: 'finranks.user-type',
            httpOnly: false,
        },

        expiresAt: {
            ...baseConfig,
            name: 'finranks.expires-at',
            httpOnly: false,
        },

        userId: {
            ...baseConfig,
            name: 'finranks.user-id',
            httpOnly: true,
        },

        userEmail: {
            ...baseConfig,
            name: 'finranks.user-email',
            httpOnly: true,
        },

        userName: {
            ...baseConfig,
            name: 'finranks.user-name',
            httpOnly: false,
        },

        subscriptionStatus: {
            ...baseConfig,
            name: 'finranks.subscription-status',
            httpOnly: false,
        },
    } satisfies Record<string, CookieConfig>;
};

/* ----------------------------------------
 * Token helpers
 * ------------------------------------- */

/**
 * Calculate expiration timestamp (ms)
 * @param expiresInSeconds Token lifetime in seconds
 */
export const calculateExpiresAt = (expiresInSeconds: number): number => {
    return Date.now() + expiresInSeconds * 1000;
};

/**
 * Check if token is expired or about to expire
 * @param expiresAt Expiration timestamp (ms or string)
 * @param bufferSeconds Safety buffer in seconds (default: 5 min)
 */
export const isTokenExpiring = (
    expiresAt: number | string,
    bufferSeconds: number = 300
): boolean => {
    const expiresAtMs =
        typeof expiresAt === 'string' ? Number(expiresAt) : expiresAt;

    if (Number.isNaN(expiresAtMs)) {
        return true; // fail-safe: treat invalid value as expired
    }

    return Date.now() + bufferSeconds * 1000 >= expiresAtMs;
};
