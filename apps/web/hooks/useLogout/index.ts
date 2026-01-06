import { STORAGE } from "@/constants";
import { logOutByGoogle } from "@/lib/auth/google-methods";
import { useAppContext } from "@/lib/providers/customs/app";
import { toast } from "@finranks/design-system/components/sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogout = () => {
    const { setState } = useAppContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const performLogout = async () => {
        try {
            setIsLoading(true);
            // Call the logout API route which will handle cookie clearing server-side
            const response = await fetch('/en/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Clear localStorage
                window.localStorage.removeItem(STORAGE.ACCESS_TOKEN);
                window.localStorage.removeItem(STORAGE.REFRESH_TOKEN);
                window.localStorage.removeItem(STORAGE.EXPIRES_IN);
                window.localStorage.removeItem(STORAGE.ISSUED_BY_GOOGLE);
                window.localStorage.removeItem(STORAGE.PROFILE_DATA);
                window.localStorage.removeItem(STORAGE.ANONYMOUS_ACCESS_TOKEN);
                window.localStorage.removeItem(STORAGE.ANONYMOUS_REFRESH_TOKEN);
                window.localStorage.removeItem(STORAGE.ANONYMOUS_EXPIRE);
                window.localStorage.removeItem(STORAGE.ANONYMOUS_EXPIRE_TIMESTAMP);

                // Clear cookies client-side as well (for any that aren't httpOnly)
                document.cookie = 'finranks.access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.finranks.com';
                document.cookie = 'finranks.user-type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.finranks.com';
                document.cookie = 'finranks.expires-at=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.finranks.com';
                document.cookie = 'finranks.refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.finranks.com';

                // Also try without domain for local development
                document.cookie = 'finranks.access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                document.cookie = 'finranks.user-type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                document.cookie = 'finranks.expires-at=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                document.cookie = 'finranks.refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

                // Clear app state
                setState(prev => ({
                    ...prev,
                    access_token: '',
                    profileData: null,
                    anonymous_access_token: ''
                }));

                // Log out from Google if applicable
                try {
                    await logOutByGoogle();
                } catch (error) {
                    console.error('Google logout error:', error);
                }

                toast.success("Successfully logged out!");

                // Trigger storage event to update AppContext immediately
                window.dispatchEvent(new Event('storage'));

                // Small delay to ensure all state updates are processed
                await new Promise(resolve => setTimeout(resolve, 100));

                // Redirect to home page
                router.push('/en');
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Logout error:', error);
            toast.error('Something went wrong during logout');

            // Even if API fails, clear local data and redirect
            window.localStorage.clear();
            setState(prev => ({
                ...prev,
                access_token: '',
                profileData: null,
                anonymous_access_token: ''
            }));
            router.push('/en');
        }
    };


    return {
        performLogout,
        isLoading
    }

}