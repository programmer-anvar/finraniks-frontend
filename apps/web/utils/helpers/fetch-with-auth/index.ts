import { STORAGE } from "@/constants";

export interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const fetchWithAuth = async <T = any>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    // Get token from localStorage (only on client)
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem(STORAGE.ANONYMOUS_ACCESS_TOKEN)
            : null;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    // Parse JSON safely
    const data: T = await response.json();
    return data;
};
