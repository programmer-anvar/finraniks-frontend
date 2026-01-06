export const STORAGE = {
    COUNT: 'count',
    // Anonymous session
    ANONYMOUS_REFRESH_TOKEN: 'anonymous_refresh_token',
    ANONYMOUS_EXPIRE: 'anonymous_expire',
    ANONYMOUS_EXPIRE_TIMESTAMP: 'anonymous_expire_timestamp',
    ANONYMOUS_ACCESS_TOKEN: 'anonymous_access_token',
    PROFILE_DATA: 'profile_data',

    // Login / Auth
    ISSUED_BY_GOOGLE: 'issued_by_google',
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    EXPIRES_IN: 'expires_in',
    REDIRECT_AFTER_LOGIN: 'redirect_after_login',
} as const;

export type StorageKey = (typeof STORAGE)[keyof typeof STORAGE];