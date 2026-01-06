/**
 * Get device type from request headers
 * For use in Server Components
 */

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: DeviceType;
}

const DEVICE_TYPE_HEADER = 'x-device-type';
const DEVICE_DATA_HEADER = 'x-device-data';

export function getDeviceType(headers: Headers): DeviceInfo {
    const rawDeviceType = headers.get(DEVICE_TYPE_HEADER);

    const deviceType: DeviceType =
        rawDeviceType === 'mobile' || rawDeviceType === 'tablet'
            ? rawDeviceType
            : 'desktop';

    let deviceInfo: DeviceInfo = {
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
        deviceType,
    };

    const deviceData = headers.get(DEVICE_DATA_HEADER);

    if (deviceData) {
        try {
            const parsed = JSON.parse(deviceData) as Partial<DeviceInfo>;

            deviceInfo = {
                ...deviceInfo,
                ...parsed,
                deviceType,
            };
        } catch {

        }
    }

    return deviceInfo;
}
