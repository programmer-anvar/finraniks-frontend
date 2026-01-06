/**
 * Device Detection Utility
 * Uses ua-parser-js for reliable device, browser, and OS detection
 */

import { UAParser, type IResult } from 'ua-parser-js';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: DeviceType;
    browser: {
        name: string;
        version: string;
    };
    os: {
        name: string;
        version: string;
    };
    device: {
        vendor: string;
        model: string;
        type: DeviceType;
    };
    isLegacyBrowser: boolean;
}

export class DeviceDetect {
    private readonly parser: UAParser;
    private readonly result: IResult;
    private readonly ua: string;

    constructor(userAgent: string = '') {
        this.parser = new UAParser(userAgent);
        this.result = this.parser.getResult();
        this.ua = this.parser.getUA().toLowerCase();
    }

    // ------------------------
    // Device type checks
    // ------------------------

    isMobile(): boolean {
        return this.result.device.type === 'mobile';
    }

    isTablet(): boolean {
        return this.result.device.type === 'tablet';
    }

    isDesktop(): boolean {
        return !this.isMobile() && !this.isTablet();
    }

    getDeviceType(): DeviceType {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    }

    // ------------------------
    // Browser checks
    // ------------------------

    isOperaMini(): boolean {
        const browser = this.result.browser.name?.toLowerCase() ?? '';
        return browser.includes('opera mini');
    }

    isLegacyBrowser(): boolean {
        const browser = this.result.browser.name?.toLowerCase() ?? '';

        return (
            browser === 'ie' ||
            browser.includes('internet explorer') ||
            this.ua.includes('msie') ||
            this.ua.includes('trident') ||
            this.ua.includes('opera mini') ||
            this.ua.includes('ucbrowser') ||
            this.ua.includes('ucmini')
        );
    }

    // ------------------------
    // Browser / OS getters
    // ------------------------

    getBrowser(): string {
        return this.result.browser.name ?? 'Unknown';
    }

    getBrowserVersion(): string {
        return this.result.browser.version ?? 'Unknown';
    }

    getOS(): string {
        return this.result.os.name ?? 'Unknown';
    }

    getOSVersion(): string {
        return this.result.os.version ?? 'Unknown';
    }

    getDeviceVendor(): string {
        return this.result.device.vendor ?? 'Unknown';
    }

    getDeviceModel(): string {
        return this.result.device.model ?? 'Unknown';
    }

    // ------------------------
    // Aggregate info
    // ------------------------

    getDeviceInfo(): DeviceInfo {
        const deviceType = this.getDeviceType();

        return {
            isMobile: deviceType === 'mobile',
            isTablet: deviceType === 'tablet',
            isDesktop: deviceType === 'desktop',
            deviceType,
            browser: {
                name: this.getBrowser(),
                version: this.getBrowserVersion(),
            },
            os: {
                name: this.getOS(),
                version: this.getOSVersion(),
            },
            device: {
                vendor: this.getDeviceVendor(),
                model: this.getDeviceModel(),
                type: deviceType,
            },
            isLegacyBrowser: this.isLegacyBrowser(),
        };
    }
}
