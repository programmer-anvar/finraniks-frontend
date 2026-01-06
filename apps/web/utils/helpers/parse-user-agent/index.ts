export type OS = 'Windows' | 'macOS' | 'Android' | 'Linux' | 'iOS' | 'Unknown';
export type Browser = 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Opera' | 'Unknown';

export interface ParsedUserAgent {
    os: OS;
    browser: Browser;
}

export function parseUserAgent(ua: string): ParsedUserAgent {
    let os: OS = 'Unknown';
    let browser: Browser = 'Unknown';

    // Detect OS
    if (ua.includes('Windows NT')) os = 'Windows';
    else if (ua.includes('Mac OS X')) os = 'macOS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

    // Detect Browser
    if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')) {
        browser = 'Chrome';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
    } else if (ua.includes('Edg')) {
        browser = 'Edge';
    } else if (ua.includes('OPR') || ua.includes('Opera')) {
        browser = 'Opera';
    }

    return { os, browser };
}

export default parseUserAgent;
