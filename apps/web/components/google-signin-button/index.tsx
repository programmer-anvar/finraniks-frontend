'use client';

import React, { useEffect, useState, useCallback, useRef, useId } from 'react';
import { useSearchParams } from "next/navigation";
import { useAppContext } from '@/lib/providers/customs/app';
import unifiedAuth from '@/services/base/unified-auth';
import { toast } from '@finranks/design-system/components/sonner';
import { STORAGE } from '@/constants';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const AUTH_TIMEOUT_MS = 30000; // 30 seconds

const GoogleSignInButton: React.FC = () => {
    const { state, setState } = useAppContext();
    const searchParams = useSearchParams();
    const uniqueId = useId();

    const buttonId = `google-signin-${uniqueId.replace(/:/g, '-')}`;
    const hiddenButtonId = `${buttonId}-hidden`;
    const redirectUrl = searchParams.get('redirect') || '/profile/dashboard';

    const [isScriptLoaded, setScriptLoaded] = useState(false);
    const [isButtonRendered, setButtonRendered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [renderError, setRenderError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    const isAuthenticated = !!(state.access_token && state.profileData);

    /** Handles Google credential response */
    const handleCredentialResponse = useCallback(async (response: any) => {
        if (isLoading) return;

        setIsLoading(true);
        const googleToken = response.credential;
        abortControllerRef.current = new AbortController();

        const timeoutId = setTimeout(() => {
            abortControllerRef.current?.abort();
        }, AUTH_TIMEOUT_MS);

        try {
            const res = await fetch('/en/api/auth/google-signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: googleToken }),
                signal: abortControllerRef.current.signal,
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Auth failed: ${res.status}`);
            }

            const data = await res.json();

            if (data.success && data.data) {
                if (!unifiedAuth.setAuthData(data.data, true)) {
                    throw new Error('Failed to set auth data');
                }

                setState(prev => ({
                    ...prev,
                    signInModal: false,
                    registrationModal: false,
                    profileData: data.data,
                    access_token: data.data.access_token,
                }));

                const redirect = localStorage.getItem(STORAGE.REDIRECT_AFTER_LOGIN) || redirectUrl;
                localStorage.removeItem(STORAGE.REDIRECT_AFTER_LOGIN);
                window.location.href = redirect;
            } else {
                throw new Error(data.message || 'Invalid server response');
            }
        } catch (error: any) {
            clearTimeout(timeoutId);
            const msg = error.name === 'AbortError'
                ? 'Authentication timeout. Please try again.'
                : error.message || 'An error occurred during Google sign-in.';
            toast.error(msg);
            setIsLoading(false);
        }
    }, [isLoading, redirectUrl, setState]);

    /** Load Google Identity Services script */
    useEffect(() => {
        // @ts-expect-error
        if (window.google?.accounts?.id) {
            setScriptLoaded(true);
            return;
        }

        const script = document.createElement('script');
        scriptRef.current = script;
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;

        script.onload = () => setScriptLoaded(true);
        script.onerror = () => {
            const error = 'Failed to load Google sign-in script.';
            console.error(error);
            setRenderError(error);
            toast.error(error);
        };

        document.body.appendChild(script);

        return () => {
            if (scriptRef.current && document.body.contains(scriptRef.current)) {
                document.body.removeChild(scriptRef.current);
            }
            abortControllerRef.current?.abort();
            delete (window as any).handleCredentialResponse;
        };
    }, []);

    /** Initialize hidden Google button */
    useEffect(() => {
        // @ts-expect-error
        if (!isScriptLoaded || !window.google?.accounts?.id) return;
        if (!GOOGLE_CLIENT_ID) {
            const error = 'NEXT_PUBLIC_GOOGLE_CLIENT_ID not configured.';
            setRenderError(error);
            return;
        }

        const hiddenButton = document.getElementById(hiddenButtonId);
        if (!hiddenButton) return;

        hiddenButton.innerHTML = ''; // Clear old button
        // @ts-expect-error
        window.handleCredentialResponse = handleCredentialResponse;
        // @ts-expect-error
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
        });
        // @ts-expect-error
        window.google.accounts.id.renderButton(hiddenButton, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            width: 400,
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
        });

        setTimeout(() => {
            setButtonRendered(hiddenButton.children.length > 0);
            if (hiddenButton.children.length === 0) {
                setRenderError('Failed to render Google button');
            }
        }, 100);

    }, [isScriptLoaded, hiddenButtonId, handleCredentialResponse]);

    /** Trigger hidden button */
    const handleCustomButtonClick = () => {
        if (!isButtonRendered || isLoading) return;
        const hiddenButton = document.getElementById(hiddenButtonId);
        const googleBtn = hiddenButton?.querySelector('div[role="button"]');
        if (googleBtn) (googleBtn as HTMLElement).click();
        else toast.error('Google button not found. Please refresh.');
    };

    if (isAuthenticated) return null;
    if (renderError) return <div className="text-center text-red-500">{renderError}</div>;

    return (
        <>
            <div
                id={hiddenButtonId}
                style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}
            />
            <button
                type="button"
                onClick={handleCustomButtonClick}
                disabled={isLoading || !isButtonRendered}
                className="hover:bg-purple-950/40"
                style={{
                    width: '100%',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 4,
                    cursor: isLoading || !isButtonRendered ? 'not-allowed' : 'pointer',
                    opacity: isLoading || !isButtonRendered ? 0.6 : 1,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
            >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                        <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853" />
                        <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                        <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" />
                    </g>
                </svg>
                <span>{isLoading ? 'Signing in...' : !isButtonRendered ? 'Loading...' : 'Continue with Google'}</span>
            </button>
        </>
    );
};

export default GoogleSignInButton;
