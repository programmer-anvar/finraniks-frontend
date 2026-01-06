'use client';

import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: DeviceType;
    isLoading: boolean;
}

const COOKIE_NAME = 'finranks.device-type';

/**
 * Device Type Hook
 * For use in Client Components
 */
export function useDeviceType(): DeviceInfo {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        deviceType: 'desktop',
        isLoading: true,
    });

    useEffect(() => {
        const getCookie = (name: string): string | null => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop()?.split(';').shift() ?? null;
            }
            return null;
        };

        const rawDeviceType = getCookie(COOKIE_NAME);

        const deviceType: DeviceType =
            rawDeviceType === 'mobile' || rawDeviceType === 'tablet'
                ? rawDeviceType
                : 'desktop';

        setDeviceInfo({
            isMobile: deviceType === 'mobile',
            isTablet: deviceType === 'tablet',
            isDesktop: deviceType === 'desktop',
            deviceType,
            isLoading: false,
        });
    }, []);

    return deviceInfo;
}
