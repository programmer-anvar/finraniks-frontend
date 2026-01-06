import { ReactNode } from "react";
import DesktopRootContent from "../desktop-root-content";
import { handler } from "../../../auth";


export default async function DesktopLayout({ children }: { children: ReactNode }) {
    const session = await handler.auth();
    return (
        <DesktopRootContent session={session!}>
            {children}
        </DesktopRootContent>
    );
}
