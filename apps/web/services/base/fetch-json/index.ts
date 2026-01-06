export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T | null> {
    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            return null;
        }

        return res.json() as Promise<T>;
    } catch (error) {
        console.error(`Fetch error for ${url}:`, error);
        return null;
    }
}