import React from 'react'
import { Session } from 'next-auth'
import { ReactNode } from 'react'
import Providers from '@/lib/providers'
import Header from '@/components/header'
import AppNavigation from '@/components/app-navigation'
import Footer from '@/components/footer'

const MobileRootContent = ({ children, session }: { children: ReactNode, session: Session }) => {
    return (
        <Providers session={session!}>
            <Header />
            {children}
            <Footer />
            <AppNavigation />
        </Providers>
    )
}

export default MobileRootContent