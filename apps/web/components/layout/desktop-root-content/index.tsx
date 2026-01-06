import Footer from '@/components/footer'
import Header from '@/components/header'
import Providers from '@/lib/providers'
import { Session } from 'next-auth'
import { ReactNode } from 'react'

const DesktopRootContent = ({ children, session }: { children: ReactNode, session: Session }) => {
    return (
        <Providers session={session!}>
            <Header />
            {children}
            <Footer />
        </Providers>
    )
}

export default DesktopRootContent