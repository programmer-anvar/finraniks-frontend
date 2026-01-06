import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import config from '@/lib/config';
import tokenService from '../token';
import unifiedAuth from '../unified-auth';
import { STORAGE } from '@/constants';

/* -------------------------------- */
/* Types */
/* -------------------------------- */

interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

interface FailedQueueItem {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}

/* -------------------------------- */
/* Axios instance */
/* -------------------------------- */

const api: AxiosInstance = axios.create({
    baseURL: config.APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* -------------------------------- */
/* Refresh control */
/* -------------------------------- */

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else if (token) {
            resolve(token);
        }
    });

    failedQueue = [];
};

/* -------------------------------- */
/* Request interceptor */
/* -------------------------------- */

api.interceptors.request.use(
    // @ts-expect-error
    (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
        const token = tokenService.getToken();

        if (token && requestConfig.headers) {
            const cleanToken = token.trim().replace(/^["']|["']$/g, '');
            requestConfig.headers.Authorization = `Bearer ${cleanToken}`;
        }

        return requestConfig;
    },
    (error: AxiosError) => Promise.reject(error)
);

/* -------------------------------- */
/* Response interceptor */
/* -------------------------------- */

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError): Promise<AxiosResponse | never> => {
        const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        /* ---------- Do not retry refresh endpoint ---------- */
        if (originalRequest.url === '/auth/refresh-token') {
            return Promise.reject(error);
        }

        /* ---------- Handle 401 ---------- */
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token: string) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem(STORAGE.REFRESH_TOKEN);

            if (!refreshToken) {
                isRefreshing = false;
                unifiedAuth.clearAuth();

                localStorage.removeItem(STORAGE.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE.REFRESH_TOKEN);
                localStorage.removeItem(STORAGE.EXPIRES_IN);

                return Promise.reject(error);
            }

            try {
                const response = await api.post<RefreshTokenResponse>(
                    '/auth/refresh-token',
                    { refresh_token: refreshToken }
                );

                const { access_token, refresh_token, expires_in } = response.data;

                unifiedAuth.setAuthData({
                    access_token,
                    refresh_token,
                    expires_in,
                });

                const expiresAt = Date.now() + expires_in * 1000;

                localStorage.setItem(STORAGE.ACCESS_TOKEN, access_token);
                localStorage.setItem(STORAGE.REFRESH_TOKEN, refresh_token);
                localStorage.setItem(STORAGE.EXPIRES_IN, expiresAt.toString());

                api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                }

                processQueue(null, access_token);
                isRefreshing = false;

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;

                unifiedAuth.clearAuth();

                localStorage.removeItem(STORAGE.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE.REFRESH_TOKEN);
                localStorage.removeItem(STORAGE.EXPIRES_IN);

                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

/* -------------------------------- */
/* Typed API client */
/* -------------------------------- */

export const apiClient = {
    get<T = unknown>(url: string, config?: AxiosRequestConfig) {
        return api.get<T>(url, config);
    },

    post<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ) {
        return api.post<T>(url, data, config);
    },

    put<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ) {
        return api.put<T>(url, data, config);
    },

    patch<T = unknown, D = unknown>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ) {
        return api.patch<T>(url, data, config);
    },

    delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
        return api.delete<T>(url, config);
    },

    /* ---------- Example endpoint ---------- */
    getStockQuote<T = unknown>(symbol: string) {
        return api.get<T>(`/quotes/${symbol}`);
    },
};

export default apiClient;
