import { headers } from 'next/headers';
import { getDeviceType } from '@/utils/get-device-type';
import { ReactNode } from 'react';
import MobileLayout from '../mobile';
import DesktopLayout from '../desktop';

export default async function LayoutWrapper({ children }: { children: ReactNode }) {
    const deviceInfo = getDeviceType(await headers());
    const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;
    if (isMobile) {
        return <MobileLayout>{children}</MobileLayout>;
    }

    return <DesktopLayout>{children}</DesktopLayout>;
}
