import React, { ReactNode } from 'react';
import Header from './customs/header';
import SearchBar from './customs/search-bar';
import { Card } from '@finranks/design-system/components/card';
import SideNav from './customs/side-nav';

const ProfileLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='container mt-5 space-y-4'>
            <Header />
            <SearchBar />
            <Card className='rounded-md p-4 md:p-8 grid grid-cols-[72px_1fr] md:grid-cols-[250px_1fr] gap-4 py-0'>
                <SideNav />
                <div className='py-4'>
                    {children}
                </div>
            </Card>
        </div>
    )
}

export default ProfileLayout