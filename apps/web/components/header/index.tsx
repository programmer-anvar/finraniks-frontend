import { getServerAuthState, ServerAuthState } from "@/utils/server-auth";
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { HeaderContent as HeaderDesktop } from "./customs/descktop/content";
import { HeaderContent as HeaderMobile } from "./customs/mobile/content";
import { getDeviceType } from "@/utils/get-device-type";

export const dynamic = 'force-dynamic';

const Header = async () => {
    const headersList = await headers();
    const authDataHeader = headersList.get('x-auth-data');
    const deviceInfo = getDeviceType(await headers());
    const isMobile = deviceInfo.isMobile || deviceInfo.isTablet;


    const cookieStore = await cookies();
    const accessToken = cookieStore.get('finranks.access-token');
    const userType = cookieStore.get('finranks.user-type');

    let serverAuthState: ServerAuthState;

    if (accessToken && userType && userType.value !== 'anonym') {
        serverAuthState = {
            isAuthenticated: true,
            userType: userType.value
        };
    } else if (authDataHeader) {
        try {
            serverAuthState = JSON.parse(authDataHeader);
        } catch {
            serverAuthState = await getServerAuthState();
        }
    } else {
        serverAuthState = await getServerAuthState();
    }
    return (
        isMobile ? <HeaderMobile authState={serverAuthState} /> : <HeaderDesktop authState={serverAuthState} />
    )
}

export default Header