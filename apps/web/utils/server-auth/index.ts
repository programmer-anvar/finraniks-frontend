import { cookies } from 'next/headers';
import { isTokenExpiring } from '../cookies';
export interface ServerAuthState {
    isAuthenticated?: boolean;
    userType?: string | null;
    accessToken?: string | null;
    expiresAt?: number;
    expired?: boolean;
    error?: string;
}
export async function getServerAuthState(): Promise<ServerAuthState> {
    const cookieStore = await cookies();

    try {
        const accessToken = cookieStore.get('finranks.access-token')?.value ?? null;
        const userType = cookieStore.get('finranks.user-type')?.value ?? null;
        const expiresAtStr = cookieStore.get('finranks.expires-at')?.value ?? null;
        const expiresAt = expiresAtStr ? parseInt(expiresAtStr) : undefined;

        if (!accessToken || !expiresAt) {
            return { isAuthenticated: false, userType: null, accessToken: null, expiresAt };
        }

        if (isTokenExpiring(expiresAt, 60)) {
            return { isAuthenticated: false, userType: null, accessToken: null, expired: true, expiresAt };
        }

        return { isAuthenticated: true, userType: userType ?? 'registered', accessToken, expiresAt };
    } catch (error: any) {
        console.error('Error reading auth cookies:', error);
        return { isAuthenticated: false, userType: null, accessToken: null, error: error.message };
    }
}
