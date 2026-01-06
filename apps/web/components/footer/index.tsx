import React from 'react'
import { headers } from 'next/headers'
import { getDeviceType } from '@/utils/get-device-type'
import MobileFooter from './customs/mobile';
import { DesktopFooter } from './customs/desktop';

const Footer = async () => {
    const deviceInfo = getDeviceType(await headers());
    const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;
    return isMobile ? <MobileFooter /> : <DesktopFooter />;
}

export default Footer