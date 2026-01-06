import Modals from '@/components/modals'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { DesignSystemProvider } from '@finranks/design-system'
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './customs/auth';
import { AppProvider } from './customs/app';
import AuthSync from '@/utils/auth-sync';
import CookieSync from '@/utils/cookie-sync';
import VerifyAuthSync from '@/utils/verify-auth-sync';
import config from '../config';
import { Suspense } from 'react';
import { NuqsAdapter } from "nuqs/adapters/next/app";;

type TProvidersProps = {
    children: React.ReactNode;
    session: Session
}

const Providers = ({ children, session }: TProvidersProps) => {
    return (
        <FpjsProvider
            loadOptions={{
                apiKey: "5NFelYDmNG8WHm3UiqvT",
                region: "ap"
            }}
        >
            <SessionProvider
                session={session}
                baseUrl={config.APP_URL}
                refetchOnWindowFocus={false}
            >
                <AuthProvider>
                    <NuqsAdapter>
                        <AppProvider>
                            <CookieSync />
                            <AuthSync />
                            <VerifyAuthSync />
                            <DesignSystemProvider>
                                <Modals />
                                <Suspense fallback={<></>}>
                                    {children}
                                </Suspense>
                            </DesignSystemProvider>
                        </AppProvider>
                    </NuqsAdapter>
                </AuthProvider>
            </SessionProvider>
        </FpjsProvider>
    )
}

export default Providers;